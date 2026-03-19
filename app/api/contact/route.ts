import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2024-02-28",
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

// Basic HTML escaping to prevent XSS without needing heavy jsdom-based sanitizers
function escapeHTML(str: string): string {
    return str.replace(/[&<>'"]/g, (tag) => {
        const chars: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        };
        return chars[tag] || tag;
    });
}

// Zod Schema
const contactSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name is too long"),
    email: z.string().email("Invalid email address").max(100, "Email is too long"),
    subject: z.string().max(100, "Subject is too long").optional(),
    message: z.string().min(1, "Message is required").max(1000, "Message is too long"),
    website: z.string().max(100).optional(), // Honeypot field
});

// Simple IP-based rate limiting
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = 5; // Increased to 5 per hour
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
    try {
        // --- RATE LIMITING ---
        // Basic fallback for development and local proxies
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : "127.0.0.1";
        
        // Skip rate limiting in development mode
        const isDev = process.env.NODE_ENV === "development";
        
        if (!isDev) {
            const now = Date.now();
            const rateLimitInfo = rateLimitMap.get(ip) || { count: 0, lastReset: now };

            if (now - rateLimitInfo.lastReset > RATE_LIMIT_WINDOW_MS) {
                rateLimitInfo.count = 0;
                rateLimitInfo.lastReset = now;
            }

            if (rateLimitInfo.count >= RATE_LIMIT_MAX) {
                console.warn(`Rate limit exceeded for IP: ${ip}`);
                return NextResponse.json(
                    { error: "Too many requests. Please try again later." },
                    { status: 429 }
                );
            }

            rateLimitInfo.count += 1;
            rateLimitMap.set(ip, rateLimitInfo);
        }

        // --- VALIDATION AND SANITIZATION ---
        let body;
        try {
            body = await req.json();
        } catch (err) {
            return NextResponse.json(
                { error: "Invalid JSON body provided" },
                { status: 400 }
            );
        }

        // Validate structure and extract with Zod
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0]?.message || "Invalid input" },
                { status: 400 }
            );
        }

        const { name, email, subject, message, website } = result.data;

        // --- HONEYPOT ANTI-SPAM ---
        if (website) {
            console.log(`Bot detected via honeypot from IP: ${ip}`);
            // Silently return success to bot without saving anything
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // --- SANITIZE PAYLOAD ---
        const cleanName = escapeHTML(name);
        const cleanEmail = escapeHTML(email);
        const cleanSubject = subject ? escapeHTML(subject) : "";
        const cleanMessage = escapeHTML(message);

        // --- SAVE TO SANITY ---
        const doc = await client.create({
            _type: "contactSubmission",
            name: cleanName,
            email: cleanEmail,
            subject: cleanSubject,
            message: cleanMessage,
            submittedAt: new Date().toISOString(),
            read: false,
        });

        // --- SEND EMAIL NOTIFICATION ---
        await resend.emails.send({
            from: "Portfolio Contact <noreply@shakirjoy.xyz>",
            to: ["info@shakirjoy.xyz", "portfolio@minionpri.resend.app"],
            subject: cleanSubject ? `Contact: ${cleanSubject}` : `New message from ${cleanName}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${cleanName}</p>
                <p><strong>Email:</strong> ${cleanEmail}</p>
                <p><strong>Subject:</strong> ${cleanSubject || "—"}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space:pre-wrap">${cleanMessage}</p>
            `,
        });

        return NextResponse.json(
            { success: true, id: doc._id },
            { status: 201 }
        );
    } catch (error: any) {
        // Log to server only, do not leak details to client
        console.error("Contact form error:", error.message || error);
        return NextResponse.json(
            { error: "Failed to submit. Please try again." },
            { status: 500 }
        );
    }
}

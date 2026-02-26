import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2024-02-28",
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        // Validate
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // Create document in Sanity
        const doc = await client.create({
            _type: "contactSubmission",
            name,
            email,
            subject: subject || "",
            message,
            submittedAt: new Date().toISOString(),
            read: false,
        });

        return NextResponse.json(
            { success: true, id: doc._id },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to submit. Please try again." },
            { status: 500 }
        );
    }
}

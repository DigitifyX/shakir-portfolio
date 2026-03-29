"use client";

import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("@/app/components/Testimonials"), {
  ssr: false,
});

export default Testimonials;

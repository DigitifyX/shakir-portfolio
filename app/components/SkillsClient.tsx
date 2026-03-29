"use client";

import dynamic from "next/dynamic";

const Skills = dynamic(() => import("@/app/components/Skills"), {
  ssr: false,
});

export default Skills;

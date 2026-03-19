import Image from "next/image";

const starPositions = [
  { top: "-10%", left: "20%", size: 16 },
  { top: "0%", right: "-5%", size: 20 },
  { top: "30%", right: "-15%", size: 14 },
  { top: "60%", right: "-10%", size: 18 },
  { top: "80%", left: "30%", size: 12 },
  { top: "70%", left: "-10%", size: 16 },
  { top: "40%", left: "-15%", size: 20 },
  { top: "10%", left: "-5%", size: 14 },
  { top: "50%", right: "0%", size: 22 },
  { top: "-5%", left: "50%", size: 18 },
];

function SparkleStars() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {starPositions.map((pos, i) => (
        <div
          key={i}
          className="absolute sparkle-star"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            width: pos.size,
            height: pos.size,
            animationDelay: `${(i % 5) * 0.35}s`,
            animationDuration: `${1.8 + (i % 4) * 0.4}s`,
          }}
        >
          <Image
            src={`/assets/icons/star${(i % 4) + 1}.svg`}
            alt="star"
            width={pos.size}
            height={pos.size}
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}

function CodeEditor() {
  return (
    <div className="relative w-full max-w-[500px] lg:max-w-[480px] xl:max-w-[520px] mx-auto lg:mx-0 animate-hero-fade-right">
      <div
        className="group relative rounded-xl overflow-hidden border border-transparent"
        style={{ background: "var(--color-code-bg)" }}
      >
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle 220px at 50% 35%, rgba(var(--glow-accent-rgb), var(--glow-accent-intensity)), transparent)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude" as any,
            WebkitMaskComposite: "xor",
            padding: "1.5px",
          }}
        />
        <div className="absolute inset-0 rounded-xl border border-cyan-500/20 pointer-events-none" />

        <div
          className="relative z-10 flex items-center gap-2 px-4 py-3 border-b border-white/10"
          style={{ background: "var(--color-code-header)" }}
        >
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-4 text-sm text-gray-400">developer.js</span>
        </div>

        <div className="relative z-10 p-4 md:p-5 font-mono text-[11px] md:text-xs overflow-x-auto h-auto">
          <pre className="text-gray-300">
            <code>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-300">profile</span>{" "}
              <span className="text-white">=</span>{" "}
              <span className="text-yellow-300">{"{"}</span>
              {"\n"}
              {"  "}<span className="text-red-400">name</span>:{" "}
              <span className="text-green-400">&apos;Shakir Ahmed&apos;</span>,
              {"\n"}
              {"  "}<span className="text-red-400">title</span>:{" "}
              <span className="text-green-400">&apos;Full-Stack Developer | Problem Solver&apos;</span>,
              {"\n"}
              {"  "}<span className="text-red-400">skills</span>:{" "}
              <span className="text-yellow-300">[</span>
              {"\n"}
              {"    "}<span className="text-green-400">&apos;React&apos;</span>,{" "}
              <span className="text-green-400">&apos;NextJS&apos;</span>,{" "}
              <span className="text-green-400">&apos;Redux&apos;</span>,{" "}
              <span className="text-green-400">&apos;Express&apos;</span>,
              {"\n"}
              {"    "}<span className="text-green-400">&apos;MySQL&apos;</span>,{" "}
              <span className="text-green-400">&apos;MongoDB&apos;</span>,{" "}
              <span className="text-green-400">&apos;Docker&apos;</span>,{" "}
              <span className="text-green-400">&apos;TypeScript&apos;</span>,
              {"\n"}
              {"  "}<span className="text-yellow-300">]</span>,
              {"\n"}
              {"  "}<span className="text-red-400">hardWorker</span>:{" "}
              <span className="text-orange-400">true</span>,
              {"\n"}
              {"  "}<span className="text-red-400">quickLearner</span>:{" "}
              <span className="text-orange-400">true</span>,
              {"\n"}
              {"  "}<span className="text-red-400">problemSolver</span>:{" "}
              <span className="text-orange-400">true</span>,
              {"\n"}
              {"  "}<span className="text-red-400">yearsOfExperience</span>:{" "}
              <span className="text-cyan-400">4</span>,
              {"\n"}
              {"  "}<span className="text-red-400">hireable</span>:{" "}
              <span className="text-purple-400">function</span>
              <span className="text-yellow-300">()</span>{" "}
              <span className="text-yellow-300">{"{"}</span>
              {"\n"}
              {"    "}<span className="text-purple-400">return</span> (
              {"\n"}
              {"      "}<span className="text-cyan-400">this</span>.
              <span className="text-blue-300">hardWorker</span>{" "}
              <span className="text-white">&&</span>
              {"\n"}
              {"      "}<span className="text-cyan-400">this</span>.
              <span className="text-blue-300">problemSolver</span>{" "}
              <span className="text-white">&&</span>
              {"\n"}
              {"      "}<span className="text-cyan-400">this</span>.
              <span className="text-blue-300">skills</span>.
              <span className="text-yellow-300">length</span>{" "}
              <span className="text-white">&gt;=</span>{" "}
              <span className="text-cyan-400">5</span>{" "}
              <span className="text-white">&&</span>
              {"\n"}
              {"      "}<span className="text-cyan-400">this</span>.
              <span className="text-blue-300">yearsOfExperience</span>{" "}
              <span className="text-white">&gt;=</span>{" "}
              <span className="text-cyan-400">3</span>
              {"\n"}
              {"    "});
              {"\n"}
              {"  "}<span className="text-yellow-300">{"}"}</span>
              {"\n"}
              <span className="text-yellow-300">{"}"}</span>;
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export interface HeroProps {
  badge?: string;
  heading?: string;
  subheading?: string;
}

export default function Hero({ badge, heading, subheading }: HeroProps) {
  const verticalLights = Array.from({ length: 50 }).map((_, i) => ({
    left: (i + 1) * 80,
    duration: `${(i % 5) + 4 + (i % 3) * 0.5}s`,
    delay: `${(i % 7) * 0.5}s`,
  }));

  return (
    <section id="hero" className="relative pt-[100px] pb-[35px] md:h-[800px] md:py-0 md:pt-[164px] overflow-hidden hero-bg grid-pattern">
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {verticalLights.map((light, index) => (
          <div
            key={index}
            className="vertical-line-light"
            style={{
              left: `${light.left}px`,
              animationDuration: light.duration,
              animationDelay: light.delay,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-secondary/50 border border-white/10 mb-4 md:mb-6 animate-hero-fade-up">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {badge || "Welcome to my universe"}
              </span>
            </div>

            <div className="animate-hero-fade-up [animation-delay:120ms]">
              <div className="relative inline-block">
                <h1 className="hero-heading font-bold mb-1 md:mb-2" style={{ color: "var(--color-text-heading)" }}>
                  Hello
                </h1>
                <SparkleStars />
              </div>
              <h1 className="hero-heading font-bold whitespace-nowrap" style={{ color: "var(--color-text-heading)" }}>
                {heading ? (
                  heading.includes("Shakir Ahmed") ? (
                    <>
                      {heading.split("Shakir Ahmed")[0]}
                      <span className="gradient-text ml-2">Shakir Ahmed</span>
                      {heading.split("Shakir Ahmed")[1]}
                    </>
                  ) : (
                    <span className="gradient-text">{heading}</span>
                  )
                ) : (
                  <>I&apos;m <span className="gradient-text">Shakir Ahmed</span></>
                )}
              </h1>
            </div>

            <div className="mt-5 md:mt-6 animate-hero-fade-up [animation-delay:220ms]">
              <span className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium">
                Full-Stack Developer & Problem Solver
              </span>
            </div>

            <p
              className="mt-4 md:mt-5 text-sm md:text-base max-w-md animate-hero-fade-up [animation-delay:320ms]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {subheading || "JavaScript lover | React & Next.js enthusiast | Crafting beautiful web experiences and coding the future"}
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap gap-4 animate-hero-fade-up [animation-delay:420ms]">
              <a
                href="#projects"
                className="group relative px-7 py-3 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--glow-accent-rgb),var(--glow-bg-intensity))]"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                }}
              >
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>

              <a
                href="#contact"
                className="group relative px-7 py-3 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--glow-accent-rgb),0.08)]"
                style={{ color: "var(--color-text-primary)" }}
              >
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{
                    padding: "2px",
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <span className="relative z-10">Get Resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
            </div>
          </div>

          <CodeEditor />
        </div>
      </div>
    </section>
  );
}

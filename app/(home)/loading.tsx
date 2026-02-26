/* ============================================
   💀 HOMEPAGE SKELETON
   Mirrors the layout of all 7 sections while
   Sanity data is loading.
   ============================================ */

export default function HomeLoading() {
    return (
        <main className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>

            {/* ─── Navbar Skeleton ─── */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
                style={{ background: 'var(--color-bg-primary)', borderBottom: '1px solid var(--color-border)' }}>
                <div className="skeleton skeleton-heading w-24 h-8" />
                <div className="hidden md:flex items-center gap-6">
                    {[80, 60, 70, 90, 100, 70].map((w, i) => (
                        <div key={i} className="skeleton skeleton-text" style={{ width: w }} />
                    ))}
                </div>
                <div className="skeleton skeleton-circle w-9 h-9" />
            </nav>

            {/* ─── Hero Skeleton ─── */}
            <section className="relative pt-[100px] pb-[35px] md:pt-[164px] md:pb-[80px] hero-bg">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left */}
                        <div className="space-y-6">
                            {/* Badge */}
                            <div className="skeleton w-52 h-9 rounded-full" />
                            {/* Headings */}
                            <div className="space-y-3">
                                <div className="skeleton skeleton-heading w-32 h-10" />
                                <div className="skeleton skeleton-heading w-80 h-10 max-w-full" />
                            </div>
                            {/* Skill tag */}
                            <div className="skeleton w-72 h-10 rounded-full max-w-full" />
                            {/* Description */}
                            <div className="space-y-2 max-w-md">
                                <div className="skeleton skeleton-text w-full" />
                                <div className="skeleton skeleton-text w-11/12" />
                                <div className="skeleton skeleton-text w-3/4" />
                            </div>
                            {/* Buttons */}
                            <div className="flex gap-4 pt-2">
                                <div className="skeleton w-32 h-12 rounded-xl" />
                                <div className="skeleton w-32 h-12 rounded-xl" />
                            </div>
                        </div>
                        {/* Right — Code editor */}
                        <div className="skeleton w-full max-w-[520px] mx-auto lg:mx-0 rounded-xl"
                            style={{ height: 380, background: 'var(--color-code-bg)', border: '1px solid rgba(6,182,212,0.2)' }}>
                            {/* Editor header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10"
                                style={{ background: 'var(--color-code-header)' }}>
                                <div className="flex gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
                                    <span className="w-3 h-3 rounded-full" style={{ background: '#eab308' }} />
                                    <span className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
                                </div>
                                <div className="skeleton skeleton-text w-24 ml-4 h-3" />
                            </div>
                            {/* Code lines */}
                            <div className="p-5 space-y-3">
                                {[90, 75, 60, 85, 50, 70, 80, 65, 55, 40, 75, 60].map((w, i) => (
                                    <div key={i} className="skeleton skeleton-text" style={{ width: `${w}%`, height: 10 }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── About Skeleton ─── */}
            <section className="py-[35px] md:py-[60px]">
                <div className="container mx-auto">
                    {/* Heading */}
                    <div className="mb-16 md:mb-20 space-y-3">
                        <div className="skeleton skeleton-heading w-96 max-w-full h-12" />
                        <div className="skeleton skeleton-heading w-64 max-w-full h-12" />
                    </div>
                    {/* Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                        {/* Image */}
                        <div className="skeleton w-full aspect-square rounded-xl"
                            style={{ background: 'var(--color-code-bg)', border: '1px solid rgba(6,182,212,0.2)' }} />
                        {/* Text */}
                        <div className="space-y-5">
                            <div className="space-y-3">
                                {[100, 95, 90, 85, 70].map((w, i) => (
                                    <div key={i} className="skeleton skeleton-text" style={{ width: `${w}%` }} />
                                ))}
                            </div>
                            <div className="space-y-3">
                                {[100, 90, 80, 60].map((w, i) => (
                                    <div key={i} className="skeleton skeleton-text" style={{ width: `${w}%` }} />
                                ))}
                            </div>
                            {/* Quote */}
                            <div className="pl-6 relative mt-4">
                                <div className="absolute left-0 top-0 bottom-0 w-1 skeleton rounded-full" style={{ background: 'var(--color-border)' }} />
                                <div className="space-y-2">
                                    {[95, 85, 70].map((w, i) => (
                                        <div key={i} className="skeleton skeleton-text" style={{ width: `${w}%` }} />
                                    ))}
                                </div>
                            </div>
                            {/* Signature */}
                            <div className="mt-6 space-y-2">
                                <div className="skeleton skeleton-text w-28" />
                                <div className="skeleton w-36 h-10 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Skills Skeleton ─── */}
            <section className="section-padding">
                <div className="container mx-auto text-center">
                    {/* Heading + subheading */}
                    <div className="mx-auto mb-12 space-y-3">
                        <div className="skeleton skeleton-heading w-64 h-10 mx-auto" />
                        <div className="skeleton skeleton-text w-80 mx-auto max-w-full" />
                    </div>
                    {/* Icon cloud placeholder */}
                    <div className="skeleton skeleton-circle w-72 h-72 md:w-96 md:h-96 mx-auto mb-16" />
                    {/* Skill cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="skeleton skeleton-card" style={{ minHeight: 180 }}>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="skeleton skeleton-circle w-10 h-10" style={{ background: 'var(--color-border)' }} />
                                        <div className="skeleton skeleton-text w-28" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {[60, 50, 70, 45, 55].map((w, j) => (
                                            <div key={j} className="skeleton h-7 rounded-full" style={{ width: w, background: 'var(--color-border)' }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Projects Skeleton ─── */}
            <section className="section-padding">
                <div className="container mx-auto">
                    {/* Heading + subheading */}
                    <div className="text-center mb-12 space-y-3">
                        <div className="skeleton skeleton-heading w-56 h-10 mx-auto" />
                        <div className="skeleton skeleton-text w-96 mx-auto max-w-full" />
                    </div>
                    {/* Filter tabs */}
                    <div className="flex justify-center gap-3 mb-10 flex-wrap">
                        {[50, 45, 55, 50, 72].map((w, i) => (
                            <div key={i} className="skeleton h-9 rounded-full" style={{ width: w }} />
                        ))}
                    </div>
                    {/* Project cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="skeleton skeleton-card" style={{ padding: 0, overflow: 'hidden' }}>
                                {/* Image placeholder */}
                                <div className="skeleton w-full" style={{ height: 200, borderRadius: '12px 12px 0 0', background: 'var(--color-border)' }} />
                                <div className="p-5 space-y-3">
                                    <div className="skeleton skeleton-heading w-3/4 h-5" />
                                    <div className="space-y-2">
                                        <div className="skeleton skeleton-text w-full" />
                                        <div className="skeleton skeleton-text w-5/6" />
                                    </div>
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {[52, 60, 48].map((w, j) => (
                                            <div key={j} className="skeleton h-6 rounded-full" style={{ width: w }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Testimonials Skeleton ─── */}
            <section className="section-padding overflow-hidden">
                <div className="container mx-auto">
                    {/* Heading + subheading */}
                    <div className="text-center mb-12 space-y-3">
                        <div className="skeleton skeleton-heading w-72 h-10 mx-auto" />
                        <div className="skeleton skeleton-text w-80 mx-auto max-w-full" />
                    </div>
                    {/* Marquee rows */}
                    {[0, 1].map((row) => (
                        <div key={row} className="flex gap-6 mb-6">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="skeleton skeleton-card flex-shrink-0" style={{ width: 320, minHeight: 180 }}>
                                    <div className="space-y-4">
                                        {/* Stars */}
                                        <div className="flex gap-1">
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <div key={j} className="skeleton w-4 h-4 rounded-sm" style={{ background: 'var(--color-border)' }} />
                                            ))}
                                        </div>
                                        {/* Text */}
                                        <div className="space-y-2">
                                            <div className="skeleton skeleton-text w-full" />
                                            <div className="skeleton skeleton-text w-5/6" />
                                            <div className="skeleton skeleton-text w-3/4" />
                                        </div>
                                        {/* Author */}
                                        <div className="flex items-center gap-3 pt-2">
                                            <div className="skeleton skeleton-circle w-10 h-10" style={{ background: 'var(--color-border)' }} />
                                            <div className="space-y-1">
                                                <div className="skeleton skeleton-text w-24" />
                                                <div className="skeleton skeleton-text w-16 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Contact Skeleton ─── */}
            <section className="section-padding">
                <div className="container mx-auto">
                    {/* Heading + subheading */}
                    <div className="text-center mb-12 space-y-3">
                        <div className="skeleton skeleton-heading w-48 h-10 mx-auto" />
                        <div className="skeleton skeleton-text w-72 mx-auto max-w-full" />
                    </div>
                    {/* Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Left — info cards */}
                        <div className="space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="skeleton skeleton-card flex items-center gap-4">
                                    <div className="skeleton skeleton-circle w-12 h-12 flex-shrink-0" style={{ background: 'var(--color-border)' }} />
                                    <div className="space-y-2 flex-1">
                                        <div className="skeleton skeleton-text w-20" />
                                        <div className="skeleton skeleton-text w-40" />
                                    </div>
                                </div>
                            ))}
                            {/* Social links */}
                            <div className="flex gap-3 pt-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="skeleton w-10 h-10 rounded-xl" />
                                ))}
                            </div>
                        </div>
                        {/* Right — form */}
                        <div className="skeleton skeleton-card space-y-5" style={{ padding: 32 }}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="skeleton h-12 rounded-lg" style={{ background: 'var(--color-border)' }} />
                                <div className="skeleton h-12 rounded-lg" style={{ background: 'var(--color-border)' }} />
                            </div>
                            <div className="skeleton h-12 rounded-lg" style={{ background: 'var(--color-border)' }} />
                            <div className="skeleton h-32 rounded-lg" style={{ background: 'var(--color-border)' }} />
                            <div className="skeleton w-full h-12 rounded-xl" style={{ background: 'var(--color-border)' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Footer Skeleton ─── */}
            <footer className="pb-8 pt-4">
                {/* Divider */}
                <div className="skeleton h-px mx-auto mb-12" style={{ maxWidth: 'var(--container-max)', background: 'var(--color-border)' }} />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                        <div className="skeleton skeleton-heading w-28 h-8" />
                        <div className="flex gap-6">
                            {[40, 45, 40, 55, 70, 50].map((w, i) => (
                                <div key={i} className="skeleton skeleton-text hidden md:block" style={{ width: w }} />
                            ))}
                        </div>
                        <div className="flex gap-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="skeleton w-10 h-10 rounded-xl" />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="skeleton skeleton-text w-48" />
                        <div className="skeleton w-20 h-7 rounded-lg" />
                    </div>
                </div>
            </footer>
        </main>
    );
}

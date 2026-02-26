/* ============================================
   💀 PORTFOLIO PAGE SKELETON
   Mirrors the project grid layout while
   Sanity data is loading.
   ============================================ */

export default function PortfolioLoading() {
    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8">
            {/* Title */}
            <div className="skeleton skeleton-heading w-56 h-10 mb-8" />

            {/* Project grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="skeleton skeleton-card" style={{ padding: 16 }}>
                        {/* Image placeholder */}
                        <div className="skeleton w-full mb-4 rounded-md" style={{ height: 192, background: 'var(--color-border)' }} />
                        {/* Title */}
                        <div className="skeleton skeleton-heading w-3/4 h-6 mb-3" />
                        {/* Description */}
                        <div className="space-y-2 mb-4">
                            <div className="skeleton skeleton-text w-full" />
                            <div className="skeleton skeleton-text w-5/6" />
                            <div className="skeleton skeleton-text w-2/3" />
                        </div>
                        {/* Link */}
                        <div className="skeleton skeleton-text w-28 h-4" />
                    </div>
                ))}
            </div>
        </main>
    );
}

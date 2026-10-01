export function ShortlistedTeamsBanner() {
  return (
    <section
      aria-label="Shortlisted teams announcement"
      className="relative z-10 overflow-hidden border-y border-intel-blue/30 bg-black/70 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-black shadow-[0_4px_20px_rgba(0,0,0,0.8)]" />
      <div className="absolute inset-x-0 bottom-0 h-2 bg-black shadow-[0_-4px_20px_rgba(0,0,0,0.8)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.2),transparent_65%)]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="mb-5 flex items-center gap-3 text-[10px] font-mono font-bold tracking-[0.35em] text-intel-blue-light uppercase sm:text-xs">
          <span className="h-px w-10 bg-intel-blue-light/60 sm:w-16" />
          Official Transmission
          <span className="h-px w-10 bg-intel-blue-light/60 sm:w-16" />
        </div>
        <p className="text-xs font-mono tracking-[0.3em] text-white/60 uppercase sm:text-sm">
          Shortlisted teams will be announced soon
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-[0.15em] text-white uppercase drop-shadow-[0_0_18px_rgba(0,102,255,0.45)] sm:text-5xl">
          Stay Tuned
        </h2>
        <div className="mt-6 border border-power-red/60 bg-power-red/10 px-6 py-2 text-sm font-mono font-bold tracking-[0.3em] text-power-red-light uppercase shadow-[0_0_25px_rgba(255,0,51,0.25)] sm:px-8 sm:text-base">
          October 2
        </div>
      </div>
    </section>
  )
}

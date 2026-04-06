export function PhysicsScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[8%] top-[14%] h-44 w-44 animate-orbit rounded-full border border-cyan-300/20" />
      <div className="absolute left-[8%] top-[14%] h-44 w-44 animate-orbitReverse rounded-full border border-cyan-300/10 [animation-duration:13s]" />
      <div className="absolute left-[11%] top-[17%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.95)]" />
      <div className="absolute right-[10%] top-[18%] h-px w-40 animate-wave bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
      <div className="absolute right-[12%] top-[20%] h-px w-56 animate-wave bg-gradient-to-r from-transparent via-white/60 to-transparent [animation-delay:0.6s]" />
      <div className="absolute bottom-[20%] left-[6%] text-5xl font-semibold text-cyan-200/40 animate-floatPhysics">β</div>
      <div className="absolute bottom-[27%] right-[8%] text-3xl text-white/20 animate-floatPhysics [animation-delay:1.2s]">E = mc²</div>
      <div className="absolute left-[48%] top-[12%] text-2xl text-cyan-100/20 animate-floatPhysics [animation-delay:0.4s]">λ</div>
      <div className="absolute left-[62%] top-[68%] text-2xl text-white/15 animate-floatPhysics [animation-delay:1.8s]">Δt</div>
      <div className="absolute inset-x-[28%] bottom-[16%] h-24 rounded-full bg-cyan-400/10 blur-3xl" />
    </div>
  );
}

export function Ambiance() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-24 size-[520px] rounded-full bg-clay/30 blur-3xl" />
      <div className="absolute top-1/3 -right-32 size-[460px] rounded-full bg-sage/25 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 size-[380px] rounded-full bg-haze/40 blur-3xl" />
    </div>
  );
}

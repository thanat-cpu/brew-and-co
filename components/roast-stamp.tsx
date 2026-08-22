export function RoastStamp({
  label = "SPECIALTY GRADE · EST. 2015",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={[
        "flex h-24 w-24 shrink-0 -rotate-6 items-center justify-center rounded-full",
        "bg-espresso p-3 text-center shadow-raised",
        className,
      ].join(" ")}
    >
      <span className="font-mono-data text-[9px] uppercase leading-tight tracking-wider text-cream">
        {label}
      </span>
    </div>
  );
}

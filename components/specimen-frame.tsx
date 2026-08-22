import Image from "next/image";

export function SpecimenFrame({
  src,
  alt,
  size = "lg",
  aspect = "aspect-square",
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  size?: "md" | "lg";
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const outerRadius = size === "lg" ? "rounded-2xl p-3" : "rounded-xl p-2";
  const innerRadius = size === "lg" ? "rounded-xl" : "rounded-lg";

  return (
    <div className={`bg-paper ${outerRadius} ${className}`}>
      <div className={`relative overflow-hidden ${innerRadius} ${aspect} bg-sage`}>
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? "(min-width: 768px) 50vw, 100vw"}
            priority={priority}
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}

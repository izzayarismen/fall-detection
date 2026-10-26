import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  showName?: boolean;
  src?: string;
};

export function BrandLogo({
  className,
  imageClassName,
  textClassName,
  showName = true,
  src = "/icon.png",
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img
        src={src}
        alt="Logo Rumi"
        width={512}
        height={512}
        className={cn("size-10 shrink-0 object-contain", imageClassName)}
      />
      {showName && (
        <span className={cn("font-display text-xl font-bold tracking-tight", textClassName)}>
          Rumi
        </span>
      )}
    </span>
  );
}

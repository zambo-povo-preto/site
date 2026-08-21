import svgPaths from "@/imports/Group36/svg-hkzbekptio";

export function ArrowIcon({
  color = "#121212",
  size = 28,
}: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      role="img"
      aria-label="Seta"
    >
      <path d={svgPaths.p3e0d45f0} fill={color} stroke={color} />
    </svg>
  );
}

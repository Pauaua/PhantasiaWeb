interface LogoProps {
  size?: number;
  variant?: "default" | "light" | "brand" | "mono" | "ghost";
  showWordmark?: boolean;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

const strokeColors: Record<string, string> = {
  default: "var(--brand)",
  light: "var(--brand)",
  brand: "#FFFFFF",
  mono: "var(--text-1)",
  ghost: "rgba(255,255,255,0.35)",
};

export default function Logo({
  size = 48,
  variant = "default",
  showWordmark = true,
  orientation = "horizontal",
  className = "",
}: LogoProps) {
  const stroke = strokeColors[variant];
  const textColor =
    variant === "brand"
      ? "#FFFFFF"
      : variant === "ghost"
      ? "rgba(255,255,255,0.35)"
      : "var(--text-1)";
  const aColor =
    variant === "brand"
      ? "rgba(255,255,255,0.65)"
      : variant === "ghost"
      ? "rgba(255,255,255,0.2)"
      : "var(--brand)";

  // Scale stroke width based on size
  const sw = size >= 60 ? 1.4 : size >= 36 ? 1.2 : size >= 24 ? 1.1 : 1;

  // Phi Lineal Diamante SVG — viewBox 0 0 56 56
  const svgEl = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Phantasia logo"
    >
      {/* Vertical line */}
      <line
        x1="28"
        y1="2"
        x2="28"
        y2="54"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Circle */}
      <circle
        cx="28"
        cy="28"
        r="19"
        stroke={stroke}
        strokeWidth={sw}
        fill="none"
      />
      {/* Diamond */}
      <polygon
        points="28,22 33,28 28,34 23,28"
        stroke={stroke}
        strokeWidth={sw}
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (!showWordmark) return <span className={className}>{svgEl}</span>;

  if (orientation === "vertical") {
    return (
      <div
        className={`flex flex-col items-center gap-3 ${className}`}
        style={{ userSelect: "none" }}
      >
        {svgEl}
        <span
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: size * 0.35,
            letterSpacing: "0.25em",
            color: textColor,
            fontWeight: 400,
          }}
        >
          PHANT
          <span style={{ color: aColor }}>A</span>
          SIA
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      style={{ userSelect: "none" }}
    >
      {svgEl}
      {/* Divider */}
      <div
        style={{
          width: 1,
          height: size * 0.5,
          background: stroke,
          opacity: 0.3,
        }}
      />
      <span
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: size * 0.3,
          letterSpacing: "0.22em",
          color: textColor,
          fontWeight: 400,
        }}
      >
        PHANT
        <span style={{ color: aColor }}>A</span>
        SIA
      </span>
    </div>
  );
}

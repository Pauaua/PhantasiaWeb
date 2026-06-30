"use client";

import { useState } from "react";

interface GalleryImage { src: string; alt: string; }
interface Colors { border: string; bg2: string; }

export default function BarberGallery({
  images,
  colors: C,
}: {
  images: GalleryImage[];
  colors: Colors;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1rem",
      }}>
        {images.map((img) => (
          <div
            key={img.src}
            onClick={() => setActive(img.src)}
            style={{
              aspectRatio: "4/3",
              overflow: "hidden",
              borderRadius: "4px",
              cursor: "pointer",
              border: `1px solid ${C.border}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease, filter 0.3s",
                filter: "brightness(0.85)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
                (e.currentTarget as HTMLImageElement).style.filter = "brightness(1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.85)";
              }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "2rem",
            cursor: "zoom-out",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active}
            alt="Vista ampliada"
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: "4px",
            }}
          />
        </div>
      )}
    </>
  );
}

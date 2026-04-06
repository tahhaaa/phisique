import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Physique Premium",
    short_name: "Physique",
    description: "Plateforme de réservation pour un professeur de physique.",
    start_url: "/",
    display: "standalone",
    background_color: "#05131e",
    theme_color: "#082335",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

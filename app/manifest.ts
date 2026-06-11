import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Healthy Futures",
    short_name: "Healthy Futures",
    description: "Discover, connect, and empower Black-owned businesses in your community.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5EFE6",
    theme_color: "#3B1F0A",
    orientation: "portrait",
    categories: ["business", "shopping"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

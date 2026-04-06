"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        style: {
          background: "rgba(8, 35, 53, 0.96)",
          color: "#f8fafc",
          border: "1px solid rgba(255,255,255,0.12)",
        },
      }}
    />
  );
}

"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js?v=2", { updateViaCache: "none" }).catch(() => null);
    }
  }, []);

  return null;
}

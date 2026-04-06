"use client";

import { useEffect } from "react";

export function NotificationProvider() {
  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    if (Notification.permission === "default") {
      Notification.requestPermission().catch(() => null);
    }
  }, []);

  return null;
}

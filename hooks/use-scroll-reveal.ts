"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollReveal<T extends Element>() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

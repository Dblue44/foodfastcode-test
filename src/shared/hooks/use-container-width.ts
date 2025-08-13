import { useState, useEffect, useRef } from "react";

export function useContainerWidth(threshold: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setIsNarrow(width < threshold);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isNarrow };
}
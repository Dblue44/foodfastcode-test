import type {AutoHeightSectionProps} from "@features/menuSettings/types.ts";
import { motion } from "motion/react";
import {useEffect, useRef, useState} from "react";

function useAutoHeight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // первичная установка
    setHeight(el.offsetHeight);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // надёжнее считать offsetHeight (cross-browser)
        setHeight((entry.target as HTMLElement).offsetHeight);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, height, setHeight };
}

export function AutoHeightSection({ collapsed = false, children }: AutoHeightSectionProps) {
  const { ref, height } = useAutoHeight<HTMLDivElement>();

  return (
    <motion.div
      initial={{ height: collapsed ? 0 : height, opacity: collapsed ? 0 : 1 }}
      animate={{ height: collapsed ? 0 : height, opacity: collapsed ? 0 : 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        height: { duration: 0.28, ease: [0.22, 0.61, 0.36, 1] },
        opacity: { duration: 0.18, ease: "easeOut" },
      }}
      className="overflow-hidden"
    >
      <div ref={ref}>
        {children}
      </div>
    </motion.div>
  );
}
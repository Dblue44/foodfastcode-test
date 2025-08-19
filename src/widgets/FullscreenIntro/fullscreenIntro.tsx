import {useEffect, useState} from "react";
import {BlurText} from "@shared/ui/reactBits";

export function FullscreenIntro({
  text = "Добро пожаловать в FastFoodCode",
  onDone,
  stayMs = 1500,
  fadeMs = 400,
}: {
  text?: string;
  onDone?: () => void;
  stayMs?: number;
  fadeMs?: number;
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setHidden(true);
      const t2 = window.setTimeout(() => onDone?.(), fadeMs);
      return () => window.clearTimeout(t2);
    }, stayMs);
    return () => window.clearTimeout(t);
  }, [stayMs, fadeMs, onDone]);

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-background/90 backdrop-blur",
        "transition-opacity",
        hidden ? "opacity-0 pointer-events-none" : "opacity-100",
      ].join(" ")}
      aria-hidden={hidden}
    >
      <div className="px-6">
        <BlurText
          text={text}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground select-none"
        />
      </div>
    </div>
  );
}

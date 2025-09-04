import {type ViewButtonBaseProps, ViewButtonBasePropsSchema} from "@features/menuSettings/types.ts";
import {Button} from "@shared/ui/button.tsx";
import {cn} from "@shared/lib";
import { motion } from "motion/react";

export function CategoryBadgeViewButton(props: ViewButtonBaseProps) {
  ViewButtonBasePropsSchema.parse(props);
  const { selected, onSelect, className } = props;

  const spanClassName = selected
    ? "bg-primary-foreground border-primary/20 shadow-black/30"
    : "bg-primary border-border";

  const baseClassName = "h-7 w-13 rounded-xl border shadow-md shadow-primary/20"

  return (
    <Button
      type="button"
      onClick={onSelect}
      variant={selected ? "default" : "outline"}
      className={cn(
        "h-22 w-36 rounded-xl border p-3.5", // базовые стили
        selected ? "border-transparent" : "border-border", // фиксируем толщину границы
        className
      )}
    >
      <div className="flex flex-wrap gap-2 justify-between">
        <motion.span
          className={cn(baseClassName, spanClassName)}
          initial={false}
          animate={selected ? {
            y: 36,
            transition: {
              duration: 0.4,
              ease: "easeInOut",
              delay: 0.2,
            }
          } : {
            y: 0,
            transition: {
              duration: 0.4,
              ease: "easeInOut",
              delay: 0.3,
            }
          }}
        />

        <motion.span
          className={cn(baseClassName, spanClassName)}
          initial={false}
          animate={selected ? {
            x: -63,
            transition: {
              duration: 0.4,
              ease: "easeInOut",
              delay: 0.35,
            }
          } : {
            x: 0,
            transition: {
              duration: 0.4,
              ease: "easeInOut",
              delay: 0.2,
            }
          }}
        />

        <motion.span
          className={cn(baseClassName, spanClassName)}
          initial={false}
          animate={selected ? {
            x: [0, 63, 63], // сначала вправо, потом остается
            y: [0, 0, -36],
            transition: {
              duration: 0.75,
              ease: "easeInOut",
              delay: 0.1,
            }
          } : {
            x: [63, 63, 0], // сначала вправо, потом остается
            y: [-36, 0, 0],
            transition: {
              duration: 0.75,
              ease: "easeInOut",
            }
          }}
        />
      </div>
    </Button>
  );
}
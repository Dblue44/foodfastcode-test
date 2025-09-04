import {Button} from "@shared/ui/button.tsx";
import {type ViewButtonBaseProps, ViewButtonBasePropsSchema} from "@features/menuSettings/types.ts";
import {cn} from "@shared/lib";
import { motion } from "motion/react";


export function CategoryCardViewButton(props: ViewButtonBaseProps) {
  ViewButtonBasePropsSchema.parse(props);
  const { selected, onSelect, className } = props;

  const spanClassName = selected
    ? "bg-primary-foreground border-primary/20 shadow-black/30"
    : "bg-primary border-border";

  const baseClassName = "h-7 rounded-md bg-muted border border-border"

  return (
    <Button
      type="button"
      onClick={onSelect}
      variant={selected ? "default" : "outline"}
      className={cn(
        "h-22 w-36 rounded-xl border p-3",
        selected ? "border-transparent" : "border-border",
        className
      )}
    >
      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">
        <motion.div
          className={cn(baseClassName, spanClassName)}
          initial={false}
          animate={selected ? {
            y: 36,
            transition: {
              duration: 0.65,
              ease: "easeInOut",
              delay: 0.20
            }
          } : {
            y: 0,
            transition: {
              duration: 0.85,
              ease: "easeInOut",
              delay: 0.15
            }
          }}
        />

        <motion.div
          className={cn("rounded-md bg-muted border border-border col-start-2 row-span-2", spanClassName)}
          initial={false}
          animate={selected ? {
            height: ["63.5px", "28px", "28px"],
            x: [0, 0, -63],
            transition: {
              duration: 0.9,
              ease: "easeInOut"
            }
          } : {
            height: ["28px", "28px", "63.5px"],
            x: [-63, 0, 0],
            transition: {
              duration: 0.9,
              ease: "easeInOut",
              delay: 0.15
            }
          }}
          style={{ originY: 0 }}
        />

        <motion.div
          className={cn("rounded-md bg-muted border border-border", spanClassName)}
          initial={false}
          animate={selected ? {
            x: [0, 63, 63],
            y: [0, 0, -36],
            height: ["28px", "28px", "63.5px"],
            transition: {
              duration: 0.9,
              ease: "easeInOut",
              delay: 0.15
            }
          } : {
            x: [63, 63, 0],
            y: [-36, 0, 0],
            height: ["63.5px", "28px","28px" ],
            transition: {
              duration: 0.9,
              ease: "easeInOut"
            }
          }}
          style={{ originY: 0 }}
        />
      </div>
    </Button>
  );
}
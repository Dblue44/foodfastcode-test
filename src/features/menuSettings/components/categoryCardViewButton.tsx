import {Button} from "@shared/ui/button.tsx";
import {type ViewButtonBaseProps, ViewButtonBasePropsSchema} from "@features/menuSettings/types.ts";
import {cn} from "@shared/lib";

export function CategoryCardViewButton(props: ViewButtonBaseProps) {
  ViewButtonBasePropsSchema.parse(props);
  const { selected, onSelect, className } = props;

  const spanClassName = selected
    ? "bg-primary-foreground border-primary/20 shadow-black/30"
    : "bg-primary border-border";

  const baseClassName = "h-7 rounded-md bg-muted border border-border shadow-md shadow-primary/20"

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
        <div className={cn(baseClassName, spanClassName)}/>
        <div className={cn("rounded-md bg-muted border border-border shadow-md shadow-primary/20 col-start-2 row-span-2", spanClassName)}/>
        <div className={cn(baseClassName, spanClassName)}/>
      </div>
    </Button>
  );
}
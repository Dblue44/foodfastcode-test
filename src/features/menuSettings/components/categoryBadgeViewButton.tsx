import {type ViewButtonBaseProps, ViewButtonBasePropsSchema} from "@features/menuSettings/types.ts";
import {Button} from "@shared/ui/button.tsx";
import {cn} from "@shared/lib";

export function CategoryBadgeViewButton(props: ViewButtonBaseProps) {
  ViewButtonBasePropsSchema.parse(props);
  const { selected, onSelect, className } = props;

  const spanClassName = selected
    ? "bg-primary-foreground border-primary/20 shadow-black/30"
    : "bg-primary border-border";

  const baseClassName = "h-7 w-12 rounded-xl border shadow-md shadow-primary/20"

  return (
    <Button
      type="button"
      onClick={onSelect}
      variant={selected ? "default" : "outline"}
      className={cn(
        "h-22 w-34 rounded-xl border p-3.5", // базовые стили
        selected ? "border-transparent" : "border-border", // фиксируем толщину границы
        className
      )}
    >
      <div className="flex flex-wrap gap-2 justify-between">
        <span className={cn(baseClassName, spanClassName)}/>
        <span className={cn(baseClassName, spanClassName)}/>
        <span className={cn(baseClassName, spanClassName)}/>
      </div>
    </Button>
  );
}
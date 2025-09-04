import {type ViewButtonBaseProps, ViewButtonBasePropsSchema} from "@features/menuSettings/types.ts";
import {Button} from "@shared/ui/button.tsx";
import {cn} from "@shared/lib";

export function CategoryBadgeViewButton(props: ViewButtonBaseProps) {
  ViewButtonBasePropsSchema.parse(props);
  const { selected, onSelect, className } = props;
  return (
    <Button
      type="button"
      onClick={onSelect}
      variant={selected ? "default" : "outline"}
      className={cn(
        "h-22 w-36 rounded-xl border p-3", // базовые стили
        selected ? "border-transparent" : "border-border", // фиксируем толщину границы
        className
      )}
    >
      <div className="flex flex-wrap gap-2 justify-between">
        <span className="h-7 w-13 rounded-xl bg-secondary border border-border" />
        <span className="h-7 w-13 rounded-xl bg-secondary border border-border" />
        <span className="h-7 w-13 rounded-xl bg-secondary border border-border" />
      </div>
    </Button>
  );
}
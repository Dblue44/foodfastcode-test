import {Button} from "@shared/ui/button.tsx";
import {type ViewButtonBaseProps, ViewButtonBasePropsSchema} from "@features/menuSettings/types.ts";
import {cn} from "@shared/lib";


export function CategoryCardViewButton(props: ViewButtonBaseProps) {
  ViewButtonBasePropsSchema.parse(props);
  const { selected, onSelect, className } = props;
  return (
    <Button
      type="button"
      onClick={onSelect}
      variant={selected ? "default" : "outline"}
      className={cn(
        "h-22 w-36 rounded-xl border p-3", // увеличил высоту, добавил паддинг
        selected ? "border-transparent" : "border-border",
        className
      )}
    >
      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">
        <div className="h-7 rounded-md bg-muted border border-border" />
        <div className="h-full rounded-md bg-muted border border-border col-start-2 row-span-2" />
        <div className="h-7 rounded-md bg-muted border border-border" />
      </div>
    </Button>
  );
}
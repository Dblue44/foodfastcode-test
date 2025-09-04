import {type ViewButtonBaseProps, ViewButtonBasePropsSchema} from "@features/menuSettings/types.ts";
import {Button} from "@shared/ui/button.tsx";
import {cn} from "@shared/lib";

export function ProductListViewButton(props: ViewButtonBaseProps) {
  ViewButtonBasePropsSchema.parse(props);
  const { selected, onSelect, className } = props;

  return (
    <Button
      type="button"
      onClick={onSelect}
      variant={selected ? "default" : "outline"}
      className={cn(
        "h-22 w-36 rounded-2xl border p-3",
        selected ? "border-transparent" : "border-border",
        className
      )}
    >
      <div className="flex flex-col gap-2 w-full">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center bg-muted/40 p-1 rounded-md gap-1 border border-border">
            <div className="h-5 w-5 rounded bg-muted border border-border" />
            <div className="flex-1">
              <div className="h-2 w-20 rounded bg-muted border border-border" />
              <div className="mt-1 h-2 w-12 rounded bg-muted/80 border border-border" />
            </div>
          </div>
        ))}
      </div>
    </Button>
  );
}
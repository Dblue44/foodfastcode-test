import {type ViewButtonBaseProps, ViewButtonBasePropsSchema} from "@features/menuSettings/types.ts";
import {Button} from "@shared/ui/button.tsx";
import {cn} from "@shared/lib";

export function ProductFullSizeCardViewButton(props: ViewButtonBaseProps) {
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
      <div className="w-28 rounded-md bg-muted/40 p-1 pb-2 border border-border">
        <div className="h-8 rounded bg-muted border border-border" />
        <div className="mt-1 space-y-1">
          <div className="h-2 w-18 rounded bg-muted border border-border" />
          <div className="h-2 w-24 rounded bg-muted/80 border border-border" />
        </div>
      </div>
    </Button>
  );
}
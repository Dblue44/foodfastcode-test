import {type ViewButtonBaseProps, ViewButtonBasePropsSchema} from "@features/menuSettings/types.ts";
import {Button} from "@shared/ui/button.tsx";
import {cn} from "@shared/lib";

export function ProductFullSizeCardViewButton(props: ViewButtonBaseProps) {
  ViewButtonBasePropsSchema.parse(props);
  const { selected, onSelect, className } = props;

  const spanClassName = selected
    ? "bg-primary-foreground/30 border-primary/20 shadow-black/20"
    : "bg-primary/30 border-border";

  const imageClassName = selected
    ? "bg-primary-foreground border-primary/20 shadow-black/20"
    : "bg-primary border-border";

  const mainTextClassName = selected
    ? "bg-primary-foreground/70 border-primary/20 shadow-black/20"
    : "bg-primary/70 border-border";

  const textClassName = selected
    ? "bg-primary-foreground/30 border-primary/20 shadow-black/20"
    : "bg-primary/30 border-border";

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
      <div className={cn("w-28 rounded-md p-1 pb-2 border border-border shadow-md shadow-primary/10", spanClassName)}>
        <div className={cn("h-8 rounded border border-border shadow-md shadow-primary/10", imageClassName)} />
        <div className="mt-1 space-y-1">
          <div className={cn("h-2 w-18 rounded border border-border", mainTextClassName)} />
          <div className={cn("h-2 w-24 rounded border border-border", textClassName)} />
        </div>
      </div>
    </Button>
  );
}
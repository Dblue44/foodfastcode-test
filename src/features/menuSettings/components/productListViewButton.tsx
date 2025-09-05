import {type ViewButtonBaseProps, ViewButtonBasePropsSchema} from "@features/menuSettings/types.ts";
import {Button} from "@shared/ui/button.tsx";
import {cn} from "@shared/lib";

export function ProductListViewButton(props: ViewButtonBaseProps) {
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
      <div className="flex flex-col gap-2 w-full">
        {[0, 1].map((i) => (
          <div key={i} className={cn("flex items-center p-1 rounded-md gap-1 border border-border shadow-md shadow-primary/10", spanClassName)}>
            <div className={cn("h-5 w-5 bg-primary rounded border border-border shadow-md shadow-primary/10", imageClassName)} />
            <div className="flex-1">
              <div className={cn("h-2 w-20 bg-primary/80 rounded border border-border", mainTextClassName)} />
              <div className={cn("mt-1 h-2 w-12 rounded border border-border", textClassName)} />
            </div>
          </div>
        ))}
      </div>
    </Button>
  );
}
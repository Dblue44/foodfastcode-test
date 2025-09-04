import {useAppDispatch} from "@shared/lib";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu.tsx";
import {Button} from "@shared/ui/button.tsx";
import {AlertCircleIcon, CheckIcon, EllipsisVertical, LoaderCircle, Pencil, Trash2} from "lucide-react";
import {deleteUserProduct, removeProductFromList} from "@entities/product";
import type {ProductActionsCellProps} from "@features/product/productTable/index.ts";
import {toast} from "sonner";
import {useState} from "react";

export function ProductActionsCell({ product, onEdit }: ProductActionsCellProps) {
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  const handleEdit = () => {
    onEdit?.(product);
  };

  const onDelete = async () => {
    setDeleting(true)
    const result = await dispatch(deleteUserProduct(product.id))
    if (deleteUserProduct.rejected.match(result)) {
      const errorMessage = result.payload?.error || "Неизвестная ошибка"
      toast.error("Ошибка при удалении товара", {
        icon: <AlertCircleIcon/>,
        richColors: true,
        description: "Не удалось удалить товар. " + errorMessage,
      })
    }
    if (deleteUserProduct.fulfilled.match(result)) {
      toast.success("Товар успешно удален", { icon: <CheckIcon /> });
      dispatch(removeProductFromList(product.id));
    }
    setDeleting(false)
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {deleting
          ?
          <div className="flex items-center size-[30px] ml-auto mr-4">
            <LoaderCircle className="animate-spin" size={28} />
          </div>
          :
          <Button
            variant="default"
            className="bg-muted data-[state=open]:bg-muted text-muted-foreground flex size-8 ml-auto mr-4"
            size="icon"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <EllipsisVertical/>
            <span className="sr-only">Открыть меню</span>
          </Button>
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={handleEdit} className="flex items-center gap-2">
          <Pencil className="size-4" />
          Изменить
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onDelete}
          className="text-destructive focus:text-destructive flex items-center gap-2"
        >
          <Trash2 className="size-4" />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
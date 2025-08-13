import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu.tsx";
import {Button} from "@shared/ui/button.tsx";
import {AlertCircleIcon, EllipsisVertical, LoaderCircle, Pencil, Trash2} from "lucide-react";
import {deleteUserPlaceCategory, removeCategoryFromList} from "@entities/category";
import {useAppDispatch} from "@shared/lib";
import {toast} from "sonner";
import {useState} from "react";
import type {CategoryActionsCellProps} from "@widgets/categoryList";

export function CategoryActionsCell({category, onEdit}: CategoryActionsCellProps) {
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  const handleEdit  = () => {
    onEdit?.(category);
  };

  const onDelete = async () => {
    setDeleting(true)
    const result = await dispatch(deleteUserPlaceCategory(category.id))
    if (deleteUserPlaceCategory.rejected.match(result)) {
      const errorMessage = result?.payload?.error || "Неизвестная ошибка"
      toast.error("Ошибка при удалении категории", {
        icon: <AlertCircleIcon/>,
        richColors: true,
        description: "Не удалось удалить категорию. " + errorMessage,
      })
    }
    if (deleteUserPlaceCategory.fulfilled.match(result)) {
      dispatch(removeCategoryFromList(category.id))
    }
    setDeleting(false)
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {deleting
            ?
            <div className="data-[state=open]:bg-muted text-muted-foreground flex items-center size-8 ml-auto mr-4">
              <LoaderCircle className="animate-spin" size={28} />
            </div>
            :
            <Button
              variant="default"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8 ml-auto mr-4"
              size="icon"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <EllipsisVertical/>
              <span className="sr-only">Открыть меню</span>
            </Button>
          }
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-40"
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleEdit ();
            }}
            className="flex items-center gap-2"
          >
            <Pencil className="size-4"/>
            Изменить
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem
            onClick={onDelete}
            className="text-destructive focus:text-destructive flex items-center gap-2"
          >
            <Trash2 className="size-4"/>
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
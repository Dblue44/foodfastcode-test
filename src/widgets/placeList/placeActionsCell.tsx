import type {BasePlace} from "@shared/types";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@shared/lib";
import {deleteUserPlace, removePlaceFromList} from "@entities/place";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu.tsx";
import {Button} from "@shared/ui/button.tsx";
import {AlertCircleIcon, EllipsisVertical, LoaderCircle, Pencil, Trash2} from "lucide-react";
import {toast} from "sonner";
import {useState} from "react";

export function PlaceActionsCell({ place }: { place: BasePlace }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  const onEdit = () => {
    if (!place?.id) return;
    navigate(`/place/${place.id}`);
  };

  const onDelete = async () => {
    setDeleting(true)
    if (!place?.id) return;
    const result = await dispatch(deleteUserPlace(place.id));
    if (deleteUserPlace.rejected.match(result)) {
      const errorMessage = result.payload?.error || "Неизвестная ошибка"
      toast.error("Ошибка при удалении категории", {
        icon: <AlertCircleIcon/>,
        richColors: true,
        description: "Не удалось удалить категорию. " + errorMessage,
      })
    }
    if (deleteUserPlace.fulfilled.match(result)) {
      dispatch(removePlaceFromList(place.id));
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
        <DropdownMenuItem onClick={onEdit} className="flex items-center gap-2">
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
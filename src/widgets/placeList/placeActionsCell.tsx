import type {BasePlace} from "@shared/types";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@shared/lib";
import {deleteUserPlace} from "@entities/place";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu.tsx";
import {Button} from "@shared/ui/button.tsx";
import {EllipsisVertical, Pencil, Trash2} from "lucide-react";

export function PlaceActionsCell({ place }: { place: BasePlace }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onEdit = () => {
    if (!place?.id) return;
    navigate(`/place/${place.id}`);
  };

  const onDelete = async () => {
    if (!place?.id) return;
    await dispatch(deleteUserPlace(place.id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8 ml-auto mr-4"
          size="icon"
        >
          <EllipsisVertical />
          <span className="sr-only">Открыть меню</span>
        </Button>
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
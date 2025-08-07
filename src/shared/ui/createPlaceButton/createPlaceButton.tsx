import {MapPinPlus} from "lucide-react";
import {Button} from "@shared/ui/button.tsx";
import {Link} from "react-router-dom";

export function CreatePlaceButton() {
  return (
    <Button type="button" className="w-full">
      <Link to="/create-place" className="flex items-center gap-4">
        <MapPinPlus className="h-4 w-4"/>
        Добавить заведение
      </Link>
    </Button>
  )
}
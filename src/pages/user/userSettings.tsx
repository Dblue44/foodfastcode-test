import {useParams} from "react-router-dom";
import {usePageCrumbs} from "@features/usePageCrumbs";


export function UserSettingsPage() {
  const {id} = useParams<{ id: string }>();

  usePageCrumbs("Настройки пользователя");

  return (
    <>
      НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ {id}
    </>
  )
}
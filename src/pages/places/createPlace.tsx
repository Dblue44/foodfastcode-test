import {setPageName} from "@entities/user";
import {useEffect} from "react";
import {useAppDispatch} from "@shared/lib";


export function CreatePlacePage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setPageName("Добавление заведения"));
  }, [dispatch])

  return (
    <>
      Страница создания заведений
    </>
  )
}
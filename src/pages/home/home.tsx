import { usePageCrumbs } from "@/features";


export const HomePage = () => {
  usePageCrumbs("Дашборды");
  return (
    <>
      Страница дашбордов
    </>
  )
}
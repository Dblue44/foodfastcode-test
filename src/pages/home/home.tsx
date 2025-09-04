import { usePageCrumbs } from "@features/usePageCrumbs";

export const HomePage = () => {
  usePageCrumbs("Дашборды");

  return (
    <>
      Страница дашбордов
    </>
  )
}
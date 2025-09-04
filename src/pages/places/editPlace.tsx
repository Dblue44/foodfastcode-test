import {useEffect, useMemo} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {cn, useAppDispatch, useAppSelector} from "@shared/lib";
import {Card, CardHeader, CardTitle, CardFooter} from "@shared/ui/card";
import {Button} from "@shared/ui/button";
import {Toaster} from "@shared/ui/sonner.tsx";
import {selectPlacesList} from "@entities/place";
import {PlaceSettings} from "@features/place";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@shared/ui/tabs.tsx";
import {usePageCrumbs} from "@features/usePageCrumbs";
import {ProductTable} from "@features/product";
import {
  clearProducts,
  selectCategoryId,
  selectCategoryProductsList,
  setProductPlaceId
} from "@entities/product";
import {
  clearCategories,
  fetchUserPlaceCategories,
  selectIsCategoriesLoading,
  selectPlaceCategoriesList,
  setCategoryPlaceId
} from "@entities/category";
import {CategoryList} from "@features/category";
import {selectIsProductsLoading} from "@entities/product";
import { useContainerWidth } from "@shared/hooks/use-container-width";
import {MenuSettings} from "@features/menuSettings";


export function EditPlacePage() {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { ref: tabsContentRef, isNarrow } = useContainerWidth(1400);

  const places = useAppSelector(selectPlacesList);
  const place = useMemo(() => places?.find(p => String(p.id) === String(id)), [places, id]);

  usePageCrumbs(place?.name ?? "Заведение");

  const categories = useAppSelector(selectPlaceCategoriesList);
  const activeCategoryId = useAppSelector(selectCategoryId);
  const activeCategory = useMemo(() => categories?.find(c => c.id === activeCategoryId), [categories, activeCategoryId]);
  const products = useAppSelector(selectCategoryProductsList);
  const isCategoriesLoading = useAppSelector(selectIsCategoriesLoading)
  const isProductsLoading = useAppSelector(selectIsProductsLoading)

  useEffect(() => {
    if (!place?.id) return;
    dispatch(clearCategories());
    dispatch(clearProducts());
    dispatch(setCategoryPlaceId(place.id));
    dispatch(setProductPlaceId(place.id));
    dispatch(fetchUserPlaceCategories())
  }, [place?.id, dispatch]);

  if (!place) {
    return (
      <div className="w-full max-w-xl mx-auto px-4">
        <Toaster position="top-center" richColors/>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Заведение не найдено</CardTitle>
          </CardHeader>
          <CardFooter className="px-6 pb-6">
            <Button onClick={() => navigate("/places")} className="ml-auto">Назад</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] px-4">
      <Toaster position="top-center" richColors/>
      <div className="relative mb-2 flex flex-col gap-2 md:flex-row md:items-start">
        <Button type="button" variant="outline" className="self-start absolute" onClick={() => navigate(-1)}>
          Назад
        </Button>
        <Tabs defaultValue="main" className="flex-1 w-full">
          <TabsList className="mt-12 md:mt-0 md:ml-24 flex flex-wrap">
            <TabsTrigger value="main">Основное</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
            <TabsTrigger value="menu-settings">Конструктор меню</TabsTrigger>
          </TabsList>
          <TabsContent value="main" ref={tabsContentRef}>
            <div className={cn(
              "flex justify-between",
              isNarrow ? "flex-wrap" : "flex-nowrap"
            )}>
              <CategoryList data={categories} isCategoriesLoading={isCategoriesLoading} isNarrow={isNarrow}/>
              {activeCategory && <ProductTable data={products} category={activeCategory} isProductsLoading={isProductsLoading}/>}
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <PlaceSettings place={place}/>
          </TabsContent>
          <TabsContent value="menu-settings">
            <MenuSettings place={place}/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

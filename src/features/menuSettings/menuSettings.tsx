import { useState } from "react";
import {type CatalogView, type CategoryView, type MenuSettingsProps} from "./types.ts";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@shared/ui/card.tsx";
import {Label} from "@shared/ui/label.tsx";
import {Switch} from "@shared/ui/switch.tsx";
import {
  CategoryCardViewButton,
  ProductFullSizeCardViewButton,
  CategoryBadgeViewButton,
  ProductCardViewButton,
  ProductListViewButton
} from "@features/menuSettings/components";
import {Separator} from "@shared/ui/separator.tsx";
import {MenuPreview} from "@features/menuSettings/menuPreview.tsx";

export function MenuSettings({place}: MenuSettingsProps) {
  const [showCategories, setShowCategories] = useState<boolean>(true);
  const [categoryView, setCategoryView] = useState<CategoryView>("badge");
  const [catalogView, setCatalogView] = useState<CatalogView>("card");

  return (
    <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-[420px_minmax(0,1fr)]">
      {/* LEFT: controls */}
      <div className="space-y-6">
        <motion.div layout>
        <Card>
          <motion.div layout>
            <CardHeader>
              <CardTitle className="text-lg">Общие настройки</CardTitle>
              <div className="text-xs text-muted-foreground">
                Идентификатор площадки: <span className="font-mono">{place.id}</span>
              </div>
            </CardHeader>
          </motion.div>
          <CardContent className="space-y-6 space-x-3">
            <motion.div layout>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Показывать категории</Label>
                </div>
                <Switch
                  checked={showCategories}
                  onCheckedChange={setShowCategories} />
              </div>
            </motion.div>

            <div className="relative">
              <AnimatePresence initial={false} mode="popLayout">
                {showCategories && (
                  <motion.div
                    key="categorySection"
                    layout
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30, position: "absolute" }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="space-y-3"
                  >
                    <Label className="textсм">Отображение категорий</Label>
                    <div className="flex flex-wrap gap-3">
                      <CategoryCardViewButton
                        selected={categoryView === "card"}
                        onSelect={() => setCategoryView("card")}
                      />
                      <CategoryBadgeViewButton
                        selected={categoryView === "badge"}
                        onSelect={() => setCategoryView("badge")}
                      />
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                    >
                      <Separator />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              layout
              transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
              className="space-y-3"
            >
              <Label className="text-sm">Вид каталога</Label>
              <div className="flex flex-wrap gap-3">
                <ProductCardViewButton
                  selected={catalogView === "card"}
                  onSelect={() => setCatalogView("card")}
                />
                <ProductFullSizeCardViewButton
                  selected={catalogView === "card-full"}
                  onSelect={() => setCatalogView("card-full")}
                />
                <ProductListViewButton
                  selected={catalogView === "list"}
                  onSelect={() => setCatalogView("list")}
                />
              </div>
            </motion.div>
          </CardContent>
        </Card>
        </motion.div>
      </div>

      {/* RIGHT: preview */}
      <MenuPreview
        showCategories={showCategories}
        categoryView={categoryView}
        catalogView={catalogView}
      />
    </div>
  );
}
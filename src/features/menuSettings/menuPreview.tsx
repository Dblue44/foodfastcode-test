import {type MenuPreviewProps, MenuPreviewPropsSchema} from "./types.ts";
import { AnimatePresence, motion } from "framer-motion";
import {Card, CardContent, CardHeader, CardTitle} from "@shared/ui/card.tsx";
import {Button} from "@shared/ui/button.tsx";
import {Separator} from "@shared/ui/separator.tsx";
import type {Variants} from "motion";
import {AutoHeightSection} from "./components/autoHeightSection.tsx";

const catContainer: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeInOut", delayChildren: 0.06, when: "beforeChildren" },
  },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2 } },
};
const catItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.18 } },
};

const prodContainer: Variants  = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: "easeOut"} },
  exit:   { opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.2 } },
};
const prodItem: Variants  = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

export function MenuPreview(rawProps: MenuPreviewProps) {
  const props = MenuPreviewPropsSchema.parse(rawProps);
  const { showCategories, categoryView, catalogView } = props;

  const names = ["Фрукты", "Овощи", "Ягоды"];
  const fake = [
    { id: 1, title: "Бананы", price: "150 ₽" },
    { id: 2, title: "Вишня",  price: "200 ₽" },
    { id: 3, title: "Яблоки", price: "120 ₽" },
    { id: 4, title: "Клубника", price: "250 ₽" },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Товары</CardTitle>
      </CardHeader>

      <CardContent>
        <AnimatePresence initial={false} mode="wait">
          {showCategories ? (
            <AutoHeightSection key={`cat-${categoryView}`}>
              <motion.div
                variants={catContainer}
                initial="hidden"
                animate="show"
                exit="exit"
                className="overflow-hidden"
              >
                {categoryView === "card" ? (
                  <div className="grid grid-cols-3 gap-3">
                    {names.map((name) => (
                      <motion.div key={name} variants={catItem} layout>
                        <Card className="shadow-sm">
                          <CardContent className="p-3">
                            <div className="h-16 rounded-lg bg-muted mb-2" />
                            <div className="text-sm font-medium">{name}</div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {["Все", ...names].map((name) => (
                      <motion.div key={name} variants={catItem} layout>
                        <Button size="sm" variant="secondary" className="rounded-full">
                          {name}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}

                <Separator className="my-5" />
              </motion.div>
            </AutoHeightSection>
          ) : (
            <AutoHeightSection key="cat-hidden" collapsed />
          )}
        </AnimatePresence>

        {/* Карточки товаров: кросс-фейд/слайд между представлениями + стаггер элементов */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`prod-${catalogView}`}
            variants={prodContainer}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {catalogView === "list" && (
              <div className="divide-y rounded-lg border">
                {fake.map((p) => (
                  <motion.div key={p.id} variants={prodItem} layout className="flex items-center gap-3 p-3">
                    <div className="h-12 w-16 bg-muted rounded-md" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{p.title}</div>
                      <div className="text-xs text-muted-foreground">{p.price}</div>
                    </div>
                    <Button size="sm" variant="outline">В корзину</Button>
                  </motion.div>
                ))}
              </div>
            )}

            {catalogView === "card-full" && (
              <div className="space-y-3">
                {fake.slice(0, 2).map((p) => (
                  <motion.div key={p.id} variants={prodItem} layout>
                    <Card className="overflow-hidden">
                      <div className="h-40 bg-muted" />
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{p.title}</div>
                            <div className="text-sm text-muted-foreground">{p.price}</div>
                          </div>
                          <Button>В корзину</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {catalogView === "card" && (
              <div className="grid grid-cols-2 gap-3">
                {fake.slice(0, 4).map((p) => (
                  <motion.div key={p.id} variants={prodItem} layout>
                    <Card className="overflow-hidden">
                      <div className="h-28 bg-muted" />
                      <CardContent className="p-3">
                        <div className="text-sm font-medium">{p.title}</div>
                        <div className="text-xs text-muted-foreground">{p.price}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="pt-4">
          <Button className="w-full">Перейти в корзину</Button>
        </div>
      </CardContent>
    </Card>
  );
}
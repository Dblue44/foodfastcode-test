import {useAppDispatch} from "@shared/lib";
import {type ProductFormType} from "@shared/types";
import {createUserPlace} from "@entities/place";
import {toast} from "sonner";
import {AlertCircleIcon} from "lucide-react";
import {createUserCategoryProduct} from "@entities/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import {ProductForm} from "@widgets/productForm";
import type {ProductDialogProps} from "@widgets/productDialog";
import {useMemo} from "react";

export function ProductDialog({
  open,
  setOpen,
  category,
  mode,
  product,
  title
}: ProductDialogProps) {
  const dispatch = useAppDispatch()

  const onSubmit = async (values: ProductFormType) => {
    const result = await dispatch(createUserCategoryProduct(values))
    if (createUserPlace.fulfilled?.match?.(result)) {
      return
    }
    const errorMessage = result?.payload?.error || "Неизвестная ошибка"
    toast.error("Ошибка", {
      icon: <AlertCircleIcon/>,
      richColors: true,
      description: "Не удалось добавить продукт. " + errorMessage,
    })
  }

  const computedTitle = useMemo(
    () => title ?? (mode === "edit" ? "Изменение категории" : "Добавление категории"),
    [mode, title]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{computedTitle}</DialogTitle>
        </DialogHeader>
        <div className="w-full max-w-xl mx-auto px-4">
          <ProductForm onSubmit={onSubmit} category={category} product={product} mode={mode}/>
        </div>
      </DialogContent>
    </Dialog>
  )
}
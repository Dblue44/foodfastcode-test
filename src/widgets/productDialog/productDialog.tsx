import {cn, useAppDispatch} from "@shared/lib";
import {type ProductFormType} from "@shared/types";
import {toast} from "sonner";
import {AlertCircleIcon} from "lucide-react";
import {createUserCategoryProduct, editUserProduct, extendProductList, replaceProductInList} from "@entities/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import {ProductForm} from "@widgets/productForm";
import type {ProductDialogProps} from "@widgets/productDialog";
import {useEffect, useMemo} from "react";

export function ProductDialog({
  open,
  setOpen,
  category,
  mode,
  product,
  setProduct,
  title
}: ProductDialogProps) {
  const dispatch = useAppDispatch()

  const onSubmit = async (values: ProductFormType) => {
    if (mode == "edit" && product?.id) {
      const editResult = await dispatch(editUserProduct({productId: product.id, product: values}))
      if (editUserProduct.rejected?.match?.(editResult)) {
        const errorMessage = editResult.payload?.error || "Неизвестная ошибка"
        toast.error("Ошибка при изменении продукта", {
          icon: <AlertCircleIcon/>,
          richColors: true,
          description: "Не удалось изменить продукт. " + errorMessage,
        })
      }
      if (editUserProduct.fulfilled.match(editResult)) {
        const productData = {
          ...values,
          id: product.id
        }
        dispatch(replaceProductInList(productData))
      }
      setProduct(undefined);
      setOpen(false);
      return
    }
    const createResult = await dispatch(createUserCategoryProduct(values))
    if (createUserCategoryProduct.rejected?.match?.(createResult)) {
      const errorMessage = createResult.payload?.error || "Неизвестная ошибка"
      toast.error("Ошибка", {
        icon: <AlertCircleIcon/>,
        richColors: true,
        description: "Не удалось добавить продукт. " + errorMessage,
      })
    }
    if (createUserCategoryProduct.fulfilled.match(createResult)) {
      dispatch(extendProductList(createResult.payload.data))
    }
    setProduct(undefined);
    setOpen(false);
  }
  
  useEffect(() => {
    if (mode === "create") {
      setProduct(undefined);
    }
  }, [mode, setProduct]);

  const computedTitle = useMemo(
    () => title ?? (mode === "edit" ? "Изменение категории" : "Добавление категории"),
    [mode, title]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          "!max-w-4xl",
          "overflow-y-auto",
          "sm:rounded-lg",
          "max-h-[90vh]",
          "max-lg:w-[calc(100vw-2em)]",
          "max-lg:h-[calc(100vh-2em)]",
          "max-lg:top-[5em]",
          "max-lg:left-1/2",
          "max-lg:translate-x-[-50%]",
          "max-lg:translate-y-0",
          "max-lg:p-4"
        )}>
        <DialogHeader>
          <DialogTitle className="ml-3 text-xl">{computedTitle}</DialogTitle>
        </DialogHeader>
        <div className="w-full px-4 max-lg:mb-2">
          <ProductForm onSubmit={onSubmit} category={category} product={product} mode={mode}/>
        </div>
      </DialogContent>
    </Dialog>
  )
}
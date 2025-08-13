import {useAppDispatch} from "@shared/lib";
import {type Category, type ProductFormType} from "@shared/types";
import {createUserPlace} from "@entities/place";
import {toast} from "sonner";
import {AlertCircleIcon} from "lucide-react";
import {createUserCategoryProduct} from "@entities/product";
import {Button} from "@shared/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@shared/ui/dialog";
import {ProductForm} from "@widgets/productForm";

export function ProductDialog({category}: {category?: Category}) {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        {category && <Button variant="outline">Добавить</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавление товара</DialogTitle>
          <DialogDescription>Заполните данные нового товара и прикрепите фото</DialogDescription>
        </DialogHeader>
        <div className="w-full max-w-xl mx-auto px-4">
          {category && <ProductForm onSubmit={onSubmit} category={category}/>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@shared/ui/form.tsx";
import {Input} from "@shared/ui/input.tsx";
import {CardFooter} from "@shared/ui/card.tsx";
import type {CreateProductFormProps} from "@features/product/productForm/index.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type ProductFormType, productFormSchema} from "@features/product/sharedTypes";
import {DialogClose} from "@shared/ui/dialog.tsx";
import {Button} from "@shared/ui/button.tsx";
import {Textarea} from "@shared/ui/textarea.tsx";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useIsMobile} from "@shared/hooks/use-mobile.ts";
import {toast} from "sonner";
import {AlertCircleIcon, Check} from "lucide-react";
import {loadImage} from "@entities/product";
import {useAppDispatch} from "@shared/lib";
import {UploadImagePanel} from "@widgets/loadProductImage";
import {CONFIG} from "@/config";
import {Checkbox} from "@shared/ui/checkbox.tsx";

const API_MAX_FILE_SIZE = CONFIG.API_MAX_FILE_SIZE

const buildProductImageUrl = (imageId?: string) => {
  if (!imageId) return undefined;
  return `${CONFIG.S3_BASE_URL}${imageId}`;
};

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

function calcPercentFromPrices(price?: number, discountPrice?: number): number {
  if (!price || price <= 0) return 0;
  if (!discountPrice || discountPrice <= 0 || discountPrice >= price) return 0;
  const p = (1 - discountPrice / price) * 100;
  return Math.min(100, Math.max(0, round2(p)));
}

function calcDiscountPrice(price: number, percent: number): number {
  if (!price || price <= 0) return 0;
  const p = Math.min(100, Math.max(0, percent || 0));
  const dp = price * (1 - p / 100);
  return Math.min(price, Math.max(0, round2(dp)));
}

async function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const clean = () => {
      img.onload = null;
      img.onerror = null;
    };
    img.onload = () => { clean(); resolve(); };
    img.onerror = () => { clean(); reject(new Error("Image load error")); };
    img.decode?.().then(resolve).catch(() => {/*ignore*/});
    img.src = url;
  });
}

export function ProductForm({onSubmit, category, product, mode}: CreateProductFormProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const objectUrlRef = useRef<string | null>(null);

  const isMobile = useIsMobile()
  const dispatch = useAppDispatch();

  const form = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      discountPrice: 0,
      discountPercent: 0,
      isPopular: false,
      description: "",
      categoryId: category.id,
      image: "",
    },
    mode: "onSubmit",
  })
  const { watch, setValue } = form;
  const price = watch("price");
  const discountPercent = watch("discountPercent");

  const handlePickFile = useCallback(async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.info("Выберите изображение", {icon: <AlertCircleIcon />, richColors: true,})
      return;
    }
    if (file.size > Number(API_MAX_FILE_SIZE)) {
      toast.error("Слишком большой файл. Лимит — 10MB.", {icon: <AlertCircleIcon />, richColors: true,})
      return;
    }
    setUploading(true);
    const objectUrl = URL.createObjectURL(file);
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = objectUrl;

    try {
      try {
        await preloadImage(objectUrl);
      } catch {
        toast.error("Не удалось загрузить изображение", {icon: <AlertCircleIcon />, richColors: true,})
        return;
      }
      setPreviewUrl(objectUrl);

      const result = await dispatch(loadImage(file));
      if (loadImage.rejected.match(result)) {
        toast.error("Не удалось загрузить изображение", {icon: <AlertCircleIcon />, richColors: true,})
      }
      if (loadImage.fulfilled.match(result)) {
        setValue("image", result.payload.data.image_id, { shouldValidate: true, shouldDirty: true })
        toast.success("Изображение успешно загружено", {
          icon: <Check />,
          richColors: true,
        })
      }
    } finally {
      setUploading(false);
    }

    return () => URL.revokeObjectURL(objectUrl);
  }, [dispatch, setValue]);

  const handleClearImage = useCallback(() => {
    setPreviewUrl(undefined);
    setValue("image", "", { shouldValidate: true, shouldDirty: true });
  }, [setValue]);

  const gridClass = useMemo(
    () => (isMobile ? "grid grid-cols-1 gap-6" : "grid grid-cols-2 gap-6"),
    [isMobile]
  );

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    if (!product) {
      setPreviewUrl(undefined);
      setUploading(false);
      form.reset();
      return;
    }
    const initialPercent = calcPercentFromPrices(product.price, product.discountPrice);
    form.reset({
      ...product,
      discountPercent: initialPercent,
      categoryId: category.id,
    });
    const url = buildProductImageUrl(product.image);
    setPreviewUrl(undefined);
    if (!url) {
      setUploading(false);
      return;
    }
    setUploading(true);
    preloadImage(url)
      .then(() => {
        if (cancelled) return;
        setPreviewUrl(url);
        setUploading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setPreviewUrl(undefined);
        setUploading(false);
        toast.error("Не удалось загрузить фото продукта", {
          icon: <AlertCircleIcon />,
          richColors: true,
        });
      });
    return () => { cancelled = true; };
  }, [product, category.id, form]);

  useEffect(() => {
    const newDiscountPrice = calcDiscountPrice(Number(price) || 0, Number(discountPercent) || 0);
    setValue("discountPrice", newDiscountPrice, { shouldValidate: true, shouldDirty: true });
  }, [price, discountPercent, setValue]);

  const isSubmitting = form.formState.isSubmitting
  const imageIdError = form.formState.errors?.image?.message;

  return (
    <div className={gridClass}>
      {isMobile && (
        <UploadImagePanel
          uploading={uploading}
          previewUrl={previewUrl}
          errorText={imageIdError}
          onPickFile={handlePickFile}
          onClear={handleClearImage}
          disabled={isSubmitting}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Введите название продукта" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({field}) => (
              <FormItem>
                <FormLabel>Цена</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    type="text"
                    inputMode="decimal"
                    min={0}
                    step="0.01"
                    autoComplete="off"
                    value={field.value === 0 ? "" : String(field.value)}
                    onChange={(e) => {
                      let raw = e.target.value;
                      raw = raw.replace(/[^0-9.]/g, "");
                      raw = raw.replace(/^0+(\d)/, "$1");
                      field.onChange(Number(raw));
                    }}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountPercent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>% скидки</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={field.value === 0 ? "" : String(field.value)}
                    onChange={(e) => {
                      let raw = e.target.value;
                      raw = raw.replace(/[^0-9.]/g, "");
                      raw = raw.replace(/^0+(\d)/, "$1");
                      field.onChange(Number(raw));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цена со скидкой</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    readOnly
                    tabIndex={-1}
                    value={field.value?.toFixed ? field.value.toFixed(2) : field.value}
                    className="bg-muted/50 cursor-default"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPopular"
            render={({field}) => (
              <FormItem>
                <FormLabel>Популярный товар</FormLabel>
                <FormControl>
                  <Checkbox checked={!!field.value} onCheckedChange={field.onChange} disabled={form.formState.isSubmitting}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea placeholder="Коротко опишите продукт" rows={6} maxLength={600} className="resize-y" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <CardFooter className="px-0">
            <DialogClose asChild>
              <Button variant="outline">Закрыть</Button>
            </DialogClose>
            <Button type="submit" className="ml-auto" disabled={isSubmitting}>
              {isSubmitting ? "Сохраняем…" : (mode === "edit" ? "Сохранить" : "Создать")}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {!isMobile && (
        <UploadImagePanel
          uploading={uploading}
          previewUrl={previewUrl}
          errorText={imageIdError}
          onPickFile={handlePickFile}
          onClear={handleClearImage}
          disabled={isSubmitting}
        />
      )}
    </div>
  )
}
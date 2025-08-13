import z from "zod"
import {dialogModeSchema} from "@shared/types/common.ts";
import {categorySchema, productSchema} from "@shared/types";

export const ProductDialogPropsSchema = z.object({
  open: z.boolean(),
  setOpen: z.function().args(z.any()).returns(z.void()),
  category: categorySchema,
  mode: dialogModeSchema.shape.mode,
  product: productSchema.optional(),
  title: z.string(),
})

export type ProductDialogProps = z.infer<typeof ProductDialogPropsSchema>
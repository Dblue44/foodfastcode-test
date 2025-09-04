import {z} from "zod";
import {categorySchema, dialogModeSchema} from "@shared/types";

export const categoryFormPropsSchema = z.object({
  open: z.boolean(),
  setOpen: z.function().args(z.any()).returns(z.void()),
  category: categorySchema.optional(),
  mode: dialogModeSchema.shape.mode,
  title: z.string(),
})

export type CategoryFormProps = z.infer<typeof categoryFormPropsSchema>

export const categoryFormTypeSchema = z.object({
  name: z.string().min(1, "Введите название"),
})

export type CategoryFormType = z.infer<typeof categoryFormTypeSchema>
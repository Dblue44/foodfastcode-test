import {z} from "zod";
import {categorySchema} from "@shared/types";
import {dialogModeSchema} from "@shared/types/common.ts";

export const categoryFormPropsSchema = z.object({
  open: z.boolean(),
  setOpen: z.function().args(z.any()).returns(z.void()),
  category: categorySchema.optional(),
  mode: dialogModeSchema.shape.mode,
  title: z.string(),
})

export type CategoryFormProps = z.infer<typeof categoryFormPropsSchema>
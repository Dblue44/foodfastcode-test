import {z} from "zod";
import {categorySchema} from "@shared/types";

export const categoryFormPropsSchema = z.object({
  category: categorySchema.optional(),
  setOpen: z.function().args(z.any()).returns(z.void()),
  open: z.boolean(),
  title: z.string(),
  mode: z.enum(["create", "edit"]),
})

export type CategoryFormProps = z.infer<typeof categoryFormPropsSchema>

export type DialogMode = z.infer<typeof categoryFormPropsSchema>["mode"];
import { z } from "zod";
import {storePlaceSchema} from "@shared/types";
import React from "react";

export const MenuSettingsPropsSchema = z.object({
  place: z.object(storePlaceSchema.shape)
})

export type MenuSettingsProps = z.infer<typeof MenuSettingsPropsSchema>


export const CategoryViewSchema = z.union([z.literal("card"), z.literal("badge")]);
export type CategoryView = z.infer<typeof CategoryViewSchema>;

export const CatalogViewSchema = z.union([
  z.literal("card"),       // обычные карточки 2 в ряд
  z.literal("card-full"),  // крупные карточки на всю ширину
  z.literal("list"),       // список строками
]);
export type CatalogView = z.infer<typeof CatalogViewSchema>;

export const MenuPreviewPropsSchema = z.object({
  showCategories: z.boolean(),
  categoryView: CategoryViewSchema,
  catalogView: CatalogViewSchema,
});
export type MenuPreviewProps = z.infer<typeof MenuPreviewPropsSchema>;

export const ViewButtonBasePropsSchema = z.object({
  selected: z.boolean(),
  onSelect: z.function().args().returns(z.void()),
  className: z.string().optional(),
});
export type ViewButtonBaseProps = z.infer<typeof ViewButtonBasePropsSchema>;

export const AutoHeightSectionPropsSchema = z.object({
  collapsed: z.boolean().optional(),
  children: z.custom<React.ReactNode>()
})

export type AutoHeightSectionProps = z.infer<typeof AutoHeightSectionPropsSchema>;
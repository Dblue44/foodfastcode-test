import { z } from "zod"

/** Схема и тип одной крошки */
export const crumbSchema = z.object({
  label: z.string().min(1, "label is required"),
  to: z.string().regex(/^\/.*/, "to must start with '/'").nullable(),
})
export type Crumb = z.infer<typeof crumbSchema>

/** Схема и тип аргумента резолвера */
export const resolverArgsSchema = z.object({
  pageName: z.string().optional(),
  pathname: z.string(),
})
export type ResolverArgs = z.infer<typeof resolverArgsSchema>

/** Схема функции-резолвера и её тип (получится (args)=>Crumb[]) */
export const crumbResolverSchema = z
  .function()
  .args(resolverArgsSchema)
  .returns(z.array(crumbSchema))
export type CrumbResolver = z.infer<typeof crumbResolverSchema>

/** Карта маршрутов → резолвер */
export const breadcrumbsMapSchema = z.record(crumbResolverSchema)
export type BreadcrumbsMap = z.infer<typeof breadcrumbsMapSchema>
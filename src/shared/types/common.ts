import { z } from "zod"

export const apiDataSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({ data })

export type ApiDataOf<T> = { data: T }

export const crumbSchema = z.object({
  label: z.string().min(1, "label is required"),
  to: z.string().regex(/^\/.*/, "to must start with '/'").nullable(),
})
export type Crumb = z.infer<typeof crumbSchema>

export const resolverArgsSchema = z.object({
  pageName: z.string().optional(),
  pathname: z.string(),
})
export type ResolverArgs = z.infer<typeof resolverArgsSchema>

export const crumbResolverSchema = z
  .function()
  .args(resolverArgsSchema)
  .returns(z.array(crumbSchema))
export type CrumbResolver = z.infer<typeof crumbResolverSchema>

export const breadcrumbsMapSchema = z.record(crumbResolverSchema)
export type BreadcrumbsMap = z.infer<typeof breadcrumbsMapSchema>
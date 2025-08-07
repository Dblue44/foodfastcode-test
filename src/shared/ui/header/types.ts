import {z} from "zod";

export const headerPropsSchema = z.object({
  name: z.string(),
});

export type HeaderProps = z.infer<typeof headerPropsSchema>;
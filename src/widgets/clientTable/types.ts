import {z} from "zod";
import {clientSchema} from "@shared/types";

export const clientTablePropsSchema = z.object({
  data: z.array(clientSchema),
});

export type ClientTableProps = z.infer<typeof clientTablePropsSchema>;
import z from "zod";

export const uploadImagePanelPropsSchema = z.object({
  uploading: z.boolean(),
  previewUrl: z.string().optional(),
  errorText: z.string().optional(),
  onPickFile: z.function().args(z.any()).returns(z.void()),
  onClear: z.function().args().returns(z.void()),
  disabled: z.boolean().optional(),
});

export type UploadImagePanelProps = z.infer<typeof uploadImagePanelPropsSchema>;
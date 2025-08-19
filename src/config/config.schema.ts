import { z } from 'zod';

const configSchema = z.object({
  API_AUTH_URL: z.string(),
  API_BASE_URL: z.string(),
  API_MAX_FILE_SIZE: z.string(),
  S3_BASE_URL: z.string(),
});

export const parseConfig = (configObj: Record<string, unknown>) => {
  const parseResult = configSchema.safeParse(configObj);

  if (!parseResult.success) throw parseResult.error;

  return parseResult.data;
};
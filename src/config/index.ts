import { buildEnvProxy } from './buildEnvProxy.ts';
import { parseConfig } from './config.schema.ts';

const ENV = buildEnvProxy<Record<string, unknown>>(
  import.meta.env,
  (key) => `VITE_${key}`,
);

export const CONFIG = parseConfig(ENV);

export type Config = typeof CONFIG;
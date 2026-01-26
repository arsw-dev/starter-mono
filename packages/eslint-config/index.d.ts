import type { createConfig } from './create-config.d.ts';

declare const baseConfig: ReturnType<typeof createConfig>;
export default baseConfig;
declare const noFuncRule: Record<string, unknown>;
export { createConfig, noFuncRule } from './create-config.js';

import type { createConfig } from './create-config.d.ts';

declare const baseConfig: ReturnType<typeof createConfig>;
export default baseConfig;
export { createConfig } from './create-config.js';

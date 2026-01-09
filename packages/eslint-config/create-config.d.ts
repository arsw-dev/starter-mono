import type antfu from '@antfu/eslint-config';

type AntfuParams = Parameters<typeof antfu>;
type AntfuReturn = ReturnType<typeof antfu>;
type Options = AntfuParams[0];
type UserConfigs = AntfuParams[1][];
const createConfig: (options?: Options, ...userConfigs: UserConfigs) => AntfuReturn;
export { createConfig };

import antfuConfig from '@antfu/eslint-config';

const createConfig = (options, ...userConfigs) => {
  return antfuConfig(
    {
      type: 'app',
      typescript: true,
      formatters: true,
      stylistic: {
        indent: 2,
        semi: true,
        quotes: 'single',
      },
      ...options,
    },
    {
      rules: {
        'ts/consistent-type-definitions': ['error', 'type'],
        'no-console': ['warn'],
        'func-style': ['error'],
        'antfu/no-top-level-await': ['off'],
        'antfu/top-level-function': ['off'],
        'node/prefer-global/process': ['off'],
        'node/no-process-env': ['error'],
        'perfectionist/sort-imports': [
          'error',
          {
            tsconfigRootDir: '.',
          },
        ],
        'unicorn/filename-case': [
          'error',
          {
            case: 'kebabCase',
            ignore: ['README.md', 'LICENSE'],
          },
        ],
      },
    },
    ...userConfigs,
  );
};

export default createConfig;
export { createConfig };

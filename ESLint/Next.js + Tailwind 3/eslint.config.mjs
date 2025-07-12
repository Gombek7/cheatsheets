import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import css from '@eslint/css';
import { FlatCompat } from '@eslint/eslintrc';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwind from 'eslint-plugin-tailwindcss';
import { dirname } from 'path';
import { tailwind3 } from 'tailwind-csstree';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("prettier").Config} */
const prettierConfig = {
  arrowParens: 'always',
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  endOfLine: 'auto',
  bracketSameLine: true,
  tabWidth: 2,
};

const eslintConfig = defineConfig([
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  ...compat
    .config({
      extends: ['next/core-web-vitals', 'next/typescript'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        'react/jsx-curly-brace-presence': [
          'error',
          {
            props: 'never',
            children: 'never',
            propElementValues: 'always',
          },
        ],
        'react-hooks/exhaustive-deps': [
          'warn',
          {
            // check deps for custom hooks, e.g. `useEffectUpdate`
            additionalHooks: '(useEffectUpdate)',
          },
        ],
        // 'no-restricted-imports': [
        //   'error',
        //   // prevent incorrect imports when using `next-i18next`
        //   {
        //     name: 'react-i18next',
        //     message: "Please use 'next-i18next' instead.",
        //   },
        //   // prevent incorrect imports when using `@emotion/styled`, can be swapped
        //   // in some projects it's helpful
        //   {
        //     name: 'styled-components',
        //     message: "Did you mean '@emotion/styled'?",
        //   },
        // ],
        // },
      },
    })
    .map((config) => ({
      ...config,
      files: [
        '**/*.ts',
        '**/*.tsx',
        '**/*.js',
        '**/*.jsx',
        '**/*.mjs',
        '**/*.cjs',
      ],
    })),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^react',
              // Side effect imports such as "global.css".
              '^\\u0000',
              // Node.js builtins prefixed with `node:`.
              '^node:',
              // Packages.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              '^@?\\w',
              // Absolute imports and other imports such as Vue-style `@/foo`.
              // Anything not matched in another group.
              '^',
              // Relative imports (anything that starts with a dot)
              '^\\.',
            ],
            // Styles.
            ['^.+\\.(module.css|module.scss)$'],
            // Media and data imports.
            ['^.+\\.(gif|png|svg|jpg|json)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  // lint css files
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    languageOptions: {
      customSyntax: tailwind3,
    },
    extends: ['css/recommended'],
  },
  // lint JSON files
  {
    files: ['**/*.json'],
    ignores: ['package-lock.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  // lint JSONC files
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  // lint JSONC files and allow trailing commas
  {
    files: ['**/tsconfig.json', '.vscode/*.json'],
    plugins: { json },
    language: 'json/jsonc',
    languageOptions: {
      allowTrailingCommas: true,
    },
    extends: ['json/recommended'],
  },
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        // Default: 'classnames', 'clsx', 'ctl'.
        // `cn` is added for shadcn.
        callees: ['classnames', 'clsx', 'ctl', 'cn'],
        // Default: '^class(Name)?$'
        // added support for for props like wrapperClassName, containerClassName, viewportClassName e.t.c.
        classRegex: '^.*(c|C)lass(Names?)?$',
      },
    },
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'error',
        prettierConfig,
        {
          usePrettierrc: false,
        },
      ],
    },
  },
]);

export default eslintConfig;

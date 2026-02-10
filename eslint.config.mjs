// @ts-check
import tseslint from 'typescript-eslint';
import { config } from "@repo/eslint-config/base";

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  ...config,
);
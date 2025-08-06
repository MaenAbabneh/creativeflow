import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  {
    ignores: ["components/ui/**/*"],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    // "plugin:tailwindcss/recommended",
    "prettier"
  ),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error", // Use this rule for sorting imports
      "simple-import-sort/exports": "error", // Use this rule for sorting exports
      "comma-dangle": "off",
      // You can remove your old "import/order" rule here
    },
  },
   
  {
    files: ["**/*.ts", "**/*.tsx"],

    rules: {
      "no-undef": "off",
    },
  },
];

export default config;
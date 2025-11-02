import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // External packages (third-party)
            ["^(?!@documents|@shared)\\w", "^@"],
            // Path aliases
            ["^@documents", "^@shared"],
            // Relative imports
            ["^\\."],
            // CSS imports (should come last)
            ["\\.css$"],
          ],
        },
      ],
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "no-console": "error",
      "no-duplicate-imports": "error",
    },
  },
];

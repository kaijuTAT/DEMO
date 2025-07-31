import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import vueParser from "vue-eslint-parser";

export default [
  {
    ignores: ["dist/**"], // Ignore the dist directory
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // Apply to JS/TS files
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // ESLint Recommended Rules
      "no-unused-vars": "warn",
      "no-undef": "error",

      // TypeScript ESLint Recommended Rules (manually added common ones)
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off", // Adjust as needed
      "@typescript-eslint/no-explicit-any": "off", // Adjust as needed
    },
  },
  {
    files: ["**/*.vue"], // Apply specifically to Vue files
    languageOptions: {
      parser: vueParser, // Use vue-eslint-parser for .vue files
      parserOptions: {
        parser: tsParser, // vue-eslint-parser will use tsParser for <script> blocks
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      // Vue Recommended Rules (manually added common ones)
      "vue/no-unused-components": "warn",
      "vue/no-v-for-template-key": "error",
      "vue/require-v-for-key": "error",
      "vue/valid-template-root": "error",
      "vue/no-multiple-template-root": "error",
      "vue/multi-word-component-names": "off", // Allow single-word component names for simplicity
    },
  },
];

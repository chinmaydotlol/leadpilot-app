import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react/no-unescaped-entities": "off", // Disable unescaped entities rule
      "no-unused-vars": "off", // Disable warning for unused variables
      "unused-imports/no-unused-imports": "off", 
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "prefer-const": "off",
    },
  },
];

export default eslintConfig;

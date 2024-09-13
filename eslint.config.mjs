/** @type { import("eslint").Linter.Config[] } */

import { fixupPluginRules, includeIgnoreFile } from "@eslint/compat";
// import { FlatCompat } from "@eslint/eslintrc";
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import unusedImports from "eslint-plugin-unused-imports";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

// const compat = new FlatCompat();

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    includeIgnoreFile(gitignorePath),
    {
        files: ['src/**/*.{ts|tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            sourceType: 'module',
            ecmaVersion: 'latest',
            parserOptions: {
                project: './tsconfig.json',
                extraFileExtensions: ['.tsx'],
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: reactPlugin,
            'react-hooks': fixupPluginRules(hooksPlugin),
            "unused-imports": unusedImports,
        },
        settings: {
            'import-x/extensions': ['.ts', '.tsx']
        },
        rules: {
            ...reactPlugin.configs['jsx-runtime'].rules,
            ...hooksPlugin.configs.recommended.rules,
            // ...fixupConfigRules(compat.extends("next/core-web-vitals")),
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "error",
                { "argsIgnorePattern": "^_" }
            ],
            "@typescript-eslint/no-unused-vars": "off",
            "import-x/extensions": "off",
            "import-x/no-unresolved": "off",
            "import-x/prefer-default-export": "off",
            "import-x/order": [
                "error",
                {
                    "groups": [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling"],
                        "object",
                        "type",
                        "index"
                    ],
                    "pathGroups": [
                        {
                            "pattern": "{react,react-dom/**}",
                            "group": "external",
                            "position": "before"
                        }
                    ],
                    "pathGroupsExcludedImportTypes": ["react"],
                    "newlines-between": "always",
                    "alphabetize": {
                        "order": "asc",
                        "caseInsensitive": true
                    }
                }
            ],
        }
    },
    {
        ignores: ['eslint.config.mjs', 'tailwind.config.ts']
    }
]
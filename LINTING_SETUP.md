# Linting Setup

## Overview
This project uses ESLint v8 with TypeScript support for code quality and consistency.

## Configuration

### Root Configuration
- **File**: `.eslintrc` (root level)
- **Format**: Legacy ESLint config (compatible with ESLint v8)
- **Plugins**: `@typescript-eslint/eslint-plugin`
- **Extends**: 
  - `eslint:recommended`
  - `plugin:@typescript-eslint/eslint-recommended`
  - `plugin:@typescript-eslint/recommended`
  - `prettier` (for Prettier integration)

### Ignore Patterns
The following patterns are ignored:
- `dist/**` - Build output directories
- `dev-vault/**` - Development vault
- `dist-cli/**` - CLI build output
- `.husky/**` - Git hooks
- `node_modules/**` - Dependencies
- `build/**` - Build artifacts
- `*.config.mjs` - Config files
- `*.config.js` - Config files

### Rules
- **Unused vars**: Disabled for regular `no-unused-vars`, enabled for TypeScript with `args: "none"`
- **TS Comments**: `@typescript-eslint/ban-ts-comment` disabled
- **Empty functions**: `@typescript-eslint/no-empty-function` disabled
- **Naming convention**: Enforces `strictCamelCase` with exceptions for:
  - `code_block`, `list_item`, `bullet_list`, `ordered_list`, `code_inline`, `media_single`
  - HTTP headers: `User-Agent`, `Accept`, `Authorization`, `Content-Type`

## Scripts

### Root Level
```json
"lint": "npm run lint -ws --if-present"
```
Runs linting across all workspaces.

### Package Level
All packages use ESLint v8 with the following pattern:
```json
"lint": "npx eslint@8 --ignore-path ../../.eslintignore --ext .js,.ts src/"
```

**Packages:**
- `@markdown-confluence/lib` - `.js,.ts` files
- `@markdown-confluence/cli` - `.js,.ts` files
- `@markdown-confluence/mermaid-electron-renderer` - `.js,.ts` files
- `@markdown-confluence/mermaid-puppeteer-renderer` - `.js,.ts` files
- `obsidian-confluence` - `.jsx,tsx,.js,.ts` files (includes React/TSX)

## Usage

### Run linting for all packages:
```bash
npm run lint
```

### Run linting for a specific package:
```bash
cd packages/lib
npm run lint
```

## Dependencies

Required dev dependencies (installed at root):
- `eslint@^8.46.0`
- `@typescript-eslint/eslint-plugin@^6.3.0`
- `@typescript-eslint/parser@^6.3.0`
- `eslint-config-prettier@^9.0.0`

## Notes

- ESLint v8 is explicitly specified in scripts to ensure compatibility with the legacy `.eslintrc` format
- The `.eslintignore` file is used for additional ignore patterns
- All packages reference the root `.eslintrc` configuration
- Prettier integration ensures formatting rules don't conflict with ESLint

## Troubleshooting

If you see "plugin not found" errors:
1. Ensure dependencies are installed: `npm install`
2. Verify the plugin versions match in `package.json`
3. Check that the root `.eslintrc` is accessible from package directories

If you see "ESLint v9" errors:
- The scripts explicitly use `eslint@8` to avoid v9 compatibility issues
- If you need to upgrade to v9, you'll need to migrate to the flat config format (`eslint.config.js`)


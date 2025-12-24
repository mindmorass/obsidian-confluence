# Setup Summary

This document summarizes the changes made to prepare the repository for building and publishing to npmjs.org via GitHub Actions.

## Changes Made

### 1. Git Remote Updated
- **Old**: `https://github.com/markdown-confluence/markdown-confluence.git`
- **New**: `git@github.com:mindmorass/markdown-confluence.git`

### 2. Package.json Updates
All package.json files have been updated with the new repository URLs:
- `packages/lib/package.json`
- `packages/cli/package.json`
- `packages/mermaid-electron-renderer/package.json`
- `packages/mermaid-puppeteer-renderer/package.json`

**Updated fields:**
- `repository.url`: Now points to `https://github.com/mindmorass/markdown-confluence`
- `homepage`: Updated to new repository
- `bugs.url`: Updated to new repository

### 3. GitHub Actions Workflows Updated

#### `.github/workflows/release-please.yml`
- ✅ Updated Node.js version from `16.x` to `20.x` (LTS)
- ✅ Removed obsolete obsidian-integration repository checkout
- ✅ Removed obsolete release assets upload step
- ✅ Added `npm ci` and `npm run build` steps before publishing
- ✅ Fixed workflow output references

#### `.github/workflows/pr-check.yml`
- ✅ Updated Node.js version from `16.x` to `20.x` (LTS)

### 4. Linting Configuration
- ✅ Added root-level lint script
- ✅ Updated all package lint scripts to use `npx eslint@8`
- ✅ Enhanced `.eslintrc` with additional ignore patterns

### 5. Documentation Created
- ✅ `NPM_PUBLISHING.md` - Complete guide for npm publishing
- ✅ `LINTING_SETUP.md` - Linting configuration documentation

## Required GitHub Secrets

Before publishing will work, you must configure these secrets in your GitHub repository:

### `NODE_AUTH_TOKEN` (Required)
- NPM authentication token for publishing packages
- See `NPM_PUBLISHING.md` for detailed instructions

### `RELEASE_PLEASE_PAT` (Optional but Recommended)
- Personal Access Token for Release Please to create releases and PRs
- See `NPM_PUBLISHING.md` for detailed instructions

## Next Steps

1. **Set up GitHub Secrets:**
   - Go to your repository: https://github.com/mindmorass/markdown-confluence
   - Settings → Secrets and variables → Actions
   - Add `NODE_AUTH_TOKEN` with your npm token
   - Optionally add `RELEASE_PLEASE_PAT` for Release Please

2. **Verify Workflow:**
   - Push changes to the repository
   - Check GitHub Actions tab to verify workflows run successfully

3. **Test Publishing (Optional):**
   - Create a test commit with a conventional commit message (e.g., `fix: test release`)
   - Release Please will create a release PR
   - When merged, it will automatically publish to npm

## Packages Published

The following packages will be published to npmjs.org:
- `@markdown-confluence/lib`
- `@markdown-confluence/mermaid-electron-renderer`
- `@markdown-confluence/mermaid-puppeteer-renderer`
- `@markdown-confluence/cli`

All packages are configured with:
- Public access
- npmjs.org registry
- Provenance enabled (verifies package source)

## Workflow Overview

1. **Pull Request Check** (`.github/workflows/pr-check.yml`)
   - Runs on PRs to `main`
   - Lints, formats, tests, and builds all packages
   - Ensures code quality before merging

2. **Release Please** (`.github/workflows/release-please.yml`)
   - Runs on pushes to `main`
   - Monitors for conventional commits
   - Creates release PRs automatically
   - When release is created:
     - Builds all packages
     - Publishes to npmjs.org
     - Builds and pushes Docker images

## Conventional Commits

Release Please uses conventional commits to determine version bumps:
- `feat:` → Minor version bump
- `fix:` → Patch version bump
- `BREAKING CHANGE:` or `feat!:` → Major version bump

Example commit messages:
```
feat: add new feature
fix: resolve bug
fix!: breaking change to API
```

## Verification

To verify everything is set up correctly:

```bash
# Check git remote
git remote -v

# Verify package.json repository URLs
grep -r "mindmorass" packages/*/package.json

# Test build locally
npm run build

# Test linting
npm run lint
```

## Support

For issues or questions:
- Repository: https://github.com/mindmorass/markdown-confluence
- Issues: https://github.com/mindmorass/markdown-confluence/issues


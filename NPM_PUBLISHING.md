# NPM Publishing Guide

This document describes how packages are published to npmjs.org using GitHub Actions.

## Overview

This monorepo publishes the following packages to npm:
- `@markdown-confluence/lib` - Core library
- `@markdown-confluence/mermaid-electron-renderer` - Mermaid renderer for Electron
- `@markdown-confluence/mermaid-puppeteer-renderer` - Mermaid renderer for Puppeteer
- `@markdown-confluence/cli` - Command-line interface

## Publishing Workflow

Publishing is automated using GitHub Actions and Release Please.

### Release Please

The project uses [Release Please](https://github.com/google-github-actions/release-please-action) to automate versioning and releases. It:
1. Monitors commits for conventional commit messages
2. Generates CHANGELOG entries
3. Creates release PRs
4. Publishes to npm when releases are created

### Workflow: `.github/workflows/release-please.yml`

This workflow:
1. Runs on pushes to `main` branch
2. Uses Release Please to check for new releases
3. When a release is created:
   - Builds all packages
   - Publishes to npmjs.org
   - Builds and pushes Docker images

## Required GitHub Secrets

To enable npm publishing, you must configure the following secrets in your GitHub repository:

### `NODE_AUTH_TOKEN`
- **Description**: NPM authentication token for publishing packages
- **How to create**:
  1. Log in to [npmjs.com](https://www.npmjs.com/)
  2. Go to Access Tokens: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
  3. Click "Generate New Token" → "Automation"
  4. Copy the token
  5. Add it to GitHub: Settings → Secrets and variables → Actions → New repository secret
  6. Name: `NODE_AUTH_TOKEN`
  7. Value: Your npm token

### `RELEASE_PLEASE_PAT` (Optional)
- **Description**: Personal Access Token for Release Please to create releases and PRs
- **How to create**:
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token with scopes:
     - `repo` (full control)
     - `workflow` (if using GitHub Actions)
  3. Add to GitHub repository secrets as `RELEASE_PLEASE_PAT`

## Package Configuration

All packages have the following in their `package.json`:

```json
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/",
    "provenance": true
  }
}
```

- `access: "public"` - Packages are published as public
- `registry` - Points to npmjs.org
- `provenance: true` - Enables npm provenance (verifies package source)

## Manual Publishing

If you need to publish manually:

```bash
# From the repository root
npm publish -w @markdown-confluence/lib
npm publish -w @markdown-confluence/mermaid-electron-renderer
npm publish -w @markdown-confluence/mermaid-puppeteer-renderer
npm publish -w @markdown-confluence/cli
```

**Note**: You must be logged in to npm:
```bash
npm login
```

## Version Management

Versions are managed by Release Please based on conventional commits:
- `feat:` - Minor version bump
- `fix:` - Patch version bump
- `BREAKING CHANGE:` or `feat!:` - Major version bump

All packages are versioned together using linked versions (see `release-please-config.json`).

## Troubleshooting

### Publishing fails with "403 Forbidden"
- Check that `NODE_AUTH_TOKEN` is set correctly
- Verify the token has publish permissions
- Ensure the package name is available (not already taken by someone else)

### Publishing fails with "401 Unauthorized"
- Token may be expired or invalid
- Regenerate the npm token and update the secret

### Version conflicts
- Check if the version already exists on npm
- Release Please should handle this automatically, but manual intervention may be needed

## Repository Information

- **Repository**: https://github.com/mindmorass/markdown-confluence
- **NPM Organization**: `@markdown-confluence` (scoped packages)
- **Registry**: https://registry.npmjs.org/


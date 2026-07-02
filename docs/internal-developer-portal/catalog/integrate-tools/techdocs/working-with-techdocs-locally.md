---
title: Configure TechDocs Locally
description: Learn how to preview and test your TechDocs documentation locally before publishing.
sidebar_position: 3
sidebar_label: Configure TechDocs Locally
redirect_from: 
    - /docs/internal-developer-portal/catalog/integrate-tools/techdocs/working-with-techdocs-locally
---

Working with TechDocs locally allows you to preview changes, test plugins, and troubleshoot issues before pushing your documentation to the repository.

---

## Prerequisites

Before working with TechDocs locally, ensure you have the following installed:

### 1. Install MkDocs

```sh
pip install mkdocs
```

### 2. Install TechDocs Core Plugin

Install the `techdocs-core` plugin which includes all essential plugins:

```sh
pip install mkdocs-techdocs-core
```

For additional plugins, see the [TechDocs Plugins Overview](/docs/internal-developer-portal/catalog/integrate-tools/techdocs/techdocs-plugins-overview).

### 3. Install TechDocs CLI (Recommended)

The [TechDocs CLI](https://backstage.io/docs/features/techdocs/cli) helps you build and serve documentation locally, mimicking the Harness IDP environment:

```sh
npm install -g @techdocs/cli
```

---

## Local Development Workflow

### Step 1: Navigate to Documentation Directory

Navigate to the directory containing your documentation files:

```sh
cd /path/to/docs
```

---

### Step 2: Serve Documentation Locally

You have two options for serving documentation locally:

#### Option 1: Using MkDocs (Basic)

Serve your documentation using the standard MkDocs server:

```sh
mkdocs serve
```

Access your documentation at `http://localhost:8000`.

:::info Requirements
This command requires an `mkdocs.yml` file in your documentation directory.
:::

---

#### Option 2: Using TechDocs CLI (Recommended)

Use the TechDocs CLI to mimic the Harness IDP build process:

```sh
techdocs-cli serve
```

**Benefits:**
- Renders documentation exactly as it appears in Harness IDP
- Automatically generates `mkdocs.yml` if not present
- Better compatibility with TechDocs-specific features

**Enable verbose logging for debugging:**

```sh
techdocs-cli serve -v
```

:::warning Limitations
- **iFrames**: Cannot be rendered locally; they only work when hosted in Harness IDP
- **Auto-generated config**: If no `mkdocs.yml` exists, TechDocs generates a basic configuration automatically
:::

:::tip Customization
To customize your documentation (add plugins, modify structure, etc.), create an `mkdocs.yml` file in your docs directory.
:::

---

### Step 3: Iterate and Test

1. **Edit** your Markdown files
2. **Refresh** your browser to see changes in real-time
3. **Verify** navigation, plugins, and content rendering
4. **Test** all links and embedded media

---

## Troubleshooting

### Plugin Errors

**Symptoms:**
- "Plugin not found" or "Plugin not installed" errors
- Missing features or functionality

**Solutions:**
- Ensure all required plugins are installed: `pip install mkdocs-techdocs-core`
- Verify plugin compatibility with your MkDocs version
- Check that plugins are correctly listed in your `mkdocs.yml`
- Use `techdocs-core` instead of individual plugins (see [TechDocs Plugins](/docs/internal-developer-portal/catalog/integrate-tools/techdocs/techdocs-plugins-overview))

---

### Rendering Issues

**Symptoms:**
- Content not displaying correctly
- Broken formatting or layout
- Missing navigation elements

**Solutions:**
- Test with both `mkdocs serve` and `techdocs-cli serve` to identify discrepancies
- Review your `mkdocs.yml` configuration for syntax errors
- Verify all Markdown files use correct syntax
- Check that image and file paths are correct

---

### Build Warnings and Errors

**Symptoms:**
- Build fails or produces warnings
- Documentation doesn't generate properly

**Solutions:**

Run a clean build to identify issues:

```sh
mkdocs build --clean
```

Review the output for specific error messages and warnings, then address them accordingly.

---
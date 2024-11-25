---
title: Working with TechDocs on Local Environment
description: Learn how to work with TechDocs Locally.
sidebar_position: 4
---

Working with MkDocs locally allows you to preview changes and troubleshoot issues before pushing your documentation to the repository.

## Prerequisites:

1. Install MkDocs: Ensure MkDocs is installed locally on your machine:

```sh
pip install mkdocs
```

2. Install [Required Plugins](/docs/internal-developer-portal/techdocs/techdocs-plugins-overview): Install the plugins defined in your `mkdocs.yml` file. For example:

```sh
pip install mkdocs-techdocs-core
```
3. Install [techdocs-cli](https://backstage.io/docs/features/techdocs/cli) (optional but recommended): This can help you build the docs without the presence of `mkdocs.yaml`. 

```sh
npm install -g @techdocs/cli
```

## Steps to Work Locally:

### 1. Navigate to Your Docs Directory

Move to the directory containing your `mkdocs.yml` file:

```sh
cd /path/to/docs
```
### 2. Run a Local Development Server

Use MkDocs to serve your documentation locally:

```sh
mkdocs serve
```
Access the site at `http://localhost:8000`.

:::info
Make sure you have a `mkdocs.yml` file for the above cli command to work
:::

OR

To mimic the TechDocs build process, use the techdocs-cli:

```sh
techdocs-cli serve
```
This ensures the documentation will render as it would in Harness IDP.

:::info
If you don't include a `mkdocs.yml` file, TechDocs will automatically generate a basic `mkdocs.yml` configuration file while building the docs site. This allows your documentation to be rendered without needing a manual configuration file.

However, if you want to customize the build process (e.g., adding extra plugins, modifying site structure), you can still create and modify the `mkdocs.yml` file.

iFrames cannot be rendered locally using the above command. 
:::

In case you want to view the build logs just use the verbose flag, quite helpful during debugging issues.

```sh
techdocs-cli serve -v
```

### 4. Iterate and Test

- Edit Markdown files and refresh your browser to see changes.
- Verify navigation, plugins, and content rendering.

## Troubleshooting Common Issues:

### 1. Plugin Errors:
- Ensure all required plugins are listed in requirements.txt or installed manually.
- Verify compatibility with your MkDocs version.

### 2. Rendering Issues:
- Test with both mkdocs serve and techdocs-cli serve to catch discrepancies.
- Check your `mkdocs.yml` configuration for errors.

### 3. Build Warnings:
- Run mkdocs build to catch any warnings or errors:

```sh
mkdocs build --clean
```
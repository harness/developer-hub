---
title: How to Add Docs
description: Instructions on adding all kinds of docs in different formats.
sidebar_position: 70
sidebar_label: How to Add Docs
---

Docs in Harness IDP is powered by [TechDocs Backstage Plugin](https://backstage.io/docs/features/techdocs/) and which currently is using MkDocs to generate the documentation from source, so the files have to be in Markdown format with a `mkdocs.yml` file present in the path provided. 

In addition to this we have also added few MkDocs plugins to support images and videos in your docs. Here's an extensive list of supported plugins. 

- [mkdocs-glightbox](https://github.com/blueswen/mkdocs-glightbox)
- [mkdocs-git-authors-plugin](https://github.com/timvink/mkdocs-git-authors-plugin)
- [mkdocs-git-revision-date-localized-plugin](https://github.com/timvink/mkdocs-git-revision-date-localized-plugin)
- [mkdocs-video](https://pypi.org/project/mkdocs-video/)
- [mkdocs-material-extensions](https://pypi.org/project/mkdocs-material-extensions/)
- [mkdocs-redirects](https://github.com/mkdocs/mkdocs-redirects)
- [mkdocs-awesome-pages-plugin](https://pypi.org/project/mkdocs-awesome-pages-plugin/2.6.1/)
- [mkdocs-minify-plugin](https://pypi.org/project/mkdocs-minify-plugin/0.7.1/)

Follow the Tutorials mentioned below to add docs in your IDP:

1. [Enable documentation for your Component](/docs/internal-developer-portal/techdocs/enable-docs)
2. [How to Add API Docs](/docs/internal-developer-portal/techdocs/add-api-docs)
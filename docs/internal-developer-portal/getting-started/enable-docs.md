---
title: Enable documentation for your component
description: Learn how you can enable the TechDocs plugin to show your Markdown docs on the **Docs** tab of the catalog page.
sidebar_position: 40
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

By default, the **Docs** tab in your catalog does not include documentation for a new software component. However, you can quickly publish Markdown documentation to the **Docs** tab.

![](static/docs-empty.png)

To add documentation:

1. Create a `docs` directory next to where you have `catalog-info.yaml`.
2. Inside the `docs` directory, create an `index.md` file with the following contents.

```
# Welcome!

This is a basic example of documentation. It is intended to showcase some of the
features that TechDocs provides out of the box.

## Basic Markdown

Headings:

# h1

## h2

### h3

#### h4

##### h5

###### h6

Here is a bulleted list:

- Item one
- Item two
- Item Three

Check out the [Markdown Guide](https://www.markdownguide.org/) to learn more about how to
simply create documentation.

You can also learn more about how to configure and set up this documentation in Backstage,
[read the TechDocs Overview](https://backstage.io/docs/features/techdocs/).

## Table example

While this documentation isn't comprehensive, in the future it should cover the following
topics outlined in this example table:

| Topic   | Description                                                  |
| ------- | ------------------------------------------------------------ |
| Topic 1 | An introductory topic to help you learn about the component. |
| Topic 2 | A more detailed topic that explains more information.        |
| Topic 3 | A final topic that provides conclusions and lessons learned. |

## Learn more about MkDocs

TechDocs uses MkDocs as the static site generator. Visit https://www.mkdocs.org for more information about MkDocs.
```

3. Edit the `catalog-info.yaml` and add the TechDocs annotation.

4. In the `metadata.annotations` field, add `backstage.io/techdocs-ref: dir:.`.

![](static/techdocs-ref.png)

5. Select the refresh button on the catalog component page.

![](static/refresh-button.png)

6. Navigate to the **Docs** tab to review the documentation, which should become available shortly. 

![](static/docs-rendered.png)

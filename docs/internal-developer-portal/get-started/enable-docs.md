---
title: Enable documentation for your Component
description: Learn how you can enable the TechDocs plugin to show your Markdown docs on the Docs tab of the catalog page.
sidebar_position: 6
sidebar_label: Enable Documentation for your Component
---

Now that you have [added your Software Components](/docs/internal-developer-portal/get-started/register-a-new-software-component) to the catalog, it's time to include documentation. By default, the **Docs** tab in the catalog does not display documentation for new components. This tutorial will show you how to quickly publish Markdown documentation to the **Docs** tab.

![](static/docs-empty.png)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Docs in Harness IDP is powered by [TechDocs Backstage Plugin](https://backstage.io/docs/features/techdocs/) and which currently is using MkDocs to generate the documentation from source, so the files have to be in Markdown format with a `mkdocs.yml` file present in the path provided. 

:::

<Tabs queryString="enable-docs-location">
<TabItem value="docs-available-in-root" label="Docs Available in the Root of Source Folder" queryString="enable-docs-location">

### Docs Available in the Root of Source Folder \{#docs-available-in-the-root-of-source-folder}

To add documentation:

1. Create a `docs` directory next to where you have `catalog-info.yaml`.

The directory tree must look something like this:

```sh
├── catalog-info.yaml
└── docs
    └── index.md
```

2. Inside the `docs` directory, create an `index.md` file with the following content.

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


When you see`dir:.`, you can translate it to mean:

- That the documentation source code lives in the same location as the `catalog-info.yaml` file.
- That, in particular, the `docs` folder is a sibling of `catalog-info.yaml` (meaning, it is in the same directory)

</TabItem>
<TabItem value="docs-not-in-root" label="Docs Available in Some Other Location">

### Docs Available in Some Other Location \{#docs-available-in-some-other-location}

In situations where your TechDocs source content is managed and stored in a location completely separate from your `catalog-info.yaml`, you can instead specify a URL location reference, the exact value of which will vary based on the source code hosting provider. Notice that instead of the `dir:` prefix, the `url:` prefix is used instead. Make sure the specified path contains the `mkdocs.yml` file. For example:

- Harness Code Repository:
    - Repository at account scope: `url:https://app.harness.io/ng/account/account_id/module/code/repos/repo_name`
    - Repository at organization scope: `url:https://app.harness.io/ng/account/account_id/module/code/orgs/org_id/repos/repo_name` 
    - Repository at project scope: `url:https://app.harness.io/ng/account/account_id/module/code/orgs/org_id/projects/project_id/repos/repo_name`
- GitHub: `url:https://githubhost.com/org/repo/tree/<branch_name>`
- GitLab: `url:https://gitlabhost.com/org/repo/tree/<branch_name>`
- Bitbucket: `url:https://bitbuckethost.com/project/repo/src/<branch_name>`
- Azure: `url:https://azurehost.com/organization/project/_git/repository`

Note, just as it's possible to specify a subdirectory with the `dir:` prefix, you can also provide a path to a non-root directory inside the repository which contains the `mkdocs.yml` file and `docs/` directory. 

e.g. `url:https://github.com/backstage/backstage/tree/master/plugins/techdocs-backend/examples/documented-component`


3. Edit the `catalog-info.yaml` and add the TechDocs annotation.

4. In the `metadata.annotations` field, add `backstage.io/techdocs-ref: url:https://github.com/my-org/my-service/tree/master`.

```YAML
metadata:
  annotations:
    backstage.io/techdocs-ref: url:https://github.com/backstage/backstage/tree/master/plugins/techdocs-backend/examples/documented-component
```

</TabItem>
</Tabs>


5. Select the refresh button on the catalog component page.

![](static/refresh-button.png)

6. Navigate to the **Docs** tab to review the documentation, which should become available shortly. 

![](static/docs-rendered.png)
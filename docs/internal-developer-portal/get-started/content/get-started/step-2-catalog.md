import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Step 2: Set up Software Catalog" targetPage="/docs/internal-developer-portal/get-started"/>

import DocImage from '@site/src/components/DocImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

The **Software Catalog** is a centralized registry of all your software assets — including components, services, websites, libraries, data pipelines, and more. Think of it as a curated directory of your **entities**, helping you efficiently track ownership, metadata, and dependencies across your software ecosystem.

This guide walks you through the detailed steps to setup Catalog in IDP 2.0 and explains how to navigate the Catalog by creating and managing entities.

---

## Prerequisites

Before using the Software Catalog in IDP 2.0, ensure:
* You have reviewed the **[IDP 2.0 Overview](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path)** and **[Upgrading to IDP 2.0](/docs/internal-developer-portal/idp-2o-overview/migrating-idp-2o)** guide. 
* **IDP 2.0** is enabled behind the `IDP_2_0` Feature Flag. Contact [Harness Support](https://support.harness.io) to enable it on your account.
* You are familiar with the **[Catalog Data Model](/docs/internal-developer-portal/catalog/data-model)** and **[Catalog YAML](/docs/internal-developer-portal/catalog/catalog-yaml)** structure.

---

## Populate your Catalog

Once you have enabled the IDP module, there are three ways to populate your Software Catalog in IDP 2.0:

<DynamicMarkdownSelector
  options={{
    "Create Manually": {
      path: "/internal-developer-portal/get-started/content/catalog-2o/create-entity-manually.md"
    },
    "Auto-Discovery": {
      path: "/internal-developer-portal/get-started/content/catalog-2o/auto-discovery.md"
    },
    "Import from Git": {
      path: "/internal-developer-portal/get-started/content/catalog-2o/import-from-git.md"
    }
  }}
  toc={toc}
  defaultSelection="Create Manually"
  disableSort={true}
/>




## Next steps

Now that you've created your first entity, explore these next steps:
* [Create Workflows](/docs/internal-developer-portal/get-started) to automate common development tasks.
* [Configure Plugins](/docs/internal-developer-portal/plugins/overview) to enhance your entities with additional capabilities.
* [Set up Scorecards](/docs/internal-developer-portal/scorecards/create-scorecards/create-scorecard) to track entity quality and compliance.
* [Enable TechDocs](/docs/internal-developer-portal/techdocs/enable-docs) to publish documentation alongside your entities. 
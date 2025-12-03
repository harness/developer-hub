import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Auto-Discovery" targetPage="/docs/internal-developer-portal/get-started"/>

import DocImage from '@site/src/components/DocImage';
import DocVideo from '@site/src/components/DocVideo';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Auto-Discover Entities Using Harness CD

Harness IDP can automatically discover and import your Harness CD services into the Software Catalog. This feature allows you to quickly populate your catalog with existing services without any manual configuration.

### What is Auto-Discovery?

Auto-Discovery integration enables:
- **Automatic scanning** of your Harness account for all CD services across the selected scope (Account, Organization, or Project level)
- **Automatic conversion** of each CD service into a **Component** entity with the **Service** type in Harness IDP
- **Metadata mapping** from service configuration to IDP entity properties
- **Uni-directional sync** from CD service to IDP entity (changes in IDP don't affect the CD service)

For detailed information about the integration, go to [Auto-Discovery using Harness CD](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/harness-cd.md).

---

### Prerequisites

Before you begin, ensure:
- The feature flag **`IDP_CATALOG_CD_AUTO_DISCOVERY`** is enabled on your account. Contact [Harness Support](mailto:support@harness.io) to enable it.
- **Harness CD** is enabled for your account (must be the **same account** you use for Harness IDP).
- You have appropriate RBAC permissions to view CD services in Harness CD. 

---

### Configure Auto-Discovery Integration

<Tabs>
<TabItem value="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/3c879999-6426-4bbb-8566-1d0e69612a7b?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Configure Catalog Auto-Discovery" />

</TabItem>
<TabItem value="Step-by-Step">

#### Step 1: Enable the Harness CD Auto-Discovery Integration

1. In Harness IDP, navigate to **Configure** → **Integrations**.
2. Locate the **Harness CD services** integration card.
3. Click **Enable** to activate the integration.

---

#### Step 2: Configure and Sync Harness CD Services

After enabling the integration, configure what services to sync to your IDP Catalog. When you enable auto-discovery, each CD service is converted into an IDP entity with some specific characteristics. Go to [Sync Harness CD Services](/docs/internal-developer-portal/catalog/create-entity/catalog-discovery/harness-cd#2-sync-harness-cd-services-to-the-idp-catalog) to learn more about this entity mapping. 

1. On the **Harness CD services** integration card, click **Edit**. 

2. Choose your sync scope:

   **Option A: All Scopes**
   - Syncs services across the entire account (all organizations and projects).
   
   **Option B: Particular Organizations & Projects**
   - Syncs only from selected organizations and/or projects
   - Use the dropdown to select specific scopes
   
3. Click **Save Changes** to begin syncing. 

That's it! Your CD services will now appear in the IDP Catalog.

</TabItem>
</Tabs>

---

### View and Manage CD Services in the IDP Catalog

Once the sync is complete, you can view and manage your auto-discovered services.

<Tabs>
<TabItem value="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/a5531ee8-e0ba-4c8c-9cc6-2a9de6804be3?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="View and Manage Synced Services" />

</TabItem>
<TabItem value="Step-by-Step">

#### Viewing Synced Services:

1. Navigate to the **Catalog** in Harness IDP
2. Search for any CD service by name or identifier
3. Click on an entity to view all synced data from the CD service

---

#### Auto-Configured Features: 

Auto-discovered entities come with built-in features:

**1. CI/CD Plugin:**
- The **CI/CD** plugin is automatically configured for each entity
- View deployment history, pipelines, and execution details directly in IDP

**2. Quick Navigation:**
- Use the **Open in Harness CD** button on the entity overview page
- Navigate directly to the service in Harness CD for detailed management

</TabItem>
</Tabs>



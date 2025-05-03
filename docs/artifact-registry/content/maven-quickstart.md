import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will help you **create a Maven Artifact Registry** in Harness, **configure an upstream proxy**, and **manage Maven packages**.

## Prerequisites

- Ensure you have the **Maven CLI** (`mvn`) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a Maven Artifact Registry

<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="[INSERT_TANGO_EMBED_URL]" title="Create a Maven Artifact Registry in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Maven Registry**.
4. Provide a **Registry Name**.

:::info registry name criteria
Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
:::

5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.

</TabItem>
</Tabs>

:::info private registry
This registry will serve as your private Maven registry within Harness.
:::

---

## Configure an Upstream Proxy (Optional)

An upstream proxy allows your registry to fetch Maven packages from external sources if they are not available locally.

<Tabs>
<TabItem value="interactive" label="Interactive Guides">

### Create an upstream proxy

<DocVideo src="[INSERT_TANGO_PROXY_SETUP]" title="Create Upstream Proxy Configuration" />

### Configure the upstream proxy in your registry

<DocVideo src="[INSERT_TANGO_PROXY_CONFIG]" title="Configure Upstream in Maven Registry" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

### Create an upstream proxy

1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Maven Registry** as the proxy type.
3. Click **Create Proxy** to establish the connection.

### Configure the upstream proxy in your registry

1. In the Artifact Registry module, select an existing Artifact Registry.
2. Select the **Configuration** tab.
3. Under **Advanced (Optional)**, select **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Click **Save** to save the configuration.

</TabItem>
</Tabs>

:::info upstream proxy caching
If a Maven package isn’t found in your Harness registry, the upstream proxy fetches it from an external registry like Maven Central, reducing duplication and improving resolution.
:::

---

## Push & Pull Maven Packages

### Authenticate the CLI with the Harness Registry

1. In your Harness Maven Artifact Registry, click **Setup Client**.
2. Copy the provided Maven settings snippet.
3. Add the snippet to your `~/.m2/settings.xml` file to authenticate Maven with the Harness registry.

### Publish a Package to the Registry

1. Configure your project's `pom.xml` to publish to the Harness registry:

```xml
<distributionManagement>
  <repository>
    <id>harness</id>
    <url>https://<harness-registry-url></url>
  </repository>
</distributionManagement>
```

2. Publish the package:

```bash
mvn deploy
```

### Pull a Package from the Registry

1. Configure your project's `pom.xml` to pull from the Harness registry:

```xml
<repositories>
  <repository>
    <id>harness</id>
    <url>https://<harness-registry-url></url>
  </repository>
</repositories>
```

2. Pull the package:

```bash
mvn install
```
:::info usage
These commands upload or retrieve Maven packages between your local project and the Harness registry.
:::

---

By following this guide, you can effectively set up and manage a Maven Artifact Registry within Harness, streamlining your Java package workflows.
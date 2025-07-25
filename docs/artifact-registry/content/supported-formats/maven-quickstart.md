import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Maven" targetPage="/docs/artifact-registry/supported-formats" />

This guide will help you **create a Maven Artifact Registry** in Harness, **configure an upstream proxy**, and **manage Maven packages**.

## Prerequisites
- Ensure you have the **Maven CLI** (`mvn`) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a Maven Artifact Registry
<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/511932ac-8ac1-4db9-ab6a-3296e6974949?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Creating a New Maven Artifact Registry" />
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

<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/38a8dc51-7c77-4507-b136-d02a06857bc3?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create Maven Upstream Proxy in Harness" />

<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/088d658d-43cc-48b4-988c-4dca211fe78c?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Configure Maven Upstream Proxy" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>
1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Maven Registry** as the proxy type.
3. Click **Create Proxy** to establish the connection.

<h3> Configure the upstream proxy in your registry </h3>
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
2. Click **Generate Identity Token** to generate a new token that serves as the password for uploading and downloading artifacts.

### Publish a Package to the Registry
1. Set default repository in your `pom.xml` file.

```xml
<distributionManagement>
  <snapshotRepository>
    <id>maven-dev</id>
    <url>https://pkg.harness.io/pkg/<account-id>/<maven-registry>/maven</url>
  </snapshotRepository>
  <repository>
    <id>maven-dev</id>
    <url>https://pkg.harness.io/pkg/<account-id>/<maven-registry>/maven</url>
  </repository>
</distributionManagement>
```

2. Copy the following your ~/ .m2/setting.xml file for MacOs, or $USERPROFILE$\ .m2\settings.xml for Windows to authenticate with token to push to your Maven registry.
```xml
<settings>
  <servers>
    <server>
      <id>maven-dev</id>
      <username>username</username>
      <password>identity-token</password>
    </server>
  </servers>
</settings>
```

3. Publish the package:
```bash
mvn deploy
```

### Pull a Package from the Registry
Set default repository in your pom.xml file.

1. Set the default registry in your pom.xml file by adding the following:
```xml
<repositories>
  <repository>
    <id>maven-dev</id>
    <url>https://pkg.harness.io/pkg/<account-id>/<maven-registry>/maven</url>
    <releases>
      <enabled>true</enabled>
      <updatePolicy>always</updatePolicy>
    </releases>
    <snapshots>
      <enabled>true</enabled>
      <updatePolicy>always</updatePolicy>
    </snapshots>
  </repository>
</repositories>
```

2. Copy the following your ~/ .m2/settings.xml file for MacOs, or $USERPROFILE$\ .m2\settings.xml for Windows to authenticate with token to pull from your Maven registry.
```xml
<settings>
  <servers>
    <server>
      <id>maven-dev</id>
      <username>username</username>
      <password>identity-token</password>
    </server>
  </servers>
</settings>
```

3. Add a dependency to the project's pom.xml (replace *GROUP_ID*, *ARTIFACT_ID* & *VERSION* with your own):
```xml
<dependency>
  <groupId><GROUP_ID></groupId>
  <artifactId><ARTIFACT_ID></artifactId>
  <version><VERSION></version>
</dependency>
```

4. Pull the package:
```bash
mvn install
```

:::info usage
These commands upload or retrieve Maven packages between your local project and the Harness registry.
:::

---

By following this guide, you can effectively set up and manage a Maven Artifact Registry within Harness, streamlining your Java package workflows.
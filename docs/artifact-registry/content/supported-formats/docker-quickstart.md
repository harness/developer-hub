import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Docker" targetPage="/docs/artifact-registry/supported-formats" />

This guide will help you **create a Docker Artifact Registry** in Harness, **configure an upstream proxy**, and **manage Docker images**.

## Prerequisites
- Ensure you have Docker CLI installed and configured on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors. ￼

---
## Create a Docker Artifact Registry
<Tabs>
<TabItem value="create-registry-interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/21a8f737-f90b-4864-a3b9-0538f80be7a5?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a Docker Artifact Registry in Harness" />
</TabItem>
<TabItem value="create-registry-step-by-step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Docker Registry**.
4. Provide a Registry Name.
    - Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.

</TabItem>
</Tabs>

:::info private docker registry
This registry will serve as your private Docker registry within Harness.
:::

---
## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch Docker images from external sources if they are not available locally.

<Tabs>
<TabItem value="configure-upstream-interactive" label="Interactive Guides">

<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/f9437754-7cdf-4c19-9c94-9932c7e1a46a?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create Upstream Proxy Configuration" />

<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/e228e016-f58c-4281-8f7f-39a7cb652f46?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Configure Upstream in Docker Registry" />

</TabItem>
<TabItem value="configure-upstream-step-by-step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>
1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Docker Registry** as the proxy type.
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
If a Docker image isn’t found in your Harness registry, the upstream proxy fetches it from an external registry like Docker Hub, reducing duplication and improving image resolution.
:::

---
## Push & Pull Docker images
### Authenticate the Docker CLI with Harness Registry
1. In your Harness Docker Artifact Registry, click **Setup Client**.
2. Copy the provided docker login command.
3. Execute the command in your terminal to authenticate your Docker CLI with the Harness registry. ￼

### Push a Docker Image to Harness Registry

1. Tag your Docker image to match the Harness registry format:

```bash
docker tag your-image:tag <harness-registry-url>/your-image:tag
```
2. Push the image to the Harness registry:

```bash
docker push <harness-registry-url>/your-image:tag
```

**Replace `<harness-registry-url>` with the URL of your Harness Docker registry.**

### Pull a Docker Image from Harness Registry
1. Ensure you’re authenticated with the Harness registry (see Step 3).
2. Pull the desired image:
```bash
docker pull <harness-registry-url>/your-image:tag
```

:::info docker pull command
This command retrieves the Docker image from your Harness registry to your local environment.
:::

---
By following this guide, you can effectively set up and manage a Docker Artifact Registry within Harness, streamlining your container image workflows.
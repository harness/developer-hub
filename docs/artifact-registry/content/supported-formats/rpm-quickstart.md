import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="RPM" targetPage="/docs/artifact-registry/supported-formats" />

This guide shows you how to **create an RPM Artifact Registry** in Harness, **configure an upstream proxy**, and **manage RPM packages** using **YUM** or **DNF**.

## Prerequisites
- Ensure you have **RPM CLI** installed and configured on your local machine.
- Ensure you have access to a Harness account with the appropriate permissions to create registries and connectors.

---
## Create an RPM Artifact Registry
<Tabs>
<TabItem value="create-registry-interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/61c5aaba-25bc-446d-b87e-f6f344521022?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create RPM Artifact Registry in Harness" />
</TabItem>
<TabItem value="create-registry-step-by-step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type list, select **RPM Registry**.
4. Provide a Registry Name.
    :::tip registry name
    This registry name must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`, and **must be unique to your Harness Account**.
    :::
5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info private rpm registry
This registry will serve as your private RPM registry within Harness.
:::

---
## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch RPM packages from external sources if they are not available locally.

<Tabs>
<TabItem value="configure-upstream-interactive" label="Interactive Guides">

<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/d85bcc3d-1807-481f-8279-a6d687a2a08b?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create RPM Upstream Proxy in Harness Artifact Registry" />

<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/c41c6ad2-718e-4783-96ea-fc39b5794096?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Configure RPM Upstream Proxy in Harness" />

</TabItem>
<TabItem value="configure-upstream-step-by-step" label="Step-by-Step" default>

<h3> Create an upstream proxy </h3>
1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **RPM Registry** as the proxy type.
3. Enter an upstream proxy name.
4. Enter your remote registry URL.
5. Choose your Authentication method (`Anonymous` by default).
6. Click **Create Proxy** to establish the connection.

<h3> Configure the upstream proxy in your registry </h3>
1. In the Artifact Registry module, select an existing Artifact Registry.
2. Select the **Configuration** tab.
3. Under **Advanced (Optional)**, select **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Click **Save** to save the configuration.
</TabItem>
</Tabs>

:::info upstream proxy caching
If an RPM package isn’t found in your Harness registry, the upstream proxy fetches it from an external registry like RPM, reducing duplication and improving package resolution.
:::

---
## Setup Client
With your RPM registry created, you can now authenticate the RPM CLI with your Harness registry using **YUM** or **DNF**.

<Tabs>
<TabItem value="setup-client-yum" label="YUM">
<DocVideo src="https://app.tango.us/app/embed/0e46913d-ab3f-4b74-95f2-7e6d1b977817?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Configure YUM Client Registry Setup in Harness Artifact Registry" />
</TabItem>
<TabItem value="setup-client-dnf" label="DNF">
<DocVideo src="https://app.tango.us/app/embed/2e282a05-50db-4e4e-9707-c4b01137299d?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Configure RPM registry in Harness Artifact Registry with DNF" />
</TabItem>
<TabItem value="setup-client-step-by-step" label="Step-by-step">

- In your Harness RPM Artifact Registry, click **Setup Client**.

### 1. Configure Authentication
1. Click **Generate Token** to generate an identity token for authentication.

:::info installation and upload
Whether you use **YUM** or **DNF**, the process is similar
:::

### 2. Install an RPM package
1. Create or edit your `.repo` file:
```bash
sudo vi /etc/yum.repos.d/<rpm-registry-name>.repo
```
:::info yum default
YUM and DNF both default to the yum.repos.d directory.
:::

2. Add `.repo` file content:
```yaml
[<rpm-registry-name>]
name=<rpm-registry-name>
baseurl=https://pkg.app.harness.io/pkg/<account-id>/<rpm-registry-name>/rpm
enabled=1
gpgcheck=0
username=<username>
password=<token-from-step-2>
```

3. Clear your YUM or DNF cache:
```bash
sudo <yum-or-dnf> clean all
```

4. Install the RPM package:
```bash
sudo <yum-or-dnf> install <artifact-name>
```
### 3. Upload an RPM package
1. Run the following cURL command with your package file:
```bash
curl --location --request PUT 'https://pkg.app.harness.io/pkg/<account-id>/<rpm-registry-name>/rpm/' \
--form 'file=@"<FILE_PATH>"' \
--header 'x-api-key: <API_KEY>'
```

- Click **Done** to complete your client setup.
</TabItem>
</Tabs>

---

By following this guide, you can create and manage an RPM Artifact Registry in Harness, configure an optional upstream proxy, and use YUM or DNF to install and upload packages.

## Next Steps
- [Integrate with your CD pipelines](/docs/artifact-registry/platform-integrations/cd-ar-integrations)
- [Learn about security integrations](/docs/artifact-registry/platform-integrations/security-integrations/ssd-ar-integrations)
- [Automate actions with Webhooks](/docs/artifact-registry/ar-webhooks)
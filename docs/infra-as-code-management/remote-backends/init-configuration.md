---
title: Backend Configuration
description: Initialize your infrastructure dynamically with environment variables
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


This guide provides insights on configuring your [OpenTofu](https://opentofu.org/) or Terraform backend using environment variables, presenting two approaches: 
- **Dynamic configuration:** Perfect for environments requiring frequent updates, offering seamless adjustments without altering core files.
- **Partial configuration:** Ideal for streamlined setups, leveraging environment variables to enhance security and simplify updates.

 <Tabs>
<TabItem value="Dynamic configuration">
Both OpenTofu and Terraform offer a flexible and adaptable backend setup by utilizing environment variables. This approach is particularly beneficial for managing multiple environments efficiently, as it caters to environments requiring frequent changes or updates. By employing [environment variables](/docs/infra-as-code-management/remote-backends/init-configuration#add-new-environment-variables), dynamic configuration allows you to seamlessly adjust backend settings without altering the core configuration files. This flexibility ensures that your infrastructure remains adaptable to evolving requirements, providing a robust solution for dynamic and multi-environment management.

### Setting Up Dynamic Configuration
- **Environment Variable Format:** Use the format `PLUGIN_PLUGIN_INIT_BACKEND_CONFIG_` followed by a `unique identifier`.

**Example Variables for AWS S3:**
- `PLUGIN_INIT_BACKEND_CONFIG_BUCKET`
- `PLUGIN_INIT_BACKEND_CONFIG_KEY`
- `PLUGIN_INIT_BACKEND_CONFIG_REGION`
- `PLUGIN_INIT_BACKEND_CONFIG_DYNAMODB_TABLE`

### How to Configure (Dynamic):
- **Define Variables:** Set the necessary environment variables in your IaCM workspace

:::important
To set up an environment variable that populates your backend configuration as part of the tofu/terraform `init -backend-config` command, you must name your variables in the format `PLUGIN_PLUGIN_INIT_BACKEND_CONFIG_` followed by a `unique identifier`. For example:

```hcl
tofu init -backend-config="bucket=\${PLUGIN_INIT_BACKEND_CONFIG_BUCKET}" \
          -backend-config="key=\${PLUGIN_INIT_BACKEND_CONFIG_KEY}" \
          -backend-config="region=\${PLUGIN_INIT_BACKEND_CONFIG_REGION}"
```
:::

- **Initialize Backend:** Use the `init` command with the `-backend-config` option to specify the environment variables.
</TabItem>
<TabItem value="Partial configuration">
Opting for partial configuration provides a streamlined approach by defining a minimal backend setup in your configuration files. [Environment variables](/docs/infra-as-code-management/remote-backends/init-configuration#add-new-environment-variables) are then used to fill in the missing details. This method simplifies updates and enhances security by centralizing sensitive information in environment variables, making it easier to manage and protect your configurations across different environments.

Go to [OpenTofu partial backend configuation](https://opentofu.org/docs/language/settings/backends/configuration/#partial-configuration) to learn more.

**Example of Partial Configuration**
```hcl
terraform {
  backend "s3" {}
}
```

### How to Configure (Partial):
- **Define Backend Block:** Create a backend block with minimal details in your configuration file.
- **Supply Variables:** Use environment variables to provide the missing values during the `init` command.

:::important
When setting up environment variables to populate your backend configuration as part of the tofu/terraform `init -backend-config` command, ensure that you name your variables in the format `PLUGIN_PLUGIN_INIT_BACKEND_CONFIG_` followed by a `unique identifier`. This helps in correctly applying the backend configuration during initialization. For example:

```hcl
tofu init -backend-config="bucket=\${PLUGIN_INIT_BACKEND_CONFIG_BUCKET}" \
          -backend-config="key=\${PLUGIN_INIT_BACKEND_CONFIG_KEY}" \
          -backend-config="region=\${PLUGIN_INIT_BACKEND_CONFIG_REGION}"
```
:::
</TabItem>
 </Tabs>

---

## Add new environment variables
To add new environment variables, follow these steps:

<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/aa30519d-534a-4017-a0bb-8d0439f5258a" title="Configure your OpenTofu/Terraform backend config with Harness environment variables" />
</TabItem>
<TabItem value="Step-by-step">

  1. Navigate to the **Infrastructure** module.
  2. Select **Workspaces**, then select the **Variables** tab.
  3. Select **New Environment Variable**.
  4. Add your variables:
      - **Key**: `PLUGIN_INIT_BACKEND_CONFIG_*IDENTIFIER*`
      - **Value**: Parameter `key=value` pair, e.g. `region=us-east-1`

![init environment variables](./static/tf-init-env-variables.png)
</TabItem>
</Tabs>
---

## Review Your Configuration
Once your environment variables are configured and your provisioning pipeline is prepared, execute the pipeline. Review the console log during the `init` step to confirm that your variable values are correctly applied.

![Pipeline environment variable usage](./static/tf-initi-variable-log.png)

## Conclusion
Utilizing environment variables for backend configuration in OpenTofu or Terraform provides a dynamic and secure method for managing your infrastructure across various environments. By following this guide, you can effectively set up and use environment variables for a seamless backend configuration.

For more detailed information on supported backend configurations, refer to the [OpenTofu documentation on backend configuration](https://opentofu.org/docs/language/settings/backends/configuration/).
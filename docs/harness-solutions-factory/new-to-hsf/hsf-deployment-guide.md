---
title: Deploy Harness Solutions Factory
description: How to deploy HSF on your own
sidebar_label: Deploy HSF
sidebar_position: 20
---

## Before you begin

Before HSF can be deployed, confirm the following:

- IaCM is required. Depending on your architecture and the operating mode you choose, you may also need IDP and Harness Code Repository. If your account is not licensed for the modules you need, Harness can provide a limited license covering HSF usage for managing Harness entities.
- You have an account with admin-level permissions, or can coordinate with someone who does to generate a temporary Personal Access Token (PAT). This token is used to create account-level resources during deployment and can be deleted afterward.
- No account-level OPA policies are in place that would block pipeline execution.
- You have OpenTofu installed locally, or the mise environment configured.

---

## Deploy HSF

1. Clone the [HSF 2.5 repository](https://github.com/harness/Harness-Solutions-Factory) to your local machine.
2. Go into the `pilot-light` directory, locate the **Terraform examples file** (`terraform.tfvars.example`). Save a copy without the `.example` extension.
3. Open the file and fill in the following required values:
    - **harness_platform_url :** your Harness platform URL. This must be changed if there is a vanity URL
    - **harness_platform_account :** your Harness account ID
    - **harness_platform_key :** a Harness API key with appropriate permissions
    - **initial_admin_user:** email address for admin user. If left blank, no user will be added to the HSF Admin group, so do not skip it.
4. The following variables have defaults but you should review them:

| Variable | Default | Notes |
| --- | --- | --- |
| `store_backend` | `false` | Controls whether Terraform state is pushed to the remote backend. Leave `false` for the first run. |
| `should_unpack` | `false` | Must be set to `true` for the initial deployment. Set back to `false` afterward, because it is a one-time operation. |
| `should_setup_custom_tpl` | `false` | Enable creating local harness code repo for custom configurations. This requires Harness Code Repository to be enabled |
| `should_use_harness_idp` | `true` | Toggle IDP support on or off as needed. This requires Harness Internal Developer Portal to be enabled |
5. Review and set **SCM Source Configurations:** By default, the deployment pulls from the official Harness GitHub repository. If you want to use a custom connector (e.g., your own GitHub Enterprise or a different registry):
    1. Set `hsf_source_connector` to your connector's identifier ex: account.github
    2. Update the `hsf_source_fetch_type` to `branch`, `tag`, or `SHA` accordingly
    3. **Going forward, HSF 2.5 defaults to pinning by tag.** This is the recommended approach for controlled upgrades
6. Review and set **Kubernetes Configurations:** If you are using Kubernetes set the variables accordingly
7. Review and set **HSF Plugin Configurations:** If you are using Artifactory or Nexus instead of Docker Hub, set the connector and update each image reference to point to your internal registry. Use the fully qualified hostname. Go to [Host Your Own Images](/docs/harness-solutions-factory/use-hsf/configurations/hosting-your-own-images) to review registry configuration.
8. Save the changes
9. With `store_backend = false` and `should_unpack = true`, run the deployment
    - If using mise: `mise deploy`
    - If using tofu:

      ```bash
      tofu init
      tofu plan
      tofu apply
      ```

The deployment will create all infrastructure resources. You can flip back to your Harness account and watch the **Solutions Factory project** appear under Projects. Once visible, verify:
- The config is pointing to the correct GitHub connector
- The git tag/branch is set as expected
- Kubernetes and other connectors are populated under the workspace's variables

:::note
The **SCM Source Configurations** variables are not copied over to Pilot Light variables because we only want to manage them through the Configurations and not both places.
:::

10. Once the first deployment completes successfully, you will notice that the Harness Pilot Light workspace contains no state file. That is linked to the `store_backend` variable. To migrate the Terraform state to the remote backend so it is managed from within Harness going forward:
    - In your variables file, set `store_backend = true`
    - Run deploy again to generate the backend configuration file:
        - `mise deploy` or `tofu apply`
    - Run init to copy the local state to the remote:
        - `mise init`

When prompted **"Do you want to copy your local state to the remote?"**, enter **yes**.

Go back to your Harness workspace and refresh the state view. You now see the state file uploaded and the workspace showing as locked, which is the expected behavior after a local CLI push. Click **Unlock**.

:::note
The backend config file and local repository do not need to be maintained after this point. All future runs should be executed directly from Solutions Factory.
:::

11. Run the `Unpack Solutions Factory` pipeline. In Harness, navigate to Pipelines inside the `Pilot Light` project find the Unpack pipeline and click Run.

Once complete:

- The Solutions Factory will be deployed
- IDP workflows will be registered from the configured remote repository
- New workspaces will be created using the connector configuration you set
- Run one final quick provision from Solutions Factory to confirm the environment is stable and self-contained
    - Run Managed Pilot Light
    - Run Deploy Solutions Factory

:::note
All updates are run through Solutions Factory, not through the local repository.
:::

## Next steps

Your Solutions Factory deployment is live and managing its own state. Continue with the following:

- [How HSF Works](/docs/harness-solutions-factory/new-to-hsf/how-hsf-works): Understand the Pilot Light and Solutions Factory relationship you just deployed.
- [Mini Factory and Factory Floor](/docs/harness-solutions-factory/use-hsf/mini-factory-and-factory-floor): Start provisioning projects from the factory.
- [Host Your Own Images](/docs/harness-solutions-factory/use-hsf/configurations/hosting-your-own-images): Point HSF plugin images at your own registry.

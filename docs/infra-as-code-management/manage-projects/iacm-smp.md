---
title: Self-Managed Platform (SMP)
description: Enable and configure Infrastructure as Code Management (IaCM) in a self-hosted Harness deployment.
sidebar_position: 40
---

:::info beta status
IaCM is available on the Self-Managed Platform (SMP) as an **early Beta** feature.
While generally available for certain use cases, IaCM on SMP has a few important caveats:

- **Cost estimation is not currently supported**.
- **Airgapped environments may require additional configuration** to access providers and modules.
:::

## Before You Begin
Make sure your SMP deployment is installed with the latest version of the Helm chart. Follow the [SMP installation instructions](/docs/self-managed-enterprise-edition/install/upgrade-helm-chart.md).

You’ll also need:
- A valid IaCM Enterprise or Trial license.
- Access to your Harness deployment values.
- Ability to set feature flags and override container images.

Go to [SMP basic configuration](/docs/self-managed-enterprise-edition/smp-basic-configuration/) or contact [Harness Support](support@harness.io) for help retrieving your prerequisites.

---

## Enable IaCM in values.yaml
In your `values.yaml`, add the following to enable the IaCM module:

```yaml
global:
  iacm:
    enabled: true
```

### Update Your License
Replace your existing license with one that includes IaCM (Enterprise or Trial). Update this block in your values.yaml:

```yaml
global:
  ng: <insert your new license string>
```
You can request a new license from your Harness support representative.

### Add Required Feature Flags
Include the following feature flags to enable IaCM capabilities. These may become default in future releases.

```yaml
platform:
  harness-manager:
    featureFlags:
      ADDITIONAL: "IACM_CLONE_SUBMODULES,IACM_WORKSPACE_SHA_CLONE,IACM_ENABLE_SSH_MODULE_REGISTRY,IACM_ENABLE_DEFAULT_PIPELINES,IACM_ENABLE_MODULE_REGISTRY"
```

### Use a Custom Image for IaCM Steps (Airgapped workaround)
If your environment blocks external network access, the default pipeline step images may fail when trying to download your [OpenTofu](https://opentofu.org/) or Terraform binary.

To resolve this:
	1.	Build a custom version of the `plugins/harness_terraform` image with the required terraform binary embedded.
	2.	Follow the steps in [custom images](/docs/infra-as-code-management/pipelines/plugin-images) to configure the `iacm-manager` to use your image.

## Next Steps
Once your SMP deployment is configured, return to the [IaCM Get Started](/docs/infra-as-code-management/get-started/get-started) guide to connect a repo, create a workspace, and build your first pipelines.
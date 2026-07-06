---
title: Custom images for OpenTofu
sidebar_label: Custom Images
description: Use custom plugin images for OpenTofu workspaces when you need additional tooling or restricted network access.
sidebar_position: 90
keywords:
  - opentofu
  - custom images
  - plugin images
  - air-gapped
  - private providers
  - iacm
tags:
  - iacm
  - opentofu
---

Harness provides default plugin images for OpenTofu workspaces that work for most use cases. Harness uses the default plugin image for OpenTofu workspaces unless you configure a custom image. The default image includes the OpenTofu binary and common build tools. Go to [Harness Cloud VM Images](/docs/platform/references/harness-cloud-vm-images) to review the tools included in the default images.

For specialized requirements like air-gapped environments, private providers, or additional CLI tools, you can build and use custom plugin images.

Custom images extend the base Harness plugin image with your own binaries, providers, or certificates. Once built and published to a container registry, you reference the custom image in your pipeline configuration.

---

## What you will learn

- When OpenTofu users need custom plugin images
- Common OpenTofu scenarios that require custom images
- OpenTofu-specific considerations for custom images
- Where to find complete instructions for building and using custom images

---

## When to use custom images

Most OpenTofu workspaces work with the default Harness plugin images. If the default image meets your requirements, you do not need a custom image. Consider custom images when you have requirements the default image cannot meet.

### Common OpenTofu scenarios

**Air-gapped environments:** Your infrastructure cannot reach the public OpenTofu registry. Pre-install the required providers in the custom image so the pipeline does not need to download them during `tofu init`.

**Private providers:** Your OpenTofu configuration uses proprietary or internal providers not available in the public registry. Include the provider binaries in the custom image so OpenTofu can load them during initialization.

**Additional CLI tools:** Your pipeline runs additional commands alongside OpenTofu (for example, `kubectl`, `aws`, `jq`, `helm`). Include these binaries in the custom image so they are available in the pipeline environment.

**Enterprise certificates:** Your infrastructure requires custom CA certificates to trust internal endpoints. Add the certificates to the custom image so OpenTofu can communicate with internal services.

If none of these scenarios apply to your workspace, use the default plugin images.

---

## OpenTofu considerations

When building custom images for OpenTofu workspaces, consider these OpenTofu-specific factors:

### Provider downloads

During `tofu init`, OpenTofu downloads required providers from the OpenTofu registry and retrieves modules from the sources referenced in your configuration. For air-gapped environments where internet access is not available, pre-install providers in the custom image or configure a private module registry.

Go to [Custom Images](/docs/infra-as-code-management/pipelines/plugin-images) for network connectivity requirements, domain allowlists, and private registry configuration.

### OpenTofu binary

Add only the additional tools or providers your OpenTofu workflow requires. The workspace OpenTofu version setting determines which `tofu` binary version the pipeline uses.

### Version compatibility

Ensure any providers or tools you add to the custom image are compatible with the OpenTofu version configured in your workspace. Provider version constraints in your OpenTofu configuration must match the providers included in the custom image for air-gapped scenarios.

---

## Build and use custom images

Harness provides base plugin images that you can extend with your own tooling. The base image already includes the OpenTofu binary and common dependencies.

Go to [Custom Images](/docs/infra-as-code-management/pipelines/plugin-images) for:
- Supported base images (`plugins/harness_terraform` and `plugins/harness_terraform_vm`)
- Complete Dockerfile examples
- Build and publishing instructions
- Pipeline YAML configuration
- Connector setup for private registries
- Version management guidance

---

## Next steps

You now have the core knowledge needed to work with OpenTofu in Harness IaCM. From here, you can explore advanced IaCM features that work across all provisioners:

- [OPA Policies](/docs/infra-as-code-management/policies-governance/opa-workspace): Enforce governance rules on infrastructure changes before they are applied.
- [PR Automation](/docs/infra-as-code-management/pipelines/operations/pr-automation): Automatically run plans and post results as comments on pull requests.
- [Cost Estimation](/docs/infra-as-code-management/workspaces/cost-estimation): Preview infrastructure costs before provisioning.
- [Connectors & Variables](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables): Manage configuration values and integrations across workspaces.

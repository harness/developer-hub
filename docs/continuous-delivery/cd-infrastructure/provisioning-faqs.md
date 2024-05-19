---
title: General Provisioning FAQs
description: Frequently asked questions about provisioning.
sidebar_position: 10
---

### What if I have a custom provisioning tool, how can Harness support this?

Harness has first-class support for Terraform, Terragrunt, AWS CloudFormation, Azure ARM, and Blueprint provisioners, but to support different provisioners, or your existing shell script implementations, Harness includes Shell Script provisioning.
More details here [here](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning).

### Does Harness support Cosmos DB?

Harness doesn’t do database orchestration out of the box today. To orchestrate the SQL Changes to the database, you need to customize our functionality using the following:

- [Container step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/container-step)
- [Container step group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups) 
- [Shell Script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step) 
- [Shell Script Provisioner](/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning) 

To create a Cosmos DB, we support the creation via:

- [Azure ARM](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning) 
- [Azure Blueprint](/docs/continuous-delivery/cd-infrastructure/azure-blueprint-provisioning) 
- [Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness)

### Does Harness support Azure Cache?

Azure Cache is not an application that a user deploys. It’s a managed Redis service by Azure. Harness can assist in spinning up Azure Cache by our infrastructure provisioning capabilities:

- [Azure ARM](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning) 
- [Azure Blueprint](/docs/continuous-delivery/cd-infrastructure/azure-blueprint-provisioning) 
- [Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness) 

### Does Harness support Azure App Services?

No, we do not support Azure App Services as a native swimlane like Azure Web Apps.

We do support [deployment templates](/docs/continuous-delivery/deploy-srv-diff-platforms/custom/custom-deployment-tutorial) to achieve the use case.

Or you can orchestrate the release via: 

- [Azure ARM](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning) 
- [Azure Blueprint](/docs/continuous-delivery/cd-infrastructure/azure-blueprint-provisioning) 
- [Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness)

### Does Shell Script provisioning step has built in output variables?

Shell Script Provisioning step does not have script output variables similar to Shell Script step. Their variable configuration step only have option for input variables.

### How to access output variables from Shell Script Provisioning step?

The Shell Script Provisioning step expects the output to be put to a json form inside the file `$PROVISIONER_OUTPUT_PATH`. This is then subsequently accessed in next step with Instance variable like below:
 
`<+pipeline.stages.shellscriptprovision.spec.execution.steps.shell1.output.Instances>`

### To store my shell script when I use Harness File Store I don't see any option like Bitbucket, or GitHub.

As of today, we have only two options to select the shell script provision script. That is inline and Harness file store.


### Do we have predefined rollback step while using Shell Script provisioning>

No, Out for the box Rollback step is not available and you need to add your own scripts under Rollback section of the stage Environment.

### Why can't I deploy an ARM template?

If you are getting the below error when attempting to deploy ARM templates, it might be because `$schema` and `contentVersion` parameters have not been removed from the Parameters File yet. This is due to a limitation in the Azure Java SDK and REST API.

```
Status code 400, "{"error":{"code":"InvalidRequestContent","message":"The request content was invalid and could not be deserialized: 'Error converting value \"https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#\" to type 'Azure.Deployments.Core.Definitions.DeploymentParameterDefinition'. Path 'properties.parameters.$schema', line 1, position 6636.'."}}"
```

For an example of a valid Parameters File, go to [ARM parameter file](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning/#arm-parameter-file).
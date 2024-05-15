#### Is this the right format to push a secret to the Azure key vault? secret.setVaule("azurevauly://avidentifier/pathToSecret", secretVaule)
secret.setValue is not supported. Secrets can be referred to only using ```secret.getValue("azurevauly://avidentifier/pathToSecret")``` or `secret.getValue("secretIdentifierInHarness")`

#### Can I use the Harness GitOps Agent with different Kubernetes distributions?

Yes, the Harness GitOps Agent is designed to work with various Kubernetes distributions, including managed Kubernetes services like Amazon EKS, Google Kubernetes Engine (GKE), and Azure Kubernetes Service (AKS), as well as self-managed Kubernetes clusters.


#### Do we support nested AD groups syncing to Harness on AD SCIM sync?

Enabling Azure AD provisioning in Harness allows user provisioning from Azure AD. Users directly provisioned require group assignment in Harness, while Azure AD group members' group assignments are managed in Azure AD. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim/)


#### What are some of the Artifact Repository for Container images to deploy with Chart?

* DockerHub
* Amazon Elastic Container Registry
* Google Container Registry
* Azure Container Registry
* Custom Artifact Source
* Google Artifact Registry
* GitHub Package Registry
* Nexus 3
* Artifactory


#### What if I have a custom provisioning tool, how can Harness support this?

Harness has first-class support for Terraform, Terragrunt, AWS CloudFormation, Azure ARM, and Blueprint provisioners, but to support different provisioners, or your existing shell script implementations, Harness includes Shell Script provisioning.
More details here [here](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning)


#### How do I pass --target-path to deploy the code into the different path in Azure Web App deployment?

Unfortunately, we currently don't have any parameters to pass the target path.


#### How to deploy Azure SpringApps JAR via Harness CD?

You can take advantage of our ssh deployment and include a step to download the JAR.


#### What is the correct url format for Azure git repo to be used in git ops repository?

The url format for the Azure git repo to be specified in gitOps repository is below:
```
https://someuser@dev.azure.com/someuser/someproject/_git/test.git
```


#### How can I deploy the application on a custom specified location in the Azure web app?

Currently, we don't have any facility to do the web app deployment in the custom-specified location in Azure. Alternatively, you can use the shell script step and use the Azure CLI to pass the required argument


#### Do we support Terraform Harness provider configuring New Relic as a health source for a monitored service ?

Yes, we support health source like  `New Relic` , `ElasticSearch`, `Sumologic Metrics`, `Sumologic Log`, `Splunk Signal FX`,`Grafana Loki Log`,`Azure Metrics`, `Azure Log Health`, `Prometheus`, `Datadog` and `Metrics`.


#### How does the newly introduced support for Azure Logs as a Health Source in Harness contribute to service monitoring, particularly through the utilization of Cloud Metrics and Cloud Logs ? 

Harness has now launched support for Azure Logs Support as a Health Source for CV and has enabaled for all accounts . Users can use Cloud Metrics and Cloud Logs to monitor their deployed service. This was a feature parity item with Harness First Gen. One may also follow the same in our [Documenatation](https://developer.harness.io/docs/service-reliability-management/monitored-service/health-source/azurelogs/)


#### Does Harness support SSH deployments using the GCP connector like AWS and Azure ?

No, this feature is yet to be supported. We suggest to use ssh key or user and password as datacenter as an alternative at the moment.


#### Does the Azure connector support service principles ?

Yes. We support System Assigned Managed Identity and User Assigned Managed Identity in the Azure Global and Government environments.
The service principal maps to a managed identity.


#### Does Harness support Azure Container Apps ?
No, due to low customer request it is not on our roadmap. Please feel free to create a request for the same.
Please read more on what we support in Harness in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-integrations)


#### How can one handle credentials rotation policies for AWS connectors that require access key id and secret access key without the usage of delegate ?

While a functioning and stable delegate is imperative, it is advisable to prioritize its use. However, if there is a preference for connecting via platform, provided there is an external secrets manager in place and a streamlined process for automatic key updates within that system during rotations, integration through that avenue could be considered.
**Note** 
- Continuous Delivery cannot use the Platform based auth for all the connectors because the deployment jobs run on the delegate. Things like GitHub are feasible, but AWS, GCP, and Azure are not really possible because the credential exchange happens on the delegate


#### Is there any internal or external documentation available for building and deploying updates for an Azure SQL Server database ?

No, We do not have a prescribed way to do this it would need to be their own scripts.


#### How to prepare Azure VMSS Deployment in Harness ?

Harness provides a template specific to Azure VMSS Deployment which can be referred from the following [Custom Template Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#azure-vmss---deployment-template-sample)


#### Why can't I deploy an ARM template?

If you are getting the below error when attempting to deploy ARM templates, it might be because `$schema` and `contentVersion` parameters have not been removed from the Parameters File yet. This is due to a limitation in the Azure Java SDK and REST API.

```
Status code 400, "{"error":{"code":"InvalidRequestContent","message":"The request content was invalid and could not be deserialized: 'Error converting value \"https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#\" to type 'Azure.Deployments.Core.Definitions.DeploymentParameterDefinition'. Path 'properties.parameters.$schema', line 1, position 6636.'."}}"
```

For an example of a valid Paramters File, go to [ARM parameter file](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning/#arm-parameter-file).


#### Why am I getting the error: `az command is not found`?
If you receive the below error

```
az command not found
```
It indicates that the Azure CLI is not installed in your session. This typically happens when running a Shell Script step on the Delegate or when running a script in a CI Build Stage. To fix this, please make sure to install the Azure CLI on the Delegate. Go to [Add Your Custom Tools](https://developer.harness.io/docs/platform/delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries/#add-your-custom-tools) for more information.



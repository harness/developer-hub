#### Is this the right format to push a secret to the Azure key vault? secret.setVaule("azurevauly://avidentifier/pathToSecret", secretVaule)
secret.setValue is not supported. Secrets can be referred to only using ```secret.getValue("azurevauly://avidentifier/pathToSecret")``` or `secret.getValue("secretIdentifierInHarness")`

#### Do we support nested AD groups syncing to Harness on AD SCIM sync?

Enabling Azure AD provisioning in Harness allows user provisioning from Azure AD. Users directly provisioned require group assignment in Harness, while Azure AD group members' group assignments are managed in Azure AD. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim/)


#### What is the correct url format for Azure git repo to be used in git ops repository?

The url format for the Azure git repo to be specified in gitOps repository is below:
```
https://someuser@dev.azure.com/someuser/someproject/_git/test.git
```


#### How does the newly introduced support for Azure Logs as a Health Source in Harness contribute to service monitoring, particularly through the utilization of Cloud Metrics and Cloud Logs ? 

Harness has now launched support for Azure Logs Support as a Health Source for CV and has enabled for all accounts . Users can use Cloud Metrics and Cloud Logs to monitor their deployed service. This was a feature parity item with Harness First Gen. One may also follow the same in our [Documentation](https://developer.harness.io/docs/service-reliability-management/monitored-service/health-source/azurelogs/)


#### How to prepare Azure VMSS Deployment in Harness ?

Harness provides a template specific to Azure VMSS Deployment which can be referred from the following [Custom Template Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#azure-vmss---deployment-template-sample)


#### Why can't I deploy an ARM template?

If you are getting the below error when attempting to deploy ARM templates, it might be because `$schema` and `contentVersion` parameters have not been removed from the Parameters File yet. This is due to a limitation in the Azure Java SDK and REST API.

```
Status code 400, "{"error":{"code":"InvalidRequestContent","message":"The request content was invalid and could not be deserialized: 'Error converting value \"https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#\" to type 'Azure.Deployments.Core.Definitions.DeploymentParameterDefinition'. Path 'properties.parameters.$schema', line 1, position 6636.'."}}"
```

For an example of a valid Paramters File, go to [ARM parameter file](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning/#arm-parameter-file).



---
title: AzureML
description: Use AzureML with Harness.
sidebar_position: 10
---

You can use AzureML in your MLOps workflow. For more information about AzureML, go to the [Azure ML documentation](https://learn.microsoft.com/en-us/azure/machine-learning/?view=latest).

## Use AzureML with Harness

In addition to the AzureML plugin, you can run any AzureML commands in a Run step or Shell Script step in your Harness CI/CD pipelines, not to mention the other steps and modules that Harness offers to support your full SDLC.

### AzureML plugin

You can use the AzureML plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) in a CI pipeline.


```yaml
              - step:
                  type: Plugin
                  name: Azureml plugin
                  identifier: azureml_plugin
                  spec:
                    connectorRef: account.harnessImage
                    image: harnesscommunity/azure-ml
                    settings:
                      username: <+secrets.getValue("azureml_user")>
                      password: <+secrets.getValue("azureml_pass")>
                      tenant_id: <+secrets.getValue("azureml_tenant")>
                      SUBSCRIPTION_ID: <+secrets.getValue("azureml_subscription")>
                      AZURE_ML_WORKSPACE_NAME: my-azure-workspace
                      RESOURCE_GROUP: my-azure-resource-group
                      PROJECT_PATH: https://github.com/Azure/azureml-examples
                      TRAINING_JOB_FILE: azureml-examples/cli/jobs/single-step/scikit-learn/iris/job.yml
                      MODEL_NAME: iris-model-test
                      ENDPOINT_NAME: iris-endpoint-test
                      ENDPOINT_YAML: azureml-examples/cli/endpoints/online/managed/sample/endpoint.yml
                      DEPLOYMENT_NAME: deploy-iris
                      DEPLOYMENT_YAML: azureml-examples/cli/endpoints/online/managed/sample/blue-deployment.yml
                    imagePullPolicy: Always
```

### AzureML plugin settings

*  `type: Plugin`
*  `name:` Specify a step name.
*  `identifier:` Specify a unique step ID.
*  `connectorRef:` Specify a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
*  `image: harnesscommunity/azure-ml`
*  `settings:` Configure the plugin parameters.
   * `username`: Azure username
   * `password`: Azure password
   * `tenant_id`: Azure tenant ID
   * `SUBSCRIPTION_ID`: Azure subscription ID
   * `AZURE_ML_WORKSPACE_NAME`
   * `RESOURCE_GROUP`: Azure resource group name
   * `PROJECT_PATH`: AzureML project repo URL
   * `TRAINING_JOB_FILE`: Path in project repo to the training job file
   * `MODEL_NAME`
   * `ENDPOINT_NAME`: Model endpoint name
   * `ENDPOINT_YAML`: Path in project repo to the model `endpoint.yml`
   * `DEPLOYMENT_NAME`: Name for the model when deployed
   * `DEPLOYMENT_YAML`: Path in project repo to the `*-deployment.yml`

:::tip

You can use expressions for plugin settings. For example, `<+stage.variables.trackingUri>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables). You can also create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords, and then use expressions to reference those secrets.

:::
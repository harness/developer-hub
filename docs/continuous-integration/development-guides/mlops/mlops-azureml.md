---
title: AzureML
description: Use AzureML with Harness.
sidebar_position: 10
---

<!-- AzureML is... -->

## AzureML MLOps

### Notebook

### Train


### Evaluate

### Deploy

<!-- ref to provider docs -->

### Monitor

## Use AzureML with Harness

<!-- plugin - see MLflow example -->

<!-- train, register, and deploy model -->

<!--Need public image location -->

```yaml
              - step:
                  type: Plugin
                  name: Azureml plugin
                  identifier: azureml_plugin
                  spec:
                    connectorRef: account.harnessImage
                    image: harness-community/azure-ml
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

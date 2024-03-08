---
title: AWS Sagemaker
description: Use AWS Sagemaker with Harness.
sidebar_position: 11
---

[MLOps sample repository](https://github.com/harness-community/mlopssample)

<!-- Sagemaker is... -->

## Sagemaker MLOps

### Notebook

### Train


### Evaluate

### Deploy

<!-- ref to provider docs -->

### Monitor

## Use Sagemaker with Harness

<!-- compile a model from a notebook and deploy it to sagemaker -->
<!-- plugin - see MLflow example -->

Training can be done in Harness or using native integrations with popular data science platforms, such as AWS Sagemaker.

### MLflow plugin

You can use the MLflow plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) in a CI pipeline.

```yaml
              - step:
                  type: Plugin
                  name: mlflow plugin
                  identifier: maven_plugin
                  spec:
                    connectorRef: account.harnessImage ## Docker Hub container registry connector
                    image: harnesscommunity/mlflow
                    settings:
                      MLFLOW_TRACKING_URI: http://12.345.678.900:5000
                      MLFLOW_EXPERIMENT_NAME: someExperimentName
                      MLFLOW_PROJECT_PATH: https://github.com/someAccount/mlflow-example-project
                      MLFLOW_RUN_PARAMETERS: n_estimators=150
                    imagePullPolicy: Always
```

### MLflow plugin settings

*  `type: Plugin`
*  `name:` Specify a step name.
*  `identifier:` Specify a unique step ID.
*  `connectorRef:` Specify a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
*  `image: harnesscommunity/mlflow`
*  `settings:` Configure the plugin parameters.
   * `MLFLOW_TRACKING_URI`: The URI for your [remote tracking server](#remote-tracking-server).
   * `MLFLOW_EXPERIMENT_NAME`
   * `MLFLOW_PROJECT_PATH`
   * `MLFLOW_RUN_PARAMETERS`

:::tip

You can use expressions for plugin settings. For example, `<+stage.variables.trackingUri>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables). You can also create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords, and then use expressions to reference those secrets.

:::
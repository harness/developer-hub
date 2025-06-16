---
title: MLflow
description: Use Mlflow with Harness.
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[MLflow](https://mlflow.org/docs/latest/index.html) is an open-source platform for managing the end-to-end machine learning lifecycle. It includes features for tracking experiments, packaging code into reproducible runs, and sharing and deploying models.

## Install MLflow

Before you can leverage MLflow's functionality you need to install MLflow in your environment, such as a local machine, VM, or cloud provider environment.

You can use pip to install MLflow:

```sh
pip install mlflow
```

## Track experiments with MLflow

One of MLFlow's core components is [MLflow Tracking](https://mlflow.org/docs/latest/tracking.html), which allows you to log parameters, code versions, metrics, and output files when running your data science code and later visualize them.

MLflow Tracking provides a flexible and easy-to-use approach to log and compare parameters, metrics, and models across experiments. By adopting MLflow for experiment tracking, you can significantly enhance the reproducibility, collaboration, and monitoring of your machine learning projects.

To use MLflow Tracking:

1. Initialize MLflow Tracking.

   To track experiments, you can use the `mlflow.start_run()` method in your code. Within this context, you can log parameters, metrics, models, and artifacts.

   This example usd the `mlflow.start_run()` method in a Python script:

   ```python
   import mlflow

   # Start an MLflow run
   with mlflow.start_run():

       # Log parameters (key-value pairs)
       mlflow.log_param("param_name", "param_value")

       # Log metrics (key-value pairs)
       mlflow.log_metric("metric_name", metric_value)

       # Log artifacts (output files)
       # Ensure you have the file you want to log in the current directory
       mlflow.log_artifact("output_file.txt")
   ```

2. Run your code. After integrating MLflow tracking into your code, run your script as you normally would.

   MLflow automatically logs all the parameters, metrics, and artifacts you've specified.

### Use MLflow Tracking in Harness

Training can be done in Harness or using native integrations with popular data science platforms, such as MLflow.

You can include MLflow Tracking in a Harness CI pipeline by using the MLflow plugin.

1. [Install MLflow](#install-mlflow).
2. Add the MLflow plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci).

```yaml
              - step:
                  type: Plugin
                  name: mlflow plugin
                  identifier: maven_plugin
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR 
                    image: harnesscommunity/mlflow
                    settings:
                      MLFLOW_TRACKING_URI: http://12.345.678.900:5000 ## URI for your MLflow remote tracking server
                      MLFLOW_EXPERIMENT_NAME: someExperimentName
                      MLFLOW_PROJECT_PATH: https://github.com/someAccount/mlflow-example-project
                      MLFLOW_RUN_PARAMETERS: n_estimators=150
                    imagePullPolicy: Always
```

:::tip

You can use expressions for plugin settings. For example, `<+stage.variables.trackingUri>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables). You can also create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords, and then use expressions to reference those secrets.

:::

### Advanced tracking

In addition to standard MLflow Tracking, you can enable these advanced tracking options:

#### Log models

You can log models in a format that can later be deployed for serving. In this example `sk_model` is a trained Scikit-Learn model, and `"model"` is the artifact path for this model in the MLflow run.

```python
mlflow.sklearn.log_model(sk_model, "model")
```

#### Use MLflow Projects and Models

For more structured experimentation, consider packaging your code as an [MLflow Project](https://mlflow.org/docs/latest/projects.html) and using [MLflow Models](https://mlflow.org/docs/latest/models.html) for model packaging and deployment.

#### Remote Tracking Server

For team environments and in Harness pipelines, consider setting up a [remote tracking server](https://mlflow.org/docs/latest/tracking/tutorials/remote-server.html) that all team members can access instead of using the local file system. MLflow supports various backend stores for tracking, such as a SQL database, and artifact stores like S3, Azure Blob Storage, or Google Cloud Storage.

To configure MLflow to use a remote server, set the `MLFLOW_TRACKING_URI` environment variable:

```sh
export MLFLOW_TRACKING_URI='http://your-tracking-server:5000'
```

Or set it within your Python code with the `mlflow.set_tracking_uri()` method:

```python
mlflow.set_tracking_uri('http://your-tracking-server:5000')
```

## View tracking results

You can view MLflow Tracking results in the MLflow UI. To start the MLflow UI run `mlflow ui`.

By default, this UI runs on `http://127.0.0.1:5000`, unless you are serving results to a [remote tracking server](#remote-tracking-server). Navigate to your UI or tracking server URL in a web browser to view your experiments, navigate through recorded runs, compare metrics, and visualize parameters and outputs.

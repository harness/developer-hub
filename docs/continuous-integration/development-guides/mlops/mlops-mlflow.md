---
title: MLflow
description: Use Mlflow with Harness.
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[MLflow](https://mlflow.org/docs/latest/index.html) is an open-source platform for managing the end-to-end machine learning lifecycle. It includes features for tracking experiments, packaging code into reproducible runs, and sharing and deploying models.

One of its core components is [MLflow Tracking](https://mlflow.org/docs/latest/tracking.html), which allows you to log parameters, code versions, metrics, and output files when running your data science code and later visualize them.

MLflow Tracking provides a flexible and easy-to-use approach to log and compare parameters, metrics, and models across experiments. By adopting MLflow for experiment tracking, you can significantly enhance the reproducibility, collaboration, and monitoring of your machine learning projects.

## Experiment tracking with MLFlow

To use MLflow for model tracking:

1. Install MLflow.

   ```sh
   pip install mlflow
   ```

2. Initialize MLflow tracking.

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

3. Run your code. After integrating MLflow tracking into your code, run your script as you normally would.

   MLflow automatically logs all the parameters, metrics, and artifacts you've specified.

4. View the results in the MLflow UI.

   Start the MLflow UI by running `mlflow ui`.

   By default, this UI runs on `http://127.0.0.1:5000`. Navigate to this URL in a web browser to view your experiments, navigate through recorded runs, compare metrics, and visualize parameters and outputs.

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

For team environments and in Harness pipelines (which are temporary workspaces), consider setting up a [remote tracking server](https://mlflow.org/docs/latest/tracking/tutorials/remote-server.html) that all team members can access instead of using the local file system. MLflow supports various backend stores for tracking, such as a SQL database, and artifact stores like S3, Azure Blob Storage, or Google Cloud Storage.

To configure MLflow to use a remote server, set the `MLFLOW_TRACKING_URI` environment variable:

```sh
export MLFLOW_TRACKING_URI='http://your-tracking-server:5000'
```

Or set it within your Python code with the `mlflow.set_tracking_uri()` method:

```python
mlflow.set_tracking_uri('http://your-tracking-server:5000')
```

## Use MLflow in Harness

In addition to the MLflow plugin, you run any MLflow commands in a Run step or Shell Script step in your Harness CI/CD pipelines, not to mention the other steps and modules that Harness offers to support your full SDLC.

### MLflow plugin

You can use the MLflow plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) in a CI pipeline.

<!--

```yaml
              - step:
                  type: Plugin
                  name: upload_sonatype
                  identifier: upload_sonatype
                  spec:
                    connectorRef: account.harnessImage ## Docker Hub container registry connector
                    image: harnesscommunity/publish-nexus-repository:1.1.1
                    settings:
                      username: deploy-user ## Nexus Repository Manager username
                      password: <+secrets.getValue("nexus_password")> ## Nexus Repository Manager password
                      server_url: http://34.235.128.201:8081/ ## Nexus Repository instance URL
                      filename: ./target/example-1.0.jar ## Path to the artifact to upload
                      format: maven2 ## Repository format
                      repository: maven-releases ## Destination repository name
                      attributes: "-CgroupId=org.dronetest -CartifactId=example -Cversion=1.0 -Aextension=jar -Aclassifier=bin" ## Key-value pairs providing additional metadata
```
### MLflow plugin settings

*  `type: Plugin`
*  `name:` Specify a step name.
*  `identifier:` Specify a unique step ID.
*  `connectorRef:` Specify a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
*  `image: harnesscommunity/publish-nexus-repository:1.1.1`
*  `settings:` Configure the Nexus Publisher plugin's properties as described in the following table.

| Keys | Type | Description | Value example |
| - | - | - | - |
| `username` | String | A username for accessing Nexus Repository Manager. | <ul><li>`admin`</li><li>`test-user`</li></ul> |
| `password` | String | An [expression referencing a secret](/docs/platform/secrets/add-use-text-secrets#step-3-reference-the-encrypted-text-by-identifier) containing the password for the specified username. | `<+secrets.getValue("nexus_password")>` |
| `server_url` | Public URL | The URL of your Nexus Repository Manager instance. | `http://11.222.333.444:8000/` |
| `filename` | String | The path to the target artifact that you want to upload. | `./target/example-1.0.jar` |
| `format` | String | The repository format. | <ul><li>`maven2`</li><li>`raw`</li></ul> |
| `repository` | String | The name of the repository where you want to upload the artifact. | `maven-releases` |
| `attributes` | String of key-value pairs | Component and asset attributes providing additional artifact metadata.  `"-CgroupId=org.dronetest -CartifactId=example -Cversion=1.0 -Aextension=jar -Aclassifier=bin"` |

-->

:::tip

You can use expressions for plugin settings. For example, `password: <+stage.variables.nexus_password>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables). You can also create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords, and then use expressions to reference those secrets.

:::
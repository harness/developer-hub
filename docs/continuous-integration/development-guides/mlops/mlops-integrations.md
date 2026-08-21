---
title: Integrate ML platforms with Harness CI
sidebar_label: Platform Integrations
description: Run training, evaluation, and deployment jobs on Azure ML, AWS SageMaker, Databricks, Google Vertex AI, or MLflow from a Harness CI pipeline.
sidebar_position: 20
keywords:
  - mlops
  - machine learning
  - azure ml
  - sagemaker
  - databricks
  - vertex ai
  - mlflow
  - plugin step
tags:
  - ci
  - mlops
  - integrations
redirect_from:
  - /docs/continuous-integration/development-guides/mlops/mlops-azureml
  - /docs/continuous-integration/development-guides/mlops/mlops-sagemaker
  - /docs/continuous-integration/development-guides/mlops/mlops-databricks
  - /docs/continuous-integration/development-guides/mlops/mlops-vertexai
  - /docs/continuous-integration/development-guides/mlops/mlops-mlflow
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness CI runs your machine learning workload on the platform that already hosts it. A [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) submits the training job, deployment, or tracking call to Azure ML, AWS SageMaker, Databricks, Google Vertex AI, or MLflow, so the model moves through the same governed pipeline as the rest of your software.

This page covers the Harness side of each integration. The data science work stays on your ML platform, and each section links to the vendor documentation for the platform-specific detail.

---

## What you will learn from this topic

- **Plugin configuration:** The plugin image and settings for each supported ML platform.
- **Pipeline placement:** Where the training step sits relative to evaluation, packaging, and deployment.
- **Credential handling:** How to pass cloud credentials to a plugin without writing them into YAML.
- **Evaluation and promotion:** How to turn model metrics into a pipeline gate.

---

## Before you begin

- **Harness CI project access:** Permission to create and run pipelines. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
- **CI pipeline familiarity:** Go to [CI pipeline components](/docs/continuous-integration/use-ci/prep-ci-pipeline-components) to review stages and steps.
- **Docker connector:** Each plugin runs as a container image. Go to [Docker connector settings](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) to create one.
- **ML platform account:** An active account on your chosen platform, with a prepared workspace or project.
- **Training dataset:** Prepare and store training datasets according to your model type and ML framework, and record an immutable path or version identifier for the dataset you train against.
- **Secrets:** Store every credential as a [text secret](/docs/platform/secrets/add-use-text-secrets) before you configure a plugin.

:::tip

Plugin settings accept Harness expressions. Reference a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables) with `<+stage.variables.trackingUri>`, and reference a [text secret](/docs/platform/secrets/add-use-text-secrets) with `<+secrets.getValue("secret_id")>`. Use expressions for every credential and for any value that differs between environments.

:::

:::info

The plugin images in this guide are published to the `harnesscommunity` Docker Hub organization and are community-maintained. Each image publishes only a `latest` tag. Before you depend on one in a production pipeline, confirm the image still meets your needs, and consider mirroring it to your own registry so a rebuild upstream cannot change your pipeline behavior without warning.

:::

---

## Prepare your ML platform

Complete the platform setup before you add a step to Harness. Each platform needs a workspace or project, compute, and credentials that the plugin can use.

<Tabs groupId="ml-platform">
<TabItem value="azureml" label="Azure ML" default>

1. Go to [Create Azure ML resources](https://learn.microsoft.com/en-us/azure/machine-learning/quickstart-create-resources?view=azureml-api-2) to set up your workspace and compute instance.
2. Note your subscription ID, resource group, and workspace name. The plugin requires all three.
3. Go to [Data concepts in Azure ML](https://learn.microsoft.com/en-us/azure/machine-learning/concept-data?view=azureml-api-2) to register your dataset as a data asset.

</TabItem>
<TabItem value="sagemaker" label="AWS SageMaker">

1. Go to [Set up SageMaker Studio](https://aws.amazon.com/tutorials/machine-learning-tutorial-set-up-sagemaker-studio-account-permissions/) to create an AWS account, onboard a SageMaker domain and user, and add Studio permissions.
2. Create an execution role with SageMaker and S3 permissions, and note its ARN.
3. Upload your prepared dataset to S3 so the training job can reach it:

   ```python
   import boto3

   s3 = boto3.client("s3")
   s3.upload_file("preprocessed_data.csv", "your-bucket-name", "data/preprocessed_data.csv")
   ```

</TabItem>
<TabItem value="databricks" label="Databricks">

1. Go to [Prepare your Databricks Runtime environment](https://docs.databricks.com/en/machine-learning/data-preparation.html) to configure a cluster.
2. Go to [Create a notebook](https://docs.databricks.com/en/notebooks/index.html) in your Databricks workspace, and note its workspace path.
3. Note your workspace host URL and cluster ID, and create a personal access token. The plugin requires all three.

</TabItem>
<TabItem value="vertexai" label="Google Vertex AI">

1. Go to [Set up Vertex AI on Google Cloud](https://cloud.google.com/vertex-ai/docs/start/cloud-environment) to create a project and enable the Vertex AI and Compute Engine APIs.
2. Create a service account with Vertex AI and Cloud Storage permissions, then download its key.
3. Create a source bucket for your notebook and an output bucket for results. Go to [Manage datasets with Vertex AI](https://cloud.google.com/vertex-ai/docs/datasets/overview) to register your dataset.

</TabItem>
<TabItem value="mlflow" label="MLflow">

1. Install MLflow in the environment where your training code runs:

   ```sh
   pip install mlflow
   ```

2. Set up a [remote tracking server](https://mlflow.org/docs/latest/tracking/tutorials/remote-server.html) that every team member and pipeline can reach. A local file store does not work for pipeline runs, because each build machine is ephemeral.
3. Note the tracking server URI and the backend store it writes to, such as a SQL database with an S3, Azure Blob Storage, or Google Cloud Storage artifact store.

</TabItem>
</Tabs>

---

## Train a model from your pipeline

Add a Plugin step to a CI stage. The plugin submits the job to your ML platform and waits for the result, so the pipeline fails when training fails.

<Tabs groupId="ml-platform">
<TabItem value="azureml" label="Azure ML" default>

```yaml
              - step:
                  type: Plugin
                  name: Azure ML training job
                  identifier: azure_ml_plugin
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: harnesscommunity/azure-ml
                    settings:
                      username: <+secrets.getValue("azure_ml_user")>
                      password: <+secrets.getValue("azure_ml_pass")>
                      tenant_id: <+secrets.getValue("azure_ml_tenant")>
                      SUBSCRIPTION_ID: <+secrets.getValue("azure_ml_subscription")>
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

**Settings:**

- **`connectorRef`:** A [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
- **`image`:** `harnesscommunity/azure-ml`.
- **`username`, `password`, `tenant_id`, `SUBSCRIPTION_ID`:** Azure credentials and subscription. Pass all four as secrets.
- **`AZURE_ML_WORKSPACE_NAME`, `RESOURCE_GROUP`:** The workspace and resource group you created.
- **`PROJECT_PATH`:** Repository URL for your Azure ML project.
- **`TRAINING_JOB_FILE`:** Path in the project repository to the training job definition.
- **`MODEL_NAME`:** Name to register the trained model under.
- **`ENDPOINT_NAME`, `ENDPOINT_YAML`:** Endpoint name and its definition file.
- **`DEPLOYMENT_NAME`, `DEPLOYMENT_YAML`:** Deployment name and its definition file.

<details>
<summary>Sample training script</summary>

This script trains a credit card approval classifier with scikit-learn and logs metrics through MLflow, which Azure ML uses for run tracking in SDK v2. It assumes the dataset is preprocessed, contains features relevant to approval decisions such as income, credit score, and debt level, and has a binary `ApprovalStatus` target. It also assumes `scikit-learn`, `pandas`, and `mlflow` are installed in the job environment or listed in `requirements.txt`.

```python
import argparse
import joblib
import mlflow
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split

parser = argparse.ArgumentParser()
parser.add_argument("--data", type=str, help="Path to the registered data asset")
args = parser.parse_args()

data = pd.read_csv(args.data)

X = data.drop(columns=["ApprovalStatus"])
y = data["ApprovalStatus"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

mlflow.log_metric("accuracy", accuracy_score(y_test, y_pred))
mlflow.log_text(classification_report(y_test, y_pred), "classification_report.txt")

joblib.dump(model, "model.joblib")
mlflow.log_artifact("model.joblib")
```

Adapt the feature engineering, model parameters, and metrics to your use case, and pass the data asset path through the `--data` argument in your `job.yml`. Go to [Train models with Azure ML](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-train-model?view=azureml-api-2&tabs=python) to define the job.

</details>

</TabItem>
<TabItem value="sagemaker" label="AWS SageMaker">

```yaml
              - step:
                  type: Plugin
                  name: SageMaker model deployment
                  identifier: sagemaker_plugin
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: harnesscommunity/aws-sagemaker
                    settings:
                      model_name: my-model-aws
                      EXECUTION_ROLE_ARN: arn:aws:iam::123456789012:role/sagemakertest
                      IMAGE_URL: 123456789012.dkr.ecr.us-east-1.amazonaws.com/pytorch-training:2.2.0-cpu-py310-ubuntu20.04-ec2
                      MODEL_DATA_URL: s3://your-bucket-name/model/model.tar.gz
                      ENDPOINT_CONFIG_NAME: aws-endpoint-cfg
                      ENDPOINT_NAME: aws-endpoint
                      INSTANCE_TYPE: ml.t2.medium
                      INITIAL_INSTANCE_COUNT: "1"
                      VARIANT_NAME: AllTraffic
                      USERNAME: AWS
                      AWS_ACCESS_KEY_ID: <+secrets.getValue("awsAccessKeyId")>
                      AWS_SECRET_ACCESS_KEY: <+secrets.getValue("awsAccessKeySecret")>
                      AWS_REGION: us-east-1
                    imagePullPolicy: Always
```

**Settings:**

- **`connectorRef`:** A [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
- **`image`:** `harnesscommunity/aws-sagemaker`.
- **`model_name`:** Name to register the model under in SageMaker.
- **`EXECUTION_ROLE_ARN`:** The SageMaker execution role you created.
- **`IMAGE_URL`:** Container image that serves the model.
- **`MODEL_DATA_URL`:** S3 path to the model artifact. SageMaker expects a `model.tar.gz` archive, not a raw dataset file.
- **`ENDPOINT_CONFIG_NAME`, `ENDPOINT_NAME`, `VARIANT_NAME`:** Endpoint configuration, endpoint, and production variant names.
- **`INSTANCE_TYPE`, `INITIAL_INSTANCE_COUNT`:** Serving instance size and count.
- **`USERNAME`:** `AWS`.
- **`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`:** Credentials and region. Pass both keys as secrets.

<details>
<summary>Sample training script</summary>

This example uses the SageMaker Python SDK v2 to train a scikit-learn model. It assumes your preprocessed data is in S3 and that `train.py` sits in a local `code/` directory alongside its `requirements.txt`.

```python
import sagemaker
from sagemaker.sklearn.estimator import SKLearn

session = sagemaker.Session()

estimator = SKLearn(
    entry_point="train.py",
    source_dir="code",
    role=sagemaker.get_execution_role(),
    sagemaker_session=session,
    framework_version="1.2-1",
    instance_type="ml.c5.xlarge",
    instance_count=1,
    hyperparameters={"max_leaf_nodes": 30, "n_estimators": 100},
)

estimator.fit({"train": "s3://your-bucket-name/data/preprocessed_data.csv"})
```

`entry_point` takes a path relative to `source_dir`, not an `s3://` URL. Your `train.py` must load data from the channel directory SageMaker mounts, serialize the model with `joblib` or `pickle`, and write it to the output path SageMaker provides.

To test predictions, deploy to a temporary endpoint and delete it as soon as evaluation finishes:

```python
predictor = estimator.deploy(initial_instance_count=1, instance_type="ml.m5.large")
response = predictor.predict(your_input_data)
predictor.delete_endpoint()
```

An endpoint left running bills by the hour whether or not it serves traffic. Delete it in the same script that creates it so a failed run does not leave it behind. Go to [Train ML models with SageMaker](https://aws.amazon.com/tutorials/machine-learning-tutorial-train-a-model/) for the full training workflow.

</details>

</TabItem>
<TabItem value="databricks" label="Databricks">

```yaml
              - step:
                  type: Plugin
                  name: Databricks notebook job
                  identifier: databricks_plugin
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: harnesscommunity/databricks-ml
                    settings:
                      host: https://abc-1234-def.cloud.databricks.com/
                      pat: <+secrets.getValue("databricks_token")>
                      job_name: credit-approval-training
                      NOTEBOOK_PATH: /Workspace/Shared/sample_notebook
                      TASK_KEY: mydemotask
                      Description: Train the credit card approval model
                      CLUSTER_ID: <+secrets.getValue("databricks_clusterId")>
                    imagePullPolicy: Always
```

**Settings:**

- **`connectorRef`:** A [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
- **`image`:** `harnesscommunity/databricks-ml`.
- **`host`:** Your Databricks workspace URL.
- **`pat`:** A Databricks personal access token. Pass it as a secret.
- **`job_name`:** Name for the job the plugin creates.
- **`NOTEBOOK_PATH`:** Workspace path to the notebook to run.
- **`TASK_KEY`:** Unique key for the job task.
- **`Description`:** Job description.
- **`CLUSTER_ID`:** The cluster to run on.

<details>
<summary>Sample training notebook</summary>

This notebook trains a credit card approval classifier with scikit-learn. It assumes the dataset has features relevant to approval decisions and a binary `ApprovalStatus` target, and that `scikit-learn` and `pandas` are available on the cluster.

```python
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split

# Replace with the actual path to your dataset
data = pd.read_csv("path/to/your/dataset.csv")

X = data.drop(columns=["ApprovalStatus"])
y = data["ApprovalStatus"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification report:\n", classification_report(y_test, y_pred))
```

Preprocess evaluation data the same way as training data, and confirm the format your model expects. Go to [Train models on Databricks](https://docs.databricks.com/en/machine-learning/train-model/index.html) to use AutoML or other libraries, and to [Run notebooks](https://docs.databricks.com/en/notebooks/run-notebook.html) to execute and view results interactively.

</details>

</TabItem>
<TabItem value="vertexai" label="Google Vertex AI">

This plugin executes a [notebook](https://cloud.google.com/vertex-ai/docs/vector-search/notebooks) and stores the output in Cloud Storage.

```yaml
              - step:
                  type: Plugin
                  name: Vertex AI notebook job
                  identifier: vertex_plugin
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: harnesscommunity/gcloud-vertex
                    settings:
                      allowlist: sample_notebook.ipynb
                      project_id: some-gcloud-project
                      GCLOUD_SOURCE_BUCKET: some-gcloud-bucket
                      GCLOUD_OUTPUT_BUCKET: some-gcloud-bucket/nbr/output
                      SERVICE_ACCOUNT_KEY: <+secrets.getValue("google_sa_key")>
                      DISPLAY_NAME: vertex-test
                    imagePullPolicy: Always
```

**Settings:**

- **`connectorRef`:** A [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
- **`image`:** `harnesscommunity/gcloud-vertex`.
- **`allowlist`:** The notebook file to execute.
- **`project_id`:** Your GCP project ID.
- **`GCLOUD_SOURCE_BUCKET`:** Bucket holding the notebook.
- **`GCLOUD_OUTPUT_BUCKET`:** Bucket path for notebook output.
- **`SERVICE_ACCOUNT_KEY`:** Service account key. Pass it as a secret.
- **`DISPLAY_NAME`:** Display name for the job.

<details>
<summary>Sample training script</summary>

This `train.py` script loads data from Cloud Storage, trains a random forest classifier, and uploads the serialized model back to Cloud Storage. It assumes the dataset has features relevant to credit card approval decisions and a binary `ApprovalStatus` target, and that `scikit-learn`, `pandas`, and `google-cloud-storage` are installed.

```python
import os

import joblib
import pandas as pd
from google.cloud import storage
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split


def load_data(bucket_name, file_path):
    client = storage.Client()
    bucket = client.get_bucket(bucket_name)
    blob = bucket.blob(file_path)
    blob.download_to_filename("temp.csv")
    data = pd.read_csv("temp.csv")
    os.remove("temp.csv")
    return data


def upload_model(bucket_name, destination_blob_name, local_model_path):
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(local_model_path)


def main():
    bucket_name = "your-bucket-name"
    df = load_data(bucket_name, "data/credit_data.csv")

    X = df.drop("ApprovalStatus", axis=1)
    y = df["ApprovalStatus"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    print(f"Model accuracy: {accuracy_score(y_test, model.predict(X_test))}")

    joblib.dump(model, "credit_model.pkl")
    upload_model(bucket_name, "models/credit_model.pkl", "credit_model.pkl")


if __name__ == "__main__":
    main()
```

To run this outside a notebook, create a [custom training job](https://cloud.google.com/vertex-ai/docs/training/overview) that specifies the scikit-learn training container, your script, and any arguments. Grant the job service account read access to the data bucket and write access to the output bucket, otherwise the upload fails after training completes successfully.

</details>

</TabItem>
<TabItem value="mlflow" label="MLflow">

The MLflow plugin runs an [MLflow Project](https://mlflow.org/docs/latest/projects.html) against your tracking server and records the run.

```yaml
              - step:
                  type: Plugin
                  name: MLflow tracking run
                  identifier: mlflow_plugin
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: harnesscommunity/mlflow
                    settings:
                      MLFLOW_TRACKING_URI: <+stage.variables.trackingUri>
                      MLFLOW_EXPERIMENT_NAME: credit-card-approval
                      MLFLOW_PROJECT_PATH: https://github.com/someAccount/mlflow-example-project
                      MLFLOW_RUN_PARAMETERS: n_estimators=150
                    imagePullPolicy: Always
```

**Settings:**

- **`connectorRef`:** A [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
- **`image`:** `harnesscommunity/mlflow`.
- **`MLFLOW_TRACKING_URI`:** URI of your remote tracking server, for example `http://mlflow.example.com:5000`. Reference it through a stage variable so it differs per environment.
- **`MLFLOW_EXPERIMENT_NAME`:** Experiment to log the run under.
- **`MLFLOW_PROJECT_PATH`:** Repository URL of the MLflow Project to run.
- **`MLFLOW_RUN_PARAMETERS`:** Parameters passed to the project entry point.

<details>
<summary>Instrument your training code with MLflow Tracking</summary>

[MLflow Tracking](https://mlflow.org/docs/latest/tracking.html) logs parameters, metrics, and artifacts so you can compare runs later. Wrap your training code in a run context:

```python
import mlflow

with mlflow.start_run():
    mlflow.log_param("param_name", "param_value")
    mlflow.log_metric("metric_name", metric_value)
    mlflow.log_artifact("output_file.txt")
```

Log the trained model in a servable format, where `sk_model` is a trained scikit-learn model and `"model"` is the artifact path within the run:

```python
mlflow.sklearn.log_model(sk_model, "model")
```

Point your code at the remote tracking server through the environment:

```sh
export MLFLOW_TRACKING_URI='http://mlflow.example.com:5000'
```

Or set it in code:

```python
mlflow.set_tracking_uri('http://mlflow.example.com:5000')
```

If the tracking URI is unset, MLflow writes to the local filesystem. On an ephemeral build machine that means the run disappears when the step finishes, so always set it explicitly in a pipeline.

</details>

</TabItem>
</Tabs>

---

## Evaluate the trained model

Evaluation turns a trained model into a promotion decision. The workflow is the same on every platform:

1. **Prepare evaluation data:** Store a held-out dataset in a format your model accepts. Confirm the model has not seen it during training, and preprocess it exactly as you preprocessed the training data.
2. **Select metrics:** Choose metrics that match the prediction task. Binary classification tasks such as credit card approval commonly use accuracy, precision, recall, F1 score, and area under the ROC curve. Consider business metrics that weigh false positives against false negatives.
3. **Run the evaluation and fail on a miss:** Compute the metrics, compare them against your threshold, and exit non-zero when the model misses it. This is what converts a metric into a pipeline gate.
4. **Iterate:** Adjust hyperparameters, algorithms, or preprocessing, then retrain and re-evaluate.

:::info

Model evaluation is iterative and might require multiple rounds of training, evaluation, and tuning to reach the performance you need. Confirm the metrics you choose align with your project objectives before you set a threshold, because a threshold on the wrong metric passes models that fail in production.

:::

The following example computes metrics and enforces a threshold. Run it in a CI Run step after training so a failing model stops the pipeline:

```python
import json
import os
import sys

import joblib
import pandas as pd
from sklearn.metrics import accuracy_score, roc_auc_score

MINIMUM_ACCURACY = 0.85

model = joblib.load(os.path.join(os.environ["MODEL_DIR"], "model.joblib"))

data = pd.read_csv(os.environ["TEST_DATA_PATH"])
X_test, y_test = data.drop(columns=["ApprovalStatus"]), data["ApprovalStatus"]

predictions = model.predict(X_test)
metrics = {
    "accuracy": accuracy_score(y_test, predictions),
    "roc_auc": roc_auc_score(y_test, predictions),
}

with open("evaluation.json", "w") as f:
    json.dump(metrics, f)

print(f"Evaluation metrics: {metrics}")

if metrics["accuracy"] < MINIMUM_ACCURACY:
    sys.exit(f"Accuracy {metrics['accuracy']:.3f} is below the {MINIMUM_ACCURACY} threshold")
```

Platform-native evaluation tooling is also available:

<Tabs groupId="ml-platform">
<TabItem value="azureml" label="Azure ML" default>

Go to [View metrics for jobs and runs](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-log-view-metrics?view=azureml-api-2&tabs=interactive#view-jobsruns-information-in-the-studio) to review logged metrics in Azure ML studio.

</TabItem>
<TabItem value="sagemaker" label="AWS SageMaker">

Run evaluation as a SageMaker Processing Job, and compare runs with [SageMaker Experiments](https://docs.aws.amazon.com/sagemaker/latest/dg/experiments.html). For foundation models, go to [Evaluate a foundation model](https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-foundation-model-evaluate-get-started.html) to use automatic and human evaluation. Delete processing jobs and test endpoints after evaluation to avoid unnecessary charges.

</TabItem>
<TabItem value="databricks" label="Databricks">

Evaluate in the notebook and visualize results with [Databricks visualization tools](https://docs.databricks.com/en/mlflow/build-dashboards.html). Log metrics to MLflow rather than to notebook output alone, so results survive past the run.

</TabItem>
<TabItem value="vertexai" label="Google Vertex AI">

Go to [Model evaluation in Vertex AI](https://cloud.google.com/vertex-ai/docs/evaluation/introduction) to review metrics for AutoML and custom-trained models, and enable model monitoring on deployed models to detect skew, drift, and anomalies.

</TabItem>
<TabItem value="mlflow" label="MLflow">

Log evaluation metrics to the same MLflow run as training so both appear together in the tracking UI. Start the UI with `mlflow ui`, which serves on `http://127.0.0.1:5000` by default, or open your remote tracking server URL to compare runs and visualize parameters and outputs.

</TabItem>
</Tabs>

---

## Deploy the model and get predictions

Once a model passes evaluation, deploy it and call its endpoint for predictions. Harness CD manages the deployment and rollback for container and serverless targets, and each ML platform also offers a managed serving path.

<Tabs groupId="ml-platform">
<TabItem value="azureml" label="Azure ML" default>

Go to [Deploy models with online endpoints](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-deploy-online-endpoints?view=azureml-api-2&tabs=azure-cli) for managed serving, or to [Package and deploy models outside Azure ML](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-package-models-app-service?view=azureml-api-2&tabs=cli) to serve from your own infrastructure. The plugin handles endpoint creation when you supply `ENDPOINT_YAML` and `DEPLOYMENT_YAML`.

</TabItem>
<TabItem value="sagemaker" label="AWS SageMaker">

Go to [Deploy models for inference](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html) to create a real-time or batch endpoint. The plugin creates the model, endpoint configuration, and endpoint from the settings above.

</TabItem>
<TabItem value="databricks" label="Databricks">

Go to [Databricks Model Serving](https://docs.databricks.com/en/machine-learning/model-serving/index.html) to serve a registered model behind an endpoint.

</TabItem>
<TabItem value="vertexai" label="Google Vertex AI">

Go to [Vertex AI deployment](https://cloud.google.com/vertex-ai/docs/general/deployment) to deploy to an endpoint, and to [Get predictions](https://cloud.google.com/vertex-ai/docs/predictions/overview) for online and batch prediction options.

</TabItem>
<TabItem value="mlflow" label="MLflow">

Register the logged model in the [MLflow Model Registry](https://mlflow.org/docs/latest/model-registry.html), then serve it with `mlflow models serve` or package it as a container image and deploy it with Harness CD. Go to [MLflow Models](https://mlflow.org/docs/latest/models.html) to review the supported serving flavors.

</TabItem>
</Tabs>

---

## Monitor, improve, and iterate

Set up monitoring and logging for every deployed model so you detect degradation before it reaches a business metric. Then feed what you learn back into retraining, using [triggers](/docs/platform/triggers/triggers-reference) or scheduled pipelines to rerun the training stage when drift crosses a threshold.

- **Azure ML:** Go to [Model monitoring](https://learn.microsoft.com/en-us/azure/machine-learning/concept-model-monitoring?view=azureml-api-2) to track data and prediction drift.
- **AWS SageMaker:** Go to [SageMaker Model Monitor](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html) to detect data quality and drift violations.
- **Databricks:** Go to [Monitor and diagnose serving endpoints](https://docs.databricks.com/en/machine-learning/model-serving/monitor-diagnose-endpoints.html) to track endpoint health.
- **Google Vertex AI:** Go to [Vertex AI Model Monitoring](https://cloud.google.com/vertex-ai/docs/model-monitoring/overview) to detect skew and drift, and to [Vertex AI Model Registry](https://cloud.google.com/vertex-ai/docs/model-registry/introduction) to manage versions before redeployment.
- **MLflow:** Compare production metrics against the logged training run to quantify degradation over time.

---

## Troubleshooting

<Troubleshoot
  issue="A Harness CI Plugin step fails immediately with an authentication or permission error against my cloud ML platform"
  mode="general"
  fallback="Confirm the credentials are stored as Harness text secrets and referenced with a secrets.getValue expression, and that the underlying cloud identity has permission for both the ML service and the storage bucket the job reads. A job that can start training but cannot write output usually has storage permissions missing rather than ML service permissions."
/>

<Troubleshoot
  issue="My ML platform Plugin step cannot pull the harnesscommunity plugin image in a Harness CI pipeline"
  mode="docs"
  fallback="Confirm the step references a working Docker connector in connectorRef and that the build infrastructure can reach Docker Hub. If your network blocks Docker Hub, mirror the plugin image to your own registry and point connectorRef and image at the mirror."
/>

<Troubleshoot
  issue="My model training step passes in the Harness pipeline but the model performs worse in production than in evaluation"
  mode="general"
  fallback="Compare the dependency versions between the training image and the serving image, and confirm evaluation data is preprocessed identically to production input. Divergence in either place produces a correct model that returns different predictions once deployed."
/>

<Troubleshoot
  issue="MLflow runs from my Harness pipeline do not appear in the MLflow tracking UI"
  mode="general"
  fallback="Set MLFLOW_TRACKING_URI to a remote tracking server that the build machine can reach. Without it MLflow writes to the local filesystem of an ephemeral build pod, and the run is discarded when the step ends."
/>

<Troubleshoot
  issue="My SageMaker training job in a Harness pipeline fails with an entry point or source directory error"
  mode="general"
  fallback="entry_point takes a filename relative to source_dir, not an s3:// URL. Set source_dir to the local directory holding your script and its requirements.txt, and set entry_point to the script filename alone."
/>

---

## Next steps

Wire the integration into a complete pipeline, then add the governance controls that make model promotion auditable.

- [Tutorial - End-to-end MLOps CI/CD pipeline with Harness and AWS](/docs/continuous-integration/development-guides/mlops/e2e-mlops-tutorial): Build, scan, gate, and deploy a model end to end.
- [MLOps best practices](/docs/continuous-integration/development-guides/mlops/mlops-best-practices): Review the practices that keep model pipelines reproducible.
- [Run a plugin in CI](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci): Understand Plugin step configuration in depth.
- [Policy as Code](/docs/platform/governance/policy-as-code/harness-governance-overview): Enforce model promotion rules across every pipeline.

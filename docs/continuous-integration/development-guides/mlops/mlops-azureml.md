---
title: Azure ML
description: Use Azure ML with Harness.
sidebar_position: 10
---

Microsoft Azure Machine Learning (Azure ML) provides a comprehensive set of tools for training, deploying, and monitoring machine learning models. You can orchestrate [MLOps workflows with Azure ML](https://learn.microsoft.com/en-us/azure/machine-learning/concept-model-management-and-deployment?view=azureml-api-2) in Harness.

This guide demonstrates a simplified Azure ML model development workflow. For detailed instructions and information about Azure ML functionality and MLOps with Azure ML, go to the [Azure ML documentation](https://learn.microsoft.com/en-us/azure/machine-learning/?view=latest).

## Prepare Azure ML

1. [Set up your workspace and compute instance for Azure ML.](https://learn.microsoft.com/en-us/azure/machine-learning/quickstart-create-resources?view=azureml-api-2)
2. Prepare and store training datasets according to the model type, MLOps best practices, and the usage documentation for your chosen ML framework, architecture, and associated tools. Go to the Microsoft documentation for more information about [Data concepts in Azure ML](https://learn.microsoft.com/en-us/azure/machine-learning/concept-data?view=azureml-api-2).

## Train models with Azure ML

Azure ML provides automated and manual options for training models. For instructions on training models with Azure ML, go to the Microsoft documentation:

* [Train models with Azure ML CLI, SDK, and REST API](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-train-model?view=azureml-api-2&tabs=python)
* [Submit a training job in studio](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-train-with-ui?view=azureml-api-2)

### Sample training script

The following Python script trains a simple ML model for credit card approval prediction using Scikit-learn on Azure ML. This script includes minimal or basic commands that:

* Imports necessary libraries.
* Get the experiment context.
* Load data from Azure ML datastore.
* Split data into training and test sets, then train a logistic regression model.
* Make predictions on the test data and log performance metrics to the Azure ML run context.

This example assumes the following:

* The supplied dataset has been preprocessed and features relevant to credit card approval decisions (such as income, credit score, debt level, and so on) and a binary target variable indicating approval or rejection.
* The necessary packages (such as `scikit-learn` and `pandas`) are installed in the build environment or that they are included in a `requirements.txt` file.

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from azureml.core import Run

# Get the experiment run context
run = Run.get_context()

# Load data from Azure ML datastore
datastore_path = 'datastore/path/to/your/dataset.csv'  # Replace with the path to your dataset in the datastore
data = pd.read_csv(datastore_path)

# Preprocess the data
X = data.drop(columns=["ApprovalStatus"])
y = data["ApprovalStatus"]

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a logistic regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Log accuracy metric
accuracy = accuracy_score(y_test, y_pred)
run.log("Accuracy", accuracy)

# Log classification report
classification_rep = classification_report(y_test, y_pred)
run.log("Classification Report", classification_rep)

# Complete the run
run.complete()
```

This script is a basic example. If you wanted to try it with Azure ML, you need to:

- Modify the script according to your specific feature engineering, model parameters, and evaluation metrics requirements.
- Preprocess and prepare your data for use in ML models.
- Replace `'datastore/path/to/your/dataset.csv'` with the actual path to your dataset in the datastore.

### Harness Azure ML plugin

You can use the Azure ML plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) in a CI pipeline.


```yaml
              - step:
                  type: Plugin
                  name: Azure ml plugin
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

#### Azure ML plugin settings

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
   * `PROJECT_PATH`: Azure ML project repo URL
   * `TRAINING_JOB_FILE`: Path in project repo to the training job file
   * `MODEL_NAME`
   * `ENDPOINT_NAME`: Model endpoint name
   * `ENDPOINT_YAML`: Path in project repo to the model `endpoint.yml`
   * `DEPLOYMENT_NAME`: Name for the model when deployed
   * `DEPLOYMENT_YAML`: Path in project repo to the `*-deployment.yml`

:::tip

You can use expressions for plugin settings. For example, `<+stage.variables.tenantId>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables). You can also create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords, and then use expressions to reference those secrets.

:::

## Evaluate

After training, [evaluate the trained model's performance in Azure ML](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-log-view-metrics?view=azureml-api-2&tabs=interactive#view-jobsruns-information-in-the-studio).

1. After training a model, prepare evaluation data. Store your evaluation (or test) dataset in a format your model can process (such as CSV for a tabular model). Make sure the model hasn't seen this dataset during training.
2. Load the model, make predictions, and log evaluation metrics.

<details>
<summary>Sample evaluation script</summary>

Here's an example of a script that evaluates a trained model using a test dataset and logs evaluation metrics to the Azure ML run context. This script includes minimal or basic commands that:

* Imports necessary libraries.
* Get the experiment context.
* Get the path to the registered model file.
* Load data from Azure ML datastore and preprocess it, if required.
* Make predictions on the test data and log performance metrics to the Azure ML run context.

```python
import pandas as pd
from sklearn.metrics import accuracy_score, classification_report
from azureml.core import Run, Model

# Get the experiment run context
run = Run.get_context()

# Get the registered model
model_name = 'credit_card_approval_model'  # Replace with the name of your registered model
model_path = Model.get_model_path(model_name)

# Load the test data from Azure ML datastore
test_datastore_path = 'datastore/path/to/your/test_dataset.csv'  # Replace with the path to your test dataset in the datastore
test_data = pd.read_csv(test_datastore_path)

# Preprocess the test data
X_test = test_data.drop(columns=["ApprovalStatus"])
y_test = test_data["ApprovalStatus"]

# Load the model
model = joblib.load(model_path)

# Make predictions
y_pred = model.predict(X_test)

# Calculate evaluation metrics
accuracy = accuracy_score(y_test, y_pred)
classification_rep = classification_report(y_test, y_pred)

# Log evaluation metrics
run.log("Test Accuracy", accuracy)
run.log("Test Classification Report", classification_rep)

# Complete the run
run.complete()
```

This script is a basic example. If you wanted to try it with Azure ML, you need to:

- Modify the script according to your specific feature engineering, model parameters, and evaluation metrics requirements.
- Preprocess and prepare your data for use in an ML model and your ML model's use case. Adjust the preprocessing steps in the script to match those applied during training, if any.
- Replace `'datastore/path/to/your/test_dataset.csv'` with the actual path to your test dataset in the datastore.
- Make sure the necessary packages (such as `scikit-learn` and `pandas`) are installed in the build environment or that they are included in a `requirements.txt` file.

</details>

3. Determine next steps. Based on the evaluation results, you might decide to adjust your model (such as by tuning its hyperparameters, using a different algorithm, or preprocessing your data differently), and then iterate over the training and evaluation process until you're satisfied with the model.

:::info

Model evaluation and improvement is an iterative process that might require multiple rounds of training, evaluation, and tuning to achieve the desired model performance. Make sure the evaluation metrics you choose align with ML best practices and your ML project's business or research objectives.

:::

## Deploy and get predictions

Once the model passes evaluation, you can deploy it. Azure ML offers several options for model deployment, including [deploying models with endpoints](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-deploy-online-endpoints?view=azureml-api-2&tabs=azure-cli) or [packaging and deploying models outside Azure ML](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-package-models-app-service?view=azureml-api-2&tabs=cli).

Then, you can make predictions by hitting the model's endpoint.

## Monitor, improve, and iterate

Set up [monitoring and logging](https://learn.microsoft.com/en-us/azure/machine-learning/concept-model-monitoring?view=azureml-api-2) for deployed models to track model performance and monitor/analyze predictions. Then use this data to improve, iterate, and redeploy your models.

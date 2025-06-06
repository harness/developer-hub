---
title: Databricks
description: Use Databricks with Harness.
sidebar_position: 12
---

Databricks provides a comprehensive set of tools for training, deploying, and monitoring machine learning models. You can orchestrate [MLOps workflows on Databricks](https://docs.databricks.com/en/machine-learning/mlops/mlops-workflow.html) in Harness.

This guide demonstrates a simplified Databricks ML model development workflow. For detailed instructions and information about Databricks functionality and MLOps with Databricks, go to the [Databricks ML documentation](https://docs.databricks.com/en/machine-learning/index.html).

## Prepare to use Databricks

1. [Prepare your Databricks Runtime environment.](https://docs.databricks.com/en/machine-learning/data-preparation.html)
1. [Create a notebook in your Databricks workspace.](https://docs.databricks.com/en/notebooks/index.html)
2. Prepare and store training datasets according to the model type, MLOps best practices, and the usage documentation for your chosen ML framework, architecture, and associated tools.

## Train models with Databricks

When [training models on Databricks](https://docs.databricks.com/en/machine-learning/train-model/index.html), you can use AutoML and popular open-source libraries, such as Scikit-learn.

### Sample training notebook

The following workflow provides a simplified example of how you might use a Databricks notebook and Scikit-learn to train a model for a task like credit card approval predictions.

This example assumes the necessary packages (such as `scikit-learn` and `pandas`) are installed in the build environment or that they are included in a `requirements.txt` file.

1. Prepare data.

   Load data in a [Databricks notebook](https://docs.databricks.com/en/notebooks/index.html), preprocess it, and split it into training and test sets.

   Make sure the supplied datasets have features relevant to your model's use case. In this example, the data needs features relevant to credit card approval decisions (such as income, credit score, debt level, and so on) and a binary target variable indicating approval or rejection.

3. Create a Python script that uses scikit-learn to train your model on your training data.

4. Include model evaluation and metrics collection (such as accuracy, precision, recall, and F1-score) in your training script.

   Use the test dataset for evaluation. Make sure you preprocess your evaluation data the same way as you prepared your training data, and that your evaluation data is in a format supported by your model.

   For more information about this portion of ML model development and next steps, go to [Evaluate](#evaluate).

5. Optionally, save the model for further use or deployment.

Here's an example of a simple Databricks model training notebook:

```python
# Load libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
# Replace 'path/to/your/dataset.csv' with the actual path to your dataset
data = pd.read_csv('path/to/your/dataset.csv')

# Preprocess data
# Preprocessing commands depend on your use case and how much preprocessing was done before loading the data into the script.

# Split data into training and testing sets
X = data.drop(columns=["ApprovalStatus"])
y = data["ApprovalStatus"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
classification_rep = classification_report(y_test, y_pred)
print("Accuracy:", accuracy)
print("Classification Report:\n", classification_rep)

# Optionally, save the model
# ...
```

You'll need to execute each cell in the notebook to run the code. You can [execute notebooks and view results in Databricks](https://docs.databricks.com/en/notebooks/run-notebook.html).

### Harness Databricks plugin

You can use the Databricks plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) in a CI pipeline.

```yaml
              - step:
                  type: Plugin
                  name: databricks
                  identifier: databricks_plugin
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: harnesscommunity/databricks-ml
                    settings:
                      host: https://abc-1234-def.cloud.databricks.com/
                      pat: <+secrets.getValue("databricks_token")>
                      job_name: new job
                      NOTEBOOK_PATH: /Workspace/Shared/sample_notebook
                      TASK_KEY: mydemotask
                      Description: test desc
                      CLUSTER_ID: <+secrets.getValue("databricks_clusterId")>
                    imagePullPolicy: Always
```

#### Databricks plugin settings

*  `type: Plugin`
*  `name:` Specify a step name.
*  `identifier:` Specify a unique step ID.
*  `connectorRef:` Specify a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
*  `image: harnesscommunity/databricks-ml`
*  `settings:` Configure the plugin parameters.
   * `host`
   * `pat`
   * `job_name`
   * `NOTEBOOK_PATH`
   * `TASK_KEY`
   * `Description`
   * `CLUSTER_ID`

:::tip

You can use expressions for plugin settings. For example, `<+stage.variables.trackingUri>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables). You can also create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords, and then use expressions to reference those secrets.

:::

## Evaluate

After training, evaluate the trained model's performance based on metrics relevant to your model's use case.

1. Prepare evaluation data. Make sure your evaluation data:

   * Is preprocessed the same way as you prepared your training data.
   * Your evaluation data is in a format supported by your model.
   * The model hasn't seen the evaluation dataset during training.

2. Select metrics to track based on the nature of your prediction task.

   For example, common metrics for binary classification tasks, like credit card approval, include accuracy, precision, recall, F1 score, and the area under the ROC curve (AUC-ROC).

   You might also consider business-specific metrics that reflect the cost of false positives versus false negatives, depending on the application.

3. Use the trained model to make predictions on the evaluation data and collect metrics such as accuracy, precision, recall, and F1-score. You can include model evaluation and metrics collection in your training script or run separate evaluation experiments.

   The evaluation script needs to include commands to load your model, load a test dataset, make predictions on the evaluation data, and then calculate evaluation metrics. The script can also include data preprocessing, depending on how your script is structured and your MLOps workflow.

   Here's an example of a model evaluation in a Databricks notebook:

   ```python
   # Load libraries
   from sklearn.metrics import accuracy_score, classification_report

   # Load testing data
   # Replace 'path/to/your/test_dataset.csv' with the actual path to your testing dataset
   test_data = pd.read_csv('path/to/your/test_dataset.csv')

   # Preprocess testing data
   # ...

   # Split features and target
   X_test = test_data.drop(columns=["ApprovalStatus"])
   y_test = test_data["ApprovalStatus"]

   # Make predictions
   y_pred = model.predict(X_test)

   # Evaluate model
   accuracy = accuracy_score(y_test, y_pred)
   classification_rep = classification_report(y_test, y_pred)

   # Display evaluation metrics
   print("Accuracy:", accuracy)
   print("Classification Report:\n", classification_rep)
   ```

4. Analyze the metrics and evaluate the trained model's performance.

  The above notebook example shows evaluation metrics in the notebook output. You can also log metrics to a file or external service if needed for further analysis or tracking, and you can visualize the results using [Databricks' built-in visualization tools](https://docs.databricks.com/en/mlflow/build-dashboards.html).

5. Determine next steps. Based on the evaluation results, you might decide to adjust your model (such as by tuning its hyperparameters, using a different algorithm, or preprocessing your data differently), and then iterate over the training and evaluation process until you're satisfied with the model.

:::info

Model evaluation and improvement is an iterative process that might require multiple rounds of training, evaluation, and tuning to achieve the desired model performance. Make sure the evaluation metrics you choose align with ML best practices and your ML project's business or research objectives.

:::

## Deploy and get predictions

Once the model passes evaluation, you can [serve models](https://docs.databricks.com/en/machine-learning/model-serving/index.html) and use them to get predictions.

## Monitor, improve, and iterate

Set up [monitoring and logging](https://docs.databricks.com/en/machine-learning/model-serving/monitor-diagnose-endpoints.html) for deployed models to track model performance and monitor/analyze predictions. Then use this data to improve and iterate on your models.

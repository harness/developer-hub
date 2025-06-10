---
title: Google Vertex AI
description: Use Google Vertex AI with Harness
sidebar_position: 13
---

Google Vertex AI provides a comprehensive set of tools for training, deploying, and monitoring machine learning models. You can orchestrate [MLOps workflows for GCP Vertex AI](https://cloud.google.com/vertex-ai/docs/start/introduction-mlops) in Harness.

This guide demonstrates a simplified Vertex AI ML model development workflow. For detailed instructions and information about Vertex AI functionality and MLOps with Vertex AI, go to the [Google Vertex AI documentation](https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform).

## Prepare Vertex AI on GCP

1. [Set up Vertex AI on Google Cloud](https://cloud.google.com/vertex-ai/docs/start/cloud-environment), including:

   * Creating a GCP account and setting up a GCP project.
   * Enabling the Vertex AI and Compute Engine APIs in your GCP project.
   * Using the Cloud Shell in the GCP Console or setting up Cloud SDK on your local machine.

2. Prepare and store training datasets according to the model type, MLOps best practices, and the usage documentation for your chosen ML framework, architecture, and associated tools. Go to the Google documentation for more information about [managing datasets with Vertex AI](https://cloud.google.com/vertex-ai/docs/datasets/overview).

## Train models with Vertex AI

Training models with Vertex AI includes creating training jobs, selecting datasets to use, and setting training parameters. For instructions on training models with Vertex AI and the GCP Console Cloud Shell or Cloud SDK, go to the Google documentation:

* [Train an AutoML model](https://cloud.google.com/vertex-ai/docs/beginner/beginners-guide)
* [Train a custom model](https://cloud.google.com/vertex-ai/docs/start/training-guide)

### Sample training script

The following `train.py` training script provides a simplified example of how you might use Vertex AI to train a Scikit-learn model for a task like credit card approval predictions. It includes minimal or basic commands such as:

- Functions to download data from, and upload models to, Google Cloud Storage (GCS).
- Sample data preprocessing, which you would need to adjust according to your actual dataset's structure.
- Model training, evaluation, and serialization using Joblib.

This example assumes the following:

* The supplied dataset has features relevant to credit card approval decisions (such as income, credit score, debt level, and so on) and a binary target variable indicating approval or rejection.
* The necessary packages (such as `scikit-learn`, `pandas`, and `google-cloud-storage`) are installed in the build environment or that they are included in a `requirements.txt` file.

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
from google.cloud import storage
import os

# Function to load data from a GCS bucket
def load_data(bucket_name, file_path):
    client = storage.Client()
    bucket = client.get_bucket(bucket_name)
    blob = bucket.blob(file_path)
    blob.download_to_filename('temp.csv')
    data = pd.read_csv('temp.csv')
    os.remove('temp.csv')  # Clean up temporary file
    return data

# Function to save the model to a GCS bucket
def save_model_to_gcs(bucket_name, destination_blob_name, model):
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(model)

def main():
    # Example GCS paths - replace with your actual paths
    bucket_name = 'your-bucket-name'
    data_file_path = 'data/credit_data.csv'
    model_output_path = 'models/credit_model.pkl'

    # Load dataset
    df = load_data(bucket_name, data_file_path)

    # Data preprocessing
    # Assuming df is your dataframe and it's already preprocessed and ready for training
    X = df.drop('ApprovalStatus', axis=1)  # Replace 'ApprovalStatus' with your actual target column name
    y = df['ApprovalStatus']  # Replace 'ApprovalStatus' with your actual target column name

    # Split data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize and train the model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate the model
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    print(f"Model accuracy: {accuracy}")

    # Save the trained model
    model_filename = 'credit_model.pkl'
    joblib.dump(model, model_filename)

    # Upload the model to GCS
    save_model_to_gcs(bucket_name, model_output_path, model_filename)

if __name__ == '__main__':
    main()
```

This script is a basic example. If you wanted to try it on Vertex AI, you need to:

- Modify the script according to your specific feature engineering, model parameters, and evaluation metrics requirements.
- Preprocess and prepare your data for use in ML models.
- Create a [custom training job](https://cloud.google.com/vertex-ai/docs/training/overview), specifying the training container image for Scikit-learn, your script file, and any required command-line arguments.
- Configure GCP access permissions so that your Vertex AI training job can access the GCS bucket where your data and outputs will be stored.

### Harness Vertex AI plugin

You can use the Vertex AI plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) in a CI pipeline.

This plugin executes a [notebook](https://cloud.google.com/vertex-ai/docs/vector-search/notebooks) and stores the output in GCloud storage.

```yaml
              - step:
                  type: Plugin
                  name: vertex
                  identifier: vertex
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: harnesscommunity/gcloud-vertex
                    settings:
                      allowlist: sample_notebook.ipynb
                      project_id: some-gcloud-project
                      GCLOUD_SOURCE_BUCKET: some-gcloud-buket
                      GCLOUD_OUTPUT_BUCKET: some-gcloud-bucket/nbr/output
                      SERVICE_ACCOUNT_KEY: <+secrets.getValue("google_sa_key")>
                      DISPLAY_NAME: vertex-test
                    imagePullPolicy: Always
```

#### Vertex AI plugin settings

*  `type: Plugin`
*  `name:` Specify a step name.
*  `identifier:` Specify a unique step ID.
*  `connectorRef:` Specify a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
*  `image: harnesscommunity/gcloud-vertex`
*  `settings:` Configure the plugin parameters.
   * `allowlist`
   * `project_id`
   * `GCLOUD_SOURCE_BUCKET`
   * `GCLOUD_OUTPUT_BUCKET`
   * `SERVICE_ACCOUNT_KEY`
   * `DISPLAY_NAME`

:::tip

You can use expressions for plugin settings. For example, `<+stage.variables.projectId>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables). You can also create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords, and then use expressions to reference those secrets.

:::

## Evaluate

After training, [evaluate the trained model's performance in Vertex AI](https://cloud.google.com/vertex-ai/docs/evaluation/introduction). Evaluating a model trained on Vertex AI involves assessing its performance based on specific metrics like accuracy, precision, recall, or any other relevant metric to your problem.

1. After training a model, prepare evaluation data. Store your evaluation (or test) dataset in a GCS bucket in a format your model can process (such as CSV for a tabular model). Make sure the model hasn't seen this dataset during training.
2. Load the model for prediction. If the model is in cloud storage, you can load it in an evaluation script (for example, the Scikit-learn model from the [sample training script](#sample-training-script) was uploaded to a GCS bucket) or, if the model is already deployed, you can use Vertex AI's prediction service.

   Here's an example script that loads a model from GCS:

   ```python
   from google.cloud import storage
   import joblib

   def download_model_from_gcs(bucket_name, source_blob_name, destination_file_name):
       client = storage.Client()
       bucket = client.bucket(bucket_name)
       blob = bucket.blob(source_blob_name)
       blob.download_to_filename(destination_file_name)

   # Example usage
   model_file_name = 'local_model.pkl'
   download_model_from_gcs('your-bucket-name', 'models/credit_model.pkl', model_file_name)
   model = joblib.load(model_file_name)
   ```

3. Run the evaluation. Load your evaluation dataset similarly to how you loaded your training data. Then, use the loaded model to make predictions on the new dataset. Finally, compute the evaluation metrics that are relevant to your problem. For example:

   ```python
   import pandas as pd
   from sklearn.metrics import accuracy_score, precision_score, recall_score

   # Assuming you have a function `load_data` similar to the one in the training script
   test_df = load_data('your-bucket-name', 'data/test_data.csv')

   X_test = test_df.drop('ApprovalStatus', axis=1)
   y_test = test_df['ApprovalStatus']

   predictions = model.predict(X_test)

   # Compute metrics
   accuracy = accuracy_score(y_test, predictions)
   precision = precision_score(y_test, predictions)
   recall = recall_score(y_test, predictions)

   print(f"Accuracy: {accuracy}, Precision: {precision}, Recall: {recall}")
   ```

4. [Evaluate the trained model's performance in Vertex AI.](https://cloud.google.com/vertex-ai/docs/evaluation/introduction) If you're using Vertex AI's AutoML capabilities or if you have deployed your model to a Vertex AI endpoint, you can use Vertex AI's built-in evaluation tools to analyze evaluation metrics, including:

   - **Evaluation Metrics:** For models trained with AutoML or custom training jobs that output evaluation metrics, you can view these metrics directly in the Vertex AI UI.
   - **Model Monitoring:** For deployed models, you can set up model monitoring to detect issues like skew, drift, and anomalies in the data or predictions.

5. Determine next steps. Based on the evaluation results, you might decide to adjust your model (such as by tuning its hyperparameters, using a different algorithm, or preprocessing your data differently), and then iterate over the training and evaluation process until you're satisfied with the model.

:::info

Model evaluation and improvement is an iterative process that might require multiple rounds of training, evaluation, and tuning to achieve the desired model performance. Make sure the evaluation metrics you choose align with ML best practices and your ML project's business or research objectives.

:::

## Deploy and get predictions

Once the model passes evaluation, you can [deploy it to an endpoint in Vertex AI](https://cloud.google.com/vertex-ai/docs/general/deployment).

Then, you can make predictions by hitting the model's endpoint. For more information about deployment and getting predictions, go to the Google documentation on [Getting predictions on Vertex AI](https://cloud.google.com/vertex-ai/docs/predictions/overview).

## Monitor, improve, and iterate

Set up [monitoring and logging](https://cloud.google.com/vertex-ai/docs/model-monitoring/overview) for deployed models to track model performance and monitor/analyze predictions. Then use this data to improve, iterate, and [redeploy your models](https://cloud.google.com/vertex-ai/docs/model-registry/introduction).

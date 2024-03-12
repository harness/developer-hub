---
title: Google Vertex AI
description: Use Google Vertex AI with Harness
sidebar_position: 13
---

[Google Vertex AI](https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform) provides a comprehensive set of tools for training, deploying, and monitoring machine learning models. You can orchestrate [MLOps workflows for GCP Vertex AI](https://cloud.google.com/vertex-ai/docs/start/introduction-mlops) in Harness.

## Train

Before you create an MLOps pipeline in Harness, you need to prepare and store your training data according to the model type, MLOps best practices, and the GCP Vertex AI documentation. You also need to choose an ML framework and define the model architecture.

Training can be done in Harness or using native integrations with GCP Vertex AI. Here are some general guidelines and code samples for training models with Vertex AI.

### General Guidelines

Training a simple machine learning (ML) model on Google Cloud's Vertex AI involves several steps. Vertex AI is a unified machine learning platform by Google Cloud that enables users to manage datasets, train models, and deploy models for prediction. Here's a step-by-step guide to get you started:

#### Step 1: Set Up Google Cloud Platform (GCP) Account

1. **Create a Google Cloud Platform account** if you don't already have one. You might be eligible for a free trial or credits.
2. **Set up a new project** in GCP. Go to the GCP Console, click on the project selector dropdown, and then click on "New Project". Name your project and optionally assign it to an organization.

#### Step 2: Enable Vertex AI API and Set Up Your Environment

1. **Enable the Vertex AI and Compute Engine APIs** for your project. You can do this in the GCP Console by navigating to the "APIs & Services" -> "Dashboard" section, clicking "ENABLE APIS AND SERVICES", searching for these APIs, and enabling them.
2. **Set up Cloud SDK (gcloud)** on your local machine if you prefer using the command line. Alternatively, you can use Cloud Shell in the GCP Console, which comes with Cloud SDK pre-installed.
3. **Configure your gcloud CLI** with your project and region, for example:
   ```
   gcloud config set project YOUR_PROJECT_ID
   gcloud config set ai/region YOUR_REGION
   ```

#### Step 3: Prepare Your Dataset

1. **Collect your dataset**. Make sure your data is clean and prepared for training. For a simple example, you might use a CSV file with structured data.
2. **Upload your dataset to a Google Cloud Storage (GCS) bucket**. Create a new bucket if necessary in the GCP Console under "Storage" -> "Browser", and then upload your dataset file there.

#### Step 4: Create a Training Job in Vertex AI

1. **Navigate to the Vertex AI section** in the GCP Console.
2. **Create a new dataset** in Vertex AI by selecting "Datasets" and then "Create", choosing the type of dataset that matches your needs (e.g., tabular, image, etc.), and following the prompts to import your data from GCS.
3. **Train a model** by going to the "Training" section, clicking on "Create", and then selecting "AutoML" or "Custom training" depending on your preference and expertise. AutoML is a good start for beginners as it requires less ML knowledge and automates model selection and training.
   - For **AutoML**, simply follow the guided process, selecting your dataset and specifying your target column (the one your model should predict).
   - For **Custom training**, you'll need to provide a training script and specify machine types. This option gives you more control and flexibility but requires deeper ML and coding knowledge.
4. **Set the training parameters** as required, which might include compute resources, training script location (for custom training), and other configurations based on the model type.

#### Step 5: Deploy Your Model

1. Once training is complete, **evaluate the performance** of your model within the Vertex AI interface. You'll see metrics like accuracy for classification models, which can help you decide if the model is good enough for your needs.
2. **Deploy your model** to an endpoint in Vertex AI. This involves selecting your model from the "Models" section, clicking "Deploy to endpoint", and following the deployment steps. This process provisions resources to serve your model and allows you to make predictions via HTTP requests.

#### Step 6: Make Predictions

- After deployment, you can make predictions by sending data to your model's endpoint. You can do this using the gcloud CLI, a client library in your preferred programming language, or directly via REST API.

#### Note:

This guide is a simplified overview. Depending on your specific needs, such as the complexity of your model, the size of your dataset, and whether you're using AutoML or custom training, you might need to dive deeper into each step. Google Cloud documentation provides extensive guides and examples to help you through more complex scenarios and optimizations.





### Train with Harness Vertex AI plugin

You can use the Vertex AI plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) in a CI pipeline.

This plugin executes a Vertex notebook and stores the output in GCloud storage.

```yaml
              - step:
                  type: Plugin
                  name: vertex
                  identifier: vertex
                  spec:
                    connectorRef: account.harnessImage
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

### Vertex AI plugin settings

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





### Sample training script

To train a Scikit-learn model for a task like credit card approval prediction on Google Cloud's Vertex AI, you'll first need to write a training script. Below is a sample script that demonstrates the basic structure of such a script. This example assumes you have a dataset with features relevant to credit card approval decisions (e.g., income, credit score, debt level, etc.) and a binary target variable indicating approval/rejection.

First, ensure you have the necessary packages installed in your environment or include them in a `requirements.txt` file:

```
scikit-learn
pandas
google-cloud-storage
```

Here's a simplified version of what your training script (`train.py`) could look like:

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

This script is a basic starting point. It includes:
- Functions to download data from and upload models to Google Cloud Storage (GCS).
- Sample data preprocessing, which you'll need to adjust according to your actual dataset's structure.
- Model training, evaluation, and serialization using Joblib.

Before running this script on Vertex AI, ensure:
- Your data is preprocessed and ready for machine learning models.
- You have configured access permissions correctly so that your Vertex AI training job can access the GCS bucket where your data and outputs will be stored.
- You adapt the script to handle your specific feature engineering, model parameters, and evaluation metrics needs.

Finally, to run this on Vertex AI, you'll create a custom training job, specifying the training container image for Scikit-learn, your script file, and any required command-line arguments. Google Cloud documentation provides detailed steps on setting up and submitting custom training jobs.


## Evaluate

<!-- Prepare Your Evaluation Data
Ensure your evaluation (or test) dataset is stored in a Google Cloud Storage (GCS) bucket in a format your model can process (e.g., CSV for a tabular model). This dataset should not have been seen by the model during the training phase.
-->

After preparing the evaluation data and the trained model, you may then evaluate the results based on selected metrics. Go to the GCP Vertex AI documentation for specific tools and functions you can use to evaluate models.

Evaluating a model trained on Vertex AI involves assessing its performance based on specific metrics like accuracy, precision, recall, or any other relevant metric to your problem. After training your model, you might want to use a separate test dataset to evaluate its performance. This process can be managed within the Vertex AI environment, assuming you have already completed the training phase and have your model ready.

Here's how to proceed with the evaluation using your trained Scikit-learn model on Vertex AI:

### 1. Prepare Your Evaluation Data
Ensure your evaluation (or test) dataset is stored in a Google Cloud Storage (GCS) bucket in a format your model can process (e.g., CSV for a tabular model). This dataset should not have been seen by the model during the training phase.

### 2. Load the Model for Prediction
If you followed the training script example, your model would be saved and uploaded to a GCS bucket. You can load this model in your evaluation script or directly use Vertex AI's prediction service if the model is already deployed.

For loading the model in an evaluation script, you can use a similar approach to downloading data from GCS as shown before:

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

### 3. Evaluate the Model
Load your evaluation dataset similarly to how you loaded your training data. Then, use the loaded model to make predictions on this new dataset. Finally, compute the evaluation metrics that are relevant to your problem.

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

### 4. Use Vertex AI's Built-in Evaluation Tools (Optional)
If you're using Vertex AI's AutoML capabilities or if you have deployed your model to an endpoint, Vertex AI provides built-in tools for evaluating model performance, including:

- **Model Monitoring:** For deployed models, you can set up model monitoring to detect issues like skew, drift, and anomalies in the data or predictions.
- **Evaluation Metrics:** For models trained with AutoML or custom training jobs that output evaluation metrics, you can view these metrics directly in the Vertex AI UI.

### 5. Improvements and Iterations
Based on the evaluation results, you might decide to adjust your model (e.g., tuning its hyperparameters, using a different algorithm, or preprocessing your data differently). You can iterate over the training and evaluation process until you achieve satisfactory performance.

### Note
The process of evaluation and model improvement is iterative and might require multiple rounds of training, evaluation, and tuning to achieve the desired performance. Always ensure that the evaluation metrics you choose align well with the business or research objectives of your project.










## Deploy

Go to the GCP Vertex AI documentation for guidance on deploying models to various environments, such as development, test, QA, and production.

## Monitor, improve, and iterate

Much as you do for models in development, set up monitoring and logging for production models to track model performance and monitor/analyze predictions, and then use this data to improve, iterate, and redeploy your models. Go to the GCP Vertex AI documentation for information about monitoring, logging, versioning, and redeployment.

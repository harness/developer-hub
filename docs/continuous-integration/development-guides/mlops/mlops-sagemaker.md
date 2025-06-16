---
title: AWS SageMaker
description: Use AWS SageMaker with Harness.
sidebar_position: 11
---

AWS SageMaker provides a comprehensive set of tools for training, deploying, and monitoring machine learning models. You can orchestrate [MLOps workflows for AWS SageMaker](https://aws.amazon.com/tutorials/machine-learning-tutorial-mlops-automate-ml-workflows/) in Harness.

This guide demonstrates a simplified SageMaker ML model development workflow. For detailed instructions and information about SageMaker functionality and MLOps with SageMaker, go to the [AWS SageMaker documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html).

## Prepare SageMaker on AWS

1. [Set up SageMaker in your AWS account](https://aws.amazon.com/tutorials/machine-learning-tutorial-set-up-sagemaker-studio-account-permissions/), including:

   * Creating an AWS account.
   * Onboarding a SageMaker domain and user.
   * Adding permissions to your SageMaker Studio account.

2. Prepare and store training datasets according to the model type, MLOps best practices, and the usage documentation for your chosen ML framework, architecture, and associated tools. Go to the Amazon documentation for more information about [Preparing training data for ML](https://aws.amazon.com/getting-started/hands-on/machine-learning-tutorial-prepare-data-with-minimal-code/).

## Train models with SageMaker

Training models with SageMaker includes creating training jobs, selecting datasets to use, and setting training parameters. Go to the Amazon documentation for detailed instructions on [Training ML models with SageMaker](https://aws.amazon.com/tutorials/machine-learning-tutorial-train-a-model/).

### Sample training scripts

The following Python scripts provide simplified examples of how you might use SageMaker and Scikit-learn to train a model for a task like credit card approval predictions.

These examples assume the following:

* You used a SageMaker notebook to preprocess your data, and your data is split into training, validation, and test sets.
* The supplied dataset has features relevant to credit card approval decisions (such as income, credit score, debt level, and so on) and a binary target variable indicating approval or rejection.
* The necessary packages (such as `scikit-learn`, `pandas`, and SageMaker/AWS CLI tools) are installed in the build environment or that they are included in a `requirements.txt` file.

1. Upload your preprocessed dataset to S3 so it is accessible to your SageMaker training job.

   You an use AWS SDK for Python (Boto3) or AWS CLI to upload your dataset, for example:

   ```python
   import boto3
   s3 = boto3.client('s3')
   s3.upload_file('preprocessed_data.csv', 'your-bucket-name', 'data/preprocessed_data.csv')
   ```

2. Create a Python script to train your model with Scikit-learn. Make sure the script includes data loading, model training, evaluation, and saving the model artifacts, as explained in the following steps.

   Due to specific data preparation, model training, and deployment characteristics, you'll need to add additional code to these examples to create a complete script for your use case.

   Make sure your script handles input and output paths for your data and model, referencing S3 locations as necessary.

   You can use `joblib` or `pickle` to serialize your trained model.

3. Create a SageMaker Estimator in your training script.

   Use the SageMaker Python SDK to define an estimator for your training job. Specify the Scikit-learn version, instance type for training, and the S3 paths for your script and data. For example:

   ```python
   from sagemaker.sklearn.estimator import SKLearn

   script_path = 's3://your-bucket-name/code/your_training_script.py'

   sklearn = SKLearn(
       entry_point=script_path,
       train_instance_type="ml.c4.xlarge",
       role=sagemaker.get_execution_role(),
       sagemaker_session=sagemaker.Session(),
       framework_version='0.23-1',
       hyperparameters={'max_leaf_nodes': 30, 'n_estimators': 100} # example hyperparameters
   )
   ```

4. In your script, start the training job by calling the `fit` method on your estimator along with the S3 path to your training data. For example:

   ```python
   sklearn.fit({'train': 's3://your-bucket-name/data/preprocessed_data.csv'})
   ```

5. After the training portion of your script, deploy your model to a SageMaker endpoint and evaluate its predictions.

   To create a real-time endpoint that you can use to make predictions, use the `deploy` method with an instance type. For example:

   ```python
   predictor = sklearn.deploy(initial_instance_count=1, instance_type="ml.m4.xlarge")
   ```

   Then use the `predictor` method to ingest your evaluation data and make predictions, for example:

   ```python
   response = predictor.predict(your_input_data)
   ```

   Make sure you preprocess your evaluation data the same way as you prepared your training data, and that your evaluation data is in a format supported by your model.

   For more information about this portion of ML model development, go to [Evaluate](#evaluate).

7. To avoid incurring unnecessary charges, delete the SageMaker training endpoint after training and evaluation. For example:

   ```python
   sagemaker.Session().delete_endpoint(predictor.endpoint)
   ```

### Harness SageMaker plugin

You can use the SageMaker plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) in a CI pipeline.

```yaml
              - step:
                  type: Plugin
                  name: sagemaker plugin
                  identifier: sagemaker_plugin
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: harnesscommunity/aws-sagemaker
                    settings:
                      model_name: my-model-aws
                      EXECUTION_ROLE_ARN: arn:aws:iam::12345:role/sagemakertest
                      IMAGE_URL: 87654.dkr.ecr.us-east-1.amazonaws.com/pytorch-training:2.2.0-cpu-py310-ubuntu20.04-ec2
                      MODEL_DATA_URL: s3://sagemakertest87678/biostats.csv
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

#### SageMaker plugin settings

*  `type: Plugin`
*  `name:` Specify a step name.
*  `identifier:` Specify a unique step ID.
*  `connectorRef:` Specify a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
*  `image: harnesscommunity/aws-sagemaker`
*  `settings:` Configure the plugin parameters.
   * `model_name`
   * `EXECUTION_ROLE_ARN`
   * `IMAGE_URL`
   * `MODEL_DATA_URL`
   * `ENDPOINT_CONFIG_NAME`
   * `ENDPOINT_NAME`
   * `INSTANCE_TYPE`
   * `INITIAL_INSTANCE_COUNT`
   * `VARIANT_NAME`
   * `USERNAME: AWS`
   * `AWS_ACCESS_KEY_ID`
   * `AWS_SECRET_ACCESS_KEY`
   * `AWS_REGION`

:::tip

You can use expressions for plugin settings. For example, `<+stage.variables.trackingUri>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables). You can also create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords, and then use expressions to reference those secrets.

:::

## Evaluate

After training, [evaluate the trained model's performance](https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-foundation-model-evaluate-get-started.html) based on metrics relevant to your model's use case.

1. Prepare evaluation data and store it in an S3 bucket in a format your model can process. Make sure the model hasn't seen this dataset during training.
2. Select metrics to track based on the nature of your prediction task.

   For example, common metrics for binary classification tasks, like credit card approval, include accuracy, precision, recall, F1 score, and the area under the ROC curve (AUC-ROC).

   You might also consider business-specific metrics that reflect the cost of false positives versus false negatives, depending on the application.

3. Write a script to evaluate your model, similar to your training script, and then use a SageMaker Processing Job to execute it. SageMaker Processing Jobs can run preprocessing, postprocessing, and model evaluation jobs on your model.

   The evaluation script needs to include commands to load your model, load a test/validation dataset from S3, make predictions on the evaluation data, and then calculate evaluation metrics. The script can also include data preprocessing, depending on how your script is structured and your MLOps workflow.

   For example:

   ```python
   from sklearn.metrics import accuracy_score, roc_auc_score
   import joblib
   import os

   # Example function to demonstrate evaluation script components.
   # This function can be adapted and used in a SageMaker Processing Job for evaluation.
   def evaluate_model(test_data_path, model_path, output_evaluation_path):
       # Load the model
       model = joblib.load(os.path.join(model_path, "model.joblib"))

       # Assuming test_data_path leads to a CSV without a header and the last column is the target
       data = pd.read_csv(test_data_path, header=None)
       X_test, y_test = data.iloc[:,:-1], data.iloc[:,-1]

       # Make predictions
       predictions = model.predict(X_test)

       # Calculate metrics
       accuracy = accuracy_score(y_test, predictions)
       roc_auc = roc_auc_score(y_test, predictions)

       # Save the metrics to a file
       with open(os.path.join(output_evaluation_path, 'evaluation.json'), 'w') as f:
           json.dump({"accuracy": accuracy, "roc_auc": roc_auc}, f)
   ```

4. Evaluate the trained model's performance using SageMaker tools such as:

   - [SageMaker Experiments](https://docs.aws.amazon.com/sagemaker/latest/dg/experiments.html)
   - [Human evaluation](https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-foundation-model-evaluate-human.html)
   - [Automatic evaluation in the SageMaker UI](https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-foundation-model-evaluate-auto.html)

5. Determine next steps. Based on the evaluation results, you might decide to adjust your model (such as by tuning its hyperparameters, using a different algorithm, or preprocessing your data differently), and then iterate over the training and evaluation process until you're satisfied with the model.

   :::info

   Model evaluation and improvement is an iterative process that might require multiple rounds of training, evaluation, and tuning to achieve the desired model performance. Make sure the evaluation metrics you choose align with ML best practices and your ML project's business or research objectives.

   :::

6. After evaluation, clean up any resources you no longer need, such as test endpoints or processing jobs, to avoid unnecessary charges.

## Deploy and get predictions

Once the model passes evaluation, you can [deploy it to an SageMaker endpoint](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-deployment.html).

Then, you can make predictions by hitting the model's endpoint. For more information about deployment and getting predictions, go to the Amazon documentation on [Deploying models for inference](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html).

## Monitor, improve, and iterate

Set up [monitoring and logging](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html) for deployed models to track model performance and monitor/analyze predictions. Then use this data to improve and iterate on your models.

---
title: AWS Sagemaker
description: Use AWS Sagemaker with Harness.
sidebar_position: 11
---

You can use AWS Sagemaker in your MLOps workflow. For more information about Sagemaker, go to the [AWS ML workflows documentation](https://aws.amazon.com/tutorials/machine-learning-tutorial-mlops-automate-ml-workflows/).

## Use Sagemaker with Harness

Training can be done in Harness or using native integrations with popular data science platforms, such as AWS Sagemaker.

### Sagemaker plugin

You can use the Sagemaker plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) in a CI pipeline.

```yaml
              - step:
                  type: Plugin
                  name: sagemaker plugin
                  identifier: sagemaker_plugin
                  spec:
                    connectorRef: account.harnessImage
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

### Sagemaker plugin settings

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
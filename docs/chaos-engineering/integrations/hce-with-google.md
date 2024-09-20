---
title: Integrate HCE with Google Cloud Build
sidebar_position: 30
description: Guide to execute chaos experiment using Google Cloud Build.
---

This tutorial describes how you can add the Harness-chaos builder step into Google Cloud Build (that is a part of GCP) to execute experiments and determine the resilience of your application.

## Why integrate HCE with Google Cloud Build?
By integrating Harness CE into Google Cloud Build, you can bring chaos experiments directly into your Google Cloud Build pipeline. This provides the following benefits:
- Ensures that every deployment is validated for resilience.
- Validates the robustness of new code deployments by executing chaos experiments in pre-production environments.
- Automates resilience testing as part of the continuous integration and delivery process.
- Simulates various failure scenarios (for example, pod failures, resource exhaustion, and so on) and ensures that your services remain operational under stress.

The [harness-chaos builder](https://github.com/GoogleCloudPlatform/cloud-builders-community/tree/master/harness-chaos) is available in the Google Cloud Builders Community, that enables you to execute chaos experiments as part of your Cloud Build workflows. This integration helps test the resilience of your application and ensure that your application can withstand real-world failures.

## Prerequisites

- Harness account with Chaos Engineering module enabled.
- Google Cloud project with Cloud Build enabled.
- The [harness-chaos builder](https://github.com/GoogleCloudPlatform/cloud-builders-community/tree/master/harness-chaos) from Google Cloud Builders Community.
- [Harness API key](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/#create-personal-api-keys-and-tokens) is required for authentication, which is passed as a secret to the YAML file.

## Steps to Integrate Harness Chaos Engineering with Google Cloud Build
1. [Set up a chaos experiment based on your application's requirements](/docs/chaos-engineering/use-harness-ce/experiments/create-experiments): After saving the experiment, copy the experiment ID and choose a value for the `expected-resilience-score`.

:::tip
Ensure that the resilience score of the experiment run meets the `expected-resilience-score`.
:::

2. **Configure Google Cloud Build YAML file**

    In your Cloud Build YAML configuration file, add a new step for executing the Harness Chaos experiment using the harness-chaos builder. A sample configuration is shown below:

    ```yaml
    steps:
      - name: 'gcr.io/$PROJECT_ID/harness-chaos'
        secretEnv: ['API_KEY']
        args: ['generate', '--api=run-and-monitor-experiment', '--account-id=${_ACCOUNT_ID}','--org-id=${_ORG_ID}','--project-id=${_PROJECT_ID}', '--workflow-id=${_EXPERIMENT_ID}', '--expected-resilience-score=${_EXPECTED_RES_SCORE}', '--api-key=$$API_KEY' ]

    availableSecrets:
      secretManager:
      - versionName: projects/$PROJECT_ID/secrets/x-api-key/versions/latest
        env: API_KEY

    substitutions:
      _ACCOUNT_ID: '<ACCOUNT_ID>'
      _ORG_ID: '<ORG_ID>'
      _PROJECT_ID: '<PROJECT_ID>'
      _EXPERIMENT_ID: '<EXPERIMENT_ID>'
      _EXPECTED_RES_SCORE: '100'
    ```

In the above YAML,
- `--api`: Sets the name of the target API (mandatory).
- `--account-id`: Sets the account ID (mandatory).
- `--org-id`: Sets the organization ID (default is "default").
- `--project-id`: Sets the HCE project ID (mandatory).
- `--workflow-id`: Sets the workflow ID (mandatory for some APIs; a default dummy value is provided). It is the same as experiment ID.
- `--api-key`: Sets the API key (mandatory).
- `--delay`: Sets the delay provided for multiple iterations (default value of 2s is provided for some APIs).
- `--timeout`: Sets the timeout provided for multiple iterations (a default value of 180s is provided for some APIs).
- `run-experiment`: The command to execute the experiment.
- `HARNESS_API_KEY`: The API key from your Harness account. This key is stored in Google Cloud's secret manager and referred from there.
- `HARNESS_PROJECT_ID`: The ID of the Harness project that contains your experiment.
- `HARNESS_EXPERIMENT_ID`: The ID of the chaos experiment you want to run.

3. Go to [cloudbuild.yaml](https://github.com/GoogleCloudPlatform/cloud-builders-community/blob/master/harness-chaos/cloudbuild.yaml) for a sample Cloud Build YAML file.

4. **Trigger the Build**

Once the YAML configuration is in place, you can trigger the Cloud Build pipeline manually.

When the pipeline runs, the chaos experiment defined in Harness will be executed as part of the build process. The results of the experiment will help determine if the deployment is resilient under the specified failure conditions.

5. **Monitor Experiment Results**

After the chaos experiment is triggered through Google Cloud Build, you can [monitor its progress](/docs/chaos-engineering/getting-started/saas/first-experiment#step-6-observing-chaos-execution) and results within the Harness UI.
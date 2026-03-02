---
title: Integrate HCE with Tekton Pipeline
sidebar_position: 31
description: Guide to execute chaos experiment using Tekton Pipeline.
---

This tutorial describes how you can add the Harness-chaos step into Tekton Pipeline to execute chaos experiments and determine the resilience of your application.

## Why integrate HCE with Tekton?
By integrating Harness CE into Tekton, you can bring chaos experiments directly into your Tekton pipeline. This provides the following benefits:
- Ensures that every deployment is validated for resilience.
- Validates the robustness of new code deployments by executing chaos experiments in pre-production environments.
- Automates resilience testing as part of the continuous integration and delivery process.
- Simulates various failure scenarios (for example, pod failures, resource exhaustion, and so on) and ensures that your services remain operational under stress.

## Prerequisites

- Harness account with Chaos Engineering module enabled.
- Google Cloud project.
- Tekton installed on the system.
- [Harness API key](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/#create-personal-api-keys-and-tokens) is required for authentication, which is passed as a secret to the YAML file.

## Steps to Integrate Harness Chaos Engineering with Tekton
1. [Set up a chaos experiment based on your application's requirements](/docs/chaos-engineering/use-harness-ce/experiments/create-experiments): After saving the experiment, copy the experiment ID and choose a value for the `expected-resilience-score`.

:::tip
Ensure that the resilience score of the experiment run meets the `expected-resilience-score`.
:::

2. **Configure Tekton Step Action**

    Create a reusable step action for configuring chaos experiments. A sample configuration is shown below:

    ```yaml
   apiVersion: tekton.dev/v1beta1
    kind: StepAction
    metadata:
    name: harness-chaos-step-action-v2
    spec:
    params:
        - name: experimentID
        type: string
        - name: projectID
        type: string
        - name: orgID
        type: string
        - name: accountID
        type: string
        - name: host
        type: string
        - name: expectedResilenceScore
        type: string
    env:
        - name: EXPID
        value: $(params.experimentID)
        - name: projectID
        value: $(params.projectID)
        - name: orgID
        value: $(params.orgID)
        - name: accountID
        value: $(params.accountID)
        - name: host
        value: $(params.host)
        - name: expectedResilenceScore
        value: $(params.expectedResilenceScore)
        - name: X_API_KEY
        valueFrom:
            secretKeyRef:
            name: my-secret
            key: my-secret-key
    image: ubuntu:latest
    script: |
        #!/bin/sh
        apt-get update -y
        apt-get install curl -y

        curl -sL https://app.harness.io/public/shared/tools/chaos/hce-cli/0.0.8/hce-cli-0.0.8-linux-amd64 -o hce-cli
        chmod +x hce-cli
        mv hce-cli /usr/local/bin/

        echo "Applying chaos on account = $accountID, org = $orgID, project = $projectID, experiment-id = $EXPID, endpoint = $host"
        hce-cli config create --name "my-config-1" --interactive=false
        hce-cli experiment run --account-id="$accountID" --org-id="$orgID" --project-id="$projectID" --experiment-id="$EXPID" --api-key="$X_API_KEY"  --timeout=300 --expected-res-score="$expectedResilenceScore" --interactive=false --monitor=true
    ```

In the above YAML,
- `--account-id`: Sets the account ID (mandatory).
- `--org-id`: Sets the organization ID (default is "default").
- `--project-id`: Sets the HCE project ID (mandatory).
- `--experiment-id`: Sets the experiment ID (mandatory for some APIs; a default dummy value is provided).
- `-expected-res-score`: Sets the expected resiliency score of the application.
- `--api-key`: Sets the API key (mandatory).
- `--timeout`: Sets the timeout provided for multiple iterations (a default value of 180s is provided for some APIs).
- `experiment run`: The command to execute the experiment.
- `HARNESS_API_KEY`: The API key from your Harness account.
- `HARNESS_PROJECT_ID`: The ID of the Harness project that contains your experiment.
- `HARNESS_EXPERIMENT_ID`: The ID of the chaos experiment you want to run.

3. **Configure Secret, Task, Pipeline and PipelineRun**

- Secret can be used to store the X-API-KEY. 
- Task conisists of the details required to execute the experiments. All the ENVs required in the step action are configured from here.
- The task is then referenced in the Pipeline, and the pipeline is referenced in the PipelineRun.

A sample configuration is shown below:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  my-secret-key: <SECRET_KEY>

---
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: run-experiment-v2
spec:
  steps:
    - name: run-chaos-pod-network-latency
      ref:
        name: harness-chaos-step-action-v2
      params:
        - name: experimentID
          value: "d7c9d243-0219-4f7c-84c2-3004e59e4505"
        - name: projectID
          value: "ChaosDev"
        - name: orgID
          value: "default"
        - name: accountID
          value: "cTU1lRSWS2SSRV9phKvuOA"
        - name: host
          value: "https://app.harness.io"
        - name: expectedResilenceScore
          value: "50"
    - name: run-chaos-multiple-faults
      ref:
        name: harness-chaos-step-action-v2
      params:
        - name: experimentID
          value: "505c8dcd-8852-4046-a245-89ea1d5dfe44"
        - name: projectID
          value: "ChaosDev"
        - name: orgID
          value: "default"
        - name: accountID
          value: "cTU1lRSWS2SSRV9phKvuOA"
        - name: host
          value: "https://app.harness.io/"
        - name: expectedResilenceScore
          value: "40"

---
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: run-experiment-pipeline-v2
spec:
  tasks:
    - name: run-experiment-v2
      taskRef:
        name: run-experiment-v2

---
apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  generateName: experiment-pipeline-run-v2-
spec:
  pipelineRef:
    name: run-experiment-pipeline-v2
```

4. **Apply the Resources**

Once the YAML configuration is in place, you can apply the resources in the same cluster where tekton is installed.

When the pipeline runs, the chaos experiment defined in Harness will be executed. The results of the experiment will help determine if the application is resilient under the specified failure conditions.

5. **Monitor Experiment Results**

After the chaos experiment is triggered through tekton pipeline, you can [monitor its progress](/docs/chaos-engineering/getting-started/saas/#step-7-observing-chaos-execution) and results within the Harness UI or from [tekton dashboard](https://tekton.dev/docs/dashboard/).
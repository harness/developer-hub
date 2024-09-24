---
title: Run chaos experiments as GitLab pipelines
sidebar_position: 10
description: Guide to run a chaos experiment as a GitLab pipeline
redirect_from:
- /tutorials/chaos-experiments/chaos-experiments-on-gitlab
- /docs/chaos-engineering/integrations/experiment-as-gitlab-pipeline
---

This tutorial explains how you can create chaos experiments using Harness CE and run them as GitLab pipelines. Chaos experiments in Harness are created the same way in the chaos engineering module, irrespective of where they are invoked from.

1. [Create a chaos experiment in the Harness Chaos Engineering module](/docs/chaos-engineering/use-harness-ce/experiments/create-experiments). Execute this experiment to verify the configuration and ensure that the resilience probes are working as expected. The experiment ID and resilience score determined from this experiment run will be used to integrate the experiment with GitLab.

   ![chaos experiment with ID and resilience score](./static/chaos-experiments-with-id.png)

- You will need the account scope details such as ACCOUNT_ID, PROJECT_ID, and CHAOS_EXPERIMENT_ID. You can get these values from your session URL.
For example,

```
https://app.harness.io/ng/#/account/**JxE3EzyXSmWugTiJV48n6K**/chaos/orgs/default/projects/**default_project**/experiments/**d7c9d243-0219-4f7c-84g2-3004e59e4605**
```

- The strings marked in asterisk are the account ID, project ID, and chaos experiment IDs respectively.

:::tip
- To set variables in GitLab CI, go to [set variables for a project](https://docs.gitlab.com/ee/ci/variables/?_gl=1*ysqeh0*_ga*MTc2NzQ4NTYwLjE2NjQ4MDQ0NjI.*_ga_ENFH3X7M5Y*MTY4MDE0MTE5NC42LjEuMTY4MDE0NDgxNS4wLjAuMA..#for-a-project).
- For example, make sure the `API_KEY` is set as `protected`,  `masked`, and as a `secret` variable.
:::

- From your account profile page, generate an API key and copy it to a safe location (you will need it further).

2. Create a launch script. HCE APIs are used to invoke or launch a chaos experiment from the pipeline.

   To simplify creating an API call with the required secure parameters and data, a [CLI tool](https://app.harness.io/public/shared/tools/chaos/hce-cli/0.0.4/hce-cli-0.0.4-linux-amd64) is provided. Use this tool to create an appropriate API command to include in the pipeline script.

   Below is a sample launch script.

   ```
   #!/bin/bash

   set -e

   curl -sL https://app.harness.io/public/shared/tools/chaos/hce-cli/0.0.4/hce-cli-0.0.4-linux-amd64 -o hce-cli

   chmod +x hce-cli

   output=$(./hce-cli generate --api launch-experiment --account-id=${ACCOUNT_ID} \
   --project-id ${PROJECT_ID} --workflow-id ${WORKFLOW_ID} \
   --api-key ${API_KEY} --file-name hce-api.sh | jq -r '.data.runChaosExperiment.notifyID')

   echo ${output}
   ```

   :::tip Demo

   Go to [GitLab demo](https://gitlab.com/ksatchit/hce-gitlab-integration-demo) for a sample configuration of the chaos launch script. You can include this script in the GitLab YAML file.
   This is a sample to include one single chaos experiment, but the same can be repeated so as to be included in multiple chaos experiments.

   :::


3. Insert chaos experiments into `.gitlab-ci.yaml`. You can include the above-mentioned launch script in the GitLab pipeline as a stage or a step. In the `script` section, add the scripts for **launching**, **monitoring** and **retrieving** results. For example:

   ```
   # Insert a chaos stage where each chaos experiment is inserted as a launch script.

   chaos-job:      # This job runs in the deploy stage.
     stage: chaos  # It only runs when *both* jobs in the test stage complete successfully.
     environment: production
     variables:
       WORKFLOW_ID: "d7c9d243-0219-4f7c-84c2-3004e59e4505"
       EXPECTED_RESILIENCE_SCORE: 100
     before_script:
       - apt-get update; apt-get -y install jq
     script:
       - echo "Launching Chaos Experiment.."; EXPERIMENT_NOTIFY_ID=$(sh scripts/launch-chaos.sh)
       - echo "Monitoring Chaos Experiment.."; sh scripts/monitor-chaos.sh ${EXPERIMENT_NOTIFY_ID}
       - echo "Deriving Resilience Score.."; ACTUAL_RESILIENCE_SCORE=$(sh scripts/verify-rr.sh ${EXPERIMENT_NOTIFY_ID} | tr -d '"')
       - echo "Obtained Resilience Score is ${ACTUAL_RESILIENCE_SCORE}"
       - if [ ${ACTUAL_RESILIENCE_SCORE} -lt ${EXPECTED_RESILIENCE_SCORE} ]; then exit 1; fi

   rollback-job:
     stage: rollback
     environment: production
     image:
       name: bitnami/kubectl:latest
       entrypoint: ['']
     script:
       - *prepare_kubecontext
       - echo "Attempting Rollback.."; sh scripts/rollback-deploy.sh  #write your own rollback logic here
     needs: ["chaos-job"]
     when: on_failure
   ```

   :::tip
   The resilience score is the result of the experiment, and it helps decide if a rollback job needs to be invoked.
   :::

4. Retrieve the resilience score using the Harness Chaos API and take appropriate action in the pipeline. An example of how to use the Harness Chaos API is shown below.

   ```
   #!/bin/bash

   set -e

   curl -sL https://app.harness.io/public/shared/tools/chaos/hce-cli/0.0.1/hce-cli-0.0.1-linux-amd64 -o hce-cli

   chmod +x hce-cli

   resiliencyScore=$(./hce-cli generate --api validate-resilience-score  --account-id=${ACCOUNT_ID} \
   --project-id ${PROJECT_ID} --notify-id=$1  \
   --api-key ${API_KEY} --file-name hce-api.sh)

   echo "${resiliencyScore}"
   ```
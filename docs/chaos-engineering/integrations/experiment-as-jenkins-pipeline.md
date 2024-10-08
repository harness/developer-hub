---
title: Run chaos experiments as Jenkins pipelines
sidebar_position: 20
description: Guide to run a chaos experiment as a Jenkins pipeline
redirect_from:
- /tutorials/chaos-experiments/chaos-experiments-on-jenkins
- /docs/chaos-engineering/integrations/experiment-as-jenkins-pipeline
---

This tutorial describes how to create chaos experiments using Harness Chaos Engineering (HCE) and run them in Jenkins pipelines. Chaos experiments in Harness are created the same way in the chaos engineering module, irrespective of where they are invoked from.

1. [Create a chaos experiment in the Harness Chaos Engineering module.](#construct-a-chaos-experiment) Execute this experiment to verify the configuration and ensure that the resilience probes are working as expected. The experiment ID and resilience score determined from this experiment run will be used to integrate the experiment with Jenkins.

   ![chaos experiment with ID and resilience score](./static/chaos-experiments-with-id.png)

2. Create a launch script. HCE APIs are used to invoke or launch a chaos experiment from the pipeline.

   To simplify creating an API call with the required secure parameters and data, a [CLI tool](https://storage.googleapis.com/hce-api/hce-api-linux-amd64) is provided. Use this tool to create an appropriate API command to include in the pipeline script.

   Below is a sample launch script.

   ```
   #!/bin/bash

   set -e

   curl -sL https://storage.googleapis.com/hce-api/hce-api-linux-amd64 -o hce-cli

   chmod +x hce-cli

   output=$(./hce-cli generate --api launch-experiment --account-id=${ACCOUNT_ID} \
   --project-id ${PROJECT_ID} --workflow-id ${WORKFLOW_ID} \
   --api-key ${API_KEY} --file-name hce-api.sh | jq -r '.data.runChaosExperiment.notifyID')

   echo ${output}
   ```

   :::tip Demo

   Go to [Jenkins demo](https://github.com/ksatchit/hce-jenkins-integration-demo) for a sample configuration of the chaos launch script. You can include this script in the Jenkins configuration file.
   This is a sample to include one single chaos experiment, but the same can be repeated so as to be included in multiple chaos experiments.

   :::

3. Insert chaos experiments into Jenkins config file. You can include the above-mentioned launch script in the Jenkins pipeline as a stage or a step. In the `script` section, add the scripts for **launching**, **monitoring** and **retrieving** results. An example is shown below.

   ```
   stage('Launch Chaos Experiment') {
               steps {
                    sh '''
                       sh scripts/launch-chaos.sh > n_id.txt
                    '''
                    script {
                        env.notify_id = sh(returnStdout: true, script: 'cat n_id.txt').trim()
                    }
               }
           }

           stage('Monitor Chaos Experiment') {
               steps {
                   sh '''
                      sh scripts/monitor-chaos.sh ${notify_id}
                   '''
               }
           }

           stage('Verify Resilience Score') {
               steps {
                   sh '''
                       sh scripts/verify-rr.sh ${notify_id} > r_s.txt
                   '''
                   script {
                       env.resilience_score = sh(returnStdout: true, script: 'cat r_s.txt').trim()
                    }
               }
           }

           stage('Take Rollback Decision') {
               steps {
                   sh '''
                       echo ${resilience_score}
                       sh scripts/rollback-deploy.sh ${resilience_score}
                   '''
               }
           }
   ```

   :::info
   The resilience score is the result of the experiment, and helps decide if a rollback job needs to be invoked.
   :::

4. Retrieve the resilience score using the Harness Chaos API and take appropriate action in the pipeline. An example of how to use the Harness Chaos API is shown below.

   ```
   #!/bin/bash

   set -e

   curl -sL https://storage.googleapis.com/hce-api/hce-api-linux-amd64 -o hce-cli

   chmod +x hce-cli

   resiliencyScore=$(./hce-cli generate --api validate-resilience-score  --account-id=${ACCOUNT_ID} \
   --project-id ${PROJECT_ID} --notifyID=$1  \
   --api-key ${API_KEY} --file-name hce-api.sh)

   echo "${resiliencyScore}"
   ```
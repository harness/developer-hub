---
sidebar_position: 5
title: Run chaos experiment as a Jenkins pipeline
description: Create chaos experiments in Harness and run them as Jenkins pipelines
---

This tutorial describes how to create chaos experiments using Harness Chaos Engineering (HCE) and run them in Jenkins pipelines. Chaos experiments in Harness are created the same way in the chaos engineering module, irrespective of where they are invoked from.

## Before you begin
Check out the [first chaos experiment](https://developer.harness.io/tutorials/chaos-experiments/first-chaos-engineering) that will guide you through creating a new experiment in HCE. This will provide a solid foundation for your understanding of creating experiments in HCE. 

Below are the steps to run chaos experiments in Jenkins pipelines.

## Create a chaos experiment

Create a [chaos experiment](https://developer.harness.io/tutorials/chaos-experiments/first-chaos-engineering) in the Harness Chaos Module. Execute this experiment to verify the configuration and ensure that the resilience probes are working as expected. The experiment ID and resilience score determined from this experiment run will be used to integrate the experiment with Jenkins.

![chaos experiment with ID and resilience score](static/gitlab/chaos-experiments-with-id.png)

## Create a launch script

HCE APIs are used to invoke or launch a chaos experiment from the pipeline. To simplify creating an API call with the required secure parameters and data, a [CLI tool](https://storage.googleapis.com/hce-api/hce-api-linux-amd64) is provided. Use this tool to create an appropriate API command to include in the pipeline script.

Below is a sample launch script.
```
#!/bin/bash

set -e

curl -sL https://storage.googleapis.com/hce-api/hce-api-linux-amd64 -o hce-api-saas

chmod +x hce-api-saas

output=$(./hce-api-saas generate --api launch-experiment --account-id=${ACCOUNT_ID} \
--project-id ${PROJECT_ID} --workflow-id ${WORKFLOW_ID} \
--api-key ${API_KEY} --file-name hce-api.sh | jq -r '.data.runChaosExperiment.notifyID')

echo ${output}
```

## Insert chaos experiments into Jenkins config file
You can include the above-mentioned launch script in the Jenkins pipeline as a stage or a step. In the `script:` section, add the scripts for **launching**, **monitoring** and **retrieving** results. An example is shown below.

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

## Retrieve the resilience score
Retrieve the resilience score using the Harness Chaos API and take appropriate action in the pipeline. An example of how to use the Harness Chaos API is shown below.

```
#!/bin/bash

set -e 

curl -sL https://storage.googleapis.com/hce-api/hce-api-linux-amd64 -o hce-api-saas

chmod +x hce-api-saas

resiliencyScore=$(./hce-api-saas generate --api validate-resilience-score  --account-id=${ACCOUNT_ID} \
--project-id ${PROJECT_ID} --notifyID=$1  \
--api-key ${API_KEY} --file-name hce-api.sh)

echo "${resiliencyScore}"
```

## Example end-to-end configuration

Go to [Jenkins demo](https://github.com/ksatchit/hce-jenkins-integration-demo) for a sample configuration of the chaos launch script. You can include this script in the Jenkins configuration file. 
This is a sample to include one single chaos experiment, but the same can be repeated so as to be included in multiple chaos experiments. 


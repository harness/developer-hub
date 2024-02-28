---
description: KB - Using API to retry pipleine with input set YAML
title: Pipeline retry API
---

This knowledge base article provides step-by-step guidance on how to retry a pipeline based on the latest ExecutionId using Harness APIs.

## Problem

Retrying a pipeline based on the latest ExecutionId can be a challenging task, especially when dealing with complex deployment scenarios. Retrying a pipeline with an input set requires two endpoints: 

* Pipeline Execution Details API - [Get the inputSet YAML used for a given Plan Execution endpoint](https://apidocs.harness.io/tag/Pipeline-Execution-Details/#operation/getInputsetYamlV2)
* Pipeline Execute API - [Retry an executed pipeline with inputSet pipeline YAML endpoint](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/retryPipeline)

## Solution

1. Use the [Pipeline Execution Details API](https://apidocs.harness.io/tag/Pipeline-Execution-Details/#operation/getInputsetYamlV2) to get the the inputSet YAML used for the Plan Execution that you want to retry.
2. Use the [Pipeline Execute API](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/retryPipeline) to retry the pipeline with the inputSet pipeline YAML.

Here is a Shell script that uses these two endpoints. To use this Shell script for yourself, replace placeholders, like `ExecutionId`, `YOUR_API_TOKEN`, `YOUR_APPLICATION_ID`, and `YOUR_PIPELINE_ID`, with actual values relevant to your Harness account.

```sh
microdnf install jq
API_KEY=""
PLAN_EXECUTION_ID=""
ACCOUNT_IDENTIFIER=""
ORG_IDENTIFIER=""
PROJECT_IDENTIFIER=""
PipelineIdentifier=""
Retrystages=""

# API endpoint URL
URL="https://app.harness.io/pipeline/api/pipelines/execution/${PLAN_EXECUTION_ID}/inputsetV2?accountIdentifier=${ACCOUNT_IDENTIFIER}&orgIdentifier=${ORG_IDENTIFIER}&projectIdentifier=${PROJECT_IDENTIFIER}&resolveExpressions=false&resolveExpressionsType=RESOLVE_ALL_EXPRESSIONS"

# Capture the output of the curl command into the output variable
output=$(curl -s -X GET "$URL" -H "x-api-key: $API_KEY" -H 'Content-Type: application/yaml')

# Extract inputSetTemplateYaml using jq
inputSetYaml=$(echo "$output" | jq -r '.data.inputSetYaml')

# Store the inputSetTemplateYaml in a variable
inputSetYaml1=$(echo "$inputSetYaml" | sed 's/\\n/\n/g')
echo "$inputSetYaml1"

echo "$inputSetYaml1"
curl -i -X POST \
  'https://app.harness.io/pipeline/api/pipeline/execute/retry/${PipelineIdentifier}?accountIdentifier=${ACCOUNT_IDENTIFIER}&orgIdentifier=${ORG_IDENTIFIER}&projectIdentifier=${PROJECT_IDENTIFIER}&moduleType=string&planExecutionId=${PLAN_EXECUTION_ID}&retryStages=${Retrystages}&runAllStages=true&notesForPipelineExecution=' \
  -H 'Content-Type: application/yaml' \
  -H 'x-api-key: pat.' \
  --data-binary @- <<EOF
$inputSetYaml1
EOF
```

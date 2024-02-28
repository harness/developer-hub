---
description: KB - Using API to retry pipleine with input set YAML
title: Pipeline retry API
---
# Introduction

This knowledge base article provides step-by-step guidance on how to retry a pipeline based on the latest ExecutionId using Harness APIs.

## Problem Statement

Retrying a pipeline based on the latest ExecutionId can be a challenging task, especially when dealing with complex deployment scenarios. Retrying a pipeline with an input set requires two API's : 

1. [API to get input set YAML from execution ID](https://apidocs.harness.io/tag/Pipeline-Execution-Details/#operation/getInputsetYamlV2) to get the inputset YAML used in the execution
2. [API to rerty pipeline with input set YAML](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/retryPipeline) to retry the pipeline with input set YAML fetched from first API

## Solution

1. Use the [API Endpoint](https://apidocs.harness.io/tag/Pipeline-Execution-Details/#operation/getInputsetYamlV2) to get the input set YAML from pipeline execution id 

2. Use the pipeline retry [API Endpoint](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/retryPipeline) to retry the pipeline by passing the fetched input set YAML.

For example, the following Shell script uses Harness API endpoints to retrieve the input set YAML and retry the pipeline with the extracted input set YAML.To use this Shell script, replace placeholders, like `ExecutionId`, `YOUR_API_TOKEN`, `YOUR_APPLICATION_ID`, and `YOUR_PIPELINE_ID` with actual values relevant to your Harness account.

```
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

curl -i -X POST \
  'https://app.harness.io/pipeline/api/pipeline/execute/retry/${PipelineIdentifier}?accountIdentifier=${ACCOUNT_IDENTIFIER}&orgIdentifier=${ORG_IDENTIFIER}&projectIdentifier=${PROJECT_IDENTIFIER}&moduleType=string&planExecutionId=${PLAN_EXECUTION_ID}&retryStages=${Retrystages}&runAllStages=true&notesForPipelineExecution=' \
  -H 'Content-Type: application/yaml' \
  -H 'x-api-key: pat.' \
  --data-binary @- <<EOF
$inputSetYaml1
EOF

```
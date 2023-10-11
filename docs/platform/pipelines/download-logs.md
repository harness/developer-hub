---
title: Download execution logs
description: Download pipeline or step execution logs via the UI. 
sidebar_position: 3
---

:::info note
Currently, this feature is behind the feature flag `SPG_LOG_SERVICE_ENABLE_DOWNLOAD_LOGS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

You can download pipeline or step execution logs via the UI. You can download pipeline, stage, and step execution logs via the API.

The process of downloading logs is the same for all Harness modules. Your access to certain modules and settings limits the functionality available to you.

After you download the execution log files, you can view the JSON logs.

:::info note
The extracted files have many levels of nested directories. To locate specific log files, you may need to navigate through several levels.
:::

## Download pipeline log files

To download pipeline log files, do the following:

1. In Harness, select your pipeline.
2. Select **More Options** (&vellip;), and then select **Download Logs**.

   ![](./static/download-pipeline-logs.png)

   Harness queries the log service, exports the log, and downloads the `logs.zip` file.

3. Open the `logs.zip` file, and extract the contents.
4. Drill down into the extracted files to locate the log you want to examine.

## Download step log files

To download step log files, do the following:

1. In Harness, select your pipeline.
2. Select the step for which you want to download the execution log.
3. Under **Details**, select the download icon.

   ![](./static/download-step-logs.png)

   Harness queries the log service, exports the log, and downloads the `logs.zip` file. 

4. Open the `logs.zip` file, and extract the contents.
5. Drill down into the extracted files to locate the log you want to examine.

## Download logs via API

You can download pipeline, stage, and step execution logs via the Log Service API `/log-service/blob/download`. Authentication by [Harness API token](/docs/platform/automation/api/add-and-manage-api-keys) is required. For more information, go to the [Harness API reference](https://apidocs.harness.io/#section/Introduction/Authentication).

The response contains a link to download the requested log file.

### Download logs with simplified log key

:::note

Currently, the simplified log key to download logs is behind the feature flag `PIE_SIMPLIFY_LOG_BASE_KEY`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

The simplified log key makes it easier to call the Log Service API.

#### cURL command to download pipeline logs

This cURL command downloads pipeline log files based on the given pipeline execution key.

```
curl 'https://app.harness.io/gateway/log-service/blob/download?accountID=ACCOUNT_ID&prefix=PIPELINE_EXECUTION_PREFIX_KEY' \
  -X 'POST' \
  -H 'authorization: <Bearer TOKEN>' \
  -H 'content-type: application/json' \
  -H 'x-harness-token: <HARNESS-TOKEN>' \
  --compressed
```

* `ACCOUNT_ID`: Your Harness account identifier.
* `PIPELINE_EXECUTION_PREFIX_KEY`: A multi-part value consisting of `ACCOUNT_ID/pipeline/PIPELINE_ID/RUN_SEQUENCE/`. For example, `12345abcd/pipeline/My_Cool_Pipeline/12/`.
   * `ACCOUNT_ID`: Your Harness account identifier.
   * `PIPELINE_ID`: The identifier of the pipeline that you want to get logs for.
   * `RUN_SEQUENCE`: The incremental execution/build identifier of the specific pipeline run that you want logs for.
* `TOKEN`: [Harness API token](/docs/platform/automation/api/add-and-manage-api-keys)

#### cURL command to download step logs

This cURL command downloads pipeline log files based on the given step key.

```
curl 'https://app.harness.io/gateway/log-service/blob/download?accountID=ACCOUNT_ID&prefix=STEP_PREFIX_KEY' \
  -X 'POST' \
  -H 'authorization: <Bearer Token>' \
  -H 'content-type: application/json' \
  -H 'x-harness-token: <HARNESS-TOKEN>' \
  --compressed
```

* `ACCOUNT_ID`: Your Harness account identifier.
* `STEP_PREFIX_KEY`: A multi-part value consisting of `ACCOUNT_ID/pipeline/PIPELINE_ID/RUN_SEQUENCE/pipeline/stages/STAGE_ID/steps/STEP_ID/`. For example, `12345abcd/pipeline/My_Cool_Pipeline/12/pipeline/stages/My_Cool_Stage/steps/My_Cool_Step/`.
   * `ACCOUNT_ID`: Your Harness account identifier.
   * `PIPELINE_ID`: The identifier of the pipeline that has the step that you want to get logs for.
   * `RUN_SEQUENCE`: The incremental execution/build identifier of a specific pipeline run.
   * `STAGE_ID`: The identifier of the stage that has the step that you want to get logs for.
   * `STEP_ID`: The identifier of the step that has the logs you want.
* `TOKEN`: [Harness API token](/docs/platform/automation/api/add-and-manage-api-keys)

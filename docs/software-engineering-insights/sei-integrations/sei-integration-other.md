---
title: Other SEI integrations
description: Use these steps to configure the Jenkins Job Reporter plugin or custom CI/CD integrations.
sidebar_position: 250
sidebar_label: Other integrations
---

This topic explains how to configure:

* The Jenkins Job Reporter plugin.
* Custom CI/CD integrations through webhooks.

For information about the **Custom** integration that uses an Ingestion Satellite, go to [Ingestion Satellites](./sei-integration-satellite.md).

:::tip

In addition to SEI integrations, you can [import CSV files](../sei-propels-scripts/tables.md) and display the data in [Table reports](../sei-propels-scripts/table-reports.md).

:::

## Jenkins Job Reporter plugin

The [Job Reporter plugin](https://plugins.jenkins.io/propelo-job-reporter/) is a tool, written in Java, that sends reports about Jenkins builds to SEI. It monitors all job runs, and, when a job run completes (successfully or not), it sends information about job run (including any failure logs) to SEI. This plugin **doesn't** do periodic pushes.

The plugin gathers information about job stages and steps depending on the outcome and structure of the job:

* If a job run fails, and the job has no stages, then the plugin captures the job's failure logs.
* If a job run fails, and the job has stages but no steps, then the plugin captures failure logs for the failed stages.
* If a job run fails, and hte job has steps, then the plugin captures failure logs for the failed steps.
* The plugin doesn't capture logs for any successful jobs, stages, or steps.

To use this plugin, you need to install the plugin in Jenkins.

1. In Jenkins, select **Manage Jenkins**.
2. Select **Manage Plugins**.
3. Select the **Available plugins** tab, and search for `Job Reporter`.
4. Locate and install the **SEI Job Reporter** plugin. Select **Install without restart**.

When plugin installation is complete, the status changes to success. If it doesn't change to success, you might need to restart.

<details>
<summary>Plugin dependencies</summary>

The following table lists other Jenkins plugins for which the Job Reporter plugin has dependencies. It includes links to the plugins on the Jenkins plugins marketplace. These are in addition to required and implied dependencies listed on the [Job Reporter plugin's Jenkins plugin marketplace page](https://plugins.jenkins.io/propelo-job-reporter/dependencies/).


| Dependency name | Direct/Indirect dependency | Version |
| --------------- | -------------------------- | ------- |
| [Favorite](https://plugins.jenkins.io/favorite)| Indirect | 2.3.2 |
| [Variant](https://plugins.jenkins.io/variant)  | Indirect | 1.3   |
| [REST Implementation for Blue Ocean](https://plugins.jenkins.io/blueocean-rest-impl) | Direct | 1.23.2 |
| [Common API for Blue Ocean](https://plugins.jenkins.io/blueocean-commons) | Indirect | 1.23.2 |
| [REST API for Blue Ocean](https://plugins.jenkins.io/blueocean-rest) | Indirect | 1.23.2 |
| [Design Language](https://plugins.jenkins.io/jenkins-design-language) | Indirect | 1.23.2 |
| [Blue Ocean Core JS](https://plugins.jenkins.io/blueocean-core-js) | Indirect | 1.23.2 |
| [Web for Blue Ocean](https://plugins.jenkins.io/blueocean-web) | Indirect | 1.23.2 |
| [JWT for Blue Ocean](https://plugins.jenkins.io/blueocean-jwt) | Indirect | 1.23.2 |
| [Pipeline implementation for Blue Ocean](https://plugins.jenkins.io/blueocean-pipeline-api-impl) | Direct | 1.23.2 |
| [Pipeline SCM API for Blue Ocean](https://plugins.jenkins.io/blueocean-pipeline-scm-api) | Indirect | 1.23.2 |
| [HTML Publisher](https://plugins.jenkins.io/htmlpublisher) | Indirect | 1.23 |
| [Dashboard for Blue Ocean](https://plugins.jenkins.io/blueocean-dashboard) | Direct | 1.23.2 |
| [Pub-Sub "light" Bus](https://plugins.jenkins.io/pubsub-light)  | Indirect | 1.13 |

</details>

## Custom CI/CI integrations (webhooks)

SEI supports custom CI/CD integrations through webhooks. Use this for CI/CD tools that don't have a dedicated [SEI integration](./sei-integrations-overview.md), such as Jenkins and GitHub Actions.

1. Create a [Harness API key and token](/docs/platform/automation/api/add-and-manage-api-keys) to use for authorization.
2. [Generate a UUID](#generate-a-uuid) to identify your CI/CD system and connect it to SEI.
3. Configure the webhook API call according to the [webhook specification](#webhook-specification).

### Generate a UUID

You must generate a Universally Unique Identifier (UUID) for custom Continuous Integration/Continuous Deployment (CI/CD) integrations. The UUID uniquely identifies and connects your custom integration in SEI.

You need:

* Access to the SEI API with a valid access token.
* A CI/CD integration, such as Jenkins, that you want to associate with SEI through a UUID.

These steps use a Jenkins integration to demonstrate how to generate a UUID.

1. To create a mock Jenkins integration, go to **Settings**, select **Integrations**, and then install the **Jenkins CI/CD integration**.
2. Enter a **Name** for the integration. The **Description** and **Tags** are optional.
3. Use the SEI API to generate a UUID for the Jenkins integration, for example:

   ```
   curl --location 'https://api.propelo.ai/v1/cicd/instances' \
   --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
   --header 'Content-Type: application/json' \
   --data '{
       "integration_id": "4620",
       "name": "Custom CICD Integration",
       "type": "jenkins"
   }'
   ```

You can find the `integration_id` in the mock Jenkins integration you created in SEI. This curl command generates a UUID for an integration named `Custom CICD Integration`.

4. Using the UUID returned by the SEI API, update the UUID for your custom integration in SEI. This identifies and connects your custom integration in SEI.
5. Import [Propels](../sei-propels-scripts/propels-overview.md) templates from the [SEI propels template repo](https://github.com/harness/sei-propels-templates). SEI provides Propels templates for CI/CD integrations. You can customize these templates to suit your specific CI/CD tool, such as Jenkins.
6. Schedule Propel automation. Utilize the first node in the Propel tempalte to schedule automation tasks for your custom CI/CD integration. For example, with Jenkins, you can use automation to trigger Jenkins jobs, manage deployments, and monitor the integration's performance.

### Webhook specification

* Summary: Post CI/CD data to SEI
* Method: POST
* Base URL: `https://api.levelops.io/v1/generic-requests` or `https://api.propelo.ai/v1/generic-requests`
* Header: Requires API key authorization. The content type is `application/json`
* Body: Contains a `data` object with `request_type` and `payload`.

Here is an example of a request:

```
// POST CICD data to Propelo
curl --location 'https://api.propelo.ai/v1/generic-requests' \
--header 'Authorization: Apikey <apikey> ' \
--header 'Content-Type: application/json' \
--data '{
    "request_type": "JenkinsPluginJobRunComplete",
    "payload": "{
        "pipeline":"Node.js CI",
        "triggered_by":"SCMTrigger",
        "execution_parameters":
            [{"type":"StringParameterValue","name":"version","value":1},
            {"type":"StringParameterValue","name":"revision","value":1}],
        "repo_url":"https://api.github.com/users/rajpropelo",
        "start_time":1680006843000,
        "result":"success",
        "duration":26000,
        "build_number":4543097378,
        "instance_guid":"24575de4-0baa-4575-8c94-9975c737008a",
        "instance_name":"Jenkins Instance",
        "instance_url":"https://jenkins.dev.levelops.io/",
        "job_run":null,
        "job_full_name":"Node.js CI--github action",
        "qualified_name":"Node.js CI--github action",
        "branch_name":"main",
        "module_name":null,
        "scm_commit_ids":["6ce2cfec186fbf9ae9429ad22e32e7770f1eb1fb"],
        "ci":true,
        "cd":false,
        "artifacts":
            [{"input":false,"output":true,"type":"container","location":"http://generated/image/location","name":"image1","qualifier":"1"}],
        "trigger_chain":[{"id":"SCMTrigger","type":"SCMTriggerCause"}]
        }"
}'
```

#### Payload fields

`payload` is an object with required and optional fields.

Required fields:

* `pipeline`: The name of the CI/CD job.
* `job_full_name`: Same as `pipeline`.
* `qualified_name`: Same as `pipeline`.
* `instance_name`: The CI/CD instance identifier (not the UUID).
* `instance_guid`: Your CI/CD instance UUID.
* `start_time`: Job start time in epoch milliseconds.
* `duration`: Job duration in seconds.
* `result`: Either `success` or `failure`.


Optional fields:

* `execution_parameters`: An array of key/value objects that can be used to send additional information about the pipeline or deployment.
* `scm_commit_ids`: An array of commit ids related to the deployment
* `triggered_by`
* `repo_url`
* `build_number`
* `instance_url`
* `job_run`
* `module_name`
* `ci` and `cd`: One is `true` and the other is `false`, depending on whether this is for a CI job or a CD job.
* `artifacts`: An array of information about the job run, including `input`, `output`, `type`, `location`, `name`, `qualifier`, `hash`, and `metatdata`.
* `trigger_chain`
* `branch_name`
* `module_name`
* `job_normalized_full_name`

Here is an example payload:

```json
'{
    "pipeline":"Node.js CI",
    "triggered_by":"SCMTrigger",
    "execution_parameters":[
        {"type":"StringParameterValue","name":"version","value":1},
        {"type":"StringParameterValue","name":"revision","value":1}
        ],
    "repo_url":"https://api.github.com/users/rajpropelo",
    "start_time":1680006843000,
    "result":"success",
    "duration":26000,
    "build_number":4543097378,
    "instance_guid":"24575de4-0baa-4575-8c94-9975c737008a",
    "instance_name":"Jenkins Instance",
    "instance_url":"https://jenkins.dev.levelops.io/",
    "job_run":null,
    "job_full_name":"Node.js CI--github action",
    "qualified_name":"Node.js CI--github action",
    "branch_name":"main",
    "module_name":null,
    "scm_commit_ids":["6ce2cfec186fbf9ae9429ad22e32e7770f1eb1fb"],
    "ci":true,
    "cd":false,
    "artifacts":[
        {"input":false,"output":true,"type":"container","location":"http://generated/image/location","name":"image1","qualifier":"1"}
        ],
    "trigger_chain":[
        {"id":"SCMTrigger","type":"SCMTriggerCause"}
        ]
}'
```

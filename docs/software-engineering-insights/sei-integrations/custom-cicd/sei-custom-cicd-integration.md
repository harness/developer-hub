---
title: Connect with Custom CI/CD tools
description: Integrate custom CI/CD tools with Harness SEI
sidebar_position: 1
sidebar_label: Custom CI/CD integrations
---

SEI supports custom CI/CD integrations using the `/v1/custom-cicd` API. 

Use this for CI/CD tools that don't have a dedicated SEI integration.

:::info
If you have enabled an allow list in your CI/CD tool, certain Harness IP addresses must be added to it in order to allow communication between the Harness Platform and the CI/CD tool. If the necessary IPs are not whitelisted, the integration may fail to authenticate or sync data properly.

To ensure your integration can work correctly, please refer to the list of [Harness Platform IPs](/docs/platform/references/allowlist-harness-domains-and-ips) that may need to be whitelisted in your firewall.
:::

Configure the API according to the following specifications.

## API specification

* **Method:** `POST`
* **Base URL (Environment: PROD2):** `https://app.harness.io/gratis/sei/api/v1/custom-cicd`
* **Base URL (Environment: PROD1 ):** `https://app.harness.io/prod1/sei/api/v1/custom-cicd`
* **Header:** Requires Harness SEI ApiKey authorization. The content type is ```application/json```
* **Body:** Contains a data object with ```request_type``` and ```payload```.


<details>
<summary>Send CI/CD data to SEI</summary>

**Parameters**

**Header**

* Authorization: ApiKey `<HARNESS_SEI_API_KEY>`
* Content-Type: `application/json`

**Body**

* Data:

```yaml
"{"pipeline":"Node.js CI","user_id":"SCMTrigger","repo_url":"https://api.github.com/users/rajpropelo","start_time":1679467494000,"result":"success","duration":77000,"build_number":4487150517,"instance_guid":"89d2491c-764a-4f77-93d9-18e8e372b795","instance_name":"Custom CI/CD Instance","instance_url":"https://custom-cicd.acme.com/","job_run":{"stages":[{"displayName":"Build_Stage","displayDescription":"Build_Stage","result":"succeeded","state":"completed","durationInMillis":5000,"steps":[{"displayName":"BUILD_STEP","displayDescription":"BUILD_STEP","result":"succeeded","state":"completed","durationInMillis":5000}]}]},"job_full_name":"Node.js CI--readme updated","qualified_name":"Node.js CI--readme updated","branch_name":"master","module_name":null,"scm_commit_ids":["64be72b2c1f7d2a33082f98a40a848880fcdcd5e"],"job_run_params":[{"type":"StringParameterValue","name":"version","value":1},{"type":"StringParameterValue","name":"revision","value":1}],"ci":true,"cd":false,"artifacts":[{"input":false,"output":true,"type":"container","location":"http://generated/image/location","name":"image1","qualifier":"1"}],"trigger_chain":[{"id":"SCMTrigger","type":"SCMTriggerCause"}]}"
```

</details>

Here is an example of a request on PROD2 environment:

```bash
curl --location 'https://app.harness.io/gratis/sei/api/v1/custom-cicd' \
--header 'sec-ch-ua: "Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"' \
--header 'Accept: application/json, text/plain, */*' \
--header 'Referer: https://app.harness.io/' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'Authorization: ApiKey <HARNESS_SEI_API_KEY>' \
--header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36' \
--header 'sec-ch-ua-platform: "macOS"' \
--header 'Content-Type: application/json' \
--data '{
{
    “job_name”: “pipelines-testing”,
    “instance_guid”: “c9a73c1b-7590-34sa-a82f-c53a469686b7",
    “instance_name”: “azure-integration”,
    “job_full_name”: “<PROJECT>/<REPO_NAME>“,
    “job_normalized_full_name”: “<PROJECT>/<REPO_NAME>“,
    “result”: “FAILED”,
    “user_id”: “UNKNOWN”,
    “repo_url”: “https://dev.azure.com/<USERNAME>/<PROJECT>/<REPO_NAME>“,
    “start_time”: 1684912520000,
    “duration”: 5,
    “build_number”: 7871,
    “instance_url”: “https://dev.azure.com”,
    “branch_name”: “main”,
    "project_name": "Project" 
}

```

:::info
Please note that the base url is relative to the environment you are using. You will need to replace it with the actual URL that are specific to your environment.
:::

### Payload fields

Payload is an object with required and optional fields.

#### Required Fields

| Field | Data Type | Description |
| - | - | - |
| `pipeline` | string | The name of the CI/CD job. |
| `job_full_name` | string | A human-readable identifier for the job, often the same as the pipeline name. |
| `qualified_name` | string | A qualified name for the job, typically the same as the pipeline name. |
| `instance_name` | string | The identifier for the CI/CD instance (not the UUID). |
| `instance_guid` | string | UUID (Universally Unique Identifier) for the CI/CD instance. To generate a UUID for the integration you can use the API `https://app.harness.io/gateway/sei/api/v1/custom-cicd` |
| `start_time` | integer | Job start time in epoch milliseconds. |
| `duration` | integer | Job duration in milliseconds. |
| `result` | string | The result of the job, either `SUCCESS` or `FAILURE`. |

#### Optional Fields

| Field | Data Type | Description |
| - | - | - |
| `user_id` | string | User identifier in string |
| `job_run_params` | array | An array of parameters associated with the job run. |
| `scm_commit_ids` | array of strings | An array of commit ids related to the deployment |
| `repo_url` | string | The URL of the repository related to the job. |
| `build_number` | integer | The build number associated with the job. |
| `instance_url` | string | URL of the CI/CD instance. |
| `job_run` | object | Information about the job run, including stages, steps, and their results. |
| `module_name` | integer |The name of the module related to the job |
| `ci` and `cd` | boolean | One is true and the other is false, depending on whether this is for a CI job or a CD job. |
| `artifacts` | array of objects | An array of information about the job run, including input, output, type, location, name, qualifier, hash, and metadata. |
| `trigger_chain` | array of objects | Information about the chain of triggers. |
| `branch_name` | string | The name of the branch related to the job. |
| `project_name` | string | The name of the Project related to the job. |
| `execution_id` | string | Unique identifier for the specific job execution |
| `cfr_status` | boolean | Status of the CFR stage |
| `themes` | list of string | List of the theme names |
| `web_url` | URL | Contains the pipeline execution URL |

Here is an example payload:

```sh
{
    "instance_guid": "666ba79b-3f3d-4236-ac04-4686ce526705",
    "job_full_name": "Pipeline-2",
    "execution_id": "UNIQUE_EXECUTION_ID",
    "pipeline": "Pipeline-2",
    "project_name": "Project-A",
    "user_id": "NISHITH",
    "repo_url": "https://api.github.com/users/nishith.patel",
    "start_time": 1711603545000,
    "result": "success",
    "duration": 780000,
    "instance_name": "Jenkins-1",
    "instance_url": "http://localhost:8800",
    "job_run": null,
    "qualified_name": "Pipeline-2",
    "branch_name": "master",
    "module_name": null,
    "scm_commit_ids": [
        "64be72b2c1f7d2a33082f98a40a848880fcdcd5e"
    ],
    "job_run_params": [
        {
            "type": "StringParameterValue",
            "name": "version",
            "value": 1
        },
        {
            "type": "StringParameterValue",
            "name": "revision",
            "value": 1
        }
    ],
    "ci": true,
    "cd": false,
    "artifacts": [
        {
            "input": false,
            "output": true,
            "type": "container",
            "location": "http://generated/image/location",
            "name": "image1",
            "qualifier": "1"
        }
    ],
    "trigger_chain": [
        {
            "id": "SCMTrigger",
            "type": "SCMTriggerCause"
        }
    ],
    "cfr_status": true
    "themes":[
        "themex",
        "themey",
        "themex/themey"
    ],
    "web_url": "http://somelink-updated.com"
    
}
```

## Generate UUID / GUID

Follow the steps to generate a **Globally Unique Identifier (GUID)**. A GUID is used to uniquely identify your custom integration when making requests to the Harness API or configuring Propels.

### Requirements

* Access to **Harness SEI API** with a valid access token. 

### Step 1: Create a CI/CD integration

We need to create a placeholder Custom integration that will be the container for the data. We recommend using **Custom** as the integration type.
Go to **Integrations** under **Settings**, select the **Custom integration**, and click **Install**.
Fill in the following details and **Save** the integration. This will automatically download the `satellite.yml` file with the `<INTEGRATION_ID>`.

| Field       | Description                   |
| - | - |
| Name        | Add a name to the integration |
| Description | Add a description (optional)  |
| Tags        | Add tags if needed (optional) |

### Step 2: Generate a CI/CD Instance GUID associated with that integration

We need to generate a CI/CD instance GUID associated with that integration. This needs to be done with a request to the **Harness SEI API**.
Here is an example using a cURL command:

```shell
curl --location 'https://app.harness.io/gratis/sei/api/v1/custom-cicd' \ # The Base URL is relative to the environment that you're using.
--header 'Authorization: ApiKey <HARNESS_SEI_API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
    "integration_id": "<INTEGRATION_ID>",
    "name": "Custom CI/CD Integration",
    "type": "jenkins",
}' 
```

Use the `<INTEGRATION_ID>` of the placeholder Custom integration created during Step 1. It can be found in the `satellite.yml` file.
This will generate a GUID for the integration named **Custom CI/CD Integration**.

### Step 3: Integrate directly with the CI/CD Webhook API

You can directly integrate using webhooks as documented above. Make sure to provide the CI/CD instance GUID and name generated in the previous step.

Another option is to integrate using Propels, which allows you to run custom automated workflows directly in SEI. Continue to Step 4 to use this approach.

### Step 4: Import a Propel from the Templates GitHub repository

SEI provides templates for using Propels, which can be imported from this [GitHub repository](https://github.com/harness/harness-sei-propels-templates). You can customize these templates to suit your specific CI/CD tool, such as Jenkins.

### Step 5: Configure the Propel

Once you have generated a GUID in step 2, make sure to update it in the Propel. This is required to identify and link your custom CI/CD integration.

### Step 6: Automate the Propel to run on a schedule

Edit the first node of the Propel to configure a schedule for automation tasks for your custom CI/CD integration. You can use automation to trigger CI/CD jobs, manage deployments, and monitor the integration's performance.

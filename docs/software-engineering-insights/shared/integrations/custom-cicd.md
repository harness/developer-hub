Harness SEI supports custom CI/CD integrations using the `/v1/custom-cicd` API. You can use this API to create integrations with CI/CD tools that don't have a dedicated SEI integration.

:::info
If you have enabled an allowlist in your CI/CD tool, certain Harness IP addresses must be added to it in order to allow communication between the Harness Platform and the CI/CD tool. If the necessary IPs are not whitelisted, the integration may fail to authenticate or sync data properly.

To ensure your integration can work correctly, refer to the list of [Harness Platform IPs](/docs/platform/references/allowlist-harness-domains-and-ips) that may need to be whitelisted in your firewall.
:::

Configure the API according to the following specifications provided below.

## API specification

* **Method:** `POST`
* **Base URL (Environment: PROD2):** `https://app.harness.io/gratis/sei/api/v1/`
* **Base URL (Environment: PROD1):** `https://app.harness.io/prod1/sei/api/v1/`
* **Base URL (Environment: PROD3):** `https://app3.harness.io/sei/api/v1/`
* **Base URL (Environment: EU):** `https://accounts.eu.harness.io/sei/api/v1/`
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
{
  "pipeline": "<PIPELINE_NAME>",
  "user_id": "<TRIGGER_USER_ID>",
  "repo_url": "<REPO_URL>",
  "start_time": <EPOCH_START_TIME_IN_MS>,
  "result": "<BUILD_RESULT>",
  "duration": <DURATION_IN_MS>,
  "build_number": <BUILD_NUMBER>,
  "instance_guid": "<INSTANCE_GUID>",
  "instance_name": "<INSTANCE_NAME>",
  "instance_url": "<INSTANCE_URL>",
  "job_run": {
    "stages": [
      {
        "displayName": "<STAGE_NAME>",
        "displayDescription": "<STAGE_DESCRIPTION>",
        "result": "<STAGE_RESULT>",
        "state": "<STAGE_STATE>",
        "durationInMillis": <STAGE_DURATION>,
        "steps": [
          {
            "displayName": "<STEP_NAME>",
            "displayDescription": "<STEP_DESCRIPTION>",
            "result": "<STEP_RESULT>",
            "state": "<STEP_STATE>",
            "durationInMillis": <STEP_DURATION>
          }
        ]
      }
    ]
  },
  "job_full_name": "<JOB_FULL_NAME>",
  "qualified_name": "<QUALIFIED_JOB_NAME>",
  "branch_name": "<BRANCH_NAME>",
  "module_name": "<MODULE_NAME_OR_NULL>",
  "scm_commit_ids": ["<COMMIT_ID_1>", "<COMMIT_ID_2>"],
  "job_run_params": [
    {
      "type": "<PARAM_TYPE>",
      "name": "<PARAM_NAME>",
      "value": "<PARAM_VALUE>"
    }
  ],
  "ci": <BOOLEAN_CI>,
  "cd": <BOOLEAN_CD>,
  "artifacts": [
    {
      "input": <BOOLEAN_IS_INPUT>,
      "output": <BOOLEAN_IS_OUTPUT>,
      "type": "<ARTIFACT_TYPE>",
      "location": "<ARTIFACT_LOCATION_URL>",
      "name": "<ARTIFACT_NAME>",
      "qualifier": "<ARTIFACT_QUALIFIER>"
    }
  ],
  "trigger_chain": [
    {
      "id": "<TRIGGER_ID>",
      "type": "<TRIGGER_TYPE>"
    }
  ]
}
```

</details>

Here is an example of a request on the PROD2 environment:

```bash
curl --location '<BASE_URL>/custom-cicd' \
--header 'Authorization: ApiKey <HARNESS_SEI_API_KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "job_name": "<JOB_NAME>",
  "instance_guid": "<INSTANCE_GUID>",
  "instance_name": "<INSTANCE_NAME>",
  "job_full_name": "<env.JOB_FULL_NAME>",
  "job_normalized_full_name": "<env.JOB_FULL_NAME>",
  "result": "<BUILD_RESULT>",
  "user_id": "<USER_ID>",
  "repo_url": "<REPO_URL>",
  "start_time": <EPOCH_START_TIME_IN_MS>,
  "duration": <DURATION_IN_SECONDS>,
  "build_number": <BUILD_NUMBER>,
  "instance_url": "<CI_CD_INSTANCE_URL>",
  "branch_name": "<BRANCH_NAME>",
  "project_name": "<PROJECT_NAME>"
}'

```

:::info
The base url is relative to the environment you are using. You will need to replace it with the actual URL that are specific to your environment.
:::

### Payload fields

The payload is an object with required and optional fields.

#### Required Fields

| Field | Data Type | Description |
| - | - | - |
| `pipeline` | string | The name of the CI/CD job. |
| `job_full_name` | string | A human-readable identifier for the job, often the same as the pipeline name. |
| `qualified_name` | string | A qualified name for the job, typically the same as the pipeline name. |
| `instance_name` | string | The identifier for the CI/CD instance (not the UUID). |
| `instance_guid` | string | UUID (Universally Unique Identifier) for the CI/CD instance. To generate a UUID for the integration, you can use the API `https://app.harness.io/gateway/sei/api/v1/custom-cicd`. |
| `start_time` | integer | Job start time in epoch milliseconds. |
| `duration` | integer | Job duration in milliseconds. |
| `result` | string | The result of the job, either `SUCCESS` or `FAILURE`. |

#### Optional Fields

| Field | Data Type | Description |
| - | - | - |
| `user_id` | string | User identifier in string.
| `job_run_params` | array | An array of parameters associated with the job run. |
| `scm_commit_ids` | array of strings | An array of commit IDs related to the deployment. |
| `repo_url` | string | The URL of the repository related to the job. |
| `build_number` | integer | The build number associated with the job. |
| `instance_url` | string | URL of the CI/CD instance. |
| `job_run` | object | Information about the job run, including stages, steps, and their results. |
| `module_name` | integer |The name of the module related to the job. |
| `ci` and `cd` | boolean | One is true and the other is false, depending on whether this is for a CI job or a CD job. |
| `artifacts` | array of objects | An array of information about the job run, including input, output, type, location, name, qualifier, hash, and metadata. |
| `trigger_chain` | array of objects | Information about the chain of triggers. |
| `branch_name` | string | The name of the branch related to the job. |
| `project_name` | string | The name of the Project related to the job. |
| `execution_id` | string | Unique identifier for the specific job execution. |
| `cfr_status` | boolean | Status of the CFR stage. |
| `themes` | list of string | List of the theme names. |
| `web_url` | URL | Contains the pipeline execution URL. |

Here is an example payload:

```shell
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

Create a placeholder custom integration that will be the container for the data. Harness recommends using **Custom** as the integration type.

1. Go to **Integrations** under **Settings**, select the **Custom integration**, and click **Install**.
1. Fill in the following details:

    | Field       | Description                   |
    | - | - |
    | Name        | Add a name to the integration. |
    | Description | Add a description (optional).  |
    | Tags        | Add tags if needed (optional). |

1. Click **Save** to save the integration. This will automatically download the `satellite.yml` file with the `<INTEGRATION_ID>`.

### Step 2: Generate a CI/CD Instance GUID associated with that integration

Next, generate a CI/CD instance GUID associated with that integration. This needs to be done with a request to the **Harness SEI API**.

Here is an example using a cURL command:

```shell
curl --location '<BASE_URL>/cicd/instances' \
--header 'Authorization: ApiKey <HARNESS_SEI_API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
    "integration_id": "<INTEGRATION_ID>",
    "name": "Custom CI/CD Integration",
    "type": "jenkins",
}' 
```

Use the `<INTEGRATION_ID>` of the placeholder custom integration created during Step 1. It can be found in the `satellite.yml` file. This will generate a GUID for the integration named **Custom CI/CD Integration**.

### Step 3: Integrate directly with the CI/CD Webhook API

You can directly integrate using webhooks as documented above. Make sure to provide the CI/CD instance GUID and name generated in the previous step.

Another option is to integrate using Propels, which allows you to run custom automated workflows directly in Harness SEI. Continue to Step 4 to use this approach.

### Step 4: Import a Propel from the Templates GitHub repository

Harness SEI provides templates for using Propels, which can be imported from this [GitHub repository](https://github.com/harness/harness-sei-propels-templates). You can customize these templates to suit your specific CI/CD tool, such as Jenkins.

### Step 5: Configure the Propel

Once you have generated a GUID in Step 2, make sure to update it in the Propel. This is required to identify and link your custom CI/CD integration.

### Step 6: Automate the Propel to run on a schedule

Edit the first node of the Propel to configure a schedule for automation tasks for your custom CI/CD integration. You can use automation to trigger CI/CD jobs, manage deployments, and monitor the integration's performance.

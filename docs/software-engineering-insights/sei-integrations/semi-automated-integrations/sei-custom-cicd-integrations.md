---
title: Custom CI/CD integrations
description: Integrate custom CI/CD tools with Harness SEI
sidebar_position: 1
sidebar_label: Custom CI/CD integrations
---

SEI supports custom CI/CD integrations through webhooks. Use this for CI/CD tools that don't have a dedicated SEI integration, such as Jenkins and GitHub Actions.

Configure the webhook API call according to the following webhook specifications.

## Webhook specification

* Method: POST
* Base URL: `https://testapi1.propelo.ai/v1/custom-cicd`
* Header: Requires Bearer token key authorization. The content type is ```application/json```
* Body: Contains a data object with ```request_type``` and ```payload```.


<details>
<summary>Post CI/CD data to SEI</summary>

**Parameters**

**Header**

* Authorization: Bearer \<BEARER_TOKEN>
* Content-Type: application/json

**Body**

* Data: 

```bash
"{"pipeline":"Node.js CI","user_id":"SCMTrigger","repo_url":"https://api.github.com/users/rajpropelo","start_time":1679467494000,"result":"success","duration":77000,"build_number":4487150517,"instance_guid":"89d2491c-764a-4f77-93d9-18e8e372b795","instance_name":"Jenkins Instance","instance_url":"https://jenkins.dev.levelops.io/","job_run":{"stages":[{"displayName":"Build_Stage","displayDescription":"Build_Stage","result":"succeeded","state":"completed","durationInMillis":5000,"steps":[{"displayName":"BUILD_STEP","displayDescription":"BUILD_STEP","result":"succeeded","state":"completed","durationInMillis":5000}]}]},"job_full_name":"Node.js CI--readme updated","qualified_name":"Node.js CI--readme updated","branch_name":"master","module_name":null,"scm_commit_ids":["64be72b2c1f7d2a33082f98a40a848880fcdcd5e"],"job_run_params":[{"type":"StringParameterValue","name":"version","value":1},{"type":"StringParameterValue","name":"revision","value":1}],"ci":true,"cd":false,"artifacts":[{"input":false,"output":true,"type":"container","location":"http://generated/image/location","name":"image1","qualifier":"1"}],"trigger_chain":[{"id":"SCMTrigger","type":"SCMTriggerCause"}]}"
```

</details>

Here is an example of a request:

```bash
curl --location 'https://testapi1.propelo.ai/v1/custom-cicd' \
--header 'sec-ch-ua: "Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"' \
--header 'Accept: application/json, text/plain, */*' \
--header 'Referer: https://testui1.propelo.ai/' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'Authorization: Bearer <BEARER_TOKEN>' \
--header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36' \
--header 'sec-ch-ua-platform: "macOS"' \
--header 'Content-Type: application/json' \
--header 'Cookie: <COOKIE>' \
--data '{
    "job_name": "pipelines-testing",
    "jenkins_instance_guid": "c9a73c1b-7590-34sa-a82f-c53a469686b7",
    "jenkins_instance_name": "azure-integration",
    "job_full_name": "<PROJECT>/<REPO_NAME>",
    "job_normalized_full_name": "<PROJECT>/<REPO_NAME>",
    "result": "FAILED",
    "user_id": "UNKNOWN",
    "repo_url": "https://dev.azure.com/<USERNAME>/<PROJECT>/<REPO_NAME>",
    "start_time": 1684912520000,
    "duration": 5,
    "build_number": 7871,
    "jenkins_instance_url": "https://dev.azure.com",
    "branch_name": "main"
}

```

### Payload fields

Payload is an object with required and optional fields.

### Required Fields:

* **pipeline (string):** The name of the CI/CD job.
* **job\_full\_name (string):** A human-readable identifier for the job, often the same as the pipeline name.
* **qualified\_name (string):** A qualified name for the job, typically the same as the pipeline name.
* **instance\_name (string):** The identifier for the CI/CD instance (not the UUID).
* **instance\_guid (string):** UUID (Universally Unique Identifier) for the CI/CD instance. To generate a UUID for the integration you can use the API `https://testapi1.propelo.ai/v1/custom-cicd`.
* **start\_time (integer):** Job start time in epoch milliseconds.
* **duration (integer):** Job duration in milliseconds.
* **result (string):** The result of the job, either "success" or "failure."

### Optional Fields:

* **user\_id (string):**
* **job\_run\_params (array):** An array of parameters associated with the job run.
* **scm\_commit\_ids (array of strings):** An array of commit ids related to the deployment
* **repo\_url (string):** The URL of the repository related to the job.
* **build\_number (integer):** The build number associated with the job.
* **instance\_url (string):** URL of the CI/CD instance.
* **job\_run (object):** Information about the job run, including stages, steps, and their results.
* **module\_name (string):** The name of the module related to the job
* **ci and cd (boolean):** One is true and the other is false, depending on whether this is for a CI job or a CD job.
* **artifacts (array of objects):** An array of information about the job run, including input, output, type, location, name, qualifier, hash, and metadata.
* **trigger\_chain (array of objects):** Information about the chain of triggers.
* **branch\_name (string):** The name of the branch related to the job.

Here is an example payload:

```sh
{
    "pipeline": "Node.js CI",
    "user_id": "SCMTrigger",
    "repo_url": "https://api.github.com/users/rajpropelo",
    "start_time": 1679467494000,
    "result": "success",
    "duration": 77000,
    "build_number": 4487150517,
    "instance_guid": "89d2491c-764a-4f77-93d9-18e8e372b795",
    "instance_name": "Jenkins Instance",
    "instance_url": "https://jenkins.dev.levelops.io/",
    "job_run": {
        "stages": [
            {
                "displayName": "Build_Stage",
                "displayDescription": "Build_Stage",
                "result": "succeeded",
                "state": "completed",
                "durationInMillis": 5000,
                "steps": [
                    {
                        "displayName": "BUILD_STEP",
                        "displayDescription": "BUILD_STEP",
                        "result": "succeeded",
                        "state": "completed",
                        "durationInMillis": 5000
                    }
                ]
            }
        ]
    },
    "job_full_name": "Node.js CI--readme updated",
    "qualified_name": "Node.js CI--readme updated",
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
    ]
}
```




## Generate UUID / GUID

Follow the steps to generate a Universally Unique Identifier (UUID) for custom Continuous Integration/Continuous Deployment (CI/CD) integrations. A UUID is used to uniquely identify and link your custom integration within Propel.

### Requirements

* Access to Propel API with a valid access token. 
* A CI/CD integration (e.g., Jenkins) that you want to associate with a UUID.

### Step 1: Create a Mock Jenkins Integration&#x20;

To create a mock Jenkins integration go to the Integrations under Settings and select the Jenkins CI/CD integration and click install. Fill in the following details and save the integration:

| Field       | Description                   |
| - | - |
| Name        | Add a name to the integration |
| Description | Add a description (optional)  |
| Tags        | Add tags if needed (optional) |

### Step 2: Generate a UUID for the Jenkins Integration

To generate a UUID for the Jenkins integration you can use the Propel API. Here's an example of a cURL command:

```shell
curl --location 'https://api.propelo.ai/v1/cicd/instances' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "integration_id": "4620",
    "name": "Custom CICD Integration",
}' 
```

You can find the integration\_id in the mock Jenkins integration created during Step 1 in SEI. This will generate the UUID for the integration named "Custom CICD Integration".

### Step 3: Import Propel from GitHub Repository

SEI provides templates for CI/CD integrations, which can be imported from this [GitHub repository](https://github.com/harness/sei-propels-templates). You can customize these templates to suit your specific CI/CD tool, such as Jenkins.

### Step 4: Update the UUID on Propel&#x20;

Once you have generated the UUID in step 2, make sure to update it in Propel. This helps identify and link your custom Jenkins integration within Propel's environment.

### Step 5: Schedule Propel Automation&#x20;

Utilize the first node in Propel to schedule automation tasks for your custom CI/CD integration. You can use automation to trigger Jenkins jobs, manage deployments, and monitor the integration's performance.\


Generating a UUID and associating it with your integration ensures that Propel can uniquely identify and interact with your custom CI/CD setup.

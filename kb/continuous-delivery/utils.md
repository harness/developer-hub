




### How to handle the scenario where powershell scripts does not correctly return the status code on failure ?

Though it is an issue with Powershell where it does not return the error code correctly we need this for our step to proceed further and reflect the status correctly. Consider wrapping the code like below in the script:

```
$ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop

<execution code>

exit $LASTEXITCODE
```



### Can we persist variables in the pipeline after the pipeline run is completed ?

We do not persist the variables and the variables are only accessible during the context of execution. You can make api call to write it as harness config file and later access the Harness file or alternatively you have a config file in git where you can push the var using a shell script and later access the same config file.




### How do I access one pipeline variables from another pipeline ?

Directly, it may not be possible. 
 
As a workaround, A project or org or account level variable can be created and A shell script can be added in the P1 pipeline after the deployment which can update this variable with the deployment stage status i.e success or failure then the P2 pipeline can access this variable and perform the task based on its value.
 
The shell script will use this API to update the value of the variable - https://apidocs.harness.io/tag/Variables#operation/updateVariable





### Why some data for the resource configurations returned by api are json but not the get pipeline detail api ?

The reason the get api call for pipeline is returning a yaml because the pipeline is stored as yaml in harness. As this api call is for fetching the pipeline hence it is returning the yaml definition of the pipeline and not the json.
If still you need json representation of the output you can use a parser like yq to convert the response.





### How to exit a workflow without marking it as failed

You can add a failure strategy in the deploy stage by either ignoring the failure for the shell script or getting a manual intervention where you can mark that step as a success. 


### 2 Deployments in pipeline, is it possible for me to rollback the stage 1 deployment if the stage 2 tests returned errors?

We do have a pipeline rollback feature that is behind a feature flag. This might work better as you would be able to have both stages separate, with different steps, as you did before, but a failure in the test job stage could roll back both stages.
 
[Documentation](https://developer.harness.io/docs/platform/pipelines/failure-handling/define-a-failure-strategy-for-pipelines)
  
Also, for the kubernetes job, if you use the Apply step instead of Rollout then the step will wait for the job to complete before proceeding, and you would not need the Wait step.






### CDNG Notifications custom slack notifications

 It is possible to create a shell script that sends notifications through Slack, in this case, we can refer to this article:

 https://discuss.harness.io/t/custom-slack-notifications-using-shell-script/749


### Creation of environment via API?

We do support API's for the nextgen : https://apidocs.harness.io/tag/Environments#operation/createEnvironmentV2

```
curl -i -X POST \
  'https://app.harness.io/ng/api/environmentsV2?accountIdentifier=string' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: YOUR_API_KEY_HERE' \
  -d '{
    "orgIdentifier": "string",
    "projectIdentifier": "string",
    "identifier": "string",
    "tags": {
      "property1": "string",
      "property2": "string"
    },
    "name": "string",
    "description": "string",
    "color": "string",
    "type": "PreProduction",
    "yaml": "string"
  }'
```

### Download artifact for winrm is not working while Nexus if windows machine is behind proxy in CG
Nexus is supported for NG but not in CG, so you can use custom powershell script something like below:
Invoke-WebRequest -Uri "$\{URI}" -Headers $Headers -OutFile "$\{OUT_FILE}" -Proxy "$env:HTTP_PROXY"










### How can we automatically create a new service whenever a new service yaml is uploaded to my source repo?
We can create a pipeline with api call for service creation and in that pipeline we can add a trigger to our source repo where service yaml is uploaded. Now whenever there will be a new service yaml the pipeline will get triggered and we can fetch this new service yaml using git cli in the shell step and use the yaml to make the api call for service creation.

### How do I use all environments and only select infrastructure for multiple environment deployments?
Use filtered lists for this purpose. You can specify "Filter on Entities" as Environment in the first filter and select "Type" as all. Now for the infrastructure you can add another filter and provide the tag filter.



### How do I list Github Tags for custom artifact when the curl returns a json array without any root element?

We cannot provide an array directly to the custom artifact. It needs a root element to parse the json response.


### How to use the Stage Variable inside the Shell Script?

A variable expression can be used to access stage variables in pipelines.
Just hover over your variable name, and you will see an option to copy the variable expression path, You can reference this path in shell script.




### How can we return dynamically generated information to a calling application upon the successful completion of pipelines initiated by API calls from other applications?

You can configure pipeline outputs throughout the stages to include all the data you want to compile. Then, upon execution completion, you can include a shell script that references these outputs and sends the compiled information to the desired API.


### Can we get details what branch did trigger the pipeline and who did it; the time the pipeline failed or terminated,  while using Microsoft Teams Notification 
These details are not available by default as only (status, time, pipeline name url etc) is only sent and if you need these details might ned to use custom shell script


### How to pass list of multiple domains for allowing whitelisting while using api ?

Domain whitelisting api takes domain as input array. So if we have multiple domains to be passed this needs to be done as coma separeted string entries in the array. Below is a sample for the same:

```
curl -i -X PUT \
  'https://app.harness.io/ng/api/authentication-settings/whitelisted-domains?accountIdentifier=xxxx' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: REDACTED' \
  -d '["gmail.com","harness.io"]'
```



### I have a pipeline containing different stages DEV-QA-UAT-PROD. In UAT I'm using Canary deployment and in PROD it's Blue-Green. In these scenarios how Harness provides proper Roll Back strategies?
Harness provides a declarative rollback feature that can perform rollbacks effectively in different deployment scenarios.
 
For Canary deployment in UAT, you can define the percentage of traffic to route to the new version and set up conditions to switch traffic between the old and new versions. If an anomaly is detected during the canary deployment, Harness will automatically trigger a rollback to the previous version.
 
For Blue-Green deployment in PROD, you can define the conditions to switch traffic between the blue and green environments. If an issue is detected in the green environment, you can easily switch back to the blue environment using the declarative rollback feature.
 
You can define the failure strategy on stages and steps in your pipeline to set up proper rollback strategies. You can add a failure strategy in the deploy stage by either ignoring the failure for the shell script or getting a manual intervention where you can mark that step as a success. Additionally, you can use the declarative rollback feature provided by Harness to perform rollbacks effectively in different deployment scenarios.


### How to pass the dynamic tag of the image from the CI pipeline to the CD Pipeline to pull the image.
A project or org or account level variable can be created and A shell_script/Run Step can be added in the P1 pipeline to export or output the required variable then the P2 pipeline can access this variable and perform the task based on its value.
 
The shell script will use this API to [update the value of the variable](https://apidocs.harness.io/tag/Variables#operation/updateVariable).


### Where can one find the API request and response demo for execution of Pipeline with Input Set ?

One can use the below curl example to do so :

```sh
curl -i -X POST \
  'https://app.harness.io/pipeline/api/pipeline/execute/{identifier}/inputSetList?accountIdentifier=string&orgIdentifier=string&projectIdentifier=string&moduleType=string&branch=string&repoIdentifier=string&getDefaultFromOtherRepo=true&useFQNIfError=false&notesForPipelineExecution=' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: YOUR_API_KEY_HERE' \
  -d '{
    "inputSetReferences": [
      "string"
    ],
    "withMergedPipelineYaml": true,
    "stageIdentifiers": [
      "string"
    ],
    "lastYamlToMerge": "string"
  }'
```

Please read more on this in the following documentation on [Execute a Pipeline with Input Set References](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/postPipelineExecuteWithInputSetList).

### How do we pass the output list of first step to next step looping strategy "repeat", the output can be a list or array which needs to be parsed ?

The Output Variable of the shell script is a string, which you are trying to pass as a list of strings, to avoid this :
- First you need to convert your array list into a string and then pass it as an output variable.
- Then convert this string into a list of string again before passing it to the repeat strategy.

Please read more on this in the following [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/repeat-strategy).

### I need to run my step in delegate host?

You can create a shell script and select option as execute on delegate under Execution Target


### How to fetch files from the harness file store in the run step?
To fetch files from the Harness file store in a Run step, you can use the following example:

```
- step:
    type: Run
    name: Fetch Files from File Store
    identifier: fetch_files
    spec:
      shell: Sh
      command: |
        harness file-store download-file --file-name <file_name> --destination <destination_path>
```
Replace "filename" with the name of the file you want to fetch from the file store, and "destinationpath" with the path where you want to save the file on the target host.

### Does Harness supports multiple IaC provisioners?

Harness does support multiple Iac provisioners, few examples are terraform, terragrunt, cloud formation, shell script provisioning etc. 

### How do I setup a Pipeline Trigger for Tag and Branch creation in Github?

The out of the box Github Trigger type does not currently support this however, you can use a Custom Webhook trigger and follow the below steps in order to achieve this. 

1. Create a Custom Webhook trigger
2. Copy the Webhook URL of the created trigger
3. Configure a Github Repository Webhook pasting in the URL copied from Step 2 in the Payload URL
4. Set the content type to `application/json`
5. Select `Let me select individual events.` for the `Which events would you like to trigger this webhook?` section
6. Check the `Branch or tag creation` checkbox



### What are reserved symbols in PowerShell, and how do I handle them in Harness secrets in Powershell scripts?

Symbols such as `|`, `^`, `&`, `<`, `>`, and `%` are reserved in PowerShell and can have special meanings. It's important to be aware of these symbols, especially when using them as values in Harness secrets.

If a reserved symbol needs to be used as a value in a Harness secret for PowerShell scripts, it should be escaped using the `^` symbol. This ensures that PowerShell interprets the symbol correctly and does not apply any special meanings to it.

The recommended expression to reference a Harness secret is `<+secrets.getValue('secretID')>`. This ensures that the secret value is obtained securely and without any issues, especially when dealing with reserved symbols.



### Which API is utilized for modifying configuration in the update-git-metadata API request for pipelines?

Please find an example API call below:

```sh
curl --location --request PUT 'https://app.harness.io/gateway/pipeline/api/pipelines/<PIPELINE_IDENTIFIER>/update-git-metadata?accountIdentifier=<ACCOUNT_ID>&orgIdentifier=<ORG_ID>&projectIdentifier=<PROJECT_IDENTIFIER>&connectorRef=<CONNECTOR_REF_TO_UPDATE>&repoName=<REPO_NAME_TO_UPDATE>&filePath=<FILE_PATH_TO_UPDATE>' \
  -H 'x-api-key: <API_KEY>' \
  -H 'content-type: application/json' \

```
Please read more on this in the following [Documentation](https://apidocs.harness.io/tag/Pipeline#operation/importPipeline)



### How do I perform iisreset on a Windows machine?

You can create a WinRM connector and use a powershell script to perform the iisreset. Make sure the user credentials used for the connection have admin access.



### If the assigned delegate executing a task goes down does the task gets re-assigned to other available delegates?
If a delegate fails or disconnects, then the assigned task will fail. We do not perform the re-assignment. If the step is idempotent then we can use a retry strategy to re-execute the task.


### If the "All environments" option is used for a multiple environment deployment, why can we not specify infrastructure?
When the "All environments" option is selected we do not provide infrastructure selection in the pipeline editor. The infrastructure options are available in the run form.

### We have an updated manifest file for deployment, but delegate seems to be fetching old manifest. How can we update this?

You can clear the local cached repo.

Local repository is stored at `/opt/harness-delegate/repository/gitFileDownloads/Nar6SP83SJudAjNQAuPJWg/<connector-id>/<repo-name>/<sha1-hash-of-repo-url>`.



### Can we get the pipeline execution url from the custom trigger api response?
The custom trigger api response contains a generic url for pipeline execution and not the exact pipeline execution. If we need the exact pipeline execution for any specific trigger we need to use the trigger activity page.

### Does Harness offer a replay feature similar to Jenkins?

Yes, Harness provides a feature similar to Jenkins' **Replay** option, allowing you to rerun a specific build or job with the same parameters and settings as the previous execution. In Harness, this functionality is known as **Retry Failed Executions**. You can resume pipeline deployments from any stage or from a specific stage within the pipeline.

To learn more about how to utilize this feature in Harness, go to [Resume pipeline deployments](https://developer.harness.io/docs/platform/pipelines/failure-handling/resume-pipeline-deployments/) documentation.


### How can I handle uppercase environment identifiers in Harness variables and deploy pipelines?

Harness variables provide flexibility in managing environment identifiers, but dealing with uppercase identifiers like UAT and DR can pose challenges. One common requirement is converting these identifiers to lowercase for consistency. Here's how you can address this:

- Using [Ternary Operator](https://developer.harness.io/kb/continuous-delivery/articles/ternary-operator/): While if-else statements aren't directly supported in variables, you can leverage the ternary operator to achieve conditional logic.

- Updating Environment Setup: Another approach is to update your environment setup to ensure identifiers like UAT and DR are stored in lowercase. By maintaining consistency in the environment setup, you can avoid issues with case sensitivity in your deployment pipelines.


### What does "buffer already closed for writing" mean?

This error occurs in SSH or WinRM connections when some command is still executing and the connection is closed by the host. It needs further debugging by looking into logs and server resource constraints.


### Where do I get the metadata for the Harness download/copy command?

This metadata is detected in the service used for the deployment. Ideally, you would have already configured an artifact, and the command would use the same config to get the metadata.


### Can I use SSH to copy an artifact to a target Windows host?

If your deployment type is WinRM, then WinRM is the default option used to connect to the Windows host.


### Why doesn't the pipeline skip steps in a step group when another step in the group fails?

If you want this to occur, you neeed to define a conditional execution of `<+stage.liveStatus> == "SUCCESS"` on each step in the group.

### Why am I getting an error that the input set does not exist in the selected Branch?
This happens because pipelines and input sets need to exist in the same branch when storing them in Git. For example, if your pipeline exists in the `dev` branch but your input set exists in the `main` branch, then loading the pipeline in the `dev` branch and attempting to load the input set will cause this error. To fix this, please ensure that both the pipeline and input set exist in the same branch and same repository.

### When attempting to import a **.yaml file** from GitHub to create a new pipeline, the message `This file is already in use by another pipeline` is displayed. Given that there are no other pipelines in this project, is there a possibility of a duplicate entry that I may not be aware of?

It's possible that there are two pipeline entities in the database, each linked to the same file path from the Harness account and the GitHub URL. Trying to import the file again may trigger the `File Already Imported` pop-up on the screen. However, users can choose to bypass this check by clicking the `Import` button again.

### How can you seamlessly integrate Docker Compose for integration testing into your CI pipeline without starting from scratch?

Run services for integration in the background using a `docker-compose.yaml` file. Connect to these services via their listening ports. Alternatively, while running `docker-compose up` in CI with an existing `docker-compose.yaml` is possible, it can complicate the workflow and limit pipeline control, including the ability to execute each step, gather feedback, and implement failure strategies.






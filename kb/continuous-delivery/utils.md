




#### How to handle the scenario where powershell scripts does not correctly return the status code on failure ?

Though it is an issue with Powershell where it does not return the error code correctly we need this for our step to proceed further and reflect the status correctly. Consider wrapping the code like below in the script:

```
$ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop

<execution code>

exit $LASTEXITCODE
```



#### Can we persist variables in the pipeline after the pipeline run is completed ?

We do not persist the variables and the variables are only accessible during the context of execution. You can make api call to write it as harness config file and later access the Harness file or alternatively you have a config file in git where you can push the var using a shell script and later access the same config file.




#### How do I access one pipeline variables from another pipeline ?

Directly, it may not be possible. 
 
As a workaround, A project or org or account level variable can be created and A shell script can be added in the P1 pipeline after the deployment which can update this variable with the deployment stage status i.e success or failure then the P2 pipeline can access this variable and perform the task based on its value.
 
The shell script will use this API to update the value of the variable - https://apidocs.harness.io/tag/Variables#operation/updateVariable





#### Why some data for the resource configurations returned by api are json but not the get pipeline detail api ?

The reason the get api call for pipeline is returning a yaml because the pipeline is stored as yaml in harness. As this api call is for fetching the pipeline hence it is returning the yaml definition of the pipeline and not the json.
If still you need json representation of the output you can use a parser like yq to convert the response.


#### How can we add newline in mail body sent from email step ?

The email body sent uses a html format and hence the newline character will not work for adding newline entries. We need to make use of html line break for this `<br>`.


#### How to exit a workflow without marking it as failed

You can add a failure strategy in the deploy stage by either ignoring the failure for the shell script or getting a manual intervention where you can mark that step as a success. 


#### 2 Deployments in pipeline, is it possible for me to rollback the stage 1 deployment if the stage 2 tests returned errors?

We do have a pipeline rollback feature that is behind a feature flag. This might work better as you would be able to have both stages separate, with different steps, as you did before, but a failure in the test job stage could roll back both stages.
 
[Documentation](https://developer.harness.io/docs/platform/pipelines/failure-handling/define-a-failure-strategy-for-pipelines)
  
Also, for the kubernetes job, if you use the Apply step instead of Rollout then the step will wait for the job to complete before proceeding, and you would not need the wait step.


#### Does the container step in CD override the entry point when using the command input?

The entry point in the base image will be overwritten as we have to run the commands specified in the run step.


#### How to clone files from git repository within a Shell script step?
We do not natively support leveraging GitHub Connectors within a shell script. However, you can configure an SSH Key or HTTP Authentication by referring to the same secret as your connector does in your shell script. This way, you only need to define and rotate your credentials in one place.


#### Can I send content of a pipeline as attachment in email within harness ?

No, email step in pipelines do not support attachments.


#### Is there a way to interrogate artifact details in a shell script step for SSH use cases, enabling behavior modification in deployment, without transferring it to the end server first ?

One can use command step to copy the artifact to the delegate  to inspect. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step/)


#### CDNG Notifications custom slack notifications

 It is possible to create a shell script that sends notifications through Slack, in this case, we can refer to this article:

 https://discuss.harness.io/t/custom-slack-notifications-using-shell-script/749


#### Creation of environment via API?

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

#### Download artifact for winrm is not working while Nexus if windows machine is behind proxy in CG
Nexus is supported for NG but not in CG, so you can use custom powershell script something like below:
Invoke-WebRequest -Uri "$\{URI}" -Headers $Headers -OutFile "$\{OUT_FILE}" -Proxy "$env:HTTP_PROXY"


#### When do we mask a secret value in shell script?

To mask a secret's value in a script, then that secret should be at least once used or refrenced in the script (referencing the secret as echo \<+secrets.getValue("pattoken")>)


#### Is delegate token masked in if used in shell script?

Delegate tokens are already present in the memory and we know those need to be sanitized, so they are masked by default.


#### How to pass JSON string as a command line argument in shell script

with the command the json string should be passed in sigle quotes for example:

python3 eample.py `<+trigger.payload>`

`<trigger.payload>` resolves to JSON.


#### Is there a way to execute python code directly in the Custom Shell script step?

Our method of executing shell scripts follows a specific approach. Rather than utilizing the customary './file.sh' approach, which employs the shebang line and initiates with Python, we employ '/bin/bash ./file.sh'. This ensures that the script runs exclusively as a bash script.
 
Therefore to make it work put the Python command in a file and execute it. So, the idea is that the bash script will execute as a shell script hence it will not understand the Python command. If we put the Python commands in a script and then run it within shell script it will work.


#### Where can one find the define delegate selector in Shell Script steps ?

The delegate selector field is displayed conditionally based on the step type. If you're using a shell script step, the field is recently moved from the advanced tab to the optional config in the step parameters tab.





#### How Do I preserve the formating of multiline secret in shell script?

Please the use below command-
```
echo ${secrets.getValue("key_file")} > /tmp/id_rsa_base64
cat /tmp/id_rsa_base64 | base64 -di

```


#### How do I list Github Tags for custom artifact when the curl returns a json array without any root element?

We cannot provide an array directly to the custom artifact. It needs a root element to parse the json response.


#### How to use the Stage Variable inside the Shell Script?

A variable expression can be used to access stage variables in pipelines.
Just hover over your variable name, and you will see an option to copy the variable expression path, You can reference this path in shell script.


#### How do I save the dry-run step rendered manifest?

You can view the dry-run manifest as an output variable of the step


#### How to reference a connector in shell script or Powershell script?

Currently, you can't leverage a connector within a script step. However, you can manually integrate to an API referring to the same credentials as the connector.


#### Is it possible to store HTTP step's output as a secret?

The masking is not supported with an HTTP step in this way however you may be able to use a shell script step and list the output variable as a secret in the output of that step which will have it be treated as a secret it any subsequent steps.


#### How can we return dynamically generated information to a calling application upon the successful completion of pipelines initiated by API calls from other applications?

You can configure pipeline outputs throughout the stages to include all the data you want to compile. Then, upon execution completion, you can include a shell script that references these outputs and sends the compiled information to the desired API.


#### In the WinRM execution when user tries to execute the command step is skipping in the execution without any condition configurution?
If the command step is skipping that means you have marked the "Skip instances with the same artifact version already deployed" in Advanced.


#### Can we get details what branch did trigger the pipeline and who did it; the time the pipeline failed or terminated,  while using Microsoft Teams Notification 
These details are not available by default as only (status, time, pipeline name url etc) is only sent and if you need these details might ned to use custom shell script


#### How to pass list of multiple domains for allowing whitelisting while using api ?

Domain whitelisting api takes domain as input array. So if we have multiple domains to be passed this needs to be done as coma separeted string entries in the array. Below is a sample for the same:

```
curl -i -X PUT \
  'https://app.harness.io/ng/api/authentication-settings/whitelisted-domains?accountIdentifier=xxxx' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: REDACTED' \
  -d '["gmail.com","harness.io"]'
```


#### How can we utilise output variables from one pipeline stage or execution in another execution?

To pass output variables from one pipeline stage to another, you can use pipeline chaining. In the parent pipeline, define the output variable in the output section of the first stage. Then, in the second stage, use the expression `<+pipeline.[pipeline_stage_identifier].[output_variable_defined_under_output_section]>` to reference the output variable from the first stage. When you run the parent pipeline, the output variable from the first stage will be passed to the second stage as an input variable.

Harness also has an endpoint you can use in a shell script step or a http step to make an api call for fetching execution detail of another pipeline `api/pipelines/execution/v2/{planExecutionId}`. If we pass the attribute `renderFullBottomGraph` as true in this api call we get all the variables in the pipeline as response.
This can later be parsed to get the desired output variables and published accordingly to be used in other steps/pipeline.


#### Does Shell Script provisioning step has built in output variables?

Shell Script provoisioning step does not have script output variables similar to shell script step. Their variable configruation step only have option for input variables.


#### How to access output variables from shell provisioning step?

The shell script provisioning step expects the output to be put to a json form inside the file $PROVISIONER_OUTPUT_PATH. This is then subsequently accessed in next step with Instance variable like below
 
`<+pipeline.stages.shellscriptprovision.spec.execution.steps.shell1.output.Instances>`



#### Can we utilise git connetor to get the file in a shell script step?

We can not reference the connector for git inside the shell script step. If we need to clone a repo we need to use git cli commands. We can however store the credentials for git in harness secretes and reference the secrets for authetication in cli command.



#### How can I deploy the application on a custom specified location in the Azure web app?

Currently, we don't have any facility to do the web app deployment in the custom-specified location in Azure. Alternatively, you can use the shell script step and use the Azure CLI to pass the required argument


#### Why on echoing the date powershell shell script step adding an extra line?

Using the Write-Host command instead of echo will get the result in one line.


#### How can one parse a JSON string in a pipeline expression ?

Please one may follow steps mentioned below :

- Use the expression `<+ json.object(<+pipeline.variable.myJsonThing>)>` 
- One can also try JQuery in a shell script or container step and capture output variables
- Read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/json-and-xml-functors/)


#### Is there a way to pass output variables between commands with in a command step ?

No, output variables can only be passed between steps or stages, not within a single command step
Please read more on this [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/chained-pipeline-output-variables)


#### Is it possible to get a `KUBECONFIG` file in a shell script within Harness for K8s connectors ?

Yes, we have it documentated for the steps. Please refer to the following documentations on [Shell script include infrastructure](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/#include-infrastructure-selectors) and [Shell script run K8s](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/#running-kubernetes-commands-in-the-shell-script)


#### Is there a way to simply update the ECS scaling policy without redeploying the ECS service ?

Many users opt for a shell script approach, where a configuration file is utilized and set as an environment variable. Subsequently, a shell script is crafted to execute the relevant AWS CLI commands, facilitating the update of scaling policies for a deployed service. This versatile method allows for customization and automation across various scenarios and configurations


#### I have a pipeline containing different stages DEV-QA-UAT-PROD. In UAT I'm using Canary deployment and in PROD it's Blue-Green. In these scenarios how Harness provides proper Roll Back strategies?
Harness provides a declarative rollback feature that can perform rollbacks effectively in different deployment scenarios.
 
For Canary deployment in UAT, you can define the percentage of traffic to route to the new version and set up conditions to switch traffic between the old and new versions. If an anomaly is detected during the canary deployment, Harness will automatically trigger a rollback to the previous version.
 
For Blue-Green deployment in PROD, you can define the conditions to switch traffic between the blue and green environments. If an issue is detected in the green environment, you can easily switch back to the blue environment using the declarative rollback feature.
 
You can define the failure strategy on stages and steps in your pipeline to set up proper rollback strategies. You can add a failure strategy in the deploy stage by either ignoring the failure for the shell script or getting a manual intervention where you can mark that step as a success. Additionally, you can use the declarative rollback feature provided by Harness to perform rollbacks effectively in different deployment scenarios.



#### To store my shell script when I use Harness File Store I don't see any option like Bitbucket, or GitHub.

As of today, we have only two options to select the shell script provision script. That is inline and Harness file store.


#### How to pass the dynamic tag of the image from the CI pipeline to the CD Pipeline to pull the image.
A project or org or account level variable can be created and A shell_script/Run Step can be added in the P1 pipeline to export or output the required variable then the P2 pipeline can access this variable and perform the task based on its value.
 
The shell script will use this API to update the value of the variable - https://apidocs.harness.io/tag/Variables#operation/updateVariable


#### How do I use a custom stage to do the Terraform Cloud Run step?
The run step is only supported in the CI and CD stages. For the custom stage, please use the shell script step.


#### How to use the a json type secret value. 

Let's take an example that your secret value is json and you stored it as a secret in Harness. Yoiu should reference it with singlw quote like :

```TEST_KEY='<+secrets.getValue("boa-uat-gcp-key")}>'```


#### Where can one find the API request and response demo for execution of Pipeline with Input Set ?

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

Please read more on this in the following documentation on [Execute a Pipeline with Input Set References](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/postPipelineExecuteWithInputSetList)


#### Can we use json functor in http step with functions like length, concat ?

Yes, you can use JSON functors with functions like length and concat in an HTTP step. Here is an example of using the concat function in an HTTP step:

Value: `<+json.concat("Hello ", "World!")>`
And here is an example of using the length function in an HTTP step:

Value: `<+json.length(<+pipeline.variables.array>)>`
In both cases, the JSON functor is used to manipulate the input values and return a new value that can be used in the HTTP step.


#### I need something that value I can change in the middle of pipline (automatically using bash script for example).
So define variable with default value and then in the middle of the pipeline change it's value

You can assign a stage variable value via shell script in Harness pipeline by using the Script Output Variables option in the Shell Script step.
First, declare the variable in your script and export it. For example, if you want to set the value of a stage variable named myvar to 123, you can add the following line to your script:

`export myvar=123`

Then, in the Shell Script step, go to Script Output Variables and add a new output variable. Set the Name to the name of the stage variable (myvar in this example) and set the Value to the name of the exported variable in your script (myvar in this example).
Now, the value of the stage variable myvar will be set to 123 after the Shell Script step is executed. You can reference this value in subsequent steps using the Harness expression 

`<+execution.stages.[stage_id].output.outputVariables.myvar>`


#### we have a config file which is required for a CLI tool ran using a custom shell script. Is it possible to somehow store this file within harness rather than directly on the delegate and reference it in the custom shell script execution?

You can use API [API]https://apidocs.harness.io/tag/File-Store#operation/listFilesAndFolders to create or fetch files from Harness file store in the shell script.


#### Is it possible to get through an expression the uninstall flags from a helm service ?

One can try below example to find and uninstall the same :
```sh
commandFlagsJson='<+json.format(<+pipeline.stages.deploy.spec.manifests.helm_hello_world.commandFlags>)>'
commandType=$(echo $commandFlagsJson | jq '.[] | select(.commandType=="Uninstall") | .flag')

echo $commandType
```


#### Does Harness provide Refresh Token Support with Tanzu App Service Deployment ?

Yes, Harness now takes in a refresh token into the Tanzu connector associated behind the FF - `CDS_CF_TOKEN_AUTH`. You can get the refresh token from the cf config.json on the delegate. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-tas-connector#refresh-token-support)


#### Is there an official method in Harness to expose the connector, allowing GitHub requests to be made without storing a machine token within Harness ?

No, this is not yet possible as the shell script is connector agnostic. If the shell script runs on a delegate with access or credentials it can inherit those creds for the shell command. Please feel free to file a canny request.


#### How to read files under project's helm folder during project deployment?

We do not have a way to read the values file directly and access any variables from the same. It can only be read as part of the service deployment.

If you need to access the file values you need to pull the file from your repo in a shell script step and then publish the corresponding value as output variable. 



#### How to check for the script file which harness creates for running the script task?

Harness by default creates a script file with the script provided in shell script configuration inside the /tmp folder.


#### Does http step for mtls end point also ignore certificate check ?

If we do not provide any certificate for the end point the TLS ignore will basically force the client to not validate the server however the same is not true for the server which is expecting certificate as well for client validation. Hence for mtls end point this will fail.


#### Is there a way to use the `<+stage>` output as json in our functors ?

Yes, you can use the JSON format function to format the output of a stage as JSON and then use it in your functors. 
Here's an example expression that formats the output of a stage named "myStage" as JSON:
`<+json.format(<+pipeline.stages.myStage.output>)>`
You can then use this expression in your functors to select specific values from the JSON output of the stage.

Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/expression-v2)


#### How do we pass the output list of first step to next step looping strategy "repeat", the output can be a list or array which needs to be parsed ?

The Output Variable of the shell script is a string, which you are trying to pass as a list of strings, to avoid this :
- First you need to convert your array list into a string and then pass it as an output variable.
- Then convert this string into a list of string again before passing it to the repeat strategy.

Please read more on this in the following [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/repeat-strategy)


#### Does shell script step uses delegate selector from connector used

By default shell script doesn’t uses the connector selector and task can go to any delegate, if you need to use same delegate you have to specify the selector


####  Can we use command step for custom stage

No this is not supported as of now, as currently command step is only applicable in ssh/winrm type deployment


#### Do we have predefined rollback step while using shell script provisioning

No, Out for the box Rollback step is not available and you need to add your own scripts under Rollback section of the stage Environment


####   I need to run my step in delegate host?

You can create a shell script and select option as execute on delegate under Execution Target


#### Does Harness support `distroless` image in the container run step ?

No, Harness does not support distroless images yet, we will introduce to adapt this soon.
Please read more on Container steps in the [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/container-step/)


#### How to trigger a pipeline on another pipeline completion?
The user can add the shell script step with a custom webhook curl at the end of the pipeline to trigger another pipeline.


#### How to fetch files from the harness file store in the run step?
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


#### Is there a way the user can pull from Bitbucket/Github inside the Harness Delegate and then push it to the target server?

Yes, you can use the git clone step and after that, you can push the files to the target server with the shell script/run step in the stage.


#### How to use the Opsgenie plugin and integration with Harness to create new alerts based on testcase health?

We do have different built-in notification mechanisms,  slack/email/ms teams/pager duty or custom, but if you want to integrate opsgenie, you have to create a shell script and make a call to opsgenie utilizing the api exposed by opsgenie to use for alert purposes.


#### Accessing a variable in namepsace of an environment which is defined in the shell script step of the pipeline.

You will need to add a custom stage and then export an output variable in order to use this output variable in the deploy stage environment variable as when the pipeline will execute it will initialize the service and environment before getting to tht shell setp. 


#### How to delete a job after its execution is complete?

You can add a shell script to check the job status before executing the Kubernetes Delete. To run kubectl commands, it's required to use the Harness Kubeconfig as an environment variable. Here's an example script for guidance:

```
export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH}
kubectl wait --for=condition=complete job/myjob -n <+infra.namespace>
```


#### Can a shell script step's output variable be used to determine the failure strategy of the same or subsequent steps in a conditional execution scenario, such as setting a failure strategy based on specific conditions like a DNS name check ?

Unfortunately, utilizing the output variable of a shell script step to determine the failure strategy for the same or subsequent steps is not feasible. When a shell script step concludes with a non-zero exit status, the output variable remains unset, precluding its use in subsequent steps or for defining the failure strategy. In such scenarios, reliance on the non-zero exit status is necessary to trigger the failure strategy.
Please read more on Failure Strategy in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-failure-strategy/)


#### How to trigger one pipeline from another and use the first pipeline's shell script output as inputs for the second, ensuring runtime inputs like environment and infrastructure names are passed?

One can use output variables from one pipeline as inputs for another, defining the receiving pipeline's variables as runtime inputs.
Please read more on this in the following [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/output-variable-for-powershell-script/)


#### Why can't I deploy an ARM template?

If you are getting the below error when attempting to deploy ARM templates, it might be because `$schema` and `contentVersion` parameters have not been removed from the Parameters File yet. This is due to a limitation in the Azure Java SDK and REST API.

```
Status code 400, "{"error":{"code":"InvalidRequestContent","message":"The request content was invalid and could not be deserialized: 'Error converting value \"https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#\" to type 'Azure.Deployments.Core.Definitions.DeploymentParameterDefinition'. Path 'properties.parameters.$schema', line 1, position 6636.'."}}"
```

For an example of a valid Paramters File, go to [ARM parameter file](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning/#arm-parameter-file).


#### Does Harness supports multiple IaC provisioners?

Harness does support multiple Iac provisioners, few examples are terraform, terragrunt, cloud formation, shell script provisioning etc. 



#### Does http step supports mtls?

Http step does support mtls communication, we can use the certificate and private key for establishing the mtls connection with the provided end point.


#### What pipeline statuses are considered when determining concurrent active pipeline executions ?

Concurrent active pipeline executions comprises of active and in-progress executions. This includes those that are paused temporarily by steps such as the wait step or approval step. Currently there are plans to exclude pipelines that are waiting for approval.


#### Is there a way to see which user acts on the wait step to mark it as a success or mark it as fail?

One can look at having Harness approval step in addition to wait step for this usecase, also can set a failure strategy in case it timeout
Please read more on Harness approval step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/#add-approval-step)


#### How to efficiently extract specific tag values from JSON output, like querying an AWS ECR Repo via the AWS CLI, using the json.select feature with shell script variables or outputs?

The output variable cannot be used in the same step its created.
The output variables can be used within:
- the stage
- inside the pipeline
- inside a step group

Please read more on this in the following [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/output-variable-for-powershell-script/)


#### How do I setup a Pipeline Trigger for Tag and Branch creation in Github?

The out of the box Github Trigger type does not currently support this however, you can use a Custom Webhook trigger and follow the below steps in order to achieve this. 

1. Create a Custom Webhook trigger
2. Copy the Webhook URL of the created trigger
3. Configure a Github Repository Webhook pasting in the URL copied from Step 2 in the Payload URL
4. Set the content type to `application/json`
5. Select `Let me select individual events.` for the `Which events would you like to trigger this webhook?` section
6. Check the `Branch or tag creation` checkbox



#### What are reserved symbols in PowerShell, and how do I handle them in Harness secrets in Powershell scripts?

Symbols such as `|`, `^`, `&`, `<`, `>`, and `%` are reserved in PowerShell and can have special meanings. It's important to be aware of these symbols, especially when using them as values in Harness secrets.

If a reserved symbol needs to be used as a value in a Harness secret for PowerShell scripts, it should be escaped using the `^` symbol. This ensures that PowerShell interprets the symbol correctly and does not apply any special meanings to it.

The recommended expression to refrence a Harness secret is `<+secrets.getValue('secretID')>`. This ensures that the secret value is obtained securely and without any issues, especially when dealing with reserved symbols.


#### How to parse through the pipeline's YAML file to extract a particular value?

You can use the API to get the pipeline YAML and use Jq to get the required value. For example:

```
#!/bin/bash

curl -s -X GET \
  'https://app.harness.io/pipeline/api/pipelines/dummy3?accountIdentifier={accountId}&orgIdentifier=default&projectIdentifier=default_project' \
  -H 'Load-From-Cache: false' \
  -H 'x-api-key: xxxxxxxxxxxxxxx' \
  -o response.json

templateRef=$(jq -r '.data.yamlPipeline' response.json | sed 's/\\n/\n/g' | grep -oP '(?<=templateRef: ).*' | head -n 1)

echo "TemplateRef: $templateRef"
```

For more information, go to [Use JSON parser tools and JEXL](https://developer.harness.io/docs/platform/variables-and-expressions/expression-v2).


#### Which API is utilized for modifying configuration in the update-git-metadata API request for pipelines?

Please find an example API call below:

```sh
curl --location --request PUT 'https://app.harness.io/gateway/pipeline/api/pipelines/<PIPELINE_IDENTIFIER>/update-git-metadata?accountIdentifier=<ACCOUNT_ID>&orgIdentifier=<ORG_ID>&projectIdentifier=<PROJECT_IDENTIFIER>&connectorRef=<CONNECTOR_REF_TO_UPDATE>&repoName=<REPO_NAME_TO_UPDATE>&filePath=<FILE_PATH_TO_UPDATE>' \
  -H 'x-api-key: <API_KEY>' \
  -H 'content-type: application/json' \

```
Pleae read more on this in the following [Documentation](https://apidocs.harness.io/tag/Pipeline#operation/importPipeline)


#### Is there an alternative work for usage of container step in Continuous Delivery?

Yes, we recommend using **Container-step-group + run step**.
Read more about [Containerized step group](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/#add-a-containerized-step-group).


#### How do I use maps in Harness expressions?
You can convert map to JSON and use the `<+json.select()>` function to achieve this. For more information, go to [JSON and XML Functors](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/json-and-xml-functors/) documentation.


#### Does Harness support Helm hooks (excluding service hooks) similar to the support provided in First Gen?

No, Harness does not support Helm hooks in Kubernetes deployments in the same way as in First Gen.

The recommended approach in both First Gen and NextGen is to remove Helm hooks and integrate them as shell script steps within the workflow. This method is applicable in both generations of Harness.

For unchanged utilization of Helm hooks, native Helm deployment can be chosen. However, native Helm's ability to process hooks and deploy simultaneously is limited. This limitation stems from Helm's post-render functionality, which prevents Harness from processing hooks effectively.

For detailed instructions on integrating Helm charts in Kubernetes deployments with Harness, please refer to the Harness [documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/kubernetes-deployments/use-helm-chart-hooks-in-kubernetes-deployments/).


#### How does the Encrypt json output setting work in the Terraform Apply stage?

This setting will temporarily create a secret that stores the Terraform output JSON. The secret will be created using the Harness Secret Manager provider and will be available for use during the pipeline execution. The secret is then deleted at the end of the execution. For more information, go to [Encrypt the Terraform Apply JSON outputs](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#encrypt-the-terraform-apply-json-outputs).


#### How do I retrieve encrypted Terraform Output data from a Terraform Apply stage?

To retrieve encrypted Terraform Output data, find the `TF_JSON_OUTPUT_ENCRYPTED` output variable and reference it using a Harness expression. For example, `<+pipeline.stages.stage1.spec.execution.steps.TerraformApply_1.output.TF_JSON_OUTPUT_ENCRYPTED>`. The value will be encrypted in the Harness UI but, the values will be available in downstream steps and stages. For more information, go to [Encrypt the Terraform Apply JSON outputs](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#encrypt-the-terraform-apply-json-outputs).


#### How do I adjust the kubectl rollout command in Harness?

You can export kubeconfig and can run the kubectl command manually by using the shell script step


#### How do I get the logs from a Kubernetes job deployed via Helm?

You can view the detailed logs for the command applied (with manifest applied and status) in Execution. To view logs after deployment, use shell script and run the `kubectl logs` command after exporting kubeconfig.


#### Can I use shell variables in Harness expressions to fetch a secret in a shell script step?

You can't use a shell variable in a Harness expression because the Harness expression is resolved before the step starts, and the shell variable doesn't populate until the shell script step run.

However, you could write a variable that stores a Harness expression referencing a secret, and then use that variable in your script. This way the expression can be resolved independently of the script running.


#### Can I access files from a containerized step group in a subsequent shell script step?

No. Containerized step groups are isolated on a separate pod from other steps. Files generated in the containerized step group aren't available in outside steps.


#### Why can't I use a particular shell type with the Command step?

Command step depends on type of deployment.

If your deployment type is WinRM, then you only have the powershell shell option; whereas, if your deployment type is SSH, then you have the bash shell option.

If you want to use these shells interchangeably, you can either:

* Add shell script step instead of command step.
* Use the command step without selecting **Run on Delegate**, so that it will run on host instead of the delegate.


#### How do I perform iisreset on a Windows machine?

You can create a WinRM connector and use a powershell script to perform the iisreset. Make sure the user credentials used for the connection have admin access.


#### Am I able to export a variable to my pipeline from variables defined in a json file in git?
There is no built in way to achieve this. However you can access the file inside the pipeline and use a json parser to read the values and export it as variables. Then we can use the exported variables in any stage in the pipeline.


#### How do I get a file from a different source and use it in a terraform step during runtime?
You can have a shell script step in which you fetch the file from your corresponding source and have it stored on the delegate at any specific path and refer that path in your terraform config. You just need to ensure that your plan and apply runs on the same delegate. Below is documentation for how you can achieve that:
https://developer.harness.io/docs/platform/delegates/manage-delegates/run-all-pipeline-steps-in-one-pod/


### Harness rollback deployments. 

Harness Rollback deployments initiate a rollback of the most recent successful deployment. Rollback deployments are currently supported by the following deployment types only (Kubernetes, Tanzu Application Services, Amazon ECS)


### Does Harness support distroless image in the container run step ?

No, Harness does not support `distroless` images yet, we will introduce to adapt this soon.
Please read more on Container steps in the [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/container-step/).

### Step group variables not accessible between steps using stepGroup expression in Container step?

The Container Step creates its step group with the Init and Run steps during pipeline execution. The reason why the container step creates its own Step Group is, that the additional Init Step is needed to create a build pod with containers.

Since the inner container step group is created, the ```<+stepGroup>``` expression in the Container Step script refers to the inner step group, not to the outer Deployment Dry Run group. Hence, we can’t use ```<+stepGroup>``` in the container step to access the outer step group steps.

We need to use the following expressions to get the Deployment Dry Run group steps identifiers/names in the Container Step,

Get Deployment Dry Run step identifier:

```
<+execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.identifier>
or,
<+pipeline.stages.Test_Policy.spec.execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.identifier>

Get Deployment Dry Run step name:

<+execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.name>
or,
<+pipeline.stages.Test_Policy.spec.execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.name>
```
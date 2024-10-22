---
title: CD Steps FAQs
description: Frequently asked questions about CD steps and step groups.
sidebar_position: 8000
canonical_url: https://www.harness.io/blog/ci-cd-pipeline
---

This article addresses some frequently asked questions about CD steps and step groups.

## Container steps

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


#### Does the Container step in CD override the entry point when using the command input?

The entry point in the base image will be overwritten as we have to run the commands specified in the run step.


#### Is there an alternative work for usage of Container step in Continuous Delivery?

Yes, we recommend using **Container-step-group + run step**.
Read more about [Containerized step group](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/#add-a-containerized-step-group).


### Does Harness support `distroless` image in the container run step ?

No, Harness does not support distroless images yet, we will introduce to adapt this soon.

## Command step

### What is the Command Step?

The Command Step allows you to run commands on target hosts in SSH and WinRM deployments, as well as within deployment templates. You can use it for various tasks like:

- Running scripts on all target hosts.
- Downloading the deployment artifact.
- Copying the artifact or configuration files.


### How to loop the Command Step on all target hosts?

Use the "repeat" looping strategy with the expression stage.output.hosts after the Fetch Instances step for deployment templates.
This ensures the commands run on each host retrieved via the Fetch Instances step.

### Is there a way to pass output variables between commands with in a Command step ?

No, output variables can only be passed between steps or stages, not within a single Command step.
Please read more on this [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/chained-pipeline-output-variables).

###  Can we use Command step for custom stage?

No this is not supported as of now, as currently Command step is only applicable in SSH/WinRM type deployment.

### In the WinRM execution when user tries to execute the Command step is skipping in the execution without any condition configuration?

If the Command step is skipping that means you have marked the "Skip instances with the same artifact version already deployed" in Advanced.

### Why can't I use a particular shell type with the Command step?

Command step depends on type of deployment.

If your deployment type is WinRM, then you only have the powershell shell option; whereas, if your deployment type is SSH, then you have the bash shell option.

If you want to use these shells interchangeably, you can either:

* Add shell script step instead of command step.
* Use the command step without selecting **Run on Delegate**, so that it will run on host instead of the delegate.

### Why am I getting the error "Host information is missing in Command Step"?

```
Invalid argument(s): Host information is missing in Command Step. Please make sure the looping strategy (repeat) is provided.
```

If you are using the Command step, the `Repeat` looping strategy is required. The above error indicates that the Command step was ran without a `Repeat` looping strategy. To fix this, set the `Repeat` looping strategy for the Command step. For more information on the Command step and the supported looping strategies, go to [SSH and WinRM](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step/#ssh-and-winrm) documentation.

### Is there a way to interrogate artifact details in a shell script step for SSH use cases, enabling behavior modification in deployment, without transferring it to the end server first ?

One can use command step to copy the artifact to the delegate  to inspect. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step/).

## Email step

### How can we add newline in mail body sent from Email step?

The email body sent uses a html format and hence the newline character will not work for adding newline entries. We need to make use of html line break for this `<br>`.

### Can I send content of a pipeline as attachment in email within Harness?

No, the Email step in pipelines do not support attachments.

## HTTP step

### Can we use json functor in Http step with functions like length, concat, etc ?

Yes, you can use JSON functors with functions like length and concat in an HTTP step. Here is an example of using the concat function in an HTTP step:

Value: `<+json.concat("Hello ", "World!")>`
And here is an example of using the length function in an HTTP step:

Value: `<+json.length(<+pipeline.variables.array>)>`
In both cases, the JSON functor is used to manipulate the input values and return a new value that can be used in the HTTP step.

### Does HTTP step for mtls end point also ignore certificate check ?

If we do not provide any certificate for the end point the TLS ignore will basically force the client to not validate the server however the same is not true for the server which is expecting certificate as well for client validation. Hence for mtls end point this will fail.

### Does HTTP step supports mtls?

HTTP step does support mtls communication, we can use the certificate and private key for establishing the mtls connection with the provided end point.

### Is it possible to store HTTP step's output as a secret?

The masking is not supported with an HTTP step in this way however you may be able to use a Shell Script step and list the output variable as a secret in the output of that step which will have it be treated as a secret it any subsequent steps. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step/).

### How can we utilize output variables from one pipeline stage or execution in another execution?

To pass output variables from one pipeline stage to another, you can use pipeline chaining. In the parent pipeline, define the output variable in the output section of the first stage. Then, in the second stage, use the expression `<+pipeline.[pipeline_stage_identifier].[output_variable_defined_under_output_section]>` to reference the output variable from the first stage. When you run the parent pipeline, the output variable from the first stage will be passed to the second stage as an input variable.

Harness also has an endpoint you can use in a Shell Script step or a HTTP step to make an API call for fetching execution detail of another pipeline `api/pipelines/execution/v2/{planExecutionId}`. If we pass the attribute `renderFullBottomGraph` as true in this api call we get all the variables in the pipeline as response.
This can later be parsed to get the desired output variables and published accordingly to be used in other steps/pipeline.

### How to set unsupported fields when creating a Jira issue?

By default, Jira plugins don't support cascading lists and other custom types. You can set the unsupported fields using the [HTTP step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/http-step/). For more details, go to [Use HTTP step to set unsupported fields when creating a Jira issue](https://developer.harness.io/kb/continuous-delivery/articles/create-cascading-fields-jira).

## Shell Script step


### How to clone files from git repository within a Shell Script step?
We do not natively support leveraging GitHub Connectors within a shell script. However, you can configure an SSH Key or HTTP Authentication by referring to the same secret as your connector does in your shell script. This way, you only need to define and rotate your credentials in one place.


### Is there a way to interrogate artifact details in a Shell Script step for SSH use cases, enabling behavior modification in deployment, without transferring it to the end server first ?

One can use command step to copy the artifact to the delegate to inspect. 

### Where can one find the define delegate selector in Shell Script steps ?

The delegate selector field is displayed conditionally based on the step type. If you're using a Shell Script step, the field is recently moved from the advanced tab to the optional config in the step parameters tab.


### Is it possible to store HTTP step's output as a secret?

The masking is not supported with an HTTP step in this way however you may be able to use a Shell Script step and list the output variable as a secret in the output of that step which will have it be treated as a secret it any subsequent steps.

### How can we utilize output variables from one pipeline stage or execution in another execution?

To pass output variables from one pipeline stage to another, you can use pipeline chaining. In the parent pipeline, define the output variable in the output section of the first stage. Then, in the second stage, use the expression `<+pipeline.[pipeline_stage_identifier].[output_variable_defined_under_output_section]>` to reference the output variable from the first stage. When you run the parent pipeline, the output variable from the first stage will be passed to the second stage as an input variable.

Harness also has an endpoint you can use in a Shell Script step or a HTTP step to make an API call for fetching execution detail of another pipeline `api/pipelines/execution/v2/{planExecutionId}`. If we pass the attribute `renderFullBottomGraph` as true in this api call we get all the variables in the pipeline as response.
This can later be parsed to get the desired output variables and published accordingly to be used in other steps/pipeline.

### Can we utilize Git connector to get the file in a Shell Script step?

We can not reference the connector for git inside the Shell Script step. If we need to clone a repo we need to use git cli commands. We can however store the credentials for git in harness secretes and reference the secrets for authentication in CLI command.

### How can I deploy the application on a custom specified location in the Azure web app?

Currently, we don't have any facility to do the web app deployment in the custom-specified location in Azure. Alternatively, you can use the Shell Script step and use the Azure CLI to pass the required argument


### Why on echoing the date powershell Shell Script step adding an extra line?

Using the Write-Host command instead of echo will get the result in one line.

### How do I use a custom stage to do the Terraform Cloud Run step?
The Run step is only supported in the CI and CD stages. For the custom stage, please use the Shell Script step.

### Does Shell Script step uses delegate selector from connector used

By default shell script doesn’t uses the connector selector and task can go to any delegate, if you need to use same delegate you have to specify the selector.

### How to trigger a pipeline on another pipeline completion?
The user can add the Shell Script step with a custom webhook curl at the end of the pipeline to trigger another pipeline.

### Can a Shell Script step's output variable be used to determine the failure strategy of the same or subsequent steps in a conditional execution scenario, such as setting a failure strategy based on specific conditions like a DNS name check ?

Unfortunately, utilizing the output variable of a Shell Script step to determine the failure strategy for the same or subsequent steps is not feasible. When a Shell Script step concludes with a non-zero exit status, the output variable remains unset, precluding its use in subsequent steps or for defining the failure strategy. In such scenarios, reliance on the non-zero exit status is necessary to trigger the failure strategy.
Please read more on Failure Strategy in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-failure-strategy/)

### How to read files under project's helm folder during project deployment?

We do not have a way to read the values file directly and access any variables from the same. It can only be read as part of the service deployment.

If you need to access the file values you need to pull the file from your repo in a Shell Script step and then publish the corresponding value as output variable. 

### Accessing a variable in namespace of an environment which is defined in the Shell Script step of the pipeline.

You will need to add a custom stage and then export an output variable in order to use this output variable in the deploy stage environment variable as when the pipeline will execute it will initialize the service and environment before getting to tht shell setup. 


### Can I use shell variables in Harness expressions to fetch a secret in a Shell Script step?

You can't use a shell variable in a Harness expression because the Harness expression is resolved before the step starts, and the shell variable doesn't populate until the Shell Script step run.

However, you could write a variable that stores a Harness expression referencing a secret, and then use that variable in your script. This way the expression can be resolved independently of the script running.


### Can I access files from a containerized step group in a subsequent Shell Script step?

No. Containerized step groups are isolated on a separate pod from other steps. Files generated in the containerized step group aren't available in outside steps.


### Why can't I use a particular shell type with the Command step?

Command step depends on type of deployment.

If your deployment type is WinRM, then you only have the powershell shell option; whereas, if your deployment type is SSH, then you have the bash shell option.

If you want to use these shells interchangeably, you can either:

* Add Shell Script step instead of command step.
* Use the command step without selecting **Run on Delegate**, so that it will run on host instead of the delegate.


### Is there a way to execute python code directly in the Custom Shell Script step?

Our method of executing shell scripts follows a specific approach. Rather than utilizing the customary './file.sh' approach, which employs the shebang line and initiates with Python, we employ '/bin/bash ./file.sh'. This ensures that the script runs exclusively as a bash script.
 
Therefore to make it work put the Python command in a file and execute it. So, the idea is that the bash script will execute as a shell script hence it will not understand the Python command. If we put the Python commands in a script and then run it within shell script it will work.

### When do we mask a secret value in shell script?

To mask a secret's value in a script, then that secret should be at least once used or refrenced in the script (referencing the secret as echo \<+secrets.getValue("pattoken")>)


### Is delegate token masked in if used in shell script?

Delegate tokens are already present in the memory and we know those need to be sanitized, so they are masked by default.


### How to pass JSON string as a command line argument in shell script

with the command the json string should be passed in sigle quotes for example:

python3 eample.py `<+trigger.payload>`

`<trigger.payload>` resolves to JSON.

### How Do I preserve the formating of multiline secret in shell script?

Please the use below command-
```
echo ${secrets.getValue("key_file")} > /tmp/id_rsa_base64
cat /tmp/id_rsa_base64 | base64 -di

```

### How to reference a connector in shell script or Powershell script?

Currently, you can't leverage a connector within a script step. However, you can manually integrate to an API referring to the same credentials as the connector.

### I need something that value I can change in the middle of pipeline (automatically using bash script for example).
So define variable with default value and then in the middle of the pipeline change it's value

You can assign a stage variable value via shell script in Harness pipeline by using the Script Output Variables option in the Shell Script step.
First, declare the variable in your script and export it. For example, if you want to set the value of a stage variable named myvar to 123, you can add the following line to your script:

`export myvar=123`

Then, in the Shell Script step, go to Script Output Variables and add a new output variable. Set the Name to the name of the stage variable (myvar in this example) and set the Value to the name of the exported variable in your script (myvar in this example).
Now, the value of the stage variable myvar will be set to 123 after the Shell Script step is executed. You can reference this value in subsequent steps using the Harness expression 

`<+execution.stages.[stage_id].output.outputVariables.myvar>`

### we have a config file which is required for a CLI tool ran using a custom shell script. Is it possible to somehow store this file within harness rather than directly on the delegate and reference it in the custom shell script execution?

You can use API [API]https://apidocs.harness.io/tag/File-Store#operation/listFilesAndFolders to create or fetch files from Harness file store in the shell script.


### Is it possible to get through an expression the uninstall flags from a helm service ?

One can try below example to find and uninstall the same :
```sh
commandFlagsJson='<+json.format(<+pipeline.stages.deploy.spec.manifests.helm_hello_world.commandFlags>)>'
commandType=$(echo $commandFlagsJson | jq '.[] | select(.commandType=="Uninstall") | .flag')

echo $commandType
```

### Is there an official method in Harness to expose the connector, allowing GitHub requests to be made without storing a machine token within Harness ?

No, this is not yet possible as the shell script is connector agnostic. If the shell script runs on a delegate with access or credentials it can inherit those creds for the shell command. Please feel free to file a canny request.


### How to check for the script file which harness creates for running the script task?

Harness by default creates a script file with the script provided in shell script configuration inside the /tmp folder.


### Is there a way the user can pull from Bitbucket/Github inside the Harness Delegate and then push it to the target server?

Yes, you can use the git clone step and after that, you can push the files to the target server with the shell script/run step in the stage.


### How to use the Opsgenie plugin and integration with Harness to create new alerts based on testcase health?

We do have different built-in notification mechanisms,  slack/email/ms teams/pager duty or custom, but if you want to integrate opsgenie, you have to create a shell script and make a call to opsgenie utilizing the api exposed by opsgenie to use for alert purposes.


### How to delete a job after its execution is complete?

You can add a shell script to check the job status before executing the Kubernetes Delete. To run kubectl commands, it's required to use the Harness Kubeconfig as an environment variable. Here's an example script for guidance:

```
export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH}
kubectl wait --for=condition=complete job/myjob -n <+infra.namespace>
```

### How to trigger one pipeline from another and use the first pipeline's shell script output as inputs for the second, ensuring runtime inputs like environment and infrastructure names are passed?

One can use output variables from one pipeline as inputs for another, defining the receiving pipeline's variables as runtime inputs.
Please read more on this in the following [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/output-variable-for-powershell-script/).

## Containerized step groups

### How can I override the lite-engine image for the Container Run step to pull images from ECR instead of Docker Hub? 

Yes, use Docker Connector with your registry URL and anonymous access would help you to achieve this.

### Does the container step in CD override the entry point when using the command input?

The entry point in the base image will be overwritten as we have to run the commands specified in the run step.

### Can a single custom plugin be created that could be used in steps for both the CI and CD modules?

Yes, it is possible to create a single custom plugin that can be used in both the CI and CD modules. The documentation for creating custom plugins is similar for both modules, and the same plugin can be used in both. The only difference is in how the plugin is used in the pipeline. In the CI module, the plugin is used in a [Plugin step](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins), while in the CD module, it is used in a [Containerized step](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/plugin-step). As long as the plugin is designed to work in both types of steps, it can be used in both modules.


### Is there a method to modify permissions for write access to the `/tmp` directory in order to mitigate the risk of a team unintentionally or intentionally deleting it, thereby avoiding potential disruptions for other teams that rely on it without restrictions?

No, we don't have such feature availability now.
Although one can simply use Containerized step groups instead of having teams work out of `/tmp`.
Please refer more on containerized step group in this [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/)


### How to pass the dynamic tag of the image from the CI pipeline to the CD Pipeline to pull the image?
A project or org or account level variable can be created and A shell_script/Run Step can be added in the P1 pipeline to export or output the required variable then the P2 pipeline can access this variable and perform the task based on its value.
 
The shell script will use this API to update the value of the variable - https://apidocs.harness.io/tag/Variables#operation/updateVariable


### How do I use a custom stage to do the Terraform Cloud Run step?
The run step is only supported in the CI and CD stages. For the custom stage, please use the Shell Script step.


### Why doesn't the pipeline roll back when the Container Step times out?

The Container Step is being deprecated, and support for it will no longer be provided. Instead, we recommend incorporating a step group that is container-based in your pipeline and proceeding to create a Run step. This step will function similarly to the container step, but the rollback will operate as expected.


### Can I use the same cluster for running the Harness Delegate and containerized step group(s), or is it required to use separate clusters ?

Certainly! one has the flexibility to use the same cluster for both the Harness Delegate and containerized step group(s). However, it's important to note that this is not a requirement. Harness is designed to accommodate various deployment scenarios, allowing you to optimize resource utilization based on your specific needs. Feel free to configure your setup according to your preferences and resource allocation strategy.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups#important-notes).




### How to fetch files from the harness file store in the Run step?
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


### Is there a way the user can pull from Bitbucket/Github inside the Harness Delegate and then push it to the target server?

Yes, you can use the git clone step and after that, you can push the files to the target server with the shell script/run step in the stage.


### Is there an alternative work for usage of Container step in Continuous Delivery?

Yes, we recommend using **Container-step-group + run step**.
Read more about [Containerized step group](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/#add-a-containerized-step-group).


### Do common containerized steps like "run" and "git clone" require a CI license to be available in CD step groups?

No, you do not need a CI license to use the "run" and "git clone" steps in a CD step group, even though they are typically listed under the "build" section.


### How can one access the AWS CDK provisioning in their workflow? Are there any feature flags required?

No, accessing AWS CDK provisioning does not require any Feature flags. However, to utilize AWS CDK provisioning steps in your workflow, ensure that you are operating within a containerized step group specifically designated for AWS CDK provisioning. These steps are only visible when adding a step within that particular step group. If no step is added within the AWS CDK provisioning containerized step group, the associated steps will not be visible.

For more information on AWS CDK provisioning, please refer to the following Harness [documentation](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/aws-cdk/).


### Can I use Plugin or Git Clone steps in Deploy or Custom stages?

Yes, you can add these steps in Containerized step groups in Deploy or Custom stages.


### Can I use any CI steps in a Containerized step group?

No. Only some step types are available in Containerized step groups.


### Where are steps in Containerized step groups executed?

They are executed on a separate pod created at runtime.

The pod is cleaned up after step group execution ends.


### Are separate pods created for each step in a Containerized step group?

No. Harness creates one pod for the containerized step group and runs all step containers in the group on that pod.


### Can I access files from a Containerized Step group in a subsequent Shell Script step?

No. Containerized step groups are isolated on a separate pod from other steps. Files generated in the containerized step group aren't available in outside steps.


### Can I run a Containerized step group on a self-managed VM or local infrastructure?

No, containerized step group can only run on Kubernetes infrastructure.


### Does the Containerized step group's command override CMD and/or ENTRYPOINT?

The step group's **Command** is overwritten the image's default entrypoint, if it has one.

If you want to run the entrypoint in addition to other commands, make sure the image doesn't have a default entry point, and then execute all the commands in the step group's **Command**.

### Does Harness's Slack integration notify on JIRA events awaiting approval?

No, the current Slack integration for Harness does not support notifications for JIRA approval events. It only works on specific pipeline events, which are available while configuring. None of these events are related to approval notifications.

Alternatively, you can set up a custom webhook trigger or configure a step group with two parallel stages (one with shell and one with approval). Once the process reaches the approval stage, the Shell step can contain the cURL call the webhook for notification.

### The Git Clone step is only available within a containerized step group that requires Kubernetes clusters. Is this the only way to use the Git Clone step?

The Git Clone step uses a containerized step group. If you are not using Kubernetes or similar infrastructure, then you can setup a shell script and clone it manually by using the Git CLI command.



## Jenkins Build step

### Why is my Jenkins job failing with a `500` error?
```
Error occurred while starting Jenkins task
org.apache.http.client.HttpResponseException: status code: 500, reason phrase: Server Error
```

This can happen if the Jenkins Job is parameterized but no parameters are being passed. The reverse, where the Jenkins Job is not parameterized but parameters are being passed, can also cause this issue. To fix this, please make sure that the proper parameters are being passed to Jenkins.

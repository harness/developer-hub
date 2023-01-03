---
title: What is a Harness Variable Expression?
description: Find a variable for most Harness settings and deployment information.
sidebar_position: 10
helpdocs_topic_id: 9dvxcegm90
helpdocs_category_id: 9lw749jubn
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness variable expressions are used to parameterize settings in your Harness components, create environment variables, and create templates that can be used by your team.

You can create your own variable expressions to pass information through your Pipeline, or use built-in expressions to reference most of the settings and deployment information in Harness.

For example, you can use an expression containing the variable name `account` to refer to account properties:

![](./static/variables-15.png)


## Overview

Harness includes two types of variables that you can use in expressions:

* **Harness built-in variables:** There are variables scoped to different entities—such as Applications, Services, Environments, and Workflows—and variables that provide information about deployment environments.
* **User-created variables:** You can create variables at the account level and application level, which can be used across your Harness applications. You can also create variables in Application entities, to be replaced by users when configuring or deploying a CD pipeline.

:::note
All expressions are evaluated immediately and use the `${}` delimiters. Harness uses the [Java Expression Language (JEXL)](http://commons.apache.org/proper/commons-jexl/) expression language to render variables.
:::
  
For information on passing variables from a Trigger to a Workflow, see [Passing Variables into Workflows from Triggers](../../../continuous-delivery/model-cd-pipeline/expressions/passing-variable-into-workflows.md).

To use a variable, you enter the variable name inside `${...}` expression. For example, to obtain the name of a Harness application, you would use the expression `${app.name}`.

Harness permits variables only within their scope. You will not see a variable available in a field where it cannot be used.Variables can be used with methods. For example, here is an object using the expression `${instance.hostName}`:


```
${instance.hostName.split('\.')[0]}
```
A split method is called with the argument **('\.')**, and the result is a Java array, returning the first item, **[0]**.

For more information, see [Objects and Functors](variables.md#objects-and-functors).

:::note 
Do not use hyphens (dashes) in variable names, as some Linux distributions and deployment-related software do not allow them.
:::

### JEXL and Java String API

JEXL supports all [Java String methods](https://docs.oracle.com/javase/8/docs/api/?java/lang/String.html). You can use these methods wherever you use expressions in Harness.

For example, here is an object using the expression `${instance.hostName}`:

```
${instance.hostName.split('\.')[0]}
```
A split method is called with the argument **('\.')**, and the result is a Java array, returning the first item, **[0]**.

You can manipulate strings just like you would in Java. Here's another example where JEXL is operating on a JSON data payload received from New Relic and the JAVA String `replaceAll()` method is applied:

```
ip-${instanceDetails.aws.ip.replaceAll("\\.","-")}.us-east-2.compute.internal
```
## Limitations

See [Variable Expression Limitations and Restrictions](variable-expression-name-restrictions.md).

## What Expressions Am I Already Using?

An easy way to see what expressions are already used in your deployments is to look at the Execution Context for each Workflow step:

1. In Harness, click **Continuous Deployment**.
2. Locate a deployment and open it.
3. Expand the deployment flowchart and then click any step in the deployment. You will see its details displayed.

   ![](./static/variables-16.png)

4. In the execution details, click the option button and click **View Execution Context**.

   ![](./static/variables-17.png)

The expressions used in that step are displayed.

![](./static/variables-18.png)

If an expression is too long to view, hover over it to see its full name.

Now you can reference those expressions elsewhere in your Workflow or Pipeline, in the set up of the Workflow, or in command such as Shell Script.

## Creating Custom Variables

You can create variables in Services and Workflows.

* [Service Configuration Variables](../../../continuous-delivery/model-cd-pipeline/setup-services/service-configuration.md#configuration-variables-and-files) are variables you can use in the manifests and specifications in your Service, and can be overwritten by [Service Variable Overrides](../../../continuous-delivery/model-cd-pipeline/environments/environment-configuration.md#override-a-service-configuration) in Environments.
* [Workflow Variables](../../../continuous-delivery/model-cd-pipeline/workflows/workflow-configuration.md#add-workflow-variables) let you add parameters to your Workflow that can be used throughout the Workflow. When the Workflow is deployed, values for the variables can be provided or required. Values can also be passed into the Workflow from Triggers. See [Passing Variables into Workflows and Pipelines from Triggers](../../../continuous-delivery/model-cd-pipeline/expressions/passing-variable-into-workflows.md).

Some Workflow commands let you publish their output as variables:

* [Jenkins](../../../continuous-delivery/model-cd-pipeline/workflows/using-the-jenkins-command.md)
* [Jira](../../../continuous-delivery/model-cd-pipeline/workflows/jira-integration.md#jira-issue-variables)
* [Shell Script](../../../continuous-delivery/model-cd-pipeline/workflows/capture-shell-script-step-output.md#using-shell-script-step)
* [HTTP](json-and-xml-functors.md)

Variables are also integrated into [Workflow Approval](../../../continuous-delivery/model-cd-pipeline/approvals/approvals.md#create-variable-workflow) and [Pipeline Approval](../../../continuous-delivery/model-cd-pipeline/approvals/approvals.md#approving-pipeline-stages-using-variables) steps.

## When are Variable Expressions Evaluated?

Variable expressions are resolved **before** the Bash or PowerShell script is run. Therefore, if you use one in a Bash comment, the variable expression is resolved and its value is displayed.

## What if Harness Can't Resolve an Expression?

If Harness cannot resolve an expression to a value, it simply outputs the expression itself.

## Built-in Variables

Harness includes many default (built-in) Harness variable expressions. This variables are frequently updated.

See [Built-in Variables List](built-in-variables-list.md).

## Account Default Variables

You can define account-wide variables that can be referenced by any Application and entity in your account.

Account Defaults are account-level variables available to all users logged into the account. To manage Account Defaults, you must be logged into Harness as a member of a group that has **Manage Account** permissions, such as the default **Account Administrator** group.

To create an Account Default variable, do the following:

1. Log into Harness, and then click **Setup**.
2. Click the More Options ⋮ menu next to **Account**, and then click **Account Defaults**.![](./static/variables-19.png)

   ![](./static/variables-20.png)

3. Click **Add Row**. A new row appears.![](./static/variables-21.png)

4. In **Name**, enter a name for the variable. Ensure that the name is descriptive, as users will be looking at a list of variable names and will need to distinguish between them.
5. In **Type**, select **STRING**.
6. In **Value**, enter the value for the variable. For example, if you added an Account Default variable for **productName**, the dialog would look like this:

   ![](./static/variables-22.png)

7. Click **SUBMIT**. The new variable is added.  
  
Now, let's reference the variable.

1. Open a Harness Application, and then open a Service, such as Docker or Pivotal Cloud Foundry (PCF) Service within that Application.
2. In the Service, under **Configuration**, click **Add Variable**. The **Config Variable** dialog appears.

   ![](./static/variables-23.png)

3. In **Value**, enter `${account.defaults}` to see the account variables displayed.

   ![](./static/variables-24.png)

4. Click the account variable name to enter it. It is entered as `${account.defaults.variable_name}`.

## Application Default Variables

When you create an Application in Harness, you can define Application-wide variables that can be referenced in any entity within the Application. For example, you might want to create an Application-wide variable for an approval.

See [Create a Default Application Directories and Variables](../../../continuous-delivery/model-cd-pipeline/applications/set-default-application-directories-as-variables.md).

## Secrets and Variables

You can create encrypted text items in Harness **Secrets Management**, and reference that the text using variables. For information on creating and managing secrets, see [Secrets Management](../../security/secrets-management/secret-management.md).

For example, you can add a username as an encrypted text item, named **Username**, and then reference it using the variable `${secrets.getValue("Username")}`.

By default, the `${secrets.getValue("var_name")}` is available in the Harness Applications listed in its **Usage Scope**. To make the secret available Account-wide, so that it can be used in a [Delegate Profile](../../account/manage-delegates/delegate-installation.md#delegate-profiles), you must select the **Scope to Account** option:

![](./static/variables-25.png)

For an extended example, see [Using Secrets in a Profile](../../account/manage-delegates/delegate-installation.md#using-secrets-in-a-profile).

## Service Config Variables

When you create variables in a Harness Service's **Config Variables** section, they can be referenced anywhere that Service is used in your Workflow. For more information, see [Add Service Config Variables](../../../continuous-delivery/model-cd-pipeline/setup-services/add-service-level-config-variables.md).

You reference the Service Config Variable using the `${serviceVariable.your_var_name}` format.

The Service Config Variables are added to your target hosts as Environment variables.

For example, if you have a Service Config Variable named **jarName**, Harness creates an environment variable name **jarName** that can be referenced in two ways:

* As a Service variable: `${serviceVariable.jarName}`. There is no escaping done by Harness.
* As an environment variable: `${jarName}`. Escaping is automatically done by Harness.

## Service Config Files

Files added in the **Config Files** section of a Service are referenced using the `configFile.getAsString("fileName")` Harness expression:

* `configFile.getAsString("fileName")` – Plain text file contents.
* `configFile.getAsBase64("fileName")` – Base64-encoded file contents.

For more information, see [Add Service Config Files](../../../continuous-delivery/model-cd-pipeline/setup-services/add-service-level-configuration-files.md).

## Objects and Functors

Anywhere that variables are allowed in Harness, methods using the variable are also allowed. Methods follow Java regex pattern format, and operators may be used in building expressions.

For example, here is an object using the variable, `${artifact.source.repositoryName}`:


```
${artifact.source.repositoryName.split('\.')[0]}
```
A split method is called with the argument **('\.')**, and the result is a Java array, returning the first item, **[0]**.

### Functors

Harness provides functors to enable you to map over a set of values. Harness provides a Regex and an AWS functor.

#### Regex Functor

The Regex Functor allows you to operate over variables using regular expressions.

For example, the following argument is a regular expression in Java regex format that extracts the first matching non-empty substring:


```
${regex.extract("[0-9]*", "build-webservices-3935-0.noarch.rpm")}
```
It resolves to **"3935"**. If there were no matching substring, it would resolve as an empty string.

The next argument uses operators to extract the substring and its iteration number:


```
${regex.extract("[0-9]+-[0-9]+", "build-webservices-3935-0.noarch.rpm")}
```
It resolves to **"3935-0"**.

For more functors, see [JSON and XML Functors](json-and-xml-functors.md).

#### AWS Functor

The AWS functor allows you to operate over complex objects returned from the AWS API.

For example, the following arguments use AWS Tags to find a tag with a particular key. In this example, the tags collection is:


```
{“Name”, “main-service”; “Environment”, “Green”}
```
The first argument resolves to an empty string because **find()** is case sensitive and the tag name is **"Name"**:


```
${aws.tags.find(host.ec2Instance.tags, 'name')}
```
The next argument finds the tag **Name** and resolves to **”main-service”**:


```
${aws.tags.find(host.ec2Instance.tags, 'Name')}
```
The last argument finds the key **Green**:


```
${aws.tags.find(host.ec2Instance.tags, Environment)}
```
#### Java StrSubstitutor

Harness also supports the Java [StrSubstitutor](https://commons.apache.org/proper/commons-lang/javadocs/api-3.1/org/apache/commons/lang3/text/StrSubstitutor.html) class for taking a piece of text and substituting all the variables within it. This can useful because it includes many static convenience methods for replacing variables.

## View Output in Deployments

The **Deployments** page in Harness Manager displays the output of any of the Harness built-in variables, or third-party API calls, that you use in its **Execution Context** panel.

### View Variable Output

Here is an example of the Harness variables in a Shell Script command in a Kubernetes Workflow:

![](./static/variables-26.png)
Here is the output of these variables displayed in the **Execution Context** panel:

![](./static/variables-27.png)
### View 3rd Party API Calls

To see the output from third-party API calls, you select a Verification Provider node, and then click **View 3rd Party API Calls** option:

![](./static/variables-28.png)
The **Third Party API Call History** window appears.

![](./static/variables-29.png)
Clicking the API call links displays the request and response for the call:

![](./static/variables-30.png)
### Install Command

Some Workflow commands contain a lot of variable output information. An example is the Install command:

![](./static/variables-31.png)
### Output History

Each deployment shows its own execution variable output. Rerunning the deployment does not overwrite the output. If you rerun a deployment, the old deployment contains its variable output, and the new deployment contains its new variable output.

![](./static/variables-32.png)
## See Also

* [Passing Variables into Workflows and Pipelines from Triggers](../../../continuous-delivery/model-cd-pipeline/expressions/passing-variable-into-workflows.md)
* [Triggers](../../../continuous-delivery/model-cd-pipeline/triggers/add-a-trigger-2.md)


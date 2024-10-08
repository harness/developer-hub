---
title: VM deployments using SSH
description: Deploy to any platform using SSH.
sidebar_position: 8
helpdocs_topic_id: mpx2y48ovx
helpdocs_category_id: c9j6jejsws
helpdocs_is_private: false
helpdocs_is_published: true
---
# VM deployments using SSH

You can use a Secure Shell (SSH) deployment type to deploy your artifacts to VM or bare-metal hosts located in Microsoft Azure, AWS, or any platform-agnostic Physical Data Center (PDC).

:::note

Many traditional deployments use runtime environments such as Tomcat or JBoss. Your target hosts should have these installed before deployment. You can use the Harness [Command](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step) step to install them in the same pipeline as your SSH deployment.

:::

## Deployment summary

An SSH deployment involves configuring the following:

1. Create a Harness Secure Shell service.
2. Set up a Harness connector to access your repository.
3. Define the target infrastructure for deployment.
   1. Add the Harness connector for the target infrastructure.
   2. Add the credentials needed to connect to target hosts.
4. Select the deployment strategy.
5. Run the pipeline and review.

## SSH stages

To start a SSH deployment, create a new pipeline and add a stage for **Secure Shell** deployments.

![](static/ssh-ng-169.png)

Next, you create the service, environment, and execution steps for the stage.

## SSH Services

SSH Services define the artifact you want to deploy and any config files you want to use.

In the stage **Service** tab, you add the artifact metadata and the related config files to execute on the target hosts.

### Create a Harness Secure Shell service

1. For **Select Service**, select **New Service,** enter a name for the service.
2. For **Service Definition**, in **Deployment Type**, select **Secure Shell**.

### Add the artifact connector

For Secure Shell, you can access artifacts from the following sources:
- Jenkins
- Artifactory
- Bamboo 
- Amazon S3
- Amazon ECR
- Nexus2
- Azure Artifacts
- GCR
- ACR
- Docker Registry (platform-agnostic)
- Custom. If you select **Custom**, you will need to provide a Bash script.

The supported artifact package types include Docker, JAR, TAR, WAR, RPM and ZIP.

Harness includes connectors for all the major artifact repositories. In this example, we will use Artifactory and a publicly available artifact.

1. In **Artifacts**, select **Add Primary Artifact**.
2. In **Specify Artifact Repository Type**.

   <DocImage path={require('./static/911d27b9753c2eee8709a32910a80cf2ce42605db121b3067f2ddc4b2cd0be0e.png')} width="60%" height="60%" title="Select to view full size image" />

   1. As an example, select **Artifactory** and select **Continue**. You can use another artifact repo if you like.
3. For the Artifactory Connector, select **New Artifactory Connector**.
4. In **Name**, enter a name for the connector and select **Continue**.
5. In **Details**, enter the the following URL path for **Artifactory Repository URL**: `https://harness.jfrog.io/artifactory`. In this example, we will use the artifacts stored in that repository.
6. For **Authentication**, select **Anonymous** and select **Continue**.
   
   ![](static/ssh-ng-170.png)

7. Select **Continue** to connect with Artifactory by using a Harness Delegate.
8. In **Delegates Setup**, select **Connect through the Harness Platform**.
9.  Select **Save and Continue**.
10. In **Connection Test**, Harness validates authentication and permissions for the repo.
11. Select **Continue**.

![](static/ssh-ng-171.png)


### Set up artifact location and details

For this example, we'll use a publicly available **ToDo List** app artifact, **todolist.war**, available in a public Harness Artifactory repo.

In **Artifact Details**, enter the following:

1. In **Artifact Source Name**, enter **Todolist**.
2. In **Repository Format**, keep the default value **Generic**.
3. For **Repository**, enter: **todolist-tutorial**. Note that if you select **Repository**, Harness loads any available repositories and displays them for selection.
4. In **Artifact Directory**, enter a forward slash **/**.
5. In **Artifact Details**, keep the default **Value**.
6. In **Artifact Path**, leave the default Runtime Input value **\<+input>** for that field. 
7. Select **Submit.**

   ![](static/ssh-ng-172.png)

   The artifact is added to your service.

   ![](static/ssh-ng-173.png)

8. Select **Save**. The Service is added to your stage.
9.  Select **Continue** to set up the target Environment.


## Define the target infrastructure

You define the target infrastructure for your deployment in the **Environment** settings of the pipeline stage. You can define an environment separately and select it in the stage, or create the environment within the stage **Environment** tab.

There are two methods of specifying the deployment target infrastructure:

- **Pre-existing**: the target infrastructure already exists and you simply need to provide the required settings.
- **Dynamically provisioned**: the target infrastructure will be dynamically provisioned on-the-fly as part of the deployment process.

For details on Harness provisioning, go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview).

### Selecting hosts

When you set up the Infrastructure Definition for the stage, there are three options for selecting the target hosts:

- **Specify hosts**
- **Select preconfigured hosts from Physical Data Center**
- **Map Dynamically Provisioned Infrastructure**

The **Specify hosts** or **Select preconfigured hosts from Physical Data Center** options are used when you are deploying to a pre-existing infrastructure.

The **Map Dynamically Provisioned Infrastructure** option is used when your are deploying to a dynamically provisioned infrastructure.

:::note

Write down hosts as a comma separated list. 

:::

### Pre-existing infrastructure

Let's look at an example of setting up an Infrastructure Definition for a pre-existing infrastructure.

1. In **Specify Environment**, select/create an environment. 
2. In the environment, in **Specify Infrastructure**, select **New infrastructure**.
3. Enter a name for the new infrastructure.
4. For **Select Infrastructure Type**, select where you want to deploy. For this example, we'll use **Physical Data Center**.
   1. Keep the default selection, **Physical Data Center**.
   
   ![](static/ssh-ng-174.png)

#### Targetting Specific Hosts for Deployment

Users can pass in specific Host IPs to perform deployment in the SSH Infrastructure Definition. When your deployment stage deploys an Secure Shell (SSH) Service or Windows Remote Management (WinRM) using an Infrastructure Definition of deployment type SSH or WinRM, you can select target hosts that were not selected in the Stage's Infrastructure Definition. Harness will present a dropdown in the Pipeline Run form with the queried list of host names.

##### Demo Video

<DocVideo src="https://www.loom.com/share/934229d83f9d44b6ab4dd83ba1abf607?sid=c05c8a9d-5f27-40cb-a654-c7ece7a0d74e" />


```yaml
infrastructureDefinition:
  name: aws-ssh-infra
  identifier: awssshinfra
  orgIdentifier: default
  projectIdentifier: alexctest
  environmentRef: qasetup
  deploymentType: Ssh
  type: SshWinRmAws
  spec:
    credentialsRef: qasetupcredentials
    connectorRef: qasetupconnector
    region: us-east-1
    awsInstanceFilter:
      vpcs:
        - vpc-c20f38b9
      tags:
        type: ssh
    hostConnectionType: PublicIP
    instanceType: Aws
    targetedHosts: <+input> ## This will be provided at runtime. 
  allowSimultaneousDeployments: false
```

**Limitation**
- `instance.name` has the same value as `instance.hostName`. Both are available for backward compatibility.
- Only supported with AWS & Azure infrastructure, target to specific hosts already uses the same permissions as before, no new API call required.

 


#### Create the PDC connector for the hosts

1. In **Infrastructure Definition**, for **Connector**, select **Select Connector** to create the Connector for the PDC.
2. In **Create or Select an Existing Connector**, select **New Connector**.
3.  In **Physical Data Center**, enter a name for this connector, such as **PDC-Connector**.
4.  Select **Continue**.
5.  In **Details**, keep the default for **Manually enter host names** and enter the hostname(s) for the target instance(s).
6.  Select **Continue**.
7.  In **Delegates Setup**, keep the default for **Use any available Delegate**. 
8.  Select **Save and Continue**. Harness validates connectivity for the PDC connector.
9.  Select **Finish**. The Infrastructure Definition is updated with the PDC Connector.
  
![](static/ssh-ng-179.png)


#### Use an SSH credential for authenticating to the target hosts

You can use an SSH Key or Kerberos for authenticating to the target host(s). In this example, we will use an SSH Key.

1. In **Specify Credentials**, select **Create or Select a Secret**.
2. In **Create or Select an Existing Secret**, select **New SSH Credential**.
3. In **SSH Details**, for **Name**, enter a name for this SSH Credential and select **Continue**.
4. In **Configuration and Authentication**, there are three authentication options. In this example, we will use **Username/SSH Key**. Select the down-drop menu and select **Username/SSH Key**.
5. Enter a username, such as **ec2-user**.
   
   :::tip
   
   Always use **ec2-user** for EC2 instances.
   
   :::
6. For **Select or create a SSH Key**, select **Create or Select a Secret**.
7. in **Create or Select an Existing Secret**, select **New Secret File**.
8. in **Add new Encrypted File**, enter a name for **Secret Name**, such as **ssh-key-name**. This is the name you will use to reference this file.
9.  For **Select File**, select **Browse**. On your machine, select the secret file that you downloaded from your instance (for EC2, use the .pem file). 
10. Select **Save**.
11. In **Configuration and Authentication**, keep the default values for **Passphrase** and **SSH port**. Select **Save and Continue**.
12. In **Verify Connection**, enter the hostname for the instance in the **Add a Host Name to start verification** field and select **Connection Test**.
13. The Secure Shell connection to the instance is tested. Select **Finish**. Select **Continue**.
    
    You can use the **Preview Hosts** section to test the connection at any time.
    
14. Select **Save**.
15. Back in **Environment**, select **Continue**.

Next, you'll select the deployment strategy for this stage, the package type, and the number of instances to deploy on.

### Dynamically provisioned infrastructure

Here is a summary of the steps to dynamically provision the target infrastructure for a deployment:

1. **Add dynamic provisioning to the CD stage**:
   1. In a Harness Deploy stage, in **Environment**, enable the option **Provision your target infrastructure dynamically during the execution of your Pipeline**.
   2. Select the type of provisioner that you want to use.
   
      Harness automatically adds the provisioner steps for the provisioner type you selected.
   3. Configure the provisioner steps to run your provisioning scripts.
   4. Select or create a Harness infrastructure in **Environment**.
2. **Map the provisioner outputs to the Infrastructure Definition**:
   1. In the Harness infrastructure, enable the option **Map Dynamically Provisioned Infrastructure**.
   2. Map the provisioning script/template outputs to the required infrastructure settings.

#### Supported provisioners

The following provisioners are supported for SSH deployments:

- Terraform
- Terragrunt
- Terraform Cloud
- CloudFormation
- Azure Resource Manager (ARM)
- Azure Blueprint
- Shell Script

#### Adding dynamic provisioning to the stage

To add dynamic provisioning to a Harness pipeline Deploy stage, do the following:

1. In a Harness Deploy stage, in **Environment**, enable the option **Provision your target infrastructure dynamically during the execution of your Pipeline**.
2. Select the type of provisioner that you want to use.
   
   Harness automatically adds the necessary provisioner steps.
3. Set up the provisioner steps to run your provisioning scripts.

For documentation on each of the required steps for the provisioner you selected, go to the following topics:

- Terraform:
  - [Terraform Plan](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step)
  - [Terraform Apply](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step)
  - [Terraform Rollback](/docs/continuous-delivery/cd-infrastructure/terraform-infra/rollback-provisioned-infra-with-the-terraform-rollback-step). To see the Terraform Rollback step, toggle the **Rollback** setting.
- [Terragrunt](/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos)
- [Terraform Cloud](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-cloud-deployments)
- CloudFormation:
  - [Create Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-with-the-cloud-formation-create-stack-step)
  - [Delete Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/remove-provisioned-infra-with-the-cloud-formation-delete-step)
  - [Rollback Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/rollback-provisioned-infra-with-the-cloud-formation-rollback-step). To see the Rollback Stack step, toggle the **Rollback** setting.
- [Azure Resource Management (ARM)](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning)
- [Azure Blueprint](/docs/continuous-delivery/cd-infrastructure/azure-blueprint-provisioning)
- [Shell Script](/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning)


#### Mapping provisioner output

Once you set up dynamic provisioning in the stage, you must map outputs from your provisioning script/template to specific settings in the Harness Infrastructure Definition used in the stage.

1. In the same CD Deploy stage where you enabled dynamic provisioning, select or create (**New Infrastructure**) a Harness infrastructure.
2. In the Harness infrastructure, in **Select Infrastructure Type**, select **Physical Data Center**, **Azure**, or **AWS**.
3. In **Select Hosts/Azure/Amazon Web Services Infrastructure Details**, enable the option **Map Dynamically Provisioned Infrastructure**.
   
   A **Provisioner** setting is added and configured as a runtime input.
4. Map the provisioning script/template outputs to the required infrastructure settings.

To provision the target deployment infrastructure, Harness needs specific infrastructure information from your provisioning script. You provide this information by mapping specific Infrastructure Definition settings in Harness to outputs from your template/script.

For SSH infrastructures, Harness needs the following settings mapped to outputs:

- Physical Data Center (PDC):
  - **Host Array Path**
  - **Host Data Mapping**: you should map outputs for all of the necessary connection information. For example, if the VM(s) on a cloud platform:
    - hostname
    - privateIp
    - subnetId
    - region
- Azure:
  - **Subscription Id**
  - **Resource Group**
  - **Tag** (optional)
- AWS:
  - **Region**
  - **Tag** (optional)

:::note

Ensure the mapped settings are set to the **Expression** option.

:::

#### Host Array Path

For SSH PDC deployments, you use the expression `<+provisioner.OUTPUT_NAME>` for the **Host Array Path** setting. 

For the subsequent **Host Data Mapping** key-value pairs, you use the expression format `<+HOST_PROPERTY>`. For example, `<+public_dns>`.

Here's an example:

![picture 1](static/8722541e819fd752abc35693bd00e38cca2bce5df264afa89cbf61288fbc0604.png)  


#### Example

Here's a snippet of a Terraform script that provisions the infrastructure for an AWS EC2 VM SSH deployment and includes the required outputs for Physical Data Center:

```json

provider "aws" {
  region = "us-east-1"  # Replace with your desired AWS region
}

resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "example" {
  vpc_id            = aws_vpc.example.id
  cidr_block        = "10.0.1.0/24"
}

resource "aws_security_group" "example" {
  name_prefix = "example-"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.example.id
  vpc_security_group_ids = [aws_security_group.example.id]

  tags = {
    Name = "ExampleInstance"
  }
}

output "hostname" {
  value = aws_instance.example.public_dns
}

output "privateIp" {
  value = aws_instance.example.private_ip
}

output "subnetId" {
  value = aws_subnet.example.id
}

output "region" {
  value = provider.aws.region
}

```


In the Harness Infrastructure Definition, you map outputs to their corresponding settings using expressions in the format `<+provisioner.OUTPUT_NAME>`, such as `<+provisioner.region>`.

<figure>

<DocImage path={require('./static/8722541e819fd752abc35693bd00e38cca2bce5df264afa89cbf61288fbc0604.png')} width="60%" height="60%" title="Click to view full size image" />

<figcaption>Figure: Mapped outputs</figcaption>
</figure>

#### Reference mapped instance properties

Once you have mapped provisioning script outputs to the stage Infrastructure Definition, you can reference them in **Execution** of the stage.

To reference a mapped output, you use an expression in the format `<+instance.properties.*>`.

For example, here are some **Host Data Mapping** *keys* and expressions that reference them:

- hostname: `<+instance.properties.hostname>`
- privateIp: `<+instance.properties.privateIp>`
- subnetId: `<+instance.properties.subnetId>`
- region: `<+instance.properties.region>`


## SSH Executions

In **Execution**, Harness automatically adds the steps required to deploy the service to the environment according to the deployment strategy you select.

The **Execution Strategies** supported for Secure Shell include **Blank Canvas**, **Basic**, **Rolling**, and **Canary**. Let's look at Basic.

### Basic deployments

1. In **Execution Strategies**, select **Basic**. Typically, you use basic when deploying to one host and rolling or canary for multiple hosts.
2. For **Package type**, select **WAR**.
3. Select **Use Strategy**. Harness adds the **Deploy** step for execution.
4. Select the **Deploy** step. Here is where you add the scripts for your package. We'll use the defaults for this example. So, we'll simply copy the artifact to the target host.
   
   ![](static/ssh-ng-189.png)

5. In **Command Scripts**, edit **Copy Config**.
6. In **Edit Command**, for **Select file type to copy**, select **Artifact**.
   
   ![](static/ssh-ng-190.png)

7. Select **Save**.
8. **Review Looping Strategy:** the looping strategy repeats deployments for multiple hosts and for different deployment strategies (Basic, Rolling, Canary).
	1. Select **Advanced**.
	2. Select **Looping Strategy**. You can see that the step will be repeated for all hosts using the `<+stage.output.hosts>` expression.  
	For example, if you had two hosts the step would be repeated for each host.
  
  ![](static/ssh-ng-191.png)

9.  Select **Apply Changes**.
10. When you're done, select **Save** to publish the Pipeline.


## Deploy and review

Let's look at an example SSH deployment.

1. Select **Run** to run the pipeline.
2. In **Run Pipeline**, for **Primary Artifact**, select **Todolist**.
3. In **Artifact Path**, Harness displays a list of available artifact packages.
4. Select **todolist.war**.
   
   ![](static/ssh-ng-192.png)

5. Select **Run Pipeline**. Harness runs the pipeline and the **Console View** displays the tasks executed for each step.

### Review deployment

Let's review what is happening in the Deploy step. Most sections correspond to the commands you can see in the Deploy step.

1. **Initialize:** initialize the connection to the host(s) and create a temp directory for the deployment.
2. **Setup Runtime Paths:** create folders for runtime, backup, and staging.
3. **Copy Artifact:** copy the artifact to the host.
4. **Copy Config:** copy the config files (if any) to the host.
5. **Cleanup:** remove temp directories.

```
Initialize  
  
Initializing SSH connection to ec2-54-201-142-249.us-west-2.compute.amazonaws.com ....  
Connecting to ec2-54-201-142-249.us-west-2.compute.amazonaws.com ....  
Connection to ec2-54-201-142-249.us-west-2.compute.amazonaws.com established  
Executing command mkdir -p /tmp/aCy-RxnYQDSRmL8xqX4MZw ...  
Command finished with status SUCCESS  
Initializing SSH connection to ec2-54-201-142-249.us-west-2.compute.amazonaws.com ....  
Connecting to ec2-54-201-142-249.us-west-2.compute.amazonaws.com ....  
  
Setup Runtime Paths  
  
Initializing SSH connection to ec2-54-201-142-249.us-west-2.compute.amazonaws.com ....  
Connecting to ec2-54-201-142-249.us-west-2.compute.amazonaws.com ....  
Connection to ec2-54-201-142-249.us-west-2.compute.amazonaws.com established  
Executing command...  
Command finished with status SUCCESS  
  
Copy Artifact  
  
Filename contains slashes. Stripping off the portion before last slash.  
Got filename: todolist.war  
Connecting to ec2-54-201-142-249.us-west-2.compute.amazonaws.com ....  
Connection to ec2-54-201-142-249.us-west-2.compute.amazonaws.com established  
Begin file transfer todolist.war to ec2-54-201-142-249.us-west-2.compute.amazonaws.com:/home/ec2-user/tutorial-service-ssh2/ssh-tutorial-env  
File successfully transferred to ec2-54-201-142-249.us-west-2.compute.amazonaws.com:/home/ec2-user/tutorial-service-ssh2/ssh-tutorial-env  
Command finished with status SUCCESS  
  
Copy Config  
  
Filename contains slashes. Stripping off the portion before last slash.  
Got filename: todolist.war  
Connecting to ec2-54-201-142-249.us-west-2.compute.amazonaws.com ....  
Connection to ec2-54-201-142-249.us-west-2.compute.amazonaws.com established  
Begin file transfer todolist.war to ec2-54-201-142-249.us-west-2.compute.amazonaws.com:/home/ec2-user/tutorial-service-ssh2/ssh-tutorial-env  
File successfully transferred to ec2-54-201-142-249.us-west-2.compute.amazonaws.com:/home/ec2-user/tutorial-service-ssh2/ssh-tutorial-env  
Command finished with status SUCCESS  
  
Cleanup  
  
Initializing SSH connection to ec2-54-201-142-249.us-west-2.compute.amazonaws.com ....  
Connecting to ec2-54-201-142-249.us-west-2.compute.amazonaws.com ....  
Connection to ec2-54-201-142-249.us-west-2.compute.amazonaws.com established  
Executing command rm -rf /tmp/aCy-RxnYQDSRmL8xqX4MZw ...  
Command finished with status SUCCESS
```
Congratulations! You have now successfully created and completed the steps for running a pipeline by using Secure Shell.

## Permission to perform SSH Deployments in AWS

We use the SSH Credentials to connect to hosts to perform deployment.

We use the AWS Connector to retrieve instances from the AWS Account. The specific calls we make:

- Retrieve the instances at runtime during the infrastructure step - [DescribeInstanceRequest](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html)
- Retrieve the instances during instance sync to show service instances in the service - [DescribeInstanceRequest](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html)

To use describe instance API, the action is `ec2:DescribeInstances`

Per AWS documentation: Example policies for working with the AWS CLI or an AWS SDK - [Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ExamplePolicies_EC2.html)


## Notes

### Selecting multiple hosts

You can add multiple hosts in the Physical Data Center Connector:

![](static/ssh-ng-193.png)

During deployment, you'll see each host listed in the loop:

![](static/ssh-ng-194.png)

### Looping strategies for each deployment strategy

:::note

Only the Repeat Looping strategy is supported by the Command step. Also, only the `items` parameter is supported when running the Command step on multiple target hosts:

```yaml
repeat:  
  items: <+stage.output.hosts>
```

:::

The Repeat looping strategy is used differently for the basic, rolling, and canary deployment types.

The looping strategy is automatically added to the **Deploy** step and configured for the deployment type you selected:

![](static/ssh-ng-195.png)

Let's look how it's used for different deployment types.

#### Basic

The looping strategy for the basic deployment simply repeats the deployment on all the target hosts.

```yaml
repeat:  
  items: <+stage.output.hosts>
```

#### Rolling

For a rolling strategy, you specify how many instances you want to deploy per phase.

Let’s say you have 10 target hosts in the stage **Infrastructure Definition** and you want to have 3 instances per phase. 

In **Instances**, you would enter 3. 

As a result, when execution starts there will be 4 phases: 3, 3, 3, 1. The number of instances per phase can be provided as a count or a percentage.

This is an example of the rolling strategy using 2 hosts with 50% in **Instances**.

![](static/ssh-ng-196.png)

This means, that Harness will roll out to 50% of target hosts first, and then the remaining 50% if the first 50% were successful.

Harness creates 2 phases.

![](static/ssh-ng-197.png)

You can add any Approval steps inside the Phase Group. For more information, go to [Approvals](/docs/category/approvals).

The looping strategy for the first phase deploys to 50% of the hosts (partitions):

```yaml
repeat:  
  items: <+stage.output.hosts>  
  maxConcurrency: 1  
  partitionSize: 50  
  unit: Percentage
```

The looping strategy for the second phase repeats the partition count:

```yaml
repeat:  
  items: <+repeat.partition>
```

The `<+repeat.partition>` expression resolves how many instances (`items`) to iterate over per one partition (phase).

Let’s say we have 10 hosts and 4 partitions organized as 3, 3, 3, 1. The first partition includes 3 hosts, the second and third each have 3, and the last one has 1 host.

So, partition1 = host1, host2, host3, partition2 = host4, host5, host6, partition3 = host7, host8, host9, and partition4 = host10.

#### Canary

For canary strategies, Harness calculates phase instances based on the number of hosts and the number of requested instances per phase.

Let’s say you have 10 hosts and you add 2 phases with 50% and 100%. This means Harness deploys on 5 instances in the first phase and on the rest of the instances in the second phase.

Here is an example of the Canary strategy using 2 hosts and 2 phases. The first phase deploys to 50% and the second phase deploys to 100%.

![](static/ssh-ng-198.png)

This means, that Harness will roll out to 50% of target hosts first, and then the remaining 50% if the first 50% were successful.

Harness creates 2 phases as step groups.

![](static/ssh-ng-199.png)

You can add any Approval steps between the Step Groups. See [Adding ServiceNow Approval Steps and Stages](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages), [Adding Jira Approval Stages and Steps](/docs/platform/approvals/adding-jira-approval-stages), and [Adding ServiceNow Approval Steps and Stages](/docs/platform/approvals/service-now-approvals).

The Looping Strategy for the first Phase selects 50% of the target hosts:

```yaml
repeat:  
  items: <+stage.output.hosts>  
  start: 0  
  end: 50  
  unit: Percentage
```

The Looping Strategy for the second Phase starts at the 50% from the first phase and continues to 100%:

```
repeat:  
  items: <+stage.output.hosts>  
  start: 50  
  end: 100  
  unit: Percentage
```


### Reference hosts in steps using expressions

You can use all of the `<+instance...>` expressions to reference your hosts.

For Microsoft Azure, AWS, or any platform-agnostic Physical Data Center (PDC):

* `<+instance.hostName>`
* `<+instance.host.hostName>`
* `<+instance.name>`

For Microsoft Azure or AWS:

* `<+instance.host.privateIp>`
* `<+instance.host.publicIp>`

### Rollback
Harness restores the state of deployment to the pipeline's previous successful stage execution based on `serivce`, `enviroment` and `infrastucture` details.
Harness records the artifact version that was successfully deployed during previous successful executions. When using the Rollback step's Copy Artifact command unit, Harness copies the last successful version of the artifact deployed via Harness to the remote host.

#### First time deployment
If the first pipeline execution fails (regardless of stage), Harness skips the rollback since there is no record of any successful pipeline execution.

#### N+1 time deployment
In case of stage failures in subsequent executions ((Assuming the service, environment, infrastructure didn't changed in the corresponding stage)), Harness initiates rollback to the previous successful pipeline. The previous pipeline execution must be successful for all stages.  The successful stage is matched regardless of the pipeline execution status.

:::note

* If any of the `service`, `environment`, or `infrastructure` details were changed in the stage, Harness won't consider any previous successful pipeline executions for rollback. It is treated as a completely different deployment.
* In case of multiple stages referencing the same `service`, `environment`, and `infrastructure` details, Harness will rollback the deployment to last successful pipeline with stage execution that shared the same `service`, `environment`, and `infrastructure`.

:::

For more details, go to [Use Harness expressions](/docs/platform/variables-and-expressions/harness-variables/).

## FAQs

For frequently asked questions about traditional deployments in Harness, go to [SSH and WinRM deployment FAQs](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-winrm-faqs).


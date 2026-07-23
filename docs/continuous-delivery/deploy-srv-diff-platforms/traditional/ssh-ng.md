---
title: VM deployments using SSH
sidebar_label: VM Deployments Using SSH
description: Deploy artifacts to virtual machine or bare-metal hosts on any platform using Secure Shell (SSH).
sidebar_position: 8
keywords:
  - SSH deployment
  - Secure Shell
  - Physical Data Center
  - VM deployment
  - traditional deployment
  - looping strategy
tags:
  - continuous-delivery
  - ssh
  - traditional-deployment
helpdocs_topic_id: mpx2y48ovx
helpdocs_category_id: c9j6jejsws
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use a Secure Shell (SSH) deployment type to deploy your artifacts to virtual machine (VM) or bare-metal hosts. These hosts can be in Microsoft Azure, Amazon Web Services (AWS), or any platform-agnostic Physical Data Center (PDC). This topic walks you through building an SSH deployment in Harness Continuous Delivery (CD), from the service and target infrastructure to the deployment strategy and rollback behavior.

:::info Runtime environments

Many traditional deployments use runtime environments such as Tomcat or JBoss. Your target hosts should have these installed before deployment. You can use the Harness [Command step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step) to install them in the same pipeline as your SSH deployment.

:::

---

## What will you learn in this topic?

- How to [create a Secure Shell service](#ssh-services) and add an artifact source.
- How to [define the target infrastructure](#define-the-target-infrastructure) with pre-existing or dynamically provisioned hosts.
- How to configure Basic, Rolling, and Canary [executions](#ssh-executions) and their [looping strategies](#looping-strategies-for-each-deployment-strategy).
- How to [skip already-deployed hosts](#selective-rerun-and-skip-hosts-with-the-same-artifact), [control deployments after a host failure](#control-deployments-after-a-host-failure), and [roll back a deployment](#rollback).

---

## Deployment summary

An SSH deployment involves configuring the following:

1. Create a Harness Secure Shell service.
2. Set up a Harness connector to access your repository.
3. Define the target infrastructure for deployment.
   1. Add the Harness connector for the target infrastructure.
   2. Add the credentials needed to connect to target hosts.
4. Select the deployment strategy.
5. Run the pipeline and review.

:::info OIDC-enabled AWS connector

You can use SSH with an OpenID Connect (OIDC)-enabled AWS connector, but it requires Delegate version `854xx` or later. Go to the [AWS connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference) to configure the connector.

:::

---

## SSH stages

To start an SSH deployment, create a new pipeline and add a stage for **Secure Shell** deployments.

<div align="center">
  <DocImage path={require('./static/ssh-ng-169.png')} width="60%" height="60%" alt="Add a Secure Shell deployment stage to a new pipeline" title="Click to view full size image" />
</div>

Next, you create the service, environment, and execution steps for the stage.

---

## SSH services

SSH services define the artifact you want to deploy and any config files you want to use.

In the stage **Service** tab, you add the artifact metadata and the related config files to execute on the target hosts.

### Create a Harness Secure Shell service

Perform the following steps to create the service:

1. For **Select Service**, select **New Service**, and enter a name for the service.
2. For **Service Definition**, in **Deployment Type**, select **Secure Shell**.

### Add the artifact connector

For Secure Shell, you can access artifacts from the following sources:

- [Harness Artifact Registry](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#harness-artifact-registry) (Docker artifact type only)
- Jenkins
- Artifactory
- Bamboo
- Amazon S3
- Amazon Elastic Container Registry (ECR)
- Nexus2
- Azure Artifacts
- Google Container Registry (GCR)

  :::warning GCR deprecation

  Google Container Registry (GCR) is being deprecated. Go to the [deprecation notice](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#google-container-registry-gcr) to review the details.

  :::

- Azure Container Registry (ACR)
- Docker Registry (platform-agnostic)
- Custom. If you select **Custom**, you must provide a Bash script.

The supported artifact package types include Docker, JAR, TAR, WAR, RPM, and ZIP.

Harness includes connectors for all the major artifact repositories. This example uses Artifactory and a publicly available artifact.

Perform the following steps to add the artifact connector:

1. In **Artifacts**, select **Add Primary Artifact**.
2. In **Specify Artifact Repository Type**, select the repository type.

   <div align="center">
     <DocImage path={require('./static/911d27b9753c2eee8709a32910a80cf2ce42605db121b3067f2ddc4b2cd0be0e.png')} width="60%" height="60%" alt="Specify the artifact repository type" title="Click to view full size image" />
   </div>

   As an example, select **Artifactory** and select **Continue**. You can use another artifact repository if you prefer.
3. For the Artifactory Connector, select **New Artifactory Connector**.
4. In **Name**, enter a name for the connector and select **Continue**.
5. In **Details**, enter the following URL path for **Artifactory Repository URL**: `https://harness.jfrog.io/artifactory`. This example uses the artifacts stored in that repository.
6. For **Authentication**, select **Anonymous** and select **Continue**.

   <div align="center">
     <DocImage path={require('./static/ssh-ng-170.png')} width="60%" height="60%" alt="Configure anonymous authentication for the Artifactory connector" title="Click to view full size image" />
   </div>

7. Select **Continue** to connect with Artifactory by using a Harness Delegate.
8. In **Delegates Setup**, select **Connect through the Harness Platform**.
9. Select **Save and Continue**.
10. In **Connection Test**, Harness validates authentication and permissions for the repository.
11. Select **Continue**.

<div align="center">
  <DocImage path={require('./static/ssh-ng-171.png')} width="60%" height="60%" alt="Connection test for the Artifactory connector" title="Click to view full size image" />
</div>

### Set up artifact location and details

This example uses a publicly available **ToDo List** app artifact, **todolist.war**, available in a public Harness Artifactory repository.

In **Artifact Details**, perform the following steps:

1. In **Artifact Source Name**, enter **Todolist**.
2. In **Repository Format**, keep the default value **Generic**.
3. For **Repository**, enter **todolist-tutorial**. If you select **Repository**, Harness loads any available repositories and displays them for selection.
4. In **Artifact Directory**, enter a forward slash **/**.
5. In **Artifact Details**, keep the default **Value**.
6. In **Artifact Path**, leave the default runtime input value `<+input>` for that field.
7. Select **Submit**.

   <div align="center">
     <DocImage path={require('./static/ssh-ng-172.png')} width="60%" height="60%" alt="Enter the artifact details for the Todolist artifact" title="Click to view full size image" />
   </div>

   The artifact is added to your service.

   <div align="center">
     <DocImage path={require('./static/ssh-ng-173.png')} width="60%" height="60%" alt="Artifact added to the Secure Shell service" title="Click to view full size image" />
   </div>

8. Select **Save**. The service is added to your stage.
9. Select **Continue** to set up the target environment.

---

## Define the target infrastructure

You define the target infrastructure for your deployment in the **Environment** settings of the pipeline stage. You can define an environment separately and select it in the stage, or create the environment within the stage **Environment** tab.

There are two methods of specifying the deployment target infrastructure:

- **Pre-existing:** The target infrastructure already exists and you provide the required settings.
- **Dynamically provisioned:** The target infrastructure is dynamically provisioned as part of the deployment process.

Go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview) to understand Harness provisioning.

### Select hosts

When you set up the Infrastructure Definition for the stage, there are three options for selecting the target hosts:

- **Specify hosts**
- **Select preconfigured hosts from Physical Data Center**
- **Map Dynamically Provisioned Infrastructure**

Use **Specify hosts** or **Select preconfigured hosts from Physical Data Center** when you deploy to a pre-existing infrastructure. Use **Map Dynamically Provisioned Infrastructure** when you deploy to a dynamically provisioned infrastructure.

:::info comma-separated hosts

Enter hosts as a comma-separated list.

:::

### Filter hosts by attributes

This setting is available when you pick **Select preconfigured hosts from Physical Data Center** under **Select hosts** and select **Filter by host attributes**.

You can control whether multiple host-attribute filters are combined with **OR (match any)** or **AND (match all)** logic:

- **Any (default):** A host is selected if at least one filter condition matches. This is the existing behavior.
- **All:** A host is selected only if every filter condition matches.

For **Specific Attribute**, you specify the condition that the match criteria is checked against. You can specify attributes such as region, type, and name.

Under **Preview Hosts**, you can see which hosts match the condition.

<div align="center">
  <DocImage path={require('./static/pdc-specify-host.png')} width="60%" height="60%" alt="Preview hosts that match the host attribute filter" title="Click to view full size image" />
</div>

<details>
<summary>Example of how filtering hosts by attributes works</summary>

Suppose you have two hosts specified in your physical data center:

```json
// Host-1
{
  "hostname": "ec2-00-00-01.compute-1.amazonaws.com",
  "hostAttribute": {
    "region": "us-east-1",
    "name": "node-1"
  }
}

// Host-2
{
  "hostname": "ec2-00-00-02.compute-1.amazonaws.com",
  "hostAttribute": {
    "region": "us-west",
    "name": "node-5"
  }
}
```

Scenario 1: `matchCriteria: ALL`

**YAML example for `matchCriteria: ALL`**

```yaml
infrastructureDefinition:
  name: pdc
  identifier: pdc
  orgIdentifier: default
  projectIdentifier: project_id
  environmentRef: env_id
  deploymentType: Ssh
  type: Pdc
  spec:
    connectorRef: abc
    credentialsRef: credentials_ref
    hostFilter:
      type: HostAttributes
      spec:
        value:
          region: us-east-1
          name: node-1
        matchCriteria: ALL
  allowSimultaneousDeployments: false
```

- **matchCriteria: ALL** means that **both** conditions must be true for the host to be selected (both `region=us-east-1` **and** `name=node-1`).

**Host-1**
- `region`: us-east-1 (matches)
- `name`: node-1 (matches)

**Selected**: Host-1 meets both conditions, so it **matches**.

**Host-2**
- `region`: us-west (does not match `us-east-1`)
- `name`: node-5 (does not match `node-1`)

**Not Selected**: Host-2 does not meet **both** conditions, so it **does not match**.

**Summary for `ALL`**:
- **Host-1** is selected because both `region` and `name` match.
- **Host-2** is not selected because neither `region` nor `name` match.

---

Scenario 2: `matchCriteria: ANY`

**YAML example for `matchCriteria: ANY`**

```yaml
infrastructureDefinition:
  name: pdc
  identifier: pdc
  orgIdentifier: default
  projectIdentifier: project_id
  environmentRef: env_ref
  deploymentType: Ssh
  type: Pdc
  spec:
    connectorRef: abc
    credentialsRef: credentials_ref
    hostFilter:
      type: HostAttributes
      spec:
        value:
          region: us-east-1
          name: node-1
        matchCriteria: ANY
  allowSimultaneousDeployments: false
```

- **matchCriteria: ANY** means that **either** condition must be true for the host to be selected (either `region=us-east-1` **or** `name=node-1`).

**Host-1**
- `region`: us-east-1 (matches)
- `name`: node-1 (matches)

**Selected**: Host-1 meets both conditions, so it **matches**.

**Host-2**
- `region`: us-west (does not match `us-east-1`)
- `name`: node-5 (does not match `node-1`)

**Not Selected**: Host-2 does not meet either condition, so it **does not match**.

**Summary for `ANY`**:
- **Host-1** is selected because **both** `region` and `name` match.
- **Host-2** is not selected because neither `region` nor `name` matches.

---

Key takeaways:

- **matchCriteria: ALL**: The host is selected only if **both** conditions are true.
- **matchCriteria: ANY**: The host is selected if **either** of the conditions is true.

</details>

### Pre-existing infrastructure

This example sets up an Infrastructure Definition for a pre-existing infrastructure.

Perform the following steps to set up the infrastructure:

1. In **Specify Environment**, select or create an environment.
2. In the environment, in **Specify Infrastructure**, select **New infrastructure**.
3. Enter a name for the new infrastructure.
4. For **Select Infrastructure Type**, select where you want to deploy. This example uses **Physical Data Center**.
   1. Keep the default selection, **Physical Data Center**.

   <div align="center">
     <DocImage path={require('./static/ssh-ng-174.png')} width="60%" height="60%" alt="Select Physical Data Center as the infrastructure type" title="Click to view full size image" />
   </div>

### Target specific hosts for deployment

You can pass in specific host IPs to perform deployment in the SSH Infrastructure Definition. When your deployment stage deploys a Secure Shell (SSH) service or a Windows Remote Management (WinRM) service using an Infrastructure Definition of deployment type SSH or WinRM, you can select target hosts that were not selected in the stage's Infrastructure Definition. Harness presents a dropdown in the Pipeline Run form with the queried list of host names.

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
    targetedHosts: <+input> ## This is provided at runtime.
  allowSimultaneousDeployments: false
```

:::info limitations

- `instance.name` has the same value as `instance.hostName`. Both are available for backward compatibility.
- This is supported only with AWS and Azure infrastructure. Targeting specific hosts uses the same permissions as before, with no new API call required.

:::

### Create the PDC connector for the hosts

Perform the following steps to create the Physical Data Center (PDC) connector:

1. In **Infrastructure Definition**, for **Connector**, select **Select Connector** to create the connector for the PDC.
2. In **Create or Select an Existing Connector**, select **New Connector**.
3. In **Physical Data Center**, enter a name for this connector, such as **PDC-Connector**.
4. Select **Continue**.
5. In **Details**, keep the default for **Manually enter host names** and enter the hostnames for the target instances.
6. Select **Continue**.
7. In **Delegates Setup**, keep the default for **Use any available Delegate**.
8. Select **Save and Continue**. Harness validates connectivity for the PDC connector.
9. Select **Finish**. The Infrastructure Definition is updated with the PDC connector.

<div align="center">
  <DocImage path={require('./static/ssh-ng-179.png')} width="60%" height="60%" alt="Infrastructure Definition updated with the PDC connector" title="Click to view full size image" />
</div>

### Use an SSH credential to authenticate to target hosts

You can use an SSH key or Kerberos to authenticate to the target hosts. This example uses an SSH key.

Perform the following steps to create the SSH credential:

1. In **Specify Credentials**, select **Create or Select a Secret**.
2. In **Create or Select an Existing Secret**, select **New SSH Credential**.
3. In **SSH Details**, for **Name**, enter a name for this SSH credential and select **Continue**.
4. In **Configuration and Authentication**, there are three authentication options. This example uses **Username/SSH Key**. Select the dropdown menu and select **Username/SSH Key**.
5. Enter a username, such as **ec2-user**.

   :::tip Use ec2-user for EC2

   Always use **ec2-user** for EC2 instances.

   :::

6. For **Select or create a SSH Key**, select **Create or Select a Secret**.
7. In **Create or Select an Existing Secret**, select **New Secret File**.
8. In **Add new Encrypted File**, enter a name for **Secret Name**, such as **ssh-key-name**. This is the name you use to reference this file.
9. For **Select File**, select **Browse**. On your machine, select the secret file that you downloaded from your instance. For EC2, use the .pem file.
10. Select **Save**.
11. In **Configuration and Authentication**, keep the default values for **Passphrase** and **SSH port**. Select **Save and Continue**.
12. In **Verify Connection**, enter the hostname for the instance in the **Add a Host Name to start verification** field and select **Connection Test**.
13. The Secure Shell connection to the instance is tested. Select **Finish**. Select **Continue**.

    You can use the **Preview Hosts** section to test the connection at any time.

14. Select **Save**.
15. Back in **Environment**, select **Continue**.

Next, you select the deployment strategy for this stage, the package type, and the number of instances to deploy on.

### Dynamically provisioned infrastructure

The following is a summary of the steps to dynamically provision the target infrastructure for a deployment:

1. **Add dynamic provisioning to the CD stage:**
   1. In a Harness Deploy stage, in **Environment**, enable the option **Provision your target infrastructure dynamically during the execution of your Pipeline**.
   2. Select the type of provisioner that you want to use.

      Harness automatically adds the provisioner steps for the provisioner type you selected.
   3. Configure the provisioner steps to run your provisioning scripts.
   4. Select or create a Harness infrastructure in **Environment**.
2. **Map the provisioner outputs to the Infrastructure Definition:**
   1. In the Harness infrastructure, enable the option **Map Dynamically Provisioned Infrastructure**.
   2. Map the provisioning script or template outputs to the required infrastructure settings.

### Supported provisioners

The following provisioners are supported for SSH deployments:

- Terraform
- Terragrunt
- Terraform Cloud
- CloudFormation
- Azure Resource Manager (ARM)
- Azure Blueprint
- Shell Script

### Add dynamic provisioning to the stage

Perform the following steps to add dynamic provisioning to a Harness pipeline Deploy stage:

1. In a Harness Deploy stage, in **Environment**, enable the option **Provision your target infrastructure dynamically during the execution of your Pipeline**.
2. Select the type of provisioner that you want to use.

   Harness automatically adds the necessary provisioner steps.
3. Set up the provisioner steps to run your provisioning scripts.

For documentation on each of the required steps for the provisioner you selected, go to the following topics:

- Terraform:
  - Go to [Terraform Plan](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step) to configure the plan step.
  - Go to [Terraform Apply](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step) to configure the apply step.
  - Go to [Terraform Rollback](/docs/continuous-delivery/cd-infrastructure/terraform-infra/rollback-provisioned-infra-with-the-terraform-rollback-step) to configure the rollback step. To see the Terraform Rollback step, toggle the **Rollback** setting.
- Go to [Terragrunt](/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos) to configure Terragrunt provisioning.
- Go to [Terraform Cloud](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-cloud-deployments) to configure Terraform Cloud provisioning.
- CloudFormation:
  - Go to [Create Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-with-the-cloud-formation-create-stack-step) to configure the create step.
  - Go to [Delete Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/remove-provisioned-infra-with-the-cloud-formation-delete-step) to configure the delete step.
  - Go to [Rollback Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/rollback-provisioned-infra-with-the-cloud-formation-rollback-step) to configure the rollback step. To see the Rollback Stack step, toggle the **Rollback** setting.
- Go to [Azure Resource Manager (ARM)](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning) to configure ARM provisioning.
- Go to [Azure Blueprint](/docs/continuous-delivery/cd-infrastructure/azure-blueprint-provisioning) to configure Blueprint provisioning.
- Go to [Shell Script](/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning) to configure Shell Script provisioning.

### Map provisioner output

Once you set up dynamic provisioning in the stage, you must map outputs from your provisioning script or template to specific settings in the Harness Infrastructure Definition used in the stage.

Perform the following steps to map the provisioner output:

1. In the same CD Deploy stage where you enabled dynamic provisioning, select or create (**New Infrastructure**) a Harness infrastructure.
2. In the Harness infrastructure, in **Select Infrastructure Type**, select **Physical Data Center**, **Azure**, or **AWS**.
3. In **Select Hosts/Azure/Amazon Web Services Infrastructure Details**, enable the option **Map Dynamically Provisioned Infrastructure**.

   A **Provisioner** setting is added and configured as a runtime input.
4. Map the provisioning script or template outputs to the required infrastructure settings.

To provision the target deployment infrastructure, Harness needs specific infrastructure information from your provisioning script. You provide this information by mapping specific Infrastructure Definition settings in Harness to outputs from your template or script.

For SSH infrastructures, Harness needs the following settings mapped to outputs:

- Physical Data Center (PDC):
  - **Host Array Path**
  - **Host Data Mapping**: Map outputs for all of the necessary connection information. For example, for VMs on a cloud platform:
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

:::info expression option

Set the mapped settings to the **Expression** option.

:::

#### Host array path variable

For SSH PDC deployments, you use the expression `<+provisioner.OUTPUT_NAME>` for the **Host Array Path** setting.

For the subsequent **Host Data Mapping** key-value pairs, you use the expression format `<+HOST_PROPERTY>`. For example, `<+public_dns>`.

The following is an example:

<div align="center">
  <DocImage path={require('./static/8722541e819fd752abc35693bd00e38cca2bce5df264afa89cbf61288fbc0604.png')} width="60%" height="60%" alt="Host Array Path and Host Data Mapping expressions in the Infrastructure Definition" title="Click to view full size image" />
</div>

#### Example Terraform script

The following is a snippet of a Terraform script that provisions the infrastructure for an AWS EC2 VM SSH deployment and includes the required outputs for Physical Data Center:

```hcl
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

<div align="center">
  <DocImage path={require('./static/8722541e819fd752abc35693bd00e38cca2bce5df264afa89cbf61288fbc0604.png')} width="60%" height="60%" alt="Mapped provisioner outputs in the Infrastructure Definition" title="Click to view full size image" />
</div>

### Reference mapped instance properties

Once you have mapped provisioning script outputs to the stage Infrastructure Definition, you can reference them in **Execution** of the stage.

To reference a mapped output, you use an expression in the format `<+instance.properties.*>`.

For example, here are some **Host Data Mapping** keys and expressions that reference them:

- hostname: `<+instance.properties.hostname>`
- privateIp: `<+instance.properties.privateIp>`
- subnetId: `<+instance.properties.subnetId>`
- region: `<+instance.properties.region>`

---

## SSH executions

In **Execution**, Harness automatically adds the steps required to deploy the service to the environment according to the deployment strategy you select.

The execution strategies supported for Secure Shell include **Blank Canvas**, **Basic**, **Rolling**, and **Canary**. This example uses Basic.

### Basic deployments

Perform the following steps to configure a Basic deployment:

1. In **Execution Strategies**, select **Basic**. Typically, you use Basic when deploying to one host, and Rolling or Canary for multiple hosts.
2. For **Package type**, select **WAR**.
3. Select **Use Strategy**. Harness adds the **Deploy** step for execution.
4. Select the **Deploy** step. Here is where you add the scripts for your package. This example uses the defaults and copies the artifact to the target host.

   <div align="center">
     <DocImage path={require('./static/ssh-ng-189.png')} width="60%" height="60%" alt="Deploy step with default command scripts" title="Click to view full size image" />
   </div>

5. In **Command Scripts**, edit **Copy Config**.
6. In **Edit Command**, for **Select file type to copy**, select **Artifact**.

   <div align="center">
     <DocImage path={require('./static/ssh-ng-190.png')} width="60%" height="60%" alt="Select Artifact as the file type to copy" title="Click to view full size image" />
   </div>

7. Select **Save**.
8. Review the looping strategy. The looping strategy repeats deployments for multiple hosts and for different deployment strategies (Basic, Rolling, Canary).
   1. Select **Advanced**.
   2. Select **Looping Strategy**. The step is repeated for all hosts using the `<+stage.output.hosts>` expression. For example, if you had two hosts, the step would be repeated for each host.

   <div align="center">
     <DocImage path={require('./static/ssh-ng-191.png')} width="60%" height="60%" alt="Looping strategy configured on the Deploy step" title="Click to view full size image" />
   </div>

9. Select **Apply Changes**.
10. When you are done, select **Save** to publish the pipeline.

---

## Deploy and review

The following is an example SSH deployment.

Perform the following steps to run and review the deployment:

1. Select **Run** to run the pipeline.
2. In **Run Pipeline**, for **Primary Artifact**, select **Todolist**.
3. In **Artifact Path**, Harness displays a list of available artifact packages.
4. Select **todolist.war**.

   <div align="center">
     <DocImage path={require('./static/ssh-ng-192.png')} width="60%" height="60%" alt="Select the todolist.war artifact package in the run form" title="Click to view full size image" />
   </div>

5. Select **Run Pipeline**. Harness runs the pipeline, and the **Console View** displays the tasks executed for each step.

### Review deployment

Review what happens in the Deploy step. Most sections correspond to the commands you can see in the Deploy step:

1. **Initialize:** Initialize the connection to the hosts and create a temp directory for the deployment.
2. **Setup Runtime Paths:** Create folders for runtime, backup, and staging.
3. **Copy Artifact:** Copy the artifact to the host.
4. **Copy Config:** Copy the config files (if any) to the host.
5. **Cleanup:** Remove temp directories.

```text
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

You have now created and completed the steps for running a pipeline by using Secure Shell.

---

## Selective rerun and skip hosts with the same artifact

You can skip the hosts where the last deployment was successful using the same artifact for traditional deployments. These improvements provide:

- **Efficient reruns:** Redeploy only on failed hosts instead of all hosts.
- **Expressions for failed hosts:** Retrieve failed hosts dynamically for debugging, fixing, and rerunning on only failed hosts.

To use this feature, go to the **Advanced** tab of the **CD stage** and enable the **Skip instances with the same artifact version already deployed** checkbox.

You can enable this checkbox at runtime by making the checkbox a **Runtime Input**.

<div align="center">
  <DocImage path={require('./static/skip-instance.png')} width="60%" height="60%" alt="Skip instances with the same artifact version already deployed checkbox" title="Click to view full size image" />
</div>

:::info feature flag

The Selective Failed Hosts Rerun feature is behind the feature flag `CDS_SKIP_INSTANCES_V2`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

**Change in behavior with feature flag activation**

Enabling the `CDS_SKIP_INSTANCES_V2` feature flag enhances the skip instances feature for improved reliability across deployment scenarios. The updated behavior includes:

- **Org or account-level service and environment handling:** Ensures consistent application of skip instance logic across different organizational scopes.
- **Partial success handling:** Tracks and skips only successfully deployed hosts, preventing unnecessary redeployments.

:::

**Success criteria for deployment on a host**

- **Successfully deployed criteria:** A host is considered successfully deployed only if all command steps in an execution complete successfully.
- **Deployed criteria:** A host is considered deployed if any command step execution occurs on the host.

**Key features**

**1. Selective retry for failed hosts**
- Deployment retries target only failed hosts instead of redeploying on all hosts when the **Skip instances with the same artifact version already deployed** checkbox is enabled.

**2. Enhanced skip instances feature**
- Deployment is skipped on hosts where the last deployment was successful using the same artifact.
- Each host's deployment success is tracked individually, ensuring that only failed hosts are retried.
- Infrastructure changes (for example, connector updates or credential changes) are considered when determining the last deployment on a host.

**3. Improved rollback behavior**
- The skip instances feature tracks rollbacks per host, ensuring that only the required hosts are updated.
- This guarantees that rollback logic applies only to affected hosts, preventing unnecessary redeployments.

**4. New expressions introduced**

These expressions provide better tracking of deployment and skipped instances:

- `<+stage.output.skippedHosts>`: Fetches hosts skipped during the current deployment via the skip instances feature.
- `<+stageFqn.deployedHosts.succeeded>`: Fetches hosts that successfully deployed in a stage.
- `<+stageFqn.deployedHosts.failed>`: Fetches hosts that failed deployment in a stage.

:::info expression resolution

The `<+stageFqn.deployedHosts.succeeded>` and `<+stageFqn.deployedHosts.failed>` expressions are resolved only after stage completion.

- The full stage Fully Qualified Name (FQN) must be used, for example, `<+pipeline.stages.ssh.deployedHosts.succeeded>`.
- These expressions include only the hosts that meet the **Deployed** criteria.

:::

<details>
<summary>Example workflow: deployment with partial success</summary>

This example demonstrates how the skip instances feature allows rerunning a pipeline without redeploying successfully deployed hosts. When you enable this feature, only failed hosts are rerun, which optimizes deployment efficiency and reduces unnecessary redeployments.

**Step 1: Deploy on two hosts using artifact version 1**
Deploy **artifact version 1** on **host1** and **host2** using a command step.

**Outcome:**
- **host1** successfully deployed **version 1**.
- **Deployment on host2 failed**.

---

**Step 2: Fix the issue on host2 and rerun the pipeline with skip instances enabled**
After resolving the issue on **host2**, rerun the pipeline with the skip instances feature enabled.

**Outcome:**
- **Deployment on host1 is skipped** since it was previously successful.
- **host2 successfully deploys version 1**.

</details>

<details>
<summary>Use cases for selective rerun and skipping hosts</summary>

The improved retry and rollback mechanisms take only necessary actions and avoid unnecessary redeployments and rollbacks. The following are some key scenarios and how they are handled:

1. **Pipeline termination after successful deployment**
- If the pipeline terminates due to expire, abort, or failure cases, but the host was successfully deployed via a command step before termination, the deployment on that host is still considered successful.
- This ensures that unexpected pipeline failures do not unnecessarily mark successful hosts as failed.

2. **Parallel deployments on the same hosts**
- When the same hosts are deployed in parallel using different stages, the stage with the most recent command step execution is considered the last deployment for the skip instances feature.

3. **Executions without command steps**
- If a pipeline execution does not contain command steps, it is ignored in tracking.
- Such deployments are not considered for the skip instances feature.

4. **Partial success without rollback**
- If a deployment succeeds on some hosts but fails on others, only failed hosts are deployed on rerun.
- Successfully deployed hosts are skipped.

5. **Execution failure followed by a partial rollback**
- If a rollback is partially successful, only successfully rolled-back hosts are marked as completed.
- The system ensures these hosts are correctly updated for future deployments.

6. **Handling command step retries**
- If a command step fails initially but succeeds after retry, the host is marked as successfully deployed.
- This ensures hosts are not mistakenly retried in future deployments.

7. **Command steps within step groups**
- If a command step inside a step group fails but succeeds on retry, the host is considered successfully deployed.
- This prevents unnecessary redeployments on already successful hosts.

8. **Pipeline rollback considerations**
- If a pipeline rollback is triggered, only hosts that were rolled back successfully are marked as completed.
- The system ensures these hosts are correctly updated for future deployments.

</details>

---

## Permissions for SSH deployments in AWS

Harness uses the SSH credentials to connect to hosts to perform deployment.

Harness uses the AWS connector to retrieve instances from the AWS account. Harness makes the following calls:

- Retrieve the instances at runtime during the infrastructure step: [DescribeInstances](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html).
- Retrieve the instances during instance sync to show service instances in the service: [DescribeInstances](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html).

To use the describe instance API, the action is `ec2:DescribeInstances`.

Per AWS documentation, go to [Example policies for working with the AWS CLI or an AWS SDK](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ExamplePolicies_EC2.html) to review Amazon Elastic Compute Cloud policy examples.

---

## Additional deployment configuration

### Select multiple hosts

You can add multiple hosts in the Physical Data Center connector.

<div align="center">
  <DocImage path={require('./static/ssh-ng-193.png')} width="60%" height="60%" alt="Add multiple hosts in the Physical Data Center connector" title="Click to view full size image" />
</div>

During deployment, you see each host listed in the loop.

<div align="center">
  <DocImage path={require('./static/ssh-ng-194.png')} width="60%" height="60%" alt="Each host listed in the deployment loop" title="Click to view full size image" />
</div>

### Looping strategies for each deployment strategy

:::info Command step looping

Only the Repeat looping strategy is supported by the Command step. Also, only the `items` parameter is supported when running the Command step on multiple target hosts:

```yaml
repeat:
  items: <+stage.output.hosts>
```

:::

:::note
To control whether the remaining hosts run or stop after a failure, use the `onFailure` field. `continueOnFailure` is not supported for SSH deployments. Go to [Control deployments after a host failure](#control-deployments-after-a-host-failure) to configure this behavior.
:::

The Repeat looping strategy is used differently for the Basic, Rolling, and Canary deployment types.

The looping strategy is automatically added to the **Deploy** step and configured for the deployment type you selected.

<div align="center">
  <DocImage path={require('./static/ssh-ng-195.png')} width="60%" height="60%" alt="Looping strategy added to the Deploy step" title="Click to view full size image" />
</div>

The following sections describe how the looping strategy is used for different deployment types.

#### Basic

The looping strategy for the Basic deployment repeats the deployment on all the target hosts.

```yaml
repeat:
  items: <+stage.output.hosts>
```

#### Rolling

For a Rolling strategy, you specify how many instances you want to deploy per phase.

Suppose you have 10 target hosts in the stage **Infrastructure Definition** and you want to have 3 instances per phase.

In **Instances**, you enter 3.

As a result, when execution starts there are 4 phases: 3, 3, 3, 1. The number of instances per phase can be provided as a count or a percentage.

The following is an example of the Rolling strategy using 2 hosts with 50% in **Instances**.

<div align="center">
  <DocImage path={require('./static/ssh-ng-196.png')} width="60%" height="60%" alt="Rolling strategy with 50% instances per phase" title="Click to view full size image" />
</div>

Harness rolls out to 50% of target hosts first, and then the remaining 50% if the first 50% were successful.

Harness creates 2 phases.

<div align="center">
  <DocImage path={require('./static/ssh-ng-197.png')} width="60%" height="60%" alt="Two phases created for the Rolling strategy" title="Click to view full size image" />
</div>

You can add any Approval steps inside the Phase Group. Go to [Approvals](/docs/category/approvals) to configure approval steps.

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

Suppose you have 10 hosts and 4 partitions organized as 3, 3, 3, 1. The first partition includes 3 hosts, the second and third each have 3, and the last one has 1 host.

So, partition1 = host1, host2, host3, partition2 = host4, host5, host6, partition3 = host7, host8, host9, and partition4 = host10.

#### Canary

For Canary strategies, Harness calculates phase instances based on the number of hosts and the number of requested instances per phase.

Suppose you have 10 hosts and you add 2 phases with 50% and 100%. Harness deploys on 5 instances in the first phase and on the rest of the instances in the second phase.

The following is an example of the Canary strategy using 2 hosts and 2 phases. The first phase deploys to 50% and the second phase deploys to 100%.

<div align="center">
  <DocImage path={require('./static/ssh-ng-198.png')} width="60%" height="60%" alt="Canary strategy with two phases at 50% and 100%" title="Click to view full size image" />
</div>

Harness rolls out to 50% of target hosts first, and then the remaining 50% if the first 50% were successful.

Harness creates 2 phases as step groups.

<div align="center">
  <DocImage path={require('./static/ssh-ng-199.png')} width="60%" height="60%" alt="Two phases created as step groups for the Canary strategy" title="Click to view full size image" />
</div>

You can add any Approval steps between the step groups. Go to [Harness approval steps in CD stages](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages), [Jira approval stages](/docs/platform/approvals/adding-jira-approval-stages), and [ServiceNow approvals](/docs/platform/approvals/service-now-approvals) to configure approvals.

The looping strategy for the first phase selects 50% of the target hosts:

```yaml
repeat:
  items: <+stage.output.hosts>
  start: 0
  end: 50
  unit: Percentage
```

The looping strategy for the second phase starts at the 50% from the first phase and continues to 100%:

```yaml
repeat:
  items: <+stage.output.hosts>
  start: 50
  end: 100
  unit: Percentage
```

### Control deployments after a host failure

To control what happens after one iteration fails, add the `onFailure` field at the `strategy` level, alongside your matrix or repeat configuration. The `onFailure` field accepts two values:

- `RunAll`: Run all remaining iterations even if one fails. This is the default behavior.
- `SkipQueued`: Skip any iterations that have not started once one iteration fails.

The following example uses `SkipQueued` to skip the remaining hosts after a failure. Because `maxConcurrency` is `1`, hosts deploy one at a time, so a failure stops the loop:

```yaml
strategy:
  repeat:
    items: <+stage.output.hosts>
    maxConcurrency: 1
  onFailure: SkipQueued
```

`SkipQueued` skips only hosts that have not started deploying. Hosts already deploying continue to completion. To stop deployments as early as possible, set `maxConcurrency: 1`.

### Reference hosts in steps with expressions

You can use the following [instance expressions](/docs/platform/variables-and-expressions/harness-variables) to reference your hosts.

#### Microsoft Azure or Physical Data Center

- `<+instance.hostName>`
- `<+instance.host.hostName>`
- `<+instance.name>`

#### Microsoft Azure and AWS

- `<+instance.host.privateIp>`
- `<+instance.host.publicIp>`

:::info expression support by platform

- **For AWS with WinRM deployments:** Hostname-based expressions like `<+instance.hostName>` and `<+instance.host.hostName>` are not supported. Use `<+instance.host.privateIp>` or `<+instance.host.publicIp>` instead.
- **For Azure with WinRM deployments:** Hostname-based expressions are supported if the hostname is available from the VM metadata.
- `instance.name` has the same value as `instance.hostName`. Both are available for backward compatibility.

:::

### Rollback

Harness restores the state of deployment to the pipeline's previous successful stage execution based on `service`, `environment`, and `infrastructure` details.

Harness records the artifact version that was successfully deployed during previous successful executions. When using the Rollback step's Copy Artifact command unit, Harness copies the last successful version of the artifact deployed via Harness to the remote host.

:::info rollback behavior enhancement for SSH/WinRM

Harness has improved rollback behavior for SSH/WinRM deployments. This enhancement is controlled by the feature flag `CDS_FIX_ROLLBACK_IN_SSH_WINRM`. The following changes in behavior can be observed when this feature flag is enabled:

- The rollback behavior is enhanced to function correctly even in cases where multiple command steps are configured within a stage.
- Identifier matching: For rollback to work correctly, each command step in the rollback section must have the same identifier as the corresponding step in the execution section. The names of the steps may differ, but identifiers must match.
- For Canary, Rolling, and Basic deployment strategies, the auto-generated YAML also follows the improved pattern with identifier matching if the feature flag is enabled, ensuring identifier alignment between execution and rollback sections.

:::

#### First-time deployment

If the first pipeline execution fails (regardless of stage), Harness skips the rollback since there is no record of any successful pipeline execution.

#### N+1 time deployment

In case of stage failures in subsequent executions (assuming the service, environment, and infrastructure did not change in the corresponding stage), Harness initiates rollback to the previous successful pipeline. The previous pipeline execution must be successful for all stages. The successful stage is matched regardless of the pipeline execution status.

:::info rollback and configuration changes

- If any of the `service`, `environment`, or `infrastructure` details were changed in the stage, Harness does not consider any previous successful pipeline executions for rollback. It is treated as a completely different deployment.
- In case of multiple stages referencing the same `service`, `environment`, and `infrastructure` details, Harness rolls back the deployment to the last successful pipeline with a stage execution that shared the same `service`, `environment`, and `infrastructure`.

:::

Go to [Use Harness expressions](/docs/platform/variables-and-expressions/harness-variables/) to reference deployment details.

---

## FAQs

Go to [SSH and WinRM deployment FAQs](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-winrm-faqs) to review frequently asked questions about traditional deployments in Harness.

---

## Next steps

You have created an SSH deployment, defined the target infrastructure, and configured the deployment strategy and rollback behavior. Continue with the following topics:

- [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview): Dynamically provision target infrastructure.
- [Use Harness expressions](/docs/platform/variables-and-expressions/harness-variables): Reference hosts and instance properties.

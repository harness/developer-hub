---
title: Windows VM deployments using WinRM
description: Deploy to any platform using WinRM.
sidebar_position: 9
helpdocs_topic_id: l8795ji7u3
helpdocs_category_id: c9j6jejsws
helpdocs_is_private: false
helpdocs_is_published: true
---

# Windows VM deployments using WinRM

You can use Windows Remote Management (WinRM) to deploy your artifacts to Windows VM or bare-metal hosts located in Microsoft Azure, AWS, or any platform-agnostic Physical Data Center (PDC). Harness connects to your target Windows instances using the WinRM protocol and executes PowerShell commands to deploy your artifact.

WinRM deployments support both generic artifact deployment and IIS-specific deployment types. When you select an execution strategy, you can choose from four artifact types: **IIS Application**, **IIS Virtual Directory**, **IIS Website**, or **Other** (generic). Each IIS artifact type comes with a built-in PowerShell command template that handles application pool configuration, site setup, and artifact deployment on the target host.

For WinRM, you can access artifacts from [Harness Artifact Registry](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#harness-artifact-registry) (Docker artifact type only), **Jenkins**, **Artifactory**, **Custom**, **Nexus** and **Amazon S3**.

The **Execution Strategies** supported for WinRM include **Blank Canvas**, **Basic**, **Rolling**, and **Canary**.

Supported security protocols for WinRM include Kerberos and Windows New Technology LAN Manager (NTLM).

[Harness File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store) should be enabled if you want to upload Config files from the file store.

## Before You Begin

* Review Harness Key Concepts [Harness Key Concepts](/docs/platform/get-started/key-concepts) to establish a general understanding of Harness.
* Make sure that you have a Delegate available in your environment.
	+ You can install a Kubernetes or Docker Delegate.
	+ Ideally, you should install the Delegate in the same subnet as the target host(s)
* Target host — In this guide, we use an AWS EC2 instance as the target host.
* Credentials and other details for the EC2 Instance 
  * To configure and authenticate your WinRM credentials by using NTLM, you should have the domain name, username and password for the EC2 instance.
* To use Harness execution strategies, make sure you should have [IIS service](https://learn.microsoft.com/en-us/iis/application-frameworks/scenario-build-an-aspnet-website-on-iis/configuring-step-1-install-iis-and-asp-net-modules#to-install-iis-and-aspnet-modules-on-windows-server-2012-using-the-ui) installed on your machine.
* We support using WinRM with an **OIDC-enabled AWS connector**, but it requires Delegate version `854xx` or later. For more information, refer to [AWS OIDC connector reference](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference).

## Objectives

You will learn how to:

* Create a Harness WinRM service by using Windows New Technology LAN Manager (NTLM)
* Set up a Harness Artifactory Connector
* Add credentials needed to connect to the target host
* Define the target infrastructure for deployment (AWS hosts)
* Select the Basic deployment strategy
* Deploy IIS Applications, Virtual Directories, and Websites using Rolling or Canary strategies
* Configure IIS command script templates and their input variables
* Run the Pipeline and review

## Create the Deploy Stage

Pipelines are collections of stages. In this tutorial, we will create a new Pipeline and add a stage for WinRM deployments of artifacts to a target host.

1. In your Harness project, click **Pipelines**, and then **Create a Pipeline**.
2. Enter a name for the pipeline: **winrm****-tutorial**. Keep the default **Inline (Pipeline is stored in Harness)** for **How do you want to set up your pipeline**.
3. Click **Start** and your pipeline appears.
4. Click **Add Stage**.
5. For **Select Stage Type**, select **Deploy**.
6. For **Stage Name**, enter: **winrm****-stage.**
7. For **Deployment Type**, select **WinRM** and click **Set Up Stage**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/win-rm-tutorial-128.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

## Create a Harness WinRM Service

Next, you will create a Harness Service that represents your application. Once you have created a Service, it is persistent and can be used throughout the stages of this or any other Pipeline in the Project.

The Harness WinRM Service contains the application package artifact (file or metadata) and the related config files to deploy on the target host.

Let's create the Service for an application artifact.

1. For **Select Service**, click **New Service,** enter a name for the service: **winrm-service**. You will use this name when selecting this Service in Harness Environments.
2. For **Service Definition**, in **Deployment Type**, select **WinRM** and click **Continue.**

### Add the Artifactory Connector

Harness includes Connectors for all the major artifact repositories. In this tutorial, we will use a **todolist.zip** file, available in a public Harness Artifactory repo.

1. In **Artifacts**, click **Add Primary Artifact**.
2. In **Specify Artifact Repository Type**, select **Artifactory** and click **Continue**.
3. For the Artifactory Connector, select **New Artifactory Connector**.
4. In **Name**, enter a name for the connector: **artifactory-connector** and click **Continue**.
5. In **Details**, enter the following URL path for **Artifactory Repository URL** or click the tooltip and copy the URL: `https://harness.jfrog.io/artifactory`. In this tutorial, we will use the artifacts stored in that repository.
6. For **Authentication**, click the down-drop arrow for **Username and Password**. Then, select **Anonymous (no credentials required)**. Click **Continue**.
   	
<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/win-rm-tutorial-129.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

7. Click **Continue** to connect with Artifactory by using a Harness Delegate.
8. In **Delegates Setup**, retain the default selection: **Use any available delegate**.
9. Click **Save and Continue**.
10. In **Connection Test**, Harness validates the Artifactory Repository authentication and permissions for the repo. Click **Continue**. If the test fails, that means the Delegate can't connect to `https://harness.jfrog.io/artifactory/`. Make sure that the EC2 instance hosting the Delegate can make outbound connections to `https://harness.jfrog.io/artifactory/`.

### Set up Artifact Location and Details

For this tutorial, we'll use a **ToDo List** app artifact, **todolist.zip**, available in a public Harness Artifactory repo.

1. In **Artifact Details**, for **Repository Format**, keep the default value **Generic**.
2. For **Repository**, enter: **todolist-tutorial**. Note that if you select the down-drop menu for Repository, Harness loads any available repositories and displays them for selection.
3. for **Artifact Directory**, enter a forward slash **/**.
4. For **Artifact Details**, keep the default **Value**.
5. For **Artifact Path**, leave the default Runtime Input value **\<+input>** for that field. Click **Submit.** The **Artifactory Connector** is added to **Artifacts.** Click **Continue**.

:::info note
The artifact [expression](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources.md) may vary based on the chosen artifact type.
:::

## Configure the Environment and Infrastructure

You configure the environment and infrastructure for your deployment in the **Environment** settings of the pipeline stage.

To set up the environment, select **New Environment**, provide a name for the environment (for example, **winrm-env**), choose the environment type (Production or Pre-Production), and click **Save**. This step is common across all infrastructure types.

Next, configure the infrastructure definition. There are two methods of specifying the deployment target infrastructure:

- **Pre-existing**: the target infrastructure already exists and you simply need to provide the required settings.
- **Dynamically provisioned**: the target infrastructure will be dynamically provisioned on-the-fly as part of the deployment process.

For details on Harness provisioning, go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview).

WinRM deployments support three infrastructure types:

- **Physical Data Center (PDC):** Deploy to on-premise or cloud-hosted Windows servers managed outside of Azure or AWS.
- **Azure:** Deploy to Windows VMs in Microsoft Azure subscriptions.
- **AWS:** Deploy to Windows EC2 instances in Amazon Web Services.

### Physical Data Center

The Physical Data Center (PDC) infrastructure type targets Windows servers that are not managed through Azure or AWS connectors. When you select PDC as the infrastructure type, Harness presents two host configuration modes: **Single Host** and **Host Groups**.

#### Single Host

The **Single Host** tab is the default configuration mode where all hosts share a single WinRM credential.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/pdc-single-host.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

When setting up the Infrastructure Definition, there are three options for selecting target hosts:

- **Specify hosts:** Manually enter a comma-separated list of host names.
- **Select preconfigured hosts from Physical Data Center:** Use a PDC connector to pull registered hosts, with optional filtering by host name or host attributes.
- **Map Dynamically Provisioned Infrastructure:** Map outputs from a provisioner (Terraform, CloudFormation, etc.) to resolve hosts at runtime. For details, see [Dynamically provisioned infrastructure](#dynamically-provisioned-infrastructure).

:::note
When specifying hosts inline, enter them as a comma-separated list.
:::

##### Filtering hosts by attributes

This setting is available when you pick **Select preconfigured hosts from Physical Data Center** under **Select hosts** and select **Filter by host attributes**

You can control whether multiple host‑attribute filters are combined with **OR (match any)** or **AND (match all)** logic.

**Any (default)** – a host is selected if at least one filter condition matches (existing behavior).

**All** – a host is selected only if every filter condition matches.

Specific Attribute: This is where you specify the condition on which the match criteria is checked with. You can specify attributes like region, type, name, etc.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/pdc-specify-host.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

<details>
<summary>Example of how filtering hosts by attributes works</summary>

Suppose you have two hosts specified in your physical data center

```json
// Host‑1
{
  "hostname": "ec2-00-00-01.compute-1.amazonaws.com",
  "hostAttribute": {
    "region": "us-east-1",
    "name": "node-1"
  }
}

// Host‑2
{
  "hostname": "ec2-00-00-02.compute-1.amazonaws.com",
  "hostAttribute": {
    "region": "us-west",
    "name": "node-5"
  }
}
```

Scenario 1: `matchCriteria: ALL`

**YAML Example for `matchCriteria: ALL`**

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

**Host‑1**
- `region`: us-east-1 (matches)
- `name`: node-1 (matches)

**Selected**: Host‑1 meets both conditions, so it **matches**.

**Host‑2**
- `region`: us-west (does not match `us-east-1`)
- `name`: node-5 (does not match `node-1`)

**Not Selected**: Host‑2 does not meet **both** conditions, so it **does not match**.

**Summary for `ALL`**:  
- **Host‑1** is selected because both `region` and `name` match.  
- **Host‑2** is not selected because neither `region` nor `name` match.

---

Scenario 2: `matchCriteria: ANY`

**YAML Example for `matchCriteria: ANY`**

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

**Host‑1**
- `region`: us-east-1 (matches)
- `name`: node-1 (matches)

**Selected**: Host‑1 meets both conditions, so it **matches**.

**Host‑2**
- `region`: us-west (does not match `us-east-1`)
- `name`: node-5 (does not match `node-1`)

**Not Selected**: Host‑2 does not meet either condition, so it **does not match**.

**Summary for `ANY`**:  
- **Host‑1** is selected because **both** `region` and `name` match.  
- **Host‑2** is not selected because neither `region` nor `name` matches.

---

Key Takeaways:

- **matchCriteria: ALL**: The host is selected only if **both** conditions are true.
- **matchCriteria: ANY**: The host is selected if **either** of the conditions is true.

</details>

##### Setting up a pre-existing PDC infrastructure

Here is an example of setting up an Infrastructure Definition for a pre-existing PDC infrastructure. After creating your environment, continue with the infrastructure setup.

1. For **Specify Infrastructure**, click **New infrastructure**.
2. Enter a name for the new infrastructure: **winrm-infra**.
3. For **Select Infrastructure Type**, select **Physical Data Center**.
4. Scroll down to view the Infrastructure definition.
5. Keep the default selection: **Select preconfigured hosts from Physical Data Center**.

**Create the PDC Connector for the Host**

1. In **Infrastructure Definition**, for **Connector**, click **Select Connector** to create the Connector for PDC.
2. In **Create or Select an Existing Connector**, select **New Connector**.
3. For **Name**, enter **pdc-connector** and click **Continue**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/win-rm-tutorial-130.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

4. In **Details**, keep the default selection for **Manually enter host names**. In **Hosts**, enter the host name for your EC2 instance and click **Continue**.
   
<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/win-rm-tutorial-131.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

5. In **Delegates Setup**, keep the default for **Use any available Delegate**. Click **Save** and **Continue**.
6. In **Test Connection**, Harness validates the connectivity for the PDC host. Click **Finish**.
   
<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/win-rm-tutorial-132.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

**Use WinRM Credentials with NTLM to Authenticate**

1. For **Specify Credentials**, click **Create or Select a Secret**.
2. In **Create or Select an Existing Secret**, click **New WinRm Credential**.
3. In **WinRm Details**, enter a name for this credential.
4. For **Select an Auth Scheme**, keep the default **NTLM**.
5. For **Domain**, enter the domain name for your EC2 instance.
6. For **Username**, enter the user name used to access the EC2 instance.
7. For **Password**, click **Create or Select a Secret**.
8. In **Create or Select an Existing Secret**, click **New Secret Text**.
9. In **Add new Encrypted text**, enter a name for this secret. This is the name you will use to reference the text elsewhere in your resources.
10. In **Secret Value**, enter the password that you use to access the EC2 instance. Click **Save** and **Password** is populated with the secret you created.
11. Click the checkboxes for **Use SSL** and **Skip Cert Check**. Leave the **Use No Profile checkbox** empty.
12. For **WinRM Port**, keep the default port number **5986**. Click **Save and Continue**.
13. For **Add a Host Name to start Verification**, enter the hostname for your EC2 instance and click **Test Connection**. Harness checks for Delegates and verifies the connection to the target host.
14. In **Create New Infrastructure**, click **Preview Hosts**.
15. Click the checkbox for the host and click **Test Connection**. The WinRM connection to the EC2 instance is tested. Click **Finish**. Click **Continue**.

#### Host Groups

:::info note
This feature is behind the feature flag `CDS_ENABLE_INFRA_HOST_GROUPS`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

By default, all hosts in a PDC infrastructure share a single WinRM credential. Host Groups remove this limitation by letting you organize hosts into named groups, each with its own credential. This is particularly useful for environments that use Just Enough Administration (JEA), where different server groups require distinct credential and endpoint configurations.

With Host Groups, a single infrastructure definition can target multiple Windows servers using different credentials in the same pipeline execution. For example, your web servers might use one JEA endpoint while your application servers use another — Host Groups let you model this without creating separate infrastructures.

:::info
Host Groups are supported only for the **Physical Data Center (PDC)** infrastructure type.
:::

:::note
Host Groups currently support only fixed values for host and credential configurations. Runtime inputs and expressions are not supported in Host Groups at this time, although they are available in the Single Host configuration.
:::

##### Configuring Host Groups

To configure Host Groups, select the **Host Groups** tab in the Infrastructure Definition dialog. This tab appears alongside the existing **Single Host** tab when your infrastructure type is set to Physical Data Center.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/pdc-host-groups.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

Select **+ Add Host Group** to create a new group. You can add multiple host groups to the same infrastructure. Each host group expands into a configuration panel with the following fields:

- **Host Group Key:** A unique identifier for the group. This key is required and distinguishes host groups within the infrastructure definition.
- **Host selection method:** Choose between **Specify hosts** (provide host names inline) or **Select preconfigured hosts from Physical Data Center** (use a PDC connector to pull hosts).
- **Specify Credentials:** Each host group requires exactly one WinRM credential. All hosts within the group share this credential during deployment.

##### Specifying hosts inline

Select the **Specify hosts** radio button to manually enter host names. Provide a comma-separated list of host names in the **Hosts** field. This approach works well when you have a known, static set of target servers.

##### Using preconfigured hosts from a PDC connector

Select **Select preconfigured hosts from Physical Data Center** to pull hosts from an existing PDC connector. After selecting a connector, choose one of the following filtering options:

- **Include all hosts:** Deploys to every host registered in the PDC connector.
- **Filter by host name:** Specify a comma-separated list of host names to target a subset of hosts from the connector.
- **Filter by host attributes:** Filter hosts based on key-value attribute pairs (for example, `hostType:DB, region:west`). Set the **Match Criteria** to **Any** (match at least one attribute) or **All** (match every attribute).

After configuring your host group, select **Preview Hosts** to verify which hosts are resolved based on your configuration.

##### Host Groups YAML reference

<details>
<summary>Host Groups YAML example</summary>

Below is an example infrastructure definition using Host Groups. The first group specifies inline hosts, the second targets a single host, and the third uses a PDC connector with an "all hosts" filter.

```yaml
infrastructureDefinition:
  name: infra_name
  identifier: infra_id
  orgIdentifier: default
  projectIdentifier: project_name
  environmentRef: env_name
  deploymentType: WinRm
  type: Pdc
  spec:
    hostGroups:
      - identifier: hostGroup_1
        hosts:
          - host1
          - host2
          - host3
        credentialRef: credential-1
      - identifier: hostGroup_2
        hosts:
          - host4
        credentialRef: credential-2
      - identifier: hostGroup_3
        pdcConnectorRef: pdcRef-1
        credentialRef: credential-3
        hostFilter:
          type: All
          spec: {}
    delegateSelectors: []
  allowSimultaneousDeployments: false
```

Each entry in `hostGroups` supports:

- **`identifier`:** Unique key for the host group (maps to the **Host Group Key** field in the UI).
- **`hosts`:** A list of host names when specifying hosts inline.
- **`pdcConnectorRef`:** Reference to a PDC connector when using preconfigured hosts.
- **`credentialRef`:** The WinRM credential used for all hosts in this group.
- **`hostFilter`:** Filtering configuration when using a PDC connector. Supported types are `All`, `HostNames`, and `HostAttributes`.

</details>

##### Using Host Groups with looping strategies

When your pipeline uses a looping strategy with the `<+stage.output.hosts>` expression, the stage repeats for each resolved host across all host groups. Harness resolves hosts from every group, pairs each host with its group's credential, and executes the deployment step for each host individually.

```yaml
repeat:
  items: <+stage.output.hosts>
```

This means you don't need to change your execution logic — the host-to-credential mapping is handled automatically at the infrastructure level.

### Azure

To deploy to Windows VMs hosted in Microsoft Azure, select **Azure** as the infrastructure type in your Infrastructure Definition. Harness connects to your Azure subscription and discovers target VMs based on the criteria you configure.

You need the following settings for an Azure WinRM infrastructure:

- **Connector:** Select or create an Azure Cloud Provider connector that has access to your target subscription.
- **Subscription Id:** The Azure subscription containing the target VMs.
- **Resource Group:** The resource group where the VMs reside.
- **Tags (optional):** Filter VMs by Azure resource tags to target a specific subset of instances.
- **WinRM Credentials:** A WinRM secret (NTLM or Kerberos) that Harness uses to connect to the target VMs.

:::info
For Azure WinRM deployments, hostname-based expressions are supported if the hostname is available from the VM metadata. You can also use `<+instance.host.privateIp>` and `<+instance.host.publicIp>`.
:::

### AWS

To deploy to Windows EC2 instances in Amazon Web Services, select **AWS** as the infrastructure type. Harness uses an AWS connector to discover EC2 instances and WinRM credentials to connect to them.

You need the following settings for an AWS WinRM infrastructure:

- **Connector:** Select or create an AWS Cloud Provider connector. Harness supports OIDC-enabled AWS connectors (requires Delegate version `854xx` or later).
- **Region:** The AWS region containing the target EC2 instances.
- **Tags (optional):** Filter instances by AWS resource tags.
- **WinRM Credentials:** A WinRM secret (NTLM or Kerberos) that Harness uses to connect to the target instances.

Harness calls the [DescribeInstances](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html) API to retrieve instances both at runtime during the infrastructure step and during instance sync. Your AWS connector's IAM role must have the `ec2:DescribeInstances` permission. For more details on required IAM policies, see [Example policies for working with the AWS CLI or an AWS SDK](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ExamplePolicies_EC2.html).

:::info
For AWS WinRM deployments, hostname-based expressions like `<+instance.hostName>` and `<+instance.host.hostName>` are **not supported**. Use `<+instance.host.privateIp>` or `<+instance.host.publicIp>` instead.
:::

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

The following provisioners are supported for WinRM deployments:

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

For WinRM infrastructures, Harness needs the following settings mapped to outputs:

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

For WinRM PDC deployments, you use the expression `<+provisioner.OUTPUT_NAME>` for the **Host Array Path** setting. 

`OUTPUT_NAME` depends on your provisioner outputs configuration, make sure `OUTPUT_NAME` to be an array object.

In case the `OUTPUT_NAME` is stored into several output objects, make sure the map the full path to it.

Below you will see a Terraform provisioner example where terraform `OUTPUT_NAME` is called 'hostInstances'.

For the subsequent **Host Data Mapping** key-value pairs, you use the expression format `<HOST_PROPERTY>`. For example, `<+public_dns>` or `<+privateIp>` which are part of terraform output configuration in below snippet example.

Here's an example:

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/8722541e819fd752abc35693bd00e38cca2bce5df264afa89cbf61288fbc0604.png')} width="50%" height="50%" title="Click to view full size image" />
</div>


#### Example

Here's a snippet of a Terraform script that provisions the infrastructure for an AWS EC2 VM WinRM deployment and includes the required outputs for Physical Data Center:

```json

provider "aws" {
  region = "us-east-1"  # Replace with your desired AWS region
}

resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "example" {
  vpc_id     = aws_vpc.example.id
  cidr_block = "10.0.1.0/24"
}

resource "aws_security_group" "example" {
  name_prefix = "example-"
}

resource "aws_instance" "example" {
  ami                    = "ami-xxxxxxxxxxxxxxxxx"  # Replace with the desired Windows AMI ID
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.example.id
  vpc_security_group_ids = [aws_security_group.example.id]

  tags = {
    Name = "ExampleInstance"
  }

  provisioner "remote-exec" {
    inline = [
      "winrm quickconfig -q",
      "winrm set winrm/config/service/auth @{Basic=\"true\"}",
      "winrm set winrm/config/service @{AllowUnencrypted=\"true\"}",
      "winrm set winrm/config/winrs @{MaxMemoryPerShellMB=\"1024\"}",
    ]
  }

  connection {
    type        = "winrm"
    user        = "Administrator"
    password    = "YourPassword"  # Replace with your desired Windows password
    timeout     = "10m"
    insecure    = true
    https       = true
  }
}

output "hostInstances" {
  value = [
    {
      public_dns  = aws_instance.example.public_dns
      privateIp = aws_instance.example.private_ip
      subnetId  = aws_subnet.example.id
      region    = provider.aws.region
    }
  ]
}

```


In the Harness Infrastructure Definition, you map outputs to their corresponding settings using expressions in the format `<+provisioner.OUTPUT_NAME>`, such as `<+provisioner.region>`.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/8722541e819fd752abc35693bd00e38cca2bce5df264afa89cbf61288fbc0604.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

#### Reference mapped instance properties

Once you have mapped provisioning script outputs to the stage Infrastructure Definition, you can reference them in **Execution** of the stage.

To reference a mapped output, you use an expression in the format `<+instance.properties.*>`.

For example, here are some **Host Data Mapping** *keys* and expressions that reference them:

- hostname: `<+instance.properties.hostname>`
- privateIp: `<+instance.properties.privateIp>`
- subnetId: `<+instance.properties.subnetId>`
- region: `<+instance.properties.region>`

## Use a Basic Deployment for WinRM Execution

You are now taken to **Execution Strategies** where you will use a deployment strategy and run your pipeline.

1. In **Execution Strategies**, select **Basic**.
2. For **Package type**, select **tudolist.zip** and keep the defaults for the other selections.
3. Click **Use Strategy**. Harness adds the **Deploy** step for execution.
4. In the **Deploy** step that is added to your pipeline, click **Deploy**.

## IIS Deployments with WinRM

Harness provides built-in support for deploying to Microsoft IIS (Internet Information Services) through WinRM. When you configure an execution strategy, the **Artifact Type** dropdown lets you select an IIS-specific deployment type. Each type ships with a pre-built PowerShell command template that automates application pool management, directory setup, and artifact deployment on the target Windows host.

The Artifact Type dropdown in the execution strategy screen offers four options. Three are IIS-specific, and the fourth is a generic option:

- **IIS Application:** Deploys an application under an existing IIS Website. This is the most common option for deploying ASP.NET web apps to an existing Default Web Site or custom site. Harness creates or updates the application pool and maps the application to the specified physical path.
- **IIS Virtual Directory:** Deploys content to a virtual directory within an IIS Website. Use this when you need to serve static content or a sub-application from a specific URL path without creating a separate application pool.
- **IIS Website:** Deploys a standalone IIS Website with its own bindings and application pool. Choose this when you are setting up a new site from scratch rather than adding to an existing one.
- **Other:** A generic deployment type with no IIS-specific automation. Use this when deploying non-IIS artifacts or when you want full control over the deployment scripts.

### Create the WinRM service

Before configuring the execution strategy, set up a WinRM service with your IIS deployment artifact.

1. In the pipeline stage, under **Service**, select **New Service**.
2. Enter a name for the service (for example, **winrm-service**).
3. For **Deployment Type**, select **WinRM**.
4. Under **Artifacts**, click **+ Add Artifact Source** to configure the connector and artifact details for your IIS application package (`.zip` file). You can use Harness Artifact Registry (Generic format), Artifactory, S3, Nexus, Jenkins, or a Custom artifact source.
5. Under **Config Files**, optionally add configuration files such as `web.config` that should be deployed alongside the artifact. If your `web.config` is already inside the artifact `.zip`, you can skip this.
6. Under **Variables**, define any service-level variables your deployment scripts need.
7. Click **Save**.

:::tip Quick test artifact
To test the pipeline without building a full application, create a minimal static HTML site. Create an `index.html` with a simple heading and a `web.config` that sets `index.html` as the default document. Zip both files and upload the `.zip` to your artifact registry (for example, Harness Artifact Registry with **Generic** format). IIS will serve this as a working website.
:::

<details>
<summary>Service YAML example</summary>

The following YAML shows a WinRM service definition using Harness Artifact Registry with a Generic format artifact. Replace the placeholder values with your own registry and artifact details.

```yaml
service:
  name: winrm-service
  identifier: winrmservice
  serviceDefinition:
    type: WinRm
    spec:
      artifacts:
        primary:
          primaryArtifactRef: <+input>
          sources:
            - identifier: winrm
              type: Har
              spec:
                registryRef: YOUR_REGISTRY
                type: generic
                spec:
                  artifact: iis-hello-app
                  version: "1.0"
                  fileName: iis-hello-app.zip
  gitOpsEnabled: false
```

| Field | Description |
| --- | --- |
| `serviceDefinition.type` | Must be `WinRm` for WinRM deployments. |
| `sources[].type` | `Har` for Harness Artifact Registry. Other supported values: `ArtifactoryRegistry`, `AmazonS3`, `Nexus3Registry`, `Jenkins`, `CustomArtifact`. |
| `registryRef` | Reference to your Harness Artifact Registry. |
| `type` | Repository format within the registry. Use `generic` for `.zip` artifacts. |
| `artifact` | The artifact name as uploaded to the registry. |
| `version` | The artifact version string. |
| `fileName` | The file name of the artifact in the registry. |
| `primaryArtifactRef` | Set to `<+input>` to select the artifact source at pipeline runtime. |

</details>

### Configure the infrastructure

Set up the environment and infrastructure definition to target your Windows hosts. For a detailed walkthrough of each infrastructure type (PDC, Azure, AWS), refer to the [Configure the Environment and Infrastructure](#configure-the-environment-and-infrastructure) section above.

Before configuring the infrastructure in Harness, make sure your target Windows host has IIS installed and WinRM enabled. Run these commands on the host as Administrator:

:::warning
The following WinRM configuration enables unencrypted traffic and Basic authentication, which transmit credentials in plaintext. Use this configuration for testing and development only. For production environments, configure WinRM over HTTPS (port 5986) with SSL enabled and avoid `AllowUnencrypted` and Basic auth.
:::

```powershell
Install-WindowsFeature -name Web-Server -IncludeManagementTools
Install-WindowsFeature -name Web-Asp-Net45
winrm quickconfig -q
winrm set winrm/config/service '@{AllowUnencrypted="true"}'
winrm set winrm/config/service/auth '@{Basic="true"}'
winrm set winrm/config/winrs '@{MaxMemoryPerShellMB="1024"}'
```

If the host is an AWS EC2 instance, add an inbound rule to the security group allowing TCP port **5985** from the Delegate's IP or subnet.

When using the PDC infrastructure type, select **Specify hosts** and enter the public IP (or private IP if the Delegate is in the same network) of your Windows Server. For **Specify Credentials**, create a new WinRM credential with these settings:

| Field | Value |
| --- | --- |
| **Auth Scheme** | NTLM |
| **Domain** | The machine name of the Windows host (for local accounts) or your Active Directory domain |
| **Username** | `Administrator` (or a user with admin privileges) |
| **Password** | Create a secret with the host's admin password |
| **Use SSL** | Unchecked for HTTP (port 5985), checked for HTTPS (port 5986) |
| **WinRM Port** | `5985` (HTTP) or `5986` (HTTPS) |

Click **Save and Continue**, enter the host IP on the verification screen, and click **Test Connection**. After verification, click **Preview Hosts** to confirm the host resolves correctly.

<details>
<summary>Infrastructure definition YAML example</summary>

The following YAML shows a PDC infrastructure definition for an IIS WinRM deployment. Replace the placeholder values with your own host IP and credential reference.

```yaml
infrastructureDefinition:
  name: winrm
  identifier: winrm
  orgIdentifier: default
  projectIdentifier: YOUR_PROJECT
  environmentRef: YOUR_ENVIRONMENT
  deploymentType: WinRm
  type: Pdc
  spec:
    credentialsRef: YOUR_WINRM_CREDENTIAL
    hostFilter:
      type: All
      spec: {}
    hosts:
      - YOUR_HOST_IP
  allowSimultaneousDeployments: false
```

| Field | Description |
| --- | --- |
| `deploymentType` | Must be `WinRm`. |
| `type` | Infrastructure type. `Pdc` for Physical Data Center. |
| `credentialsRef` | Reference to the WinRM credential secret you created. |
| `hosts` | List of target host IPs or hostnames. |
| `hostFilter.type` | Set to `All` to deploy to all specified hosts. |
| `allowSimultaneousDeployments` | Set to `true` if you want multiple pipelines to deploy to this infrastructure concurrently. |

</details>

### Select the execution strategy and artifact type

The execution strategy screen is where you configure the IIS-specific deployment behavior.

1. In **Execution Strategies**, select **Rolling**, **Canary**, or **Basic** depending on your rollout needs.
2. In the **Artifact Type** dropdown, select the IIS deployment type that matches your use case (**IIS Application**, **IIS Virtual Directory**, **IIS Website**, or **Other**).
3. For **Instances**, configure the instance count or percentage. With Rolling deployments, this controls how many hosts are updated simultaneously.
4. Click **Use Strategy**. Harness adds the **Deploy** step to your execution with the appropriate IIS PowerShell command template.

### IIS command script templates

When you select an IIS artifact type, Harness automatically populates the Deploy step with a built-in PowerShell command template. For example, selecting **IIS Application** loads the **Default IIS Application PowerShell** template (referenced as `account.Default_IIS_Application_PowerShell`). This template handles downloading the artifact, configuring the IIS application pool, and deploying the application to the target directory.

Click on the **Deploy** step and select the **Inputs** tab to view and customize the template variables. The following table describes each input variable:

| Variable | Description | Default Value |
| --- | --- | --- |
| `ReleaseNo` | Version identifier for the release. Used to organize deployment directories. | `0.1` |
| `AppPoolName` | Name of the IIS Application Pool. Harness creates the pool if it does not exist, or updates it if it does. | `DefaultAppPool` |
| `AppPoolDotNetVersion` | The .NET CLR version assigned to the application pool (for example, `v4.0` or `v2.0`). Set to an empty string for "No Managed Code". | `v4.0` |
| `DownloadDirectory` | Local path on the target host where the artifact is downloaded before extraction. | `$env:TEMP` |
| `AppPhysicalDirectory` | Base path for the application's physical directory on the target host. | `$env:SYSTEMDRIVE` |
| `DestinationDirectory` | Final directory where the application files are deployed. Supports Harness expressions for dynamic paths. | `%USERPROFILE%\<+service.name>\<+env.name>` |

You can override any of these values with fixed strings or [Harness expressions](/docs/platform/variables-and-expressions/harness-variables). After making changes, click **Apply Changes** to save the updated configuration.

:::tip
Use Harness expressions like `<+service.name>` and `<+env.name>` in directory paths to keep deployments organized across services and environments without hardcoding values.
:::

<details>
<summary>Pipeline YAML example (Rolling IIS Application)</summary>

The following YAML shows a complete pipeline for a Rolling IIS Application deployment using WinRM. It includes both the deploy and rollback step groups. Replace the placeholder values with your own project, service, environment, and infrastructure references.

```yaml
pipeline:
  name: iis-winrm
  identifier: iiswinrm
  projectIdentifier: YOUR_PROJECT
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: deploy-iis
        identifier: deploy_iis
        description: ""
        type: Deployment
        spec:
          deploymentType: WinRm
          service:
            serviceRef: YOUR_SERVICE
            serviceInputs:
              serviceDefinition:
                type: WinRm
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
          environment:
            environmentRef: YOUR_ENVIRONMENT
            deployToAll: false
            infrastructureDefinitions:
              - identifier: YOUR_INFRASTRUCTURE
          execution:
            steps:
              - stepGroup:
                  name: Phase
                  identifier: Phase
                  strategy:
                    repeat:
                      items: <+stage.output.hosts>
                      maxConcurrency: 1
                      partitionSize: 1
                      unit: Count
                  steps:
                    - stepGroup:
                        name: Phase Group
                        identifier: phase_group
                        strategy:
                          repeat:
                            items: <+repeat.partition>
                        steps:
                          - step:
                              name: Deploy
                              identifier: Deploy
                              timeout: 10m
                              template:
                                templateRef: account.Default_IIS_Application_PowerShell
                                templateInputs:
                                  type: Command
                                  spec:
                                    environmentVariables:
                                      - name: ReleaseNo
                                        type: String
                                        value: "0.1"
                                      - name: AppPoolName
                                        type: String
                                        value: DefaultAppPool
                                      - name: AppPoolDotNetVersion
                                        type: String
                                        value: v4.0
                                      - name: DownloadDirectory
                                        type: String
                                        value: $env:TEMP
                                      - name: AppPhysicalDirectory
                                        type: String
                                        value: $env:SYSTEMDRIVE
                                      - name: DestinationDirectory
                                        type: String
                                        value: "%USERPROFILE%\\<+service.name>\\<+env.name>"
            rollbackSteps:
              - stepGroup:
                  name: Phase
                  identifier: Phase
                  strategy:
                    repeat:
                      items: <+stage.output.hosts>
                      maxConcurrency: 1
                      partitionSize: 1
                      unit: Count
                  steps:
                    - stepGroup:
                        name: Phase Group Rollback
                        identifier: phase_group
                        strategy:
                          repeat:
                            items: <+repeat.partition>
                        steps:
                          - step:
                              name: Rollback
                              identifier: Deploy
                              timeout: 10m
                              template:
                                templateRef: account.Default_IIS_Application_PowerShell
                                templateInputs:
                                  type: Command
                                  spec:
                                    environmentVariables:
                                      - name: ReleaseNo
                                        type: String
                                        value: "0.1"
                                      - name: AppPoolName
                                        type: String
                                        value: DefaultAppPool
                                      - name: AppPoolDotNetVersion
                                        type: String
                                        value: v4.0
                                      - name: DownloadDirectory
                                        type: String
                                        value: $env:TEMP
                                      - name: AppPhysicalDirectory
                                        type: String
                                        value: $env:SYSTEMDRIVE
                                      - name: DestinationDirectory
                                        type: String
                                        value: "%USERPROFILE%\\<+service.name>\\<+env.name>"
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
```

Key things to note in this pipeline YAML:

- **`templateRef: account.Default_IIS_Application_PowerShell`:** References the built-in IIS Application template at the account level. Harness provides this template out of the box.
- **Rolling strategy:** The outer step group repeats over `<+stage.output.hosts>` with `maxConcurrency: 1` and `partitionSize: 1`, deploying to one host at a time.
- **Rollback steps:** Mirror the deploy steps so that a failed deployment automatically rolls back using the same IIS template.
- **Environment variables:** These map directly to the IIS command script template inputs described in the table above.

</details>

### IIS Virtual Directory and IIS Website templates

The **IIS Virtual Directory** and **IIS Website** artifact types follow the same pattern as IIS Application but use different PowerShell templates tailored to their specific IIS resource types.

**IIS Virtual Directory** creates or updates a virtual directory under an existing IIS Website. Its template variables are similar to IIS Application but focus on the virtual directory path and physical path mapping rather than application pool settings.

**IIS Website** provisions a complete IIS Website with its own site bindings (protocol, port, hostname) and a dedicated application pool. The template variables include additional fields for configuring site bindings alongside the standard directory and application pool parameters.

Select the appropriate artifact type based on your deployment target, and review the template inputs to confirm they match your IIS configuration.

## Run the Pipeline to Deploy and Review

After selecting the Execution Strategy, we are now ready to run the pipeline.

1. Click **Run** to run the pipeline.
2. In **Run Pipeline**, for **Artifact Path**, click the down-drop arrow. Harness displays a list of available artifact packages.
3. Select the artifact file (for example, **todolist.zip** for a generic deployment or your IIS application `.zip` for an IIS deployment).
4. Click **Run Pipeline**. Harness runs the pipeline and the **Console View** displays the tasks executed for each step.

For IIS deployments, the Deploy step executes the IIS PowerShell template which downloads the artifact, creates or updates the application pool, extracts the files to the destination directory, and configures the IIS Application, Virtual Directory, or Website depending on the artifact type you selected. You can verify the deployment by opening the IIS site URL in a browser on the target host.

You have now successfully created and completed the steps for running a pipeline by using WinRM.

## WinRM session reuse

:::note
This feature requires:
- Feature flag `CDS_SHARED_SESSION_WINRM_NTLM_NG` enabled for your account
- Minimum delegate version: 889xx

Contact [Harness Support](mailto:support@harness.io) to enable the feature flag.
:::

By default, Harness creates a new WinRM connection for every command step in a pipeline. In environments that use JEA (Just Enough Administration) or have high session initialization overhead, each new session can take 30 seconds to over a minute to establish. Pipelines with multiple steps accumulate this connection cost on every execution.

With session reuse enabled, Harness maintains a session pool on the delegate. When a command step runs, Harness checks the pool for an existing idle session to the same host using the same WinRM credential. If one is available, it is reused, eliminating the connection setup cost entirely. The pipeline logs show `Reusing shared WinRM session` when a pooled session is used and `Creating new shared WinRM session` when a fresh one is established.

### Supported authentication methods

Session reuse is supported only for **NTLM authentication**. Kerberos authentication does not support session pooling because it relies on an external process-based authentication model that cannot be effectively pooled.

### How sessions are pooled

Sessions in the pool are organized into **session groups**. The WinRM credential (host + username) acts as the key for each group, ensuring that sessions are never shared across different credentials or hosts. Each group can hold multiple idle sessions, and any idle session within the group can be picked up by any command step that uses the same credential.

When the pool reaches its maximum capacity, Harness automatically evicts the oldest idle session to make room for new connections. If all sessions in the pool are currently in use, the new session is created but not added to the pool. After the command completes, the session is closed immediately.

A background cleanup thread runs periodically to remove stale or idle sessions that have exceeded the configured idle timeout. When the delegate shuts down, all pooled sessions are closed automatically through a shutdown hook. This cleanup happens without manual intervention.

#### Error handling

When a session encounters an error during command execution, Harness determines whether to keep or remove the session from the pool based on the error type:

- **Connection errors** (network failures, SSL errors, connection resets, socket errors): The session is immediately removed from the pool and closed because the connection is no longer valid.
- **Command execution errors** (PowerShell script failures, non-zero exit codes): The session remains in the pool for reuse because the underlying connection is still valid. Only the command failed, not the session itself.

### Session sharing scope

Sessions in the pool are shared delegate-wide based on credentials:

- Sessions are reused across **all command steps** that use the same host and WinRM credential.
- Sessions can be shared between **different pipeline executions** running concurrently on the same delegate.
- Each command step acquires a session from the pool, executes its commands, and releases the session back to the pool for the next step to use.
- Sessions are never shared **simultaneously**. Only one command executes per session at a time to ensure isolation.

This delegate-wide pooling significantly reduces connection overhead in high-throughput scenarios where multiple pipelines deploy to the same Windows servers.

### Configure the session pool

You can tune the session pool behavior using the following delegate environment variables:

| Environment variable | Default | Description |
| --- | --- | --- |
| `WINRM_SESSION_POOL_MAX_SESSIONS` | `100` | Maximum number of sessions held in the pool at one time. When the pool reaches capacity, the oldest idle session is evicted to make room for new connections. |
| `WINRM_SESSION_POOL_IDLE_TIMEOUT_SECONDS` | `600` (10 min) | How long an idle session can remain in the pool before the cleanup thread removes it. Sessions that exceed this timeout are closed and removed during the next cleanup cycle. |
| `WINRM_SESSION_POOL_CLEANUP_INTERVAL_SECONDS` | `300` (5 min) | How frequently the cleanup thread scans the pool and removes sessions that have exceeded the idle timeout. |

Set these as environment variables on your Harness Delegate. Changes take effect after the delegate restarts.

### Reading the session pool logs

Each log line from a pooled session includes the group ID and session ID in the format:

```
[<host>:<port>/<user>#<groupId>-<sessionId>]
```

For example:

```
[ec2-54-225-189-86.compute-1.amazonaws.com:5985/Administrator#303541-d9566f]
```

In this example:
- **Group ID** (`303541`): Identifies the session group. All sessions with the same group ID share the same host and credential.
- **Session ID** (`d9566f`): Unique identifier for this specific session instance. Use this to track individual session lifecycle events across multiple command steps.

These identifiers help you correlate log lines across steps and trace which session was used for each command execution.

### Monitoring the session pool

The delegate logs pool statistics during each cleanup cycle. Look for log lines like:

```
SharedWinRM session pool statistics: groups=3, totalSessions=12, inUse=4, idle=8, stale=0
```

These metrics help you:
- **Verify sessions are being reused**: Check that `totalSessions` is greater than zero and `inUse` increases during deployments.
- **Detect pool capacity issues**: If `totalSessions` consistently equals `WINRM_SESSION_POOL_MAX_SESSIONS`, consider increasing the pool size.
- **Identify cleanup problems**: If `stale` sessions accumulate, review your idle timeout settings or check for connection issues preventing cleanup.

### Troubleshooting

#### Sessions are not being reused

If you notice new sessions being created instead of reusing existing ones:

1. **Verify the feature flag is enabled**: Confirm that `CDS_SHARED_SESSION_WINRM_NTLM_NG` is enabled for your Harness account.
2. **Check authentication method**: Session pooling only works with NTLM authentication. If you're using Kerberos, sessions will not be pooled.
3. **Confirm credential consistency**: Sessions are only reused when the host and credential are identical. Different usernames or hosts will result in separate session groups.
4. **Review delegate logs**: Search for `POOL_HIT` (session reused) vs `POOL_MISS` (new session created) messages to understand pooling behavior. Note that these messages are only visible when debug logging is enabled on the delegate.

#### Pool capacity warnings

If you see warnings about the pool being full:

1. **Increase pool size**: Set `WINRM_SESSION_POOL_MAX_SESSIONS` to a higher value based on your deployment concurrency needs.
2. **Review idle timeout**: If sessions are held too long, reduce `WINRM_SESSION_POOL_IDLE_TIMEOUT_SECONDS` to free up capacity faster. Keep the idle timeout higher than the cleanup interval (`WINRM_SESSION_POOL_CLEANUP_INTERVAL_SECONDS`) to ensure sessions have time to be reused before cleanup.
3. **Check for connection errors**: Persistent connection errors prevent sessions from being returned to the pool. Review error logs and fix underlying connectivity issues.

#### Connection errors after pooling enabled

If you experience increased connection errors after enabling session reuse:

1. **Check WinRM connection limits**: Windows has default limits on concurrent WinRM connections. Increase the `MaxShellsPerUser` limit on target hosts if needed.
2. **Review firewall settings**: Ensure your network firewall allows persistent WinRM connections and doesn't terminate idle connections prematurely.
3. **Adjust timeout settings**: If your network has aggressive timeout policies, decrease `WINRM_SESSION_POOL_IDLE_TIMEOUT_SECONDS` to prevent idle sessions from being terminated by network infrastructure.

## Selective Rerun and Skipping Hosts with Same Artifact

You can do a **selective rerun** for traditional deployments. These improvements ensure:
- **Efficient reruns**: Redeploy only on failed hosts instead of all hosts.
- **Expressions for failed hosts**: Retrieve failed hosts dynamically for debugging and retry logic.

For more information, goto [Selective Rerun and Skipping Hosts with Same Artifact](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng/#selective-rerun-and-skipping-hosts-with-same-artifact)

## Notes

### Reference hosts in steps using expressions

You can use the following [instance expressions](/docs/platform/variables-and-expressions/harness-variables) to reference your hosts:

#### For Microsoft Azure or Physical Data Center (PDC):

- `<+instance.hostName>`
- `<+instance.host.hostName>`
- `<+instance.name>`

#### For Microsoft Azure and AWS:

- `<+instance.host.privateIp>`
- `<+instance.host.publicIp>`

:::info
- **For AWS with WinRM deployments:**  
  Hostname-based expressions like `<+instance.hostName>` and `<+instance.host.hostName>` are **not supported**. Use `<+instance.host.privateIp>` or `<+instance.host.publicIp>` instead.

- **For Azure with WinRM deployments:**  
  Hostname-based expressions are supported if the hostname is available from the VM metadata.

- `instance.name` has the same value as `instance.hostName`. Both are available for backward compatibility.
:::

## Limitations  

The **Copy** command for artifacts is not supported in **WinRM deployments**. As an alternative, users can use the **Download Artifact** command.  

## FAQs

For frequently asked questions about traditional deployments in Harness, go to [SSH and WinRM deployment FAQs](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-winrm-faqs).


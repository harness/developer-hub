---
title: Harness YAML Code Reference
description: Learn the YAML code keys and values used in the Harness Manager code editor.
sidebar_position: 10
helpdocs_topic_id: 21kgaw4h86
helpdocs_category_id: iucs9fawif
helpdocs_is_private: false
helpdocs_is_published: true
---

This document describes the YAML code keys and values used in the Harness Manager code editor to describe Harness Services, Environments, Workflows, and other components.

For how-tos on using YAML in Harness, see [Configuration as Code Overview](../../config-as-code/configuration-as-code.md).

![](./static/harness-yaml-code-reference-00.png)
For each YAML file described in this document, the default keys are listed with example values and commented descriptions, for example:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: ACCOUNT_DEFAULTS # The ACCOUNT_DEFAULTS value identifies the file type.   
  
defaults:  
  
- name: myCompany # The default name for the account.  
  
  value: Product Harness Account # A description of the Harness account.
```
All files must have the **.yaml** file extension. The .yml extension is not supported.

## Harness and YAML

Harness supports the [YAML spec version 1.2](https://yaml.org/spec/1.2/spec.html). The YAML spec does not identify invalid characters, just the reserved characters # > -. As long as there are single or double quotes around a string, it is allowed by YAML; however, Harness has requirements for what values can be used for different YAML keys. The best way to test is to use the value in the UI and see if an error occurs.

## Harness Code and Git Repositories

You can sync Harness YAML with your Git repo. You can sync individual Applications or your entire Harness configuration. For more information, see [Configuration as Code](../../config-as-code/configuration-as-code.md).


## What Code Is Required?

Unless mentioned, all default folders displayed in the Harness Manager code editor are required. The required files and YAML keys depend on your configuration. When in doubt, consult the Harness Manager UI and look for required fields, marked with as asterisk (\*).

If you sync your Harness Application with a Git repo and then delete a required file in Git and sync with Harness, the file is not replaced by Harness.

## Encrypted Information in YAML

By default, Harness encrypts secrets such as passwords, files, and keys in Amazon KMS. In the YAML, you will see something like this:


```
fileName: amazonkms:_A1B2C3D4E5
```
This is the KMS record for the secret that Harness has created and stored in the KMS vault. This record has the information needed to connect and retrieve the secret from KMS.

You can also set Harness to use other secrets managers, such as HashiCorp Vault and AWS Secrets Manager.

In the Harness UI, you can reference pre-existing secrets in Vault and AWS Secrets Manager using a path, as described in [Referencing Existing Secrets](../../security/secrets-management/secret-management.md#referencing-existing-secrets).

### HashiCorp Vault

For HashiCorp Vault, you can also use the Harness YAML editor to reference pre-existing secrets in Vault using a fully-qualified path, such as `hashicorpvault://LocalVault/foo/bar/mysecret#mykey`. The scheme `hashicorpvault://` is needed to distinguish a Vault secret from other secret references. It is followed by the name of the Vault secret manager. In the following example, `LocalVault`:

![](./static/harness-yaml-code-reference-01.png)


## RBAC and YAMl Editor in Harness Manager

Harness applies RBAC to the YAML Editor in Harness Manager.

The account and Application permissions configured in a Harness User Group determines what account and Application YAML is displayed in the YAML Editor.

See [Managing Users and Groups (RBAC)](../../security/access-management-howtos/users-and-permissions.md).

If you have synched your account or Application with Git, as described in [Configuration as Code](../../config-as-code/configuration-as-code.md), your Git provider RBAC settings apply on the Git side.

## Defaults.yaml for Account

The Defaults.yaml file describes the Harness account defaults. It contains the following fields:


```
harnessApiVersion: '1.0' # The Harness API version number. You cannot edit this value.  
  
type: ACCOUNT_DEFAULTS # The ACCOUNT_DEFAULTS value identifies the file type.   
  
defaults:  
  
- name: myCompany # The default name for the account.  
  
  value: Product Harness Account # A description of the Harness account.
```
## Harness API Version

You can edit `harnessApiVersion` in any YAML file but it does not have any impact.

## Applications

This folder contains all of the Harness applications in your Harness account. For more information on Applications, see [Application Checklist](../../../continuous-delivery/model-cd-pipeline/applications/application-configuration.md).

### Application folder

Each Harness Application is contained in a folder using its Application name.

### Index.yaml for Application

The index.yaml file describes the Application.


```
harnessApiVersion: '1.0' # The Harness API version number. You cannot edit this value.  
  
type: APPLICATION # The file type.  
  
description: A sample To-Do List application # The description of the Application.
```
### Defaults.yaml for Application

The Defaults.yaml file in an Application folder contains the Application-wide variables. For more information, see [Variables and Expressions in Harness](../variables/variables.md).


```yaml 
harnessApiVersion: '1.0' # The Harness API version number. You cannot edit this value.  
  
type: APPLICATION_DEFAULTS # The file type.  
  
defaults: # Application-wide variables collection.  
  
- name: BACKUP_PATH # The environment variable for the backup path on the host running the Harness Delegate.  
  
  value: $HOME/${app.name}/${service.name}/${env.name}/backup/${timestampId}  
  
- name: STAGING_PATH # The environment variable for the staging path on the host running the Harness Delegate.  
  
  value: $HOME/${app.name}/${service.name}/${env.name}/staging/${timestampId}  
  
- name: RUNTIME_PATH # The environment variable for the runtime path on the host running the Harness Delegate.  
  
  value: $HOME/${app.name}/${service.name}/${env.name}/runtime  
  
- name: WINDOWS_RUNTIME_PATH # The environment variable for the runtime path on the Windows host running the Harness Delegate.  
  
  value: '%USERPROFILE%\${app.name}\${service.name}\${env.name}\runtime'
```
## Services

The folders and files under **Services** define each Harness Service used in the Application. For more information, see [Add a Service](../../../continuous-delivery/model-cd-pipeline/setup-services/service-configuration.md).

### Service Folder

Each Service in the Application is contained in a folder using its name, such as **Harness Sample App**. All folders and files that define the Service are contained in the Service's folder.

### Index.yaml for Service

The primary file for the Service. Its contents depend on the Service type, such as Docker Image or JAR, and the configuration.

Here is an example a Index.yaml for a Docker Image Service:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: SERVICE # The file type.  
  
artifactType: DOCKER # The Service type.  
  
configMapYaml: |- # The Kubernetes ConfigMap block.  
  
  kubectl describe configmaps my-config  
  
  Name:           my-config  
  
  Namespace:      default  
  
  Labels:         <none>  
  
  Annotations:    <none>  
  
  Data  
  
  ====  
  
  my.properties:        158 bytes  
  
configVariables: # User-added config variables.  
  
- name: foo  
  
  value: bar  
  
  valueType: TEXT  
  
helmValueYaml: | # The Helm values.yaml block.  
  
  # Enter your Helm value YAML  
  
  # ---  
  
  namespace : ${NAMESPACE}
```
### Deployment Specifications

This folder contains the Service-specific container specifications. For example, a Service that contains a Kubernetes Container Specification will display that specification in this folder.

A service that uses an ECS Container Specification and Service Specification will display those specs in this folder.

Here is a Kubernetes Container Specification with the default comments removed:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: KUBERNETES # The Deployment Specification type.  
  
advancedConfig: | # This block contains the Kubernetes deployment specification.  
  
  # Enter your Controller YAML spec below.  
  
  # ---  
  
  apiVersion: "extensions/v1beta1"  
  
  kind: "Deployment"  
  
  metadata:  
  
    annotations: {}  
  
    finalizers:   
  
    labels: {}  
  
    ownerReferences:   
  
  spec:  
  
    replicas: 0  
  
    template:  
  
      metadata:  
  
        annotations: {}  
  
        finalizers:   
  
        labels: {}  
  
        ownerReferences:   
  
      spec:  
  
        containers:  
  
        - args:   
  
          command:   
  
          env:   
  
          envFrom:   
  
          image: "${DOCKER_IMAGE_NAME}"  
  
          name: "${CONTAINER_NAME}"  
  
          ports:   
  
          volumeMounts:   
  
        hostAliases:   
  
        imagePullSecrets:  
  
        - name: "${SECRET_NAME}"  
  
        initContainers:   
  
        nodeSelector: {}  
  
        tolerations:   
  
        volumes: 
```
### Artifact Servers

This folder contains the Artifact Sources for the Service. Here is an Artifact Source that uses an SFTP Artifact Server to obtain files matching the regex pattern **Downloads\todo\*.\*zip**:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: SFTP # The Artifact Source type.  
  
artifactPaths: # The artifact path on the SFTP server.  
  
- Downloads\todo*.*zip # Regex path.  
  
metadataOnly: true # Harness will only obtain metadata for the artifact.  
  
serverName: SFTP-Local # The name of the Artifact Server selected.
```
Here is an Artifact Source that uses a Docker Registry Artifact Server to obtain an Nginx artifact:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: DOCKER # The Artifact Source type.  
  
imageName: library/nginx # The Docker image registry and image name.  
  
metadataOnly: true # Harness will only obtain metadata for the artifact.  
  
serverName: registry_hub_docker_com # The name of the Artifact Server selected.
```
### Commands

This folder contains the scripts for commands that are in the Service, such as Bash and PowerShell scripts. Here is an example of some common scripts:

![](./static/harness-yaml-code-reference-02.png)

Here is the code for the Install.yaml file that contains the Install script:


```
harnessApiVersion: '1.0'  
type: OTHER  
commandUnitType: COMMAND  
commandUnits:  
- command: echo "this is an exec command"  
  commandUnitType: EXEC  
  deploymentType: SSH  
  name: Exec  
  scriptType: BASH  
  workingDirectory: dir  
- artifactVariableName: artifact  
  commandUnitType: SCP  
  deploymentType: SSH  
  destinationDirectoryPath: $WINGS_RUNTIME_PATH  
  name: SCP  
  source: ARTIFACTS  
- command: |2-  
  
    # Execute as root and pass environment variables  
    # su -p -  
  
    # Execute as root via user credentials (with root privileges)  
    # sudo -E su -p -  
  
    # The following variables are absolute paths defined as:  
    # ${HOME}/${appName}/${serviceName}/${serviceTemplateName}/[runtime|backup|staging]  
  
    mkdir -p "$WINGS_RUNTIME_PATH"  
    mkdir -p "$WINGS_BACKUP_PATH"  
    mkdir -p "$WINGS_STAGING_PATH"  
  commandUnitType: SETUP_ENV  
  deploymentType: SSH  
  name: Setup Env  
  scriptType: BASH  
  workingDirectory: dir  
- command: |-  
    docker login --username="$DOCKER_USER_ID" --password="$DOCKER_USER_PASSWORD"  
    docker run -d -it "$DOCKER_IMAGE"  
    docker logout  
  commandUnitType: DOCKER_START  
  deploymentType: SSH  
  name: Docker Start  
  scriptType: BASH  
- command: docker ps -a -q --filter ancestor=$IMAGE | xargs docker stop  
  commandUnitType: DOCKER_STOP  
  deploymentType: SSH  
  name: Docker Stop  
  scriptType: BASH  
- artifactVariableName: artifact  
  commandUnitType: DOWNLOAD_ARTIFACT  
  deploymentType: SSH  
  name: Download Artifact  
  scriptType: BASH  
  workingDirectory: ${app.defaults.RUNTIME_PATH}  
- command: |-  
    set -x  
    pgrep -f "\-Dcatalina.home=$WINGS_RUNTIME_PATH/tomcat"  
  commandUnitType: PROCESS_CHECK_RUNNING  
  deploymentType: SSH  
  name: Process Running  
  scriptType: BASH  
- command: |-  
    set -x  
    pgrep -f "\-Dcatalina.home=$WINGS_RUNTIME_PATH/tomcat"  
    rc=$?  
    if [ "$rc" -eq 0 ]  
    then  
    exit 1  
    fi  
  commandUnitType: PROCESS_CHECK_STOPPED  
  deploymentType: SSH  
  name: Process Stopped  
  scriptType: BASH  
- command: |-  
    set -x  
    nc -v -z -w 5 localhost 8080  
    rc=$?  
    if [ "$rc" -eq 0 ]  
    then  
    exit 1  
    fi  
  commandUnitType: PORT_CHECK_CLEARED  
  deploymentType: SSH  
  name: Port Cleared  
  scriptType: BASH  
- command: |-  
    set -x  
    nc -v -z -w 5 localhost 8080  
  commandUnitType: PORT_CHECK_LISTENING  
  deploymentType: SSH  
  name: Port Listening  
  scriptType: BASH  
targetToAllEnv: true
```
### Template Library Commands

The **Commands** folder displays different YAML keys to indicate that a script is linked from the [Template Library](../../../continuous-delivery/concepts-cd/deployment-types/use-templates.md). For example, the following script named **JSON to Environment Variables** is linked to the **JSON to Environment Variables** script in the Template Library:

![](./static/harness-yaml-code-reference-03.png)
Here is the YAML for the script:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: START # The script type.  
  
commandUnitType: COMMAND # This is a Linux command.  
  
commandUnits: # Linux command units. The grep and subsequent commands and printed on one line.  
  
- command: grep -Eo '.*:.*?[^\\]"' ${ArtifactFileName} | sed 's/\"//g' | awk -F':' '{print "export " $1 "=\"" $2 "\""}' > __dummy.sh && . ./__dummy.sh && rm __dummy.sh  
  
  commandUnitType: EXEC # Exec command unit.   
  
  deploymentType: SSH # Remote machine execute.  
  
  name: Exec # The name of the command in the GUI.  
  
  scriptType: BASH # Script language.  
  
  workingDirectory: $RuntimePath # Environment variable.  
  
targetToAllEnv: true # Apply to all Harness Environments.  
  
# The following path is the location of the template in the user's Template Library  
  
templateUri: johndoe/Generic Commands/Json to Environment Variables:latest  
  
templateVariables: # Variable used in the template  
  
- name: RuntimePath  
  
  value: foo  
  
- name: ArtifactFileName  
  
  value: bar
```
### Config Files

This folder contains the files added to the Config Files section of a Service. Here is an example with a text file and an encrypted PDF file.

![](./static/harness-yaml-code-reference-04.png)

Here is an example of the YAML file for an encrypted file in Config Files:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: CONFIG_FILE # The YAML file type.  
  
checksumType: MD5 # The hash function type.  
  
description: encrypted-file-example # The description provided by the user.  
  
encrypted: true # Encrypted file boolean value.  
  
fileName: amazonkms:_gzC7yG5RAaC4kZNafymow # Harness KMS encryptedRecords entry used to decrypt file.  
  
targetFilePath: encrypted-config-file-example.enc # The original filename.  
  
targetToAllEnv: true 
```
## Environments

The folders and files under Environments define each Harness Environments used in the Application. For more information, see Add an Environment.

### Environments Folder

Each Environment in the Application is contained in a folder using its name, such as **QAEnv**. All folders and files that define the Environment are contained in the Environment's folder.

### Index.yaml for Environment

The primary file for an Environment. Here is a sample Index.yaml for a Non-Production Environment:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: ENVIRONMENT  # The file type.  
  
environmentType: NON_PROD # The Environment type.
```
Variable Overrides and, in the case of Kubernetes, ConfigMap YAML Overrides, are stored in the Index.yaml file. For example, here is a **Service Configuration Overrides** section of an **Environment** that contains simple **Variable Overrides** and **ConfigMap YAML Overrides** entries:

![](./static/harness-yaml-code-reference-05.png)

The Index.yaml example we used above now includes these variable overrides, highlighted below:


```
harnessApiVersion: '1.0'  
  
type: ENVIRONMENT  
  
configMapYamlByServiceTemplateId:  
  
  tRmkVK3yQieFTlXrWqe7Cg: '# configMap Override'  
  
environmentType: NON_PROD  
  
variableOverrides: # Override Variables  
  
- name: foo # Configuration variable name.  
  
  serviceName: MyService # Service for the overridden variable.  
  
  value: foo-override  
  
  valueType: TEXT # Text type.  
  
- name: SecretVar # Configuration variable name.  
  
  serviceName: JAR-service # Service for the overridden variable.  
  
  value: amazonkms:2St-1zmsTeWFBtNqVqZvkg # Harness KMS encryptedRecords entry used to decrypt value.  
  
  valueType: ENCRYPTED_TEXT # Encrypted text type.
```
### Infrastructure Definition

The **Infrastructure Definition** file is named with the Infrastructure Definition name and describes the Infrastructure Definition settings.

![](./static/harness-yaml-code-reference-06.png)

```
harnessApiVersion: '1.0'  
type: INFRA_DEFINITION  
cloudProviderType: AWS  
deploymentType: AWS_LAMBDA  
infrastructure:  
- type: AWS_AWS_LAMBDA  
  cloudProviderName: aws_playground  
  iamRole: arn:aws:iam::448640225317:role/service-role/TestAwsLamdaRole  
  region: us-east-1  
  securityGroupIds:  
  - sg-05e7b8b9cad94b393  
  subnetIds:  
  - subnet-05788710b1b06b6b1  
  - subnet-0c945c814c09c9aed  
  vpcId: vpc-00a7e8ea4fd1ffd9d  
scopedServices:  
- AWS Lambda
```
The scopedServices section lists the Harness Services that can use this Infrastructure Definition. Each Service must be entered on a new like, like this:


```
scopedServices:  
- AWS Lambda  
- Lambda Example
```
### Service Verification

The files in this folder are for the [24/7 Service Guard Overview](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/24-7-service-guard-overview.md) verification configurations. Each configuration has its own file. Here is an example of a 24x7 Service Guard verification:


```
harnessApiVersion: '1.0' # The Harness API version number.   
  
type: ELK # The Verification Provider type.   
  
alertEnabled: false # Boolean value for enabling the alerts.   
  
alertThreshold: 0.5 # Threshold value to reach for triggering the alerts.   
  
baselineEndMinute: -1 # End time for baseline data.  
  
baselineStartMinute: -1 # Start time for baseline data.  
  
connectorName: ELK # Name of the Connector.   
  
enabled24x7: false # Boolean value for enabling the settings.   
  
hostnameField: host # Name of the host for which you want logs.   
  
index: filebeat-* # Index value to search.   
  
messageField: message # The field by which messages are usually indexed.   
  
query: '*exception_____*' # The API Query required to retrieve the metric value.   
  
serviceName: Kub_ser1 # Name of the Service.   
  
timestampField: '@timestamp' # Timestamp field in the Elasticsearch record.   
  
timestampFormat: yyyy-MM-dd'T'HH:mm:ss.SSSX # Format for the timestamp field in the Elasticsearch record.   

```
### Config Files

File Overrides in the Service Configuration Overrides of an Environment are listed in the Config Files folder. Here is a File Override in the UI:

![](./static/harness-yaml-code-reference-07.png)
The YAML file added for each File Override is named the same as the variable name. Here is the YAML in the file named after the variable, bar.yaml:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: CONFIG_FILE_OVERRIDE # The type of override.  
  
checksumType: MD5 The hash function type.  
  
encrypted: false # Boolean for whether the file in encrypted.  
  
fileName: bar # Name of the Service file to override.  
  
serviceName: MyService # Name of the Service containing the file to override.  
  
targetFilePath: bar # The file path or name of the file overridden.
```
### Values

The Service Configuration Overrides for ConfigMap YAML Overrides and Helm Values YAML Overrides are listed in the Values folder, under a Services folder, followed by a folder named using the Service name.

The ConfigMap YAML Overrides is named Index.yaml. Here is an example:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: APPLICATION_MANIFEST_VALUES_ENV_SERVICE_OVERRIDE # Type of override.  
  
storeType: Local  # Where the file is stored. Local means the Harness Data Store.
```
The values for the ConfigMap YAML Overrides are located in the Index.yaml for the Environment, as described in [Index.yaml for Environment](#index_yaml_for_environment).The Helm Values YAML Overrides is named values.yaml, and simply contains a Helm values.yaml file contents, for example:


```
# Helm values override  
harness:  
  helm:  
    chart:  
      name: nginx  
      version: 1.0.1  
      url: https://charts.bitnami.com/bitnami
```
## Workflows

This folder contains all Workflows for the Application. Each Workflow is in its own YAML file named after the Workflow name. Workflow YAML files have different key-value pairs depending on their configuration. We include to simple examples below. The order of the YAML does not always reflect the order of Workflow steps, commands, or deployment operations.

Here is the UI of a Basic Workflow of SSH deployment type:

![](./static/harness-yaml-code-reference-08.png)
Below is the Workflow YAML for the Basic Workflow SSH deployment type with all of its sections collapsed. Each section is discussed later in the document.


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: BASIC # The Workflow type.  
  
description: This is the workflow description. # Workflow description.  
  
envName: QAEnv # Environment used by the Workflow.  
  
failureStrategies: # Failure Strategy  
  
- executionScope: WORKFLOW  
  
notificationRules: # Notification Strategy  
  
- conditions:  
  
phases: # Workflow Steps  
  
- type: SSH # Deployment Type, SSH.  
  
preDeploymentSteps: # Pre-deployment check for Service artifacts.  
  
- type: ARTIFACT_CHECK  
  
rollbackPhases: # Rollback Steps.  
  
- type: SSH  
  
templatized: false # Identifies in the Workflow is templatized.  
  
userVariables: # Workflow variables.  
  
- type: TEXT
```
The following sections describe the YAML for each of the Workflow sections.

### Pre-Deployment Steps

Pre-deployment steps are simple checks for artifacts in Basic Workflows. Here is an example of pre-deployment steps for the Basic Workflow with SSH deployment type:


```
preDeploymentSteps:  
  
- type: ARTIFACT_CHECK  
  
  name: Artifact Check
```
### Basic Workflow Phases

Workflows deployment steps are are broken into phases. A Basic Workflow is one phase. A Canary Workflow can be two or more phases.

Here is an example of a single phase in a Basic Workflow SSH deployment type. It contains a Select Nodes and a Jenkins step:


```
phases:  
- type: SSH  
  computeProviderName: aws-docs-vars  
  daemonSet: false  
  infraDefinitionName: amazon web services- aws-docs-vars - AWS - us-east-1  
  name: Phase 1  
  phaseSteps:  
  - type: INFRASTRUCTURE_NODE  
    name: Prepare Infra  
    steps:  
    - type: AWS_NODE_SELECT  
      name: Select Nodes  
      properties:  
        excludeSelectedHostsFromFuturePhases: true  
        instanceCount: 3  
        instanceUnitType: COUNT  
        specificHosts: false  
    stepsInParallel: false  
  - type: DISABLE_SERVICE  
    name: Disable Service  
    stepsInParallel: false  
  - type: DEPLOY_SERVICE  
    name: Deploy Service  
    steps:  
    - type: JENKINS  
      name: Jenkins  
      properties:  
        jenkinsConfigId: Ze7ZvAFtSHOuDB5U_0wTQQ  
        jobName: HarshJenkins/harshjain12-patch-1  
        jobNameAsExpression: false  
        jobParameters: null  
        sweepingOutputName: null  
        sweepingOutputScope: null  
        timeoutMillis: 600000  
    stepsInParallel: false  
  - type: ENABLE_SERVICE  
    name: Enable Service  
    stepsInParallel: false  
  - type: VERIFY_SERVICE  
    name: Verify Service  
    stepsInParallel: false  
  - type: WRAP_UP  
    name: Wrap Up  
    stepsInParallel: false  
  provisionNodes: false  
  serviceName: SSH  
  statefulSet: false  
preDeploymentSteps:  
- type: ARTIFACT_CHECK  
  name: Artifact Check  
rollbackPhases:  
- type: SSH  
  computeProviderName: aws-docs-vars  
  daemonSet: false  
  infraDefinitionName: amazon web services- aws-docs-vars - AWS - us-east-1  
  name: Rollback Phase 1  
  phaseNameForRollback: Phase 1  
  phaseSteps:  
  - type: DISABLE_SERVICE  
    name: Disable Service  
    phaseStepNameForRollback: Enable Service  
    statusForRollback: SUCCESS  
    stepsInParallel: false  
  - type: STOP_SERVICE  
    name: Stop Service  
    phaseStepNameForRollback: Deploy Service  
    statusForRollback: SUCCESS  
    steps:  
    - type: COMMAND  
      name: Stop  
      properties:  
        commandName: Stop  
    stepsInParallel: false  
  - type: DEPLOY_SERVICE  
    name: Deploy Service  
    phaseStepNameForRollback: Deploy Service  
    statusForRollback: SUCCESS  
    stepsInParallel: false  
  - type: ENABLE_SERVICE  
    name: Enable Service  
    phaseStepNameForRollback: Disable Service  
    statusForRollback: SUCCESS  
    stepsInParallel: false  
  - type: VERIFY_SERVICE  
    name: Verify Service  
    phaseStepNameForRollback: Deploy Service  
    statusForRollback: SUCCESS  
    stepsInParallel: false  
  - type: WRAP_UP  
    name: Wrap Up  
    stepsInParallel: false  
  provisionNodes: false  
  serviceName: SSH  
  statefulSet: false  
templatized: false
```
### Canary Workflow Phases

Canary Workflows typically use two phases. The first phase deploys the microservice is a small number of instances and, once successful, the microservice is deployed to all instances.

Here is the first phase of a Canary Workflow of Kubernetes deployment type in the UI:

![](./static/harness-yaml-code-reference-09.png)

Here is an example of the two phases of a Canary Workflow of Kubernetes deployment type:phases:


```
harnessApiVersion: '1.0'  
type: CANARY  
concurrencyStrategy: INFRA  
envName: prod  
failureStrategies:  
- executionScope: WORKFLOW  
  failureTypes:  
  - APPLICATION_ERROR  
  repairActionCode: ROLLBACK_WORKFLOW  
  retryCount: 0  
notificationRules:  
- conditions:  
  - FAILED  
  executionScope: WORKFLOW  
  notificationGroupAsExpression: false  
  userGroupAsExpression: false  
  userGroupIds:  
  - 1ZUJQSLVQky0eXumi1yHzQ  
phases:  
- type: KUBERNETES  
  computeProviderName: Harness Sample K8s Cloud Provider  
  daemonSet: false  
  infraDefinitionName: To-Do List K8s  
  name: CANARY  
  phaseSteps:  
  - type: K8S_PHASE_STEP  
    name: Deploy  
    steps:  
    - type: K8S_CANARY_DEPLOY  
      name: Canary Deployment  
      properties:  
        instanceUnitType: COUNT  
        instances: '1'  
    stepsInParallel: false  
  - type: K8S_PHASE_STEP  
    name: Verify  
    stepsInParallel: false  
  - type: K8S_PHASE_STEP  
    name: Wrap Up  
    steps:  
    - type: K8S_DELETE  
      name: Canary Delete  
      properties:  
        instanceUnitType: COUNT  
        resources: ${k8s.canaryWorkload}  
    stepsInParallel: false  
  provisionNodes: false  
  serviceName: To-Do List K8s  
  statefulSet: false  
- type: KUBERNETES  
  computeProviderName: Harness Sample K8s Cloud Provider  
  daemonSet: false  
  infraDefinitionName: To-Do List K8s  
  name: Primary  
  phaseSteps:  
  - type: K8S_PHASE_STEP  
    name: Deploy  
    steps:  
    - type: K8S_DEPLOYMENT_ROLLING  
      name: Rollout Deployment  
    stepsInParallel: false  
  - type: K8S_PHASE_STEP  
    name: Verify  
    stepsInParallel: false  
  - type: K8S_PHASE_STEP  
    name: Wrap Up  
    stepsInParallel: false  
  provisionNodes: false  
  serviceName: To-Do List K8s  
  statefulSet: false  
rollbackPhases:  
- type: KUBERNETES  
  computeProviderName: Harness Sample K8s Cloud Provider  
  daemonSet: false  
  infraDefinitionName: To-Do List K8s  
  name: Rollback CANARY  
  phaseNameForRollback: CANARY  
  phaseSteps:  
  - type: K8S_PHASE_STEP  
    name: Deploy  
    phaseStepNameForRollback: Deploy  
    statusForRollback: SUCCESS  
    stepsInParallel: false  
  - type: K8S_PHASE_STEP  
    name: Wrap Up  
    phaseStepNameForRollback: Wrap Up  
    stepsInParallel: false  
  provisionNodes: false  
  serviceName: To-Do List K8s  
  statefulSet: false  
- type: KUBERNETES  
  computeProviderName: Harness Sample K8s Cloud Provider  
  daemonSet: false  
  infraDefinitionName: To-Do List K8s  
  name: Rollback Primary  
  phaseNameForRollback: Primary  
  phaseSteps:  
  - type: K8S_PHASE_STEP  
    name: Deploy  
    phaseStepNameForRollback: Deploy  
    statusForRollback: SUCCESS  
    steps:  
    - type: K8S_DEPLOYMENT_ROLLING_ROLLBACK  
      name: Rollback Deployment  
    stepsInParallel: false  
  - type: K8S_PHASE_STEP  
    name: Wrap Up  
    phaseStepNameForRollback: Wrap Up  
    stepsInParallel: false  
  provisionNodes: false  
  serviceName: To-Do List K8s  
  statefulSet: false  
templatized: false
```
### Failure Strategy

The Failure Strategy YAML describes the steps Harness will take when a Workflow deployment fails and meets the Failure Strategy criteria.

Here is what the default Failure Strategy looks like in the UI:

![](./static/harness-yaml-code-reference-10.png)
Here is the YAML for the default Failure Strategy:


```
failureStrategies: # Failure Strategy settings.  
- executionScope: WORKFLOW  
  failureTypes:  
  - APPLICATION_ERROR # Default strategy.  
  repairActionCode: ROLLBACK_WORKFLOW  
  retryCount: 0
```
Here is another Failure Strategy with all Failure Criteria selected:


```
- executionScope: WORKFLOW  
  failureTypes:  
  - CONNECTIVITY  
  - AUTHENTICATION  
  - VERIFICATION_FAILURE  
  - APPLICATION_ERROR  
  repairActionCode: ROLLBACK_WORKFLOW  
  retryCount: 0
```
### Notification Strategy

The Notification Strategy describes which Harness Users and/or Groups to notify when a Workflow has failed, succeeded, or reached other criteria.

Here is the default Notification Strategy in the UI:

![](./static/harness-yaml-code-reference-11.png)
Here is the YAML for the default Notification Strategy:


```
notificationRules: # Notification Strategy settings.  
- conditions:  
  - FAILED # Default strategy.  
  executionScope: WORKFLOW  
  notificationGroupAsExpression: false  
  notificationGroups:  
  - Account Administrator # User to notify.
```
### Rollback Steps

The following are Rollback steps in case of a deployment failure or if rollback is part of a Failure Strategy. Here are the Rollback steps in the UI:

![](./static/harness-yaml-code-reference-12.png)


Here is the YAML for the Rollback Steps:


```
rollbackPhases:   
  
- type: SSH # Execute on target host.  
  
  computeProviderName: local # Cloud Provider name.  
  
  daemonSet: false # Used by Kubernetes Workflow type only, hence false.  
  
  infraDefinitionName: Physical Data Center- local-DataCenter_SSH # Environment Infrastructure Definition used.  
  
  name: Rollback Phase 1   
  
  phaseNameForRollback: Phase 1  
  
  phaseSteps:  
  
  - type: DISABLE_SERVICE  
  
    name: Disable Service  
  
    phaseStepNameForRollback: Enable Service  
  
    statusForRollback: SUCCESS  
  
    stepsInParallel: false  
  
  - type: STOP_SERVICE  
  
    name: Stop Service  
  
    phaseStepNameForRollback: Deploy Service  
  
    statusForRollback: SUCCESS  
  
    steps:  
  
    - type: COMMAND  
  
      name: Stop  
  
      properties:  
  
        commandName: Stop  
  
    stepsInParallel: false  
  
  - type: DEPLOY_SERVICE  
  
    name: Deploy Service  
  
    phaseStepNameForRollback: Deploy Service  
  
    statusForRollback: SUCCESS  
  
    steps:  
  
    - type: COMMAND  
  
      name: Install  
  
      properties:  
  
        commandName: Install  
  
    stepsInParallel: false  
  
  - type: ENABLE_SERVICE  
  
    name: Enable Service  
  
    phaseStepNameForRollback: Disable Service  
  
    statusForRollback: SUCCESS  
  
    stepsInParallel: false  
  
  - type: VERIFY_SERVICE  
  
    name: Verify Service  
  
    phaseStepNameForRollback: Deploy Service  
  
    statusForRollback: SUCCESS  
  
    stepsInParallel: false  
  
  - type: WRAP_UP  
  
    name: Wrap Up  
  
    stepsInParallel: false  
  
  provisionNodes: false  
  
  serviceName: JAR-service  
  
  statefulSet: false # Used by Kubernetes Workflow type only, hence false.
```
### Verification Steps

Verification Steps are used to apply Harness Continuous Verification to your deployment. Here is a Splunk Verification Step in the UI:

![](./static/harness-yaml-code-reference-13.png)

Here is the YAML for the same step:


```
  - type: VERIFY_SERVICE # Workflow section type.  
  
    name: Verify Service # Workflow section name in UI.   
  
    steps:  
  
    - type: SPLUNKV2 # Verification step type.  
  
      name: Splunkv2 # Verification step name in UI.  
  
      properties: # Settings for the Splunk step.  
  
        hostnameTemplate: ${host.hostName} # Expression for the target hostname label in JSON.  
  
        analysisServerConfigId: nxaEMN00SXa0Y8X5woZCQA # Verification Provider ID.  
  
        query: '*exception*' # Query for the term exception.  
  
        analysisTolerance: MEDIUM # Algorithm Sensitivity is Moderate.  
  
        comparisonStrategy: COMPARE_WITH_PREVIOUS # Baseline for risk analysis.  
  
        executeWithPreviousSteps: true # Run in parallel with previous Verify Service steps.  
  
        hostnameField: host # JSON label for host/container.  
  
        timeDuration: '15' # Analysis time duration in minutes
```
### Workflow Variables

Here is an example of a Workflow variable in the UI:

![](./static/harness-yaml-code-reference-14.png)
Here is the YAML for the variable:


```
userVariables:  
  
- type: TEXT # Type of variable. Number and email are also supported.  
  
  description: My variable. # Description, but not value.  
  
  fixed: true # Boolean for if the var is Fixed and will not be changed.  
  
  mandatory: true # Boolean for required variable that must be used for the Workflow to deploy.   
  
  name: foo # Variable name.  
  
  value: bar # Variable value.
```
### Common Workflow Commands

The Workflow commands you use varies according to your Workflow and deployment type, but there are some common commands that are used by most Workflows.

![](./static/harness-yaml-code-reference-15.png)
The following YAML lists examples for common commands:

**Barrier:**


```
- type: BARRIER # Command type.  
  
  name: Barrier # Name of command in UI.  
  
  properties:  
  
    identifier: deploy-checkout-and-shop # Barrier name, used by all related Barriers in other Workflows.  
  
    timeoutMillis: 600000 # Timeout for Barrier waiting for other Workflow Barriers.
```
**HTTP:** You can link to or copy the HTTP command template from the Template Library. Here is the YAML for a copied HTTP template:


```
- type: HTTP # HTTP command type.  
  
      name: HTTP # Name of command in the UI.  
  
      properties:  
  
        method: GET # HTTP request method.  
  
        socketTimeoutMillis: 10000 # Period to wait between packets before timing out.  
  
        header: 'content-type: application/json' # Content-Type entity header.   
  
        assertion: ${httpResponseCode}==200 # HTTP response code to check for.  
  
        executeWithPreviousSteps: false  
  
        url: http://app.example.io # The URL for the HTTP request.
```
Here is the YAML for a linked HTTP template:


```
- type: HTTP # HTTP command type.  
  
      name: Health Check # Name of the command in the UI.  
  
      properties:  
  
        method: GET # HTTP request method.  
  
        socketTimeoutMillis: 10000 # Period to wait between packets before timing out.  
  
        header: 'content-type: application/json' # Content-Type entity header.  
  
        assertion: ${httpResponseCode}==${ResponseCode} # HTTP response code compared to value below.  
  
        executeWithPreviousSteps: false  
  
        url: ${Url} # The URL variable for the HTTP request, value below.  
  
      templateUri: JohnDoe/HTTP Verifications/Health Check:latest # Template location in Template Library.  
  
      templateVariables: # Variables used in linked template.  
  
      - name: Url # Variable name, referenced above.  
  
        value: http://app.example.io # URL for variable.  
  
      - name: ResponseCode # Variable name, referenced above.   
  
        value: '200' # Response code value.
```
**Approval:**


```
- type: APPROVAL # Approval command type.  
  
  name: Approval # Name of command in UI.  
  
  properties:  
  
    userGroups:   
  
      - WA3Al7jsQ3a5IF-_yjsf_Q # ID of User Group for approval.  
  
      timeoutMillis: 1800000 # How long to wait for approval before failing.
```
Start, Stop, Install. These three common commands are grouped because their YAML is basically the same and there is little configuration in the UI or YAML.


```
- type: COMMAND # Step type.  
  
      name: Start # Name of command in the UI.  
  
      properties:  
  
        commandName: Start # Command name in Harness.  
  
    - type: COMMAND # Step type.  
  
      name: Stop # Name of command in the UI.  
  
      properties:  
  
        commandName: Stop # Command name in Harness.  
  
    - type: COMMAND # Step type.  
  
      name: Install # Name of command in the UI.  
  
      properties:  
  
        commandName: Install # Command name in Harness.
```
### Triggers with Workflows

If you rename a Workflow in Git and sync that change with Harness, Triggers are maintained because a duplicate Workflow is created.

## Pipelines

This folder contains all Pipelines for the Application. Each Pipeline is in its own YAML file named after the Pipeline name.

Here is an example for a Pipeline named Example-Pipeline, displayed in the UI:

![](./static/harness-yaml-code-reference-16.png)
It's YAML file is named Example-Pipeline.yaml:


```
harnessApiVersion: '1.0' # Harness API version.  
  
type: PIPELINE # YAML file type.  
  
description: This is an example pipeline for YAML. # Pipeline description.  
  
pipelineStages: # Each pipeline stage is a separate type.  
  
- type: ENV_STATE # First stage, Execution Step.  
  
  name: Basic-Build # Name given to stage.  
  
  parallel: false # Boolean for Executed in Parallel option.  
  
  workflowName: Basic-Example # Workflow executed in this stage.  
  
- type: APPROVAL # Second stage, Approval Step.  
  
  name: Approval 1 # Name given to stage.  
  
  parallel: false  
  
  properties:  
  
    userGroups:  
  
    - DocExample # Name of User Group for approval.  
  
    timeoutMillis: 604800000 # How long to wait for approval before failing.  
  
    approvalStateType: USER_GROUP # Approval requires User Group.  
  
- type: ENV_STATE # Third stage, Execution Step.  
  
  name: QA # Name given to stage.  
  
  parallel: false  
  
  workflowName: Canary-Example # Workflow executed in this stage.
```
### Limitations

* If you rename a Pipeline in Git and sync that change with Harness, any Triggers using that Pipeline are deleted.
* If you rename a Workflow in Git and sync that change with Harness, Triggers are maintained because a duplicate that Pipeline are deleted.

## Triggers

Currently, YAML-based Triggers are behind the feature flag `TRIGGER_YAML`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.  
Once enabled, Trigger YAML can be synced with Git. See [Configuration as Code](../../config-as-code/configuration-as-code.md).This folder contains all the Triggers for the Application. Each Trigger is in its own YAML file named after the Trigger's name.

Here is an example for a Trigger named **On New Artifact**, displayed in the UI:

![](./static/harness-yaml-code-reference-17.png)
Here is the YAML for the Trigger:


```
harnessApiVersion: '1.0'  
type: TRIGGER  
artifactSelections:  
- regex: false  
  serviceName: NGINX  
  type: ARTIFACT_SOURCE  
executionName: VarExample  
executionType: Workflow  
triggerCondition:  
- type: NEW_ARTIFACT  
  artifactStreamName: harness_todolist-sample  
  regex: false  
  serviceName: Variable Examples
```
### Sync YAML-based Triggers Once Enabled

For Git-synced Harness Applications, once you have YAML-based Triggers enabled, you must sync your Application to sync your existing Triggers with your repo.

Locate your Harness Application, and click its sync button:

![](./static/harness-yaml-code-reference-18.png)

For details on syncing, see [Configuration as Code](../../config-as-code/configuration-as-code.md).

### Limitations

* If you rename a Pipeline or Service in Git and sync that change with Harness, any Triggers using that Pipeline or Service (manifest or artifact) are deleted.
* If you rename a Workflow in Git and sync that change with Harness, Triggers are maintained because a duplicate Workflow is created.

## Infrastructure Provisioners

This folder contains all Infrastructure Provisioners for the Application. Each Infrastructure Provisioner is in its own YAML file named after the Infrastructure Provisioner name.

Here is an example for a CloudFormation Infrastructure Provisioners named CF-Test, displayed in the UI:

![](./static/harness-yaml-code-reference-19.png)
Here is the YAML for the CF-Test Infrastructure Provisioner:


```
harnessApiVersion: '1.0' # Harness API version.  
  
type: CLOUD_FORMATION # YAML file type.  
  
description: Description for CF Provisioner.  
  
mappingBlueprints: # Provisioner settings.  
  
- cloudProviderType: AWS # Amazon S3 Cloud Provider.  
  
  deploymentType: ECS # Amazon ECS deployment type.  
  
  nodeFilteringType: AWS_ECS_EC2 # Internal Harness label.  
  
  properties: # Service Mappings.  
  
  - name: ecsCluster # Field label for ECS cluster.   
  
    value: example # Name of ECS cluster to use.  
  
  serviceName: ecs-replica # Harness Service to use.  
  
name: CF-Test # Name of Infrastructure Provisioner.  
  
sourceType: TEMPLATE_URL # Template reference type.  
  
templateFilePath: https://s3.amazon.aws.com/path # URL of template.  
  
variables: # Variables used in the template.  
  
- name: foo # Variable name.  
  
  valueType: TEXT # Variable type.
```
## Usage Scope

Many Harness configuration components, such as Cloud Providers, provide **Usage Scope** that enables you to scope the Applications and Environments that may use the component. In YAML, Usage Scope has the same YAML settings across all Cloud Providers, and so we will describe it here and ignore it when describing the specific components, such as Cloud Providers.

Here is what Usage Scope looks like in the UI, scoped to three Applications and Environments:

![](./static/harness-yaml-code-reference-20.png)
Here is the same example in YAML:


```
usageRestrictions: # Usage Scope section.  
  
  appEnvRestrictions: # Application scopes are in this block.  
  
  - appFilter:  
  
      entityNames:  
  
      - File-Based # Name of Application.  
  
      filterType: SELECTED # Application is selected.  
  
    envFilter:  
  
      filterTypes:  
  
      - NON_PROD # Scoped to Non-Production Environments.  
  
  - appFilter:  
  
      entityNames:  
  
      - ECS Example # Name of Application.  
  
      filterType: SELECTED  
  
    envFilter:  
  
      entityNames:  
  
      - stage-ecs # Scoped to the Environment named stage-ecs.  
  
      filterTypes:  
  
      - SELECTED  
  
  - appFilter:  
  
      entityNames:  
  
      - k8s-helm # Name of Application.  
  
      filterType: SELECTED  
  
    envFilter:  
  
      entityNames:  
  
      - gke-K8s-Helm # Scoped to the Environment named gke-K8s-Helm.  
  
      filterTypes:  
  
      - SELECTED
```
### Cloud Providers

This folder contains all of the Cloud Providers configured for your Harness account. Details on Cloud Providers can be found in Add Cloud Providers. Each Cloud Provider's Display Name is used to name the YAML file under this folder.

Below are YAML examples for the most common Cloud Providers.

### Amazon Web Services

You can authenticate the connection to the AWS Cloud Provider using AWS Access Keys or by using the same IAM role used by the Harness Delegate installed in the AWS VPC. Both methods are displayed below.

Here is the YAML for an AWS Cloud Provider that uses Access Key and Secret Key credentials to authenticate the connection:

Just as with the Harness UI, the Harness Code Editor does not expose the AWS Secret Key. The `secretKey` setting in the AWS Cloud Provider YAML is the Harness KMS vault record Harness uses to encrypt and decrypt the Secret Key you provide.
```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: AWS # The CLoud Provider type.  
  
accessKey: AKIAI36JN2OJAO7TBKQQ # The AWS Access Key used for credentials.  
  
secretKey: amazonkms:z4d1c57FRKuMkCkSHEG3oQ # Secret Key record from KMS vault.  
  
...  
  
useEc2IamCredentials: false # The Assume IAM Role on Delegate option is not enabled.
```
When the **Assume IAM Role on Delegate** option has been selected and authentication is performed using the IAM role used by the Delegate, the `useEc2IamCredentials` value is true and the Delegate tag used it listed:


```
...  
  
tag: AWS-Delegate # Delegate Tag used to select the Delegate.  
  
useEc2IamCredentials: true
```
You will still see a `secretKey` placeholder label, but it not used.

### Google Cloud Platform

The Google Cloud Platform Cloud Provider is authenticated using an account service key file, that Harness encrypts in the Harness KMS vault, or the vault of your choice. Here is the YAML for a Google Cloud Platform Cloud Provider.


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: GCP # Cloud Provider type.  
  
serviceAccountKeyFileContent: amazonkms:WU6O9p_cTu2WHCtddJuqlQ # Secret file record from KMS vault.
```
### Physical Data Center

Authentication for the Physical Data Center Cloud Provider is done using networking information when the Cloud Provider is used in an Infrastructure Definition. As a result, the YAML is brief:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: PHYSICAL_DATA_CENTER # The Cloud provider type.
```
### Kubernetes Cluster

The Kubernetes Cluster Cloud Provider can be authenticated using the Inherit Cluster Details from selected Delegate option or manually.

![](./static/harness-yaml-code-reference-21.png)
Below is the YAML for a Kubernetes Cluster Cloud Provider authenticated using the **Inherit Cluster Details from selected Delegate** option. Although it does not use manual authentication (the **Enter Cluster Details manually** option), there are placeholders for the manual authentication values, and they are also commented on below:


```
type: KUBERNETES_CLUSTER # The Cloud Provider type.  
  
caCert: safeharness:aKFQ61NHS-KwxkgcUi7nJw # Certificate authority root certificate.   
  
clientCert: safeharness:Av_sfbl9S6WLp8_xUB7k9A # Client certificate for the cluster.  
  
clientKey: safeharness:OUCICHVIRii-Y-aasf24eA # Key for the client certificate.  
  
clientKeyPassphrase: safeharness:VxxFpo5gRxSC-5_n6c-9zA # Client key passphrase encrypted by Harness.  
  
delegateName: harness-demo # Delegate Tag used to select the Delegate.  
  
password: amazonkms:xxxxxxxxxxxxxxxxxx # Basic auth password in KMS vault.  
  
skipValidation: false # Skip Validation option not selected.  
  
...  
  
useKubernetesDelegate: true # Inherit creds from Delegate option selected.  
  
username: johndoe@harness.io # Username and password for the Kubernetes cluster.
```
### Microsoft Azure

The Microsoft Azure Cloud Provider authentication is performed using application, client, and project information.

![](./static/harness-yaml-code-reference-22.png)
Here is the YAML for a Microsoft Azure Cloud Provider:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: AZURE # The Cloud Provider type.  
  
clientId: 2d0ae000-e0dd-0000-97f8-f6ae330abf82 # Client/Application ID for the Azure app registration.  
  
key: amazonkms:CvfInvfkl2mjeFuUJ-xB7l # Authentication key for application.  
  
tenantId: c279b8cb-5e93-4k12-bse4-730dfd74e906 # ID of the Azure Active Directory (AAD).
```
### Pivotal Cloud Foundry

You authenticate a PCF Cloud Provider using a PCF user account with Admin, Org Manager, or Space Manager role.

Here is the YAML for a PCF Cloud Provider:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: PCF  # Cloud Provider type.  
  
endpointUrl: api.run.pivotal.io # API endpoint URL.  
  
password: amazonkms:xxxxxxxxxxxxxxxxxx # Password for the PCF account.  
  
...  
  
username: johndoe@harness.io # Username for the PCF account.
```
## Artifact Servers

Artifact Servers are configured using the URL of the Artifact Server and authenticated using accounts or tokens.

Amazon AWS and Google Cloud Platform are added to Harness as Cloud Providers, but they may also be used as Artifact Servers.

### Jenkins

Jenkins is configured using the URL of Jenkins server and either a Username and Password/Jenkins API token or a Bearer Token (HTTP Header).

Here is the YAML for the Jenkins Artifact Server:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: JENKINS # The Artifact Server type.  
  
authMechanism: UserName/Password # The authentication option selected.  
  
password: amazonkms:xxxxxxxxxxxxxxxxxx # Password entry in KMS vault.  
  
token: safeharness:xxxxxxxxxxxxxxxxxx # Token encrypted by Harness.  
  
url: https://jenkinsint.harness.io # Jenkins server URL.  
  
username: wingsbuild # Username for Jenkins account.
```
### Bamboo

Bamboo Artifact Servers are configured using the Bamboo server URL and authenticated using a Bamboo user account.

Here is the YAML for a Bamboo Artifact Server:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: BAMBOO # The Artifact Server type.  
  
password: amazonkms:xxxxxxxxxxxxxxxxxx # Password entry in KMS vault.  
  
url: http://ec2-18-000-00-000.compute-1.amazonaws.com:8085 # Bamboo server URL.  
  
username: wingsbuild # Bamboo account username.
```
### Docker Registry

Docker Registry Artifact Servers are configured using the Docker Registry server URL and authenticated using a Docker Registry user account.

Here is the YAML for a Docker Registry Artifact Server:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: DOCKER # The Artifact Server type.  
  
password: amazonkms:xxxxxxxxxxxxxxxxxx # Password entry in KMS vault.  
  
url: https://registry.hub.docker.com/v2/ # Docker Registry URL.  
  
username: johndoe # Docker Registry account username.
```
### Nexus

Nexus Artifact Servers are configured using the Nexus server URL and authenticated using a Nexus user account.

Here is the YAML for a Nexus Artifact Server:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: NEXUS # The Artifact Server type.  
  
password: amazonkms:xxxxxxxxxxxxxxxxxx # Password entry in KMS vault.  
  
url: https://nexus2.harness.io # Nexus server URL.  
  
username: admin # Nexus account username.
```
### Artifactory

Artifactory Artifact Servers are configured using the Artifactory server URL and authenticated using a Artifactory user account.

Here is the YAML for a Artifactory Artifact Server:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: ARTIFACTORY  # The Artifact Server type.  
  
password: safeharness:xxxxxxxxxxxxxxxxxx # Password entry in KMS vault.  
  
url: https://harness.jfrog.io/harness # Artifactory server URL.  
  
username: admin # Artifactory account username.
```
### SMB

SMB Servers are configured using the SMB server URL and authenticated using a user account.

YAML for the SMB Artifact Server is under development.

### SFTP

SFTP Artifact Servers are configured using the SFTP server URL and authenticated using a SFTP user account.

YAML for the SFTP Artifact Server is under development.

## Collaboration Providers

This folder contains all of the Collaboration Providers configured for your Harness account. Details on Collaboration Providers can be found in [Add Collaboration Providers](../../account/manage-connectors/collaboration-providers.md). Each Collaboration Provider's **Display Name** is used to name the YAML file under this folder.

Collaboration Providers are configured using the URL of the Collaboration Providers and authenticated using accounts or tokens.

### SMTP

To connect to the SMTP Collaboration Provider, Harness uses a SMTP host address and port number, along with a username and password for the SMTP account. Here is the YAML for a SMTP Collaboration Provider:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: SMTP # The Collaboration Provider type.  
  
fromAddress: noreply@harness.io # The email address to show when sending emails.  
  
host: smtp.sendgrid.net # SMTP server.  
  
password: amazonkms:xxxxxxxxxxxxxxxxxx # Password entry in KMS vault.  
  
port: 465 # SMTP port. You can use 25, 465, 587.  
  
useSSL: true # Connection is made over TLS.  
  
username: johndoe # Username for the SMTP account.
```
### Slack

The Slack Collaboration Provider uses a Slack Webhook URL to connect to Slack. Here is the YAML for a Slack Collaboration Provider:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: SLACK # The Collaboration Provider type.  
  
outgoingWebhookUrl: https://hooks.slack.com/services/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 # Slack-generated Webhook URL
```
## Verification Providers

Verification Providers are added using the URL of the Verification Provider API server, and account credentials such as username/password or API and application keys. We'll look at two examples, AppDynamics and New Relic.

AppDynamics uses a username and password to authenticate the connection.


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: APP_DYNAMICS # The Verification Provider type.  
  
accountName: harness-test # The AppDynamics account.  
  
controllerUrl: https://harness-test.saas.appdynamics.com/controller # AppD Controller URL.  
  
password: amazonkms:xxxxxx-xxxxx # User password entry in KMS vault.  
  
username: john@harness.io # Username for AppD account.
```
New Relic uses an API key and, optionally, an account key to authenticate the connection.


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: NEW_RELIC # The Verification Provider type.  
  
apiKey: amazonkms:xxxxxx-xxxxx # API key entry in KMS vault.
```
## Notification Groups

Notification Groups simply use email addresses and Slack channels to notify people when a Workflow is complete as part of the Workflow Notification Strategy. Each Notification Group you create is given its own YAML file named using the Display Name in the UI.

Here is a sample Notification Group in the UI:

![](./static/harness-yaml-code-reference-23.png)
Here is the YAML for that Notification Group:


```
harnessApiVersion: '1.0' # The Harness API version number.  
  
type: NOTIFICATION_GROUP # The file type.  
  
addresses:  
  
- addresses:  
  
  - channel1 # Slack channel.  
  
  channelType: SLACK # Channel type.  
  
- addresses:  
  
  - john@harness.io # Email address.  
  
  channelType: EMAIL # Channel type.  
  
defaultNotificationGroupForAccount: 'false' # Boolean for whether the group is the default.
```
## Source Repo Providers

Harness Source Repo Providers connect your Harness account with your Git platform accounts to synchronize your Harness account and Applications and pull important files, such as Helm charts, Kubernetes manifests, and Terraform scripts.

The `password` label contains the path to the secret in the Secret Manager you have set up and used in Harness.

![](./static/harness-yaml-code-reference-24.png)


## YAML and JSON in Harness Manager

Harness uses YAML as the code for configuration, but wherever your deployment environment uses JSON, you can enter it in Harness. For example, AWS ECS uses JSON for configuration, and so when configuring ECS in Harness, the Harness settings are configured using YAML, but the ECS settings are configured using JSON. This way, you can easily leverage your existing JSON from your environments.


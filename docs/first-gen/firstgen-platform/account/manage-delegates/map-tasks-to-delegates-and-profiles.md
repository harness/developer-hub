---
title: Delegate Task Category Mapping
description: The Task Category Map feature replaces the Command setting in Delegate Scopes, which is deprecated and will be removed soon. Harness deployments are broken down into separate tasks performed by Harne…
# sidebar_position: 2
helpdocs_topic_id: nzuhppobyg
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

The **Task Category Map** feature replaces the **Command** setting in Delegate Scopes, which is deprecated and will be removed soon.Harness deployments are broken down into separate tasks performed by Harness Delegates.

Tasks are organized by category. For example, all the connections and images pulled using Docker Hub are part of the Docker Hub Task Category.

By default, Harness performs tasks using any available Delegates. If you want Harness to prioritize a specific Delegate for a task category, you can map the task category to a Selector, and apply that Selector to a Delegate.

The mapped Selector can also be used in certain Harness entities to prioritize Delegates, such as [Cloud Providers](/article/whwnovprrb-cloud-providers) and the [Shell Script Workflow step](/article/1fjrjbau7x-capture-shell-script-step-output).

This topic describes how to map task categories to Selectors, and then apply the Selector to one or more Delegates.

In this topic:

* [Before You Begin](#before_you_begin)
* [Supported Platforms and Technologies](#supported_platforms_and_technologies)
* [Visual Summary](#visual_summary)
* [Step 1: Set Permissions](#step_1_set_permissions)
* [Step 2: Map a Selector to a Task Category](#step_2_map_a_selector_to_a_task_category)
* [Review: Applying Selectors to Delegates and Profiles](#review_applying_selectors_to_delegates_and_profiles)
	+ [Which option to use?](#which_option_to_use)
* [Review: Task Categories](#review_task_categories)

### Before You Begin

The Delegate is a key component of your Harness setup. Please review the following topics to ensure you have a solid understanding of the Delegate:

* [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts)
* [Harness Delegate Overview](/article/h9tkwmkrm7-delegate-installation)
* [Select Delegates with Selectors](/article/c3fvixpgsl-select-delegates-for-specific-tasks-with-selectors)
* [Run Scripts on Delegates using Profiles](/article/yd4bs0pltf-run-scripts-on-the-delegate-using-profiles)

### Supported Platforms and Technologies

See [Supported Platforms and Technologies](/article/220d0ojx5y-supported-platforms).

### Visual Summary

Here is example of adding a new Selector to a Delegate, and then mapping the Selector to a Task Category:![](https://files.helpdocs.io/kw8ldg1itf/articles/nzuhppobyg/1604446534988/task-category-custom.gif)Here is an example of adding a Selector to a Task Category Mapping, and then applying the Selector to a Delegate:![](https://files.helpdocs.io/kw8ldg1itf/articles/nzuhppobyg/1604446880968/task-category.gif)### Step 1: Set Permissions

To map Selectors to Task Categories a user must belong to a User Group with the Account Permission **Manage Delegates** enabled.

See [Managing Users and Groups (RBAC)](/article/ven0bvulsj-users-and-permissions).

### Step 2: Map a Selector to a Task Category

1. To map a Selector to a Task Category, in **Setup**, click **Harness Delegates**.
2. Click **Task Category Map**.
3. Click **Map Task Category**.
4. In **Task Category**, select the category you want to map. See [Review: Task Categories](#review_task_categories).
5. Select or create selectors to map to this Task Category.
	1. You can simply enter the name of a new Selector and click **Create**.
	2. If you have an existing Selector, one that is perhaps already used by a Delegate or Delegate Profile, you can start entering its name and it will appear. Next, click its name to select it.You must select or create at least one Selector.
6. Click **Submit**. The Task Category is now mapped to the Selector.

If this Selector is not being used by a Delegate or Profile, you can now add it to one or both.

### Review: Applying Selectors to Delegates and Profiles

Once you have mapped a Selector to a Task Category, you can apply the Selector to a Delegate using the following options:

* Add the Selector to the Delegate's **Custom Selectors** setting.
* Add the Selector to a Delegate Profile, and then add the Profile to any Delegates. All the Delegates using that Profile are thereby mapped to the Task Category.

For steps on adding Custom Selectors, see [Select Delegates with Selectors](/article/c3fvixpgsl-select-delegates-for-specific-tasks-with-selectors).

For steps on adding Profile Selectors, see the Selector option in [Run Scripts on Delegates using Profiles](/article/yd4bs0pltf-run-scripts-on-the-delegate-using-profiles).

#### Which option to use?

If your task requires a Delegate Profile, it is best to map the Task Category to a Selector and apply that Selector to the Profile. All Delegates assigned that Profile will then perform the mapped tasks.

If your task can only be performed by specific Delegates because of their location or credentials, it is best to map it to specific Delegate using a Delegate's **Custom Selectors** setting.

### Review: Task Categories

The following table describes the different task categories.



|  |  |
| --- | --- |
| **Task Category** | **Description** |
| Amazon Machine Image (AMI) | Perform tasks related to [AMI Deployments](/article/wfk9o0tsjb-aws-ami-deployments). |
| Amazon Elastic Container Registry (ECR) | Connect and pull images from ECR. |
| Amazon S3 | Connect and pull artifacts and files from Amazon S3. |
| AppDynamics | Perform [AppDynamics verification tasks](/article/2zxfjt67yb-app-dynamics-verification-overview). |
| AWS | Connect using any Harness [AWS Cloud Provider](/article/wt1gnigme7-add-amazon-web-services-cloud-provider). |
| APM | Delegate can perform any APM task |
| Artifactory | Connect to JFrog Artifactory using the [Artifactory Artifact Server](/article/nj3p1t7v3x-add-artifactory-servers) credentials. |
| Azure Container Registry | Connect and pull [Azure Container Registry](/article/kiuft72fr5-azure-deployments-overview) images and artifacts. |
| Bamboo | Perform Bamboo related tasks using the [Bamboo Artifact Server](/article/feks6co940-add-bamboo-artifact-servers) credentials. |
| Build Source | Perform tasks for any [Build Workflow](/article/0tphhkfqx8-artifact-build-and-deploy-pipelines-overview). |
| CloudFormation | Perform CloudFormation tasks such as CloudFormation Create Stack and CloudFormation Delete Stack Workflow steps. See [CloudFormation Provisioning with Harness](/article/qj0ems5hmg-cloud-formation-provisioning-with-harness). |
| CloudWatch | Perform configuration and verification using AWS [CloudWatch](/article/q6ti811nck-cloud-watch-verification-overview). |
| Collaboration Provider | Connect and configure Harness [Collaboration Providers](/article/cv98scx8pj-collaboration-providers). |
| Command | Delegate will be used first for [Service commands](/article/kbmz9uc7q9-create-a-service-command-template). |
| Connectivity Validation | Tests connectivity with resources, such as Harness Cloud Providers. |
| Container | Performs the following container-related tasks:* Container active service counts
* Container information
* Controller names with labels
* Container Continuous Efficiency (CE) validation
* CE Delegate validation
* Container connection validation
* List clusters
* Container validation
* Fetch Kubernetes master URL
* Kubernetes steady state check
* Kubernetes swap service selectors
* ECS steady state check
* Validate Kubernetes config
 |
| Custom Artifact Source | Collect artifacts using [Custom Artifact Sources](/article/jizsp5tsms-custom-artifact-source). |
| Custom Log Collection and Bugsnag | Perform configuration and verification using [Custom Logs](/article/d4i9pp3uea-verify-deployments-with-custom-logs) and [Bugsnag Verification Overview](/article/ac5piurukt-bugsnag-verification-overview).  |
| Dynatrace | Perform configuration and verification using [Dynatrace](/article/r3xtgg0e2k-dynatrace-verification-overview). |
| Docker Hub | Connect to [Docker Hub](/article/tdj2ghkqb0-add-docker-registry-artifact-servers) and pull down metadata associated with the artifact. |
| ELK | Perform configuration and verification using [ELK](/article/qdajtgsqfj-elasticsearch-verification-overview). |
| Git | Perform configuration and tasks [Git Source Repo Providers](/article/ay9hlwbgwa-add-source-repo-providers). |
| Google Cloud Build | Perform [Google Cloud Build](/article/dvm5q9j0d0-trigger-google-cloud-builds) related tasks. |
| Google Cloud Storage | Connect and pull artifacts from [Google Cloud Storage](/article/6x52zvqsta-add-google-cloud-platform-cloud-provider#review_google_gcs_and_gcr_requirements). |
| Google Container Registry | Connect and pull artifacts from [GCR](/article/6x52zvqsta-add-google-cloud-platform-cloud-provider#review_google_gcs_and_gcr_requirements). |
| Helm | Delegate can perform [Native Helm deployment](/article/583ojfgg49-helm-deployments-overview) tasks. |
| Helm Repo Config Validation | Validate the [Helm Repo](/article/0hrzb1zkog-add-helm-repository-servers) connection. |
| Helm Values Fetch | Fetch values.yaml for [Native](/article/583ojfgg49-helm-deployments-overview) and [Kubernetes Helm](/article/hddm3rgf1y-use-a-helm-repository-with-kubernetes) deployments. |
| HTTP Verification | Perform the [HTTP step](/article/m8ksas9f71-using-the-http-command) in a Workflow. |
| Host Validation | Validating target hosts availability. For example, see [Select Nodes Workflow Step](/article/9h1cqaxyp9-select-nodes-workflow-step). |
| Jenkins | Connect and perform tasks for [Jenkins](/article/5fzq9w0pq7-using-the-jenkins-command). |
| Jira | Connect and perform tasks for [Jira](/article/077hwokrpr-jira-integration). |
| Key Management Service | Connect and perform tasks for [Harness Secrets Managers](/article/au38zpufhr-secret-management). |
| Kubernetes | Performs Kubernetes rollouts for [Kubernetes deployments](/article/7in9z2boh6-kubernetes-quickstart). |
| LDAP | Connect to LDAP server and perform [LDAP tasks](/article/85rycqfiqg-sso-ldap). |
| Logz | Connect and perform [Logz tasks](/article/vbl1xlad1e-verify-deployments-with-logz-io). |
| Nexus | Connect to [Nexus](/article/rdhndux2ab-nexus-artifact-sources) and pull down metadata associated with the artifact. |
| New Relic | Connect and perform [New Relic](/article/ht3amzjvle-new-relic-verification-overview) tasks. |
| Prometheus | Connect and perform [Prometheus](/article/5uh79dplbj-prometheus-verification-overview) tasks. |
| PCF | Connect and perform [Pivotal (PCF) deployments](/article/hy819vmsux-pivotal-cloud-foundry-quickstart). |
| Service Guard | Perform [24/7 Service Guard](/article/dajt54pyxd-24-7-service-guard-overview) tasks. |
| ServiceNow | Connect and perform [ServiceNow](/article/7vsqnt0gch-service-now-integration) tasks. |
| SFTP | Delegate can perform [SFTP](/article/3d1awjkw57-add-sftp-artifact-servers) (email server) tasks such as sending emails. |
| Splunk | Connect and perform [Splunk](/article/dujtd6ek5p-splunk-verification-overview) tasks. |
| Shell Script | Perform [Shell Script](/article/1fjrjbau7x-capture-shell-script-step-output) step in a Workflow. |
| Shell Script Provision | Delegate can perform [Shell Script Provisioner](/article/1m3p7phdqo-shell-script-provisioner) tasks. |
| Slack Notifications | Delegate can perform tasks related to sending [Slack notifications](/article/4blpfqwfdc-send-notification-using-slack). |
| SMB | Delegate can perform tasks related to [SMB Artifact Servers](/article/o1ck4eay7a-add-smb-artifact-servers).  |
| SpotInst | Delegate can perform [SpotInst Deployments](/article/ighbnk6xg6-ami-spotinst-elastigroup-deployments-overview) and connect to the [SpotInst Cloud Provider](/article/uxah3ji489-add-spot-inst-cloud-provider). |
| Sumo Logic | Delegate can perform tasks related to [Sumo Logic calls](/article/wb2k4u4kxm-sumo-logic-verification-overview) and [Sumo Logic Verification Provider](/article/38qrwi7wu2-1-sumo-logic-connection-setup). |
| Terraform | Delegate can perform [Terraform tasks](/article/hh52ews03d-terraform-provisioning-with-harness). |
| Trigger | Delegate can perform tasks related to [Harness Triggers](https://docs.harness.io/article/xerirloz9a-add-a-trigger-2). |
| Continuous Integration | Delegate can perform tasks related to CI: [Jenkins](/article/5fzq9w0pq7-using-the-jenkins-command), [Bamboo](/article/feks6co940-add-bamboo-artifact-servers). |
| Artifact Collection In Pipeline | Delegate can perform the [artifact collection](/article/0tphhkfqx8-artifact-build-and-deploy-pipelines-overview) step in a Pipeline. |

 


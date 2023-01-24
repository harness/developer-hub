---
title: Onboard Teams Using Git
description: Create an Application template you can sync and clone in Git for onboarding new teams.
sidebar_position: 20
helpdocs_topic_id: 3av5pc4goc
helpdocs_category_id: goyudf2aoh
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic shows you how to create a Harness Application template you can sync and clone in Git for onboarding new teams.

Often, teams create an Application template for engineering leads or DevOps engineers. Each team then gets a clone of the Application in Git that they can modify for their purposes.

Development teams can then deploy consistently without using the Harness UI to create their Applications from scratch. They simply change a few lines of YAML vis scripts and deploy their application.

### Before You Begin

* [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts) — Ensure you know Harness Key Concepts.
* [Configuration as Code](https://docs.harness.io/article/htvzryeqjw-configuration-as-code) — Review Harness YAML interface.
* [Harness Git Integration Overview](harness-git-ops.md) — Review Harness support for Git.

### Review: Why Git-based Onboarding?

Here are a few examples of why Harness customers use Git for onboarding:

* Developers working in Git don't want to navigate to another screen to configure their deployment Workflows and Pipelines.
* For some developers, UI's take too long to navigate when coding rapidly. The Harness YAML interface uses a simply folder structure for easy navigation.
* Segmenting Applications from overall Harness management. In a single repo, developers can manage their Applications, container specifications and manifests, and Harness component configuration.
* Create a Golden Template Application and use it to onboard Applications for teams.

### Step 1: Set Up Git Connector

Set up a Source Repo Provider connection in Harness that connects to the Git repo you want to use. For details, see [Add Source Repo Providers](https://docs.harness.io/article/ay9hlwbgwa-add-source-repo-providers).

For example, here is a new GitHub repo named **Golden Template Application** and its corresponding set up in Harness as a Source Repo Provider:

![](./static/onboard-teams-using-git-ops-00.png)

Remember the following important settings:

* **Repo URL** — The HTTPS repo URL is pasted into the Harness Source Repo Provider **URL**. The HTTPS setting is selected for both.
* **Harness Webhook URL** — The **Generate Webhook URL** setting was enabled when the Source Repro Provider was created, and the Webhook URL was pasted into the repo's Webhook **Payload URL**.
* **Content type** — The **Content type** in the repo is **application/json**.
* **Just the push event** — In the repo Webhook's **Which events would you like to trigger this webhook?** setting, only the **Just the push event** option is selected.

For details, see [Configuration as Code](https://docs.harness.io/article/htvzryeqjw-configuration-as-code).

### Step 2: Create Application Template

First, you will create the Application template in Harness. You will sync it with the Golden Template Application repo and enable all of its template settings.

Create an Application named **Golden Template Application**. When you create it, select **Set up Git Sync**, and select the Source Repo Provider in **Git Connector**:

![](./static/onboard-teams-using-git-ops-01.png)For information on creating Applications, see [Create an Application](../model-cd-pipeline/applications/application-configuration.md).

Once you click **Submit** you will see the Application in your repo:

![](./static/onboard-teams-using-git-ops-02.png)The repo will be updated with Application components as you create them in Harness.

#### Service Template

Next, create a Harness Service in the Application. For this example, we'll create a Kubernetes Service named **SampleK8s**. For details, see [Kubernetes Quickstart](https://docs.harness.io/article/7in9z2boh6-kubernetes-quickstart).

The Service is set up with the following:

* **Artifact Source placeholder** — We'll add a publicly-available Nginx Docker image from Docker Hub. When teams clone this Application, they can update the Artifact Source. See [Add Container Images for Kubernetes Deployments](https://docs.harness.io/article/6ib8n1n1k6-add-container-images-for-kubernetes-deployments)
* **Remote manifests** — When teams clone this Application, they can update the link to point to their own manifests. See [Link Resource Files or Helm Charts in Git Repos](https://docs.harness.io/article/yjkkwi56hl-link-resource-files-or-helm-charts-in-git-repos).
* **Service Config Variable for the namespace** — A Service Config Variable is created for the namespace used in the manifests. This will enable teams to simply update the variable in their clones with their own namespaces. See [Using Harness Config Variables in Manifests](https://docs.harness.io/article/qy6zw1u0y2-using-harness-config-variables-in-manifests).

Once you create the Service it is synced with your repo automatically:

![](./static/onboard-teams-using-git-ops-03.png)The default manifests are also synced with your repo.

First, set up an Artifact Source placeholder in the Service. Here we use a publicly-available Nginx Docker image from Docker Hub:

![](./static/onboard-teams-using-git-ops-04.png)For details on setting up the Artifact Server connection to Docker Hub in Harness, see [Add Artifact Servers](https://docs.harness.io/article/7dghbx1dbl-configuring-artifact-server).

Next, we'll configure the SampleK8s **Manifests** section to use remote manifests.

If you use remote manifest, you typically need to add another Source Repro Provider for the repo where they are stored. Here is how it is mapped in our example:

![](./static/onboard-teams-using-git-ops-05.png)

:::note
Once you have set up the remote manifests, the default manifest files that were synched when you created the Service will be ignored. You can delete them if you like.
:::

Once this template Application is cloned and used by other teams, we want them to have a simple way to change the target namespace for the deployment. There are different options (see [Create Kubernetes Namespaces based on InfraMapping](https://docs.harness.io/article/5xm4z4q3d8-create-kubernetes-namespaces-based-on-infra-mapping), [Create Kubernetes Namespaces with Workflow Variables](https://docs.harness.io/article/nhlzsni30x-create-kubernetes-namespaces-with-workflow-variables)), but for this example, we will use a Service variable.

Create a Service variable and then reference it in the values.yaml file in your remote manifests repo. Here's an example using a Service variable named **namespace**:

![](./static/onboard-teams-using-git-ops-06.png)The value of the namespace Service variable is `${env.name}`. The `${env.name}` expression references the name of the Environment used by the Workflow that deploys this Service. This is a useful default value because Environments are often named after the namespaces teams use, such as **dev** and **prod**.

:::note 
We use lowercase names for Environments because the names will be used for namespaces and Kubernetes requires lowercase names for namespaces.
:::

The Service template is complete. Next, we'll create the Environment and Infrastructure Definition templates.

#### Environment and Infrastructure Definition Templates

We'll add two Environments: one Environment for prod and one for dev.

##### Prod Environment and Infrastructure Definition

![](./static/onboard-teams-using-git-ops-07.png)

Note how the `${serviceVariable.namespace}` we created is used in the **Namespace** setting.

##### Dev Environment and Infrastructure Definition

![](./static/onboard-teams-using-git-ops-08.png)

Note how the `${serviceVariable.namespace}` we created is used in the **Namespace** setting.

When the Environments and Infrastructure Definitions are created they are synced with Git automatically:

![](./static/onboard-teams-using-git-ops-09.png)

If you want to overwrite the namespace value used in the **Namespace** setting for the prod or dev Infrastructure Definitions, you can use a **Service Configuration Override** in the Environment.

![](./static/onboard-teams-using-git-ops-10.png)

#### Workflow Template

For this example, we create a Kubernetes Rolling Deployment template. Create the Workflow type(s) you expect your teams will need. You can always remove unneeded Workflows from Git later.

All of the major settings of Harness Workflows can be templated, but first you need to set up the Workflow with actual values.

Create the Workflow by selecting the Environment, Service, and Infrastructure Definition you created earlier.

Next, open the settings again and click the **[T]** button for all of the settings. This will replace the settings with Workflow variables, thereby templating the Workflow.

![](./static/onboard-teams-using-git-ops-11.png)

Now that the Workflow is templated, you will see the Workflow variables in the repo Workflow YAML and the `templatized: true` key.

![](./static/onboard-teams-using-git-ops-12.png)

Now the templated Workflow can be used by any Service, Environment, and Infrastructure Definition.

Next, we'll create a Pipeline for the deployment.

#### Pipeline Template

For this example, we create a three Stage Pipeline:

1. Stage 1 — Rolling Workflow into the Dev environment.
2. Stage 2 — Approval Step.
3. Stage 3 — Rolling Workflow into the Production environment.

This Pipeline is a common use case and can be augmented as needed. For more details on Pipelines, see [Pipelines](../model-cd-pipeline/pipelines/pipeline-configuration.md).

First, create the Pipeline.

![](./static/onboard-teams-using-git-ops-13.png)

Next, create Stage 1 using the **dev** Environment and **Dev** Infrastructure Definition:

![](./static/onboard-teams-using-git-ops-14.png)

Next, create the Approval step for Stage 2:

![](./static/onboard-teams-using-git-ops-15.png)

Finally, create Stage 3 using the **prod** Environment and **Prod** Infrastructure Definition:

![](./static/onboard-teams-using-git-ops-16.png)

When you are done, the Pipeline will look like this:

![](./static/onboard-teams-using-git-ops-17.png)

The Pipeline is synched with Git:

![](./static/onboard-teams-using-git-ops-18.png)

The Golden Template Application is complete. Now your teams can clone and modify it as needed.

### Step 3: Clone and Change the Application

Clone the Golden Template Application using whatever Git tool you want. Here's an example using GitHub Desktop:

![](./static/onboard-teams-using-git-ops-19.png)

Next, copy the Application and paste the copy as a peer of **Golden Template Application** in the **Applications** folder:

![](./static/onboard-teams-using-git-ops-20.png)

Name the new Application folder **Development**:

![](./static/onboard-teams-using-git-ops-21.png)

Change the new Application description in its index.yaml file:

![](./static/onboard-teams-using-git-ops-22.png)

Rename the Service:

![](./static/onboard-teams-using-git-ops-23.png)

You do not need to update the Workflow with the new Service name because the Workflow is templated.

Update the Pipeline with the new Service name.

![](./static/onboard-teams-using-git-ops-24.png)

Update the following Service settings to customize this Application for a new team:

* **Artifact Source placeholder** — Replace the Nginx Docker image from Docker Hub.
* **Remote manifests** — Update the link to point to their own manifests.
* **Service Config Variable for the namespace** — Update the Service variable with a new namespace.

### Step 4: Commit and Sync New Application

When you are done making changes to the new Application, you can commit and push the changes.

![](./static/onboard-teams-using-git-ops-25.png)

The new Application is in Git:

![](./static/onboard-teams-using-git-ops-26.png)

And the new Application is automatically synced and added to Harness:

![](./static/onboard-teams-using-git-ops-27.png)

### Troubleshooting

**Something not working?** If some Application component does not appear in Harness it is likely because of a conflict between the YAML file and some settings in Harness.

For example, if you didn't update the Service name in the Pipeline YAML to match the new name of the Service, Harness cannot locate the Service listed in the Pipeline YAML. Consequently, Harness refuses to add the Pipeline from Git.

Another possible issue is a change to an Account setting in Harness or the Git YAML, such as the name of a Cloud Provider.

Harness displays Git errors in the Configuration as Code:

![](./static/onboard-teams-using-git-ops-28.png)You can also see them in the repo Webhook. For example, GitHub has a **Recent Deliveries** section at the bottom of the Webhook setting:

![](./static/onboard-teams-using-git-ops-29.png)

### Step 5: Automating New Application Creation

Once you are comfortable creating new Applications using Git, you can write automation scripts to clone Applications and change values in the new Application YAML.

For example, some customers' sample scripts are based on an input in a UI or Shell Script that generates YAML stored in Git. The YAML is then synced to Harness through the Git Sync process on the push event.

You can use tools like [yq](https://mikefarah.gitbook.io/yq/) to manipulate specific YAML fields inline. Tools like [yamllint](https://pypi.org/project/yamllint/) are excellent for validating YAML.

Here is a sample YAML automation flow:

1. Create a Golden Application that is fully templated and sync it with Git.
2. Create a script to create a new Harness Application, copy the content of the Golden Application into it, and edit the necessary fields. For example, a script might update the namespace and Cloud Provider YAML.
3. Commit changes to Git and review the results in Harness.

If there are issues, Harness displays Git Sync errors in **Configure As Code**.

### Conclusion

This topic showed you how Git can be used for safe, version-controlled, easy Harness component management.

Managing new Harness Application setup in Git brings deployment closer to developers. It enables them to live in their code.

With Harness Git support, developers don't need to check deployment status in the Harness Manager UI. For example, they can use [Harness GraphQL](https://docs.harness.io/article/tm0w6rruqv-harness-api). Here's a simple Pipeline executions query and result:


```
{  
  executions(  
    filters: [  
      { pipeline: { operator: EQUALS, values: ["Kn3X_70dQy-VY-Wt2b2qVw"] } }  
    ]  
    limit: 30  
  ) {  
    pageInfo {  
      total  
    }  
    nodes {  
      id  
    }  
  }  
}  
...  
{  
  "data": {  
    "executions": {  
      "pageInfo": {  
        "total": 1303  
      },  
      "nodes": [  
        {  
          "id": "tbdwrYw5RS2bEERFEQ6oiA"  
        },  
        {  
          "id": "JhzVnLFMT5Wxlws-2hu18A"  
        },  
        {  
          "id": "j-Oe2VUASsSmWo4ALzQGzg"  
        },  
...  
      ]  
    }  
  }  
}
```
In addition, Harness Application that live in code are reusable and versioned. If anything breaks, there is a working version to revert back to.

### Next Steps

* [Triggers](../model-cd-pipeline/triggers/add-a-trigger-2.md)
* [Harness API](https://docs.harness.io/article/tm0w6rruqv-harness-api)
* [Harness Git Integration Overview](harness-git-ops.md)


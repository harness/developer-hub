---
title: Add and override values YAML files
description: This topic describes how to use values files for Kubernetes and Helm deployments in Harness.
sidebar_position: 4
helpdocs_topic_id: q002wjjl4d
helpdocs_category_id: qfj6m1k2c4
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use values YAML files for Kubernetes and Helm deployments in Harness.

For Kubernetes manifests, the values file uses Go templating to template manifest files. See [Example Kubernetes Manifests using Go Templating](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/example-kubernetes-manifests-using-go-templating).

For Helm charts, the values file defines the default values for parsing the Kubernetes templates (manifests) when deploying the Helm chart. See [Deploy Helm Charts](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts).

Harness supports Kubernetes and Helm charts without requiring Helm or Tiller and Kubernetes and Helm have equal support for all Harness deployment strategies.

You can overlay and override multiple values files in a stage's Service in a few ways. For example, by overlaying multiple files and by replacing file paths dynamically at runtime.

This topic describes how to add values files, how to override them at the Service and Environment, and how to override them at Pipeline runtime.

## Before you begin

* [Kubernetes CD Quickstart](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart)
* [Helm CD Quickstart](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart)

## Limitations

* For Kubernetes deployments, the values.yaml file used in Harness doesn't support Helm templating, only Go templating.
* Helm templating is fully supported in the remote Helm charts you add to your Harness Service. If you add a Helm chart and a values.yaml, the values.yaml can use Helm templating.

## Propagate and override between stages

This topic covers adding and overriding the values.yaml files you add to a Harness Service, but you can also propagate and override entire Services.

See [Propagate and Override CD Services](/docs/continuous-delivery/x-platform-cd-features/services/propagate-and-override-cd-services).

## Values YAML files with Kubernetes and Helm charts

Let's take a quick look at how values files are used with Kubernetes and Helm charts in Harness.

<details>
<summary>Kubernetes</summary>

You can use values YAML files with your Kubernetes manifests in Harness. This allows you to define several Kubernetes resources as a set.


```bash
files/  
|-values.yaml  
|-templates/  
 |-deployment.yaml  
 |-namespace.yaml  
 |-service.yaml
```

Harness evaluates the values.yaml files you add just like Helm does with its values file. Values.yaml files added to Harness don't use Helm templating, but instead use [Go templating](https://godoc.org/text/template) and [Harness built-in variable expressions](/docs/platform/Variables-and-Expressions/harness-variables). This removes the need for Helm or Tiller to be installed.

</details>
<details>
<summary>Helm charts</summary>

The typical Helm chart uses the following files:


```bash
chart/              # Helm chart folder  
|-Chart.yaml        # chart definition  
|-requirements.yaml # optional charts to deploy with your chart  
|-values.yaml       # values for the template variables  
|-templates/        # directory containing the template files (Kubernetes manifests)
```

Harness support Helm charts using Helm templating. Harness will evaluate the Helm chart just like Helm. You do not need to install Helm on the Harness Delegate pod/host. Harness manages Helm for you.

</details>

### Visual summary

Here's a quick video that shows how to add Values YAML files for Kubernetes and Helm Charts. 

<!-- Video:
https://www.youtube.com/watch?v=dVk6-8tfwJc-->
<docvideo src="https://www.youtube.com/watch?v=dVk6-8tfwJc" />

## Artifacts with manifests and charts

You can hardcode the deployment artifact in your values.yaml file just as you might in a typical Helm deployment.

Or you can add a path to the artifact in Harness and use a [Harness expression](/docs/platform/Variables-and-Expressions/harness-variables) in your values.yaml to refer to that path.

When Harness executes the Pipeline, the Harness Delegate resolves the expression and pulls the artifact onto the target pods.

Adding artifacts to Harness is covered in [Add Container Images as Artifacts for Kubernetes Deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments).

Once you've added the artifact to Harness, you add the Harness expression `<+artifact.image>` in your values.yaml using the `image` label: `image: <+artifact.image>`.

For example:


```yaml
name: myapp  
replicas: 2  
  
image: <+artifact.image>  
dockercfg: <+artifact.imagePullSecret>  
...
```

Artifacts and manifests are discussed in detail in [Add Kubernetes Manifests](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/define-kubernetes-manifests).

## Add values.yaml

You can add one or more Values YAML files in two ways:

* **Same repo:** If the Values YAML are in the same repo as your Kubernetes manifests or Helm Charts, you can add them when you add those files. You simply use the Values YAML setting.  
![](./static/add-and-override-values-yaml-files-32.png)
* **Different repos:** If the Values YAML are in a repo separate from your Kubernetes manifests or Helm Charts, or you just want to add them separately, you can them by selecting the Values YAML manifest type.  

We'll cover this option below.

1. In your CD stage, click **Service**.
2. In **Service Definition**, select **Kubernetes**.
3. In **Manifests**, click **Add Manifest**.
4. In **Specify Manifest Type**, select **Values YAML**, and click **Continue.**
   
   ![](./static/add-and-override-values-yaml-files-33.png)

5. In **Specify Values YAML Store**, select the Git repo provider you're using and then create or select a Connector to that repo.
6. If you haven't set up a Harness Delegate, you can add one as part of the Connector setup.
    This process is described in [Kubernetes deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart), [Helm Chart deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart) and [Install a Kubernetes Delegate](https://developer.harness.io/docs/platform/Delegates/install-delegates/overview).
7. Once you've selected a Connector, click **Continue**.
8. In **Manifest Details**, you tell Harness where the values.yaml is located.
9. In **Manifest Identifier**, enter a name that identifies the file, like **values**.
10. In **Git Fetch Type**, select a branch or commit Id for the manifest, and then enter the Id or branch.
11. For **Specific Commit ID**, you can also use a [Git commit tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging).
12. In **File Path**, enter the path to the values.yaml file in the repo.
    
    You can enter multiple values file paths by clicking **Add File**. At runtime, Harness will compile the files into one values file.
    
    If you use multiple files, the highest priority is given from the last file, and the lowest priority to the first file. For example, if you have 3 files and the second and third files contain the same `key:value` as the first file, the third file's `key:value` overrides the second and first files.
    
    ![](./static/add-and-override-values-yaml-files-34.png)

13. Click **Submit**. The values file(s) are added to the Service.
   
   ![](./static/add-and-override-values-yaml-files-35.png)

## Override values in an environment

You can override the values YAML file for a stage's Environment by mapping the Environment name to the values file or folder. Next, you use the `<+env.name>` Harness expression in the values YAML path.

Let's look at an example.

Here is a repo with three values files, dev.yaml, qa.yaml. prod.yaml. In the **File Path** for the values file, you use the `<+env.name>` expression. 

Next, in the **Environment** setting, you add three Environments, one for each YAML file name.

![](./static/add-and-override-values-yaml-files-36.png)

When you select an Environment, such as **qa**, the name of the Environment is used in **File Path** and resolves to **qa.yaml**. At runtime, the **qa.yaml** values file is used.

Instead of selecting the Environment in the **Infrastructure** each time, you can set the Environment as a **Runtime Input** and then enter **dev**, **qa**, or **prod** at runtime. 

## Override values at runtime

You can make the values file path a **Runtime Input** and simply enter the name of the values file when you run the Pipeline.

In **Manifest Details** for the values file, in **File Path**, select **Runtime Input**. At runtime, you simply enter the name of the values file to use.

![](./static/add-and-override-values-yaml-files-37.png)

## See also

* [Deploy Helm Charts](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts)
* [Propagate and Override CD Services](/docs/continuous-delivery/x-platform-cd-features/services/propagate-and-override-cd-services)


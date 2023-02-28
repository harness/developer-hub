---
title: Harness Kubernetes services
description: Define a Kubernetes service.
sidebar_position: 1
helpdocs_topic_id: 2nx0de3w99
helpdocs_category_id: wfnd8y0ifs
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to add and configure a Harness Kubernetes service.

A Kubernetes service represents the microservices and other workloads you want to deploy to the cluster.

Setting up a Kubernetes service involves the following steps:

1. Add your manifests.
2. Add the artifacts you want to deploy.
3. Add any service variables you want to use in your manifests or pipeline.

## Manifests

Harness supports the following manifest types and orchestration methods.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

### Kubernetes

You can use:

- Standard Kubernetes manifests hosted in any repo or in Harness.
- Values YAML files with Go templating.
- Hardcoded values and Harness expressions in your values YAML files.

<details>
<summary>Watch a short video</summary>
Here's a quick video showing you how to add manifests and Values YAML files in Harness. It covers Kubernetes as well as other types like Helm Charts.

<!-- Video:
https://www.youtube.com/watch?v=dVk6-8tfwJc-->
<docvideo src="https://www.youtube.com/watch?v=dVk6-8tfwJc" />
</details>


```mdx-code-block
<Tabs>
  <TabItem value="YAML" label="YAML">
```
Here's a YAML example for a service with manifests hosted in Github and the nginx image hosted in Docker Hub.

<details>
<summary>Example</summary>

```yaml
service:
  name: Kubernetes
  identifier: Kubernetes
  serviceDefinition:
    type: Kubernetes
    spec:
      artifacts:
        primary:
          primaryArtifactRef: <+input>
          sources:
            - spec:
                connectorRef: Docker_Hub_with_Pwd
                imagePath: library/nginx
                tag: <+input>
              identifier: nginx
              type: DockerRegistry
      manifests:
        - manifest:
            identifier: nginx
            type: K8sManifest
            spec:
              store:
                type: Github
                spec:
                  connectorRef: harnessdocs2
                  gitFetchType: Branch
                  paths:
                    - default-k8s-manifests/Manifests/Files/templates
                  branch: main
              valuesPaths:
                - default-k8s-manifests/Manifests/Files/ng-values.yaml
              skipResourceVersioning: false
  gitOpsEnabled: false
```
</details>

```mdx-code-block
  </TabItem>
  <TabItem value="API" label="API">
```

Create a service using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.


```mdx-code-block
  </TabItem>  
  <TabItem value="Terraform Provider" label="Terraform Provider">
```

For the Terraform Provider resource, go to [harness_platform_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_service).

<details>
<summary>Example</summary>

```yaml
resource "harness_platform_service" "example" {
  identifier  = "identifier"
  name        = "name"
  description = "test"
  org_id      = "org_id"
  project_id  = "project_id"

  ## SERVICE V2 UPDATE
  ## We now take in a YAML that can define the service definition for a given Service
  ## It isn't mandatory for Service creation 
  ## It is mandatory for Service use in a pipeline

  yaml = <<-EOT
                service:
                  name: name
                  identifier: identifier
                  serviceDefinition:
                    spec:
                      manifests:
                        - manifest:
                            identifier: manifest1
                            type: K8sManifest
                            spec:
                              store:
                                type: Github
                                spec:
                                  connectorRef: <+input>
                                  gitFetchType: Branch
                                  paths:
                                    - files1
                                  repoName: <+input>
                                  branch: master
                              skipResourceVersioning: false
                      configFiles:
                        - configFile:
                            identifier: configFile1
                            spec:
                              store:
                                type: Harness
                                spec:
                                  files:
                                    - <+org.description>
                      variables:
                        - name: var1
                          type: String
                          value: val1
                        - name: var2
                          type: String
                          value: val2
                    type: Kubernetes
                  gitOpsEnabled: false
              EOT
}
```
</details>


```mdx-code-block
  </TabItem>  
  <TabItem value="Pipeline Studio" label="Pipeline Studio">
```
To add Kubernetes manifests to your service, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, click **Add Manifest**.
7. In **Specify Manifest Type**, select **K8s Manifest**, and then click **Continue**.
8. In **Specify K8s Manifest Store**, select the Git provider.
   
   The settings for each Git provider are slightly different, but you simply want to point to the Git account For example, click GitHub, and then select or create a new GitHub Connector. See [Connect to Code Repo](../../../platform/7_Connectors/connect-to-code-repo.md).
9.  Click **Continue**. **Manifest Details** appears.
10. In **Manifest Identifier**, enter an Id for the manifest.
11. If you selected a Connector that uses a Git account instead of a Git repo, enter the name of the repo where your manifests are located in **Repository Name**.
12. In **Git Fetch Type**, select **Latest from Branch** or **Specific Commit ID**, and then enter the branch or commit Id for the repo.
13. For **Specific Commit ID**, you can also use a [Git commit tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging).
14. In **File/Folder Path**, enter the path to the manifest file or folder in the repo. The Connector you selected already has the repo name, so you simply need to add the path from the root of the repo.
    
    If you are using a values.yaml file and it's in the same repo as your manifests, in **Values YAML**, click **Add File**.
15. Enter the path to the values.yaml file from the root of the repo.
    
    Here's an example with the manifest and values.yaml file added.
    
    ![](./static/kubernetes-services-01.png)
    
    If you use multiple files, the highest priority is given from the last file, and the lowest priority to the first file. For example, if you have 3 files and the second and third files contain the same key:value as the first file, the third file's key:value overrides the second and first files.
    
    ![](./static/kubernetes-services-02.png)
16. Click **Submit**. The manifest is added to **Manifests**.


```mdx-code-block
  </TabItem>  
  <TabItem value="Values YAML" label="Values YAML">
```

Harness Kubernetes Services can use Values YAML files just like you would using Helm. Harness manifests can use [Go templating](#go_templating) with your Values YAML files and you can include [Harness variable expressions](../../../platform/12_Variables-and-Expressions/harness-variables.md) in the Values YAML files.

If you are using a Values YAML file and it's in the same repo as your manifests, you can add it when you add your manifests, as described above (**Values YAML** --> **Add File**).

If you are using a Values YAML file and it's in a separate repo from your manifests, or you simply want to add it separately, you can add it as a separate file, described below.

You cannot use Harness variables expressions in your Kubernetes object manifest files. You can only use Harness variables expressions in Values YAML files.Add a Values YAML fileWhere is your Values YAML file located?

* **Same folder as manifests:** If you are using a values.yaml file and it's in the same repo as your manifests, you can add it when you add your manifests, as described above (**Values YAML** --> **Add File**).
* **Separate from manifests:** If your values file is located in a different folder, you can add it separately as a **Values YAML** manifest type, described below.

To add a Values YAML file, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, click **Add Manifest**.
7. In **Specify Manifest Type**, select **Values YAML**, and click **Continue.**
8. In **Specify Values YAML Store**, select the Git repo provider you're using and then create or select a Connector to that repo. The different Connectors are covered in [Connect to a Git Repo](../../../platform/7_Connectors/connect-to-code-repo.md).
   
   If you haven't set up a Harness Delegate, you can add one as part of the Connector setup. This process is described in [Kubernetes CD tutorial](../../onboard-cd/cd-quickstarts/kubernetes-cd-quickstart.md), [Helm CD tutorial](../../onboard-cd/cd-quickstarts/helm-cd-quickstart.md) and [Install a Kubernetes delegate](../../../platform/2_Delegates/advanced-installation/install-a-kubernetes-delegate.md).
9.  Once you've selected a Connector, click **Continue**.
10. In **Manifest Details**, you tell Harness where the values.yaml is located.
11. In **Manifest Identifier**, enter a name that identifies the file, like **values**.
12. If you selected a Connector that uses a Git account instead of a Git repo, enter the name of the repo where your manifests are located in **Repository Name**.
13. In **Git Fetch Type**, select a branch or commit Id for the manifest, and then enter the Id or branch.
    * For **Specific Commit ID**, you can also use a [Git commit tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging).
    * In **File Path**, enter the path to the values.yaml file in the repo.
   
   You can enter multiple values file paths by clicking **Add File**. At runtime, Harness will compile the files into one values file.
   
   If you use multiple files, the highest priority is given from the last file, and the lowest priority to the first file. For example, if you have 3 files and the second and third files contain the same key:value as the first file, the third file's key:value overrides the second and first files.
   
   ![](./static/kubernetes-services-03.png)
14. Click **Submit**.

The values file(s) are added to the Service.

#### Values files in both the Manifests and Values YAML

If you have Values files in both the K8s Manifest **File/Folder Path** and the Values YAML, the Values YAML will overwrite any matching values in the Values YAML in the Manifest **File/Folder Path**.

![](./static/kubernetes-services-04.png)

```mdx-code-block
  </TabItem>
  <TabItem value="Notes" label="Notes">
```

If this is your first time using Harness for a Kubernetes deployment, see [Kubernetes CD tutorial](../../onboard-cd/cd-quickstarts/kubernetes-cd-quickstart.md).

For a task-based walkthroughs of different Kubernetes features in Harness, see [Kubernetes How-tos](/docs/category/kubernetes).

You can hardcode your artifact in your manifests, our add your artifact source to your **Service Definition** and then reference it in your manifests. See [Reference Artifacts in Manifests](kubernetes-services.md#reference-artifacts-in-manifests).

```mdx-code-block
  </TabItem>  
</Tabs>
```

### Helm Chart

You can use Helm charts stored in an HTTP Helm Repository, OCI Registry, a Git repo provider, a cloud storage service (Google Cloud Storage, AWS S3, Azure Repo), a custom repo, or the [Harness File Store](https://developer.harness.io/docs/continuous-delivery/cd-services/cd-services-general/add-inline-manifests-using-file-store/).


```mdx-code-block
import Tabs1 from '@theme/Tabs';
import TabItem1 from '@theme/TabItem';
```

<Tabs1>
  <TabItem1 value="YAML" label="YAML" default>

Here's a YAML example for a service with manifests hosted in Github and the nginx image hosted in Docker Hub.

<details>
<summary>Example</summary>

```yaml
service:
  name: Helm Chart
  identifier: Helm_Chart
  tags: {}
  serviceDefinition:
    spec:
      manifests:
        - manifest:
            identifier: nginx
            type: HelmChart
            spec:
              store:
                type: Http
                spec:
                  connectorRef: Bitnami
              chartName: nginx
              helmVersion: V3
              skipResourceVersioning: false
              commandFlags:
                - commandType: Template
                  flag: mychart -x templates/deployment.yaml
    type: Kubernetes
```

</details>


```mdx-code-block
  </TabItem1>
  <TabItem1 value="API" label="API">
```

Create a service using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

```mdx-code-block
  </TabItem1>
  <TabItem1 value="Terraform Provider" label="Terraform Provider">
```

For the Terraform Provider resource, go to [harness_platform_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_service).

<details>
<summary>Example</summary>

```yaml
resource "harness_platform_service" "example" {
  identifier  = "identifier"
  name        = "name"
  description = "test"
  org_id      = "org_id"
  project_id  = "project_id"

  ## SERVICE V2 UPDATE
  ## We now take in a YAML that can define the service definition for a given Service
  ## It isn't mandatory for Service creation 
  ## It is mandatory for Service use in a pipeline

  yaml = <<-EOT
                service:
                  name: Helm Chart
                  identifier: Helm_Chart
                  tags: {}
                  serviceDefinition:
                    spec:
                      manifests:
                        - manifest:
                            identifier: nginx
                            type: HelmChart
                            spec:
                              store:
                                type: Http
                                spec:
                                  connectorRef: Bitnami
                              chartName: nginx
                              helmVersion: V3
                              skipResourceVersioning: false
                              commandFlags:
                                - commandType: Template
                                  flag: mychart -x templates/deployment.yaml
                    type: Kubernetes
              EOT
}
```
</details>

```mdx-code-block
  </TabItem1>
  <TabItem1 value="Pipeline Studio" label="Pipeline Studio">
```

To add a Helm chart to your service, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, click **Add Manifest**.
7. In **Specify Manifest Type**, select **Helm Chart**, and click **Continue**.
8. In **Specify Helm Chart Store**, select the storage service you're using.
   
   ![helm storage](static/a49287968d8e99d3368420384bab12d62206d48fa714cd0c61eed12ca14c641f.png)  


   For the steps and settings of each option, go to [Connectors](https://developer.harness.io/docs/category/connectors) or [Connect to a Git repo](https://developer.harness.io/docs/platform/Connectors/connect-to-code-repo).
   
   Once your Helm chart is added, it appears in the **Manifests** section. For example:
   
   ![](./static/kubernetes-services-05.png)

```mdx-code-block
  </TabItem1>
  <TabItem1 value="Notes" label="Notes">
```

If this is your first time using Harness for a Helm Chart deployment, see [Helm Chart deployment tutorial](../../onboard-cd/cd-quickstarts/helm-cd-quickstart.md).

For a detailed walkthrough of deploying Helm Charts in Harness, including limitations and binary support, see [Deploy Helm Charts](../../cd-advanced/cd-helm-category/deploy-helm-charts.md).

Important notes:

* Harness does not support AWS cross-account access for [ChartMuseum](https://chartmuseum.com/) and AWS S3. For example, if the Harness delegate used to deploy charts is in AWS account A, and the S3 bucket is in AWS account B, the Harness connector that uses this delegate in A cannot assume the role for the B account.
* Harness cannot fetch Helm chart versions with Helm OCI because Helm OCI no longer supports `helm chart list`. See [OCI Feature Deprecation and Behavior Changes with Helm v3.7.0](https://helm.sh/docs/topics/registries/#oci-feature-deprecation-and-behavior-changes-with-v370).
* Currently, you cannot list the OCI image tags in Harness. This is a Helm limitation. For more information, go to [Helm Search Repo Chart issue](https://github.com/helm/helm/issues/11000).

```mdx-code-block
  </TabItem1>
</Tabs1>
```



### Kustomize

Harness supports Kustomize deployments. You can use overlays, multibase, plugins, sealed secrets, patches, etc, just as you would in any native kustomization.

```mdx-code-block
import Tabs2 from '@theme/Tabs';
import TabItem2 from '@theme/TabItem';
```

<Tabs2>
  <TabItem2 value="YAML" label="YAML" default>

Here's a YAML example for a service using a publicly available [helloword kustomization](https://github.com/wings-software/harness-docs/tree/main/kustomize/helloWorld) cloned from Kustomize.

<details>
<summary>Example</summary>

```yaml
service:
  name: Kustomize
  identifier: Kustomize
  serviceDefinition:
    type: Kubernetes
    spec:
      manifests:
        - manifest:
            identifier: kustomize
            type: Kustomize
            spec:
              store:
                type: Github
                spec:
                  connectorRef: Kustomize
                  gitFetchType: Branch
                  folderPath: kustomize/helloworld
                  branch: main
              pluginPath: ""
              skipResourceVersioning: false
  gitOpsEnabled: false
```
</details>


```mdx-code-block
  </TabItem2>
  <TabItem2 value="API" label="API">
```

Create a service using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

```mdx-code-block
  </TabItem2>
  <TabItem2 value="Terraform Provider" label="Terraform Provider">
```

For the Terraform Provider resource, go to [harness_platform_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_service).

<details>
<summary>Example</summary>

```yaml
resource "harness_platform_service" "example" {
  identifier  = "identifier"
  name        = "name"
  description = "test"
  org_id      = "org_id"
  project_id  = "project_id"

  ## SERVICE V2 UPDATE
  ## We now take in a YAML that can define the service definition for a given Service
  ## It isn't mandatory for Service creation 
  ## It is mandatory for Service use in a pipeline

  yaml = <<-EOT
              service:
                name: Kustomize
                identifier: Kustomize
                serviceDefinition:
                  type: Kubernetes
                  spec:
                    manifests:
                      - manifest:
                          identifier: kustomize
                          type: Kustomize
                          spec:
                            store:
                              type: Github
                              spec:
                                connectorRef: Kustomize
                                gitFetchType: Branch
                                folderPath: kustomize/helloworld
                                branch: main
                            pluginPath: ""
                            skipResourceVersioning: false
                gitOpsEnabled: false
            EOT
}
```
</details>

```mdx-code-block
  </TabItem2>
  <TabItem2 value="Pipeline Studio" label="Pipeline Studio">
```

To add a kustomization, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, click **Add Manifest**.
7. In your CD stage, click **Service**.
8. In **Service Definition**, select **Kubernetes**.
9. In **Manifests**, click **Add Manifest**.
10. In **Specify Manifest Type**, click **Kustomize**, and click **Continue**.
11. In **Specify Manifest Type**, select a Git provider, [Harness File Store](https://developer.harness.io/docs/continuous-delivery/cd-services/cd-services-general/add-inline-manifests-using-file-store/), or Azure Repo.
12. In **Manifest Details**, enter the following settings, test the connection, and click **Submit**.

    + **Manifest Identifier:** enter **kustomize**.
    + **Git Fetch Type:** select **Latest from Branch**.
    + **Branch:** enter **main**.
    + **Kustomize Folder Path:** kustomize/helloWorld. This is the path from the repo root.
    
    The kustomization is now listed.
    
    ![](./static/kubernetes-services-06.png)

```mdx-code-block
  </TabItem2>
  <TabItem2 value="Kustomize Patches" label="Kustomize Patches" default>
```

You cannot use Harness variables in the base manifest or kustomization.yaml. You can only use Harness variables in kustomize patches you add in **Kustomize Patches Manifest Details**.

**How Harness uses patchesStrategicMerge:** 

- Kustomize patches override values in the base manifest. Harness supports the `patchesStrategicMerge` patches type.
- If the `patchesStrategicMerge` label is missing from the kustomization YAML file, but you have added Kustomize Patches to your Harness Service, Harness will add the Kustomize Patches you added in Harness to the `patchesStrategicMerge` in the kustomization file. If you have hardcoded patches in `patchesStrategicMerge`, but not add these patches to Harness as Kustomize Patches, Harness will ignore them.

For a detailed walkthrough of using patches in Harness, go to [Use Kustomize for Kubernetes deployments](../../cd-advanced/kustomize-howtos/use-kustomize-for-kubernetes-deployments.md).

To use Kustomize Patches, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, select **Add Manifest**.
7. In **Specify Manifest Type**, select **Kustomize Patches**, and select**Continue**.
8. In **Specify Kustomize Patches Store**, select your Git provider and Connector. See [Connect to a Git Repo](../../../platform/7_Connectors/connect-to-code-repo.md).
   
   The Git Connector should point to the Git account or repo where you Kustomize files are located. In **Kustomize Patches** you will specify the path to the actual patch files.
9.  Select **Continue**.
10. In **Manifest Details**, enter the path to your patch file(s):
    + **Manifest Identifier:** enter a name that identifies the patch file(s). You don't have to add the actual filename.
    + **Git Fetch Type:** select whether to use the latest branch or a specific commit Id.
    + **Branch**/**Commit Id**: enter the branch or commit Id.
    + **File/Folder Path:** enter the path to the patch file(s) from the root of the repo.
11. Click **Add File** to add each patch file. The files you add should be the same files listed in `patchesStrategicMerge` of the main kustomize file in your Service.
    
    The order in which you add file paths for patches in **File/Folder Path** is the same order that Harness applies the patches during the kustomization build.
    
    Small patches that do one thing are recommended. For example, create one patch for increasing the deployment replica number and another patch for setting the memory limit.
12. Select **Submit**. The patch file(s) is added to **Manifests**.
    
    When the main kustomization.yaml is deployed, the patch is rendered and its overrides are added to the deployment.yaml that is deployed.



```mdx-code-block
  </TabItem2>  
  <TabItem2 value="Notes" label="Notes">
```

If this is your first time using Harness for a Kustomize deployment, see the [Kustomize Quickstart](../../onboard-cd/cd-quickstarts/kustomize-quickstart.md).

For a detailed walkthrough of deploying Kustomize in Harness, including limitations, see [Use Kustomize for Kubernetes Deployments](../../cd-advanced/kustomize-howtos/use-kustomize-for-kubernetes-deployments.md).

Important notes:

* Harness supports Kustomize and Kustomize Patches for [Rolling](../../cd-execution/kubernetes-executions/create-a-kubernetes-rolling-deployment.md), [Canary](../../cd-technical-reference/cd-k8s-ref/canary-deployment-step.md), [Blue Green](../../cd-execution/kubernetes-executions/create-a-kubernetes-blue-green-deployment.md) strategies, and the Kubernetes [Apply](../../cd-technical-reference/cd-k8s-ref/kubernetes-apply-step.md) and [Delete](../../cd-execution/kubernetes-executions/delete-kubernetes-resources.md) steps.
* Harness does not use Kustomize for rollback. Harness renders the templates using Kustomize and then passes them onto kubectl. A rollback works exactly as it does for native Kubernetes.
* You cannot use Harness variables in the base manifest or kustomization.yaml. You can only use Harness variables in kustomize patches you add in **Kustomize Patches Manifest Details**.
* **Kustomize binary versions:**
  * Harness includes Kustomize binary versions 3.5.4 and 4.0.0. By default, Harness uses 3.5.4. 
  * To use 4.0.0, you must enable the feature flag `NEW_KUSTOMIZE_BINARY` in your account. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
* Harness will not follow symlinks in the Kustomize and Kustomize Patches files it pulls.

```mdx-code-block
  </TabItem2>
</Tabs2>
```

### OpenShift Template

Harness supports OpenShift for Kubernetes deployments.

For an overview of OpenShift support, see [Using OpenShift with Harness Kubernetes](../../cd-technical-reference/cd-k8s-ref/using-open-shift-with-harness-kubernetes.md).

```mdx-code-block
import Tabs3 from '@theme/Tabs';
import TabItem3 from '@theme/TabItem';
```

<Tabs3>
  <TabItem3 value="YAML" label="YAML" default>

Here's a YAML example for a service using an OpenShift template that is stored in the [Harness File Store](https://developer.harness.io/docs/continuous-delivery/cd-services/cd-services-general/add-inline-manifests-using-file-store/).

<details>
<summary>Example</summary>

```yaml
service:
  name: OpenShift Template
  identifier: OpenShift
  tags: {}
  serviceDefinition:
    spec:
      manifests:
        - manifest:
            identifier: nginx
            type: OpenshiftTemplate
            spec:
              store:
                type: Harness
                spec:
                  files:
                    - /OpenShift/templates/example-template.yml
              skipResourceVersioning: false
    type: Kubernetes
```
</details>

```mdx-code-block
  </TabItem3>
  <TabItem3 value="API" label="API">
```

Create a service using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

```mdx-code-block
  </TabItem3>
  <TabItem3 value="Terraform Provider" label="Terraform Provider">
```

For the Terraform Provider resource, go to [harness_platform_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_service).

<details>
<summary>Example</summary>

```yaml
resource "harness_platform_service" "example" {
  identifier  = "identifier"
  name        = "name"
  description = "test"
  org_id      = "org_id"
  project_id  = "project_id"

  ## SERVICE V2 UPDATE
  ## We now take in a YAML that can define the service definition for a given Service
  ## It isn't mandatory for Service creation 
  ## It is mandatory for Service use in a pipeline

  yaml = <<-EOT
              service:
                name: OpenShift Template
                identifier: OpenShift
                tags: {}
                serviceDefinition:
                  spec:
                    manifests:
                      - manifest:
                          identifier: nginx
                          type: OpenshiftTemplate
                          spec:
                            store:
                              type: Harness
                              spec:
                                files:
                                  - /OpenShift/templates/example-template.yml
                            skipResourceVersioning: false
                  type: Kubernetes
              EOT
}
```
</details>

```mdx-code-block
  </TabItem3>
  <TabItem3 value="Pipeline Studio" label="Pipeline Studio">
```

To add an OpenShift Template to a service, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, click **Add Manifest**.
7.  In **Specify Manifest Type**, select **OpenShift Template**, and then select **Continue.**
8.  In **Specify OpenShift Template Store**, select where your template is located. 
  
  You can use a Git provider, the [Harness File Store](https://developer.harness.io/docs/continuous-delivery/cd-services/cd-services-general/add-inline-manifests-using-file-store/), a custom repo, or Azure Repos.
1.  For example, click **GitHub**, and then select or create a new GitHub Connector. See [Connect to Code Repo](../../../platform/7_Connectors/connect-to-code-repo.md).
2.  Select **Continue**. **Manifest Details** appears.
3.  In **Manifest Identifier**, enter an Id for the manifest. It must be unique. It can be used in Harness expressions to reference this template's settings.
4.  In **Git Fetch Type**, select **Latest from Branch** or **Specific Commit Id/Git Tag**, and then enter the branch or commit Id/[tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) for the repo.
5.  In **Template** **File Path**, enter the path to the template file. The Connector you selected already has the repo name, so you simply need to add the path from the root of the repo to the file.
6.  Select **Submit**. The template is added to **Manifests**.

```mdx-code-block
  </TabItem3>
  <TabItem3 value="OpenShift Param" label="OpenShift Param" default>
```

OpenShift Param Files can be added in the following ways:

1. Attached to the OpenShift Template you added.
2. Added as a separate manifest.

![Params](static/9e15cbd984b566f357edc930d15ff7ce9d186c4d843615f5299710605926f811.png)

For an overview of OpenShift support, see [Using OpenShift with Harness Kubernetes](../../cd-technical-reference/cd-k8s-ref/using-open-shift-with-harness-kubernetes.md).

Let's look at an example where the OpenShift Param is attached to a template already added:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select the service with the OpenShift template.
3. Select **Configuration**.
4. In **Manifests**, select **Attach OpenShift Param**.
5. In **Enter File Path**, select where your params file is located.
6. Select **Submit**. The params file is added to **Manifests**.

You can now see the params file in the OpenShift Template **Manifest Details**.

![Manifest Details](static/bbeb75857343eb531ec2025d898bceb40393fa5068529e4ae69970ca3eaa8f4d.png)


```mdx-code-block
  </TabItem3>
  <TabItem3 value="Notes" label="Notes">
```

#### Deployment strategy support

In addition to standard workload type support in Harness (see [What can I deploy in Kubernetes?](https://developer.harness.io/docs/continuous-delivery/cd-technical-reference/cd-k8s-ref/what-can-i-deploy-in-kubernetes)), Harness supports [DeploymentConfig](https://docs.openshift.com/container-platform/4.1/applications/deployments/what-deployments-are.html), [Route](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/routes.html), and [ImageStream](https://docs.openshift.com/enterprise/3.2/architecture/core_concepts/builds_and_image_streams.html#image-streams) across Canary, Blue Green, and Rolling deployment strategies.

Please use `apiVersion: apps.openshift.io/v1` and not `apiVersion: v1`.

#### Harness supports list objects

You can leverage Kubernetes list objects as needed without modifying your YAML for Harness.

When you deploy, Harness will render the lists and show all the templated and rendered values in the log.

Harness supports:

* List
* NamespaceList
* ServiceList
* For Kubernetes deployments, these objects are supported for all deployment strategies (Canary, Rolling, Blue/Green).
* For Native Helm, these objects are supported for Rolling deployments.

If you run `kubectl api-resources` you should see a list of resources, and `kubectl explain` will work with any of these.

#### Important notes

* Make sure that you update your version to `apiVersion: apps.openshift.io/v1` and not `apiVersion: v1`.
* The token does not need to have global read permissions. The token can be scoped to the namespace.
* The Kubernetes containers must be OpenShift-compatible containers. If you are already using OpenShift, then this is already configured. But be aware that OpenShift cannot simply deploy any Kubernetes container. You can get OpenShift images from the following public repos: <https://hub.docker.com/u/openshift> and <https://access.redhat.com/containers>.
* Useful articles for setting up a local OpenShift cluster for testing: [How To Setup Local OpenShift Origin (OKD) Cluster on CentOS 7](https://computingforgeeks.com/setup-openshift-origin-local-cluster-on-centos/), [OpenShift Console redirects to 127.0.0.1](https://chrisphillips-cminion.github.io/kubernetes/2019/07/08/OpenShift-Redirect.html).

```mdx-code-block
  </TabItem3>
</Tabs3>
```



## Artifacts

You have two options when referencing the artifacts you want to deploy:

- Add an artifact source to the Harness service and reference it in the values YAML, Helm chart, etc., using the Harness expression `<+artifacts.primary.image>`.
- Hardcode the artifact into the manifests, values YAML, etc.

```mdx-code-block
import Tabs4 from '@theme/Tabs';
import TabItem4 from '@theme/TabItem';
```
```mdx-code-block
<Tabs4>
  <TabItem4 value="Expression" label="Expression" default>
```

Add the image location to Harness as an artifact in the **Artifacts** section of the service.

![](./static/kubernetes-services-07.png)

This allows you to reference the image in your values YAML files using the Harness expression `<+artifacts.primary.image>`.

```yaml
...  
image: <+artifacts.primary.image>  
...
```

<details>
<summary>Using the artifact expression</summary>

You cannot use Harness variables expressions in your Kubernetes object manifest files. You can only use Harness variables expressions in values YAML files, or Kustomize Patch file.

When you select the artifact repo for the artifact, like a Docker Hub repo, you specify the artifact and tag/version to use. 

You can select a specific tag/version, use a [runtime input](https://developer.harness.io/docs/platform/references/runtime-inputs/) so that you are prompted for the tag/version when you run the pipeline, or you can use an Harness variable expression to pass in the tag/version at execution.

Here's an example where a runtime input is used and you select which image version/tag to deploy.

![](./static/kubernetes-services-08.png)

With a Harness artifact, you can template your manifests, detaching them from a hardcoded location. This makes your manifests reusable and dynamic.

</details>

```mdx-code-block
  </TabItem4>
  <TabItem4 value="Hardcode" label="Hardcode">
```
If a Docker image location is hardcoded in your Kubernetes manifest (for example, `image: nginx:1.14.2`), then you can simply add the manifest to Harness in **Manifests** and Kubernetes will pull the image during deployment.

```mdx-code-block
  </TabItem4>
</Tabs4>
```

### Docker

```mdx-code-block
import Tabs5 from '@theme/Tabs';
import TabItem5 from '@theme/TabItem';
```
```mdx-code-block
<Tabs5>
  <TabItem5 value="YAML" label="YAML" default>
```

To use a Docker artifact, you create or use a Harness connector to connect to your Docker repo and then use that connector in your Harness service and reference the artifact to use.

<details>
<summary>Docker connector YAML</summary>

```yaml
connector:
  name: Docker Hub with Pwd
  identifier: Docker_Hub_with_Pwd
  description: ""
  orgIdentifier: default
  projectIdentifier: CD_Docs
  type: DockerRegistry
  spec:
    dockerRegistryUrl: https://index.docker.io/v2/
    providerType: DockerHub
    auth:
      type: UsernamePassword
      spec:
        username: johndoe
        passwordRef: Docker_Hub_Pwd
    executeOnDelegate: false
```

</details>

<details>
<summary>Service using Docker artifact YAML</summary>

```yaml
service:
  name: Kubernetes
  identifier: Kubernetes
  serviceDefinition:
    type: Kubernetes
    spec:
      artifacts:
        primary:
          primaryArtifactRef: <+input>
          sources:
            - spec:
                connectorRef: Docker_Hub_with_Pwd
                imagePath: library/nginx
                tag: stable-perl
              identifier: nginx
              type: DockerRegistry
      manifests:
        - manifest:
            identifier: nginx
            type: K8sManifest
            spec:
              store:
                type: Github
                spec:
                  connectorRef: harnessdocs2
                  gitFetchType: Branch
                  paths:
                    - default-k8s-manifests/Manifests/Files/templates
                  branch: main
              valuesPaths:
                - default-k8s-manifests/Manifests/Files/ng-values.yaml
              skipResourceVersioning: false
  gitOpsEnabled: false
```
</details>



```mdx-code-block
  </TabItem5>
  <TabItem5 value="API" label="API">
```

Create the Docker connector using the [Create a Connector](https://apidocs.harness.io/tag/Connectors#operation/createConnector) API.

Note that the `type` is `DockerRegistry` and the `connectorType` depends on the Docker registry you are using (`DockerConnector`, `ArtifactoryConnector`, etc.).

<details>
<summary>Docker connector example</summary>

```yaml
curl --location --request POST 'https://app.harness.io/gateway/ng/api/connectors?accountIdentifier=12345678' \
--header 'Content-Type: text/yaml' \
--header 'x-api-key: pat.123456789' \
--data-raw 'connector:  
  name: dockerhub  
  identifier: dockerhub
  description: ""  
  tags: {}  
  orgIdentifier: default  
  projectIdentifier: APISample  
  type: DockerRegistry  
  spec:  
    dockerRegistryUrl: https://index.docker.io/v2/  
    providerType: DockerHub  
    auth:  
      type: Anonymous'
```

</details>


Create a service with an artifact source that uses the connector using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.


```mdx-code-block
  </TabItem5>
  <TabItem5 value="Terraform Provider" label="Terraform Provider">
```
1. .
2. .

```mdx-code-block
  </TabItem5>
  <TabItem5 value="Pipeline Studio" label="Pipeline Studio">
```

For details on all the Docker Connector settings, see [Docker Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/docker-registry-connector-settings-reference.md).

Add an Artifact from a Docker RegistryIn **Artifacts**, click **Add Primary** **Artifact.**

In **Artifact Repository Type**, click **Docker Registry**, and then click **Continue**.

The **Docker Registry** settings appear.

Select a [Docker Registry Connector](../../../platform/7_Connectors/ref-cloud-providers/docker-registry-connector-settings-reference.md) or create a new one.

Click **Continue**.

In **Image path**, enter the name of the artifact you want to deploy, such as **library/nginx**.

In **Tag**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image.

![](./static/kubernetes-services-09.png)

Click **Submit**.

The Artifact is added to the Service Definition.

```mdx-code-block
  </TabItem5>
</Tabs5>
```

### Google Container Registry (GCR)

```mdx-code-block
import Tabs6 from '@theme/Tabs';
import TabItem6 from '@theme/TabItem';
```
```mdx-code-block
<Tabs6>
  <TabItem6 value="YAML" label="YAML" default>
```
1. .
2. .

```mdx-code-block
  </TabItem6>
  <TabItem6 value="API" label="API">
```

1. In **Pipeline Studio**, select **YAML**
2. Paste the following YAML example and select **Save**:


```mdx-code-block
  </TabItem6>
  <TabItem6 value="Terraform Provider" label="Terraform Provider">
```
1. .
2. .

```mdx-code-block
  </TabItem6>
  <TabItem6 value="Pipeline Studio" label="Pipeline Studio">
```

You connect to GCR using a Harness GCP Connector. For details on all the GCR requirements for the GCP Connector, see [Google Cloud Platform (GCP) Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/gcs-connector-settings-reference.md).

Add an Artifact from GCRIn **Artifacts**, click **Add Primary** **Artifact.**

In **Artifact Repository Type**, click **GCR**, and then click **Continue**.

In **GCR Repository**, select or create a [Google Cloud Platform (GCP) Connector](../../../platform/7_Connectors/ref-cloud-providers/gcs-connector-settings-reference.md) that connects to the GCP account where the GCR registry is located.

* **GCP GCR Permissions:** make sure the connected IAM User has the policies listed in [Google Cloud Platform (GCP) Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/gcs-connector-settings-reference.md).

Click **Continue**.

In **GCR Registry URL**, select the registry where the artifact source is located.

In **Image Path**, enter the name of the artifact you want to deploy.

Images in repos need to reference a path starting with the project ID that the artifact is in, for example: `myproject-id/image-name`.

In **Tag**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image or select [Runtime Input or Expression](../../../platform/20_References/runtime-inputs.md).

![](./static/kubernetes-services-10.png)

If you use Runtime Input, when you deploy the Pipeline, Harness will pull the list of tags from the repo and prompt you to select one.

Click **Submit**.

The Artifact is added to the Service Definition.

```mdx-code-block
  </TabItem6>
</Tabs6>
```

### Google Artifact Registry

```mdx-code-block
import Tabs7 from '@theme/Tabs';
import TabItem7 from '@theme/TabItem';
```
```mdx-code-block
<Tabs7>
  <TabItem7 value="YAML" label="YAML" default>
```
1. .
2. .

```mdx-code-block
  </TabItem7>
  <TabItem7 value="API" label="API">
```

1. In **Pipeline Studio**, select **YAML**
2. Paste the following YAML example and select **Save**:


```mdx-code-block
  </TabItem7>
  <TabItem7 value="Terraform Provider" label="Terraform Provider">
```
1. .
2. .

```mdx-code-block
  </TabItem7>
  <TabItem7 value="Pipeline Studio" label="Pipeline Studio">
```

You connect to Google Artifact Registry using a Harness GCP Connector. 

For details on all the Google Artifact Registry requirements for the GCP Connector, see [Google Cloud Platform (GCP) Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/gcs-connector-settings-reference.md).

Add an Artifact from Google Artifact RegistryIn **Artifacts**, click **Add Primary** **Artifact.**

In **Artifact Repository Type**, click **Google Artifact Registry**, and then click **Continue**.

In **GCP Connector**, select or create a [Google Cloud Platform (GCP) Connector](../../../platform/7_Connectors/ref-cloud-providers/gcs-connector-settings-reference.md) that connects to the GCP account where the Google Artifact Registry is located. Ensure the GCP account it uses has the following roles:

* Artifact Registry Reader
* Artifact Registry Writer

Click **Continue**.

In **Artifact Details**, you are basically creating the pull command. For example:


```
docker pull us-central1-docker.pkg.dev/docs-play/quickstart-docker-repo/quickstart-image:v1.0
```

In **Artifact Source Name**, enter a name for the artifact.

In **Repository Type**, select the format of the artifact.

In **Project**, enter the name of the GCP project.

In **Region**, select the region where the repo is located.

In **Repository Name**, enter the name of the repo.

In **Package**, enter the artifact name.

In **Version Details**, select **Value** or **Regex**.

In **Version**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image or select [Runtime Input or Expression](../../../platform/20_References/runtime-inputs.md).

![](./static/kubernetes-services-11.png)

If you use Runtime Input, when you deploy the Pipeline, Harness will pull the list of tags from the repo and prompt you to select one.

Click **Submit**.

The Artifact is added to the Service Definition.


```mdx-code-block
  </TabItem7>
</Tabs7>
```

### Amazon Elastic Container Registry (ECR)

```mdx-code-block
import Tabs8 from '@theme/Tabs';
import TabItem8 from '@theme/TabItem';
```
```mdx-code-block
<Tabs8>
  <TabItem8 value="YAML" label="YAML" default>
```
1. .
2. .

```mdx-code-block
  </TabItem8>
  <TabItem8 value="API" label="API">
```

1. In **Pipeline Studio**, select **YAML**
2. Paste the following YAML example and select **Save**:


```mdx-code-block
  </TabItem8>
  <TabItem8 value="Terraform Provider" label="Terraform Provider">
```
1. .
2. .

```mdx-code-block
  </TabItem8>
  <TabItem8 value="Pipeline Studio" label="Pipeline Studio">
```

You connect to ECR using a Harness AWS Connector. For details on all the ECR requirements for the AWS Connector, see [AWS Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/aws-connector-settings-reference.md).

Add an Artifact from ECRIn **Artifacts**, click **Add Primary** **Artifact.**

In **Artifact Repository Type**, click **ECR**, and then click **Continue**.

In **ECR Repository**, select or create an [AWS Connector](../../../platform/7_Connectors/add-aws-connector.md) that connects to the AWS account where the ECR registry is located.

* **AWS ECR Permissions:** make sure the connected IAM User has the policies listed in [AWS Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/aws-connector-settings-reference.md).

Click **Continue**.

In **Artifact Details**, select the region where the artifact source is located.

In **Image Path**, enter the name of the artifact you want to deploy.

In **Tag**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image.

![](./static/kubernetes-services-12.png)

If you use Runtime Input, when you deploy the Pipeline, Harness will pull the list of tags from the repo and prompt you to select one.

Click **Submit**.

The Artifact is added to the Service Definition.


```mdx-code-block
  </TabItem8>
</Tabs8>
```

### Azure Container Registry (ACR)

```mdx-code-block
import Tabs9 from '@theme/Tabs';
import TabItem9 from '@theme/TabItem';
```
```mdx-code-block
<Tabs9>
  <TabItem9 value="YAML" label="YAML" default>
```
1. .
2. .

```mdx-code-block
  </TabItem9>
  <TabItem9 value="API" label="API">
```

1. In **Pipeline Studio**, select **YAML**
2. Paste the following YAML example and select **Save**:


```mdx-code-block
  </TabItem9>
  <TabItem9 value="Terraform Provider" label="Terraform Provider">
```
1. .
2. .

```mdx-code-block
  </TabItem9>
  <TabItem9 value="Pipeline Studio" label="Pipeline Studio">
```

You connect to ACR using a Harness Azure Connector. For details on all the Azure requirements for the Azure Connector, see [Add a Microsoft Azure Cloud Connector](../../../platform/7_Connectors/add-a-microsoft-azure-connector.md).

Add an Artifact from ACRIn **Artifacts**, click **Add Primary** **Artifact.**

In **Artifact Repository Type**, click **ACR**, and then click **Continue**.

In **ACR Repository**, select or create an [Azure Connector](../../../platform/7_Connectors/add-a-microsoft-azure-connector.md) that connects to the Azure account where the ACR registry is located.

* **Azure ACR Permissions:** make sure the Service Principal or Managed Identity has the [required permissions](../../../platform/7_Connectors/add-a-microsoft-azure-connector.md).

Click **Continue**.

In **Artifact Details**, select the Subscription Id where the artifact source is located.

In **Registry**, select the ACR registry to use.

In **Repository**, select the repo to use.

In **Tag**, enter or select the tag for the image.

![](./static/kubernetes-services-13.png)

If you use Runtime Input, when you deploy the Pipeline, Harness will pull the list of tags from the repo and prompt you to select one.

Click **Submit**.

The Artifact is added to the Service Definition.


```mdx-code-block
  </TabItem9>
</Tabs9>
```

### Nexus

```mdx-code-block
import Tabs10 from '@theme/Tabs';
import TabItem10 from '@theme/TabItem';
```
```mdx-code-block
<Tabs10>
  <TabItem10 value="YAML" label="YAML" default>
```
1. .
2. .

```mdx-code-block
  </TabItem10>
  <TabItem10 value="API" label="API">
```

1. In **Pipeline Studio**, select **YAML**
2. Paste the following YAML example and select **Save**:


```mdx-code-block
  </TabItem10>
  <TabItem10 value="Terraform Provider" label="Terraform Provider">
```
1. .
2. .

```mdx-code-block
  </TabItem10>
  <TabItem10 value="Pipeline Studio" label="Pipeline Studio">
```

You connect to Nexus using a Harness Nexus Connector. For details on all the requirements for the Nexus Connector, see [Nexus Connector Settings Reference](../../../platform/8_Pipelines/w_pipeline-steps-reference/nexus-connector-settings-reference.md).

Add an Artifact from NexusIn **Artifacts**, click **Add Primary** **Artifact.**

In **Artifact Repository Type**, click **Nexus**, and then click **Continue**.

In **Nexus Repository**, select of create a Nexus Connector that connects to the Nexus account where the repo is located. Click **Continue**.

* **Nexus Permissions:** make sure the Nexus user account has the permissions listed in [Nexus Connector Settings Reference](../../../platform/8_Pipelines/w_pipeline-steps-reference/nexus-connector-settings-reference.md).

The **Artifact Details** settings appear.

Select **Repository URL** or **Repository Port**.

* Repository Port is more commonly used and can be taken from the repo settings. Each repo uses its own port.
* Repository URL is typically used for a custom infrastructure (for example, when Nexus is hosted behind a reverse proxy).

In **Repository**, enter the name of the repo.

In **Artifact Path**, enter the path to the artifact you want.

In **Tag**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image.

![](./static/kubernetes-services-14.png)

If you use Runtime Input, when you deploy the Pipeline, Harness will pull the list of tags from the repo and prompt you to select one.

Click **Submit**.

The Artifact is added to the Service Definition.


```mdx-code-block
  </TabItem10>
</Tabs10>
```

### Artifactory

```mdx-code-block
import Tabs11 from '@theme/Tabs';
import TabItem11 from '@theme/TabItem';
```
```mdx-code-block
<Tabs11>
  <TabItem11 value="YAML" label="YAML" default>
```
1. .
2. .

```mdx-code-block
  </TabItem11>
  <TabItem11 value="API" label="API">
```

1. In **Pipeline Studio**, select **YAML**
2. Paste the following YAML example and select **Save**:


```mdx-code-block
  </TabItem11>
  <TabItem11 value="Terraform Provider" label="Terraform Provider">
```
1. .
2. .

```mdx-code-block
  </TabItem11>
  <TabItem11 value="Pipeline Studio" label="Pipeline Studio">
```

You connect to Artifactory (JFrog) using a Harness Artifactory Connector. For details on all the requirements for the Artifactory Connector, see [Artifactory Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/artifactory-connector-settings-reference.md).

Add an Artifact from ArtifactoryIn **Artifacts**, click **Add Primary** **Artifact.**

In **Artifact Repository Type**, click **Artifactory**, and then click **Continue**.

In **Artifactory Repository**, select of create an Artifactory Connector that connects to the Artifactory account where the repo is located. Click **Continue**.

* **Artifactory Permissions:** make sure the Artifactory user account has the permissions listed in [Artifactory Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/artifactory-connector-settings-reference.md).

The **Artifact Details** settings appear.

In **Repository URL**, enter the URL from the `docker login` command in Artifactory's **Set Me Up** settings.

![](./static/kubernetes-services-15.png)

In **Repository**, enter the repo name. So if the full path is `docker-remote/library/mongo/3.6.2`, you would enter `docker-remote`.

In **Artifact Path**, enter the path to the artifact. So if the full path is `docker-remote/library/mongo/3.6.2`, you would enter `library/mongo`.

In **Tag**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image.

![](./static/kubernetes-services-16.png)

If you use Runtime Input, when you deploy the Pipeline, Harness will pull the list of tags from the repo and prompt you to select one.

Click **Submit**.

The Artifact is added to the Service Definition.


```mdx-code-block
  </TabItem11>
</Tabs11>
```

### Github Packages

```mdx-code-block
import Tabs12 from '@theme/Tabs';
import TabItem12 from '@theme/TabItem';
```
```mdx-code-block
<Tabs12>
  <TabItem12 value="YAML" label="YAML" default>
```

<details>
<summary>YAML for </summary>
markdown
</details>


```mdx-code-block
  </TabItem12>
  <TabItem12 value="API" label="API">
```

1. In **Pipeline Studio**, select **YAML**
2. Paste the following YAML example and select **Save**:


```mdx-code-block
  </TabItem12>
  <TabItem12 value="Terraform Provider" label="Terraform Provider">
```
1. .
2. .

```mdx-code-block
  </TabItem12>
  <TabItem12 value="Pipeline Studio" label="Pipeline Studio">
```

You can use Github Packages as artifacts for deployments.

Currently, Harness supports only the packageType as `docker(container)`. Support for npm, maven, rubygems, and nuget is coming soon. You connect to Github using a Harness Github Connector, username, and Personal Access Token (PAT).

Add an Artifact from Github PackagesIn **Artifacts**, click **Add Primary** **Artifact.**

In **Artifact Repository Type**, click **Github Package Registry**, and then click **Continue**.

In **Github Package Registry Repository**, select of create an Github Connector that connects to the Github account where the package repo is located. Click **Continue**.

* **Github Permissions:** make sure the Personal Access Token (PAT) has the `write:packages` and `read:packages` permissions.
* **API access:** ensure that you enable API access. You can use the Harness secret with the same PAT that you used for user authentication.

The **Artifact Details** settings appear.

In **Artifact Source Name**, enter a name for this artifact source.

In **Package Type**, select the type of package you are using.

In **Package Name**, enter the name of the package.

In **Version**, enter the version to use. If you use [Runtime Input](../../../platform/20_References/runtime-inputs.md), when you deploy the Pipeline, Harness will pull the list of tags from the repo and prompt you to select one.

Click **Submit**.

The Artifact is added to the Service Definition.

New to Github Packages? This [quick video](https://www.youtube.com/watch?v=gqseP_wTZsk) will get you up to speed in minutes.#### Custom Artifact Source

For enterprises that use a custom repository, Harness provides the Custom Artifact Source to add their custom repository to the Service.

To use this artifact source, you provide a script to query your artifact server via its API (for example, REST) and then Harness stores the output on the Harness Delegate in the Harness-initialized variable `$HARNESS_ARTIFACT_RESULT_PATH`.

The output must be a JSON array, with a mandatory key for a Build Number/Version. You then map a key from your JSON output to the Build Number/Version variable.

For steps on adding a Custom Artifact source, go to [Add a Custom Artifact Source for CD](../cd-services-general/add-a-custom-artifact-source-for-cd.md).

```mdx-code-block
  </TabItem12>
</Tabs12>
```


### Reference Artifacts in Manifests

Once you have added an artifact to the **Artifacts** section of the Service, you need to reference that artifact in the Values YAML file added in **Manifests**.

You cannot use Harness variables expressions in your Kubernetes object manifest files. You can only use Harness variables expressions in Values YAML files.Referencing Artifacts in ManifestsTo reference this artifact, in the Values YAML file, you reference the image in the Service Definition **Artifacts** section using the Harness variable `<+artifact.image>`.

For example, here's a reference in a Values file:

```yaml
...  
name: myapp  
replicas: 2  
  
image: <+artifact.image>  
...
```

That `<+artifact.image>` references the artifact listed as **Primary** in **Artifacts**. At deployment runtime, Harness resolves `<+artifact.image>` to the image from your artifact source.

![](./static/kubernetes-services-17.png)

In your Kubernetes manifests, you simply use a standard Go template reference to the image value from your values file: `{{.Values.image}}`:

```yaml
apiVersion: apps/v1  
kind: Deployment  
...  
    spec:  
      {{- if .Values.dockercfg}}  
      imagePullSecrets:  
      - name: {{.Values.name}}-dockercfg  
      {{- end}}  
      containers:  
      - name: {{.Values.name}}  
        image: {{.Values.image}}  
...
```
See [Example Manifests](../../cd-advanced/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments.md#example-manifests) for more details.

If an artifact expression is a Values YAML file or Execution step, you will be prompted to select an artifact at runtime. This is true even if the Stage does not deploy an artifact (such as a Custom Stage or a Stage performing a [Kustomize](../../onboard-cd/cd-quickstarts/kustomize-quickstart.md) deployment). If you want to reference an artifact that isn't the primary deployment artifact without being prompted, you can use an expression with quotes, like `docker pull <+artifact<+".metadata.image">>`.

### Go Templating

Harness supports [Go templating](https://godoc.org/text/template) for Kubernetes manifests. So you can add one or more Values YAML files containing values for different scenarios, and then use Go templating in the manifest files to reference the values in the Values YAML files.

Built-in Go templating support enables you to use Kubernetes without the need for Helm.

For more information, see [Example Kubernetes Manifests using Go Templating](../../cd-technical-reference/cd-k8s-ref/example-kubernetes-manifests-using-go-templating.md).Let's look at a few Kubernetes templating examples.

Basic Values YAML and Manifests for Public ImageHere's the values YAML file:

```yaml
name: <+stage.name>  
replicas: 2  
  
image: <+artifact.image>  
# dockercfg: <+artifact.imagePullSecret>  
  
createNamespace: true  
namespace: <+infra.namespace>  
  
serviceType: LoadBalancer  
  
servicePort: 80  
serviceTargetPort: 80  
  
env:  
  config:  
    key1: value10  
  secrets:  
    key2: value2
```

Here's the manifest containing multiple objects referring to the values in the values YAML file:

```go
{{- if .Values.env.config}}  
apiVersion: v1  
kind: ConfigMap  
metadata:  
 name: {{.Values.name}}  
data:  
{{.Values.env.config | toYaml | indent 2}}  
---  
{{- end}}  
  
{{- if .Values.env.secrets}}  
apiVersion: v1  
kind: Secret  
metadata:  
 name: {{.Values.name}}  
stringData:  
{{.Values.env.secrets | toYaml | indent 2}}  
---  
{{- end}}  
  
{{- if .Values.dockercfg}}  
apiVersion: v1  
kind: Secret  
metadata:  
 name: {{.Values.name}}-dockercfg  
 annotations:  
 harness.io/skip-versioning: true  
data:  
 .dockercfg: {{.Values.dockercfg}}  
type: kubernetes.io/dockercfg  
---  
{{- end}}  
  
apiVersion: apps/v1  
kind: Deployment  
metadata:  
 name: {{.Values.name}}-deployment  
spec:  
 replicas: {{int .Values.replicas}}  
 selector:  
 matchLabels:  
 app: {{.Values.name}}  
 template:  
 metadata:  
 labels:  
 app: {{.Values.name}}  
 spec:  
 {{- if .Values.dockercfg}}  
 imagePullSecrets:  
 - name: {{.Values.name}}-dockercfg  
 {{- end}}  
 containers:  
 - name: {{.Values.name}}  
 image: {{.Values.image}}  
 {{- if or .Values.env.config .Values.env.secrets}}  
 envFrom:  
 {{- if .Values.env.config}}  
 - configMapRef:  
 name: {{.Values.name}}  
 {{- end}}  
 {{- if .Values.env.secrets}}  
 - secretRef:  
 name: {{.Values.name}}  
 {{- end}}  
 {{- end}}
```

### Pull an Image from a Private Registry

Typically, if the Docker image you are deploying is in a private registry, Harness has access to that registry using the credentials set up in the Harness Connector.

If some cases, your Kubernetes cluster might not have the permissions needed to access a private Docker registry. For these cases, the Values YAML file in Service Definition **Manifests** section must use the `dockercfg` parameter.

Use dockercfg in Values YAMLIf the Docker image is added in the Service Definition Artifacts section, then you reference it like this: `dockercfg: <+artifact.imagePullSecret>`.

This key will import the credentials from the Docker credentials file in the artifact.

Open the values.yaml file you are using for deployment.

Verify that `dockercfg` key exists, and uses the `<+artifact.imagePullSecret>` expression to obtain the credentials:

```yaml
name: <+stage.variables.name>  
replicas: 2  
  
image: <+artifact.image>  
dockercfg: <+artifact.imagePullSecret>  
  
createNamespace: true  
namespace: <+infra.namespace>  
...
```

### Reference dockercfg in Kubernetes Objects

Next, verify that the Deployment and Secret objects reference `dockercfg: {{.Values.dockercfg}}`.


```yaml
...  
{{- if .Values.dockercfg}}  
apiVersion: v1  
kind: Secret  
metadata:  
  name: {{.Values.name}}-dockercfg  
  annotations:  
    harness.io/skip-versioning: true  
data:  
  .dockercfg: {{.Values.dockercfg}}  
type: kubernetes.io/dockercfg  
---  
{{- end}}  
  
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: {{.Values.name}}-deployment  
spec:  
  replicas: {{int .Values.replicas}}  
  selector:  
    matchLabels:  
      app: {{.Values.name}}  
  template:  
    metadata:  
      labels:  
        app: {{.Values.name}}  
    spec:  
      {{- if .Values.dockercfg}}  
      imagePullSecrets:  
      - name: {{.Values.name}}-dockercfg  
      {{- end}}  
      containers:  
      - name: {{.Values.name}}  
        image: {{.Values.image}}  
...
```
With these requirements met, the cluster imports the credentials from the Docker credentials file in the artifact.

### Option: Add Sidecars

You can use Harness to deploy both primary and sidecar Kubernetes workloads. Sidecar containers are common where you have multiple colocated containers that share resources.

## Variables

In the Variables section of the service you can add variables are use them in values YAML and params files, or in other settings in your stage that support expressions.

For more information on runtime inputs and expressions, go to [Fixed values runtime inputs and expressions](https://developer.harness.io/docs/platform/references/runtime-inputs/).

### Harness pipeline, stage, service, and built-in variables

You can use Pipeline, Stage, Service, and Built-in variables in your values YAML files and Service settings.

See [Built-in Harness Variables Reference](../../../platform/12_Variables-and-Expressions/harness-variables.md) or watch this [short video](https://youtu.be/lqbmO6EVGuU).

### Propagate and override artifacts, manifests, and service variables

You can propagate services between stages and override service settings by using multiple values YAML files and/or **Environment Overrides**. 

For more information, go to:

- [Propagating CD services](../cd-services-general/propagate-and-override-cd-services.md)
- [Add and override values YAML files](../cd-advanced/../../cd-advanced/cd-kubernetes-category/add-and-override-values-yaml-files.md)


## Additional Settings and Options

This topic has covered the Kubernetes Service basics to get your started, but we've only scratched the surface of what you have do in Harness.

Once you're comfortable with the basics, here's some more options for you to review.

### Ignore a Manifest File During Deployment

You might have manifest files for resources that you do not want to deploy as part of the main deployment.

Instead, you can tell Harness to ignore these files and then apply them separately using the Harness [Apply](../../cd-technical-reference/cd-k8s-ref/kubernetes-apply-step.md) step. Or you can simply ignore them and deploy them later.

See [Ignore a manifest file during deployment](../../cd-advanced/cd-kubernetes-category/ignore-a-manifest-file-during-deployment.md) and [Kubernetes Apply Step](../../cd-technical-reference/cd-k8s-ref/kubernetes-apply-step.md).


## Next Steps

Once you've configured your service, you can move onto the stage's **Environment** settings and define the target Kubernetes cluster and namespace for your deployment.

See [Define your Kubernetes target infrastructure](../../cd-infrastructure/kubernetes-infra/define-your-kubernetes-target-infrastructure.md).

## See Also

* [Create a Kubernetes Rolling Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-rolling-deployment.md)
* [Create a Kubernetes Canary Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-canary-deployment.md)
* [Create a Kubernetes Blue Green Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-blue-green-deployment.md)


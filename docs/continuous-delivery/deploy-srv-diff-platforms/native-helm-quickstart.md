---
title: Native Helm
description: Perform Native Helm deployments in Harness.
sidebar_position: 400
helpdocs_topic_id: lbhf2h71at
helpdocs_category_id: c9j6jejsws
helpdocs_is_private: false
helpdocs_is_published: true
---

# Native Helm deployments

This quickstart shows you how to perform Native Helm deployments using Harness.

Harness includes both Kubernetes and Native Helm deployments, and you can use Helm charts in both. Here's the difference:

* **Kubernetes with Helm:** Harness Kubernetes deployments allow you to use your own Helm values.yaml or Helm chart (remote or local), and Harness executes the Kubernetes kubectl calls to build everything without Helm and Tiller needing to be installed in the target cluster. You can perform all deployment strategies (Rolling, Canary, Blue Green).  
See [Kubernetes deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart), [Helm Chart deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart).
* **Native Helm:**
   * Helm 2 was deprecated by the Helm community in November 2020 and is no longer supported by Helm. If you continue to maintain the Helm 2 binary on your delegate, it might introduce high and critical vulnerabilities and put your infrastructure at risk.
  
     To safeguard your operations and protect against potential security vulnerabilities, Harness will launch an update to deprecate the Helm 2 binary from delegates with an immutable image type (image tag `yy.mm.xxxxx`) on **July 30, 2023**. For information on delegate types, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

     If your delegate is set to auto-upgrade, Harness will automatically remove the binary from your delegate. This will result in pipeline and workflow failures for services deployed via Helm 2. 

     :::info note
     If your development team still uses Helm 2, you can reintroduce the binary on the delegate. Harness is not responsible for any vulnerabilities or risks that might result from reintroducing the Helm 2 binary.
     :::

     For more information about updating your delegates to reintroduce Helm 2, go to:

     - [Delegate automatic upgrades and expiration policy](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/)

     - [Install a delegate with third-party tool custom binaries](/docs/platform/delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries/)

     Contact [Harness Support](mailto:support@harness.io) if you have any questions.

	* For Harness Native Helm v3 deployments, you no longer need Tiller, but you are still limited to the Rolling deployment strategy.
		- **Versioning:** Harness Kubernetes deployments version all objects, such as ConfigMaps and Secrets. Native Helm does not.
		- **Rollback:** Harness Kubernetes deployments will roll back to the last successful version. Native Helm will not. If you did 2 bad Native Helm deployments, the 2nd one will just rollback to the 1st. Harness will roll back to the last successful version.

## Objectives

You'll learn how to:

* Install and launch a Harness Kubernetes Delegate in your target cluster.
* Set up a Native Helm Pipeline.
* Run the new Native Helm Pipeline and deploy a Docker image to your target cluster.

## Before you begin

Review [Harness Key Concepts](/docs/getting-started/learn-harness-key-concepts) to establish a general understanding of Harness.

You will need a target Kubernetes cluster where you will deploy NGINX:

* Set up your Kubernetes cluster: You'll need a target Kubernetes cluster for Harness. Ensure your cluster meets the following requirements:
  * **Number of nodes:** 3.
  * **Machine type:** 4vCPU
  * **Memory:** 4vCPUs, 16GB memory, 100GB disk. In GKE, the **e2-standard-4** machine type is enough for this quickstart.
  * **Networking:** outbound HTTPS for the Harness connection to **app.harness.io**, **github.com**, and **hub.docker.com**. Allow TCP port 22 for SSH.
  * A **Kubernetes service account** with permission to create entities in the target namespace is required. The set of permissions should include `list`, `get`, `create`, and `delete` permissions. In general, the cluster-admin permission or namespace admin permission is enough.  
  For more information, see [User-Facing Roles](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) from Kubernetes.

## Create the Deploy stage

Pipelines are collections of stages. For this quickstart, we'll create a new Pipeline and add a single stage.

:::note

**Create a Project for your new CD Pipeline:** if you don't already have a Harness Project, create a Project for your new CD Pipeline. Ensure that you add the **Continuous Delivery** module to the Project. See [Create Organizations and Projects](/docs/platform/organizations-and-projects/create-an-organization).

:::

1. In your Harness Project, click **Deployments**, and then click **Create a** **Pipeline**.
   
   ![](./static/native-helm-quickstart-140.png)

2. Enter the name **Native Helm Example** and click **Start**.
3. Your Pipeline appears.
   
   ![](./static/native-helm-quickstart-142.png)

4. Click **Add Stage** and select **Deploy**.
5. Enter the name **quickstart**, make sure **Service** is selected, and then click **Set Up Stage**.
6. The new stage settings appear.
7. In **About the** **Service**, click **New Service**.
   :::note

   Let's take a moment and review Harness Services and Service Definitions (which are explained below). Harness Services represent your microservices/apps logically. You can add the same Service to as many stages are you need. Service Definitions represent your artifacts, manifests, and variables physically. They are the actual files and variable values.

   By separating Services and Service Definitions, you can propagate the same Service across stages while changing the artifacts, manifests, and variables with each stage.

   :::
1. Give the Service the name **quickstart** and click **Save**.
2. Once you have created a Service, it is persistent and can be used throughout the stages of this or any other Pipeline in the Project.
3. In **Deployment Type**, click **Native Helm**. Now your Service looks like this:

![](./static/native-helm-quickstart-144.png)

Next, we'll add the NGINX Helm chart for the deployment.

## Add the Helm chart and delegate

You can add a Harness Delegate inline when you configure the first setting that needs it. For example, when we add a Helm chart, we will add a Harness Connector to the HTTP server hosting the chart. This Connector uses a Delegate to verify credentials and pull charts, so we'll install the Delegate, too.

1. In **Manifests**, click **Add Manifest**. The manifest types appear.
   
   ![](./static/native-helm-quickstart-145.png)

   You can select a Helm Values YAML file or a Helm chart. For this quickstart, we'll use a publicly available Helm chart.
   The process isn't very different between these options. For Values YAML, you simply provide the Git branch and path to the Values YAML file.
   Click **Helm Chart** and then click **Continue**.
2. In **Specify Helm Chart Store**, click **HTTP Helm**.
   We're going to be pulling a Helm chart for NGINX from the Bitnami repo at `https://charts.bitnami.com/bitnami`. You don't need any credentials for pulling the public chart.
3. Click **New HTTP Helm Repo Connector**.
4. In the **HTTP Helm Repo Connector**, in **Name**, enter **helm-chart-repo**, and click **Continue**.
5. In **Helm Repository URL**, enter `https://charts.bitnami.com/bitnami`.
6. In **Authentication**, select **Anonymous**.
7. Click **Continue**.
9. In **Connect to the provider**, select **Connect through a Harness Delegate**, and then select **Continue**.
   We don't recommend using the **Connect through Harness Platform** option here because you'll need a delegate later for connecting to your target cluster. Typically, the **Connect through Harness Platform** option is a quick way to make connections without having to use delegates.

    1. In **Delegates Setup**, select **Install new Delegate**. The delegate wizard appears.
    2. In the **New Delegate** dialog, in **Select where you want to install your Delegate**, select **Kubernetes**.
    3. In **Install your Delegate**, select **Kubernetes Manifest**.
    4. Enter a delegate name.
        - Delegate names must be unique within a namespace and should be unique in your cluster. 
        - A valid name includes only lowercase letters and does not start or end with a number. 
        - The dash character (“-”) can be used as a separator between letters.
    5. At a terminal, run the following cURL command to copy the Kuberntes YAML file to the target location for installation.

    `curl -LO https://raw.githubusercontent.com/harness/delegate-kubernetes-manifest/main/harness-delegate.yaml`

    6. Open the `harness-delegate.yaml` file. Find and specify the following placeholder values as described.

    | **Value** | **Description** |
    | :-- | :-- |
    | `PUT_YOUR_DELEGATE_NAME` | Name of the delegate. |
    | `PUT_YOUR_ACCOUNT_ID` | Harness account ID. |
    | `PUT_YOUR_MANAGER_ENDPOINT` | URL of your cluster. See the following table of Harness clusters and endpoints. |
    | `PUT_YOUR_DELEGATE_TOKEN` | Delegate token. To find it, go to **Account Settings** > **Account Resources**, select **Delegate**, and select **Tokens**. For more information on how to add your delegate token to the harness-delegate.yaml file, go to [Secure delegates with tokens](/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/). |

    Your Harness manager endpoint depends on your Harness SaaS cluster location. Use the following table to find the Harness manager endpoint in your Harness SaaS cluster.

    | **Harness cluster location** | **Harness Manager endpoint** |
    | :-- | :-- |
    | SaaS prod-1 | https://app.harness.io |
    | SaaS prod-2 | https://app.harness.io/gratis |
    | SaaS prod-3 | https://app3.harness.io |

    7. Install the delegate by running the following command:

    `kubectl apply -f harness-delegate.yaml`

    The successful output looks like this.
    
    ```
    namespace/harness-delegate-ng unchanged
    clusterrolebinding.rbac.authorization.k8s.io/harness-delegate-cluster-admin unchanged
    secret/cd-doc-delegate-account-token created
    deployment.apps/cd-doc-delegate created
    service/delegate-service configured
    role.rbac.authorization.k8s.io/upgrader-cronjob unchanged
    rolebinding.rbac.authorization.k8s.io/upgrader-cronjob configured
    serviceaccount/upgrader-cronjob-sa unchanged
    secret/cd-doc-delegate-upgrader-token created
    configmap/cd-doc-delegate-upgrader-config created
    cronjob.batch/cd-doc-delegate-upgrader-job created
    ```

   1. Select **Verify** to make sure that the delegate is installed properly.

10. Back in **Set Up Delegates**, you can select the new Delegate.
    In the list of Delegates, you can see your new Delegate and its tags.
11. Select the **Connect using Delegates with the following Tags** option.
12. Enter the tag of the new Delegate and click **Save and Continue**.
    When you are done, the Connector is tested. If it fails, your Delegate might not be able to connect to `https://charts.bitnami.com/bitnami`. Review its network connectivity and ensure it can connect.  
    If you are using Helm V2, you will need to install Helm v2 and Tiller on the Delegate pod. For steps on installing software on the Delegate, see [Build custom delegate images with third-party tools](/docs/platform/2_Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools/).
13. Click **Continue**.
14. In **Manifest Details**, enter the following settings can click **Submit**.
15. In Harness, click **Verify**. It will take a few minutes to verify the Delegate. Once it is verified, close the wizard.
16. Back in **Set Up Delegates**, you can select the new Delegate.
   In the list of Delegates, you can see your new Delegate and its tags.
17. Select the **Connect using Delegates with the following Tags** option.
18. Enter the tag of the new Delegate and click **Save and Continue**.
   When you are done, the Connector is tested. If it fails, your Delegate might not be able to connect to `https://charts.bitnami.com/bitnami`. Review its network connectivity and ensure it can connect.
   If you are using Helm V2, you will need to install Helm v2 and Tiller on the Delegate pod. For steps on installing software on the Delegate, see [Build custom delegate images with third-party tools](/docs/platform/2_Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools/).
19. Click **Continue**.
20. In **Manifest Details**, enter the following settings can click **Submit**.
   * **Manifest Identifier**: enter **nginx**.
   * **Helm Chart Name**: enter **nginx**.
   * **Helm Chart Version**: enter **8.8.1**.
   * **Helm Version**: select **Version 3**.

The Helm chart is added to the Service Definition.

![](./static/native-helm-quickstart-151.png)

Next, we can target your Kubernetes cluster for deployment.

## Define your target cluster

1. In **Infrastructure**, in **Environment**, click **New Environment**.
2. In **Name**, enter **quickstart**, select **Non-Production**, and click **Save**.
3. In **Infrastructure Definition**, select the **Kubernetes**.
4. In **Cluster Details**, click **Select Connector**. We'll create a new Kubernetes Connector to your target platform. We'll use the same Delegate you installed earlier.
5. Click **New Connector**.
6. Enter a name for the Connector and click **Continue**.
7. In **Details**, select **Use the credentials of a specific Harness Delegate**, and then click **Continue**.
   ![](./static/native-helm-quickstart-152.png)
8. In **Set Up Delegates**, select the Delegate you added earlier by entering one of its Tags.
9.  Click **Save and Continue**. The Connector is tested. Click **Finish**.
10. Select the new Connector and click **Apply Selector**.
11. In **Namespace**, enter **default** or the namespace you want to use in the target cluster.
12. In **Release Name**, enter **quickstart**.
13. Click **Next**. The deployment strategy options appear.

## Add a Helm Deployment step

1. We're going to use a Rolling [deployment strategy](/docs/continuous-delivery/manage-deployments/deployment-concepts), so click **Rolling**, and click **Apply**.
2. The **Helm Deployment** step is added to **Execution**.

That's it. Now you're ready to deploy.

## Deploy and review

1. Click **Save** to save your Pipeline.
2. Click **Run**.
3. Click **Run Pipeline**.
   Harness verifies the connections and then runs the Pipeline.
4. Toggle **Console View** to watch the deployment with more detailed logging.

   ![](./static/native-helm-quickstart-153.png)

5. Click the **Helm Deployment** step and expand **Wait for Steady State**.

You can see `Status : quickstart-quickstart deployment "quickstart-quickstart" successfully rolled out.`

Congratulations! The deployment was successful.

In your Project's Deployments, you can see the deployment listed.

## Spec requirements for steady state check and versioning

Harness requires that the `release` label be used in **every** Kubernetes spec to ensure that Harness can identify a release, check its steady state, and perform verification and rollback on it.

Ensure that the `release` label is in every Kubernetes object's manifest. If you omit the `release` label from a manifest, Harness cannot track it.

The [Helm built-in Release object](https://helm.sh/docs/chart_template_guide/builtin_objects/) describes the release and allows Harness to identify each release. For this reason, the `release: {{ .Release.Name }}` label must be used in your Kubernetes spec.

See these Service and Deployment object examples:

```go
{{- if .Values.env.config}}  
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: {{ template "todolist.fullname" . }}  
  labels:  
    app: {{ template "todolist.name" . }}  
    chart: {{ template "todolist.chart" . }}  
    release: "{{ .Release.Name }}"  
    harness.io/release: {{ .Release.Name }}  
    heritage: {{ .Release.Service }}  
spec:  
  replicas: {{ .Values.replicaCount }}  
  selector:  
    matchLabels:  
      app: {{ template "todolist.name" . }}  
      release: {{ .Release.Name }}  
  template:  
    metadata:  
      labels:  
        app: {{ template "todolist.name" . }}  
        release: {{ .Release.Name }}  
        harness.io/release: {{ .Release.Name }}  
    spec:  
      {{- if .Values.dockercfg}}  
      imagePullSecrets:  
      - name: {{.Values.name}}-dockercfg  
      {{- end}}  
      containers:  
        - name: {{ .Chart.Name }}  
          image: {{.Values.image}}  
          imagePullPolicy: {{ .Values.pullPolicy }}  
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
...  
apiVersion: v1  
kind: Service  
metadata:  
  name: {{ template "todolist.fullname" . }}  
  labels:  
    app: {{ template "todolist.name" . }}  
    chart: {{ template "todolist.chart" . }}  
    release: {{ .Release.Name }}  
    heritage: {{ .Release.Service }}  
spec:  
  type: {{ .Values.service.type }}  
  ports:  
    - port: {{ .Values.service.port }}  
      targetPort: http  
      protocol: TCP  
      name: http  
  selector:  
    app: {{ template "todolist.name" . }}  
    release: {{ .Release.Name }}
```
The **Release name** setting in the stage **Infrastructure** is used as the Helm Release Name to identify and track the deployment per namespace:

![](./static/native-helm-quickstart-154.png)

## Notes

Please review the following notes.

### Ignore release history failed status

By default, if the latest Helm release failed, Harness does not proceed with the install/upgrade and throws an error.

For example, let's say you have a Pipeline that performs a Native Helm deployment and it fails during execution while running `helm upgrade` because of a timeout error from an etcd server.

You might have several retries configured in the Pipeline, but all of them will fail when Harness runs a `helm history` in the prepare stage with the message: `there is an issue with latest release <latest release failure reason>`.

Enable the **Ignore Release History Failed Status** option to have Harness ignore these errors and proceed with install/upgrade.

## Next Steps

See [Kubernetes How-tos](/docs/category/kubernetes) for other deployment features.


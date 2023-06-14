---
title: Install a legacy Kubernetes delegate
description: Install a legacy Kubernetes delegate.
sidebar_position: 7
helpdocs_topic_id: f9bd10b3nj
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to install the legacy Kubernetes delegate, which always auto upgrades to the default delegate version associated with a Harness Manager version.

:::info note
If you are migrating from Harness FirstGen to Harness NextGen, you must install new delegates in Harness NextGen. Harness FirstGen Delegates won't work with Harness NextGen.
:::

### Limitations

Currently, Harness Kubernetes Delegates don't install with the default settings in GKE Auto Pilot Mode. Use the Manual mode when creating the cluster to make sure it meets the delegate requirements.

The delegate requires access to all the connectors and Harness Secrets needed to run a pipeline. This means that the delegate requires permissions to do the following:

* Access all the secrets used by all the connectors used in a pipeline.
* Create and update secrets in Kubernetes. This is necessary to pull the images needed to run individual Steps.


### Inline or standalone installation

You can install a delegate whenever you are adding a connector to a pipeline, or you can install one outside a pipeline in **Resources**.

The steps involved are the same.

### Installation location

You can install the Kubernetes delegate inside or outside your deployment target cluster (CD) or build farm cluster (CIE).

* **Inside the cluster:** you can install the Kubernetes delegate inside the target or build farm cluster. Later, when you add a Kubernetes Cluster Connector, the connector can inherit its credentials from the Kubernetes delegate.
* **Outside the cluster:** you can install the Kubernetes delegate outside the target or build farm cluster. Later, when you add a Kubernetes Cluster Connector, the connector cannot inherit its credentials from the Kubernetes delegate. In this case, the Kubernetes Cluster Connector must use an alternate method for credentials. For example, the master URL of the target cluster and a Service Account with the required credentials.

### Step 1: Ensure Kubernetes prerequisites

To install a Kubernetes delegate, you must have access to a Kubernetes cluster. You'll install the Harness Delegate as YAML or Helm Chart.

For connectivity, go to [Delegate Requirements](/docs/platform/2_Delegates/delegate-concepts/delegate-requirements.md).

You'll need the following Kubernetes permissions to install the delegate:

* Permission to create a namespace (for the Harness Delegate namespace).
* Permission to create statefulSets (to create the Harness Delegate pod).

### Step 2: Select the Kubernetes delegate type

Inline or standalone, select **New Delegate**. Delegate selection options appear.

Select **Kubernetes**, and then select **Continue**.

Enter a name and description for the delegate that informs others of its use or installation location.

### Step 3: Add delegate name


:::info note
**Do not run delegates with the same name in different clusters.** Go to [Troubleshooting](/docs/troubleshooting/troubleshooting-nextgen.md).
:::


Add a name for the delegate. The name will be added to the delegate YAML as the `name` metadata of the StatefulSet.

:::info note
**Legacy Delegates are deployed as StatefulSet objects. By default, the StatefulSet.serviceName field is empty (“”) and does not need to be specified. Delegates do not require service names.**
:::

:::info note
**The combined length of the Delegate name and the service name must not exceed 255 bytes. If the maximum length is exceeded, the Delegate might not appear in the Harness Manager UI. For more information on StatefulSet.serviceName, go to** [**StatefulSetSpec**](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/stateful-set-v1/#StatefulSetSpec) **in** [**Kubernetes API**](https://kubernetes.io/docs/reference/kubernetes-api/)**.
:::

Add tags to the delegate. By default, Harness adds a tag using the name you enter, but you can more. Simply type them in, and press Enter.

These tags are useful for selecting the delegate when creating a connector.

### Step 4: Select delegate size

In **Delegate Size**, select the size of delegate you want to install.

Your Kubernetes cluster must have the unallocated resources required to run the Harness Delegate workload:

* Laptop - 1.6GB memory, 0.5CPU
* Small - 3.3GB memory, 1CPU
* Medium - 6.6GB memory, 2CPU
* Large - 13.2GB memory, 4CPU

**Important:** These sizing requirements are for the delegate only. Your cluster will require more memory for Kubernetes, the operating system, and other services.

#### Important resource considerations

These requirements are for the delegate only. Your cluster will have system, Kubernetes, and other resources consumers. Make sure that the cluster has enough memory, storage, and CPU for all of its resource consumers.

Most importantly, when the delegate is installed inside the target deployment or build farm cluster, the cluster must also support the resources needed by the services you are deploying or building.

For example, if you use the Small option that requires 3.3GB of memory, don't use a cluster with only 4GB or memory. It won't be enough to run the delegate and other resources.

### Step 5: Download and install the script

Click **Download Script**. The YAML file for the Kubernetes delegate, and its README, downloads to your computer as an archive.

Open a terminal and change your directory to the delegate file's location.

Extract the YAML file from the download, and then navigate to the extracted file:

```
tar -zxvf harness-delegate-kubernetes.tar.gz  
  
cd harness-delegate-kubernetes
```
You'll connect to your cluster using the terminal, so you can simply copy the YAML file over.

In the same terminal, log into your Kubernetes cluster. In most platforms, you select the cluster, select **Connect**, and copy the access command.

To confirm that the cluster you created can connect to the Harness platform, enter the following command:
```
wget -p https://app.harness.io/ -O /dev/null
```

A successful connection displays the following:
```
HTTP request sent, awaiting response... 200 OK
```

Next, install the Harness Delegate using the **harness-delegate.yaml** file you just downloaded. In the terminal connected to your cluster, run this command:

```
kubectl apply -f harness-delegate.yaml
```
The successful output is something like this:

```
% kubectl apply -f harness-delegate.yaml  
namespace/harness-delegate unchanged  
clusterrolebinding.rbac.authorization.k8s.io/harness-delegate-cluster-admin unchanged  
secret/k8s-quickstart-proxy unchanged  
statefulset.apps/k8s-quickstart-sngxpn created  
service/delegate-service unchanged
```
Run this command to verify that the delegate pod was created:

```
kubectl get pods -n harness-delegate-ng
```
It'll take a moment for the delegate to appear in Harness' **Delegates** list.

You're ready to connect Harness to your artifact server and cluster. After those steps, you'll begin creating your deployment.

### Review: Delegate role requirements

The YAML provided for the Harness Delegate defaults to the `cluster-admin` role to ensure you can apply updates. If you can't use `cluster-admin` because you are using a cluster in your company, you'll need to edit the delegate YAML.

The set of permissions should include `list`, `get`, `create`, `watch` (to fetch the pod events), and `delete` permissions for each entity type Harness uses.

If you don’t want to use `resources: [“*”]` for the role, you can list out the resources you want to grant. Harness requires `configMap`, `secret`, `event`, `deployment`, and `pod` at a minimum for deployments, as stated above.

In the delegate installation settings, you also have the option to select cluster read-only access and namespace-specific access. When you select these options, the YAML generated by Harness is changed to reflect the limited access.

### Step 6: Verify

For an overview of verification, go to [Delegate Registration and Verification](/docs/platform/2_Delegates/delegate-concepts/delegate-registration.md).

In the delegate wizard, select **Verify**. Harness verifies that it is receiving heartbeats from the delegate.

Your delegate is installed.

### Option: Troubleshooting

If Harness does not receive heartbeats from the delegate, here are a few troubleshooting steps:

Check the status of the delegate on your cluster:

```
kubectl describe pod <your-delegate-pod> -n harness-delegate-ng
```
Check the delegate logs:

```
kubectl logs -f <harness-delegate> -n harness-delegate-ng
```
If the pod isn't up, you might see the following error in your cluster:

```
CrashLoopBackOff: Kubernetes Cluster Resources are not available.
```
Make sure the Kubernetes Cluster Resources (CPU, Memory) are enough.

If the delegate didn’t reach a healthy state, run the following:

```
kubectl describe pod <your-delegate-pod> -n harness-delegate-ng
```
### Environment variables

The following environment variables are available in the legacy Kubernetes delegate YAML.

#### JAVA_OPTS 

JVM options for the delegate. Use this variable to override or add JVM parameters.  

  ```
  - name: JAVA_OPTS  value: "-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=2 -Xms64M"
  ``` 

#### ACCOUNT_ID

The Harness account Id for the account where this delegate will attempt to register. This value is added automatically to the delegate config file (YAML, etc) when you add the delegate. 

  ```
  - name: ACCOUNT_ID  value: H5W8iol5TNWc4G9h5A2MXg
  ```
 
#### DELEGATE_TOKEN 

The Harness account token used to register the delegate. 

  ```
  - name: DELEGATE_TOKEN  value: d239xx88bf7xxxxxxx836ea
  ```
 
#### MANAGER_HOST_AND_PORT

The Harness SaaS manager URL. `https` indicates port 443.  

  ```
  - name: MANAGER_HOST_AND_PORT  value: https://app.harness.io
  ```
 
#### WATCHER_STORAGE_URL 

The URL for the Watcher versions. 

  ```
  - name: WATCHER_STORAGE_URL  value: https://app.harness.io/public/prod/premium/watchers
  ```
 
#### WATCHER_CHECK_LOCATION

The delegate version location for the Watcher to check for. 

  ```
  - name: WATCHER_CHECK_LOCATION  value: current.version
  ```

#### REMOTE_WATCHER_URL_CDN 

The CDN URL for Watcher builds. 

  ```
  - name: REMOTE_WATCHER_URL_CDN  value: https://app.harness.io/public/shared/watchers/builds
  ```
 
#### DELEGATE_STORAGE_URL 

The URL where published delegate jars are stored. 

  ```
  - name: DELEGATE_STORAGE_URL  value: https://app.harness.io
  ```
 
#### DELEGATE_CHECK_LOCATION

The storage location hosting the published delegate versions. 

  ```
  - name: DELEGATE_CHECK_LOCATION  value: delegateprod.txt
  ```
 
#### DEPLOY_MODE 

Deployment mode: Kubernetes, Docker, etc. 

  ```
  - name: DEPLOY_MODE  value: KUBERNETES
  ```
 
#### DELEGATE_NAME 

The name of the delegate. This is the name that displays in Harness when the delegate is registered. You can automate delegate creation by omitting the name, and use a script to copy the delegate YAML file and add a unique name to `value` for each new delegate you want to register. For more information, go to [Automate Delegate Installation](/docs/platform/2_Delegates/install-delegates/automate-delegate-installation.md). 

  ```
  - name: DELEGATE_NAME  value: qa
  ```
 
#### NEXT_GEN

Indicates that this delegate will register in Harness NextGen(`true`) or FirstGen(`false`). 

  ```
  - name: NEXT_GEN  value: "true"
  ```
 
#### DELEGATE_DESCRIPTION 

The description added to the delegate in the Harness Manager or YAML before registering. It appears on the **Delegate details** page in the Harness Manager. 

  ```
  - name: DELEGATE_DESCRIPTION  value: ""
  ```
 
#### DELEGATE_TYPE

The type of delegate. 

  ```
  - name: DELEGATE_TYPE  value: "KUBERNETES"
  ```
 
#### DELEGATE_TAGS 

The tags added to the delegate in the Harness Manager or YAML before registering. Tags are generated by Harness using the delegate name, but you can also add your own tags. Tags appear on the **Delegate details** page in the Harness Manager. For more information, go to [Tags Reference](/docs/platform/20_References/tags-reference.md) and [Select Delegates with Tags](/docs/platform/2_Delegates/manage-delegates/select-delegates-with-selectors.md). 

  ```
  - name: DELEGATE_TAGS  value: ""
  ```
 
#### DELEGATE_TASK_LIMIT

The maximum number of tasks the delegate can perform at once. All of the operations performed by the delegate are categorized as different types of tasks. 

  ```
  - name: DELEGATE_TASK_LIMIT  value: "50"
  ```
 
#### DELEGATE_ORG_IDENTIFIER 

The Harness Organization [Identifier](/docs/platform/20_References/entity-identifier-reference.md) where the delegate will register. Delegates at the account-level do not have a value for this variable. 

  ```
  - name: DELEGATE_ORG_IDENTIFIER  value: "engg"
  ```
 
#### DELEGATE_PROJECT_IDENTIFIER 

The Harness Project [Identifier](/docs/platform/20_References/entity-identifier-reference.md) where the delegate will register. Delegates at the account or org-level do not have a value for this variable. 

  ```
  - name: DELEGATE_PROJECT_IDENTIFIER  value: "myproject"
  ```
 
#### PROXY_*

All delegates include proxy settings you can use to change how the delegate connects to the Harness Manager. The `secretKeyRef` are named using the delegate name. 

  ```
  - name: PROXY_HOST  value: ""- name: PROXY_PORT  value: ""- name: PROXY_SCHEME  value: ""- name: NO_PROXY  value: ""- name: PROXY_MANAGER  value: "true"- name: PROXY_USER  valueFrom:    secretKeyRef:      name: mydel-proxy      key: PROXY_USER- name: PROXY_PASSWORD  valueFrom:    secretKeyRef:      name: mydel-proxy      key: PROXY_PASSWORD
  ```
 
#### INIT_SCRIPT 

You can run scripts on delegate using `INIT_SCRIPT`. For example, if you wanted to install software on the delegate pod, you can enter the script in `INIT_SCRIPT` and then apply the delegate YAML. A multiline script must follow the YAML spec for [literal scalar style](https://yaml.org/spec/1.2-old/spec.html#id2795688). For more information, go to [Build custom delegate images with third-party tools](/docs/platform/2_Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools.md). 

  ```
  - name: INIT_SCRIPT  value: |-    echo install wget    apt-get install wget    echo wget installed
  ```
 
#### POLL_FOR_TASKS 

Enables or disables polling for delegate tasks. By default, the delegate uses Secure WebSocket (WSS) for tasks. If the `PROXY_*` settings are used and the proxy or some intermediary does not allow WSS, then set `POLL_FOR_TASKS` to `true` to enable polling. 

  ```
  - name: POLL_FOR_TASKS  value: "false"
  ```
 
#### HELM_DESIRED_VERSION 

By default, Harness Delegates are installed with and use Helm 3. You can set the Helm version in the Harness Delegate YAML file using the `HELM_DESIRED_VERSION` environment property. Include the `v` with the version. For example, `HELM_DESIRED_VERSION: v2.13.0`. 

  ```
  - name: HELM_DESIRED_VERSION  value: ""
  ```
 
#### USE_CDN 

Makes the delegate use a CDN for new versions. 

  ```
  - name: USE_CDN  value: "true"
  ```
 
#### CDN_URL

The CDN URL for delegate versions. 

  ```
  - name: CDN_URL  value: https://app.harness.io
  ```
 
#### JRE_VERSION 

The Java Runtime Environment version used by the delegate. 

  ```
  - name: JRE_VERSION  value: 1.8.0_242
  ```
 
#### HELM3_PATH, HELM_PATH 

When you Install and run a new Harness Delegate, Harness includes Helm 3 support automatically. In some cases, you may want to use one of the custom Helm binaries available from [Helm release](https://github.com/helm/helm/releases). For a Helm 3 binary, enter the local path to the binary in `HELM3_PATH`.

  ```
  - name: HELM3_PATH  value: ""- name: HELM_PATH  value: ""
  ```
 
#### KUSTOMIZE_PATH

The Harness Delegate ships with the 3.5.4 release of Kustomize. If you want to use a different release of Kustomize, add it to a location on the delegate, update `KUSTOMIZE_PATH`, and (re)start the delegate. 

  ```
  - name: KUSTOMIZE_PATH  value: ""
  ```
 
#### KUBECTL_PATH

You can use `KUBECTL_PATH` to change the kubectl config path. The default is `~/. kube/config`. 

  ```
  - name: KUBECTL_PATH  value: ""
  ```
 
#### GRPC_SERVICE_ENABLED, GRPC_SERVICE_CONNECTOR_PORT

By default, the delegate requires HTTP/2 for gRPC (gRPC Remote Procedure Calls) to be enabled for connectivity between the delegate and Harness Manager. 

  ```
  - name: GRPC_SERVICE_ENABLED  value: "true"- name: GRPC_SERVICE_CONNECTOR_PORT  value: "8080"
  ```
 
#### VERSION_CHECK_DISABLED

By default, the delegate always checks for new versions (via the Watcher). 

  ```
  - name: VERSION_CHECK_DISABLED  value: "false"
  ```
 
#### DELEGATE_NAMESPACE 

The namespace for the delegate is taken from the `StatefulSet` namespace. 

  ```
  - name: DELEGATE_NAMESPACE  valueFrom:    fieldRef:      fieldPath: metadata.namespace
  ```

### Notes

#### Empty serviceName

By default, Harness does not include a value for `serviceName` in the `StatefulSet` in the delegate YAML:

```
...  
apiVersion: apps/v1  
kind: StatefulSet  
metadata:  
  labels:  
    harness.io/name: myDelegate  
  name: remove  
  namespace: harness-delegate-ng  
spec:  
  replicas: 2  
  podManagementPolicy: Parallel  
  selector:  
    matchLabels:  
      harness.io/name: myDelegate  
  serviceName: ""  
  template:  
    metadata:  
      labels:  
        harness.io/name: myDelegate  
...
```
You do not need to change `serviceName`, but you can if you have a static code analysis tool that flags it or some other use case.

Add the delegate name as the value using the syntax `harness.io/name: [Delegate name]`.

For example, if your delegate name is `myDelegate`, add `harness.io/name: myDelegate`:

```
...  
  serviceName:  
      harness.io/name: myDelegate  
...
```

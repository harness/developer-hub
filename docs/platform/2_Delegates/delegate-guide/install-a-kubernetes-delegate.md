---
title: Install a legacy Kubernetes delegate
description: Install a harness Kubernetes Delegate.
# sidebar_position: 2
helpdocs_topic_id: f9bd10b3nj
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness Delegate is a service you run in your own environment, such as your local network, VPC, or cluster.

For example, you can run the Delegate in the deployment target cluster for a CD Pipeline or the build farm cluster for a CI Pipeline.

The Delegate connects all of your artifact, infrastructure, collaboration, verification, and other providers with the Harness Manager.

Most importantly, the Delegate performs all Harness operations.

There are several types of Delegates. This topic describes how to install the Kubernetes Delegate.


:::note
If you are migrating from Harness FirstGen to Harness NextGen, you must install new Delegates in Harness NextGen. Harness FirstGen Delegates won't work with Harness NextGen.
:::


### Limitations

Currently, Harness Kubernetes Delegates don't install with the default settings in GKE Auto Pilot Mode. Please use the Manual mode when creating the cluster to make sure it meets the Delegate requirements.

The Delegate requires access to all the Connectors and Harness Secrets needed to run a Pipeline. This means that the Delegate requires permissions to do the following:

* Access all the secrets used by all the Connectors used in a Pipeline.
* Create and update secrets in Kubernetes. This is necessary to pull the images needed to run individual Steps.

### Visual summary

The following diagram shows how the Delegate enables Harness to integrate with all of your deployment resources:

![](./static/install-a-kubernetes-delegate-12.png)
Here's a 10min video that walks you through adding a Harness Kubernetes Cluster Connector and Harness Kubernetes Delegate. The Delegate is added to the target cluster and then the Kubernetes Cluster Connector uses the Delegate to connect to the cluster:

### Inline or standalone installation

You can install a Delegate whenever you are adding a Connector to a Pipeline or you can install one outside a Pipeline in **Resources**.

The steps involved are the same.

### Installation location

You can install the Kubernetes Delegate inside or outside your deployment target cluster (CD) or build farm cluster (CIE).

* **Inside the cluster:** you can install the Kubernetes Delegate inside the target or build farm cluster. Later, when you add a Kubernetes Cluster Connector, the Connector can inherit its credentials from the Kubernetes Delegate.
* **Outside the cluster:** you can install the Kubernetes Delegate outside the target or build farm cluster. Later, when you add a Kubernetes Cluster Connector, the Connector cannot inherit its credentials from the Kubernetes Delegate. In this case, the Kubernetes Cluster Connector must use an alternate method for credentials. For example, the master URL of the target cluster and a Service Account with the required credentials.

### Step 1: Ensure Kubernetes prerequisites

To install a Kubernetes Delegate, you must have access to a Kubernetes cluster. You'll install the Harness Delegate as YAML or Helm Chart.

For connectivity, see [Delegate Requirements and Limitations](../delegate-reference/delegate-requirements-and-limitations.md).

You'll need the following Kubernetes permissions to install the delegate:

* Permission to create a namespace (for the Harness Delegate namespace).
* Permission to create statefulSets (to create the Harness Delegate pod).

### Step 2: Select the Kubernetes delegate type

Inline or standalone, click **New Delegate**.

 Delegate selection options appear.

![](./static/install-a-kubernetes-delegate-13.png)
Click **Kubernetes**, and then click **Continue**.

Enter a name and description for the Delegate that will let others know what it is used for, or where it's installed.

### Step 3: Add delegate name


:::note
**Do not run Delegates with the same name in different clusters.** See [Troubleshooting](https://docs.harness.io/article/jzklic4y2j-troubleshooting).
:::


Add a name for the Delegate. The name will be added to the Delegate YAML as the `name` metadata of the StatefulSet.


:::note
**Legacy Delegates are deployed as StatefulSet objects. By default, the StatefulSet.serviceName field is empty (“”) and does not need to be specified. Delegates do not require service names.**
:::



:::note
**The combined length of the Delegate name and the service name must not exceed 255 bytes. If the maximum length is exceeded, the Delegate might not appear in the Harness Manager UI. For more information on StatefulSet.serviceName, see** [**StatefulSetSpec**](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/stateful-set-v1/#StatefulSetSpec) **in** [**Kubernetes API**](https://kubernetes.io/docs/reference/kubernetes-api/)**.
:::


Add Tags to the Delegate. By default, Harness adds a Tag using the name you enter, but you can more. Simply type them in and press Enter.

These Tags are useful for selecting the Delegate when creating a Connector.

### Step 4: Select delegate size

In **Delegate Size**, select the size of Delegate you want to install.

Your Kubernetes cluster must have the unallocated resources required to run the Harness Delegate workload:

* Laptop - 1.6GB memory, 0.5CPU
* Small - 3.3GB memory, 1CPU
* Medium - 6.6GB memory, 2CPU
* Large - 13.2GB memory, 4CPU

**Important:** these sizing requirements are for the Delegate only. Your cluster will require more memory for Kubernetes, the operating system, and other services.

#### Important resource considerations

These requirements are for the Delegate only. Your cluster will have system, Kubernetes, and other resources consumers. Make sure that the cluster has enough memory, storage, and CPU for all of its resource consumers.

Most importantly, when the Delegate is installed inside the target deployment or build farm cluster, the cluster must also support the resources needed by the services you are deploying or building.

For example, if you use the Small option that requires 3.3GB of memory, don't use a cluster with only 4GB or memory. It won't be enough to run the Delegate and other resources.

### Step 5: Download and install the script

Click **Download Script**. The YAML file for the Kubernetes Delegate, and its README, will download to your computer as an archive.

Open a terminal and navigate to where the Delegate file is located.

Extract the YAML file's folder from the download and then navigate to the folder that you extracted:


```
tar -zxvf harness-delegate-kubernetes.tar.gz  
  
cd harness-delegate-kubernetes
```
You'll connect to your cluster using the terminal so you can simply copy the YAML file over.

In the same terminal, log into your Kubernetes cluster. In most platforms, you select the cluster, click **Connect**, and copy the access command.

Let's quickly confirm that the cluster you created can connect to the Harness platform. Enter the following command:

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
Run this command to verify that the Delegate pod was created:


```
kubectl get pods -n harness-delegate-ng
```
It'll take a moment for the Delegate to appear in Harness' **Delegates** list.

You're ready to connect Harness to your artifact server and cluster. After those quick steps, you'll begin creating your deployment.

### Review: Delegate role requirements

The YAML provided for the Harness Delegate defaults to the `cluster-admin` role because that ensures anything could be applied. If you can't use `cluster-admin` because you are using a cluster in your company, you'll need to edit the Delegate YAML.

The set of permissions should include `list`, `get`, `create`, `watch` (to fetch the pod events), and `delete` permissions for each of the entity types Harness uses.

If you don’t want to use `resources: [“*”]` for the Role, you can list out the resources you want to grant. Harness needs `configMap`, `secret`, `event`, `deployment`, and `pod` at a minimum for deployments, as stated above.

In the Delegate installation settings, you also have the option to select cluster read-only access and namespace-specific access. When you select these options, the YAML generated by Harness is changed to reflect the limited access:

![](./static/install-a-kubernetes-delegate-14.png)
### Step 6: Verify

For an overview of verification, see [Delegate Registration and Verification](delegate-registration.md).

In the Delegate wizard, click **Verify** and Harness will verify that it is receiving heartbeats from the Delegate.

Your Delegate is installed.

### Option: Troubleshooting

Harness will provide a lot of troubleshooting steps. Here are a few:

Check the status of the Delegate on your cluster:


```
kubectl describe pod <your-delegate-pod> -n harness-delegate-ng
```
Check the Delegate logs:


```
kubectl logs -f <harness-delegate> -n harness-delegate-ng
```
If the pod isn't up, you might see the following error in your cluster:


```
CrashLoopBackOff: Kubernetes Cluster Resources are not available.
```
Make sure the Kubernetes Cluster Resources (CPU, Memory) are enough.

If the Delegate didn’t reach a healthy state, try this:


```
kubectl describe pod <your-delegate-pod> -n harness-delegate-ng
```
### Kubernetes delegate environment variables

The following table lists each of the environment variables in the Harness Kubernetes Delegate YAML.



|  |  |  |
| --- | --- | --- |
| **Environment variable** | **Description** | **Example** |
| `JAVA_OPTS` | JVM options for the Delegate. Use this variable to override or add JVM parameters. | 
```
- name: JAVA_OPTS  value: "-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=2 -Xms64M"
```
 |
| `ACCOUNT_ID` | The Harness account Id for the account where this Delegate will attempt to register.This value is added automatically to the Delegate config file (YAML, etc) when you add the Delegate. | 
```
- name: ACCOUNT_ID  value: H5W8iol5TNWc4G9h5A2MXg
```
 |
| `DELEGATE_TOKEN` | The Harness account token used to register the Delegate. | 
```
- name: DELEGATE_TOKEN  value: d239xx88bf7xxxxxxx836ea
```
 |
| `MANAGER_HOST_AND_PORT` | The Harness SaaS manager URL. `https` indicates port 443. | 
```
- name: MANAGER_HOST_AND_PORT  value: https://app.harness.io
```
 |
| `WATCHER_STORAGE_URL` | The URL for the Watcher versions. | 
```
- name: WATCHER_STORAGE_URL  value: https://app.harness.io/public/prod/premium/watchers
```
 |
| `WATCHER_CHECK_LOCATION` | The Delegate version location for the Watcher to check for. | 
```
- name: WATCHER_CHECK_LOCATION  value: current.version
```
 |
| `REMOTE_WATCHER_URL_CDN` | The CDN URL for Watcher builds. | 
```
- name: REMOTE_WATCHER_URL_CDN  value: https://app.harness.io/public/shared/watchers/builds
```
 |
| `DELEGATE_STORAGE_URL` | The URL where published Delegate jars are stored. | 
```
- name: DELEGATE_STORAGE_URL  value: https://app.harness.io
```
 |
| `DELEGATE_CHECK_LOCATION` | The storage location hosting the published Delegate versions. | 
```
- name: DELEGATE_CHECK_LOCATION  value: delegateprod.txt
```
 |
| `DEPLOY_MODE` | Deployment mode: Kubernetes, Docker, etc. | 
```
- name: DEPLOY_MODE  value: KUBERNETES
```
 |
| `DELEGATE_NAME` | The name of the Delegate. This is the name that will appear in Harness when the Delegate is registered.You can automate Delegate creation by omitting the name, and then have a script copying the Delegate YAML file and add a unique name to `value` for each new Delegate you want to register.See [Automate Delegate Installation](automate-delegate-installation.md). | 
```
- name: DELEGATE_NAME  value: qa
```
 |
| `NEXT_GEN` | Indicates that this Delegate will register in [Harness NextGen](https://docs.harness.io/article/ra3nqcdbaf-compare-first-gen-and-next-gen).If this variable is set to `false`, the Delegate will attempt to register in Harness FirstGen. | 
```
- name: NEXT_GEN  value: "true"
```
 |
| `DELEGATE_DESCRIPTION` | The description added to the Delegate in the Harness Manager or YAML before registering.It appears in the Delegate details page in the Harness Manager. | 
```
- name: DELEGATE_DESCRIPTION  value: ""
```
 |
| `DELEGATE_TYPE` | The type of Delegate. | 
```
- name: DELEGATE_TYPE  value: "KUBERNETES"
```
 |
| `DELEGATE_TAGS` | The Tags added to the Delegate in the Harness Manager or YAML before registering.Tags are generated by Harness using the Delegate name but you can also add your own Tags.Tags appear in the Delegate details page in the Harness Manager.See [Tags Reference](../../20_References/tags-reference.md) and [Select Delegates with Tags](select-delegates-with-selectors.md). | 
```
- name: DELEGATE_TAGS  value: ""
```
 |
| `DELEGATE_TASK_LIMIT` | The maximum number of tasks the Delegate can perform at once.All of the operations performed by the Delegate are categorized as different types of tasks. | 
```
- name: DELEGATE_TASK_LIMIT  value: "50"
```
 |
| `DELEGATE_ORG_IDENTIFIER` | The Harness Organization [Identifier](../../20_References/entity-identifier-reference.md) where the Delegate will register.Delegates at the account-level do not have a value for this variable. | 
```
- name: DELEGATE_ORG_IDENTIFIER  value: "engg"
```
 |
| `DELEGATE_PROJECT_IDENTIFIER` | The Harness Project [Identifier](../../20_References/entity-identifier-reference.md) where the Delegate will register.Delegates at the account or Org-level do not have a value for this variable. | 
```
- name: DELEGATE_PROJECT_IDENTIFIER  value: "myproject"
```
 |
| `PROXY_*` | All of the Delegates include proxy settings you can use to change how the Delegate connects to the Harness Manager.The `secretKeyRef` are named using the Delegate name. | 
```
- name: PROXY_HOST  value: ""- name: PROXY_PORT  value: ""- name: PROXY_SCHEME  value: ""- name: NO_PROXY  value: ""- name: PROXY_MANAGER  value: "true"- name: PROXY_USER  valueFrom:    secretKeyRef:      name: mydel-proxy      key: PROXY_USER- name: PROXY_PASSWORD  valueFrom:    secretKeyRef:      name: mydel-proxy      key: PROXY_PASSWORD
```
 |
| `INIT_SCRIPT` | You can run scripts on the Delegate using `INIT_SCRIPT`.For example, if you wanted to install software on the Delegate pod, you can enter the script in `INIT_SCRIPT` and then apply the Delegate YAML.A multiline script must follow the YAML spec for [literal scalar style](https://yaml.org/spec/1.2-old/spec.html#id2795688).See [Run Scripts on Delegates](run-scripts-on-delegates.md). | 
```
- name: INIT_SCRIPT  value: |-    echo install wget    apt-get install wget    echo wget installed
```
 |
| `POLL_FOR_TASKS` | Enables or disables polling for Delegate tasks.By default, the Delegate uses Secure WebSocket (WSS) for tasks. If the `PROXY_*` settings are used and the proxy or some intermediary does not allow WSS, then set `POLL_FOR_TASKS` to true to enable polling. | 
```
- name: POLL_FOR_TASKS  value: "false"
```
 |
| `HELM_DESIRED_VERSION` | By default, Harness Delegates are installed with and use Helm 3.You can set the Helm version in the Harness Delegate YAML file using the `HELM_DESIRED_VERSION` environment property. Include the `v` with the version. For example, `HELM_DESIRED_VERSION: v2.13.0`. | 
```
- name: HELM_DESIRED_VERSION  value: ""
```
 |
| `USE_CDN` | Makes the Delegate use a CDN for new versions. | 
```
- name: USE_CDN  value: "true"
```
 |
| `CDN_URL` | The CDN URL for Delegate versions. | 
```
- name: CDN_URL  value: https://app.harness.io
```
 |
| `JRE_VERSION` | The Java Runtime Environment version used by the Delegate. | 
```
- name: JRE_VERSION  value: 1.8.0_242
```
 |
| `HELM3_PATH`,`HELM_PATH` | When you Install and run a new Harness Delegate, Harness includes Helm 3 support automatically. But in some cases, you might want to use one of the custom Helm binaries available from [Helm release](https://github.com/helm/helm/releases).For a Helm 3 binary, enter the local path to the binary in `HELM3_PATH`.For a Helm 2 binary, enter the path local path to the binary in `HELM_PATH`.If you are performing a [Native Helm deployment](https://docs.harness.io/article/lbhf2h71at-native-helm-quickstart), do not use `HELM_PATH` for the Helm 2 binary. Harness will look for the Helm 2 binary on the Delegate in its standard path, such as `/usr/local/bin/helm`. | 
```
- name: HELM3_PATH  value: ""- name: HELM_PATH  value: ""
```
 |
| `KUSTOMIZE_PATH` | The Harness Delegate ships with the 3.5.4 release of Kustomize.If you want to use a different release of Kustomize, add it to a location on the Delegate, update `KUSTOMIZE_PATH`, and (re)start the Delegate. | 
```
- name: KUSTOMIZE_PATH  value: ""
```
 |
| `KUBECTL_PATH` | You can use `KUBECTL_PATH` to change the kubectl config path. The default is `~/. kube/config`. | 
```
- name: KUBECTL_PATH  value: ""
```
 |
| `GRPC_SERVICE_ENABLED`,`GRPC_SERVICE_CONNECTOR_PORT` | By default, the Delegate requires HTTP/2 for gRPC (gRPC Remote Procedure Calls) be enabled for connectivity between the Delegate and Harness Manager. | 
```
- name: GRPC_SERVICE_ENABLED  value: "true"- name: GRPC_SERVICE_CONNECTOR_PORT  value: "8080"
```
 |
| `VERSION_CHECK_DISABLED` | By default, the Delegate always checks for new versions (via the Watcher). | 
```
- name: VERSION_CHECK_DISABLED  value: "false"
```
 |
| `DELEGATE_NAMESPACE` | The namespace for the Delegate is taken from the `StatefulSet` namespace. | 
```
- name: DELEGATE_NAMESPACE  valueFrom:    fieldRef:      fieldPath: metadata.namespace
```
 |

### Notes

#### Empty serviceName

By default, Harness does not include a value for `serviceName` in the `StatefulSet` in the Delegate YAML:


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

Simply add the Delegate name as the value using the syntax `harness.io/name: [Delegate name]`.

For example, if your Delegate name is `myDelegate`, you would add `harness.io/name: myDelegate`:


```
...  
  serviceName:  
      harness.io/name: myDelegate  
...
```

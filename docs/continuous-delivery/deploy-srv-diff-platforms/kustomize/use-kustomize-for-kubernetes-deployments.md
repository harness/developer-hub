---
title: Deploy to Kubernetes using Kustomize
description: Use kustomizations in your Kubernetes deployments.
sidebar_position: 2
helpdocs_topic_id: 98u2hvzj0t
helpdocs_category_id: hpy9lyd9b3
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness supports [Kustomize](https://kustomize.io/) kustomizations in your Kubernetes deployments. You can use overlays, multibase, plugins, sealed secrets, patches, etc, just as you would in any native kustomization.

## New to Kustomize?

In a nutshell, kustomizations let you create specific Kubernetes deployments while leaving the original manifests untouched. You drop a kustomization.yaml file next to your Kubernetes YAML files and it defines new behavior to be performed during deployment.  

Review the video [Kustomize: Deploy Your App with Template Free YAML](https://youtu.be/ahMIBxufNR0) (30min) for more information.

### Before you begin

* [Kustomize Quickstart](/docs/continuous-delivery/deploy-srv-diff-platforms/kustomize/kustomize-quickstart)


## Limitations

* Harness supports Kustomize and Kustomize Patches for [Rolling](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment), [Canary](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment), [Blue Green](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment) strategies, and the Kubernetes [Apply](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step) and [Delete](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources) steps.
* Harness does not use Kustomize for rollback. Harness renders the templates using Kustomize and then passes them onto kubectl. A rollback works exactly as it does for native Kubernetes.
* You cannot use Harness variables in the base manifest or kustomization.yaml. You can only use Harness variables in kustomize patches you add in **Kustomize Patches Manifest Details**.
* **Kustomize binary versions:**  
Harness includes Kustomize binary versions 3.5.4 and 4.0.0. By default, Harness uses 3.5.4. To use 4.0.0, you must enable the feature flag `NEW_KUSTOMIZE_BINARY` in your account. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
* Harness will not follow symlinks in the Kustomize and Kustomize Patches files it pulls.

## Visual summary

The following diagram shows a very simple topology for implementing Kustomize.

![](./static/use-kustomize-for-kubernetes-deployments-00.png)

Here's a quick video showing you how to add Kustomize templates and Patches files in Harness. It covers other types like Helm Charts, also.

<!-- Video:
https://www.youtube.com/watch?v=dVk6-8tfwJc-->
<docvideo src="https://www.youtube.com/watch?v=dVk6-8tfwJc" />


## Kustomize and Harness Delegates

All Harness Delegates include Kustomize by default. There is no installation required.

Your Delegate hosts, typically a pod in the target cluster, require outbound HTTPS/SSH connectivity to Harness and your Git repo.

The Delegate you use for Kustomize deployments must have access to the Git repo containing your Kustomize and resource files.The remainder of this topic assumes you have a running Harness Delegate and Cloud Provider Connector.

For details on setting those up, see [Define your Kubernetes target infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure)

## Add manifests and kustomization

Let's look at an example of connecting Harness to the repo containing the kustomization. We'll use a publicly available [helloword kustomization](https://github.com/wings-software/harness-docs/tree/main/kustomize/helloWorld) cloned from Kustomize.

All connections and operations are performed by Harness Delegates. You can add the Delegate separately or as part of adding the kustomization files.

1. In you Harness CD Pipeline, in a Deploy stage, click **Service**.
2. In **Service Definition**, in **Deployment Type**, click **Kubernetes**.
3. In **Manifests**, click **Add Manifest**. Go to [Kustomize Patches](#kustomize-patches) for more information.
4. In **Specify Manifest Type**, click **Kustomize**, and click **Continue**.

   ![](./static/use-kustomize-for-kubernetes-deployments-01.png)
5. In **Specify Kustomize Store**, select your Git provider, such as **GitHub**.

   If you already have a Git Connector that points to your Kustomization files, then select that. If not, click **New GitHub Connector**.
6. The **Git Connector** settings appear. Enter the settings described in [Connect to a Git Repo](/docs/platform/Connectors/Code-Repositories/connect-to-code-repo).
7. Click **Continue**.
8. In **Manifest Details**, enter the following settings, test the connection, and click **Submit**. We are going to provide connection and path information for a kustomization located at `https://github.com/wings-software/harness-docs/blob/main/kustomize/helloWorld/kustomization.yaml`.
  * **Manifest Identifier:** enter **kustomize**.
  * **Git Fetch Type****:** select **Latest from Branch**.
  * **Branch:** enter **main**.
  * **Kustomize Folder Path:**`kustomize/helloWorld`. This is the path from the repo root.

  The **Kustomize Plugin Path** is described below in [Use Plugins in Deployments](#use-plugins-in-deployments). The kustomization is now listed.

  ![](./static/use-kustomize-for-kubernetes-deployments-02.png)
9. Click **Next** at the bottom of the **Service** tab.

   Now that the kustomization is defined, you can define the target cluster for your deployment.

### Skip versioning for service

In Manifest Details, in Advanced, you can select **Skip Versioning for Service**.

By default, Harness versions ConfigMaps and Secrets are deployed into Kubernetes clusters. Harness uses a ConfigMap for release versioning.

In some cases, you might want to skip versioning.

When you enable **Skip Resource Versioning**, Harness will not perform versioning of ConfigMaps and Secrets for the deployment.

If you have enabled **Skip Resource Versioning** for a few deployments and then disable it, Harness will start versioning ConfigMaps and Secrets.

## Optimize by fetching a subset of the Kustomize files

When you specify a folder path for your Git repo in **Kustomize Folder Path** within **Manifest Details**, Harness fetches and downloads the complete repo. The amount of time it takes to fetch and download the files from your Git repo depends on the number of files present in your repo. A Git repo with hundreds or thousands of configuration files can take more time when Harness fetches those files.

Instead of fetching the entire Git repo, you can fetch a subset of the Kustomize manifests and configuration files. You can do this by specifying your Git repo folder path for **Kustomize Base Path** and the relative folder path for **Kustomize YAML Folder Path** in **Manifest Details**.

In **Manifest Details**, enter the following required settings:
  * **Manifest Name:** enter the name for this manifest.
  * **Git Fetch Type:** select **Latest from Branch**.
  * **Branch:** enter **main** or **master**.
  * **Kustomize Base Path:** When you select **Optimized Kustomize Manifest Collection**, this field changes from **Kustomize Folder Path** to **Kustomize Base Path**. Enter the folder path for your Git repo inside which all of the Kustomize dependencies and base manifests are present. Harness fetches and downloads this folder instead of the entire Git repo. The folder path shown in the dialog is an example.
  * **Kustomize YAML Folder Path:** enter the relative folder path for your Git repo where the kustomize.yaml file is located. The folder path shown in the dialog is an example.
    
    As an example, if kustomization.yaml is present in this path: **kustomize/multipleEnv/environments/production** and the **kustomize/multipleEnv** folder contains all of the kustomize dependencies, then the folder paths would be as follows:

    * **Kustomize Base Path:** kustomize/multipleEnv/
    * **Kustomize YAML Folder Path:** environments/production/

## Artifact sources and kustomization

You can list artifacts in two ways:

* Artifacts can be hardcoded in the deployment YAML file deployed using your Kustomization files.
* You can add artifacts to the Service **Artifacts** section and reference them in Kustomize Patch files using the Harness variable `<+artifact.image>`. See [Kustomize Patches](#kustomize-patches) below, and [Built-in Harness Variables Reference](/docs/platform/Variables-and-Expressions/harness-variables).

## Kustomize patches

You cannot use Harness variables in the base manifest or kustomization.yaml. You can only use Harness variables in kustomize patches you add in **Kustomize Patches Manifest Details**.Kustomize patches override values in the base manifest. Harness supports the `patchesStrategicMerge` patches type.

For example, let's say you have a simple kustomization.yaml for your **application** folder like this:


```yaml
resources:  
  - namespace.yaml  
  - deployment.yaml  
  - service.yaml  
  - configmap.yaml
```
And you have an overlay for a production environment that points to the **application** folder like this:


```yaml
resources:  
  - ../../application  
namePrefix: nonpro-  
configMapGenerator:  
- name: example-config  
  namespace: default  
  #behavior: replace  
  files:  
    - configs/config.json  
patchesStrategicMerge:  
  - env.yaml
```
The `patchesStrategicMerge` label identifies the location of the patch **env.yaml**, which looks like this:


```yaml
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: example-deploy  
spec:  
  template:  
    spec:  
      containers:  
      - name: example-app  
        env:  
        - name: ENVIRONMENT  
          value: Production
```
As you can see, it patches a new environment variable `name: ENVIRONMENT`.

Here's what the patching looks like side-by-side:

![](./static/use-kustomize-for-kubernetes-deployments-03.png)

When the kustomization.yaml is deployed, the patch is rendered and the environment variable is added to the deployment.yaml that is deployed.

### Adding Kustomize patches

You cannot use Harness variables in the base manifest or kustomization.yaml. You can only use Harness variables in kustomize patches you add in **Kustomize Patches Manifest Details**.In the Stage's **Service**, in **Manifests**, click **Add Manifest**.

1. In **Specify Manifest Type**, select **Kustomize Patches**, and click **Continue**.

![](./static/use-kustomize-for-kubernetes-deployments-04.png)

2. In **Specify Kustomize Patches Store**, select your Git provider and Connector. See [Connect to a Git Repo](/docs/platform/Connectors/Code-Repositories/connect-to-code-repo).

   The Git Connector should point to the Git account or repo where you Kustomize files are located. In **Kustomize Patches** you will specify the path to the actual patch files.

3. Click **Continue**.

4. In **Manifest Details**, enter the path to your patch file(s):
   * **Manifest Identifier:** enter a name that identifies the patch file(s). You don't have to add the actual filename.
   * **Git Fetch Type:** select whether to use the latest branch or a specific commit Id.
   * **Branch**/**Commit Id**: enter the branch or commit Id.
   * **File/Folder Path:** enter the path to the patch file(s) from the root of the repo. Click **Add File** to add each patch file. The files you add should be the same files listed in `patchesStrategicMerge` of the main kustomize file in your Service.

   The order in which you add file paths for patches in **File/Folder Path** is the same order that Harness applies the patches during the kustomization build.Small patches that do one thing are recommended. For example, create one patch for increasing the deployment replica number and another patch for setting the memory limit.
5. Click **Submit**. The patch file(s) is added to **Manifests**.

   When the main kustomization.yaml is deployed, the patch is rendered and its overrides are added to the deployment.yaml that is deployed.

#### How Harness uses patchesStrategicMerge

If the `patchesStrategicMerge` label is missing from the kustomization YAML file, but you have added Kustomize Patches to your Harness Service, Harness will add the Kustomize Patches you added in Harness to the `patchesStrategicMerge` in the kustomization file.

If you have hardcoded patches in `patchesStrategicMerge`, but not add these patches to Harness as Kustomize Patches, Harness will ignore them.

### Using Harness variables in patches

Kustomize does not natively support variable substitution but Harness supports variable substitution using [Harness variable expressions](/docs/platform/Variables-and-Expressions/harness-variables) in Kustomize patches.

This allows you to configure any patch YAML labels as Harness variables expressions and replace those values at Pipeline runtime.

Let's look at an example.

Here is the deployment.yaml used by our kustomization:


```yaml
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: example-deploy  
  namespace: default  
  labels:  
    app: example-app  
  annotations:  
spec:  
  selector:  
    matchLabels:  
      app: example-app  
  replicas: 1  
  strategy:  
    type: RollingUpdate  
    rollingUpdate:  
      maxSurge: 1  
      maxUnavailable: 0  
  template:  
    metadata:  
      labels:  
        app: example-app  
    spec:  
      containers:  
      - name: example-app  
        image: harness/todolist-sample:latest  
        imagePullPolicy: Always  
        ports:  
        - containerPort: 5000
```
You cannot use Harness variables in the base manifest or kustomization.yaml. You can only use Harness variables in kustomize patches you add in **Kustomize Patches Manifest Details**.You add the patch files that will patch deployment.yaml to **Kustomize Patches** **Manifest Details**. Only these patch files can use Harness variables.

We're going to use variables for `replicas` and `image`.

Let's look at the Harness variables in our Pipeline stage. Here are two Service-level variables:

![](./static/use-kustomize-for-kubernetes-deployments-05.png)

One variable is for the `image` and another for the `replicas` count.

A patch using these variables will look like this:


```yaml
apiVersion: apps/v1  
kind: Deployment  
metadata:  
 name: example-deploy  
 namespace: default  
spec:  
 template :  
   spec:  
     containers:  
       - name: example-app  
         image: <+serviceConfig.serviceDefinition.spec.variables.image>  
   
---  
apiVersion: apps/v1  
kind: Deployment  
metadata:  
 name: example-deploy  
 namespace: default  
spec:  
 replicas: <+serviceConfig.serviceDefinition.spec.variables.replica>
```
To get those variable references, you simply copy them:

![](./static/use-kustomize-for-kubernetes-deployments-06.png)

Add this patch in the Kustomize Patches **Manifest Details**:

![](./static/use-kustomize-for-kubernetes-deployments-07.png)

Now, when the Pipeline is run, the values for the two variables are rendered in the patch YAML and then the patch is applied to the deployment.yaml.

If you look at the Initialize phase of the deployment step (in Rolling, Canary, etc), you can see the variable values rendered in the Deployment manifest.

![](./static/use-kustomize-for-kubernetes-deployments-08.png)

### Using Harness secrets in patches

You can also use Harness secrets in patches.

For example, let's say we have two secrets, one for `image` and one for `app`:

![](./static/use-kustomize-for-kubernetes-deployments-09.png)

The following patch uses these secrets for `image` and `app`, referencing them using the expression `<+secrets.getValue("[secret name]")>`.


```yaml
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: example-deploy  
  namespace: default  
spec:  
  template :  
    spec:  
      containers:  
        - name: example-app  
          image: <+secrets.getValue("image")>  
  
---  
apiVersion: v1  
kind: Service  
metadata:  
  name: example-service  
  namespace: default  
spec:  
  selector:  
    app: <+secrets.getValue("appName")>
```
The secret output in the manifest will be asterisks (\*). The secret value is not displayed.

See [Add Text Secrets](/docs/platform/Secrets/add-use-text-secrets).

## Overlays and multibases

An overlay is a kustomization that depends on another kustomization, creating variants of the common base. In simple terms, overlays change pieces of the base kustomization.yaml. These are commonly used in patches.

A multibase is a type of overlay where copies of the base use the base but make additions, like adding a namespace.yaml. Basically, you are declaring that the overlays aren't just changing pieces of the base, but are new bases.

In both overlays and multibases, the most common example is staging and production variants that use a common base but make changes/additions for their environments. A staging overlay could add a configMap and a production overlay could have a higher replica count and persistent disk.

You can add overlay YAML files to the Service Manifests section just as you would add the standard kustomization.yaml.

Harness will look for the `resources` section of the overlay file to find the kustomization.yaml for the overlay and apply them both.


```yaml
resources:  
  - ../../application
```
In some cases you might want to deploy the standard kustomization.yaml in one stage and then the overlay in another. In this case, when you create the new stage, select **Propagate from**, select the standard kustomization.yaml stage, and then select **Stage Overrides**.

In **Manifests**, add the overlay kustomization.yaml and any patch files.

See [Propagate and Override CD Services](/docs/continuous-delivery/x-platform-cd-features/services/propagate-and-override-cd-services).

## Define the infrastructure

There is nothing unique about defining the target cluster infrastructure definition for a Kustomize deployment. It is the same process as a typical Harness Kubernetes deployment.

For more information, go to [Define Your Kubernetes Target Infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure).

### Pre-existing and dynamically provisioned infrastructure

There are two methods of specifying the deployment target infrastructure:

- **Pre-existing**: the target infrastructure already exists and you simply need to provide the required settings.
- **Dynamically provisioned**: the target infrastructure will be dynamically provisioned on-the-fly as part of the deployment process.

For details on Harness provisioning, go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview).

## Use plugins in deployments

Kustomize offers a plugin framework to generate and/or transform a kubernetes resource as part of a kustomization.

You can add your plugins to the Harness Delegate(s) and then reference them in the Harness Service you are using for the kustomization.

When Harness deploys, it will apply the plugin you reference just like you would with the `--enable_alpha_plugins` parameter.

### Add plugins to delegate using INIT script

To add a plugin to the Delegate, you can install it manually or use the `INIT_SCRIPT` environment variable in the Delegate config file to install it.


[Path to Plugin in Service Manifest](#path-to-plugin-in-service-manifest)

For example, here is a ConfigMap generator plugin script:


```bash
MY_PLUGIN_DIR=$HOME/K_PLUGINS/kustomize/plugin/myDevOpsTeam/sillyconfigmapgenerator  
mkdir -p $MY_PLUGIN_DIR  
cat <<'EOF' >$MY_PLUGIN_DIR/SillyConfigMapGenerator  
#!/bin/bash  
# Skip the config file name argument.  
shift  
today=`date +%F`  
echo "  
kind: ConfigMap  
apiVersion: v1  
metadata:  
  name: the-map  
data:  
  today: $today  
  altGreeting: "$1"  
  enableRisky: "$2"  
"  
EOF  
cat $MY_PLUGIN_DIR/SillyConfigMapGenerator  
chmod +x $MY_PLUGIN_DIR/SillyConfigMapGenerator  
readlink -f $MY_PLUGIN_DIR/SillyConfigMapGenerator
```

Each plugin is added to its own directory, following this convention:

```bash
$XDG_CONFIG_HOME/kustomize/plugin  
    /${apiVersion}/LOWERCASE(${kind})
```
The default value of `XDG_CONFIG_HOME` is `$HOME/.config`. See [Extending Kustomize](https://kubectl.docs.kubernetes.io/guides/extending_kustomize/) from Kustomize.

In the script example above, you can see that the plugin is added to its own folder following the plugin convention:


```bash
$HOME/K_PLUGINS/kustomize/plugin/myDevOpsTeam/sillyconfigmapgenerator
```
Note the location of the plugin because you will use that location in the Harness Service to indicate where the plugin is located (described below).

Plugins can only be applied to Harness Kubernetes Delegates.

#### Path to plugin in service manifest

In the Harness Service that uses the Kustomization and plugin, in **Manifests**, select the existing Kustomize manifest or click **Add Manifest** and add a new as described in [Add Manifests and Kustomization](#add-manifests-and-kustomization) above.

In **Manifest Details**, provide the path to the plugin on the Delegate host.

![](./static/use-kustomize-for-kubernetes-deployments-10.png)

Click **Submit**. Harness is now configured to use the plugin when it deploys using Kustomize.

### Delegate selection

You might have multiple Delegates installed in your infrastructure, so you have to make certain that Harness uses the Delegate with the plugin installed.

Each **Execution** step has a **Delegate Selector** setting where you can select the Delegate used by that the step.

For example, if your stage Execution has **Canary**, **Canary Delete**, and **Rolling** steps, open each step, select **Advanced**, and then select the **Delegate Selector** for the Delegate that has the plugin installed.

![](./static/use-kustomize-for-kubernetes-deployments-11.png)

The Delegate Selector setting lists the Delegate Tags for all Delegates. You can see these Tags by looking at the Delegate details:

![](./static/use-kustomize-for-kubernetes-deployments-12.png)

Now the Delegate with the plugin installed is used for the Pipeline steps, and the plugin is located using the path you provided in **Manifests**.

## Kustomize deployment with the Apply step

You can use the Apply step in your Kustomize deployments.

When you use Kustomize, the **File Path** in the Apply Step should be set according to the following conditions.

* **Default:** Apply step **File Path** is the path from the root of the repo to the folder with the kustomization YAML file is located. This is the same as the Kustomize Folder Path setting in the **Manifest Details**.

![](./static/use-kustomize-for-kubernetes-deployments-13.png)* **Optimized Kustomize Manifest Collection:** When the **Optimized Kustomize Manifest Collection** option is enabled in **Manifest Details**, the Apply step **File Path** must be the same path as **Kustomize YAML Folder Path**.

![](./static/use-kustomize-for-kubernetes-deployments-14.png)

## Change the Default Path for the Kustomize Binary

The Harness Delegate ships with the 3.5.4 [release](https://github.com/kubernetes-sigs/kustomize/releases) of Kustomize.

If you want to use a different release of Kustomize, add it to a location on the Delegate, update the following Delegate files, and restart the Delegate.

### Kubernetes delegate

Update the `value` environment variable in harness-delegate.yaml:


```yaml
...  
name: KUSTOMIZE_PATH  
value: "<path>"  
...
```

### Docker delegate

Add the Kustomize path environment variable in the Delegate Docker compose file:


```yaml
- KUSTOMIZE_PATH=<path>
```

## Configuring a Kustomize service with command flags 

Command flags let users change the behavior of how Harness performs a Kustomize deployment. 

Using the **Build** command type, you can pass subcommands to change the behavior of the `kustomize build` command used by Harness at runtime. 

You can configure the command flag in the Kustomize **Manifest Details** page.

Here's a sample stack trace command:

```TEXT
## To print the stack trace of the Kustomize build command 
kustomize build --stack-trace 
```

Here is how it's implemented in Harness:

<docimage path={require('./static/35ec7e7239ffd1e3318ccc1cab146317c35abba1ace73a1684108e69a54fa632.png')} width="60%" height="60%" title="Click to view full size image" />


Harness also supports [Helm charts with Kustomize](https://github.com/kubernetes-sigs/kustomize/blob/master/examples/chart.md#helm-related-flags) deployments. 

Here's how to render your kustomization with Helm:

```Text
## Enable the Helm template and pull capabilities and render your kustomization with Helm. 
kustomize build --enable-helm --helm-command `<YOUR_HELM_COMMAND>`
```

Here's how it's implemented in Harness:

<docimage path={require('./static/440c8cc0277021997de5c09937e550f1558e48edb350e5e143f09ff3b8b67718.png')} width="60%" height="60%" title="Click to view full size image" />


When Harness executes the Kustomize `build` command as part of your deployment, you will see these commands being applied in the execution log.

### Limitations

Harness supports the Kustomize `build` command only. The Kustomize `build` command builds a kustomization target from a directory or URL.

## Next steps

* [Create a Kubernetes Rolling Deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment)
* [Create a Kubernetes Canary Deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment)
* [Create a Kubernetes Blue Green Deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment)


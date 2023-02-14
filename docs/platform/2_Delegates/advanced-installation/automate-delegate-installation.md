---
title: Automate delegate installation
description: Automate delegate installation and registration.
# sidebar_position: 2
helpdocs_topic_id: 9deaame3qz
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

You can automate delegate installation and registration by duplicating the downloaded delegate configuration file, renaming the delegate, and applying the new file. You can script this process to duplicate delegates as needed.

When you apply the new delegate file, the delegate registers with Harness under the new name.

This topic describes the process used to duplicate, rename, and register a new delegate. You will likely want to script this process.

### Review: Automation and high availability (HA)

High availability does not require delegate automation. Automation can be useful, however, when multiple delegates are required to perform concurrent tasks, or depending on the compute resources you assign to delegates. A rule of thumb is one delegate for every 300 to 500 service instances.

In addition to compute considerations, you can implement high availability for delegates. This means installing multiple delegates in your environment.

For example, in Kubernetes deployments, you can set up two delegates, each in its own pod in the same target Kubernetes cluster. To do so, edit the Kubernetes delegate `spec` you download from Harness to provide multiple replica pods. 


```
...  
apiVersion: apps/v1beta1  
kind: Deployment  
metadata:  
  labels:  
    harness.io/app: harness-delegate  
    harness.io/account: xxxx  
    harness.io/name: test  
  name: test-zeaakf  
  namespace: harness-delegate  
spec:  
  replicas: 2  
  selector:  
    matchLabels:  
      harness.io/app: harness-delegate  
...
```
In this example, the `spec` section of the harness-kubernetes.yaml file was changed to provide two replica pods. High availability is provided without automation.

For the Kubernetes delegate, you only need one delegate in the cluster. Simply increase the number of replicas, and nothing else. Do not add another delegate to the cluster in an attempt to achieve HA.If you want to install Kubernetes delegates in separate clusters, do not use the same harness-kubernetes.yaml and name for both delegates. Download a new Kubernetes YAML `spec` from Harness for each delegate you want to install. This avoids name conflicts.In every case, the delegates must be identical in terms of permissions, keys, connectivity, and so on.With two or more delegates running in the same target environment, high availability is provided by default. The failure of a single delegate does not stop Harness from performing deployments. You can also increase availability further by running three delegates in case you lose two, and so on.

### Limitations

* Two delegates in different locations with different connectivity do not support high availability. For example, if you have a delegate in a development environment and another in a production environment, the development delegate does not communicate with the production delegate. The reverse is also true. If the sole delegate in an environment stops running, Harness ceases operation.

### Step 1: Duplicate the delegate config file

These steps assume you have already installed and registered a Delegate. Duplicate the configuration file for a delegate you have installed and registered with your Harness account.

Ensure that the delegate environment variables are set correctly.

The delegate configuration file contains environment variables for account, Organization, and Project. The account variable is always set with your Harness account Id.

If your delegate is registered at the account level, the Organization and Project variables will be empty. If your delegate is registered at the Organization level, the Project variable will be empty.

If your delegate configuration file uses other environment variables, review them to make certain that you want them duplicated.

The Delegate Environment Variables are described in the relevant Delegate installation topics.

### Step 2: Rename the New Delegate

The process you use to rename a delegate depends on its type. For a Docker delegate,  you can change the name on the command line. For a Kubernetes delegate, you must change multiple instances of the name.

#### Kubernetes delegate renaming

In the Kubernetes delegate config file, several labels must be updated:

* `Secret.metadata.name`
* `Deployment.metadata.labels.harness.io/name`
* `Deployment.metadata.name`
* `Deployment.spec.selector.matchLabels.harness.io/name`
* `Deployment.spec.template.metadata.labels.harness.io/name`
* `Deployment.spec.containers.envFrom.secretRef`
* `Deployment.metadata.spec.template.spec.env.name: DELEGATE_NAME`
* `Service.metadata.selector.harness.io/name`
* `CronJob.metadata.labels.harness.io/name`
* `CronJob.metadata.name`

The `DELEGATE_NAME` environment variable looks like this:


```
...  
        - name: DELEGATE_NAME  
          value: string  
...
```
#### Docker delegate renaming

To rename the Docker delegate, simply rename the value for the `DELEGATE_NAME` environment variable.


```
...  
    - DELEGATE_NAME=my-new-delegate  
...
```
### Step 3: Install the new delegate

After you update the delegate names, you can apply the configuration file. The delegate installs and registers with Harness.

### See also

* [Build custom delegate images with third-party tools](/docs/platform/2_Delegates/customize-delegates/build-custom-delegate-images-with-third-party-tools.md)


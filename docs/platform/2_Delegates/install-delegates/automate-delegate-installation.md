---
title: Automate delegate installation
description: Automate delegate installation and registration.
sidebar_position: 6
helpdocs_topic_id: 9deaame3qz
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

You can automate delegate installation and registration by duplicating the downloaded delegate configuration file, renaming the delegate, and applying the new file. You can script this process to duplicate delegates as needed.

When you apply the new delegate file, the delegate registers with Harness under the new name.

:::important
Delegate names in an account must be unique. You cannot use the same delegate name in an account that you use in an organization or project. Delegates with the same name in an account and an organization or project will start but will not register.
:::

This topic describes the process used to duplicate, rename, and register a new delegate. You will likely want to script this process.

### Review: Automation and high availability (HA)

HA does not require delegate automation. Automation can be useful, however, when multiple delegates are required to perform concurrent tasks, or depending on the compute resources you assign to delegates. A rule of thumb is one delegate for every 300 to 500 service instances.

In addition to compute considerations, you can implement HA for delegates. This means installing multiple delegates in your environment.

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

In this example, the `spec` section of the harness-kubernetes.yaml file was changed to provide two replica pods. HA is provided without automation.

A Kubernetes cluster requires only one delegate. To create HA in the cluster, you can increase the number of delegate replica pods. Do not add another delegate to the cluster. 

If you want to install Kubernetes delegates in separate clusters, do not use the same harness-kubernetes.yaml and name for both delegates. Download a new Kubernetes YAML `spec` from Harness for each delegate you want to install. This prevents name conflicts. 

In every case, the delegates must be identical in terms of permissions, keys, connectivity, and so on. With two or more delegates running in the same target environment, HA is provided by default. The failure of a single delegate does not stop Harness from performing deployments. For greater availability, increase the number of replica pods to run three delegates in case you lose two, and so on.


### Limitations

* Two delegates in different locations do not support HA. For example, if you have one delegate in a development environment and another in a production environment, the development delegate does not communicate with the production delegate. The reverse is also true. If the one delegate deployed to an environment stops running, Harness ceases operation in that environment.

### Step 1: Duplicate the delegate configuration file

Duplicate the configuration file for a delegate that is installed and registered with your Harness account.

Ensure that the delegate environment variables are set correctly.

The delegate configuration file contains environment variables for account, organization, and project. The account variable is set to your Harness account ID.

If your delegate is registered at the account level, the Organization and Project variables will be empty. If your delegate is registered at the Organization level, the Project variable will be empty.

Before you duplicate the file, review the list of environment variables in the delegate `spec` to ensure they are appropriate for the second delegate. For more information, go to [Delegate environment variables](../delegate-reference/delegate-environment-variables/).

### Step 2: Rename the new delegate

The process that is used to rename a delegate depends on its type. 

#### Rename the Kubernetes delegate 

To change the name of a Kubernetes delegate, modify the following fields:

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

The `DELEGATE_NAME` environment variable is specified as a YAML list item:

```
...  
        - name: DELEGATE_NAME  
          value: string  
...
```

#### Rename the Docker delegate 

To change the name of a Docker delegate, set the `DELEGATE_NAME` environment variable to the new name:

```
...  
    - DELEGATE_NAME = my-new-delegate  
...
```

### Step 3: Install the new delegate

After you update the delegate names, you can apply the configuration file. The delegate installs and registers with Harness.

### See also

* [Build custom delegate images with third-party tools](/docs/platform/2_Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools.md)

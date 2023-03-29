---
title: Delegate automatic upgrades and expiration policy
description: Explains the auto-upgrade feature and the delegate expiration policy.
sidebar_position: 8
---

The Harness Delegate for Kubernetes supports automatic upgrade. With automatic upgrades, you don't have to worry about having the most up-to-date functionality. You always have the most recent version of the delegate. 

Harness recommends that you enable automatic upgrades. 

Delegate upgrades do not affect pipelines. Before an upgrade is performed, the delegate finishes the tasks that are underway. The delegate then shuts down gracefully. 

:::info note
The automatic upgrade feature is enabled by default for the Kubernetes manifest installation option. However, it is disabled by default for the Helm, Terraform, and Docker installation options. 
:::

## How automatic upgrade works in the Kubernetes manifest

The Kubernest manifest has a component called `upgrader`. The `upgrader` is a cron job that runs every hour. Every time it runs, it makes a call to the Harness Manager to determine which delegate version is published for the account. The API returns a payload, such as `harness/delegate:23.03.78314`. If the delegate that was involved in this upgrade cron job does not have the same image as what the API returns, the `kubectl set image` command runs to perform a rolling deployment of the delegate replicas with the newer image. 

To prevent the installation of the automatic upgrade feature, remove the `cronJob` section before you apply the manifest.

You can also change the time when the the upgrade cron job runs by updating the `schedule`. 

<details>
    <summary>Example Kubernetes manifest</summary>

```yaml
    apiVersion: batch/v1
    kind: CronJob
    metadata:
        labels:
            harness.io/name: test-upgrader-job
        name: test-upgrader-job
        namespace: harness-delegate-ng
    spec:
        schedule: "0 */1 * * *"
        concurrencyPolicy: Forbid
        startingDeadlineSeconds: 20
        jobTemplate:
            spec:
            template:
                spec:
                    serviceAccountName: upgrader-cronjob-sa
                    restartPolicy: Never
                    containers:
                    - image: harness/upgrader:latest
                    name: upgrader
                    imagePullPolicy: Always
                    envFrom:
                    - secretRef:
                        name: test-upgrader-token
                    volumeMounts:
                        - name: config-volume
                        mountPath: /etc/config
                    volumes:
                        - name: config-volume
                        configMap:
                            name: test-upgrader-config

```

</details>

### Determine if automatic upgrade is enabled

When a delegate is installed, it may take up to an hour to determine if the upgrader was removed during installation. During that time, the delegate shows a status of **DETECTING**. 

To find the delegate status, select an account, a project, or an organization, and then select **Delegates**. 

![Detecting delegate](static/detect-delegate.png)

After the first hour, the delegate shows a status of **AUTO UPGRADE: ON** or **AUTO UPGRADE: OFF**. 

![Auto-upgrade on](static/auto-upgrade-on.png)

### Disable automatic upgrade on an installed delegate image

If you disable automatic upgrade, then you have to manually upgrade the delegate regularly to prevent a loss of backward compatibility.

**To disable auto-upgrade on an installed delegate image**

1. Run the following command to suspend auto-upgrade on the installed image:  
`kubectl patch cronjobs <job-name> -p '{"spec" : {"suspend" : true }}' -n <namespace>`
2. In the delegate manifest, locate the **CronJob** resource. In the resource `spec`, set the `suspend` field to `true`:   
`spec:`  
--`suspend: true`

## Delegate expiration policy

Harness has an N-3 support policy for delegates. N-3 means that the current version and the three previous versions are supported. A new version is released approximately every two weeks. Each new version has more capabilities than the previous version and general fixes. 

For example, if you have version 23.03.XXXXX installed, all images from 23.01.XXXXX to 23.03.XXXXX are supported. 

Delegate expiration does not mean the delegate stops working. It means that you may experience issues because the backend has moved too far ahead, making the delegate no longer backward compatible. If you do not have automatic upgrade enabled, Harness recommends upgrading the delegate at least once per quarter. 

### Determine when your delegate expires

To determine when your delegate expires, you can check the **INSTANCE STATUS** column.

1. Select an account, a project, or an organization, and then select **Delegates**.

2. Locate your delegate in the list, and then check the **INSTANCE STATUS** column.

### Update the delegate YAML

Harness does not recommend the use of delegate images that are not current. However, if you require an earlier image version, check the repository on [Docker Hub](https://hub.docker.com/).

**To update the delegate YAML**

- Select to **New Delegate** > **Kubernetes** > **Kubernetes Manfiest** > **Custom**, and then follow the instructions on the screen. 

For an example of a complete Delegate YAML file, see [Example Kubernetes Manifest: Harness Delegate](/docs/platform/2_Delegates/delegate-reference/YAML/example-kubernetes-manifest-harness-delegate.md).
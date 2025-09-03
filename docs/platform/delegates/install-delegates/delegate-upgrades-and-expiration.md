---
title: Delegate automatic upgrades and expiration policy
description: Explains the auto-upgrade feature and the delegate expiration policy.
sidebar_position: 9
---

The Harness Delegate supports automatic upgrades. It is recommended that you enable automatic upgrades for your delegate to ensure it remains updated with the latest version.

Delegate upgrades do not affect pipelines unless the shutdown timeout is reached. Before an upgrade is performed, the delegate finishes the tasks that are underway. The delegate then shuts down. As part of the shutdown process, there is a 10 minute timeout by default. You can configure this setting. For more information, go to [Graceful delegate shutdown](/docs/platform/delegates/delegate-concepts/graceful-delegate-shutdown-process/).

:::info
The automatic upgrade feature is enabled by default for the Kubernetes manifest, Terraform, and Helm installation options. For Docker delegates, you need to run a separate command to enable auto-upgrader.
:::

## How automatic upgrade works 

### Kubernetes manifest Delegate

The Kubernetes manifest has a component called `upgrader`. The `upgrader` is a cron job that runs every hour by default. Every time it runs, it sends a request to Harness Manager to determine which delegate version is published for the account. The API returns a payload, such as `harness/delegate:yy.mm.verno`. If the delegate that was involved in this upgrade cron job does not have the same image as what the API returns, the `kubectl set image` command runs to perform a default rolling deployment of the delegate replicas with the newer image.

To prevent the installation of the automatic upgrade feature, remove the `CronJob` section before you apply the manifest.

You can also change the time when the upgrade cron job runs by updating the `schedule`. For configuration details, go to [Configure the delegate upgrade schedule](#configure-the-delegate-upgrade-schedule).

<details>
<summary>Example Kubernetes manifest</summary>

```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: upgrader-cronjob
  namespace: harness-delegate-ng
rules:
  - apiGroups: ["batch", "apps", "extensions"]
    resources: ["cronjobs"]
    verbs: ["get", "list", "watch", "update", "patch"]
  - apiGroups: ["extensions", "apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch", "create", "update", "patch"]

---

kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: kubernetes-delegate-upgrader-cronjob
  namespace: harness-delegate-ng
subjects:
  - kind: ServiceAccount
    name: upgrader-cronjob-sa
    namespace: harness-delegate-ng
roleRef:
  kind: Role
  name: upgrader-cronjob
  apiGroup: ""

---

apiVersion: v1
kind: ServiceAccount
metadata:
  name: upgrader-cronjob-sa
  namespace: harness-delegate-ng

---

apiVersion: v1
kind: Secret
metadata:
  name: test-upgrader-token
  namespace: harness-delegate-ng
type: Opaque
data:
  UPGRADER_TOKEN: "DELEGATE_TOKEN"

---

apiVersion: v1
kind: ConfigMap
metadata:
  name: test-upgrader-config
  namespace: harness-delegate-ng
data:
  config.yaml: |
    mode: Delegate
    dryRun: false
    workloadName: DELEGATE_TO_AUTO_UPGRADE
    namespace: harness-delegate-ng
    containerName: delegate
    delegateConfig:
      accountId: ACCOUNT_ID
      managerHost: HARNESS_MANAGE_ENDPOINT_URL

---

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
                    - mountPath: /etc/config
                volumes:
                    - name: config-volume
                    - configMap:
                        name: test-upgrader-config

```

</details>

### Docker Delegate

:::note Feature flag details

 The Docker Delegate Upgrader is currently behind the feature flag `PL_SHOW_AUTO_UPGRADE_FOR_DOCKER_DELEGATE`, which must be enabled to access this functionality. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

The Docker Delegate upgrader is responsible for two tasks: upgrading the Docker images used for running Docker delegates and performing health checks on those delegates.

:::info Note
Docker delegate upgrader is not supported if the delegate images are configured to be pulled from a private registry. If you attempt to run a Docker upgrader for these delegates, only health checks will be performed; automatic upgrades will not occur.
:::

<details>
<summary>Example Docker delegate upgrader command</summary>

```
  docker run  --cpus=0.1 --memory=100m \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e ACCOUNT_ID=<account_ID> \
  -e MANAGER_HOST_AND_PORT=https://app.harness.io \
  -e UPGRADER_WORKLOAD_NAME=docker-delegate \
  -e UPGRADER_TOKEN=<delegate_token> \
  -e SCHEDULE="0 */1 * * *" us-west1-docker.pkg.dev/gar-setup/docker/upgrader:latest
```

</details>

The Docker Delegate upgrader makes use of Docker volume mount `-v /var/run/docker.sock:/var/run/docker.sock \`. Through this it mounts the Docker socket file from the host to the same path inside the delegate upgrader container. This enables the delegate upgrader container to communicate with the Docker daemon and perform tasks related to upgrade. 

The Docker upgrader is scheduled to upgrade the delegate every one hour by default. This is done through the SCHEDULE environment variable. `-e SCHEDULE="0 */1 * * *"`. According to the configured schedule, the upgrader searches for Docker delegates whose environment variable, `DELEGATE_NAME`, matches the value of the environment variable `UPGRADER_WORKLOAD_NAME`. When it identifies eligible Docker delegates where the latest version of the published image for the account differs from the delegate's current version, it proceeds to upgrade those delegates.

In case of a successful upgrade, the old container is stopped within a 1 hour timeout by default and a new container is brought up with the upgraded delegate version. If you would like to customize the timeout to a different value, set the `CONTAINER_STOP_TIMEOUT` environment variable in the `docker run` command for the upgrader. For example, pass the following as environment variable to configure Docker Delegate upgrader timeout to 45 minutes: `-e CONTAINER_STOP_TIMEOUT=2700`.


:::info
User information is not propagated when a delegate is started from external sources. All delegate operations are recorded under the SYSTEM user in the audit trail, especially during the scale-up and scale-down processes. The **Action** column displays actions when a delegate is created, updated, or upserted. For more information about the audit trail, go to [View audit trail](/docs/platform/governance/audit-trail/).
:::

## Determine if automatic upgrade is enabled

When a delegate is installed, it may take up to an hour by default to determine if the `upgrader` was removed during installation. During that time, the delegate shows a status of **DETECTING**.

Harness updates the status when `upgrader` makes its first API call to the Harness platform. The default schedule is one hour, but the schedule is configurable. If Harness doesn't detect the upgrader API call within 90 minutes, the upgrade status is updated from **DETECTING** to **AUTO UPGRADE: OFF**.

Let's say the `upgrader` schedule is configured to two hours. The upgrade status would change from **AUTO UPGRADE: OFF** to **AUTO UPGRADE: ON** and back to **AUTO UPGRADE: OFF**. Every 90 minutes that Harness doesn't detect the API call, the status is set to **AUTO UPGRADE: OFF**. As soon as Harness detects it again, the status is set to **AUTO UPGRADE: ON**. Harness recommends a default schedule of 60 minutes. For more information, go to [Configure the delegate upgrade schedule](#configure-the-delegate-upgrade-schedule).

To find the delegate status, select an account, a project, or an organization, then select **Settings**. Under resources, select **Delegates**. For more information, go to [Delegates list page](/docs/platform/delegates/delegate-concepts/delegate-overview#delegates-list-page).

![Detecting delegate](static/detect-delegate.png)

When the delegate is first installed, the Delegates list page displays an **Auto Upgrade** status of **DETECTING** and then **SYNCHRONIZING**. After the first hour (for the default `upgrader` configuration) or your custom configured time, the delegate shows a status of **AUTO UPGRADE: ON** or **AUTO UPGRADE: OFF**.

![Auto-upgrade on](static/auto-upgrade-on.png)

## Disable automatic upgrade

If you disable automatic upgrades, then you have to manually upgrade the delegate regularly to prevent a loss of backward compatibility.

### Kubernetes manifest Delegate

To disable auto-upgrade on an installed delegate image, do the following:

1. Run the following command to suspend auto-upgrade on the installed image.

   ```
   kubectl patch cronjobs <job-name> -p '{"spec" : {"suspend" : true }}' -n <namespace>
   ```

2. In the delegate manifest, locate the **CronJob** resource. In the resource `spec`, set the `suspend` field to `true`.

   ```yaml
   spec:
      - suspend: true
   ```

### Docker Delegate

The Docker Delegate upgrader can upgrade multiple Docker delegates. An upgrader is capable of upgrading Docker delegates whose value of the environment variable `DELEGATE_NAME` is same as the value of the upgrader’s `UPGRADER_WORKLOAD_NAME` environment variable.

If you do not need auto-upgrade capabilities, the upgrader can still be used to perform health checks on the delegate. This can be achieved by passing an environment variable `DISABLE_AUTO_UPGRADE` to the upgrader and setting it to true. By default this is set to false.
     
     ```
      -e DISABLE_AUTO_UPGRADE=true
     ```  
  
## Configure the delegate upgrade schedule

Harness recommends a default schedule of 60 minutes, but suggests a range between one and 90 minutes for optimal performance.

:::info important
If you set the value outside of this range, upgrades will still work as expected. However, if the frequency exceeds 90 minutes, Harness will not be able to detect any auto-upgrades, and the UI will display that auto-upgrades are turned `OFF`.
:::

### Kubernetes manifest Delegate

To configure the delegate upgrade schedule, do the following:

1. In the `delegate.yaml` manifest file, locate the `upgrader-cronjob` resource.
2. Configure the **CronJob** resource to your specific settings.

   The `CronJob` YAML configuration should look something like the example below that runs the job every 15 minutes. The `spec.schedule` field defines when and how often the job should run.

   ```yaml
   ---

   apiVersion: batch/v1
   kind: CronJob
   metadata:
     labels:
       harness.io/name: kubernetes-delegate-upgrader-job
     name: kubernetes-delegate-upgrader-job
     namespace: harness-delegate-ng
   spec:
     schedule: "0,15,30,45 * * * *"
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
                   name: kubernetes-delegate-upgrader-token
               volumeMounts:
                 - name: config-volume
                   mountPath: /etc/config
             volumes:
               - name: config-volume
                 configMap:
                   name: kubernetes-delegate-upgrader-config
   ```

   For more information on the schedule syntax, go to [Writing a CronJob spec](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#writing-a-cronjob-spec) in the Kubernetes documentation.

3. Save the file.
4. Run the following.

   ```
   kubectl apply -f harness-delegate.yaml
   ```

   The schedule change for the cron job will take effect immediately, and the next upgrade run will follow the new schedule. If you have made any other changes to the YAML file, such as updating the image, configuration, environment variables, and so on, those changes will take effect during the next run.

### Docker Delegate

To configure the delegate upgrade schedule for Docker delegates, do the following:
1. In the docker run command for the upgrader, locate the `SCHEDULE` environment variable. 
2. Configure the time period after which you want the upgrader to check for upgrades as a cron expression. For example, if you want to check after every 15 minutes, update the cron expression in the `SCHEDULE` environment variable:
    
  ```
    -e SCHEDULE="0 */15 * * *"
  ``` 

3. Run the docker run command for the Docker delegate upgrader with the updated value of `SCHEDULE` environment variable. 

## Configure an optional registry mirror for delegate images

If you use Docker pull through registry cache (`https://docs.docker.com/docker-hub/mirror/`), you can configure `upgrader` to use an optional registry mirror for your delegate images.

When this feature is configured, Harness Delegate images are fetched from the designated mirror, instead of public Docker Hub.

```yaml
mode: Delegate
dryRun: false
workloadName: delegate-name
namespace: harness-delegate-ng
containerName: delegate
registryMirror: us.gsr.io/gcr-mirror
delegateConfig:
  accountId: <YOUR_ACCOUNT_ID>
  managerHost: <MANAGER_HOST>
```

During an upgrade, when `upgrader` seeks to update the delegate to `harness/delegate:verno`, it will utilize the image from `us.gsr.io/gcr-mirror/harness/delegate:verno`.

This option can be enabled by setting `upgrader.registryMirror` Helm value for Delegate Helm chart or by modifying Upgrader Kubernetes manifest.

## Use automatic upgrade with custom delegate images

You may choose to use a custom delegate image for the following reasons:

- You don't have access to Docker Hub, so you pull the Harness images and put them in your own container registry.
- You use the Harness Delegate as a base image and install tools, certificates, etc.

If automatic upgrade is enabled and you have a custom image, the following may occur:

- If the Kubernetes cluster does not have access to Docker Hub, then the upgrade fails.
- If the Kubernetes cluster has access to Docker Hub, then the new published image is deployed. This action causes the custom tooling to be lost.

To avoid these issues, you can set up the `upgrader` to use your custom delegate tag.

### Latest supported delegate version 
Use the [latest-supported-version](https://apidocs.harness.io/tag/Delegate-Setup-Resource/#operation/publishedDelegateVersion) API to determine the delegate number for your account:

   ```
   curl --location 'https://app.harness.io/ng/api/delegate-setup/latest-supported-version?accountIdentifier=\<YOUR_ACCOUNT_IDENTIFIER>' \
    --header 'x-api-key: \<YOUR_API_KEY>'
   ```

    The following example result is returned. It returns the tag of the delegate that is released to your account.

    ```json
    {
    "metaData": {},
    "resource": {
        "latestSupportedVersion": "24.04.82804",
        "latestSupportedMinimalVersion": "24.04.82804.minimal"
    },
    "responseMessages": []
    }
    ```

    When the `upgrader` makes a request, it tries to change the image to `harness/delegate:24.04.82804`. You can take either the `harness/delegate:24.04.82804` image or the `harness/delegate:24.04.82804.minimal` image and build your own image by adding more tools and binaries, and then push it to your own container repository. For example, you might publish the image to a private repository, such as `artifactory-abc/harness/delegate:24.04.82804`.

### Override delegate image version
  
  #### Create a delegate override

    Once the image is pushed, you can call the [override-delegate-tag](https://apidocs.harness.io/tag/Delegate-Setup-Resource/#operation/overrideDelegateImageTag) API to update delegate image version for one or more delegates using `accountIdentifier`, `orgIdentifier`, `projectIdentifier`, and `tags`.

    ```bash
      curl -i -X PUT \
      'https://app.harness.io/ng/api/delegate-setup/override-delegate-tag?accountIdentifier=<ACCOUNT_ID>&delegateTag=<IMAGE_VERSION>&orgIdentifier=<ORGANIZATION_ID>&projectIdentifier=<PROJECT_ID>&tags=<T1>,tags=<T2>,tags=<T3>&validTillNextRelease=false&validForDays=180' \
      -H 'x-api-key: YOUR_API_KEY_HERE'
    ```
    :::note 
      For updating delegates successfully through scope level delegate override, ensure both the delegate and the upgrader are running with the same token. In other words, ensure that the value of `DELEGATE_TOKEN` and `UPGRADER_TOKEN` is same.
    :::

    **API Parameters**

    | **Parameter**          | **Required** | **Description**                                                                                                                                              | **Use Case**                                                            |
    |------------------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
    | `delegateTag`          | Yes          | Custom delegate image version to override the existing delegate version                                                                                      | -                                                                       |
    | `accountIdentifier`    | Yes          | Harness account Id (`Account Settings → Account Details → Account Id`)                                                                                       | Used to update all delegates in an Account, including child scopes      |
    | `orgIdentifier`        | No           | Id assigned when creating the organization                                                                                                                   | Used to updated all delegates in an organization including child scopes |
    | `projectIdentifier`    | No           | Id assigned when creating the project                                                                                                                        | Used to update all delegates in a specific project                      |
    | `tags`                 | No           | Delegate name or [tag](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors#delegate-tags) assigned when creating the delegate | Used to update delegates with specific name or tags                     |
    | `validTillNextRelease` | No           | If set to true, your custom image version will be overridden when new delegate is released                                                                   | -                                                                       |
    | `validForDays`         | No           | Days after which your custom image version will be overridden                                                                                                | -                                                                       |

    :::note
        1. At max, there can only be two override entries corresponding to a combination of query params: `accountIdentifier`, `orgIdentifier` (if present), and `projectIdentifier`(if present): one with `tags` and one without `tags`. If the same combination of parameters is used with a different value of `tags` or `delegateTag`, then the existing entry will get updated. 
        2. When the Delegate upgrader runs, the system looks for a match as per the following criteria:
            - If delegate tags are not present:  
                1. The system first checks for an override entry at the same scope. If it doesn’t find one, it then looks for an override entry at a higher scope. This process continues up through higher levels.
                2. If no match is found, the system defaults to using the latest version.
            - If delegate tags are present:
                1. The system first checks for an override entry that has tags at the same scope. If it doesn’t find one, it then looks for an override entry with tags at a higher scope. This process continues up through higher levels.
                2. If it still doesn't find a match with tags, it then searches for an override entry at the same scope without tags, again moving up to higher scopes until it either finds a match or exhausts all options.
                3. If no match is found, the system defaults to using the latest version.
        3. When tags are used, to find a match, tags present in a delegate override should be a subset of the actual delegate tags. Example: If a delegate has `DELEGATE_TAGS = t1, t2` and an override entry exists with `tags=t1`, then the delegate will get upgraded. But if the override entry has `tags=t1, t2, t3`, then the delegate will not get upgraded.
    :::

  #### Delete Delegate Override version

    If you wish to delete an existing [override](https://apidocs.harness.io/tag/Delegate-Setup-Resource/#operation/overrideDelegateImageTag), use the  [delete-delegate-override](https://dummy.com) API. 

      ```bash
      curl -i -X DELETE \
      'https://app.harness.io/ng/api/delegate-setup/delete-delegate-override?accountIdentifier=<ACCOUNT_ID>&orgIdentifier=<ORGANIZATION_ID>&projectIdentifier=<PROJECT_ID>&tags=<T1>,tags=<T2>,tags=<T3>\
      -H 'x-api-key: YOUR_API_KEY_HERE'
      ```

      **API Parameters**

        | **Parameter**       | **Required** | **Description**                                                                                                                    |
        |---------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------|
        | `accountIdentifier` | Yes          | Harness account Id (`Account Settings → Account Details → Account Id`)                                                             |
        | `orgIdentifier`     | No           | Id assigned when creating the organization                                                                                         |
        | `projectIdentifier` | No           | Id assigned when creating the project                                                                                              |
        | `tags`              | No           | [Tag](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors#delegate-tags) assigned when creating the delegate |


        :::note 
          Each Delete API call deletes only one override entry if an exact match is found with the provided query parameters.
        :::

## Delegate expiration support policy

Six months after a delegate image is released, the delegate reaches End of Support (EOS). Eight months after a delegate image is released, the delegate is End of Life (EOL). 

When a delegate has been tagged as "expired", this does not stop a Delegate from continuing operations.  It is a cosmetic flag to inform a customer that the delegate should be considered for an upgrade. Because delegates are only backward-compatible, they might have issues if the backend has moved too far ahead. Harness recommends that you upgrade your delegates before they expire.

| Release | EOS | EOL |
| --- | --- | --- |
| 24.04.verno | 23.10.verno and below | 23.08.verno and below |
| 24.05.verno | 23.11.verno and below | 23.09.verno and below |

EOS means the following:

- Harness Support will provide best-attempt support requests for the delegate, and would recommend a change to a newer version.  This applies to both Harness FirstGen and Harness NextGen. 
- Security fixes will still be addressed, but may be already addressed with a newer update.
- Product defects will not be addressed.  Code Changes also will not be
- If delegates are past their EOS date, Harness does not support them. Expired delegates might continue to work, but it is recommended to upgrade to a newer delegate if the delegate does not work as intended.

EOL means the following:

- In addition to the EOS clauses, security fixes will not be addressed.

For a list of delegate images and their support status, go to [Delegate image version support status](/docs/platform/delegates/delegate-reference/delegate-image-version-status).

#### Example delegate expiration

 For delegates with an immutable image type, the image tag is `yy.mm.verno`. A delegate version `24.05.84200` would reach EOS in November 2024 and EOL in January 2025.

:::note
This policy applies to delegates with the `yy.mm.verno` image tag. It does not apply to legacy delegates. For information on delegate types, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

:::

:::info
Harness Self-Managed Enterprise Edition support is limited to the delegate version released with the most recent version. When you upgrade Harness Self-Managed Enterprise Edition, the supported delegate version is included.

:::

### Determine when your delegate expires

To determine when your delegate expires, do the following:

1. Select an account, a project, or an organization, and then select **Delegates**.

2. Locate your delegate in the list, and then check the **INSTANCE STATUS** column.

### Update the delegate YAML

Harness does not recommend the use of delegate images that are not current. However, if you require an earlier image version, check the repository on [Docker Hub](https://hub.docker.com/r/harness/delegate/tags).

To update the delegate YAML, do the following:

- Select **New Delegate** > **Kubernetes** > **Kubernetes Manifest** > **Custom**, and then follow the instructions on the screen.

For an example of a complete Delegate YAML file, go to [Example Kubernetes manifest for Harness Delegate](/docs/platform/delegates/delegate-reference/YAML/example-kubernetes-manifest-harness-delegate.md).


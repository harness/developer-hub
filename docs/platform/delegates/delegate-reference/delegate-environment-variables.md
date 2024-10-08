---
title: Delegate environment variables
description: The following table describes the environment variables that apply to the delegate manifest.
# sidebar_position: 2
helpdocs_topic_id: b032tf34k9
helpdocs_category_id: vm60533pvt
helpdocs_is_private: false
helpdocs_is_published: true
---


The following environment variables are available for use in the delegate manifest. Some of these variables are included in the YAML by default; you can specify others based on use case.

### ACCOUNT_ID

The Harness account Id of the account with which this delegate registers.

This value is automatically added to the delegate configuration file (the application manifest of a Kubernetes delegate) when you add the delegate.

```yaml
        - name: ACCOUNT_ID
          value: YOUR_ACCOUNT_ID
```

### DELEGATE_DESCRIPTION

A text description of the delegate. The description is added to the delegate before registration, in Harness Manager or in YAML. This value is displayed on the delegate details page in Harness Manager.

```yaml
        - name: DELEGATE_DESCRIPTION
          value: ""
```

### DELEGATE_NAME

The name of the delegate. This is the name that identifies a registered delegate in Harness.

This value is not specified when delegate creation is automated. Instead, a script is used to duplicate the delegate YAML file and add a unique name to the `DELEGATE_NAME` environment variable for each delegate to be registered. Go to [Automate delegate installation](/docs/platform/delegates/install-delegates/automate-delegate-installation.md).

```yaml
        - name: DELEGATE_NAME
          value: qa
```

### DELEGATE_NAMESPACE

The namespace for the delegate is taken from the `StatefulSet` namespace.

```yaml
        - name: DELEGATE_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
```

### DELEGATE_TAGS

Delegate tags are descriptors that are added to the delegate before the registration process, in Harness Manager or in YAML. Harness generates tags based on the delegate name; you can add others. You can specify multiple tags in YAML as a comma-separated list.

Tags are displayed on the delegate details page in Harness Manager. Go to [Tags reference](../../references/tags-reference.md) and [Use delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors.md).

```yaml
        - name: DELEGATE_TAGS
          value: "has_jq, has_gcloud"
```

### DYNAMIC_REQUEST_HANDLING

If enabled, delegate will stop acquiring new tasks if the cpu/memory usage goes beyond values defined in `CPU_USAGE_THRESHOLD` and `MEMORY_USAGE_THRESHOLD`. The default value for both is 80. 

   ```yaml
        - name: DYNAMIC_REQUEST_HANDLING
          value: "true"
   ```

### DELEGATE_CPU_THRESHOLD

To configure the delegate resource threshold, set the `DELEGATE_CPU_THRESHOLD` env variable to the CPU threshold in percentages. When the threshold is exceeded, the delegate rejects new tasks. Note that `DYNAMIC_REQUEST_HANDLING` has to be set to true for this to take effect. For more information, go to [Configure delegate metrics and auto scale](/docs/platform/delegates/manage-delegates/delegate-metrics).

   ```yaml
        - name: DELEGATE_CPU_THRESHOLD
          value: "80"
   ```

### DELEGATE_MEMORY_THRESHOLD

To configure the delegate resource threshold, set the `DELEGATE_MEMORY_THRESHOLD` env variable to the memory threshold in percentages. When the threshold is exceeded, the delegate rejects new tasks. Note that `DYNAMIC_REQUEST_HANDLING` has to be set to true for this to take effect. For more information, go to [Configure delegate metrics and auto scale](/docs/platform/delegates/manage-delegates/delegate-metrics).

   ```yaml
        - name: DELEGATE_MEMORY_THRESHOLD
          value: "80"
   ```

### DELEGATE_TASK_CAPACITY

Harness enables you to configure a maximum number of tasks for each delegate. This allows Harness Manager to use the task capacity to determine whether to assign a task to the delegate or queue it.

```yaml
        - name: DELEGATE_TASK_CAPACITY
          value: "2"

```

For example, if you set `DELEGATE_TASK_CAPACITY` to a value of 2 and execute 6 tasks in parallel, Harness Manager only executes 2 tasks at a time. If you don't configure `DELEGATE_TASK_CAPACITY`, Harness Manager executes all 6 tasks in parallel.

:::note
   This functionality is currently behind the feature flag `DELEGATE_TASK_CAPACITY_CHECK` and is available for Harness NextGen only. Contact [Harness Support](mailto:support@harness.io) to enable the feature. When the feature flag is enabled, the task is broadcast every minute in Harness Manager until it expires.
:::

### DELEGATE_TYPE

The type of the delegate.

```yaml
        - name: DELEGATE_TYPE
          value: "KUBERNETES"
```
### INIT_SCRIPT

Used to specify a script that runs when the delegate is initialized. You can use this environment variable to run scripts on the delegate but this is not a best practice. Delegate initialization should be built into the image; not determined on startup.

```yaml
        - name: INIT_SCRIPT
          value: |-
            echo "initializing Delegate"
            echo "Delegate initialized"
```

### JAVA_OPTS

Use the `JAVA_OPTS` environment variable to add or override JVM parameters. The delegate accepts the following JVM options.

```yaml
        - name: JAVA_OPTS
          value: "-XX:+UseContainerSupport -XX:MaxRAMPercentage=70.0 -XX:MinRAMPercentage=40.0 -XX:+HeapDumpOnOutOfMemoryError"
```

### LOG_STREAMING_SERVICE_URL

Use this variable to specify the endpoint for your log service in Harness NextGen. This variable is not used in Harness FirstGen.

```yaml
        - name: LOG_STREAMING_SERVICE_URL
          value: "YOUR_MANAGER_ENDPOINT/log-service/"
```

### MANAGER_HOST_AND_PORT

The Harness SaaS manager URL. The specification of HTTPS in the URL indicates the use of port 443.

```yaml
        - name: MANAGER_HOST_AND_PORT
          value: https://app.harness.io
```

### NEXT_GEN

Whether the delegate is registers in Harness NextGen or FirstGen. A value of `true` indicates that the delegate registers in Harness NextGen; a value of `false` indicates that the delegate registers in FirstGen.

```yaml
        - name: NEXT_GEN
          value: "true"
```

### POLL_FOR_TASKS

Enables or disables polling for delegate tasks. By default, the delegate uses Secure WebSocket (WSS) for tasks. If the `PROXY\_\*` settings are used and the proxy or some intermediary does not allow WSS, then set `POLL\_FOR\_TASKS` to true to enable polling.

```yaml
        - name: POLL_FOR_TASKS
          value: "false"
```

### STACK_DRIVER_LOGGING_ENABLED

Delegates send logs to Harness by default. Harness uses these logs for debugging and support. To disable this functionality, set this value to "false".

```yaml
        - name: STACK_DRIVER_LOGGING_ENABLED
          value: "false"
```

### PROXY_*

You can use delegate proxy settings to change how the delegate connects to Harness Manager.

The `secretKeyRef` values are named based on delegate name.

```yaml
        - name: PROXY_HOST
          value: ""
        - name: PROXY_PORT
          value: ""
        - name: PROXY_SCHEME
          value: ""
        - name: NO_PROXY
          value: ""
        - name: PROXY_MANAGER
          value: "true"
        - name: PROXY_USER
          valueFrom:
            secretKeyRef:
              name: mydel-proxy
              key: PROXY_USER
        - name: PROXY_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mydel-proxy
              key: PROXY_PASSWORD
```

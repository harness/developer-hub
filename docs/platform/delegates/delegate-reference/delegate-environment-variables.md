---
title: Delegate environment variables
description: The following table describes the environment variables that apply to the delegate manifest. Some of these variables are included in the YAML by default; you can specify others based on use case…
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

```
- name: ACCOUNT_ID
  value: XXXXXXXXXXXXXXXXXXXX 
```

### ACCOUNT_SECRET

The Harness account token that is used to register the delegate.

```
- name: ACCOUNT_SECRET
  value: XXXXXXXXXXXXXXXXXXXX 
```

### DELEGATE_DESCRIPTION

A text description of the delegate. The description is added to the delegate before registration, in Harness Manager or in YAML. This value is displayed on the delegate details page in Harness Manager. 

```
- name: DELEGATE_DESCRIPTION
  value: ""
```

### DELEGATE_NAME

The name of the delegate. This is the name that identifies a registered delegate in Harness. 

This value is not specified when delegate creation is automated. Instead, a script is used to duplicate the delegate YAML file and add a unique name to the `DELEGATE_NAME` environment variable for each delegate to be registered. Go to [Automate delegate installation](/docs/platform/2_Delegates/install-delegates/automate-delegate-installation.md). 

```
- name: DELEGATE_NAME
  value: qa 
```

### DELEGATE_NAMESPACE 

The namespace for the delegate is taken from the `StatefulSet` namespace. 

```
- name: DELEGATE_NAMESPACE
  valueFrom:
    fieldRef:
      fieldPath: metadata.namespace 
```

### DELEGATE_ORG_IDENTIFIER

The Harness organization [Identifier](../../20_References/entity-identifier-reference.md) in which the delegate registers.

Delegates at the account level do not have a value for this variable. 

```
- name: DELEGATE_ORG_IDENTIFIER
  value: "engg"
```

### DELEGATE_PROJECT_IDENTIFIER

The Harness project [Identifier](../../20_References/entity-identifier-reference.md) in which the delegate registers. 

Delegates at the account or organization level do not have a value for this variable.

```
- name: DELEGATE_PROJECT_IDENTIFIER
  value: "myproject"
```

### DELEGATE_TAGS

Delegate tags are descriptors that are added to the delegate before the registration process, in Harness Manager or in YAML. Harness generates tags based on the delegate name; you can add others. You can specify multiple tags in YAML as a comma-separated list.

Tags are displayed on the delegate details page in Harness Manager. Go to [Tags reference](../../20_References/tags-reference.md) and [Use delegate selectors](/docs/platform/2_Delegates/manage-delegates/select-delegates-with-selectors.md). 

```
- name: DELEGATE_TAGS
  value: ""
  
- name: DELEGATE_TAGS
  value: has_jq, has_gcloud 
```

### DELEGATE_TYPE

The type of the delegate.

```
- name: DELEGATE_TYPE
  value: "KUBERNETES" 
```
### INIT_SCRIPT

Used to specify a script that runs when the delegate is initialized. You can use this environment variable to run scripts on the delegate but this is not a best practice. Delegate initialization should be built into the image; not determined on startup.

```
- name: INIT_SCRIPT
  value: |-echo install wget 
  apt-get install wget
  echo wget installed
```

### JAVA_OPTS 

Use the `JAVA_OPTS` environment variable to add or override JVM parameters. The delegate accepts the following JVM options.

```
- name: JAVA_OPTS
  value: "-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=2 -Xms64M"
``` 

### LOG_STREAMING_SERVICE_URL

Use this variable to specify the endpoint for your log service in Harness NextGen. This variable is not used in Harness FirstGen.

```
- name: LOG_STREAMING_SERVICE_URL
  value: "YOUR_MANAGER_ENDPOINT/log-service/"
```


### MANAGER_HOST_AND_PORT

The Harness SaaS manager URL. The specification of HTTPS in the URL indicates the use of port 443. 

```
- name: MANAGER_HOST_AND_PORT
  value: https://app.harness.io 
```

### NEXT_GEN

Whether the delegate is registers in Harness NextGen or FirstGen. A value of `true` indicates that the delegate registers in Harness NextGen; a value of `false` indicates that the delegate registers in FirstGen. 

```
- name: NEXT_GEN
  value: "true" 
```

### POLL_FOR_TASKS

Enables or disables polling for delegate tasks.By default, the Delegate uses Secure WebSocket (WSS) for tasks. If the `PROXY\_\*` settings are used and the proxy or some intermediary does not allow WSS, then set `POLL\_FOR\_TASKS` to true to enable polling. 

```
- name: POLL_FOR_TASKS
  value: "false" 
```

### STACK_DRIVER_LOGGING_ENABLED

Delegates send logs to Harness by default. Harness uses these logs for debugging and support. To disable this functionality, set this value to "false". 

```
- name: STACK_DRIVER_LOGGING_ENABLED
  value: "false" 
```

### PROXY_*

You can use delegate proxy settings to change how the delegate connects to Harness Manager.

The `secretKeyRef` values are named based on delegate name. 

```
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

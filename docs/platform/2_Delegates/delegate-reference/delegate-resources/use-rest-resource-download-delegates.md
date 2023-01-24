---
title: Use REST resource download-delegates
description: Describes the use of the download-delegates REST resource.
# sidebar_position: 2
---


# Use REST resource download-delegates
`/ng/api/download-delegates/kubernetes`
`/ng/api/download-delegates/docker`


Use the operations of the **Delegate Download Resource** to obtain the delegate YAML file.

To use this resource, you must have a Harness account and an API key. For information on configuring your Harness account with an API key, see [Harness API Quickstart](/docs/platform/apis/api-quickstart/).

For detailed information on constructing requests, see [Delegate Download Resource](https://apidocs.harness.io/tag/Delegate-Download-Resource).

## Use case

This resource is useful in integrations that automate the delegate lifecycle.

## Operations

The **Delegate Download Resource** provides the following operations.

| **O**peration** | **HTTP method** | **Description** |
| :-- | :-- | :--|
| [Download a Docker delegate YAML file](https://apidocs.harness.io/tag/Delegate-Download-Resource/#operation/downloadDockerDelegateYaml) | `POST` | Downloads the YAML specification of a Docker delegate. |
| [Download a Kubernetes delegate YAML file](https://apidocs.harness.io/tag/Delegate-Download-Resource#operation/downloadKubernetesDelegateYaml) | `POST` | Downloads the YAML specification of a Kubernetes delegate. |
| Download the Helm values file for a Kubernetes delegate | [TBD] | [TBD] |


## Download delegate YAML

`operation/downloadDockerDelegateYaml`
`operation/downloadKubernetesDelegateYaml`

Use the Delegate Download Resource to download the YAML declaration for a Kubernetes or Docker delegate.

### HTTP request

Send your request using the HTTP POST method. Your request must specify the delegate type. For a Kubernetes delegate, use:

```
POST https://app.harness.io/gateway/ng/api/download-delegates/kubernetes
```

For a Docker delegate, use:

```
POST https://app.harness.io/gateway/ng/api/download-delegates/docker
```

The request URL requires the specification of the accountIdentifier query parameter. This is the identifier of your account. Inconsistent use of optional parameters on YAML creation can lead to unpredictable results on access attempts.

The following request URL includes the required and optional parameters in italics:

https://app.harness.io/gateway/ng/api/download-delegates/kubernetes?accountIdentifier=XXXXXXXXXXXxxxxxxxxxxx&orgIdentifier=myOrg&projectIdentifier=delegateAPIs

### Request body

The body of the request specifies delegate parameters. Requests for Kubernetes and Docker delegates use the same schema. For information on delegate size, see [Delegate overview](/docs/platform/2_Delegates/get-started-with-delegates/delegates-overview.md). 

```
{
  "name": "delegate-cd",
  "description": "This delegate handles tasks for CD.",
  "size": "SMALL",
  "tags": [
    "cd-tasks"
  ],
  "tokenName": "cdTasksToken",
  "clusterPermissionType": "CLUSTER_ADMIN",
  "customClusterNamespace": "myCluster"
}
```

For the API specification, see [Delegate Download Resource](https://apidocs.harness.io/tag/Delegate-Download-Resource) in the [Harness NextGen Platform API Reference](https://apidocs.harness.io/).

### Response body

A successful response includes the requested YAML in the response body. The following manifest specifies a Kubernetes delegate.

```
apiVersion: v1
kind: Namespace
metadata:
  name: harness-delegate-ng

---

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: harness-delegate-ng-cluster-admin
subjects:
  - kind: ServiceAccount
    name: default
    namespace: harness-delegate-ng
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io

---

apiVersion: v1
kind: Secret
metadata:
  name: delegate-cd-account-token
  namespace: harness-delegate-ng
type: Opaque
data:
  DELEGATE_TOKEN: "XXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxx"

---

# If delegate needs to use a proxy, please follow instructions available in the documentation
# https://ngdocs.harness.io/article/5ww21ewdt8-configure-delegate-proxy-settings

apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    harness.io/name: delegate-cd
  name: delegate-cd
  namespace: harness-delegate-ng
spec:
  replicas: 2
  selector:
    matchLabels:
      harness.io/name: delegate-cd
  template:
    metadata:
      labels:
        harness.io/name: delegate-cd
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3460"
        prometheus.io/path: "/api/metrics"
    spec:
      terminationGracePeriodSeconds: 600
      restartPolicy: Always
      containers:
      - image: harness/delegate:22.12.77617
        imagePullPolicy: Always
        name: delegate
        securityContext:
          allowPrivilegeEscalation: false
          runAsUser: 0
        ports:
          - containerPort: 8080
        resources:
          limits:
            memory: "2048Mi"
          requests:
            cpu: "0.5"
            memory: "2048Mi"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3460
            scheme: HTTP
          initialDelaySeconds: 10
          periodSeconds: 10
          failureThreshold: 2
        startupProbe:
          httpGet:
            path: /api/health
            port: 3460
            scheme: HTTP
          initialDelaySeconds: 30
          periodSeconds: 10
          failureThreshold: 15
        envFrom:
        - secretRef:
            name: delegate-cd-account-token
        env:
        - name: JAVA_OPTS
          value: "-Xms64M"
        - name: ACCOUNT_ID
          value: XXXXXXXXXXXxxxxxxxxxxx
        - name: MANAGER_HOST_AND_PORT
          value: https://app.harness.io
        - name: DEPLOY_MODE
          value: KUBERNETES
        - name: DELEGATE_NAME
          value: delegate-cd
        - name: DELEGATE_TYPE
          value: "KUBERNETES"
        - name: DELEGATE_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        - name: INIT_SCRIPT
          value: ""
        - name: DELEGATE_DESCRIPTION
          value: "This delegate handles tasks for CD."
        - name: DELEGATE_TAGS
          value: "cd-tasksg"
        - name: NEXT_GEN
          value: "true"
        - name: CLIENT_TOOLS_DOWNLOAD_DISABLED
          value: "true"
        - name: LOG_STREAMING_SERVICE_URL
          value: "https://app.harness.io/log-service/"

---

apiVersion: v1
kind: Service
metadata:
  name: delegate-service
  namespace: harness-delegate-ng
spec:
  type: ClusterIP
  selector:
    harness.io/name: delegate-cd
  ports:
    - port: 8080

---

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
  name: delegate-cd-upgrader-cronjob
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
  name: delegate-cd-upgrader-token
  namespace: harness-delegate-ng
type: Opaque
data:
  UPGRADER_TOKEN: "XXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxx"

---

apiVersion: v1
kind: ConfigMap
metadata:
  name: delegate-cd-upgrader-config
  namespace: harness-delegate-ng
data:
  config.yaml: |
    mode: Delegate
    dryRun: false
    workloadName: delegate-cd
    namespace: harness-delegate-ng
    containerName: delegate
    delegateConfig:
      accountId: XXXXXXXXXXXxxxxxxxxxxx
      managerHost: https://app.harness.io

---

apiVersion: batch/v1
kind: CronJob
metadata:
  labels:
    harness.io/name: delegate-cd-upgrader-job
  name: delegate-cd-upgrader-job
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
                name: delegate-cd-upgrader-token
            volumeMounts:
              - name: config-volume
                mountPath: /etc/config
          volumes:
            - name: config-volume
              configMap:
                name: delegate-cd-upgrader-config

```

### cURL request: Kubernetes delegate

The following cURL request retrieves the manifest for a Kubernetes delegate. The name field is required; if not specified, the other fields use default values. The `size` field must be one of “LAPTOP”, “SMALL”, “MEDIUM”, or “LARGE”. `clusterPermissionType` must be one of “CLUSTER_ADMIN”, “CLUSTER_VIEWER”, or NAMESPACE_ADMIN”. If clusterPermissionType is “NAMESPACE_ADMIN”, you must specify the `customClusterNamespace` value.

```
curl --location --request POST 'https://app.harness.io/gateway/ng/api/download-delegates/kubernetes?accountIdentifier=d_l7rzTsSQyPWX9OOF57OQ&orgIdentifier=default&projectIdentifier=testproject' \
--header 'x-api-key: pat.d_XxXxXxXx.XXXXXXXXXxxxxxxxx.xxxxxxxxxxxxxx' \
--header 'Content-Type: application/json' \
--header 'Cookie: _cfuvid=MmF1ThQgjyPIFaywOB6DvpnajVZjfME3tOqdsYszTY0-1662714012948-0-604800000' \
--data-raw '{
    "name" : "arpitdelegate",
    "description" : "sample",
    "size" : "LAPTOP",
    "tags" : ["tag1","tag2","tag3"],
    "tokenName" : "default_token_default/testproject",
    "clusterPermissionType" : "NAMESPACE_ADMIN",
    "customClusterNamespace" : "arpit-namespace"
}'
```


### cURL request: Docker delegate

The following cURL request retrieves the manifest for a Docker delegate. In this example, the only required field is `name`.

```
curl --location --request POST 'https://app.harness.io/gateway/ng/api/download-delegates/docker?accountIdentifier=d_l7rzTsSQyPWX9OOF57OQ&orgIdentifier=default&projectIdentifier=testproject' \
--header 'x-api-key: pat.d_XxXxXxXx.XXXXXXXXXxxxxxxxx.xxxxxxxxxxxxxx' \
--header 'Content-Type: application/json' \
--header 'Cookie: _cfuvid=MmF1ThQgjyPIFaywOB6DvpnajVZjfME3tOqdsYszTY0-1662714012948-0-604800000' \
--data-raw '{
    "name" : "arpitdockerdelegate",
    "description" : "sample",
    "tags" : ["tag1","tag2","tag3"],
    "tokenName" : "default_token_default/testproject"
}'
```

---
title: Delegate image types
description: Provides information about delegate image types.
# sidebar_position: 2
helpdocs_topic_id: nb9zuo3mxd
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness packages and distributes delegates on different types of images. Delegate images are identified by the delegate name. Image types are distinguished by tag.  

| Image type | Image tag | Image description |
| --- | --- | --- |
| DELEGATE | *`yy.mm.xxxx`* | The release year, month, and version in dot-separated format. |
| DELEGATE-MINIMAL | *`yy.mm.xxxx.minimal`* | The minimal tag is appended to the release year, month, and version in dot-separated format. |
| LEGACY DELEGATE | `ubi` `latest` | The legacy delegate image is identified by the latest tag. The last segment of the dot-separated identifier indicates the release. |
| LEGACY-MINIMAL | `ubi-minimal` | The legacy minimal image. |

### Image security

Harness gives you the option to select delegate images with or without third-party client tools. The use of a delegate packaged with third-party binaries speeds the construction of a CD pipeline; Harness CI and STO do not make use of these libraries. The inclusion of third-party binaries, however, increases attack vectors. Consider security as well as ease of use, in your choice of delegate images. 

Harness rigorously scans delegate images for vulnerabilities. Harness cannot, however, guarantee the elimination of CVEs from delegate images that include third-party client tools. The vulnerabilities that third-party client tools introduce in delegate images cannot be eliminated until the vulnerabilities are repaired in the third-party tools.

### Delegate comparison

The following table differentiates between delegate images based on key features and recommended use. 

For those images distributed with auto-upgrade enabled, Harness recommends accepting the auto-upgrade setting.

| | Third-party client tools | Minimum CVEs | Auto-upgrade enabled | Disable auto-upgrade | Notes |
| --- | :-: | :-: | :-: | :-: | --- |
| DELEGATE <br /><br />**Base image**: RedHat Universal Base Image (redhat/ubi8)<br />Recommended use: Quick deployment of a pipeline | &#x2713; | x | &#x2713;| &#x2713; | Installed as a Kubernetes Deployment resource.<br /><br />Renamed from "immutable delegate." |
| DELEGATE-MINIMAL<br /><br />**Recommended use**: To minimize attack vectors, in the enterprise, or when you want to select and install different tools at build time or runtime | x | &#x2713; | x | &#x2713; | |
| LEGACY DELEGATE<br /><br />**Recommended use**: Quick deployment of a CD pipeline<br /><br />**Base image**:  `ubuntu` | &#x2713; | x |&#x2713; | x |Installed as a Kubernetes **StatefulSet** resource.<br /><br />Updated at runtime each time a new delegate version is released. |
| LEGACY DELEGATE-MINIMAL<br /><br />**Recommended use**: To minimize attack vectors, in the enterprise, or when you want to select and install different tools at build time or runtime |x | &#x2713;| &#x2713; | x | |

### docker pull

The following table provides instructions for retrieval of delegate images.

| Delegate | Docker command |
| --- | --- |
| DELEGATE | `docker pull harness/delegate:` *`<yy.mm.xxxxx>`* |
| DELEGATE-MINIMAL | `docker pull harness/delegate:` *`<yy.mm.xxxxx> .minimal`* |
| LEGACY DELEGATE | `docker pull harness/delegate: latest`<br />`docker pull harness/delegate:ubi` |
| LEGACY DELEGATE-MINIMAL | `docker pull harness/delegate:ubi.minimal` |

### Example harness-delegate.yaml file

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
  name: delegate-del-account-token
  namespace: harness-delegate-ng
type: Opaque
data:
  DELEGATE_TOKEN: "ZjQ0MzZkNTRmZmQ0MGQxYjYxNGY0OGY5YTUzZGIxZmY="

---

# For information about how to proxy the delegate, see the documentation: 
# https://ngdocs.harness.io/article/5ww21ewdt8-configure-delegate-proxy-settings

apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    harness.io/name: delegate-del
  name: delegate-del
  namespace: harness-delegate-ng
spec:
  replicas: 1
  selector:
    matchLabels:
      harness.io/name: delegate-del
  template:
    metadata:
      labels:
        harness.io/name: delegate-del
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3460"
        prometheus.io/path: "/api/metrics"
    spec:
      terminationGracePeriodSeconds: 600
      restartPolicy: Always
      containers:
      - image: harness/delegate:22.11.77435
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
            name: delegate-del-account-token
        env:
        - name: JAVA_OPTS
          value: "-Xms64M"
        - name: ACCOUNT_ID
          value: gVcEoNyqQNKbigC_hA3JqA
        - name: MANAGER_HOST_AND_PORT
          value: https://app.harness.io/gratis
        - name: DEPLOY_MODE
          value: KUBERNETES
        - name: DELEGATE_NAME
          value: delegate-del
        - name: DELEGATE_TYPE
          value: "KUBERNETES"
        - name: DELEGATE_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        - name: INIT_SCRIPT
          value: ""
        - name: DELEGATE_DESCRIPTION
          value: ""
        - name: DELEGATE_TAGS
          value: ""
        - name: NEXT_GEN
          value: "true"
        - name: CLIENT_TOOLS_DOWNLOAD_DISABLED
          value: "true"
        - name: LOG_STREAMING_SERVICE_URL
          value: "https://app.harness.io/gratis/log-service/"

---

apiVersion: v1
kind: Service
metadata:
  name: delegate-service
  namespace: harness-delegate-ng
spec:
  type: ClusterIP
  selector:
    harness.io/name: delegate-del
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
  name: delegate-del-upgrader-cronjob
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
  name: delegate-del-upgrader-token
  namespace: harness-delegate-ng
type: Opaque
data:
  UPGRADER_TOKEN: "ZjQ0MzZkNTRmZmQ0MGQxYjYxNGY0OGY5YTUzZGIxZmY="

---

apiVersion: v1
kind: ConfigMap
metadata:
  name: delegate-del-upgrader-config
  namespace: harness-delegate-ng
data:
  config.yaml: |
    mode: Delegate
    dryRun: false
    workloadName: delegate-del
    namespace: harness-delegate-ng
    containerName: delegate
    delegateConfig:
      accountId: gVcEoNyqQNKbigC_hA3JqA
      managerHost: https://app.harness.io/gratis

---

apiVersion: batch/v1
kind: CronJob
metadata:
  labels:
    harness.io/name: delegate-del-upgrader-job
  name: delegate-del-upgrader-job
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
                name: delegate-del-upgrader-token
            volumeMounts:
              - name: config-volume
                mountPath: /etc/config
          volumes:
            - name: config-volume
              configMap:
                name: delegate-del-upgrader-config



Sample Legacy Delegate yaml file

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
  name: del-minikube-proxy
  namespace: harness-delegate-ng
type: Opaque
data:
  # Enter base64 encoded username and password, if needed
  PROXY_USER: ""
  PROXY_PASSWORD: ""

---

apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    harness.io/name: del-minikube
  name: del-minikube
  namespace: harness-delegate-ng
spec:
  replicas: 1
  podManagementPolicy: Parallel
  selector:
    matchLabels:
      harness.io/name: del-minikube
  serviceName: ""
  template:
    metadata:
      labels:
        harness.io/name: del-minikube
    spec:
      containers:
      - image: harness/delegate:latest
        imagePullPolicy: Always
        name: harness-delegate-instance
        ports:
          - containerPort: 8080
        resources:
          limits:
            cpu: "0.5"
            memory: "2048Mi"
          requests:
            cpu: "0.5"
            memory: "2048Mi"
        readinessProbe:
          exec:
            command:
              - test
              - -s
              - delegate.log
          initialDelaySeconds: 20
          periodSeconds: 10
        livenessProbe:
          exec:
            command:
              - bash
              - -c
              - '[[ -e /opt/harness-delegate/msg/data/watcher-data && $(($(date +%s000) - $(grep heartbeat /opt/harness-delegate/msg/data/watcher-data | cut -d ":" -f 2 | cut -d "," -f 1))) -lt 300000 ]]'
          initialDelaySeconds: 240
          periodSeconds: 10
          failureThreshold: 2
        env:
        - name: JAVA_OPTS
          value: "-Xms64M"
        - name: ACCOUNT_ID
          value: gVcEoNyqQNKbigC_hA3JqA
        - name: MANAGER_HOST_AND_PORT
          value: https://app.harness.io/gratis
        - name: DEPLOY_MODE
          value: KUBERNETES
        - name: DELEGATE_NAME
          value: del-minikube
        - name: DELEGATE_TYPE
          value: "KUBERNETES"
        - name: DELEGATE_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        - name: INIT_SCRIPT
          value: ""
        - name: DELEGATE_DESCRIPTION
          value: ""
        - name: DELEGATE_TAGS
          value: ""
        - name: NEXT_GEN
          value: "true"
        - name: DELEGATE_TOKEN
          value: 95150ec7fbb4c3fd103666e54c803f7d
        - name: WATCHER_STORAGE_URL
          value: https://app.harness.io/public/free/freemium/watchers
        - name: WATCHER_CHECK_LOCATION
          value: current.version
        - name: DELEGATE_STORAGE_URL
          value: https://app.harness.io
        - name: DELEGATE_CHECK_LOCATION
          value: delegatefree.txt
        - name: HELM_DESIRED_VERSION
          value: ""
        - name: CDN_URL
          value: "https://app.harness.io"
        - name: REMOTE_WATCHER_URL_CDN
          value: "https://app.harness.io/public/shared/watchers/builds"
        - name: JRE_VERSION
          value: 11.0.14
        - name: HELM3_PATH
          value: ""
        - name: HELM_PATH
          value: ""
        - name: KUSTOMIZE_PATH
          value: ""
        - name: KUBECTL_PATH
          value: ""
        - name: POLL_FOR_TASKS
          value: "false"
        - name: ENABLE_CE
          value: "false"
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
              name: del-minikube-proxy
              key: PROXY_USER
        - name: PROXY_PASSWORD
          valueFrom:
            secretKeyRef:
              name: del-minikube-proxy
              key: PROXY_PASSWORD
        - name: GRPC_SERVICE_ENABLED
          value: "true"
        - name: GRPC_SERVICE_CONNECTOR_PORT
          value: "8080"
      restartPolicy: Always

---

apiVersion: v1
kind: Service
metadata:
  name: delegate-service
  namespace: harness-delegate-ng
spec:
  type: ClusterIP
  selector:
    harness.io/name: del-minikube
  ports:
    - port: 8080

```

### For more information

* To add a custom toolset to a delegate image at runtime, see [Install delegates with third-party tools](https://developer.harness.io/docs/platform/Delegates/delegate-guide/install-delegates-with-third-party-tools).
* To build delegate images with a custom toolset, see [Build custom images with third-party tools](https://developer.harness.io/docs/platform/delegates/delegate-guide/build-custom-delegate-images-with-third-party-tools/).
* To find out about versions of the tools that are included on delegate images and how you can customize them, see [Install a delegate with third-party tool custom binaries](https://developer.harness.io/docs/platform/Delegates/delegate-guide/install-a-delegate-with-3-rd-party-tool-custom-binaries).

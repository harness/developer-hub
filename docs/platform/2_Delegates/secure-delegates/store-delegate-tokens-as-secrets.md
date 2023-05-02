---
title: Store delegate tokens as Kubernetes secrets
description: How to store delegate tokens as Kubernetes secrets
# sidebar_position: 20
---

You can store your delegate tokens as a Kubernetes secret instead of a ConfigMap. 

To store the delegate token as a Kubernetes secret:

1. Create a Kubernetes secret. For  details, go to the Kubernetes documentation: [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/).
2. Create a delegate-token.yaml file.

   ```yaml
   apiVersion: v1
   kind: Secret
     metadata:
     name: token-secret
     namespace: harness-delegate-ng
     type: Opaque
   stringData:
   DELEGATE_TOKEN: <Delegate-token-value>
   ```

3. Run the following to apply the YAML file.

   ```
   kubectl -f delegate-token.yaml
   ```

4. Modify the delegate.yaml file to provide the reference to the secret you created.

   ```yaml
   - name: DELEGATE_TOKEN
     valueFrom:
       secretKeyRef:
         name: token-secret
         key: DELEGATE_TOKEN
   ```


### Sample delegate.yaml file

```yaml
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
 name: k8s-delegate-secret-token-new-two-proxy
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
   harness.io/name: k8s-delegate-secret-token-new-two
 name: k8s-delegate-secret-token-new-two
 namespace: harness-delegate-ng
spec:
 replicas: 1
 podManagementPolicy: Parallel
 selector:
   matchLabels:
     harness.io/name: k8s-delegate-secret-token-new-two
 serviceName: ""
 template:
   metadata:
     labels:
       harness.io/name: k8s-delegate-secret-token-new-two
   spec:
     containers:
     - image: harness/delegate-immutable:22.10.77021
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
         value: k8s-delegate-secret-token-new-two
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
         valueFrom:
           secretKeyRef:
             name: token-secret
             key: DELEGATE_TOKEN
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
             name: k8s-delegate-secret-token-new-two-proxy
             key: PROXY_USER
       - name: PROXY_PASSWORD
         valueFrom:
           secretKeyRef:
             name: k8s-delegate-secret-token-new-two-proxy
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
   harness.io/name: k8s-delegate-secret-token-new-two
 ports:
   - port: 8080
```

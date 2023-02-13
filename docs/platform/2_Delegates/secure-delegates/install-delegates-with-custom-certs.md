---
title: Install delegates with custom certificates
description: How to install delegates with custom certificates.
---

This document explains how to install delegates with custom certificates. This process applies to delegates that deploy from immutable images:

- Create a custom truststore.
- Create a secret.
- Add a volume mount to the harness-delegate.yaml file.

For information on best practices for truststore creation, see [Java Keystore Best Practices](https://myarch.com/cert-book/keystore_best_practices.html).

## Create a custom truststore

For instructions on how to create a custom truststore, see [Truststore Override for Delegates](/docs/platform/delegates/secure-delegates/trust-store-override-for-delegates/).

## Create a secret from a truststore file

Use your custom truststore to create a secret:

```
kubectl create secret -n harness-delegate-ng generic mysecret --from-file harness_trustStore.jks=harness_trustStore.jks
```

## Add a volume mount to the harness-delegate.yaml file

1. Modify the harness-delegate.yaml file to include a volume mount. 

2. Set the security context to provide the operator access to the mounted files:

   ```
   securityContext:
     fsGroup: 1001
   ```

3. Update the `JAVA_OPTS` environment variable with information about your custom truststore:

   ```
   - name: JAVA_OPTS
     value: "... -Djavax.net.ssl.trustStore=/cacerts/harness_trustStore.jks -Djavax.net.ssl.trustStorePassword=password"
   ```
   
   Replace the password placeholder with the password you gave your truststore.

   :::note  
   You can omit the specification of the `JAVA_OPTS` environment variable if you mount the secret to the same location as the default truststore and give it the same name. The JVM then applies the change automatically.
   :::
   
4. Add the volume mount with read-only permission:
 
   ```
        volumeMounts:
        - mountPath: /cacerts
          name: custom-truststore
          readOnly: true
      volumes:
      - name: custom-truststore
        secret:
          secretName: mysecret
          defaultMode: 400
   ```
   
## Example harness-delegate.yaml

The following example harness-delegate.yaml includes the changes required to install an immutable delegate with a custom certificate.

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
  name: my-secret-account-token
  namespace: harness-delegate-ng
type: Opaque
data:
  ACCOUNT_SECRET: "XXXXXXXXXXXXxxxxxxxxxxx="

---

# To learn how to proxy a delegate, see the instructions on Harness Developer Hub:
# https://developer.harness.io/docs/platform/delegates/configure-delegates/configure-delegate-proxy-settings/

apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    harness.io/name: my-secret
  name: my-secret
  namespace: harness-delegate-ng
spec:
  replicas: 1
  selector:
    matchLabels:
      harness.io/name: my-secret
  template:
    metadata:
      labels:
        harness.io/name: my-secret
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3460"
        prometheus.io/path: "/api/metrics"
    spec:
      terminationGracePeriodSeconds: 600
      restartPolicy: Always
      securityContext:
        fsGroup: 1001
      containers:
      - image: harness/delegate-immutable:22.07.75836.minimal
        imagePullPolicy: Always
        name: delegate
        ports:
          - containerPort: 8080
        resources:
          limits:
            cpu: "0.5"
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
            name: my-secret-account-token
        env:
        - name: JAVA_OPTS
          value: "-Xms64M -Djavax.net.ssl.trustStore=/cacerts/harness_trustStore.jks -Djavax.net.ssl.trustStorePassword=mypassword"
        - name: ACCOUNT_ID
          value: XXXXXxxxxxx
        - name: MANAGER_HOST_AND_PORT
          value: https://qa.harness.io/gratis
        - name: DEPLOY_MODE
          value: KUBERNETES
        - name: DELEGATE_NAME
          value: my-secret
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
          value: "https://qa.harness.io/gratis/log-service/"
        volumeMounts:
        - mountPath: /cacerts
          name: custom-keystore
          readOnly: true
      volumes:
      - name: custom-keystore
        secret:
          secretName: myjks
          defaultMode: 400

---

apiVersion: v1
kind: Service
metadata:
  name: delegate-service
  namespace: harness-delegate-ng
spec:
  type: ClusterIP
  selector:
    harness.io/name: my-secret
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
  name: my-secret-upgrader-cronjob
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
  name: my-secret-upgrader-token
  namespace: harness-delegate-ng
type: Opaque
data:
  UPGRADER_TOKEN: "XXXXXXXXXXXXxxxxxxxxxxx"

---

apiVersion: v1
kind: ConfigMap
metadata:
  name: my-secret-upgrader-config
  namespace: harness-delegate-ng
data:
  config.yaml: |
    mode: Delegate
    dryRun: false
    workloadName: my-secret
    namespace: harness-delegate-ng
    containerName: delegate
    delegateConfig:
      accountId: XXXXXXXXxxxxxxxx
      managerHost: https://qa.harness.io/gratis

---

apiVersion: batch/v1beta1
kind: CronJob
metadata:
  labels:
    harness.io/name: my-secret-upgrader-job
  name: my-secret-upgrader-job
  namespace: harness-delegate-ng
spec:
  schedule: "0 */1 * * *"
  concurrencyPolicy: Forbid
  startingDeadlineSeconds: 20
  jobTemplate:
    spec:
      suspend: true
      template:
        spec:
          serviceAccountName: upgrader-cronjob-sa
          restartPolicy: Never
          containers:
          - image: us.gcr.io/qa-target/upgrader:1.0.0
            name: upgrader
            imagePullPolicy: Always
            envFrom:
            - secretRef:
                name: my-secret-upgrader-token
            volumeMounts:
              - name: config-volume
                mountPath: /etc/config
          volumes:
            - name: config-volume
              configMap:
                name: my-secret-upgrader-config

```

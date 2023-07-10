---
title: Install delegates with custom certificates
description: How to install delegates with custom certificates.
# sidebar_position: 10
---

This topic explains how to install delegates with custom certificates. There are two aspects of custom certificates:
1. A certificate for the delegate Java process, which makes connections to external systems.
2. A certificate for the OS itself. With this certificate, if another process, such as a shell script, is spawned, it can access custom certificates.

In this topic we will do the following:

- Create a custom truststore.
- Create a secret.
- Add a volume mount to the `harness-delegate.yaml` file and provide it to the delegate Java process.
- Add a volume mount to the `harness-delegate.yaml` file and configure the delegate container OS to have the certificates.

:::important note
Harness recommends that you keep your existing Java KeyStore in place during the installation process. Updating the KeyStore may cause issues with your delegate.
:::

For information on best practices for truststore creation, go to [Java Keystore Best Practices](https://myarch.com/cert-book/keystore_best_practices.html).

## Create a custom truststore

For instructions on how to create a custom truststore, go to [Truststore override for delegates](/docs/platform/delegates/secure-delegates/trust-store-override-for-delegates/).

## Create a secret from a truststore file

Use your custom truststore to create a secret:

```
kubectl create secret -n harness-delegate-ng generic mysecret --from-file harness_trustStore.jks=harness_trustStore.jks
```

## Add a volume mount to the harness-delegate.yaml file

1. Modify the `harness-delegate.yaml` file to include a volume mount. 

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

   :::info note  
   You can omit the specification of the `JAVA_OPTS` environment variable if you mount the secret to the same location as the default truststore and give it the same name. The JVM then applies the change automatically.
   :::
   
4. Add the volume mount with read-only permission:
 
   ```yaml
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
This concludes adding the certificates to the delegate process. 

## Add custom certificates to the delegate pod

In this section we will cover how to add certificates to the delegate pod so any command running on it has certificates installed. Let's take an example where you have `cert1.crt` and `cert2.crt` files that have custom certificates. Please note that it's not a necessary step if you do not intend to run commands directly on the pod that needs certificates to connect to external systems. 

1. Mount these certificates to the delegate pod at `/etc/pki/ca-trust/source/anchors/`:

   ```yaml
        volumeMounts:
        - name: certs
          mountPath : "/usr/local/share/ca-certificates/cert1.crt"
          subPath: cert1.crt
        - name: certs
          mountPath : "/usr/local/share/ca-certificates/cert2.crt"
          subPath: cert2.crt
   ```
2. Run `update-ca-trust` using `INIT_SCRIPTS`:
   ```
        - name: INIT_SCRIPT
          value: |-
            update-ca-trust
   ```
   :::info note
   The delegate must be the root user.
   :::
   
   ```
        securityContext:
          allowPrivilegeEscalation: false
          runAsUser: 0
   ```
## Example `harness-delegate.yaml` file

The following example `harness-delegate.yaml` file includes the changes required to install a delegate with a custom certificate.

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
  name: my-secret-account-token
  namespace: harness-delegate-ng
type: Opaque
data:
  ACCOUNT_SECRET: "XXXXXXXXXXXXXXXXXXXXXXXX"

---

# To learn how to proxy a delegate, go to [Configure delegate proxy settings](/docs/platform/2_Delegates/manage-delegates/configure-delegate-proxy-settings/)

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
        allowPrivilegeEscalation: false
        runAsUser: 0
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
          value: |-
            update-ca-trust
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
        - name: certs
          mountPath : "/usr/local/share/ca-certificates/cert1.crt"
          subPath: cert1.crt
        - name: certs
          mountPath : "/usr/local/share/ca-certificates/cert2.crt"
          subPath: cert2.crt             
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
  UPGRADER_TOKEN: "XXXXXXXXXXXXXXXXXXXXXXXX"

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
      accountId: XXXXXXXXXXXXXXXXXXXXXXXX
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

---
title: Install delegates with custom certificates
description: How to install delegates with custom certificates.
# sidebar_position: 10
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This topic explains how to install Kubernetes, Docker, and Helm delegates with custom certificates.

:::info caution

The installation steps are different depending on your delegate version.

If your delegate with an immutable image type version is later than 81202 (image tag 23.10.81202), go to [Install with custom certificates](#installation-with-custom-certificates). 

If your delegate with an immutable image type version is earlier than 81202 (image tag 23.10.81202), go to [Install with custom truststore](#install-with-custom-truststore).

For information on delegate types, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

:::

## Install with custom certificates

Use the steps below to install custom certificates for a Docker, Kubernetes, or Helm delegate with an an immutable image type version later than 23.10.81202.

import Addperm from '/docs/platform/shared/delegate-additional-permissions.md'

<Addperm />

```mdx-code-block
<Tabs>
  <TabItem value="docker" label="Docker delegate" default>
```

To install a Docker delegate with custom certificates, do the following:

1. Prepare the custom cert file(s).

   :::info note
   Certificates must be PEM format.

   :::

2. Mount the file(s) to the `/opt/harness-delegate/ca-bundle/` directory inside the delegate container.

3. Start the delegate with the root user.

   **Example: Mount custom certs from a folder**

   ```
   docker run --cpus=1 -u root --memory=2g \
     -v PUT_YOUR_PATH_TO_FOLDER_OF_CUSTOM_CERTS:/opt/harness-delegate/ca-bundle \
     -e DELEGATE_NAME=PUT_YOUR_DELEGATE_NAME \
     -e NEXT_GEN="true" \
     -e DELEGATE_TYPE="DOCKER" \
     -e ACCOUNT_ID=PUT_YOUR_HARNESS_ACCOUNTID_HERE \
     -e DELEGATE_TOKEN=PUT_YOUR_HARNESS_ACCOUNTID_HERE \
     -e LOG_STREAMING_SERVICE_URL=PUT_YOUR_MANAGER_HOST_AND_PORT_HERE/log-service/ \
     -e MANAGER_HOST_AND_PORT=PUT_YOUR_MANAGER_HOST_AND_PORT_HERE  harness/delegate:yy.mm.verno
   ```

   **Example: Mount a single custom cert or a CA bundle file**

   ```
   docker run --cpus=1 -u root --memory=2g \
     -v PUT_YOUR_PATH_TO_CUSTOM_CERT:/opt/harness-delegate/ca-bundle/abc.pem \
     -e DELEGATE_NAME=PUT_YOUR_DELEGATE_NAME \         
     -e NEXT_GEN="true" \
     -e DELEGATE_TYPE="DOCKER" \
     -e ACCOUNT_ID=PUT_YOUR_HARNESS_ACCOUNTID_HERE \
     -e DELEGATE_TOKEN=PUT_YOUR_HARNESS_ACCOUNTID_HERE \
     -e LOG_STREAMING_SERVICE_URL=PUT_YOUR_MANAGER_HOST_AND_PORT_HERE/log-service/ \
     -e MANAGER_HOST_AND_PORT=PUT_YOUR_MANAGER_HOST_AND_PORT_HERE  harness/delegate:yy.mm.verno
   ```

```mdx-code-block
  </TabItem>
  <TabItem value="k8s" label="Kubernetes delegate">
```

To install a Kubernetes delegate with custom certificates, do the following:

1. Create a Kubernetes secret with the custom cert file.

   ```
   kubectl create secret -n harness-delegate-ng generic mycerts --from-file custom_certs.pem=custom_certs.pem
   ```

2. Modify the `harness-delegate.yaml` file to include a volume mount. Mount the secret to the `/opt/harness-delegate/ca-bundle/` directory.

   ```yaml
        volumeMounts:
        - mountPath: /opt/harness-delegate/ca-bundle/
          name: custom-certs
          readOnly: true
      volumes:
      - name: custom-certs
        secret:
          secretName: mycerts
          defaultMode: 400
   ```

3. Set the security context to provide operator access to the mounted files.

   ```yaml
   securityContext:
     fsGroup: 1001
   ```

4. Use the root user.

   ```yaml
        securityContext:
          allowPrivilegeEscalation: false
          runAsUser: 0
   ```

#### Kubernetes delegate with custom certificates YAML example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
   labels:
      harness.io/name: kubernetes-delegate
   name: kubernetes-delegate
   namespace: harness-delegate-ng
spec:
   replicas: 1
   minReadySeconds: 120
   selector:
      matchLabels:
         harness.io/name: kubernetes-delegate
   template:
      metadata:
         labels:
            harness.io/name: kubernetes-delegate
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
            - image: harness/delegate:yy.mm.verno
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
                 failureThreshold: 3
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
                      name: kubernetes-delegate-account-token
              env:
                 - name: JAVA_OPTS
                   value: "-Xms64M"
                 - name: ACCOUNT_ID
                   value: PUT_YOUR_HARNESS_ACCOUNTID_HERE
                 - name: MANAGER_HOST_AND_PORT
                   value: PUT_YOUR_MANAGER_HOST_AND_PORT_HERE
                 - name: DEPLOY_MODE
                   value: KUBERNETES
                 - name: DELEGATE_NAME
                   value: kubernetes-delegate
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
                   value: "PUT_YOUR_MANAGER_HOST_AND_PORT_HERE/log-service/"
                 - name: DELEGATE_RESOURCE_THRESHOLD
                   value: ""
                 - name: DYNAMIC_REQUEST_HANDLING
                   value: "false"
              volumeMounts:
                 - mountPath: /opt/harness-delegate/ca-bundle/
                   name: custom-certs
                   readOnly: true
         volumes:
            - name: custom-certs
              secret:
                 secretName: mycerts
                 defaultMode: 400
```

#### Add self-signed certificates to delegate upgrader

For Kubernetes delegates, Harness supports self-signed certificates for delegate upgrader. For more information on delegate upgrades, go to [Delegate automatic upgrades and expiration policy](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/).

To add self-signed certificates for delegate upgrader, do the following:

1. In the delegate YAML file, mount the certificates in `/ca-bundle`.
2. Add the `securityContext` to the upgrader cron job.

   ```yaml
   apiVersion: batch/v1
   kind: CronJob
   metadata:
     labels:
       harness.io/name: kubernetes-delegate-upgrader-job
     name: kubernetes-delegate-upgrader-job
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
             securityContext:
                fsGroup: 1001
             containers:
             - image: harness/upgrader:latest
               name: upgrader
               imagePullPolicy: Always
               envFrom:
               - secretRef:
                   name: kubernetes-delegate-upgrader-token
               volumeMounts:
                 - mountPath: /ca-bundle
                   name: custom-certs
                   readOnly: true
             volumes:
               - name: custom-certs
                 secret:
                   secretName: new-secret
                   defaultMode: 400
      ```

```mdx-code-block
  </TabItem>
  <TabItem value="helm" label="Helm delegate">
```

1. Create a Kubernetes secret with the custom cert file.

   ```
   kubectl create secret -n harness-delegate-ng generic mycerts --from-file custom_certs.pem=custom_certs.pem
   ```

2. Run the following to set the `delegateCustomCa.secretName` variable when you install the Helm chart.

   ```
   --set delegateCustomCa.secretName=<SECRET_NAME>
   ```

   This adds your volume mount to the `/opt/harness-delegate/ca-bundle/` directory.

#### Add self-signed certificates to delegate upgrader

For Helm delegates, Harness supports self-signed certificates for delegate upgrader. For more information on delegate upgrades, go to [Delegate automatic upgrades and expiration policy](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/).

To add self-signed certificates for delegate upgrader, do the following:

1. Create a Kubernetes secret with the custom cert file.

   ```
   kubectl create secret -n harness-delegate-ng generic mycerts --from-file custom_certs.pem=custom_certs.pem
   ```

2. Run the following to set the `upgraderCustomCa.secretName` variable when you install the Helm chart.

   ```
   --set upgraderCustomCa.secretName=<SECRET_NAME> 
   ```

   This adds your volume mount to the `/ca-bundle` directory.

```mdx-code-block
  </TabItem>
</Tabs>
```

## Install with custom truststore

Harness Delegate ships with a Java Runtime Environment (JRE) that includes a default trusted certificate in its [truststore](https://docs.oracle.com/cd/E19830-01/819-4712/ablqw/index.html) located in the `/opt/java/openjdk/lib/security/cacerts` directory. This truststore uses multiple trusted certificates. You can limit the number you use based on your company's security protocols.

The JRE truststore must include the certificate that delegates require to establish trust with Harness (app.harness.io).

Command-line tools use truststore from the underlying Red Hat operating system.

Use the steps below to install custom certificates for a Docker or Kubernetes delegate with an an immutable image type version earlier than 23.10.81202.

There are two aspects of custom certificates:

1. A certificate for the delegate Java process, which makes connections to external systems.

2. A certificate for the OS itself. With this certificate, if another process, such as a shell script, is spawned, it can access custom certificates.

In this topic, we will do the following:

- Create a custom truststore.
- Create a secret.
- Add a volume mount to the `harness-delegate.yaml` file and provide it to the delegate Java process.
- Add a volume mount to the `harness-delegate.yaml` file and configure the delegate container OS to have the certificates.

:::important note
Harness recommends that you keep your existing Java KeyStore in place during the installation process. Updating the KeyStore may cause issues with your delegate.
:::

For information on best practices for truststore creation, go to [Java Keystore Best Practices](https://myarch.com/cert-book/keystore_best_practices.html).

### Create a custom truststore

1. Prepare the custom cert file(s).

   :::info note
   Certificates must be PEM format.

   :::

2. (Optional) Get a base truststore file from a running delegate instance.

   **Kubernetes delegate** 

   ```
   kubectl cp -n harness-delegate-ng [pod name]:/opt/java/openjdk/lib/security/cacerts Path/to/destination
   ```

   **Docker delegate**

   ```
   docker cp [container id]:/opt/java/openjdk/lib/security/cacerts Path/to/destination
   ```

3. Import custom certs into the Java truststore.

   a. Split the certificates into individual files if the custom cert file contains multiple certificates.

   b. Run the _keytool_ command below for each certificate file to import them.

      ```
      keytool -noprompt -import -trustcacerts -file [cer file] -alias [unique alias] -keystore [path to trust store] -storepass [password]
      ```

   c. Replace the password placeholder with the password you gave your truststore.

   d. Use a unique alias for all imports.
   
### Install truststore and custom certs

After the truststore file and custom certificates are configured, you're ready to install them in a Kubernetes or Docker delegate.

```mdx-code-block
<Tabs>
  <TabItem value="docker" label="Docker delegate" default>
```

1. Mount the truststore file to the delegate container.
2. Mount the custom certificates to the `/etc/pki/ca-trust/source/anchors/` directory.
3. Run the delegate container with the root user.
4. Add `update-ca-trust` to `INIT_SCRIPT`.

   **Example command**

   ```
   docker run --cpus=1 --memory=2g -u root \
     -v PUT_YOUR_PATH_TO_CUSTOM_CERT:/etc/pki/ca-trust/source/anchors/ca1.pem \
     -v ... repeat for every custom cert ... \
     -v PUT_YOUR_PATH_TO_TRUSTSTORE:/cacerts/harness_trustStore.jks \
     -e JAVA_OPTS="... -Djavax.net.ssl.trustStore=/cacerts/harness_trustStore.jks -Djavax.net.ssl.trustStorePassword=password" \
     -e INIT_SCRIPT="update-ca-trust" \
     -e DELEGATE_NAME=PUT_YOUR_DELEGATE_NAME \
     -e NEXT_GEN="true" \
     -e DELEGATE_TYPE="DOCKER" \
     -e ACCOUNT_ID=PUT_YOUR_HARNESS_ACCOUNTID_HERE \
     -e DELEGATE_TOKEN=PUT_YOUR_HARNESS_ACCOUNTID_HERE \
     -e LOG_STREAMING_SERVICE_URL=PUT_YOUR_MANAGER_HOST_AND_PORT_HERE/log-service/ \
     -e MANAGER_HOST_AND_PORT=PUT_YOUR_MANAGER_HOST_AND_PORT_HERE  harness/delegate:yy.mm.verno
   ```

```mdx-code-block
  </TabItem>
  <TabItem value="k8s" label="Kubernetes delegate">
```

1. Use your custom truststore to create a secret.

   ```
   kubectl create secret -n harness-delegate-ng generic mysecret --from-file harness_trustStore.jks=harness_trustStore.jks
   ```

2. Add a volume mount with read-only permission to the `harness-delegate.yaml` file.

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

3. Set the security context to provide the operator access to the mounted files.

   ```yaml
   securityContext:
     fsGroup: 1001
   ```

4. Update the `JAVA_OPTS` environment variable with information about your custom truststore.

   ```yaml
   - name: JAVA_OPTS
     value: "... -Djavax.net.ssl.trustStore=/cacerts/harness_trustStore.jks -Djavax.net.ssl.trustStorePassword=YOUR_PASSWORD"
   ```
   
5. Replace the password placeholder with the password you used in your truststore.

   :::info note  
   You can omit the specification of the `JAVA_OPTS` environment variable if you mount the secret to the same location as the default truststore and give it the same name. The JVM then applies the change automatically.
   :::

### Add custom certificates to the delegate pod 

You can add certificates to the delegate pod so any command running on the pod has certificates installed.

:::info note
Please note that it's not a necessary step if you do not intend to run commands directly on the pod that needs certificates to connect to external systems.
:::

In this example, we'll use `cert1.crt` and `cert2.crt` files that have custom certificates.

1. Mount the certificates to the delegate pod in the `/etc/pki/ca-trust/source/anchors/` directory.

   ```yaml
        volumeMounts:
        - name: certs
          mountPath : "/etc/pki/ca-trust/source/anchors/cert1.crt"
          subPath: cert1.crt
        - name: certs
          mountPath : "/etc/pki/ca-trust/source/anchors/cert2.crt"
          subPath: cert2.crt
   ```

2. Run `update-ca-trust` using `INIT_SCRIPT`.
   
   ```yaml
        - name: INIT_SCRIPT
          value: |-
            update-ca-trust
   ```

   :::info note
   The delegate must be the root user.
   :::
   
   ```yaml
        securityContext:
          allowPrivilegeEscalation: false
          runAsUser: 0
   ```

### Kubernetes delegate with truststore YAML example

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

# To learn how to proxy a delegate, go to [Configure delegate proxy settings](/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings/)

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

```mdx-code-block
  </TabItem>
</Tabs>
```

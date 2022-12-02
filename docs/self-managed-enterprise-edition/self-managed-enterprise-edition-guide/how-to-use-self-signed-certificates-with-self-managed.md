---
title: How to use self-signed certificates with Self-Managed Enterprise Edition
description: Self-Managed Enterprise Edition supports authorization by self-signed certificate. This document explains how to modify the delegate truststore to generate self-signed certificates.
# sidebar_position: 2
helpdocs_topic_id: h0yo0jwuo9
helpdocs_category_id: 75ydek1suj
helpdocs_is_private: false
helpdocs_is_published: true
---

Applies to Helm-based installation

Harness Self-Managed Enterprise Edition supports authorization by self-signed certificate. This document explains how to modify the delegate truststore for the use of self-signed certificates in the self-managed environment. 

Harness Delegate makes outbound connections to the resources you specify—for example, artifact servers and verification providers. These services typically use public certificates that are included in the operating system or the JRE. The self-signed certificates that you use, however, must be added to the delegate. The process that this document describes is supported for use with the legacy delegate in combination with the Harness CD, CI and STO modules. 

**IMPORTANT**

* For Golang 1.15 and later, the self-signed certificate must include a Subject Alternative Name (SAN). For more information, see the JFrog [knowledge base](https://jfrog.com/knowledge-base/general-what-should-i-do-if-i-get-an-x509-certificate-relies-on-legacy-common-name-field-error/).
* For truststores used with Istio, the size of the RSA key must not exceed 2048 bits.

### Create the truststore

1. Generate a self-signed certificate.
2. Save it to a file named DigiCertGlobalRootCA.pem:

   ```
   keytool -import -file DigiCertGlobalRootCA.pem -alias DigiCertRootCA -keystore trustStore.jks
   ```

3. Add the DigiCertGlobalRootCA.pem trusted certificate to the trustStore.jks truststore:

   ```
   kubectl create secret -n harness-delegate-ng generic mysecret --from-file harness_trustStore.jks=trustStore.jks
   ```

Repeat this command for each certificate you want to include in the truststore.

### Create the secret

1. Copy the following YAML to your editor.

   ```
   apiVersion: v1  
   kind: Secret  
   metadata:  
     name: addcerts  
     namespace: harness-delegate-ng  
   type: Opaque  
   stringData:                             
     ca.bundle: |  
       -----BEGIN CERTIFICATE-----  
       XXXXXXXXXXXXXXXXXXXXXXXXXXX  
       -----END CERTIFICATE-------  
       -----BEGIN CERTIFICATE-----  
       XXXXXXXXXXXXXXXXXXXXXXXXXXX  
       -----END CERTIFICATE-------
   ```

2. Add your certificates to the `ca.bundle` field.  

The `XXXXXXXXXXXXXXXXXXXXXXXXXXX` placeholder indicates the position for the certificate body. Enclose each certificate in `BEGIN CERTIFICATE` and `END CERTIFICATE` comments.

3. Save the file as addcerts.yaml. Apply the manifest to your cluster.

   ```
   kubectl apply -f addcerts.yaml
   ```

### Modify the delegate YAML

1. Open the harness-delegate.yml file in your editor.
2. In the `template.spec` section, add the following security context:

   ```
   securityContext:  
     fsGroup: 1001
   ```

3. Locate the `JAVA_OPTS` environment variable. Set `value` as follows.

   ```
   value: "-Xms64M -Djavax.net.ssl.trustStore=/cacerts/harness_trustStore.jks  -Djavax.net.ssl.trustStorePassword=*password*"
   ```

4. Replace *password* with the password you created for the truststore.

   **Skip step 5 if your delegates do not run with Harness CI or STO**

5. CI builds require the addition of the following environment variables to the  `env` field:

   ```
   - name: CI_MOUNT_VOLUMES  
     value: /tmp/ca.bundle:/tmp/ca.bundle,/tmp/ca.bundle:/some/other/path/a.crt,/tmp/ca.bundle:/other/path/b.crt,/tmp/ca.bundle:/path/to/ca.bundle  
   - name: ADDITIONAL_CERTS_PATH  
      value: /tmp/ca.bundle
   ```

6. Locate the template container `spec`. Add the following volume mounts to the `spec.containers` field.

   ```
   volumeMounts:  
   - mountPath: /cacerts  
     name: custom-truststore  
     readOnly: true  
   - name: certvol  
     mountPath: /tmp/ca.bundle  
     subPath: ca.bundle
   ```

7. Locate the template `spec` and add the following volumes:

   ```
   volumes:  
   - name: custom-truststore  
     secret:  
       secretName: mysecret  
       defaultMode: 400  
   - name: certvol  
     secret:  
       secretName: addcerts  
       items:  
       - key: ca.bundle  
         path: ca.bundle  

   ```

**Skip step 8 if your delegates do not run with Istio service mesh**

8. In the `env` list of environment variables, locate and set the `POLL_FOR_TASKS` value to `true`.

   ```
   - name: POLL_FOR_TASKS  
     value: "true"
   ```

This value enables polling for tasks.

9. Save and apply the modified manifest:

   ```
   kubectl apply -f harness-delegate.yml
   ```

### Example: Modified harness-delegate.yml with truststore

The following Kubernetes manifest provides an example of a delegate truststore modified for the generation of self-signed certificates:

Example harness-delegate.yml

```
apiVersion: v1  
kind: Namespace  
metadata:  
 name: harness-delegate-ng  
​  
---  
​  
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
​  
---  
​  
apiVersion: v1  
kind: Secret  
metadata:  
 name: delegatenew-proxy  
 namespace: harness-delegate-ng  
type: Opaque  
data:  
 # Enter base64 encoded username and password, if needed  
 PROXY_USER: ""  
 PROXY_PASSWORD: ""  
​  
---  
​  
apiVersion: apps/v1  
kind: StatefulSet  
metadata:  
 labels:  
   harness.io/name: delegatenew  
 name: delegatenew  
 namespace: harness-delegate-ng  
spec:  
 replicas: 4  
 podManagementPolicy: Parallel  
 selector:  
   matchLabels:  
     harness.io/name: delegatenew  
 serviceName: ""  
 template:  
   metadata:  
     labels:  
       harness.io/name: delegatenew  
   spec:  
     securityContext:  
       fsGroup: 1001  
     containers:  
     - image: docker.io/harness/delegate:latest  
       imagePullPolicy: Always  
       name: harness-delegate-instance  
       ports:  
         - containerPort: 8080  
       resources:  
         limits:  
           cpu: "2"  
           memory: "2048Mi"  
         requests:  
           cpu: "2"  
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
         value: "-Xms64M -Djavax.net.ssl.trustStore=/cacerts/harness_trustStore.jks -Djavax.net.ssl.trustStorePassword=changeit"  
       - name: ACCOUNT_ID  
         value: Sfeh1T94QsyLWatE8unScg  
       - name: MANAGER_HOST_AND_PORT  
         value: https://smp1.qa.harness.io  
       - name: DEPLOY_MODE  
         value: KUBERNETES_ONPREM  
       - name: DELEGATE_NAME  
         value: delegatenew  
       - name: DELEGATE_TYPE  
         value: "KUBERNETES"  
       - name: DELEGATE_NAMESPACE  
         valueFrom:  
           fieldRef:  
             fieldPath: metadata.namespace  
       - name: CI_MOUNT_VOLUMES  
         value: /tmp/ca.bundle:/tmp/ca.bundle,/tmp/ca.bundle:/some/other/path/a.crt,/tmp/ca.bundle:/other/path/b.crt,/tmp/ca.bundle:/path/to/ca.bundle  
       - name: ADDITIONAL_CERTS_PATH  
         value: /tmp/ca.bundle  
       - name: INIT_SCRIPT  
         value: ""  
       - name: DELEGATE_DESCRIPTION  
         value: ""  
       - name: DELEGATE_TAGS  
         value: ""  
       - name: NEXT_GEN  
         value: "true"  
       - name: DELEGATE_TOKEN  
         value: ceb6ce7258713af4be089fdcbc2e2248  
       - name: WATCHER_STORAGE_URL  
         value: https://smp1.qa.harness.io/storage/wingswatchers  
       - name: WATCHER_CHECK_LOCATION  
         value: watcherprod.txt  
       - name: DELEGATE_STORAGE_URL  
         value: https://smp1.qa.harness.io/storage/wingsdelegates  
       - name: DELEGATE_CHECK_LOCATION  
         value: delegateprod.txt  
       - name: HELM_DESIRED_VERSION  
         value: ""  
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
             name: delegatenew-proxy  
             key: PROXY_USER  
       - name: PROXY_PASSWORD  
         valueFrom:  
           secretKeyRef:  
             name: delegatenew-proxy  
             key: PROXY_PASSWORD  
       - name: GRPC_SERVICE_ENABLED  
         value: "true"  
       - name: GRPC_SERVICE_CONNECTOR_PORT  
         value: "8080"  
       volumeMounts:  
       - mountPath: /cacerts  
         name: custom-truststore  
         readOnly: true  
       - name: certvol  
         mountPath: /tmp/ca.bundle  
         subPath: ca.bundle  
     restartPolicy: Always  
     volumes:  
     - name: custom-truststore  
       secret:  
         secretName: mysecret  
         defaultMode: 400  
     - name: certvol  
       secret:  
         secretName: addcerts  
         items:  
         - key: ca.bundle  
           path: ca.bundle  
​  
---  
​  
apiVersion: v1  
kind: Service  
metadata:  
 name: delegate-service  
 namespace: harness-delegate-ng  
spec:  
 type: ClusterIP  
 selector:  
   harness.io/name: delegatenew  
 ports:  
   - port: 8080  

```

---
title: Example -- harness-delegate.yaml
description: This example harness-delegate.yaml file implements the approach of using the Kubernetes emptyDir object with an initialization ( INIT ) container to move binaries to the delegate image. For more info…
# sidebar_position: 2
helpdocs_topic_id: 2ayo3dqret
helpdocs_category_id: vm60533pvt
helpdocs_is_private: false
helpdocs_is_published: true
---

This example harness-delegate.yaml file implements the approach of using the Kubernetes `emptyDir` object with an initialization (`INIT`) container to move binaries to the delegate image.

For more information, see [Install Delegates with Third-Party Tools](../delegate-guide/install-delegates-with-third-party-tools.md) in the *Delegate Guide*.


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
  name: markom-secret-account-token  
  namespace: harness-delegate-ng  
type: Opaque  
data:  
  ACCOUNT_SECRET: "ZTUzNzllZGUzNjk0ZWVmYTA1N2JmMmI1ZTEzNjQ1YzU="  
  
---  
  
# If delegate needs to use a proxy, please follow instructions available in the documentation  
# https://ngdocs.harness.io/article/5ww21ewdt8-configure-delegate-proxy-settings  
  
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  labels:  
    harness.io/name: markom-secret  
  name: markom-secret  
  namespace: harness-delegate-ng  
spec:  
  replicas: 1  
  selector:  
    matchLabels:  
      harness.io/name: markom-secret  
  template:  
    metadata:  
      labels:  
        harness.io/name: markom-secret  
      annotations:  
        prometheus.io/scrape: "true"  
        prometheus.io/port: "3460"  
        prometheus.io/path: "/api/metrics"  
    spec:  
      terminationGracePeriodSeconds: 600  
      restartPolicy: Always  
      securityContext:  
        fsGroup: 1001  
        runAsUser: 1001  
      containers:  
      - image: harness/delegate:22.07.75836.minimal  
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
            name: markom-secret-account-token  
        env:  
        - name: JAVA_OPTS  
          value: "-Xms64M"  
        - name: ACCOUNT_ID  
          value: D3fzqqYxSmGYPzWMvroIWw  
        - name: MANAGER_HOST_AND_PORT  
          value: https://qa.harness.io/gratis  
        - name: DEPLOY_MODE  
          value: KUBERNETES  
        - name: DELEGATE_NAME  
          value: markom-secret  
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
        - mountPath: /opt/harness-delegate/client-tools  
          name: client-tools  
      initContainers:  
      - name: install-kubectl  
        image: curlimages/curl  
        command: ['sh', '-c', "mkdir -m 777 -p /client-tools/kubectl/v1.13.2 \  
                                && curl -#s -L -o /client-tools/kubectl/v1.13.2/kubectl https://app.harness.io/public/shared/tools/kubectl/release/v1.13.2/bin/linux/amd64/kubectl \  
                                && chmod +x /client-tools/kubectl/v1.13.2/kubectl"]  
        args:  
          - chown 1001 /client-tools;  
        volumeMounts:  
        - mountPath: /client-tools  
          name: client-tools  
      - name: install-helm3  
        image: curlimages/curl  
        command: ['sh', '-c', "mkdir -m 777 -p /client-tools/helm/v3.8.0 \  
                                && curl -#s -L -o /client-tools/helm/v3.8.0/helm https://app.harness.io/public/shared/tools/helm/release/v3.8.0/bin/linux/amd64/helm \  
                                && chmod +x /client-tools/helm/v3.8.0/helm"]  
        args:  
          - chown 1001 /client-tools;  
        volumeMounts:  
        - mountPath: /client-tools  
          name: client-tools  
      volumes:  
      - name: client-tools  
        emptyDir: {}  
  
---  
  
apiVersion: v1  
kind: Service  
metadata:  
  name: delegate-service  
  namespace: harness-delegate-ng  
spec:  
  type: ClusterIP  
  selector:  
    harness.io/name: markom-secret  
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
  name: markom-secret-upgrader-cronjob  
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
  name: markom-secret-upgrader-token  
  namespace: harness-delegate-ng  
type: Opaque  
data:  
  UPGRADER_TOKEN: "ZTUzNzllZGUzNjk0ZWVmYTA1N2JmMmI1ZTEzNjQ1YzU="  
  
---  
  
apiVersion: v1  
kind: ConfigMap  
metadata:  
  name: markom-secret-upgrader-config  
  namespace: harness-delegate-ng  
data:  
  config.yaml: |  
    mode: Delegate  
    dryRun: false  
    workloadName: markom-secret  
    namespace: harness-delegate-ng  
    containerName: delegate  
    delegateConfig:  
      accountId: D3fzqqYxSmGYPzWMvroIWw  
      managerHost: https://qa.harness.io/gratis  
  
---  
  
apiVersion: batch/v1beta1  
kind: CronJob  
metadata:  
  labels:  
    harness.io/name: markom-secret-upgrader-job  
  name: markom-secret-upgrader-job  
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
                name: markom-secret-upgrader-token  
            volumeMounts:  
              - name: config-volume  
                mountPath: /etc/config  
          volumes:  
            - name: config-volume  
              configMap:  
                name: markom-secret-upgrader-config  

```

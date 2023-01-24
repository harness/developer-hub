---
title: Sample harness-delegate.yaml with NFS volume mounted
description: This sample harness-delegate.yaml declares a mounted NFS volume. apiVersion --  v1 kind --  Namespace metadata --  name --  harness-delegate-ng --- apiVersion --  rbac.authorization.k8s.io/v1 kind --  ClusterRoleBindi…
# sidebar_position: 2
helpdocs_topic_id: hipzqa4ntk
helpdocs_category_id: vm60533pvt
helpdocs_is_private: false
helpdocs_is_published: true
---

This sample harness-delegate.yaml declares a mounted NFS volume.


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
        - mountPath: "/opt/harness-delegate/client-tools"  
          name: nfs  
      volumes:  
      - name: nfs  
        persistentVolumeClaim:  
          claimName: nfs-ng  
  
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

```

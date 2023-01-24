---
title: Example Kubernetes manifest for Harness Delegate
description: The following provides an example of a Kubernetes manifest used to configure Harness Delegate. apiVersion --  v1 kind --  Namespace metadata --  name --  harness-delegate-ng --- apiVersion --  rbac.authorization.k8…
# sidebar_position: 2
helpdocs_topic_id: cjtk5rw8z4
helpdocs_category_id: vm60533pvt
helpdocs_is_private: false
helpdocs_is_published: true
---

The following provides an example of a Kubernetes manifest used to configure Harness Delegate.

`apiVersion: v1`

`kind: Namespace`

`metadata:`

`name: harness-delegate-ng`

`---`

`apiVersion: rbac.authorization.k8s.io/v1`

`kind: ClusterRoleBinding`

`metadata:`

`name: harness-delegate-ng-cluster-admin`

`subjects:`

`- kind: ServiceAccount`

`name: default`

`namespace: harness-delegate-ng`

`roleRef:`

`kind: ClusterRole`

`name: cluster-admin`

`apiGroup: rbac.authorization.k8s.io`

`---`

`apiVersion: v1`

`kind: Secret`

`metadata:`

`name: immutable-delegate-account-token`

`namespace: harness-delegate-ng`

`type: Opaque`

`data:`

`ACCOUNT_SECRET: <base64 encoded value for account secret>`

`---`

`# If delegate needs to use a proxy, please follow instructions available in the documentation`

`# https://ngdocs.harness.io/article/5ww21ewdt8-configure-delegate-proxy-settings`

`apiVersion: apps/v1`

`kind: Deployment`

`metadata:`

`labels:`

`harness.io/name: <delegate name>`

`name: <delegate name>`

`namespace: harness-delegate-ng`

`spec:`

`replicas: 2`

`selector:`

`matchLabels:`

`harness.io/name: <delegate name>`

`template:`

`metadata:`

`labels:`

`harness.io/name: <delegate name>`

`annotations:`

`prometheus.io/scrape: "true"`

`prometheus.io/port: "3460"`

`prometheus.io/path: "/api/metrics"`

`spec:`

`terminationGracePeriodSeconds: 600`

`restartPolicy: Always`

`containers:`

`- image: <immutable delegate image>`

`imagePullPolicy: Always`

`name: delegate`

`ports:`

`- containerPort: 8080`

`resources:`

`limits:`

`cpu: "0.5"`

`memory: "2048Mi"`

`requests:`

`cpu: "0.5"`

`memory: "2048Mi"`

`livenessProbe:`

`httpGet:`

`path: /api/health`

`port: 3460`

`scheme: HTTP`

`initialDelaySeconds: 120`

`periodSeconds: 10`

`failureThreshold: 2`

`envFrom:`

`- secretRef:`

`name: immutable-delegate-account-token`

`env:`

`- name: JAVA_OPTS`

`value: "-Xms64M"`

`- name: ACCOUNT_ID`

`value: <account id>`

`- name: MANAGER_HOST_AND_PORT`

`value: <https://app.harness.io OR https://app.harness.io/gratis>`

`- name: DEPLOY_MODE`

`value: KUBERNETES`

`- name: DELEGATE_NAME`

`value: <delegate name>`

`- name: DELEGATE_TYPE`

`value: "KUBERNETES"`

`- name: DELEGATE_NAMESPACE`

`valueFrom:`

`fieldRef:`

`fieldPath: metadata.namespace`

`- name: INIT_SCRIPT`

`value: ""`

`- name: DELEGATE_DESCRIPTION`

`value: ""`

`- name: DELEGATE_TAGS`

`value: ""`

`- name: DELEGATE_ORG_IDENTIFIER`

`value: ""`

`- name: DELEGATE_PROJECT_IDENTIFIER`

`value: ""`

`- name: NEXT_GEN`

`value: "true"`

`- name: CLIENT_TOOLS_DOWNLOAD_DISABLED`

`value: "true"`

`- name: LOG_STREAMING_SERVICE_URL`

`value: "https://app.harness.io/log-service/ OR https://app.harness.io/gratis/log-service/"`

`---`

`apiVersion: v1`

`kind: Service`

`metadata:`

`name: delegate-service`

`namespace: harness-delegate-ng`

`spec:`

`type: ClusterIP`

`selector:`

`harness.io/name: <delegate name>`

`ports:`

`- port: 8080`

  
  



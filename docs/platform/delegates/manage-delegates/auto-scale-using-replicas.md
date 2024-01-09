---
title: Autoscale using replicas
description: This topic describes autoscaling Harness Delegate using replicas.
sidebar_position: 6
---

Harness Delegates are responsible for executing various types of workloads, and the amount of resources consumed depends on the specific type of workload being performed. Harness cannot predict the specific resource requirements for a particular workload in advance. Autoscaling Harness Delegate using replicas is a useful feature that can help ensure your deployments are executed efficiently, without downtime or resource overload.

## Enable the dynamic threshold for delegate resources

You can set the delegate to reject new tasks if x% of memory is being consumed. You can then spin up new delegates when resources are above the threshold. For more information, go to [Configure delegate resource threshold](/docs/platform/delegates/manage-delegates/delegate-metrics/#configure-delegate-resource-threshold).

## Configure Harness Delegate autoscaling using replicas for Helm chart deployments

To access the default Helm chart for the `values.yaml` file, go to [Harness Delegate Helm chart](https://github.com/harness/delegate-helm-chart/blob/main/harness-delegate-ng/values.yaml).

:::info note
You can also update the Harness Delegate YAML file in addition to the Helm chart.
:::

To auto scale the delegate, do the following:

1. In your `values.yaml` file, go to `autoscaling` parameters.

   ```yaml
   autoscaling:
     enabled: false
     minReplicas: 1
     maxReplicas: 10
     targetCPUUtilizationPercentage: 80
     # targetMemoryUtilizationPercentage: 80
   ```

2. Set `enabled` to `true`.

3. Specify the minimum and maximum number of replicas you want to use in the `minReplicas` and `maxReplicas` parameters.

   To fine-tune your autoscaling, you can set the `targetCPUUtilizationPercentage` to add a new replica if CPU utilization exceeds this percentage.

4. (Optional) Set the `targetMemoryUtilizationPercentage` to add a new replica if memory utilization exceeds this percentage.

5. Save the file, and restart your pods.

   When you create a deployment, Harness automatically spins up new replicas of your delegate as needed to ensure the deployment is completed.

## Configure Harness Delegate autoscaling using replicas for Kubernetes

The HPA configuration setting is included in the default Kubernetes delegate YAML file. 

To auto scale the delegate, do the following:

1. In your `harness-delegate.yml` file, go to `autoscaling` parameters.

2. Specify the minimum and maximum number of replicas you want to use in the `minReplicas` and `maxReplicas` parameters.

   To fine-tune your autoscaling, you can set the `targetCPUUtilizationPercentage` to add a new replica if CPU utilization exceeds this percentage. Below is an example of autoscaling the delegate if the CPU usage of delegates goes above 70%.

   ```yaml
   ---
   
   apiVersion: autoscaling/v1
   kind: HorizontalPodAutoscaler
   metadata:
      name: harness-delegate-hpa
      namespace: harness-delegate-ng
      labels:
          harness.io/name: harness-delegate
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: harness-delegate
     minReplicas: 2
     maxReplicas: 10
     targetCPUUtilizationPercentage: 70
   
   ---
   ```

3. (Optional) Set the `targetMemoryUtilizationPercentage` to add a new replica if memory utilization exceeds this percentage.

4. Save the file, and restart your pods.

   When you create a deployment, Harness automatically spins up new replicas of your delegate as needed to ensure the deployment is completed.

## Example delegate YAML

Here's an example YAML file which configures delegates to have a minimum of 2 replicas. If the CPU or memory usage goes above 80%, new tasks won't be accepted. Once the CPU usage hits 70%, a new pod will be created to handle the load, up to a maximum of 10 replicas. When the CPU usage goes back down below 70%, the number of replicas will be scaled back down to a minimum of 2.

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
  name: kubernetes-delegate-account-token
  namespace: harness-delegate-ng
type: Opaque
data:
  DELEGATE_TOKEN: "YOUR_DELEGATE_TOKEN"

---

# If delegate needs to use a proxy, please follow instructions available in the documentation
# https://developer.harness.io/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings/

apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    harness.io/name: kubernetes-delegate
  name: kubernetes-delegate
  namespace: harness-delegate-ng
spec:
  replicas: 2
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
        prometheus.io/port: "3000"
        prometheus.io/path: "/api/metrics"
    spec:
      terminationGracePeriodSeconds: 600
      restartPolicy: Always
      containers:
      - image: example/org/delegate:yy.mm.verno
        imagePullPolicy: Always
        name: delegate
        securityContext:
          allowPrivilegeEscalation: false
          runAsUser: 0
        ports:
          - containerPort: 9090
        resources:
          limits:
            memory: "2Gi"
          requests:
            cpu: "0.5"
            memory: "2Gi"
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
          value: YOUR_ACCOUNT_ID
        - name: MANAGER_HOST_AND_PORT
          value: https://app.harness.io
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
          value: "https://app.harness.io/log-service/"
        - name: DELEGATE_RESOURCE_THRESHOLD
          value: ""
        - name: DYNAMIC_REQUEST_HANDLING
          value: "false"

---

apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
   name: kubernetes-delegate-hpa
   namespace: harness-delegate-ng
   labels:
       harness.io/name: kubernetes-delegate
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: kubernetes-delegate
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70

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
  name: kubernetes-delegate-upgrader-cronjob
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
  name: kubernetes-delegate-upgrader-token
  namespace: harness-delegate-ng
type: Opaque
data:
  UPGRADER_TOKEN: "YOUR_UPGRADER_TOKEN"

---

apiVersion: v1
kind: ConfigMap
metadata:
  name: kubernetes-delegate-upgrader-config
  namespace: harness-delegate-ng
data:
  config.yaml: 
    mode: Delegate
    dryRun: false
    workloadName: kubernetes-delegate
    namespace: harness-delegate-ng
    containerName: delegate
    delegateConfig:
      accountId: YOUR_ACCOUNT_ID
      managerHost: https://app.harness.io

---

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
          containers:
          - image: example/org/delegate:yy.mm.verno
            name: upgrader
            imagePullPolicy: Always
            envFrom:
            - secretRef:
                name: kubernetes-delegate-upgrader-token
            volumeMounts:
              - name: config-volume
                mountPath: /etc/config
          volumes:
            - name: config-volume
              configMap:
                name: kubernetes-delegate-upgrader-config
```

## Scale down delegate pods

You can use `terminationGracePeriodSeconds` or `preStopHook` to scale down your delegate pods.

- `terminationGracePeriodSeconds`: This is used to allow the delegate to delay the shutdown so that this process can perform some cleanup. The container shutdown is delayed the specified duration. 

   If there are no tasks running on the delegate pod, it terminates immediately. If the delegate pod is running one or more tasks, it will stop accepting new tasks and terminate as soon as all running tasks complete. 

   For example, if `terminationGracePeriodSeconds` is set to 7200 (two hours), there are three possible scenarios:

   - No tasks: The delegate container terminates immediately.

   - Short tasks: For example, if tasks require 10 minutes to complete, the delegate will delay shutdown until tasks are complete (10 minutes), and then shutdown. In this example, the total delay is 10 minutes, not two hours.

   - Long tasks: For example, if tasks require five hours to complete, the delegate will delay the shutdown, up to the maximum grace period configured (two hours), then Kubernetes sends SIGKILL signal force, killing the delegate and tasks. Tasks will show up as timed out/failed in the UI.

- `preStopHook`: This is used to allow any other kind of cleanup outside of the main process, for example, if you want to save files. This hook runs in parallel to the `terminationGracePeriodSeconds`, but before the delegate process shutdown is triggered (before the delegate process receives SIGTERM). If the hook's grace period ends, it is terminated. The delegate enters draining mode and only runs tasks already in progress. It will try doing this until all tasks are completed or until it is interrupted by Kubernetes with the SIGKILL signal when the grace period expires.

:::info caution
There are some drawbacks of using a longer `terminationGracePeriodSeconds`. Harness recommends that you evaluate your requirements and determine the maximum waiting time for task completion. If there is a long task that is pending completion, it can potentially bring down the entire delegate instance as it will be unable to process any new tasks while draining. It is crucial to consider the duration of tasks and ensure that they are distributed evenly to prevent such situations.

During delegate upgrade scenarios, this is not a major issue, since Harness performs rolling updates by default. Rolling updates bring up new delegate instances before shutting down the old ones (this uses additional resources, but your tasks will finish). During a long task, if the delegate container requires a restart, it will result in one less delegate instance, which could impact other tasks that might fail to schedule due to a lack of available delegates.
:::

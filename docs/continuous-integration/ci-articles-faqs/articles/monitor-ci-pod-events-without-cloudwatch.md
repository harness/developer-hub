---
title: Monitor CI pod events without CloudWatch
description: Use a DaemonSet to monitor and persist CI pod events for debugging OOM kills and pod evictions when CloudWatch is not available.
sidebar_position: 85
---

If your Kubernetes cluster doesn't use monitoring products like CloudWatch, you can deploy a DaemonSet to read and upload CI pod event logs to a storage bucket. This solution helps with:

* Root cause analysis of resource issues such as OOM (Out of Memory) kills
* Understanding pod evictions and why they happen in CI pods
* Debugging with persisted logs for older pipeline executions

## Prerequisites

Before implementing this monitoring solution, ensure you have:

* A storage bucket configured (GCP Cloud Storage, AWS S3, or Azure Blob Storage)
* Kubernetes service account with appropriate read permissions for pods and events
* Write access to your storage bucket from the Kubernetes cluster
* `kubectl` access to deploy resources to your cluster

## Implementation

The monitoring solution consists of three Kubernetes resources that work together to capture and persist CI pod events:

### 1. ServiceAccount with RBAC permissions

Create a ServiceAccount that can read pods and events across all namespaces:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ci-pod-monitor-sa
  namespace: harness-delegate-ng
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: ci-pod-monitor-role
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log", "events"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: ci-pod-monitor-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: ci-pod-monitor-role
subjects:
- kind: ServiceAccount
  name: ci-pod-monitor-sa
  namespace: harness-delegate-ng
```

### 2. ConfigMap for cloud provider settings

Configure your cloud storage provider and bucket details:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cloud-config
  namespace: harness-delegate-ng
data:
  provider: "gcp"  # Options: gcp, aws, azure
  bucket: "your-bucket-name"  # Replace with your actual bucket name
```

### 3. ConfigMap with monitoring script

The monitoring script runs four parallel functions to capture comprehensive CI pod information:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: build-logger-script
  namespace: harness-delegate-ng
data:
  build-logger.sh: |
    #!/bin/bash

    FILTER="harnessci"  # All Harness CI pods start with "harnessci"
    OUTPUT_DIR="/logs"
    TOUCHED="/tmp/logged_pods.txt"
    CLOUD_SYNC_INTERVAL=60

    mkdir -p "$OUTPUT_DIR"
    touch "$TOUCHED"

    # Function 1: Upload logs to cloud bucket every CLOUD_SYNC_INTERVAL seconds
    sync_logs() {
      while true; do
        echo "[SYNC] Uploading logs to cloud storage..."
        if [ "$CLOUD_PROVIDER" = "gcp" ]; then
          gsutil -m cp "$OUTPUT_DIR"/* "gs://$CLOUD_BUCKET/"
        elif [ "$CLOUD_PROVIDER" = "aws" ]; then
          aws s3 sync "$OUTPUT_DIR" "s3://$CLOUD_BUCKET/"
        elif [ "$CLOUD_PROVIDER" = "azure" ]; then
          az storage blob upload-batch --source "$OUTPUT_DIR" --destination "$CLOUD_BUCKET"
        fi
        sleep "$CLOUD_SYNC_INTERVAL"
      done
    }

    # Function 2: Stream logs from pods matching FILTER
    stream_pod_logs() {
      while true; do
        kubectl get pods --all-namespaces -o json | jq -r '.items[] | select(.metadata.name | test("'$FILTER'")) | [.metadata.namespace, .metadata.name] | @tsv' |
        while IFS=$'\t' read -r namespace pod; do
          if grep -q "$namespace/$pod" "$TOUCHED"; then
            continue
          fi
          echo "[$(date)] Starting log stream for $namespace/$pod"
          echo "$namespace/$pod" >> "$TOUCHED"
          kubectl logs -n "$namespace" "$pod" -f > "$OUTPUT_DIR/${namespace}_${pod}.log" 2>&1 &
        done
        sleep 5
      done
    }

    # Function 3: Collect cluster-wide Kubernetes events every 30 seconds
    collect_events() {
      while true; do
        timestamp=$(date +%Y%m%d-%H%M%S)
        kubectl get events --all-namespaces > "$OUTPUT_DIR/events_$timestamp.txt" 2>&1
        sleep 30
      done
    }

    # Function 4: Capture kubectl describe pod output for matching pods
    log_pod_description() {
      while true; do
        kubectl get pods --all-namespaces -o json | jq -r '.items[] | select(.metadata.name | test("'$FILTER'")) | [.metadata.namespace, .metadata.name] | @tsv' |
        while IFS=$'\t' read -r namespace pod; do
          desc_file="$OUTPUT_DIR/${namespace}_${pod}_describe.txt"
          if [ ! -f "$desc_file" ]; then
            echo "[$(date)] Capturing pod description for $namespace/$pod"
            kubectl describe pod -n "$namespace" "$pod" > "$desc_file" 2>&1
          fi
        done
        sleep 60
      done
    }

    # Run all collectors in background
    sync_logs &
    collect_events &
    log_pod_description &
    stream_pod_logs
```

### 4. DaemonSet deployment

Deploy the DaemonSet to run the monitoring script on every node:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: ci-pod-monitor
  namespace: harness-delegate-ng
spec:
  selector:
    matchLabels:
      app: ci-pod-monitor
  template:
    metadata:
      labels:
        app: ci-pod-monitor
    spec:
      serviceAccountName: ci-pod-monitor-sa
      containers:
      - name: logger
        image: google/cloud-sdk:latest
        command: ["/bin/bash", "-c"]
        args:
          - |
            apt-get update && \
            DEBIAN_FRONTEND=noninteractive apt-get install -y jq && \
            /script/build-logger.sh
        env:
        - name: CLOUD_PROVIDER
          valueFrom:
            configMapKeyRef:
              name: cloud-config
              key: provider
        - name: CLOUD_BUCKET
          valueFrom:
            configMapKeyRef:
              name: cloud-config
              key: bucket
        volumeMounts:
        - name: script
          mountPath: /script
        - name: log-output
          mountPath: /logs
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "200m"
      volumes:
      - name: script
        configMap:
          name: build-logger-script
          defaultMode: 0755
      - name: log-output
        emptyDir: {}
```

## Deployment steps

1. Save all the YAML configurations above into a single file named `ci-monitoring.yaml`

2. Update the cloud provider configuration in the ConfigMap:
   - Set `provider` to your cloud provider (`gcp`, `aws`, or `azure`)
   - Set `bucket` to your actual bucket name

3. Apply the configuration to your cluster:

```bash
kubectl apply -f ci-monitoring.yaml
```

4. Verify the DaemonSet is running:

```bash
kubectl get daemonset -n harness-delegate-ng ci-pod-monitor
kubectl get pods -n harness-delegate-ng -l app=ci-pod-monitor
```

## What gets captured

The monitoring solution captures four types of data:

1. **Pod logs**: Continuous streaming of logs from all CI pods (pods starting with "harnessci")
2. **Kubernetes events**: Cluster-wide events captured every 30 seconds, including:
   - Pod scheduling events
   - Container state changes
   - Resource allocation issues
   - Pod evictions
3. **Pod descriptions**: Complete `kubectl describe` output for each CI pod, including:
   - Resource requests and limits
   - Node allocation
   - Container statuses
   - Recent events
4. **Timestamps**: All captured data includes timestamps for correlation

## Debugging common issues

### Identifying OOM kills

Look for these patterns in the pod description files:

```
Last State: Terminated
Reason: OOMKilled
Exit Code: 137
```

In the events files, search for:

```
Killing container with id docker://... : Need to kill Pod
```

### Understanding pod evictions

Check the events files for eviction reasons:

```
Evicted: The node was low on resource: memory
Evicted: The node was low on resource: ephemeral-storage
```

### Resource pressure indicators

In pod descriptions, look for:

```
Status: Failed
Reason: Evicted
Message: The node had condition: [DiskPressure, MemoryPressure]
```

## Customization options

### Adjust collection intervals

Modify these variables in the script ConfigMap:

- `CLOUD_SYNC_INTERVAL`: How often to upload logs to cloud storage (default: 60 seconds)
- Event collection interval: Change `sleep 30` in `collect_events()` function
- Pod description interval: Change `sleep 60` in `log_pod_description()` function

### Filter different pod patterns

Change the `FILTER` variable to monitor different pod prefixes:

```bash
FILTER="your-pod-prefix"  # Monitor pods starting with "your-pod-prefix"
```

### Add AWS S3 or Azure Blob support

For AWS S3, ensure the nodes have appropriate IAM roles or update the script to include AWS credentials.

For Azure Blob Storage, update the sync command in the script:

```bash
elif [ "$CLOUD_PROVIDER" = "azure" ]; then
  az storage blob upload-batch --source "$OUTPUT_DIR" --destination "$CLOUD_BUCKET" --account-name "$AZURE_STORAGE_ACCOUNT"
fi
```

## Monitoring and maintenance

### Check DaemonSet health

```bash
kubectl get daemonset -n harness-delegate-ng ci-pod-monitor
kubectl logs -n harness-delegate-ng -l app=ci-pod-monitor --tail=50
```

### View collected data

Check your storage bucket for:
- Log files: `namespace_podname.log`
- Event snapshots: `events_YYYYMMDD-HHMMSS.txt`
- Pod descriptions: `namespace_podname_describe.txt`

### Clean up old data

Implement a lifecycle policy on your storage bucket to automatically delete old logs after a retention period (e.g., 30 days).

## Troubleshooting the monitoring solution

If the DaemonSet pods are not running:

1. Check pod status:
```bash
kubectl describe pods -n harness-delegate-ng -l app=ci-pod-monitor
```

2. Verify ServiceAccount permissions:
```bash
kubectl auth can-i get pods --all-namespaces --as=system:serviceaccount:harness-delegate-ng:ci-pod-monitor-sa
```

3. Check ConfigMap is properly mounted:
```bash
kubectl exec -n harness-delegate-ng -it <pod-name> -- ls /script/
```

4. Review container logs for errors:
```bash
kubectl logs -n harness-delegate-ng <pod-name>
```

## See also

- [Why are build pods being evicted?](../continuous-integration-faqs.md#why-are-build-pods-being-evicted)
- [Resource limits in Kubernetes](../../use-ci/set-up-build-infrastructure/resource-limits.md)
- [Kubernetes cluster build infrastructure](../../use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md)
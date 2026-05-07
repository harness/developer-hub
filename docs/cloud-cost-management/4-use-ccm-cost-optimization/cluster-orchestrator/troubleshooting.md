---
title: Troubleshooting
description: Troubleshooting
sidebar_position: 9
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

### DaemonSet pods not scheduling on Harness-managed nodes

Cluster Orchestrator does not automatically manage DaemonSet scheduling. You must add tolerations to your DaemonSets manually.

**Option 1: Run DaemonSet on ALL Nodes**

If you want your DaemonSet to run on every node in the cluster (including Harness-managed nodes), add a universal toleration:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: my-daemonset
  namespace: my-namespace
spec:
  selector:
    matchLabels:
      app: my-daemonset
  template:
    metadata:
      labels:
        app: my-daemonset
    spec:
      tolerations:
        - operator: Exists
      containers:
        - name: my-container
          image: my-image:latest
```

The \`operator: Exists\` toleration matches any taint, ensuring the DaemonSet runs on all nodes regardless of taints.

**Option 2: Run DaemonSet ONLY on Harness-Managed Nodes**

If you want your DaemonSet to run exclusively on Harness-managed nodes, add a specific toleration:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: my-daemonset
  namespace: my-namespace
spec:
  selector:
    matchLabels:
      app: my-daemonset
  template:
    metadata:
      labels:
        app: my-daemonset
    spec:
      tolerations:
        - key: ccm.harness.io/spot-ready
          operator: Exists
          effect: NoSchedule
      containers:
        - name: my-container
          image: my-image:latest
```

This toleration only matches the Harness taint, so the DaemonSet will only schedule on nodes with this specific taint.
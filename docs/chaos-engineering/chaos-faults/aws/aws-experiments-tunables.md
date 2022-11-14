---
title: Common AWS Experiment Tunables
---
AWS specific experiment tunables.

### Managed Nodegroup

It specifies whether AWS EC2 instances are part of managed nodeGroups. If instances belong to the managed nodeGroups then provide `MANAGED_NODEGROUP` as `enable` else provide it as `disable`. The default value is `disabled`.

Use the following example to tune this:

[embedmd]:# (./static/manifests/common/managed-nodegroup.yaml yaml)
```yaml
# it provided as enable if instances are part of self managed groups
# it is applicable for [ec2-terminate-by-id, ec2-terminate-by-tag]
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-terminate-by-tag
    spec:
      components:
        env:
        # if instance is part of a managed node-group
        # supports enable and disable values, default value: disable
        - name: MANAGED_NODEGROUP
          value: 'enable'
        # region for the ec2 instance
        - name: REGION
          value: 'us-east-1'
        # tag of the ec2 instance
        - name: INSTANCE_TAG
          value: 'key:value'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Multiple Iterations Of Chaos

Multiple iterations of chaos can be tuned via setting `CHAOS_INTERVAL` ENV. Which defines the delay between each iteration of chaos.

Use the following example to tune this:

[embedmd]:# (./static/manifests/common/chaos-interval.yaml yaml)
```yaml
# defines delay between each successive iteration of the chaos
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-terminate-by-tag
    spec:
      components:
        env:
         # delay between each iteration of chaos
        - name: CHAOS_INTERVAL
          value: '15'
        # time duration for the chaos execution
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
        - name: REGION
          value: 'us-east-1'
        - name: INSTANCE_TAG
          value: 'key:value'
```

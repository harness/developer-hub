---
title: Common AWS Fault Tunables
---
AWS-specific fault tunables.

### Managed Nodegroup

It specifies whether AWS EC2 instances are part of managed nodeGroups. If the instances belong to the managed nodeGroups, specify `MANAGED_NODEGROUP` as `enable` otherwise, specify it as `disable`. The default value is `disabled`.

You can use the following example to tune this:

[embedmd]:# (./static/manifests/common/managed-nodegroup.yaml yaml)
```yaml
# provided as enable if instances are a part of self managed groups
# it is applicable for [ec2-terminate-by-id, ec2-terminate-by-tag]
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
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
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
        # tag of the EC2 instance
        - name: INSTANCE_TAG
          value: 'key:value'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Multiple Iterations Of Chaos

You can tune multiple iterations of chaos by setting the `CHAOS_INTERVAL` environment variable, which defines the delay between every iteration of chaos.

You can use the following example to tune this:

[embedmd]:# (./static/manifests/common/chaos-interval.yaml yaml)
```yaml
# defines delay between every successive iteration of the chaos
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: ec2-terminate-by-tag-sa
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

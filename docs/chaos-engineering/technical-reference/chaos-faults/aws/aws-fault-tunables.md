---
title: Common AWS fault tunables
sidebar_position: 1
---
This section describes AWS-specific fault tunables.

### Managed nodegroup

It specifies whether AWS EC2 instances are a part of the managed nodeGroups. If instances belong to the managed nodeGroups, set `MANAGED_NODEGROUP` environment variable to `enable`, else set it to `disable`. The default value is `disabled`.

Use the following example to tune it:

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

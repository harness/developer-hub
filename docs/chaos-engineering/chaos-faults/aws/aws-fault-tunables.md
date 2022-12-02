---
title: Common AWS Fault Tunables
---
AWS specific fault tunables.

### Managed Nodegroup

It specifies whether or not AWS EC2 instances are part of managed nodeGroups. If instances belong to the managed nodeGroups then provide `MANAGED_NODEGROUP` as `enable` else provide it as `disable`. The default value is `disabled`.

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

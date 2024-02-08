---
title: Common AWS fault tunables
sidebar_position: 1
---
This section describes the common AWS-specific fault tunables.

### Managed node group

Specifies whether the AWS EC2 instances are a part of the managed node groups. If the instances belong to the managed node groups, set the `MANAGED_NODEGROUP` environment variable to `enable`, otherwise set it to `disable`. The default value is `disabled`.

The following YAML snippet illustrates the use of this environment variable:

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

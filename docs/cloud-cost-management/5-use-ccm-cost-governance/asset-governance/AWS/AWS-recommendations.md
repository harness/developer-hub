---
title: AWS Recommendations
description: This topic describes recommendations for AWS
# sidebar_position: 2
---

Recommendations help kickstart your journey with governance. Essentially, Harness run certain policies behind the scenes to generate recommendations for your governance-enabled AWS accounts. These policies not only help to cut costs but also increase the efficiency of your system. On the Governance Overview page, Harness showcases recommendations that will benefit you to save costs on associated resources. You can click on any recommendation to view its details. 

Listed below are the custodian policies which are used to generate recommendations that Harness offers for AWS. Along with each policy, you can also find their respective descriptions, the logic behind savings computation and the permissions required to generate or apply these recommendations.


### Recommendation: delete-unattached-ebs
**Description:** Delete all ebs volumes which are unattached

**Policy Used:**
```yaml
policies:
  - name: delete-unattached-ebs
    resource: ebs
    filters:
      - Attachments: []
      - State: available
    actions:
      - delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- **Dry Run:** 
    - ```ec2:DetachVolume```
    - ``` ec2:DescribeVolumes```
- **Run Once:** 
    - ```ec2:DetachVolume```
    - ```ec2:DeleteVolume```
    - ```ec2:DescribeVolumes```

---

### Recommendation: elb-low-request-count-list
**Description:** List ELBs with low request count

**Policy Used:**
```yaml
policies:
  - name: elb-low-request-count-list
    resource: elb
    description: List ELBs with low request count
    filters:
      - type: metrics
        name: RequestCount
        statistics: Sum
        days: 7
        value: 7
        missing-value: 0
        op: less-than
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- **Dry Run:** 
    - ```cloudwatch:GetMetricData```
    - ```elasticloadbalancing:DescribeLoadBalancers```

- **Run Once:** 
    - ```cloudwatch:GetMetricData```
    - ```elasticloadbalancing:DescribeLoadBalancers```

---

### Recommendation: migrate-gp2-to-gp3-ebs-volumes 
**Description:** Migrate gp2 volumes to gp3

**Policy Used:**
```yaml
policies:
 - name: migrate-gp2-to-gp3-ebs-volumes
   resource: ebs
   filters:
    - VolumeType: gp2
    - modifyable
   actions:
    - type: modify
      volume-type: gp3
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days. Then, 20% of that sum is taken as the savings.

**Permissions Required:** 
- **Dry Run:** 
    - ```ec2:DescribeVolumeAttribute```
- **Run Once:** 
    - ```ec2:DescribeVolumeAttribute```
    - ```ec2:ModifyVolumeAttribute```

---


### Recommendation: delete-snapshot-with-no-volume 
**Description:** Delete snapshots with no volumes

**Policy Used:**
```yaml
policies:
  - name: delete-snapshot-with-no-volume
    description: Find any snapshots that do not have a corresponding volume.
    resource: aws.ebs-snapshot
    filters:
      - type: volume
        key: VolumeId
        value: absent
    actions:
      - delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- **Dry Run:** 
    - ```ec2:DescribeVolumes```
- **Run Once:** 
    - ```ec2:DescribeVolumes```
    - ```ec2:DeleteSnapshot```

---


### Recommendation: stop-unused-rds
**Description:** Stop unused RDS database

**Policy Used:**
```yaml
 policies:
  - name: stop-unused-rds
    resource: rds
    description: Stop unused RDS database
    filters:
      - type: value
        key: DBInstanceStatus
        value: available
      - type: metrics
        name: DatabaseConnections
        statistics: Sum
        days: 7
        value: 0
        op: equal
    actions:
      - stop
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- **Dry Run:** 
    - ```rds:DescribeDBInstances```
- **Run Once:** 
    - ```rds:DescribeDBInstances```
    - ```rds:StopDBInstance```

---

### Recommendation: elb-delete-unused
**Description:** Delete unused ELB 

**Policy Used:**
```yaml
policies:
  - name: elb-delete-unused
    resource: elb
    filters:
      - Instances: []
    actions:
      - delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- **Dry Run:** 
    - ```elasticloadbalancing:DescribeLoadBalancers```
- **Run Once:** 
    - ```elasticloadbalancing:DescribeLoadBalancers```
    - ```elasticloadbalancing:DeleteLoadBalancer```

---

### Recommendation: release-unattached-eips
**Description:** Release unattached Elastic IPs

**Policy Used:**
```yaml
policies:
  - name: release-unattached-eips
    resource: aws.elastic-ip
    filters:
      - AssociationId: absent
    actions:
      - release
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- **Dry Run:** 
    - ```ec2:DescribeAddresses```
- **Run Once:** 
    - ```ec2:DescribeAddresses```
    - ```ec2:ReleaseAddress```

---


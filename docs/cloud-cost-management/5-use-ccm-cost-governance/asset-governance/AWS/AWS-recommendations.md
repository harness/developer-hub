---
title: AWS Recommendations
description: This topic describes recommendations for AWS
# sidebar_position: 2
---

## Recommendations

Recommendations help kickstart your journey with governance. Essentially, we run certain policies behind the scenes to generate recommendations for your governance-enabled Azure subscriptions. These policies not only help to cut costs but also increase the efficiency of your system. On the Governance Overview page, we showcase recommendations that will benefit you to save costs on associated resources. You can click on any recommendation to view its details. 

Listed below are the custodian policies which are used to generate recommendations that we offer for Azure. Along with each policy, you can also find their respective descriptions, the logic behind savings computation and the permissions required to generate or apply these recommendations.


### **1. Recommendation: delete-unattached-volumes**  
**Description:** Delete unattached volumes
**Policy Used:**
```yaml
policies:
  - name: delete-unattached-volumes
    resource: ebs
    filters:
      - Attachments: []
      - State: available
    actions:
      - delete
```

**Permissions Required:** 
- **Dry Run:** 
    - ```ec2:DetachVolume```
    - ``` ec2:DescribeVolumes```
- **Run Once:** 
    - ```ec2:DetachVolume```
    - ```ec2:DeleteVolume```
    - ```ec2:DescribeVolumes```

---


### **2. Recommendation: migrate-gp2-to-gp3-ebs-volumes**  
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

**Permissions Required:** 
- **Dry Run:** 
    - ```ec2:DescribeVolumeAttribute```
- **Run Once:** 
    - ```ec2:DescribeVolumeAttribute```
    - ```ec2:ModifyVolumeAttribute```

---


### **3. Recommendation: delete-snapshot-with-no-volume**  
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

**Permissions Required:** 
- **Dry Run:** 
    - ```ec2:DescribeVolumes```
- **Run Once:** 
    - ```ec2:DescribeVolumes```
    - ```ec2:DeleteSnapshot```

---


### **4. Recommendation: rds-delete-unuseds**  
**Description:** Delete unused RDS database
**Policy Used:**
```yaml
 policies:
  - name: rds-delete-unused
    resource: rds
    description: Delete unused RDS database
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
      - delete
```

**Permissions Required:** 
- **Dry Run:** 
    - ```rds:DescribeDBInstances```
- **Run Once:** 
    - ```rds:DescribeDBInstances```
    - ```rds:DeleteDBInstance```

---


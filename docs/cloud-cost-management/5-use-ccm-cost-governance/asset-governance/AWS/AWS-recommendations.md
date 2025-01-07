---
title: AWS Recommendations
description: This topic describes recommendations for AWS
# sidebar_position: 2
---

Recommendations help kickstart your journey with governance. Essentially, Harness run certain policies behind the scenes to generate recommendations for your governance-enabled AWS accounts. These policies not only help to cut costs but also increase the efficiency of your system. On the Governance Overview page, Harness showcases recommendations that will benefit you to save costs on associated resources. You can click on any recommendation to view its details. 

## Governance Recommendation Health

Harness CCM now provides users the ability to monitor Governance Recommendations through the new Optimization tab in the Governance module. 

This enhancement offers clear visibility into the evaluation status of each rule and provides detailed insights about the cloud account (connector) and region involved in generating the recommendations.

This tab is designed to streamline troubleshooting and improve visibility into why recommendations may fail, be ignored, or succeed, enabling users to take immediate corrective actions when necessary.

#### How It Works:
- Status Tracking: Each Recommendation Rule's status is displayed in the Optimization tab.
- Cloud Connector (Account ID): The specific cloud account associated with the rule.
- Region: The region for which the rule is evaluated.

#### Error Notifications:
If any connector and region combination encounters an issue, the system flags it with a Failed status.
The UI displays a detailed error message to assist in resolving the issue quickly.

#### Status Breakdown:

1. **Failed Status :** A failed status indicates one of the following scenarios:

- Missing Permissions: The necessary permissions required for Harness to get or list resources are not provided.
- Harness Internal Error: A system-level issue occurred during processing.

2. **Ignored Status :** An ignored status indicates one of the following scenarios:

- No Cost Data Available: Billing connector setup at Harness is missing cost data for the target cloud account.
- Cost Threshold Not Met: Cost is less than $300 for the combination of account x region.
- Invalid Region: The regions found in cost data is not valid to run against Governance Rule.

3. **Success Status :** A successful status indicates one of the following scenarios:

- Recommendation Generated: The system successfully evaluated the rule and created a recommendation.
- No Resources in Evaluation: The rule was evaluated, but there were no resources found.
- Savings Below Threshold: A recommendation was generated, but the potential savings were calculated to be less than $10.

## Recommendations 

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

Ref: https://aws.amazon.com/blogs/storage/migrate-your-amazon-ebs-volumes-from-gp2-to-gp3-and-save-up-to-20-on-costs/


**Permissions Required:** 
- **Dry Run:** 
    - ```ec2:DescribeVolumeAttribute```
    - ```ec2:DescribeVolumesModifications```
- **Run Once:** 
    - ```ec2:DescribeVolumeAttribute```
    - ```ec2:ModifyVolumeAttribute```
    - ```ec2:DescribeVolumesModifications```

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

### Recommendation: under-utilized-elasticcache-cluster
**Description:** Delete underutilized cache cluster with CPU utilization less than 5% in the last 7 days.

**Policy Used:**

```yaml
policies:
  - name: under-utilized-elasticcache-cluster
    resource: cache-cluster
    description: |
      Delete underutilised cache cluster with CPU utilisation less than 5% in last 7 days
    filters:
      - type: metrics
        name: CPUUtilization
        days: 7
        period: 86400
        value: 5
        op: less-than
    actions:
      - type: delete
        skip-snapshot: false
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

**Permissions Required:** 
- **Dry Run:** 
    - ```elasticache:DescribeCacheClusters```
- **Run Once:** 
    - ```elasticache:DescribeCacheClusters```
    - ```elasticache:DeleteCacheCluster```
    - ```elasticache:DeleteReplicationGroup```


### Recommendation: s3-lifecycle-configuration

**Description:** Configure lifecycle for S3 buckets wherever it is absent which would help to reduce storage spend

**Policy Used:**

```yaml
policies:
  - name: s3-lifecycle-configuration
    resource: aws.s3
    description: |
      Configure lifecycle for s3 buckets wherever it is absent which would help to reduce storage spend
    filters:
      - type : value
        key : Lifecycle
        value : absent
    actions:
      - type: configure-lifecycle
        rules:
          - ID: harness-default-lifecycle
            Status: Enabled
            Filter:
              Prefix: ''
            Expiration:
              ExpiredObjectDeleteMarker: True
            AbortIncompleteMultipartUpload:
              DaysAfterInitiation: 7
            NoncurrentVersionExpiration:
              NoncurrentDays: 30
              NewerNoncurrentVersions: 6
```

**Savings Computed**: 
To estimate the percentage cost savings from the given S3 lifecycle policies, we need to look at the specific actions and apply some reasonable assumptions. Here's a step-by-step approach:

1. Abort Incomplete Multipart Uploads after 7 days:
- Assumption: 5% of all uploads are incomplete and are not cleaned up without this policy.
- Cost Impact: Each incomplete multipart upload that is aborted saves the storage cost of the data uploaded so far.

2. Expire Noncurrent Versions after 30 days (keeping 6 versions):
- Assumption: Each object has, on average, 10 noncurrent versions stored. Expiring noncurrent versions after 30 days, keeping only the latest 6, will delete 4 out of every 10 noncurrent versions.
- Cost Impact: Deleting 40% of noncurrent versions reduces the total storage used by these versions.

**Example Calculation**

Let's assume the following for a single S3 bucket:

**Total Storage Used**: 1 TB (1,024 GB) in the S3 Standard storage class.

**Storage Distribution:**
- Current versions: 50% (512 GB)
- Noncurrent versions: 40% (410 GB)
- Incomplete multipart uploads: 10% (102 GB)

**Calculations:**

<DocImage path={require('../static/policy_comparison.png')} width="100%" height="100%" title="Click to view full size image" />

**Total Savings**
 <DocImage path={require('../static/savings1.png')} width="60%" height="60%" title="Click to view full size image" />

References: 
- [AWS S3 Lifecycle Policies](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)
- [AWS S3 Pricing](https://aws.amazon.com/s3/pricing/)
- [Managing S3 Costs](https://aws.amazon.com/blogs/storage/optimizing-costs-with-amazon-s3-lifecycle-configurations/)

**Permissions Required:**
- **Dry Run:** 
    - ```s3:GetLifecycleConfiguration```
- **Run Once:** 
    - ```s3:GetLifecycleConfiguration```
    - ```s3:PutLifecycleConfiguration```


### Recommendation: s3-intelligent-tiering-configuration

**Description:** Configure intelligent tiering for S3 buckets wherever it is disabled which would help to reduce storage spend.

**Policy Used:**

```yaml
policies:
  - name: s3-intelligent-tiering-configuration
    resource: aws.s3
    description: |
      Configure intelligent tiering for s3 buckets wherever it is disabled which would help to reduce storage spend.
    filters:
      - not:
          - type: intelligent-tiering
            attrs:
              - Status: Enabled
    actions:
      - type: set-intelligent-tiering
        Id: harness-default
        IntelligentTieringConfiguration:
          Id: harness-default
          Status: Enabled
          Tierings:
            - Days: 90
              AccessTier: ARCHIVE_ACCESS
            - Days: 180
              AccessTier: DEEP_ARCHIVE_ACCESS
```

**Savings Computed:** 
- **Frequent Access Tier:** This tier is equivalent in cost to the standard S3 storage, so no savings here.
- **Infrequent Access Tier:** Data not accessed for 30 days moves here, saving approximately 45% compared to standard S3 storage​.
- **Archive Instant Access Tier:** Data not accessed for 90 days moves here, with savings of up to 68% compared to standard storage​.
- **Archive Access Tier:** If configured, data not accessed for 90 days can move here, offering around 71% savings​.
- **Deep Archive Access Tier:** Data not accessed for 180 days can be moved to this tier, providing up to 95% savings.

**Example Calculation**

Assume you have 1 TB of data stored in S3 standard storage:

 <DocImage path={require('../static/example1.png')} width="60%" height="60%" title="Click to view full size image" />

**Example Scenario**

If 20% of your data transitions to the Infrequent Access tier after 30 days, 20% moves to Archive Access after 90 days, and 10% moves to Deep Archive Access after 180 days, your costs might look like this:

 <DocImage path={require('../static/example2.png')} width="50%" height="50%" title="Click to view full size image" />

 This results in a cost savings of approximately 32.76% compared to keeping all data in standard S3 storage ($23.00 per month vs. $15.463 per month).

 References: 
 - [AWS intelligent tiering](https://aws.amazon.com/s3/storage-classes/intelligent-tiering/)
 - [AWS S3 Pricing](https://aws.amazon.com/s3/pricing/)

**Permissions Required:**
- **Dry Run:** 
    - ```s3:GetBucketIntelligentTieringConfiguration```
- **Run Once:** 
    - ```s3:GetBucketIntelligentTieringConfiguration```
    - ```s3:PutIntelligentTieringConfiguration```


### Recommendation: delete-underutilized-redshift-cluster

**Description:** Delete any Amazon Redshift cluster where CPU Utilization has been less than 5% for the last 7 days

**Policy Used:**

```yaml
policies:
  - name: delete-underutilized-redshift-cluster
    resource: redshift
    description: |
      Delete redshift cluster where CPU Utilization is less than 5% for last 7 days
    filters:
      - type: metrics
        name: CPUUtilization
        days: 7
        period: 86400
        value: 5
        op: less-than
    actions:
      - delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

**Permissions Required:**
- **Dry Run:** 
    - ```redshift:DescribeClusters```
- **Run Once:** 
    - ```redshift:DescribeClusters```
    - ```redshift:DeleteCluster```


### Recommendation: delete-redshift-old-manual-snapshots

**Description:** Delete all redshift snapshots older than 35 days with a lifetime retention period

**Policy Used:**

```yaml

policies:
  - name: delete-redshift-old-manual-snapshots
    resource: redshift-snapshot
    description: |
      Delete all redshift snapshot older than 35 days with lifetime retention period
    filters:
      - "ManualSnapshotRetentionPeriod": -1
      - type: age
        days: 35
        op: gt
    actions:
      - delete
```
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

**Permissions Required:**
- **Dry Run:** 
    - ```redshift:DescribeClusterSnapshots```
- **Run Once:** 
    - ```redshift:DeleteClusterSnapshot```
    - ```redshift:DescribeClusterSnapshots```

---

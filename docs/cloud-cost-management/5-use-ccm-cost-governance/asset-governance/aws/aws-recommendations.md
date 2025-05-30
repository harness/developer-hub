---
title: AWS Recommendations
description: This topic describes recommendations for AWS
# sidebar_position: 2
---

Recommendations help kickstart your journey with governance. Essentially, Harness run certain policies behind the scenes to generate recommendations for your governance-enabled AWS accounts. These policies not only help to cut costs but also increase the efficiency of your system. On the Governance Overview page, Harness showcases recommendations that will benefit you to save costs on associated resources. You can click on any recommendation to view its details. 

## Governance Recommendation Insights

Harness CCM now provides users the ability to monitor Governance Recommendations through the new Recommendation Insights tab in the Governance module. 

This enhancement offers clear visibility into the evaluation status of each rule and provides detailed insights about the cloud account (connector) and region involved in generating the recommendations.

This tab is designed to streamline troubleshooting and improve visibility into why recommendations may fail, be ignored, or succeed, enabling users to take immediate corrective actions when necessary.

#### How It Works:
- Status Tracking: Each Recommendation Rule's status is displayed in the Recommendation Insights tab.
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

## Alerts

You can configure alerts to notify you for rule evaluations based on the following parameters:

<DocImage path={require('../static/aws-alert.png')} width="80%" height="80%" title="Click to view full size image" />

## Recommendations 

### Granular Recommendations

Cloud Asset Governance provides valuable recommendations, but when it comes to operationalizing them at scale, it might become challenging. Additionally, when using shared cloud accounts across teams, account-level recommendations might not work out. With Granular Recommendations, Governance recommendations will now be generated at the individual resource level, ensuring greater granularity and actionable insights for both custom and out-of-the-box (OOTB) recommendations. This enhancement simplifies implementation and tracking, allowing customers to take more effective action on governance recommendations at scale.

#### Enabling Granular Recommendations

 <iframe 
     src="https://app.tango.us/app/embed/25a843d3-c733-4459-99f5-69558757865c" 
     title="Enabling Granular Governance Recommendations in Cloud Cost Management" 
     style={{minHeight:'640px'}}
     width="100%" 
     height="100%" 
     referrerpolicy="strict-origin-when-cross-origin" 
     frameborder="0" 
     webkitallowfullscreen="webkitallowfullscreen" 
     mozallowfullscreen="mozallowfullscreen" 
     allowfullscreen="allowfullscreen"></iframe>

Owing to this, now, while adding a recommendation to Ignore List, users have the option to specify the scope at which the users want to ignore the recommendation. The scope can be either at:
- Rule-level
- Rule-level + Account/Region-level
- Rule-level + Account/Region-level + Resource-level.

  <DocImage path={require('../static/aws-granular.png')} width="90%" height="90%" title="Click to view full size image" />


### Recommendation: delete-unattached-aws-ebs
**Description:** Delete all ebs volumes which are unattached

**Policy Used:**
```yaml
policies:
  - name: delete-unattached-aws-ebs
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

### Recommendation: list-low-request-count-aws-elb
**Description:** List ELBs with low request count

**Policy Used:**
```yaml
policies:
  - name: list-low-request-count-aws-elb
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

### Recommendation: migrate-gp2-to-gp3-aws-ebs 
**Description:** Migrate gp2 volumes to gp3

**Policy Used:**
```yaml
policies:
 - name: migrate-gp2-to-gp3-aws-ebs
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


### Recommendation: delete-volume-absent-aws-ebs-snapshot 
**Description:** Delete snapshots with no volumes

**Policy Used:**
```yaml
policies:
  - name: delete-volume-absent-aws-ebs-snapshot
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


### Recommendation: stop-unused-aws-rds
**Description:** Stop unused RDS database

**Policy Used:**
```yaml
 policies:
  - name: stop-unused-aws-rds
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

### Recommendation: delete-unused-aws-elb
**Description:** Delete unused ELB 

**Policy Used:**
```yaml
policies:
  - name: delete-unused-aws-elb
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

### Recommendation: release-unattached-aws-elastic-ip
**Description:** Release unattached Elastic IPs

**Policy Used:**
```yaml
policies:
  - name: release-unattached-aws-elastic-ip
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

### Recommendation: delete-underutilized-aws-cache-cluster
**Description:** Delete underutilized cache cluster with CPU utilization less than 5% in the last 7 days.

**Policy Used:**

```yaml
policies:
  - name: delete-underutilized-aws-cache-cluster
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


### Recommendation: configure-lifecycle-aws-s3

**Description:** Configure lifecycle for S3 buckets wherever it is absent which would help to reduce storage spend

**Policy Used:**

```yaml
policies:
  - name: configure-lifecycle-aws-s3
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


### Recommendation: set-intelligent-tiering-aws-s3

**Description:** Configure intelligent tiering for S3 buckets wherever it is disabled which would help to reduce storage spend.

**Policy Used:**

```yaml
policies:
  - name: set-intelligent-tiering-aws-s3
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


### Recommendation: delete-underutilized-aws-redshift

**Description:** Delete any Amazon Redshift cluster where CPU Utilization has been less than 5% for the last 7 days

**Policy Used:**

```yaml
policies:
  - name: delete-underutilized-aws-redshift
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


### Recommendation: delete-old-manual-aws-redshift-snapshot

**Description:** Delete all redshift snapshots older than 35 days with a lifetime retention period

**Policy Used:**

```yaml

policies:
  - name: delete-old-manual-aws-redshift-snapshot
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

### Recommendation: delete-empty-aws-dynamodb-table

**Description:** Delete DyanmoDB tables which are empty

**Policy Used:**

```yaml
policies:
  - name: delete-empty-aws-dynamodb-table
    resource: dynamodb-table
    description: |
      Delete DyanmoDB tables which are empty
    filters:
      - TableSizeBytes: 0
    actions:
      - delete
```
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

---

### Recommendation: delete-stale-aws-log-group

**Description:** Delete stale cloud watch log groups

**Policy Used:**

```yaml
policies:
  - name: delete-stale-aws-log-group
    resource: log-group
    description: |
      Delete stale cloud watch log groups
    filters:
      - type: last-write
        days: 60
    actions:
      - delete
```
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

---

### Recommendation: delete-stale-aws-rds-snapshot

**Description:** Delete all stale(older than 28 days) RDS snapshots

**Policy Used:**

```yaml
policies:
  - name: delete-stale-aws-rds-snapshot
    resource: rds-snapshot
    description: |
      Delete all stale(older than 28 days) RDS snapshots
    filters:
      - type: age
        days: 28
        op: ge
    actions:
      - delete
```
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

---

### Recommendation: delete-unencrypted-aws-firehose

**Description:**  Delete Firehose which are not encrypted

**Policy Used:**

```yaml
policies:
  - name: delete-unencrypted-aws-firehose
    resource: firehose
    description: |
      Delete Firehose which are not encrypted
    filters:
      - KmsMasterKeyId: absent
    actions:
      - type: delete
```
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

---

### Recommendation: delete-unencrypted-aws-sqs

**Description:**  Delete SQS which are not encrypted

**Policy Used:**

```yaml
policies:
  - name: delete-unencrypted-aws-sqs
    resource: sqs
    description: |
      Delete SQS which are not encrypted
    filters:
      - KmsMasterKeyId: absent
    actions:
      - type: delete
```
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

---

### Recommendation: delete-unused-aws-nat-gateway

**Description:** Delete unused NAT Gateways based on no associated traffic in past 7 days.

**Policy Used:**

```yaml
policies:
  - name: delete-unused-aws-nat-gateway
    resource: nat-gateway
    description: |
      Delete unused NAT Gateways based on no associated traffic in past 7 days.
    filters:
      - type: metrics
        name: BytesOutToDestination
        statistics: Sum
        period: 86400
        days: 7
        value: 0
        op: eq
    actions:
      - type: delete
```
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

---

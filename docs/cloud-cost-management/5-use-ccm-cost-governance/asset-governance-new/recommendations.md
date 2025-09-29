---
title: Governance Recommendations
description: This topic describes how to optimize cloud costs using asset governance.
# sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Recommendations help kickstart your journey with governance. Essentially, Harness run certain policies behind the scenes to generate recommendations for your governance-enabled AWS accounts. These policies not only help to cut costs but also increase the efficiency of your system. On the Governance Overview page, Harness showcases recommendations that will benefit you to save costs on associated resources. You can click on any recommendation to view its details. 


## Recommendations By Harness

Cloud Asset Governance provides valuable recommendations, but when it comes to operationalizing them at scale, it might become challenging. Additionally, when using shared cloud accounts across teams, project-level recommendations might not work out. With Granular Recommendations, Governance recommendations will now be generated at the individual resource level, ensuring greater granularity and actionable insights for both custom and out-of-the-box (OOTB) recommendations. This enhancement simplifies implementation and tracking, allowing customers to take more effective action on governance recommendations at scale.

<Tabs>
<TabItem value="aws" label="AWS" default>

<details>
<summary>Recommendation:delete-unattached-aws-ebs</summary>

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
</details>

<details>
<summary>Recommendation: list-low-request-count-aws-elb</summary>

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
</details>
<details>
<summary>Recommendation: migrate-gp2-to-gp3-aws-ebs</summary>

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
</details>
<details>
<summary>Recommendation: delete-volume-absent-aws-ebs-snapshot</summary>

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
</details>
<details>
<summary>Recommendation: stop-unused-aws-rds</summary>

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
</details>
<details>
<summary>Recommendation: delete-unused-aws-elb</summary>

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
</details>
<details>
<summary>Recommendation: release-unattached-aws-elastic-ip</summary>

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
</details>
<details>
<summary>Recommendation: delete-underutilized-aws-cache-cluster</summary>

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

</details>
<details>
<summary>Recommendation: configure-lifecycle-aws-s3</summary>

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

<DocImage path={require('./static/policy-comparison.png')} width="100%" height="100%" title="Click to view full size image" />

**Total Savings**
 <DocImage path={require('./static/savings1.png')} width="60%" height="60%" title="Click to view full size image" />

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

</details>
<details>
<summary>Recommendation: set-intelligent-tiering-aws-s3</summary>

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

 <DocImage path={require('./static/example1.png')} width="60%" height="60%" title="Click to view full size image" />

**Example Scenario**

If 20% of your data transitions to the Infrequent Access tier after 30 days, 20% moves to Archive Access after 90 days, and 10% moves to Deep Archive Access after 180 days, your costs might look like this:

 <DocImage path={require('./static/example2.png')} width="50%" height="50%" title="Click to view full size image" />

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

</details>
<details>
<summary>Recommendation: delete-underutilized-aws-redshift</summary>

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

</details>
<details>
<summary>Recommendation: delete-old-manual-aws-redshift-snapshot</summary>

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

</details>
<details>
<summary>Recommendation: delete-empty-aws-dynamodb-table</summary>

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

</details>
<details>
<summary>Recommendation: delete-stale-aws-log-group</summary>

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

</details>
<details>
<summary>Recommendation: delete-stale-aws-rds-snapshot</summary>

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

</details>
<details>
<summary>Recommendation: delete-unencrypted-aws-firehose</summary>

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

</details>
<details>
<summary>Recommendation: delete-unencrypted-aws-sqs</summary>

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

</details>
<details>
<summary>Recommendation: delete-unused-aws-nat-gateway</summary>

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
</details>

</TabItem>
<TabItem value="gcp" label="GCP" default>


<details>
<summary>Recommendation: delete-idle-gcp-image</summary>

**Description:** Delete GCP recommended idle images

**Policy Used:**
```yaml
policies:
  - name: delete-idle-gcp-image
    description: |
      Delete GCP images which are not used to create a disk for at least 15 days and not used in any instance template. 
      These idle images are fetched from GCP recommender.
    resource: gcp.image
    filters:
      - type: recommend
        id: google.compute.image.IdleResourceRecommender
    actions:
      - type: delete
```
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- Dry Run: `recommender.computeImageIdleResourceRecommendations.list`
- Run Once:
  - `recommender.computeImageIdleResourceRecommendations.list`
  - `compute.images.delete`

---
</details>
<details>
<summary>Recommendation: delete-never-attached-gcp-disk</summary>

**Description:** Delete GCP recommended idle persistent disks which were never attached to a VM and is blank

**Policy Used:**
```yaml
policies:
  - name: delete-never-attached-gcp-disk
    description: |
      Delete GCP disks which are created at least 15 days ago and never attached to a VM and is blank. 
      These idle disks are fetched from GCP recommender.
    resource: gcp.disk
    filters:
      - type: recommend
        id: google.compute.disk.IdleResourceRecommender
      - type: value
        key: lastAttachTimestamp
        value:
        op: eq
    actions:
      - type: delete
```
  
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:**
- Dry Run: `recommender.computeDiskIdleResourceRecommendations.list`
- Run Once:
  - `recommender.computeDiskIdleResourceRecommendations.list`
  - `compute.disks.delete`

---
</details>
<details>
<summary>Recommendation: stop-forever-running-gcp-instance</summary>

**Description:** Stop the gcp instances that have an uptime greater than 30 days.
   
**Policy Used:**
```yaml
policies:
  - name: stop-forever-running-gcp-instance
    description: |
      Stop the gcp instances that have an uptime greater than 30 days.
    resource: gcp.instance
    filters:
      - type: metrics
        name: compute.googleapis.com/instance/uptime_total
        aligner: ALIGN_NONE
        value: 2592000
        op: greater-than
      - type: value
        key: status
        value: "RUNNING"
        op: eq
    actions:
      - type: stop
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- Dry Run:
  - `compute.instances.list`
  - `monitoring.timeSeries.list`

- Run Once:
  - `compute.instances.list`
  - `monitoring.timeSeries.list`
  - `compute.instances.stop`

---
</details>
<details>
<summary>Recommendation: delete-old-gcp-snapshot</summary>

**Description:** Delete gcp snapshots older than 14 days.
  
**Policy Used:**
```yaml
policies:
  - name: delete-old-gcp-snapshot
    resource: gcp.snapshot
    description: |
      Delete gcp snapshots older than 14 days.
    filters:
      - type: value
        key: creationTimestamp
        op: greater-than
        value_type: age
        value: 14
    actions:
      type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- Dry Run:
  - `compute.snapshots.list`

- Run Once:
  - `compute.snapshots.list`
  - `compute.snapshots.delete`

---
</details>
<details>
<summary>Recommendation: stop-underutilized-gcp-instance</summary>

**Description:** Stop underutilised instances with average CPU utilisation less than 5% in last 3 days.

**Policy Used:**
```yaml
policies:
  - name: stop-underutilized-gcp-instance
    resource: gcp.instance
    description: Stop underutilised instances with average CPU utilisation less than 5% in last 3 days
    filters:
      - type: metrics
        name: compute.googleapis.com/instance/cpu/utilization
        aligner: ALIGN_MEAN
        days: 3
        value: 5
        op: less-than
      - type: value
        key: status
        value: "RUNNING"
        op: eq
    actions:
      - type: stop
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- Dry Run:
  - `compute.instances.list`
  - `monitoring.timeSeries.list`

- Run Once:
  - `compute.instances.list`
  - `monitoring.timeSeries.list`
  - `compute.instances.stop`

---

</details>
<details>
<summary>Recommendation: stop-underutilized-gcp-sql-instance</summary>

**Description:** Stop underutilised sql instances with average CPU utilisation less than 5% in last 3 days

**Policy Used:**
```yaml
policies:
  - name: stop-underutilized-gcp-sql-instance
    resource: gcp.sql-instance
    description: |
      Stop underutilised sql instances with average CPU utilisation less than 5% in last 3 days
    filters:
      - type: metrics
        name: cloudsql.googleapis.com/database/cpu/utilization
        aligner: ALIGN_MEAN
        days: 3
        value: 5
        op: less-than
    actions:
      - type: stop
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- Dry Run:
  - `cloudsql.instances.list`
  - `monitoring.timeSeries.list`

- Run Once:
  - `cloudsql.instances.list`
  - `monitoring.timeSeries.list`
  - `cloudsql.instances.update`

---
</details>
<details>
<summary>Recommendation: snapshot-and-delete-unattached-gcp-disk</summary>

**Description:** Snapshot and delete GCP recommended idle persistent disks which are unattached

**Policy Used:** 
```yaml
policies:
  - name: snapshot-and-delete-unattached-gcp-disk
    description: |
      Snapshot and delete GCP disks which are detached for at least 15 days.
      These idle disks are fetched from GCP recommender.
    resource: gcp.disk
    filters:
      - type: recommend
        id: google.compute.disk.IdleResourceRecommender
      - type: value
        key: lastAttachTimestamp
        value: 
        op: ne
    actions:
      - type: snapshot
        name_format: "{disk[name]:.50}-{now:%Y-%m-%d}"
      - type: delete
      
```

**Savings Computed:** Savings are considered as 35% of the total cost. Implementing this recommendation would result in 35% to 92% reduction in the maintenance cost of that disk. Thus, we have considered the minimum savings achievable, which is 35%. Ref: https://cloud.google.com/compute/docs/viewing-and-applying-idle-resources-recommendations

**Permissions Required:** 
- Dry Run:
  - `recommender.computeDiskIdleResourceRecommendations.list`

- Run Once:
  - `recommender.computeDiskIdleResourceRecommendations.list`
  - `compute.disks.delete`

---
</details>
<details>
<summary>Recommendation: delete-idle-gcp-gke-cluster</summary>

**Description:** List GCP Idle GKE Clusters Recommendations

**Policy Used:** 
```yaml
policies:
  - name: delete-idle-gcp-gke-cluster
    description: |
      List GCP Idle GKE Clusters Recommendations
    resource: gcp.gke-cluster
    filters:
      - type: recommend
        id: google.container.DiagnosisRecommender
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

**Permissions Required:** 
- Dry Run:
  - `recommender.containerDiagnosisInsights.list`
  - `container.clusters.list`

- Run Once:
  - `recommender.containerDiagnosisInsights.list`
  - `container.clusters.list`
  - `container.clusters.delete`

---
</details>
<details>
<summary>Recommendation: list-cost-recommendations-gcp-cloud-run-service</summary>

**Description:** 

**Policy Used:** 
```yaml
policies:
  - name: list-cost-recommendations-gcp-cloud-run-service
    resource: gcp.cloud-run-service
    description: |
      List Cloud Run CPU Allocation Recommendations
    filters:
      - type: recommend
        id: google.run.service.CostRecommender      
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

**Permissions Required:** 
- Dry Run:
  - `recommender.runServiceCostRecommendations.list`
  - `run.services.list`

- Run Once:
  - `recommender.runServiceCostRecommendations.list`
  - `run.services.list`

---
</details>
<details>
<summary>Recommendation: list-unused-gcp-bq-dataset</summary>

**Description:** List BigQuery datasets that haven't been accessed in the last 7 days.

**Policy Used:** 
```yaml
policies:
  - name: list-unused-gcp-bq-dataset
    resource: gcp.bq-dataset
    description: |
      List BigQuery datasets that haven't been accessed in the last 7 days.
    filters:
      - type: value
        key: lastModifiedTime
        op: less-than
        value_type: age
        value: 7
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for the last 30 days.

**Permissions Required:** 
- Dry Run:
  - `bigquery.datasets.get`

- Run Once:
  - `bigquery.datasets.get`

---
</details>
<details>
<summary>Recommendation: delete-unused-gcp-function</summary>

**Description:** Delete Cloud Functions that haven't been invoked in the last 7 days to reduce costs.

**Policy Used:** 
```yaml
policies:
  - name: delete-unused-gcp-function
    resource: gcp.function
    description: >
      Delete Cloud Functions that haven't been invoked in the last 7 days to
      reduce costs.
    filters:
      - type: metrics
        name: cloudfunctions.googleapis.com/function/execution_count
        metric-key: resource.labels.function_name
        days: 7
        value: 0
        op: eq
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- Dry Run:
  - `monitoring.timeSeries.list`
  - `cloudfunctions.functions.list`

- Run Once:
  - `monitoring.timeSeries.list`
  - `cloudfunctions.functions.list`
  - `cloudfunctions.functions.delete`

---
</details>
<details>
<summary>Recommendation: list-under-utilized-gcp-bucket</summary>

**Description:** List low utilized gcp buckets in last 7 days.

**Policy Used:** 
```yaml
policies:
  - name: list-under-utilized-gcp-bucket
    description: |
      List low utilized gcp buckets in last 7 days.
    resource: gcp.bucket
    filters:
      - type: metrics
        name: storage.googleapis.com/network/sent_bytes_count
        aligner: ALIGN_COUNT
        days: 7
        value: 1024
        op: less-than
        missing-value: 0
      - type: metrics
        name: storage.googleapis.com/network/received_bytes_count
        aligner: ALIGN_COUNT
        days: 7
        value: 1024
        op: less-than
        missing-value: 0   
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for last 30 days.

**Permissions Required:** 
- Dry Run:
  - `monitoring.timeSeries.list`
  - `storage.buckets.list`

- Run Once:
  - `monitoring.timeSeries.list`
  - `storage.buckets.list`

---
</details>
<details>
<summary>Recommendation: list-hanged-gcp-dataflow-job</summary>

**Description:** List Dataflow jobs that have been in an hanged state for more than 1 day.

**Policy Used:** 
```yaml
policies:
  - name: list-hanged-gcp-dataflow-job
    resource: gcp.dataflow-job
    description: List Dataflow jobs that have been in an hanged state for more than 1 day.
    filters:
      - type: value
        key: startTime
        op: greater-than
        value_type: age
        value: 1
      - type: value
        key: currentState
        value:
          - JOB_STATE_RUNNING
          - JOB_STATE_DRAINING
          - JOB_STATE_CANCELLING
      
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- Dry Run:
  - `dataflow.jobs.list`

- Run Once:
  - `dataflow.jobs.list`

---
</details>
<details>
<summary>Recommendation: delete-under-utilized-gcp-loadbalancer-address</summary>

**Description:** Delete all load balancers with low utilizations, where packet count is less than 1000 in the last 72 hours.

**Policy Used:** 
```yaml
policies:
  - name: delete-under-utilized-gcp-loadbalancer-address
    resource: gcp.loadbalancer-address
    description: >
      Delete all low utilized load balancers where packet count is less than
      1000 in last 72 hours
    filters:
      - type: metrics
        name: compute.googleapis.com/instance/network/received_packets_count
        metric-key: metric.labels.instance_name
        aligner: ALIGN_COUNT
        days: 3
        value: 1000
        op: le
    actions:
      - type: delete
      
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up the cost of each resource for the last 30 days.

**Permissions Required:** 
- Dry Run:
  - `monitoring.timeSeries.list`
  - `compute.addresses.list`

- Run Once:
  - `monitoring.timeSeries.list`
  - `compute.addresses.list`
  - `compute.addresses.delete`

---
</details>
<details>
<summary>Recommendation: list-under-utilized-gcp-redis</summary>

**Description:** List Redis instances with less than 5% CPU utilization over the last 7 days.

**Policy Used:** 
```yaml
policies:
  - name: list-under-utilized-gcp-redis
    resource: gcp.redis
    description: List Redis instances with less than 5% CPU utilization in last 7 days
    filters:
      - type: metrics
        name: redis.googleapis.com/stats/cpu_utilization
        metric-key: resource.labels.instance_id
        days: 7
        value: 0.05
        op: lte
      
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for the last 30 days.

**Permissions Required:** 
- Dry Run:
  - `monitoring.timeSeries.list`
  - `redis.instances.list`

- Run Once:
  - `monitoring.timeSeries.list`
  - `redis.instances.list`

---
</details>


### GCP Resource Coverage (Examples)

- Compute Engine instances
- Cloud Storage buckets
- App Engine applications
- Cloud SQL instances
- Cloud IAM policies

For a comprehensive list of all supported GCP resources, refer to the [GCP Resource Reference — Cloud Custodian documentation](https://cloudcustodian.io/docs/gcp/resources/index.html).

</TabItem>
<TabItem value="azure" label="Azure" default>

<details>
<summary>Recommendation: delete-low-utilized-azure-cosmodb</summary>

**Description:** Delete low utilised CosmosDB based on total requests in last 72 hours.

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilized-azure-cosmodb
    resource: azure.cosmosdb
    description: |
      Delete low utilised CosmosDB based on total requests in last 72 hours
    filters:
      - type: metric
        metric: TotalRequests
        op: le
        aggregation: total
        threshold: 1000
        timeframe: 72
    actions:
      - type: delete    
```
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---
</details>
<details>
<summary>Recommendation: delete-unattached-azure-disk</summary>
**Description:** Delete all unattached disks. 

**Policy Used:**
```yaml
policies:
  - name: delete-unattached-azure-disk
    resource: azure.disk
    description: |
      Delete all unattached disks
    filters:
      - type: value
        key: properties.diskState
        value: Unattached
    actions:
      - type: delete
```

**Savings Computed:** The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days are summed together and that is shown as the potential savings.  

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---
</details>
<details>
<summary>Recommendation: delete-low-utilized-azure-load-balancer</summary>
**Description:** Delete all low utilised load balancers where packet count is less than 1000 in last 72 hours.  

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilized-azure-load-balancer
    resource: azure.loadbalancer
    description: |
      Delete all low utilised load balancers where packet count is less than 1000 in last 72 hours
    filters:
      - type: metric
        metric: PacketCount
        op: le
        aggregation: total
        threshold: 1000
        timeframe: 72
    actions:
      - type: delete      
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days. 

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---
</details>
<details>
<summary>Recommendation: delete-orphaned-azure-networkinterface</summary>
**Description:** Delete network interface which are not attached to virtual machine.

**Policy Used:**
```yaml
policies:
  - name: delete-orphaned-azure-networkinterface
    resource: azure.networkinterface
    description: |
      Delete network interface which are not attached to virtual machine
    filters:
      - type: value
        key: properties.virtualMachine
        value: null
    actions:
        - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---
</details>
<details>
<summary>Recommendation: stop-underutilized-azure-vm</summary>
**Description:** Stop underutilised virtual machines with average CPU utilisation less than 5% in last 72 hours.  

**Policy Used:**
```yaml
policies:
  - name: stop-underutilized-azure-vm
    resource: azure.vm
    description: |
      Stop underutilised virtual machines with average CPU utilisation less than 5% in last 72 hours
    filters:
      - type: metric
        metric: Percentage CPU
        op: le
        aggregation: average
        threshold: 5
        timeframe: 72
    actions:
      - type: stop
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---
</details>
<details>
<summary>Recommendation: delete-low-utilized-azure-keyvault</summary>
**Description:** Delete KeyVaults with less than 10 API hits in last 72 hours.

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilized-azure-keyvault
    resource: azure.keyvault
    description: |
      Delete KeyVaults with less than 10 API hits in last 72 hours
    filters:
      - type: metric
        metric: ServiceApiHit
        aggregation: total
        op: lt
        threshold: 10
        timeframe: 72
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---
</details>
<details>
<summary>Recommendation: delete-low-utilized-azure-sqlserver</summary>
**Description:** Delete SQL servers with less than 10% average DTU consumption over last 72 hours.  

**Policy Used:** 
```yaml
policies:
  - name: delete-low-utilized-azure-sqlserver
    resource: azure.sqlserver
    description: |
      Delete SQL servers with less than 10% average DTU consumption over last 72 hours
    filters:
      - type: metric
        metric: dtu_consumption_percent
        aggregation: average
        op: lt
        threshold: 10
        timeframe: 72
        filter:  "DatabaseResourceId eq '*'"
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---
</details>
<details>
<summary>Recommendation: delete-unattached-azure-publicip</summary>
**Description:** Delete public ip which are not attached to any network interface.  

**Policy Used:**
```yaml
policies:
  - name: delete-unattached-azure-publicip
    resource: azure.publicip
    description: |
      Delete public ip which are not attached to any network interface
    filters:
      - type: value
        key: properties.ipConfiguration
        value: null
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---
</details>
<details>
<summary>Recommendation: delete-low-utilized-azure-datalake</summary>
**Description:** Delete all Datalake Stores with less than 1000 read requests or 1000 write requests in the last 72 hours.

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilized-azure-datalake
    resource: azure.datalake
    description: |
      Delete all Datalake Stores with less than 1000 read requests or 1000 write requests in the last 72 hours
    filters:
      - or:
        - type: metric
          metric: ReadRequests	
          op: le
          aggregation: total
          threshold: 1000
          timeframe: 72
        - type: metric
          metric: WriteRequests	
          op: le
          aggregation: total
          threshold: 100
          timeframe: 72          
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---
</details>
<details>
<summary>Recommendation: delete-unused-azure-postgresql-server</summary>
**Description:** Delete PostgreSQL Servers that have had zero active connections in the last 72 hours. 

**Policy Used:**
```yaml
policies:
  - name: delete-unused-azure-postgresql-server
    resource: azure.postgresql-server
    description: |
      Delete PostgreSQL Servers that have had zero active connections in the last 72 hours
    filters:
      - type: metric
        metric: active_connections
        op: eq
        threshold: 0
        timeframe: 72
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---
</details>
<details>
<summary>Recommendation: delete-orphaned-azure-appserviceplan</summary>
**Description:** Delete orphaned(numberOfSites=0) application service plan

**Policy Used:**
```yaml
policies:
  - name: delete-orphaned-azure-appserviceplan
    resource: azure.appserviceplan
    description: |
      Delete orphaned(numberOfSites=0) application service plan
    filters:
      - type: value
        key: properties.numberOfSites
        op: eq
        value: 0
    actions:
      - delete
```

**Savings Computed:** The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days are summed together and that is shown as the potential savings.  

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---
</details>

</TabItem>
</Tabs>

-----------

## Rules Generating Recommendations

The "Rules Generating Recommendations" tab shows all the rules you’ve turned on to generate recommendations. Every day, our system runs these rules across your main accounts and regions. The results are shown as recommendations, so you can track their full lifecycle from when they’re created to when they’re addressed.
The tab also gives you insights into the rules you’ve enabled. You can see a breakdown by account and region, including whether the rule ran successfully, had an error, or found resources that don’t have any savings attached.

### Using Rules Generating Recommendations

1. Navigate to the **Rules Generating Recommendations** > **+New Rule** to begin the process
2. Select a governance rule to generate recommendations
3. Configure the rule's scope:
   - **All Accounts**: Apply the rule across your entire cloud infrastructure
   - **Specific Accounts**: Target only selected cloud accounts for evaluation
4. Click **Generate Recommendations** to initiate the evaluation process

<DocImage path={require('./static/rgr.png')} width="50%" height="50%" title="Click to view full size image" />

After this, all the rules generating recommendations can be seen in the **Rules Generating Recommendations** tab alongwith last evaluation, recommendations, potential savings and success rate. If any connector and region combination encounters an issue, the system flags it with a Failed status.
The UI displays a detailed error message to assist in resolving the issue quickly.

#### Status Breakdown:

1. **Failed Status :** A failed status indicates one of the following scenarios:

- Missing Permissions: The necessary permissions required for Harness to get or list resources are not provided.
- Harness Internal Error: A system-level issue occurred during processing.

2. **Ignored Status :** An ignored status indicates one of the following scenarios:

- No Cost Data Available: Billing connector setup at Harness is missing cost data for the target cloud account.
- Cost Threshold Not Met: Cost is less than $300 for the GCP project.
- Invalid Region: The regions found in cost data is not valid to run against Governance Rule.

3. **Success Status :** A successful status indicates one of the following scenarios:

- Recommendation Generated: The system successfully evaluated the rule and created a recommendation.
- No Resources in Evaluation: The rule was evaluated, but there were no resources found.
- Savings Below Threshold: A recommendation was generated, but the potential savings were calculated to be less than $10.

---------

### Granular Recommendations

Cloud Asset Governance provides valuable recommendations, but when it comes to operationalizing them at scale, it might become challenging. Additionally, when using shared cloud accounts across teams, project-level recommendations might not work out. With Granular Recommendations, Governance recommendations will now be generated at the individual resource level, ensuring greater granularity and actionable insights for both custom and out-of-the-box (OOTB) recommendations. This enhancement simplifies implementation and tracking, allowing customers to take more effective action on governance recommendations at scale.

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

Owing to this, now, while adding a recommendation to Ignore List, users have the option to specify the scope at which the users want to ignore the recommendation. 
The scope can be either at:

- Rule-level
- Rule-level + Project-level
- Rule-level + Project-level + Resource-level.

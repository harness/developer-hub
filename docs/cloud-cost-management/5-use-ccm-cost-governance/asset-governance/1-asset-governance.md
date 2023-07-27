---
title: Overview
description: This topic talks about Harness cloud asset governance.
# sidebar_position: 2
---

# Overview of Cloud asset governance 
:::note
Currently, this feature is behind the feature flag **CCM_ENABLE_CLOUD_ASSET_GOVERNANCE_UI**. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::


The Harness cloud asset governance platform enables you to achieve a highly managed cloud environment using a Governance-as-Code approach that includes real-time enforcement and auto-remediation capabilities. The platform operates through a set of rules, which are in a YAML configuration file, and focuses on cost optimization. Harness Cloud Asset Governance provides tools to optimize your cloud spend and avoid unnecessary costs.

The platform is built on top of [Cloud Custodian](https://cloudcustodian.io/), an open-source project that is incubated by the Cloud Native Computing Foundation (CNCF).

Governance-as-Code is a modern approach that enables organizations to automate and manage various aspects of cloud governance using code. It utilizes software versioning, declarative programming languages, and automation mechanisms to synthesize cloud policies into a cloud-specific language that is implemented through a YAML configuration file. 

At a high level, Cloud Custodian integrates seamlessly with services, features, and resources native to AWS, Azure, and GCP. The platform's basic syntax of resources, filters, and actions eliminates the complexity of API calls, business logic, and data translation, making cloud policy authorship more straightforward and efficient.


:::info important
Harness supports only AWS cloud governance in its initial release.
:::

## Anatomy of a cloud asset governance rule

Cloud policies use a declarative vocabulary of resources, filters, and actions to be configured in YAML. This vocabulary is explained in the table below:

<table>
  <tr>
   <td><strong>YAML Key</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>policy
   </td>
   <td>A Cloud Custodian policy is defined in YAML format and consists of a set of filters and actions that are applied to a specific type of AWS resource.
   </td>
  </tr>
  <tr>
   <td>resource
   </td>
   <td>In Cloud Custodian, a cloud resource or service (such as ASG, S3, EC2, ELBs, RDS, etc.) is referred to as a "key" in a policy file. This key specifies the type of cloud resource or service that the following actions and filters act upon. Go to <a href="https://cloudcustodian.io/docs/filters.html">Cloud Custodian documentation</a> for more information. 
   </td>
  </tr>
  <tr>
   <td>filters
   </td>
   <td>In Cloud Custodian, filters are criteria that are used to narrow down resources based on their attributes. These attributes include tags, metadata, or other resource properties. The result of a filter is an output of resources that meet the criteria specified in the filter. This output is then used as the input for the actions defined in the policy.
<p>
Filters in Cloud Custodian are essentially key-value pairs that can also be used more generically. They allow users to specify conditions that must be met for a resource to be included in the output. Go to <a href="https://cloudcustodian.io/docs/filters.html"> Cloud Custodian documentation</a> for more information.</p>
   </td>
  </tr>
  <tr>
   <td>actions
   </td>
   <td>In Cloud Custodian, actions are operations that can be performed on a resource and are applied to the output of the filters specified in the policy. Actions can include things like terminating an EC2 instance, deleting an S3 bucket, or sending an email notification.
<p>
Actions in Cloud Custodian are essentially webhooks that are executed when the criteria specified in the policy are met. These webhooks can also be used more generically, allowing the automation of a wide range of tasks. </p>
   </td>
  </tr>
</table>


Here’s an example of a **cloud asset governance policy** to migrate your Amazon EBS volumes from gp2 to gp3 and save up to 20% on costs:


```
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

## How are cost savings calculated?

Cost savings are calculated for the last 30 days. However, for rightsizing rules, it depends on the resize percentage specified in the policy. For example, let's consider the following rule to resize an RDS instance. The potential or realized cost savings is 30% of the last 30 days cost.

```
policies:
  - name: rds-resize-down
    resource: rds
    filters:
      - type: metrics
        name: CPUUtilization
        days: 10
        period: 86400
        value: 50
        op: less-than
    actions:
      - type: resize
        percent: -30
        immediate: true
```

<!-- For resizing, let's consider a policy for EBS volume migration from gp2 to gp3: 

```
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
Executing this rule can potentially result in cost savings of up to 30%. However, the decision to resize should consider workload requirements and performance needs. Generally, gp3 volumes have a lower price per GB compared to gp2 volumes. It's important to note that there are scenarios where gp2 volumes may still be the preferred option. For instance, if your workload involves numerous small, random I/O operations, gp2 volumes offer better IOPS performance compared to gp3 volumes. 

Deleting an EBS snapshot: You might have two policies related to deleting EBS snapshots.

* `delete-snapshot-with-no-volume
`
```
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
* `delete-snapshot-unused`
```
policies:
  - name: delete-snapshot-unused
    resource: ebs-snapshot
    filters:
      - type: unused
        value: true
    actions:
      - delete
```
An EBS snapshot with no associated volume refers to a snapshot that was created from a volume that no longer exists. It may still incur storage costs if it contains data, but it cannot be used to create a new volume. It is recommended to delete such snapshots as they do not provide any value to your infrastructure.

On the other hand, an unused EBS snapshot refers to a snapshot that is not currently being utilized by any resources, such as an EC2 instance or an AMI. This type of snapshot can still be valuable as it can be used to create a new volume or restore an existing one. However, if an unused snapshot is no longer needed, deleting it can help reduce storage costs.

In summary, an EBS snapshot with no volume is an orphaned resource that cannot be used, while an unused EBS snapshot is a potentially useful resource that is not currently in use.-->

## AWS access permissions

Enable the following permissions in AWS to execute cloud governance rules:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "ec2:Describe*",
                "ec2:DeleteSnapshot",
                "ec2:DeleteVolume",
                "ec2:Get*",
                "ec2:ListImagesInRecycleBin",
                "ec2:ListSnapshotsInRecycleBin",
                "elasticbeanstalk:Check*",
                "elasticbeanstalk:Describe*",
                "elasticbeanstalk:List*",
                "elasticbeanstalk:Request*",
                "elasticbeanstalk:Retrieve*",
                "elasticbeanstalk:Validate*",
                "elasticloadbalancing:Describe*",
                "rds:Describe*",
                "rds:List*",
                "autoscaling-plans:Describe*",
                "autoscaling-plans:GetScalingPlanResourceForecastData",
                "autoscaling:Describe*",
                "autoscaling:GetPredictiveScalingForecast",
                "s3:DescribeJob",
                "s3:Get*",
                "s3:List*"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
}
```

:::info
* This is not an exhaustive list; you may require additional permissions to support custom rules.
* A yellow underline in a custom policy indicates that you need permission to support the underlined filters and/or actions.
To learn how to add missing permissions in AWS, go to [Add permissions](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md#add-permissions).
:::





---
title: GCP Recommendations
description: This topic describes how to optimize cloud costs using asset governance.
# sidebar_position: 2
---

Recommendations help kickstart your journey with governance. Essentially, Harness runs certain policies behind the scenes to generate recommendations for your governance-enabled GCP projects. These policies not only help to cut costs but also increase the efficiency of your system. On the Governance Overview page, Harness showcases recommendations that will benefit you to save costs on associated resources. You can click on any recommendation to view its details. 

Listed below are the custodian policies which are used to generate recommendations that Harness offers for GCP. Along with each policy, you can also find their respective descriptions, the logic behind savings computation and the permissions required to generate or apply these recommendations.

### Recommendation: delete-gcp-idle-compute-images
**Description:** Delete GCP recommended idle images

**Policy Used:**
```yaml
policies:
  - name: delete-gcp-idle-compute-images
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

### Recommendation: delete-gcp-never-attached-disks
**Description:** Delete GCP recommended idle persistent disks which were never attached to a VM and is blank

**Policy Used:**
```yaml
policies:
  - name: delete-gcp-never-attached-disks
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

### Recommendation:  gcp-stop-forever-running-instance
**Description:** Stop the gcp instances that have an uptime greater than 30 days.
   
**Policy Used:**
```yaml
policies:
  - name: gcp-stop-forever-running-instance
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

### Recommendation: gcp-delete-old-snapshot
**Description:** Delete gcp snapshots older than 14 days.
  
**Policy Used:**
```yaml
policies:
  - name:  gcp-delete-old-snapshot
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

### Recommendation: stop-underutilized-instances
**Description:** Stop underutilised instances with average CPU utilisation less than 5% in last 3 days.

**Policy Used:**
```yaml
policies:
  - name: stop-underutilized-instances
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


### Recommendation: stop-underutilized-sql-instances
**Description:** Stop underutilised sql instances with average CPU utilisation less than 5% in last 3 days

**Policy Used:**
```yaml
policies:
  - name: stop-underutilized-sql-instances
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

### Recommendation: snapshot-and-delete-gcp-unattached-disk
**Description:** Snapshot and delete GCP recommended idle persistent disks which are unattached

**Policy Used:** 
```yaml
policies:
  - name: snapshot-and-delete-gcp-unattached-disk
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

## Custom Policies

1. Check if an SSL Certificate is About to Expire:

```yaml
policies:
    - name: appengine-certificate-age
      description: |
        Check existing certificate
      resource: gcp.app-engine-certificate
      filters:
      - type: value
        key: expireTime
        op: less-than
        value_type: expiration
        value: 60
      actions:
       - type: notify
         subject: Certificates expiring in 60 days
         to:
           - email@address
         format: txt
         transport:
           type: pubsub
           topic: projects/my-gcp-project/topics/my-topic
```

2. Delete Instance Templates with Wrong Settings:

```yaml
vars:
  # See https://cloud.google.com/compute/docs/machine-types
  disallowed-machine-types: &disallowed-machine-types
    - "f1-micro"
    - "g1-small"
    - "n1-highcpu-32"
    - "n1-highcpu-64"
    - "n1-highcpu-96"

policies:
  - name: gcp-instance-template-delete-disallowed-machine-types
    resource: gcp.instance-template
    filters:
      - type: value
        key: properties.machineType
        op: in
        value: *disallowed-machine-types
    actions:
      - type: delete
```

3. Notify if Logging is Disabled in DNS Policy:

```yaml
policies:
    - name: gcp-dns-policies-notify-if-logging-disabled
      resource: gcp.dns-policy
      filters:
        - type: value
          key: enableLogging
          value: false
      actions:
        - type: notify
          to:
            - email@email
          format: json
          transport:
            type: pubsub
            topic: projects/cloud-custodian/topics/dns

```

4. List Unsucessful Backups Older Than N Days:

```yaml
policies:
- name: sql-backup-run
  description: |
    check basic work of Cloud SQL filter on backup runs: lists unsucessful backups older than 5 days
  resource: gcp.sql-backup-run
  filters:
    - type: value
      key: status
      op: not-equal
      value: SUCCESSFUL
    - type: value
      key: endTime
      op: greater-than
      value_type: age
      value: 5
  actions:
    - type: notify
      to:
       - email@address
      # address doesnt matter
      format: txt
      transport:
        type: pubsub
        topic: projects/river-oxygen-233508/topics/first
```

5.Check for Hanged Job:

```yaml
policies:
  - name: gcp-dataflow-jobs-update
    resource: gcp.dataflow-job
    filters:
      - type: value
        key: startTime
        op: greater-than
        value_type: age
        value: 1
      - type: value
        key: currentState
        value: [JOB_STATE_RUNNING, JOB_STATE_DRAINING, JOB_STATE_CANCELLING]
    actions:
      - type: notify
        to:
          - email@address
        format: json
        transport:
          type: pubsub
          topic: projects/cloud-custodian/topics/dataflow

```


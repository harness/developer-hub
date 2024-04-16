---
title: GCP Recommendations
description: This topic describes how to optimize cloud costs using asset governance.
# sidebar_position: 2
---

Recommendations help kickstart your journey with governance. Essentially, Harness runs certain policies behind the scenes to generate recommendations for your governance-enabled Azure subscriptions. These policies not only help to cut costs but also increase the efficiency of your system. On the Governance Overview page, Harness showcases recommendations that will benefit you to save costs on associated resources. You can click on any recommendation to view its details. 

Listed below are the custodian policies which are used to generate recommendations that Harness offers for GCP. Along with each policy, you can also find their respective descriptions, the logic behind savings computation and the permissions required to generate or apply these recommendations.

### Recommendation: gcp-idle-compute-vm
**Description:** List GCP Idle Compute Instance Recommendations

**Policy Used:**
```yaml
policies:
  - name: gcp-idle-compute-vm
    description: |
      List GCP Idle Compute Instance Recommendations
    resource: gcp.instance
    filters:
      - type: recommend
        id: google.compute.instance.IdleResourceRecommender   
```
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- `recommender.computeInstanceIdleResourceRecommendations.list`

---

### Recommendation: gcp-idle-compute-images
**Description:** List GCP Idle Compute Images Recommendations

**Policy Used:**
```yaml
policies:
  - name: gcp-idle-compute-images
    description: |
      List GCP Idle Compute Images Recommendations
    resource: gcp.image
    filters:
      - type: recommend
        id: google.compute.image.IdleResourceRecommender
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:**
- `recommender.computeImageIdleResourceRecommendations.list`

---

### Recommendation:  gcp-idle-sql-instances
**Description:** List GCP Idle SQL Instance Recommendations

**Policy Used:**
```yaml
policies:
  - name: gcp-idle-sql-instances
    description: |
      List GCP Idle SQL Instance Recommendations
    resource: gcp.sql-instance
    filters:
      - type: recommend
        id: google.cloudsql.instance.IdleRecommender
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- `recommender.cloudsqlIdleInstanceRecommendations.list`

---

### Recommendation: gcp-idle-persistent-disks
**Description:** List GCP Idle Persistent Disks Recommendations

**Policy Used:**
```yaml
policies:
  - name: gcp-idle-persistent-disks
    description: |
      List GCP Idle Persistent Disks Recommendations
    resource: gcp.disk
    filters:
      - type: recommend
        id: google.compute.disk.IdleResourceRecommender
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- `recommender.computeDiskIdleResourceRecommendations.list`

---

### Recommendation: gcp-network-unattached-routers
**Description:** Deletes unattached Cloud Routers

**Policy Used:**
```yaml
policies:
  - name: gcp-network-unattached-routers
    description: Deletes unattached Cloud Routers
    resource: gcp.router
    filters:
      - type: value
        key: interfaces
        value: absent
    actions:
      - delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- `compute.routers.list`

---

### Recommendation: gcp-memorystore-for-redis-auth
**Description:** GCP Memorystore for Redis has AUTH disabled

**Policy Used:**
```yaml
policies:
  - name: gcp-memorystore-for-redis-auth
    description: |
      GCP Memorystore for Redis has AUTH disabled
    resource: gcp.redis
    filters:
      - type: value
        key: authEnabled
        op: ne
        value: true
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- `redis.instances.list`

---

### Recommendation: gcp-add-multiple-labels
**Description:** Label all existing instances with multiple labels 

**Policy Used:** 
```yaml
policies:
  - name: gcp-add-multiple-labels
    resource: gcp.instance
    description: |
      Label all existing instances with multiple labels
    actions:
     - type: set-labels
       labels:
         environment: test
         env_type: customer
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- `compute.instances.update`

---

### Recommendation: gcp-delete-old-snapshot
**Description:** Delete gcp snapshots older than 14 days

**Policy Used:**
```yaml
policies:
  - name: gcp-delete-old-snapshot
    resource: gcp.snapshot
    description: |
      Delete gcp snapshots older than 14 days
    filters:   
    - type: value
      key: creationTimestamp
      op: greater-than
      value_type: age
      value: 14
    actions:
    - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- `compute.snapshots.list`

---

### Recommendation: gcp-list-low-utilised-bucket
**Description:** List low utilised gcp buckets over last 7 days

**Policy Used:**
```yaml
policies:
  - name: gcp-list-low-utilised-bucket
    description: |
      List low utilised gcp buckets over last 7 days
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

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- `storage.buckets.list`

---

### Recommendation: gcp-stop-forever-running-instance
**Description:** Stop the gcp instances that have an uptime greater than 30 days.

**Policy Used:**
```yaml
policies:
  - name: gcp-stop-forever-running-instance
    description:
      Stop the gcp instances that have an uptime greater than 30 days.
    resource: gcp.instance
    filters:
      - type: metrics
        name: compute.googleapis.com/instance/uptime_total
        aligner: ALIGN_NONE
        value: 2592000
        op: greater-than
    actions:
      - type: stop
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** 
- `compute.instances.update`

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


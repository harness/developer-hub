---
title: Terraform for Automatic Scheduled Autostopping
description: Automatically Create EC2/RDS Schedule Based Autostopping Rules using Terraform
---

# Overview

When creating autostopping rules by hand in the Harness UI, scale can be a real problem. With many AWS accounts and many instances to manage, we need to lean on infrastructure as code to create these rules and schedules automatically.

## Permissions

You will need access to describe EC2 instances in AWS and create AutoStopping rules in Harness.

## Setup Providers

We need to leverage the AWS and Harness Terraform providers. We will use these to query for instances to stop and create the rules/schedules accordingly.

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    harness = {
      source = "harness/harness"
    }
  }
}
```

## Get Data From AWS

First we can use the AWS provider and a data resource for EC2 instances to get instances that have a specific tag. In this case, we are looking for instances which have been tagged with Schedule equal to us-work-hours.

```
data "aws_instances" "this" {
  instance_tags = {
    Schedule = "us-work-hours"
  }
}
```
We can also get RDS instances the same way.

```
data "aws_db_instances" "this" {
  tags = {
    Schedule = "us-work-hours"
  }
}
```

## Create AutoStopping Rules

Use the Harness provider to create autostopping rules from the AWS data we received for EC2 and RDS instances

```
# EC2
resource "harness_autostopping_rule_vm" "this" {
  for_each           = toset(data.aws_instances.this.ids)
  name               = "${each.key} us-work-hours"
  cloud_connector_id = "rileyharnessccm"
  idle_time_mins     = 5
  filter {
    vm_ids = [
      each.key
    ]
    regions = [
      data.aws_instances.this.id # region of instances
    ]
  }
}

# RDS
resource "harness_autostopping_rule_rds" "this" {
  for_each           = toset(data.aws_db_instances.this.instance_identifiers)
  name               = "${each.key} us-work-hours"
  cloud_connector_id = "rileyharnessccm"
  idle_time_mins     = 5
  database {
    id     = each.key
    region = data.aws_db_instances.this.id
  }
}
```

## Create a Schedule For Each AutoStopping Rule

Now that the rules are created, attach a schedule to each rule that matches the time you want the instance to stay on.

```
resource "harness_autostopping_schedule" "this" {
  name          = "usworkhours"
  schedule_type = "uptime"
  time_zone     = "EST"

  repeats {
    days       = ["MON", "TUE", "WED", "THU", "FRI"]
    start_time = "11:00" 
    end_time   = "17:00"
  }

  rules = concat([
    for rule in harness_autostopping_rule_vm.this : rule.id
    ], [
    for rule in harness_autostopping_rule_rds.this : rule.id
  ])
}
```

## Conclusion

This is a general example of one AWS account.  You can scale this out to implement these rules across many AWS accounts.
---
title: Scheduled Autostopping using Terraform
description: Creating schedule based autostopping rules using Terraform
---

# Overview

When creating autostopping rules by hand in the harness UI, scale can be a real problem. With many aws accounts and many instances to manage we need to lean on infrastructure as code to create these rules and schedules automatically.

To do this we can leverage the AWS and Harness Terraform providers to query for instances to stop and create the rules/schedules accordingly.

## Setup

First initialize both the AWS and Harness terraform providers.

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
    harness = {
      source  = "harness/harness"
    }
  }
}
```

You can read the [AWS provider documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) for all the ways to set up authentication.

For the Harness provider, you can set the following enviornment variables:

- `HARNESS_ACCOUNT_ID`: your harness account identifier
- `HARNESS_PLATFORM_API_KEY`: a harness api key, with ccm:autostopping-rule:create

We will need to set a variable for the Harness CCM AWS connector ID that cooresponds to the AWS account we are checking for instances in:

```
variable "cloud_connector_id" {
    type    = string
    default = "<your_connector_id_here>"
}
```

## Data sources

Next we can use the AWS provider and data resources to get instances that have a specific tag. In this case I am looking for instances which engineers have tagged with `Schedule` equal to `us-work-hours`.

For EC2:

```
data "aws_instances" "this" {
  instance_tags = {
    Schedule = "us-work-hours"
  }
}
```

For RDS:

```
data "aws_db_instances" "this" {
  tags = {
    Schedule = "us-work-hours"
  }
}
```

## Creating rules

Once we have our instances we can loop over the results and create autostopping rules for each using the Harness provider.

EC2:

```
resource "harness_autostopping_rule_vm" "this" {
  for_each           = toset(data.aws_instances.this.ids)
  name               = "${each.key} us-work-hours"
  cloud_connector_id = var.cloud_connector_id
  idle_time_mins     = 5
  filter {
    vm_ids = [
      each.key
    ]
    regions = [
      data.aws_instances.this.id
    ]
  }
}
```

RDS:

```
resource "harness_autostopping_rule_rds" "this" {
  for_each           = toset(data.aws_db_instances.this.instance_identifiers)
  name               = "${each.key} us-work-hours"
  cloud_connector_id = var.cloud_connector_id
  idle_time_mins     = 5
  database {
    id     = each.key
    region = data.aws_db_instances.this.id
  }
}
```

# Creating schedules

Now that we have all the rules created, we can make a schedule and attach it to each rule.

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

When creating autostopping rules for instances that do not have a way to measure traffic (ALB/Proxy) Harness will assume the instance is always idle, and thus always want to shut it down. Because of this, we simply set an uptime schedule for the hours we want the instance to be online, and any times outside that window Harness will shut the instance down.

# Conclusion

With the above we have autostopping rules and a schedule created for each instance that has our target tag and value. You can repeat this for every schedule type you want to support, across all accounts and regions.

If instances are deleted, or the tags removed, rerunning the terraform will result in the rule being deleted and the instance no longer being stopped by Harness. Because of this it is suggested that you set this terraform ro tun on a schedule.

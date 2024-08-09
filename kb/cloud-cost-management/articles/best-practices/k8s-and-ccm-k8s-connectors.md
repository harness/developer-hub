---
title: Connectors For K8s and CCM K8s
description: Automatically create Harness connectors that are required to get K8s costs into CCM
---

# Overview

The process below defines how to provision Harness connectors to get K8s costs into CCM.

## Permissions

You will need access to create CCM connectors in Harness.

## Setup Providers

We need to leverage the Harness Terraform provider. We will use this provider to create two connectors for each cluster.  We will also define all of our cluster names within Terraform `locals` block.  The cluster names will be used to create the connectors.

```
terraform {
  required_providers {
    harness = {
      source = "harness/harness"
    }
  }
}

provider "harness" {}

locals {
    cluster_names = toset(["cluster-a", "cluster-b", "cluster-c"])
}
```

## Create A K8s Connector For Each Cluster

This is the first connector we need to provision.  It addresses the question: "How do I connect to the delegate in the cluster"?

```
resource "harness_platform_connector_kubernetes" "cluster-connector" {
  for_each = local.cluster_names
  identifier  = replace(each.value, "-", "_")
  name        = replace(each.value, "_", "-")

  inherit_from_delegate {
    delegate_selectors = [each.value]
  }
}
```

## Create A CCM K8s Connector For Each Cluster

This connector can only be provisioned after the K8s connector.  It's in charge of letting the process know we need to start gathering metrics for CCM.

```
resource "harness_platform_connector_kubernetes_cloud_cost" "ccm-cluster-connector" {
  for_each = local.cluster_names
  identifier  = "${replace(each.value, "-", "_")}_ccm"
  name        = "${replace(each.value, "_", "-")}-ccm"

  features_enabled = ["VISIBILITY", "OPTIMIZATION"]
  connector_ref    = harness_platform_connector_kubernetes.cluster-connector[each.key].id
}
```

## Conclusion

This is a general example of taking a list of clusters and creating the two necessary connectors to get K8s costs into CCM.  Before you create these connectors, you need to be sure you have a delegate running in the cluster.  If the EKS clusters are running in AWS, the metrics server also needs to be enabled in each cluster.
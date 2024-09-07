---
description: KB - How to Manage Harness through Crossplane with the provider-terraform
title: Manage Harness with Crossplane
---

# Manage Harness with Crossplane

Many organizations are adopting [Crossplane](https://www.crossplane.io/) to manage their infrastructure as code. Crossplane enables them to provision and manage the lifecycle of their resources across multiple cloud providers seamlessly through their Kubernetes cluster as custom resource defintions (CRDs).

Luckily, Crossplane has an existing [provider-terraform](https://marketplace.upbound.io/providers/upbound/provider-terraform/v0.17.0) to integrate with Terraform, allowing users to leverage the existing [Harness Terraform provider](https://registry.terraform.io/providers/harness/harness/latest/docs) to manage Harness resources such as Projects, Organizations, and Connectors using their Kubernetes environment.

## Installing Crossplane
This guide was created 09/07/2024 from the [provider-terraform v0.17.0](https://marketplace.upbound.io/providers/upbound/provider-terraform/v0.17.0) documentation and assumes you are using the following setup steps for Crossplane on a standard Kubernetes cluster:

1. Install the Up command-line tool from upbound
```
$ curl -sL "https://cli.upbound.io" | sh
$ mv up /usr/local/bin/
```
2. Install the Universal Crossplane CRDs
```
$ up uxp install
```
3. Validate that you have Crossplane installed correctly
```
$ kubectl get pods -n upbound-system
NAME                                       READY   STATUS    RESTARTS      AGE
crossplane-ddc974f67-kp6t2                 1/1     Running   0             93s
crossplane-rbac-manager-7978c5f8df-8w8sg   1/1     Running   0             93s
upbound-bootstrapper-754f65bd-h92tm        1/1     Running   0             93s
xgql-8fb949dcf-pxn4z                       1/1     Running   3 (52s ago)   93s
```

## Install the Harness Provider and Provider Config
1. Install the [Terraform Crosslane Provider](https://marketplace.upbound.io/providers/upbound/provider-terraform/v0.17.0):

```yaml title="provider.yaml"
apiVersion: pkg.crossplane.io/v1
kind: Provider
metadata:
  name: provider-terraform
spec:
  package: xpkg.upbound.io/upbound/provider-terraform:v0.17.0
```

```sh
$ kubectl apply -f provider.yaml

# Validate
$ kubectl get provider
NAME                                   AGE
providerconfig.tf.upbound.io/harness   16m

NAME                                                                     AGE    CONFIG-NAME   RESOURCE-KIND   RESOURCE-NAME
providerconfigusage.tf.upbound.io/11f24fc3-cc44-4c59-91a8-fae24e17b6fc   8m4s   harness       Workspace       harness-project
```
1. Create a `terraform.tfvars.json` with credentials for the Harness terraform provider replacing with your actual gateway `endpoint`, `account_id`, and `platform_api_key` from a [Harness Personal Access Token (PAT) or Service Access Token(SAT)](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/) ensuring the token is assigned the correct [RBAC](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/) controls to create the desired resources:
```json title="terraform.tfvars.json"
{
    "endpoint": "https://app.harness.io/gateway",
    "account_id":"XXXXXXXXXXXXXXXXXXX",
    "platform_api_key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```
1. Create a secret from the `terraform.tfvars.json` file using the following command:
```sh
$ kubectl create secret generic harness-credentials -n upbound-system --from-file=credentials=terraform.tfvars.json
```
1. Create the `harness` crossplane ProviderConfig
```yaml title="providerconfig-harness.yaml"
apiVersion: tf.upbound.io/v1beta1
kind: ProviderConfig
metadata:
  name: harness
spec:
  configuration: |
    terraform {
      backend "kubernetes" {
        secret_suffix = "providerconfig-default"
        namespace = "upbound-system"
        in_cluster_config = true
      }
      required_providers {
        harness = {
          source = "harness/harness"
          version = "0.32.5"
        }
      }
    }

    variable "endpoint" {
      type = string
      description= "The API endpoint for Harness, typically https://app.harness.io/gateway"
    }

    variable "account_id" {
      type = string
      description = "The unique identifier for your Harness account"
    }

    variable "platform_api_key" {
      type = string
      description = "The API (PAT or SAT) key for accessing the Harness platform https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/"
      sensitive = true
    }

    provider "harness" {
      endpoint = var.endpoint
      account_id = var.account_id
      platform_api_key = var.platform_api_key
    }
  credentials:
    - filename: terraform.tfvars.json
      secretRef:
        key: credentials
        name: harness-credentials
        namespace: upbound-system
      source: Secret
```
```sh
$ kubectl apply -f providerconfig-harness.yaml

# Validate
$ kubectl get providerconfig
NAME      AGE
harness   17m
```

> **Tip:**
> Alternatively, you can also provide the sensitive variables such as the `platform_api_key` directly as one variable from an individual secret string. Please see [this commit](https://github.com/upbound/provider-terraform/commit/3f88312dc468f0eaa232b97e910306f6bea241a5) and the corresponding [PR](https://github.com/upbound/provider-terraform/pull/74) for guidance.

## Creating Harness Resources
In the provided example, we simply create a project with the identifier `test_project` in the `default` organization. The `default` organization is one that is available in pretty much all new Harness accounts, but feel free to modify the organization to match your specific setup.
```yaml title="harness-project.yaml"
apiVersion: tf.upbound.io/v1beta1
kind: Workspace
metadata:
  name: harness-project
  annotations:
    # The terraform workspace will be named 'harness-project'. If you omit this
    # annotation it would be derived from metadata.name - e.g. 'example-inline'.
    crossplane.io/external-name: harness-project
spec:
  providerConfigRef:
    name: harness
  forProvider:
    # Workspaces default to using a remote source - like workspace-remote.yaml.
    # For simple cases you can use an inline source to specify the content of
    # main.tf as opaque, inline HCL.
    source: Inline
    module: |
      resource "harness_platform_project" "test" {
        identifier = "test_project"
        name       = "Test Project"
        // This can be modified but for now we'll use the default available in all new Harness accounts
        org_id     = "default"
        color      = "#0063F7"
      }
```
```sh
kubectl apply -f harness-project.yaml

# Validate
kubectl get workspace harness-project 
NAME              SYNCED   READY   AGE
harness-project   True     True    9m28s
```

You should now see this sample project in your Harness account!

## Deleting Harness Resources
Deletion follows the same deletion policy as other Crossplane resources (https://docs.crossplane.io/latest/concepts/managed-resources/#deletionpolicy) so unless you modify the default `deletionPolicy: Delete` applied to most workspaces then the resource will delete when you do a `kubectl delete`.

## Troubleshooting
As these are standard Kubernetes CRDs, troubleshooting is as simple as `kubectl describe` for any resources, where you can see any event details that may be preventing a resource from standing up or shutting down.
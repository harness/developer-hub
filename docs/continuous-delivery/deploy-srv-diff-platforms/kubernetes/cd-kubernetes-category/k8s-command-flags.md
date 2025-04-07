---
title: Add Kubernetes Command Flags
description: This topic describes the support for different command flags in different K8s steps
sidebar_position: 20
---

## Overview

In Kubernetes, commands are made up of two main components:

Command types: These represent the core actions you can perform on your cluster resources, such as `get`, `apply`, `delete`, `patch`, and `logs`. Each type maps to a specific operational intent—retrieving, modifying, or managing resources.

Command flags: These are optional parameters that allow you to customize the behavior of each command. For example, flags like `--namespace`, `-o`, `--force`, or `--watch` let you specify the target namespace, output format, execution mode, and more.

Together, command types and flags give you powerful control over how you interact with your Kubernetes workloads using kubectl.

## Where you can add command flags in different k8s steps

Navigate to the executions tab of the deploy stage and select the k8s step you want to add.
In the advanced tab of the step details, you can add the required command in the command flag dropdown.

Each k8s step supports a particular command type based on the type of execution the step performs.

## k8s command types and its command flags 

### `kubectl apply`

**Description:**  
The `kubectl apply` command is used to create or update resources in a Kubernetes cluster from a configuration file (usually in YAML or JSON format). It is commonly used for deploying applications or updating configurations for existing resources.

| Flag                       | Description                                                   |
|----------------------------|---------------------------------------------------------------|
| `-f`                        | File or directory with manifests                              |
| `--record`                  | Record the command in resource annotation                     |
| `--dry-run=client/server`   | Preview changes without applying                              |
| `--prune`                   | Delete objects not in the configuration file                  |
| `--force-conflicts`         | Force apply changes during conflicts                           |

You can use this command in:
- [K8s Rolling Deploy](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment/)
- [K8s Canary Deploy](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment/)
- [K8s Blue Green Deploy](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment/)
- [K8s Apply](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step/)
- [K8s Rollout Rollback](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollout-step/)

For more information on `kubectl apply` command, refer [Kubernetes Documentation](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/)

### `kubectl delete`

**Description:**  
The `kubectl delete` command is used to remove resources (e.g., pods, services, deployments) from the Kubernetes cluster. It helps to clean up or remove unnecessary resources.

| Flag              | Description                                              |
|-------------------|----------------------------------------------------------|
| `-f`              | Manifest file                                            |
| `--grace-period`  | Time to wait before forcefully terminating               |
| `--force`         | Force deletion                                           |
| `--wait`          | Wait for resource deletion to complete                   |

You can use this command in the following step:
- [K8s Delete step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources/)

For more information on `kubectl delete` command, refer [Kubernetes Documentation](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/)

### `kubectl rollout`

**Description:**  
The `kubectl rollout` command is used to manage the rollout process of deployments. It’s used to view or manage the status of an application’s deployment or perform rollbacks to previous versions.

| Flag          | Description                                         |
|---------------|-----------------------------------------------------|
| `--revision`  | Specify revision to rollback                        |
| `--watch`     | Watch status updates                                |

This command can be added in the following step:
- [K8s Rollout step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollout-restart/)

For more information on `kubectl rollout` command, refer [Kubernetes Documentation](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/)

### `kubectl patch`

**Description:**  
The `kubectl patch` command allows you to modify an existing Kubernetes resource. It applies changes to a specific part of a resource’s configuration (using either JSON or a strategic merge patch).

| Flag                       | Description                                                   |
|----------------------------|---------------------------------------------------------------|
| `--patch`                   | The actual patch to apply (as a JSON string)                  |
| `--patch-type`              | One of: strategic, merge, json                                |
| `-n, --namespace`           | Namespace of the target resource                              |
| `--type`                    | Alias for `--patch-type`                                      |
| `--dry-run=client/server`   | Preview changes without applying                              |
| `-o`                        | Output format (json, yaml, etc.)                              |

You can use this command in the following step:
- [K8s Patch Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-patch-step/)

For more information on `kubectl patch` command, refer [Kubernetes Documentation](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_patch/)
---
title: ChaosGuard
sidebar_position: 2
description: ChaosGuard concepts and how you can enforce them
redirect_from:
    - /docs/chaos-engineering/configure-chaos-experiments/chaosguard/chaosguard-concepts
---
This section walks you through the concepts of ChaosGuard and how they enforce advanced security policies on a chaos-enabled platform.

## ChaosGuard concepts

ChaosGuard consists two elements: **Condition** and **Rule**.

### Condition

Condition is an execution plane construct that is static, meaning it is often pre-defined (typically configured by the admin personas) and you can store it offline (such as in a conditions library or repository).

The default structure of a condition is to block or deny a fault or set of faults on a given **execution context** associated with a cluster (or namespace), the service(s), and the service account used for the injection process.

* **WHAT** clause describes the attribute (in this case, chaos fault) on which you can apply the condition. This field takes a regex-like pattern, that is, the * symbol, to indicate all characters preceding or succeeding a particular string.


* **WHERE** clause describes the name of the Kubernetes infrastructure where you can apply the condition.


* **WHICH** clause describes the namespace and the app label in which you can apply the condition. You can have more than one namespace and app label associated with a condition.


* **USING** clause describes the service account under which you apply the condition. You can have more than one service account configured for a condition.


:::tip
The service account refers to the Kubernetes or Openshift service account. This account is backed by a role (or ClusterRole) and is associated with a native or third-party security policy or admission controller within the cluster, such as PodSecurityPolicy (PSP), SecurityContextConstraint (SCC), Kyverno, OPA Gatekeeper, etc.
With ChaosGuard, by limiting the service account you (as a user) can use within your experiment definitions, HCE limits the privileges you can have within the cluster.
:::

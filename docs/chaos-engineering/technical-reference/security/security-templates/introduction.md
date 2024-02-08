---
title: Introduction to security templates
sidebar_position: 1
description: Introduction to security templates 
---

This section introduces you to various security policies you can use with HCE. 

Security management is a continuous process which is essential to keep businesses safe. Providing dynamic security controls without hindering the developer productivity helps businesses control, defend, and extend their application. 

The deployments that comprise the chaos infrastructure and the transient experiment pods launched to inject faults use the [in-cluster configuration](https://kubernetes.io/docs/tasks/run-application/access-api-from-pod/) to make Kubernetes API calls, and thereby auto-mount service token secrets. The execution happens through non-root users with containers running secure base images. 

Faults like pod network fault and stress faults require container-runtime-specific operations like entering network and pid namespaces. The operations require privilege escalation, manipulating the cgroup, and so on. In these cases, some of the pods are designed to run with privileged containers and root users. These pods also mount the runtime-specific socket files from the underlying host. However, it is important to note that such pods are short-lived (they exist for the duration of chaos) and can be run only if the users equip the serviceaccounts with access to the right security policy.

To enable the execution of such experiments, Harness recommends the security policy templates ([PSP](/docs/chaos-engineering/technical-reference/security/security-templates/psp), [OpenShift SCC](/docs/chaos-engineering/technical-reference/security/security-templates/openshift-scc), and [Kyverno](/docs/chaos-engineering/technical-reference/security/security-templates/kyverno-policies)).

## Next steps

* [Openshift Security Context Constraint](/docs/chaos-engineering/technical-reference/security/security-templates/openshift-scc)
* [Pod Security Policy](/docs/chaos-engineering/technical-reference/security/security-templates/psp)
* [Kyverno policies](/docs/chaos-engineering/technical-reference/security/security-templates/kyverno-policies)
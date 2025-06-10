---
id: service-discovery
sidebar_position: 1
title: Service Discovery
---

## Before you begin, review the following:

- [Service Discovery](/docs/platform/service-discovery/)

### How does Harness CE leverage discovered services?

Harness CE uses the discovered services to identify the various available services in the chaos module, that is, the chaos targets in the Kubernetes cluster that you can deploy using Harness or other means.

As an Harness CE user, service discovery simplifies your decision-making around:

- Which service to target to inject chaos?
- Which chaos faults to inject into a target service?
- What validations and health checks to perform while executing chaos faults?

Consequently, you will be able to find the resilience of your service (with the help of resilience coverage reports, service-level resilience scores, and other such metrics).

:::tip
You can leverage all the [permissions mentioned](/docs/chaos-engineering/security/security-templates/openshift-scc#run-service-account-as-a-cluster-admin) for fault execution as well as service discovery.
:::

### Advantages

- Reduces overhead of creating a database with services
- User-friendly
- Increased adoption of Harness CE

When you are onboarding, one of the steps involves discovering services. Harness CE creates the discovery agent that automatically discovers services for your application.

## Next Steps

- [Customize Discovery Agent](/docs/platform/service-discovery/#customize-discovery-agent)
- [Delete Discovery Agent](/docs/platform/service-discovery/#delete-discovery-agent)

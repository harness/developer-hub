---
title: Harness Self-Managed Enterprise Edition FAQs
description: Here are some frequently asked questions about Harness Self-Managed Enterprise Edition.
sidebar_position: 10
---

This topic addresses some frequently asked questions about Harness Self-Managed Enterprise Edition.

## How do I create my Harness account and my first project?

You create your Harness account the first time you use Harness Self-Managed Enterprise Edition. You are automatically assigned the Harness user role, Account Admin. For more information, go to [Create your Harness account](/docs/self-managed-enterprise-edition/get-started/onboarding-guide#create-your-harness-account) and [Create your first project](/docs/self-managed-enterprise-edition/get-started/onboarding-guide#create-your-first-project) in the Onboarding guide.

## How do I deploy Harness modules?

You can add modules by editing the `override.yaml` file.

The Platform component and the module below is enabled by default:

- Harness Continuous Deployment (CD) - Next Generation

The Harness modules below can be enabled or disabled conditionally:

- Harness Chaos Engineering (CE)
- Harness Cloud Cost Management (CCM)
- Harness Continuous Integration (CI)
- Harness Security Testing Orchestration (STO)
- Harness Service Reliability Management (SRM)
- Harness Feature Flags (FF)

For more information, go to [Deploy Harness modules](/docs/self-managed-enterprise-edition/install/install-using-helm#deploy-harness-modules).

## Which Harness modules are supported?

- [Chaos Engineering](/docs/chaos-engineering/whats-supported)
- [Cloud Cost Management (Beta)](/docs/cloud-cost-management/get-started/ccm-smp/smp-ccm-roadmap)
- [Continuous Delivery and GitOps](/docs/continuous-delivery/cd-integrations)
- [Continuous Integration](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/#feature-compatibility-matrix)
- [Custom Dashboards](/docs/platform/dashboards/cdb-whats-supported)
- [Feature Flags](/docs/feature-flags/ff-supported-platforms)
- [Security Test Orchestration](/docs/security-testing-orchestration/whats-supported)
- [Service Reliability Management](/docs/service-reliability-management/srm-whats-supported)

For more information on supported features, go to [What's supported in Self-Managed Enterprise Edition](/docs/self-managed-enterprise-edition/smp-supported-platforms).

## Can I use an self-managed external database?

Yes, the following tutorials are available for self-managed external database setup.

- [Configure an external self-managed MongoDB](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/use-an-external-self-managed-mongodb/)
- [Configure an external self-managed TimescaleDB](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/use-an-external-sm-timescaledb/)
- [Configure an external self-managed Redis](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/use-an-external-redis-database/)
- [Configure an external self-managed PostgreSQL](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/use-an-external-postgres-database/)

For more information, go to [Configure Harness Self-Managed Enterprise Edition to use external databases](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/configure-external-databases).

## Can I use self-signed certificates?

Yes. There are additional steps that you must take to configure self-signed certificates. For more information, go to [Use self-signed certificates](/docs/self-managed-enterprise-edition/install/install-using-helm#use-self-signed-certificates-with-helm-based-installations).

## How do I manage feature flags?

You update Feature Flags using the `override.yaml` file for the Helm chart of your base installation. You can also update the `values.yaml` file for your Kubernetes delegate. For more information, go to [Manage Feature Flags](/docs/self-managed-enterprise-edition/install/manage-feature-flags).

## Can I install Harness Self-Managed Enterprise Edition in an air-gapped environment?

Yes. For more information, go to [Install in an air-gapped environment](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment).

## How can I upgrade volumes created during Helm installation from gp2 to gp3?

Harness does not control volume types. Volumes types are controlled by storage class. You can modify the storage class setting, but you might lose data if AWS doesn't support direct upgrade from `gp2` to `gp3`. For more information, go to [Storage classes - AWS EBS](https://kubernetes.io/docs/concepts/storage/storage-classes/#aws-ebs) in the Kubernetes documentation.

## Can I use external secrets for license values?

Yes, you can use Kubernetes-based external secrets for Harness Self-Managed Enterprise Edition license values in your Helm charts. For more information, go to [Use external secrets for license values](/docs/self-managed-enterprise-edition/advanced-configurations/use-external-secrets-for-license-values).

## How can I troubleshoot installation failures?

For installation troubleshooting, go to [Helm installation failure](/docs/self-managed-enterprise-edition/troubleshooting/helm-install-failure).

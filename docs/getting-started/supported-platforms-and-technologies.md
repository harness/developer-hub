---
title: Supported platforms and technologies
description: This topic lists Harness support for platforms, methodologies, and related technologies.
sidebar_position: 80
helpdocs_topic_id: 1e536z41av
helpdocs_category_id: kx4hs8bn38
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists Harness support for platforms, methodologies, and related technologies for NextGen modules.

## Continuous Delivery (CD) and GitOps

This section lists the supported CD features and integrations you can use in Harness for deploying and verifying your apps.

import PartialExample from '/docs/continuous-delivery/shared/cd-integrations-supported.md';

<PartialExample name="integrations" />


## Continuous Integration (CI) 

import Ci from '/docs/continuous-integration/shared/ci-supported-platforms.md';

<Ci />

## Continuous Verification

Harness supports the following Application Performance Monitoring (APM) and log management tools:

import Cv from '/docs/continuous-delivery/verify/shared/cv-whats-supported.md';

<Cv />

## Cloud Cost Management

import Ccm from '/docs/cloud-cost-management/shared/ccm-supported-platforms.md';

<Ccm />

## Service Reliability Management

Harness supports the following Health Sources and Change Sources.

### Health sources

A Health Source monitors changes in health trends of the Service using metrics and logs collected from an APM and log provider respectively.

Harness offers support for all major APM vendors, but there are cases where a customized APM is needed. The [Custom Health Source](../continuous-delivery/verify/configure-cv/verify-deployments-with-custom-health-metrics.md) lets you customize APMs of your choice.

#### Metrics providers and logging tools

Currently, Harness supports the following APMs and logging tools:

- AppDynamics
- Prometheus
- Dynatrace
- Splunk
- Custom Health Source
- Google Cloud Operations (formerly Stackdriver)
- New Relic
- Datadog

More tools will be added soon.

### Change sources

A Change Source monitors change events related to deployments, infrastructure changes, and incidents. The following Change Sources are supported:

- Harness CD NextGen
- Harness CD
- PagerDuty

## Security Testing Orchestration

Go to [Security Step Settings Reference](../security-testing-orchestration/sto-techref-category/security-step-settings-reference.md).

## Feature Flags

Harness Feature Flags supports [client-side and server-side SDKs](../feature-flags/ff-sdks/sdk-overview/client-side-and-server-side-sdks.md) for a number of programming languages.

### Supported client-side SDKs

```mdx-code-block
import Ff from '/docs/feature-flags/shared/ff-supported-platforms-shared.md';
```

<Ff />

### Supported server-side SDKs

```mdx-code-block
import Ffs from '/docs/feature-flags/shared/ff-supported-platforms-shared-server.md';
```

<Ffs />

## Harness Chaos Engineering

Perform chaos experiments on applications in your infrastructure, such as a Kubernetes cluster. Use predefined or custom workflow templates.

Go to [Introduction to Chaos Module](../chaos-engineering/get-started/introduction-to-chaos-module).

## Collaboration

The following table lists Harness support for collaboration tools.

Most providers are used in both Pipeline Notification Strategies and User Group notifications:

- [Add a Pipeline Notification Strategy](../continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events.md
- [Send Notifications Using Slack](../platform/5_Notifications/send-notifications-using-slack.md)
- [Send Notifications to Microsoft Teams](../platform/5_Notifications/send-notifications-to-microsoft-teams.md)

| Provider Name                                                                                       | Notification | Approval/Change Management |
| --------------------------------------------------------------------------------------------------- | ------------ | -------------------------- |
| [Microsoft Teams](../platform/5_Notifications/send-notifications-to-microsoft-teams.md)             | Yes          | N/A                        |
| [Email](../continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events.md       | N/A                        |
| [Slack](../platform/5_Notifications/send-notifications-using-slack.md)                              | Yes          | N/A                        |
| [Jira](../platform/9_Approvals/adding-jira-approval-stages.md)                                      | Yes          | Yes                        |
| [ServiceNow](../platform/9_Approvals/service-now-approvals.md)                                      | N/A          | Yes                        |
| [PagerDuty](../continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events.md   | N/A                        |

## Access control

import Accessconsup from '/docs/getting-started/shared/access-control-supported.md'

<Accessconsup />

## Secret management

import Secretmgmtsup from '/docs/getting-started/shared/secret-management-supported.md'

<Secretmgmtsup />

## Harness Self-Managed Enterprise Edition

import Smp from '/docs/self-managed-enterprise-edition/shared/smp-supported-platforms.md';

<Smp />

## Template Library

#### Limitations

* When you delete an existing template with active pipeline references, Harness deletes the references.
* When you convert a runtime input in a template to a fixed value, the input type does not change in the linked pipeline. You must manually edit the linked pipeline YAML and provide the fixed values.
* When you convert a fixed type input to a runtime input in your template, the input type does not change in the linked pipeline. You must click the template in the linked pipeline to refresh it and save the pipeline again. This re-initiates the reconciliation process.
* Chained pipeline stages are not supported with pipeline templates.
* When using multiple nested templates, you must manually reconcile the changes or force reconcile via the three-dots menu. 

## SDKs installed with Harness Delegate

Harness Delegate includes binaries for the SDKs that are required for deployments with Harness-supported integrations. These include binaries for Helm, ChartMuseum, `kubectl`, Kustomize, and so on.

### Kubernetes Deployments

For Kubernetes deployments, the following SDKs/tools are included in the delegate image type *`yy.mm.xxxxx`* 78306 and later.

- kubectl: v1.24.3
- Helm: v2.13.1, 3.1.2, 3.8.0
- Kustomize: v4.5.4
- OpenShift: v4.2.16

The versions can be found in the [Harness public GitHub repo](https://github.com/harness/harness-core/tree/develop/960-api-services/src/main/java/io/harness/delegate/clienttools).

For details on updating the default tool versions, go to [Build custom delegate images with third-party tools](/docs/platform/2_Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools.md).

For Kubernetes deployments, the following SDKs/tools are certified.

|                                     |                       |                       |
| ----------------------------------- | --------------------- | --------------------- |
| **Manifest Type**                   | **Required Tool/SDK** | **Certified Version** |
| Kubernetes                          | kubectl               | v1.25.6               |
|                                     | go-template           | v0.4.1                  |
| Helm                                | kubectl               | v1.25.6               |
|                                     | helm                  | v3.9.2                |
| Helm (chart is stored in GCS or S3) | kubectl               | v1.25.6               |
|                                     | helm                  | v3.9.2                |
|                                     | chartmuseum           | v0.8.2 and v0.12.0    |
| Kustomize                           | kubectl               | v1.25.6               |
|                                     | kustomize             | v4.5.4                |
| OpenShift                           | kubectl               | v1.25.6               |
|                                     | oc                    | v4                    |

### Native Helm deployments

For [Native Helm deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart.md), the following SDKs/tools are certified.

|                   |                                                 |                       |
| ----------------- | ----------------------------------------------- | --------------------- |
| **Manifest Type** | **Required Tool/SDK**                           | **Certified Version** |
| Helm Chart        | helm                                            | v3.9.2                |
|                   | kubectlRequired if Kubernetes version is 1.16+. | v1.25.6               |

### Install a Delegate with custom SDK and 3rd-party tool binaries

To support customization, Harness provides a Harness Delegate image that does not include any third-party SDK binaries. We call this image the No Tools Image.

Using the No Tools Image and Delegate YAML, you can install the specific SDK versions you want. You install software on the Delegate using the `INIT_SCRIPT` environment variable in the Delegate YAML.

For steps on using the No Tools Delegate image and installing specific SDK versions, go to [Install a Delegate with 3rd Party Tool Custom Binaries](../platform/2_Delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries.md).

## The Update Framework (TUF)

The Update Framework (TUF) is an open source specification for that provides instructions on how to organize, sign, and interact with metadata to secure package managers.

Harness includes native TUF support via the following:

- Deployment templates: [Deployment Templates](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployments/custom-deployment-tutorial) use shell scripts to connect to target platforms, obtain target host information, and execute deployment steps.
  - Deployment Templates can obtain the required metadata for native TUF support, and generate and validate signatures in the software lifecycle.
- OCI image registry support:
  - TUF recommends the use of an OCI image-spec container registry. Harness supports [OCI registry for Helm charts](https://developer.harness.io/docs/first-gen/firstgen-platform/account/manage-connectors/add-helm-repository-servers/#oci-registry).
- Enforce the rotation of secrets and key management practices:
  - Harness provides [token key rotation natively](/docs/platform/Resource-Development/APIs/add-and-manage-api-keys#rotate-tokens).
- Continuous Verification: TUF recommends the verification of deployments akin to [Harness Continuous Verification](https://developer.harness.io/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step).

## Harness Open Source Software (OSS) components

The following document lists the open source libraries and third-party software Harness uses.

- [Harness Open Source Software (OSS) components](static/harness-open-source-software-components.pdf)

## Supported browsers

The following desktop browsers are supported:

- **Chrome**: latest version
- **Firefox**: latest version
- **Safari**: latest version
- All Chromium-based browsers.

Mobile browsers are not supported.

## Supported screen resolution

Minimum supported screen resolution is 1440x900.

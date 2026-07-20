---
title: Continuous Delivery & GitOps release notes
sidebar_label: Continuous Delivery & GitOps
date: 2026-05-13T10:00:00
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';
import Legacy from '/docs/continuous-delivery/release-notes/shared/legacy-releases.md';
import RbacForOpa from '/release-notes/shared/rbac-enhancements-for-opa-users.md';
import Helmdep from '/release-notes/shared/helm-2-deprecation-notice.md';
import Kustomizedep from '/release-notes/shared/kustomize-3-4-5-deprecation-notice.md';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/continuous-delivery/rss.xml" />

These release notes describe recent changes to Harness Continuous Delivery and GitOps (NextGen SaaS) module.
 
The latest release notes are organized into **Continuous Delivery**, **GitOps**, and **Pipeline** categories. Select a category below to view its updates. 

Go to [Self-Managed Enterprise Edition release notes](/release-notes/self-managed-enterprise-edition) to review release notes for Harness Self-Managed Enterprise Edition.

:::info About Harness Release Notes

- **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
- **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.

:::

<details>
<summary>Upcoming RBAC enhancements for Harness customers using Policy as Code</summary>

<RbacForOpa />

</details>

<details>
<summary>Deprecation notices</summary>

#### Helm 2

<Helmdep />

#### Kustomize

<Kustomizedep />

</details>

:::warning Announcement
**JEXL 3.5 Upgrade Notice 📢**

As part of improving the security posture of the platform, Harness is upgrading JEXL from version 3.0 to 3.5. This change introduces restrictions on JEXL expressions including: blocked reflection-based expressions, rewritten nested subscript expressions, disallowed global variable assignments (use `==` instead of `=` for comparisons), and ternary expressions followed by `[` must be rewritten.

Please monitor pipeline executions and contact Harness Support if any issues are encountered or remediation assistance is required.

<details>
<summary>View detailed migration guidance</summary>

- **Reflection-based expressions are blocked.** Any JEXL expression that uses reflection to access classes, methods, or fields will be rejected. For example, expressions such as `<+''.getClass().forName("java.lang.Runtime")>` will no longer execute.

- **Nested subscript expressions must be rewritten.** Expressions that nest one subscript (square bracket) accessor directly inside another needs to be rewritten in a different format. For example, the following expression will fail:

  ```
  <+pipeline.variables[<+stage.variables['test']>]>
  ```

  Rewrite it as:

  ```
  <+pipeline.variables["<+stage.variables['test']>"]>
  ```

- **JEXL global variable assignments are disallowed.** Expressions that declare global variables will fail to execute. In JEXL, the single `=` operator performs an assignment, not an equality check. Any expression that uses `=` between a variable reference and a value is treated as a global variable assignment and will be rejected in JEXL 3.5.

  For example, the following expression is no longer supported:

  ```
  ENVIRONMENT=<+env.identifier>,
  REGION=<+pipeline.variables.region>
  ```

  Rewrite the expression using local variables (prefixed with `var`) instead. For example:

  ```
  var ENVIRONMENT=<+env.identifier>,
  var REGION=<+pipeline.variables.region>
  ```

  This restriction also affects expressions used to compare values in `when` conditions, such as:

  ```yaml
  when:
    stageStatus: Success
    condition: <+stage.variables.shouldRun="Yes">
  ```

  When `<+stage.variables.shouldRun="Yes">` is used in a `when` condition, JEXL does not interpret this as an equality check. It is parsed as a global assignment, and the expression evaluates to the assigned value (`"Yes"`). The `when` condition then coerces this value to a boolean, which is `true` for any non-empty, non-null string, so the condition appears to pass regardless of the variable's actual value. In JEXL 3.5, because global assignments are disabled, this expression fails with an error.

  Replace `=` with `==` to perform an equality check:

  ```yaml
  when:
    stageStatus: Success
    condition: <+stage.variables.shouldRun == "Yes">
  ```

- **Ternary expressions followed immediately by `[` must be rewritten.** JEXL 3.5 treats `?[` as the null-safe array access operator, so the parser consumes `?[...]` as a single token and fails to evaluate the ternary. For example, the following expression will fail:

  ```
  <+pipeline.variables.BUILD_ENVS=="dev"?[""]:"qa">
  ```

  Rewrite it by adding a space after `?` so the parser treats the ternary and the array literal as separate tokens:

  ```
  <+pipeline.variables.BUILD_ENVS=="dev"? [""]:"qa">
  ```

  Or wrap the array in parentheses to disambiguate:

  ```
  <+pipeline.variables.BUILD_ENVS=="QAdf"?([""]):"abcds">
  ```

</details>

:::

:::warning Announcement 
**Google Container Registry Deprecation Notice 📢**

Google Container Registry (GCR) is deprecated on **March 18, 2025**. It is recommended to migrate to Google Artifact Registry (GAR). For migration guidance, refer to [Google's official transition documentation](https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr).

For more information on GCR, see the [Harness GCR Documentation](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#google-container-registry-gcr).
:::

:::info Product Update
The AI-powered verification steps have been renamed for clarity. The classic Verify step is now **AI Verify (v1)**, and the newer "Configure verify step with AI" is now **AI Verify (v2)**. These new names make it easier to distinguish between the two versions in your pipelines. No changes to your existing pipelines or configurations are required.
:::

:::warning Announcement
**SMI (Service Mesh Interface) Deprecation Notice 📢**

Service Mesh Interface (SMI) for traffic routing in Kubernetes deployments is deprecated and support will be removed by **August 1, 2026**. 

SMI was used as a traffic routing provider for advanced deployment strategies like canary and blue-green deployments with service mesh implementations. If you are currently using SMI for traffic management in your Harness pipelines, you should plan to migrate to alternative traffic routing solutions such as Istio native traffic management or other supported service mesh providers.

Refer to the [traffic routing documentation](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/traffic-shifting-step/) for supported alternatives and migration guidance.
:::

<DynamicMarkdownSelector
  options={{
    "Continuous Delivery": { path: "/continuous-delivery/release-notes/content/continuous-delivery-releases.md", logo: "harness-cd.svg", logoSize: 24 },
    GitOps: { path: "/continuous-delivery/release-notes/content/gitops-releases.md", logo: "harness-gitops.svg", logoSize: 24 },
    Pipeline: { path: "/continuous-delivery/release-notes/content/pipeline-releases.md", logo: "harness-pipeline.svg", logoSize: 24 }
  }}
  toc={toc}
  defaultSelection="Continuous Delivery"
  disableSort={true}
  precedingHeadingID=''
  nextHeadingID='cd-previous-releases'
/>

## Previous releases {#cd-previous-releases}

<Legacy />

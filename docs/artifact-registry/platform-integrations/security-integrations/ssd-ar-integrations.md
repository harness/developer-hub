---
title: Artifact Registry and Secure Software Delivery
description: Deep dive into the native integrations between the Artifact Registry and the Security Testing Orchestration and Supply Chain Security modules.
sidebar_position: 10
sidebar_label: Secure Software Delivery
---

Learn how to use Artifact Registry with the secure software delivery modules including [Security Testing Orchestration](https://developer.harness.io/docs/security-testing-orchestration) and [Supply Chain Security](https://developer.harness.io/docs/software-supply-chain-assurance). 

## Secure Software Delivery
Seamlessly reference artifacts stored in Harness Artifact Registry within your STO or SCS (also referred to as Software Support Chain Assurance or SSCA) pipeline steps. This functionality eliminates the need for an external connector, providing a streamlined and user-friendly experience while enabling efficient and simplified workflows.

:::tip example scs stage
Examples of SCS stages can be a **Software Bill of Materials (SBOM)** or **Supply Chain Levels for Software Artifacts (SLSA)**.
:::

To reference an artifact in an SCS or STO stage, follow these steps:
1. Navigate to your pipeline, and enter your `SCS` or `STO` stage. 
2. Select or add a new SCS or STO step to your pipeline.
3. Under **Source**, select the source (HAR by default).
4. In the **Registry** field, select your Artifact Registry, or add a new one.
5. Add your artifact's `imageName:tag`
7. Click `Apply Changes` at the top right, and you are done! No connectors needed. 

:::info slsa step parameters
In SLSA stages, if you add an SLSA Generation step, provide the Registry, Image and Artifact Digest, which is a sha256 hash.
:::
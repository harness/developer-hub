---
title: Create SSCA policies
description: Create SSCA policies in the Harness File Store.
sidebar_position: 10
---

With Harness SSCA, you can define and enforce policies governing the use of open-source components within your software artifacts. This policy management and enforcement capability helps you ensure compliance with your security, legal, and operational requirements.

You must create a policy file containing the rules ([policy definitions](./define-ssca-policies.md)) that you want Harness SSCA to enforce. Create SSCA policy files in the Harness File Store.

1. In your Harness Project, go to **File Store** under **Project Setup**. You can also create policies at the Account and Org scopes.
2. Select **New**, and then select **New File**.
3. Enter a **Name**, and then select **Manifest** for **File Usage**.
4. Enter the [policy definitions](./define-ssca-policies.md) in the text editor, and then select **Save**.

<!-- ![](./static/ssca-policy-file-store.png) -->

<docimage path={require('./static/ssca-policy-file-store.png')} />

When you [enforce SSCA policies](./enforce-ssca-policies.md) in a Harness pipeline, the [policy definitions](./define-ssca-policies.md) are evaluated against each component in the artifact's [SBOM](../generate-sbom.md).

:::tip Tutorial

For an end-to-end walkthrough, try this tutorial: [Generate SBOM and enforce policies](/tutorials/secure-supply-chain/generate-sbom)

:::

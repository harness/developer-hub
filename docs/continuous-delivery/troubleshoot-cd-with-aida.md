---
title: Troubleshoot CD with AIDA
description: AIDA is the Harness AI Development Assistant.
sidebar_position: 1000
---

:::note

Currently, AIDA for Continuous Delivery (CD) is a beta feature that is behind the feature flag `CD_AI_ENHANCED_REMEDIATIONS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

[The Harness AI Development Assistant (AIDA)](https://harness.io/products/aida) can analyze log files and correlate error messages with known issues. This feature enables developers to troubleshoot and resolve deployment failures quickly, saving them from sifting through millions of log lines. AIDA also suggests fixes and predicts potential errors in the code even before the build is initiated. This feature is designed to work across Harness's CI and CD offerings.

<!-- Video: AIDA demo
https://www.youtube.com/watch?v=p-3FZM49RqQ-->
<docvideo src="https://youtu.be/p-3FZM49RqQ" />

## Using AIDA

AIDA is available if you have the AIDA feature flag enabled and a step in a pipeline failed.

When viewing the failed step's logs, select the **Harness AIDA** dialog to review error analysis and troubleshooting suggestions.

![AIDA dialog](./static/aida-launch-button.png)

## Limitations

Currently, AIDA for CD has the following limitations: 
- AIDA is supported for the deployment stage only.
- AIDA for custom stage is not supported. Harness anticipates to provide support for custom stages in the future. This includes Shell Script step and Run Container step configured within a custom stage.
- AIDA for Verify step is not supported.

:::info

Go to the [Harness legal page](https://www.harness.io/legal) for legal information about AIDA, including the [AIDA terms](https://www.harness.io/legal/aida-terms) and [AIDA data privacy information](https://www.harness.io/legal/aida-privacy).

:::
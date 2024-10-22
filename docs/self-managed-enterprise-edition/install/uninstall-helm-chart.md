---
title: Uninstall the Helm chart
description: Learn how to uninstall the Helm chart for the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 5
redirect_from:
  - /docs/self-managed-enterprise-edition/self-managed-helm-based-install/uninstall-helm-chart/
canonical_url: https://www.harness.io/blog/feature-flags-best-practices
---

To remove the Kubernetes components associated with the chart and delete the release, uninstall the Helm chart.

* Uninstall and delete the `my-release` deployment:

  ```
  $ helm uninstall my-release -n <namespace>
  ```
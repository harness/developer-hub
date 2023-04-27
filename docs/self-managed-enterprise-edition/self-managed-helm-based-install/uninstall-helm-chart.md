---
title: Uninstall the Helm chart
description: Learn how to uninstall the Helm chart for Harness Self-Managed Enterprise Edition. 
# sidebar_position: 6
---

To remove the Kubernetes components associated with the chart and delete the release, uninstall the Helm chart.

* Uninstall and delete the `my-release` deployment:

  ```  
  $ helm uninstall my-release -n <namespace>
  ```
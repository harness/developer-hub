---
title: Uninstall the Helm chart
description: Learn how to uninstall the Helm chart for Harness Self-Managed Enterprise Edition. 
<<<<<<< HEAD
<<<<<<< HEAD
# sidebar_position: 6
=======
sidebar_position: 5
>>>>>>> main
=======
sidebar_position: 5
>>>>>>> 19cd10b83c46f4513d6000ba44b05ca373df5d8f
---

To remove the Kubernetes components associated with the chart and delete the release, uninstall the Helm chart.

* Uninstall and delete the `my-release` deployment:

  ```  
  $ helm uninstall my-release -n <namespace>
  ```
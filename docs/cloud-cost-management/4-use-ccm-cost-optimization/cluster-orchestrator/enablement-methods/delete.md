---
title: Disable/Delete Cluster Orchestrator
description: Learn how to disable and delete Harness Cluster Orchestrator for AWS EKS using kubectl
sidebar_position: 3
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

## Disable Cluster Orchestrator

You can disable the Cluster Orchestrator by navigating to **Cluster Orchestrator** -> Select the orchestrator and clicking on the **Disable** button. This will disable the Cluster Orchestrator for the selected cluster which means that the cluster will not be managed by the Cluster Orchestrator.

Once disabled, the orchestrator stops managing the selected cluster. No new orchestration actions are triggered, and existing policies are not enforced until you enable the orchestrator again.

Disabling a Cluster Orchestrator pauses all orchestration-driven management for the selected cluster. This includes:
    - No automated scaling or optimization actions are initiated.
    - The orchestrator stops monitoring cluster state for orchestration triggers.
    - All cluster operations must be managed manually until re-enabled.
    - Disabling does not remove the cluster, delete configurations, or erase historical data. It simply suspends orchestration activity for that cluster.

If needed, you can re-enable the orchestrator at any time to resume automated management.

<DocImage path={require('./static/disable-orchestrator.png')} width="50%" height="50%" title="Click to view full size image" />

-----

## Delete Cluster Orchestrator

You can delete the Cluster Orchestrator by navigating to **Cluster Orchestrator** -> Select the orchestrator and clicking on the **Delete** button. Only disabled orchestrators can be deleted.
Deleting the Cluster Orchestrator is irreversible, and all associated data will be lost. This action removes all Harness Cluster Orchestrator components from your cluster. Please ensure to complete the necessary cleanup steps before proceeding.

#### Removal Includes:
- All Cluster Orchestrator components
- Services, deployments, and pods created by the orchestrator
- Orchestrator node pools (e.g., `harness-default-ondemand`, `harness-default-spot`)
- Harness node classes (e.g., `harness-default`)
- All workload distribution rules created by the Harness Cluster Orchestrator
- Orchestrator custom resources and CRDs (e.g., workload distribution rules)
- Finalizers and configurations established by the Orchestrator

When proceeding with the deletion, you will be prompted to choose a cleanup method. Choose either **Script-based Cleanup** or **Helm Uninstall** to remove all Harness Cluster Orchestrator resources, including services, deployments, NodePools, NodeClasses, CRDs, finalizers, and workload distribution rules.

After running one of the cleanup commands above, click the button below to complete the deletion. The cluster will return to the "Enable" state, allowing you to re-onboard if needed.

<DocImage path={require('./static/delete-orchestrator.png')} width="80%" height="80%" title="Click to view full size image" />

------
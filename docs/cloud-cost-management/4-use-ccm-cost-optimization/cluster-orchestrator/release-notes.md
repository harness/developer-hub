---
title: Release Notes
description: Release notes for Cluster Orchestrator
sidebar_position: 9
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---


<div style={{
  backgroundColor: '#fff3cd',
  border: '1px solid #ffeaa7',
  borderRadius: '8px',
  padding: '16px',
  margin: '20px 0'
}}>
  <p style={{margin: 0}}>
    <img src="/img/icon_ff.svg" alt="Feature Flag" width="18" style={{marginRight: '0.4rem', verticalAlign: 'middle'}}/> <strong>Behind a Feature Flag</strong>

    Currently, this early access feature is behind a feature flag . Contact [Harness Support](mailto:support@harness.io) to enable the feature.
  </p>
</div>

## Compatibility Matrix

|Cluster Orchestrator Version| Kubernetes | Karpenter |
|---|---|---|
|Till `0.6.0`| 1.32 | 1.2.4|
|`0.7.0`| 1.33 | 1.7.3|


## Operator

Link: https://hub.docker.com/r/harness/cluster-orchestrator/tags

| Version        |      Release Date         |       Change Log |
|-----------------|-------------------|------------------|
| `0.7.0` <span style={{backgroundColor: '#28a745', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8em', marginLeft: '8px'}}>LATEST</span>  | Dec 12, 2025  | - Cluster Orchestrator supports Karpenter 1.7.3 features. Users must [re-run the enablement script or Terraform template](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/enablement-methods/setting-up-co-helm#step-1-set-up-required-infrastructure-with-terraform) and perform a Helm upgrade to add new permissions for Cluster Orchestrator related to Karpenter 1.7.3. <br/>- Supports Kubernetes (EKS) version 1.33; previously supported only 1.32 <br/>- New major Karpenter features (from 1.2.4 to 1.7.3) for non-Karpenter customers: Support for ODCRs ([on-demand capacity reservations](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html)), SSM Parameter support for AMI selection, Improved [IAM instance profile management](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html) and Bug fixes and performance improvements <br/>- Auto-Discovery Support for Instance Profile and Node Role ARN Environment Variables. Environment Variables with Auto-Discovery Support: `AWS_DEFAULT_INSTANCE_PROFILE`, `AWS_NODE_ROLE_ARN`. Previously, these environment variables were required to be explicitly defined in the deployment configuration. Now, the Cluster Orchestrator automatically discovers these values on startup. |
| `0.6.0`  | Nov 26, 2025  | - Support for Vertical Pod AutoScaling (VPA automatically adjusts CPU and memory resource requests for pods based on their usage patterns). This is behind a feature flag, please reach out to support@harness.io to enable it<br/>- New CRD and deployments added<br/>- Support for [Disabling and Deleting Cluster Orchestrator](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/enablement-methods/delete) |
| `0.5.2`      |     Oct 3, 2025  | - Support for Disabling Cluster Orchestrator via Config CRD<br/>-Support for configuring Cluster Level Nodepool limits via Config CRD <br/>-Improved validation of the Replacement window <br/>-Handling lease locks gracefully<br/>- Handling finalizer errors gracefully |
| `0.5.1` | Sep 3, 2025  | - Support for **Robust Distribution mode** in Bin Packing. **Robust Distribution Mode** is an enhancement to the default Cluster Orchestrator scheduling flow which gets automatically enabled when bin packing is enabled. Using the Kubernetes Descheduler's policy `RemovePodsViolatingNodeTaints`, it automatically evicts pods from incompatible nodes and reschedules them to nodes that match your configured distribution. |
| `beta-0.5.0`  | Aug 6, 2025  | - Support for Kubernetes version 1.32 (Karpenter version 1.2)<br/>- New CRD `ClusterOrchestratorConfig` enabling Kubernetes-native configuration of Cluster Orchestrator directly within the cluster - allows users to declaratively define nodepool settings, spot/on-demand distribution, bin-packing parameters, and workload scheduling policies as standard Kubernetes resources<br/>- Fixed the bug where 100% On demand configuration was creating spot nodes under heavy load |
| `beta-0.4.3`  | July 1, 2025  | - Suppressing error logs<br/>- Support for disabling default nodepools via an ENV variable DISABLE_DEFAULT_NODEPOOLS<br/>- Handling Null Object scenarios in Cluster Orchestrator reconcilers<br/>- Handling nodepools with maximum nodepool weight 100<br/>- Working well with other operators (like Kyverno) which adds tolerations on pods |
| `beta-0.4.2`  | June 17, 2025  | - Sped up the distribution of workloads, by iterating the changed ReplicaSet instead of the whole namespace<br/>- Adding default toleration for pods in protected namespaces<br/>- Handling Distribution of Job Pods separately, irrespective of namespace triggers |
| `beta-0.4.1`  | June 1, 2025  | - Consolidated to a unified ReplicaSet reconciler architecture that handles both Deployments and StatefulSets <br/>- Handling the scheduling of Stand Alone Pods with default toleration<br/>- [Replacement windows](https://developer.harness.io/release-notes/cloud-cost-management/#-new-feature-replacement-schedules) for Bin Packing, Consolidation, Reverse Fallback |
| `beta-0.4.0`  | May 6, 2025  | - Workload Distribution Rule at namespace level<br/>- Integration with commitment orchestrator<br/>- Event logs for Cluster Orchestrator<br/>- Node replacement Framework |


## Helm Chart Releases

Link: https://app.harness.io/ng/account/6NTMT--yR7ORXKPqwLDioA/module/code/repos/Helm

| Version | Release Date | Changes |
|---------|-------------|----------|
| <span style={{backgroundColor: '#28a745', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8em', marginLeft: '8px'}}>LATEST</span> `0.3.0` | Dec 12, 2025 |  - Ability to support Karpenter 1.7.3 features in Cluster Orchestrator.  | 
|`0.2.0` | Nov 26, 2025 | - Ability to install Harness VPA components and CRD (if feature flag is enabled) |
| `0.1.4`  |  Oct 3, 2025   | - Supporting 0.5.2 build<br/>- Introducing cluster_preferences with nodepool_limits in the config CRD<br/>- Introducing disabled field in the config CRD to toggle cluster orchestrator state<br/>- validation and permission fixes |
| `0.1.3` | Sep 16, 2025 | Conditional Installation of Karpenter CRDs: controlled by the variable `clusterOrchestrator.karpenter.installCRD`<br/>- Conditional management of namespace: If the namespace is in the protected namespaces list, this helm chart will not manage the namespace. Controlled by variable `clusterOrchestrator.operator.protectedNamespaces`<br/>- Conditional installation of CRDs with `clusterOrchestrator.installCRDs` variable<br/>-Adding SecretRefs to manage sensitive fields<br/>-Readme and QuickStart files added |
| `0.1.2`   | Sep 3, 2025  | - Uses build version `0.5.1` |
| `0.1.1`   | Aug 7, 2025  | - Added validation for Node Expiry field<br/>- Defaulting Node Expiry to 720h |
| `0.1.0`   | Aug 6, 2025  | - Uses build version beta-0.5.0<br/>- Added new CRD ClusterOrchestratorConfig and related permissions |
| `0.0.13`  | Jul 1, 2025  | - Setting the default value for DISABLE_DEFAULT_NODEPOOLS as true |
| `0.0.12`  | Jul 1, 2025  | - Uses build version beta-0.4.3<br/>- Ability to disable default nodepools via an ENV variable `DISABLE_DEFAULT_NODEPOOLS` |
| `0.0.11`  | Jun 17, 2025 | - Ability to configure nodeSelector and Tolerations on Cluster Orchestrator Deployments<br/>- Uses build version beta-0.4.2 |
| `0.0.10`  | Jun 10, 2025 | - Fixed the liveliness and readiness check probe ports<br/>- Uses build version beta-0.4.1 |
| `0.0.9`   | May 19, 2025 | - Fixed memory configuration for Cluster Orchestrator Deployments |












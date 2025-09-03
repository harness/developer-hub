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


## Operator

Link: https://hub.docker.com/r/harness/cluster-orchestrator/tags

| Version        |      Release Date         |       Change Log |
|-----------------|-------------------|------------------|
| `beta-0.5.0` <span style={{backgroundColor: '#28a745', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8em', marginLeft: '8px'}}>LATEST</span> | Aug 6, 2025  | - Support for Kubernetes version 1.32 (Karpenter version 1.2)<br/>- New CRD `ClusterOrchestratorConfig` enabling Kubernetes-native configuration of Cluster Orchestrator directly within the cluster - allows users to declaratively define nodepool settings, spot/on-demand distribution, bin-packing parameters, and workload scheduling policies as standard Kubernetes resources<br/>- Fixed the bug where 100% On demand configuration was creating spot nodes under heavy load |
| `beta-0.4.3`  | July 1, 2025  | - Suppressing error logs<br/>- Support for disabling default nodepools via an ENV variable DISABLE_DEFAULT_NODEPOOLS<br/>- Handling Null Object scenarios in Cluster Orchestrator reconcilers<br/>- Handling nodepools with maximum nodepool weight 100<br/>- Working well with other operators (like Kyverno) which adds tolerations on pods |
| `beta-0.4.2`  | June 17, 2025  | - Sped up the distribution of workloads, by iterating the changed ReplicaSet instead of the whole namespace<br/>- Adding default toleration for pods in protected namespaces<br/>- Handling Distribution of Job Pods separately, irrespective of namespace triggers |
| `beta-0.4.1`  | June 1, 2025  | - Consolidated to a unified ReplicaSet reconciler architecture that handles both Deployments and StatefulSets <br/>- Handling the scheduling of Stand Alone Pods with default toleration<br/>- [Replacement windows](https://developer.harness.io/release-notes/cloud-cost-management/#-new-feature-replacement-schedules) for Bin Packing, Consolidation, Reverse Fallback |
| `beta-0.4.0`  | May 6, 2025  | - Workload Distribution Rule at namespace level<br/>- Integration with commitment orchestrator<br/>- Event logs for Cluster Orchestrator<br/>- Node replacement Framework |


## Helm Chart Releases

Link: https://app.harness.io/ng/account/6NTMT--yR7ORXKPqwLDioA/module/code/repos/Helm

| Version | Release Date | Changes |
|---------|-------------|----------|
| <span style={{backgroundColor: '#28a745', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8em', marginLeft: '8px'}}>LATEST</span> `0.1.1`  | Aug 7, 2025  | - Added validation for Node Expiry field<br/>- Defaulting Node Expiry to 720h |
| `0.1.0`   | Aug 6, 2025  | - Uses build version beta-0.5.0<br/>- Added new CRD ClusterOrchestratorConfig and related permissions |
| `0.0.13`  | Jul 1, 2025  | - Setting the default value for DISABLE_DEFAULT_NODEPOOLS as true |
| `0.0.12`  | Jul 1, 2025  | - Uses build version beta-0.4.3<br/>- Ability to disable default nodepools via an ENV variable `DISABLE_DEFAULT_NODEPOOLS` |
| `0.0.11`  | Jun 17, 2025 | - Ability to configure nodeSelector and Tolerations on Cluster Orchestrator Deployments<br/>- Uses build version beta-0.4.2 |
| `0.0.10`  | Jun 10, 2025 | - Fixed the liveliness and readiness check probe ports<br/>- Uses build version beta-0.4.1 |
| `0.0.9`   | May 19, 2025 | - Fixed memory configuration for Cluster Orchestrator Deployments |











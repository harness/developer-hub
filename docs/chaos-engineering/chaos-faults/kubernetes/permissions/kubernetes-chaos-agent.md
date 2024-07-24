---
id: Kubernetes chaos agent installation access requirements
sidebar_position : 2
title: Chaos agent installation access requirements
description: Kubernetes chaos agent installation access requirements
---

This topic lists the Kubernetes chaos agent installation access requirement for discovery and all types of faults.

<table>
  <tr>
    <th> Resource </th>
    <th> Modes (Scope of chaos agent) </th>
    <th> Permissions required </th>
    <th> Use </th>
  </tr>
  <tr>
    <td> pod </td>
    <td> Namespaced, Cluster </td>
    <td> [create, delete, get, list, patch, update, deletecollection]</td>
    <td> Manage transient pods created to perform chaos. </td>
  </tr>
  <tr>
    <td> events </td>
    <td> Namespaced, Cluster </td>
    <td> [create, get, list, patch, update] </td>
    <td> Generate and manage chaos events. </td>
  </tr>
  <tr>
    <td> secrets </td>
    <td> Namespaced, Cluster </td>
    <td> [get, update, patch, create]</td>
    <td> To read authentication information (cluster ID and access-keys), configuration tunables. </td>
  </tr>
  <tr>
    <td> ConfigMaps </td>
    <td> Namespaced, Cluster </td>
    <td> [get, list, create, patch, update, watch, delete]</td>
    <td> Configuration tunables and leader-election. </td>
  </tr>
  <tr>
    <td> pods/log </td>
    <td> Namespaced, Cluster </td>
    <td> [get, list, watch]</td>
    <td> Track execution logs.</td>
  </tr>
  <tr>
    <td> jobs </td>
    <td> Namespaced, Cluster </td>
    <td> [create, delete, get, list, deletecollection]</td>
    <td> Chaos experiments are launched as Kubernetes jobs.</td>
  </tr>
  <tr>
    <td> pods/exec, pods/eviction </td>
    <td> Namespaced, Cluster </td>
    <td> [get, list, create]</td>
    <td> <ul><li>For creating and managing to execute commands inside the target container. </li>
    <li> Used in some experiments and command probe. </li></ul></td>
  </tr>
  <tr>
    <td> services </td>
    <td> Namespaced, Cluster </td>
    <td> [get, list]</td>
    <td> <ul><li>Generate chaos metrics.</li>
    <li> Watch or probe application service metrics for health.</li></ul></td>
  </tr>
  <tr>
    <td> deployments, statefulsets </td>
    <td> Namespaced, Cluster </td>
    <td> [get, list, patch, update, delete]</td>
    <td> For asset discovery and pod-autoscaler fault. </td>
  </tr>
  <tr>
    <td> replicasets, replicationcontrollers, daemonsets, deploymentconfigs, rollouts </td>
    <td> Namespaced, Cluster </td>
    <td> [get, list]</td>
    <td> For asset discovery of available resources on the cluster so that you can target them with chaos experiments. </td>
  </tr>
  <tr>
    <td> networkpolicies </td>
    <td> Namespaced, Cluster </td>
    <td> [create, delete, list, get]</td>
    <td> Cause chaos through network partitions.</td>
  </tr>
  <tr>
    <td> nodes </td>
    <td> Cluster-scoped only </td>
    <td> [patch, get, list, update, watch]</td>
    <td> Filter or isolate chaos targets to specific nodes. Subject nodes to chaos (only in cluster-scope).</td>
  </tr>
  <tr>
    <td> namespaces </td>
    <td> Cluster-scoped only </td>
    <td> [get, list, watch]</td>
    <td> For asset discovery to list the namespaces(only in cluster-scope). </td>
  </tr>
  <tr>
    <td> chaosengines, chaosexperiments, chaosresults, chaosschedules, chaosengines/finalizers </td>
    <td> Namespaced, Cluster </td>
    <td> [create, delete, get, list, patch, update]</td>
    <td> Lifecycle management of chaos custom resources in CE.</td>
  </tr>
  <tr>
    <td> customresourcedefinitions </td>
    <td> Cluster-scoped only </td>
    <td> [create, delete, get, list, patch, update]</td>
    <td> Lifecycle management of chaos custom resources in CE.</td>
  </tr>
  <tr>
    <td> leases </td>
    <td> Namespaced, Cluster </td>
    <td> [get, create, list, update, delete]</td>
    <td> Enable high availability of chaos custom controllers via leader elections.</td>
  </tr>
  <tr>
    <td> workflows, workflows/finalizers, workflowtemplates, workflowtemplates/finalizers cronworkflows, cronworkflows/finalizers, </td>
    <td> Namespaced, Cluster </td>
    <td> [create, delete, get, list, patch, update, watch]</td>
    <td> Lifecycle management of chaos custom resources in workflow controller. </td>
  </tr>
  <tr>
    <td> clusterworkflowtemplates, clusterworkflowtemplates/finalizers </td>
    <td> Cluster-scoped only </td>
    <td> [create, delete, get, list, patch, update, watch]</td>
    <td> Lifecycle management of chaos custom resources in workflow controller. </td>
  </tr>
  <tr>
    <td> workflowtasksets, workflowartifactgctasks, workflowtaskresults </td>
    <td> Namespaced, Cluster </td>
    <td> [get, list, watch, deletecollection]</td>
    <td> Lifecycle management of chaos custom resources in workflow controller. </td>
  </tr>
</table>


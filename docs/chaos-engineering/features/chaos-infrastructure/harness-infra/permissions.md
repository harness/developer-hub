---
title: Permissions
sidebar_position: 1
description: RBAC permissions required to execute DDCR-based Kubernetes faults.
redirect_from:
    - /docs/chaos-engineering/onboarding/harness-infra/permissions
---

This topic lists the RBAC permissions required to execute DDCR-based Kubernetes faults.

<table>
<tr>
<th> Resource </th>
<th> Modes (Scope of chaos agent) </th>
<th> Permissions required </th>
<th> Uses </th>
</tr>
<tr>
<td> pods </td>
<td> Namespaced, Cluster </td>
<td> [create, delete, get, list, patch, update, watch, deletecollection] </td>
<td> <ul><li> Injecting chaos. </li>
<li> Creating and monitoring helper pods. </li>
<li>Tracking and getting logs </li></ul></td>
</tr>
<tr>
<td> secrets, configmaps, services </td>
<td> Namespaced, Cluster </td>
<td> [create, delete, get, list, patch, update, watch, deletecollection] </td>
<td> Creating and monitoring helper pods.  </td>
</tr>
<tr>
<td> deployments, replicasets, daemonsets, statefulsets</td>
<td> Namespaced, Cluster </td>
<td> [get, list] </td>
<td> Checking app parent resources as eligible chaos candidate. </td>
</tr>
<tr>
<td> replicationcontrollers</td>
<td> Namespaced, Cluster </td>
<td> [get, list] </td>
<td> Checking app parent resources as eligible chaos candidate. </td>
</tr>
<tr>
<td> services </td>
<td> Namespaced, Cluster </td>
<td> [get, list] </td>
<td> Checking app parent resources as eligible chaos candidate. </td>
</tr>
<tr>
<td> deploymentconfigs </td>
<td> Namespaced, Cluster </td>
<td> [get, list] </td>
<td> Checking app parent resources as eligible chaos candidate in OpenShift environments. </td>
</tr>
<tr>
<td> rollouts </td>
<td> Namespaced, Cluster </td>
<td> [get, list] </td>
<td> Checking app parent resources as eligible chaos candidate. </td>
</tr>
<tr>
<td> jobs </td>
<td> Namespaced, Cluster </td>
<td> [create, delete, get, list, patch, update, watch, deletecollection] </td>
<td> Creating and monitoring helper pods. </td>
</tr>
<tr>
<td> pods/logs</td>
<td> Namespaced, Cluster </td>
<td> [get, list, watch] </td>
<td> Tracking and getting logs of helper pods. </td>
</tr>
<tr>
<td> deployments</td>
<td> Namespaced, Cluster </td>
<td> [create, delete, get, list, patch, update, deletecollection] </td>
<td> To manage the self pod lifecycle. </td>
</tr>
</table>


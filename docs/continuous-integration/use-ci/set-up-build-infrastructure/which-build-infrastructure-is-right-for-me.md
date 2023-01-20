---
title: Which build infrastructure is right for me
description: Harness offers hosted machines you can use to run your builds on. You can also choose to run builds on your own infrastructue either locally or in a Kubernetes cluster.

tags: 
   - helpDocs
   - CIE
   - infrastructure
   - CI
   - build environment 
   - hosted
   - self-hosted
sidebar_position: 30
helpdocs_topic_id: rch2t8j1ay
helpdocs_category_id: pjovrkldfq
helpdocs_is_private: false
helpdocs_is_published: true
---



Harness offers hosted machines you can use to run your builds on. You can also choose to run builds on your own infrastructue either locally or in a Kubernetes cluster.



# Harness Cloud (Hosted by Harness)

<span style="font-weight:bold;background-color:#2bb1f2">Avaiable in all CI Plans</span>

Harness Cloud allows you to run builds in isolation on machines hosted and maintained by Harness. You can run builds at scale on Linux, Windows and macOS machines, that come preinstalled with software commonly used in CI pipelines. There is no need to worry about machine maintenance and upgrades as these are taken care of for you, so you can focus on building great software instead.
See also [Get started with Harness Cloud](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart/). 


# Self-Hosted Options 


 
## Local
<span style="font-weight:bold;background-color:#2bb1f2">Avaiable in all CI Plans</span>

The Local runner (AKA Docker runner) allows you to run builds on your local machine. You can execute build steps in Docker containers or directly on the host machine. 

Refer to 
 [define a local build environemnt](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) for more information. . 

## Kubernetes Cluster
<span style="font-weight:bold;background-color:#2bb1f2">Paid plans only</span>

 
Executing builds in a Kuberenetes Cluster is useful when you would like to run ephemeral builds at scale in your own infrastructure. When running builds in a Kubernetes cluster, each CI Stage executes in a pod, and its steps share the pod's resources. Read more setting up K8S cluster as build infrastructure 

Refer to 
 [Get setting up K8S cluster as build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure) for more information.  




# Compatability Matrix

The table below shows the operating systems and arcitectures supported by each build infrastructure type described above.

<table>
<tbody>
<tr>
<th rowspan="2"></th>
<th colspan="2" >Linux</th>
<th colspan="2" >Windows</th>
<th >macOS</th>
</tr>
<tr>
<th>amd64</td>
<th>arm64</td>
<th>amd64</td>
<th>arm64</td>
<th> arm64 </td>
</tr>
  <tr>
<th>Cloud</th>
<td>✅</td>
<td>✅</td>
<td>coming soon</td>
<td>✖️</td>
<td>✅</td>
</tr>

  
  <tr>
<th>Local</th>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✖️</td>
<td>✅</td>
</tr>
<tr>
<th>Kubernetes </th>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>✖️</td>
<td>✖️</td>
</tr>
</tbody>
</table>













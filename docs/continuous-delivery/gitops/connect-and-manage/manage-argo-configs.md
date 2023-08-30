---
title: Manage Argo CD configs using Harness GitOps
description: Manage Argo CD configs that are stored in Git.
sidebar_position: 2
---

Argo CD applications, projects, and settings can be defined [declaratively](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/) using Kubernetes manifests. These manifests can be managed in Harness GitOps just like a Harness GitOps application.

This topic walks you through setting up Harness GitOps to manage your Argo CD configs stored in your Git repository.

## Create the GitOps application

A Harness GitOps application consists of a GitOps repository, cluster, and application settings.

To add the GitOps application for your Argo CD configuration, do the following:

1. Install a Harness GitOps agent in the destination cluster.
2. In Harness GitOps, add a new GitOps repository for the repository where your Argo CD configs are stored.
   
   <figure>
   
   <docimage path={require('./static/29bfc8656433c153505e52fd3db231902c0a4a8837b9e7dd49c436349d72aec1.png')} width="60%" height="60%" title="Click to view full size image" />  
   
   <figcaption>Figure 1: GitOps repository.</figcaption>
   </figure>

   For steps on adding a GitOps repository, go to [Add a Harness GitOps repository](/docs/continuous-delivery/gitops/use-gitops/add-a-harness-git-ops-repository).
3. Add a Harness GitOps cluster for the destination cluster where you installed the Harness GitOps agent.
   
   <figure>
   
   <docimage path={require('./static/f844b3ba739e1acbab93784f9ac33945a0e820a9b15e8c958aeba5bbed9cbe26.png')} width="60%" height="60%" title="Click to view full size image" />  
   
   <figcaption>Figure 2: GitOps cluster.</figcaption>
   </figure>

4. Add a Harness GitOps application for the Argo CD config.
   1. Use Harness GitOps repository added earlier.
   2. In **Path**, select or add the path in repository where the configs are located.
   
   <figure>
   
   <docimage path={require('./static/c42483d43b3d2464994cb0085125ba7b3b0ed10f0b5f5b901e9d31a9b66e1157.png')} width="60%" height="60%" title="Click to view full size image" />  
   
   <figcaption>Figure 3: Path to Argo CD configs in GitOps application.</figcaption>
   </figure>

   :::note
   
   If the repository directory has subordinate directories, select the **Directory Recurse** option.

   <figure>
   
   <docimage path={require('./static/33cab4c8688ebf13b142bdd87f826916afced3e1fd9120566fa2118eb2e2f43c.png')} width="60%" height="60%" title="Click to view full size image" />  
   
   <figcaption>Figure 4: Directory Recurse option.</figcaption>
   </figure>

   :::

   3. Use the Harness GitOps cluster added earlier. In **Namespace**, provide the namespace where the agent is installed.
5. Save the Harness GitOps application.


## Harness values for Argo CD config files


### Same Argo CD AppProject


### Sample application







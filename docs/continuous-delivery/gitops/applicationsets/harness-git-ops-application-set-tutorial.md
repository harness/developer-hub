---
title: ApplicationSet Tutorial
description: This topic has a hands-on tutorial for ApplicationSet.
sidebar_position: 2
helpdocs_topic_id: lf6a27usso
helpdocs_category_id: 013h04sxex
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/continuous-delivery/gitops/harness-git-ops-application-set-tutorial
---

## Prerequisites

To set up an ApplicationSet use case, you'll need the following:

* Create a [Harness GitOps agent](/docs/continuous-delivery/gitops/use-gitops/install-a-harness-git-ops-agent) to create the ApplicationSet.
* Create 2 target [clusters](/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart#step-3-add-a-harness-gitops-cluster) dev, prod to deploy the child applications.
* GitHub account. You will be cloning the Argo Project's [ApplicationSet repo](https://github.com/argoproj/applicationset) and using one of its examples.
* Create [Harness GitOps repository](/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart#step-2-add-a-harness-gitops-repository) with the Argo Project's ApplicationSet repo. We will be using one of its [examples](https://github.com/argoproj/applicationset/tree/master/examples).

## Steps

### Step 1: Updating manifests in Git

The example we use has [Git generator](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Git/) and is in in [Argo project’s public repository](https://github.com/argoproj/applicationset/tree/master/examples/git-generator-files-discovery).

1. Clone the repo and update `git-generator-files.yaml` with the following YAML keys/values and save the changes.

```yaml
apiVersion: argoproj.io/v1alpha1  
kind: ApplicationSet  
metadata:  
  name: guestbook  
spec:  
  generators:  
    - git:  
        repoURL: https://github.com/<YOUR_ACCOUNT_NAME>/applicationset.git  
        revision: HEAD  
        files:  
        - path: "examples/git-generator-files-discovery/cluster-config/**/config.json"  
  template:  
    metadata:  
      name: '{{cluster.name}}-guestbook'
      labels: 
        harness.io/envRef: '{{envTag}}'
        harness.io/serviceRef: '{{serviceTag}}'
        harness.io/buildRef: '{{releaseTag}}'
    spec:  
      project: <PROJECT_ID_IN_AGENT_PAGE>  
      source:  
        repoURL: https://github.com/<your account name>/applicationset.git  
        targetRevision: HEAD  
        path: "examples/git-generator-files-discovery/apps/guestbook"  
      destination:  
        server: '{{cluster.address}}'  
        namespace: default  
      syncPolicy:  
        automated: {}
```
To get the project id, go to the Agents page and find the Argo project id you want to create the ApplicationSet.

![](static/harness-git-ops-application-set-tutorial-33.png)

2. Navigate to `applicationset/examples/git-generator-files-discovery/cluster-config/engineering/dev/config.json`. Replace `"address": "https://1.2.3.4"` with the Endpoint IP address for the target cluster, **dev**. Ensure that you use the `https://` scheme.
Note that, this cluster should be created beforehand.

3. Repeat step 2 for target cluster, **prod** by modifying file in path `applicationset/examples/git-generator-files-discovery/cluster-config/engineering/prod/config.json`
Here is an example,

![](static/harness-git-ops-application-set-tutorial-34.png)

:::note

Both JSON and YAML formats are supported for ApplicationSets.

:::

### Step 2: Creating ApplicationSet app

1. Just like how you create a regular application in GitOps, click **Applications**, and then click **New Application**.
2. Enter the name, choose the agent, leave the default **Sync Policy** settings, and click **Continue**.
3. In **Source**, enter the following settings and then click **Continue**.
    1. **Repository URL**: select the GitOps Repository you added earlier.
    2. **Target Revision**: select **master**.
    3. **Path**: enter **examples/git-generator-files-discovery** and click **+** to add it.
    
      ![](static/harness-git-ops-application-set-tutorial-39.png)

4. In **Destination**, select the **cluster and namespace in which the GitOps agent is installed**.

### Step 3: Sync the ApplicationSet app

Syncing can be done from 2 places, Application view or PR pipeline. For syncing via the PR pipeline, please refer to [bullet 4](/docs/continuous-delivery/gitops/use-gitops/sync-gitops-applications/).

From the Application view, you can sync the Harness ApplicationSet Application or the individual Applications independently.

![](static/harness-git-ops-application-set-tutorial-63.png)

If you configure automatic syncing in the ApplicationSet template, then the Applications will be synced automatically. See `syncPolicy.automated` in the below example,

```yaml
  template:  
    metadata:  
      name: '{{cluster.name}}-guestbook'  
    spec:  
      project: 191b68fc  
      source:  
        repoURL: https://github.com/johndoe/applicationset.git  
        targetRevision: HEAD  
        path: "examples/git-generator-files-discovery/apps/guestbook"  
      destination:  
        server: '{{cluster.address}}'  
        namespace: default  
      syncPolicy:  
        automated: {}
```

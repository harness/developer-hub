---
title: Manage access for GitOps Applications using labels
description: Learn how to manage access control for GitOps resources
sidebar_position: 40
---

Harness uses role-based access control (RBAC) for managing user permissions platform wide. This extends to Harness GitOps as well. To learn more, go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness)

In addition to regular controls, access to GitOps applications can be controlled via label-based RBAC. This topic will teach you how it works, and how you can use it. 

## Before you begin

Ensure you are familiar with:
- [ApplicationSets](https://argo-cd.readthedocs.io/en/stable/user-guide/application-set/)
- [ApplicationSets at Harness](/docs/category/applicationsets)
- [Harness Platform Access Control](/docs/category/platform-access-control)

## Why use label-based RBAC?

Label-based RBAC offers several advantages:
1. **Granular Control**: Define permissions based on application characteristics rather than just names or namespaces.
1. **Scalability**: Easily manage permissions for large numbers of applications.
1. **Consistency**: Ensure uniform access policies across your entire application portfolio.
1. **Flexibility**: Adapt to changing organizational structures and application architectures without major RBAC overhauls.

## Implement label-based RBAC

### Step 1: Define your labeling strategy

Before you start, define a consistent labeling strategy. For example:
- `harness.io/env-type: [prod|staging|dev]`
- `harness.io/team: [frontend|backend|data]`
- `harness.io/criticality: [high|medium|low]`

### Step 2: Update your Application

Next, add a label to your GitOps Application. To do so, follow these steps:

1. In your project, click **GitOps**.
2. Click **Applications**, and select your application. 
3. In the options bar, select **App Details**.
4. Add a **Label** that is consistent with your labeling strategy. 

#### (Optional) Update your ApplicationSets

Instead of modifying your application directly, you can also modify your existing [ApplicationSet templates](https://argo-cd.readthedocs.io/en/stable/user-guide/application-set/) to include the necessary labels. For example:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: my-apps
spec:
  generators:
  - list:
      elements:
      - name: app1
        env: prod
        team: frontend
      - name: app2
        env: dev
        team: backend
  template:
    metadata:
      name: '{{name}}'
      labels:
        harness.io/env-type: '{{env}}'
        harness.io/team: '{{team}}'
    spec:
      # ... rest of your application spec
```

### Step 3: Create resource groups in Harness

Resource Groups in Harness allow you to group your applications. Here's how to create them:
1. Navigate to **Access Control** > **Resource Groups** in your **Project Settings**.
1. Click **New Resource Group**.
1. Name your group and click **Save**.
1. Select your **Resources** on the left. In this case you want **Gitops** > **Applications**.
1. Select **All** and click on **Save**

:::note

You can also filter by labels by selecting **By Label**
Click **Add**
Add a label. Follow the labeling strategy you established in step 1. For example, a production application would have the label `harness.io/env-type: [prod|staging|dev]`.
Click **Add Application Labels**.

Currently, filtering by labels is behind the feature flag `CDS_GITOPS_LABELS_BASED_ACCESS_TO_APPS`. Please contact [Harness support](mailto:support@harness.io) to enable this feature.

:::


## Step 4: Create a role with permissions

Now, create roles that have specific permissions you want your users to have for a given resource group. 
1. Go to **Access Control** > **Roles** in your **Project Settings**.
1. Click **New Role**.
1. Name your role and click **Save**.
1. Update your role permissions. In this case, you want to scroll down to **GitOps** and enable the following permissions:
    - `VIEW`
    - `SYNC`

## Step 5: Bind roles and resource groups to users

Finally, assign the role and resource group you created to the [user](/docs/platform/role-based-access-control/add-users) or [user groups](/docs/platform/role-based-access-control/add-user-groups). 

Once the binding is done, those users will be able to sync any applications that have the label you specified in the resource group in step 3!

## Harness Default Labels

When applications are generated through appsets, Harness will apply some labels to associated the application with services and environments. You can use these labels:

- `harness.io/envRef`: Enter the environment id. Use this to associate your application with a Harness Environment.
- `harness.io/serviceRef`: Enter the service id. Use this to associate your application with a Harness Service. 

## Troubleshooting

Common issues and solutions:
1. If the sync operation failed due to permissions issues:
    - Check the user's role assignments in Harness.
    - Verify application labels match the resource group filters.
1. If the labels are not applying correctly:
    - Ensure your PR pipeline scripts are executing correctly.
    - Check for conflicts in your ApplicationSet definitions.
1. If production changes bypass controls:
    - Verify your Git hooks are installed and executable.
    - Review your branch protection rules in your Git repository settings.

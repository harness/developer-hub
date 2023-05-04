---
title: Sync GitOps applications
description: This topic describes how to sync GitOps applications.
sidebar_position: 8
---

Sync is a process that ensures that the live state of a system matches its desired state by applying a declarative description. This process involves synchronizing the desired Git state with the live cluster state. 

To sync applications from the **Applications** page: 

1. In your GitOps project, go to **Deployments** > **GitOps** > **Applications**, and then select your application.
   
   ![](./static/sync-applications-3.png)

2. To sync the selected application: 
   * Select the more options icon, and then select **Sync**.
   
     ![](./static/sync-applications-1.png)
   * Select the application, and then select **SYNC**. 

     ![](./static/sync-applications-2.png)
3. Configure the sync options, and then select **Synchronize**.
   
   ![](./static/sync-applications-4.png)

To sync applications using the **GitOpsSync** step: 

1. Select a pipeline and go to the **Execution** tab of a deploy stage.
   
   :::info

   Make sure that the service, environment, and cluster selected in the pipeline matches the service, environment, and cluster in the application.

   ::: 
   
2. Select **Add Step**, and then select the **GitOpsSync** step.
3. Select the GitOpsSync step to configure step parameters.
4. In **Advanced Configuration**, select the application you want to sync and configure the sync options.
   
    ![](./static/gitopssync-step.png)    
 
5. Select **Apply Changes**.

Here is how the resources would look in Harness after the sync process is complete.

![](./static/harness-git-ops-application-set-tutorial-40.png)

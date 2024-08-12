---
title: Blue Green Deployment Support with a configurable amount of Tanzu Applications
description: Blue Green deployment configuration use cases for Tanzu
sidebar_position: 5
redirect_from:
  - /docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart/#blue-green-deployment-support-with-a-configurable-amount-of-tanzu-applications-to-maintain
---

By default Harness keeps 3 Versions of Tanzu Apps for Blue Green Deployment. The Active, the inactive, and then the 3rd previous deployment as a backup. This behavior is now configurable with the **Existing Version to Keep** option.  If the user says 0, Harness will only maintain 2. The Active and Inactive applications. If the user wishes to maintain 3 they can configure 1 and Harness will maintain Active, Inactive, and third previous successfully deployed version of the application. 

In the PCF BG App Setup step, we have removed the backend validation for existing versions to keep to greater than 0. This made sure we kept more than 2 versions of the applications available for rollback.

**Configuration Cases**

**Case 1:** If existing versions to keep is > 0
Deployment remains the same

**Case 2:** If existing versions to keep is 0
In the BG App setup delegate task, we will skip the renaming of the old inactive to app__0 and directly do a cf push keeping the new app name as app__inactive. This will deploy the manifest to the same old application. Ensuring no new versions are maintained. 

Check if this removes old routes from app__inactive, no we are detaching all old routes first from the inactive app and then run a cf push

The **App Resize** & **Swap Routes Step** would remain the same when the existing versions to keep is 0. 

In the** Swap Rollback Step**, we will ignore the value of the Upsize inactive service from step params

In the **Swap Rollback Step** (if it executes), we aren’t deleting the new application created as we previously did, as we are not creating a new application Harness is modifying the old application only, and depending upon if the swap routes step was successful or no.

If the **Swap routes step** was successful: We only need to switch the name and the routes for the ACTIVE and INACTIVE(new application) applications.

If the **Swap routes step** wasn't successful: We don’t need to change anything. 


```YAML
- step:
                  name: BG App Setup
                  identifier: BGAppSetup
                  type: BGAppSetup
                  timeout: 10m
                  spec:
                    tasInstanceCountType: FromManifest
                    existingVersionToKeep: 0 ## This is the new field added to specify how many versions we keep
                    additionalRoutes: []
                    tempRoutes: []
```

Here's a demo video:  

<!-- Video:
https://www.loom.com/share/5533c4832652403bac6ef06c5c926c2b?sid=11f56157-d01f-4915-ba88-5c269087615a-->
<DocVideo src="https://www.loom.com/share/5533c4832652403bac6ef06c5c926c2b?sid=11f56157-d01f-4915-ba88-5c269087615a" />

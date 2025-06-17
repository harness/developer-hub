---
title: Bidirectional sync with SCM
description: Learn how to add and configure a bidirectional sync with SCM.
sidebar_position: 999
---

## Manual Webhook Setup for Bidirectional Sync

By default, Harness SCM Experience syncs unidirectionally from Harness to your repositories. If automatic webhook registration isn’t possible or you prefer full control, you can manually create and register webhooks in your SCM. Harness will detect and reuse your existing hooks to enable bidirectional sync of all supported entities.


## Supported Entities

These entity types can be synced bidirectionally once webhooks are in place:

- Pipelines  
- Templates  
- Input Sets  
- Services  
- Environments  
- Infrastructure

## Important Notes

- If users make concurrent changes in Harness and in the repository at the same time, the first-received change wins.  
- Invalid YAML commits in the repository will show an **Invalid YAML Detected** error in the Harness UI—fix it in Harness or in your repo.  
- On-prem SCM servers must be reachable from Harness SaaS.  
- Only `.yaml` and `.yml` files are supported for bidirectional sync.  
- You must be the owner (or have equivalent rights) of the repo to configure webhooks.  

## Overview  
When auto-creation of webhooks isn’t an option, you can manually create the webhook in your SCM and then register it in Harness. Harness will detect and reuse the existing hook for all repo-sync events.

## Payload URL  
Use this as the webhook URL when creating it in your SCM:

`https://<YOUR_HARNESS_URL>/webhook?accountIdentifier=<YOUR_ACCOUNT_ID>`

## Required Permissions  
The user tied to your SCM connector must have **Maintainer** (or equivalent) rights so that Harness can validate and receive all events.

## Supported SCM Providers & Events  

| SCM Provider        | Event Types / Permissions                                                                                                            |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **GitHub**          | `create`, `push`, `delete`, `deployment`, `pull_request`, `pull_request_review`, `issue_comment`, `release`                         |
| **GitLab**          | Comment, Issue, Merge Request, Push, Tag Push, Pipeline                                                                               |
| **Bitbucket Cloud** | `issue:created`, `pullrequest:created`, `repo:push`, `issue:comment_created`, `pullrequest:comment_created`                          |
| **Bitbucket Server**| `repo:refs_changed` (branch/tag push), `pr:opened`, `pr:comment:added`                                                               |
| **Azure DevOps**    | `git.push`, `git.pullrequest.created`, `git.pullrequest.updated`, `git.pullrequest.merge.attempted`, `ms.vss-code.git-pullrequest-comment-event` |

### GitHub  
1. Navigate to **Settings → Webhooks** in your repo.  
2. Click **Add webhook**.  
3. Paste the payload URL, set content type to `application/json`.  
4. Select the events listed above.  

### GitLab  
1. In your project, go to **Settings → Webhooks**.  
2. Paste the payload URL.  
3. Tick “Push Events,” “Tag Push Events,” “Comments,” “Issues,” “Merge Requests,” and “Pipeline Events.”  

### Bitbucket Cloud  
1. Under **Repository settings → Webhooks**, click **Add webhook**.  
2. Paste the payload URL.  
3. Select the required event checkboxes.  

### Bitbucket Server  
1. In **Project Settings → Hooks**, enable the “Webhook” plugin.  
2. Add a new hook, paste the URL, and select “branch/tag push” and PR events.  

### Azure DevOps  
1. Go to **Project Settings → Service Hooks**.  
2. Create a new subscription and choose **Web Hooks**.  
3. For each trigger (push, PR creation/update/merge attempt, comment), point to the Harness payload URL.  

## Registering the Webhook in Harness  
1. In Harness, open **Setup → Connectors**.  
2. Edit your SCM connector and go to **Webhooks → New Webhook**.  
3. Paste the same payload URL, select your connector, and click **Test**.  
4. Save—Harness will now receive and reuse this hook for bidirectional repo sync.

Harness will now receive and reuse this manually created hook for all repo-sync events, enabling full bidirectional sync.

---
description: KB - How Bidirectional sync prevent Github API Limit issue
title: Preventing GitHub API Rate Limits with Bidirectional Sync
---
# Introduction

This knowledge base article discusses how Bidirectional Sync can help prevent reaching the GitHub API limit issue.

## API rate limits, what causes them?

Github limits the number of REST API requests that you can make within a specific amout of time. Sometimes, the number is extrememly high and stops remote entitites from working. 

## Solving GitHub API Limits with Bidirectional Sync

In bidirectioal sync, changes made on either the Git repository or Harness are automatically synchronized. Updates to the entity on the platform are determined by the received event payload.Therefore, it is required to enable bidirectional sync congiguration before the remote entities are created. 

Read more on how to enable [Biderectional Sync](/docs/platform/git-experience/gitexp-bidir-sync-setup.md).



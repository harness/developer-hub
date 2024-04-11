---
description: KB - How Bidirectional sync prevents Git API Limit issue
title: Preventing Git API Rate Limits with Bidirectional Sync
---
# Introduction

This knowledge base article discusses how bidirectional sync can help prevent reaching the Git API rate limit issue. 

## API rate limits, what causes them?

Git limits the number of REST API requests that you can make within a specific amount of time. Sometimes, the number of API requests in a specific period of time is high and it stops remote entities from working.

## Solving GitHub API Limits with Bidirectional Sync

In bidirectional sync, changes made on either the Git repository or Harness are automatically synchronized. With bidirectional sync, files are cached at Harness's end, creating a copy of Git i.e in Bidirectional sync the source of truth is Harness's cached data. Instead of making frequent requests to the Git API for every operation, the system can rely on the cached data for all tasks, thus limiting the risk of reaching API limits.

:::info note
Currently the git file cache duration is set to 30 days.
:::
Read more on how to enable [Bidirectional Sync](/docs/platform/git-experience/gitexp-bidir-sync-setup/).



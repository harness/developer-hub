---
title: Harness Git Rate Limits Best Practices
description: Harness Git Experience is a powerful tool, but dealing with Git Rate Limits is often a difficult issue for customers.  Here are some handy suggestions to help you with your Git Experience Journey
---

Harness Git Experience provides many powerful capabilities, such as integrating Harness with your Git version control and providing an **as-a-code** experience with Harness.  However, users must always be mindful of the possibility of hitting [GitHub Rate Limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api). 

Harness has lowered the possibility of encountering Rate Limits with some options.

## Use GitHub App instead of GitHub Personal Access Tokens
GitHub Personal Access Tokens (PAT) is a simple method for authenticated connectivity to your GitHub Environment.  Unfortunately, these [Tokens only allow up to 5000 requests per hour](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api#primary-rate-limit-for-authenticated-users). 

Harness, though, also supports connectivity via [GitHub App connectivity](https://developer.harness.io/docs/platform/connectors/code-repositories/git-hub-app-support/).  This utilizes GitHub App connections, which [increases the number of requests from 5000 per hour to 15000 per hour](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-github-app-installations), thereby reducing the chance of hitting the upper limit on API requests to GitHub


## Utilize GitHub Webhook connection for bi-directional sync

When customers set up any entities, including pipelines and configurations, to be synchronized with GitHub, they can create a one-way or bi-directional sync. Customers setting up a one-way sync from Harness to GitHub will only call GitHub APIs to push changes to GitHub.

Harness has also refined the process around bi-directional sync to allow the use of Webhooks. By utilizing and setting up [bidirectional syncs with a Webhook](https://developer.harness.io/docs/platform/git-experience/gitexp-bidir-sync-setup/), customers can basically eliminate the need for the Harness environment to "check" the state of the repo's files.  Instead, when a PR is pushed, this will trigger the webhook to check the PR for the changes and apply them to the Harness environment.  

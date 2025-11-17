---
title: What's supported
sidebar_position: 1
redirect_from:
  - /docs/chaos-engineering/leverage-spinnaker-api-to-pull-a-list-of-pipelines
---

The following is a walk through of a general concept of how to leverage Spinnaker API calls (<a href="https://spinnaker.io/reference/api/" target="_blank" rel="noopener noreferrer nofollow">https://spinnaker.io/reference/api/</a>) to pull a list of Running Pipelines.  The output of the call would then need to be interpreted as needed, or it can be used to provide a single snapshot of this information.<br /><br />The process is repeatable and is useful for tasks such as checking for pipelines that have not completed/stopped before performing maintenance on the environment, or checking for pipelines before performing upgrades to the environment
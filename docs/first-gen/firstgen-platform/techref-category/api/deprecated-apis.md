---
title: Deprecated API Features
description: Contains a list of currently-deprecated API features with their replacements.
sidebar_position: 330
helpdocs_topic_id: 22e87m2sjt
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic contains a list of currently-deprecated API features with their replacements. Some of the API features become obsolete and need to be removed or replaced because of the changing dependencies or to stay current with new best practices. To ensure a smooth transition, the API features are first deprecated for a period of time before getting removed.

### Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Use Workflows API](use-workflows-api.md)

### Execution

The `Execution` parameter in the API is deprecated. Use `PipelineExecution` or `WorkflowExecution` instead.

To maintain backward compatibility, if a request for `Execution` permission is received via the API, it is translated into `PipelineExecution` and `WorkflowExecution`.


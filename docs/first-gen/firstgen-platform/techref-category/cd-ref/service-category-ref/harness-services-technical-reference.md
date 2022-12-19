---
title: Harness Services Technical Reference
description: Harness Services represent your microservices/apps. You define where the artifacts for those microservices come from, and the container specs, configuration variables, and files for those microservic…
sidebar_position: 10
helpdocs_topic_id: 2a0beq3sxg
helpdocs_category_id: xbu33o5q99
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Services represent your microservices/apps. You define where the artifacts for those microservices come from, and the container specs, configuration variables, and files for those microservices.

See general [Harness Service How-tos](/docs/category/add-services). 

Find deployment platform-specific information for Services in the respective deployment how-tos. See [Continuous Deployments](/docs/category/continuous-delivery).

### Harness Service Names

Harness Service names are limited to the following characters:

* `-` (dash)
* `_` (underscore)
* `a-z`
* `A-Z`
* `0-9`
* `space`

Don't use target platform naming conventions that don't conform to these characters.

For example, if the target platform allows dots, like `my.sample.app`, don't use dots in your Harness Service name.

### Deployment Type

The list of deployment types Harness supports. This list is growing all the time.

For the latest supported platforms, see [Supported Platforms and Technologies](../../../../starthere-firstgen/supported-platforms.md).

### Related Reference Material

* [Artifacts Tech Ref](/docs/category/artifacts-tech-ref-firstgen)


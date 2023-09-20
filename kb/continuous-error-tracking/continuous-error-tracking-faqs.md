---
title: Continuous Error Tracking (CET) FAQs
description: This article addresses some frequently asked questions about Harness Continuous Error Tracking(CET).
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# FAQ


#### How do I setup the application name of the JVM to be monitored with the CET agent?

There are two ways one can setup the application name within the CET agent:
- For the environment variable, use the parameter ET_APPLICATION_NAME=
- For the JVM argument, use the parameter -Dharness.etagent.application.name=

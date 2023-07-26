---
title: CI step logs dont load in real-time
---

## Problem:

During the execution of a Harness CI pipeline, the logs for each step fail to load in real-time. Instead, the logs only appear once the entire stage execution has completed.

## Possible Causes:

This issue is typically related to network restrictions that prevent the real-time loading of CI step logs. We use server-sent events (SSE) to stream the response while the step is running and this could be impeded if a network device is blocking this specific type of traffic.

## Solution:

To isolate the problem of CI step logs not loading in real-time, follow these steps:

- #### Check for Network Restrictions:

Contact your internal network team to determine if there are any restrictions or limitations imposed on server-sent events. Network devices, such as firewalls or proxies, may be configured to block or disrupt SSE traffic. Collaborate with the network team to identify and address any such restrictions.

- #### Test Outside Corporate Network:

To narrow down the issue and determine if it is specific to your corporate network, attempt to access an ongoing pipeline execution from a network outside of your corporate environment. This could be a personal network or a separate testing environment. Monitor the pipeline execution logs from this external network and observe if the logs load in real-time without any issues. If the logs display promptly, it indicates that the problem is likely related to network restrictions within your corporate network.

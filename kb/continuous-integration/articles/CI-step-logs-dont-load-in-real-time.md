---
title: CI step logs don't load in real time
---

## Problem

During the execution of a Harness CI pipeline, the logs for each step don't load in real time. Instead, the logs appear after the entire stage has completed.

## Possible causes

This issue is typically related to network restrictions that prevent real time loading of CI step logs. Harness uses server-sent events (SSE) to stream the response while the step is running, and this could be impeded if a network device is blocking this specific type of traffic.

## Solution

To determine what is preventing CI step logs from loading in real time, follow these steps:

1. Check for network restrictions.

   Contact your internal network team to determine if there are any restrictions or limitations imposed on server-sent events (SSE). Network devices, such as firewalls or proxies, can be configured to block or disrupt SSE traffic. Collaborate with your network team to identify and address these restrictions.

2. Test outside your corporate network.

   To determine if the issue is specific to your corporate network, attempt to access an ongoing pipeline execution from a network outside of your corporate environment. This could be a personal network or a separate testing environment. Monitor the pipeline execution logs from this external network and observe if the logs load in real time without any delays. If the logs display as expected, it indicates that the cause is likely related to network restrictions within your corporate network.

---
title: Debugging Slow Orca Performance
---

## Issue
Orca is displaying unresponsiveness and the following behavior is being observed:
* Tasks such as **Resize** or **Deploy** take much longer to complete. For example, as task that typically takes 1-3 minutes now takes 6-10 minutes.
* 30 second **Wait stages** take longer than 30 seconds to complete.

## Cause
Under the hood, Orca uses Redis to store a queue of tasks to perform. During each polling cycle, Orca it will attempt to read any messages that haven’t been delivered and are past due. In some cases, these messsages may be deemed “undelieverable” and requeued. If enough of these messages build up, you may experience a slow down in your Pipeline executions.


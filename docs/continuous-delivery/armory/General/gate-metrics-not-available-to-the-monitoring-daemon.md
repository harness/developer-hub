---
title: Gate Metrics not Available to the Monitoring-Daemon
---

## Issue
There are two issues related to Gate metrics not being available to the monitoring daemon.
* The first issue is that Gate requires auth for ```/spectator/metrics``` if auth is enabled, including from ```localhost```. 
* Secondly, Gate metrics are not available when Gate is on the same host as Deck but on a different path due to the generated metrics_url being wrong (i.e. Deck's URL is [https://myspinnaker.com](https://myspinnaker.com/) and Gate's URL is [https://myspinnaker.com/api/v1](https://myspinnaker.com/api/v1))

## Cause
The first issue is that Gate requires auth for ```/spectator/metrics``` if auth is enabled, including from ```localhost```. The second issue is because the generated metrics_url for Gate does not take into context the value of the setting ```server.servlet.context-path``` in the file ```profiles/gate-local.yml```. 


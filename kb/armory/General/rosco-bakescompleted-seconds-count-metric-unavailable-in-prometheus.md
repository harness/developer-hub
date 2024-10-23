---
title: Rosco's bakesCompleted_seconds_count metric unavailable in Prometheus
---

## Issue
After installing the Observability Plugin, the ```bakesCompleted``` metric set (count, max & sum) from Rosco is not displayed in Prometheus even though the Prometheus Targets screen shows that all pods being up and being scraped regularly.
 
Port forwarding the Rosco pod and hitting the ```/aop-prometheus``` endpoint shows metrics are registered but not the ```bakesCompleted``` metrics set. The metrics are also not visible in Grafana.


## Cause
For ```Observability Plugin version v1.2.1``` - A successful bake is required after plugin installation for the metric to be registered.

If ```Observability plugin v1.2.0``` is being used there is a [bug (resolved in v1.2.1)](https://github.com/armory-plugins/armory-observability-plugin/issues/26) that will prevent some metrics being displayed in Prometheus as well as the above.


---
title: Metric data does not flow into Splunk despite setting up HEC Connection
---

## Issue
Customers setting up an HEC connection [https://docs.splunk.com/Documentation/Splunk/8.2.4/Data/UsetheHTTPEventCollector](https://docs.splunk.com/Documentation/Splunk/8.2.4/Data/UsetheHTTPEventCollector) with Spinnaker Logging may encounter an issue where data is not being pushed to the connector

## Cause
HEC connector with default ports uses 8088 or 8089 depending on the Splunk version by default.  This will happen if you do not configure a TCP listener, and can cause issues in Splunk with attaining data if the port is already in use


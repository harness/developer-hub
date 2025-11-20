---
title: Confirming Environment Logs and Environment Debugging ID with Armory Support
---

## Introduction
To assist with troubleshooting, Armory Support asks our customers to please set up their environment with [Armory Diagnostics and Monitoring](https://docs.armory.io/docs/spinnaker-install-admin-guides/admin-diagnostics/) so that logs are provided to Armory support.  This will allow Armory to assist in a quicker fashion because Armory Support can investigate logs without a rigorous search and [submission by our customers](https://kb.armory.io/s/article/Provide-Logs-from-Pods-to-Armory-Support-for-Troubleshooting-Purposes) .However, there are times even when customers have been sending debugging logs, Support may still ask to confirm the environment to avoid diagnosis on the incorrect environment.  Support may ask to confirm the debug id of the environment to ensure we are observing the correct logs.We also understand that some of our customers may have security requirements and preferences that prevent diagnostic information from being sent to Armory.  In these cases, [we ask that logs be attached to your tickets to help assist with the process](https://kb.armory.io/s/article/Provide-Logs-from-Pods-to-Armory-Support-for-Troubleshooting-Purposes).

## Prerequisites
Customer environments that are being monitored by Armory have already run through this set up first[https://docs.armory.io/docs/spinnaker-install-admin-guides/admin-diagnostics/](https://docs.armory.io/docs/spinnaker-install-admin-guides/admin-diagnostics/)

## Instructions
After diagnostics have been enabled, your Hal Config file or Operator Spinnaker Service file will have new information and a section called ```diagnostics```
Within this section, there is a ```uuid``` that is generated that can be used to confirm the environment matches the one we have on file.  Please provide this uuid to support if they require confirmation


---
title: Dinghy will fail to start after configuration
---

## Issue
Dinghy will fail to start after a change in configuration fields. The Dinghy module will fail to load, and not provide an error which can lead to downtime. 

## Cause
Armory Engineering has uncovered an issue with config loading in Dinghy on versions >= 2.24.0. If an organization misconfigures Dinghy in an incompatible way (e.g. providing a number value to a string config field), the Dinghy Container will crash for an unexpected reason. 


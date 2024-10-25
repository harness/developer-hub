---
title: Adding a group with many members to application times out in GCP
---

## Issue
An organization using Spinnaker and Google Cloud Platform (GCP) may run into API rate limiting issues involving Fiat Managed Service Accounts.  These rate limits can cause errors, timeouts, and general non-responsiveness when the expectation is full functionality. 
 
Example Error: 
```202X-XX-XX XX:XX:XX.453 WARN 1 — [ scheduling-1] s.f.r.g.GoogleDirectoryUserRolesProvider : [] Failed to fetch groups for user xx####x#-xx#x-##xx-x#x#-###c####x#x#@managed-service-account: Invalid Input: memberKey" ```
 
 

## Cause
Spinnaker uses ```Google Workspaces API``` to manage and run ```FIAT``` Managed Services, resulting in consistent, frequent API calls when calling managed service accounts.  The results are that an organization can be temporarily blocked and rate limited due to excessive usage.
Specifically, requests are made to Google APIs whenever pipelines execute using the managed service account from an automated trigger, causing multiple API calls for routine deployments. 


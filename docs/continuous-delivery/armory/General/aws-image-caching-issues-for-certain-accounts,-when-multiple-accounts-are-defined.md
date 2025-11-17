---
title: AWS image caching issues for certain accounts, when multiple accounts are defined
---

## Issue
The stage ```Find image from Cluster``` fails to find images that that belong to certain AWS accounts on Spinnaker versions earlier than 2.23.3, when multiple accounts are defined.  


## Cause
There was an issue with Spinnaker versions 2.23 and earlier where Clouddriver fails to cache images that belong to the first account (alphabetically) for each region.
For example, in a region (e.g. us-east-1) with accounts named ```Edith```, ```Milton```, and ```Pixel```, ```Edith```’s images do not get cached.


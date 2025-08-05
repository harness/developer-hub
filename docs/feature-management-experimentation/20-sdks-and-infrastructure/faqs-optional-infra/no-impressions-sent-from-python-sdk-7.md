---
title: No Impressions sent from Python SDK 7.x and Synchronizer 1.x
sidebar_label: No Impressions sent from Python SDK 7.x and Synchronizer 1.x
sidebar_position: 7
---

## Issue
When using Synchronizer 1.x version and Python SDK 7.x version, the Python SDK is processing treatments correctly, Synchronizer does not report any errors, but no Impressions are sent to Harness FME servers.

## Answer
As of Python SDK 7.0.0, design changes where made to match the enhancements made to Synchronizer 2.0 version. Thus, when Python SDK 7.x used, the Synchronizer used must be upgraded to 2.x version.
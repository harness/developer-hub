---
title: No Impressions sent from Python SDK 7.x and Synchronizer 1.x
sidebar_label: No Impressions sent from Python SDK 7.x and Synchronizer 1.x
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360024851032-No-Impressions-sent-from-Synchronizer-1-x-and-Python-SDK-7-x </button>
</p>

## Issue
When using Synchronizer 1.x version and Python SDK 7.x version, the Python SDK is processing treatments correctly, Synchronizer does not report any errors, but no Impressions are sent to Split cloud.

## Answer
As of Python SDK 7.0.0, design changes where made to match the enhancements made to Synchronizer 2.0 version. Thus, when Python SDK 7.x used, the Synchronizer used must be upgraded to 2.x version.
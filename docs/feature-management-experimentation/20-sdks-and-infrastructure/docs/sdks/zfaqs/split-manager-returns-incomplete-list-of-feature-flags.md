---
title: Split Manager returns incomplete list of feature flags
sidebar_label: Split Manager returns incomplete list of feature flags
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006854852-Frontend-and-backend-API-key-usage </button>
</p>

## Issue

When using the SDK factory Manager object to fetch a list of information about feature flags, the list is incomplete and missing some flags that exist in the environment.

## Root Cause

Before using the factory Manager object, the SDK cache has to be completely downloaded and SDK status must be ready. If you attempt to fetch the list using the Manager object before the SDK is ready, a partial list is returned based on the contents of the cache.

## Solution

Make sure to verify the SDK is ready before using the factory Manager object, which is the same requirement when calling getTreatment.

Please refer to each SDK's documentation for details on how to check that the SDK is ready.
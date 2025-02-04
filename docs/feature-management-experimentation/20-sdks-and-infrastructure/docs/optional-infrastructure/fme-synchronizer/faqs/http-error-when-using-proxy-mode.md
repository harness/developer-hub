---
title: 500 HTTP error in proxy mode
sidebar_label: 500 HTTP error in proxy mode
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360050549072-Synchronizer-returns-500-HTTP-error-when-used-in-proxy-mode </button>
</p>

## Issue

Synchronizer returns 500 HTTP error when used in proxy mode.

Using Synchronizer in proxy mode, when trying to initialize a Split SDK factory connecting to the Synchronizer instance, the SDK never gets ready.

## Root Cause

Looking at the Synchronizer debug log below, looks like the Synchronizer's call to Split cloud is successful but the JSON structure returns empty feature flags names. 

While the HTTP call to Split cloud did not error out, the Synchronizer returns a 500 error to SDK, since getting an empty feature flag list means no flags where added to the environment corresponding to the SDK API key used. This will result in the current SDK session to be unable to calculate any treatments.

```
SPLITIO-AGENT  - DEBUG - 2020/10/12 21:41:51 logger.go:35: GET |500| 285.71µs | 10.10.6.249 | /api/splitChanges
SPLITIO-AGENT  - DEBUG - 2020/10/12 21:41:52 client.go:60: Authorization [ApiKey]:  1c9s...e19o
SPLITIO-AGENT  - DEBUG - 2020/10/12 21:41:52 client.go:56: [GET]  https://sdk.split.io/api/splitChanges?since=-1
SPLITIO-AGENT  - DEBUG - 2020/10/12 21:41:52 client.go:64: Headers: map[Accept-Encoding:[gzip] Content-Type:[application/json]]
SPLITIO-AGENT  - VERBOSE - 2020/10/12 21:41:52 client.go:95: [RESPONSE_BODY] {"splits":[],"since":-1,"till":-1} [END_RESPONSE_BODY]
```

### Answer

Make sure to add feature flags to the environment corresponding to the SDK API key used by Synchronizer, or use the correct SDK API key for the desired environment.
---
title: Authentication Timeout Results in 401 Error
---

## Issue
You may encounter the following error when a user attempts to login:
```
{
  error: "Unauthorized",
  message: "Authentication Failed: Error validating SAML message",
  status: 401,
  timestamp: 1553109495710
}
```

## Cause
This issue occurs because of a known issue in Spring. Spinnaker does not accept SAML tokens signed by a user who authenticated more than 2 hours ago even if your authentication system allows it.


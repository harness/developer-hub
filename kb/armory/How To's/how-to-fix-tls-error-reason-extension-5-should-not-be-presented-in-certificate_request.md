---
title: How to fix TLS error "Reason- extension (5) should not be presented in certificate_request."
---

## Issue
When Spinnaker attempts to connect to any client services behind a TLS endpoint, you receive the following error:
```Reason: extension (5) should not be presented in certificate_request```

## Cause
It may be related to a Java and Go bug mentioned here: [https://github.com/golang/go/issues/35722#issuecomment-557209799](https://github.com/golang/go/issues/35722#issuecomment-557209799).


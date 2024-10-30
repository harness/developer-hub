---
title: Large Fiat headers can cause permission errors due to timeouts and 400 errors.
---

## Issue
If a header is passed to Fiat that is too big in size, it can cause errors in the logs such as below
```java.lang.IllegalArgumentException: Request header is too large```

## Cause
The default header size for Tomcat is only 8KB. If this limit is exceeded, Fiat will timeout and throw ```400 errors``` as it is unable to parse the entire header.


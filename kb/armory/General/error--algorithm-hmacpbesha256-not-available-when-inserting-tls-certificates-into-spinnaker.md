---
title: Error- Algorithm HmacPBESHA256 not available when Inserting TLS Certificates into Spinnaker
---

## Issue
When generating TLS certificates using the [Generate Certificates Armory Doc](https://docs.armory.io/armory-enterprise/armory-admin/generating-certificates/), after inserting these certificates into the Spinnaker configuration, Gate and other services are logging the below error
```java.io.IOException: Integrity check failed: java.security.NoSuchAlgorithmException: Algorithm HmacPBESHA256 not available```

## Cause
This is due to a mismatch of Java versions. Armory currently runs on Java 11 and the commands used in the [Generate Certificates Doc](https://docs.armory.io/armory-enterprise/armory-admin/generating-certificates/) will use the local Java version to generate certificates. Specifically, the SHA256 signing algorithm that newer Java versions are using will not always be backwards compatible with Java 11.


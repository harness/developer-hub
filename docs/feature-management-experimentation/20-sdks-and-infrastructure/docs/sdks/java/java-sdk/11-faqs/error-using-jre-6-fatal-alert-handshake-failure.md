---
title: "Error using JRE 6.x \"fatal alert: handshake_failure\""
sidebar_label: "Error using JRE 6.x \"fatal alert: handshake_failure\""
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025325672-Java-SDK-error-using-JRE-6-x-fatal-alert-handshake-failure </button>
</p>


## Issue

Using Split Java SDK and JDK 1.6 (JRE 6.x), the following connection error to split.io is thrown:
```
.RECV TLSv1 ALERT: fatal, handshake_failure

  handling exception: javax.net.ssl.SSLHandshakeException: Received fatal alert:
  handshake_failure
```

## Root Cause

Java 1.6 does support TLSv1 however, it does not support high strength Ciphers which are required by split.io security protocol.

## Solution

There are two solutions to this issue:

* Upgrade your JDK to 1.7 or above (Java 7 or above). The newer versions will be packaged by default with the stronger ciphers needed.

* Install the JCE (Java Cryptography Extension) from the JVM vendor for Java 6, which will provide the support for high strength ciphers.
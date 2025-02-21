---
title: "Exception: PKIX path building failed: Unable to find valid certification path"
sidebar_label: "Exception: PKIX path building failed: Unable to find valid certification path"
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360022523052-Java-SDK-Exception-PKIX-path-building-failed-unable-to-find-valid-certification-path-to-requested-target </button>
</p>


## Problem

When Implementing Java SDK the exception below occurs initializing the SplitFactory object:
```
RefreshableSplitFetcher failed: 
Problem fetching splitChanges:
sun.security.validator.ValidatorException: 
PKIX path building failed:
sun.security.provider.certpath.SunCertPathBuilderException:
unable to find valid certification path to requested target
```

## Root cause

This exception means Java could not download the Split.io certificate, which will prevent the SSL connection to be established between the SDK and Split cloud.

## Solution

It's possible to install the Split.io certificate manually into any Java store the JVM is using.
Here are the steps to download the Split.io certificate and add it:
1. Run the command below to fetch the cert from sdk.split.io, re-run the command to fetch the cert from events.split.io
  ```
openssl s_client -showcerts -connect sdk.split.io:443 </dev/null 2>/dev/null|openssl x509 -outform PEM >splitsdkcert.pem

openssl s_client -showcerts -connect events.split.io:443 </dev/null 2>/dev/null|openssl x509 -outform PEM >spliteventscert.pem
```
2. Run the keytool to import both certs into Java cacerts store, or specify any other ket store:
  ```
keytool -importcert -file splitsdkcert.pem -keystore [JAVA_HOME]/lib/security/cacerts -alias "splitsdkcert"
  
keytool -importcert -file spliteventscert.pem -keystore [JAVA_HOME]/lib/security/cacerts -alias "spliteventscert"
```
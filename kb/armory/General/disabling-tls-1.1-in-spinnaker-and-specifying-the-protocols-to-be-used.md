---
title: Disabling TLS 1.1 in Spinnaker and Specifying the Protocols to be used
---

## Introduction
As TLS 1.1 has reached end of life, customers may want to disable it from the available protocols in Spinnaker, and consider which protocols and Cipher Suites to enable.  

## Instructions
#### In Operator
The following entries would need to be added in the ```profiles``` section of the Spinnaker Manifest.  In Operator, go to ```spec.spinnakerConfig.profiles.spinnaker``` and then look to make the following modification:

```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      spinnaker:
        default:
          cipherSuites:
          - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
          - TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
          - TLS_DHE_RSA_WITH_AES_256_GCM_SHA384
          - TLS_DHE_RSA_WITH_AES_128_GCM_SHA256
          - TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384
          - TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
          - TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
          - TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
          - TLS_AES_256_GCM_SHA384
          - TLS_CHACHA20_POLY1305_SHA256
          - TLS_AES_128_GCM_SHA256
        ## For embedded systems, the below two ciphers may be necessary.  Normally, no need to  include these though they're a TLS1.3 cipher
        #  - TLS_AES_128_CCM_8_SHA256
        #  - TLS_AES_128_CCM_SHA256
          tlsVersions:
          - TLSv1.2
          - TLSv1.3
[...]
```

Next, redeploy the manifest and it will then limit the protocol usage to TLSv1.1.  The above is an example for limiting the protocols and excluding TLSv1.1, but it can be modified to further limit TLS protocol versions.
 
#### In Halyard
In the hal config profiles directory e.g. (```~/.hal/default/profiles/```), please add the following to the ```spinnaker.yml``` file, or create a new file if it doesn't already exist.  In the file, add the following code:
```
default:
  cipherSuites:
  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
  - TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
  - TLS_DHE_RSA_WITH_AES_256_GCM_SHA384
  - TLS_DHE_RSA_WITH_AES_128_GCM_SHA256
  - TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384
  - TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
  - TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
  - TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
  - TLS_AES_256_GCM_SHA384
  - TLS_CHACHA20_POLY1305_SHA256
  - TLS_AES_128_GCM_SHA256
## Embedded systems is where yoU MIGHT see these - would not normally include these though they're a TLS1.3 cipher
#  - TLS_AES_128_CCM_8_SHA256
#  - TLS_AES_128_CCM_SHA256
  tlsVersions:
  - TLSv1.2
  - TLSv1.3
```
Next, redeploy the manifest with ```hal deploy apply``` and it will then limit the protocol usage to TLSv1.1.  The above is an example for limiting the protocols and excluding TLSv1.1, but it can be modified to further limit TLS protocol versions.


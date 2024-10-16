---
title: Initiated Login Does Not Work With SAML 2.0
---


If you’ve set up SAML 2.0 authentication for your Spinnaker cluster and are able to login when your Identity Provider (iDP, ADFS/okta/etc.), but aren’t able to login when the Service Provider (SP, Spinnaker) initiates the login, try the following:y
```keytool -export -keystore saml.jks -alias saml -file spinnaker-saml.cer```
Then import/configure the exported ```spinnaker-saml.cer``` in your iDP for the SAML application you created.
Essentially, Gate is signing the requests with the Java Keystore and the iDP doesn’t know how to understand the signed requests until it is aware of the signing certificate.
This is somewhat documented [here](https://www.spinnaker.io/setup/security/authentication/saml/#identity-provider-setup).


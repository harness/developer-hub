---
title: How to disable security (Authn and Authz) for Spinnaker Migration testing 
---

## Introduction
When admins are testing migration of their production Spinnaker instance to a new cluster or environment, they may need to do some testing on the new environment without the production security permissions in place. (ex: OKTA, SAML, LDAP)
If users were to try testing the pipelines or Spinnaker UI in the new environment, Spinnaker may throw permissions errors or the new environment may not be accessible. 

## Prerequisites
Access to the current Spinnaker instance configuration 

## Instructions
In order to make sure the testing and the new instance can be access and used without any permission concerns is to comment out the ```security``` sections in the ```Kustomize.yml``` except for the ```security/patch-gate-tomcat-headers.yml``` if it is being used in the environment.
Depending on what the administrators specifically has set up for security, the admins may also need to comment out portions of the ```gate``` and ```SpinnakerService``` settings. Here is an example config where ***Authn*** and ***x509*** are commented out in ```SpinnakerService.yml```

```
#-----------------------------------------------------------------------------------------------------------------
# Example configuration for exposing spinnaker with NodePort Kubernetes services
#-----------------------------------------------------------------------------------------------------------------
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      security:
        apiSecurity:
          overrideBaseUrl: https://minnaker.us-east-1.elb.amazonaws.com:8084
          ssl:
            enabled: true
            keyAlias: gate
            keyStore: encryptedFile.jks
            keyStoreType: jks
            keyStorePassword: spinnaker # The password to unlock your keystore. Due to a limitation in Tomcat, this must match your key's password in the keystore.
#            trustStore: encryptedFile.jks
#            trustStoreType: jks
#            trustStorePassword: spinnaker # The password to unlock your truststore.
#            clientAuth: WANT # Declare 'WANT' when client auth is wanted but not mandatory, or 'NEED', when client auth is mandatory.
        uiSecurity:
          overrideBaseUrl: https://minnaker.us-east-1.elb.amazonaws.com:9000
          ssl:
            enabled: true
            sslCertificateFile: encryptedFile.crt
            sslCertificateKeyFile: encryptedFile.key
            sslCertificatePassphrase: spinnaker # Your passphrase
#        authn:
#          x509:
#            enabled: true
#            roleOid: 1.2.840.10070.8.1
#            subjectPrincipalRegex: EMAILADDRESS=(.*?)(?:,|$)
#    profiles:
#      gate:
#        default:
#          apiPort: 8085

  kustomize:
    deck:
      service:
        patches:
          - |
            spec:
              type: NodePort
              ports:
              - name: http
                port: 9000
                targetPort: 9000
                nodePort: 30000
    gate:
      service:
        patches:
        - |
          spec:
            type: NodePort
            ports:
            - name: http
              port: 8084
              targetPort: 8084
              nodePort: 30084
#            - name: x509
#              port: 8085
#              targetPort: 8085
#              nodePort: 30085
```
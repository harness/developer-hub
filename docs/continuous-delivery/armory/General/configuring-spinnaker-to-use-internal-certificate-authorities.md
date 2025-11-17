---
title: Configuring Spinnaker to Use Internal Certificate Authorities
---

## Introduction
There are a lot of places in Spinnaker which support the ability to configure custom trust/key stores for organizations who use internally signed certificates. In some cases, however, it isn’t supported yet but the environment will still need to talk to a service which serves one of these certificates.
This article shows how to import certificates into the trust/key store and configure a Spinnaker service with it.Most services in Spinnaker are written in Java. There are a few Armory specific services written in Golang, such as Dinghy and Terraformer.
If the particular certificate is not configured properly, it is possible that errors such as the one below will be found in the logs of the service
```x509: certificate signed by unknown authority```

## Prerequisites
This document assumes that ```kubectl``` access is available to the Kubernetes cluster and the latest version of Halyard (either OSS or Armory’s extension) is being used.

## Instructions
Create a temporary copy of your system’s trust/key store and import your internal certificate. For a Java truststore, on a Mac, ruststore will be located at ```$(/usr/libexec/java_home/)/jre/lib/security/cacerts```. It will be different on Linux.
```
$ mkdir /tmp/custom-trust-store
$ cp {path-to-cacerts} /tmp/custom-trust-store
$ keytool import -alias custom-ca -keystore /tmp/custom-trust-store/cacerts -file {your-internal-certificate}
```
For Golang services, make a copy of ```/etc/ssl/cert.pem``` and append the internal certificate to your copy of ```cert.pem```. *Note: If you do not have a copy of the internal certificate - you can run the following command to retrieve it manually:*
```openssl s_client -showcerts -connect host:port |openssl x509 -outform PEM >mycertfile.pem```
Use ```kubectl``` to create a Secret from your copy of ```cacerts``` or ```cert.pem```.
```
$ kubectl create secret generic -n {your-spinnaker-namespace} internal-trust-store --from-file /tmp/custom-trust-store/cacerts
```
Configure a Spinnaker service with the new trust/key store using volume mount. In this example we’ll be configuring Front50 with this new store.
**In Halyard** *Disclaimer* The ```mountPath``` suggested should work for most cases but we did notice that this could be specific to the image used. (eg. when using Ubuntu, users will need to use ```/etc/ssl/certs``` for Golang services)
```# ~/.hal/default/service-settings/front50.yml```
```
kubernetes:
  volumes:
  - id: internal-trust-store
    mountPath: /etc/ssl/certs/java
    type: secret
```
```# ~/.hal/default/service-settings/dinghy.yml``` or other Golang based services kubernetes: 
```
kubernetes:
 volumes:
 - id: internal-trust-store
   mountPath: /etc/ssl/
   type: secret
```
**In Operator***Disclaimer* The ```mountPath``` suggested should work for most cases but we did notice that this could be specific to the image used. (eg. when using Ubuntu, users will need to use ```/etc/ssl/certs``` for Golang services)
In the ```SpinnakerService.yml```, in the ```spec.spinnakerConfig.service-settings``` section for each service based in Java (e.g. Front50)
spec:
```
  spinnakerConfig:
    service-settings:
      front50:
        kubernetes:
          volumes:
          - id: internal-trust-store
            mountPath: /etc/ssl/certs/java
            type: secret
```
In the ```SpinnakerService.yml```, in the ```spec.spinnakerConfig.service-settings``` section for each service in Golang (e.g. Dinghy): 
```
spec:
  spinnakerConfig:
    service-settings:
      dinghy:
        kubernetes:
        volumes:
        - id: internal-trust-store
          mountPath: /etc/ssl/
          type: secret
```
* Redeploy Spinnaker using ```hal deploy apply```, or deploying the Operator Manifest
The Spinnaker component for which you configured the volume mount should now be using the new trust/key store by default.


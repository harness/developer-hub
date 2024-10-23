---
title: How to add a custom CA for Operator and Vault
---

## Introduction
When Spinnaker attempts to fetch a Vault token, you encounter the following error:

```error fetching vault token - error logging into vault using kubernetes auth: Put https://spinnaker-vault.vault.svc.cluster.local:8200/v1/auth/kubernetes/login: x509: certificate signed by unknown authority```
```This happens because you are using a custom CA and the Operator.```


## Prerequisites
Access to the relevant certificates in PEM format.  

## Instructions
Resolving this issue involves the following steps:
* Copy the original ```cert.pem``` file from ```/etc/ssl/cert.pem```
* Append the custom ca for Vault
* Mount the ```cert.pem``` similar to the ```/etc/ssl/certs/java/cacerts```

## Copy the System trust/key store
Create a temporary copy of the system’s trust/key store and import your internal certificate. If you’re on a Mac, the Java truststore will be located at ```$(/usr/libexec/java_home/)/jre/lib/security/cacerts```. It will be different on Linux.

```
$ mkdir /tmp/custom-trust-store
$ cp {path-to-cacerts} /tmp/custom-trust-store
$ keytool import -alias custom-ca -keystore /tmp/custom-trust-store/cacerts -file {your-internal-certificate}
```

### Halyard

Make a copy of ```/etc/ssl/cert.pem``` and append the internal certificate to your copy of ```cert.pem```. *Note: If you do not have a copy of the internal certificate - you can run the following command to retrieve it manually:*
```openssl s_client -showcerts -connect host:port |openssl x509 -outform PEM >mycertfile.pem```
Use ```kubectl``` to create a Secret from your copy of ```cacerts``` or ```cert.pem```.
```$ kubectl create secret generic -n {your-spinnaker-namespace} internal-trust-store --from-file /tmp/custom-trust-store/cacerts```


### Operator

Copy ```cert.pem``` from the Operator to a local directory:

```kubectl cp -n spinnaker-operator -c spinnaker-operator spinnaker-operator-xxxxx:etc/ssl/cert.pem .```

Append your custom cert to ```cert.pem```:

```cat myCA.crt >> cert.pem```

Append any other additional certs:

```cat myVault.crt >> cert.pem```

Create a Kubernetes secret for ```cert.pem```:


```kubectl create secret generic spinop-certs -n spinnaker-operator --from-file cert.pem```


This secret then gets mounted into Spinnaker Operator.

## Mounting Secrets to the Operator deployment
Add volume and volume mounts to Spinnaker Operator:

```
spec:
  serviceAccountName: spinnaker-operator
  containers:
    - name: spinnaker-operator
      image: armory/armory-operator:0.4.0
      ...
      volumeMounts
        - mountPath: /etc/ssl
          name: internal-cert-pem
    - name: halyard
      image: armory/halyard-armory:operator-0.4.x
      imagePullPolicy: IfNotPresent
      ...
      volumeMounts:
        - mountPath: /etc/ssl/certs/java
          name: internal-trust-store
  volumes:
  - name: internal-trust-store
    secret:
      defaultMode: 420
      secretName: internal-trust-store
  - name: internal-cert-pem
    secret:
      defaultMode: 420
      secretName: internal-cert-pem
```



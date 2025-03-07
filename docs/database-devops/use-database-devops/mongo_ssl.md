---
title: DB Devops MongoDB SSL
description: Learn More about How to set up MongoDB SSL Connection with DBDevops
sidebar_position: 11
---

## Introduction

This document provides a comprehensive guide to configuring MongoDB with TLS and mTLS, including secret and delegate configurations, JDBC test connections, and permissions. It covers the necessary steps to set up and manage certificates for secure communication between MongoDB and other services.

### TLS

* `root_ca.crt` file is available

* MongoDB is configured with TLS configuration, for example like below with `allowConnectionsWithoutCertificates: true`


```shell
data:
mongod.conf: |
net:
port: 27017
bindIp: 0.0.0.0
tls:
mode: requireTLS
certificateKeyFile: /etc/ssl/mongodb/server.pem
CAFile: /etc/ssl/mongodb/root_ca.crt
allowConnectionsWithoutCertificates: true
security:
authorization: enabled
```

#### Secret Configuration

We will create a secret with the `root_ca.crt`

```shell
kubectl create secret -n namespace generic db-ops-mongo-ssl-secret --from-file root_ca.crt
```

#### Delegate Configuration

Ensure that the [common delegate configuration](#common-delegate-configuration) is done before moving on to the next steps

Within our delegate configuration environment variables we will need to mount the `root_ca.crt` file

```shell
- name: DESTINATION_CA_PATH
  value: "/etc/ssl/certs/dbops/root_ca.crt"
```

**IMPORTANT NOTE** : The value of the `DESTINATION_CA_PATH` environment variable has to be : `/etc/ssl/certs/dbops/root_ca.crt`

#### JDBC Test Connection

In order for the JDBC test connection to work, using env variable `INIT_SCRIPT` we will import the root_ca.crt file into a java trustStore. Below is an example which imports the crt file to the default JVM trustStore `$JAVA_HOME/lib/security/cacerts`

```shell
- name: INIT_SCRIPT
  value: |-
  keytool -importcert -file /opt/harness-delegate/ca-bundle/root_ca.crt -keystore $JAVA_HOME/lib/security/cacerts -alias "mongodb_ssl" -storepass changeit -noprompt
```

If the `root_ca.crt` is not added into the default trustStore, (`$JAVA_HOME/lib/security/cacerts`)  then we will need to add `JAVA_TOOL_OPTIONS` environment variable pointing to the trustStore.
  
```shell
- name: JAVA_TOOL_OPTIONS
  value: "-Djavax.net.ssl.trustStore=trustStorePath -Djavax.net.ssl.trustStorePassword=trustStorePwd"
```

### mTLS
* `root_ca.crt` file is available
* MongoDB Configuration in DBDevops MongoDB TLS | TLS  WITHOUT `allowConnectionsWithoutCertificates: true` will enable mTLS

```shell
data:
mongod.conf: |
net:
port: 27017
bindIp: 0.0.0.0
tls:
mode: requireTLS
certificateKeyFile: /etc/ssl/mongodb/server.pem
CAFile: /etc/ssl/mongodb/root_ca.crt
security:
authorization: enabled
```

#### Secret Configuration

We will create a secret using `root_ca.crt` and `client_pkcs12.txt`( base64 encoded value of the `client.p12` file )
```shell
kubectl create secret -n namespace generic db-ops-mongo-ssl-secret --from-file root_ca.crt --from-file client_pkcs12.txt
```
Example on how to [create a client.p12](#generating-clientp12) file

#### Delegate Configuration

Ensure that the [common delegate configuration](#common-delegate-configuration) is done before moving on to the next steps

Within our delegate configuration environment variables we will need to mount the `root_ca.crt` file

```shell
- name: DESTINATION_CA_PATH
  value: "/etc/ssl/certs/dbops/root_ca.crt"
```

***IMPORTANT NOTE*** : the value of the DESTINATION_CA_PATH environment variable has to be : `/etc/ssl/certs/dbops/root_ca.crt`

#### JDBC Test Connection

In order for the JDBC test connection to work, using env variable INIT_SCRIPT we will import the `root_ca.crt` file into a java trustStore and `client.p12` to the keyStore.

Below is an example which imports

.crt file to the default JVM trustStore ( `$JAVA_HOME/lib/security/cacerts` )

pkcs12 file to the default keyStore ( `$JAVA_HOME/lib/security/jssecacerts` )


```shell
- name: INIT_SCRIPT
  value: |-
  base64 --decode /opt/harness-delegate/ca-bundle/client_pkcs12.txt > client.p12
  keytool -importkeystore -destkeystore $JAVA_HOME/lib/security/jssecacerts -srckeystore client.p12 -srcstoretype PKCS12 -alias mongo-client -storepass changeit -srcstorepass changeit -noprompt
  keytool -importcert -file /opt/harness-delegate/ca-bundle/root_ca.crt -keystore $JAVA_HOME/lib/security/cacerts -alias "mongodb_ssl" -storepass changeit -noprompt
  The keyStore system properties ( -Djavax.net.ssl.keyStore=keyStorePath,  -Djavax.net.ssl.keyStorePassword=keyStorePwd) must always be mentioned as a part of JAVA_TOOL_OPTIONS
```

if the `root_ca.crt` is not added into the default trustStore, (`$JAVA_HOME/lib/security/cacerts`)  then we will need to add trustStore properties ( `-Djavax.net.ssl.trustStore=trustStorePath -Djavax.net.ssl.trustStorePassword=trustStorePwd` )in JAVA_TOOL_OPTIONS environment variable pointing to the trustStore.


```shell
- name: JAVA_TOOL_OPTIONS
  value: "-Xms64M -Djavax.net.ssl.keyStore=keyStorePath -Djavax.net.ssl.keyStorePassword=keyStorePwd -Djavax.net.ssl.trustStore=trustStorePath -Djavax.net.ssl.trustStorePassword=trustStorePwd"
```



#### Generating client.p12
Create a file called ```openssl-client.cnf```

```shell
[ req ]
default_bits       = 4096
distinguished_name = req_distinguished_name
req_extensions     = req_ext
x509_extensions    = v3_req
prompt             = no
[ req_distinguished_name ]
C  = US
ST = California
L  = SanFrancisco
O  = MyOrg
OU = IT
CN = IP generated from service
[ req_ext ]
subjectAltName = @alt_names
[ v3_req ]
basicConstraints = critical, CA:false
keyUsage = critical, digitalSignature, keyCertSign, cRLSign, keyEncipherment, nonRepudiation
extendedKeyUsage = clientAuth
subjectAltName = @alt_names
[ alt_names ]
IP.1 = IP generated from service
```

**Run the below command to generate the certificates**

```shell
openssl req -newkey rsa:4096 -nodes -out client.csr -keyout client.key -config openssl-client.cnf
openssl x509 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
-out client.crt -extensions v3_req -extfile openssl-client.cnf
cat client.key client.crt > client.pem
sudo openssl pkcs12 -export -in client.crt -inkey client.key -out client.p12 -name mongo-client -password pass:changeit
```

If you mount the .p12 file as a Kubernetes Secret or ConfigMap, it might get encoded improperly, leading to corruption. 
This is because:

* ConfigMaps store data as plain text and might not handle binary files properly.
* Secrets store data in Base64 encoding, which requires correct decoding when mounting.

```shell
cat client.p12 | base64 > client_pkcs12.txt
```

### Common Delegate Configuration
Modify the delegate manifest file to include a volume mount.

1. Add the following YAML under `spec.template.spec.containers`

```shell
volumeMounts:
  - mountPath: /opt/harness-delegate/ca-bundle/
    name: custom-certs
    readOnly: true
```

2. Add the following YAML under `spec.template.spec`. Add the secret name with the value you used when you created the secret in step 1.

```shell
volumes:
  - name: custom-certs
    secret:
      secretName: db-ops-mongo-ssl-secret
      defaultMode: 400
```

### Permissions
The DB step needs to have access to the build pod to import keys to the default keystore. 
For example, if we want to run the db step as a root user, we can provide runAsUser with value 0.

```shell
spec:
  runAsUser: "0"
```

### Conclusion
By following this guide, you can securely configure MongoDB with TLS and mTLS, ensuring encrypted communication and proper authentication between services. Proper handling of certificates and secrets is crucial for maintaining a secure environment.


### References
* [Using Self-Signed Certificates in Kubernetes Build Farm](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/)
* [Installing Delegates with Custom Certificates](https://developer.harness.io/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/) 


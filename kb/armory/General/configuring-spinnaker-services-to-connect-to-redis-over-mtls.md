---
title: Configuring Spinnaker services to connect to Redis over mTLS
---

## Introduction




Mutual TLS, or mTLS, is a method used for mutual authentication and ensures that both the server and the client authenticate each other simultaneously. This is achieved by the server providing a server certificate to the client and the client providing a client certificate to the server. These certificates are signed by the same Certificate Authority (CA). This article explains how to enable mTLS on Redis and configure Spinnaker services to connect to Redis over mTLS.





## Prerequisites




Below are the prerequisites to enable mTLS between Spinnaker and Redis instance
* Redis server with version 6 and above. Older versions of Redis do not support mTLS
* Recent Spinnaker distribution
* Tools like OpenSSL and Keytool for generating certificates, signing them, and importing them to Java keystore.





## Instructions

## Table of Contents
* [Generating certificates and enabling mTLS on Redis](#mcetoc_1h2qfsbe8u)* [Enable Redis to Accept mTLS Requests](#mcetoc_1h2qfsbe8v)* [Enable Spinnaker to use mTLS to connect to Redis](#mcetoc_1h2qfsbe813)* [Considerations before enabling mTLS for Redis in Spinnaker](#mcetoc_1h2qfsbe814)

Generating certificates and enabling mTLS on Redis
The CA, server, and client certs should be created before proceeding with the documentation below.  While there are various ways to generate this, the script [https://github.com/redis/redis/blob/unstable/utils/gen-test-certs.sh](https://github.com/redis/redis/blob/unstable/utils/gen-test-certs.sh) should help get started and generate the certs.
Enable Redis to Accept mTLS Requests
The next step is to enable Redis with mTLS enabled. This can be enabled on the redis.conf or when starting the Redis process.
Enabling TLS in redis.conf
Adding the below config to the ```redis.conf``` file will allow TLS on Redis.
port 0
tls-port 6379
   
tls-cert-file /usr/local/etc/redis/tls/redis.crt
tls-key-file /usr/local/etc/redis/tls/redis.key
   
tls-ca-cert-file /usr/local/etc/redis/tls/ca.crt
Enabling TLS through start-up command
```
  containers:
  - name: redis-ssl
    image: redis:6.2
    command:
      - redis-server
      - "/redis-master/redis.conf"
    args:
      - --TLS-port 6379
      - --port 0
      - --TLS-cert-file /certs/redis.crt
      - --TLS-key-file /certs/redis.key
      - --TLS-ca-cert-file /certs/ca.crt
      - --TLS-auth-clients yes
```
If running Redis as a container on the kubernetes cluster, the certificates must be mounted on the container through a secret.
Validate login using redis-cli
Connect to the Redis instance over mTLS using the certificates and keys created above to validate the login:
```$redis-cli -u rediss://redis-ssl.instance.endpoint --tls --cert redis_client.crt --key redis_client.key --cacert ca.crt```
In case of issues with certs, the login shall fail with errors similar to the one below, and the prompt shall default to ```not connected```.
Could not connect to Redis at redis-ssl.instance.endpoint:6379: SSL_connect failed: certificate verify failed
not connected> exit
Enable Spinnaker to use mTLS to connect to Redis
All the services in the core Spinnaker are built on Java, while a couple of services in Armory CDSH are built on goLang (Namely Dinghy and Terraformer). Although the GoLang services support Redis connections with TLS enabled, they do not currently support mTLS. To have Spinnaker Java-based services connect to Redis through mTLS, the below steps are to be followed:
To begin with, Spinnaker has to point to the Redis with mTLS enabled. To start this, the following content has to be added under ```~/.hal/$DEPLOYMENT/service-settings/redis.yml```for Halyard installations
overrideBaseUrl: rediss://redis-ssl.instance.endpoint:6379
skipLifeCycleManagement: true
A similar config should be added in the ```spec.spinnakerConfig.service-settings``` section for Operator 
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    service-settings:
      redis:
        overrideBaseUrl: rediss://redis-ssl.instance.endpoint:6379
        skipLifeCycleManagement: true
```
The above setting would override the Redis URL for all services. If the Redis endpoints are to be overridden for specific services, the below config should be added under the ```profiles section``` for each serviceFor Halyard installations, for the example of the Gate service, add the configuration in the file ```~/.hal/$DEPLOYMENT/profiles/gate-local.yml```. Each service would have its corresponding YAML file and should be created if they do not exist.
```
redis:
     baseUrl: rediss://redis-ssl.instance.endpoint:6379
     enabled: true
```
In Operator installations, administrators will need to add the following changes for each service in the ```spec.spinnakerConfig.profiles``` section. In the example below, it is being added to the Gate service:
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker  # name doesn't matter since this is a patch
spec:
  # spec.spinnakerConfig - This section is how to specify configuration spinnaker
  spinnakerConfig:
    profiles:
      gate:
         redis:
              baseUrl: rediss://redis-ssl.instance.endpoint:6379
              enabled: true
```
Administrators will also need to make the following modification to  ```Gate```.  In Halyard, add the following configuration to the ```~/.hal/$DEPLOYMENT/profiles/gate-local.yml``` file
```
redis:
    configuration:
         secure:
              true
```
In Operator installations, administrators will need to add the following changes for each service in the ```spec.spinnakerConfig.profiles.gate``` section.  
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker  
spec:
  spinnakerConfig:
    profiles:
      gate:
         redis:
              configuration:
                  secure:
                        true
```
Create a **Keystore** file that stores the key and certificate created earlier. The certs and the key have to be converted to ```pkcs12 format```:
```
openssl pkcs12 -export \\
  -in redis_client.crt  \\
  -inkey redis_client.key \\
  -out redis-keystore.p12 \\
  -name "redis-keystore"
```
###Import the pkcs12 file into Java keystore
```
keytool -genkey \\
  -dname "cn=Generic-cert" \\
  -alias truststorekey \\
  -keyalg RSA \\
  -keystore ./redis-truststore.p12 \\
  -keypass "Somepassword" \\
  -storepass "Somepassword" \\
  -storetype pkcs12
Create a **Trust Store** file and add the Redis cluster certificate to it
keytool -import \\
  -keystore cacerts \\
  -file ./ca.crt \\
  -alias redis-truststore
```
Create secrets with the Keystore and the Trust Store.
```
kubectl create secret generic internal-trust-store --from-file cacerts
kubectl create secret generic redis-key-store --from-file redis-keystore.p12
```

Mount the secrets to Spinnaker services. Mount the Keystore and Trust Store from the secret onto the Spinnaker service(s).For Halyard installations, for the example of the Gate service, add the configuration in the file ```~/.hal/$DEPLOYMENT/service-settings/$SERVICE.yml```. Each Spinnaker service would have its own corresponding YAML file and should be created if they do not exist.
```
      kubernetes:
          volumes:
          - id: internal-trust-store
            mountPath: /etc/ssl/certs/java
            type: secret
          - id: redis-key-store
            mountPath: /tmp/certs
            type: secret 
```
For Operator installations, the changes should be added in the ```spec.spinnakerConfig.service-settings``` section for each service. For example, for Gate, customers should make the following change:
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    service-settings:
      gate: 
        kubernetes:
          volumes:
          - id: internal-trust-store
            mountPath: /etc/ssl/certs/java
            type: secret
          - id: redis-key-store
            mountPath: /tmp/certs
            type: secret
```
Supply JAVA_OPTS with the keystore cert and the password in the environment variable section.For Halyard installations, for the example of the Gate service, add the configuration in the file ```~/.hal/$DEPLOYMENT/service-settings/$SERVICE.yml```. Each Spinnaker service would have its own corresponding YAML file and should be created if they do not exist.
```
env:
 JAVA_OPTS: -Djavax.net.ssl.keyStore=/tmp/certs/redis-keystore.p12 -Djavax.net.ssl.keyStorePassword=somepassword
```
For Operator installations, the changes should be added in the ```spec.spinnakerConfig.service-settings``` section for each service. For example, for Gate, customers should make the following change:
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    service-settings:
      gate:
	  env:
	     JAVA_OPTS: -Djavax.net.ssl.keyStore=/tmp/certs/redis-keystore.p12 -Djavax.net.ssl.keyStorePassword=somepassword
```
* Apply all the above changes, and Spinnaker should be able to connect to Redis over mTLS.
 
Considerations before enabling mTLS for Redis in Spinnaker
Services such as Clouddriver, Front50, Orca, and Fiat support SQL and Redis. The features in these services can be split to use either Redis or SQL. For those services, it is recommended not to use mTLS as the service would try to connect to the SQL instance with the mTLS certificate, which shall be rejected by the SQL server, causing the service not to start.
For such cases, overriding the Redis endpoint at the service level is recommended, as discussed above.


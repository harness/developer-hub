---
title: Add Self-Signed Certificates for Delegate Connections
description: The Harness Delegate makes outbound connections to the resources you set up in Harness as Artifact Servers, Verification Providers, and so on. These platforms typically use public certificates that s…
sidebar_position: 200
helpdocs_topic_id: 8bj3v5jqzk
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness Delegate makes outbound connections to the resources you set up in Harness as Artifact Servers, Verification Providers, and so on. These platforms typically use public certificates that ship with the OS and Java runtime environments, and so no additional steps are needed.

But if you are using self-signed certificates, you will need to add them to the Delegate.

For information on Harness On-Prem and certificates, see [Virtual Machine On-Prem: Installation Guide](../../../fg-sme/vm/on-prem-embedded-cluster-setup.md) and [Kubernetes Cluster On-Prem: Infrastructure Requirements](../../../fg-sme/k8s/existing-cluster-kubernetes-on-prem-infrastructure-requirements.md).These certificates are stored in the JRE keystore on the hosts running the Delegate (or truststore for back-end application certificates), and you can import the certificates manually or using a Harness Delegate INIT script. See [Run Initialization Scripts on Delegates](run-initialization-scripts-on-delegates.md).

For information on TLS and the JRE, see [Sun Java System Application Server Platform Edition 8.2 Administration Guide](https://docs.oracle.com/cd/E19830-01/819-4712/ablqw/index.html) and [keytool](https://docs.oracle.com/javase/9/tools/keytool.htm#JSWOR-GUID-5990A2E4-78E3-47B7-AE75-6D1826259549).

## Using Explicit Paths

Here is the the self-signed certificate import using explicit paths:


```
/opt/harness-delegate/jdk8u242-b08-jre/bin/keytool -import -trustcacerts -keystore /opt/harness-delegate/jdk8u242-b08-jre/lib/security/cacerts -storepass changeit -alias example.com -file ca.cer -noprompt
```
## Using JAVA\_HOME and PATH

Here is the the self-signed certificate import using the PATH environment variable:


```
export JAVA_HOME=/opt/harness-delegate/<jdk_version>  
  
set PATH=$PATH:$JAVA_HOME/bin
```
Here is the the self-signed certificate import using PATH:


```
echo ${secrets.getValue("ex-cert")} | base64 -d > ca.cer  
  
keytool -import -trustcacerts -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit -alias example.com -file ca.cer -noprompt  
  
# Depending on the different versions of JDK, the CACERT keystore might reside in different locations.
```
## Password

The default keystore password is used in our example, but if you change the default you can replace the password with a Harness encrypted text secret.

If you create or add to Import a Certificate that already exists in the INIT script, the import operation will fail and stop. Make sure to add an `if block` code check to prevent this, as follows:


```
if [$? -eq 0];  
then  
echo "Alias ca.cer already exists"  
else
```
## See Also

* [Adding 3rd Party CA certificate(s) to Kubernetes and/or OpenShift Harness Delegates](https://community.harness.io/t/adding-3rd-party-ca-certificate-s-to-kubernetes-and-or-openshift-harness-delegates/831) from Harness Community


---
title: Truststore Override for Delegates
description: Replace or use a different default truststore with Harness Delegates.
sidebar_position: 230
helpdocs_topic_id: lb2cxxgak1
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---
```mdx-code-block
import image_1 from './static/trust-store-override-for-delegates-00.png'
```

Harness Delegates perform most Harness tasks. Delegates make outbound TLS/SSL connections to the Harness SaaS platform to obtain these task assignments. The TLS/SSL connection from the Delegate to Harness requires a trusted certificate.

Harness Delegates ship with a Java Runtime Environment (JRE) that includes a default trusted certificate in its [truststore](https://docs.oracle.com/cd/E19830-01/819-4712/ablqw/index.html) (located at `jdk8u242-b08-jre/lib/security/cacerts`). This truststore uses multiple trusted certificates, but you might want to limit these to conform to your company's security protocols.

Harness' only requirement is that the JRE truststore includes the certificate Delegates use to trust Harness (app.harness.io).

This topic describes how to limit the truststore used with Harness Delegates and ensure the trusted certificate Harness requires is included in the Delegate truststore.

In this topic:

* [Before You Begin](#before-you-begin)
* [Required: Harness Trusted Certificate](#required-harness-trusted-certificate)
* [Step 1: Stop the Delegate](#step-1-stop-the-delegate)
* [Step 2: Create Truststore with Harness Trusted Certificate](#step-2-create-truststore-with-harness-trusted-certificate)
* [Step 3: Add 3rd Party Certificates to the Truststore](#step-3-add-3rd-party-certificates-to-the-truststore)
* [Step 4: Update the Delegate JAVA\_OPTS Environment Variable](#step-4-update-the-delegate-java-opts-environment-variable)
* [Step 5: Start the Delegate](#step-5-start-the-delegate)

## Before You Begin

* [Harness Delegate FAQs](../../../firstgen-fa-qs/harness-delegate-faqs.md)
* [Harness Delegate Overview](delegate-installation.md)
* [Install the Harness Docker Delegate](install-docker-delegate.md)
* [Install the Harness Shell Script Delegate](install-shellscript-delegate.md)
* [Install the Harness Kubernetes Delegate](install-kubernetes-delegate.md)

## Required: Harness Trusted Certificate

TLS/SSL communication between the Harness Delegate and Harness SaaS uses a certificate from the DigiCert Global Root CA:

```mdx-code-block
<img src={image_1} height="200" width="400" />
```


For Delegates to communicate with Harness, this root CA certificate needs to be installed in the Delegate's truststore.

The public key for the certificate is publicly available and can be downloaded. Here it is:


```
-----BEGIN CERTIFICATE-----  
MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh  
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3  
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD  
QTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT  
MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j  
b20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG  
9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB  
CSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97  
nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt  
43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P  
T19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4  
gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO  
BgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR  
TLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw  
DQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr  
hMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg  
06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF  
PnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls  
YSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk  
CAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=  
-----END CERTIFICATE-----
```
This topic describes how to import this certificate into a new truststore.

### 3rd Party Certificates

The Harness Delegate also connects to all of the 3rd party tools you are using with Harness. You will need to include those certificates in the Delegate truststore also.

For example, if you are pulling a Docker image from an artifact server like Nexus or DockerHub, the truststore will need the certificates required by those tools.

## Step 1: Stop the Delegate

You set up the truststore before running a Delegate. You can stop a running Delegate, set it up to use the new truststore, and then restart it.

### Shell Script Delegate

To stop a Shell Script Delegate, run:


```
./stop.sh
```
### Docker Delegate

To stop a Docker Delegate, run:


```
docker stop harness/delegate
```
### Kubernetes Delegate

You don't need to stop the Kubernetes Delegate. You can simply run `kubectl apply` again once you have updated the Kubernetes Delegate YAML file.

## Step 2: Create Truststore with Harness Trusted Certificate

Let's walk through the steps of creating a new truststore and importing the Harness Trusted Certificate.

Copy the following public key to a file and save it.


```
-----BEGIN CERTIFICATE-----  
MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh  
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3  
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD  
QTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT  
MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j  
b20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG  
9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB  
CSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97  
nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt  
43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P  
T19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4  
gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO  
BgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR  
TLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw  
DQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr  
hMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg  
06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF  
PnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls  
YSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk  
CAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=  
-----END CERTIFICATE-----
```
In this example, we'll name the file **DigiCertGlobalRootCA.pem**.

Run the following command to create a truststore:


```
keytool -import -file DigiCertGlobalRootCA.pem -alias DigiCertRootCA -keystore trustStore.jks
```
The above command will ask for a password. You can choose your own password.

This command creates a file named **trustStore.jks** and imports DigiCert global root CA certificate.

**Note where the trustStore.jks is located.** You will provide this path to the Delegate as an environment variable.

## Step 3: Add 3rd Party Certificates to the Truststore

You should import any certificates required by the 3rd party tools you use with Harness.

In most cases, you can navigate to the 3rd party tool's website portal and download the certificate using a Copy or Export button in the browser. Simply save the certificate as a PEM (.pem) file and then import it into the truststore.

To add multiple certificates in the trustStore.jks you created, simply run the `keytool -import` command multiple times with the different aliases and certificate PEM files for the certificates you are importing.

## Step 4: Update the Delegate JAVA\_OPTS Environment Variable

Now that you have a new truststore, you need to update the Delegate JAVA\_OPTS environment variable to point to the location of the new truststore file.

### Shell Script Delegate

SSH into the host and navigate to where the start.sh for the Delegate is located.

Next, provide the path of the new truststore using JAVA\_OPTS and the password.


```
export JAVA_OPTS="-Djavax.net.ssl.trustStore=<path/to/trustStore.jks> -Djavax.net.ssl.trustStoreType=jks -Djavax.net.ssl.trustStorePassword=<password>"
```
Next, you can run the Delegate install script, described in the next step.

### Docker Delegate

​For the Docker Delegate, you need to edit the Delegate shell file. The file is named **launch-harness-delegate.sh**.

Open **launch-harness-delegate.sh** in an editor.

In the `sudo docker run` section of the file, add a new environment variable (`-e`) that provides the path of the new truststore using JAVA\_OPTS and the password:


```
sudo docker run -d --restart unless-stopped --hostname=$(hostname -f) \  
...  
-e JAVA_OPTS="-Djavax.net.ssl.trustStore=<path/to/trustStore.jks> -Djavax.net.ssl.trustStoreType=jks -Djavax.net.ssl.trustStorePassword=<password>"  
...
```
Next, you can run the Delegate install script, described in the next step.

### Kubernetes Delegate

For the Kubernetes Delegate, you need to edit the Delegate YAML file. It's named **harness-delegate.yaml**.

Open the Delegate YAML file in a text editor.

In the `StatefulSet` manifest, under `env`, locate `JAVA_OPTS`.

Here's what the default setting looks like:


```
...  
apiVersion: apps/v1  
kind: StatefulSet  
...  
spec:  
  ...  
    spec:  
      ...  
        env:  
        - name: JAVA_OPTS  
          value: "-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=2 -Xms64M"  
...
```
Update the `JAVA_OPTS` environment variable with the location of the new trustStore.jks file and the password.

For example:


```
      ...  
        env:  
        - name: JAVA_OPTS  
          value: "-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=2 -Xms64M -Djavax.net.ssl.trustStore=<path/to/trustStore.jks> -Djavax.net.ssl.trustStoreType=jks -Djavax.net.ssl.trustStorePassword=<password>"  
...
```
Next, you can apply the Delegate YAML file, described in the next step.

## Step 5: Start the Delegate

Now that the JAVA\_OPTS environment variable is updated, you can start the Delegate.

### Shell Script Delegate

To start the Delegate, you will need to run the following command where the start.sh for the Delegate is located:


```
./start
```
The Delegate will start and in a few moments you will see it listed in the **Harness Delegates** page.

### Docker Delegate

Run the start script (`$ ./launch-harness-delegate.sh`). You will see the Docker image pull, for example:


```
latest: Pulling from harness/delegate  
297061f60c36: Pull complete…  
Status: Downloaded newer image for harness/delegate:latest
```
The Delegate will start and in a few moments you will see it listed in the **Harness Delegates** page.

### Kubernetes Delegate

Apply the Kubernetes Delegate YAML file you edited:


```
kubectl apply -f harness-delegate.yaml
```
The Delegate will start and in a few moments you will see it listed in the **Harness Delegates** page.

## See Also

* [Add Self-Signed Certificates for Delegate Connections](add-self-signed-certificates-for-delegate-connections.md)


---
title: Truststore override for delegates
description: Replace or use a different default truststore with Harness Delegates.
# sidebar_position: 2
helpdocs_topic_id: nh6tdfse6g
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Delegates perform most Harness tasks. Delegates make outbound TLS/SSL connections to the Harness SaaS platform to obtain these task assignments. The TLS/SSL connection from the delegate to Harness requires a trusted certificate.

Harness Delegate ships with a Java Runtime Environment (JRE) that includes a default trusted certificate in its [truststore](https://docs.oracle.com/cd/E19830-01/819-4712/ablqw/index.html) (located at `jdk8u242-b08-jre/lib/security/cacerts`). This truststore uses multiple trusted certificates, however, you might want to limit them to conform to your company's security protocols.

Harness' only requirement is that the JRE truststore includes the certificate delegates use to trust Harness (app.harness.io).

This topic describes how to limit the truststore used with Harness Delegates and ensure the trusted certificate Harness requires is included in the delegate truststore.

### Before you begin

* [Delegates Overview](../delegates-overview.md)
* [Install a Kubernetes Delegate](install-a-kubernetes-delegate.md)

### Required: Harness trusted certificate

TLS/SSL communication between the Harness Delegate and Harness SaaS uses a certificate from the DigiCert Global Root CA:

![](./static/trust-store-override-for-delegates-00.png)
For Delegates to communicate with Harness, this root CA certificate must be installed in the delegate truststore.

The public key for the certificate is publicly available for downloaded:


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

#### Third-party certificates

Harness Delegate also connects to the third-party tools you use with Harness. You should also include those certificates in the Delegate truststore.

For example, to pull a Docker image from an artifact server like Nexus or DockerHub, the truststore must include the certificates that those tools require.

### Step 1: Stop the delegate

You don't need to stop the Kubernetes delegate. You can run `kubectl apply` after you update the Kubernetes delegate YAML file.

### Step 2: Create truststore with the Harness trusted certificate

Let's walk through the steps of creating a new truststore and importing the Harness trusted certificate.

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

**Note where the trustStore.jks is located.** You will provide this path to the delegate as an environment variable.

### Step 3: Add third-party certificates to the truststore

You should import any certificates required by the third-party tools you use with Harness.

In most cases, you can navigate to the third-party tool's website portal and download the certificate using a **Copy** or **Export** button in the browser. Save the certificate as a PEM (.pem) file and import it into the truststore.

To add multiple certificates in the trustStore.jks you created, run the `keytool -import` command multiple times with the different aliases and certificate PEM files for the certificates you are importing.

### Step 4: Update the delegate JAVA\_OPTS environment variable

Update the delegate JAVA\_OPTS environment variable to point to the location of the new truststore file.

#### Kubernetes delegate

Edit the Kubernetes delegate YAML file. It's named **harness-delegate.yaml**.

Open the delegate YAML file in a text editor.

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
Next, you can apply the delegate YAML file, described in the next step.

### Step 5: Start the delegate

Now that the `JAVA_OPTS` environment variable is updated, you can start the delegate.

#### Kubernetes delegate

Apply the Kubernetes delegate YAML file you edited:


```
kubectl apply -f harness-delegate.yaml
```
The delegate starts and appears on the **Harness Delegates** page.


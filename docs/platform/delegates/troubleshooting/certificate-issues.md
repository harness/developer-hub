---
title: Delegate certificate issues
description: Troubleshoot common delegate certificate issues.
# sidebar_position: 1
---

This topic provides solutions for common delegate certificate issues.

## Delegate fails to register

In some scenarios, the delegate might start to register and then fail. There are two common exceptions that might occur: an `SSLHandshakeException` and a signature check failure.

### Handshake exception

You might experience a `javax.net.ssl.SSLHandshakeException: unable to find valid certification path to requested target` exception.

This typically means the Java truststore file doesn’t have the required certificate to connect to Harness Manager because of a missing Certificate Authority (CA).

#### Handshake exception solutions

To resolve the handshake exception, do the following:

1. Run to the command below to test the certificate chain you used to install Harness Manager.

   ```
   curl -cacerts path/to/ca-certs/file https://<MANAGER_HOST>/api/account/<ACCOUNT_ID>/status
   ```

2. Install the certificate on the delegate. For more information, go to [Install delegates with custom certificates](/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/).

3. Follow the appropriate steps below, based on whether you use the OpenSSL tool.

<details>
<summary>
   Use the OpenSSL tool
   </summary>
  
   To use the OpenSSL tool, do the following:

   1. Exec into the delegate pod.

   2. Run the command below to get all the certificates in the path.

      ```
      openssl s_client -showcerts -servername <fqdn> -connect <fqdn>:443
      ```

      The output will look similar to the example below.
   
       ```
      CONNECTED(00000003)

      depth=0 C = US, ST = CA, L = San Jose, O = Harness Test, OU = Test, CN = *.test.harness.io, emailAddress = test-no-reply@harness.io

      verify error:num=18:self signed certificate

      verify return:1

      depth=0 C = US, ST = CA, L = San Jose, O = Harness Test, OU = Test, CN = *.test.harness.io, emailAddress = test-no-reply@harness.io

      verify return:1
   
      ---

      Certificate chain

       0 s:C = US, ST = CA, L = San Jose, O = Harness Test, OU = Test, CN = *.test.harness.io, emailAddress = test-no-reply@harness.io

       i:C = US, ST = CA, L = San Jose, O = Harness Test, OU = Test, CN = *.test.harness.io, emailAddress = test-no-reply@harness.io

      -----BEGIN CERTIFICATE-----

      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   
      -----END CERTIFICATE-----

      1 s:C = US, ST = CA, L = San Jose, O = Harness Test, OU = Test, CN = *.test.harness.io, emailAddress = test-no-reply@harness.io

      i:C = US, ST = CA, L = San Jose, O = Harness Test, OU = Test, CN = *.test.harness.io, emailAddress = test-no-reply@harness.io

      -----BEGIN CERTIFICATE-----

      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

      -----END CERTIFICATE-----

      ---

      Server certificate

      subject=C = US, ST = CA, L = San Jose, O = Harness Test, OU = Test, CN = *.test.harness.io, emailAddress = test-no-reply@harness.io

      issuer=C = US, ST = CA, L = San Jose, O = Harness Test, OU = Test, CN = *.test.harness.io, emailAddress = test-no-reply@harness.io

      ---

      No client certificate CA names sent

      Peer signing digest: SHA256

      Peer signature type: RSA-PSS

      Server Temp Key: X25519, 253 bits

      ---

      SSL handshake has read 2443 bytes and written 397 bytes

      Verification error: self signed certificate

      ---

      New, TLSv1.3, Cipher is TLS_AES_256_GCM_SHA384

      Server public key is 2048 bit

      Secure Renegotiation IS NOT supported

      Compression: NONE

      Expansion: NONE

      No ALPN negotiated

      Early data was not sent

      Verify return code: 18 (self signed certificate)

      ---

      connect to smp.test.harness.io

      ```
         
   3. Copy the `BEGIN CERTIFICATE` and `END CERTIFICATE` blocks into a new `cacerts.pem` file.

   4. Add the CA certificates to the delegate. For more information, go to [Install delegates with custom certificates](/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/).

</details>

<details>
<summary>
   When the OpenSSL tool isn't present
   </summary>

To resolve the exception when OpenSSL tool isn't present, do the following:

1. Try to install OpenSSL.

   1. Exec into the delegate.
   2. Run the following.
      
      ```
      microdnf install openssl
      ```

       Depending on your environment, OpenSSL installation may not succeed.
    
    3. If the installation succeeds, following the OpenSSL steps above. If the installation fails, continue with the steps below.

2. Use the cURL commands below to find the issuers that are missing in your CA bundle. Find the certificate for each issuer by going to the domain in your browser and downloading the certificate.
   
   ```
   curl -vk <YOUR_URL>
   ```

3. Turn on the SSL debug log by setting the `JAVA_OPTS` environment variable when installing delegate.

   ```
   JAVA_OPTS="-Djavax.net.debug=all"
   ```

</details>

### Signature check failure

In some scenarios, you might experience a `signature check failed: Signature length not correct: got 512 but was expecting 256` exception.

This exception occurs because the length of the public key is not the same as the length of the signature. During the TLS handshake, the signature received by the delegate (client side) is the certificate sent by the server. The public key is from the truststore file where the delegate loads during startup. The issue can occur when the delegate is not installed with CA certificates that match the server side correctly.

#### Signature check failure solution

The solution is similar to resolving the handshake exception. Follow the [steps above](#handshake-exception-solutions) to find the correct CA certs to install.

## Certificate inspection commands

The following commands can help you inspect your certificates. 

### Inspect a certificate chain - x509 PEM file

```
Keytool -printcert -file /path/to/cert
```

```
openssl x509 -text -noout -in certificate.pem 
```

### Inspect a truststore file

```
keytool -list -v -keystore /path/to/truststore
```

## Import x509 certs into a truststore file 

Keytool cannot import an entire PEM file with multiple certs. If a CA bundle file has multiple PEM blocks, you must divide each block into an individual file, and run the command below.

```
keytool -noprompt -import -trustcacerts -file <path/to/cert/file> -alias <UNIQUE_NAME> -keystore <path/to/truststore/file> -storepass changeit
```

To divide a CA bundle file into individual files, run the command below.

```
csplit -z ca-bundle.crt /#/ '{*}'.     # split to multiple files\
sed -i '/^$/d' xx*                     # remove blank lines
```

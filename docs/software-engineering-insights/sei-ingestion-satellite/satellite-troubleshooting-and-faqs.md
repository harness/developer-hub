---
title: Troubleshooting & FAQs
description: Troubleshooting guides for common ingestion satellite issues.
sidebar_position: 5
---

This topic provides solutions for common ingestion satellite issues.

<details>
<summary>Do I need to set up a ClusterRole and ClusterRoleBinding for the Satellite in Kubernetes?</summary>

No. These are not required unless you plan to utilize Kubernetes capabilities within your runbooks. If you don't need Kubernetes integration, you can omit them.

</details>

<details>
<summary>Why is the Satellite configuration stored as a ConfigMap instead of a Secret?</summary>

While the documentation provides an example with a ConfigMap for ease of use and visualization, it's not a strict recommendation. Storing sensitive information, like credentials, in a Secret is a valid and more secure option. You can choose the storage method that best suits your security requirements.

</details>

<details>
<summary>Can I specify a specific tag when running the Satellite image instead of using the latest tag?</summary>

Yes, you can run the Satellite image with a specific tag to lock down the version. New versions of the Satellite can be found [here](https://hub.docker.com/r/levelops/ingestion-satellite).

</details>

<details>
<summary>How can I add certificate authorities to the Satellite image? Can I use an internal image as a base?</summary>

To add certificate authorities to a Satellite image and enable it to use an internal image as a base, you can follow the steps below:

**For Docker Containers:**

1. Copy the truststore from the container to a temporary location:

```
docker cp <container-name>:/etc/pki/ca-trust/extracted/java/cacerts /tmp/cacerts
```

2. Verify that the truststore is readable by listing existing certificates:

```
keytool -list -keystore /tmp/cacerts -storepass changeit
```

3. Change the keystore permissions to allow modification:

```
chmod +w /tmp/cacerts
```

4. Add a certificate (PEM) to the truststore:

```
keytool -importcert -file <my-crt-file-location> -noprompt -alias <my-alias> -keystore /tmp/cacerts -storepass changeit
```

5. Change the keystore permissions back to read-only:

```
chmod -w /tmp/cacerts
```

6. Mount the `cacerts` binary (truststore) as a volume in the container with the suggested path `/opt/cacerts`.
7. Add the `JVM_OPTS` environment variable to the container with the following settings:

```
JVM_OPTS="-XX:MinRAMPercentage=20.0 -XX:MaxRAMPercentage=90.0 -Djavax.net.ssl.trustStore=/opt/cacerts -Djavax.net.ssl.trustStorePassword=changeit"
```

**For Kubernetes Deployments:**

1. Create a Kubernetes secret containing the truststore binary:

```
kubectl create secret generic satellite-truststore --from-file=/tmp/cacerts
```

Note: For Kubernetes make sure you securely mount the truststore as a volume in your deployment pods allowing for successful HTTPS communication through proxies.

2. In your deployment file (`spec.template.spec` section) define a volume to mount the secret:

```yaml
     volumes:
       - name: satellite-truststore-volume
         secret:
           secretName: satellite-truststore
```

3. Mount the truststore volume to a specified path in the container:

```yaml
     containers:
       - name: levelops-satellite
         volumeMounts:
           - name: satellite-truststore-volume
             mountPath: /opt/cacerts
```

3. Add the `JVM_OPTS` environment variable with the specified settings to the container:

```yaml
     env:
       - name: JVM_OPTS
         value: "-XX:MinRAMPercentage=20.0 -XX:MaxRAMPercentage=90.0 -Djavax.net.ssl.trustStore=/opt/cacerts -Djavax.net.ssl.trustStorePassword=changeit"
```

Now you can ensure that your Satellite image includes the necessary root certificates.

</details>

<details>
<summary>Why do I need to provide a valid SSL certificate when using HTTPS with a proxy and Satellite?</summary>

HTTPS ensures secure communication between your proxy server and Satellite. To build this secure connection, a valid SSL certificate is required. This certificate helps verify the identity of the proxy and encrypts the data exchanged.

</details>

<details>
<summary>How can I configure SSL certificates when building my own image for the proxy?</summary>

You can configure SSL certificates for your proxy image using the following Dockerfile instructions:

```
COPY --from=base /etc/pki/ca-trust/extracted/java/cacerts /opt/cacerts
RUN chmod +w /opt/cacerts
RUN keytool -importcert -file /opt/proxy_cert.pem -noprompt -alias proxy_ca -keystore /opt/cacerts -storepass changeit
RUN chmod -w /opt/cacerts
```

</details>

<details>
<summary>Can I manually copy my SSL certificate to the proxy container if I prefer not to build my own image?</summary>

Yes. Follow these steps to manually copy your SSL certificate to the proxy container:

1. Get the truststore from the container:

```
docker cp <container-name>:/etc/pki/ca-trust/extracted/java/cacerts /tmp/cacerts
```

2. List existing certificates in the truststore:

```
keytool -list -keystore /tmp/cacerts -storepass changeit
```

3. Change the truststore permissions:

```
chmod +w /tmp/cacerts
```

4. Add your SSL certificate to the truststore:

```
keytool -importcert -file <my-crt-file-location> -noprompt -alias <my-alias> -keystore /tmp/cacerts -storepass changeit
```

5. Restore the original truststore permissions:

```
chmod -w /tmp/cacerts
```

6. Put the modified truststore back into the container:

```
docker cp /tmp/cacerts <container-name>:/etc/pki/ca-trust/extracted/java/cacerts
```

Make sure to replace the following placeholders:

* `<container-name>`: Replace this with the name or ID of your proxy container.
* `<my-crt-file-location>`: Replace this with the file path to your SSL certificate file.
* `<my-alias>`: Replace this with an alias for your SSL certificate in the truststore.

</details>

<details>
<summary>Can a single satellite support multiple Gitlab instances, e.g. a prod and non-prod Gitlab instance? (Scenario #1)</summary>

Yes. A single satellite can support multiple Gitlab instances including both production (prod) and non-production (non-prod) instances. However it's important to carefully manage the CPU and memory resources allocated to the satellite's Docker container as multiple integrations can result in more jobs. Keep in mind that there's a fixed number of threads per satellite, so increasing the number of integrations won't necessarily require an increase in resources.

</details>

<details>
<summary>Can a single VM run multiple satellites, with each satellite connecting to a different Gitlab instance? (Scenario #2)</summary>

Yes. It is possible to run multiple satellites on a single VM, and each satellite can connect to a different Gitlab instance. The satellite is distributed as a Docker container, and multiple containers can coexist on the same VM. This allows you to manage multiple integrations with different Gitlab instances from a single virtual machine.

</details>

<details>
<summary>Would the VM sizing recommendations change in Scenario #1 or Scenario #2?</summary>

Between **Scenario #1** (a single satellite supporting multiple Gitlab instances) and **Scenario #2** (multiple satellites on a single VM, each connecting to different Gitlab instances), the sizing recommendations would be similar. However, Scenario #1 would theoretically require fewer resources due to lower overhead, as it involves running a single satellite process compared to Scenario #2, which involves running multiple satellite containers. Also it's essential to monitor resource usage and adjust VM sizing based on the specific workload and requirements of your integrations.

</details>

<details>
<summary>Debugging Satellite: Best Practices</summary>

When troubleshooting issues with Satellite, following best practices can help streamline the process and ensure effective resolution of problems. This topic outlines the steps to approach debugging Satellite, including tips for identifying and resolving common issues.

#### **Step 1: Verify Configuration Files** <a href="#step-1-verify-configuration-files" id="step-1-verify-configuration-files"></a>

Ensure that the configuration files are correct and up-to-date.

**For Docker Users**

Provide the absolute path to the YAML file.

**For Kubernetes Users**

Redeploy to verify the added changes.

You can confirm this by SSH-ing into the container or pod and checking the configuration file contents.

**For docker:**

```
docker exec -ti <container-id> -- bashcat config.yaml
```

**For Kubernetes:**

```
kubectl exec -ti <pod-id> bash
```

Verify the content in the file and match it to what you expect.

```
cat config.yaml
```

#### **Step 2: Check Indentation and Special Characters in YAML Files** <a href="#step-2-check-indentation-and-special-characters-in-yaml-files" id="step-2-check-indentation-and-special-characters-in-yaml-files"></a>

YAML files require proper indentation and handling of special characters. Make sure that all indentations are correctly formatted, and special characters like quotes and backslashes are properly escaped. Use a linter or validator to identify any errors in the YAML files and fix them before proceeding.

Example:

* `USER\NAME` (correct)
* `USER\\NAME` (incorrect)

#### **Step 3: Disable SSL Validation (Optional)** <a href="#step-3-disable-ssl-validation-optional" id="step-3-disable-ssl-validation-optional"></a>

If you encounter issues related to SSL certificates, consider disabling SSL validation temporarily. Add `allow_unsafe_ssl: true` under the jira section in the root section of the YAML file. 

```
jira:
  allow_unsafe_ssl: true
at the root of the yaml file:
jira:
  allow_unsafe_ssl: true
  satellite::
    url: ...
  integrations:
    - id: 1
      type: jira
      ...
```

#### **Step 4: Monitor Logs** <a href="#step-4-monitor-logs" id="step-4-monitor-logs"></a>

Logs are essential for understanding the behavior of Satellite. Tail the logs for relevant containers or pods to gain insights into the error messages or warnings.

**For Docker Users**

```
docker logs -f <container-name>
```

**For Kubernetes Users**

```
docker logs -f <container-name>
```

#### **Step 5: Inspect Containers and Pods** <a href="#step-5-inspect-containers-and-pods" id="step-5-inspect-containers-and-pods"></a>

Inspect containers and pods to gather more information about their state and performance. Use the below commands to retrieve detailed information about networks, and other aspects.

**For docker:**

```
docker inspect <container-name>
```

**For Kubernetes:**

```
docker inspect <container-name>
```

</details>
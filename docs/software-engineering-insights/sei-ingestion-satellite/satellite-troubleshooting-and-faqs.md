---
title: Troubleshooting guide
description: Troubleshooting guides for common ingestion satellite issues.
sidebar_position: 5
sidebar_label: Troubleshooting guide
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides tips and solutions for common ingestion satellite issues. Follow these steps to identify and resolve problems efficiently.

## Debugging steps

When troubleshooting issues with Satellite, following the best practices can help simplify the process and ensure effective resolution of problems. This section outlines the steps to debug Satellite related issues, including tips for identifying and resolving common issues.

### Step 1: Verify configuration files

First, verify your configuration files are correct and up-to-date.

<Tabs>
  <TabItem value="docker" label="Docker" default>

Provide the absolute path to the YAML file.

</TabItem>

<TabItem value="k8s" label="Kubernetes">

Redeploy to verify the added changes.

</TabItem>
</Tabs>

You can confirm this by SSH-ing into the container or pod and checking the configuration file contents.

<Tabs>
  <TabItem value="docker" label="Docker" default>

```
docker exec -ti <container-id> -- bashcat config.yaml
```

</TabItem>

<TabItem value="k8s" label="Kubernetes">


```
kubectl exec -ti <pod-id> bash
```

Verify the content in the file and match it to what you expect.

```
cat config.yaml
```

</TabItem>
</Tabs>

### Step 2: Check indentation and special characters in YAML files

YAML files require precise formatting. Common issues to check:

* Proper indentation (use spaces, not tabs)
* Correct special character escaping
* Quote handling

Examples of correct vs incorrect escaping:

* `USER\NAME` (correct)
* `USER\\NAME` (incorrect)

:::tip
Pro Tip: Use a YAML linter to catch formatting issues early.
:::

### Step 3: Disable SSL validation (Optional)

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

### Step 4: Monitor logs

Logs are crucial for understanding Satellite's behavior. Check the logs of relevant containers or pods to identify any error messages or warnings.

<Tabs>
  <TabItem value="docker" label="Docker" default>

```
docker logs -f <container-name>
```

</TabItem>

<TabItem value="k8s" label="Kubernetes">

```
kubectl logs -f <pod-name>  # Continuously stream logs for a Kubernetes pod
kubectl logs -f <pod-name> -c <container-name>  # Stream logs for a specific container in a pod
```
</TabItem>
</Tabs>

### Step 5: Inspect containers and pods

Inspect containers and pods to gather detailed information about their state, performance, and network configurations.

<Tabs>
  <TabItem value="docker" label="Docker" default>

```
docker inspect <container-name>
```

</TabItem>

<TabItem value="k8s" label="Kubernetes">

```
kubectl describe pod <pod-name>  # Get detailed information on a Kubernetes pod
kubectl get pod <pod-name> -o yaml  # Full configuration and state of a Kubernetes pod
```

</TabItem>
</Tabs>

## Frequently asked questions

### Do I need to set up a ClusterRole and ClusterRoleBinding for the Satellite in Kubernetes?

No. These are not required unless you plan to utilize Kubernetes capabilities within your runbooks. If you don't need Kubernetes integration, you can omit them.

### Why is the Satellite configuration stored as a ConfigMap instead of a Secret?

While the documentation provides an example with a ConfigMap for ease of use and visualization, it's not a strict recommendation. Storing sensitive information, like credentials, in a Secret is a valid and more secure option. You can choose the storage method that best suits your security requirements.

### Can I specify a specific tag when running the Satellite image instead of using the latest tag?

Yes, you can run the Satellite image with a specific tag to lock down the version. New versions of the Satellite can be found [here](https://hub.docker.com/r/levelops/ingestion-satellite).

### How can I add certificate authorities to the Satellite image? Can I use an internal image as a base?

To add certificate authorities to a Satellite image and enable it to use an internal image as a base, you can follow the steps below:

<Tabs>
  <TabItem value="docker" label="Docker" default>

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

</TabItem>

<TabItem value="k8s" label="Kubernetes">

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

</TabItem>
</Tabs>

### Why do I need to provide a valid SSL certificate when using HTTPS with a proxy and Satellite?

HTTPS ensures secure communication between your proxy server and Satellite. To build this secure connection, a valid SSL certificate is required. This certificate helps verify the identity of the proxy and encrypts the data exchanged.

### How can I configure SSL certificates when building my own image for the proxy?

You can configure SSL certificates for your proxy image using the following Dockerfile instructions:

```bash
COPY --from=base /etc/pki/ca-trust/extracted/java/cacerts /opt/cacerts
RUN chmod +w /opt/cacerts
RUN keytool -importcert -file /opt/proxy_cert.pem -noprompt -alias proxy_ca -keystore /opt/cacerts -storepass changeit
RUN chmod -w /opt/cacerts
```

### Can I manually copy my SSL certificate to the proxy container if I prefer not to build my own image?

Yes. Follow these steps to manually copy your SSL certificate to the proxy container:

1. Get the truststore from the container:

```bash
docker cp <container-name>:/etc/pki/ca-trust/extracted/java/cacerts /tmp/cacerts
```

2. List existing certificates in the truststore:

```bash
keytool -list -keystore /tmp/cacerts -storepass changeit
```

3. Change the truststore permissions:

```bash
chmod +w /tmp/cacerts
```

4. Add your SSL certificate to the truststore:

```bash
keytool -importcert -file <my-crt-file-location> -noprompt -alias <my-alias> -keystore /tmp/cacerts -storepass changeit
```

5. Restore the original truststore permissions:

```bash
chmod -w /tmp/cacerts
```

6. Put the modified truststore back into the container:

```bash
docker cp /tmp/cacerts <container-name>:/etc/pki/ca-trust/extracted/java/cacerts
```

Make sure to replace the following placeholders:

* `<container-name>`: Replace this with the name or ID of your proxy container.
* `<my-crt-file-location>`: Replace this with the file path to your SSL certificate file.
* `<my-alias>`: Replace this with an alias for your SSL certificate in the truststore.

### Can I configure a single satellite container to support multiple integrations? If so, what should the YAML configuration file look like?

Yes, a single satellite container can support multiple integrations. You can define each integration within the same YAML file, and the satellite will handle data ingestion for each specified service. Below is a YAML example that demonstrates how to configure multiple integration in this scenario Jira and BitBucket in a single satellite container.

```bash
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <SEI_API_KEY>
  url: "https://app.harness.io/gratis/sei/api"
  # Note that this URL is relative to the Environment of your Harness Account.

integrations:
  # BitBucket Integration
  - id: '<INTEGRATION_ID>'
    application: bitbucket_server
    url: 'https://bitbucket.org/<TEAMNAME_or_USERNAME>/<REPO_NAME>/src'
    username: <BITBUCKET_USERNAME>
    api_key: <BITBUCKET_API_KEY>
    metadata:
      fetch_prs: true
      fetch_pr_reviews: true
      fetch_commits: true
      fetch_commit_files: true
      repos: <REPOSITORIES>
    satellite: true

  # Jira Integration
  - id: '<INTEGRATION_ID>'
    url: '<ATLASSIAN_ORGANIZATION_URL>'
    username: <ATLASSIAN_USERNAME>
    application: jira
    api_key: <ATLASSIAN_PASSWORD>
    metadata:
      timezone: '<TIMEZONE>'
      sensitive_fields:
        - description
        - userDetails

jira:
  allow_unsafe_ssl: true

```

### Can a single satellite support multiple instances for an integration, e.g. a production and non-production instance? (Scenario #1)

Yes, a single satellite can support multiple instances, including production (prod) and non-production (non-prod) environments. However, it’s important to allocate sufficient CPU and memory to the satellite’s Docker container to accommodate the additional jobs that multiple integrations may require. 

Each satellite has a fixed number of threads, so adding more integrations may not significantly impact the overall resources but requires monitoring to ensure sufficient performance.

### Can a single VM host multiple satellites, each connecting to different instances? (Scenario #2)

Yes. It is possible to run multiple satellites on a single VM, and each satellite can connect to a different instance. The satellite is distributed as a Docker container, and multiple containers can coexist on the same VM. This allows you to manage multiple integrations with different Gitlab instances from a single virtual machine.

### Would VM sizing recommendations differ between single vs. multiple satellites?

For [Scenario #1 (a single satellite managing multiple GitLab instances)](#can-a-single-satellite-support-multiple-instances-for-an-integration-eg-a-production-and-non-production-instance-scenario-1), fewer resources may be required compared to [Scenario #2 (multiple satellites on a single VM)](#can-a-single-vm-host-multiple-satellites-each-connecting-to-different-instances-scenario-2), as only one satellite process runs in Scenario #1. This results in lower overhead.

However, for both scenarios, resource allocation should be based on observed workload. Monitoring CPU and memory usage is essential to ensure the infrastructure can handle the size of data ingested as part of the integration.
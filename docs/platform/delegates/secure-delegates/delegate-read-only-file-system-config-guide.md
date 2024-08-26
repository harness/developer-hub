---
title: Running Harness Delegate on a Read-Only File System
description: How to configure the Harness Delegate to run on a read-only file system
# sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed instructions on how to configure the Harness Delegate to operate on a read-only file system for both Kubernetes/Helm and Docker deployments.

The Harness Delegate requires write access to specific directories to function correctly. By default, the delegate writes to two key directories:

- Temporary Directory (default: /tmp)

- Working Directory (default: /opt/harness-delegate/)

When deploying the delegate on a read-only file system, writable alternatives must be provided for these directories. The most common solution is to mount writable volumes in these locations.

:::info note

This setup requires specific configurations in both Kubernetes and Docker deployments. If you encounter issues, contact [Harness Support](mailto:support@harness.io) for assistance. 

:::

## Prerequisites

Before configuring the delegate to run on a read-only file system, ensure that you meet the following prerequisites:

- **Delegate Version**: You are using a delegate version that supports running on a read-only file system.

- **Writable Directories**: You have identified the directories that must remain writable, such as `/tmp` and the working directory.

## Configuring the Delegate for a Read-Only File System

Use the steps below to configure the Harness Delegate to run on a read-only file system.

<Tabs>
  <TabItem value="docker" label="Docker delegate" default>

To configure the delegate in a Docker container with a read-only file system, follow these steps:

1. **Mount Writable Volumes**:

    The delegate requires writable volumes for the `/tmp` and working directories. You can mount these volumes as tmpfs to allow writing.

    - **/tmp**: Mount as a writable volume.

    - **Working Directory**: Mount a writable volume to a non-existing location and configure the `WORKING_DIR` environment variable to point to this location.

    **Example: Docker Command:**

    ```
    docker run -d --cpus=1 --memory=2g --read-only \
    --mount type=tmpfs,destination=/writable \
    --mount type=tmpfs,destination=/tmp \
    -e WORKING_DIR="/writable" \
    -e DELEGATE_NAME=docker-delegate-ro \
    -e NEXT_GEN="true" \
    -e DELEGATE_TYPE="DOCKER" \
    -e ACCOUNT_ID=<account_id> \
    -e DELEGATE_TOKEN=<token> \
    -e DELEGATE_TAGS="" \
    -e LOG_STREAMING_SERVICE_URL=https://app.harness.io/log-service/ \
    -e MANAGER_HOST_AND_PORT=https://app.harness.io harness/delegate:24.08.83704.minimal
    ```

    **Explanation:**

    - `--read-only`: Enables the read-only file system.

    - `-e WORKING_DIR="/writable"`: Configures the working directory for the delegate.

    - `--mount type=tmpfs,destination=/writable`: Mounts an empty space for the working directory.

    - `--mount type=tmpfs,destination=/tmp`: Mounts an empty space for the tmp directory.

2. **Set Environment Variables**

    Ensure all required environment variables are properly set. This includes:

    - `DELEGATE_NAME`: The name of your delegate.

    - `NEXT_GEN`: Set to "true" to enable the next-generation delegate features.

    - `ACCOUNT_ID`: Your Harness account ID.

    - `DELEGATE_TOKEN`: Your delegate token for authentication.

    - `LOG_STREAMING_SERVICE_URL`: The URL for log streaming.

3. **Verify the Deployment**

    After running the Docker container, verify that the delegate is functioning correctly:

    - Check the logs using docker logs <container_id>.

    - Ensure there are no permission errors related to the read-only file system.

    - Confirm that the delegate is registered and active in your Harness account.

</TabItem>
  <TabItem value="k8s" label="Kubernetes delegate">

To configure the delegate in a Kubernetes cluster with a read-only file system, follow these steps:

1. **Create the Deployment YAML**

    Start by creating a Kubernetes deployment YAML file with the necessary configurations. Ensure the delegate has writable volumes for its working directory and  `/tmp`:

    **Example YAML Configuration:**

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    labels:
        harness.io/name: k8s-ro
    name: k8s-ro
    namespace: harness-delegate-ng
    spec:
    replicas: 1
    minReadySeconds: 120
    selector:
        matchLabels:
        harness.io/name: k8s-ro
    template:
        metadata:
        labels:
            harness.io/name: k8s-ro
        annotations:
            prometheus.io/scrape: "true"
            prometheus.io/port: "3460"
            prometheus.io/path: "/api/metrics"
        spec:
        terminationGracePeriodSeconds: 600
        restartPolicy: Always
        containers:
        - image: harness/delegate:24.08.83704.minimal
            imagePullPolicy: Always
            name: delegate
            securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            runAsNonRoot: true
            runAsUser: 1001
            ports:
            - containerPort: 8080
            resources:
            limits:
                memory: "2048Mi"
            requests:
                cpu: "0.5"
                memory: "2048Mi"
            livenessProbe:
            httpGet:
                path: /api/health
                port: 3460
                scheme: HTTP
            initialDelaySeconds: 10
            periodSeconds: 10
            failureThreshold: 3
            startupProbe:
            httpGet:
                path: /api/health
                port: 3460
                scheme: HTTP
            initialDelaySeconds: 30
            periodSeconds: 10
            failureThreshold: 15
            envFrom:
            - secretRef:
                name: k8s-ro-account-token
            env:
            - name: WORKING_DIR
            value: "/opt/harness-delegate/writeable/"
            - name: JAVA_OPTS
            value: "-Xms64M"
            - name: ACCOUNT_ID
            value: <account_id>
            - name: MANAGER_HOST_AND_PORT
            value: https://app.harness.io
            - name: DEPLOY_MODE
            value: KUBERNETES
            - name: DELEGATE_NAME
            value: k8s-ro
            - name: DELEGATE_TYPE
            value: "KUBERNETES"
            - name: DELEGATE_NAMESPACE
            valueFrom:
                fieldRef:
                fieldPath: metadata.namespace
            - name: INIT_SCRIPT
            value: ""
            - name: DELEGATE_DESCRIPTION
            value: ""
            - name: DELEGATE_TAGS
            value: ""
            - name: NEXT_GEN
            value: "true"
            - name: LOG_STREAMING_SERVICE_URL
            value: "https://app.harness.io/log-service/"
            volumeMounts:
            - name: work-dir
            mountPath: /opt/harness-delegate/writeable/
            - name: tmp-dir
            mountPath: /tmp
        volumes:
        - name: work-dir
          emptyDir: {}
        - name: tmp-dir
          emptyDir:
            medium: "Memory"
    ```

2. **Configure Security Context**

    Ensure the `securityContext` settings enable the read-only file system and non-root execution.

    **Example:**

    ```yaml
    securityContext:
    allowPrivilegeEscalation: false
    readOnlyRootFilesystem: true
    runAsNonRoot: true
    runAsUser: 1001
    ```

3. **Mount Writable Volumes**

    Mount the writable volumes for the working directory and `/tmp` to ensure the delegate can write necessary files.

    **Example:**
    ```yaml
    volumeMounts:
    - name: work-dir
    mountPath: /opt/harness-delegate/writeable/
    - name: tmp-dir
    mountPath: /tmp
    volumes:
    - name: work-dir
    emptyDir: {}
    - name: tmp-dir
    emptyDir:
        medium: "Memory"
    ```

4. **Configure Environment Variables**

    Ensure all required environment variables are properly set in the deployment YAML.

    **Example**:
    ```
    name: WORKING_DIR
    value: "/opt/harness-delegate/writeable/"
    ```

5. **Deploy the Delegate**
    
    Apply the deployment YAML to your Kubernetes cluster to deploy the delegate.
    
    **Example:**
    ```
    kubectl apply -f delegate-deployment.yaml
    ```

6. **Verify the Deployment**
    
    After deploying the delegate, verify that it is functioning correctly:
    
    - Check the logs using `kubectl logs <pod_name> -n <namespace>`.
    
    - Ensure there are no permission errors related to the read-only file system.
    
    - Confirm that the delegate is registered and active in your Harness account.

:::info note

Kubernetes mounts /tmp inside RAM memory as tmpfs by default. It is recommended to do the same when mounting by specifying medium: "Memory".

:::

</TabItem>
</Tabs>

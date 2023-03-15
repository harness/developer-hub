---
title: Set up
description: Add a monitored service and install an Error Tracking Agent to identify and troubleshoot faults and exceptions in your code.
sidebar_position: 20
helpdocs_topic_id: cbj5uuzpbu
helpdocs_category_id: c40ko6e87n
helpdocs_is_private: false
helpdocs_is_published: true
---

:::note
Currently, this feature is behind the feature flag `SRM_ET_EXPERIMENTAL`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::


This topic describes how to add a monitored service in Harness and install an Error Tracking Agent on a JVM to identify and troubleshoot faults and exceptions in your code.


## Add a monitored service

A Harness Monitored Service is a combination of service and environment. Harness monitors the following via a monitored service:

* Code-level exceptions and errors from the data collected by the Error Tracking Agent.
* Changes such as deployments, incidents such as PagerDuty, and infrastructure changes such as Kubernetes events and auditing.
* Health trend deviations using logs and metrics obtained from the APM and logging tools.

The following steps explain how to create a monitored service, and define service and environments for tracking code errors and exceptions: 

1. In your Harness project, navigate to the **Service Reliability Management** module, and then select **Monitored Services**.

    ![Navigate to Monitored Services](./static/et-quickstart-moniterdservice-navigate.png)

2. Select **+ New Monitored Service**. 

    The Create new monitored service settings page appears.


3. In the **Overview** section, enter the following information:
    * **Type**: Select **Application**.
    * **Create or select a Service**: Select a Harness service that you want to monitor. A Harness service is a logical representation of your microservices and other workloads that you want to monitor.

      To create a new service, perform the following steps:
        
      1. Select **+ Add New**.
        
            The New Service dialog appears.
      2. Enter the following information, and then select **Save**:
       
          *  **Name** : Enter a name for the service. For example, _sample_service_.
          *  **Description (Optional)**
          *  **Tag (Optional)** 

    * **Create or Select an Environment**: Choose an appropriate environment. Environments represent your deployment targets such as QA, Prod, and so on.
  
        To create a new environment, perform the following steps:
    
      1. Select **+ Add New**. 
     
         The New Environment dialog appears.
      2. Enter the following information and then select **Save**:

            * **Name**: Enter a name for the environment.
            * **Description (Optional)**
            * **Tag (Optional)**
            * **Environment Type**: Select an environment type. The available options are **Production** and **Non-Production**.

    Harness autopopulates the **Monitored Service Name** field by combining the **Service** and **Environment** names.

4. Select **Save**.
 
   You can view the new monitored service in the **Monitored Services** list. 

    ![Monitored Service is created](./static/et-quickstart-moniterdservice-created.png)


## Create a token for the Error Tracking Agent

To create a token, perform the following steps:

1. Expand **PROJECT SETUP** and then select **Code Error Settings**.
   
2. On the top right-hand corner, select **Tokens**.
       
     ![Create Token](./static/et-quickstart-token-navigate.png)

3. Select **Generate New Token**. 
    
    The New Token dialog appears. 

4. Enter a **Name** for the token.

5. Select **Generate**.
   A new authentication token is generated and displayed in the **Key** field.

6. Copy the token to clipboard. This token is used in the Error Tracking Agent configuration file.  

    ![Generate new token](./static/et-quickstart-generate-new-token.png)

7. Select **Close**.

   The newly created token is added to the list of tokens.

![New token](./static/et-quickstart-new-token-created.png)

:::note
You can copy the token anytime by selecting the clipboard icon.
:::



## Install an Error Tracking Agent

The Harness Error Tracking Agent must be installed on a Java application to capture application code and variables. This native agent library is attached to the Java Virtual Machine (JVM)/Common Language Runtime (CLR) during runtime. It can be deployed into any Kubernetes container without altering the image. The Agent fingerprints the program code loaded into the JVM/CLR and captures the complete state of the code and the host/container in order to identify anomalies.

This topic provides details about:

* Compatibility and requirements to install an Error Tracking Agent.
* Steps to install an Error Tracking Agent on a Java Application.

### Compatibility and Requirements

This table lists the supported operating system, Java Virtual Machine (JVM) versions, and JVM containers.

Future releases will include support for more operating systems.

| **Operating System** | **Supported JVM Versions** | **Supported JVM Containers** |
| --- | --- | --- |
| Linux Operating System: <ul><li>Ubuntu: 14+</li><li>jDebian</li><li>CentOS: 6.5+</li><li>RedHat: 5.0 +</li><li>Suse: SLES12</li></ul>| <ul><li>Oracle/HotSpot:6u20 - 6u457 - 7u808 - 8u2218 - 8u2329 - all updates10/11/16/17 - all updates </li><li>OpenJDK:6u20 - 6u457 - 7u808 - 8u2228 - 8u2329 - all updates10/11/16/17 - all updates</li></ul> | <ul><li>Jetty</li><li>Scala</li><li>Eclipse</li><li>NetBeans</li><li>IntelliJ</li><li>JBoss/Wildfly</li><li>CloudFoundry</li><li>Weblogic</li><li>Play Framework</li><li>Glassfish</li><li>Mule</li><li>WebSphere</li><li>Tomcat</li></ul> |

##### JVM Requirements

When you attach the Harness Error Tracking Agent to a JVM that runs Java 10, 11, 16, 17, or any IBM Java version, ensure that the following requirements are met:

* Turn off class sharing using the following flags:

  |  |  |
| --- | --- |
| IBM Java | `‑Xshareclasses:none` |
| HotSpot | `-Xshare:off -XX:-UseTypeSpeculation` |


* Increase `ReservedCodeCache` to at least 512mb by adding the following flag:  
`-XX:ReservedCodeCacheSize=512m`

### Install an Error Tracking Agent

Depending on your setup and needs, there are multiple ways to install and deploy an Error Tracking Agent on a Java application. You can install the Agent to monitor your application in the following ways:

* As a standalone installation outside Harness.
* By modifying your Docker image.
* Using an init container.

If you have additional agents running on your application, the Error Tracking Agent should appear at the end of the VM arguments list before specifying the main class or jar.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Standalone" label="Standalone" default>

This option lets you install the Error Tracking Agent as a standalone. Perform the following steps to install the Agent:

1. [Download](https://get.et.harness.io/releases/latest/nix/harness-et-agent.tar.gz) the latest version of the Agent for Linux.

2. Extract this version to a folder of your choice. For example`/home/user`. The contents of the archive will be inside a folder named Harness. You'll require the path to the Agent when starting your application. An example for the Agent path would be , `/home/user/harness/lib/libETAgent.so`.

3. Add JVM arguments which instruct the JVM to load the Agent.

  This is done by adding `-agentpath:/home/user/harness/lib/libETAgent.so` to the application startup. For example:

    `java -agentpath:/home/user/harness/lib/libETAgent.so -jar yourapp.jar`.

  This parameter can also be specified using `JAVA_TOOL_OPTIONS`. For example:

    `exportJAVA_TOOL_OPTIONS=-agentpath:/home/user/harness/lib/libETAgent.so`.

4. Set the Agent environment variables so that your application can map to a Harness Service.

  | **Required Environment Variable** | **Description** | **Example** |
| --- | --- | --- |
| `ET_COLLECTOR_URL` | URL to the Error Tracking collector. | https://collector.et.harness.io/prod1|
| `ET_APPLICATION_NAME` | Name of your application or Service. | myapp |
| `ET_DEPLOYMENT_NAME` | Deployment or version number of your application or Service. When your application or Service is updated to a new version, it's recommended that you update this variable as well, so that the Error Tracking Agent can identify when new errors are introduced. | 1 |
| `ET_ENV_ID` | ID of your Harness Environment. | production |
| `ET_TOKEN` | ET Agent Token created on Harness. | b34a3f1a-7b38-4bb6-b5fe-49f52314f5342a |

  For example:

```
ENV ET_COLLECTOR_URL=https://collector.et.harness.io/prod1/
ENV ET_APPLICATION_NAME=yourapp  
ENV ET_DEPLOYMENT_NAME=1  
ENV ET_ENV_ID=env1
ENV ET_TOKEN= agenttoken
```

5. Restart your application after installing the Error Tracking Agent.


</TabItem>
<TabItem value="Docker image" label="Docker image">

This option uses a Dockerfile to copy an Error Tracking Agent to the Docker image at build time. When your Java application is running using Docker, perform the following steps to install the Agent:

1. Download and extract the Agent in your Dockerfile. For example:
```
RUN wget -qO- https://get.et.harness.io/releases/latest/nix/harness-et-agent.tar.gz | tar -xz
```
2. Set the Agent environment variables in the Dockerfile.

  | **Required Environment Variable** | **Description** | **Example** |
| --- | --- | --- |
| `ET_COLLECTOR_URL` | URL to the Error Tracking collector. | https://collector.et.harness.io/prod1 |
| `ET_APPLICATION_NAME` | Name of your application or Service. | myapp |
| `ET_DEPLOYMENT_NAME` | Deployment or version number of your application or Service. When your application or Service is updated to a new version, it's recommended that you update this variable as well, so that the Error Tracking Agent can identify when new errors are introduced. | 1 |
| `ET_ENV_ID` | ID of your Harness Environment. | production |
| `ET_TOKEN` | ET Agent Token created on Harness. | b34a3f1a-7b38-4bb6-b5fe-49f52314f5342a |

  For example:
```
ENV ET_COLLECTOR_URL=https://collector.et.harness.io/prod1
ENV ET_APPLICATION_NAME=yourapp  
ENV ET_DEPLOYMENT_NAME=1  
ENV ET_ENV_ID=env1 
ENV ET_TOKEN= agenttoken
```
1. Add JVM arguments to the Docker image, which instructs the JVM to load the Agent. This is done by adding`agentpath:/harness/lib/libETAgent.so`to the application`ENTRYPOINT`. For example,`ENTRYPOINT java -agentpath:/harness/lib/libETAgent.so -jar yourapp.jar`. This parameter can also be specified using`JAVA_TOOL_OPTIONS`, for example `ENV JAVA_TOOL_OPTIONS="-agentpath:/harness/lib/libETAgent.so"`.
2. Once the Dockerfile is updated, rebuild the Docker image and restart any containers running on it to start monitoring using Error Tracking.

```
 FROM openjdk:8-jre  
ENV JAVA_TOOL_OPTIONS="-agentpath:/harness/lib/libETAgent.so"  
ENV ET_COLLECTOR_URL=https://collector.et.harness.io/prod1/  
ENV ET_APPLICATION_NAME=yourapp  
ENV ET_DEPLOYMENT_NAME=1  
ENV ET_ENV_ID=env1  
ENV ET_TOKEN= agenttoken 
RUN wget -qO- <https://get.et.harness.io/releases/latest/nix/harness-et-agent.tar.gz> | tar -xz  
ENTRYPOINT java -jar yourapp.jar
```

</TabItem>
<TabItem value="Init container" label="Init container">

When your Java application is running on Kubernetes, use an init container to automatically install the Agent at runtime without changing the existing images. The image is publicly hosted in [Docker Hub](https://hub.docker.com/r/harness/et-agent-sidecar).

Consider the following Kubernetes deployment example for a Java application:

```
spec:
containers:
- name: my-javaapp-container
image: my-javaapp-image
..
initContainers:
- name: init-et-agent
image: harness/et-agent-sidecar
imagePullPolicy: Always
volumeMounts:
- name: et-agent
mountPath: /opt/harness-et-agent
..
env:
- name: JAVA_TOOL_OPTIONS
value: "-agentpath=/opt/harness-et-agent/lib/libETAgent.so"
- name: ET_COLLECTOR_URL
value: "https://collector.et.harness.io/prod1/"
- name: ET_APPLICATION_NAME
value: yourapp
- name: ET_DEPLOYMENT_NAME
value: 1
- name: ET_ENV_ID
value: production
- name: ET_TOKEN
value: b34a3f1a-7b38-4bb6-b5fe-49f52314f5342a
```
  </TabItem>
</Tabs>


## Verify Agent connection

After installing Error Tracking Agent, you should verify that it is connected to Harness SRM. To verify the Error Tracking Agent connection, do the following:

1. Expand **PROJECT SETUP** and then select **Code Error Settings**.  
   
   ![Navigate to Agents list](./static/et-quickstart-verify-agent-navigate.png)
 
    A comprehensive list of Error Tracking Agents is displayed along with the information such as service name, environment, deployment version, Agent version, Agent status, token name, and so on. Ensure that the Agent that you installed is listed, and the status is **CONNECTED**.

   ![Verify agent connection](./static/et-quickstart-agent-connection-status.png)


## Next steps

Identify and prioritize error events using [Events dashboard](error-tracking-event-dashboard.md).


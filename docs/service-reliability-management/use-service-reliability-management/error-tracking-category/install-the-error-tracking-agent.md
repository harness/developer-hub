---
title: Install an Error Tracking Agent
description: This topic explains the steps to install an Error Tracking Agent on a Java Application.
sidebar_position: 20
helpdocs_topic_id: nx99xfcoxz
helpdocs_category_id: c40ko6e87n
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness Error Tracking Agent is installed on a Java application to capture application code and variables. You must install an Error Tracking Agent to use Harness Error Tracking for your application or Service.

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

#### Step: Install as a Standalone

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
| `ET_COLLECTOR_URL` | URL to the Error Tracking collector. | https://app.harness.io/gratis/et-collector/ |
| `ET_APPLICATION_NAME` | Name of your application or Service. | myapp |
| `ET_DEPLOYMENT_NAME` | Deployment or version number of your application or Service. When your application or Service is updated to a new version, it's recommended that you update this variable as well, so that the Error Tracking Agent can identify when new errors are introduced. | 1 |
| `ET_ENV_ID` | ID of your Harness Environment. | production |
| `ET_ACCOUNT_ID` | Harness Account ID for which Error Tracking will be configured. | abCdEFgHIjK0\_LMnoPQRSTU |
| `ET_ORG_ID` | Harness Organization ID for which Error Tracking will be configured. | default |
| `ET_PROJECT_ID` | Harness Project ID for which Error Tracking will be configured. | myproject |

  For example:

```
ENV ET_COLLECTOR_URL=https://app.harness.io/prod1/et-collector/  
ENV ET_APPLICATION_NAME=yourapp  
ENV ET_DEPLOYMENT_NAME=1  
ENV ET_ENV_ID=env1  
ENV ET_ACCOUNT_ID=<myaccount_id>  
ENV ET_ORG_ID=<myorg_id>  
ENV ET_PROJECT_ID=<yourproject_id>
```

5. Restart your application after installing the Error Tracking Agent.

#### Modify a Docker Image

This option uses a Dockerfile to copy an Error Tracking Agent to the Docker image at build time. When your Java application is running using Docker, perform the following steps to install the Agent:

1. Download and extract the Agent in your Dockerfile. For example:
```
RUN wget -qO- https://get.et.harness.io/releases/latest/nix/harness-et-agent.tar.gz | tar -xz
```
2. Set the Agent environment variables in the Dockerfile.

  | **Required Environment Variable** | **Description** | **Example** |
| --- | --- | --- |
| `ET_COLLECTOR_URL` | URL to the Error Tracking collector. | https://app.harness.io/gratis/et-collector/ |
| `ET_APPLICATION_NAME` | Name of your application or Service. | myapp |
| `ET_DEPLOYMENT_NAME` | Deployment or version number of your application or Service. When your application or Service is updated to a new version, it's recommended that you update this variable as well, so that the Error Tracking Agent can identify when new errors are introduced. | 1 |
| `ET_ENV_ID` | ID of your Harness Environment. | production |
| `ET_ACCOUNT_ID` | Harness Account ID for which Error Tracking will be configured. | abCdEFgHIjK0\_LMnoPQRSTU |
| `ET_ORG_ID` | Harness Organization ID for which Error Tracking will be configured. | default |
| `ET_PROJECT_ID` | Harness Project ID for which Error Tracking will be configured. | myproject |

  For example:
```
ENV ET_COLLECTOR_URL=https://app.harness.io/prod1/et-collector/  
ENV ET_APPLICATION_NAME=yourapp  
ENV ET_DEPLOYMENT_NAME=1  
ENV ET_ENV_ID=env1  
ENV ET_ACCOUNT_ID=<myaccount_id>  
ENV ET_ORG_ID=<myorg_id>  
ENV ET_PROJECT_ID=<yourproject_id>
```
3. Add JVM arguments to the Docker image, which instructs the JVM to load the Agent. This is done by adding`agentpath:/harness/lib/libETAgent.so`to the application`ENTRYPOINT`. For example,`ENTRYPOINT java -agentpath:/harness/lib/libETAgent.so -jar yourapp.jar`. This parameter can also be specified using`JAVA_TOOL_OPTIONS`, for example `ENV JAVA_TOOL_OPTIONS="-agentpath:/harness/lib/libETAgent.so"`.
4. Once the Dockerfile is updated, rebuild the Docker image and restart any containers running on it to start monitoring using Error Tracking.

```
 FROM openjdk:8-jre  
ENV JAVA_TOOL_OPTIONS="-agentpath:/harness/lib/libETAgent.so"  
ENV ET_COLLECTOR_URL=https://app.harness.io/prod1/et-collector/  
ENV ET_APPLICATION_NAME=yourapp  
ENV ET_DEPLOYMENT_NAME=1  
ENV ET_ENV_ID=env1  
ENV ET_ACCOUNT_ID=<myaccount_id>  
ENV ET_ORG_ID=<myorg_id>  
ENV ET_PROJECT_ID=<yourproject_id>  
RUN wget -qO- <https://get.et.harness.io/releases/latest/nix/harness-et-agent.tar.gz> | tar -xz  
ENTRYPOINT java -jar yourapp.jar
```

#### Use an Init Container
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
value: "https://app.harness.io/prod1/et-collector"
- name: ET_APPLICATION_NAME
value: yourapp
- name: ET_DEPLOYMENT_NAME
value: 1
- name: ET_ENV_ID
value: production
- name: ET_ACCOUNT_ID
value: abCdEFgHIjK0_LMnoPQRSTU
- name: ET_ORG_ID
value: default
- name: ENV ET_PROJECT_ID
value: myproject
```

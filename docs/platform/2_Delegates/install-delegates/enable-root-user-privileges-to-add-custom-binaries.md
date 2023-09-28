---
title: Enable root user privileges to add custom binaries
description: You can install Harness Delegate with or without root user privileges. By default, the Harness Delegate container runs as root user. The delegate installer provides the option to install the delegate
sidebar_position: 4
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

You can install Harness Delegate with or without root user privileges. By default, the Harness Delegate container runs as root user. 

The delegate installer provides the option to install the delegate with non-root user privileges. Non-root user access supports the security principle of minimum access. But without root user access, you cannot modify the delegate image with custom binaries.

This topic explains how to use the delegate installer to install with or without root user privileges. This topic also explains how to modify an installed delegate to enable root user privileges and the installation of custom binaries.

### Delegate images

Harness provides the following delegate images. Each image includes a set of tools that target a particular scenario.

| **Delegate Image**  | **Description** |
| --- | --- |
| harness/delegate:*yy.mm.xxxxx* | Includes the delegate and its dependencies. Includes client tools such as `kubectl`, Helm, and ChartMuseum. |
| harness/delegate:*yy.mm.xxxxx*.minimal | Includes the delegate and its dependencies. |

For detailed information on Docker delegate installation, go to [Install a Docker delegate](/docs/platform/2_Delegates/install-delegates/overview.md).

### Set user privileges

```mdx-code-block
<Tabs>
  <TabItem value="Kubernetes" label="Kubernetes">
```

You can set privileges in the Helm chart or the Kubernetes manifest.

### Specify user privileges in delegate YAML

To add binaries to a delegate image that was installed without root user privileges, you can change the delegate manifest file to allow them. To do so, locate the container `spec` and ensure it includes the following `securityContext` object:

```yaml
spec:  
    containers:  
    - image: harness/delegate:ng  
      imagePullPolicy: Always  
      name: harness-delegate-instance  
      securityContext:  
        allowPrivilegeEscalation: false  
        runAsUser: 0
```

```mdx-code-block
  </TabItem>
  <TabItem value="Amazon ECS or AWS Fargate" label="Amazon ECS or AWS Fargate">
```

You can set privileges in the task definition parameters with the `user` option. For more information, go to [Task definition parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions) in the AWS documentation.


```mdx-code-block
  </TabItem>
  <TabItem value="Docker" label="Docker">
```

You can set privileges in the `docker run` command with the `--user` option. For more information, go to [docker run](https://docs.docker.com/engine/reference/commandline/run/) in the Docker documentation.

```mdx-code-block
  </TabItem>
</Tabs>
```

### Use INIT\_SCRIPT with the microdnf package manager

To add binaries, you must first install the `microdnf` package manager on the delegate image. This utility is required to run installations and other operations on images. 

Use the `INIT_SCRIPT` environment variable to specify the custom binaries you want `microdnf` to install.

```
- name: INIT_SCRIPT  
      value: |-  
        microdnf install -y zip unzip
```
In this example, the value of `INIT_SCRIPT` is the `microdnf install` instruction that installs the `zip` and `unzip` packages.

Note that the `apt-get` command-line tool and profile scripts target an earlier Ubuntu-based image and are not supported for these images.


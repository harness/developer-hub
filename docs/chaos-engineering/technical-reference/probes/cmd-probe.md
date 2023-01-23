---
title: Command Probe
sidebar_position: 4
---

The Command Probe allows developers to run Bash commands and match the resulting output as part of the entry/exit criteria. The intent behind this probe was to allow users to implement a non-standard & imperative way for expressing their hypothesis. For example, you can check for specific data within a database, parse the value out of a JSON blob being dumped into a certain path or check for the existence of a particular string in the service logs.

:::info YAML Only Feature
By default, the probe can only be defined in inline mode from the UI where the command is run from within the experiment image. However, it can also be run in source mode where the command execution is carried out from within a new pod whose image can be specified. While inline is preferred for simple shell commands, source mode can be used when application-specific binaries are required. Refer to the probe schema [here](https://docs.litmuschaos.io/docs/concepts/probes#cmdprobe).
:::

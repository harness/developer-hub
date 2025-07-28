---
title: HCE CLI
sidebar_position: 1
description: Simplify executing complex API commands
redirect_from:
	- /docs/chaos-engineering/technical-reference/hce-cli
    - /docs/chaos-engineering/api-reference/hce-cli
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes the Harness Chaos Engineering (HCE) CLI and its usage.

## What is HCE CLI?
HCE CLI is a tool to introduce chaos experiments into your environment. This allows you to test the resilience of your systems and applications.

## Why use the HCE CLI?
* The CLI helps you easily simulate various failure scenarios and observe how your services behave under stress. This helps uncover potential vulnerabilities and weaknesses in your system.

* It simplifies the process of executing complex API commands in your CI (Continuous Integration) pipelines. This helps in the seamless integration of the HCE platform with any CI tool, such as Jenkins, GitLab, GitHub Actions, and more.

* It provides an efficient way to define and execute chaos experiments on your APIs, making it a valuable tool for ensuring the robustness and reliability of your applications in production environments.

## Install the API

HCE offers pre-compiled binaries available for download.

<Tabs>
  <TabItem value="Linux">

<Tabs>
  <TabItem value="AMD64 / x86_64">

```bash
[ $(uname -m) = x86_64 ] && curl -Lo ./hce_cli_api https://app.harness.io/public/shared/tools/chaos/hce-cli/0.0.4/hce-cli-0.0.4-linux-amd64
```

</TabItem>

  <TabItem value="Arm64">

```bash
[ $(uname -m) = aarch64 ] && curl -Lo ./hce_cli_api https://app.harness.io/public/shared/tools/chaos/hce-cli/0.0.4/hce-cli-0.0.4-linux-arm64
```

	* After downloading, add execution permissions and move it to your binary installation directory:

```bash
chmod +x ./hce_cli_api
sudo mv ./hce_cli_api /usr/local/bin/hce_cli_api
```
</TabItem>

</Tabs>
</TabItem>

<TabItem value="MacOS">

<Tabs>
<TabItem value="Intel Macs">

```bash
[ $(uname -m) = x86_64 ] && curl -Lo ./hce_cli_api https://github.com/harness/onboard_hce_aws/releases/download/0.1.0/cli-darwin-amd64
```

</TabItem>

<TabItem value="M1 / ARM Macs">

```bash
[ $(uname -m) = arm64 ] && curl -Lo ./hce_cli_api https://app.harness.io/public/shared/tools/chaos/onboard_hce_aws/0.2.0/onboard_hce_cli-0.2.0-darwin-arm64
```

	* After downloading, add execution permissions and move it to your binary installation directory:

```bash
chmod +x ./hce_cli_api
mv ./hce_cli_api /some-dir-in-your-PATH/hce_cli_api
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>


## API usage
The HCE CLI provides a command-line interface (CLI) to launch and monitor chaos experiments and validate the resilience scores of workflows. The available commands are listed below:

### Launch chaos experiment
To re-launch a chaos experiment workflow:

```
$ ./hce-cli generate --api launch-experiment --account-id <account-id> --org-id <org-id> --project-id <project-id> --workflow-id <workflow-id> --api-key <api-key> --file-name <file-name>
```

You can replace `<account-id>`, `<org-id>`, `<project-id>`, `<workflow-id>`, `<api-key>`, and `<file-name>` with the appropriate values for your environment. This CLI command generates an API command in the `<file-name>` file, which is used to re-launch the chaos experiment workflow.

### Monitor chaos experiment
To monitor a running chaos experiment workflow:

```
$ ./hce-cli generate --api monitor-experiment --account-id <account-id> --org-id <org-id> --project-id <project-id> --api-key <api-key> --delay <delay> --timeout <timeout> --notify-id <notify-id>
```

Replace `<account-id>`, `<org-id>`, `<project-id>`, `<api-key>`, `<delay>`, `<timeout>`, and `<notify-id>` with the appropriate values for your environment. This command monitors the specified chaos experiment workflow and provide updates on the experiment's progress.

### Validate resilience score
To validate the resilience score of a completed chaos experiment workflow:

```
$ ./hce-cli generate --api validate-resilience-score --account-id <account-id> --org-id <org-id> --project-id <project-id> --api-key <api-key> --notify-id <notify-id>
```

Replace `<account-id>`, `<org-id>`, `<project-id>`, `<api-key>`, and `<notify-id>` with the appropriate values for your environment. This command generates an API command to validate the resilience score of the specified workflow.

### Flags
Described below are the flags available for the HCE CLI.

* `--api`: Set the name of the target API (mandatory).
* `--account-id`: Set the account ID (mandatory).
* `--org-id`: Set the organisation id (default "default")
* `--project-id`: Set the HCE project ID (mandatory).
* `--workflow-id`: Set the workflow ID (mandatory for some APIs; a default dummy value is provided).
* `--notify-id`: Set the notify ID (mandatory for some APIs; should be derived from the response launch-chaos).
* `--api-key`: Set the API key (mandatory).
* `--file-name`: Set the target file name that contains the API command (mandatory for some APIs; default value provided is hce-api.sh).
* `--delay`: Set the delay provided for multiple iterations (a mandatory value of 2s is provided for some APIs).
* `--timeout`: Set the timeout provided for multiple iterations (a mandatory value of 180s is provided for some APIs).

---
title: HCE SAAS API
sidebar_position: 1
description: Simplify executing complex API commands
---
This section describes the Harness Chaos Engineering (HCE) CLI API and its usage.


## What is HCE SAAS API?
HCE SAAS API is a tool to introduce chaos experiments into your environment. This allows you to test the resilience of your systems and applications. 


## Why use the HCE SAAS API?
* The CLI helps you easily simulate various failure scenarios and observe how your services behave under stress. This helps uncover potential vulnerabilities and weaknesses in your system.


* It simplifies the process of executing complex API commands in your CI (Continuous Integration) pipelines. This helps in the seamless integration of the HCE platform with any CI tool, such as Jenkins, GitLab, GitHub Actions, and more. 


* It provides an efficient way to define and execute chaos experiments on your APIs, making it a valuable tool for ensuring the robustness and reliability of your applications in production environments.

## Usage
The HCE SAAS API provides a command-line interface (CLI) to launch and monitor chaos experiments and validate the resilience scores of workflows. The available commands are listed below:


### Launch chaos experiment
To re-launch a chaos experiment workflow:

```
$ ./hce-cli generate --api launch-experiment --account-id <account-id> --project-id <project-id> --workflow-id <workflow-id> --api-key <api-key> --file-name <file-name>
```


You can replace `<account-id>`, `<project-id>`, `<workflow-id>`, `<api-key>`, and `<file-name>` with the appropriate values for your environment. This CLI command generates an API command in the `<file-name>` file, which is used to re-launch the chaos experiment workflow.

### Monitor chaos experiment
To monitor a running chaos experiment workflow:

```
$ ./hce-cli generate --api monitor-experiment --account-id <account-id> --project-id <project-id> --api-key <api-key> --delay <delay> --timeout <timeout> --notifyID <notifyID>
```

Replace `<account-id>`, `<project-id>`, `<api-key>`, `<delay>`, `<timeout>`, and `<notifyID>` with the appropriate values for your environment. This command monitors the specified chaos experiment workflow and provide updates on the experiment's progress.


### Validate resilience score
To validate the resilience score of a completed chaos experiment workflow:

```
$ ./hce-cli generate --api validate-resilience-score --account-id <account-id> --project-id <project-id> --api-key <api-key> --notifyID <notifyID>
```

Replace `<account-id>`, `<project-id>`, `<api-key>`, and `<notifyID>` with the appropriate values for your environment. This command generates an API command to validate the resilience score of the specified workflow.


### Flags
Described below are the flags available for the HCE SAAS API.

* `--api`: Set the name of the target API (mandatory).
* `--account-id`: Set the account ID (mandatory).
* `--project-id`: Set the HCE project ID (mandatory).
* `--workflow-id`: Set the workflow ID (mandatory for some APIs; a default dummy value is provided).
* `--notifyID`: Set the notify ID (mandatory for some APIs; should be derived from the response launch-chaos).
* `--api-key`: Set the API key (mandatory).
* `--file-name`: Set the target file name that contains the API command (mandatory for some APIs; default value provided is hce-api.sh).
* `--delay`: Set the delay provided for multiple iterations (a mandatory value of 2s is provided for some APIs).
* `--timeout`: Set the timeout provided for multiple iterations (a mandatory value of 180s is provided for some APIs).
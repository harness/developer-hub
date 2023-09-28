---
title: Harness CLI Reference
description: Reference doc for all the commands and options available in Harness CLI.
sidebar_position: 3
---

Documentation containing information about all available commands and options within the Harness CLI utility tool.

## Synopsis

```
NAME:
   harness - CLI utility to interact with Harness Platform to manage various Harness modules and its diverse set of resources.

USAGE:
   harness [global options] command [command options] [arguments...]

VERSION:
   development

COMMANDS:
   update, upgrade                 Check for updates and upgrade the CLI
   secret, secret-token            Secrets specific commands. eg: apply (create/update), delete
   service, svc                    Service specific commands, eg: apply (create/update), delete, list
   environment, env                Environment specific commands, eg: apply (create/update), delete, list
   connector, conn                 Connector specific commands, eg: apply (create/update), delete, list
   gitops-application, gitops-app  Gitops application specific commands, eg: apply (create/update), delete, list
   gitops-cluster, gitops-cluster  Gitops Cluster specific commands, eg: apply (create/update), delete, list
   gitops-repository, gitops-repo  Gitops repository specific commands, eg: apply (create/update), delete, list
   infrastructure, infra           Infrastructure specific commands, eg: apply (create/update), delete, list
   pipeline, pipeline              Pipeline specific commands, eg: apply (create/update), delete, list
   login, login                    Login with account identifier and api key.
   account, acc                    Fetch Account details
   help, h                         Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --base-url NG_BASE_URL  provide the NG_BASE_URL for self managed platforms
   --api-key API_KEY       API_KEY for the target account to authenticate & authorise the user.
   --account-id value      provide an Account Identifier of the user
   --load FILE             FILE to load flags from.
   --debug                 prints debug level logs (default: false)
   --json                  log as JSON instead of standard ASCII formatter (default: false)
   --help, -h              show help
   --version, -v           print the version
```

## Description

Setup Harness CD & GitOps in a few commands

## Commands

`harness login`              - Authenticate via the CLI by providing an API token and an Account Identifier.

`harness update`             - Updates the CLI.

`harness secret`             - Creates or deletes a Harness Secret.

`harness connector`          - Creates, deletes or update a Harness Connector.

`harness gitops-repository`  - Creates, deletes or update a GitOps Repository.

`harness gitops-cluster`     - Creates, deletes or update a GitOps Cluster.

`harness gitops-application` - Creates, deletes or update a GitOps Application.

`harness environment`        - Creates, deletes or update a Harness Environment.

`harness infrastructure`     - Creates, deletes or update a Harness Infeastructure.

`harness service`            - Creates, delete or update a Harness Service.

`harness pipeline`           - Creates, delete or update a Harness Pipeline.

## Global Options

`--api-key`    - Accepts a Harness API Token as a value for CLI login.

`--account-id` - Accepts an Account Identifier as a value for CLI login.

`--base-url`   - Specifies the URL of the self-managed Harness instance.

`--debug`      - Prints debug level logs. Defaults to _false_.

`--json`       - Command outputs in JSON format.

`--load`       - Load flags inputs from a file.

`--version`    - Prints the utility version.

`--help`       - Shows a list of commands or help for one command.

<!-- 
## Environment

HARNESS_API_TOKEN - Override the API Token stored in .secrets.json file.

HARNESS_ACCOUNT_ID - Override the Account Id stored in .secrets.json file.
-->

## Files

`~/.secrets.json` - Serves as a repository for credentials, containing the Harness API Token and Account Id..

## Author

The original authorship of the Harness CLI utility tool can be attributed to Harness, Inc.

## License

Harness CLI is released under the terms of the [MIT License](https://github.com/harness/harness-cli/blob/develop/LICENSE).

## See also

- [Install and Configure Harness CLI](./install.md)
- [Harness CLI Examples](./examples.md)

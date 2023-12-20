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

## Global options

`--api-key`    - Accepts a Harness API Token as a value for CLI login.

`--account-id` - Accepts an Account Identifier as a value for CLI login.

`--base-url`   - Specifies the URL of the self-managed Harness instance.

`--debug`      - Prints debug level logs. Defaults to _false_.

`--json`       - Command outputs in JSON format.

`--load`       - Load flags inputs from a file.

`--version`    - Prints the utility version.

`--help`       - Shows a list of commands or help for one command.

## Local APPLY command options

1. `harness secret apply help`

   ```
   NAME:
      harness secret apply - Create a new secret or Update  an existing one.
   
   USAGE:
      harness secret apply [command options] [arguments...]
   
   OPTIONS:
      --secret-type value  provide the secret type.
      --port value         port number for the ssh secret
      --username value     username for the ssh secret
      --passphrase value   passphrase for the ssh secret
      --domain value       domain for cloud data center
      --org-id value       provide an Organization Identifier
      --project-id value   provide a Project Identifier
      --help, -h           show help
   ```

2. `harness connector apply help`

   ```
   NAME:
      harness connector apply - Create a new connector or Update  an existing one.

   USAGE:
      harness connector apply [command options] [arguments...]

   OPTIONS:
      --delegate-name value               delegate name for the k8s connector
      --git-user value                    git username for the github connector
      --aws-cross-account-role-arn value  cross account role arn for the aws connector
      --aws-access-key value              access key for the aws connector
      --aws-secret-Key value              access secret for the aws connector
      --cloud-region value                region for the cloud connector
      --host-ip value                     host ip or fqdn for the physical data center connector
      --port value                        port for the physical data center connector
      --org-id value                      provide an Organization Identifier
      --project-id value                  provide a Project Identifier
      --help, -h                          show help
   ```
   
3. `harness environment apply help`

   ```
   NAME:
      harness environment apply - Create a new environment or Update  an existing one.
   
   USAGE:
      harness environment apply [command options] [arguments...]
   
   OPTIONS:
      --org-id value      provide an Organization Identifier
      --project-id value  provide a Project Identifier
      --help, -h          show help
   ```

4. `harness infrastructure apply help`

   ```
   NAME:
      harness infrastructure apply - Create a new infrastructure or Update  an existing one.
   
   USAGE:
      harness infrastructure apply [command options] [arguments...]
   
   OPTIONS:
      --cloud-project value  provide the Google Cloud Platform project name.
      --cloud-region value   provide the Cloud Platform region name. For eg; 1.Creating GCP pipeline then provide gcp-region name, 2.Creating AWS based pipeline then provide aws-region name
      --instance-name value  instance name for the cloud provider for PDC Infrastructure
      --org-id value         provide an Organization Identifier
      --project-id value     provide a Project Identifier
      --help, -h             show help
   ```

5. `harness service apply help`

   ```
   NAME:
      harness service apply - Create a new service or Update  an existing one.
   
   USAGE:
      harness service apply [command options] [arguments...]
   
   OPTIONS:
      --cloud-project value  provide the Google Cloud Platform project name.
      --cloud-bucket value   provide the Google Cloud Platform bucket name.
      --cloud-region value   provide the Google Cloud Platform bucket name.
      --org-id value         provide an Organization Identifier
      --project-id value     provide a Project Identifier
      --help, -h             show help
   ```

6. `harness gitops-cluster apply help`

   ```
   NAME:
      harness gitops-cluster apply - Create a new gitops-cluster or Update  an existing one.
   
   USAGE:
      harness gitops-cluster apply [command options] [arguments...]
   
   OPTIONS:
      --agent-identifier value  provide GitOps Agent Identifier.
      --org-id value            provide an Organization Identifier
      --project-id value        provide a Project Identifier
      --help, -h                show help
   
   ```

7. `harness gitops-repository apply help`
   
   ```
   NAME:
      harness gitops-repository apply - Create a new gitops-repository or Update  an existing one.
   
   USAGE:
      harness gitops-repository apply [command options] [arguments...]
   
   OPTIONS:
      --agent-identifier value  provide GitOps Agent Identifier.
      --org-id value            provide an Organization Identifier
      --project-id value        provide a Project Identifier
      --help, -h                show help
   
   ```

8. `harness gitops-application apply help`

   ```
   NAME:
      harness gitops-application apply - Create a new gitops-application or Update  an existing one.
   
   USAGE:
      harness gitops-application apply [command options] [arguments...]
   
   OPTIONS:
      --agent-identifier value  provide GitOps Agent Identifier.
      --org-id value            provide an Organization Identifier
      --project-id value        provide a Project Identifier
      --help, -h                show help
   
   ```
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

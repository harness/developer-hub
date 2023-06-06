---
title: Run a pre-flight validation plugin
description: Learn how to run a pre-flight validation plugin to perform pre-install, pre-upgrade, post-install, and post-upgrade checks on your setup. 
# sidebar_position: 5
---

The pre-flight validation plugin allows you to perform pre-install, pre-upgrade, post-install, and post-upgrade checks on your setup. This optional plugin assists with installations and upgrades for Harness Self-Managed Enterprise Edition. You can use the plugin to identify potential issues during deployment and ensure that all requirements are met before the deployment process begins. Suggestions are provided if the requirements are not met and the validation checks fail.

## Requirements

- Helm plugin manager 
- Kubernetes cluster and a namespace

## Install the plugin

Helm plugins are installed using the `helm plugin install <path|url>` command. You can pass in a path to a plugin on your local file system or a URL of a remote VCS repo. The `helm plugin install` command clones or copies the plugin at the path/URL in `$HELM_PLUGINS`.

To install the plugin using the GitHub repository, run the following command:

```
helm plugin install git@github.com:harness/Plugins-helm.git
```

Alternatively, for an [airgapped setup](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-in-an-air-gapped-environment/), you can set the path to the directory where the plugin is downloaded on your system:

First, download validator plugin tar file from the Harness Google Container Registry (GCR), and then run the following command to install the plugin:

```
helm plugin install plugin-directory
```

List the available plugins to ensure that the plugin installed:

```
helm plugin list
```

The output includes the `Validator` plugin in installed plugins.

## Run the plugin

Once the Helm plugin is installed, you can use it by running the following base command:

```
helm validator run 
```

You can add this with the available commands and flags for specific purposes. The namespace flag, specified by `-n`, is required to use the plugin to define where the validations must run.

The following is a list of commands and other flags and their purpose:

```bash
Usage:
  validate [flags]
  validate [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  list        List all available validation files
  run         Run a validation on a given Kubernetes namespace
  
Flags:
  -f, --file string        Path to the YAML validation file
  -h, --help               help for run
  -n, --namespace string   Kubernetes namespace to run the validation on
  -s, --stage              stage to run validations against. pre-upgrade, post-upgrade, pre-install, post-install.
```

Below is an example implementation with commands and corresponding output.

The following command runs the plugin on the `harness-smp1` namespace:

```
helm validator run -n harness-smp1
```

When all checks pass, the output looks similar to the following:

```
Check Harness health ran successfully
Check Minimum Nodes ran successfully
Check Mongo health ran successfully
Check Access-Control health ran successfully
```

When the Mongo Health and Service (access-control) checks fail, the output looks similar to the following:

```yaml
Check Mongo Health:
    - name: Mongo health
      failure: exit status 1
      msg: ""
      info: ""
      suggestions:
        - Mongo replicas are behind the primary. Please make them come in sync before trying the upgrade.
        - ""
        
Check Service Health:
    - name: Access-Control health
      failure: no loadbalancer found in harness-smp1 namespace
      msg: ""
      info: ""
      suggestions:
        - Access-control might not be running successfully. Please restart the pods for access-control.
        - If issue persists, contact harness-support
```

## Permissions

You must have access to the Kubernetes cluster set up to run this plugin. 

## Upgrade the plugin

 You can upgrade the plugin using the following command:

```
helm validator update
```
## Uninstall

You can uninstall the plugin using the following command: 

```
helm validator uninstall
```

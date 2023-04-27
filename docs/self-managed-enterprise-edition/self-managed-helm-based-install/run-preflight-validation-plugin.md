---
title: Run a pre-flight validation plugin
description: Learn how to run a pre-flight validation plugin to perform pre-install, pre-upgrade, post-install, and post-upgrade checks on your setup. 
# sidebar_position: 5
---

The pre-flight validation plugin allows you to perform pre-install, pre-upgrade, post-install, and post-upgrade checks on your setup. This optional plugin assists with installations and upgrades for the Harness Self-Managed Enterprise Edition. You can use the plugin to identify potential issues during deployment and ensure that all requirements are met before the deployment process begins. Suggestions are provided if the requirements are not met and the validation checks fail. You can also use the plugin architecture to build new validation checks for your custom setup.

## Requirements

- Helm plugin manager 
- Kubernetes cluster and a namespace

## Install the plugin

Helm plugins are installed using the $ helm plugin install <path|url> command. You can pass in a path to a plugin on your local file system or a URL of a remote VCS repo. The helm plugin install command clones or copies the plugin at the path/URL given into $HELM_PLUGINS.

To install the plugin using the GitHub repository, run the following command:

```
helm plugin install git@github.com:harness/Plugins-helm.git
```

Alternatively , for an airgapped setup, users can give in the path to the directory where the plugin is installed on their system:

First, download validator plugin tar file from the Harness Google Container Registry (GCR). 

Then to install the plugin, run the following command:

```
helm plugin install plugin-directory
```

List the available plugins to ensure that the plugin has been installed:

```
helm plugin list
```

The output should show the plugin named “Validator” in installed plugins.


## Run the plugin

Once the helm plugin is installed, it is ready to be used by running the following base command:

```
helm validator run 
```

This can be added with the available commands and flags for specific purposes. Out of which the namespace flag, specified by -n, is necessary for using the plugin as it tells where the validations should run.

Information about commands and other flags, how to use them and their purpose is defined as below:

```
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

An example implementation that shows how the command to run and corresponding output would look like for particular cases:

The following command will run the plugin on the namespace: `harness-smp1`

```
helm validator run -n harness-smp1
```

The output would look something like the following in the case that all checks pass:

```
Check Harness health ran successfully
Check Minimum Nodes ran successfully
Check Mongo health ran successfully
Check Access-Control health ran successfully
```

Output that would be displayed in case that the Mongo Health and Service (Access-Control) Health checks fail, with suggestions for the same:


```
Check Mongo Health:
    - name: Mongo health
      failure: exit status 1
      msg: ""
      info: ""
      suggestions:
        - Mongo replicas are much behind the primary. Please make them come in sync before trying the upgrade
        - ""
        
Check Service Health:
    - name: Access-Control health
      failure: no loadbalancer found in harness-smp1 namespace
      msg: ""
      info: ""
      suggestions:
        - Access-control might not be running successfully. Please restart the pods for access-control
        - If issue persists, contact harness-support
```

Permissions
Only the person(s) having access to customer’s Kubernetes cluster setup would be able to run this plugin. 

Validation YAML
The yaml file for the validation will provide all the necessary information about the check that is required to run the 

The validation yaml format that is designed to define all the required parameters for a check:

```
name: "" # name of validation
description: "" # description of validation
weight: 0 # decides the order in which to execute, higher the weight, higher the priority
stage: pre-install/post-install/pre-upgrade/post-upgrade # type of pre-flight validation 
checks: # checks to run under this validation
    - name: "" # name of the check
      id: "" # id of the check
      type: HTTP/KUBERNETES/CUSTOM # type of check
      resource: "" # resource to execute the command on
      args: 
      - “”
      - “”
      expression: "" # boolean expression to evaluate, should decide whether check passed or failed
      suggestions: # list of common suggestions to fix the failure
      - ""
      - ""
```

As an example, here is the YAML file we built for a Kubernetes check to ensure minimum number of nodes are allocated to the cluster: 

```
name: "Check Minimum Nodes" # name of validation
description: "" # description of validation
weight: 0 # decides the order in which to execute, higher the weight, higher the priority
stage: 
  - pre-install #pre-install,pre-upgrade,post-install,post-upgrade
checks: # checks to run under this validation
  - name: "Minimum Nodes" # name of the check
    id: "minnodes" # id of the check
    type: KUBERNETES # see below for each
    resource: "nodes" # resource to execute the command on
    args: 
    - ""
    - ""
    expression: "{{ge (len .items) 3}}" # boolean expression to evaluate, should decide whether check passed or failed
    suggestions: # list of common suggestions to fix the failure
    - "You have less than 3 nodes which are not recommended for high availability. Please provision more nodes"
    - "" 
```

Upgrade
 Updates to the plugin can be done using the following command:

```
helm validator update
```

The helm plugin can also be uninstalled by the following command, in case someone wants to do so: 

```
helm validator upinstall
```

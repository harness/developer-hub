Kubernetes and Helm deployments use service hooks to fetch Helm Chart dependencies that refer to Git and other repositories, and install them with the main Helm Chart.

Harness supports two types of service hooks: preHook and postHook. These are the service hook actions supported by Harness:

- Fetch files: Service hooks can be triggered before or after the manifest files are fetched.
- Manifest templates: Service hooks can be triggered before or after the manifest has been rendered.
- Steady state check: Service hooks can be triggered before or after the steady state check.

Each service hook has its own context variable:

| **Action**         | **Context Variable and Description**                                                                                                                                                                                         |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fetch files        | `$MANIFEST_FILES_DIRECTORY`: The path to the directory from where the manifest files can be downloaded.                                                                                                                      |
| Manifest template  | `$MANIFEST_FILES_DIRECTORY`: The path to the directory where the original Kubernetes template is located. |
| Steady state check | `$WORKLOADS_LIST`: The comma separated list of all workloads. <br />`$MANAGED_WORKLOADS`: The comma separated list of workloads managed by Harness. <br />`$CUSTOM_WORKLOADS`: The comma separated list of custom workloads. |

You can use service hooks to run additional configurations when carrying out the actions above. For example, when you run a deployment, you must fetch files first. After fetching the files, you can resolve the secrets of those encrypted files using Helm secrets, SOPS, AGE keys, and so on. You can use the context variables above during deployment. For more details, go to [Using shell scripts in CD stages](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step).

Here are some sample service hook YAMLs:

```
hooks:
  - preHook:
      identifier: sample
      storeType: Inline
      actions:
        - FetchFiles
        - TemplateManifest
        - SteadyStateCheck
      store:
        content: echo "sample Hook for all action"
```

```
hooks:
  - postHook:
      identifier: dependency
      storeType: Inline
      actions:
        - FetchFiles
      store:
        content: |
          cd $MANIFEST_FILES_DIRECTORY
          helm repo add test-art-remote https://sample.jfrog.io/artifactory/sample-charts/ --username automationuser --password <+secrets.getValue("reposecret")>
          helm dependency build
          cd charts
```

```
hooks:
  - postHook:
      identifier: cdasd
      storeType: Inline
      actions:
        - FetchFiles
      store:
        content: |-
          source $HOME/.profile
          cd $MANIFEST_FILES_DIRECTORY
          echo $MANIFEST_FILES_DIRECTORY
          export SOPS_AGE_KEY=<+secrets.getValue("agesecret")>
          helm secrets decrypt secrets.enc.yaml
          helm secrets decrypt secrets.enc.yaml > secrets.yaml
```

For more information about Helm dependencies, go to [Helm dependency](https://helm.sh/docs/helm/helm_dependency/) and [Helm dependency update](https://helm.sh/docs/helm/helm_dependency_update/).

:::warning
Harness does not support **Helm hooks** for Helm **Blue-Green** and **Canary** deployments.
:::
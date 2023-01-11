# Kubernetes Apply Step

- The Kubernetes apply step allows users to apply specific kuberntes manifest files within their Kubernetes Service's Manifest Repository.

- The Kubernetes Apply step requires a Kubernetes Infrastructure and a Kubernetes Service in order to be used

- User's can configure various options on the step in order to tweak the behavior of the step

- The Behavior for the step:
    1. The step will fetch the kuberntes manifests from the Service defined repository
    2. Harness will use Go Templating to render in the values.yaml into the selected files and render the K8s Manifests for preview in the Logs
    3. Harness will do a Dry Run to show the user what resources are about to be created
    4. Harness will Apply the resources to the Kubernetes cluster
    5. Harness will check for resource to reach steady state - meaning the pods will be healthy and up and running in the cluster.
    6. Harness will print a summary of the resources applied in the logs for the user to review.

- In the event of Deployment Failure, Harness will not rollback the Apply step action because we don't have a record of it's state when we perform the apply. We recommend users defining in the Rollback Section of the Stage to undo the Apply Steps Action. We will rollback any infrastructure or deployments that happened prior to the step.

### Kubernetes Apply Step Options

- `SkipDryRun` - this options allows users to skip the dry run for the Kubernetes Manifests that are about to be applied. Harness will run `kubectl apply -f <userProvidedFiles>` rather than `kubectl apply -f <userProvidedFiles> --dry-run`
- `SkipSteadyStateCheck` - By default, Harness checks to see if a deployed workload has reached steady state. If you select this option, Harness will not check that the workload has reached steady state.
- `Skip K8s Manifest(s) Rendering` - This option will skip printing out the kubernetes manifests with the rendered values in the Harness execution logs. Harness will go directly to the apply command after fetching the files. No Preview for the user.
- `Override Values` - Users' can provide values.yamls to be Go Templated in to the provided manifest files. This is great when your trying to apply configuration for a specific file or reapply configuration with different parameters.
- `CommandFlags` - In the **Advanced** Section, User's can append flags after the `kubectl apply -f <+filename>` command. Command flags option availability is based on the version of the kubectl binary that is installed on the delegate. (i.e. `kubectl apply -f <filename> --server-side` is only available on kubectl version 1.22) For options please review the [Kubernetes Documentation on Apply](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#apply)


#### Note: The step DOES NOT SUPPORT Kubernets Apply subcommands when using commandFlags

```TEXT
kubectl apply view-last-applied - just return the current value of last-applied annotation
kubectl apply set-last-applied - will set the manifest.yaml as value for annotation last applied, doesn't actually trigger any changes in the deployment itself
kubectl apply edit-last-applied - require input from the user as opens value of last-applied annotation in editor
```

#### Kubernetes Apply Step YAML Snippet

```YAML
          - step:
              type: K8sApply
              name: Apply DB Migration Job
              identifier: Apply_DB_Migration_Job
              spec:
                filePaths:
                  - database-migration.yaml
                skipDryRun: false
                skipSteadyStateCheck: true
                skipRendering: false
                commandFlags: 
                  - commandType: Apply
                    flag: "--dry-run=true --server-side"
                overrides:
                  - manifest:
                      identifier: DBValues
                      type: Values
                      spec:
                        store:
                          type: Github
                          spec:
                            connectorRef: account.ThisRohanGupta
                            gitFetchType: Branch
                            paths:
                              - migration-values.yaml
                            repoName: Product-Management
                            branch: "main"
              timeout: 10m
              failureStrategies:
                - onFailure:
                    errors:
                      - AllErrors
                    action:
                      type: Retry
                      spec:
                        retryCount: 3
                        retryIntervals:
                          - 2s
                        onRetryFailure:
                          action:
                            type: StageRollback
```

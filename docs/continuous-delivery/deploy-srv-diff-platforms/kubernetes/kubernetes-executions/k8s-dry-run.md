---
title: Perform a Kubernetes dry run
description: Test your manifests before deployment.
sidebar_position: 9
---


This topic discusses how to set up the Dry Run step for a Kubernetes deployment.

The Dry Run step fetches the Kubernetes manifests or Helm charts in a stage and performs a dry run of those resources. This is the same as running a `kubectl apply --filename=manifests.yaml --dry-run`.

You can use the Dry Run step to check your manifests before deployment. You can follow the step with an [Approval](/docs/category/approvals/) step to ensure the manifests are valid before deployment.

You can reference the resolved manifest from the Dry Run step in subsequent steps using a Harness variable expression.

```
<+pipeline.stages.[Stage_Id].spec.execution.steps.[Step_Id].k8s.manifestDryRun>
```

:::note

When Harness performs a deployment, it compiles all values YAML files and manifests in the stage as a single manifest and applies it. The Dry Run step performs the dry run using this compiled manifest.

:::

## Limitations

- The Dry Run step's resolved manifests are stored in the Harness cloud. There is a storage limit of 5MB per Dry Run step execution.
- **Service hooks:** The Dry Run step only supports FetchFiles hooks (pre and post). Other hook types such as TemplateManifest and SteadyStateCheck do not execute during a Dry Run.

## Add the Dry Run step

You add the Dry Run step before the deployment step(s) in your stage (such as the Apply, Rolling, Canary, Blue Green deployment steps). 

You can add an [Approval](/docs/category/approvals/) step after the Dry Run step to have a Harness user(s) validate the manifest output before deployment.

For example, here is a stage with a Dry Run step followed by an Approval step and subsequent Rolling Deployment step.

![Dry Run step configuration](static/k8s-dry-run-step-config.png)

To add the Dry Run step, do the following:


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="Visual" label="Visual" default>


1. In the CD stage **Execution**, select **Add Step**.
2. Select the **Dry Run** step.
3. Enter a name for the step.
4. (Optional) Enable **Encrypt Yaml Output** if you want the entire step output to be treated as a Harness secret. For more details on how this affects secret masking, go to [Secret masking in Dry Run output](#secret-masking-in-dry-run-output).
5. In **Timeout**, enter how long this step should run before failing and initiating the step or stage [failure strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps).

    You can use:

   - `w` for weeks.
   - `d` for days.
   - `h` for hours.
   - `m` for minutes.
   - `s` for seconds.
   - `ms` for milliseconds.

   The maximum is `53w`.

   Timeouts can be set at the pipeline-level also, in the pipeline **Advanced Options**.
6. Select **Apply Changes**.

The Dry Run step is ready.


</TabItem>
  <TabItem value="YAML" label="YAML">


1. In **Pipeline Studio**, select **YAML**.
2. Paste the following YAML example and select **Save**:

```yaml
              - step:
                  type: K8sDryRun
                  name: Output Service Manifests
                  identifier: OutputService
                  spec:
                    encryptYamlOutput: false
                  timeout: 10m
```

Set `encryptYamlOutput` to `true` to treat the entire manifest output as a Harness secret. For more details on how this affects secret masking, go to [Secret masking in Dry Run output](#secret-masking-in-dry-run-output).


</TabItem>
</Tabs>


---

## Configure command flags

You can pass additional flags to the `kubectl apply --dry-run` command executed during the Dry Run step. This allows you to control how kubectl validates and processes your manifests before deployment.

Command flags are useful when you need the dry run behavior to match your actual deployment configuration. For example, if your deployment uses server-side apply with conflict resolution, you can pass the same flags to the Dry Run step to ensure the validation reflects what will actually happen during deployment.

Use command flags to:

- Test manifests with server-side apply semantics before deployment.
- Pass strict validation flags to catch schema errors before deployment reaches approval gates.
- Control how kubectl handles field conflicts during manifest validation.
- Align the dry run validation with the exact kubectl command flags used in your deployment steps.

Use command flags when you need to:

- Test manifests with server-side apply semantics before deployment. Server-side apply is the modern kubectl mode where the API server handles field ownership rather than the client. If your deployment uses `--server-side` and `--force-conflicts`, pass the same flags to the Dry Run step so the validation output matches the actual deployment behavior.
- Pass strict validation flags to catch schema errors before deployment reaches approval gates.
- Control how kubectl handles field conflicts during manifest validation.
- Align the dry run validation with the exact kubectl command flags used in your deployment steps.

### Add command flags

<Tabs>
  <TabItem value="Visual" label="Visual" default>

To add command flags in the visual editor:

1. In the Dry Run step, go to the **Advanced** tab.
2. In the **Command Flags** section, select **Add Command Flag**.
3. In the **Command Type** dropdown, select **Apply**.
4. In the **Flag** field, enter the kubectl flags you want to pass, separated by spaces (for example, `--server-side --force-conflicts`).
5. Select **Apply Changes**.

![Command Flags configuration](static/k8s-dry-run-command-flags.png)

</TabItem>
  <TabItem value="YAML" label="YAML">

Add command flags directly in your pipeline YAML:

```yaml
- step:
    type: K8sDryRun
    name: Dry Run with Command Flags
    identifier: DryRun_1
    spec:
      encryptYamlOutput: false
      commandFlags:
        - commandType: Apply
          flag: "--server-side --force-conflicts"
    timeout: 10m
```

</TabItem>
</Tabs>

### Supported flags

You can pass any valid kubectl flag that works with the `kubectl apply` command. Common flags include:

- `--server-side`: Use server-side apply semantics. The API server handles field ownership and merging rather than the client.
- `--force-conflicts`: Force apply when field conflicts occur. This resolves ownership conflicts by forcefully taking ownership of fields.
- `--validate=strict`: Use strict validation mode. This catches more schema errors than the default validation.
- `--dry-run=server`: Perform server-side dry run instead of client-side. The server validates the request against the current cluster state.

Go to the [kubectl apply documentation](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#apply) to view all available flags.

### Use expressions with command flags

Command flags support Harness runtime expressions and runtime inputs. This allows you to set flag values dynamically at execution time or use pipeline variables to control dry run behavior across environments.

For example, you can use a pipeline variable to control the validation mode:

```yaml
- step:
    type: K8sDryRun
    name: Dry Run with Expression
    identifier: DryRun_1
    spec:
      commandFlags:
        - commandType: Apply
          flag: "<+pipeline.variables.validationMode>"
    timeout: 10m
```

You can also use runtime inputs to let users provide flags at pipeline execution:

```yaml
- step:
    type: K8sDryRun
    name: Dry Run with Runtime Input
    identifier: DryRun_1
    spec:
      commandFlags:
        - commandType: Apply
          flag: <input>
    timeout: 10m
```

This flexibility is useful when multiple teams share a common pipeline template but need different dry run behaviors for their specific deployment requirements.

**Example: Server-side apply with conflict resolution**

<details>
<summary>Pipeline workflow with server-side apply validation</summary>

When using server-side apply in your deployments, pass the same flags to the Dry Run step to ensure accurate validation:

```yaml
- step:
    type: K8sDryRun
    name: Validate Server-Side Apply
    identifier: ValidateSSA
    spec:
      encryptYamlOutput: false
      commandFlags:
        - commandType: Apply
          flag: "--server-side --force-conflicts"
    timeout: 10m
- step:
    type: HarnessApproval
    name: Review Manifests
    identifier: ReviewManifests
    spec:
      approvalMessage: Review the dry run output before deployment
      approvers:
        userGroups:
          - devops_team
    timeout: 1d
- step:
    type: K8sApply
    name: Apply Manifests
    identifier: ApplyManifests
    spec:
      commandFlags:
        - commandType: Apply
          flag: "--server-side --force-conflicts"
    timeout: 10m
```

In this example, the Dry Run step validates manifests with the same server-side apply flags that will be used during the actual deployment. The approval gate uses the dry run output to verify the deployment will succeed with the expected conflict resolution behavior.

</details>

---


## Secret masking in Dry Run output

By default, the Dry Run step masks sensitive values in the rendered manifest output. When your service manifests include Kubernetes `Secret` resources, Harness replaces the values inside the `data` field with a masked placeholder. The masked value appears as `Kioq`, which is the Base64-encoded form of `***`.

For example, if your Secret manifest contains a `data` field like `password: cGFzc3dvcmQxMjM=`, the Dry Run step output will instead show `password: Kioq`. Other resource types such as Deployments, ConfigMaps, and Services are rendered as-is without masking.

This default masking prevents accidental exposure of sensitive data in step logs and the Harness UI while still producing a structurally valid Kubernetes manifest.

### Encrypt Yaml Output

The Dry Run step includes a **Encrypt Yaml Output** toggle that changes how the step handles secret masking. When this option is enabled, Harness does **not** mask individual secret values during manifest rendering. Instead, it marks the entire step output as a Harness secret.

With this toggle enabled:

- The rendered manifest retains the original secret values (no per-field masking).
- The entire `manifestDryRun` step output is marked as a secret, so it displays as `***` in the Harness UI and logs.
- You can still reference the output using the Harness expression in subsequent steps, and the expression resolves to the full, unmasked manifest at runtime.

```
<+pipeline.stages.[Stage_Id].spec.execution.steps.[Step_Id].k8s.manifestDryRun>
```

This is useful when downstream steps need access to the complete, unmasked manifest for processing, while still ensuring the raw output is not visible in the pipeline execution UI.

## Step output example

When you run the pipeline, the output of the Dry Run step indicates that the manifest was applied as a dry run using `(dry run)`:

```Sh
Validating manifests with Dry Run
kubectl --kubeconfig=config apply --filename=manifests-dry-run.yaml --dry-run=client
namespace/dev created (dry run)
configmap/nginx-k8s-config created (dry run)
service/nginx-k8s-svc created (dry run)
deployment.apps/nginx-k8s-deployment created (dry run)

Done.
```

When command flags are configured, they appear in the kubectl command output:

```Sh
Validating manifests with Dry Run
kubectl --kubeconfig=config apply --filename=manifests-dry-run.yaml --dry-run --server-side --force-conflicts
namespace/dev configured (server dry run)
configmap/nginx-k8s-config configured (server dry run)
service/nginx-k8s-svc configured (server dry run)
deployment.apps/nginx-k8s-deployment configured (server dry run)

Done.
```

## Using the Dry Run step output in other steps

You can reference the resolved dry run manifest from the Dry Run step using this Harness expression:

```
<+pipeline.stages.[Stage_Id].spec.execution.steps.[Step_Id].k8s.manifestDryRun>
```

For example, if the stage Id is `Deploy` and the Dry Run step Id is `Dry_Run` the expression would be:

```
<+pipeline.stages.Deploy.spec.execution.steps.Dry_Run.k8s.manifestDryRun>
```

Another example is to use a Harness [Shell Script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step) to perform logic using `kubectl diff`:

```
cat << 'EOM' > manifest.yaml
<+pipeline.stages.Deploy.spec.execution.steps.Dry_Run.k8s.manifestDryRun>
EOM
cat manifest.yaml
echo "K8s client/server version:"
kubectl version --output yaml
echo "K8s manifest diff:"
# kubectl diff exist codes: 0 - no diff, 1 - there is a diff, 2 - something is wrong
# Since exit code 1 is failure, make will always fail if there is a diff, so code modification required
kubectl -n <+env.variables.DEPLOY_ENV> diff -f manifest.yaml || (st=$?; if [ $st = 1 ]; then exit 0; else echo $st; exit $st; fi)
```

:::warning
If you do not quote the ('`EOM`'), any variables and commands within the block will be substituted.
:::


You can enter the expression in subsequent steps such as the [Shell Script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step) or [Approval](/docs/category/approvals/) steps.


## Dry Run steps and Skip Dry Run settings

The Apply, Rolling, Canary, and Blue Green deployment steps include a **Skip Dry Run** setting.


By default, Harness uses the `--dry-run` flag on the `kubectl apply` command for all these steps. If the **Skip Dry Run** setting is selected, Harness will not use the `--dry-run` flag.

The **Skip Dry Run** setting is different from the Dry Run step. The Dry Run step only performs a dry run. The Dry Run step does not impact whether or not a deployment step performs a dry run.


## Using the Dry Run with a Native Helm Deployment

When using the Dry Run step with a native Helm deployment, Harness will run a Helm template and render the manifests. In the  Dry Run step log you will see something like this:

```
KUBECONFIG=/opt/harness-delegate/repository/k8s/7d800125-18f7-3ad9-9db4-a32ec8876c3e/config /opt/harness-delegate/client-tools/helm/v3.12.0/helm template release-10b758 /opt/harness-delegate/repository/k8s/7d800125-18f7-3ad9-9db4-a32ec8876c3e/manifest-files/nginx-ingress-controller  --namespace dev  -f values-0.yaml
```

The above will run the Helm template against the manifests fetched. After running the Helm template, Harness will then perform the dry run on the templated and rendered manifest resources.

```
Validating manifests with Dry Run
kubectl --kubeconfig=config apply --filename=manifests-dry-run.yaml --dry-run=client
configmap/release-10b758-nginx-ingress-controller-default-backend created (dry run)
serviceaccount/release-10b758-nginx-ingress-controller created (dry run)
clusterrole.rbac.authorization.k8s.io/release-10b758-nginx-ingress-controller created (dry run)
clusterrolebinding.rbac.authorization.k8s.io/release-10b758-nginx-ingress-controller created (dry run)
role.rbac.authorization.k8s.io/release-10b758-nginx-ingress-controller created (dry run)
rolebinding.rbac.authorization.k8s.io/release-10b758-nginx-ingress-controller created (dry run)
service/release-10b758-nginx-ingress-controller created (dry run)
service/release-10b758-nginx-ingress-controller-default-backend created (dry run)
deployment.apps/release-10b758-nginx-ingress-controller created (dry run)
deployment.apps/release-10b758-nginx-ingress-controller-default-backend created (dry run)
ingressclass.networking.k8s.io/nginx created (dry run)
```




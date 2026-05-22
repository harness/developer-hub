import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness IaCM supports reviewing infrastructure changes via pull request automation. This functionality allows developers to see the changes, such as the plan details, as comments in the PR, so they can see what the resource changes will be before applying the plan. Additionally, Harness IaCM also supports [Open Policy Agent (OPA)](https://developer.harness.io/docs/infra-as-code-management/policies-governance/opa-workspace) for more advanced policy enforcement.  

---

## Create a PR pipeline

<Tabs>
<TabItem value="interactive" label="Interactive guide">

Create a pipeline similar to the way described in the [provision workspace topic](/docs/infra-as-code-management/workspaces/provision-workspace), and select **Pull Request** as the operation.

<DocVideo src="https://app.tango.us/app/embed/58b67758-f36c-410c-8ea4-99236bb01235?defaultListView=false&hideAuthorAndDetails=true&makeViewOnly=true&skipBranding=false&skipCover=true" title="Create a PR pipeline" />

</TabItem>
<TabItem value="step-by-step" label="Step-by-step">

1. Sign in to [app.harness.io](https://app.harness.io) and select the **Infrastructure** module from the module pane.
2. Create a PR pipeline. Create a pipeline similar to the way described in the [provision workspace guide](/docs/infra-as-code-management/workspaces/provision-workspace), and select **Pull Request** as the operation.

</TabItem>
</Tabs>

---

## Create a pipeline trigger

<Tabs>
<TabItem value="interactive" label="Interactive guide">

<DocVideo src="https://app.tango.us/app/embed/d2e2b039-0fd6-46f3-b271-ba4d14c8b8a7?defaultListView=false&hideAuthorAndDetails=true&makeViewOnly=true&skipBranding=false&skipCover=true" title="Create a Pipeline trigger" />

</TabItem>
<TabItem value="step-by-step" label="Step-by-step">

1. After saving the pipeline, select **Trigger**, and then add a new trigger.
2. Select a **Webhook** trigger with the same connector as the workspace it is configured with.
3. Fill in the following details:
   - **Trigger name:** Add a name for the trigger.
   - **Connector**: Select the same one your workspaces are using.
   - **Event:** Select **Pull Request**.
   - **Actions:** Select **Any Actions** or specific actions from which you want the PR pipeline to be triggered.
   - Select **Continue**.
4. On the second page of the trigger editor, you can specify that the trigger should only be activated when files within a certain folder are changed, for example, the trigger activates only if the PR affects files in the `terratest/examples/` folder.

</TabItem>
</Tabs>

## Review plan output in pull requests

Once the trigger is defined, create a PR in your git repository. You will see the trigger activation on the **Trigger** tab:

![Trigger activation](../static/trigger.png)

You will see the plan as a comment in the PR:

![Plan output as PR comment](../static/pr-comment.png)

:::info Security measure for public repositories
As a security measure, comments will not be populated if the repository is public. To override it, add the Environment Variable `HARNESS_PASSWORD_API` with the git repository token or secret set as the value.
:::

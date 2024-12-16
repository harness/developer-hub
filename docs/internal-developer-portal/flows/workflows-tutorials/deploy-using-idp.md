---
title: Deploy Kubernetes Service Using Workflows
description: Use workflows for Kubernetes Workflow
sidebar_position: 2
---

<DocsTag  backgroundColor= "#cbe2f9" text="Tutorial"  textColor="#0b5cad"  />

In this tutorial we will use a IDP Workflow to deploy a Kubernetes Service. We will guide you through deploying a Guestbook application using Workflows powered by Harness CD pipeline. This Guestbook application uses a publicly available Kubernetes manifest and Docker image.

## Before you begin 

Kubernetes is required to complete these steps. Run the following to check your system resources and (optionally) install a local cluster.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/harness-community/scripts/main/delegate-preflight-checks/cluster-preflight-checks.sh)
```

Verify that you have the following:

1. **Obtain GitHub personal access token with the repo scope**. See the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
2. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness Delegates and deploying a sample application in a local development environment.
   - Check [Delegate system requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).
3. **Install the [Helm CLI](https://helm.sh/docs/intro/install/)** in order to install the Harness Helm delegate.
4. **Fork the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub website.
   - For details on Forking a GitHub repository, go to [GitHub docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) for more information on forking a GitHub repository.

## Getting Started with Harness CD 

1. Log in to [Harness](https://app.harness.io/).
2. Select **Projects**, and then select **Default Project**.

:::warning

For the pipeline to run successfully, please follow the remaining steps as they are, including the naming conventions.

:::

### Delegate

1.  Under **Project Setup**, select **Delegates**.

    - Select **New Delegate**.

          For this tutorial, let's explore how to install a delegate using Helm.

      - Add the Harness Helm chart repo to your local helm registry using the following commands.

      ```bash
      helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
      ```

      - Update the repo:

      ```bash
      helm repo update harness-delegate
      ```

      - In the example command provided, `ACCOUNT_ID` and `MANAGER_ENDPOINT` are auto-populated values that you can obtain from the delegate installation wizard.
      - Copy the command as shown in the installation wizard, which is of the format of the example mentioned below and run in your terminal.

      ```bash
      helm upgrade -i helm-delegate --namespace harness-delegate-ng --create-namespace \
      harness-delegate/harness-delegate-ng \
       --set delegateName=helm-delegate \
       --set accountId=ACCOUNT_ID \
       --set managerEndpoint=MANAGER_ENDPOINT \
       --set delegateDockerImage=harness/delegate:23.03.78904 \
       --set replicas=1 --set upgrader.enabled=false \
       --set delegateToken=DELEGATE_TOKEN
      ```

      - Select **Verify** to verify that the delegate is installed successfully and can connect to the Harness Manager.

:::note

You can also follow the [Install Harness Delegate on Kubernetes or Docker](/docs/platform/get-started/tutorials/install-delegate) steps to install the delegate using the Harness Terraform Provider or a Kubernetes manifest.

:::

### Secrets


1. Under **Project Setup**, select **Secrets**.
   - Select **New Secret**, and then select **Text**.
   - Enter the secret name `harness_gitpat`.
   - For the secret value, paste the GitHub personal access token you saved earlier.
   - Select **Save**.

### Connectors

1. Create the **GitHub connector**.
   - Copy the contents of [github-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/github-connector.yml).
   - In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
   - Select **Create via YAML Builder** and paste the copied YAML.
   - Assuming you have already forked the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository mentioned earlier, replace **GITHUB_USERNAME** with your GitHub account username in the YAML.
   - In `projectIdentifier`, verify that the project identifier is correct. You can see the Id in the browser URL (after `account`). If it is incorrect, the Harness YAML editor will suggest the correct Id.
   - Select **Save Changes** and verify that the new connector named **harness_gitconnector** is successfully created.
   - Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful.
2. Create the **Kubernetes connector**.
   - Copy the contents of [kubernetes-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/kubernetes-connector.yml).
   - In your Harness project, under **Project Setup**, select **Connectors**.
   - Select **Create via YAML Builder** and and paste the copied YAML.
   - Replace **DELEGATE_NAME** with the installed Delegate name. To obtain the Delegate name, navigate to **Project Setup**, and then **Delegates**.
   - Select **Save Changes** and verify that the new connector named **harness_k8sconnector** is successfully created.
   - Finally, select **Connection Test** under **Connectivity Status** to verify the connection is successful.

### Environment

1. In your Harness project, select **Environments**.
   - Select **New Environment**, and then select **YAML**.
   - Copy the contents of [environment.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/environment.yml), paste it into the YAML editor, and select **Save**.
   - In your new environment, select the **Infrastructure Definitions** tab.
   - Select **Infrastructure Definition**, and then select **YAML**.
   - Copy the contents of [infrastructure-definition.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/infrastructure-definition.yml) and paste it into the YAML editor.
   - Select **Save** and verify that the environment and infrastructure definition are created successfully.

### Services

1. In your Harness project, select **Services**.
   - Select **New Service**.
   - Enter the name `harnessguestbook`.
   - Select **Save**, and then **YAML** (on the **Configuration** tab).
   - Select **Edit YAML**, copy the contents of [service.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/service.yml), and paste it into the YAML editor.
   - Select **Save**, and verify that the service **harness_guestbook** is successfully created.

### Pipeline

- In **Default Project**, select **Pipelines**.
  - Select **New Pipeline**.
  - Enter the name `guestbook_canary_pipeline`.
  - Select **Inline** to store the pipeline in Harness.
  - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
  - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.

1. Copy the contents of [canary-pipeline.yml](https://github.com/harness-community/idp-samples/blob/main/idp-pipelines/tutorial-cd-guestbook.yaml).
2. In your Harness pipeline YAML editor, paste the YAML.
3. Select **Save**.

   You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

   <DocImage path={require('./static/canary.png')} width="60%" height="60%" title="Click to view full size image" />

:::info

In the pipeline YAML, we have included `service`, `environment`, and `infrastructure` as variables to be defined using Workflows.

:::

## Create a Workflow

Now that our pipeline is ready to execute when a project name and a GitHub repository name are provided, let's create the UI counterpart of it in IDP. Create a `workflow.yaml` file anywhere in your Git repository. 

In the following `workflow.yaml` we have added defaults for the `service`, `environment` and `infrastructure`. 

```YAML
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: harness_iac
  title: Deploy a Kubernetes Service
  description: Uses Harness CD to deploy a kubernetes service.
spec:
  owner: cd_team
  type: environment
  parameters:
    - title: Project and Repo Details
      required:
        - service
        - environment
        - infrastructure
      properties:
        service:
            title: Choose the service
            description: The service you want to deploy
            type: string
            default: "harnessguestbook" # Guestbook service to be used
        environment:
            title: Choose the environment
            description: The environment to deploy to (e.g., dev, staging, prod)
            type: string
            default: "harnessdevenv" # Environment you created for the pipeline
        infrastructure:
            title: Choose the infrastructure
            description: The infrastructure to deploy to (e.g., AWS, GCP, Azure)
            type: string
            default: "AWS" # Default infrastructure value
        token:
          title: Harness Token
          type: string
          ui:widget: password
          ui:field: HarnessAuthToken
  steps:
    - id: trigger
      name: Deploy your Application
      action: trigger:harness-custom-pipeline
      input:
        url: YOUR PIPELINE URL HERE
        inputset:
          pipeline.variables.service: ${{ parameters.service }}
          pipeline.variables.infrastructure: ${{ parameters.infrastructure }}
          pipeline.variables.environment: ${{ parameters.environment }}
        apikey: ${{ parameters.token }}
  output:
    links:
      - title: Pipeline Details
        url: ${{ steps.trigger.output.PipelineUrl }}
```

Replace the `YOUR PIPELINE URL HERE` with the pipeline URL that you created.

![](./static/copy-pipeline-url.png)

### Authenticating the Request to the Pipeline

The Workflow contains a single action which is designed to trigger the pipeline you created via an API call. Since the API call requires authentication, Harness has created a custom component to authenticate based of the logged-in user's credentials.

The following YAML snippet under `spec.parameters.properties` automatically creates a token field without exposing it to the end user.

```yaml
token:
  title: Harness Token
  type: string
  ui:widget: password
  ui:field: HarnessAuthToken
```

That token is then used as part of `steps` as `apikey`

```yaml
  steps:
    - id: trigger
      name: ...
      action: trigger:harness-custom-pipeline
      input:
        url: ...
        inputset:
          key: value
          ...
        apikey: ${{ parameters.token }}
```

### Register the Workflow in IDP

Use the URL to the `workflow.yaml` created above and register it by using the same process for [registering a new software component](/docs/internal-developer-portal/get-started/register-a-new-software-component).


### Use the Self Service Workflows

Finally, it's time to execute your Workflow. Every execution leads to a deployment.

1.  Navigate to the **Workflows** page in IDP. You will see the newly created Workflow appear. Click on **Choose**, fill in the form, click **Next Step**, then **Create** to trigger the automated pipeline

    - Observe the execution logs as Harness deploys the workload and checks for steady state.
    - After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

      ```bash
      kubectl get pods -n default
      ```

    - To access the Guestbook application deployed by the Harness pipeline, port forward the service and access it at [http://localhost:8080](http://localhost:8080)
      ```bash
      kubectl port-forward svc/guestbook-ui 8080:80
      ```

### Congratulations!🎉

You've just learned how to use Harness IDP Workflows to deploy an application.


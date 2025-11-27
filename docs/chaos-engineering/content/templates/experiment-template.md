**Experiment Templates** allow you to create reusable experiment templates that can be shared and used across multiple projects.

![experiment templates](./static/experiment-templates/exp-template.png)

## Creating Experiment Templates

1. Navigate to **ChaosHubs** in your **Project Settings**

    ![chaos hubs](./static/templates/chaos-hub.png)

2. Choose the **ChaosHub** you want to create Experiment template in.

    ![chaos hub](./static/templates/click-on-chaoshub.png)

3. Navigate to **Experiment Templates** and click on **New Experiment Template** and start creating the template.

## Using Experiment Templates

You can use experiment templates in two ways:

### Option 1: From ChaosHub

1. Go back to the **ChaosHub** you created the template in.

2. Choose the **Experiment Template** you created and click **Create Experiment**.

    ![create experiment](./static/experiment-templates/create-experiment.png)

3. Select your **Infrastructure**, in the next screen and click **Create**.

    ![create experiment](./static/experiment-templates/select-infra.png)

4. That's it. Now, you can start building your experiment using the template you created.

### Option 2: From Experiments Page

1. Navigate to **Chaos Experiments** page in your project.

2. Click **New Experiment** and select **Create from template** option.

    ![create experiment](./static/experiment-templates/create-experiment-from-template.png)

3. In the **Select an Experiment Template** modal, browse through available templates. You can filter templates by scope using the tabs (**All**, **Project**, **Organization**, **Account**) and apply additional filters like **Infrastructure type**, **Tag(s)**, or **ChaosHub**.

    ![select experiment template](./static/experiment-templates/select-experiment-template.png)

4. Select the experiment template you want to use and click **Create Experiment**.

5. In the creation dialog, provide the experiment details:
   - **Name**: Enter a name for your experiment
   - **Description** (optional): Add a description
   - **Tags** (optional): Add tags for organization
   - **Organization** and **Project**: Select the appropriate values
   - **Infrastructure**: Select a Chaos Infrastructure

    ![create experiment from template-2](./static/experiment-templates/create-experiment-from-template-2.png)

6. Click **Create** to create the experiment from the template.




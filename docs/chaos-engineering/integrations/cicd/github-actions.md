---
title: Run chaos experiments using GitHub Actions
sidebar_position: 2
description: Guide to run a chaos experiment using GitHub Actions
redirect_from:
  - /docs/chaos-engineering/integrations/experiment-as-github-action
---

# Run chaos experiments using GitHub Actions

This tutorial explains how you can run Harness chaos experiments using GitHub Actions.

1. [Create a chaos experiment in the Harness Chaos Engineering module](/docs/chaos-engineering/guides/experiments/create-experiments). Execute this experiment to verify the configuration and ensure that the resilience probes are working as expected. The experiment ID and resilience score determined from this experiment run will be used to integrate the experiment with GitHub Actions.

   ![chaos experiment with ID and resilience score](./static/chaos-experiments-with-id.png)

- You will need the account scope details such as ACCOUNT_ID, ORG_ID, PROJECT_ID, and CHAOS_EXPERIMENT_ID. You can get these values from your session URL.
For example,

```
https://app.harness.io/ng/#/account/**JxE3EzyXSmWugTiJV48n6K**/chaos/orgs/**default**/projects/**default_project**/experiments/**d7c9d243-0219-4f7c-84g2-3004e59e4605**
```

- The strings marked in asterisk are the account ID, org ID, project ID, and chaos experiment IDs respectively.

- From your account profile page, generate an API key and copy it to a safe location (you will need it as a GitHub secret).

:::tip
- To set secrets in GitHub Actions, go to your repository's Settings > Secrets and variables > Actions > New repository secret.
- Make sure to add the following secrets:
  - `HARNESS_API_KEY`: Your Harness API key
:::

:::tip
- To set variables in GitHub Actions, go to your repository's Settings > Secrets and variables > Actions > New repository variables.
- Make sure to add the following variables:
  - `HARNESS_EXPECTED_RES_SCORE`: Your expected resilience score
  - `HARNESS_EXPERIMENT_ID`: Your Harness Chaos experiment ID
  - `HARNESS_ACCOUNT_ID`: Your Harness account ID
  - `HARNESS_ORG_ID`: Your Harness organization ID
  - `PROJECT_ID`: Your Harness project ID
:::


2. Create a GitHub Actions workflow file. Create a `.github/workflows` directory in your repository if it doesn't exist, and add a new workflow file (e.g., `chaos-experiment.yml`) or add it in your existing workflow file.

Here's a sample workflow file:

```yaml
name: Harness Chaos
on:

  push:
    branches: [ "main" ]

  workflow_dispatch:

jobs:

  harness-chaos:
    runs-on: ubuntu-latest
    env:
      ACCOUNT_ID: ${{ vars.HARNESS_ACCOUNT_ID }}
      ORG_ID: ${{ vars.HARNESS_ORG_ID }}
      PROJECT_ID: ${{ vars.HARNESS_PROJECT_ID }}
      EXPERIMENT_ID: ${{ vars.HARNESS_EXPERIMENT_ID }}
      EXPECTED_RES_SCORE: ${{ vars.HARNESS_EXPECTED_RES_SCORE }}
      API_KEY: ${{ secrets.HARNESS_API_KEY }}
    steps:

      - name: Configure harness hce-cli
        run: |
          curl -sL https://app.harness.io/public/shared/tools/chaos/hce-cli/0.0.8/hce-cli-0.0.8-linux-amd64 -o hce-cli
          chmod +x hce-cli
          mv hce-cli /usr/local/bin/
    
      - name: Trigger Harness Chaos Experiment and monitor
        run: |
          hce-cli config create --name "my-config-1" --interactive=false
          hce-cli experiment run --account-id="$ACCOUNT_ID" --org-id="$ORG_ID" --project-id="$PROJECT_ID" --experiment-id="$EXPERIMENT_ID" --api-key="$API_KEY" --expected-res-score="$EXPECTED_RES_SCORE" --timeout 300  --interactive=false --monitor=true
```

3. The workflow above does the following:
   - Can be triggered by pushing to the main branch or manually through workflow_dispatch
   - Sets up environment variables from GitHub Variables and Secrets
   - Downloads and installs the HCE CLI
   - Runs and monitors the chaos experiment with specified parameters:
     - Account ID, Organization ID, and Project ID
     - Experiment ID and expected resilience score
     - 300-second timeout
     - Non-interactive mode with monitoring enabled

:::tip
The workflow uses GitHub Variables for configuration values and GitHub Secrets for sensitive data like API keys, making it secure and easy to maintain.
:::

4. To use this workflow:
   1. Add the workflow file to your repository's `.github/workflows` directory
   2. Configure the required secret in your repository settings:
      - `HARNESS_API_KEY`: Your Harness API key
   3. Configure the required variables in your repository settings:
      - `HARNESS_ACCOUNT_ID`: Your Harness account ID
      - `HARNESS_ORG_ID`: Your Harness organization ID
      - `HARNESS_PROJECT_ID`: Your Harness project ID
      - `HARNESS_EXPERIMENT_ID`: Your Harness Chaos experiment ID
      - `HARNESS_EXPECTED_RES_SCORE`: Your expected resilience score
   4. The workflow will run automatically on:
      - Any push to the main branch
      - Manual trigger from the Actions tab

The workflow will fail if:
- The chaos experiment fails to execute
- The experiment's resilience score is below the expected threshold
- The experiment execution exceeds the timeout (300 seconds)
- Any step in the workflow encounters an error

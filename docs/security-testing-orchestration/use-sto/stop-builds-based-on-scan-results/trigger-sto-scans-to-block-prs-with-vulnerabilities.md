---
title: Trigger STO scans to block Pull Requests with vulnerabilities
description: How to trigger STO scans to block PRs with vulnerabilities.
sidebar_label: Trigger STO scans to block pull requests
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- 
## Set up the pipeline

Do the following:

1. Fork the following repository into your GitHub account: https://github.com/GitHubGoneMad/dvpwa

2. In Harness, do the following:

   1. Select **Pipelines** > **Create a Pipeline**. Enter a name and click **Start**.

   2. Add a **Security Tests** stage and set it up as follows:

      1. Select **Third-party Git provider**.

      2. **Connector** = Your GitHub account connector.

      3. **Repository Name** = dvpwa

   3. In **Infrastructure**, select **Cloud** - **Linux** - **AMD**.

   4. In **Execution**, add a **Bandit** step. 

   5. Set **Fail on Severity** to **Medium**, apply your changes, and save the pipeline.   

-->

## Create the Harness pipeline trigger

### Trigger on a changed file 

You can specify a trigger that says: _If a pull request updates any of these files, run the pipeline and scan the repo._ 

This type of trigger supports uses cases such as:

- Block the PR if any code file specified in the trigger has critical- or high-severity vulnerabilities.

- If the repo has an SBOM file such as `pom.xml`, run an SCA scan and block the PR if the scan detects any critical- or high-severity vulnerabilities. 

#### Create the trigger

1. Go to the pipeline, Select **Triggers** and add a new trigger for your Git provider.

2. Set up the trigger as follows. 

<Tabs>
  <TabItem value="file-change-config" label="Configuration" default>
   
      1. Configuration

		1. **Connector** = Your GitHub connector.

		2. **Repository Name** = `dvpwa`

		3. **Event** = **Pull Request**

		4. **Actions** — Select **Open** and **Reopen**. 

  </TabItem>

  <TabItem value="file-change-conditions" label="Conditions">
   2. Conditions 

		1. **Changed Files**:
		   
		   1. Operator = **Equals**

		   2. **Matches value** = The file of interest to trigger the scan.

   </TabItem>

  <TabItem value="file-change-pipeline-input" label="Pipeline input">


   3. Pipeline Input 

        1. **Build Type** should be set to **Git Pull Request**.

3. Select **Create Trigger**. 

   </TabItem>

   <TabItem value="file-change-yaml" label="YAML definition">

  </TabItem>
</Tabs>

### Add the webhook in GitHub

1. Go to your forked GitHub repo and select **Settings** > **Webhooks** > **Add Webhook**.

2. Set up the webhook as follows:

   1. **Payload URL** Copy the webhook URL from the trigger in your Harness pipeline 
     
      ![](./static/trigger-tutorial/copy-webhook-url.png)

   2. **Cont type** = `application/json`

   3. **Which events would you like to trigger the webhook?**

     1. Select **Let me select individual events** and then select **Pull requests** and **Pull request review comments**. 
     
     2. Scroll down to the bottom of the page. Make sure **Active** is selected and then update the webhook.  

### Create a pull request and trigger the pipeline

In the GitHub repo, update the file that you specified in the trigger and create a pull request. You should now see a new trigger run in the **Pipeline Executions** page for your pipeline.

![](./static/trigger-tutorial/trigger-tut-pipeline-execution-page.png)

The pull request in GitHub now shows the pipeline run as a check for the pull request. Note the name of the status check that appears. You will select it in the following step. 

### Add a GitHub branch rule for the pipeline

The final step is to ensure that a PR cannot be merged if the STO pipeline fails. To do this, you create a branch rule in the repo.

1. Select **Settings** > **Branches** > **Add Rule**.

2. In **Branch name pattern**, add a string or regular expression for the branch or branches you want to protect. For e*xample, you can specify the following regex: `^(main|master)$`.

3. Select **Require a pull request before merging** and **Require Approvals**. This isn't required, but it's good practice.

4. Select **Require status checks to pass before merging**.

5. In the search field below, enter the first characters of the check name and then select the check. 

6. Configure any other settings as appropriate.

7. Scroll to the bottom of the page and select **Save Changes**.

### Update the file again and create another pull request

Now that you've set up the branch rule, the PR request is locked when the pipeline fails.

1. Go to the scan step in your pipeline and set **Fail on Severity** to **Low**. This will fail the pipeline if any vulnerabilities with severity of Low or higher are detected. This is optional but might be useful to ensure that the scan step fails. 

2. Go back to the protected branch in your repo, edit the specified file, and create a new pull request. 

3. Now, merging is blocked if your scan step detects any vulnerabilities. 

   ![](./static/trigger-tutorial/pr-check-failed.png)

4. Optionally, go back and change **Fail on Severity** to a higher level. 




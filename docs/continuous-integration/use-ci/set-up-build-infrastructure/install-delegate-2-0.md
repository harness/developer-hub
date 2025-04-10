---
title: Install Harness Delegate 2.0 (Beta)
description: Learn how to install Harness Delegate 2.0 for local machines
sidebar_position: 51
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide describes how to install the new Harness Delegate to local machines. Skip to the [End to End Demo](#end-to-end-demo) if you want to watch video instructions for the new delegate installation.

:::info Important

Harness Delegate 2.0 is under **Beta** and can only be used for Mac Build, Android Build, and CI Stage Pipelines with limited sets of steps and connector support.

:::

:::note

Please enable the following feature flags to use Delegate 2.0. To enable these flags, contact [Harness Support](mailto:support@harness.io)

- `CI_V0_LOCAL_BUILDS_USE_RUNNER`
- `PL_ENABLE_UNIFIED_TASK`
- `PL_USE_RUNNER`

:::

## What's Supported

### Supported Connectors

| Connector          | Caveats                                                                 |
|--------------------|-------------------------------------------------------------------------|
| Docker Registry    | Only the DockerHub provider type                                        |
| Github             | Does not work with Github App Auth                                      |
| HashiCorp Vault    | Only AppRole and Token Auth; set Renewal Interval to 0 (zero)           |
| AWS Secrets Manager| Only Access Key and IAM Role Credential Type                            |

### Supported CI Steps

| Step Name  | Caveats              |
|------------|----------------------|
| Initialize |                      |
| Git Clone  | Only for Github      |
| Run        |                      |

## Delegate Installation Instructions

### Get Relevant Information

In order to install the delegate, you will need:
- `ACCOUNT_ID`
- `DELEGATE_TOKEN`
- `MANAGER_HOST_AND_PORT`

To get this information, do the following:

<Tabs>
<TabItem value="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/Get-Delegate-2-0-Credentials-41d069778e3e421d8791dd4dcc8ab793" title="Get Credentials for Delegate 2.0" />

</TabItem>
<TabItem value="Step-by-Step">

1. In the left nav, click **Project Settings**.
2. Under **Project-level Resources**, click **Delegates**.
3. Click **+ New Delegate**.
4. Choose **Docker** as your delegate type. 
5. Copy `ACCOUNT_ID`, `DELEGATE_TOKEN`, and `MANAGER_HOST_AND_PORT` which can be found in the `docker run` command. This will be under the heading **Run the following command to install**.

</TabItem>
</Tabs>

### Download and Install the Delegate

Download and install the correct binary for your OS.

<Tabs>
<TabItem value="MacOS - arm64">

1. Download the binary for your system
```
curl --output harness-runner 'https://storage.googleapis.com/harness-qa-public/public/shared/runner/0.0.1/runner-darwin-arm64'
```

2. Give it permission to execute
```
chmod +x harness-runner
```

3. Install the delegate and create the `config.env` file
```
./harness-runner install --account=[Account ID] \
                       --token=[Delegate Token] \
                       --url=[Harness URL]  \
                       --tags="macos-arm64"
```

4. Start the delegate as service.
```
./harness-runner start
```
</TabItem>

<TabItem value="MacOS - amd64">

1. Download the binary for your system
```
curl --output harness-runner 'https://storage.googleapis.com/harness-qa-public/public/shared/runner/0.0.1/runner-darwin-amd64'
```

2. Give it permission to execute
```
chmod +x harness-runner
```

3. Install the delegate and create the `config.env` file
```
./harness-runner install --account=[Account ID] \
                       --token=[Delegate Token] \
                       --url=[Harness URL]  \
                       --tags="macos-amd64"
```

4. Start the delegate as service.
```
./harness-runner start
```
</TabItem>

<TabItem value="Linux - arm64">

1. Download the binary for your system
```
sudo curl --output harness-runner https://storage.googleapis.com/harness-qa-public/public/shared/runner/0.0.1/runner-linux-arm64
```

2. Give it permission to execute
```
sudo chmod +x harness-runner
```

3. Create a config.env file in the local folder
```
cat > config.env <<EOF
NAME=[Name of the runner]
ACCOUNT_ID=[Your account ID]
TOKEN=[Copy Delegate Token from Harness platform]
URL=[MANAGER_HOST_AND_PORT]
TAGS="linux-arm64"
EOF
```

4. Start the delegate in the background
```
nohup ./harness-runner server --env-file config.env > nohup-runner.out 2>&1 &
```

</TabItem>

<TabItem value="Linux - amd64">


1. Download the binary for your system
```
sudo curl --output harness-runner https://storage.googleapis.com/harness-qa-public/public/shared/runner/0.0.1/runner-linux-amd64
```

2. Give it permission to execute
```
sudo chmod +x harness-runner
```

3. Create a config.env file in the local folder
```
cat > config.env <<EOF
NAME=[Name of the delegate]
ACCOUNT_ID=[Your account ID]
TOKEN=[Copy Delegate Token from Harness platform]
URL=[MANAGER_HOST_AND_PORT]
TAGS="linux-amd64"
EOF
```

4. Start the delegate in the background
```
nohup ./harness-runner server --env-file config.env > nohup-runner.out 2>&1 &
```

</TabItem>
</Tabs>
---

Navigate to **Project Settings** > **Delegates**. You should see your new delegate in the delegates list.

### Configure Pipeline Delegate

Then, in order to use this delegate, simply [set your pipeline's build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure#set-the-pipelines-build-infrastructure) as normal.

## Delegate Configuration

### Set Max Stage Capacity

With Harness Delegate 2.0, you can configure a limit for the maximum number of stages the delegate will be executing at a given time. When the delegate is handling tasks at full capacity, new tasks will be queued and picked up once the delegate's capacity is freed.  

In order to configure a max limit for number of stages executed by a delegate, you should add a `MAX_STAGES` variable in the delegate's `config.env` file. The value of the `MAX_STAGES` should be a positive integer.

#### Example config.env

If you wanted the runner to only execute up to 5 stages a time, set `MAX_STAGES=5`. For example:

```
ACCOUNT_ID="<ACCOUNT_ID>"
TOKEN="<DELEGATE_TOKEN>"
TAGS="<your delegate tags>"
URL="<MANAGER_HOST_AND_PORT>"
NAME="<your delegate name>"
...
MAX_STAGES=5
```

Here is where the `config.env` file is located for each installation method:
- **MacOS**: The `config.env` file is located in `~/.harness-runner/config.env` (after you run the `./harness-runner` install command).
- **Linux**: It is the same `config.env` file you created during delegate's installation.

## Debugging

### Logs

You can find the delegate logs in the following files:
- **MacOS**: `~/Library/Logs/harness.runner/stderr.log`
- **Linux**: `nohup-runner.out`

## End to End Demo

This video walks through an end to end demo of the delegate installation, including usage and a pipeline execution.

<DocVideo src="https://www.loom.com/share/1e292d0f51004882bfd5462ef0553222?sid=487e23cb-28fc-4d2e-ac66-07197fa7dafe" />
---
title: Install Harness Delegate 2.0
description: Learn how to install Harness Delegate 2.0 for local machines
sidebar_position: 51
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide describes how to install the new Harness Delegate to local machines. 

## Get Relevant Information

In order to install the delegate, you will need:
- `ACCOUNT_ID`
- `DELEGATE_TOKEN`
- `MANAGER_HOST_AND_PORT`

To get this information, do the following:

1. In the left nav, click **Project Settings**.
2. Under **Project-level Resources**, click **Delegates**.
3. Click **+ New Delegate**.
4. Choose **Docker** as your delegate type. 
5. Copy `ACCOUNT_ID`, `DELEGATE_TOKEN`, and `MANAGER_HOST_AND_PORT` which can be found in the `docker run` command. This will be under the heading **Run the following command to install**.

## Download and Install the Delegate

### Download the Binary for your OS

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
3. Start Runner as a service
```
./harness-runner install --account=[Account ID] \
                       --token=[Delegate Token] \
                       --url=[Harness URL]  \
                       --tags="macos-arm64"
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
3. Start Runner as a service
```
./harness-runner install --account=[Account ID] \
                       --token=[Delegate Token] \
                       --url=[Harness URL]  \
                       --tags="macos-amd64"
```
</TabItem>

<TabItem value="Linux - arm64">

1. Download the binary for your system
```
sudo curl --output harness-runner https://storage.googleapis.com/harness-qa-public/public/shared/runner/0.0.1/runner-linux-arm64
```

2. Create a config.env file in the local folder
```
cat > config.env <<EOF
NAME=[Name of the runner]
ACCOUNT_ID=[Your account ID]
TOKEN=[Copy Delegate Token from Harness platform]
URL=[MANAGER_HOST_AND_PORT]
TAGS="linux-arm64"
EOF
```

3. Give it permission to execute
```
sudo chmod +x harness-runner
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

2. Create a config.env file in the local folder
```
cat > config.env <<EOF
NAME=[Name of the runner]
ACCOUNT_ID=[Your account ID]
TOKEN=[Copy Delegate Token from Harness platform]
URL=[MANAGER_HOST_AND_PORT]
TAGS="linux-amd64"
EOF
```

3. Give it permission to execute
```
sudo chmod +x harness-runner
```

4. Start the delegate in the background
```
nohup ./harness-runner server --env-file config.env > nohup-runner.out 2>&1 &
```

</TabItem>
</Tabs>
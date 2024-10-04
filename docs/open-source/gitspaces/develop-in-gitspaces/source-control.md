---
title: Using Source Control in your Gitspaces
sidebar_position: 1
sidebar_label: Source Control
---

## Using the Supported Source Control Management Tools

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="GitHub">
<TabItem value="using-github" label="Using GitHub Repositories">

GitHub CLI comes pre-installed with VS Code IDE, so you just need to login to use. 

```sh
git config --global user.email "you@example.com" 
git config --global user.name "Your Name"
```

</TabItem>
<TabItem value="using-gitlab" label="Using GitLab Repositories">

1. [Install](https://gitlab.com/gitlab-org/cli/#installation) the glab CLI. 

2. [Authenticate](https://gitlab.com/gitlab-org/cli/-/blob/main/README.md#authentication) the user.

</TabItem>
<TabItem value="using-bitbucket" label="Using Bitbucket Repositories">

1. Follow the steps described [here](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-vs-code/) to configure Bitbucket.

</TabItem>
</Tabs>

## Commit Changes to Upstream

1. Once you've made a few changes, you can use the **integrated termina**l or the **[source view](https://code.visualstudio.com/docs/sourcecontrol/overview#_commit)** to commit your work. Here are the steps to use the Source Control view for this example.

2. To stage your changes, click **+** next to the file to stage the changes, or **next** to Changes if you've changed multiple files and you want to **stage** them all.

3. To **commit** your staged changes, type a **commit message** describing the change you've made, then click **Commit**.

4. Now Sync Changes, it will redirect you to login and authorize to your Source Provider. After authorization, your changes will be committed to your fork.

5. And that’s it! You have successfully used Gitness Gitspace for development
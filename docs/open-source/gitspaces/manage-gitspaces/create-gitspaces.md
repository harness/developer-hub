---
title: How to Create a Gitspace
sidebar_position: 2
sidebar_label: Create Gitspaces
---

:::info

Make sure you have latest version of Harness Open Source installed that includes the Gitspace offering and it's `docker.io/harness/harness:latest`.

:::

## How to Create a Gitspace

1. **Login** to Harness Open Source, and create a [new project](https://developer.harness.io/docs/open-source/installation/quick_start#create-a-project). You will see **Gitspace** available in the sidenav. 

2. Click on **+New Gitspace**. To create a **Gitspace** using the [sample app](https://github.com/harness-community/demo-repo-nm). You have two options to create Gitspace:


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="Create Gitspace">
<TabItem value="using-hoss-repositories" label="Using Harness Open Source Repositories">

1. If you don’t have a Harness Open Source Repository, you’ll get an option to [create](https://developer.harness.io/docs/open-source/repositories/overview#create-a-repository) one or [import](https://developer.harness.io/docs/open-source/repositories/overview#import-a-repository) a new repository. 

![](./static/choice-repo-creation.png)

2. Once the repository is available, you can select the **branch** and the **IDE** type (VSCode Browser and Desktop are supported)

3. Import the repository from third party git provider to Harness Open Source, using the **organization** and the **repository** name. [Read](https://developer.harness.io/docs/open-source/repositories/overview#import-a-repository) for more details

4. Now **Create Gitspace**, by selecting the default **branch** as `main` and **IDE**.

</TabItem>
<TabItem value="other-public-git-repositories" label="Other Public Git Repositories">

1. Repository URL is `https://github.com/harness-community/demo-repo-nm` (enter URL of your fork if you forked it), make sure the URL is the clone URL strictly of the format `https://git-provider.com/organisation/repository` any extra string post this might cause an error.

2. Let the **branch** be default `main`, select the **IDE** and **Create Gitspace**.

![](./static/create-gitspace-public.png)

</TabItem>
</Tabs>

Please refer to the [IDE documentation](/docs/open-source/gitspaces/ide's/vs-code-desktop.md) for detailed instructions on accessing your Gitspaces using your preferred IDE.
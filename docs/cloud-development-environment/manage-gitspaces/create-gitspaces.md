---
title: How to Create a CDE
sidebar_position: 1
sidebar_label: Create Gitspace
---

## How to Create a Gitspace


1. Click on **+New Gitspace**. To create a **Gitspace** using the [sample app](https://github.com/harness-community/demo-repo-nm). You have two options to create Gitspace:


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="Create Gitspace">
<TabItem value="using-harness-code" label="Using Harness Code">

1. If you don’t have a Harness Code Repository, you can either [create](https://developer.harness.io/docs/code-repository/config-repos/create-repo) one or [import](https://developer.harness.io/docs/code-repository/config-repos/import-repo) a new repository. 

2. Once the repository is available, you can select the **branch** and the **IDE** type (VSCode Browser and Desktop are supported)

3. Import the repository from third party git provider to Harness Code Repository, using the **organization** and the **repository** name. [Read](https://developer.harness.io/docs/code-repository/config-repos/import-repo) for more details

4. Now **Create Gitspace**, by selecting the default **branch** as `main` and **IDE**.

</TabItem>
<TabItem value="other-public-git-repositories" label="Other Public Git Repositories">

1. Repository URL is `https://github.com/harness-community/demo-repo-nm` (enter URL of your fork if you forked it), make sure the URL is the clone URL strictly of the format `https://git-provider.com/organisation/repository` any extra string post this might cause an error.

2. Let the **branch** be default `main`, select the **IDE** and **Create Gitspace**.

</TabItem>
</Tabs>

<Tabs queryString="Select IDE">
<TabItem value="vs-code-online" label="VS Code Browser">

- VS Code Browser can directly be started on your browser and doesn't require any pre-configuration. 
- You can select the IDE type as VS Code Browser and you'll redirected to the IDE on a new tab once the Gitspace is created and you click on **Open VS Code Editor**. 


</TabItem>
<TabItem value="vs-code-desktop" label="VS Code Desktop">

## VS Code Desktop

1. You can install and configure the Gitspaces VS Code extension to use it on your VS Code Desktop App.

2. Install the Gitspaces VS Code Extension on from VS COde Extensions Marketplace. 

3. The extension will appear on the left nav of your screen, click on it and proceed to **Sign-in**. 

4. Any Gitspace you create with VS Code Desktop as the IDE will now open in your desktop application. You can also view a list of Gitspaces in the left navbar and switch between them as needed. 

</TabItem>
</Tabs>

5. It will take few minutes to provision the Gitspace and you could see all the steps and logs involved. 

6. Now you can **Open VS Code Editor**. 
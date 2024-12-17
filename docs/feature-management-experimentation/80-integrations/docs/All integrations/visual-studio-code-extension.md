---
title: Visual Studio Code extension
sidebar_label: Visual Studio Code extension
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/10731776599309-VSCode-extension <br /> ✘ images still hosted on help.split.io </button>
</p>

***Note: This feature is in beta. If you'd like to be included in the beta, contact [earlyaccess@split.io](mailto:earlyaccess@split.io).***

This guide explains how to use the Split Visual Studio Code (VSCode) extension to interact with feature flags from within VSCode. This capability allows you to view critical flag information without leaving your IDE. With this extension you can:

* View feature flag definitios by environment 
* Sort flags alphabetically, by rollout status, and creation date
* Hover over a feature flag to view information such as description, tags, etc. within a tooltip
* Find code references for a given flag 

# Installing VSCode extension

To install the VSCode extension, do the following:

1. Open the [Split for Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=SplitSoftware.splitio) in Visual Studio Marketplace.
2. Click the **Install** button. The extension installs.


# Configuring the VSCode extension in Split

To connect Visual Studio Code to your Split account, do the following:

**Note: A Split admin needs to add the VSCode extension into the Split marketplace and generate the token that you need to complete this section. Contact your Split admin for a copy of the token.**


1. From the left navigation, click the **user's initials** at the bottom, click **Admin settings**, and then **Integrations**. The Integrations page appears.
2. Locate the VSCode selection and click **Add**.
3. Save the integration and navigate back to the newly created integration. The token displays. Copy the token to authenticate the extension.
4. Open your Visual Studio editor and download the [Split extension](https://marketplace.visualstudio.com/items?itemName=SplitSoftware.splitio).
5. Once you have the Split extension installed, click the Split icon in the sidebar. The Authenticate button appears along with a field to enter your Split API key.
6. Enter the Split token you copied in the field and click the **Authenticate** button.
7. Paste the token into the Extension field at the top of VSCode extension. All your feature flags within your Split projects now display within the extension.

**Note: To reconfigure the extension at any time, run the “Split: Authenticate” command from the command palette by using one of the following commands:**

* **For PCs, use ctrl+shift+p**
* **For Macs, use ⌘+shift+p.**

All your Split projects are now available within VSCode.

# Using Visual Studio code extension

The following explains what you can do within the extension.

## Switching between Split projects

Click the switch project icon to switch between your Split projects. A list of your Split projects appears. When you select a different Split project, it displays all the feature flags in the selected project.
<p>
  <img src="https://help.split.io/hc/article_attachments/10732454761101" alt="switch-workspace.png" />
</p>

## Sorting feature flags in your Split project

Click the sort icon to sort your feature flags. You can sort your flags:

* **Alphabetically.** Sorts your flags from A to Z.
* **By creation date (newest to oldest).** Displays the date of when the flag was created when you hover over a feature flag.
* **By rollout status.** Shows how many feature flags are in a particular status. For example, if you have 12 flags in Pre-production, that number displays along with the status of the flags.

<p>
  <img src="https://help.split.io/hc/article_attachments/10732119898381" alt="sort-flags.png" />
</p>

## Refreshing data

Click the refresh icon to refresh the data in your feature flags. Because the extension does not automatically refresh data, it’s recommended that you periodically refresh the data manually.

## Working with feature flags

The following describes how to work with feature flags in VSCode.

## Copying the feature flag name

To copy the feature flag name, hover over the desired flag and click the copy icon. The name is copied to clipboard.

<p>
  <img src="https://help.split.io/hc/article_attachments/10732151441037" alt="copy-name.png" />
</p>

## Searching for code references

You can search for code references in one or more files. When you do a search, it displays the names of the files that contain the code reference and the location within the file. 

<p>
  <img src="https://help.split.io/hc/article_attachments/10732274816909" alt="search-flag.png" />
</p>

Once displayed, you can either view the code itself or a summary of the code.

<p>
  <img src="https://help.split.io/hc/article_attachments/10732228845069" alt="code-summary.png" />
</p>

## Expanding feature flags

Expanding a feature flag in the tree view allows you to see a list of environments. Clicking each environment opens a read-only editor displaying the feature flag definition for the given environment. If you have no targeting rules that are defined for that environment, a note appears at the top of the screen indicating that no definition is found for the selected environment.

## Additional capabilities

The following are actions you can perform within VSCode.

* **Recognizes feature flags in code.** Within the code itself, you can hover over any strings within quotes and if it recognizes it as a flag from your list, it displays information about the flag, for example, the description, status, traffic type, etc. You can also view it within the Split application itself.

<p>
  <img src="https://help.split.io/hc/article_attachments/11206061475853" alt="recognize-feature-flag-in-code.png" width="539" />
</p>

  **Note: If you change the feature flag in the Split application, you need to refresh your data to display the changes.**

* **Automatic completion.** When you start typing a string, a list of matching feature flags names automatically appears.

<p>
  <img src="https://help.split.io/hc/article_attachments/11206122516877" alt="automatic-completion.png" />
</p>

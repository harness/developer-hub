---
title: Manage Org Units
description: Create and edit Org Units.
sidebar_position: 40
---

# Managing Org Units

## **Viewing Org Units under an OU category**

1. From the global settings page, choose the ORG UNITS tile to access the organization settings page&#x20;

<figure><img src="../../../.gitbook/assets/Settings home page.png" alt=""><figcaption><p>Global Settings</p></figcaption></figure>

Note: Admins can also access the Manage Org Unit option from the OU selection pages in the dashboard navigation flow from the Home page

2\. You will see the list of Org Units for different categories under different tabs as a flat list.&#x20;

Note: By default, the Org Units shown are for the current workspace. Use the Select Workspace dropdown to view OUs for a different workspace.

{% hint style="info" %}
* The "Path" column shows the hierarchical position of an OU
* The "# of Dashboards" column indicates the number of dashboards specifically associated with an Org Unit, not including inherited dashboards
* The root Org Unit is readily accessible for viewing/editing by choosing the Root Org Unit link at the top of the org unit list
{% endhint %}

<figure><img src="../../../.gitbook/assets/Org Unit settings page.png" alt=""><figcaption><p>Org Unit Settings</p></figcaption></figure>

3\.  You can view OU hierarchy by choosing the Tree View option. Click on the arrow icons to expand or collapse the OU levels&#x20;

{% hint style="info" %}
Org Unit editing options are limited to the flat view currently.
{% endhint %}

<figure><img src="../../../.gitbook/assets/OU Tree view.png" alt=""><figcaption><p>Tree view of Org Unit hierarchy</p></figcaption></figure>

## **Adding or editing Org Unit settings**

1. Choose an Org Unit category to view the Org Units under that category

<figure><img src="../../../.gitbook/assets/Org Unit settings page (1).png" alt=""><figcaption><p>Org Unit Settings</p></figcaption></figure>

2\. To add an Org Unit under Teams OU category, select the + Teams option

OR

To edit settings for an already existing Org Unit, choose an Org Unit e.g. Google

{% hint style="info" %}
Org Unit settings consists of three tabs namely Basic Info, Dashboards, and Definition. Click on each tab to edit specific settings.
{% endhint %}

3\. Choose Basic Info tab to edit basic settings for an Org Unit such as Name, Description, Org Unit Category, Parent node etc.

Admins are empowered with more flexibility to organize Org Units in a hierarchical structure by assigning a parent node and/or an Org Unit category to an OU

{% hint style="info" %}
* Any Org Unit in a workspace must have a unique name
* To move an Org Unit under a different Org Unit category, use the Org Unit Category dropdown to select a category
* To move an Org Unit under a specific Org Unit, use the Parent Node dropdown to select an Org Unit
{% endhint %}

<figure><img src="../../../.gitbook/assets/Org Unit Basic tab - Google.png" alt=""><figcaption><p>Org Unit - Basic Info</p></figcaption></figure>

\
6\. From the Dashboards tab, you can associate specific dashboards to an Org Unit. All child Org Units automatically inherit the dashboards associated with a parent Org Unit. Refer to the [Managing dashboard associations](managing-dashboard-associations.md) section for more information.



7\. Choose the Definition tab to limit the integrations for an Org Unit.&#x20;

{% hint style="info" %}
By default, if no integrations are selected in this tab, Org Units automatically inherit integrations from the workspace.
{% endhint %}

<figure><img src="../../../.gitbook/assets/Org Unit Definition tab - Google.png" alt=""><figcaption><p>Org Unit - Definition</p></figcaption></figure>











## Manage Insights associations

xyzPropelo dashboards must be associated with an Org Unit. When creating a dashboard, you can associate that dashboard with one or more OU categories. Refer to section [Creating dashboards](../../dashboards/creating-dashboards.md) for more information on associating dashboards with an OU category at the time of creating a dashboard.&#x20;

## Managing dashboard associations from Org Unit settings > Dashboard tab

1. From the global settings page, choose the ORG UNITS tile to access the organization settings page&#x20;

<figure><img src="../../../.gitbook/assets/Settings home page.png" alt=""><figcaption><p>Global Settings</p></figcaption></figure>

2\. Choose an Org Unit to edit its settings e.g., Google

<figure><img src="../../../.gitbook/assets/Org Unit settings page (1).png" alt=""><figcaption><p>Org Unit Settings</p></figcaption></figure>

3\. You can create targeted dashboard associations (e.g., associate a dashboard specifically to Google OU) from the Dashboard tab under Org Unit settings**.**&#x20;

{% hint style="info" %}
* The dashboards related to an OU category will automatically be inherited by all the OUs under this category.
* Inherited dashboards from a parent OU are pre-populated in the selected list of dashboards for an OU and cannot be removed or reordered.
{% endhint %}

<figure><img src="../../../.gitbook/assets/Dashboard association to OU - Google.png" alt=""><figcaption><p>Dashboard association for an Org Unit</p></figcaption></figure>

4\. Use the arrow icons to change the order of dashboards in the selected list of dashboards. For example, press the up arrow shown on hover for Alignment dashboard to move it to the top of the list.

5\. Choose the Default button to set a dashboard as the default dashboard for an Org Unit

{% hint style="info" %}
When viewing dashboards, the order of dashboards set under the Dashboards tab for an Org Unit is honored when displaying the dashboard list for an Org Unit in the dashboard header.
{% endhint %}

<figure><img src="../../../.gitbook/assets/Dashboard association to OU - default.png" alt=""><figcaption><p>Setting a default dashboard for an Org Unit</p></figcaption></figure>
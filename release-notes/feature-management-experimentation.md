---
title: Feature Management & Experimentation release notes
sidebar_label: Feature Management & Experimentation
date: 2024-12-13T08:00:00
tags: ["fme", "feature management experimentation"]

sidebar_position: 11
---

import HarnessApiData from '../src/components/HarnessApiData/index.tsx';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/infrastructure-as-code-management/rss.xml" />

These release notes describe recent changes to Harness Feature Management & Experimentation.

:::info About Harness Release Notes

- **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
- **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
- **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.
:::

#### Last updated: January 08, 2025

## January 2025
### 2025-01-08
#### Release Agent (AI Chatbot)
##### AI-Generated Summary Now Supports Follow-Up Questions
The "Switch" AI chatbot in Harness Feature Management and Experimentation (FME) has been renamed to "Release Agent" and now supports follow-up questions after you click "Summarize" in metric details.
To see the Metric summary and ask follow-up questions:
1. Drill into a metric tile on a Metrics impact dashboard and click **Summarize**.
2. After viewing the summary, type your follow-up question and click **Continue conversation in Release Agent**.
3. Continue to ask additional follow-up questions if you would like, including suggestions for next steps.
![Image](https://www.split.io/wp-content/uploads/Continue-In-Release-Agent-01-1920x1040.png)
![Image](https://www.split.io/wp-content/uploads/Continue-In-Release-Agent-02.png)
Note: the transition from "Switch" to "Release Agent" will take place gradually.  For now, you'll still see **Ask Switch** in the lower left navigation of Harness Feature Management and Experimentation:
![Image](https://www.split.io/wp-content/uploads/ask-switch-in-left-nav.png)
##### Related documentation
- [Metric details and trends](https://help.split.io/hc/en-us/articles/360025376251-Metric-details-and-trends)
- [Switch AI assistant](https://help.split.io/hc/en-us/articles/21188803158157-Switch-AI-assistant)

### 2025-01-07
#### Targeting
##### Large segments
Harness Feature Management and Experimentation (FME) now supports "Large segments" (lists of targeting IDs) that can contain more than 100,000 IDs.
Large segments support multiple use cases where bulk targeting of specific IDs is required:
- Communicating with more than 100,000 specific customers in-app after an incident.
- Targeting any set of users based on attributes not available within the app at runtime.
- Performing large-scale A/B tests on specific user bases, exported from external tools.
Effective immediately, Enterprise tier customers may create and use Large segments containing up to one million (1,000,000) IDs. Significantly higher limits are available by request.
![Image](https://www.split.io/wp-content/uploads/image-53.png)
Learn more about Large segments and the ways they differ from Standard segments in the documentation:
- [Create a segment](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment)
- [Target segments](https://help.split.io/hc/en-us/articles/360020525252-Target-segments)
Note: The initial release of Large segments is focused on client-side SDK usage only. Server-side SDKs do not yet support Large segments, but soon will. Until they are supported, evaluations of feature flags that target Large segments will return control on server-side SDKs.
##### Admin API Endpoints
After familiarizing yourself with Large segments at the above links, you may find these UI and API equivalent documentation links handy for automating the steps via the Admin API:
###### Steps for creating and populating a Large segment using either UI or API
1. Create a Large segment (just **metadata**, no Environment definition)
- [UI steps](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment#creating-a-segment) (select Large)
- [API steps](https://docs.split.io/reference/createlargesegment)
2. Create a **definition** for a Large segment in an Environment (no user IDs)
- [UI steps](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment#adding-user-ids-to-a-segment) (step 3)
- [API steps](https://docs.split.io/reference/createlargesegmentinenvironment)
3. Add **user IDs** to a Large segment (to the definition created in step 2)
- [UI steps](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment#file-import-for-large-segments) 
- [API steps](https://docs.split.io/reference/create-change-request#open-change-request-to-add-members-to-a-large-segment)
###### Adding an approval step via Admin API
To add an approval step for Large segment creation or update when using the Admin API, reference this example:  [Open Change Request to add members to a Large Segment](https://docs.split.io/reference/create-change-request#open-change-request-to-add-members-to-a-large-segment).

## December 2024
### 2024-12-06
#### Targeting
##### Semantic Versioning (SemVer) Attribute Dictionary Support
Split FME now supports SemVer type attributes and suggested values in the attribute dictionary:
- Admins can create SemVer typed attribute names and suggested values.
- Users can see the SemVer attribute names and suggested values when editing targeting rules.
Attribute dictionary support reduces guesswork and manual errors when editing targeting rules.
###### **What you need to know in a nutshell:**
- The [semver](https://semver.org/) standard calls for versions to be formatted as major.minor.patch
- Split FME added [SemVer support on June 6th, 2024](https://www.split.io/releases/2024-06-06/) , eliminating the need to write regular expressions (i.e. regex) to target version ranges or "is a version less than or equal to x.y.z"
- This update adds the benefits of standardized attribute names and suggested values delivered by our Attribute Dictionary.
###### **What SemVer attribute support looks like to an admin**:
Admins can create a custom attribute of type "Semver" and optionally enter suggested values.
![Image](https://www.split.io/wp-content/uploads/semver-admin-create-1920x1171.png)
###### **What SemVer attribute support looks like to a user**:
Choose an attribute name from the attribute dictionary, such as "ios_version"
![Image](https://www.split.io/wp-content/uploads/1-chose-a-semver-attribute-name-1920x901.png)
If the chosen attribute is of type SemVer, the appropriate matchers are shown:
![Image](https://www.split.io/wp-content/uploads/2-choose-a-semver-matcher-1920x888.png)
If "is in list" is chosen as the matcher type, suggested values are shown:
![Image](https://www.split.io/wp-content/uploads/3-choose-a-suggsted-value-1920x890.png)
###### **Related Documentation:**
- [Creating individual custom attributes in Admin settings](https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes#creating-individual-custom-attributes-in-admin-settings)
- [Creating multiple custom attributes in Admin Settings](https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes#creating-multiple-custom-attributes-in-admin-settings) (CSV upload)

## November 2024
### 2024-11-27
#### Alerts
##### Guardrail and Key Metric Alerts Now Shown in the Alerts Table
Previously, the Alerts table on the Monitoring tab displayed Metric alerts only. Guardrail Metric alerts and Key Metric alerts generated email notifications to feature flag owners, but were not persisted in the UI.
Now all three types of alerts are shown on each flag's Monitoring tab for any team member to see.  The table has been simplified to display the most valuable fields at a glance, reducing cognitive load. Details less critical for quick triage remain available under an info icon.
![Image](https://www.split.io/wp-content/uploads/alerts-table-nov-2024.png)
As a refresher, here is quick summary of the three alert types:

* **Metric Alert**
    - **Triggered**: when the relative or absolute impact threshold in an Alert policy is reached
    - **Configured:** at the metric level, by [creating an Alert policy](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting)
    - **Monitors:** percentage rollouts for all flags which have the same traffic type as the metric
- **Guardrail Metric Alert**
    - **Triggered:** when any statistically significant impact is detected, either desirable or undesirable
    - **Configured:** at the metric level, by [marking a metric's category as "Guardrail"](https://help.split.io/hc/en-us/articles/22005565241101-Metrics#metric-categories)
    - **Monitors:** percentage rollouts for all flags which have the same traffic type as the metric
- **Key Metric Alert**
    - **Triggered:** when any statistically significant impact is detected, either desirable or undesirable
    - **Configured:** at the feature flag level, by [marking a metric as a "Key metric" for that flag](https://help.split.io/hc/en-us/articles/19832711328397-Configuring-feature-flag-alerting)
    - **Monitors:** percentage rollouts only for flags where the metric is a Key metric

## September 2024

### 2024-09-30
#### Better Together: Split + Harness
##### New Colors, Names for Organization and Workspace
Starting on September 30th, we began a progressive rollout to update the Split UI, bringing it closer to the look of Harness:
![Image](https://www.split.io/wp-content/uploads/Better-Together-Color-Changes.png)
Beyond a change in color scheme, you will also see two changes to **terminology**:
- **Workspaces** will now be known as **Projects** in the UI
- **Organizations** will now be known as **Accounts** in the UI

![Image](https://www.split.io/wp-content/uploads/Admin-Settings-New-Nomenclature-1920x977.png)
Note: These terminology changes are being made only to labels in the UI at this time. To avoid introducing a breaking change, the [Admin API](https://docs.split.io/reference/introduction) will continue to use the strings ws, workspace, organizationId, and orgId until further notice.

### 2024-09-12
#### Monitoring
##### Traffic Insights and Alerts
The **Alerts** tab has been renamed **Monitoring** and expanded to show real-time traffic insights over time and any alerts fired for the flag on a single page.

![Image](https://www.split.io/wp-content/uploads/monitoring_tab_in_docs-1920x1431.png)

By default, traffic over the **Last 48 hours** is shown, but you may also select the **Last 7 days**, another **Time range**, or a specific **Feature flag version**:

![Image](https://www.split.io/wp-content/uploads/Traffic_last48-by-defaultother_options-1920x573.png)

Changes made to flags (i.e., new flag versions) are displayed as vertical bars for context:

![Image](https://www.split.io/wp-content/uploads/flag-versions-vertical-bars.png)

For more information, have a look at the [Monitoring tab docs](https://help.split.io/hc/en-us/articles/30098162579853-Monitoring-tab).

### 2024-09-10
#### Metrics
##### Introducing Supporting Metrics
We’re excited to announce the next step in improving metric categorization for your feature releases and experiments: **Supporting metrics**. This new metric category gives you greater control over metrics monitored per feature flag, helping you focus on what truly matters.

###### **What’s changing?**
On the Metrics impact page, we have replaced “Organizational metrics” with “Supporting metrics.” Now, you can easily select specific additional metrics to track for each release, reducing noise and making it easier to analyze your results.

###### **How do I assign flag-specific metrics?**
Key metrics and Supporting metrics are specific to individual feature flags, and can be managed on a flag’s Metrics impact tab. Under each category, click “Add metric” to initiate the process of assigning metrics to the category. Once metrics are added, you can wait until the next scheduled calculation or manually “Recalculate metrics” to see results.

![Image](https://www.split.io/wp-content/uploads/image1-14.png)

###### **How do I ensure my important metrics are still monitored for every flag?**
In June, Split introduced [Guardrail metrics](https://help.split.io/hc/en-us/articles/22005565241101-Metrics?_gl=1*u0yhnk*_gcl_au*OTQzOTM3ODQ3LjE3MTk5ODA1NjI.#:~:text=Guardrail%20metrics%3A,impact%20is%20detected.) to improve your ability to define which metrics should be monitored for every flag. Guardrail metrics include automated alerting, meaning flag owners will be notified as their releases or experiments impact these metrics. 

Since Organizational metrics will no longer be available, **we recommend adding important metrics to the new Guardrail metrics category ASAP** to ensure they continue to be protected and limit any disruption of analyzing metric results. 

Guardrail metrics can be assigned in the metric definition:

![Image](https://www.split.io/wp-content/uploads/image2-10.png)

The combination of Key metrics, Guardrail metrics, and Supporting metrics will reduce noise and increase sensitivity while ensuring important metrics are monitored for every feature release or experiment. We welcome your feedback as we continue to improve our metric results!

### 2024-09-04
#### Monitoring
##### Guardrail Metric Alerts
Flag owners will now automatically receive alerts on any guardrail metric without manual configuration.

Alerts are sent to flag owners whenever a guardrail metric moves significantly in the desired or undesired direction. This feature is designed to help you make safe and accurate release decisions in a timely manner.

As a reminder, Guardrail Metrics ([released 2024-06-14](https://www.split.io/releases/2024-06-14/)) ensure that an organization’s most crucial metrics are protected and monitored throughout every feature release and experiment by making their calculation automatic and mandatory for all flags that use the same traffic type as the metric.

Metrics are set as guardrail metrics for your workspace on the Metric definition page. View the docs [here](https://help.split.io/hc/en-us/articles/22005565241101-Metrics#:~:text=Guardrail%20metrics%3A,impact%20is%20detected.)

## June 2024
### 2024-06-14
#### Monitoring
##### Guardrail Metrics
Users can now categorize their organization’s most important metrics as  “guardrails”. [Guardrail metrics](https://help.split.io/hc/en-us/articles/22005565241101-Metrics#:~:text=Guardrail%20metrics%3A,impact%20is%20detected.) are those your organization wants to protect during a feature release or experiment. Metrics are set as guardrail metrics for your workspace on the Metric definition page.

### 2024-06-06
#### SDK Enhancements
##### Semantic Versioning Targeting
Using the latest Split SDKs, users can more easily define targeting rules for new features based on app, OS, and other versions using attribute-based targeting. The SDK then automatically serves the appropriate treatment to users without needing additional code configurations. Split’s native [Semantic Versioning Targeting](https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes#semver-attributes) removes the additional complexities and manual work that comes with targeting different application versions, allowing users to seamlessly deliver different experiences.

## May 2024
### 2024-05-31
#### Usability Enhancements
##### Left Navigation Enhancements
Left-hand navigation within the application has been optimized. With this change, we've narrowed the navigation bar, migrated the search function to a modal dialog, and moved account settings to the bottom of the page. This makes frequently used actions (e.g. workspace switching) more readily accessible within the UI. 

### 2024-05-03
#### SDK Enhancements
##### Split Suite, iOS SDK
Users can automatically capture event data in Split using their [iOS SDK](https://help.split.io/hc/en-us/articles/26408115004429-iOS-Suite) without needing additional agents, integrations, or track calls. This eliminates the manual process of sending events to Split, allowing users to quickly set up metrics and alert policies.
#### Monitoring
##### Out-of-the-Box Metrics
Split automatically creates metrics for any events being auto-captured by the Split Suite and RUM Agents ([Web](https://help.split.io/hc/en-us/articles/360030898431-Browser-RUM-Agent#automatic-metric-creation), [Android](https://help.split.io/hc/en-us/articles/18530305949837-Android-RUM-Agent#automatic-metric-creation), [iOS](https://help.split.io/hc/en-us/articles/22545155055373-iOS-RUM-Agent#automatic-metric-creation)). This reduces the manual effort of creating metrics and allows users to easily calculate their engineering and performance metrics.

## April 2024
### 2024-04-16
#### Usability Enhancements
##### Switch Updates 
Users can now use Switch, Split’s in-app AI assistant, to easily summarize their experimentation results. Simply click on any metric card and hit the summarize button for a full analysis of your data. Please note, that this is a Generative AI feature that leverages end-user/customer data and will only be available to users who have specifically requested it to be enabled via Split’s Support team. 

## February 2024
### 2024-02-16
#### Usability Enhancements 
##### Change Request Management 
To help teams easily coordinate and collaborate on flag updates, we added shareable direct links to change requests. This allows teams to quickly share feature flag updates with key stakeholders and get faster approvals when needed.

### 2024-02-09
#### Usability Enhancements
##### Switch Updates

###### Cancel responses mid-flight
Users can cancel a response from Switch mid-flight. This allows users to move forward quickly in cases where they asked the wrong question or if the response they needed was already on the screen.

###### Copy code snippets
Users can now also copy code snippets directly from Switch, enabling faster time to value.

### 2024-02-08
#### Usability Enhancements 
##### Filtering Improvements 
To help teams quickly find the information they are looking for, Split has improved the filtering experience in these lists: **feature flags**, **segments**, and **metrics**. Users’ most recent search filters will be preserved as users continue to navigate the product. 
#### Feature Experimentation
##### Sequential Testing Update
Users can now reduce the [minimum sample size to 100](https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings#minimum-sample-size) at the organizational level via the admin setting. This allows users to get statistically significant results, faster.

## January 2024
### 2024-01-16
#### Usability Enhancements
##### Toast Notification Update 
Toast notifications will now appear in the lower right corner of Split’s UI. This increases the visibility of the notification and enables users to easily take additional action within Split.

### 2024-01-09
#### **SDK Enhancements**
##### **Split Suite, Android SDK**
Users can now automatically capture event data in [Split for their Android S](https://help.split.io/hc/en-us/articles/22622277712781-Browser-Suite)[DK](https://help.split.io/hc/en-us/articles/22916666123277-Android-Suite) without needing additional agents, integrations, or track calls. This eliminates the manual process of sending events to Split, allowing users to quickly set up metrics and alert policies.

### 2024-01-02
#### **SDK Enhancements**
##### **Split Suite, Browser SDK**
Users can now automatically capture event data in [Split for their Browser SDK](https://help.split.io/hc/en-us/articles/22622277712781-Browser-Suite) without needing additional agents, integrations, or track calls. This eliminates the manual process of sending events to Split, allowing users to quickly set up metrics and alert policies.

## Previous releases

### 2023 releases

<details>
<summary>2023 releases</summary>

#### December 2023
## December 2023
##### 2023-12-20
###### SDK Enhancements
####### **RUM Agent iOS**
With [RUM Agent iOS](https://help.split.io/hc/en-us/articles/22545155055373-iOS-RUM-Agent), the iOS SDK will automatically capture event data and send it back to the Split Cloud. Event data will then populate in Split’s Data Hub, similar to impression data. This eliminates the manual process of sending events to Split and enables a quicker setup of metrics and alert policies.


##### 2023-12-19
###### SDK Enhancements
####### React SDK Updates
Split’s [React SDK](https://help.split.io/hc/en-us/articles/360038825091-React-SDK) hooks can now return the SDK’s readiness status and support update parameters to control when an application will render. These properties now allow users to easily refresh application components with just a few lines of code.

The `useSplitTreatments` hook has been optimized to detect duplicate `getTreatment` calls, improving the performance and UX of the application.

##### 2023-12-14
###### Usability Enhancements
####### Dynamic Configurations Update
Dynamic Configuration’s JSON input field now supports text wraps. This allows users to easily view and edit content that contains very long strings like prompts for Large Language Models without needing to scroll horizontally across the screen.

##### 2023-12-12
###### Feature Flag Management Console 
####### Flag Sets 
With [Flag Sets](https://help.split.io/hc/en-us/articles/22256278916621-Using-flag-sets-to-boost-SDK-performance), users can group flags that logically belong together, so that the SDK only retrieves relevant flag definitions when initialized. This reduces SDK latency, memory consumption, and CPU utilization.

##### 2023-12-11
###### Monitoring
####### Event Visualization
With [Event Visualization](https://help.split.io/hc/en-us/articles/360020585772-Events#exploring-events), users are now able to easily view their event data in aggregate directly in Split’s Data Hub without needing an external tool. This enables users to quickly validate if their event data is properly flowing into Split, and see how that event is behaving over time.

##### 2023-12-06
###### Monitoring
####### Custom Metrics Event Grouping (OR)
With [Custom Metrics, Event Grouping (OR)](https://help.split.io/hc/en-us/articles/22005565241101), users have the flexibility to choose more than one base event and aggregate up to 5 different events together when creating metrics. This allows users to build more complex metrics that fit their needs and combine different inputs into one metric.
####### Event Type Management Enhancements
Users can now create metric definitions without needing to set [event types](https://help.split.io/hc/en-us/articles/360020585772-Events#h_01HGZV3J56QGKEV39YJ6KHF36M) beforehand in the Admin UI, removing bottlenecks between admins and users. 
Event types will be automatically deleted after 150 days of no data being received, eliminating the manual process of cleaning up unused types.

#### November 2023
##### 2023-11-29
###### Usability Enhancements
####### Keyboard Accessibility
Users can now use tab-based navigation to access Split’s login page, change summary modal (including approval flow from email), and definitions tab. This is supported on the Edge, Firefox, Safari, and Chrome browsers.

##### 2023-11-09
###### Usability Enhancements
####### Switch 
[Switch](https://help.split.io/hc/en-us/articles/21188803158157) is an in-app AI assistant designed to streamline the use of the Split product. It offers multilingual support, rapid responses, and knowledge-based assistance by utilizing our public documentation and blogs. Switch makes it easy for all developers to get the help they need, without ever leaving the Split interface.

##### 2023-11-02
###### Feature Experimentation
####### Sequential Testing Update
Sequential Testing will now be the default statistical method for all net-new organizations using monitoring and experimentation. 
The minimum sample size for [Sequential Testing](https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings#minimum-sample-size) has been reduced from 200 to 100. This allows users to get statistically significant results, faster.
####### Dimensional Analysis Update
Users can now create up to [20 dimensions with 20 values per dimension](https://help.split.io/hc/en-us/articles/14824241665421-Using-dimensional-analysis#configuring-dimensions-and-values). This gives users even more flexibility when doing a deeper analysis of their feature experiments or releases.

#### October 2023
##### 2023-10-25
###### API Enhancements
####### Different Access Levels for APIs: Roles and Scopes for API Keys 
Define specific [roles](https://docs.split.io/reference/api-keys-overview#admin-api-key-roles) and [scopes](https://docs.split.io/reference/api-keys-overview#admin-api-key-scopes) for Admin API keys. Restrict access to resources at the organizational, workspace, or environment levels. This gives admins more flexibility when granting access to Split’s Public API.

##### 2023-10-10
###### Monitoring
####### **Feature Flag Significance Alerting**
With [Feature Flag Significance Alerting](https://help.split.io/hc/en-us/articles/19832711328397-Configuring-feature-flag-alerting), users can now receive notifications when a statistically significant difference has been observed between two treatments on their flag’s key metrics. Feature Flag alerting is enabled automatically for releases with a percentage allocation. This enables users to make fast, accurate release decisions in a timely manner.
####### Out-of-the-Box Metrics, Browser RUM Agent
Split now [automatically creates metrics](https://help.split.io/hc/en-us/articles/360030898431-Browser-RUM-agent#automatic-metric-creation) for any events being auto-captured by the Split SDK (Browser RUM Agent). This reduces the manual effort of creating metrics and allows users to easily calculate their engineering and performance metrics.

#### September 2023
##### 2023-09-18
###### Integrations
####### Split-Segment Integration Update
The `orginalTimestamp` precision has been updated to go from seconds to milliseconds when sending impressions to Segment. This update makes our timestamp field more consistent with the precision Segment uses.

#### August 2023
##### 2023-08-23
###### Feature Management Console 
####### Feature Flag Editor Enhancements 
The feature flag definitions tab has added two minor UX updates to the editor flow. The treatment section will now automatically collapse once a flag definition has been created/updated. Also, users will be able to view treatment information via the environment cards on the left. These enhancements help the user understand which treatments are available in their environment and guide them to the targeting section.

##### 2023-08-15
###### SDK Enhancements
####### **RUM Agents - Web & Android**
- Users can now automatically capture event data in Split for their [Web](https://help.split.io/hc/en-us/articles/360030898431-Browser-RUM-agent) and [Android](https://help.split.io/hc/en-us/articles/18530305949837-Android-RUM-Agent) SDKs. This eliminates the manual process of sending events to Split, allowing users to quickly set up metrics and alert policies.
###### Monitoring
####### Custom Analysis Time Frame
- With [Custom Analysis Time Frame](https://help.split.io/hc/en-us/articles/360020848451-Applying-filters#selecting-custom-dates), users can now analyze across date ranges regardless of any changes made to the feature flag definition. This enables better flexibility when analyzing results.

##### 2023-08-07
###### SDK Enhancements 
####### **PHP in-memory (PHP Thin Client SDK)**
- Split now supports running PHP [locally](https://help.split.io/hc/en-us/articles/18305128673933) using the [Split Daemon (splitd)](https://help.split.io/hc/en-us/articles/18305269686157) process to store and maintain feature flag data. This eliminates the need to use Redis & the Split Synchronizer while using our PHP SDK and provides a simpler set-up process.

##### 2023-08-03
###### Learning and Onboarding
####### Split Arcade
[Split Arcade](https://help.split.io/hc/en-us/articles/7996112174733-Split-Arcade-self-paced-certifications) is an interactive, gamified experience that provides persona-based technical training, tutorials, and best-practice guidance from industry experts. Users gain access to highly engaging content including product explainer videos, clickable product walkthroughs, manipulatable code examples, and more. With knowledge checks along the way, team members earn professional certifications and LinkedIn badges to validate progress.
###### Language Library Enhancements
####### Flutter Plugin
[Split's Flutter Plugin](https://help.split.io/hc/en-us/articles/8096158017165-Flutter-plugin) brings scalable feature flags to any app, website, or experience built with Flutter. Just inject the service into any component and start evaluating flags and tracking events.

##### 2023-08-01
###### SDK Enhancements
####### **Instant Feature Flags**
- To reduce the latency of updates and increase the [reliability of SDKs](https://help.split.io/hc/en-us/articles/360033557092#streaming-architecture-overview), feature flag update notices delivered via streaming will not require a subsequent network request to fetch the changes. Instead, changes will be contained in the streaming payload itself.

#### July 2023
##### 2023-07-26
###### Integrations
####### **SDK@Edge, Split-Vercel Integration**
- [Split’s integration with Vercel’s Edge](https://help.split.io/hc/en-us/articles/16469873148173) platform provides teams with the ability to incorporate feature flags and experiments into their Edge application and workstreams. Streamline Split data into the Edge without the extra network requests to retrieve config data.

##### 2023-07-24
###### Feature Management Console
####### **Viewer Role**
- Admins can now assign the role, **Viewer**, to users. With the [Viewer role,](https://help.split.io/hc/en-us/articles/16432983870605-Managing-user-permissions) users can now be assigned a role that allows them to view data and objects within the Split application without the ability to make modifications. This will give admins more flexibility and control when assigning roles.

#### June 2023
##### 2023-06-22
###### Experimentation
####### **Sequential Testing**
- [Sequential Testing](https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings#using-sequential-testing) is a statistical testing method that allows users to obtain statistical results without the constraint of an experiment review period. This allows users to receive faster experimentation results, so that they make informed decisions about releases, quickly.

##### 2023-06-07
###### Monitoring
####### Metric Filtering Multiple Comparison Correction (MCC) Update
When filtering your organizational metrics on the Metrics impact page, [MCC will only be applied once for all organizational metrics](https://help.split.io/hc/en-us/articles/360037852431#key-and-organizational-metrics). This will prevent users from seeing different p-values when metric results are filtered.

#### May 2023
##### 2023-05-24
###### Monitoring
####### Disabled Recalculating Metrics
To help prevent unintentional resets of your data, the [recalculate metric button has been disabled](https://help.split.io/hc/en-us/articles/360020844451#About-recalculating-metrics) for feature flags that don't have any data available for calculations or haven't received traffic within Split's data retention period.

##### 2023-05-15
###### Usability Enhancements
####### Simplified Feature Flag Configurations
The [feature flag configuration flow](https://www.split.io/wp-content/uploads/2023/04/Simplified-Feature-Flag-Configurations-1.pdf) on the definition tab has been reimagined with updated terminology and new visual cues. This will enable users to configure flags with a higher degree of confidence for any use case (percentage-based rollout, on/off, etc.).
####### Visual Refresh to the Split User Interface
The entire Split application has gone through a [visual refresh](https://www.split.io/wp-content/uploads/2023/04/Simplified-Feature-Flag-Configurations-1.pdf). Users will see a modern, forward-looking aesthetic with refined colors tuned for accessibility, visual cues, and more.
####### Terminology Change
To reduce the confusion between "Split", our product, and "split", the feature flag, we are [changing the term "split" to "feature flag"](https://www.split.io/wp-content/uploads/2023/04/Simplified-Feature-Flag-Configurations-1.pdf) across our application and documentation.

##### 2023-05-08
###### Integrations
####### Split's mParticle Integration Update
Customers can now map Split traffic types to [mParticle MPID](https://help.split.io/hc/en-us/articles/360038306272#split-as-an-event-output) when sending events to Split.

#### April 2023
##### 2023-04-27
###### Admin API Keys Enhancements
####### Clone API Keys
Users can now [clone API Keys](https://help.split.io/hc/en-us/articles/360019916211#cloning-api-keys) with the same access levels and scope as the key that is cloned. This will enable users to securely change/rotate keys on a regular basis while eliminating manual work.
###### SDK Enhancements
####### TLS support
Split now supports TLS encryption for [Split Synchronizer](https://help.split.io/hc/en-us/articles/360019686092-Split-Synchronizer#cli-configuration-options-and-its-equivalents-in-json--environment-variables) and [Split Proxy](https://help.split.io/hc/en-us/articles/4415960499213-Split-Proxy#cli-configuration-options-and-its-equivalents-in-json-and-environment-variables) endpoints. This will enable developers to further secure their SDK traffic.

##### 2023-04-26
###### SDK Enhancements
####### Mobile SDK Cache Encryption
Developers can now encrypt the persistent cache of rollout plans on their [iOS](https://help.split.io/hc/en-us/articles/360020401491-iOS-SDK#configuration) and [Android](https://help.split.io/hc/en-us/articles/360020343291-Android-SDK#configuration) SDKs. This will help enhance the security of this data.
####### .NET Customizable Network Proxy
Developers can now [configure specific proxies](https://help.split.io/hc/en-us/articles/360020240172--NET-SDK#proxy) using higher precedence than environment variables to perform the server requests for the .NET SDK. This will give developers the flexibility to proxy Split traffic separated from app traffic.

##### 2023-04-06
###### Feature Management Console
####### Essential Scheduling
[Essential scheduling](https://help.split.io/hc/en-us/articles/11461143253517-Using-essential-scheduling) provides the capability to launch a feature on a certain date and time, up to 90 days in advance. This enables users to get all the necessary rollout work done, like getting approvals, long before the release.
####### Simplified Feature Flag Configurations: Split Environment Usability Updates (Release 1)
There are new UI and UX updates to the feature flag editing experience that make the selection of [environments](https://help.split.io/hc/en-us/articles/360020791591) and the editing of flag details more intuitive and easier. The updates include an environment pick list showcasing feature flag traffic per environment, production environment indicators, and upgraded headers to easily edit flag details.
###### Security
####### SCIM Support
With [SCIM Support](https://help.split.io/hc/en-us/sections/14249918421005-SCIM), IT Admins can now manage Split users and groups using their preferred Identity Provider (IdP) including [Azure Active Directory](https://help.split.io/hc/en-us/articles/12386431119245-SCIM-for-Azure-AD) and [Okta](https://help.split.io/hc/en-us/articles/10488076923021-SCIM-for-Okta). This will help streamline the onboarding/offboarding processes as well as reduce the risk when governing users outside one's security platform.

#### March 2023
##### 2023-03-24
###### SDK Enhancements
####### SDK Offline Mode from JSON
Developers can now start their [Go](https://help.split.io/hc/en-us/articles/360020093652-Go-SDK#json) and [Python](https://help.split.io/hc/en-us/articles/360020359652-Python-SDK#json) SDK instances in `localhost` mode, and easily download SDK data in the form of JSON files with just one command. These files can then mimic test or production environments, helping to improve the testing of applications offline.
##### 2023-03-23
###### Feature Management Console
####### Individual Target Key Limit
The [individual target key limit](https://help.split.io/hc/en-us/articles/360020791591) has been updated to 500. This will enable users to deliver changes to their users faster without any impact on the application load times.
##### 2023-03-17
###### Documentation
####### SDK Validation Checklist
The [SDK validation checklist](https://help.split.io/hc/en-us/articles/13998631077901-SDK-validation-checklist) helps users ensure that SDKs are implemented keeping best practices in mind. This checklist defines the general guidelines, checks, and validations that can be useful for developers and software architects to avoid common mistakes or oversights and to ensure optimal performance of the Split SDK.
##### 2023-03-08
###### Experimentation
####### Experiment Review Period Notification
Users will now see a section on their **My Work** page that lists [experiments ready for review](https://help.split.io/hc/en-us/articles/360042494691-My-work#experiments-for-review). This will make it easier and faster for users to access their statistical results and encourage them to take informed next steps.
###### Integrations
####### Split's Amplitude Integration Update
[Split's Amplitude Integration](https://help.split.io/hc/en-us/articles/360046658932-Amplitude#in-split) now supports Amplitude EU instances. This will enable customers using the EU region to properly configure the integration and send Split impressions to Amplitude.
##### 2023-03-01
###### Feature Management Console
####### Metric Audit Logs
[Metric Audit Logs](https://help.split.io/hc/en-us/articles/360020579472-Audit-logs) will now capture when a metric name is updated and when an alert policy is created, updated, or deleted. This will help increase visibility across teams of all the changes made across Split.
#### February 2023
##### 2023-02-27
###### Monitoring
####### Metric Definition Filters
The [metric definition tab](https://help.split.io/hc/en-us/articles/360020843931) has added an additional filter so users can now measure the metric event only if another event was completed beforehand. This will unlock a new way for users to measure the impact of experiments, and interpret their data.
#### January 2023
##### 2023-01-31
###### SDK Enhancements
####### SDK Offline Mode from JSON
Developers can now start their [Java SDK](https://help.split.io/hc/en-us/articles/360020405151-Java-SDK#json) instance in `localhost` mode, and easily download SDK data in the form of JSON files with just one command. These files can then mimic test or production environments, helping to improve the testing of applications offline.
##### 2023-01-26
###### Monitoring
####### Alerting UX Enhancement
Users will now see a [bell icon](https://help.split.io/hc/en-us/articles/360020586132-Creating-a-metric#viewing-metrics) within their metric list to easily identify whether or not an alert policy exists for a metric. If the icon is **white**, then no alert policy exists and if the icon is **gray**, then an alert policy exists for the metric. Clicking on the gray icon will take the user directly to the alert policy page for that metric.
##### 2023-01-23
###### Monitoring
####### Alerting UX Enhancement
Previously, monitoring alerts were only generated when the sample size in each treatment reached 355. Now, users can receive alerts when the [sample size](https://help.split.io/hc/en-us/articles/360020640752#minimum-sample-size) reaches a minimum of 200. This will allow users to fire alerts earlier, whether or not they have configured a lower sample size in their experiment settings.
##### 2023-01-18
###### Monitoring
####### Alerting UX Enhancement
Users can now [manage their alert policy](https://help.split.io/hc/en-us/articles/360020890491-Understanding-metric-impact#actions-you-can-perform) directly from their metric cards on the **Metric impacts** tab. This change will make it simple to find where to manage alerts and/or know if alerts already exist for a metric.

</details>

### 2022 releases

<details>
<summary>2022 releases</summary>

#### December 2022
##### 2022-12-22
###### Feature Management Console
####### Usability Updates on the Targeting Rules page
The usability updates on the [Targeting Rules page](https://help.split.io/hc/en-us/categories/360001538072-Target-Configure) include decluttering the tab, reducing confusion on default rule, and default targeting and starting the UI upgrade journey.
##### 2022-12-15
###### Integrations
####### Split-ServiceNow Integrations
The [Split-ServiceNow Integration Beta](https://help.split.io/hc/en-us/articles/5524203735181-ServiceNow) allows users to send change requests for feature flags and segments to ServiceNow DevOps and receive approvals back. This enables admins to leverage their customized change control process in ServiceNow without leaving the tool with which they're familiar.
##### 2022-12-12
###### Monitoring & Experimentation
####### Metric Card Update
The **Metrics impact** tab now has [redesigned metric cards](https://help.split.io/hc/en-us/articles/360020890491-Understand-impact) to highlight essential information and improve the clarity of experiment data. New visual cues and layout enable users to quickly understand results at a glance.
#### November 2022
##### 2022-11-30
###### Experimentation
####### Dimensional Analysis
[Dimensional Analysis](https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings#dimensional-analysis) allows users to leverage event property data across all their sources to develop a set of dimensions. These can then be used to dissect experimentation results at a deeper level, giving you the insights needed to make better-informed future hypotheses and experimentation iterations.
##### 2022-11-16
###### Learning and Onboarding
####### Split Arcade
[Split Arcade](https://arcade.split.io/certifications) has added a new onboarding and training course, **Level 1: Experimentation for Product Managers**. This approachable, functional certification gives product managers a deep dive into how to get started with experimentation, industry best practices, and hands-on training to learn how to easily build experiments in Split.

</details>

---
title: Feature Flags
date: 2023-01-24T10:00
tags: [NextGen, "feature flags"]
sidebar_position: 6
---

Harness Feature Flags is updated regularly in Harness SaaS. Review the notes below for details about recent changes.

:::note
Harness deploys updates progressively to different Harness SaaS clusters. You can identify the cluster hosting your account in your Account Overview page. The features and fixes in the release notes may not be available in your cluster immediately.

Additionally, the release notes below are only for NextGen SaaS. FirstGen SaaS release notes are available [here](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes) and Self-Managed Enterprise Edition release notes are available [here](/release-notes/self-managed-enterprise-edition).
:::

## January 24, 2023

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues
#### Feature Flag SDKs
- The Android SDK has been updated to version 1.0.18. This fixes a bug that caused unhandled exception errors due to duplicate callbacks during the SDK initialization. (FFM-6395)
- The Flutter SDK has been updated to version 1.0.8. This includes the following:
  - Fixed a bug that caused applications to shut down in response to API errors caused by no internet connection. (FFM-6395)
  - Fixed a bug that caused streaming to stop working if internet connectivity was lost. (FFM-6395) 

## January 23, 2023

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues
#### Feature Flag SDKs
- The Javascript SDK has been updated to version 1.7.0. This fix adds the `Harness-AccountID` and `Harness-EnvironmentID` fields to the HTTP request header in all calls after the initial authorization request. These values are extracted from the JWT, so you don't need to add a value for them. (FFM-6507)

- The Android SDK has been updated to version 1.0.17. This includes the following changes:
  - Fixed a bug that caused a 401 error when the SDK tried to send a request to the `stream` endpoint if the request was to a non-production environment. (FFM-4603)
  -   Fixed a bug that caused the SDK to stop working if an identifier isn't provided during the SDK initialization. The SDK will now use the name if you don't provide an identifier. You will receive an error if you don't provide either a name or identifier as at least one of these is required for all client-side SDKs. (FFM-6396)

## January 19, 2023

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues
#### Feature Flag SDKs
- The Javascript SDK has been updated to version 1.6.0. This includes the following changes:
  - You can now customise the interval of how often metrics data is sent to the metrics endpoint. (FFM-6498)
  - If the metrics data is not successfully posted to the endpoint after two attempts, the data is cleared to ensure the metrics data doesn't get too large and cause performance issues. (FFM-6509)

- The Java SDK has been updated to version 1.1.10. This includes the following changes:
  -  Improvements to how the metrics endpoint processes platform targets. (FFM-6392)
  -  Fixed a bug that caused an error due to incompatibility with an older version of OkHttp. (FFM-6442)
  
- The Ruby SDK has been updated to version 1.0.6. This fixes dependency issues with OpenAPI that caused errors when trying to initialize the SDK. (FFM-6523)

## January 17, 2023

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues
#### Feature Flags on the Harness Platform
If you changed the environment, and then opened the **Pipeline** tab or **Environment** tab on a second screen, the environment you set defaulted to the original one. This has been fixed and the environment you select is consistent through all tabs. 


## January 10, 2023

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues
#### Feature Flags on the Harness Platform

- Fixed a bug that prevented a completion tick from appearing in the UI after an evaluation had successfully passed. (FFM-6127)

- Fixed an error that caused the Complete button at the end of the Get Started flow to link to the beginning of the flow instead of linking to the expected Feature Flag list page. (FFM-5988)

- Resolved an issue that caused you to scroll unnecessarily when you expanded the target attribute or operator dropdown menus when creating a target. (FFM-5187)

- Fixed a bug where scrollbars were unnecessarily displayed in the target groups section of the targets page during loading. (FFM-4053)

#### Feature Flag SDKs
The Ruby SDK has been updated to version 1.0.5. This fixes a bug that caused the SDK to not wait for initialization when using the `wait_for_initialization` method. (FFM-6393)

## December 22, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues
#### Feature Flags on the Harness Platform

Resolved an issue that caused the edit section of a pipeline not to load on the Feature Flag module. (FFM-5948)

## December 13, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

**Feature Flags on the Harness Platform**

Fixed a bug where target names were labelled "UNDEFINED" on the Harness UI if the name contained spaces. (FFM-5866)

**FF SDKs**

The Python SDK has been updated to version 1.1.5. This includes the following changes:

- Fixed a bug where only one target was registered as a metric when multiple, unique targets evaluations were made. (FFM-5995)

- Fixed a bug that caused an error the first time a metrics request was sent. (FFM-5995)

## December 7, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

**Feature Flags on the Harness Platform**

- Fixed a UI bug where the dialog box during the flag creation was shorter in length than it should be. (FFM-5509)

- Resolved an issue that caused flag lists to load slowly. (FFM-5507)

- Fixed a bug that caused flag pipeline stages to continue to run even if previous stages had failed. (FFM-5289)

- Fixed a minor UI bug where the back and next buttons during the Get Started flow were pushed out of the browser view. (FFM-5086)

- Resolved a minor UI bug that caused the empty state image in the Feature Flags landing page to be incorrectly aligned. (FFM-3839)

**Feature Flag SDKs**

The Java SDK has been updated to version 1.1.8. This version includes the following changes:

- Added a check to ensure the correct variations are served when a flag has nested prerequisite flags. (FFM-5306)
- Fixed a bug where the Target ID set by the customer was being overwritten and set to the default value. (FFM-5471)
- Fixed an issue with our internal dependencies that prevented the Java SDK version 1.1.7 from initializing. (FFM-5944)

## December 1, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

**Feature Flag SDKs**

- The .NET SDK has been updated to version 1.1.6. This adds a check to ensure the correct variations are served when a flag has nested prerequisite flags. (FFM-5307)

- The Python SDK has been updated to version 1.1.4. This includes the following changes:

  - Added a check to ensure the correct variations are served when a flag has nested prerequisite flags. (FFM-5263)
  - Fixed a bug where requests continuously repeated themselves when using the SDK's streaming mode. (FFM-5352)

## November 29, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

**Feature Flags on the Harness Platform**

- Minor UI bug resolved in which buttons for creating Flags were sometimes pushed out of the browser view. (FFM-5336)

- Added a warning that Flag Variation names cannot contain only numerical characters. (FFM-4581)

- Resolved an issue where the Getting Started flow was inadvertently showing only Xamarin instructions in some cases. (FFM-5203)

**Feature Flag SDKs**

The Android SDK has been updated to version 1.0.14. This update fixes a bug that prevented metric data from appearing in the UI.

## November 21, 2022

### What's new

A new React Client SDK has been released for Feature Flags as version 1.0.0. To read more about this SDK, see the Reference Guide and the GitHub repository.

### Early access

This release does not include early access features.

### Fixed issues

**Feature Flag SDKs**

- The Ruby SDK has been updated to version 1.0.3. This fixes the following issues:

  - The SDK is now compatible with Ruby 2.6. (FFM-5354)
  - Some JSON was being incorrectly rendered in Flag responses. This has been fixed and responses are in the correct format. (FFM-4755)
  - When using a prerequisite Flag, if the identifier and value were not identical, the wrong value for the original Flag was returned. Now, the correct value is returned. (FFM-5355)
  - Target groups were storing data incorrectly due to an incorrect variable, the variable has now been fixed and data is stored correctly. (FFM-4058)

## November 11, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

**Feature Flags on the Harness Platform**

When submitting an invalid YAML file for Feature Flag steps in a Pipeline, you now receive an error describing why the YAML is invalid. Previously the incorrect YAML was accepted and only showed a general error during pipeline execution. (FFM-4557)

**Feature Flag SDKs**

- The Java SDK has been updated to version 1.1.6.0. This fixes the following issues:

  - A bug where sometimes the SDK was not closed before making a new request. (FFM-3246)

  - Previously when setting metrics to false, the metrics weren't posted but continued to queue. This has been fixed so that they don't queue, therefore saving memory. (FFM-3694)

  - The Java SDK previously took the first value for Flag rules, instead of cycling through all the rules, so the Flag was not evaluated as expected. This issue has been resolved and the SDK now successfully goes through and evaluates the list of rules for the IN clause. (FFM-4744)

  - A thread leak was fixed for the metrics processor. (FFM-4849)

  - Previously the OR and AND operators for Target Group attribute rules were both treated as AND operators. Now, the OR operator works correctly. (FFM-4808)

  - An inconsistency in the percentage distribution of multivariate Flags has been fixed, so the percentages now work correctly. (FFM-4830)

## November 6, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

**Feature Flags on the Harness Platform**

- Added validation messages to Flag pipelines to ensure you know which fields must be completed for your pipeline to run successfully. (FFM-3176)

- Fixed a bug that was causing some failure strategies not to show on Feature Flag Pipeline stages. (FFM-4844)

**Feature Flag SDKs**

The Android SDK has been updated to 1.0.13.

This fixes a big where metric data was not showing in the UI.

## October 31, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

- **Javascript SDK**

  The Javascript SDK has been updated to 1.4.14.

  This fixes a bug to ensure that Target identifiers are sent as a string before authorization, to prevent authorization errors. (FFM-5104)

- **.NET SDK**

  The .NET SDK has been updated to 1.1.5.

  The SDK will now print debug logs for analytics to the console. (FFM-4835)

- **Java SDK**

  The Java SDK has been updated to 1.1.5.3. This fixes the following bugs:

  - OR conditions being incorrectly treated as AND conditions. (FFM-4808)

  - Multivariate Flags using percentage roll-outs showing inconsistent amounts of results based on the inserted percentages. (FFM-4830)

## October 25, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

A potential race condition during initialization was detected in the Android SDK version 1.0.11.

This issue has been resolved in version 1.0.12.

## October 21, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

- Some accounts were not able to use failure strategies on their Feature Flags pipeline stages. We've fixed this bug and all accounts can now use failure strategies. (FFM-4844)
- On the Harness Platform, any Get Started with Feature Flag buttons will now take you directly to the first stage of the Get Started flow, instead of the Overview page. (FFM-4740)

## October 20, 2022

### What's new

This release does not include new features.

### Early access

We've released a beta version of an Apex SDK for Feature Flags.

For more information and to access this SDK, see the Apex SDK reference guide and the GitHub repository.

### Fixed issues

The Python server SDK has been updated to version 1.1.3. (FFM-4744)

This fixes a bug where OR conditions in Target Groups were incorrectly treated as AND conditions.

If you use Target Group functionality, make sure to upgrade to this latest version as soon as possible.

## October 18, 2022

### What's new

You can now add a default pipeline to your Feature Flags that will be applied when you add targeting rules, or when you enable or disable a Flag. This means that you can ensure your Flag changes go through the process you want them to, allowing for better security and more consistent operations. For example, you can add an approval step so all your production Flag changes must be approved before they are executed, or you can send a Slack notification every time a Flag changes.

For more information about how to use a default pipeline for your Flags, go to Add a Default Pipeline for Flag Changes.

### Early access

This release does not include early access features.

### Fixed issues

The Java Server SDK has been updated to version 1.1.5.2. (FFM-4744)

This fixes a notable bug where Target Group evaluations with multiple attributes were not evaluated beyond the first listed attribute.

If you use Target Group functionality, make sure to upgrade to this latest version as soon as possible.

## October 5, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

The Go SDK has been updated to version 0.1.3 to fix the SDK's internal dependencies. You do not need to take any action. (FFM-4678)

## September 29, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

The audit log for a Feature Flag previously didn't show human-friendly messages and did not log all changes, making it difficult to understand what was updated. This has now been fixed and the audit log shows easy to understand messages for all events including adding or removing a clause, or adding an item to the exclusion list. (FFM-4481)

## September 26, 2022

### What's new

For self-serve customers, you can now create and upgrade a Feature Flags subscription directly through the Harness Platform instead of contacting our Sales team, meaning you can manage your subscription quickly, securely, and at any time.

For information about the current plans you can subscribe to, go to Pricing & Plans. For more information about how to use subscriptions, go to Subscribe to Feature Flags.

### Early access

This release does not include early access features.

### Fixed issues

This release does not include fixed issues.

## September 9, 2022

### What's new

The Feature Flag PHP SDK has been released. This means you can now connect an application that uses PHP when using Harness Feature Flags.

For more information about the PHP SDK, go to the PHP Reference Guide. For information about Feature Flag SDKs, go to our SDK Overview.

To get the SDK, go to our PHP Git Repository.

### Early access

This release does not include early access features.

### Fixed issues

The Node.js SDK has been updated to version 1.2.8. (FFM-4494)

This update fixed a bug that caused the SDK to unexpectedly shut down when a Target Group was deleted. This has been fixed and you can now deleted Target Groups without issue.

## September 1, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

The .NET SDK has been updated to version 1.1.4. (FFM-4463)

This update fixed a bug that occurred when running the SDK with the Relay Proxy in offline mode. This has been fixed and the SDK can now run the Relay Proxy in offline mode.

## August 31, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

The Python SDK has been updated to version 1.1.2 to update two of the dependencies in the SDK. For security purposes, please ensure to update the SDK to this version. (FFM-4425)

## August 25, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

The .NET SDK has been updated to version 1.1.3. Fixes in this update include:

- The package name for the SDK has changed from ff-netF48-server-sdk to ff-dotnet-server-sdk. To use this version, make sure you remove the old package name and use the new one.

- The sample app in the .NET SDK Git repository has been updated to the new version 1.1.3. (FFM-3651)

- The default configuration of the .NET SDK didn't have analytics enabled. (FFM-3520)

  This has been fixed and analytics is now set to true and enabled as default.

- When using the Relay Proxy with the .NET SDK, the URL for sending events was incorrect. (FFM-3652)

  The events URL has now been updated so it directs to the correct place.

- The .NET SDK README file has been updated to rename the Target data. (FFM-3759)

  The example Target data is now consistent across the sample code in the README and the SDK Reference Guide.

- The .NET SDK README file has updated to remove an extra period and a reference to debugging that was causing the example to fail. (FFM-4306)
  You can now run the example successfully.

- When evaluating Target Groups that used an IN operator, the SDK was only evaluating the first Target. (FFM-4358)
  The logic has now been fixed so that the SDK will check all values when an IN operator is used for a Target Group.

## August 18, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

**Feature Flags on the Harness Platform**

- When creating a stage on pipeline template, Name and Description fields were displayed . (FFM-4098)

  As these fields are not required for creating a stage using a template, they have been removed from the About your Stage screen. You will no longer be able to enter a name and description for stages on a Pipeline template, but note this applies to templates only.

- When using a Pipeline and configuring a Flag stage, only the first 15 Flags in your Project would appear as an option in the Select Flag menu. (FFM-3716)

  This has been fixed and you can now select any Flag in your Project.

**Feature Flag SDKs**

The Python SDK has been updated to Version 1.1.1. Fixes in this update include:

- Removing the type of Flag check on Prerequisite Flags. (FFM-3868)

  Previously, if you created a Multivariate Flag as a Prerequisite Flag, once you turned the Flag on you couldn't turn it off again. This bug has been fixed and you can now turn Flags with Multivariate Prerequisite Flags.

- The Node.js SDK has been updated to Version 1.2.7. Fixes in this update include:
  - When using conditions for Target Groups, and conditions were treated as or conditions, meaning some Targets were not selected. (FFM-4331)
    This has now been fixed and conditions are treated correctly.

## August 8, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

**Feature Flags on the Harness Platform**

- On the Harness Platform, when no Environment had been added to a project, the tooltip for a Flag toggle was displaying HTML. (FFM-4094)

  This has been fixed to remove the raw HTML text.

- On the Harness Platform, when the value of a Variation was set as a long non-breaking string, the content on the left bar of the Flag detail page overflowed into the main content of the page. (FFM-4010)

  This has been fixed so that the value will now wrap correctly.

**Feature Flag SDKs**

The Go SDK has been updated to Version 0.1.2. Fixes in this update include:

- The polling interval is now measured in seconds instead of minutes. (FFM-3676)
  This means the interval is now 60 seconds, instead of 1 minute. If you are using the default configuration, there are no actions for you. If you configured the polling interval, you need to convert the configuration from minutes to seconds. For more information, see Configure the SDK in the Go SDK Reference Guide.
- A check has been added to ensure that when a Flag has nested Prerequisite Flags, the correct Variations are served. (FFM-4043)
  You can now turn off analytics using the Go SDK. For more information, see Configure the SDK in the Go SDK Reference Guide. (FFM-3677)

## August 1, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

- During the Feature Flag Getting Started tutorial on the Harness Platform, some buttons displayed an extra + symbol. (FFM-4056)

  This has been fixed and the extra symbols have been removed.

- On the Harness Platform, when adding a Flag to a Target, some text boxes did not adjust to fit the full width of the table. (FFM-4055)

  This has now been fixed and the text boxes adjust as necessary.

## July 27, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

An issue where Flag Evaluations where always returning the default Variation in the Feature Flag Node.js SDK has been fixed. Previously, if the Target you sent to Evaluate against a Flag was part of a Target Group, the default Variation was always returned instead of the valid Variation for that Flag. This is now fixed and the correct Variation is returned for all Targets. (FFM-4175)

Due to this fix, the Feature Flag Node.js SDK has been updated to version 1.2.6.

## July 18, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

On the Harness UI, when you deleted the Environment you were currently active in, the identifier for that Environment should have been removed from the URL but wasn't. (FFM-3984)

This issue has been fixed and the Environment identifier is now removed from the URL when you delete an active Environment.

## July 11, 2022

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

- On the Target and Target Group page UI, when there are no Flag rules added the layout is now correctly aligned and stretches to the full available height. (FFM-3931)

- On the Flags page UI, when you enter a search term that returns no results, the search bar is no longer cleared and you can use the Clear Search button. (FFM-3877)

- When filtering Flags and you receive more than a single page of results then reset the filter or select another filter, the page number is updated correctly. (FFM-3876)
- When editing a multivariate Flag that has two Variations, the trash icon is now displayed at the end of each Variation row. (FFM-3714)

- The Retry button displayed when there is an error now reloads the Flag endpoint instead of the Environment endpoint. (FFM-3713)

- On the Flag details page, the Save or Cancel footer now aligns correctly with the panel. (FFM-3712)

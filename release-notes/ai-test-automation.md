---
title: AI Test Automation Release Notes
sidebar_label: AI Test Automation
date: 2025-05-22T10:00
sidebar_position: 19
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/chaos-engineering/rss.xml" />

The release notes describe recent changes to Harness Chaos Engineering.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness.  In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## May 2025

# Relicx Release Summary \- Harness Platform Integration

**Production Release: May 30, 2025**
### New Features

**Test Suite Configuration**
- Added configurable test suite run timeout settings
- Implemented automatic saving of test schedule configurations when deleted

**Visual Testing Enhancements**
- Added bounding box highlighting for visual assertions
- Set interactive replay mode to false by default

### Enhancements

**Test Execution Reliability**
- Improved batch based exception handling during test suite execution
- Enhanced test run process management with proper status updates
- Fixed test suite abort handling for terminal jobs
- Updated admin job timeout status reporting to show "Timed Out" instead of "Executor Failed"

**Performance & UI Improvements**
- Increased memory and CPU allocation for test session flush operations
- Fixed test name truncation in test run pages
- Increased test runs table header height
- Fixed effective status calculation when test count equals zero

**Platform Integration**
- Updated configuration for Harness CI/CD release workflow compatibility
- Changed remote entry path for ATA module

**Production Release: May 22, 2025**

## New Features

### **Harness Platform Integration**

* **AI Test Automation Module**: AI Test Automation is now available as a native module within the Harness platform.  
* **Unified Access**: Harness users can now access AI Test Automation directly from within the Harness platform interface.

<DocImage
  path={require('./static/ai-test-automation-menu.png')}
  alt="AI Test Automation menu"
  title="Click to view full size image"
  width={1080}
  height={600}
/>



* **Pipeline Studio Integration**: AI Test Automation can now be added to Harness CD Pipelines using a graphical no-code interface, enabling test suites to launch as part of Harness CD pipeline workflows.


<DocImage
  path={require('./static/ai-test-automation-pipeline.png')}
  alt="AI Test Automation menu"
  title="Click to view full size image"
  width={1080}
  height={600}
/>

### **AWS Batch Test Execution Infrastructure**

* **Enhanced Scalability**: New test suite execution infrastructure based on AWS Batch for improved performance and scalability  
* **Better Resource Management**: Optimized resource allocation and retry mechanisms for more reliable test execution

## **Enhancements**

### **Test Suite Management**

* **Complete Run History**: Full test suite run history is now available in the test suite details → history tab, providing comprehensive visibility into past executions.

### AI & Testing Improvements

* **Google Vertex Claude 3.7**: Upgraded AI engine support for better test automation  
* **Enhanced AI Assertions**: Improved AI assertion capabilities with better context handling  
* **Multi-language Support**: Fixed non-English character handling in AI-generated screenshots

### Quality Improvements

* **UI/UX Refinements**: Enhanced modal displays, loading states, and navigation workflows  
* **Test Execution Stability**: Improved assertion logic and validation handling  
* **Integration Reliability**: Better error handling and recovery for platform connectivity  
* **Performance Optimization**: Asset caching and network capture improvements  
* **Enhanced Slack Integration**: Improved notifications with environment context and better URL formatting

---

**This release marks a significant milestone, bringing AI Test Automation directly into the Harness platform ecosystem while delivering improved scalability and comprehensive test management capabilities.**


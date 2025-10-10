---
title: AI Test Automation Release Notes
sidebar_label: AI Test Automation
date: "2025-09-29T19:40:56+05:30"
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/ai-test-automation/rss.xml" />

The release notes describe recent changes to Harness AI Test Automation.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness.  In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::
## September 2025

### 2025.09.v3

#### New Features

##### Assert Wait for Question  
This powerful new assertion command lets users pause test execution until a specific user-defined question or condition is true. Built on the `wait for text` assertion command, it opens up dynamic, context-aware validation capabilities that make your tests smarter and more flexible than ever before.

<DocImage path={require('./static/ait/assert-wait-for-ques.png')} alt="Assert Wait for Question" title="Assert Wait for Question" width="600" height="500" />


##### Completely Overhauled Test Step Design  
The look and functionality of test steps have been fully transformed to enhance clarity and usability. Highlights include:  
- The “Validations” tab renamed to “Step Insights,” with validation details shown directly and auto-validations surfaced much more intuitively.  
- New icons communicate step status more effectively, including a retrain badge for steps needing AI retraining.  
- Execution time and locator types are now visible for each step, offering deeper insights at a glance.  
- The approval workflow is refined for multiple issues, with suggestion actions scoped per issue, making triage simpler and more granular.

<DocImage path={require('./static/ait/ui-test.png')} alt="UI Test" title="UI Test" />

##### Locator Configuration in IA/IE  
Take full control of your element selectors during Interactive Authoring and Interactive Editing! This new feature enables users to configure locators while editing steps, improving precision and reducing test maintenance headaches by ensuring the best possible target identification for elements.

<DocImage path={require('./static/ait/edit-write.png')} alt="Edit Write" title="Edit Write" width="600" height="500" />


#### Enhancements and Bug Fixes

- **Max Test Parallelism Error Display:** Users now get instant feedback with an error when setting parallelism beyond allowed limits on suite details, enforcing correct configurations upfront.  
- **Reliable Parallel Task Handling:** Errors in AI commands or fast tasks cause immediate task failure rather than just warnings, reducing confusion and improving error tracking.  



### 2025.09.v2


#### Enhancements and Bug Fixes

* **CLI Download for Test Results** : Quickly download CSV and JSON files from the CLI, to get all the test results in a single file just by clicking the link available after the test it run in the python cli itself.
* **Better Gzip Debugging** : Troubleshooting compression-related issues is now easier with enhanced debugging support.
* **Timezone Accuracy for Indonesia (WIB)** : Fixed an issue where some timezone abbreviations were not recognized. Scheduling and reporting now correctly reflect local time in Indonesia, preventing errors.
* **Improved Filter Visibility** : Active filters now appear as chips, giving you a clear view of the criteria applied when exploring test data.
* **Fail Tasks Immediately on AI Command or Fast Task Errors** : Tasks now properly fail if AI Commands or Fast Tasks encounter errors. Previously, failures were only flagged as warnings, which could cause confusion.
* **Aligned Date Selection** : The start and end dates now default correctly and remain consistent in the interface, improving accuracy in reports and dashboards.
* **Overseer Task Completion Fix**  : Overseer now completes tasks reliably, reducing delays caused by screenshot-based prioritization.
* **Smarter Element Selection** : Relicx-specific ID attributes are now ignored in `smartselector`, ensuring more reliable element detection and reducing false positives in task execution.



### 2025.09.v1
#### New Features

- **API Response Interception**: Added capability to intercept and analyze API responses during test execution for enhanced debugging and validation
- **Pagination Enhancement**: Added pagination options to display more than 20 items per page across test listings and results
- **CSV/JSON Content Generation Control**: Introduced configurable settings to control automatic generation of CSV and JSON content during test suite execution
- **AI-Powered Parameter Generation**: Enabled 'Generate with AI' functionality in parameter creation to support deterministic value generation for dates
- **Test Case Import with Assertions**: Added support for creating assertions and parameters during the 'Import Test Case' process

#### Enhancements

- **AI Thoughts Visibility**: Enhanced AI transparency by showing AI thoughts during execution of If/elseIf commands and on assertion failures
- **Download Directory Navigation**: Added support for navigating to DOWNLOAD_DIR for improved file handling workflows
- **Copilot Step Interactivity**: Made copilot steps clickable during execution in Interactive Authoring mode
- **Screenshot Retry Logic**: Implemented automatic screenshot retry mechanism when confidence levels fall below retraining threshold

#### Bug Fixes

- **Parameter Handling**: Fixed issues where empty string values were not being properly set in parameters
- **Cursor Position**: Resolved cursor position reset issue when entering values in input fields
- **Live Edit Improvements**: Fixed flickering and reload issues in Live Edit functionality
- **Test Suite Navigation**: Corrected redirection problems when navigating from test details page to view test suite
- **User Input Validation**: Prevented entry of invalid characters in parameter name input fields
- **Login URL Display**: Fixed incorrect display of LOGIN_URL and START_URL for navigate commands
- **Test Export/Import Error Propagation**: Improved error handling and email notifications for test export/import operations
- **UI Styling**: Resolved double scrollbar visibility issues in Harness integration interface
- **Polling Optimization**: Decreased polling intervals for All Test Listing Page to improve responsiveness

## August 2025

### New Features
- **Binary File Upload**: Added support for uploading files during test execution
- **Sequential Tasks**: Create multi-step workflows that execute in sequence
- **LLM Test Naming**: Tests now automatically generate descriptive names using AI
- **Smart Popup Handling**: Improved popup management - blocks unwanted popups while allowing user-triggered ones
- **Data-Driven Testing**: Upload JSON files via CLI to run tests with multiple data sets

### Enhancements
- **AI Models**: Added support for Claude 4 and GPT-5 for better test generation
- **Test Import**: Email notifications now sent when importing test suites
- **Certificate Generation**: Added UI tool for generating test certificates
- **Performance**: Improved screencast recording performance

### Bug Fixes
- Fixed test suite run history filters not working properly
- Resolved issues with automatic file upload detection
- Fixed date selection problems in Google Flights testing
- Corrected step ordering issues when importing test cases

## July 2025

### New Features
- **Test Suite Export/Import**: Export and import complete test suites with email notifications
- **Database Testing**: Added support for MongoDB and PostgreSQL database queries with secure tunnel connections
- **AI Token Usage**: View AI token consumption on test run pages with sorting capabilities
- **Smart Date Selector**: New AI command for intelligent date selection
- **Environment Export**: Export test environments along with tests

### Enhancements
- **Shadow DOM Support**: Tests can now interact with elements inside shadow DOM structures
- **Parameter Management**: Improved parameter creation and editing experience
- **UI Updates**: Updated branding from "CoPilot" to "Harness AI" throughout the interface
- **Error Explanations**: Added detailed explanations when AI tasks fail
- **Date Handling**: Better timezone support when working with dates

### Bug Fixes
- Fixed Slack notification channel selection issues
- Resolved UI styling problems with input fields and buttons
- Fixed replay functionality not showing latest changes
- Corrected AWS Batch test execution reliability issues
- Fixed table alignment and severity text display issues

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


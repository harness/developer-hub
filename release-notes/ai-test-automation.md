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

## Major Features & Enhancements

### Harness Integration Improvements
- **Enhanced Harness Integration**: Added comprehensive support for exposing RelicX as part of Harness platform with improved authentication and setup APIs
- **Harness Identifiers**: Added Harness identifiers to application and organization entities for better integration
- **Webhook Integration**: Updated Harness webhook URLs to include gateway and routing IDs for improved connectivity
- **App Synchronization**: Automatic app name updates in RelicX when Harness project names are changed
- **Multi-Organization Support**: Fixed issues with same applications being created across multiple organizations

### AI & LLM Enhancements
- **Google Vertex Claude 3.7**: Enabled Google Vertex AI with Claude 3.7 support
- **Enhanced AI Assertions**: Fixed non-English character issues in AI assertion screenshots
- **Contextual AI**: Added 'use page HTML as context' flag to 'User Question' functionality in conditional statements
- **LLM Response Handling**: Improved JSON response handling when LLM services are not responding properly

### Test Execution & Validation
- **Step-Level Navigation**: Added step-level wait configurations for navigation
- **Smart Selector Fallbacks**: Enhanced XPath overrides to respect fallback-to-smart-selector configurations
- **Validation Improvements**: Navigation issues now generate validation warnings instead of failing tests entirely
- **Test Suite Status**: Enhanced test suite status calculation to account for AWS Batch level failures

## Infrastructure & Performance

### AWS Batch Optimizations
- **Retry Logic**: Set AWS Batch level retries to 2 for improved reliability
- **Throttling Handling**: Added retry mechanisms for throttled AWS Batch requests
- **Resource Management**: Increased IA (Interactive Automation) pods to 14 to avoid pod starvation
- **Pod Size Configuration**: Added documentation for AWS Batch pod size permutations

### Caching & Performance
- **Asset Caching**: Enabled assets caching for test sessions by default
- **Selective Caching**: Added ability to disable cache for specific organizations
- **Network Capture**: Changed default value of `disableAllNetworkCapture` to false for better debugging
- **Tunnel Prioritization**: Prioritized tunnel usage over static IP connections

## Bug Fixes & Stability

### UI & User Experience
- **Modal Improvements**: Added error modals for validation failures in IA/IE
- **Loading States**: Removed infinite spinning wheels from various UI components
- **Tab Management**: Fixed application page resetting to script tab when creating environments
- **App Switching**: Fixed UI not automatically switching to newly created applications
- **Edit Step Issues**: Resolved edit step opening select command sidebar unexpectedly

### Test Execution Fixes
- **Assert Not Exists**: Fixed assertion logic for non-existent targets to pass correctly
- **Framework Errors**: Resolved race condition causing framework errors in Cast mode
- **Wait for Text**: Improved event handling to get all events since the start index of the last step
- **Regex Pattern Handling**: Tests no longer fail when regex patterns take longer than expected
- **Test Suite Abortion**: Fixed test suite abortion functionality

### Data & API Improvements
- **Filter Metadata**: Added test suite ID and environment ID as filter fields
- **API Logging**: Enhanced request and response logging for API calls
- **Validation Count**: Removed validation failures from issues count for cleaner metrics

## Security & Configuration

### Authentication & Access
- **SSO Integration**: Added test-sso-secret to local development environment
- **Token Handling**: Cleaned up unnecessary error logs for non-Harness tokens
- **Multi-App Security**: Fixed security issues preventing same app creation across multiple organizations

### Environment Management
- **Environment Filtering**: Added environment ID as a test suite run filter field
- **Configuration Overrides**: Ensured IA/IE respects step-level configuration overrides
- **Placeholder Updates**: Updated placeholders throughout the system for better clarity

## Monitoring & Notifications

### Slack Integration
- **Environment Context**: Added environment information to Slack notifications
- **URL Improvements**: Fixed Slack integration URLs to show full paths
- **Updated Invite Links**: Updated Slack workspace invitation URLs

### Status & Reporting
- **Test Suite History**: Added filtration capabilities to test suite run history page
- **Warning Status**: Test suite validation logic now recognizes `DONE_WITH_WARNINGS` status
- **Backend Status Computation**: Ensured effective test suite run status is computed in backend
- **Warning Icon**: Fixed warning icon sizing issues in UI

## Development & Maintenance

### Build & Deployment
- **Build Fixes**: Multiple build issue resolutions and optimizations
- **Window Changes**: Removed problematic window-related changes
- **Error Handling**: Improved error handling for fetch request failures
- **Information Logging**: Stopped excessive information logging in UI

### Code Quality
- **Asset Bot Checks**: Added safety checks before caching assets with asset bot
- **Race Condition Fixes**: Resolved various race conditions in the codebase
- **API Call Optimization**: Fixed multiple unnecessary API calls to setupHarnessApp

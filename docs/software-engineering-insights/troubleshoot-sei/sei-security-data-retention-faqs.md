---
title: Security & data retention FAQs
description: Frequently asked questions related to SEI security and data retention policies.
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page includes FAQs and troubleshooting information for SEI module.

### How long does SEI store data and for what time period can we go back in history in the widgets?

<Tabs
  defaultValue="sei1"
  values={[
    { label: 'SEI 1.0', value: 'sei1' },
    { label: 'SEI 2.0', value: 'sei2' },
  ]}>
  
  <TabItem value="sei1">
  
  The default historical data backfill duration depends on the integration:  
    - Jira supports up to **1 year** of historical data.  
    - GitLab and GitHub support up to **14 days** of historical data.  
    - HarnessNG supports up to **30 days** of historical data.  
  
  Requests for extended historical backfill beyond these default durations are handled manually on demand.  
  
  Data retention periods vary by data source:  
  
    - Instant Messages (IMs): **1 year and 3 months**  
    - Source Code Management (SCM): **No limit**  
    - Continuous Integration / Continuous Deployment (CI/CD): **No limit**
  
  </TabItem>
  
  <TabItem value="sei2">
  
  The default historical data backfill is **3 months** when a new integration is created.  
  
  </TabItem>
</Tabs>


### What is the idle session timeout, and is there a non-idle session timeout?

The idle session timeout is currently set to 3 hours. This means that when a user is inactive for 3 hours, the user interface (UI) will automatically log them out and terminate their session.

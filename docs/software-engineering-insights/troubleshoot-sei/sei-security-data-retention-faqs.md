---
title: Security & data retention FAQs
description: Frequently asked questions related to SEI security and data retention policies.
sidebar_position: 50
---

This page includes FAQs and troubleshooting information for SEI module.

### How long does SEI store data and for what time period can we go back in history in the widgets?

SEI stores data for different time periods depending on the tool. For SCM (source code managers) tools, SEI typically fetches data for the last 30 days. In the case of Jira, SEI can provide information about tickets that have been updated in the last year and more.

### What is the idle session timeout, and is there a non-idle session timeout?

The idle session timeout is currently set to 3 hours. This means that when a user is inactive for 3 hours, the user interface (UI) will automatically log them out and terminate their session.

---
title: Reports FAQs
description: Frequently asked questions related to SEI Reports
sidebar_position: 60
---

This page includes FAQs and troubleshooting information for SEI Reports.

### What is the usage of OU UNIT OVERRIDES field in the report settings?

The OU UNIT OVERRIDES field in the report settings allows you to override filters defined at the Collections scope. This means that the report will display data based solely on the report filters, ignoring the Collection filter.

For example, suppose the Collection filter specifies that the Assignee must equal a certain value (e.g., a specific user). If you select "Assignee" in the "OU UNIT OVERRIDES" field, it will override the Collection filter. As a result, the report will display data for all users, not just the user specified in the Collection filter.
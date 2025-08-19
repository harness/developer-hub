---
title: Admin API Examples
description: Learn how to automate common tasks using the Admin API.
sidebar_position: 8
sidebar_label: Examples
---

## Overview

Whether you're managing feature flags at scale, migrating between environments, or reporting on usage, these examples are designed to help platform and release engineering teams speed up workflows and enforce governance.

## Common use cases

You can use these sample scripts to automate common tasks with the Admin API. 

:::tip
All examples use the Python PyPi library for the Admin API, and require access tokens with Admin permissions. For setup instructions, see [Python PyPi Library](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
:::

### Flag lifecycle management

- [Find all Feature Flags that depend on a given flag](./find-flags)
- [Delete a list of Feature Flags and their definitions](./delete-list)
- [Export all feature flag definitions to JSON files](./export-flag-definitions)
- [Copy feature flags with their definitions between projects](./copy-flags)
- [Copy and overwrite feature flag definitions between environments](./copy-flag-definition)
- [Export feature flags treatments to YAML file](./export-treatments)
- [Get list of feature flags in an environment with rollout status](./get-list)
- [Report flags with 100% treatment and no changes since a given date](./report-flags)

### Targeting and segments

- [Import thousands of keys to an existing segment](./import-keys)
- [Delete thousands of keys from a segment](./delete-keys)
- [Copy segment content to another segment](./copy-segment)
- [Add segment to individual targets for a group of feature flags](./add-segment)
- [Add user keys to individual targets in a flag](./add-keys)
- [Add targeting rule to an existing feature flag](./add-targeting-rule)

### User and identity management

- [Fetch list of all feature flag users](./fetch-list)
- [Create custom attribute and update an existing Identity](./customer-attribute)

### Metadata and reporting 

- [Extract list of tags for flags and segments](./extract-list)
- [Export flags that haven’t received impressions since a certain date](./export-flags)
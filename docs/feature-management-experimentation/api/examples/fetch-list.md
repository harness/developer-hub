---
title: Fetch a List of All Feature Flag Users
description: Learn how to fetch a list of all users invited to your Split account using the Admin API.
sidebar_position: 5
sidebar_label: Fetch a List of All Feature Flag Users
---

## Overview

Use this script to fetch a list of all users that were invited to the Split account.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.

Run this script using Python 3 from your local machine or preferred development environment.

```python
from splitapiclient.main import get_client

client = get_client({'apikey': 'ADMIN API KEY'})
for user in client.users.list('ACTIVE'):
    print (user._email, user._status)
for user in client.users.list('DEACTIVATED'):
    print (user._email, user._status)
for user in client.users.list('PENDING'):
    print (user._email, user._status)
```
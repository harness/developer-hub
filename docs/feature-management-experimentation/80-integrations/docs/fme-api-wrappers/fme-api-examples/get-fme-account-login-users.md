---
title: Get FME account login users
sidebar_label: Get FME account login users
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360058868152-Python-Admin-API-sample-Fetch-list-of-all-feature-flag-users </button>
</p>

Basic Code to use Python to fetch list of all users invited to the Split account.

The script will use the REST Admin API to perform the actions.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.

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
---
title: Python PyPi library for FME API
sidebar_label: Python PyPi library for FME API
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 1
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4412331052685-Python-PyPi-library-for-Split-REST-Admin-API <br /> ✘ TODO: move the <b>Split Python API CLI object reference</b> to the github (README)[https://github.com/splitio/python-api/blob/master/README.md] file. </button>
</p>

The Python library provides full support for Split REST Admin API. It allows you to create, delete, and edit environments, feature flags, feature flag definitions, segments, segment keys, users, groups, API keys, change requests, attributes, and identities. Refer to [Split Admin API](https://docs.split.io/reference/introduction) for more information. The library source is available at this [github repository.](https://github.com/splitio/python-api)

# Language Support
The Python lib supports Python 3 (v3.3 or later).

## Installation
Install the splitapiclient package using the following:

    pip install splitapiclient

## Initialization and Logging
Import the client object and initializes a connection using an Admin API key:

```
from splitapiclient.main import get_client  
client = get_client({'apikey': 'ADMIN API KEY'})
```

### Enable optional logging

```
import logging  
logging.basicConfig(level=logging.DEBUG)
```

### Handling Rate Limit 
When the library receives 429 http response because of limit rate, it waits for five seconds and then retries the http request.  
   
# Objects Reference

See the [README](https://github.com/splitio/python-api/blob/master/README.md) file for the complete Split Python API CLI object reference.
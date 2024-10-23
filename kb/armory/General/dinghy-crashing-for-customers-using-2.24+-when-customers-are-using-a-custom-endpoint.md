---
title: Dinghy Crashing for Customers using 2.24+ when customers are using a Custom Endpoint
---

## Issue
Customers using a Custom Endpoint are seeing crashes occur using 2.24+.  Upon observing the Dinghy logs, there is a notification that the service is attempting to reach out to ```api.github.com``` instead of the set custom endpoint.  
Below is an example of such an error
```2021/05/09 04:51:01 POST https://api.github.com/repos/armory-test/dinghy-test/commits/9999xx999x9xx9xxx9xx99x99x99xx99x9x99xx9/comments: 401 Bad credentials []```

## Cause
As of 2.24.x, a change was made to push comments on Dinghy outputs back into the comment of the PR.  This is a part of the notifications setting that was added to Dinghy to allow for more robust and detailed information about the results from a PR commit.  Currently, the notification only supports using Github Cloud, using the ```api.github.com``` endpoint, and does not account for custom endpoints


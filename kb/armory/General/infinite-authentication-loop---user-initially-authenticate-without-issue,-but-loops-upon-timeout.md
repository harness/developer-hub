---
title: Infinite Authentication Loop - User Initially Authenticate WIthout Issue, but Loops upon Timeout
---

## Issue
End users may find that they they are able to initially able to sign in to an environment without issue.  However, upon a timeout, the loop occurs between SAML authentication (as an example, OKTA)  and the Spinnaker environment.
Users cannot access the environment again unless they log out, and the log back in to the authenticator.  At this point, users can access the environment once again  

## Cause
The temporary token between the authenticator and Spinnaker is still valid, but the Spinnaker Timeout Session has signed the user out.  This causes a loop between Spinnaker and the Authenticator


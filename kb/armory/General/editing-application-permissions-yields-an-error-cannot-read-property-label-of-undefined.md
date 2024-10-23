---
title: Editing application permissions yields an error "Cannot read property 'label' of undefined"
---

## Issue
When trying to edit the application config and provide permissions to user by going to the application -> selecting config -> edit the application attribute -> permissions -> add user.
However, the user permission cannot be added and the following error message is seen:
Cannot read property 'label' of undefined
TypeError: Cannot read property 'label' of undefined
    at https://...
    at Array.map ()
    at PermissionsConfigurer_PermissionsConfigurer.render (https://......)
    at gi (https://.....)
    at fi (https://.....)
    at Rj (https://.....)
    at Qj (https://....)
    at Kj (https://....)
    at yj (https://......)
The UI shows the following: "Oh dear, something has gone wrong"

## Cause
This error is related to the following issue:[https://github.com/spinnaker/spinnaker/issues/5986#issuecomment-686650114](https://github.com/spinnaker/spinnaker/issues/5986#issuecomment-686650114)This issue is caused by a group is set up twice with different permissions. 


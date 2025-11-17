---
title: Authorization Configuration with File Based Role Definitions
---

## Introduction
One of the nice things of Spinnaker is that authentication (login, “authn”) and authorization (permissions, “authz”) are loosely coupled.Although usually you use the same provider for both, like GitHub or LDAP, it’s possible to have different providers.After you have [authentication working](https://www.spinnaker.io/setup/security/authentication/) ([hal commands](https://github.com/spinnaker/halyard/blob/master/docs/commands.md#hal-config-security-authn)), you can enable file based authorization to see Spinnaker’s permissions logic working. This is ideal for changing a user’s roles and defining different roles without actually changing your production authorization role provider, since this usually not only requires knowledge that a Spinnaker administrator may not have readily available, but also it’s usually performed by specialized security teams under strict rules. 

## Prerequisites
N/A

## Instructions
File based authorization is basically a yaml file that has the mappings between user names and role names:
```
users:
 - username: foo
   roles:
   - bar
   - baz
 - username: batman
   roles:
   - crimeFighter
   - jokerJailer
 - username: robin
   roles: []
 - username: joker
```

Roles don’t need to be defined elsewhere, they’re automatically created based on these mappings.
First you need to know the actual user names provided by the authentication mechanism, for this you can take a look at the upper right corner of Spinnaker’s UI to find the exact user name of the logged in user:

Then you need to create a file like the one above defining username-role mappings, and enable file based authorization in halyard:
```
hal config security authz file edit --file-path ${ROLES_FILE}
hal config security authz edit --type FILE
hal config security authz enable
hal deploy apply
```

To verify that this configuration is working, there should be no errors in fiat pod, and going to an application configuration section under Application Attributes, should show a new field called ```Permissions```:

The dropdown will show *the roles available to the logged in user*, it won’t show all the roles defined in the file. Also, you may need to clear cookies, logout and login or use an incognito window in order to see this new field available.

Once you have authorization in place, you can continue with:
* [Restricting access to applications](https://www.spinnaker.io/setup/security/authorization/#applications)
* [Restricting access to cloud accounts](https://www.spinnaker.io/setup/security/authorization/#accounts)
* [Defining service accounts for automatic pipeline triggers](https://www.spinnaker.io/setup/security/authorization/service-accounts/)
Remember that if you’re configuring these restrictions, when you move to the real role provider its role names should exactly match the ones you defined in the file.


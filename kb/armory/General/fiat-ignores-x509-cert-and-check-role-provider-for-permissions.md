---
title: Fiat Ignores x509 cert and Check Role Provider for Permissions
---

## Issue
When a x509 cert is created, Fiat seems to ignore the roles in the cert and instead will search the Role Provider for the roles.

## Cause
The user will need to make sure they have ```x509.role-oid``` set or Fiat will switch to loading from the Role Provider and won't merge the roles with the cert. This can cause Fiat to look at the External Role Providers instead of the cert, as there is no roles merged into the cert. Therefore to merge the role, the user will have to specify the role-oid.


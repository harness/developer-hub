---
title: Locked Pipelines Cannot be Unlocked Except by Admin Access Users When Using "Run As"
---

## Issue
It is possible that Pipelines created with RunAs permissions will result in having restricted permissions to unlock a pipeline.  This can occur when creating a pipeline that has specific permissions for a user to RunAs a service account, either created by an overall admin, or by a Dinghyfile which is being used to create the pipeline.  The following is an error that can occur as a result
spin-front50 front50 2020-09-14 17:28:02.675 ERROR 1 --- [.0-8080-exec-10] c.n.s.f.c.AuthorizationSupport           : User  does not have access to service account 
spin-front50 front50 2020-09-14 17:28:02.675 ERROR 1 --- [.0-8080-exec-10] n.s.f.s.FiatAccessDeniedExceptionHandler : Encountered exception while processing request POST: 
spin-front50 front50 
spin-front50 front50 org.springframework.security.access.AccessDeniedException: Access is denied

## Cause
Permissions are inadequate for a multitude of reasons.  The user who is performing the ```RunAs``` may not be a member of the correct group to allow access to the Service Account.  It is also possible that the Service Account that is being ```RunAs``` may not be the correct one, so it is recommended that you check with the Spinnaker Administrator and AD Admin to ensure the correct one was declared.  


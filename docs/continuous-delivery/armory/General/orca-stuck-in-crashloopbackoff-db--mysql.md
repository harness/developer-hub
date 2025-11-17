---
title: Orca Stuck in CrashLoopBackoff (DB- mySQL)
---

## Issue
The orca pod is stuck in ```crashloopbackoff``` with an error connecting to mySQL.
Example error:
```liquibase.exception.DatabaseException: com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure```
Restarting the pod is not resolving this issue.

## Cause
Orca pods were most likely misconfigured. To dig deeper, we can look into orca pod logs.Since this is related to mySQL, we can check ```orca-mysql``` pod logs. From the pod logs, we can see it is a connectivity issue due to the ```communication link failure``` error listed above.
We can now look into the spinnaker services to see if all pods have connectivity.Run the command:
```kubectl get svc -n spinnaker```
*example output:*

We saw that the ```orca-mysql``` service was using ```NodePort```. To further examine, we described the orca-mysql service. To do this, you can run the following command: ```kubectl describe svc orca-mysql -n spinnaker```*example output:*
**

We found the following error under the **events** section:
```*v1.Service spinnaker/orca-mysql failed syncing: Service "orca-mysql" is invalid: spec.ports[0].nodePort: Forbidden: may not be used when `type` is 'ClusterIP'```



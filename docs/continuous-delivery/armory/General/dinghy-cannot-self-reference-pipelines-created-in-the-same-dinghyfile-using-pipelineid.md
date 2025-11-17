---
title: Dinghy cannot self-reference Pipelines created in the same Dinghyfile using PipelineID
---

## Issue
An organization may want to create a Dinghyfile pipeline that self-references the application that will be created upon the completion of the Pull Request.  It may be useful in order to automate the workflow of their pipelines.

However, upon the initial Pull Request when the Pipeline and Applications are created, users will be notified of a ```403 Permissions``` error.  However, the Application and Pipelines were successfully created.  

Any subsequent attempts to update the Dinghyfile and execute a new Pull Request, or redeploy the pipeline ***will not generate*** an error and the Application can be referenced without issues, so long as the Application and Pipeline are not changed or deleted.  
 

## Cause
The cause of this issue is due to the order of executions and a race condition.  When initially creating the pipeline and references in the first Pull Request, the Dinghyfile creates the application and pipelines and then syncs permissions as defined in the Dinghyfile.
When doing so, users and admins can see in debug logs that during a deployment the ```PipelineID``` definition is looking for a yet non-existent Application, since the Pipeline and Application creation steps have yet to be created.  
```
time="2022-05-04T20:17:37Z" level=info msg="Substituting pipeline triggerPipeline: test-dinghyfile"
time="2022-05-04T20:17:37Z" level=info msg="Looking up existing pipelines"
time="2022-05-04T20:17:38Z" level=error msg="Failed to GetPipelines for test-app: could not get pipelines for test-app - Forbidden: {\"timestamp\":\"2022-05-04T20:17:38.217+00:00\",\"status\":403,\"error\":\"Forbidden\",\"message\":\"Access denied to application test-app - required authorization: READ\"}"
time="2022-05-04T20:17:38Z" level=info msg="Creating application 'test-app'..."
```

Before the Application can sync permissions, no one has access to the Application in order to keep it secure.  This is why a 403 error is displayed, even if the Application has open permissions. Until the role sync happens, no one can access the application or pipelines. As a result, the PipelineID cannot be referred to successfully.

Once the Application has been created and the initial pipeline has permissions synced, redeploying the Dinghyfile will work as the permissions, application, and pipelines have been created.  However, if the application or pipelines are removed, deleted, or renamed, the issue will re-occur.


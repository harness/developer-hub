---
title: Searching Applications folder with Execution ID times out
---

## Issue
When calling ```**/applications/{application_name}/executions/search with an execution_id**```,** **the calls time out for some pipelines. This time out error makes it difficult to find specific executions as needed. Example Search Query
````
curl --location --request GET 'http://{spinnaker-gate}/applications/{application_name}/executions/search?eventId={some_uuid}' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Cache-Control: no-cache' \
--header 'Authorization: Basic {token}' \
--header 'Cookie: SESSION={session_id}'
````

## Cause
The number of executions for the queried pipeline can grow so large that it can reach the default timeout limit and return a failure. This is expected behavior for a scaled up Spinnaker that has had many pipelines put through it.


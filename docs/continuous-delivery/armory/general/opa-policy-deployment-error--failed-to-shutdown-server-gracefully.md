---
title: Opa Policy Deployment Error- Failed to shutdown server gracefully
---

## Issue
Opa Policy Deployment suddenly causes the Spinnaker UI to fail even though there is no change in the deployment configuration. In addition the Spinnaker UI cannot be accessed. 
OPA logs show the following:
````
"POST","req_path":"/v1/data/spinnaker/.....t","resp_body":"{\"decision_id\":\"2878445b-1487-49ff-af64-7d000aedcffe\"}","resp_bytes":54,"resp_duration":29624.175444,"resp_status":200,"time":"2021-08-26T23:05:44Z"}
{"err":"error while shutting down: (0) context deadline exceeded. ","level":"error","msg":"Failed to shutdown server gracefully.","time":"2021-07-26T23:05:44Z"}
{"level":"info","msg":"Stopping decision logger.","plugin":"decision_logs","time":"2021-08-26T23:05:44Z"}
{"level":"debug","msg":"maxprocs: No GOMAXPROCS change to reset","time":"2021-08-26T23:05:44Z"}
````
## Cause
This error stems from the source code:
[https://github.com/open-policy-agent/opa/blob/320f9a6b06101687979abb3a180d521c743e45cc/runtime/runtime.go#L682](https://github.com/open-policy-agent/opa/blob/320f9a6b06101687979abb3a180d521c743e45cc/runtime/runtime.go#L682)


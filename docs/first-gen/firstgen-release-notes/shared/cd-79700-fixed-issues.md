- Kubernetes deployments timed out and failed when listing pods. (CDS-71328, ZD-45584)
  
  This issue is fixed by modifying the delegate's Kubernetes API client timeout. 

  Harness Delegate uses Kubernetes Java client to make programmatic API calls to the Kubernetes server. The API client uses an OkHttp client whose default [read timeout](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/read-timeout/) and [connect timeout](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/connect-timeout/) values are set to 120 and 60 seconds respectively. These values can be configured by using environment variables, modifying the delegate's container environment. The values must be specified in seconds. 

  The environment variables for these timeouts are:

  - Read timeout: `K8S_API_CLIENT_READ_TIMEOUT`
  - Connect timeout: `K8S_API_CLIENT_CONNECT_TIMEOUT`

  This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to [Delegate release notes](/release-notes/delegate).
- Fixed an issue where the Google Cloud Build (GCB) triggers were throwing an invalid credentials error intermittently. (CDS-70560, ZD-40187)

  This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to [Delegate release notes](/release-notes/delegate).
  
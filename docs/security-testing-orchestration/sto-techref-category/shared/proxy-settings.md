This step supports [Harness Secure Connect](/docs/continuous-integration/secure-ci/secure-connect) if you're using Harness Cloud infrastructure. During the Secure Connect setup, the `HTTPS_PROXY` and `HTTP_PROXY` variables are automatically configured to route traffic through the secure tunnel. If there are specific addresses that you want to bypass the Secure Connect proxy, you can define those in the `NO_PROXY` variable. This can be configured in the **Settings** of your step.

If you need to configure a different proxy (not using Secure Connect), you can manually set the `HTTPS_PROXY`, `HTTP_PROXY`, and `NO_PROXY` variables in the **Settings** of your step.

#### Definitions of Proxy variables:

- `HTTPS_PROXY`: Specify the proxy server for HTTPS requests, example `https://sc.internal.harness.io:30000`
- `HTTP_PROXY`: Specify the proxy server for HTTP requests, example `http://sc.internal.harness.io:30000`
- `NO_PROXY`: Specify the domains as comma-separated values that should bypass the proxy. This allows you to exclude certain traffic from being routed through the proxy.

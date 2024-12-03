---
title: Harness API
description: Retrieve data from the Harness API
---

# Overview

We can configure a backend proxy to retrieve information from the Harness API.

## Setup

First enable the `Configure Backend Proxies` [plugin](https://developer.harness.io/docs/internal-developer-portal/plugins/overview) in your IDP instance.

Once enabled, go to the plugins page and select the `Configure Backend Proxies` plugin to view its configuration.

The following is a proxy definition to resolve raw files from GitHub:

```
proxy:
  endpoints:
    /harness-api:
      target: https://app.harness.io
      pathRewrite:
        /api/proxy/harness-api/?: /
      headers:
        x-api-key: ${PROXY_HARNESS_TOKEN}
        Harness-Account: YOUR_HARNESS_ACCOUNT_ID
```

You will need to replace `YOUR_HARNESS_ACCOUNT_ID` with your Harness account identifier, eg. `wlgELJ0TTre5aZhzpt8gVA`.

What we are doing here is:

1. Declaring a proxy called `harness-api`
2. Targeting a base URL of `https://app.harness.io`
3. Rewriting any request from `/api/proxy/harness-api/` to `app.harness.io` and appending anything after `harness-api/` to the `app.harness.io/` URL
4. Passing an authentication header using the variable `PROXY_HARNESS_TOKEN`

We will need to create a variable below called `PROXY_HARNESS_TOKEN` and select the Harness account secret that holds the value. This needs to be a Harness API key with read access to the Harness account, organization, and project resources you may want to query.

## Usage

Now that we have the proxy defined, we can use it in a workflow definition to retrieve JSON values to be used in a dropdown picker.

Before, you might have had a parameter with the following hard-coded list of options:

```
properties:
  some-property:
    type: string
    title: Some Property
    enum:
      - item1
      - item2
```

Now with our custom backend for Harness Code raw files, we can query GitHub to get our JSON and pull out the relevant keys to show as options in our picker:

```
properties:
  some-property:
    type: string
    ui:field: SelectFieldFromApi
    ui:options:
      title: Some Property
      description: An input for users to select
      path: "proxy/harness-api/<harness org id>/<harness project id>/<repo name>/pipelines"
      valueSelector: identifier
      labelSelector: identifier
```

# Conclusion

With the above backend proxy you can retrieve information from the Harness API and present it to the user. This can be helpful when you want to allow running action on specific resources in Harness and want to present them with dynamic lists of resources.

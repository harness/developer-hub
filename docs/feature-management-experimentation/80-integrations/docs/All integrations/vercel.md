---
title: Vercel
sidebar_label: Vercel
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/16469873148173-Vercel <br /> ✘ images still hosted on help.split.io </button>
</p>

[Vercel](https://vercel.com/) is an advanced hosting and deployment platform for modern web applications.

Developers can incorporate serverless code that runs in the Edge Runtime on the Vercel platform using [Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions) and [Middleware](https://vercel.com/docs/concepts/functions/edge-middleware). Vercel supports compute logic in Edge Functions and Middleware that is scalable, on-demand, and stateless with the [Edge Config](https://vercel.com/docs/storage/edge-config) low-latency data store. Split provides out-of-the-box integration that wraps the Edge Config data store, allowing near-instant reads at the edge.

# Architecture of the integration

The following diagram shows the architecture of the Split integration for Vercel.

<p>
  <img src="https://help.split.io/hc/article_attachments/17938432737037" alt="vercel_deployment_diagram.png" />
</p>

The Split Integration for Vercel writes the Split rollout plan (the set of feature flags and segment definitions) to the Edge Config instance of your application, and keeps this data synchronized. The Edge Config wrapper is an adapter that connects the Split SDK with the Edge Config, allowing the Split SDK to rapidly evaluate feature flags. The Split SDK sends tracked events and impressions data to Split Cloud.

Setting up the Split Integration for Vercel is done in two phases:

* Add the Split integration to your Vercel project.
* Set up the Split JavaScript Browser SDK client.

The integration setup process requires Split admin level access. This is available for all Split tiers, and you can create a Split account during the Split integration setup.

# Add the Split integration to your Vercel project

The Split integration is added from within Vercel as follows.

1. Add an instance of the Edge Config to your Vercel project. (The integration will add a root-tree to the JSON contents of your Edge Config instance, but will never erase or overwrite any other existing JSON data.) If you forgot to do add the Edge Config instance, you can safely restart adding the Split integration to your Vercel project from this step.

2. Go to [https://vercel.com/integrations/split](https://vercel.com/integrations/split) or search for "Split" in the Vercel Marketplace, click **Add Integration**, and follow the setup process. You will be prompted to log in or create your Split account, and then you will see the Vercel setup page. Specify each [Split environment](https://help.split.io/hc/en-us/articles/360019915771-Environments) and choose the Edge Config instance that each should sync to. You are given a key for each environment to use in your code to access the correct JSON root-tree for that environment in your Edge Config instance. Click **Save** to save the setup for all environments. Then click the **Finish integration** link near the top of the window to close the dialog.

# Set up the Split JavaScript Browser SDK client

To set up the Split SDK in the code of your Vercel project, follow the steps below.

1. Install the required packages by running the `npm install` command.

```bash
npm install @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/edge-config
```

2. Instantiate the SDK within your Vercel Edge Function or Middleware. The Split SDK client must run in _partial consumer_ mode and be initialized with the Edge Config wrapper. See our [example](https://github.com/splitio/vercel-integration-utils/tree/main/example/pages/api/get-treatment.js) on GitHub. Note that the `core.initializationKey` passed to the `SplitFactory` constructor is your client-side API key for your Split environment. (In the [Split Management Console](https://app.split.io), in your Admin Settings, click on API keys and select the SDK API Keys tab. Find the keys for your Split project and environment, and make sure you choose a client-side API key.)

Following this setup, you can consume Split feature flags from Edge Config and send events to Split Cloud.

## Manage the integration after installation

Read more about [Managing Integrations After Installation](https://vercel.com/docs/integrations/using-an-integration/manage-integration) in the Vercel docs.

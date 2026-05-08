---
title: Custom Plugins V2
sidebar_label: Custom Plugins V2
description: Build and deploy custom React-based plugins in Harness IDP using the Custom Plugins V2 framework and the idp-pluginssdk.
sidebar_position: 3
---

import DocImage from '@site/src/components/DocImage';

:::info Beta Feature
Custom Plugins V2 is available behind the feature flag `IDP_ENABLE_CUSTOM_PLUGINS_V2`. If you wish to try it out, reach out to the IDP team. 
:::

## Overview

Custom Plugins V2 is a new approach to building custom plugins in Harness IDP. You build a React-based application using the [`@harnessio/idp-plugins-sdk`](https://www.npmjs.com/package/@harnessio/idp-plugins-sdk) package, compile it into a self-contained HTML file, and upload that file directly to IDP.

The SDK handles communication between your plugin and the IDP host. It provides the entity context your plugin renders on, and it proxies all outbound API calls through the configured [Backend Proxy Plugin](/docs/internal-developer-portal/plugins/delegate-proxy) so your plugin never handles secrets or makes direct network requests.

## Prerequisites

- Node.js and npm installed locally.
- Access to IDP Admin in your Harness account with the `IDP_ENABLE_CUSTOM_PLUGINS_V2` feature flag enabled.

## Set up the boilerplate

The ['custom-plugins-v2'](https://github.com/harness/custom-plugins-v2) GitHub repository contains a ready-made project skeleton with all the boilerplate already configured.

1. Download or clone the code from [custom-plugins-v2](https://github.com/harness/custom-plugins-v2).

    ```
    git clone https://github.com/harness/custom-plugins-v2.git
    ```

2. Go to the project folder.

    ```
    cd custom-plugins-v2
    ```

3. Install dependencies.

   ```bash
   npm install
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

   The dev server starts at `https://localhost:5173`. Keep it running while you develop the plugin. [IDP's Dev Mode](#step-2-preview-with-dev-mode) will connect to it for live preview.

## Add the plugin in IDP

### Step 1: Create the plugin entry

1. In IDP, go to **Configure** and click **Plugins**.

2. Navigate to the **Custom Plugins V2** tab on the top.

3. Click the **+ New Custom Plugin** button.

    <DocImage path={require('./static/plugins-v2-listing.png')} />

4. Fill in the basic info fields (icon, name, description). Skip the HTML upload field for now; you will return to it after the build step.

### Step 2: Preview with Dev Mode

1. In the **Preview** section, select the catalog entity you want to render the plugin on.

2. Enable the **Dev Mode** using the toggle button. IDP connects to your local dev server (`https://localhost:5173`) and shows a live preview of your plugin as you make changes.

    <DocImage path={require('./static/create-plugin-v2.png')} />

### Step 3: Build and upload

1. When you are satisfied with the result, stop the dev server and run the production build.

   ```bash
   npm run build
   ```

   This generates a single `index.html` file in the `dist` folder.

2. Return to your plugin creation page on IDP, upload the `dist/index.html` file in the HTML upload field, and save the plugin.

    <DocImage path={require('./static/html-upload.png')} />

### Step 4: Add the plugin to a layout

1. In IDP, go to **Configure** and select **Layout** from the left sidebar.

2. Select the layout you want to add the plugin to for the intended entity kind and entity type.

3. In the YAML editor, add the following block under the `tabs` list at the position where you want the plugin tab to appear.

    ```yaml
    - name: Custom Plugin
      path: /custom-plugin
      title: Custom Plugin
      contents:
        - component: CustomPlugin
          specs:
            props:
              pluginId: <your-plugin-id>
    ```

   Replace `<your-plugin-id>` with the plugin ID assigned when you created the plugin.

   <DocImage path={require('./static/plugins-v2-layout.png')} />

4. Select **Save** to apply the layout changes.

---

## SDK Usage Guide

The `@harnessio/idp-plugins-sdk` package is already included in the boilerplate. The sections below explain the key APIs it provides.

### App Setup

Wrap your app with `PluginContextProvider` and `PluginRouter`, then call `PluginAPI.init()` after the component mounts. The boilerplate `main.tsx` does this for you.

```tsx
// main.tsx
import { PluginAPI, PluginContextProvider, PluginRouter } from '@harnessio/idp-plugins-sdk'
import { createRoot } from 'react-dom/client'
import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('root')!).render(
    <PluginContextProvider>
      <PluginRouter>
        <App />
      </PluginRouter>
    </PluginContextProvider>
  )

  setTimeout(() => {
    PluginAPI.init()
  }, 0)
})
```

### Using Context

After initialization, the IDP host sends your plugin the context for the entity it is rendering on. Access it with the `usePluginContext` hook.

```tsx
import { usePluginContext } from '@harnessio/idp-plugins-sdk'

function MyComponent() {
  const context = usePluginContext()

  if (!context) return <p>Loading...</p>

  const entity = context.entity

  return (
    <div>
      <p>Name: {entity?.metadata?.name}</p>
      <p>Kind: {entity?.kind}</p>
      <p>Owner: {entity?.spec?.owner}</p>
    </div>
  )
}
```

The `entity` object is the standard Harness Entity Object. You can read entity annotations to drive plugin behavior. For example, reading `github.com/project-slug` tells your plugin which GitHub repository to fetch data from.

### Making Proxy Fetch Calls

Plugins cannot make direct network requests because the production environment blocks them via CSP. Use `PluginAPI.proxyFetch()` to route all API calls through the IDP host instead.

:::info
You must configure the [Backend Proxy Plugin](/docs/internal-developer-portal/plugins/delegate-proxy) before making proxy fetch calls. The endpoint paths you pass to `proxyFetch` must match the endpoints you defined there.
:::

```tsx
import { PluginAPI } from '@harnessio/idp-plugins-sdk'

// GET request. The path is the endpoint you configured in Backend Proxy Plugin.
const res = await PluginAPI.proxyFetch('/your-configured-endpoint/some-path')
const data = await res.json()

// POST request with body
const res = await PluginAPI.proxyFetch('/your-configured-endpoint/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'example' }),
})
```

The endpoint path (for example, `/github`) corresponds to the endpoint name you configured in the Backend Proxy Plugin. All paths under that endpoint follow the same prefix.

```tsx
// Example: reading the GitHub project slug from entity annotations
// and fetching pull requests through the "/github" proxy endpoint

const context = usePluginContext()
const slug = context.entity?.metadata?.annotations?.['github.com/project-slug']

const res = await PluginAPI.proxyFetch(`/github/repos/${slug}/pulls`)
const pulls = await res.json()
```

**How it works:**

1. Your plugin calls `PluginAPI.proxyFetch(url, init)`.
2. The IDP host makes the actual HTTP request through the Backend Proxy Plugin, which handles authentication and routing.
3. The host returns the response to your plugin.

Your plugin never touches secrets. Authentication is handled entirely by the Backend Proxy Plugin configuration.

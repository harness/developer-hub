---
title: How to build Frontend Backstage Plugins
sidebar_label: How to Build Plugins
description: Step by step tutorial to build a frontend backstage plugin
sidebar_position: 40
---

<DocsTag  backgroundColor= "#cbe2f9" text="Tutorial"  textColor="#0b5cad"  />

## Introduction 

A Backstage Plugin adds functionality to Backstage. In this tutorial we will be using the backstage monorepo to build out frontend plugins. 

## Pre-Requisites

1. Fork and Clone this [repository](https://github.com/harness/backstage-plugins), we will be using this repo to build our backstage-frontend plugins. 

2. Alternatively you can set up your own Backstage project by creating a [Backstage App](https://backstage.io/docs/getting-started/create-an-app#create-an-app). A Backstage App is a monorepo setup with lerna that includes everything you need to run Backstage in your own environment.

## Create a Plugin
To create a new frontend plugin, make sure you've run `yarn install` and installed dependencies, then run the following on your command line (a shortcut to invoking the [backstage-cli new --select plugin](https://backstage.io/docs/local-dev/cli-commands#new)) from the root of your project.

```sh
yarn new --select plugin
```

This will create a new Backstage Plugin based on the ID that was provided. It will be built and added to the Backstage App automatically.

If the Backstage App is already running (with `yarn start` or `yarn dev`) you should be able to see the default page for your new plugin directly by navigating to `http://localhost:3000/my-plugin`.

You can also serve the plugin in isolation by running `yarn start` in the plugin directory. Or by using the yarn workspace command, for example:

```sh
yarn workspace @backstage/plugin-my-plugin start # Also supports --check
```

This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads. It is only meant for local development, and the setup for it can be found inside the plugin's `dev/` directory.

## Other Plugin Library Package Types

There are other plugin library package types that you can choose from. To be able to select the type when you create a new plugin just run: `yarn new`. You'll then be asked what type of plugin you wish to create like this:

##  Plugin Development

Each plugin is treated as a self-contained web app and can include almost any type of content. Plugins all use a common set of platform APIs and reusable UI components. Plugins can fetch data from external sources using the regular browser APIs or by depending on external modules to do the work.

## Developing guidelines
- Consider writing plugins in TypeScript.
- Plan the directory structure of your plugin so that it becomes easy to manage.
- Prefer using the [Backstage components](https://backstage.io/storybook), otherwise go with Material UI.
- Check out the shared Backstage APIs before building a new one.

## Plugin concepts / API

### Routing

Each plugin can export routable extensions, which are then imported into the app and mounted at a path.

First you will need a `RouteRef` instance to serve as the mount point of your extensions. This can be used within your own plugin to create a link to the extension page using `useRouteRef`, as well as for other plugins to link to your extension.

It is best to place these in a separate top-level `src/routes.ts` file, in order to avoid import cycles, for example like this:

```sh
/* src/routes.ts */
import { createRouteRef } from '@backstage/core-plugin-api';

// Note: This route ref is for internal use only, don't export it from the plugin
export const rootRouteRef = createRouteRef({
  id: 'Example Page',
});
```

Now that we have a `RouteRef`, we import it into `src/plugin.ts`, create our plugin instance with createPlugin, as well as create and wrap our routable extension using `createRoutableExtension` from `@backstage/core-plugin-api`:

```sh
/* src/plugin.ts */
import { createPlugin, createRouteRef } from '@backstage/core-plugin-api';
import ExampleComponent from './components/ExampleComponent';

// Create a plugin instance and export this from your plugin package
export const examplePlugin = createPlugin({
  id: 'example',
  routes: {
    root: rootRouteRef, // This is where the route ref should be exported for usage in the app
  },
});

// This creates a routable extension, which are typically full pages of content.
// Each extension should also be exported from your plugin package.
export const ExamplePage = examplePlugin.provide(
  createRoutableExtension({
    name: 'ExamplePage',
    // The component needs to be lazy-loaded. It's what will actually be rendered in the end.
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    // This binds the extension to this route ref, which allows for routing within and across plugin extensions
    mountPoint: rootRouteRef,
  }),
);
```

This extension can then be imported and used in the app as follows, typically placed within the top-level `<FlatRoutes>`:

```sh
<Route path="/any-path" element={<ExamplePage />} />
```

## Structure of a Plugin

Nice, you have a new plugin! We'll soon see how we can develop it into doing great things. But first off, let's look at what we get out of the box.

### Folder structure

The new plugin should look something like:

```sh
new-plugin/
    dev/
        index.ts
    node_modules/
    src/
        components/
            ExampleComponent/
                ExampleComponent.test.tsx
                ExampleComponent.tsx
                index.ts
            ExampleFetchComponent/
                ExampleFetchComponent.test.tsx
                ExampleFetchComponent.tsx
                index.ts
        index.ts
        plugin.test.ts
        plugin.ts
        routes.ts
        setupTests.ts
    .eslintrc.js
    package.json
    README.md
```
You might note a thing or two. Yes, a plugin looks like a mini project on its own with a `package.json` and a `src` folder. And this is because we want plugins to be separate packages. This makes it possible to ship plugins on npm, and it lets you work on a plugin in isolation, without loading all the other plugins in a potentially big Backstage app.

The `index.ts` files are there to let us import from the folder path and not specific files. It's a way to have control over the exports in one file per folder.

## Base files
You get a README to populate with info about your plugin and a package.json to declare the plugin dependencies, metadata and scripts.

## The plugin file
In the `src` folder we get to the interesting bits. Check out the `plugin.ts`:

```ts
import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const examplePlugin = createPlugin({
  id: 'example',
  routes: {
    root: rootRouteRef,
  },
});

export const ExamplePage = examplePlugin.provide(
  createRoutableExtension({
    name: 'ExamplePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
```

This is where the plugin is created and where it creates and exports extensions that can be imported and used the app. See reference docs for [createPlugin](https://backstage.io/docs/reference/core-plugin-api.createplugin) or introduction to the new [Composability System](https://backstage.io/docs/plugins/composability).

## Components

The generated plugin includes two example components to showcase how we structure our plugins. There are usually one or multiple page components and next to them, you can split up the UI in as many components as you feel like.

We have the `ExampleComponent` to show an example Backstage page component. The `ExampleFetchComponent` showcases the common task of making an async request to a public API and plot the response data in a table using Material UI components.

You may tweak these components, rename them and/or replace them completely.

## Connecting the plugin to the Backstage app

There are two things needed for a Backstage app to start making use of a plugin.

- Add plugin as dependency in `app/package.json`
- Import and use one or more plugin extensions, for example in `app/src/App.tsx`

Luckily both of these steps happen automatically when you create a plugin with the Backstage CLI.

## Talking to the outside world

If your plugin needs to communicate with services outside the Backstage environment you will probably face challenges like CORS policies and/or backend-side authorization. To smooth this process out you can use proxy. [Read more](https://backstage.io/docs/plugins/proxying/)
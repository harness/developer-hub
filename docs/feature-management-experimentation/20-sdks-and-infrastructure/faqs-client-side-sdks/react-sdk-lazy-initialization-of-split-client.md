---
title: "React SDK: Lazy initialization of SDK client"
sidebar_label: "React SDK: Lazy initialization of SDK client"
sidebar_position: 12
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360046771911-React-SDK-Lazy-initialization-of-Split-client </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Scenario

On the initial client-side render of a React app, the traffic key (upon which flag targeting decisions are based) might not yet be available. For example, this could be because the app user has not yet logged in.

The React SDK's `SplitFactoryProvider` will configure and initialize the underlying JavaScript SDK's `SplitFactory` on the initial render, which means that we have to provide a traffic key that might not exist yet.

# Questions

In the above scenario, how should the SDK be configured before a user logs in? How can the traffic key config value be updated after the user logs in?

# Answer

React SDK allows multiple clients with their own traffic keys, where the clients use the same factory instance. We recommend using a dummy traffic key for the SDK configuration. When the real traffic key is available, then initialize a second client object with this traffic key.

In React SDK v2.0.0, the traffic key is configured by setting the `splitKey` property of the library hooks (`useSplitTreatments`, `useTrack`, and `useSplitClient`) and of the `SplitClient` component. If `splitKey` is not provided (or undefined), it will default to the traffic key set via the SDK configuration object passed to the `SplitFactoryProvider` component.

## React SDK example

<Tabs>
<TabItem value="Passing down the `splitKey` prop">

```javascript
import { useState, useEffect } from 'react';
import { SplitFactoryProvider, useSplitTreatments } from '@splitsoftware/splitio-react';

const SDK_CONFIG = {
   core: {
      authorizationKey: 'YOUR-SDK-CLIENT-SIDE-KEY',
      key: getAnonymousId(),
   }
}

const FEATURE_FLAG_NAME = 'test_split';

// Prop drilling `splitKey` to child components
function MyComponent({ splitKey }) {
  const { treatments, isReady } = useSplitTreatments({ names: [FEATURE_FLAG_NAME], splitKey: splitKey });

  return isReady ?
    <p>Treatment for user '{splitKey}' in {FEATURE_FLAG_NAME} is: {treatments[FEATURE_FLAG_NAME].treatment}</p> :
    <p>loading...</p>; // Render a spinner if the SDK client for `splitKey` is not ready yet
}

function App() {
  // Using 'anonymous' as initial userId
  const [userId, setUserId] = useState(SDK_CONFIG.core.key);

  // Update userId to 'logged-in-user' after 3 seconds
  useEffect(() => {
    setTimeout(() => { setUserId('logged-in-user'); }, 3000);
  }, [])

  return (
    <SplitFactoryProvider config={SDK_CONFIG}>
      <MyComponent splitKey={userId} />
    </SplitFactoryProvider> 
  );
}

export default App;
```

</TabItem>
<TabItem value="Preventing prop drilling of `splitKey`">

```javascript
import { useState, useEffect } from 'react';
import { SplitFactoryProvider, SplitClient, useSplitTreatments } from '@splitsoftware/splitio-react';

const SDK_CONFIG = {
   core: {
      authorizationKey: 'YOUR-CLIENT-SIDE-SDK-KEY',
      key: getAnonymousId(),
   }
}

const FEATURE_FLAG_NAME = 'test_split';

function MyComponent() {
  const { treatments, isReady, client } = useSplitTreatments({ names: [FEATURE_FLAG_NAME] });

  return isReady ?
    <p>Treatment for user '{client.key}' in {FEATURE_FLAG_NAME} is: {treatments[FEATURE_FLAG_NAME].treatment}</p> :
    <p>loading...</p>; // Render a spinner if the SDK client for `userId` is not ready yet
}

function App() {
  // Using 'anonymous' as initial userId
  const [userId, setUserId] = useState(SDK_CONFIG.core.key);

  // Update userId to 'logged-in-user' after 3 seconds
  useEffect(() => {
    setTimeout(() => { setUserId('logged-in-user'); }, 3000);
  }, [])

  return (
    <SplitFactoryProvider config={SDK_CONFIG}>
      <SplitClient splitKey={userId} >
        <MyComponent />
      </SplitClient>
    </SplitFactoryProvider> 
  );
}

export default App;
```
</TabItem>
</Tabs>

## Equivalent JavaScript SDK example

For reference, the snippet below shows the equivalent code executed in JavaScript.

```javascript title="Creating clients with different keys"
import { SplitFactory } from '@splitsoftware/splitio';

/* On initial load of a client-side application */
const SDK_CONFIG = {
   core: {
      authorizationKey: 'YOUR-SDK-CLIENT-SIDE-KEY',
      key: getAnonymousId()
   }
}

const factory = SplitFactory(SDK_CONFIG);

const client = factory.client();

// Attach a callback to run when the client with 'anonymous' key is ready
client.on(client.Events.SDK_READY, doSomething);

// When you get a new user id, for instance, the id of a logged user
const loggedClient = factory.client('logged-in-user');

// Attach a callback to run when the client with 'logged-in-user' key is ready
loggedClient.on(loggedClient.Events.SDK_READY, doSomething);
```
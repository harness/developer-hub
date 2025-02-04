---
title: "How to handle the lazy initialization of Split client?"
sidebar_label: "How to handle the lazy initialization of Split client?"
helpdocs_is_private: false
helpdocs_is_published: true
---

<!-- applies to React SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360046771911-React-SDK-Lazy-initialization-of-Split-client </button>
</p>

## Question

When using React app, on initial load of a client-side application the Split key is not always directly available. The React SDK will initialize SplitFactory and useClient on the initial render, which means that with the current setup we have to initiate the Split client with a key that might not exist yet. How to handle the initial render?

## Answer

React SDK allows multiple client objects using the same Factory instance. It is recommended to use a dummy user key for the initial render, then when the actual user key is available initialize a second client object with the correct user key.

With the release of React SDK v1.2.0 this can be done properly via the SplitClient component or useClient hook.

Using the JavaScript SDK:

```javascript
/* On initial load of a client-side application /
const config = {
   core: {
      authorizationKey: 'YOUR-API-KEY',
      key: 'anonymous'
   }
}
const factory = SplitFactory(config);
const client = factory.client();
// attach a callback to run when the client with 'anonymous' key is ready
client.on(client.Events.SDK_READY, doSomething);
/ When you get a new user id, for instance, the id of a logged user */
const loggedClient = factory.client('user_id');
// attach a callback to run when the client with 'user_id' key is ready
loggedClient.on(loggedClient.Events.SDK_READY, doSomething);
```

Using React SDK with SplitClient component

```javascript
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SplitFactory, SplitClient, SplitTreatments } from '@splitsoftware/splitio-react';
import './index.css';
const sdkConfig = {
   core: {
      authorizationKey: 'YOUR-API-KEY',
      key: 'anonymous',
   }
}

function App() {
 // using 'anonymous' as initial userId
 const [userId, setUserId] = useState(sdkConfig.core.key);
 // update userId to 'loggedinId' after 3 seconds
 useEffect(() => {
   setTimeout(() => { setUserId('loggedinId'); }, 3000);
 }, [])
 return (
 <SplitFactory config={sdkConfig}>
   <SplitClient splitKey={userId}>
     <SplitTreatments names={[featureName]}>
       {({ treatments, isReady }) => {
         return isReady ?
           <p>Treatment for {userId} in {featureName} is: {treatments[featureName].treatment}</p> :
           <p>loading...</p>; // Render a spinner if the SDK is not ready yet
       }}
     </SplitTreatments>
   </SplitClient>
 </SplitFactory> 
 );
}

export default App;
```
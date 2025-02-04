---
title: "CORS Error in streaming call when running SDK in Service Worker"
sidebar_label: "CORS Error in streaming call when running SDK in Service Worker"
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to JavaScript SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4415278732429-JavaScript-SDK-CORS-Error-in-streaming-call-when-running-SDK-in-Service-Worker </button>
</p>

## Issue

When running the JavaScript SDK inside Service Worker, the SDK Streaming http call to streaming.split.io is blocked by CORS browser policy as shown below:

![](https://help.split.io/hc/article_attachments/4415274038285)

## Root cause

The Service Worker acts as a proxy between the browser and the network. By intercepting requests made by the document, service workers can redirect requests to a cache, enabling offline access.

A request interception occurs and the application that makes use of this technology requires definitions about how to handle certain requests (fetch) and return a result to the browser/DOM.

In the case of the JS SDK, the Service Worker can receive Push Notifications, which are the specific type of connection called [Server-Side Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) (SSE). These notifications must be defined into the Service Worker to allow the Stream connection between our SDK and Split's backend to work. 

If you use a Service Worker as a proxy, and you hook the fetch request in a particular way (e.g., adding the `cache-control` header) but don't take the SSE types into consideration, it might lead to a CORS issue.

## Answer

The following is an example of what you can do to manipulate the SSE streams connections (only):
```
self.addEventListener('fetch', event => {
    const {headers, url} = event.request;
    const isSSERequest = headers.get('Accept') === 'text/event-stream';

    // We process only SSE connections
    if (!isSSERequest) {
    return;
    }

    // Response Headers for SSE
    const sseHeaders = {
    'content-type': 'text/event-stream',
    'Transfer-Encoding': 'chunked',
    'Connection': 'keep-alive',
    };
    // Function formatting data for SSE
    const sseChunkData = (data, event, retry, id) =>
    Object.entries({event, id, data, retry})
    .filter(([, value]) => ![undefined, null].includes(value))
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n') + '\n\n';
    // Table with server connections, where key is url, value is EventSource
    const serverConnections = {};
    // For each url, we open only one connection to the server and use it for subsequent requests
    const getServerConnection = url => {
    if (!serverConnections[url]) serverConnections[url] = new EventSource(url);

    return serverConnections[url];
    };
    // When we receive a message from the server, we forward it to the browser
    const onServerMessage = (controller, {data, type, retry, lastEventId}) => {
    const responseText = sseChunkData(data, type, retry, lastEventId);
    const responseData = Uint8Array.from(responseText, x => x.charCodeAt(0));
    controller.enqueue(responseData);
    };
    const stream = new ReadableStream({
    start: controller => getServerConnection(url).onmessage = onServerMessage.bind(null, controller)
    });
    const response = new Response(stream, {headers: sseHeaders});

    event.respondWith(response);
});
 ```

:::info
If a defaultHandler is set to `NetworkFirst [setDefaultHandler(newNetworkFirst());]`, that could prevent the event listener from firing.  Removing the default handler fixes this.
:::

An alternate example returns false from the listener as shown below:
```
self.addEventListener('fetch', event => {
// no caching for chrome-extensions
    if (event.request.url.startsWith('chrome-extension:')) {
        return false;
    }
// prevent header striping errors from workbox strategies for EventSource types
    if (event.request.url.includes('streaming.split.io')) {
        return false;
    }
// prevent non-cacheable post requests
    if (event.request.method != 'GET') {
        return false;
    }
// all others, use NetworkFirst workbox strategies
    if (strategies) {
        const networkFirst = new strategies.NetworkFirst();
        event.respondWith(networkFirst.handle({ request: event.request }));
    }
});
```
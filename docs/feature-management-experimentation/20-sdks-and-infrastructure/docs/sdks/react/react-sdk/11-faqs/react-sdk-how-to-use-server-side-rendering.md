---
title: "How to use the SDK for server-side rendering?"
sidebar_label: "How to use the SDK for server-side rendering?"
helpdocs_is_private: false
helpdocs_is_published: true
---

<!-- applies to React SDK, todo: update? -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020863412-General-SDK-Always-getting-control-treatments </button>
</p>

## Question

React SDK doc states it works only on client side (browser). Is there a way to use it for SSR (Server Side Rendering)?

## Answer

As stated, the React SDK supports only Browser side. In React development, to run the SDK on server side, we have to use the Node.js SDK.

One of the popular libraries for SSR is using Next.js library. The example in this [Knowledge Base](https://help.split.io/hc/en-us/articles/360043277911-JavaScript-SDK-Example-using-Next-js-) shows both SDK rendering in browser and server modes, browser side uses React SDK and server side uses Node SDK. In reality, there is no need to have both rendering modes in one app, the example is simply showing how to use both types of rendering.
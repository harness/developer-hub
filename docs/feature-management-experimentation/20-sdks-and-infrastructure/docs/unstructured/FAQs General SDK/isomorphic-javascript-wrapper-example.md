---
title: Isomorphic JavaScript wrapper example
sidebar_label: Isomorphic JavaScript wrapper example
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360038143771-SDK-versioning-policy, www.split.io link:  https://www.split.io/blog/serverless-applications-powered-split-feature-flags/ </button>
</p>

Isomorphic JavaScript, also known as Universal JavaScript, emerged in response to the challenges posed by traditional client-server web architectures. It represents a paradigm shift in web development by enabling code execution on both the server and client sides, thereby promoting code reuse and seamless data synchronization.

The concept gained traction in the early 2010s, with the rise of Node.js, which allowed JavaScript to run on the server. Isomorphic JavaScript frameworks, like Meteor and Next.js, gained popularity, as they facilitated server-side rendering, sharing codebases, and real-time data synchronization.

By bridging the gap between server and client, isomorphic JavaScript significantly improved application performance, SEO, and overall user experience, becoming a fundamental approach in modern web development.

In the [isomorphic_js_wrapper_demo code example](https://github.com/Split-Community/Split-SDKs-Examples/tree/main/JavaScript-Isomorphic-Wrapper), we show that the Split JavaScript SDK is, indeed, isomorphic.

The demo evaluates flags on both the server side and the client side using the same SDK Wrapper. This allows you to maintain only a single codebase for wrapping Split's SDK and ensures that you use the proper methods when on the server and the client with the same code.

To see the full readme and code, visit the [Split Community's Split-SDKs-Examples](https://github.com/Split-Community/Split-SDKs-Examples/tree/main) repo. The direct link to this example is: https://github.com/Split-Community/Split-SDKs-Examples/tree/main/JavaScript-Isomorphic-Wrapper
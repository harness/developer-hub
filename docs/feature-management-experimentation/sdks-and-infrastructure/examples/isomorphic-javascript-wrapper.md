---
title: Isomorphic JavaScript Wrapper Example
sidebar_position: 6
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-general-sdk/isomorphic-javascript-wrapper-example
---

## Overview

Isomorphic JavaScript (also known as universal JavaScript) emerged in response to the limitations of traditional client–server web architectures. This approach enables the same code to run on both the server and client, promoting code reuse, simplifying maintenance, and allowing for seamless data synchronization.

The concept gained traction in the early 2010s with the rise of Node.js, which made server-side JavaScript execution possible. Frameworks such as Meteor and Next.js expanded on this idea, offering server-side rendering, shared codebases, and real-time data synchronization between server and client.

By bridging the gap between server and client execution, isomorphic JavaScript can improve application performance, SEO, and the overall user experience—making it a core technique in modern web development.

In [this `isomorphic_js_wrapper_demo` example](https://github.com/Split-Community/Split-SDKs-Examples/tree/main/JavaScript-Isomorphic-Wrapper), we demonstrate that the Split JavaScript SDK is fully isomorphic. 

The example:

* Evaluates feature flags on both the server side and client side.
* Uses the same SDK wrapper across environments, so you maintain a single codebase.
* Ensures that the correct methods are called in each environment, without duplicating logic.

This pattern simplifies your integration, reduces code maintenance overhead, and helps avoid environment-specific bugs.

To view the README and source code, see the [GitHub repository](https://github.com/Split-Community/Split-SDKs-Examples/tree/main).
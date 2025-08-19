---
title: "JavaScript SDK: How to enable Content Security Policy (CSP) to work with JavaScript SDK"
sidebar_label: "JavaScript SDK: How to enable Content Security Policy (CSP) to work with JavaScript SDK"
sidebar_position: 21
---

## Question

Is it possible to enable SCP (Content Security Policy) on a site that uses JavaScript SDK?

## Answer

Content Security Policy (CSP) is a computer security standard introduced to prevent cross-site scripting (XSS), clickjacking and other code injection attacks, as defined by this wikipedia article.

It is possible to allow SCP and enable running JavaScript SDK safely.

There are multiple ways to achieve this, the steps below use "nonce" keyword to target the script block.

Make sure the server response header contains the following:
Content-Security-Policy: script-src 'self' cdn.split.io 'nonce-swfT4W3546RtDw4';
On the JavaScript side, use this tag for the JS code that uses the SDK:
```
<script nonce="swfT4W3546RtDw4">
...
</script>
```

The nonce key is any random characters generated, just make sure the response and script tags keys are matched.
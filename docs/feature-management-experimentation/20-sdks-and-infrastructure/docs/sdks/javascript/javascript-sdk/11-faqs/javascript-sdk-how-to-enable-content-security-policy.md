---
title: How to enable Content Security Policy (CSP) to work with JavaScript SDK?
sidebar_label: How to enable Content Security Policy (CSP) to work with JavaScript SDK?
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to JavaScript SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360033200812-JavaScript-SDK-How-to-enable-Content-Security-Policy-CSP-to-work-with-JavaScript-SDK </button>
</p>

## Question

Is it possible to enable SCP (Content Security Policy) on a site that uses JavaScript SDK?

## Answer

Content Security Policy (CSP) is a computer security standard introduced to prevent cross-site scripting (XSS), clickjacking and other code injection attacks, as defined by this wikipedia article.

It is possible to allow SCP and enable running Split JavaScript SDK safely.

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
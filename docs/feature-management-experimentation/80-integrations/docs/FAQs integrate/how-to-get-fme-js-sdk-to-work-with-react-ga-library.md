---
title: How to get FME JS SDK to work with react-ga library?
sidebar_label: How to get FME JS SDK to work with react-ga library?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4564786795277-How-to-get-Split-JS-SDK-to-work-with-react-ga-library </button>
</p>

### Issue

The library react-ga is available for React platform, its a wrapper for Google Analytics, is there a way to get it to work with the JS SDK integration with GA?

### Root cause

Yes, it is possible to integrate Javascript  SDK with recat-ga library.  Based on the docs for react-ga lib and there is an API to add third party plugins, see example code below: 

<pre><span>// Adding trafficType and integrations parameters in Split config:</span><br /><span>const sdkConfig = \{</span><br /><span>&nbsp; &nbsp;core: \{</span><br /><span>&nbsp; &nbsp; &nbsp; authorizationKey: 'SDK API KEY',</span><br /><span>&nbsp; &nbsp; &nbsp; key: 'react-guy',</span><br /><span>&nbsp; &nbsp; &nbsp; trafficType: 'account'</span><br /><span>&nbsp; &nbsp;\},</span><br /><span>&nbsp; &nbsp;debug:&nbsp;</span><strong>true</strong><span>,</span><br /><span>&nbsp; &nbsp;integrations: \[\{</span><br /><span>&nbsp; &nbsp; &nbsp; type: 'GOOGLE_ANALYTICS_TO_SPLIT'</span><br /><span>&nbsp; &nbsp;\}\]</span><br /><span>\};</span><br /><br /><span>// Initializing ReactGA</span><br /><span>ReactGA.initialize('UA-xxxxxxxx-1');</span><br /><span>ReactGA.plugin.require('splitTracker');</span><br /><span>ReactGA.pageview(window.location.pathname);</span></pre>
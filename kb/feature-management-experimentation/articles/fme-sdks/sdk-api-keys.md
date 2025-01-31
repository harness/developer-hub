---
title: SDK API Keys
sidebar_label: SDK API Keys
helpdocs_is_private: true
helpdocs_is_published: false
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360033557092-SDK-overview </button>
</p>

## SDK types

Our supported SDKs fall into two categories:

| **Type** | **Overview** |
| --- | --- | 
| Client-side | <ul><li> Designed to be used by a single traffic type in the browser, mobile device, or mobile application </li><li> Intended to be used in a potentially less secure environment </li><li> This includes Split's JavaScript, iOS, and Android SDKs </li></ul>  | 
| Server-side | <ul><li> Designed to work for multiple traffic types, like users or customers (many of them per SDK) as opposed to client-side that are bound to one (typically a single user or account in session) </li><li> Intended to be used in a secure environment, such as your infrastructure </li></ul> |

## Security considerations

Client- and server-side SDKs have different security considerations:
 
| **Type** | **Security Considerations** |
| --- | --- | 
| Client-side | <ul><li> These SDKs run on the browser or in a mobile device, they can be compromised by users unpacking a mobile app or use the browser's developer tools to inspect the page </li><li>Client-side SDK APIs are more restricted in regards to what information they can access because it's a less secure environment. <br />For example, client-side SDKs uses a specific endpoint (/mySegments) which only returns a list of segments in which the key used during instantiation is included. This provides for a much smaller amount of data, allowing for a smaller memory footprint in memory constrained environments of the browser and mobile apps </li></ul>| 
| Server-side | <ul><li> These SDKs operate within your own infrastructure making them not accessible by end users </li><li>When targeting by private or sensitive data on the server-side, this information won't leave your infrastructure, keeping your sensitive data under your control </li></ul>|

## API keys

Typically, you need one API key per Split environment, and additionally, you may want to issue extra API keys per microservice of your product using Split for better security isolation. You must identify which type of SDK you're using to ensure you select the appropriate API key type.
 
Within Split, the following three types of keys each provide different levels of access to Split's API: 
 
| **Type** | **Overview** |
| --- | --- | 
| Server-side | <ul><li> Configure server-side SDKs to use a server-side api key </li><li> Grants access to fetch feature flags and segments associated within the provided API key's environment </li><li> Never expose server-side keys in untrusted contexts </li><li> Do not put your server-side API keys in client-side SDKs </li><li>If you accidentally expose your server-side API key, you can revoke it in the API keys tab in Admin settings </li></ul>| 
| Client-side | <ul><li> Configure client-side SDKs to use the client-side api key </li><li> Grants access to fetch featuer flags and segments for the provided key within the provided API key's environment </li></ul>|
| Admin | <ul><li> Use for access to Split's developer admin API </li><li> This key provides broader access to multiple environments unlike the other API keys that are scoped to a specific environment </li><li> Do not share this API key with your customers </li><li> If you accidentally expose your admin API key, you can revoke it in the API keys tab in Admin settings </li></ul>|
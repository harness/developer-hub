---
title: Send event data using Admin API
sidebar_label: Send event data using Admin API
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9143779240845-Sending-event-data-using-the-Admin-API <br /> ✘ images still hosted on help.split.io </button>
</p>

<p>
  The Split Administration API is a tool that sends events via HTTP based API calls. This allows for calculating metrics and computing significance as part of experimentation without needing to use the track methods of the individual SDKs.
</p>
<p>
  You may want to do this if you already have an external system that tracks events and are interested in passing that data to Split directly.&nbsp;
</p>
<h1 id="h_01HKX8TXC7AMJDPKMM746ZNKK1">
  Prerequisites
</h1>
<p>
  To run these API calls, there are a few pieces of information that are needed.&nbsp;
</p>
<ul>
  <li>
    First, download <a href="https://curl.se/">cURL</a>. This application is a free HTTP API client that we use to make API calls in this document. It should be installed already if you are on a Mac or a Linux machine. If you are more comfortable with other ways to call HTTP endpoints or other HTTP clients, you should still be able to follow along. It is a command line tool, so you need to have basic familiarity with the CMD.exe Command Prompt on Windows or Terminal emulators on Mac or Linux machines.
  </li>
  <li>
    You need a server-side SDK API key. You can create this key in the <a href="http://app.split.io">Split UI</a> by clicking the&nbsp;square button at the bottom of the left navigation pane and selecting <strong>Admin Settings</strong><strong>. </strong>In
    Project settings click <strong>API Keys</strong>.
    At the top right, click the <strong>Actions </strong>button and select <strong>Create Admin API key</strong>. The Create SDK API key page displays.
  </li>
</ul>
<p>
  <img src="https://help.split.io/hc/article_attachments/15800716180877" alt="create-sdk-api-key.png" />
</p>
<p>
  Select <strong>Server-side</strong> Type, give the key a name, and restrict it to the environments and projects that you are using the API key for. Click <strong>Create</strong> to generate the API key.&nbsp;
</p>
<p>&nbsp;</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/15801021029901" alt="new-sdk-api-key.png" />
</p>
<p>
  This API key will be used for sending events.
</p>
<p>
  <strong>Note: </strong><strong>For this document, we are using $apiKey to replace the actual API key and that we gathered previously. Be sure to replace this with what you have copied down from the Prerequisites section.</strong>
</p>
<h2 id="h_01HKX8TXC71MEFVQK47YC25KN5">Sending events</h2>
<p>
  If you are not using the SDK track method, then events need to be imported in some other way, such as using the Admin API, as documented here.&nbsp;
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/9143279339661" alt="send_events.png" />
</p>
<p>
  In order to send event data to Split, it must be a properly formatted JSON array that contains a series of objects. Refer to the format description below and an example with two event record objects.
</p>
<table style={{borderCollapse: 'collapse', width: '100%'}} border="1" data-mce-id="__mce">
  <tbody>
    <tr>
      <td style={{width: '25%'}}>
        <p>
          <strong>Field in event record</strong>
        </p>
      </td>
      <td style={{width: '25%'}}>
        <p>
          <strong>Data type</strong>
        </p>
      </td>
      <td style={{width: '13.5714%'}}>
        <p>
          <strong>REQUIRED</strong>
        </p>
      </td>
      <td style={{width: '36.4286%'}}>
        <p>
          <strong>Data description</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '25%'}}>
        <p>
          eventTypeId
        </p>
      </td>
      <td style={{width: '25%'}}>
        <p>
          STRING
        </p>
      </td>
      <td style={{width: '13.5714%'}}>
        <p>
          Y
        </p>
      </td>
      <td style={{width: '36.4286%'}}>
        <p>
          The name of the event
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '25%'}}>
        <p>
          trafficTypeName
        </p>
      </td>
      <td style={{width: '25%'}}>
        <p>
          STRING
        </p>
      </td>
      <td style={{width: '13.5714%'}}>
        <p>
          Y
        </p>
      </td>
      <td style={{width: '36.4286%'}}>
        <p>
          The name of the traffic type for this event
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '25%'}}>
        <p>
          key
        </p>
      </td>
      <td style={{width: '25%'}}>
        <p>
          STRING
        </p>
      </td>
      <td style={{width: '13.5714%'}}>
        <p>
          Y
        </p>
      </td>
      <td style={{width: '36.4286%'}}>
        <p>
          The same key value that was used in the call to getTreatment().&nbsp;
        </p>
        <br />
        <p>
          <strong>This is critical to ensuring proper attribution</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '25%'}}>
        <p>
          timestamp
        </p>
      </td>
      <td style={{width: '25%'}}>
        <p>
          LONG
        </p>
      </td>
      <td style={{width: '13.5714%'}}>
        <p>
          Y
        </p>
      </td>
      <td style={{width: '36.4286%'}}>
        <p>
          Unix Epoch timestamp
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '25%'}}>
        <p>
          value
        </p>
      </td>
      <td style={{width: '25%'}}>
        <p>
          FLOAT
        </p>
      </td>
      <td style={{width: '13.5714%'}}>
        <p>
          N
        </p>
      </td>
      <td style={{width: '36.4286%'}}>
        <p>
          The value associated with this event record
        </p>
      </td>
    </tr>
    <tr>
      <td style={{width: '25%'}}>
        <p>
          properties
        </p>
      </td>
      <td style={{width: '25%'}}>
        <p>
          JSON
        </p>
      </td>
      <td style={{width: '13.5714%'}}>
        <p>
          N
        </p>
      </td>
      <td style={{width: '36.4286%'}}>
        <p>
          Additional properties associated with this event
        </p>
      </td>
    </tr>
  </tbody>
</table>
<p>&nbsp;</p>
<pre>\[<br /> &nbsp;&nbsp;\{<br />&nbsp; &nbsp; &nbsp; "eventTypeId": "page_latency",<br />&nbsp; &nbsp; &nbsp; "trafficTypeName": "user",<br />&nbsp; &nbsp; &nbsp; "key": "Liam",<br />&nbsp; &nbsp; &nbsp; "timestamp": "1645557823",<br />&nbsp; &nbsp; &nbsp; "value": 3.85,<br />&nbsp; &nbsp; &nbsp; "properties": \{<br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"country": "CA"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;\},<br /> &nbsp;&nbsp;\{<br />&nbsp; &nbsp; &nbsp;"eventTypeId": "page_load",<br />&nbsp; &nbsp; &nbsp;"trafficTypeName": "user",<br />&nbsp; &nbsp; &nbsp;"key": "Ava",<br />&nbsp; &nbsp; &nbsp;"timestamp": "1645557824",<br />&nbsp; &nbsp; &nbsp;"value": 1.31,<br />&nbsp; &nbsp; &nbsp;"properties": \{<br />&nbsp; &nbsp; &nbsp; &nbsp;"country": "CA"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;&nbsp;\}<br />\]</pre>
<p>
  To send these events to Split via the Admin API, use the following cURL command:&nbsp;
</p>
<p>
  curl --location --request POST 'https://events.split.io/api/events/bulk' \
</p>
<p>
  --header 'Content-Type: application/json' \
</p>
<pre>--header 'Authorization: Bearer $apiKey \\<br />--data-raw '\[<br /> &nbsp;\{<br />&nbsp; &nbsp; &nbsp;"eventTypeId": "page_latency",<br />&nbsp; &nbsp; &nbsp;"trafficTypeName": "user",<br />&nbsp; &nbsp; &nbsp;"key": "Liam",<br />&nbsp; &nbsp; &nbsp;"timestamp": "1645557823",<br />&nbsp; &nbsp; &nbsp;"value": 3.85,<br />&nbsp; &nbsp; &nbsp;"properties": \{<br />&nbsp; &nbsp; &nbsp; &nbsp; "country": "CA"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br /> &nbsp;},<br /> &nbsp;\{<br />  &nbsp; "eventTypeId": "page_load",<br />  &nbsp; "trafficTypeName": "user",<br />&nbsp; &nbsp; "key": "Ava",<br />&nbsp; &nbsp; "timestamp": "1645557824",<br />&nbsp; &nbsp; "value": 1.31,<br />&nbsp; &nbsp; "properties": \{<br />&nbsp; &nbsp; &nbsp; "country": "CA"<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\}<br /> &nbsp;\}<br />\]<br />'</pre>
<p>
  <strong>Note: </strong><strong>This is a POST command. It creates new events in Split. It cannot be used to edit or update existing events. It is not idempotent. Sending the same data multiple times will create multiple events.</strong>
</p>
<p>
  The Split endpoint returns a 202 code, which indicates that the events have been accepted.&nbsp;
</p>
<h1 id="h_01HKX8TXC7CDA2MFHP09X2VSV1">
  Considerations
</h1>
<p>
  There are some things to keep in mind when using the API to track events:
</p>
<ul>
  <li>
    Do not track the same events that are already being tracked by the SDK track methods.
  </li>
  <li>
    Check for the 202 response code to ensure that events have been imported successfully.
  </li>
  <li>
    Unlike other Admin API functions, sending event data requires a Server Side or Client Side SDK key.
  </li>
  <li>
    If using a supported language; such as Java, Ruby, Python, or PHP; you can accelerate your development by using one of the Split provided Admin API wrappers.
  </li>
  <li>
    It cannot be stressed enough how important it is to ensure that the key used in the event records matches the key used in the getTreatment() SDK calls. If they do not match then metrics cannot be calculated properly.
  </li>
  <li>
    Be mindful that API calls are rate limited as mentioned in the <a href="https://docs.split.io/reference/rate-limiting" target="_self">rate limiting guide</a>.
  </li>
</ul>
<h1 id="h_01HKX8TXC7K2NYRN0MXN0NPTVK">
  External references
</h1>
<p>
  For more information, visit the <a href="https://docs.split.io/reference/events-overview" target="_self">Events overview</a> section of the API Guide.
</p>
<p>
  There are also wrappers for multiple programming languages that have already been built for your convenience. For more information about API wrappers, refer to the <a href="https://help.split.io/hc/en-us/sections/360004020552-Admin-API-Examples" target="_self">Admin API examples</a>.
</p>
<p>
  A Postman <a href="https://github.com/splitio/public-api-postman">API collection</a> for the public Admin API endpoints is available for those who are interested in using the free <a href="https://www.postman.com">Postman</a> tool for API testing and development.
</p>
<p>
  To learn more about event attribution as part of metrics and experimentation, review the <a href="https://help.split.io/hc/en-us/articles/360018432532-Attribution-and-exclusion" target="_self">Attribution and exclusion</a> guide.
</p>
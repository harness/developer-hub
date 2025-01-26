---
title: What's supported
description: Platforms and technologies supported by FME
sidebar_label: What's supported
sidebar_position: 19
helpdocs_is_private: false
helpdocs_is_published: true
---
import "./static/_scrolling-table.css";


# FME features

Feature Management & Experimentation supports the following features.

<Tabs
  groupId="fmefeatures" queryString>
  <TabItem value="module" label="FME module features">

| **Features** | | **Description** |
| --- | --- | --- |
| Binary flags | ✅ | Toggle a feature on or off |
| Multivariant flags | ✅ | Supports multiple variants per feature |
| Automatic metrics | ✅ | |
| User consent | ✅ | |
| Sequential testing | ✅ | |
| Fixed horizon testing | ✅ | |

  </TabItem>
  <TabItem value="withinHarness" label="FME within Harness">

FME support for these Harness platform features is coming soon.

| **Features** | | **Description** |
| --- | --- | --- |
| App config | Coming soon | Managing your FME account within App config |
| Pipelines | Coming soon | Integrating FME into pipelines |

</TabItem>
</Tabs>

# FME SDK supported features

Feature Management & Experimentation supports client-side server-side SDKs, built for popular programming languages.

Scroll left to see the feature list for all SDKS.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs
  groupId="sdktab" queryString>
  <TabItem value="client-side" label="Client-side SDKs">

| **Features** | Programming languages | Track events | Automatic metrics | Localhost mode | Flush | Multiple SDK clients | User consent |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Android SDK Suite** | Java/Kotlin | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Android SDK** | Java/Kotlin |  ✅  | ✅  | ✅  | ✅  | ✅ | ✅ |
| **Android RUM Agent** |  Java/Kotlin | ✅  | ✅ | ✅ | ✅ | | ✅ |
| **Angular utilities** | Javascript?/Typescript | ✅  | ✅  | ✅  | ✅ | | ✅ |
| **Browser SDK** | Javascript/Typescript | ✅  | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Flutter plugin** | Flutter/Elixir | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **iOS SDK Suite** | Swift | ✅ |  | ✅ | ✅ | ✅ | ✅ |
| **iOS SDK** | Swift | ✅ | | | | | |
| **iOS SDK Suite** | Swift | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **iOS RUM Agent** | Swift | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **JavaScript SDK** | Javascript/Typescript | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

  </TabItem>
  <TabItem value="server-side" label="Server-side SDKs">


<div style={{ overflowX: 'scroll', marginLeft: '0'}}>

  <table style={{border: '1px solid rgb(96, 103, 112)'}}>
    <thead>
      <tr>
        <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Features</th>
        <th>Go SDK</th>
        <th>Java SDK</th>
        <th>.NET SDK</th>
        <th>Node.js SDK</th>
        <th>PHP SDK</th>
        <th>PHP Thin Client SDK</th>
        <th>Python SDK</th>
        <th>Ruby SDK</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Language(s)</th>
        <td>Golang</td>
        <td>Java/Kotlin</td>
        <td>C#/F#</td>
        <td>JavaScript/Typescript</td>
        <td>PHP</td>
        <td>PHP</td>
        <td>Python</td>
        <td>Ruby/Ruby + Rails</td>
      </tr>
      <tr>
        <th class='solidBgColor' style={{position: 'sticky', left:'0'}}></th>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
      </tr>
      <tr>
        <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Track events</th>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
      </tr>
      <tr>
        <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>5</th>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td >QWERTYUIOPASDFGHJKLZXCVBNM</td>
      </tr>
      <tr>
        <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Automatic metrics</th>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
        <td>QWERTYUIOPASDFGHJKLZXCVBNM</td>
      </tr>
    </tbody>
  </table>
</div>

| **Features** | **Go SDK** | **Java SDK** | **.NET SDK** | **Node.js SDK** | **PHP SDK** | PHP Thin Client SDK | **Python SDK** | **Ruby SDK** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Language(s) | | | C\#/F\# | | | | | | 
| Track events | ✅  | ✅  | ✅  | ✅  | ✅ | ✅  | ✅  | ✅  |
| Automatic metrics | ✅  | ✅  | ✅  | ✅ | | | ✅  | ✅  | ✅  |
| Localhost mode | ✅  | ✅  | ✅  | ✅ | | | ✅  | ✅  | ✅  |
| Flush | ✅  | ✅ | ✅ | ✅ | ✅ | ✅  | ✅  | ✅  |
| Multiple SDK clients  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅  | ✅  | ✅  |
| User consent | ✅ | ✅ | ✅ | ✅ | ✅ | ✅  | ✅  | ✅  |
| Certificate pinning | | | | | | | | |

  </TabItem>
</Tabs>

## Feature requests

Some of our best ideas come from our customers. You can submit your feature requests to [Harness Idea Portal](https://ideas.harness.io/feature-request).

## What else does Harness support?

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported.md).

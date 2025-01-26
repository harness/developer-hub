---
title: What's supported
description: Platforms and technologies supported by FME
sidebar_label: What's supported
sidebar_position: 1
helpdocs_is_private: false
helpdocs_is_published: true
---
import "./static/_scrolling-table.css";


## FME module features

Feature Management & Experimentation supports the following features.

| **Features** | | **Description** |
| --- | --- | --- |
| Feature flags | ✅ | In Harness FME UI, you can create feature flags in Harness FME UI. In your codebase, you can use FME SDKs and conditional statments to deploy code "behind" feature flags without immediately releasing it to customers. Then, safely test, target, and turn features on/off with effortless controls. |
| Binary flags | ✅ | Allow you to toggle a feature on or off. |
| Multivariant flags | ✅ | You can also set multiple variants per feature. |
| Release scheduling | ✅ | You can schedule feature releases or targeting changes to take effect on future dates. |
| Approval flows | ✅ | Feature flag or segment changes can be assigned to approvers before taking effect. |
| Versioning | ✅ | Feature flag and segment audit logs allow you to review decisions and protect your data. |
| Flexible feature flag targeting rules | ✅ | Release features to users based on individual IDs, attributes, dependencies, or gradually increasing percentages. |
| Dynamic configurations | ✅ | Dynamically adjust feature variations (e.g. visual styles, back-end configs, machine learning parameters, and LLM prompts) without deploying new code. |
| Event tracking | ✅ | Track events and FME automatically attribution them to feature variations for monitoring and analysis. |
| Live tail | ✅ | See events and impressions (feature flag evaluation data) events come in to FME servers in realtime.
| Automatic metrics | ✅ | Auto-capture performance metrics in web and mobile apps by using FME SDK Suites or FME RUM agents. |
| Release monitoring | ✅ | Unparalleled metric comparison between any two feature flag variations. |
| Alerting | ✅ | Custom alerting pinpoints the feature variation that significantly impacts your metrics, no matter your rollout size, powering your data-driven decisions and saving hours of investigation. |
| Instant rollback | ✅ | Promptly roll-back a problematic feature with a feature flag's Kill switch. |
| Experimentation | ✅ | Select your most valuable metrics and feature variations for low-risk flexible A/B/n experiments, to power your data-driven business decisions. |
| Sequential testing | ✅ | Detect consistent significant impacts in the short term with sequential metric analysis. |
| Fixed horizon testing | ✅ | Detect gradual steady impact over the long term with fixed horizon metric analysis. |
| Integrations |  ✅ | Explore more than 30 pre-built ingrations, or create your own using Harness FME webhooks and Harness FME HTTP API endpoints. |
| User consent | ✅ | Protect privacy and confidential data with fully localized feature flag evaluations on all SDKs and user consent support on all client-side SDKs. |
| AI support | ✅ | Meet ___Release Agent___, our new Harness FME module chatbot, ready to answer your questions and help you interpret experimental results. |

## FME SDK supported features

Feature Management & Experimentation works with client-side server-side SDKs, built for popular programming languages. If you are looking for a language that is not shown below, consider using [Split Evaluator](https://help.split.io/hc/en-us/articles/360020037072-Split-Evaluator).

Scroll left to see the feature list for all SDKs.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs
  groupId="sdktab" queryString>
  <TabItem value="client-side" label="Client-side SDKs">

  Client-side SDKs evaluate feature flags on your web or mobile client. See below for the full list of supported features.

    <div style={{ overflowX: 'scroll', marginLeft: '0'}}>
      <table style={{border: '1px solid rgb(96, 103, 112)'}}>
        <thead>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0', minWidth:'15em'}}>Features</th>
            <th>Android SDK Suite</th>
            <th>Android SDK</th>
            <th>Android RUM Agent</th>
            <th>Angular utilities</th>
            <th>Browser SDK Suite</th>
            <th>Browser SDK</th>
            <th>Browser RUM Agent</th>
            <th>Flutter plugin</th>
            <th>iOS SDK Suite</th>
            <th>iOS SDK</th>
            <th>iOS RUM Agent</th>
            <th>JavaScript SDK</th>
            <th>React SDK</th>
            <th>React Native SDK</th>
            <th>Redux SDK</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Language(s)</th>
            <td>Java/Kotlin</td>
            <td>Java/Kotlin</td>
            <td>Java/Kotlin</td>
            <td>Angular</td>
            <td>JavaScript/ TypeScript</td>
            <td>JavaScript/ TypeScript</td>
            <td>JavaScript/ TypeScript</td>
            <td>Dart/Flutter</td>
            <td>Swift</td>
            <td>Swift</td>
            <td>Swift</td>
            <td>JavaScript/ TypeScript</td>
            <td>JavaScript/ TypeScript</td>
            <td>JavaScript/ TypeScript</td>
            <td>JavaScript/ TypeScript</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Feature flag evaluation</th>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✘</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Dynamic config (for feature flag treatments)</th>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✘</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>User ID targeting</th>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✘</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Segment targeting</th>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✘</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Large Segment targeting</th>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✘</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Custom attributes targeting</th>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✘</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Experiments</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Event tracking</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Custom event properties</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Automatic metrics</th>
            <td>✅</td><td>✘</td><td>✅</td><td>✘</td><td>✅</td><td>✘</td><td>✅</td><td>✘</td>
            <td>✅</td><td>✘</td><td>✅</td><td>✘</td><td>✘</td><td>✘</td><td>✘</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Localhost mode</th>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✘</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Flush</th>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✘</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>External impression listener (for data montoring integrations)</th>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✘</td><td>✅</td>
            <td>✅</td><td>✅</td><td>✘</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Authentication header overrides</th>
            <td>✘</td><td>✘</td><td>✘</td><td>✘</td><td>✅</td><td>✅</td><td>✘</td><td>✘</td>
            <td>✘</td><td>✘</td><td>✘</td><td>✅</td><td>✘</td><td>✅</td><td>✘</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Certificate pinning</th>
            <td>✅</td><td>✅</td><td>✘</td><td>✘</td><td>✅</td><td>✅</td><td>✘</td><td>✘</td>
            <td>✅</td><td>✅</td><td>✘</td><td>✘</td><td>✘</td><td>✘</td><td>✘</td>
          </tr>
        </tbody>
      </table>
    </div>

  </TabItem>
  <TabItem value="server-side" label="Server-side SDKs">

  Server-side SDKs evaluate feature flags on your web server. See below for the full list of supported features.

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
            <td>JavaScript/ TypeScript</td>
            <td>PHP</td>
            <td>PHP</td>
            <td>Python</td>
            <td>Ruby/Ruby + Rails</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Feature flag evaluation</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Dynamic config (for feature flag treatments)</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>User ID targeting</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Segment targeting</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Custom attributers targeting</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Experiments</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Event tracking</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Custom event properties</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Automatic metrics</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Localhost mode</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>External impression listener (for data montoring integrations)</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>FME Synchronizer suport</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>FME Proxy suport</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Network proxy pinning</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
        </tbody>
      </table>
    </div>

  </TabItem>
</Tabs>

## Feature requests

Some of our best ideas come from our customers. You can submit your feature requests to [Harness Idea Portal](https://ideas.harness.io/feature-request).

## What else does Harness support?

For information about what's supported for other Harness modules and the Harness Software Delivery Platform overall, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported.md).

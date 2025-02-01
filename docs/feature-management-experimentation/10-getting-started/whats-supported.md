---
title: What's supported by Harness FME
description: Platforms and technologies supported by FME
sidebar_label: What's supported
sidebar_position: 1
helpdocs_is_private: false
helpdocs_is_published: true
---
import "./static/_scrolling-table.css";

## FME module features

Feature Management & Experimentation (FME) supports the following features.

| **Features** | | **Description** |
| --- | --- | --- |
| Feature flags | ✅ | You can create feature flags in FME/Split. In your codebase, you can use FME SDKs and conditional statments to deploy code "behind" feature flags without immediately releasing it to customers. Then, safely test, target, and turn features on/off with effortless controls. |
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
| Integrations |  ✅ | Explore more than 30 pre-built ingrations, or create your own using Split webhooks and Split Admin API endpoints. |
| User consent | ✅ | Protect privacy and confidential data with fully localized feature flag evaluations on all SDKs and user consent support on all client-side SDKs. |
| AI support | ✅ | Meet ___Release Agent___, our new Harness FME module chatbot, ready to answer your questions and help you interpret experimental results. |

## FME SDK supported features

Harness FME works with client-side server-side SDKs, built for popular programming languages. If you are looking for a language that is not shown below, consider using [Split Evaluator](https://help.split.io/hc/en-us/articles/360020037072-Split-Evaluator).

Scroll left to see the feature list for all SDKs.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  groupId="sdktab" queryString>
  <TabItem value="client-side" label="Client-side SDKs">

  Client-side SDKs evaluate feature flags on your web or mobile client. See below for the full list of supported features.

    <div style={{overflowX: 'scroll', marginLeft: '0'}}>
      <table style={{border: '1px solid rgb(96, 103, 112)', marginTop: '20px', borderCollapse: 'collapse'}}>
        <thead style={{ display:'block' }}>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0', top:'0', minWidth:'15em'}}>Features</th>
            <th>[Android SDK Suite](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-suite)</th>
            <th>      [Android SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk)</th>
            <th>[Android RUM Agent](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-rum-agent/)</th>
            <th>[Angular utilities](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/angular/angular-utilities)</th>
            <th>[Browser SDK Suite](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-suite)</th>
            <th>      [Browser SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/)</th>
            <th>[Browser RUM Agent](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-rum-agent/)</th>
            <th>   [Flutter plugin](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/flutter/flutter-plugin)</th>
            <th>    [iOS SDK Suite](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-suite)</th>
            <th>          [iOS SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/)</th>
            <th>    [iOS RUM Agent](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-rum-agent/)</th>
            <th>   [JavaScript SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/)</th>
            <th>        [React SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/)</th>
            <th> [React Native SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/)</th>
            <th>        [Redux SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/redux/redux-sdk)</th>
          </tr>
        </thead>
        <tbody style={{ maxHeight: '60em', overflowY: 'scroll', display: 'block' }}>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Language(s)</th>
            <td>[Java](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/java/android-suite)/[Kotlin](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/kotlin/android-suite)</td>
            <td>[Java](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/java/android-sdk/)/[Kotlin](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/kotlin/android-sdk/)</td>
            <td>[Java](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/java/android-rum-agent/)/[Kotlin](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/kotlin/android-rum-agent/)</td>
            <td>[TypeScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/typescript/angular-utilities)</td>
            <td>[JavaScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-suite)/ [TypeScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-suite)</td>
            <td>[JavaScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/)/ [TypeScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/typescript/browser-sdk/)</td>
            <td>[JavaScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-rum-agent/)/ [TypeScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/typescript/browser-rum-agent/)</td>
            <td>[Dart](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/dart/flutter-plugin)/[Flutter](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/flutter/flutter-plugin)</td>
            <td>[Swift](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/swift/ios-suite)</td>
            <td>[Swift](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/swift/ios-sdk/)</td>
            <td>[Swift](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/swift/ios-rum-agent/)</td>
            <td>[JavaScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/)/ [TypeScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/typescript/javascript-sdk/)</td>
            <td>[JavaScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/react-sdk/)/ [TypeScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/typescript/react-sdk/)</td>
            <td>[JavaScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/react-native-sdk/)/ [TypeScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/typescript/react-native-sdk/)</td>
            <td>[JavaScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/redux-sdk)/ [TypeScript](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/typescript/redux-sdk)</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Feature flag evaluation</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/#basic-use)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/#basic-use)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/#basic-use)</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/#basic-use)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/#basic-use)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/#basic-use)</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Dynamic config (for feature flag treatments)</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/advanced-feature-flag-evaluations/#get-treatments-with-configurations)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/advanced-feature-flag-evaluations/#get-treatments-with-configurations)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/advanced-feature-flag-evaluations/#get-treatments-with-configurations)</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/advanced-feature-flag-evaluations/#get-treatments-with-configurations)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/#example-of-getting-feature-flag-treatments-with-configurations)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/advanced-feature-flag-evaluations/#get-treatments-with-configurations)</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>User ID targeting</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/#basic-use)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/#basic-use)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/#basic-use)</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/#basic-use)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/#basic-use)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/#basic-use)</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Segment targeting</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/#basic-use)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/#basic-use)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/#basic-use)</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/#basic-use)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/#basic-use)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/#basic-use)</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Large Segment targeting</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/#basic-use)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/#basic-use)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/#basic-use)</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/#basic-use)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/#basic-use)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/#basic-use)</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Custom attributes targeting</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/advanced-feature-flag-evaluations/#user-attributes)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/advanced-feature-flag-evaluations/#user-attributes)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/advanced-feature-flag-evaluations/#user-attributes)</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/advanced-feature-flag-evaluations/#user-attributes)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/advanced-feature-flag-evaluations/#user-attributes)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/advanced-feature-flag-evaluations/#user-attributes)</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Flag sets</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/configuration/#syncconfig)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/configuration/#splitfilters)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/configuration/#sync)</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/configuration/#syncsplitfilters)</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Experiments</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/real-user-monitoring/android-rum-agent/advanced-use-cases/#custom-events)</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-rum-agent/advanced-use-cases/#custom-events)</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-rum-agent/advanced-use-cases/#custom-events)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/track/)</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Event tracking</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/real-user-monitoring/android-rum-agent/advanced-use-cases/#custom-events)</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-rum-agent/advanced-use-cases/#custom-events)</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-rum-agent/advanced-use-cases/#custom-events)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/track/)</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Custom event properties</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/real-user-monitoring/android-rum-agent/advanced-use-cases/#custom-events)</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-rum-agent/advanced-use-cases/#custom-events)</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-rum-agent/advanced-use-cases/#custom-events)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/track/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/track/)</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Automatic metrics</th>
            <td>✅</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-rum-agent/#automatic-metric-creation)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-rum-agent/#automatic-metric-creation)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-rum-agent/#automatic-metric-creation)</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Localhost mode</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/localhost-mode/)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/localhost-mode/)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/localhost-mode/)</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/localhost-mode/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/localhost-mode/)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/localhost-mode/)</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Flush</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/flush/)</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/flush/)</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>External impression listener (for data montoring integrations)</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/advanced-use-cases/#custom-impression-listener)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/advanced-use-cases/#custom-impression-listener)</td>
            <td>✘</td>
            <td>✅</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/advanced-use-cases/#custom-impression-listener)</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/advanced-use-cases/#custom-impression-listener)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/advanced-use-cases/#custom-impression-listener)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/advanced-use-cases/#custom-impression-listener)</td>
            <td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Authentication header overrides</th>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/browser-sdk/configuration/#headeroverrides)</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/javascript/javascript-sdk/configuration/#headeroverrides)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-sdk/configuration/#headeroverrides)</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/react/react-native-sdk/configuration/#headeroverrides)</td>
            <td>✘</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Certificate pinning</th>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/android/android-sdk/advanced-use-cases/#certificate-pinning)</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✅</td>
            <td>[✅](/docs/feature-management-experimentation/sdks-and-infrastructure/docs/sdks/ios/ios-sdk/advanced-use-cases/#certificate-pinning)</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
            <td>✘</td>
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
            <td>C#</td>
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
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Split Synchronizer suport</th>
            <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
          </tr>
          <tr>
            <th class='solidBgColor' style={{position: 'sticky', left:'0'}}>Split Proxy suport</th>
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

<!-- TODO - uncomment this when the FME module can be selected in the Idea Portal
## Feature requests

Some of our best ideas come from our customers. You can submit your feature requests to [Harness Idea Portal](https://ideas.harness.io/feature-request).
-->

## What else does Harness support?

For information about what's supported for other Harness modules and the Harness Software Delivery Platform overall, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported.md).

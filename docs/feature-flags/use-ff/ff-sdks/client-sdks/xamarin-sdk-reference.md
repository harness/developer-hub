---
title: Xamarin SDK reference
description: This topic explains how to use the Harness Feature Flags SDK in your Xamarin application.
sidebar_position: 60
helpdocs_topic_id: x9mh0o785u
helpdocs_category_id: y1oewjcb0q
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/feature-flags/ff-sdks/client-sdks/xamarin-sdk-reference
---

import Sixty from '/docs/feature-flags/shared/p-sdk-run60seconds.md'

import Smpno from '../shared/note-smp-not-compatible.md'

import Closeclient from '../shared/close-sdk-client.md'


<Smpno />


This topic describes how to use the Harness Feature Flags SDK for your Xamarin application. You can use the Xamarin SDK for Android and iOS.

For getting started quickly, you can [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the  [Xamarin Client Sample GitHub Repository](https://github.com/harness/ff-xamarin-client-sample).

## Before You Begin

Make sure you read and understand the following:

* [Feature Flags Overview](/docs/feature-flags/get-started/overview.md)
* [Getting Started with Feature Flags](/docs/feature-flags/get-started/onboarding-guide)
* [Client-Side and Server-Side SDKs](../sdk-overview/client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../sdk-overview/communication-sdks-harness-feature-flags.md)

## Version

Latest SDK version can be found on [GitHub Release Page](https://github.com/harness/ff-xamarin-client-sdk/releases)

## Prerequisites

* [Download the SDK from our GitHub repository](https://github.com/harness/ff-xamarin-client-sdk)
* Create a Xamarin application, or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) our [sample application](https://github.com/harness/ff-xamarin-client-sample).
* [Create a Feature Flag on the Harness Platform](/docs/feature-flags/use-ff/ff-creating-flag/create-a-feature-flag). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create an SDK key and make a copy of it](/docs/feature-flags/use-ff/ff-creating-flag/create-a-project#create-an-sdk-key)

## Xamarin for Android

The Xamarin SDK uses a Harness binding library in a NuGet package for Android.

### Install the SDK

To use this SDK for Android, you must provide Google GSON bindings, for example:


```
Install-Package GoogleGson -Version 2.8.5
```
Then, install the SDK package in your application, for example:


```
Install-Package ff-android-xamarin-client-sdk -Version 0.5.4
```
### Initialize the SDK

To initialize the Xamarin Android SDK, you need to:

1. Add your Client SDK key to connect to your Harness Environment.
2. Add a Target that you want to Evaluate against a Feature Flag.
3. (Optional) Configure the SDK options.
4. Complete the initialization with the SDK using the Listener, Client SDK Key, Target, and Configuration parameters you set.

For example:


```
CfConfiguration configuration = new CfConfiguration.Builder()  
        .EnableStream(true)  
        .EnableAnalytics(true)  
        .Build();  
  
    Target target = new Target()  
        .InvokeName(account)  
        .InvokeIdentifier(account);  
  
     // Initialize authentication. Update API_KEY with your key.  
     // Listener object should implement IAuthCallback interface:  
    CfClient.Instance.Initialize(this.context, API_KEY, configuration, target, listener);
```
#### Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. 

If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different Variation types and for each method you need to pass in:

* Identifier of the Flag you want to evaluate
* The default Variation

There are different methods for the different Flag Variation types:

* Boolean Variation
* Number Variation
* String Variation
* JSON Variation

For example:


```
bool flag1 = CfClient.Instance.BoolVariation("flag1", false);
```
### Listen for events


```
using System;  
using System.Linq;  
using IO.Harness.Cfsdk.Cloud.Events;  
using IO.Harness.Cfsdk.Cloud.Model;  
using IO.Harness.Cfsdk.Cloud.Oksse;  
using IO.Harness.Cfsdk.Cloud.Oksse.Model;  
using Java.Interop;  
using Java.Util;  
using IO.Harness.Cfsdk;  
  
public class CfListener : Java.Lang.Object, IAuthCallback, IEventsListener  
{  
  
    public CfListener()  
    {  
         // Subscribe on getting events from native Android library  
        CfClient.Instance.RegisterEventsListener(this);  
    }  
    public void AuthorizationSuccess(AuthInfo p0, AuthResult p1)  
    {  
        // p1.Success contains status of authorization  
        // In case of error p1.Error contains error message  
    }  
    public void OnEventReceived(StatusEvent p0)  
    {  
        var eventType = p0.EventType;  
        if(StatusEvent.EVENT_TYPE.SseStart == eventType)  
        {  
            // Stream started  
        }  
        else if( StatusEvent.EVENT_TYPE.SseEnd == eventType)  
        {  
            // Stream Ended  
        }  
        else if (StatusEvent.EVENT_TYPE.EvaluationChange == eventType)  
        {  
            Java.Lang.Object payload = p0.ExtractPayload();  
            var ev = payload as IO.Harness.Cfsdk.Cloud.Core.Model.Evaluation;  
            // Flag changed event  
        }  
        else if (StatusEvent.EVENT_TYPE.EvaluationReload == eventType)  
        {  
            Java.Lang.Object payload = p0.ExtractPayload();  
  
            var t = payload.JavaCast<ArrayList>();  
            var arr = t.ToEnumerable<IO.Harness.Cfsdk.Cloud.Core.Model.Evaluation>().ToArray();  
  
            // Each pulling interval we will receive array of available flags.  
  
        }  
    }  
}
```
### Test your app is connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.

<Sixty />

## Close the SDK client

<Closeclient />

## Xamarin for iOS

The Xamarin SDK uses a Harness binding library in a NuGet package for iOS.

### Install the SDK

Install the SDK package in your application, for example:

```
Install-Package ff-ios-xamarin-client-sdk -Version 0.5.1
```
### Initialize the SDK

To initialize the Xamarin Android SDK, you need to:

1. Add your Client SDK key to connect to your Harness Environment.
2. Add a Target that you want to Evaluate against a Feature Flag.
3. (Optional) Configure the SDK options.
4. Complete the initialization with the SDK using the Listener, Client SDK Key, Target, and Configuration parameters you set.

For example:


```
// Create configuration:  
    var config = new CfConfigurationProxy  
    {  
        StreamEnabled = true,  
        AnalyticsEnabled = true  
    };  
  
    // Set selected identifer:  
    var target = new CfTargetProxy  
    {  
        Identifier = "target_identifier",  
        Name = "target_name"  
    };  
  
    // Initialize authentication. Update API_KEY with your key:  
    CfClientProxy.Shared.InitializeWithApiKey(API_KEY, config, target);
```
### Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. 

If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different Variation types and for each method you need to pass in:

* Identifier of the Flag you want to evaluate
* The default Variation

There are different methods for the different Variation types:

* Boolean Variation
* Number Variation
* String Variation
* JSON Variation

For example:


```
bool flag1 = CfClient.Instance.BoolVariation("flag1", false);
```
### Listen for events


```
using System;  
using ff_ios_client_sdk_proxy;  
  
public class CfListener : CfClientDelegate  
{  
  
    public CfListener()  
    {  
        // Subscribe on getting events from native iOS library  
        CfClientProxy.Shared.Delegate = this;  
    }  
    // Received in case of error  
    public override void OnErrorWithError(CfErrorProxy error){}  
  
    // Contains array with flags received each pooling interval  
    public override void OnPollingEventReceivedWithEvaluations(CxEvaluation[] evaluations){}  
  
    // Event when flag value is changed  
    public override void OnStreamEventReceivedWithEvaluation(CxEvaluation evaluation){}  
  
    // Message received from library event  
    public override void OnMessageReceivedWithMessage(CxMessage message){}  
  
    // On Stream opened event  
    public override void OnStreamOpened() {}  
  
    // On Stream closed event  
    public override void OnStreamCompleted() {}  
}
```
### Test your app is connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.


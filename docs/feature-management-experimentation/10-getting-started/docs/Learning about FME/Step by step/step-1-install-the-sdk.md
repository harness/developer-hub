---
title: "Step 1: Install the SDK"
sidebar_label: "Step 1: Install the SDK"
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025334751-Step-1-Install-the-SDK <br /> ✘ images still hosted on help.split.io </button>
</p>

Our SDKs are designed to live at the application layer of your application and provide a secure and out-of-the-box method for controlling your experiments and feature flags. Each SDK has two main functions:
* Serve as a decision engine for your application
* Automatically capture what variants of your features your customers are served

# Decision engine

When you set up rules for your feature flags and experiments to be targeted to subsets of your customer base in Split (e.g., run a 50/50 test of a new home page on customers in New York), our SDKs automatically download down these rules and maintain a local copy of them on your machines. From there, our SDKs then take care of keeping themselves up to date by periodically checking for any changes to the rules that are made in the Split user interface.

When your application then loads for your customers, you can simply ask the SDK via a method called `getTreatment` to decide what variant of a feature the customer should see. Since the SDK is maintaining a local copy of the rules that govern your features and experiments, it can simply reference that copy of your rules and make the decision to serve "on" or "off" to your customer without having to make a single remote call. From there, you can take the decision returned by our SDK and use that information to serve up the proper experience to your customer. In this manner, our SDK is able to abstract out any need to hardcode this type of decision making in your application. 

Split SDKs are for specific languages or use cases. To choose the best SDK for your scenario, see the SDK docs:

* [Android Suite](https://help.split.io/hc/en-us/articles/22916666123277)
* [Android SDK](https://help.split.io/hc/en-us/articles/360020343291)
* [Angular utilities](https://help.split.io/hc/en-us/articles/6495326064397-Angular-utilities)
* [Browser Suite](https://help.split.io/hc/en-us/articles/22622277712781-Browser-Suite)
* [Browser SDK](https://help.split.io/hc/en-us/articles/360058730852-Browser-SDK)
* [Flutter plugin](https://help.split.io/hc/en-us/articles/8096158017165-Flutter-plugin)
* [GO SDK](https://help.split.io/hc/en-us/articles/360020093652)
* [iOS Suite](https://help.split.io/hc/en-us/articles/26408115004429-iOS-Suite)
* [iOS SDK](https://help.split.io/hc/en-us/articles/360020401491)
* [Java SDK](https://help.split.io/hc/en-us/articles/360020405151)
* [JavaScript SDK](https://help.split.io/hc/en-us/articles/360020448791)
* [.NET SDK](https://help.split.io/hc/en-us/articles/360020240172)
* [Node.js SDK](https://help.split.io/hc/en-us/articles/360020564931)
* [PHP SDK](https://help.split.io/hc/en-us/articles/360020350372)
* [PHP Thin Client SDK](https://help.split.io/hc/en-us/articles/18305128673933)
* [Python SDK](https://help.split.io/hc/en-us/articles/360020359652)
* [React SDK](https://help.split.io/hc/en-us/articles/360038825091-React-SDK)
* [React Native SDK](https://help.split.io/hc/en-us/articles/4406066357901-React-Native-SDK)
* [Redux SDK](https://help.split.io/hc/en-us/articles/360038851551-Redux-SDK)
* [Ruby SDK](https://help.split.io/hc/en-us/articles/360020673251)

# Capturing what your customer was served

Each time our SDK makes a decision of what your customer should be served, it automatically takes that information and queues it up on your machines. The SDK then takes care of all the work in passing this information up to Split in the background without ever slowing down your application. By capturing this information, you can easily understand what customers are being served and set the basis for being able to properly measure your experiments.
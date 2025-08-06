---
title: Install the FME SDK
sidebar_label: Install the FME SDK
description: Learn how to install the Harness FME SDKs.
sidebar_position: 1
---

## Overview

Our SDKs are designed to live at the application layer of your application and provide a secure and out-of-the-box method for controlling your experiments and feature flags. 

Each SDK has two main functions:

* [Serve as a decision engine for your application](#decision-engine)
* [Automatically capture what variants of your features your customers are served](#capturing-what-your-customer-was-served)

### Harness FME SDKs

Split SDKs are for specific languages or use cases. To choose the best SDK for your scenario, see the respective SDK documentation.

- [Android Suite](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-suites/android-suite)
- [Android SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/android-sdk)
- [Angular utilities](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/angular-utilities)
- [Browser Suite](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-suites/browser-suite)
- [Browser SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/browser-sdk)
- [Elixir Thin Client SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/elixir-thin-client-sdk)
- [Flutter plugin](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/flutter-plugin)
- [Go SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/go-sdk)
- [iOS Suite](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-suites/ios-suite)
- [iOS SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/ios-sdk)
- [Java SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/java-sdk)
- [JavaScript SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk)
- [.NET SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/net-sdk)
- [Node.js SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/nodejs-sdk)
- [PHP SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/php-sdk)
- [PHP Thin Client SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/php-thin-client-sdk)
- [Python SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/python-sdk)
- [React SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-sdk)
- [React Native SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-native-sdk)
- [Redux SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/redux-sdk)
- [Ruby SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/ruby-sdk)

## Decision engine

When you set up rules for your feature flags and experiments to be targeted to subsets of your customer base in Split (e.g., run a 50/50 test of a new home page on customers in New York), our SDKs automatically download down these rules and maintain a local copy of them on your machines. From there, our SDKs then take care of keeping themselves up to date by periodically checking for any changes to the rules that are made in the Split user interface.

When your application then loads for your customers, you can simply ask the SDK via a method called `getTreatment` to decide what variant of a feature the customer should see. 

Since the SDK is maintaining a local copy of the rules that govern your features and experiments, it can simply reference that copy of your rules and make the decision to serve "on" or "off" to your customer without having to make a single remote call. From there, you can take the decision returned by our SDK and use that information to serve up the proper experience to your customer. 

In this manner, our SDK is able to abstract out any need to hardcode this type of decision making in your application.

## Capturing what your customer was served

Each time our SDK makes a decision of what your customer should be served, it automatically takes that information and queues it up on your machines. The SDK then takes care of all the work in passing this information up to Split in the background without ever slowing down your application. 

By capturing this information, you can easily understand what customers are being served and set the basis for being able to properly measure your experiments.
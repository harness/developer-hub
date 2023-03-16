---
title: Erlang SDK Reference
description: This topic describes how to use the Harness Feature Flags Erlang SDK. For getting started quickly, you can use our sample code from the Erlang SDK README.
sidebar_position: 15
---

This topic describes how to use the Harness Feature Flags Erlang SDK for your Erlang application.

For getting started quickly, you can use our sample code from the Erlang SDK [README](https://github.com/harness/ff-erlang-server-sdk#readme).

## Before you begin

Make sure you read and understand:

* [Feature Flags Overview](/docs/feature-flags/ff-onboarding/cf-feature-flag-overview)
* [Getting Started with Feature Flags](/docs/feature-flags/ff-onboarding/ff-getting-started/getting-started-with-feature-flags)
* [Client-Side and Server-Side SDKs](/docs/feature-flags/ff-sdks/sdk-overview/client-side-and-server-side-sdks)
* [Communication Strategy Between SDKs and Harness Feature Flags](/docs/feature-flags/ff-sdks/sdk-overview/communication-sdks-harness-feature-flags)

## Version

The current version of this SDK is **1.0.0**. 

## Requirements

To use this SDK, make sure you:

* Install Erlang/OTP 24 or later
* Install Rebar3
* Download the SDK from our GitHub repository
* Create an Erlang application, or clone our sample application.
* Create a Feature Flag on the Harness Platform. If you are following along with the SDK README sample code, make sure your flag is called harnessappdemodarkmode.
* Create an SDK key and make a copy of it

## Install the SDK

### Install using rebar3

Add the SDK as a dependency to your `rebar.config` file:

```
{deps, [{ffclient, {git, "https://github.com/harness/ff-erlang-server-sdk", {tag, "0.4.0-beta.2"}}}]}.
```

### Install using mix

Add the SDK to your `mix.exs` file:

```
  defp deps do
    [
      {:ffcfclient, git: "https://github.com/harness/ff-erlang-server-sdk", tag: "0.4.0-beta.2"}
    ]
```

## Initialize the SDK

To initialize the Erlang SDK:

1. Add your Server SDK key to connect to your Harness Environment.
1. Add a Target that you want to Evaluate against a Feature Flag.
1. (Optional) Configure the SDK.
1. Complete the initialization with the SDK using the Server SDK Key, Target, and Configuration parameters you set.

### Add the Server SDK Key

To connect to the correct Environment that you set up on the Harness Platform, add the Server SDK Key from that Environment. Input the Server SDK Key into the `sdkKey` parameter, for example:

```
  case ffclient:start(“sdkkey”) of
    ok ->
      ok
    {not_ok, Error} ->
      {Not_ok, Error}
  end.
```

### Add a Target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.  
  </details>

For more information about Targets, go to [Target Users With Flags](/docs/feature-flags/ff-using-flags/ff-target-management/targeting-users-with-flags).

To create a Target, create a map and add the following keys:

| Parameter | Description | Required? | Example |
|-----------|-------------|-----------|---------|
| **Identifier** | Unique ID for the Target<br /><br />**Key:** atom<br />**Value:** bitstring | Required | `identifier => <<"HT_1">>` |
| **Name** | Name for this Target. This does not have to be unique. **Note:** If you don’t provide a value, Harness uses the ID as the name. | Optional | `name => <<"Harness_Target_1">>` |
| **Attributes** | Additional data you can store for a Target, such as email addresses or location.<br /><br />**Key:** atom<br />**Value:** bitstring/atom. If using a list then each element must be a bitstring/atom. Go to the Harness [Erlang SDK github repository](https://github.com/harness/ff-erlang-server-sdk#targets-with-custom-attributes) for more information. | Optional | `%% Bitstring`<br />`attributes => #{beta => <<"beta_group_1">>}`<br /><br />`%% Atom`<br />`attributes => #{alpha => 'alpha_group_1'}`<br /><br />`%% List`<br />`attributes => #{beta => [<<"beta_group_1">>, 'beta_group_2'}]}` |

































---
title: Is the iOS SDK library missing the track method?
sidebar_label: Is the iOS SDK library missing the track method?
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to iOS SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360015671051-Is-the-iOS-SDK-Split-library-missing-the-track-method </button>
</p>

## Issue

Using iOS SDK in Xcode project, when trying to use track method, build error "Value of type 'SplitClientProtocol' has no member 'track'."

![](https://help.split.io/hc/article_attachments/360010664231/Screen_Shot_2018-09-04_at_9.36.57_AM.png)

## Root Cause
The iOS SDK used is likely an old version that is earlier than 1.3.0.

## Solution
Make sure to use the latest version in Cocoapod. Refer to the [SDK doc link](https://docs.split.io/docs/ios-sdk-overview).
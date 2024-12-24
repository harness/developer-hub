---
title: "Feature flags: Build vs. buy"
sidebar_label: "Feature flags: Build vs. buy"
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360039811211-New-user-fail-to-login-to-Split-using-invitation <br /> ✘ images still hosted on help.split.io </button>
</p>

## Problem

Invitation is sent successfully to a user for given organization, however, when they set the password and click Login button, nothing happen, the login screen does not change.

## Root cause

There are multiple root causes:

* The same user id (email address) exists in another organization. Split platform does not allow users to belong to multiple organizations.
* The invitation link has expired.
* The user is trying to use Google Authentication to log in to Split for the first time, not Split authentication.

## Solution

There are few solutions if the user email exist in another organization:

1. User login to their account, then go to My settings, as shown in screenshot below.

![](https://help.split.io/hc/article_attachments/15594768163853)

2. Then change their email address to one other than their official work email.

![](https://help.split.io/hc/article_attachments/15594760553357)

3. Use the same email with the addition of (+1) to the id, the email server will accept and relay the email to the same account, and Split platform will treat it as a different email, for example: for first.last@email.com the suggested email to use is first.last+1@email.com.

4. Contact Split support (via support@split.io or this page) to delete the existing account, then create a new invite.

Checkout [this article](https://help.split.io/hc/en-us/articles/360032491232) for invite expiration.

Checkout [this article](https://help.split.io/hc/en-us/articles/360027863351) for using Google authentication.
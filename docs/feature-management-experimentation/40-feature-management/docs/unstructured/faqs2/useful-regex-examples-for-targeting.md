---
title: Useful Regex Examples for Targeting
sidebar_label: Useful Regex Examples for Targeting
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360026231292-Useful-Regex-Examples-for-Targeting <br /> ✘ images still hosted on help.split.io </button>
</p>

Split targeting rules support matching regex (regular expression) to serve specific treatment, Regex is a powerful tool to filter a wide spectrum of population with one line of text. It’s recommended that you test your regex on an external tool to verify it works correctly. Here is one [suggested site](https://regex101.com/).

Below are a few useful examples.

## Target specific app major version

To target users with app version greater than or equal to 4.5 to get the `on` treatment, this regex could be used for matching the appVersion attribute:

(\[5-9\]\\.\[0-9\]|\[4\]\\.\[5-9\]).*

![](https://help.split.io/hc/article_attachments/15726820984077)

Example of passing the appVersion attribute for Javascript SDK:

```javascript
var attributes = {appVersion: "4.567.33"};
```

## Target all population of specific domain of user emails

For this example, to serve the `on` treatment for all employees of split.io, we can use the Regex below for `email` attribute:

@split\.io$

![](https://help.split.io/hc/article_attachments/15726851838093)

Example of passing the email attribute for Javascript SDK:

```javascript
var attributes = {email: "bilal@split.io"};
```

## Target users on Chrome version 20 and later

This example we are serving the `on` treatment to Chrome users only. However, we want to only use Chrome versions 20 and later for compatibility reasons. The attribute passed is userAgent:

Chrome\\/[2-9][0-9]\\.

![](https://help.split.io/hc/article_attachments/15726938445709)

Example for Javascript SDK:

```javascript
var attributes = {userAgent: "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36"};
```

## Target English speaking users world wide

An experiment is designed for English speaking users in any country by detecting the default language setting in the browser, the attribute passed is navigatorLanguage
en-.

![](https://help.split.io/hc/article_attachments/15726949310861)

Example for Javascript SDK:

```javascript
var attributes = {navigatorLanguage: navigator.language};
```

## Target specific URL

To target an experiment that applies only to users that land on a specific URL, the extracted URL can be passed as an attribute to the targeting rule:

http:\\/\\/mysite\\.com\\/my_url

![](https://help.split.io/hc/article_attachments/15727006393485)

Example for Javascript SDK:

```javascript
var attributes = {url: window.location.href};
```
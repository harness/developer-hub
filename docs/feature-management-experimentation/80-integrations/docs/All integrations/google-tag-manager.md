---
title: Google Tag Manager
sidebar_label: Google Tag Manager
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/7936008367245-Google-Tag-Manager <br /> ✘ images still hosted on help.split.io </button>
</p>

[Google Tag Manager (GTM)](https://marketingplatform.google.com/about/tag-manager/) manages tags that are used for tracking and analytics on websites. GTM can be leveraged as a way to integrate the Split Browser SDK in a site and reference it from other custom tags.

# Automatic tracking for events defined on GTM and gtag.js

When you use Google Tag Manager for tracking and analytics, which is powered by [Google Universal Analytics (GA) library](https://developers.google.com/analytics/devguides/collection/analyticsjs), you can configure the Split SDK's Google Analytics (GA) integration to automatically track these events (or a desired subset) into Split to feed our stats engine.

To integrate Split's [Google Analytics to Split integration](https://help.split.io/hc/en-us/articles/360040838752-Google-Analytics#google-analytics-to-split), configure the integration when you instantiate the SDK and a GA plugin, which is required for your selected trackers. This allows you to pick up events that are generated and processed by GA (with multiple customization options) and send the events to Split.

When you use [Google Tag Manager](https://support.google.com/tagmanager/answer/6107124) or [Global Site Tag (gtag.js)](https://developers.google.com/analytics/devguides/collection/gtagjs) to set up your Universal Analytics configuration, trackers are created with dynamic names. 

To do this, you need to require the `splitTracker` plugin for the desired trackers. However, because their names are unknown when writing the code, doing it manually by placing the command `ga('<trackerName>.require', 'splitTracker')` won't work. Instead, include the `autorequire` script created for this integration after your `GTM`/`gtag.js` tag, which integrates with the `ga` command queue and handles the corresponding `require` commands for the Split plugin automatically.

```html
  <!-- Google Tag Manager -->
  <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXXX');
  </script>

  <!-- You can include it from our CDN -->
  <script src="//cdn.split.io/sdk/ga-to-split-autorequire.js"></script>
  
  <!-- Alternatively, you can copy the content of that file inside a script tag and it would be equivalent -->
  <!-- <script>
    // Paste here the content of https://cdn.split.io/sdk/ga-to-split-autorequire.js
  </script> -->
  
```

```html
  <!-- Global site tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-XXXXXXXX-1');
  </script>

  <!-- You can include it from our CDN -->
  <script src="//cdn.split.io/sdk/ga-to-split-autorequire.js"></script>
  
  <!-- Alternatively, you can copy the content of that file inside a script tag and it would be equivalent -->
  <!-- <script>
    // Paste here the content of https://cdn.split.io/sdk/ga-to-split-autorequire.js
  </script> -->
```

# Injecting the Split SDKs through a GTM tag

You can leverage GTM as a way to integrate the Split Browser SDK in a site and reference it from other custom tags. By using the Split [JavaScript SDK](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK) (the one used on this example) or the [Browser SDK](https://help.split.io/hc/en-us/articles/360058730852-Browser-SDK), Split can be integrated with Google Tag Manager with minimal effort. This methodology works with both UA and GA4.

## Sending Split to Google Tag Manager's data layer

The best approach to obtaining a reference to the Split client within Google Tag Manager is to utilize the [data layer](https://support.google.com/tagmanager/answer/6164391?hl=en), as this keeps us from cluttering the global variable namespace. To achieve this, add a line to the Split SDK [initialization code](https://docs.split.io/docs/javascript-sdk-overview#section-2-instantiate-the-sdk-and-create-a-new-split-client-) on the HTML page to push the Split client to the data layer. The code below sets the data layer variable split_client to the Split client instance.

```
<script>
  // ...
  var factory = splitio({
    // Split SDK initialization config goes here
  });
  var client = factory.client();
  // ...

  // Push the Split client to the data layer
  dataLayer.push({ split_client: client });
</script>
```

## Assigning the Split client to a variable within Google Tag Manager

After you utilize the data layer, we define a new variable within Google Tag Manager called Split client set to the data layer variable `split_client`. This enables us to reference the Split client within our tags in Google Tag Manager.

<p>
  <img src="https://help.split.io/hc/article_attachments/7941674934413/define-variable.png" alt="define-variable.png" />
</p>

## Referencing the Split client in tags within Google Tag Manager

Once you define the new variable, we create a new custom HTML tag which includes our JavaScript code that references the Split client. For this example, we perform a simple [track](https://docs.split.io/docs/javascript-sdk-overview#section-track) call which logs an event to Split. We are setting the local variable `client` to the Google Tag Manager variable
`{{Split Client}}` we defined in the previous step so we can access our Split client within the tag.

```
<script>
  var client = {{Split Client}};

  // ...
</script>
```

As we add other tags to Google Tag Manager, we always want to repeat this pattern of first setting the local variable `client` to the Google Tag Manager variable `{{Split Client}}`.

<p>
  <img src="https://help.split.io/hc/article_attachments/7941688506637/set-local-variable.png" alt="set-local-variable.png" />
</p>

## Advanced topics

This section describes advanced use cases and features.

### Initializing the Split SDK within Google Tag Manager

For most users, initializing the Split SDK on the HTML page and then pushing the client to the data layer is the best approach as it allows the Split client to be accessible within both environments and avoids race conditions. For installations that don't need to access the Split client within the code on the HTML page or do not mind how Google Tag Manager loads in scripts asynchronously, another viable option is to initialize the Split client within Google Tag Manager.

You can initialize the Split SDK by inserting the following code into a custom HTML tag which fires on all pages:

```
<script>
  // ...
  var factory = splitio({
    // Split SDK initialization config goes here
  });
  var client = factory.client();
  // ...

  // Push the Split client to the data layer
  dataLayer.push({ split_client: client });
</script>
```

You can now add your variables and tags as suggested in the previous sections.

:::warning[Caution]
Be aware that this tag must fire before any other tags which reference the Split client or you can run into race conditions where the Split client variable is undefined. To learn about how to address this, refer to Google's documentation on [Tag Sequencing in Google Tag Manager](https://support.google.com/tagmanager/answer/6238868?hl=en).
:::

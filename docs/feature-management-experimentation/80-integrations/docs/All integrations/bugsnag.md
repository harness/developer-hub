---
title: Bugsnag
sidebar_label: Bugsnag
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/5709939011085-Bugsnag <br /> ✘ images still hosted on help.split.io </button>
</p>

Split + Bugsnag is a community-supported integration. We do our best to ensure that we share only high-quality community integrations and solutions but we do not work on these projects directly, nor can we guarantee that they’re consistently maintained.

**Note:** The Bugsnag integration is built and managed by Bugsnag. For questions about the integration or for technical support, contact support@bugsnag.com.

The Bugsnag community integration with Split lets you identify which feature flags or experiment treatments are impacting the user experience within an application in real-time. With this integration, you can:

**Correlate user impact with feature releases.** Once you configure Split with Bugsnag, you can set up alerts in Bugsnag to monitor how your feature flags and experiments are influencing user behavior in your application, allowing you to decide whether to roll out or roll back features in Split. 
**Gain actionable insights.** Use Bugsnag’s Feature Dashboard to determine if unusual error activity in the application is connected to a feature flag. You can isolate errors that occur when a feature flag is enabled, so you can see what’s happening and troubleshoot your errors. Log into Split to adjust the feature flag definition.

<p>
  <img src="https://help.split.io/hc/article_attachments/5709949405965/bugsnag-error.png" alt="bugsnag-error.png" />
</p>

# Supported SDKs

Split SDKs support listeners so you can automatically declare the flags and their variations to Bugsnag whenever they are queried within your app. Bugsnag supports the following SDKs when declaring feature flags and experiments from Split: Android, iOS, Electron, Expo, JavaScript (browser and Node.js), and React Native. 

# Integrating Split and Bugsnag

For more information on integrating Bugsnag and Split, refer to the [Bugsnag](https://docs.bugsnag.com/product/integrations/feature-management/split) documentation. 

# Integrating Bugsnag to Split

This integration uses a BugSnag webhook to report errors to Split, where they become events eligible for inclusion in A/B test results. This integration uses a BugSnag webhook to report errors to Split, where they become events eligible for inclusion in A/B test results. There are two possible approaches to this integration: 

* Sending Split feature flags to BugSnag. Involves using the Split SDK and is documented on BugSnag's site.
* Using a webhook to pass BugSnag errors to Split. This is described in the following sections.

## How it works

BugSnag has built-in webhooks. When you create a webhook that reports errors, Split can provision a service to listen for errors. The service receives an error, transforms it into a Split event, and sends the event on to Split for use in metrics and experimentation.

The BugSnag errors have rich property information, and not all of it is sent to Split. Some of the properties are flattened in order to be suitable for a Split event.

## Setting it up

The Split service is expected to be an AWS node.js lambda. The lambda can also be provisioned as a serverless function in another cloud, but the instructions are not provided. The installer is expected to be a Git user, have access to AWS, and understand how to provision new lambdas. It is also assumed you have both Split and BugSnag accounts.

**Installing the integration at the command line**

The following explains the command line steps for installing the integration.

**Note: The repository is at [bugsnag2split](https://github.com/splitio/bugsnag2split).**

Create a new directory and clone the integration code into it:

git clone https://github.com/splitio/bugsnag2split.git

Change into the new bugsnag2split directory. Create a new SPLIT_API_KEY file:

```
touch SPLIT_API_KEY
```

Create a new server-side API token in Split, and copy it into this file. There should be no spaces or carriage return arount it. This token is used to validate the integration when it sends an event to Split.

Run an npm install:

```
npm install
```

Create a zip file for your soon-to-be-created lambda:

```
zip -r bugsnag.zip *
```

## AWS Installation

Create a node.js lambda. On the code page, upload your bugsnag.zip file.

Under configuration, create a function URL for your lambda.

* No auth type
* Configure CORS
* Allow methods POST

## Install on Bugsnag

1. From Projects, select Data forwarding, then  Webhook.
2. Paste in the function URL from the previous step.
3. Click Test. Look to the lower, left-hand screen to see if you're  successful.
4. Turn on **Every time an error occurs** in the config below.
5. Click the checkbox to **Notify me every time an error occurs**.
6. Update your preferences. The integration install is now complete.

## View BugSnag errors in Split

Using the Split Data hub, you can view errors as they arrive in Split. They have a lot of information available in properties. The following is an example error:

```
{
   "environmentId":"194da2f0-3e22-11ea-ba75-12f2f63694e5",
   "environmentName":"Prod-Default",
   "eventTypeId":"bugsnag_error_wh",
   "key":"dmartin-bugsnagger",
   "properties":{
      "occurrences":"82",
      "device.browserVersion":"103.0.0",
      "releaseStage":"development",
      "user.name":"David B. Martin",
      "receivedAt":"2022-07-19T15:00:50.843Z",
      "device.id":"ckvcjhzya00003e5uichx3sxy",
      "app.type":"browser",
      "app.duration":"792196",
      "unhandled":"false",
      "device.browserName":"Chrome",
      "user.email":"david.martin@split.io",
      "requestUrl":"http://localhost:8080/bugsnag-split.html",
      "context":"/bugsnag-split.html",
      "id":"62d6c722009557e6c9b80000",
      "errorId":"628850cb3ae8290008a73487",
      "severity":"warning",
      "device.locale":"en-US",
      "user.id":"dmartin-bugsnagger",
      "device.orientation":"landscape-primary",
      "exceptionClass":"Error",
      "message":"error during donate click handling",
      "app.releaseStage":"development",
      "userId":"dmartin-bugsnagger",
      "url":"https://app.bugsnag.com/split-software/split/errors/628850cb3ae8290008a73487?event_id=62d6c722009557e6c9b80000&i=wh&m=oc",
      "device.time":"2022-07-19T15:00:50.607Z",
      "device.osName":"Mac OS X 10.15",
      "firstReceived":"2022-05-21T02:39:07.000Z",
      "status":"open"
   },
   "receptionTimestamp":1658242853018,
   "timestamp":1658242852567,
   "trafficTypeId":"194c6a70-3e22-11ea-ba75-12f2f63694e5",
   "trafficTypeName":"user",
   "value":0
}
```

## About the Split key

The Split key of the error events must agree with the Split key of your impressions. In practice, you’ll want to configure the key in your BugSnag initialization. Use the same ‘id’ key for your Split SDK configuration.
```
  Bugsnag.start({
		apiKey: '<bugsnag spi key',
		user: {
		   id: 'dmartin-bugsnagger',
		   name: 'David B. Martin',
		   email: 'david.martin@split.io'
	  	}		
	})
```

## A hint on triggering errors

If you want to stimulate some errors from your JS app, you can use the notify function of Bugsnag. In this example, a buttons onclick has been passed a clickHandler that creates a new exception. If your integration is fully installed, you’ll see the event arrive at the Data hub “momentarily”.
```
  function clickHandler() {
		alert('click! (error trigger)');
		Bugsnag.notify(new Error('error during test click handling'));
	}
```
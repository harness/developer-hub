---
title: Feature Management & Experimentation (FME) FAQs
description: This article addresses some frequently asked questions about Harness FME.
sidebar_position: 2
---

## Feature flags

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360044768212-Feature-flags-and-SEO </button>
</p>

### How do feature flags impact SEO, particularly when running experiments?

#### Answer

It's likely there will be some SEO impact based on what content is visible to Google when the page is crawled.  Though it's likely to be minimal unless running a long term test in which, for example, two VASTLY different pages are served and Google (or any other search engine) crawls both versions several times. In that instance, the ranking would likely be impacted. You shouldn't expect to see an overall site authority impact unless you are doing something very out of the box.

Web crawlers like Google perform most of their initial crawling with JavaScript disabled. Best practice from an SEO perspective is to maximize the quality of the page prior to JavaScript rendering via titles, text content, hrefs, and the like.  Any SEO that is in place for that initial crawl is going to be unaffected by Split.

Since the bot is not going to run Javascript you won't call getTreatment, which means the bot will get the control treatment.  On the backend the bot would be seen as anonymous traffic, likely, so you would pass us a new key, just like you would with a real anonymous user. 

#### Cloaking

Cloaking is concerned with serving different content to search engines vs. real users. There is nothing that setting a feature flag does to explicitly differentiate.  You COULD do that by getting the user agent of the bot from the search engine and using that as a targeting rule, sending the bot to a specific treatment that is different than real users. But you would have to purposefully do that.

#### Experimentation and SEO

Google and Microsoft have both repeatedly advocated for the use of A/B testing on websites and said that it should not pose a risk to page rank. If you want to provide a consistent experience for crawlers, you can provide a consistent key to the crawler that can be used during randomization as long as you're not explicitly targeting the user agent to serve content as noted above.

## Administration (Standalone Split)

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020399652-What-happens-when-I-downgrade-to-the-Free-Edition </button>
</p>

### What happens when I downgrade to the Free Edition of Split?

#### Answer

New users to Split get to try out all the capabilities for 30 days to help determine which package makes the most sense for their needs.  The correct package depends on the importance of features such as enterprise-level security and control, the need for more sophisticated functionality such as dynamic configuration or measurement, and/or basic flag and user management provided by the rollout board and SSO authentication.  Of course, for some teams, the Developer package fits their needs.  

When your trial ends, you will automatically be downgraded to the free product.  Upon downgrade, your organization limits will be lowered to the default service limits for Split's Developer Edition.  Don’t worry, if your trial or paid subscription is re-enabled, any configurations set before the downgrade will be reconfigured including permission settings, event data, etc. 

If the Developer package is all you need and you’ve experimented with any of the paid-for features there are a few things to be aware of when the trial ends.  If you have an issue with any of the below when you transition, feel free to contact Split support at support@split.io for assistance.

* There is access to one workspace, and by default, the workspace that comes first alphabetically will be visible while any others you may have created will be inaccessible.  That means, of course, that you’ll want to rename your workspaces so the one to keep is first.  

* There are two Environments.  If you’ve created more, you will lose access to the most recently created environments.

* Flags can have a max of two treatments.  Any flags you’ve created with more than two will continue to work as expected. You will not be able to create new multivariant flags or add treatments to existing flags.

* Segments are limited to 10,000 keys.  Again, any segments you’ve created that have more than 10,000 keys will continue to work.

* Flags with dynamic configurations existing will stay the same and the configuration on the treatment can be modified, but no more configurations can be added to those flags or new flags.

* Existing flags with Limit Exposure will continue to work as they were set and can be modified, but new flags will not be able to use Limit Exposure.

* Flags with dependencies will continue to work and the dependency can be modified, but new flag dependencies cannot be set.

* SSO is disabled, you must switch to username and password logins.

* Editing permissions go away.

* Existing groups are maintained, but no new groups can be created and you cannot add users to existing groups

* Approvals will no longer be available so be sure to have no outstanding flags awaiting approval. 

* Users don’t automatically get removed, but you are expected to comply with the license level that is currently in place and reduce the number of users, if appropriate.

There are a few more features that will become unavailable, but most won’t cause any issues or confusion when your trial ends. 

## SDK initialization

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006667012-Block-traffic-until-the-SDK-is-ready </button>
</p>

### How can I avoid getting the control treatment during SDK initialization?

When the SDK is instantiated, it kicks off background tasks to update an in-memory cache with small amounts of data fetched from Split servers. This process can take up to a few hundred milliseconds, depending on the size of data. While the SDK is in this intermediate state, if it is asked to evaluate which treatment to show to a customer for a specific feature flag, it may not have data necessary to run the evaluation. In this circumstance, the SDK does not fail, rather it returns the Control treatment. How can I avoid this?

#### Answer

You can wait to send traffic by blocking until the SDK is ready. This is best done as part of the startup sequence of your application. Here is an example in Ruby:

```
require 'splitclient-rb'options = {block_until_ready:10 }
begin  split_factory = SplitIoclient::SplitFactoryBuilder.build("YOUR_API_KEY", options)  split_client = split_factory.client
rescue SplitIoClient::SDKBlockerTimeoutExpiredException
  puts "SDK Failed to initialize in the time requested"
end
```

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4409917901837-General-SDK-SDK-Readiness-always-times-out-when-running-in-Kubernetes-and-Istio-proxy </button>
</p>

### How can I troubleshoot SDK not ready exception when running SDK in Kubernetes container with Istio proxy?

Running an application that uses Split SDK in a Kubernetes container that is configured to use Istio proxy always results in SDK not ready exception.

When enabling the SDK debug log files, it appears the SDK http calls are erroring out with **connection refused** error

```
DEBUG - 2021/09/13 12:48:07 [GET] https://sdk.split.io/api/splitChanges?since=-1
DEBUG - 2021/09/13 12:48:07 Authorization [ApiKey]: xxxx...xxxx
DEBUG - 2021/09/13 12:48:07 Headers: map[Accept-Encoding:[gzip] Content-Type:[application/json] Splitsdkmachineip:[x.x.x.x] Splitsdkmachinename:[ip-x-x-x-x] Splitsdkversion:[go-6.0.2]]
ERROR - 2021/09/13 12:48:07 Error requesting data to API: https://sdk.split.io/api/splitChanges?since=-1 Get "https://sdk.split.io/api/splitChanges?since=-1": dial tcp 151.101.3.9:443: connect: connection refused
ERROR - 2021/09/13 12:48:07 Error fetching split changes Get "https://sdk.split.io/api/splitChanges?since=-1": dial tcp 151.101.3.9:443: connect: connection refused
 ```

#### Root Cause

The SDK calls are being blocked by a proxy or firewall within the Kubernetes setup. Verify if the internet connection is enabled and the Kubernetes pod has access to sdk.split.io endpoint by ssh to the pod and running the curl below:
```
curl -v https://sdk.split.io
```

If the error returned is 404, then the host is reachable. The issue might be with the Istio mesh.

#### Answer

Make sure to let the application container run when the Istio sidecar proxy is ready. Add the following to the Istio config:
```
--set meshConfig.defaultConfig.holdApplicationUntilProxyStarts=true
 ```
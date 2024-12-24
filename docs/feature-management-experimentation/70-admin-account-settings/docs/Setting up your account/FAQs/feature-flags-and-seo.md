---
title: Feature flags and SEO
sidebar_label: Feature flags and SEO
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360044768212-Feature-flags-and-SEO </button>
</p>

How do feature flags impact SEO, particularly when running experiments?
It's likely there will be some SEO impact based on what content is visible to Google when the page is crawled.  Though it's likely to be minimal unless running a long term test in which, for example, two VASTLY different pages are served and Google (or any other search engine) crawls both versions several times. In that instance, the ranking would likely be impacted. You shouldn't expect to see an overall site authority impact unless you are doing something very out of the box.

Web crawlers like Google perform most of their initial crawling with JavaScript disabled. Best practice from an SEO perspective is to maximize the quality of the page prior to JavaScript rendering via titles, text content, hrefs, and the like.  Any SEO that is in place for that initial crawl is going to be unaffected by Split.

Since the bot is not going to run Javascript you won't call getTreatment, which means the bot will get the control treatment.  On the backend the bot would be seen as anonymous traffic, likely, so you would pass us a new key, just like you would with a real anonymous user. 

## What about cloaking?

Cloaking is concerned with serving different content to search engines vs. real users. There is nothing that setting a feature flag does to explicitly differentiate.  You COULD do that by getting the user agent of the bot from the search engine and using that as a targeting rule, sending the bot to a specific treatment that is different than real users. But you would have to purposefully do that.

## Experimentation and SEO

Google and Microsoft have both repeatedly advocated for the use of A/B testing on websites and said that it should not pose a risk to page rank. If you want to provide a consistent experience for crawlers, you can provide a consistent key to the crawler that can be used during randomization as long as you're not explicitly targeting the user agent to serve content as noted above.
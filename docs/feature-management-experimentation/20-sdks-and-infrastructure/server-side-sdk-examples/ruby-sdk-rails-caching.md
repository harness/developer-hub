---
title: Ruby SDK and Rails caching
sidebar_label: Ruby SDK and Rails caching
sidebar_position: 14
---

## Question
How can the Ruby SDK integrate with a Rails application that works with full page caching?

### Environment
We created a demo app to test Rails caching working with Ruby SDK. Rails Version: 5.0.7, Puma Version: 3.12.0 (standalone). Ruby Version: 2.2.2-p95

We initialize the SDK as described in the [Split Documentation](https://docs.split.io/docs/ruby-sdk-overview#section-configuration)

Initialization snippet (typically: config/initializers/split_client.rb)

```
factory = SplitIoClient::SplitFactoryBuilder.build('YOUR_API_KEY') Rails.configuration.split_client = factory.client
```

### [Page Caching](https://guides.rubyonrails.org/caching_with_rails.html#page-caching) Outcome
We implemented this by adding the actionpack-page_caching gem to the application. This type of caching creates a copy of the rendered page, which can be served instead of processing the template on each request by configuring the web server to do so.

This approach doesn’t work with pages that need authentication, nor pages that use Split, because the first treatment that a user receives, will be displayed for all the subsequent users.

## Proposals
### Option 1 - [Action caching](https://guides.rubyonrails.org/caching_with_rails.html#action-caching)
A refactor can be done to query the treatment in a non cached action, forcing the decision logic to run on each request (in our case, the index action), while caching the other actions that display the result of the treatments.

![](https://help.split.io/hc/article_attachments/360008630892/image1.png)

![](https://help.split.io/hc/article_attachments/360008630912/image2.gif)

#### Additional details
This was implemented by adding actionpack-action_caching to the gem file. This type of caching allows caching an action in the controller, in our case we cached the index action.

![](https://help.split.io/hc/article_attachments/360008630952/image3.png)

This provides simple logic to show a message based on the treatment given to the user.

![](https://help.split.io/hc/article_attachments/360008665111/image4.png)

When the application was run, it loaded and called the SDK just once, then started showing the cached action.

![](https://help.split.io/hc/article_attachments/360008630992/image5.png)

In the browser:

![](https://help.split.io/hc/article_attachments/360008631012/image6.png)

### Option 2 - [Fragment caching](https://guides.rubyonrails.org/caching_with_rails.html#fragment-caching)

Similarly, a refactor can be done caching only fragments of the code that won’t change despite the obtained treatment.

![](https://help.split.io/hc/article_attachments/360008631032/image7.png)

![](https://help.split.io/hc/article_attachments/360008631052/image8.gif)

#### Additional details
This caching is included in Rails and allows to cache a fragment of a page.
We updated the previous view to show a cached fragment along with a non cached one, that’s recreated on each request.

![](https://help.split.io/hc/article_attachments/360008631072/image9.png)
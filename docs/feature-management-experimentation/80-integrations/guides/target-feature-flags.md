---
title: Targeting Feature Flags Using Segment Personas
description: Learn how to use your Segment user data for targeting your feature rollouts in Harness FME.
sidebar_position: 4
sidebar_label: Targeting Feature Flags Using Segment Personas
---

## Overview

Split is a unified solution for feature flagging, monitoring, and experimentation that enables product owners and developers to control rollouts and make data-driven product decisions. Segment makes customer data simple by giving you a single point for collecting, cleaning, and controlling that data.

If you are a customer of both Split and Segment, you are probably already integrating the two tools by sending events from Segment to Split, sending impression data from Split to Segment, or both. If you are not already using these integrations, see the [Segment integration](/docs/feature-management-experimentation/integrations/segment). 

One additional way to leverage Segment data in Split is to use your customer data for targeting your feature rollouts. You can utilize Segment Personas to target particular customers with specific traits as you gradually rollout new functionality or create separate populations for an experiment. 

## Using a Segment trait as attribute for targeting

In this example, you may want to test the effectiveness of a new feature on a 50/50 mix of your customers located in Colorado. 

First, we define the targeting definition within Split. In the below definition, we can see that if the user attribute *state* is in the list *CO* then 50% of users in Colorado would see *on* and 50% would see *off*.  

The Split SDK call `getTreatment()` returns the treatment appropriate for a given user and feature flag name. The SDK determines the treatment according to configured targeting rules. In this example, the targeting rules are referencing the value of user attributes (equivalent to “traits” in Segment) and the developer must ensure that the “state” attribute gets included at the time the getTreatment call is made and the user is bucketed and shown a treatment.

If your code maintains its own internal store of user attributes, then creating the list of key-value pairs to pass to getTreatment() is simple; retrieve the appropriate pairs from the internal database at runtime. 

If you are utilizing Segment Personas, then you can similarly use the [Profile API](https://segment.com/docs/unify/profile-api/) to retrieve the user attributes by calling:

```bash
https://profiles.segment.com/v1/spaces/<project_id>/collections/users/profiles/user_id:<user_id>/traits
```

The Profile API will return the following:

```bash
 { 
    "traits": { 
        "email": "marvinthomas@segment.com", 
        "state": "CO", 
        "firstname": "Marvin”, 
        "Lastname": "Thomas" 
    }, 
    "cursor": { 
        "url": "", 
        "has_more": false, 
        "next": "", 
        "limit": 10 
    } 
}
```

Using this response, you can then build an attribute map to be passed to Split’s `getTreatment` call using the meaningful keys and values returned in traits. 

Below is an example in Ruby, presuming a class including instance variables for the Segment project ID and an initialized Split client:

```ruby
def get_treatment_with_traits(user_id, split_name)
   url = 'https://profiles.segment.com/v1/spaces/' + @project_id + '/collections/users/profiles/user_id:' + user_id + '/traits'
   traits = HTTParty::get(url, basic_auth: @auth, format: :json)['traits']
   @split_client.get_treatment(user_id, split_name, traits)
end
```

## Using a Segment trait as an ID for targeting 

Another case where you might want to use Segment data for targeting your Split feature flag is when your traffic type is something other than user, like account. In this example, you want to pass the user’s account, which is one of the traits stored in Segment Personas, as the ID to Split’s `getTreatment` call. 

In the below example, you can retrieve a user’s trait with a given name and pass that trait’s value as the id to Split’s `getTreatment` call.

```ruby
def get_treatment_for_trait_value(user_id, targeting_trait, split_name)
  url = 'https://profiles.segment.com/v1/spaces/' + @project_id + '/collections/users/profiles/user_id:' + user_id + '/traits'
  traits = HTTParty::get(url, basic_auth: @auth, format: :json)['traits']
  if !traits.nil?
    targeting_id = traits[targeting_trait]
  end
  if targeting_id.nil? 
    'control'
  else
    @split_client.get_treatment(targeting_id, split_name)
  end
end
```

An example call to this method to target based on a user’s account:

```bash
treatment = get_treatment_for_trait_value(the_user, 'account', 'account_feature')
```

## Using a Segment group call to retrieve an ID for targeting 

If your team uses the Segment group call to associate an individual user with an account, you can retrieve the account ID with the Persona’s links API call.

By calling the following:

```bash
https://profiles.segment.com/v1/spaces/<project_id>/collections/users/profiles/user_id:<user_id>/links
```

You’ll get a return value:

```bash
{
 "data": [
   {
     "to_collection": "accounts",
     "external_ids": [
       {
         "id": "account0001",
         "type": "group_id",
         "source_id": "zbhKeiAyLq",
         "collection": "accounts",
         "created_at": "2019-09-09T20:06:56.172597879Z",
         "encoding": "none"
       }
     ]
   }
 ],
 "cursor": {
   "url": "",
   "has_more": false,
   "next": ""
 }
}
```

From that you can extract the account ID to pass to Split’s `getTreatment` call:

```ruby
def get_treatment_for_users_account(user_id, split_name, with_traits = false)
  url = 'https://profiles.segment.com/v1/spaces/' + @project_id + '/collections/users/profiles/user_id:' + user_id + '/links'
  account_id = retrieve_account_id(HTTParty::get(url, basic_auth: @auth, format: :json)['data'])
  if account_id.nil?
    'control'
  else
    if with_traits
      url = 'https://profiles.segment.com/v1/spaces/' + @project_id + '/collections/accounts/profiles/group_id:' + account_id + '/traits'
      traits = HTTParty::get(url, basic_auth: @auth, format: :json)['traits']
      @split_client.get_treatment(account_id, split_name, traits)
    else
      @split_client.get_treatment(account_id, split_name)     
    end
  end
end  
  
def retrieve_account_id(data_array)
  puts data_array
  data_array.each { |data_elt|
    if data_elt['to_collection'] == 'accounts'
      return data_elt['external_ids'].at(0)['id']
    end
  }
  nil
end
```

If there are account attributes created by a group call which you wish to use in targeting, once you retrieve the account ID, you can retrieve the account’s traits the same way you retrieved a user’s traits and pass them to the `getTreatment` call. This is implemented in the above call if you pass the optional argument `with_traits` as true.

## Practical considerations

The combination of Segment data and Split targeting is a powerful tool for managing rollouts of your flagged features, but there are a few practical implications you should consider and plan for.

* Rate limiting on the Segment Profile API: By default, there is a rate limit of 60,000 requests/min. While this is per Access Secret, it is important to keep this in mind if you are making very frequent getTreatment calls incorporating Segment traits.
* Protect user data by implementing server-side: Because the Profiles API retrieves possibly sensitive user data, the techniques described here should only be implemented server-side, *not* on a web or mobile client.
* Introducing potential latency retrieving Split feature flags: On its own, a getTreatment call to the Split SDK makes no network calls; the appropriate treatment is calculated locally using cached rules. Retrieving an attribute list from Segment with the Profiles API is a network roundtrip. While in most cases this will not be a significant overhead, there is the potential to impact your application.
* Program defensively: Take care that your code accounts for all possible eventualities. For instance, with regards to the aforementioned potential latency of the Profiles API call, you might want to set a shorter than default timeout for the HTTP request. 
* Segment trait limiting: The sample code provided is for demonstration purposes only and does not deal with all possibilities, such as a user id having more than ten traits, which is the limit for the number of traits returned in a single call. In that case, to fetch all of a user’s traits, you’ll have to iteratively call the Profiles API, using the cursor element in the returned data. Always make sure to account for the case where the data doesn’t exist or isn’t returned because the request timed out.
---
title: Filter Harness Entities using Harness Tags in the API
description: Harness provides advanced tagging features for all or your Harness Application entities (Services, Environments, Workflows, etc), as described in Assign Metadata Using Tags and Apply Filters Using Ta…
# sidebar_position: 2
helpdocs_topic_id: 0fzcxynkv0
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness provides advanced tagging features for all or your Harness [Application entities](/article/bucothemly-application-configuration) (Services, Environments, Workflows, etc), as described in [Assign Metadata Using Tags](/article/nrxfix3i58-tags) and [Apply Filters Using Tags](/article/nyxf7g8erd-apply-filters-using-tags).

You can use Tags to search for entities, ensuring that you only return the entities tagged with a specific name and value.

In this topic:

* [Before You Begin](#before_you_begin)
* [Step 1: Assign Tags to your Harness Entities](#step_1_assign_tags_to_your_harness_entities)
* [Step 2: Use TagFilter](#step_2_use_tag_filter)

### Before You Begin

* [Manage Tags](/article/mzcpqs3hrl-manage-tags)
* [Apply Filters Using Tags](/article/nyxf7g8erd-apply-filters-using-tags)

### Step 1: Assign Tags to your Harness Entities

Harness Tags are `name:value` pairs you can add to Harness Application entities.

For instructions, see [Assign Metadata Using Tags](/article/nrxfix3i58-tags) and [Apply Filters Using Tags](/article/nyxf7g8erd-apply-filters-using-tags).

To see the available Tags in your Harness account, click **Setup**, and then click **Tags Management**. Each Tag pairs a name with one of more values:

![](https://files.helpdocs.io/kw8ldg1itf/articles/0fzcxynkv0/1590786931887/image.png)Once you have Tags assigned, you can filter your API queries with them.

### Step 2: Use TagFilter

`TagFilter` uses a Harness entity type of and the `name:value` pair of a Tag to filter queries:


```
{  
  services(filters: [{tag: {entityType: <EntityType>, tags: [{name: "<NAME>", value: "<VALUE>"}]}}], limit: 100) {  
    nodes {  
      name  
    }  
  }  
}
```
The supported entity types are dependent on what you are querying.

For example, if you are querying services, only APPLICATION is supported, which you can see when building the query:

![](https://files.helpdocs.io/kw8ldg1itf/articles/0fzcxynkv0/1596562200336/image.png)The entity types that might be available include the following: 

* APPLICATION
* ARTIFACT
* CLOUD\_PROVIDER
* COLLABORATION\_PROVIDER
* CONNECTOR
* DEPLOYMENT
* ENVIRONMENT
* INSTANCE
* PIPELINE
* SERVICE
* TRIGGER
* WORKFLOW

The `tags: [{name: "<NAME>", value: "<VALUE>"}]}}]` segment of the query uses the `TagInput` format:


```
name: String  
value: String
```
You simply need to select an entity type and a Tag `name:value` pair.

Let's look at a query that returns all Applications using the **DocExample** Tag and a value of **Yes**.


```
{  
  services(filters: [  
    {  
      tag: {  
        entityType: APPLICATION,   
        tags: [{  
          name: "DocExample", value: "Yes"  
        }]}}], limit: 100) {  
    nodes {  
      name  
      createdBy {  
        id  
      }  
      deploymentType  
    }  
  }  
}
```
All Applications using that Tag are returned:

![](https://files.helpdocs.io/kw8ldg1itf/articles/0fzcxynkv0/1590787537502/image.png)
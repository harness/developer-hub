---
title: Harness API Explorer
description: Describes how to use Harness API Explorer.
# sidebar_position: 2
helpdocs_topic_id: 2rmd5i0e0h
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness API Explorer allows you to construct and perform API queries and see their responses. You can use the Explorer to examine the API's structure, to build and test queries against your data, and to optimize your queries.

Harness' API Explorer is an instance of [GraphiQL](https://github.com/graphql/graphiql), which is a "graphical interactive in-browser GraphQL IDE."

The Harness API Explorer is intended primarily as a testing tool. When you're ready to build your queries into working code, see [Building Applications Using Postman](/article/txrp7awwu8-graph-ql-apis-for-browser-based-automation).In this topic:

* [Before You Begin](https://docs.harness.io/article/2rmd5i0e0h-harness-api-explorer#before_you_begin)
* [Step 1: Authenticate](#step_1_authenticate)
* [Step 2: Make API Calls](#step_2_make_api_calls)
* [Next Steps](https://docs.harness.io/article/2rmd5i0e0h-harness-api-explorer#next_steps)

### Before You Begin

* [​Introduction to Harness GraphQL API](/article/tm0w6rruqv-harness-api)
* [API Schema and Structure](/article/kn8wsu80n4-api-schema-and-structure)

### Step 1: Authenticate

1. In Harness, click **Setup.**  
![](https://files.helpdocs.io/kw8ldg1itf/articles/2rmd5i0e0h/1643406348696/clean-shot-2022-01-28-at-13-45-31.png)
2. Click **Harness API Explorer**.![](https://files.helpdocs.io/kw8ldg1itf/articles/2rmd5i0e0h/1592200658506/screenshot-2020-06-15-at-11-26-49-am.png)
3. In **Authentication**, select **Logged-in User Session** or **Use API Key**. The authentication determines what data you can query and retrieve via the API. By default, when you launch the **API Explorer**, you authenticate using a session key.![](https://files.helpdocs.io/kw8ldg1itf/articles/2rmd5i0e0h/1592203516035/screenshot-2020-06-15-at-12-15-02-pm.png)Authenticating with an alternative key can provide access to a different scope of data.
	1. **Switch Keys (Administrators)**: Members of **Account Administrator** [User Group](/article/ven0bvulsj-users-and-permissions#default_user_groups) can use the **Authentication** drop-down list to select a different API key from the Harness account.![](https://files.helpdocs.io/kw8ldg1itf/other/1566337163005/image.png)
	2. **Enter Keys (Non-Administrators)**: Non-administrators (with appropriate access) can perform the following steps to authenticate using an alternative API key:
		1. Obtain the key from your organization, and copy it to your clipboard, as outlined in [API Keys](/article/smloyragsm-api-keys).
		2. In the **API Explorer**, in **Authentication,** select **Use API Key.**![](https://files.helpdocs.io/kw8ldg1itf/other/1566339458604/image.png)
		3. Enter the **API Key**.![](https://files.helpdocs.io/kw8ldg1itf/other/1566339556978/image.png)
		4. Click **SUBMIT.** The key is now active and is displayed in the Authentication drop-down.To query the Harness API in your custom applications, your working code must pass an appropriate API Key from your Harness account as an `x-api-key` header. For more information, see [Building Applications Using Postman](/article/txrp7awwu8-graph-ql-apis-for-browser-based-automation).

### Step 2: Make API Calls

1. Form a call. The two types of allowed operations in Harness GraphQL API are **queries** and **mutations** (updates).  
**Query example**:  
  

```
query {  
  applicationByName(name: "Test App") {  
    id  
    name  
  }  
}
```
**Mutation example**:
```
mutation createapp($app: CreateApplicationInput!) {  
  createApplication(input: $app) {  
    clientMutationId  
    application {  
      name  
      id  
    }  
  }  
}
```
2. Traverse or search the schema. Click **Docs** to see the available API objects.
3. In **Docs**, click **Query** in the **Documentation Explorer** pane to see top-level API objects. Or, type field or property names into the Documentation Explorer's search box to see child properties.![](https://files.helpdocs.io/kw8ldg1itf/other/1566270170195/image.png)
4. Define variables in the **QUERY VARIABLES** pane, and call them in the query pane. In the following example, we pass the required `pipelineId` argument as a variable named `$thisPipeline`.![](https://files.helpdocs.io/kw8ldg1itf/articles/tm0w6rruqv/1584148691660/image.png)The `!` following the type means that this field is *required*.Here is the revised query, incorporating the new variable:  

```
query($thisPipeline: String!) {  
  pipeline(pipelineId: $thisPipeline) {  
    id  
    name  
    description  
  }  
}
```
Here is the format for passing the value in the **QUERY VARIABLES** pane:  

```
{  
  "thisPipeline": "<pipelineId>"  
}
```
5. Click **Run**. The response is displayed. Here is an example:![](https://files.helpdocs.io/kw8ldg1itf/articles/2rmd5i0e0h/1592211117105/screenshot-2020-06-15-at-2-21-35-pm.png)

### Next Steps

* [Use API to Retrieve IDs by Name](/article/iuswbbvwnm-use-api-to-retrieve-i-ds-by-name)
* [Use Cloud Providers API](/article/dfx0qi1zf7-use-cloud-providers-api)
* [Use Audit Trails API](/article/k9d2zjdnw8-use-audit-trails-api)
* [Use Workflows API](/article/ba4vs50071-use-workflows-api)
* [Use Users and Groups API](/article/p9ssx4cv5t-sample-queries-create-users-user-groups-and-assign-permissions)
* [Use Harness Applications API](/article/0wmvn5dgzn-use-harness-applications-api)
* [Use Pipelines API](/article/rfqmu6cejy-use-pipelines-api)
* [Use Services API](/article/lbw6cny911-use-services-api)
* [Encrypted Text API](/article/omnfccj1n0-api-encrypted-text)
* [Encrypted Files API](/article/jvhzdi1ztj-api-encrypted-files)
* [SSH Credentials API](/article/v65okfwfl2-api-ssh-credentials)
* [WinRM Credentials API](/article/2rlo5zw321-api-win-rm-credentials)


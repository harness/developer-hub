
---
title: Use REST resource delegate-token-ng
description: Describes the use of the delegate-token-ng REST resource.
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: 
helpdocs_is_published: false
---

You can use the delegate resources to build operators that create, install, and manage delegates. The following table provides a sample workflow.

| **Task** | **Operation** |
| :-- | :-- |
| Download the YAML specification for a delegate | downloadKubernetesDelegateYaml <br /><br />

Requires a Harness account identifier.<br /><br />

Send one request for each delegate you want to create. Each file contains information to uniquely identify one delegate. 
|
| Modify delegate specifications as appropriate | For information on adding environment variables, see [Delegate environment variables](/docs/platform/2_Delegates/delegate-reference/delegate-environment-variables.md). 
For information on defining initialization scripts, see [Common delegate initialization scripts](/docs/platform/2_Delegates/delegate-reference/common-delegate-profile-scripts.md) and [Install software on the delegate with initialization scripts](/docs/platform/2_Delegates/configure-delegates/run-scripts-on-delegates.md).
For information on configuring proxy settings, see Configure delegate proxy settings.
For information on automatic delegate update see [Delegate auto-update](/docs/platform/2_Delegates/configure-delegates/delegate-auto-update.md).|
| Create and name at least one token for each downloaded delegate YAML specification | `createDelegateToken`

For information on the process of delegate token generation using Harness Manager, see Secure delegates with tokens |
|Confirm the creation of the tokens | To see a list of the tokens associated with the account and optionally filtered by other parameters, use `getDelegateTokens`. <br /><br />

Alternatively, you can retrieve a list of delegates that were assigned a specific token by using the `getDelegateGroupsUsingToken` operation. <br /><br />

You can also find delegate tokens listed in Harness Manager. See [account resources]

| [TBD] | [TBD] |
| [TBD] | [TBD] |
| [TBD] | [TBD] |
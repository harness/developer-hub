---
title: Posting a change request using the FME API fails when the approver is specified
sidebar_label: Posting a change request using the FME API fails when the approver is specified
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360050159491-Posting-a-change-request-using-the-Admin-API-fails-when-the-approver-is-specified </button>
</p>

### Issue

When [submitting a change request](https://docs.split.io/reference#create-change-request) while using the Admin REST API to specify the approver contact, the request fails with 400 error.

```json
{"code":400,"message":"Something was wrong","details":"","transactionId":"xxxxxxx"}
```

### Root cause

This error is possible if the approver option is set in the environment that has the feature flag. When approvers are pre-selected, it is not allowed to specify an approver when submitting the change request, similarly to when submitting the change from Split user interface; the approver edit box will be greyed out.

### Answer

Verify if the feature flag definitions belong to an environment that has approvers set in its permissions. If so, remove the approver contact and leave the approvers array empty in the JSON payload.

```json
"approvers":[]
```
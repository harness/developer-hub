---
title: Workaround for issue in `ui:widget:password`
---

## Context

IDP Workflow forms require a special field to be set in the YAML definition, which looks something like this

```YAML
token:
  title: Harness Token
  type: string
  ui:widget: password
  ui:field: HarnessAuthToken
```

This field is hidden and is not an input field for the user who is executing a workflow. In the background, it fetches the user's login session and is later used to trigger the pipeline API using this as an API key. The `ui:widget: password` ensures that the JWT token is not shown on the UI to the user and is replaced with `*****`.

Couple things to note about this token:

1. It is a short lived user session token of the user as they login. It is not a long-lived API key. It is not shared with any other users. It is not the user's login password.
2. The user already has access to view this token under their browser's cookie page, at any time they want, since it is their own session token.

That being said, the best practice is still to hide such tokens to be displayed on the screen in case the screen is being recorded or someone else is able to see and copy it from their screen.

## What is the Issue

An issue occurs when we use the `token` field when defining an IDP Workflow that has more than 1 "pages". A page in a workflow is the array item under the `spec.parameters` field. Here is an example of multi-page workflow definition

```YAML
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: ...
  title: ...
spec:
  owner: ...
  type: ...
  parameters:
    - title: Page 1
      required:
        - ...
      properties:
        field1:
          title: ...
          type: string
          description: ...
    - title: Page 2
      required:
        - ...
      properties:
        field2:
          title: ...
          type: string
          description: ...
```

In this case, if the `token` field is defined anywhere outside of Page 1 (e.g. under Page 2's properties), the `ui:widget: password` property is not evaluated and the token is displayed to the user at the "Review" step of the workflow.

## 👉🏻 How to Solve the Issue (Action Required)

**Please move your `token` field in the IDP Workflow YAML definition to the first page instead of later pages. This will ensure that the user session token is not displayed on the Review screen to the user.**

## Context on why it happened

As part of the recent release we upgraded our Backstage version from `v1.22` to `v1.28`. We noticed a warning on this topic which said **sometimes the secrets are displayed on the UI**. We tested ourselves but couldn't reproduce the situation. But it looks like we missed the case when there are multiple pages and the `token` field is defined in the later pages

## Next steps for us

We have already updated our docs to add a warning about this on all our Workflow tutorials and examples. While we do have a workaround for now, we are treating this as an open bug and figuring out how to address this properly so that no action will be required from our users. However, as of this moment, we do recommend you move the `token` field to the first page in the Workflow definition YAML if you have multiplate pages.
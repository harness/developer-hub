# Email Step

## Introduction

- Harness allows users to send emails via their pipeline executions
- Harness has its on SMTP Server that it will use to send emails
- This step is only available in Continuous Delivery Stages and Custom Stages
- These emails allow for quick and easy notifications to users and their teams
- Users leverage this step to send Deployment updates during the Pipeline Execution. It gives the user the flexibility to customize their email notifications they get from Harness
- You can use this step as a step template and manage it's configuration via the Git Experience.


## YAML

```YAML
           steps:
              - step:
                  type: Email
                  name: Update Status
                  identifier: Update_Status
                  spec:
                    to: rohan.gupta@harness.io 
                    cc: srinivas@harness.io
                    subject: Deployment Status
                    body: "Pipeline: <+pipeline.name> is completeHarness Deployed service: <+service.name> into the environment name: <+env.name>"
                  timeout: 10m
```

## Key Fields

`to` - this is the email address that you want Harness pipeline to send an email to. This can be a comma string of users like so: `rohan@harness.io, srinivas@harness.io`
  - You can  pass in the emails as a runtime input - `<+input>`
  - You can pass the email as an expression - `<+pipeline.triggeredBy>` 

`cc` - you can add emails to the cc section to cc' them on the email that will be sent via this pipeline

`subject` - you can provide a subject to the email. This subject can be a fixed string: `Prod Deployment Notification` , a string with expressions: `<+env.name> Deployment Notification`, or passed in as a runtime input `<+input>`

`body` - The body is a string field that users can pass in text and expressions and Harness will resolve the body with the expression references before sending email.

## Optional Configurations

If user's want to send emails via their own SMTP Server to send emails. To configure your own SMTP Server please review the [SMTP Configuration Doc](https://developer.harness.io/docs/platform/notifications/add-smtp-configuration/)






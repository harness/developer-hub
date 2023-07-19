---
title: Propels JavaScript reference
description: You can write custom logic in JavaScript to use in Propels.
sidebar_position: 20
---

You can write custom logic in JavaScript to use in [Propels](./propels-overview.md). This page explains the Propels script structure and provides usage examples.

## Script structure

The basic script structure is as follows:

```javascript
someGlobalVar = "hello ";

function handleNode(context) {
  msg = context.getParam("msg");

  // levelops.serviceXYZ().doSomething() - Invoke an SEI service

  return {
    state: "success",
    output: {
      echo: someGlobalVar + msg
    }
  };
}
```

The script structure comprises the following components:

* `handleNode`: This function is the entry point to the script.
* `context`: An object with [methods](#context-methods) to look-up input variables.
* `return`: The value is an object containing output data according to the [output schema](#output-schema).
* `levelops`: An object used to invoke [SEI services](#sei-services).

### Context methods

* `context.getParam(name, [defaultValue=null])`
  * Use this method to access the node input parameters.
  * If not found, returns `null`.
  * Not typed.
* `context.getData(name, [defaultValue=null])`
  * Access intermediate node data.
  * Useful for long-running tasks where the node wakes up multiple times.
  * If not found, returns `null`.

### Output schema

The value of `return` is an object containing output data. The output schema is as follows:

```javascript
{
  state: "success" | "running" | "failure", // required
  output: { "k1" : "v" , "k2" : ["v1", "v2"], "k3" : {}} // optional, map of output variables
  data: {} // optional, node's internal data
}
```

## SEI services

Use the `levelops` object to invoke SEI services.

### CI/CD

Invoke CI/CD services with `levelops.cicd()`.

#### getStageIds

* Schema: `getStageIds(jobRunId) : String[]`
* Description: List stages of a given CI/CD job run, if any.
* Output: Returns an array of stage IDs. The array is empty if the job doesn't have stages.
* Usage example: `stageIds = levelops.cicd().listStageIds(jobRunId);`

#### getStageName

* Schema: `getStageName(stageId) : String`
* Description: Look up the name of a stage given its ID.
* Output: Returns the stage name, or `null` if it wasn't found.
* Usage example: `stageName = levelops.cicd().getStageName(stageId);`

<!-- Triage is deprecated
#### getTriageRuleResults

* Schema: `getTriageRuleResults(jobRunId, [ stageId ]) : TriageRuleMatch[]`
* Description: List eventual Triage rule matches for a given job run, and optionally, a given stage.
* Output: Returns an array of TriageRuleHit objects that are TriageRuleMatch class methods, as follows:
  * `TriageRuleMatch.getRuleName() : String`
  * `TriageRuleMatch.getCount() : int`
  * `TriageRuleMatch.getMatchContent() : String`
* Usage examples:

   ```javascript
   levelops.cicd().getTriageRuleResults(jobRunId);
   levelops.cicd().getTriageRuleResults(jobRunId, jobStageId);
   ```
-->

#### hierarchicalConfigTableLookUp

* Schema: `hierarchicalConfigTableLookUp(jobRunId, stageId, tableName, jobColumnName, stageColumnName) : Object`
* Description: Look up a config table row.
* Parameters: `stageId` and `stageColumnName` can be `null`.
* Output: Returns a JSON object representing a table row (a map of column keys to values).
* Usage examples:

   ```javascript
   levelops.cicd().hierarchicalConfigTableLookUp(jobRunId, stageId, "My Config Table", "Job", "Stage");
   levelops.cicd().hierarchicalConfigTableLookUp(jobRunId, null, "My Config Table", "Job", "Stage");
   levelops.cicd().hierarchicalConfigTableLookUp(jobRunId, null, "My Config Table", "Job", null);
   ```

### Emails

Invoke email services with `levelops.emails()`.

#### send (one recipient)

* Schema: `send(subject, text, email)`
* Description: Send an email with a given subject, body (`text`), and recipient email address.
* Usage example: `levelops.emails().send("subject", "text", "email@levelops.io");`

#### send (multiple recipients)

* Schema: `send(subject, text, emails[])`
* Description: Send emails with the given subject and body (`text`) to multiple recipients.
* Parameters: Specify recipients as an array of double-quoted, comma-separated email addresses.
* Usage example: `levelops.emails().send("subject", "text", ["email1@...", "email2@..."]);`

### Slack

Invoke Slack services with `levelops.slack()`.

#### sendNotification (one recipient)

* Schema: `sendNotification(text, recipient)`
* Description: Send a notification with the supplied text to the specified recipient.
* Usage example: `levelops.slack().sendNotification("Hello World", "user@levelops.io");`

#### sendNotification (multiple recipients, send to channels, author by bot)

* Schema: `sendNotification(text, recipients[], botName)`
* Description: Send a notification with the supplied text to multiple recipients and channels. You can use a bot as the sender.
* Parameters: Specify recipients and channels as an array of double-quoted, comma-separated email addresses and channel names. Supply the bot name after and outside the recipients array.
* Usage examples:

   ```javascript
   levelops.slack().sendNotification("Hello World", ["user1@levelops.io", "channel"]);
   levelops.slack().sendNotification("Hello World", ["user1@levelops.io"], "AcmeBot");
   ```

### Tables

Invoke SEI tables services with `levelops.tables()`.

#### query

* Schema: `query(tableName, [ filters, [ filteringMode ] ]) : Object[]`
* Description: Use the supplied filters to search the specified table.
* Parameters: `filteringMode` can be `exact_match(default)`, `contains`, or `starts_with`.
* Output: Returns an array of JSON objects representing table rows (a map of column keys to values).
* Usage examples:

   ```javascript
   levelops.tables().query("TableName", { "ColumnName": "search string" }, "contains");
   levelops.tables().query("Users", { "Last Name": "Avery" }, "contains");
   ```

#### distinct

* Schema: `distinct(tableName, columnName, [ filters, [ filteringMode, [ splitCommaLists ] ] ]]) : String[]`
* Description: Pull values from the specified column in the specified table. Filters are optional; exclude filters to return all values in the column.
* Output: Returns an array of distinct values from the column provided. If filters were specified, the values are limited to rows matching the filters.
* Usage examples:

   ```javascript
   levelops.tables().distinct("Table Name", "Column Name");
   levelops.tables().distinct("Users", "Last Name");
   ```

#### getColumnNameToKeyMappings

* Schema: `getColumnNameToKeyMappings(tableName) : Object`
* Description: For the specified table, get a mapping of column names and keys.
* Output: Returns a map of column display names to column keys.
* Usage example: `levelops.tables().getColumnNameToKeyMappings(Users);`

#### updateColumn

* Schema: `updateColumn(tableName, columnName, rowId, value)`
* Description: Replace a value in the specified cell (`columnName` and `rowId`) of the specified table.
* Usage examples:

```javascript
levelops.tables().updateColumn("Table", "Column 1", row["id"], "new value");
levelops.tables().updateColumn("Users", "Last Name", row["7"], "Quinn");
```

### Tickets

Invoke SEI tickets services with `levelops.tickets()`.

#### create

* Schema: `create(title, [ reason ], userEmails[]) : String`
* Description: Create an SEI ticket.
* Output: Returns the ID of the created ticket.
* Usage examples:

   ```javascript
   ticketId = levelops.tickets().create("Ticket Title", ["user@levelops.io"]);
   ticketId = levelops.tickets().create("Ticket Title", "Reason", []);
   ```

<!-- triage is deprecated
#### createFailureTriageTicket

* Schema: `createFailureTriageTicket(title, [ reason ], userEmails[], cicdMappings[]) : String`
* Description: Create an SEI ticket for the purpose of triaging failures of CI/CD jobs.
* Parameters: `cicdMappings` is an array of objects containing a job's run ID and an optional stage ID, for example:
  * `{ "run_id" : jobRunId }`
  * `{ "run_id" : jobRunId, "stage_id" : stageId }`
* Output: Returns the ID of the created ticket.
* Usage example:

   ```javascript
   ticketId = levelops
     .tickets()
     .createFailureTriageTicket("Title", ["user@levelops.io"], [{ run_id: jobRunId, stage_id: stageId }]);
   ```

#### sendSlackNotification

* Schema: `sendSlackNotification(ticketId, recipients[])`
* Description: Send an interactive Slack message associated with a failure-triage ticket.
* Usage example: `levelops.tickets().sendSlackNotification(ticketId, ["user@levelops.io"]);`
-->

### Assessments

Invoke assessments services with `levelops.assessments()`.

#### send

* Schema: `send(ticketId, assessmentTemplateName, [senderEmail]) : String`
* Description: Send an assessment to a ticket's assignees.
* Output: Returns the ID of the assessment that was sent.
* Usage example: `assessmentId = levelops.assessments().send(ticketId, "Assessment Template Name", "sender@levelops.io");`

<!-- automation rules deprecated
### Automation rules
-->

---
title: Unable to retrigger a an existing pipeline from Spinnaker UI
---

## Issue
Users may run into a situation where they may be unable to re-trigger a pipeline through the Spinnaker UI. It is noticed that the UI is not responsive when such pipelines are triggered.
 

## Cause
An application in Armory Enterprise Spinnaker is created through one of the following methods
* Using Spinnaker UI where they create the application using the Deck web console.* Invoke the Front50 API directly.* Use Armory's Pipeline As Code feature (Dinghy).
The ***Application names are generally expected to be with lowercase***. Even if they are to be created with uppercase through the UI, the Deck and the Gate Spinnaker services convert them to lowercase before they are persisted by Front50.
However if the applications with their names in uppercase are created using Front50 API or Dinghy, they get persisted as they are without any validations or conversions. When pipelines belonging to such applications are triggered through the Spinnaker UI, it ***fails to find the application*** as the original application created is with uppercase.


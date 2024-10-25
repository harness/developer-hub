---
title: SwaggerUI commands returns 4xx errors
---

## Issue
Users may be able to authenticate and reach the Spinnaker SwaggerUI on gate, but are unable to execute most commands.  Commands return a 403/404/405 error and are unable to be successful

## Cause
The access to Swagger may have been authenticated, but the command executed was not executed as a secure command, and is not passing the session through.


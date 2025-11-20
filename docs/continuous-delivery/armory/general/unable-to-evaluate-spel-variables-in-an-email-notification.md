---
title: Unable to evaluate SpEL variables in an email notification
---

## Issue
When configuring an email notification to be sent from a pipeline's stage, users can be referring to a variable from the execution context in the textbox for the email's body.
The received email does not evaluate the variable, and instead displays the literal string of the SpEL expression.

## Cause
The textbox in the email notification window does **not** evaluate variables by design.


---
title: Igor pod not running or starting up when configuring pipeline triggers (500 Internal Server Error)
---

## Issue
After configuring new repositories as part of a pipeline trigger strategy, users are noticing error messages such as ```500 - Internal Server Error``` in the UI, with the ```Igor pod``` not running.

## Cause
Igor's start-up is dependent on having either ```CI integration```, or ```Docker Registry``` enabled.


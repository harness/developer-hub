---
title: Infinite UI Loop "Save Changes" stuck attempting to Save a JSON Canary Config in the Spinnaker UI
---

## Issue
When trying to save a Canary Config JSON via the Spinnaker UI, the ```Save Changes``` button gets stuck in a loop after it is clicked.


## Cause
The error occurs because the UI interface expects the ```isNew: true``` setting in the JSON file, Spinnaker cannot find it.


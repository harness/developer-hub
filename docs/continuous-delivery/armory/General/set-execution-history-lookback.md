---
title: Set Execution History Lookback
---


If you have a pipeline that hasn’t run in a long time, you might only ever see one pipeline execution in its history – and as soon as you run the pipeline again, it disappears, leaving only the latest.
This is because Spinnaker, by default, limits lookback to only the last 14 days of activity; if no execution history is found in that time, it only returns the last known execution, regardless how many you ask it to display.
This can’t currently be turned off, but you can adjust it with configuration.
You’ll need to edit (or create) your ```orca-local.yml``` file, and then add this bit, adjusting the number of days to look back as you’d like:
tasks:
  daysOfExecutionHistory: 365
Hopefully you’re deploying more than once a year! At least this will let you look back over the past year for previous deployments, and not just the last two weeks.


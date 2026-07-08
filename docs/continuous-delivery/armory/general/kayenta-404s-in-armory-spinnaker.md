---
title: Kayenta 404s in Armory Spinnaker
---


If you’ve enabled Kayenta in Armory Spinnaker 2.0, and are running into any of these issues:
* Canary configs not saving properly* Infrastructure/Clusters page details pane not loading* 404s in the browser console attempting to hit ```/v2/canaryConfig```
Then make the following change:
Create/update the ```.hal//profiles/gate-local.yml``` file, with these contents:
```
services:
  kayenta:
    canaryConfigStore: true
```
Then, apply your change with ```hal deploy apply```.


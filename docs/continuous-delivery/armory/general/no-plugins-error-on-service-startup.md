---
title: No plugins error on service startup
---

## Issue
When starting a service with plugins, the following error appears:
```
org.pf4j.util.FileUtils         : Expanded plugin zip 'armory-observability-plugin-v1.2.0.zip' in 'armory-observability-plugin-v1.2.0'
org.pf4j.AbstractPluginManager      : No plugins
```

## Cause
Service starts with a different User ID vs Spinnaker User ID and is unable to run certain commands (eg. unzipping the plugin folder).


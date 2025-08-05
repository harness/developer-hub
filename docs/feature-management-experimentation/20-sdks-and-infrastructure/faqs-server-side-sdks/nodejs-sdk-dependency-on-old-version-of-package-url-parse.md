---
title: "Node.js SDK: Dependency on old version of package url-parse"
sidebar_label: "Node.js SDK: Dependency on old version of package url-parse"
sidebar_position: 1
---

## Question

Node.js SDK has a dependency on an old version of package url-parse (\<1.5.9), which is flagged as vulnerable in security scans.

This package is in a dependency chain of eventsource package, this is the chain:
@splitsoftware/splitio > eventsource > original > url-parse

## Answer

To upgrade the url-parse package, simply run the command below for npm environment:
```
npm audit fix
```

For yarn environment:
```
npm_config_yes=true npx yarn-audit-fix
```

Or add a resolutions field in your app's package.jsonm as follows:

```json
"resolutions": { 
  "url-parse": "1.5.10"
}
```

Then run:
```
yarn upgrade
```
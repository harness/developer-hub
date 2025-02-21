---
title: "Dependency on old version of package url-parse"
sidebar_label: "Dependency on old version of package url-parse"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/6469746406157-NodeJS-SDK-Dependency-on-old-version-of-package-url-parse </button>
</p>

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
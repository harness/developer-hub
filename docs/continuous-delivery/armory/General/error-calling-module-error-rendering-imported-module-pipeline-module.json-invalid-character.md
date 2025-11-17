---
title: Error calling module- error rendering imported module 'pipeline/....module.json'- invalid character
---

## Issue
The Dinghy webhook can return the following syntax on Pull requests:
(template: dinghy-render:29:7: executing “dinghy-render” at >module “pipeline/…module.json”>: error calling module: error rendering imported module ‘pipeline/…module.json’:invalid character after object key:value pair)

 
The logs will show the following:

```
time="2021-09-01T17:36:13Z" level=info msg="Found no custom configuration for repo: test-container, proceeding with master"...
time="2021-09-01T17:36:13Z" level=info msg="Skipping Spinnaker pipeline update because this branch (testing-error) is not master. Proceeding as validation."
time="2021-09-01T17:36:13Z" level=info msg="Processing request for branch: testing-error"
time="2021-09-01T17:36:13Z" level=info msg="Processing Push"
time="2021-09-01T17:36:13Z" level=info msg="Processing Push"
time="2021-09-01T17:36:13Z" level=info msg="Dinghyfile found in commit for repo test-container"
time="2021-09-01T17:36:14Z" level=error msg="Failed to parse module:..
time="2021-09-01T17:36:14Z" level=error msg="error rendering imported module...
time="2021-09-01T17:36:14Z" level=error msg="Failed to execute buffer:\n {\n  \"application\": \"test-container\",\n  \"spec\": {\n    \"notifications\...
time="2021-09-01T17:36:14Z" level=error msg="Failed to parse dinghyfile dinghyfile: template: dinghy-render:.....executing \"dinghy-render\" at : error calling module: error rendering imported module 'pipeline/.......module.json': invalid character 'a' after object key:value pair"
However Dinghyfile and module syntax is validated with the [ARM-CLI tool](https://docs.armory.io/docs/spinnaker-user-guides/dinghy-arm-cli/) to be valid.  For example:
>arm dinghy render dinghyfile –modules ../dinghy-templates >> /dev/null
INFO [2021-09-02 08:40:17] [Checking dinghyfile]
INFO [2021-09-02 08:40:17] [Parsing dinghyfile]
INFO [2021-09-02 08:40:17] [Parsed dinghyfile]
INFO [2021-09-02 08:40:17] [Parsing final dinghyfile to struct for validation]
INFO [2021-09-02 08:40:17] [Output:
]
INFO [2021-09-02 08:40:17] [Final dinghyfile is a valid JSON Object.]
```

## Cause
This error is as a result of the ```strict validator``` that has been introduced in v.2.26.2+:
[https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-26-2/#strict-json-validation](https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-26-2/#strict-json-validation)
 



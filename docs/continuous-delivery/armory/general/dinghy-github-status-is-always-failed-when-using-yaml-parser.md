---
title: Dinghy github status is always failed when using YAML parser
---

## Issue
When utilizing YAML parser for Dinghyfile, any pull request on a feature branch in Github gets a status update by Dinghy which is always failed with message:
```UpdateDinghyfile malformed syntax: [Error in line 1, char 0: invalid character 'a' looking for beginning of value\napplication: core-accounts-spinnakeryamltest-sys # no spaces here, must be alphanumeric]```

## Cause
This happens because Dinghy code first tries to parse Dinghyfile using JSON parser which fails and then does parsing with YAML parser. This successfully renders the pipeline but gives a false failure on Github pull request status.


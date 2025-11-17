---
title: Terraformer Error exec- "terraform"- executable file not found in $PATH
---

## Issue
When running Terraformer stage, the following error appears
```exec: “terraform”: executable file not found in $PATH```

## Cause
A version of terraform was not selected in the stage, or was left as ```SYSTEM_DEFINED```


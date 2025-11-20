---
title: Unable to Deploy After Moving AWS Account into Profiles
---

## Issue
When trying to deploy after making changes to your AWS Account definitions in Halyard, Spinnaker users may run into this error:
```Exception ( Create Server Group ) credentials not found (name: default, names: [aws_account_name])```

## Cause
If the AWS accounts from Halyard are moved into *Profiles* or changed from using Halyard Config to using Spring Profiles for account configuration, there is a property that also has to be set in the Orca profile (```orca-profile.yml```).
The Orca default Bake profile entry will also need to be added.


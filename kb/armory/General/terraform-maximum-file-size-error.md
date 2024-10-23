---
title: Terraform Maximum File Size Error
---

## Issue
If an organization uses Terraform to a very large degree, it's possible to run into a bug where Terraform can actually reach a limit per file where it will no longer read instructions  The error can be a red herring for an invalid character issue. Due to caching, it’s actually quite likely that trying to run this TF file locally may actually work, but when trying to run it on any cloud services or pulling it as an artifact from Git will fail. Users may have tried to run ```od``` on the file to inspect it for strange characters at which point users will see errors on a specific line at the end of the file that doesn’t seem to go away even if manually changed.

## Cause
Terraform has limits on sizes of files of **32KB or larger** will not be read correctly. This error is very new and it is unsure if it's a built in limitation that can be 'fixed' or if it's a hardcoded problem that will need better workarounds. More investigation is underway.


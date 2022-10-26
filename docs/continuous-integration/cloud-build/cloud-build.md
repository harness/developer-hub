---
sidebar_position: 1
---

# Harness CI cloud builds

Harness CI has recently introduced cloud builds with infrastructure hosted by harness.

* Every build runs on an isolated environment i.e. VM.
* Powerful build machines with 16GB ram and 4 vpcu enabling blazing fast builds

Points to note:
* Every connector used in ci cloud build pipeline needs to use "Connect through Harness platform"
* Custom secret manager is not supported
* There is a default timeout of 1 hour for a CI stage execution
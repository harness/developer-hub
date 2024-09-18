---
title: container
sidebar_position: 5
---

# Container

Container configures step execution inside a container.

## Properties

* __image__ - _string_<br/>
  The container image

* __credentials__ - _Credentials_<br/>
  The registry authentication credentials

* __pull__ - _string_<br/>
  The container pull options

  __enum values:__
  * `sh`
  * `bash`
  * `powershell`
  * `pwsh`

* __entrypoint__ - _string_<br/>
  Override the container entrypoint

* __args__ - _[]string_<br/>
  The container args

* __dns__ - _string, []string_<br/>
  The custom dns servers

* __dns_search__ - _string, []string_<br/>
  The custom dns search domains

* __extra_hosts__ - _string, []string_<br/>
  The hostname mappings.

* __network__ - _string_<br/>
  The container is attached to the named docker network.

* __network_mode__ - _string_<br/>
  The container network mode. `bridge`, `host`, `none`

* __privileged__ - _boolean_<br/>
  The container is run with escalated privileges.

* __user__ - _string_<br/>
  Override the container user.

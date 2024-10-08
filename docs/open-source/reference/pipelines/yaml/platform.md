---
title: platform
sidebar_position: 5
---

# Platform

Platform defines the target execution environment.

## Properties
<!-- properties / start -->
* __arch__ - _string_<br/>
  Arch defines the target cpu architecture.

  __enum values:__
  * `amd64`
  * `arm`
  * `arm64`
  * `386`
  * `ppc`
  * `ppc64`
  * `ppc64le`
  * `riscv`
  * `riscv64`
  * `s390`
  * `s390x`
  * `sparc`
  * `sparc64`

* __features__ - _string_<br/>
  Features defines the target platform features.

* __os__ - _string_<br/>
  OS defines the target operating system.

  __enum values:__
  * `linux`
  * `windows`
  * `macos`
  * `darwin`
  * `dragonfly`
  * `freebsd`
  * `netbsd`
  * `openbsd`
  * `plan9`
  * `solaris`

* __variant__ - _string_<br/>
  Variant defines the target cpu architecture variant.

* __version__ - _string_<br/>
  Version defines the target operating system version.

<!-- properties / end -->

## Examples

<!-- examples / start -->
```yaml {} showLineNumbers
platform:
  os: linux
```

```yaml {} showLineNumbers
platform:
  os: linux
  arch: amd64
```

<!-- examples / end -->


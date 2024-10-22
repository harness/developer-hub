---
title: volume.type.temp
#description: Harness yaml reference - 
sidebar_position: 50
---

# Temp Volume

A temporary volume mounts a temporary directory into your container.

## Properties
<!-- properties / start -->
* __medium__ - _string_<br/>
  Medium controls where the temporary volume is stored.

  __enum values:__
  * `memory`

* __limit__ - _string, int_<br/>
  Limit provides a size limit for the volume.

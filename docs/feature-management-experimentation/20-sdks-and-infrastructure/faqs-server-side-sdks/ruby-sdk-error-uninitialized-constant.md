---
title: "Ruby SDK Error: uninitialized constant error caused by 'Process::RLIMIT_NOFILE' in lib/net/http/persistent.rb"
sidebar_label: "Ruby SDK Error: uninitialized constant error. caused by 'Process::RLIMIT_NOFILE' in lib/net/http/persistent.rb"
sidebar_position: 14
---

## Problem
When using Ruby SDK in Windows Platform, initializing the SDK factory object causes the error:
```
uninitialized constant error. caused by 'Process::RLIMIT_NOFILE' in lib/net/http/persistent.rb
```

## Root Cause

This issue is related to net-http-persistent 3.0 library in Windows OS. This is a dependent library that the SDK uses. The library gets installed as a dependency when installing the SDK gem.

## Solution

The Ruby SDK works fine with a slightly lower version of net-http-persistent (2.9.4), use the commands below to downgrade it:
```
gem uninstall net-http-persistent
gem install net-http-persistent -v '2.9.4'
```
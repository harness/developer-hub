---
title: "Uninitialized constant error caused by 'Process::RLIMIT_NOFILE' in lib/net/http/persistent.rb"
sidebar_label: "Uninitialized constant error caused by 'Process::RLIMIT_NOFILE' in lib/net/http/persistent.rb"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360023097211-Ruby-SDK-Error-uninitialized-constant-error-caused-by-Process-RLIMIT-NOFILE-in-lib-net-http-persistent-rb </button>
</p>

## Problem
When using Split Ruby SDK in Windows Platform, initializing the Split factory object causes the error:
```
uninitialized constant error. caused by 'Process::RLIMIT_NOFILE' in lib/net/http/persistent.rb
```

## Root Cause

This issue is related to net-http-persistent 3.0 library in Windows OS. This is a dependent library that the SDK uses. The library gets installed as a dependency when installing the SDK gem.

## Solution

The Split SDK works fine with a slightly lower version of net-http-persistent (2.9.4), use the commands below to downgrade it:
```
gem uninstall net-http-persistent
gem install net-http-persistent -v '2.9.4'
```
---
title: credentials
sidebar_position: 5
---

# Credentials

Configures registry credentials.

## Properties
<!-- properties / start -->
* __username__ - _string_<br/>
  Username defines registry username.

* __password__ - _string_<br/>
  Username defines registry password.

<!-- properties / end -->

## Examples

<!-- examples / start -->
```yaml {} showLineNumbers
credentials:
  username: ${{ secrets.get("username") }}
  password: ${{ secrets.get("password") }}
```



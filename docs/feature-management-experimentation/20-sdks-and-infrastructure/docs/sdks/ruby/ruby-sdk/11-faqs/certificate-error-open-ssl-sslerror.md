---
title: "Certificate error: 'OpenSSL::SSL::SSLError'"
sidebar_label: "Certificate error: 'OpenSSL::SSL::SSLError'"
helpdocs_is_private: false
helpdocs_is_published: true
---
#### Question

### I am seeing the following certificate error: `OpenSSL::SSL::SSLError`

```ruby title="Error message"
OpenSSL::SSL::SSLError: SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed
```

#### Solution

On OSX, if you see an SSL issue that looks similar to the example below, refer to [this post](https://toadle.me/2015/04/16/fixing-failing-ssl-verification-with-rvm.html) for troubleshooting.
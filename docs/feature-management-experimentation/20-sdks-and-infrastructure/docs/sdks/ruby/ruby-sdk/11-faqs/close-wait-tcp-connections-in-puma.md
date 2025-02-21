---
title: "Why do CLOSE_WAIT TCP connections in Puma not go down as expected?"
sidebar_label: "Why do CLOSE_WAIT TCP connections in Puma not go down as expected?"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360007501871-Ruby-Why-do-CLOSE-WAIT-TCP-connections-in-Puma-not-go-down-as-expected </button>
</p>


## Issue

Using Ruby SDK in Puma or Unicorn cluster mode, with multiple workers of one thread each, as the SDK is sending treatment events, CLOSE_WAIT TCP connections usually increase. This can be detected using the command:
```
lsof -l | grep CLOSE_WAIT | wc -l
```

However, when no SDK treatment calls are placed, the CLOSE_WAIT TCP connections count does not go down as expected.

## Root cause

This might be caused by SDK threads not terminating properly, which will keep the client connection waiting for the server to send the final ACK signal.

## Solution

Puma will spawn new process for every group of incoming requests. To terminate all running threads before Puma closes the process, add the following code in config/puma.rb:
```
before_fork do
$split_factory.instance_variable_get(:@config).threads.each { |_, t| t.exit }
end
```
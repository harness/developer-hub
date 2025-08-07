---
title: "Ruby SDK: Why do CLOSE_WAIT TCP connections in Puma not go down as expected?"
sidebar_label: "Ruby SDK: Why do CLOSE_WAIT TCP connections in Puma not go down as expected?"
sidebar_position: 17
---

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
---
title: Proxy
description: Cloud Cost Management - AutoStopping using a Proxy VM
---

# Troubleshooting

When troubleshooting issues with the Auto Stopping proxy the following are simple steps you can take to narrow down what could be causing issues.

## Check proxy security groups

The proxy will need security group (network firewall) access to receive traffic on the random ports assigned to different services being proxied by the machine.

- Usually you will want to allow traffic from any source to the destination port on the proxy (eg. `56102`)
- AWS/Azure: Check the security groups on the proxy instance and validate the source and destination rules match our access pattern
- GCP: Check the network tags on the instance and the corresponding firewall rules to make sure the access pattern is allowed

## Validate traffic can reach the proxy

To check that traffic is reaching the proxy you can SSH into the proxy VM and check the proxy logs. When the user hits the proxy you should see logs confirming the traffic.

To see these logs run the following command: `journalctl -fu lw_tcp_proxy`
This will tail the live logs in your terminal. If you want to just see a one-time dump of the current logs you can omit the `-f` flag.

## Check application security groups

You should validate that the firewall rules allow the proxy to reach the app server at the destination port.

- Usually you will want to allow traffic from the proxy (or any source) to the destination port on the application server (eg. `80`)
- AWS/Azure: Check the security groups on the app instance and validate the source and destination rules match our access pattern
- GCP: Check the network tags on the instance and the corresponding firewall rules to make sure the access pattern is allowed

## Validate the proxy can reach the app server

To check that the proxy can reach the app server you can SSH into the proxy VM and check access on the application port.

Once you have a terminal session on the proxy VM:
- Install the necessary tools: `sudo apt install net-tools`
- To validate the app port is open: `nc -z -v <ip of app server> <dstination port>` 
- If you see no output, that means we cannot access the destination port, and you need to check the security groups on the application server
- If you see output about a connection, this validates the proxy can reach the application

## Validate that the internal services of the proxy are running
        
You can check that the proxy is running it's internal services by SSHing into it and check the system status.

- There is an internal service on the proxy running on port 8094 and 8093
    - If you go to `http://<ip of proxy>:8093` you should see text that includes your account id, this is one hint that the internal workings of the proxy are running as expected
        - You will need to make sure port 8093 is open in the security group the proxy is using
- You can check the status and logs of the proxy services with the following commands:
    - `systemctl status lw_tcp_proxy`
    - `systemctl status lw_proxy`

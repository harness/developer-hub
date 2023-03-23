---
id: linux-dns-spoof
title: Linux DNS Spoof
---
Linux Dns Spoof injects chaos to mimic DNS resolution in linux machine.

## Use cases
- Induces DNS spoof on the target Linux machines.
- It resolves DNS target host names (or domains) to other IPs provided as user input.

:::note
- This fault has been tested for compatibility in Ubuntu 16 or higher, Debian 10 or higher, CentOS 7 or higher, RHEL 7 or higher, and openSUSE LEAP 15.4 or higher.
- The `linux-chaos-infrastructure` systemd service should be in an active state and the infrastructure should be in a `CONNECTED` state.
:::

## Fault tunables
<h3>Mandatory fields</h3>
<table>
  <tr>
    <th> Variables </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> spoofMap </td>
    <td> Map of the target hostnames. </td>
    <td> For example, '&#123;"abc.com":"spoofabc.com"&#125;' where key is the hostname that needs to be spoofed and value is the hostname where it will be spoofed. </td>
  </tr>
</table>
<h3>Optional fields</h3>
<table>
  <tr>
    <th> Variables </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> upstreamServer </td>
    <td> Upstream server for the custom DNS interceptor server. </td>
    <td> To be provided if there is no upstream server present with the local DNS resolver. </td>
  </tr>
  <tr>
    <td> dnsPort </td>
    <td> UDP port for the DNS interceptor server. </td>
    <td> Defaults to <code>53</code>. </td>
  </tr>
  <tr>
    <td> duration </td>
    <td> Duration through which chaos is injected into the target resource (in seconds). </td>
    <td> Defaults to 30. </td>
  </tr>
  <tr>
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos (in seconds). </td>
    <td> Defaults to 0. </td>
  </tr>
</table>


### SpoofMap

It defines the map of the target host names. For example, '{"abc.com":"spoofabc.com"}' where the key is the host name that needs to be spoofed and the value is the host name to which the key is spoofed (or redirected). Tune it by using the `spoofMap` input.

Use the following example to tune the spoof map:

[embedmd]:# (./static/manifests/linux-dns-spoof/spoofMap.yaml yaml)
```yaml
# target host names for spoofing
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-dns-spoof
  labels:
    name: dns-spoof
spec:
  dnsChaos/inputs:
    spoofMap: '{"abc.com":"spoofabc.com"}'
```

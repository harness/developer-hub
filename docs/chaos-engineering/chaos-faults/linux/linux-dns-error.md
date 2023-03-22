---
id: linux-dns-error
title: Linux DNS Error
---
Linux Dns Error injects chaos to disrupt dns resolution in linux machine

## Use cases
- Induces DNS error on the target Linux machines.
- Simulates loss of access to host by blocking DNS resolution of hostnames

:::note
- This fault has been tested for compatibility in Ubuntu 16 or higher, Debian 10 or higher, CentOS 7 or higher, RHEL 7 or higher, and openSUSE LEAP 15.4 or higher.
- The `linux-chaos-infrastructure` systemd service should be in an active state and the infrastructure should be in a `CONNECTED` state.
:::

## Fault tunables
  <h3>Mandatory fields</h3>
    <h3>Optional fields</h3>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
       <tr>
        <td> hostNames </td>
        <td> List of the target hostnames or keywords eg. '["google.com","litmuschaos.io"]' </td>
        <td> If not provided, all hostnames will be targeted </td>
      </tr>
      <tr>
        <td> matchScheme </td>
        <td> Determines whether the dns query has to match exactly with one of the targets or it can have any of the targets as substring. It should be either <code>exact</code> or <code>substring</code> </td>
        <td> if not provided, it will be set as <code> exact </code> </td>
      </tr>
      <tr>
      <td> upstreamServer </td>
      <td> URL of the DNS upstream server </td>
      <td>  </td>
      </tr>
      <tr>
      <td> dnsPort </td>
      <td> Port of the DNS Server </td>
      <td>  </td>
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


### HostNames

It specifies the comma-separated name of the target hosts subjected to chaos. Tune it by using the `hostNames` input.

Use the following example to tune the host names:

[embedmd]:# (./static/manifests/linux-dns-error/hostnames.yaml yaml)
```yaml
# target host names
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-dns-error
  labels:
    name: dns-error
spec:
  dnsChaos/inputs:
    hostNames: '["litmuschaos.io","google.com"]'
```

### Match Scheme

It specifies whether the DNS query has to match exactly with one of the targets or can have any of the targets as a substring. Tune it by using the `matchScheme` input.

Use the following example to tune match scheme:

[embedmd]:# (./static/manifests/linux-dns-error/matchscheme.yaml yaml)
```yaml
# dns query match scheme
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-dns-error
  labels:
    name: dns-error
spec:
  stressChaos/inputs:
    matchScheme: 'exact'
```

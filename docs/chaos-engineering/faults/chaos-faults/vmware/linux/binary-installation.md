---
title: Prerequisites- Installing Binaries
sidebar_position: 1
---

This topic describes the binaries to be installed before executing the Linux OS based VMware faults.

<table>
    <thead>
        <tr>
            <th>Fault</th>
            <th>Binaries Required</th>
            <th>Steps to Install the Binary (if any)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-loss">VMware Network Loss</a></td>
            <td>
                <ul>
                    <li>Install <code>iproute2</code> for Ubuntu VM.</li>
                    <li>Requires <code>tc</code> command for CentOS/RHEL VMs.</li>
                </ul>
            </td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-latency">VMware Network Latency</a></td>
            <td>
                <ul>
                    <li>Install <code>iproute2</code> for Ubuntu VM.</li>
                    <li>Requires <code>tc</code> command for CentOS/RHEL VMs.</li>
                </ul>
            </td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-cpu-hog">VMware CPU Hog</a></td>
            <td>
                <ul>
                    <li>Install <code>stress-ng</code> command in the VM.</li>
                    <li>Ability to run the <code>pkill</code> command in case of abort.</li>
                </ul>
            </td>
            <td>
                <ol>
                    <li>Download the binary: <code>curl -LO https://app.harness.io/public/shared/tools/chaos/linux/stress-ng-amd64-v0.14.02</code></li>
                    <li>Rename the binary: <code>mv stress-ng-amd64-v0.14.02 stress-ng</code></li>
                    <li>Make it executable: <code>chmod +x stress-ng</code></li>
                    <li>Move to system path: <code>sudo mv stress-ng /usr/local/bin/</code></li>
                </ol>
            </td>
        </tr>
        <tr>
            <td><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-memory-hog">VMware Memory Hog</a></td>
            <td>
                <ul>
                    <li>Install <code>stress-ng</code> command in the VM.</li>
                    <li>Ability to run the <code>pkill</code> command in case of abort.</li>
                </ul>
            </td>
            <td>See VMware CPU Hog installation steps.</td>
        </tr>
        <tr>
            <td><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-io-stress">VMware IO Stress</a></td>
            <td>
                <ul>
                    <li>Install <code>stress-ng</code> command in the VM.</li>
                    <li>Ability to run the <code>pkill</code> command in case of abort.</li>
                </ul>
            </td>
            <td>See VMware CPU Hog installation steps.</td>
        </tr>
        <tr>
            <td><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-dns-chaos">VMware DNS Chaos</a></td>
            <td>
                <ul>
                    <li>Install <code>dns_interceptor</code> binary in the target VM.</li>
                    <li>Permissions to operate on <code>iptables</code>.</li>
                </ul>
            </td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><ol><li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-http-latency">VMware HTTP Latency</a></li>
            <li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-http-modify-response"> VMware HTTP Modify Response</a></li>
            <li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-http-reset-peer"> VMware HTTP Reset Peer</a></li></ol></td>
            <td>
                <ul>
                    <li>Install <code>toxiproxy-server</code> binary in the target VM.</li>
                    <li>Install <code>toxiproxy-cli</code> binary in the target VM.</li>
                    <li>Install <code>iproute2</code> in the target VM.</li>
                    <li> Permissions to operate on <code>iptables</code>.</li>
                </ul>
            </td>
            <td>
                <ol>
                    <li>Download the binary: <code>curl -LO https://litmus-http-proxy.s3.amazonaws.com/server/toxiproxy-server-linux-amd64.tar.gz</code></li>
                    <li>Extract the archive: <code>tar -zxvf toxiproxy-server-linux-amd64.tar.gz</code></li>
                    <li>Make it executable: <code>chmod +x toxiproxy-server</code></li>
                    <li>Move to system path: <code>sudo mv toxiproxy-server /usr/local/bin/</code></li>
                    <li>Download the binary: <code>curl -LO https://litmus-http-proxy.s3.amazonaws.com/cli/toxiproxy-cli-linux-amd64.tar.gz</code></li>
<li>Extract the archive: <code>tar -zxvf toxiproxy-cli-linux-amd64.tar.gz</code></li>
<li>Make it executable: <code>chmod +x toxiproxy-cli</code></li>
<li>Move to system path: <code>sudo mv toxiproxy-cli /usr/local/bin/ </code></li>

                </ol>
            </td>
        </tr>
    </tbody>
</table>






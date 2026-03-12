---
title: VPN for Harness Cloud
description: Establish VPN connectivity from Harness Cloud builds to your private network using OpenVPN or WireGuard.
sidebar_position: 2
---

Harness Cloud VMs can establish VPN tunnels to securely access private resources during pipeline execution. Two VPN solutions are supported: **OpenVPN** and **WireGuard**.

Both solutions work by running a VPN client on the ephemeral Harness Cloud VM, which creates an encrypted tunnel through the internet to a VPN server on your private network.

## OpenVPN

### Architecture

<DocImage path={require('/docs/platform/references/static/vpn-openvpn-architecture.svg')} />

The OpenVPN client runs on the Harness Cloud VM, establishes a TLS-encrypted tunnel over UDP (port 1194) to your OpenVPN server, and creates a `tun0` virtual interface. Traffic destined for your private network is routed through this tunnel.

**Connection flow:**
1. TLS handshake and certificate exchange
2. Server validates client certificate
3. Session keys established via Diffie-Hellman
4. `tun0` interface created (client gets IP like `10.8.0.2`)
5. Routes pushed from server to client
6. Encrypted data transfer begins

### Prerequisites

- An OpenVPN server accessible from the internet with a public IP or domain
- A client configuration file (`.ovpn`) with embedded certificates
- The `.ovpn` config stored as a **base64-encoded [Harness file secret](/docs/platform/secrets/add-file-secrets)**

### Setup VPN client in pipeline

Store your `.ovpn` configuration file as a base64-encoded Harness secret:

```bash
base64 -w 0 config.ovpn  # Copy the output and save as a Harness secret
```

Add the following steps to your pipeline stage to establish and verify the VPN connection:

#### Install and connect

```yaml
- step:
    type: Run
    name: Install OpenVPN and Connect
    identifier: install_openvpn_and_connect
    spec:
      shell: Sh
      command: |
        # Install OpenVPN
        apt-get update && apt-get install -y openvpn

        # Decode config from Harness secret
        echo "<+secrets.getValue("openvpn_config_b64")>" | base64 -d > /tmp/client.ovpn

        # Load TUN kernel module
        modprobe tun

        # Start OpenVPN in daemon mode
        openvpn --config /tmp/client.ovpn \
          --daemon \
          --log /tmp/openvpn.log \
          --writepid /tmp/openvpn.pid

        # Wait for connection to establish
        timeout=60
        elapsed=0
        while [ $elapsed -lt $timeout ]; do
          if grep -q "Initialization Sequence Completed" /tmp/openvpn.log 2>/dev/null; then
            echo "VPN connected successfully"
            exit 0
          fi
          sleep 2
          elapsed=$((elapsed + 2))
        done
        echo "VPN connection timed out"
        cat /tmp/openvpn.log
        exit 1
```

#### Verify connectivity

```yaml
- step:
    type: Run
    name: Verify VPN Connection
    identifier: verify_vpn_connection
    spec:
      shell: Sh
      command: |
        # Verify VPN interface exists
        ip addr show tun0

        # Test connectivity to private resource
        ping -c 3 <+pipeline.variables.private_resource_ip>

        # Show routing table
        ip route
```

#### Cleanup

```yaml
- step:
    type: Run
    name: Cleanup VPN Connection
    identifier: cleanup_vpn
    spec:
      shell: Sh
      command: |
        kill $(cat /tmp/openvpn.pid) 2>/dev/null || true
        rm -f /tmp/client.ovpn /tmp/openvpn.log /tmp/openvpn.pid
    when:
      stageStatus: All
```

## WireGuard

### Architecture

<DocImage path={require('/docs/platform/references/static/vpn-wireguard-architecture.svg')} />

The WireGuard client runs on the Harness Cloud build VM, establishes an encrypted tunnel using the Noise protocol over UDP (port 51820) to your WireGuard server, and creates a `wg0` virtual interface. Traffic to your private subnets is routed through this tunnel.

**Connection flow:**
1. Client sends encrypted handshake with public key
2. Server validates client public key and responds
3. Session established in under 1 RTT
4. `wg0` interface created (client gets IP like `10.0.0.2`)
5. Each packet individually authenticated with replay protection

### Prerequisites

- A WireGuard server accessible from the internet with a public IP or domain
- A client configuration file (`wg0.conf`) with keys and peer configuration
- The `wg0.conf` config stored as a **base64-encoded [Harness file secret](/docs/platform/secrets/add-file-secrets)**

### Setup VPN client in pipeline

Store your WireGuard configuration as a base64-encoded Harness secret:

```bash
base64 -w 0 wg0.conf  # Copy the output and save as a Harness secret
```

Add the following steps to your pipeline stage. WireGuard steps require `privileged: true` and `runAsUser: "0"`:

#### Install WireGuard

```yaml
- step:
    type: Run
    name: Install WireGuard
    identifier: install_wireguard
    spec:
      shell: Sh
      privileged: true
      runAsUser: "0"
      command: |
        apt-get update && apt-get install -y wireguard wireguard-tools

        # Load WireGuard kernel module
        modprobe wireguard || echo "Using userspace WireGuard"

        # Install DNS resolver
        apt-get install -y openresolv
```

#### Configure and connect

```yaml
- step:
    type: Run
    name: Configure and Connect WireGuard
    identifier: configure_and_connect_wireguard
    spec:
      shell: Sh
      privileged: true
      runAsUser: "0"
      command: |
        # Decode config from Harness secret
        mkdir -p /etc/wireguard
        echo "<+secrets.getValue("wireguard_config_b64")>" | base64 -d > /etc/wireguard/wg0.conf
        chmod 600 /etc/wireguard/wg0.conf

        # Bring up WireGuard interface
        wg-quick up wg0

        # Verify connection
        ip addr show wg0
        wg show wg0
```

#### Verify connectivity

```yaml
- step:
    type: Run
    name: Verify WireGuard Connection
    identifier: verify_wireguard_connection
    spec:
      shell: Sh
      privileged: true
      runAsUser: "0"
      command: |
        # Check handshake completed
        wg show wg0 latest-handshakes

        # Test connectivity to private resource
        ping -c 3 <+pipeline.variables.private_resource_ip>

        # Show transfer stats
        wg show wg0 transfer
```

#### Cleanup

```yaml
- step:
    type: Run
    name: Cleanup WireGuard
    identifier: cleanup_wireguard
    spec:
      shell: Sh
      privileged: true
      runAsUser: "0"
      command: |
        wg-quick down wg0 || true
        rm -f /etc/wireguard/wg0.conf
    when:
      stageStatus: All
```

## Tunnel configuration

### Split tunnel (recommended)

Split tunneling routes only traffic destined for your private subnets through the VPN. All other traffic (internet, package downloads) uses the default route. This is the recommended approach for CI/CD pipelines.

**OpenVPN** - Configure on your server:
```
push "route 10.128.0.0 255.255.255.0"
push "route 192.168.1.0 255.255.255.0"
# Do NOT use redirect-gateway
```

**WireGuard** - Configure in `wg0.conf`:
```ini
[Peer]
AllowedIPs = 10.0.0.0/24, 10.128.0.0/24
```

### Full tunnel

Full tunneling routes all traffic through the VPN. Use this when compliance requires complete traffic encryption or when accessing geo-restricted resources.

**OpenVPN** - Configure on your server:
```
push "redirect-gateway def1 bypass-dhcp"
push "dhcp-option DNS 10.128.0.1"
```

**WireGuard** - Configure in `wg0.conf`:
```ini
[Peer]
AllowedIPs = 0.0.0.0/0, ::/0
```

:::warning
Full tunnel routing increases latency and VPN server bandwidth usage. Use split tunneling unless you have a specific requirement for full tunnel.
:::

## Best practices

- **Store credentials as Harness secrets** - Never hardcode VPN keys or certificates in pipeline YAML.
- **Always include cleanup steps** - Use `when: stageStatus: All` to ensure VPN resources are cleaned up even on failure.
- **Verify connectivity before proceeding** - Add a verification step after connecting to confirm the VPN is operational.
- **Use split tunneling** - Route only necessary traffic through the VPN to minimize latency and bandwidth overhead.
- **Use PersistentKeepalive** - Set `PersistentKeepalive = 25` in WireGuard configs to prevent NAT timeout issues.
- **Set connection timeouts** - Avoid indefinite hangs by implementing timeout logic when waiting for VPN connections.

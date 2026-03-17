---
title: Private network connectivity options for Harness Cloud
description: Connect Harness Cloud to private resources using IP allowlisting or enterprise networking solutions.
sidebar_position: 8
id: index
slug: /platform/references/private-network-connectivity
redirect_from:
  - /docs/continuous-integration/secure-ci/secure-connect
  - /docs/continuous-integration/secure-ci/private-network-connectivity
---

When running builds or other workloads on Harness Cloud, you may need to access internal resources that are not publicly accessible, such as:

- Internal artifact repositories
- Private source code management systems (SCMs)
- Internal APIs and services
- On-premises databases

### Connectivity options

Harness supports multiple approaches to enable communication between Harness Cloud infrastructure and your private network:
1. IP allowlisting
2. Private network connectivity through supported cloud provider solutions: AWS PrivateLink or GCP Private Service Connect.
3. VPN connectivity using OpenVPN or WireGuard.

## IP allowlisting

Your networking or security team can allowlist the IP ranges used by Harness Cloud to permit traffic from Harness-managed Cloud VMs to your private resources.

### How it works

1. Retrieve the current Harness Cloud IP ranges
2. Configure your firewall or security groups to allow traffic from these IP addresses
3. Ensure proper access controls are in place for your private resources

### When to use IP allowlisting

Use IP allowlisting when:

- Your security policy permits allowlisting external IP ranges
- You need a straightforward connectivity solution without additional client deployment
- Your resources are accessible via standard firewall rules
- You want minimal setup and configuration overhead

### Getting Harness Cloud IP addresses

To retrieve allowlisted IPs for Harness Cloud via API, see [Retrieve allowlisted IPs for Hosted CI via API](/docs/platform/references/allowlist-harness-domains-and-ips#retrieve-allowlisted-ips-for-hosted-ci-via-api).

For comprehensive information about IP allowlisting or to request the current IP ranges, visit the [Allowlist Harness domains and IPs](/docs/platform/references/allowlist-harness-domains-and-ips) documentation or [contact Harness Support](https://support.harness.io/).

## Private network connectivity (Enterprise)

For enterprise customers with strict compliance and security requirements, cloud provider private networking solutions offer enhanced security without exposing traffic to the public internet.

### Benefits

- **Reliable high-bandwidth connectivity** - Ensures stable, performant transfer of large artifacts, caches, and build outputs at enterprise scale
- **No internet exposure** - Traffic stays within your cloud provider's private network backbone
- **Granular access control** - Restrict access to specific VPCs, subnets, or security principals
- **Simplified compliance** - Meets internal-only networking requirements for regulated industries
- **Easy to configure** - No VPNs or complex firewall rules required
- **Access non-public services** - Reach internal APIs, services with no public IPs, resources behind internal load balancers, and workloads in isolated VPCs, all through private networking paths

### Available solutions

**AWS PrivateLink**
Provides private connectivity between VPCs, AWS services, and your on-premises networks without exposing traffic to the public internet.

**GCP Private Service Connect**
Allows you to privately connect your VPC networks to Google-managed services and services hosted in other VPC networks.


**For detailed solution architecture and setup instructions, see** [**documentation**](docs/platform/references/private-network-connectivity/private-link-connect.md).

## VPN connectivity

For teams that need to connect Harness Cloud VMs to on-premises or private cloud resources through a traditional VPN tunnel, Harness supports two VPN solutions:

**OpenVPN**
Establishes a TLS-encrypted tunnel from the Cloud VM to your OpenVPN server. Supports both UDP and TCP, certificate-based and username/password authentication, and enterprise PKI integration.

**WireGuard**
A modern, high-performance VPN that creates an encrypted tunnel using the Noise protocol. Offers faster connection times, higher throughput, and a simpler configuration compared to OpenVPN.

Both solutions run a VPN client directly on the ephemeral Harness Cloud VM, creating a secure tunnel to your VPN server. You store the VPN configuration as a base64-encoded Harness secret and decode it at runtime.

**For setup instructions and pipeline YAML examples, see** [**VPN for Harness Cloud**](/docs/platform/references/private-network-connectivity/vpn-harness-cloud).

## Need help?

For assistance with private network connectivity options:

- Review the [Allowlist Harness domains and IPs](/docs/platform/references/allowlist-harness-domains-and-ips) documentation
- Consult your cloud provider's documentation for PrivateLink or Private Service Connect
- [Contact Harness Support](https://support.harness.io/) for guidance on choosing the right solution for your requirements

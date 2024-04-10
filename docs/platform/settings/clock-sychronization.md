---
title: Clock synchronization
description: This topic explains recommended settings for clock synchronization.
sidebar_position: 2
---

This topic provides Harness' recommended settings for Network Time Protocol (NTP), a critical aspect of time synchronization within information management systems.

- **Control:** Ensuring synchronization across all clocks within an organization's information management systems is paramount. It's essential to integrate these clocks into a unified reference time source. This centralized approach not only streamlines operations but also mitigates discrepancies that may arise from disparate time sources, thereby enhancing overall system reliability and consistency.

- **Implementation:** Harness advocates for establishing a standardized reference time within the organization. Defining a common time source ensures coherence across various operations and applications. By establishing a clear reference point, organizations can maintain consistency in timekeeping practices, facilitating seamless coordination and communication across different systems and teams.

## Recommended NTP configuration for Harness Delegate

When configuring NTP for Harness Delegate, ensuring accurate time synchronization is crucial for various operational tasks. Here are two recommended options:

- Use your local NTP server: Leveraging a local NTP server ensures reliable time synchronization within your network environment.
- Use [Google Public NTP](https://developers.google.com/time): Google Public NTP provides a robust and widely accessible time synchronization service, offering high accuracy and availability.

## Recommended NTP configuration for Harness Self-Managed Enterprise Edition

Maintaining precise time synchronization is vital for the optimal functioning of Harness Self-Managed Enterprise Edition. Consider the following recommendations for NTP configuration:

- Use your local NTP server: Utilizing a local NTP server offers localized time synchronization, ensuring consistency and reliability within your infrastructure.
- Use [Google Public NTP](https://developers.google.com/time): Google Public NTP presents a dependable option for time synchronization, delivering accurate time information across diverse network environments.

## Configure NTP for a delegate running on Linux

Most Linux distributions use `systemd`, which comes with NTP for clock synchronization. You can verify `systemd` by running `timedatectl`.

### Install the NTP service

1. If NTP is not present on your host system, you can use `yum`, `apt-get`, or `dnf` to install the NTP service as per your OS. You can also use Chrony, which has a flexible implementation of NTP.

   You must have root permissions to install the application. Installation varies slightly depending on which Linux distribution you use:

    ```
     sudo apt-get install ntp  # for Debian/Ubuntu
     sudo yum install ntp      # for CentOS/RHEL
     sudo dnf install ntp      # for Fedora
     ```

    NTP is configured using a `ntp.conf` configuration file. The file is generally located in the `/etc/` directory.

2. You can add multiple NTP servers in the `ntp.conf` file in the format below.

    :::info
    The prefer option should only be specified once.
    :::

    ```
    server <YOUR_PREFERRED_IP_ADDRESS> [prefer]
    ```

    ```
    server <YOUR_PREFERRED_IP_ADDRESS> prefer # Local NTP server IP address
    server ntp-time.for.mydomain
    ```

    Below are some useful commands to enable, start, restart, and stop the NTP service.

    ```
    sudo systemctl enable ntpd
    sudo systemctl start ntpd
    sudo systemctl restart ntpd
    sudo systemctl stop ntpd
    ```

3. You can run the following to list configured servers and their associated synchronization performance characteristics.

    ```
    ntpq -p
    ```


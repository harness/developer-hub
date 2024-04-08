---
title: Clock synchronization
description: This topic explains recommended settings for clock synchronization.
sidebar_position: 2
---

As per [ISO/IEC 27001-A.12.4.4 clock synchronization](https://www.isms.online/iso-27001/annex-a/8-17-clock-synchronisation-2022/):

"The cloud service provider should provide information to the cloud service customer regarding the clock used by the cloud service provider's systems, and information about how the cloud service customer can synchronize local clocks with the cloud service clock."

- **Control:** Clocks in all related information management systems should be integrated into a single reference time source for an organization.

- **Implementation:** A standard reference time should be defined for use inside the organization.

## Recommended NTP configuration for Delegate

- Use your local NTP server
- Use [Google Public NTP](https://developers.google.com/time)

## Recommended NTP configuration for Harness Self-Managed Enterprise Edition

- Use your local NTP server
- Use Use [Google Public NTP](https://developers.google.com/time)

## Configure NTP for a delegate running on Linux

Most Linux distributions use `systemd`, which comes with NTP for clock synchronization. You can verify by running `timedatectl`.

### Install the NTP service

1. If NTP is not present on your host system, you can use `yum`, `apt-get` to install the NTP service as per your OS. You can also use Chrony, which has flexible implementation of NTP.

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
    server <-address-> [prefer]
    server 192.168.1.127 prefer # Local NTP server IP address
    server ntp-time.for.mydomain
    ```

    Below are some useful commands to start/stop.

    ```
    sudo systemctl enable ntpd
    sudo systemctl start ntpd
    sudo systemctl restart ntpd
    sudo systemctl stop ntpd
    ```

    You can find more details regarding list of configured server and their associated synchronization performance characteristics.

    ```
    ntpq -p
    ```


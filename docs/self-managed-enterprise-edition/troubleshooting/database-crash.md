---
title: Database Crashes
description: This guide outlines steps to increase system limits (ulimit) to improve stability and prevent file or process-related errors in server environments.
sidebar_position: 40
---

When running databases on the Self-Managed Enterprise Edition, you may encounter errors such as **"Too many files open"**. These errors typically occur when the system file descriptor or process limits are too low.

To resolve this, follow the steps below to increase system limits (`ulimit`):

### Steps to Update System Limits

1. Open the system configuration file:
   
   ```bash
   sudo nano /etc/systemd/system.conf
   ```

2. Modify or add the following parameters:
   
   ```bash
   DefaultLimitNOFILE=1048576
   DefaultLimitNPROC=1000000
   DefaultLimitSTACK=8388608
   ```

   :::note
    These values were initially unset (empty) and have been updated following MongoDB's best practice recommendations.
   :::

3. Reload the system daemon to apply the configuration:
   
   ```bash
   sudo systemctl daemon-reexec
   ```

4. Reboot the machine:
   
   ```bash
   sudo reboot
   ```

## Troubleshooting

- **Changes not taking effect after reboot:**  
  Ensure you edited `/etc/systemd/system.conf` (not `/etc/systemd/user.conf`), and that there are no syntax errors.

- **Still seeing "Too many files open" errors:**  
  Confirm the limits by checking:

  ```bash
  ulimit -n
  ```

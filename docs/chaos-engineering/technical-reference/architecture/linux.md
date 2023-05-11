---
title: Linux Execution Plane
sidebar_position: 2
---
Harness execution plane for Linux includes the **Linux chaos infrastructure daemon service**.

Linux chaos infrastructure daemon service is a **Systemd** service responsible for injecting faults into a Linux machine as a part of a chaos experiment.
- The infrastructure relies on a polling model to fetch and execute the experiments or tasks from the control plane.
- It uses a rotating access token based authorization along with TLS encryption to ensure secure communication with the control plane.
- Multiple faults in an experiment can execute serially or in parallel to each other, depending on how the faults have been defined.
- Every machine has a one-to-one mapping with the infrastructure daemon service, and all of these infrastructure(s) communicate with the control plane to:
    1. Fetch experiments for execution
    2. Update experiment execution status
    3. Stream experiment logs
    4. Send experiment execution result

## Compatibility
The chaos infrastructure has been tested for compatibility in the following Linux OS distributions:
1. Ubuntu 16+
2. Debian 10+
3. CentOS 7+
4. RHEL 7+
5. Fedora 30+
6. openSUSE LEAP 15.4+ / SUSE Linux Enterprise 15+

## Chaos rollback
Chaos rollback causes all the target resources in an experiment to re-attain their steady state after the execution of the experiment, which ensures the safety of all the applications deployed on your Linux machine.
- Chaos rollback is performed at the end of each experiment execution. On-the-fly experiments can be safely aborted and the chaos is reverted.
- In case of a network disruption between the control plane and execution plane during the execution of an experiment, it is gracefully aborted and the chaos is reverted.
- In case of an abrupt exit of the chaos infrastructure process during the execution of an experiment, the daemon service reverts the chaos before restarting the process.
- In case of an abrupt reboot of the machine, after the reboot, the daemon service checks and reverts any remnant inconsistency due to the prior execution of chaos, before starting the chaos infrastructure process.
- In the rare scenario where the revert of chaos itself also leads to an error, an appropriate error message is logged in the experiment log for the manual intervention of the user.

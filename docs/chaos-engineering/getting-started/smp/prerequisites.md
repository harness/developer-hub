---
title: Prerequisites
sidebar_position: 1
description: Prerequisites to fulfill before using Enterprise ChaosHub.
---

This topic describes the prerequisites to fulfill before using Enterprise ChaosHub.

The table below describes the SMP version and its equivalent chaos manager image required to connect to Enterprise ChaosHub.
Use the equivalent of the image mentioned here from your image registry. 

<table>
    <thead>
        <tr>
            <th>Version</th>
            <th>Chaos Manager Image</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0.26.x</td>
            <td>docker.io/harness/smp-chaos-manager-signed:1.54.1</td>
        </tr>
        <tr>
            <td>0.25.x</td>
            <td>docker.io/harness/smp-chaos-manager-signed:1.53.2</td>
        </tr>
        <tr>
            <td>0.24.x</td>
            <td>docker.io/harness/smp-chaos-manager-signed:1.49.3</td>
        </tr>
        <tr>
            <td>0.23.x</td>
            <td>docker.io/harness/smp-chaos-manager-signed:1.47.7</td>
        </tr>
    </tbody>
</table>



Update the chaos-manager image tag in the helm-override:

```yaml
chaos:
  chaos-manager:
    image:
      tag: "1.47.7" #Update the tag of chaos-manager image here
```
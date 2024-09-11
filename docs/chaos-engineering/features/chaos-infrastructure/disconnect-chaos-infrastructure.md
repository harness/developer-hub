---
title: Disconnect chaos infrastructure
sidebar_position: 4
description: Guide to disconnect from Kubernetes and Linux chaos infrastructure
redirect_from:
  - /docs/chaos-engineering/chaos-infrastructure/disconnect-chaos-infrastructure
---

Disconnecting and deleting a chaos infrastructure removes it from the environment where it resides. It also removes the infrastructure services from the Kubernetes cluster.

Go to the **Environments** sidebar option under the **Chaos** tab, where all the environments created under the current project are listed. Select the environment in which the chaos infrastructure to be deleted resides.

Based on the infrastructure you have used, you can follow the steps to disconnect [Kubernetes](#remove-kubernetes-infrastructure), [Linux](#remove-linux-infrastructure), and [Windows](#remove-windows-infrastructure) infrastructure, respectively.

  ![select to disconnect](./static/disconnect-chaos-infrastructure/select-to-disconnect.png)

## Remove Kubernetes infrastructure

1. To disconnect a Kubernetes infrastructure, select the `⋮` icon against the chaos infrastructure name and select **Disable**.

    ![Delete Chaos Infra](./static/disconnect-chaos-infrastructure/delete-chaos-infra-short.png)

2. Next, execute the commands displayed in the modal from your terminal to remove the chaos infrastructure components. Finally, select **Confirm**.

    ![Execute Delete Commands](./static/disconnect-chaos-infrastructure/execute-delete-commands.png)


## Remove Linux infrastructure

1. To disconnect a Linux infrastructure, select the `⋮` icon against the chaos infrastructure name and select **Disable**.

    ![Delete Chaos Infra](./static/disconnect-chaos-infrastructure/12.delete-infra.png)

2. Next, copy the command displayed in the modal, and execute it in your Linux machine to uninstall the chaos infrastructure components. Finally, select **Confirm**.

    ![Execute Delete Command](./static/disconnect-chaos-infrastructure/13.execute-command.png)

## Remove Windows infrastructure

1. To disconnect a Windows infrastructure, select the `⋮` icon against the chaos infrastructure name and select **Disable**.

    ![Delete Chaos Infra](./static/windows-infrastructure/disable-1.png)

2. Next, copy the command displayed in the modal, and execute it in your Windows machine terminal to uninstall the chaos infrastructure components. Finally, select **Confirm**.

    ![Execute Delete Command](./static/windows-infrastructure/click-confirm-2.png)


With that, the chaos infrastructure will be disconnected.
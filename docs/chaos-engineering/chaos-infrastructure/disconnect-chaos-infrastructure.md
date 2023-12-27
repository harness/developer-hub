---
title: Disconnect chaos infrastructure
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Disconnecting and deleting a chaos infrastructure removes it from the environment where it resides. It also removes the infrastructure services from the Kubernetes cluster.

### Remove infrastructure
Go to the **Environments** sidebar option under the **Chaos** tab, where all the environments created under the current project are listed. Select the environment in which the chaos infrastructure to be deleted resides.


<Tabs>
  <TabItem value="Kubernetes">

To disconnect a Kubernetes infrastructure, select the `⋮` icon against the chaos infrastructure name and select **Disable**.

![Delete Chaos Infra](./static/disconnect-chaos-infrastructure/delete-chaos-infra-short.png)

Next, execute the commands displayed in the modal from your terminal to remove the chaos infrastructure components. Finally, select **Confirm**.

![Execute Delete Commands](./static/disconnect-chaos-infrastructure/execute-delete-commands.png)


</TabItem>
  <TabItem value="Linux">

To disconnect a Linux infrastructure, select the `⋮` icon against the chaos infrastructure name and select **Disable**.

![Delete Chaos Infra](./static/disconnect-chaos-infrastructure/12.delete-infra.png)

Next, copy the command displayed in the modal, and execute it in your Linux machine to uninstall the chaos infrastructure components. Finally, select **Confirm**.

![Execute Delete Command](./static/disconnect-chaos-infrastructure/13.execute-command.png)


</TabItem>
</Tabs>


With that, the chaos infrastructure will be disconnected.
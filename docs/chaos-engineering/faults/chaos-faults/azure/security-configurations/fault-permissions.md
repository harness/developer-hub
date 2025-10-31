# Required Permissions and Custom Roles For Azure Chaos Faults

A reference guide for the minimum Azure role permissions required by each chaos faults and a superset role covering all.

---

## Superset Role for All Azure Faults

### Required Azure RBAC Permissions

This superset combines all permissions required for Disk Loss, Instance Stop, Web App operations, and Azure Stress faults.

```json
{
  "Name": "Harness Chaos Engineering - Azure Superset Role",
  "IsCustom": true,
  "Description": "Superset role combining all Azure permissions required for supported chaos faults.",
  "Actions": [
    "Microsoft.Compute/disks/read",
    "Microsoft.Compute/virtualMachines/read",
    "Microsoft.Compute/virtualMachines/write",
    "Microsoft.Compute/virtualMachineScaleSets/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/write",
    "Microsoft.Compute/virtualMachines/powerOff/action",
    "Microsoft.Compute/virtualMachines/start/action",
    "Microsoft.Compute/virtualMachines/instanceView/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualmachines/powerOff/action",
    "Microsoft.Compute/virtualMachineScaleSets/virtualmachines/start/action",
    "Microsoft.Compute/virtualMachineScaleSets/virtualmachines/instanceView/read",
    "Microsoft.Web/sites/read",
    "Microsoft.Web/sites/config/list/action",
    "Microsoft.Web/sites/config/write",
    "Microsoft.Web/sites/state/action",
    "Microsoft.Web/sites/stop/action",
    "Microsoft.Web/sites/start/action",
    "Microsoft.Compute/virtualMachines/runCommand/action",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/runCommand/action",
    "Microsoft.Resources/subscriptions/resourceGroups/read"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/<your-subscription-id>"
  ]
}
```

---

## Disk Loss

### Required Azure RBAC Permissions

<table>
  <thead>
    <tr>
      <th>Azure RBAC Permission</th>
      <th>Action Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Microsoft.Compute/disks/read</td>
      <td>Read managed disk metadata<br />Get disk attachment status</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachines/read</td>
      <td>Read VM/VMSS instance properties</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read</td>
      <td>Read VM/VMSS instance properties</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachines/write</td>
      <td>Modify VM data disk attachments</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/write</td>
      <td>Modify VMSS VM data disk attachments</td>
    </tr>
  </tbody>
</table>

### Sample Custom Role

```json
{
  "Name": "Harness Chaos Engineering - Azure Disk Loss",
  "IsCustom": true,
  "Description": "Allows detaching and reattaching managed disks to VM/VMSS instances.",
  "Actions": [
    "Microsoft.Compute/disks/read",
    "Microsoft.Compute/virtualMachines/read",
    "Microsoft.Compute/virtualMachines/write",
    "Microsoft.Compute/virtualMachineScaleSets/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/write"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/<your-subscription-id>"
  ]
}
```

---

## Instance Stop

### Required Azure RBAC Permissions

<table>
  <thead>
    <tr>
      <th>Azure RBAC Permission</th>
      <th>Action Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Microsoft.Compute/virtualMachines/read</td>
      <td>Read VM metadata</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachines/powerOff/action</td>
      <td>Power off standalone VM</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachines/start/action</td>
      <td>Start standalone VM</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachines/instanceView/read</td>
      <td>Get instance status</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachineScaleSets/virtualmachines/read</td>
      <td>Read VMSS instance metadata</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachineScaleSets/virtualmachines/powerOff/action</td>
      <td>Power off VMSS instance</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachineScaleSets/virtualmachines/start/action</td>
      <td>Start VMSS instance</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachineScaleSets/virtualmachines/instanceView/read</td>
      <td>Get VMSS instance status</td>
    </tr>
  </tbody>
</table>

### Sample Custom Role

```json
{
  "Name": "Harness Chaos Engineering - Azure Instance Stop",
  "IsCustom": true,
  "Description": "Allows stopping and starting VMs and scale set VMs.",
  "Actions": [
    "Microsoft.Compute/virtualMachines/read",
    "Microsoft.Compute/virtualMachines/powerOff/action",
    "Microsoft.Compute/virtualMachines/start/action",
    "Microsoft.Compute/virtualMachines/instanceView/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualmachines/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualmachines/powerOff/action",
    "Microsoft.Compute/virtualMachineScaleSets/virtualmachines/start/action",
    "Microsoft.Compute/virtualMachineScaleSets/virtualmachines/instanceView/read"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/<your-subscription-id>"
  ]
}
```

---

## Web App Access Restriction

### Required Azure RBAC Permissions

<table>
  <thead>
    <tr>
      <th>Azure RBAC Permission</th>
      <th>Action Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Microsoft.Web/sites/read</td>
      <td>List all Web Apps</td>
    </tr>
    <tr>
      <td>Microsoft.Web/sites/config/list/action</td>
      <td>Get Web App Config</td>
    </tr>
    <tr>
      <td>Microsoft.Web/sites/config/write</td>
      <td>Update Web App Config</td>
    </tr>
    <tr>
      <td>Microsoft.Web/sites/state/action</td>
      <td>Get Web App Status</td>
    </tr>
  </tbody>
</table>

### Sample Custom Role

```json
{
  "Name": "Harness Chaos Engineering - Web App Access Restriction",
  "IsCustom": true,
  "Description": "Allows reading and modifying Web App access restriction rules.",
  "Actions": [
    "Microsoft.Web/sites/read",
    "Microsoft.Web/sites/config/list/action",
    "Microsoft.Web/sites/config/write",
    "Microsoft.Web/sites/state/action"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/<your-subscription-id>"
  ]
}
```

---

## Web App Stop

### Required Azure RBAC Permissions

<table>
  <thead>
    <tr>
      <th>Azure RBAC Permission</th>
      <th>Action Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Microsoft.Web/sites/read</td>
      <td>Read app metadata</td>
    </tr>
    <tr>
      <td>Microsoft.Web/sites/stop/action</td>
      <td>Stop the app</td>
    </tr>
    <tr>
      <td>Microsoft.Web/sites/start/action</td>
      <td>Start the app</td>
    </tr>
    <tr>
      <td>Microsoft.Web/sites/state/action</td>
      <td>Get app state</td>
    </tr>
  </tbody>
</table>

### Sample Custom Role

```json
{
  "Name": "Harness Chaos Engineering - Web App Stop",
  "IsCustom": true,
  "Description": "Allows stopping and starting Azure Web Apps.",
  "Actions": [
    "Microsoft.Web/sites/read",
    "Microsoft.Web/sites/stop/action",
    "Microsoft.Web/sites/start/action",
    "Microsoft.Web/sites/state/action"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/<your-subscription-id>"
  ]
}
```

---

## Azure Stress (CPU & Memory)

### Required Azure RBAC Permissions

<table>
  <thead>
    <tr>
      <th>Azure RBAC Permission</th>
      <th>Action Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Microsoft.Compute/virtualMachines/runCommand/action</td>
      <td>Execute scripts on VMs using Run Command</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachines/read</td>
      <td>Read VM instance details</td>
    </tr>
    <tr>
      <td>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/instanceView/read</td>
      <td>Read the status of VMSS instances</td>
    </tr>
    <tr>
      <td>Microsoft.Resources/subscriptions/resourceGroups/read</td>
      <td>Read resource group metadata</td>
    </tr>
  </tbody>
</table>

### Sample Custom Role

```json
{
  "Name": "Harness Chaos Engineering - Azure Stress",
  "IsCustom": true,
  "Description": "Minimal custom role for executing stress chaos fault on Azure VMs and VMSS",
  "Actions": [
    "Microsoft.Compute/virtualMachines/runCommand/action",
    "Microsoft.Compute/virtualMachines/read",
    "Microsoft.Compute/virtualMachines/powerOff/action",
    "Microsoft.Compute/virtualMachines/start/action",
    "Microsoft.Compute/virtualMachines/instanceView/read",
    "Microsoft.Compute/virtualMachineScaleSets/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/instanceView/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/runCommand/action",
    "Microsoft.Resources/subscriptions/resourceGroups/read"
  ],
  "NotActions": [],
  "AssignableScopes": [
    "/subscriptions/<your-subscription-id>"
  ]
}
```

---

**Note:** Replace `<your-subscription-id>` with your actual Azure subscription ID.

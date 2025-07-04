## vSphere secrets
These secrets are provided only if vSphere is used as the deployment platform for CF.

The following vSphere secrets reside on the same machine where the chaos infrastructure is executed. These secrets are provided in the `/etc/linux-chaos-infrastructure/vsphere.env` file in the following format:

```env
GOVC_URL=XXXXXXXXXXXXXXXXXXXXXX
GOVC_USERNAME=XXXXXXXXXXXXXXXXX
GOVC_PASSWORD=XXXXXXXXXXXXXXXXX
GOVC_INSECURE=XXXXXXXXXXXXXXXXX
VM_NAME=XXXXXXXXXXXXXXXXXXXXXXX
VM_USERNAME=XXXXXXXXXXXXXXXXXXX
VM_PASSWORD=XXXXXXXXXXXXXXXXXXX
```

<table>
  <tr>
    <th> ENV Name </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> GOVC_URL </td>
    <td> Endpoint for vSphere </td>
    <td> For example, <code>192.168.214.244</code> </td>
  </tr>
  <tr>
    <td> GOVC_USERNAME </td>
    <td> Username for the vSphere user </td>
    <td> For example, <code>username</code> </td>
  </tr>
  <tr>
    <td> GOVC_PASSWORD </td>
    <td> Password for the vSphere user </td>
    <td> For example, <code>password</code> </td>
  </tr>
  <tr>
    <td> GOVC_INSECURE </td>
    <td> Skip SSL validation for govc commands </td>
    <td> For example, <code>true</code> </td>
  </tr>
  <tr>
    <td> VM_NAME </td>
    <td> Name of the vSphere VM where the fault-injector utility is installed </td>
    <td> For example, <code>cf-vm</code> </td>
  </tr>
  <tr>
    <td> VM_USERNAME </td>
    <td> Username for the VM guest user </td>
    <td> For example, <code>root</code> </td>
  </tr>
  <tr>
    <td> VM_PASSWORD </td>
    <td> Password for the VM guest user </td>
    <td> For example, <code>password</code> </td>
  </tr>
</table>
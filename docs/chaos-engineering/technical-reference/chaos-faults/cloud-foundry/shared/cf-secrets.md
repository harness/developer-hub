## CF secrets
The following Cloud Foundry secrets reside on the same machine where the chaos infrastructure is executed. These secrets are provided in the `/etc/linux-chaos-infrastructure/cf.env` file in the following format:

```env
CF_API_ENDPOINT=XXXXXXXXXXXXXXXXXXX
CF_USERNAME=XXXXXXXXXXXXXXXXXXXXXXX
CF_PASSWORD=XXXXXXXXXXXXXXXXXXXXXXX
UAA_SERVER_ENDPOINT=XXXXXXXXXXXXXXX
```

:::note
If the secrets file is not provided, the secrets are attempted to be derived as environment variables by the fault-injector utility.
:::

<table>
  <tr>
    <th> ENV Name </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> CF_API_ENDPOINT </td>
    <td> API endpoint for the CF setup </td>
    <td> For example, <code>https://api.system.cf-setup.com</code> </td>
  </tr>
  <tr>
    <td> CF_USERNAME </td>
    <td> Username for the CF user </td>
    <td> For example, <code>username</code> </td>
  </tr>
  <tr>
    <td> CF_PASSWORD </td>
    <td> Password for the CF user </td>
    <td> For example, <code>password</code> </td>
  </tr>
  <tr>
    <td> UAA_SERVER_ENDPOINT </td>
    <td> API endpoint for the UAA server for the CF setup </td>
    <td> For example, <code>https://uaa.system.cf-setup.com</code> </td>
  </tr>
</table>
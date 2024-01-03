## CF secrets
The following Cloud Foundry secrets reside on the same machine where the chaos infrastructure is executed. These secrets are provided in the `/etc/linux-chaos-infrastructure/cf.env` file in the following format:

```env
CF_API_ENDPOINT=XXXXXXXXXXXXXXXXXXX
CF_USERNAME=XXXXXXXXXXXXXXXXXXXXXXX
CF_PASSWORD=XXXXXXXXXXXXXXXXXXXXXXX
UAA_SERVER_ENDPOINT=XXXXXXXXXXXXXXX
```

:::info
If the secrets file is not provided, the secrets are attempted to be derived as environment variables by the fault-injector utility.
:::

| ENV name | Description | Example |
| -------- | ----------- | ------- |
| CF_API_ENDPOINT | API endpoint for the CF setup | `https://api.system.cf-setup.com` |
| CF_USERNAME | Username for the CF user | `username` |
| CF_PASSWORD | Password for the CF user | `password` |
| UAA_SERVER_ENDPOINT | API endpoint for the UAA server for the CF setup | `https://uaa.system.cf-setup.com` |

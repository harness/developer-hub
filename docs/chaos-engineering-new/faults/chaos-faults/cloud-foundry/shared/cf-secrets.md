## CF secrets
The following Cloud Foundry secrets reside on the same machine where the chaos infrastructure is executed. These secrets are provided in the `/etc/linux-chaos-infrastructure/cf.env` file in the following format:

```env
CF_API_ENDPOINT=XXXXXXXXXXXXXXXXXXX
CF_USERNAME=XXXXXXXXXXXXXXXXXXXXXXX
CF_PASSWORD=XXXXXXXXXXXXXXXXXXXXXXX
UAA_SERVER_ENDPOINT=XXXXXXXXXXXXXXX
```

:::info
If the secrets file is not provided, the secrets are attempted to be derived from environment variables and the config file by the fault-injector.
:::

| ENV name | Description | Example |
| -------- | ----------- | ------- |
| CF_API_ENDPOINT | API endpoint for the CF setup | `https://api.system.cf-setup.com` |
| CF_USERNAME | Username for the CF user | `username` |
| CF_PASSWORD | Password for the CF user | `password` |
| UAA_SERVER_ENDPOINT | API endpoint for the UAA server for the CF setup | `https://uaa.system.cf-setup.com` |

### Fault injector ENVs and config file
If `/etc/linux-chaos-infrastructure/cf.env` file is not provided, fault-injector attempts to derive the secrets from environment variables or a configuration file. Any secret that is re-declared will be overridden in the following order of decreasing precedence:

1. `/etc/linux-chaos-infrastructure/cf.env` file
2. Environment variables
3. Configuration file

The configuration file should be provided at `/etc/linux-chaos-infrastructure/cf-fault-injector.yaml`:
```yaml
cf-api-endpoint: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
username: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
password: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
uaa-server-endpoint: XXXXXXXXXXXXXXXXXXXXXXXXXX
```

A mapping between all the three formats for providing the secrets is as follows:
| cf.env | ENV | cf-fault-injector.yaml |
| ------ | --- | ---------------------- |
| CF_API_ENDPOINT | CF_API_ENDPOINT | cf-api-endpoint |
| CF_USERNAME | USERNAME | username |
| CF_PASSWORD | PASSWORD | password |
| UAA_SERVER_ENDPOINT | UAA_SERVER_ENDPOINT | uaa-server-endpoint |

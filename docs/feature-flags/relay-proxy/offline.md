---
title: Offline Mode
description: This topic contains information on how to configure the proxy to run in offline mode
sidebar_position: 80
---

# Offline Mode

You can configure the Relay Proxy to load and use configuration data that is stored offline. The following configuration data from your Project is stored in a configuration directory:

- Flags
- Targets
- Target Groups
- Hashed data of your SDK keys

This stored configuration is then loaded from this directory when you enable the offline Flag.

To use offline mode, you need to:
- Generate offline config
- Run the proxy in offline mode

## Generate offline config
You need to generate the configuration directory that contains your Project data before you can run the proxy in offline mode. To do this you run the proxy using your usual configuration, but also:

1. Include the `generate-offline-config=true` flag or `GENERATE_OFFLINE_CONFIG=true` environment variable.
2. If running the docker container, mount your desired config directory to the containers /config directory. This is where the generated config files will appear. e.g. 

`docker run -d -p 7000:7000 --env-file .env -v {YOUR_ABSOULUTE_PATH}/config:/config ff-proxy`
3. If running the compiled exe you should pass the `config-dir=${YOUR_ABSOLUTE_PATH}` flag or `CONFIG_DIR=${YOUR_ABSOLUTE_PATH}` environment variable to point to your config directory.

When running in config generation mode the Relay Proxy will startup, fetch the config, write to disk then immediately terminate. 

## Run in offline mode
After you have generated a configuration directory, you can load the data from it any time you need to run the proxy offline. To use the stored configuration when the proxy is offline you run the proxy using your usual configuration, but also:
1. Include the `offline=true` flag or `OFFLINE=true` environment variable.
2. If running the docker container, mount your desired config directory to the containers /config directory.
3. If running the compiled exe you should pass the `config-dir=${YOUR_ABSOLUTE_PATH}` flag or `CONFIG_DIR=${YOUR_ABSOLUTE_PATH}` environment variable to point to your config directory.


### Will the Proxy send any metrics while in offline mode?
No. When running in offline mode the proxy doesn't make any external network requests.

### Can I hot-load new config in during runtime?
No. On startup the Relay Proxy moves all the config from disk to the cache of choice (in memory or redis) and from then on uses only the cache data to serve connected sdks. Changing the content of the /config directory during runtime will have no impact. Only a restart will pick up the new configuration.

---
title: Use offline Mode
description: This topic contains information on how to configure the proxy to run in offline mode
sidebar_position: 80
redirect_from:
  - /docs/feature-flags/relay-proxy/offline
---


You can configure the Relay Proxy to load and use configuration data that is stored offline. The following configuration data from your Harness project is stored in a configuration directory:

- Flags
- Targets
- Target groups
- Hashed data of your SDK keys

This stored configuration is loaded from this directory when you enable the offline flag.

To use offline mode:

- [Generate offline config](#generate-offline-config)
- [Run the proxy in offline mode](#run-in-offline-mode)

## Generate offline configuration

You must generate the configuration directory that contains your project data before you can run the proxy in offline mode. 

To generate offline configuration: 

1. Run the proxy using your usual configuration, while also doing the following:

	1. Include the `generate-offline-config=true` flag or `GENERATE_OFFLINE_CONFIG=true` environment variable.
	1. If running the docker container, mount your desired config directory to the container's `/config `directory. This is where the generated config files will appear. For example: 

		`docker run -d -p 7000:7000 --env-file .env -v {YOUR_ABSOULUTE_PATH}/config:/config ff-proxy`

	1. If running the compiled exe, pass the `config-dir=${YOUR_ABSOLUTE_PATH}` flag or `CONFIG_DIR=${YOUR_ABSOLUTE_PATH}` environment variable to point to your config directory.

When running in config generation mode the Relay Proxy starts up, fetches the config, writes to disk, then immediately terminates. 

## Run in offline mode

After you have [generated a configuration directory](#generate-offline-configuration), you can load the data from it any time you need to run the proxy offline. 

To use the stored configuration when the proxy is offline: 

1. Run the proxy using your usual configuration, while also doing the following:

	1. Include the `offline=true` flag or `OFFLINE=true` environment variable.
	1. If running the docker container, mount your desired config directory to the container's `/config` directory.
	1. If running the compiled exe, pass the `config-dir=${YOUR_ABSOLUTE_PATH}` flag or `CONFIG_DIR=${YOUR_ABSOLUTE_PATH}` environment variable to point to your config directory.

## Offline mode FAQs

### Does the proxy send any metrics while in offline mode?

No. When running in offline mode the proxy doesn't make any external network requests.

### Can I hot-load a new configuration in during runtime?

No. On startup the Relay Proxy moves all the config from disk to the cache of choice (in memory or Redis), and from then on uses only the cache data to serve connected SDKs. Changing the content of the `/config` directory during runtime has no impact. Only a restart will pick up the new configuration.

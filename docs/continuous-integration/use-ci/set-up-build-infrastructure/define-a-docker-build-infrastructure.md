---
title: Define a Local Build Infrastructure
description: You can define a CI build infrastructure on Linux, Windows and macOS machines. This is the simplest way to run self-hosted builds.
sidebar_position: 15
helpdocs_topic_id: xd8u17be5h
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: false
helpdocs_is_published: true
---

With the Local runner (also known as the Docker runner) you can run builds on self-hosted Linux, Windows, and macOS machines. This allows you to re-use machines that you run builds on. If Docker Engine is available, you can choose whether to execute build steps directly on the host machine or in Docker containers.



### Important Notes

* To set up a local build environment, you must run a Docker Compose file that installs a Harness Delegate and the Local runner.
* The Docker Delegate has the following system requirements:
	+ Default 0.5 CPU.
	+ Default 1.5GB. Ensure that you provide the minimum memory for the Delegate and enough memory for the host/node system.
* The Docker Delegate is limited by the total amount of memory and CPU on the local host. Builds can fail if the host runs out of CPU or memory when running multiple builds.

### Install the Delegate

1. in the Harness UI, go to the screen that corresponds to the scope of your delegate: **Account Settings,** **Account Settings > Organizations**, or **Project Setup**.
2. Click **New Delegate**, then select **Docker** for the delegate type and click **Continue**.
3. Enter a delegate name and click **Continue**.
4. Download the **docker-compose.yml** file that appears.
5. Click **Continue**.   
The UI shows the delegate as not connected. This is expected behavior. You need to complete this workflow to establish connectivity between the delegate and your instance.
6. Update the **docker-compose.yml** file you just downloaded as follows:
	1. For `DELEGATE TAGS=`, specify one of the following: `macos-amd64` | `windows-amd64` | `linux-amd64`
	2. *MacOS only —* Add this setting to the `environment` list:  
	`- RUNNER_URL=`[`http://host.docker.internal:3000`](http://host.docker.internal:3000/)
	3. *Linux only —* Add the following line immediately after `restart: unless-stopped"`:  
	`network_mode: "host"`
7. To start the delegate, cd to the folder where you downloaded the docker-compose file and then enter:  
 `docker-compose -f <`*`updated-docker-compose.yml`*`> up -d`
8. Download a Drone Runner executable from <https://github.com/harness/drone-docker-runner/releases> .
9. Enable execution permissions for the Runner. For example, on MacOS you can run the command `sudo` `chmod +x` `drone-docker-runner-darwin-amd64`.
10. Start the runner binary:
	1. On MacOS, run `./drone-docker-runner-darwin-amd64 server`
	2. On Linux, run as sudo: `sudo ./drone-docker-runner-darwin-amd64 server`
11. Go back to the Delegates page where you created the new delegate. The delegate should appear as connected. This might take a few minutes.

### Update the Pipeline

Update the pipeline where you want to use the Docker delegate:

1. Switch to the YAML view.
2. Replace the `stages : stage : spec : infrastructure` section for the Build stage as follows.
  :::note 
	This step is critical and is only possible in the YAML editor. You cannot do this step in the UI.
	:::
	1. For the `os:` field, specify `Linux` | `MacOS` | `Windows`.
	2. For the `arch:` field, specify `Amd64`.

#### `infrastructure` Field (*before*)


```
- stage:  
        ...  
        spec:  
          ...  
          infrastructure:  
            ...  

```
#### `platform` and `runtime` Fields (*after, Linux example*)


```
- stage:  
        ...  
        spec:  
          ...  
          platform:  
            os: Linux  
            arch: Amd64  
          runtime:  
            type: Docker  
            spec: {}  
           ...  

```
### Troubleshooting

The delegate should connect to your instance after you finish the install workflow above. 

If the delegate does not connect after a few minutes, run the following commands to check the status:

* `docker ps`
* `docker logs --follow <`*`docker-delegate-container-id`*`>`

The container id should be the one with image name `harness/delegate:latest`. 

If you see a message like the following, the setup should be successful:

* `Finished downloading delegate jar version 1.0.77221-000 in 168 seconds`


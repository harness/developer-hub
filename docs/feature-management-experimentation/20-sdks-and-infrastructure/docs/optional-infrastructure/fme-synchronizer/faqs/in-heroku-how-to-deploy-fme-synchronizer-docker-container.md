---
title: In Heroku, how to deploy Split Synchronizer Docker container?
sidebar_label: In Heroku, how to deploy Split Synchronizer Docker container?
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360033291832-How-to-deploy-Synchronizer-Docker-container-in-Heroku </button>
</p>

## Question

How to deploy Synchronizer Docker Container in heroku environment?

## Answer

Follow the steps below to deploy Synchronizer container in heroku

1. Download the Synchronizer source code from the [git repository](https://github.com/splitio/split-synchronizer).

2. Unzip the source code in a new folder (for example: mysync), then open terminal and cd to the folder. Run the command `heroku create`. This will create the heroku application, you will see a response similar to this:
```
Creating app... done, ⬢ secret-anchorage-16496
https://secret-anchorage-16496.herokuapp.com/ | https://git.heroku.com/secret-anchorage-16496.git
```

3. The next step is to set the image as container, then add the go language pack.
```
heroku stack:set container
heroku buildpacks:set heroku/go
```

4. Open the existing Dockerfile and replace the last line
```
ENTRYPOINT ["sh", "./entrypoint.sh"]
```
with
```
CMD ["sh", "./entrypoint.sh"]
```
This is due to heroku supporting CMD only.

5. Create new file named `heroku.yml` with the content below:
```
build:
 docker:
 web: Dockerfile
 worker:
 dockerfile: Dockerfile
 ```

6. Create new file name Procfile with the content below:
```
worker: sh entrypoint.sh
```

7. To add the Docker environment variables, open the heroku.com page and click on your new app, click on "Settings" tab and add the environment variables below:
```
SPLIT_SYNC_API_KEY
SPLIT_SYNC_REDIS_HOST
SPLIT_SYNC_REDIS_PORT
SPLIT_SYNC_REDIS_DB
SPLIT_SYNC_REDIS_PASS
```

8. To expose the Admin dashboard, we need to map it to the $PORT environment variable set by heroku, and overwrite the existing port used by synchronizer. Open the `entrypoint.sh` file and replace this line at the end:
```
exec split-sync ${PARAMETERS}
```
With:
```
exec split-sync ${PARAMETERS} -sync-admin-port $PORT
```

9. Run the git commands below to push the image:
```
git init
git add .
git commit
git push heroku master
```

10. Once the push is finished successfully, run the command `heroku logs` to verify if the synchronizer is running successfully. You should see content like below:
```
2019-09-11T19:53:06.954882+00:00 app[worker.1]: __      ____        _ _ _
2019-09-11T19:53:06.954887+00:00 app[worker.1]: / /__   / ___| _ __ | (_) |_
2019-09-11T19:53:06.954890+00:00 app[worker.1]: / / \ \  \___ \| '_ \| | | __|
2019-09-11T19:53:06.954891+00:00 app[worker.1]: \ \  \ \  ___) | |_) | | | |_
2019-09-11T19:53:06.954893+00:00 app[worker.1]: \_\ / / |____/| .__/|_|_|\__|
2019-09-11T19:53:06.954895+00:00 app[worker.1]: /_/        |_|
2019-09-11T19:53:06.954897+00:00 app[worker.1]: 
2019-09-11T19:53:06.954899+00:00 app[worker.1]: 
2019-09-11T19:53:06.954922+00:00 app[worker.1]: 
2019-09-11T19:53:06.954924+00:00 app[worker.1]: Split Synchronizer - Version: 2.5.1 (2178c61)
2019-09-11T19:53:06.955154+00:00 app[worker.1]: Log file: /tmp/split-agent.log
```

 11. You can also view the admin dashboard from the URL `https://[heroku app name].herokuapp.com/admin/dashboard`

:::info
When using Synchronizer as a proxy service, we have to assign the listener port to the $PORT environment variable created by heroku, which will be mapped to port 80 in heroku router. Follow the instructions below:

a. Open `entrypoint.sh` file and scroll to the end, replace the line:
```
exec split-sync ${PARAMETERS}
```
With:
```
exec split-sync ${PARAMETERS} -proxy-port $PORT
```

b. Deploy using web to open port 80 in heroku, change content of file Procfile with the content below:
```
web: sh entrypoint.sh
```

c. Add the following environment variables in heroku UI with:
```
SPLIT_SYNC_PROXY (value: on)
SPLIT_SYNC_PROXY_SDK_APIKEYS (value: any custom api key)
```

d. Push the new image using git:
```
git add .
git commit
git push heroku master
```

e. On the SDK side, (for example Java SDK) use the heroku app URL for the endpoint in the config object:
```java
SplitClientConfig config = SplitClientConfig.builder()
    .setBlockUntilReadyTimeout(5000)
    .endpoint("http://[heroku app name].herokuapp.com", "http://[heroku app name].herokuapp.com")
    .build();
try {
      splitFactory = SplitFactoryBuilder.build("custom api key", config);
      client = this.splitFactory.client();
      client.blockUntilReady();
} catch (Exception e) {
   System.out.print("Exception: "+e.getMessage());
}
```
Since the default heroku deployment allows mapping only one port, which is used for the proxy listener service, the admin dashboard page will be unaccessible.
:::
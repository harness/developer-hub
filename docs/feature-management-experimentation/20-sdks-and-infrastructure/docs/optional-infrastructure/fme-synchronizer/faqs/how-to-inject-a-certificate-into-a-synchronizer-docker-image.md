---
title: How to inject a certificate into a Synchronizer Docker image?
sidebar_label: How to inject a certificate into a Synchronizer Docker image?
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360048788451-How-to-inject-a-certificate-into-Synchronizer-Docker-image </button>
</p>

## Question

If the Synchronizer Docker container is running in a network that has a proxy using SSL for all traffic, the Synchronizer docker might not be able to authenticate the root certification, which will result in the error below when Synchronizer tries to connect to Split cloud to fetch the feature flags definitions:
```
SPLITIO-AGENT | ERROR: 2020/08/19 14:42:51 fetchdataforproxy.go:209: Error fetching split changes  Get https://sdk.split.io/api/splitChanges?since=-1: x509: certificate signed by unknown authority
```
To resolve this issue, we need to inject the root certificate into the docker image.

## Answer

To accomplish this task, we will rebuild the Synchronizer docker image following the steps below:

1. Download or clone the synchronizer public repo:
```
git clone https://github.com/splitio/split-synchronizer
```

2. The clone command will create new folder `split-synchronizer`, `cd` to the folder and copy all the certifications used for the internal proxy, for example below, the root cert is `root.crt`, intermediate is intermediate.crt and the actual proxy cert is `proxy.pem`.
```
cd split-synchronizer
cp [Path to your certs]/root.crt .
cp [Path to your certs]/intermediate.crt .
cp [Path to your certs]/proxy.pem
```

3. Open the file named `Dockerfile` located in `split-synchronizer` folder in any text editor and add these lines just before the `EXPOSE 3000 3010` line:
```
COPY root.crt /etc/ssl/certs/root.crt
COPY intermediate.crt /etc/ssl/certs/intermediate.crt
COPY proxy.pem /etc/ssl/certs/proxy.pem
RUN cat /etc/ssl/certs/root.crt >> /etc/ssl/certs/ca-certificates.crt 

EXPOSE 3000 3010
```

4. Save and close the file, now run the docker command below to build the new image:
```
docker build --tag split-sync:latest .
```

5. Once the image is built successfully, you can run it using the command below to confirm Synchronizer is running successfully, the `http_proxy` parameter is optional.
```
docker run --rm --name split-sync -p 3010:3010 --net="host"  -e SPLIT_SYNC_API_KEY="SDK API KEY" -e SPLIT_SYNC_LOG_STDOUT="on"  -e SPLIT_SYNC_LOG_DEBUG="true"  -e SPLIT_SYNC_LOG_VERBOSE="true"  -e SPLIT_SYNC_REDIS_HOST="Redis Host"  -e SPLIT_SYNC_REDIS_PORT=6379  -e http_proxy="https://[internal proxy host]" -e https_proxy="https://[internal proxy host]" split-sync
```
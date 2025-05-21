---
title: Import AutoStopping Proxy using API
description: Describes how to import an AutoStopping proxy using API.
# sidebar_position: 2
helpdocs_is_private: false
helpdocs_is_published: true
---

The Import Proxy feature helps organizations to take control of their proxy deployment. Rather than relying on the default auto-provisioned proxy, customers can deploy their own Proxy instance using a hardened custom Amazon Machine Image (AMI) and then import them into Harness CCM's Autostopping feature. s

## Steps to use

1. Log into Amazon EC2 portal and launch EC2 instance using hardened AMI.
2. In the "User Data" section, paste the cloud-init script provided by Harness


<details>
<summary><strong>Cloud-Init script for Ubuntu AMIs</strong></summary>

```json
Content-Type: multipart/mixed; boundary="//"
MIME-Version: 1.0

--//
Content-Type: text/cloud-config; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="cloud-config.txt"

#cloud-config
cloud_final_modules:

[scripts-user, always]
--//
Content-Type: text/x-shellscript; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="userdata.txt"

#!/bin/bash
set -e
set -o nounset
sudo su
apt update
apt install -y apt-transport-https gnupg2 curl lsb-release zip wget
rm -rf  /usr/share/keyrings/getenvoy-keyring.gpg
curl -sL 'https://deb.dl.getenvoy.io/public/gpg.8115BA8E629CC074.key' | sudo gpg --dearmor -o /usr/share/keyrings/getenvoy-keyring.gpg
echo a077cb587a1b622e03aa4bf2f3689de14658a9497a9af2c427bba5f4cc3c4723 /usr/share/keyrings/getenvoy-keyring.gpg | sha256sum --check
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/getenvoy-keyring.gpg] https://deb.dl.getenvoy.io/public/deb/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/getenvoy.list
apt update
wget -O /usr/bin/envoy https://github.com/envoyproxy/envoy/releases/download/v1.31.0/envoy-1.31.0-linux-x86_64 
chmod +x /usr/bin/envoy

mkdir -p /var/lw_proxy/
echo 'accessPointID=""
apiURL="<REPLACE_YOUR_HARNESS_URL_HERE(ex:https://app.harness.io/lw/api)>"
proxyPort=8093
usageTrackingPort=8094
authToken="<REPLACE_YOUR_API_TOKEN_HERE>"
accountID="<REPLACE_YOUR_ACCOUNID_HERE>"' > /var/lw_proxy/config.toml
wget -O /var/lw_proxy/envoy.zip "https://lightwing-downloads-temp.s3.ap-south-1.amazonaws.com/autostopping-custom-lb-3.1.0.zip"
unzip -o /var/lw_proxy/envoy.zip -d /var/lw_proxy
chmod +x /var/lw_proxy/envoyproxymanager
wget -O /var/lw_proxy/tcp_proxy.zip "https://lightwing-downloads-temp.s3.ap-south-1.amazonaws.com/autostopping-tcp-proxy-3.3.zip"
unzip -o /var/lw_proxy/tcp_proxy.zip -d /var/lw_proxy
chmod +x /var/lw_proxy/tcpproxymanager
cp /var/lw_proxy/envoy.service /etc/systemd/system/envoy.service
cp /var/lw_proxy/lw_proxy.service /etc/systemd/system/lw_proxy.service
cp /var/lw_proxy/lw_tcp_proxy.service /etc/systemd/system/lw_tcp_proxy.service
systemctl daemon-reload
sudo systemctl enable envoy.service
sudo systemctl enable lw_proxy.service
sudo systemctl enable lw_tcp_proxy.service
systemctl start envoy.service
systemctl start lw_proxy.service
systemctl start lw_tcp_proxy.service
--//--
```
</details>


<details>
<summary><strong>Cloud-init script for Amazon Linux AMI</strong></summary>

```json
Content-Type: multipart/mixed; boundary="==BOUNDARY=="
MIME-Version: 1.0

--==BOUNDARY==
Content-Type: text/cloud-config; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="cloud-config.txt"

#cloud-config
cloud_final_modules:
 - [scripts-user, always]

--==BOUNDARY==
Content-Type: text/x-shellscript; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="userdata.txt"

#!/bin/bash
set -e
set -o nounset

LOG_FILE="/var/log/user-data.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo ">>> Updating packages..."
yum update -y

echo ">>> Installing required packages with replacement..."
dnf install -y curl gnupg2 unzip wget --allowerasing

echo ">>> Downloading Envoy..."
wget -O /usr/bin/envoy https://github.com/envoyproxy/envoy/releases/download/v1.31.0/envoy-1.31.0-linux-x86_64
chmod +x /usr/bin/envoy

echo ">>> Setting up Lightwing proxy config..."
mkdir -p /var/lw_proxy/
cat <<EOF > /var/lw_proxy/config.toml
accessPointID=""
apiURL="<REPLACE_YOUR_HARNESS_URL_HERE(ex:https://app.harness.io/lw/api)>"
proxyPort=8093
usageTrackingPort=8094
authToken="<REPLACE_YOUR_API_TOKEN_HERE>"
accountID="<REPLACE_YOUR_ACCOUNID_HERE>"
EOF

echo ">>> Downloading and installing Lightwing proxy components..."
wget -O /var/lw_proxy/envoy.zip "https://lightwing-downloads-temp.s3.ap-south-1.amazonaws.com/autostopping-custom-lb-3.1.0.zip"
unzip -o /var/lw_proxy/envoy.zip -d /var/lw_proxy
chmod +x /var/lw_proxy/envoyproxymanager

wget -O /var/lw_proxy/tcp_proxy.zip "https://lightwing-downloads-temp.s3.ap-south-1.amazonaws.com/autostopping-tcp-proxy-3.3.zip"
unzip -o /var/lw_proxy/tcp_proxy.zip -d /var/lw_proxy
chmod +x /var/lw_proxy/tcpproxymanager

echo ">>> Setting up systemd services..."
cp /var/lw_proxy/envoy.service /etc/systemd/system/envoy.service
cp /var/lw_proxy/lw_proxy.service /etc/systemd/system/lw_proxy.service
cp /var/lw_proxy/lw_tcp_proxy.service /etc/systemd/system/lw_tcp_proxy.service

systemctl daemon-reload
systemctl enable envoy.service
systemctl enable lw_proxy.service
systemctl enable lw_tcp_proxy.service
systemctl start envoy.service
systemctl start lw_proxy.service
systemctl start lw_tcp_proxy.service

echo ">>> Setup complete."


--==BOUNDARY==--
```
</details>

3. Post this, connect to your instance and upon successful connection, the proxy will show on the home page of Load Balancer Manager in AutoStopping.


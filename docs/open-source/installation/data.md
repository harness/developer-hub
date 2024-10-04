---
sidebar_position: 3
---

# How to manage Data

Harness Open Source writes data beneath `/data` within the running container. It is important to understand where this data is written on the host, to avoid any potential data loss.

When running Harness Open Source locally, it is highly recommended to use a [bind mount](https://docs.docker.com/storage/bind-mounts/) or [named volume](https://docs.docker.com/storage/volumes/) to avoid potential data loss during system upgrades or reboots.

When running a shared Harness Open Source instance for a development team, you should take extra steps to protect the Harness Open Source instance data.

## Local instance

On MacOS or Linux, create a `harness` directory in a safe location:

```bash
mkdir $HOME/harness
```

Then pass `-v $HOME/harness:/data` in your `docker run` command.

```sh {4} showLineNumbers
docker run -d \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $HOME/harness:/data \
  --name harness \
  --restart always \
  harness/harness
```

Harness Open Source will now store its data beneath the `harness` directory in your [home directory](https://en.wikipedia.org/wiki/Home_directory).

## AWS EC2

Create a separate volume just for your Harness Open Source instance data. Ensure the volume is an appropriate size for your team and number of repositories.

Create an [EBS volume](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html) for your Harness Open Source instance data and mount it at `/mnt/harness-data`, then pass `-v /mnt/harness-data:/data` in your `docker run` command.

```sh {4} showLineNumbers
docker run -d \
  -p 3000:3000 -p 3022:3022 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /mnt/harness-data:/data \
  --name harness \
  --restart always \
  harness/harness
```

Harness Open Source will now store its data beneath `/mnt/harness-data` on your EC2 instance.

:::tip

Back up your Harness Open Source instance EBS volume with automated [snapshots](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSSnapshots.html). If you need more space in the future, EBS volumes can be [expanded](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html).

:::

## Kubernetes

The Harness Open Source [Helm chart](https://github.com/harness/harness/tree/main/charts/gitness) will create a [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) for the Harness Open Source container's `/data` directory.

To learn how to manage this volume, contact your Kubernetes administrator. If you are using a managed Kubernetes service, refer to your provider's documentation.
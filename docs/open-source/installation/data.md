---
sidebar_position: 3
---

# How to manage Data

Harness Open Source writes data beneath `/data` within the running container. It is important to understand where this data is written on the host, to avoid any potential data loss.

When running Harness Open Source locally, it is highly recommended to use a [bind mount](https://docs.docker.com/storage/bind-mounts/) or [named volume](https://docs.docker.com/storage/volumes/) to avoid potential data loss during system upgrades or reboots.

When running a shared Harness Open Source instance for a development team, you should take extra steps to protect the Harness Open Source instance data.

## Local instance

On MacOS or Linux, create a `gitness` directory in a safe location:

```bash
mkdir $HOME/gitness
```

Then pass `-v $HOME/gitness:/data` in your `docker run` command.

```sh {4} showLineNumbers
docker run -d \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $HOME/gitness:/data \
  --name gitness \
  --restart always \
  harness/gitness
```

Harness Open Source will now store its data beneath the `gitness` directory in your [home directory](https://en.wikipedia.org/wiki/Home_directory).

## AWS EC2

Create a separate volume just for your Harness Open Source instance data. Ensure the volume is an appropriate size for your team and number of repositories.

Create an [EBS volume](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html) for your Harness Open Source instance data and mount it at `/mnt/gitness-data`, then pass `-v /mnt/gitness-data:/data` in your `docker run` command.

```sh {4} showLineNumbers
docker run -d \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /mnt/gitness-data:/data \
  --name gitness \
  --restart always \
  harness/gitness
```

Harness Open Source will now store its data beneath `/mnt/gitness-data` on your EC2 instance.

:::tip

Back up your Harness Open Source instance EBS volume with automated [snapshots](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSSnapshots.html). If you need more space in the future, EBS volumes can be [expanded](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html).

:::

## Kubernetes

The Harness Open Source [Helm chart](https://github.com/harness/gitness/tree/main/charts/gitness) will create a [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) for the Harness Open Source container's `/data` directory.

To learn how to manage this volume, contact your Kubernetes administrator. If you are using a managed Kubernetes service, refer to your provider's documentation.
---
title: Upgrading an EKS Cluster
---

## Introduction
EKS clusters can be upgraded directly from the AWS cluster to upgrade the master.  Below is some information about how to go about making those changes to your environment and some considerations to make before doing so

## Prerequisites
Before updating the Control plane, check the version of your Kubernetes cluster and worker node.  If your worker node version is older than your current Kubernetes version, then you must update your worker node first then only proceed with updating your control plane.
Check Kubernetes Control Plane version and worker node from the following command:
```kubectl version --short```
```kubectl get nodes```
This will give you the node(s) and their version.
Since Pod Security Policy(PSP) admission controller is enabled by default from 1.13 and later versions of Kubernetes, we need to make sure that proper pod security policy is in place, before updating the Kubernetes version on the Control Plane.
Check the default security policy using the command below:
```kubectl get psp eks.privileged```
If you get any server error, then you must install PSP.
Make sure to read and understand the following AWS documentation on best practices:[Planning Kubernetes Upgrades with Amazon EKS](https://aws.amazon.com/blogs/containers/planning-kubernetes-upgrades-with-amazon-eks/)[Amazon EKS - Updating a Cluster](https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html)
Please also note that there may also be documented changes from Kubernetes to be aware of.  For example, the following documentation from Kubernetes outlines a potential issue for those upgrading to v1.21 when using HashiCorp Vault[https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#service-account-issuer-discovery](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#service-account-issuer-discovery)
Note: When the master goes down for the upgrade, deployments, services, etc. continue to work as expected. However, anything that requires the Kubernetes API stops working. This means ```kubectl``` stops working, applications that use the Kubernetes API to get information about the cluster stop working, and basically, you can’t make any changes to the cluster while it is being upgraded.
 

## Instructions
### Upgrade Master
This can be achieved directly from AWS console, under ```EKS``` section. There’s a ```Upgrade cluster version``` button that can be used to upgrade the master.
If you are using Terraform scripts for managing your cluster, the [version](https://www.terraform.io/docs/providers/aws/r/eks_cluster.html#version) can be specified in ```aws_eks_cluster``` resource:
```
resource "aws_eks_cluster" "aws-eks" {
  name     = "${var.cluster-name}"
  role_arn = "${aws_iam_role.aws-eks-cluster.arn}"
  
  version  = "${var.cluster-master-version}"

  vpc_config {
    security_group_ids = ["${aws_security_group.aws-eks-cluster.id}"]
    subnet_ids         = ["${aws_subnet.aws-eks-subnet-1.id}", "${aws_subnet.aws-eks-subnet-2.id}"]
  }

  depends_on = [
    "aws_iam_role_policy_attachment.aws-eks-cluster-AmazonEKSClusterPolicy",
    "aws_iam_role_policy_attachment.aws-eks-cluster-AmazonEKSServicePolicy",
    "aws_iam_role.aws-eks-cluster"
  ]
}
```

*Effect: Doing this will only upgrade the master, but EKS worker nodes will not be affected and will continue running normally.*

### Upgrade EKS Worker Nodes
In this step you actually change the AMI used for the worker nodes in EKS launch configuration, and then double the number of nodes in the cluster in their Auto Scaling Group configuration. If the original cluster had 3 nodes, you increase that to 6 nodes:
If you are using Terraform scripts, these settings are available under [image_id](https://www.terraform.io/docs/providers/aws/r/launch_configuration.html#image_id) of ```aws_launch_configuration``` resource:
````
resource "aws_launch_configuration" "aws-eks" {
  associate_public_ip_address = false
  iam_instance_profile        = "${aws_iam_instance_profile.aws-eks-node.name}"
  image_id                    = "${data.aws_ami.eks-worker.id}"
  instance_type               = "${var.ec2-instance-type}"
  name_prefix                 = "${var.cluster-name}-node"
  security_groups             = ["${aws_security_group.aws-eks-node.id}"]
  user_data_base64            = "${base64encode(local.aws-eks-node-userdata)}"

  lifecycle {
    create_before_destroy = true
  }

  root_block_device {
    volume_size = "50"
  }
}
````

And Auto Scaling Group size is available under [max_size and desired_capacity](https://www.terraform.io/docs/providers/aws/r/autoscaling_group.html#desired_capacity) of ```aws_autoscaling_group``` resource:
````
resource "aws_autoscaling_group" "aws-eks" {
  desired_capacity     = "${var.desired-ec2-instances}"
  launch_configuration = "${aws_launch_configuration.aws-eks.id}"
  max_size             = "${var.max-ec2-instances}" 
  min_size             = "${var.min-ec2-instances}" 
  name                 = "${var.cluster-name}-asg"
  vpc_zone_identifier  = ["${aws_subnet.aws-eks-subnet-1.id}", "${aws_subnet.aws-eks-subnet-2.id}"]

  tag {
    key                 = "Name"
    value               = "${var.cluster-name}"
    propagate_at_launch = true
  }

  tag {
    key                 = "kubernetes.io/cluster/${var.cluster-name}"
    value               = "owned"
    propagate_at_launch = true
  }

  depends_on = ["aws_eks_cluster.aws-eks"]

}
````
*Effect: Cluster size will be doubled, new worker nodes will be created with the new version, and old worker nodes will still be running and available with the old version.*
 
### Scale Down Auto Scaling Group
After the new nodes are correctly registered and available in kubernetes, it’s time to decrease the Auto Scaling Group to its original size.
*Effect: All pods in the old nodes will be automatically moved to the new nodes by kubernetes.* After Spinnaker pods are restarted, you should be able to continue using Spinnaker as usual.


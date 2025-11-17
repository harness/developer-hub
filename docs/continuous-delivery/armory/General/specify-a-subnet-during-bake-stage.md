---
title: Specify a Subnet During Bake Stage
---


There may be occasions where it’s useful to specify the subnet used in your Bake stage. Targeting a specific subnet can ensure your [Packer Builders](https://www.packer.io/docs/builders/index.html) (which Spinnaker relies on for baking images) are assigned a subnet which meets the requirements of the network (e.g. a subnet which does not auto-assign a public IP).
Specifying a subnet is handled through the ```Extended Attributes``` of the Bake stage’s Bake Configuration. You will need to know the ```id``` of your subnet and associate it with the ```aws_subnet_id``` key.


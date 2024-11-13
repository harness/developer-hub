---
title: Terraform 'Invalid character' Error
---

## Issue
When executing a Terraform Pipeline, the following error can occur upon execution.  This error can be found in the Deck UI when investigating the failure, in the ```Source``` portion of the ```Execution Details```
Example error:
Error: Invalid character 
on ses.tf line 57, in resource "aws_iam_role_policy_attachment" "eks_workers_send_email": 57: role = data.terraform_remote_state.eks.outputs.eks_cluster.worker_iam_role.name 
This character is not used within the language. 

Error: Missing newline after argument 
on ses.tf line 57, in resource "aws_iam_role_policy_attachment" "eks_workers_send_email": 57: role = data.terraform_remote_state.eks.outputs.eks_cluster.worker_iam_role.name 
An argument definition must end with a newline.

## Cause
2 potential causes:
* This can be due to a ```string limit error``` (e.g. it tries to load it from ```http```, store in a string, write to file, and hits a limit, for example, a character limit)* Bug where multiple references to one resource are not working correctly
**Note: **Issue is being investigated by our Engineering team.  If you are also encountering the same issue, please open a ticket so that we can associate it with the same open investigation


#### I am getting "Backend not initialised error" when running terragrunt plan with specific module?

When dealing with specific modules, we don't initiate terraform init directly; instead, we use the terragrunt terragrunt-info command. 
To initialize the backend properly, you need to run terraform init, and this initialization process is triggered automatically when you select the "All modules" option.


#### How do resolve terragrunt plan returning the error "fork/exec /usr/bin/terraform: argument list too long"

the "argument list too long" error is typically related to how you are passing variables and configurations to Terraform and Terragrunt. By using configuration files, and reducing the number of arguments you can resolve this issue. 
 
The same can be referred [here] (https://github.com/gruntwork-io/terragrunt/issues/2132)


#### Does Harness supports multiple IaC provisioners?

Harness does support multiple Iac provisioners, few examples are terraform, terragrunt, cloud formation, shell script provisioning etc. 




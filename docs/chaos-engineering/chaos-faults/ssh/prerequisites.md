---
id: prerequisites
title: Prerequisites
---

Before executing the chaos experiment, ensure that you have the following set-up ready.

### 1. Create ConfigMap from scripts
The scripts used to create ConfigMap are **Chaos script** and **Abort script**. 
**Chaos script** contains the chaos logic, and **abort script** contains the logic to restore the system to its original state if the chaos script fails prematurely.

a. To create the ConfigMap from the chaos scripts, use the following command:
```
kubectl create configmap chaos-script --from-file=script.sh -n <INFRA-NAMESPACE>
```
Here, `chaos-script` is the name of the ConfigMap for chaos script, `script.sh` is the bash script that contains the chaos logic, and `<INFRA-NAMESPACE>` is the namespace where the chaos infrastructure is installed. 

b. To create the ConfigMap from the abort script, use the following command:
```
kubectl create configmap abort-script --from-file=abort-script.sh -n<INFRA-NAMESPACE>
```
Here, `abort-script` is the name of the ConfigMap for abort script, and `abort-script.sh` is the bash script that contains the abort logic. 

:::tip
After executing both commands, verify if the ConfigMaps have been created using the following command:
```
kubectl get configmap -n <INFRA-NAMESPACE>
```
If the names of the configmaps appear, this indicates the successful creation of the ConfigMaps. 
:::

### 2. Create a secret for SSH
You can create a secret for SSH in two ways:

1. Using a private key
If you use a private key file for SSH access to the target host or VM, prepare the secret as shown:
```
kubectl create secret generic ssh-secret --from-file=key-file.pem -n<INFRA-NAMESPACE>
```
Here, `ssh-secret` is the name of the secret, and `key-file.pem` is the private key for SSH access.

:::tip
To verify if the secret has been created, execute the following command and identify the value for `ssh-secret`.
```
kubectl get secret -n <INFRA-NAMESPACE>
```
:::

2. Using a password
If you use a password for SSH access, provide the value for PASSWORD environment variable while tuning the fault.
For secure password transmission, create a secret with the password and pass it as the environment variable, as mentioned below.
  * Create a file named `my-secret.yaml`, with the below content.

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: my-secret
    type: Opaque
    stringData:
      password: "mypassword"
    ```
  The key is `password` and the value is the actual password string `mypassword`.
    
  * Apply the secret to the specific namespace using the following command:
    ```
    kubectl apply -f my-secret.yaml -n <INFRA-NAMESPACE>
    ```
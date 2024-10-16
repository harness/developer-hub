---
title: Missing file in rosco image got Exception (Create Bake)
---

## Issue
Spinnaker is open-source and can be customized by anyone.
One scenario is a customer customized Spinnaker and upgraded from version 2.27.x to 2.28.0. When running Bake (MANIFEST) stage, an exception shows:
Exception (Create Bake)
Bake failed: Execution failed (Exit value: -559038737. Caused by java.io.IOException: Cannot run program "kustomize" (in directory "."): error=13, Permission denied)

 

## Cause
This exception shows a permission denied, but the root reason is that the ```kustomize``` tool is not in the rosco container.
 
**How to check:**
 
1. Acccess into spin-rosco container, for example:
```kubectl exec -it spin-rosco-7c6d6444c8-t6w5h -- sh```
In the spin-rosco container, you will be directed to the directory ```/packer```.
```/packer $```
Under ```/packer``` directory, there are ```packer``` tool and directory ```kustimize```
 
2. Check what inside ```/packer``` directory
/packer $``` ls -lart```

total 124000
-rwxr-xr-x    1 spinnake nogroup  126976000 Jul 11 18:17 packer
drwxr-xr-x    1 spinnake nogroup         23 Jul 11 18:17 kustomize
drwxr-xr-x    1 spinnake nogroup         37 Jul 11 18:17 .
drwxr-xr-x    1 root     root            51 Nov  4 19:23 ..
/packer $


 
3. Access into directory ```kustimize```, you suppose be able to see the ```kustimize``` tool.

/packer $ cd kustomize/
/packer/kustomize $ ls -lart
total 33076
-rwxr-xr-x    1 spinnake nogroup   33869824 Oct  8  2020 kustomize
drwxr-xr-x    1 spinnake nogroup         37 Jul 11 18:17 ..
drwxr-xr-x    1 spinnake nogroup         23 Jul 11 18:17 .
/packer/kustomize $


 
In the above failure case's spin-rosco container, there were no directory ```kustimize``` and  ```kustimize``` tool showed.


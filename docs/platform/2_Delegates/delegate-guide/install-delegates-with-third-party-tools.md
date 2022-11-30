---
title: Install delegates with third-party tools
description: Harness Manager installs and configures delegates with the binaries that most CI/CD pipelines require. In some cases, however, you might want to add tools to the delegate image or create your own del…
# sidebar_position: 2
helpdocs_topic_id: x0i1ydkv34
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Manager installs and configures delegates with the binaries that most CI/CD pipelines require. In some cases, however, you might want to add tools to the delegate image or create your own delegate and customize the tool set for your builds and deployments. This document describes methods you can use to install third-party tools on the delegate image at runtime. 

For basic information about Harness Delegate, see [Delegate Overview](../delegates-overview.md). 

### Considerations

Consider the following in your choice of approach:

How the delegate detects the client tool binary:

* `$PATH` environment variable
* Repository index file

How client tool binaries are moved to the delegate container:

* `emptyDir` volume mount with initialization container
* Permanent volume mount
* Docker tools Image with shared volume
* Custom delegate image

### $PATH environment variable

The easiest way to install a single version of a binary on an image is to combine the use of the Linux `$PATH` and `INIT_SCRIPT` environment variables. This approach supports most use cases. The use of the `$PATH` environment variable also solves the problem of how the delegate detects available tools.

#### Process

The process is simple and includes two basic steps:

* Define the `$PATH` environment variable to specify the locations and filenames of custom tools.
* Define the `INIT_SCRIPT` environment variable to export the `$PATH` location of the binary you want to install.

#### Cost

This approach limits you to the use of one version of each software package.

#### Benefit

This approach is easily implemented in YAML.

### emptyDir volume mount with INIT container

The easiest way to install multiple versions of a binary on an image is to transfer custom tools from an initialization (`INIT`) container. This strategy is ideal for large deployments that implement complex use cases. 

#### Process

To implement this solution, modify the harness-delegate.yaml file to allow the following operations:

* Mount an `emptyDir` volume to the delegate container.
* Download tools to the target path from an `INIT` container.

#### Cost

This approach delays delegate startup. The delegate cannot run until the `INIT` container completes the download process.

#### Benefit

You can implement this approach without additional resources like permanent storage. 

### Modify the harness-delegate.yaml file

In this approach, you modify the harness-delegate.yaml file with declarative definitions of the following Kubernetes objects: 

* `securityContext`
* `volumeMounts`
* `initContainers`
* `volumes`

This section explains how to modify the harness-delegate.yaml file.

#### Update the security context

Edit the delegate YAML to ensure that the files that the INIT container downloads files with the correct permissions. The `INIT` container must:

* Run with root user privileges.
* Share the security context of the running delegate user.

The following example shows the specification of the `securityContext.fsGroup` and `securityContext.runAsUser` values:


```
securityContext:  
 fsGroup: 1001  
 runAsUser: 1001
```
For more information about the fields of a pod security context, see the [Kubernetes API Reference](https://jamesdefabia.github.io/docs/api-reference/v1/definitions/#_v1_podsecuritycontext).

#### Add the emptyDir volume mount

Declare a volume mount and specify the mount path and name. The following example specifies the mounting of the `emptyDir` volume.


```
volumeMounts:  
- mountPath: /opt/harness-delegate/client-tools  
  name: client-tools
```
 

Mounting the volume at the default client tools location eliminates the need for further configuration.

You can alternately mount the volume to any directory and configure the delegate to discover the tools.

For more information on volume mounts, see [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/) in the [Kubernetes](https://kubernetes.io/docs/home/) documentation.

#### Add initialization containers

Declare one or more `INIT` containers. Each `INIT` container must mount the same `emptyDir` volume. 


```
      initContainers:  
      - name: install-kubectl  
        image: curlimages/curl  
        command: ['sh', '-c', "mkdir -m 777 -p /client-tools/kubectl/v1.13.2 \  
                                && curl -#s -L -o /client-tools/kubectl/v1.13.2/kubectl https://app.harness.io/public/shared/tools/kubectl/release/v1.13.2/bin/linux/amd64/kubectl \  
                                && chmod +x /client-tools/kubectl/v1.13.2/kubectl"]  
        args:  
          - chown 1001 /client-tools;  
        volumeMounts:  
        - mountPath: /client-tools  
          name: client-tools  
      - name: install-helm3  
        image: curlimages/curl  
        command: ['sh', '-c', "mkdir -m 777 -p /client-tools/helm/v3.8.0 \  
                                && curl -#s -L -o /client-tools/helm/v3.8.0/helm https://app.harness.io/public/shared/tools/helm/release/v3.8.0/bin/linux/amd64/helm \  
                                && chmod +x /client-tools/helm/v3.8.0/helm"]  
        args:  
          - chown 1001 /client-tools;  
        volumeMounts:  
        - mountPath: /client-tools  
          name: client-tools
```
#### Define the emptyDir shared volume

Define the `emptyDir` volume that the `INIT` containers share. The `emptyDir` type volume is ephemeral and is destroyed with its pod.


```
      volumes:  
      - name: client-tools  
        emptyDir: {}
```
For more information about the Kubernetes emptyDir volume, see [emptyDir](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir). 

#### Example

The following example includes a segment of the delegate YAML file that contains the required changes. For the complete file, see the sample [harness-delegate.yaml](../delegate-reference/example-harness-delegate-yaml.md) in the *Delegate Reference*.


```
      ...  
      # Update the security context to match delegate running user.   
      # This provides downloaded files with the correct permissions.   
      # Running the INIT container with root permissions should also be okay.  
      securityContext:  
        fsGroup: 1001  
        runAsUser: 1001  
      ...  
      # Mount a shared emptyDir volume from below. Here it's mounted to the default client tools location to avoid additional configuration.  
      # Or you can mount it to any directory and configure the delegate to discover the tools.  
        volumeMounts:  
        - mountPath: /opt/harness-delegate/client-tools  
          name: client-tools  
      ...  
      # Add one or more INIT containers with the same emptyDir volume mounted  
      initContainers:  
      - name: install-kubectl  
        image: curlimages/curl  
        command: ['sh', '-c', "mkdir -m 777 -p /client-tools/kubectl/v1.13.2 \  
                                && curl -#s -L -o /client-tools/kubectl/v1.13.2/kubectl https://app.harness.io/public/shared/tools/kubectl/release/v1.13.2/bin/linux/amd64/kubectl \  
                                && chmod +x /client-tools/kubectl/v1.13.2/kubectl"]  
        args:  
          - chown 1001 /client-tools;  
        volumeMounts:  
        - mountPath: /client-tools  
          name: client-tools  
      - name: install-helm3  
        image: curlimages/curl  
        command: ['sh', '-c', "mkdir -m 777 -p /client-tools/helm/v3.8.0 \  
                                && curl -#s -L -o /client-tools/helm/v3.8.0/helm https://app.harness.io/public/shared/tools/helm/release/v3.8.0/bin/linux/amd64/helm \  
                                && chmod +x /client-tools/helm/v3.8.0/helm"]  
        args:  
          - chown 1001 /client-tools;  
        volumeMounts:  
        - mountPath: /client-tools  
          name: client-tools  
      ...  
      # Define the emptyDir shared volume.  
      volumes:  
      - name: client-tools  
        emptyDir: {}
```
 

### Mount a permanent volume

If you prefer to store your client tools apart from the delegate, try mounting a permanent volume to the delegate container. 

#### Process

* Create a permanent volume
* Mount the volume to the delegate

#### Cost

This approach is complex because it requires the allocation of a permanent store.

#### Benefit

You can download and install client tools without adding to delegate start time. Moreover,  you can replace or update tools during delegate runtime. You might also be able to update tools without restarting the delegate. A permanent volume mount is also a “one-and-done” approach; you can mount the installed volume to multiple delegates. 

#### Example

There are many ways to implement this approach. The following YAML declares a permanent volume mount for NFS storage.


```
volumeMounts:  
- mountPath: "/opt/harness-delegate/client-tools"  
  name: nfs  
volumes:  
- name: nfs  
  persistentVolumeClaim:  
   claimName: nfs-ng
```
     

For sample YAML files for NFS servers, volumes, and for a full harness-delegate.yaml file that includes a mounted NFS volume, see the *Delegate Reference*.

### Docker tools image with shared volume

This approach is less flexible than mounting a permanent volume but it is also easier to implement. This approach works best in cases in which you create an image using a stable set of client tools. You can then use a shared volume to give the delegate container access.

### Custom delegate image

This approach is preferable in cases where you’re already creating your own delegate images. You build the tools you need into your custom image. The drawback to this approach is that it does not support delegate auto-update.


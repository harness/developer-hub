---
title: Sample - Create a permanent volume - NFS server
description: This Kubernetes manifest creates a permanent volume for NFS. apiVersion --  apps/v1 kind --  Deployment metadata --  name --  nfs-server spec --  replicas --  1 selector --  matchLabels --  role --  nfs-server template --  metada…
# sidebar_position: 2
helpdocs_topic_id: 3onmos2n3v
helpdocs_category_id: vm60533pvt
helpdocs_is_private: false
helpdocs_is_published: true
---

This Kubernetes manifest creates a permanent volume for NFS. 


```
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: nfs-server  
spec:  
  replicas: 1  
  selector:  
    matchLabels:  
      role: nfs-server  
  template:  
    metadata:  
      labels:  
        role: nfs-server  
    spec:  
      containers:  
      - name: nfs-server  
        image: k8s.gcr.io/volume-nfs:0.8  
        ports:  
          - name: nfs  
            containerPort: 2049  
          - name: mountd  
            containerPort: 20048  
          - name: rpcbind  
            containerPort: 111  
        securityContext:  
          privileged: true  
        volumeMounts:  
          - mountPath: /exports  
            name: markom-pvc  
      volumes:  
        - name: markom-pvc  
          persistentVolumeClaim:  
            claimName: nfs-pv-markom  
  
---  
  
kind: Service  
apiVersion: v1  
metadata:  
  name: nfs-server  
spec:  
  ports:  
    - name: nfs  
      port: 2049  
    - name: mountd  
      port: 20048  
    - name: rpcbind  
      port: 111  
  selector:  
    role: nfs-server  
  
---  
  
apiVersion: v1  
kind: PersistentVolumeClaim  
metadata:  
  name: nfs-pv-markom  
  labels:  
    demo: nfs-pv-provisioning  
spec:  
  accessModes: [ "ReadWriteOnce" ]  
  resources:  
    requests:  
      storage: 1Gi  

```

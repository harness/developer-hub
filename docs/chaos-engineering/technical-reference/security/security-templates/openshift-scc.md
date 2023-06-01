---
title: Openshift
sidebar_position: 1
---
## OpenShift Security Context Constraint (SCC)

Security context constraints allow administrators to control permissions for pods in a cluster. A service account provides an identity for processes that run in a pod.
The <code>default</code> service account is used to run applications within a project. You can run other applications in the same project, but if you don't necessarily want to override the privileges used for all applications, create a new service account that can be granted the special rights in the project where the application is to be run. 
For example run `install litmus-admin service account`.

```bash
$ oc apply -f https://litmuschaos.github.io/litmus/litmus-admin-rbac.yaml

serviceaccount/litmus-admin created
clusterrole.rbac.authorization.k8s.io/litmus-admin created
clusterrolebinding.rbac.authorization.k8s.io/litmus-admin created

```

The next step is to run the service account as a cluster administrator. It is the granting of the appropriate rights to the service account. This is done by specifying that the service account should run with a specific security context constraint (SCC).

As an administrator, you can see the list of SCCs defined in the cluster by running the oc get scc command.

```bash
$ oc get scc --as system:admin

NAME               PRIV      CAPS      SELINUX     RUNASUSER          FSGROUP     SUPGROUP    PRIORITY   READONLYROOTFS   VOLUMES
anyuid             false     []        MustRunAs   RunAsAny           RunAsAny    RunAsAny    10         false            [configMap downwardAPI emptyDir persistentVolumeClaim projected secret]
hostaccess         false     []        MustRunAs   MustRunAsRange     MustRunAs   RunAsAny    <none>     false            [configMap downwardAPI emptyDir hostPath persistentVolumeClaim projected secret]
hostmount-anyuid   false     []        MustRunAs   RunAsAny           RunAsAny    RunAsAny    <none>     false            [configMap downwardAPI emptyDir hostPath nfs persistentVolumeClaim projected secret]
hostnetwork        false     []        MustRunAs   MustRunAsRange     MustRunAs   MustRunAs   <none>     false            [configMap downwardAPI emptyDir persistentVolumeClaim projected secret]
nonroot            false     []        MustRunAs   MustRunAsNonRoot   RunAsAny    RunAsAny    <none>     false            [configMap downwardAPI emptyDir persistentVolumeClaim projected secret]
privileged         true      [*]       RunAsAny    RunAsAny           RunAsAny    RunAsAny    <none>     false            [*]
restricted         false     []        MustRunAs   MustRunAsRange     MustRunAs   RunAsAny    <none>     false            [configMap downwardAPI emptyDir persistentVolumeClaim projected secret]
```

By default, applications would run under the <code>restricted</code> SCC. You can use the default SCC or create your own SCC to provide the CE experiment service account (here litmus-admin) to run all the experiments. Here is one such SCC that can be used:

[embedmd]:# (https://raw.githubusercontent.com/harness/developer-hub/ed4773f7428e593c93a0cf7aa5a31e6e9c8128f8/docs/chaos-engineering/static/overview/manifest/openshift-scc-policies/litmus-scc.yaml yaml)
```yaml
apiVersion: security.openshift.io/v1
kind: SecurityContextConstraints
# To mount the socket path directory in helper pod
allowHostDirVolumePlugin: true
allowHostIPC: false
allowHostNetwork: false
# To run fault injection on a target container using pid namespace.
# It is used in stress, network, dns and http experiments. 
allowHostPID: true
allowHostPorts: false
allowPrivilegeEscalation: true
# To run some privileged modules in dns, stress and network chaos
allowPrivilegedContainer: true
# NET_ADMIN & SYS_ADMIN: used in network chaos experiments to perform
# network operations (running tc command in network ns of target container). 
# SYS_ADMIN: used in stress chaos experiment to perform cgroup operations.
allowedCapabilities:
- 'NET_ADMIN'
- 'SYS_ADMIN'
defaultAddCapabilities: null
fsGroup:
  type: MustRunAs
groups: []
metadata:
  name: litmus-scc
priority: null
readOnlyRootFilesystem: false
requiredDropCapabilities: null
runAsUser:
  type: RunAsAny
seLinuxContext:
  type: MustRunAs
supplementalGroups:
  type: RunAsAny
users:
- system:serviceaccount:litmus:argo
volumes:
# To allow configmaps mounts on upload scripts or envs.
- configMap
# To derive the experiment pod name in the experimemnt.
- downwardAPI
# used for chaos injection like io chaos.
- emptyDir
- hostPath
- persistentVolumeClaim
- projected
# To authenticate with different cloud providers
- secret
```

Install the SCC:

```bash
$ oc create -f litmus-scc.yaml
securitycontextconstraints.security.openshift.io/litmus-scc created
```

Now to associate the new service account with the SCC, run the given command:

```bash
$ oc adm policy add-scc-to-user litmus-scc -z litmus-admin --as system:admin -n litmus
clusterrole.rbac.authorization.k8s.io/system:openshift:scc:litmus-scc added: "litmus-admin"
```

The <code>-z</code> option indicates to apply the command to the service account in the current project.
To <code>add-scc-to-user</code> add the name of SCC.
Provide the namespace of the target service account after <code>-n</code>.

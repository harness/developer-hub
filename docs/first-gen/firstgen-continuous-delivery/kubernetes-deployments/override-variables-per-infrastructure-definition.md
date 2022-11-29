---
title: Override Variables at the Infrastructure Definition Level
description: This topic describes how to override specific sets of variables for Kubernetes at the Infrastructure Definition level.
sidebar_position: 150
helpdocs_topic_id: cc59hfou9c
helpdocs_category_id: n03qfofd5w
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](/article/1fjmm4by22). Switch to [NextGen](/article/t57uzu1i41).This topic describes how to override specific sets of variables for Kubernetes at the Infrastructure Definition level. You can override the `values.yaml` in your Service at the Infrastructure level and different Services can have different overrides in the same namespace.

### Before You Begin

* Your target Environment must have multiple Infrastructure Definitions.
* You must have a Service that needs to be overridden at the Infrastructure Definition level.
* The Application must contain a Service, a Workflow, and an Environment.
* Review the [Override Harness Kubernetes Service Settings](/article/ycacqs7tlx-override-harness-kubernetes-service-settings) topic to understand Harness variable override and its hierarchy.

### Step 1: Configure the Service

Configure and deploy a Harness Kubernetes Service to an Environment that has multiple Infrastructure Definitions.

The following are the sample service Manifests: 

**Deployment.yaml**


```
apiVersion: v1  
kind: Namespace  
metadata:  
 name: {{.Values.namespace}}  
---  
apiVersion: v1  
kind: ConfigMap  
metadata:  
 name: {{.Values.name}}-{{.Values.track}}  
 labels:  
   app: {{.Values.name}}  
   track: {{.Values.track}}  
data:  
 APP_ENV1: {{.Values.appEnv1}}  
 APP_ENV2: {{.Values.appEnv2}}  
---  
apiVersion: apps/v1beta1  
kind: Deployment  
metadata:  
 name: {{.Values.name}}-{{.Values.track}}  
 labels:  
   app: {{.Values.name}}  
   track: {{.Values.track}}  
   version: {{.Values.version}}  
spec:  
 replicas: {{.Values.replicas}}  
 selector:  
   matchLabels:  
     app: {{.Values.name}}  
     track: {{.Values.track}}  
 template:  
   metadata:  
     labels:  
       app: {{.Values.name}}  
       track: {{.Values.track}}  
       version: {{.Values.version}}  
   spec:  
     containers:  
     - name: {{.Values.name}}  
       image: {{.Values.image}}  
       imagePullPolicy: Always  
       resources:  
         requests:  
           cpu: 100m  
           memory: 50Mi  
       ports:  
       - name: http  
         containerPort: 8080  
       envFrom:  
       - configMapRef:  
           name: {{.Values.name}}-{{.Values.track}}
```
**Service.yaml**


```
apiVersion: v1  
kind: Service  
metadata:  
 name: {{.Values.name}}  
 labels:  
   app: {{.Values.name}}  
spec:  
 type: ClusterIP  
 ports:  
 - name: http  
   port: 9080  
   protocol: TCP  
   targetPort: http  
 selector:  
   app: {{.Values.name}}
```
Perform the following steps to configure the Service:

1. In **Service**, add `s3bucketName` and `dnsServer` configuration variables.
2. Set the configuration variable `appEnv1` to `aaa`.
3. Set the configuration variable `appEnv2` to `bbb`.![](https://files.helpdocs.io/kw8ldg1itf/articles/cc59hfou9c/1620840081811/lcy-1-m-44-xe-xg-ixh-95-f-qcqhamhe-kqci-tckau-vln-0-s-8-zcfofcdu-9-wcbgr-h-9-kcy-pf-clq-yh-923-iggaevg-zza-2-a-6-t-4-yrvi-1-c-nwk-bzyj-4-tbr-6-okx-8-kulq-igw-22-tzczhj-01-rjq-n-4-mz-zl-q)
4. In `values.yaml`, reference Harness variables as:  
  
`appEnv1: ${serviceVariable.appEnv1}`  
`appEnv2: ${serviceVariable.appEnv2}`  
  
**Values.yaml**  
  

```
namespace: ${infra.kubernetes.namespace}  
apiUrl: http://localhost:8080  
replicas: 1  
   
name: infra-override  
image: ${artifact.metadata.image}  
version: ${artifact.metadata.tag}  
track: primary  
endpoint: rpc  
   
appEnv1: ${serviceVariable.appEnv1}  
appEnv2: ${serviceVariable.appEnv2}
```

### Step 2: Add the Environment Overrides

Environment overrides are overridden at the Infrastructure Definition level. You can use the Infrastructure Definition's name or value to override the variable.

To override, first you need the Environment variables. Then, you need to enable specific values to be passed when the Infrastructure Definition Mapping is selected.

The Environment variables are the access points for the override variables to be assigned. Ensure that you have multiple Infrastructure Definitions mapped to your Environment. Once the mappings are configured, add Service Configuration Override variables to the Environment.

![](https://files.helpdocs.io/kw8ldg1itf/articles/cc59hfou9c/1620840082055/d-folatv-mwxck-7-k-vmr-rm-jg-uexx-2-l-wc-4-d-f-2-xlw-shd-o-3-vn-ym-m-5-b-ay-ytxj-l-8-i-49-d-na-mzjck-tobuw-9-x-uxcjx-gyls-01-6-f-reslz-aj-rdrce-1-g-p-0-lq-dvo-b-6-l-l-7-lf-o-7-sne-5-nnx-2-ytp-equw)1. Provide an override variable for your Environment.  
You can associate the Infrastructure Definition name with the variable. This helps to identify the overriding variable applied in your Environment.
2. Configure `values.yaml` file override.
3. Create a new key-value pair where the key is the variable value that is overridden at the Infrastructure Definition level, and the value is a Workflow variable (it is set up later) called `$``{``override.keyNameHere``}`.  
  
When you are done, it will look something like this:![](https://files.helpdocs.io/kw8ldg1itf/articles/cc59hfou9c/1620840082287/ybkdt-gza-qd-n-8-y-w-30-mcv-xvcnp-l-fsvbw-r-7-af-ao-0-wgb-3-ih-qae-xhld-jz-f-91-tpx-xlf-3-y-qh-p-cfy-5-ohmd-pv-7-l-e-yin-3-hnezs-m-8-f-kcpuhkw-cfj-uttoxounv-qd-6-l-u-8-h-qy-7-ya-9373-ya-zay)

### Step 3: Configure the Workflow

You need to configure a shell script to handle the assignment of these variables in the Workflow. The shell script assigns the infrastructure variables as the Environment variables configured in the previous step.

1. In Workflow, write a script to assign variables based on the infra name.  
  
Here is a sample shell script:  
  

```
echo  
echo Using infrastructure definition [${infra.name}]  
echo  
  
appEnv1=${serviceVariable.appEnv1}  
appEnv2=${serviceVariable.appEnv2}  
  
if [[ "${infra.name}" == infra2 ]]; then  
  
  appEnv2=${serviceVariable.infra2_appEnv2}  
  
elif [[ "${infra.name}" == infra3 ]]; then  
  
  appEnv1=${serviceVariable.infra3_appEnv1}  
  appEnv2=${serviceVariable.infra3_appEnv2}  
  
fi  
  
echo Setting appEnv1 to [$appEnv1]  
echo Setting appEnv2 to [$appEnv2]  
echo
```
2. Export the variables into the context. This variable is used in the override configured [earlier](https://docs.harness.io/article/cc59hfou9c-override-variables-per-infrastructure-definition#step_1_configure_the_service). The `$``{``override.appEnv1``}` references a value based on this shell script.
3. In **Publish Variable Name**, enter **override**, which is referenced in the `values.yaml` configuration override.  
  
When you are done, it will look something like this:![](https://files.helpdocs.io/kw8ldg1itf/articles/cc59hfou9c/1620840082509/kr-ms-scg-7-uh-cv-1-cu-7-og-n-geukf-dx-8-gydf-k-5-udva-7-ctud-cxq-8-fxpfl-cms-8-rs-jfrvr-ycrgxh-is-1-m-r-41-wvnycla-zi-ejfomu-5-lp-ci-8-mcc-wf-jc-7-nhr-3-y-8-p-11-i-33-k-3-gg-3-x-gprqa-ab-euy)
4. Add the shell script to the **Deploy** steps before the Rollout Deployment.![](https://files.helpdocs.io/kw8ldg1itf/articles/cc59hfou9c/1620840082782/r-hmsjj-dxtyc-ixhlfcb-xx-iyu-ede-2-d-1-rithv-vi-ktl-pw-9-c-lrj-na-20-ly-1-wabz-h-2-um-349-zznctv-2-ndg-te-sod-6-vdmm-0-xkl-co-oze-suqfr-2-woxz-3-eni-kg-vyi-gnycbabwhj-2-jpi-dri-ye-qrk)
5. Deploy the Workflow. Based on the Infrastructure Definition, certain variables are overridden. For InfraDef1, the values were assigned based on the Service configuration variables provided in the Environment. InfraDef1 did not override the Environment level values.![](https://files.helpdocs.io/kw8ldg1itf/articles/cc59hfou9c/1620840082963/52-isg-2-pml-9-smgo-1-k-4-caxzi-7-nt-srk-8-ky-8-qrk-g-ajwxy-5-hj-ll-rp-2-tdlz-v-lmlrkqc-bsjn-mi-lw-4-c-388-s-5-f-puyp-hkxcz-j-dxj-a-0-ga-3-rw-7-co-equxym-nnxz-q-454-a-74-p-1-lz-6-30-v-yub-4)
6. Run this deployment again in InfraDef2. Now the Environment level value is taken for `appEnv1`, but `appEnv2` is overridden with the value specific to InfraDef2.![](https://files.helpdocs.io/kw8ldg1itf/articles/cc59hfou9c/1620840083234/lxqd-pot-1-unum-skw-enx-6-doc-9-s-nd-dmop-ks-sn-5-jatf-rdwkh-7-c-z-3-srca-egd-7-s-3-wwh-iwh-9-jc-4-zro-bir-lgnkjyy-zh-buvc-tpk-0-t-dcrf-og-yvqofbt-pcaxfl-vf-eyors-v-9-u-98-zu-1-tl-vdiddw-8)
7. Deploy the third Infrastructure Definition. This time both the variables are overridden with values specific to InfraDef3.

### Next Steps

Check out the community article on publishing variable outputs: [Publish Variables](https://community.harness.io/t/publish-variables/227)


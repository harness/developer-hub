---
title: Prometheus Canary Integration
---


In this example we are using the prometheus K8s operator
## Enable and Configure Kayenta and Metrics:
hal config canary enable
    hal config canary edit --default-metrics-store prometheus
    hal config canary prometheus enable
    hal config canary prometheus account addprometheus --base-url //base url looks like http://prometheus-operator-prometheus.monitor.svc.cluster.local:9090
    hal config metric-stores prometheus 
    hal config canary aws enable
    hal config canary aws account add ACCOUNT --bucket  //optionally set aws credentials if kubernetes node has no access to S3
    hal config canary aws edit --s3-enabled true

Note it's mandatory to setup the AWS S3 bucket account or similar.Now you need to Create a Canary Config
## Create a Canary Config:
Notice the template query where we use ```${location}``` and ```${scope}```
and a Pipeline with a Canary Stage.In our queries the Baseline/Canary and Baseline/Canary location values will be replaced in our template for the variables ```${location}``` and ```${scope}```


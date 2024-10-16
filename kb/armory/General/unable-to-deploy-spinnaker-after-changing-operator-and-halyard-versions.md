---
title: Unable to deploy Spinnaker after changing Operator and Halyard versions
---

## Issue
After upgrading operator to version 1.2.7  and halyard to version 1.12.1, it is noticed that Spinnaker deployments do not go through. Below errors may be seen on operator and halyard logs
#### Operator container logs
```
{"level":"error","ts":1626238705.074147,"logger":"controller-runtime.controller","msg":"Reconciler 
error","controller":"spinnakerservice-controller","request":"spinnaker-operator/spinnaker","error":"got halyard response status 405, 
response: Request method 'POST' not supported","stacktrace":"github.com/go-logr/zapr.(*zapLogger).Error\n\t/opt/spinnaker-
operator/build/vendor/github.com/go-logr/zapr/zapr.go:128\nsigs.k8s.io/controller-runtime/pkg/internal/controller.
(*Controller).reconcileHandler\n\t/opt/spinnaker-operator/build/vendor/sigs.k8s.io/controller-
runtime/pkg/internal/controller/controller.go:218\nsigs.k8s.io/controller-runtime/pkg/internal/controller.
(*Controller).processNextWorkItem\n\t/opt/spinnaker-operator/build/vendor/sigs.k8s.io/controller-
runtime/pkg/internal/controller/controller.go:192\nsigs.k8s.io/controller-runtime/pkg/internal/controller.
(*Controller).worker\n\t/opt/spinnaker-operator/build/vendor/sigs.k8s.io/controller-
runtime/pkg/internal/controller/controller.go:171\nk8s.io/apimachinery/pkg/util/wait.JitterUntil.func1\n\t/opt/spinnaker-
operator/build/vendor/k8s.io/apimachinery/pkg/util/wait/wait.go:152\nk8s.io/apimachinery/pkg/util/wait.JitterUntil\n\t/opt/spinnaker-
operator/build/vendor/k8s.io/apimachinery/pkg/util/wait/wait.go:153\nk8s.io/apimachinery/pkg/util/wait.Until\n\t/opt/spinnaker-
operator/build/vendor/k8s.io/apimachinery/pkg/util/wait/wait.go:88"}
```

#### Halyard container logs
```
2021-07-14 04:56:24.022  INFO 1 --- [nio-8064-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 28 ms
2021-07-14 04:56:55.631  WARN 1 --- [nio-8064-exec-9] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'POST' not supported]
2021-07-14 04:56:56.678  WARN 1 --- [nio-8064-exec-1] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'POST' not supported]
2021-07-14 04:56:57.711  WARN 1 --- [nio-8064-exec-2] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'POST' not supported]
```

## Cause
Operator pod basically is a multi-container pod that has both operator and halyard containers running within it. As seen on Halyard logs, Halyard version 1.12.1 is unable to handle the request from Operator and thus resulting in ```405 responses``` in the Operator logs. This is noticed with this particular version combination of Operator and Halyard.


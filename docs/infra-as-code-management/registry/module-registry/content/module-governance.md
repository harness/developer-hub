With Harness Infrastructure as Code and Harness OPA policies you can enforce governance on modules used in a workspace. You can create policies for different types of governance: allowed modules, module versions, or even resources provisioned outside of a module. Below are examples of implementing such governance.

### Helper Functions

```rego
# Collect all module calls in a TF Plan
module_calls[call] {
  walk(input.configuration.root_module, [p, v])
  p[count(p)-1] == "module_calls"   # node *is* a module_calls map
  mc := v[_]                        # one module_call object
  call := mc                        # its call
}
```

```rego
# Check if an array contains an element
contains(arr, elem) {
  arr[_] = elem
}
```

### Allowed Modules

Collect module calls and throw a failure if the module source doesn't match a given pattern:

```rego
deny[msg] {
  call := module_calls[_]

  not startswith(call.source, "../")                    # allow local modules in parent directories
  not startswith(call.source, "./")                     # allow local modules in the current directory
  not startswith(call.source, "app.harness.io/")        # allow modules from harness module registry
  not startswith(call.source, "terraform-aws-modules/") # allow offical modules from aws

  msg := sprintf(
    "Module source %q is not allowed",
    [call.source],
  )
}
```

### Require specific module versioning

For modules where you want to control the versions used, you can make a policy per module to account for custom logic in version matching:

```rego
deny[msg] {
  allowed_versions := ["2.2.0", "2.3.0"]

  call := module_calls[_]

  call.source == "terraform-aws-modules/kms/aws"

  not contains(allowed_versions, call.version_constraint)

  msg := sprintf(
    "Module %s version %s is not allowed, must be one of: %s",
    [call.source, call.version_constraint, allowed_versions],
  )
}
```

### Require specific resource types be provisioned through a module

For sensitive resource types that must only be used inside approved modules, list all resources included in the "root module" and check their type:

```rego
deny[msg] {
  disallowed_types := ["aws_instance"]

  r = input.planned_values.root_module.resources[_]

  contains(disallowed_types, r.type)

  msg := sprintf(
    "Resource of type %s is not allowed outside a module",
    [r.type],
  )
}
```

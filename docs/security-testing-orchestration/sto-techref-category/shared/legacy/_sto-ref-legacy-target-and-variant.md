Every Custom Scan step needs a [`target_name` and  `variant`](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines.md). Specify unique, descriptive names. This makes it much easier to navigate your scan results in the STO UI. 

<a href="target_name"></a>
<br/>
```
target_name
```
A [user-defined label](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines) for the code repository, container, application, or configuration to scan.


<a href="variant"></a>
<br/>
```
variant
```

A [user-defined label](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines)  for the branch, tag, or other target variant to scan.

You can see the target name, type, and variant in the [Test Targets](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines.md) UI:

![Target name, type, and branch](../../static/repo-settings.png)
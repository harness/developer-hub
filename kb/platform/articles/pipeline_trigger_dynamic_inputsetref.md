
# Harness Dynamic Input Set Referencing on Git Event triggers

## Preface

Before diving in, it’s important to reiterate that this is **not** Harness’s preferred method for selecting Input Sets based on the triggering branch. The recommended and most maintainable approach is to configure a dedicated trigger per watched branch, using explicit branch conditions. This approach is more declarative and aligns better with Harness's design philosophy.

However, given certain edge cases and constraints presented by a customer group, the following outlines a best-effort solution for dynamically selecting an Input Set at runtime based on the triggering branch.

## GitHub-Specific Considerations

This approach requires some awareness of the structure of GitHub webhook payloads. In particular, Harness does **not** support using `trigger.targetBranch` or similar derived fields at the time of Input Set resolution. Instead, only `trigger.payload` fields are available when selecting an Input Set dynamically.

You can reference any field from the payload using:

```
<+trigger.payload.<json-path>>
```

For example, with a typical GitHub push event payload:

```json
{
  "ref": "refs/heads/main",
  "before": "4937e6ceccd8ea253ab83564e92ce84603445a97",
  "after": "7a35b6cc861f68c4ad0d0b07394912f889150389",
  "repository": {}
  ...
}
```

The `ref` field would be accessed in Harness using:

```
<+trigger.payload.ref>
```

This is especially important because `ref` is typically the only field in the GitHub payload that contains the branch name. Despite its verbose format (`refs/heads/<branch>`), it is our key to dynamic selection.

## Dynamic Input Set Selection Logic

In your trigger YAML, you can parse the branch name and use it to dynamically reference an Input Set by ID:

```yaml
trigger:
  name: test
  identifier: test
  enabled: true
  description: "Example trigger for dynamic Input Set selection based on branch"
  orgIdentifier: Demo
  projectIdentifier: customer_demo
  pipelineIdentifier: kubernetes_secret_cleanup
  source:
    type: Webhook
    spec:
      type: Github
      spec:
        type: Push
        spec:
          connectorRef: account.gitconnector
          repoName: examples
  inputSetRefs: <+[<+trigger.payload.ref>.split("/").get(2)]>
```

### Explanation of the Key Line

```yaml
inputSetRefs: <+[<+trigger.payload.ref>.split("/").get(2)]>
```

- `trigger.payload.ref` gives us the full reference string (`refs/heads/main`).
- `.split("/")` splits it into `["refs", "heads", "main"]`.
- `.get(2)` retrieves the branch name (`main`). (Lists in JEXL are 0 indexed, so the third item is always 2. You could have a second `<+trigger.payload.ref>.split("/").length -1` but that wasn’t necessary for this example.)
- Wrapping it in `[ ... ]` returns it as a single-item list, which is required by the `inputSetRefs` field.

This approach works **only** if your Input Set ID matches your branch name exactly (note: **ID**, not display name).

## Final Notes

This method can be a useful workaround in scenarios where:

- You want to maintain a single trigger across many branches.
- Your Input Sets are structured to mirror branch names.
- You’re unable to manage a growing set of per-branch triggers.

That said, it's worth reiterating: the **officially recommended strategy** is to use multiple explicitly defined triggers per branch for clarity, auditability, and long-term maintainability.

This behavior will need to be adjusted for a different naming convention or if the Git provider varies (e.g., GitLab, Bitbucket).

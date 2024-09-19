In the case of **Dedicated Chaos Infrastructure**, the following apply:
- The `mode` and `type` are mandatory fields in the probe schema when you define the entire configuration of the probe in the manifest (for Kubernetes (Legacy), Linux, and Windows infrastructure).
- The `name`, `mode`, `type` and other input properties (depending on the probe) is required to rightly configure the resilience probe. If all the necessary details are not provided, the probe will not execute.

In the case of **Harness Delegate**, the following apply:
- For Kubernetes (Harness Infrastructure) (also known as [DDCR](/docs/chaos-engineering/concepts/explore-concepts/infrastructures/delegate/)), the mandatory fields are `mode` and `probeID`, and the `type` field is derived. These fields are generated and patched in the backend to the same manifest. However, in the UI, you will only see the `mode` and `probeID` fields when configuring your experiment. This is because the manifest is minified in the UI.
- If you define the entire probe in `task.definition.chaos.probes`, the entire configuration is required. If you use the `task.probeRef`, you only need to specify `probeID` and `mode` fields.
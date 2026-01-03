The Wiz policy failure results appear in the scan results as an `Info` level issue, categorized as `External Policy` Issue Type. Additionally, you can apply an OPA policy to fail the pipeline based on the policy failures. This can be achieved using the [Security Tests - External Policy Failures](/docs/security-testing-orchestration/policies/create-opa-policies.md#block-the-pipeline-based-on-external-policy-failures) policy from the [security tests policy samples](/docs/security-testing-orchestration/policies/create-opa-policies.md#security-test-policy-samples).


## Configure External Policy Failures

You can configure Harness STO to treat external policy failures as vulnerabilities. To do this, navigate to Account Settings, go to the Default Settings page, select Security Test Orchestration, and click the External Policy Failures setting.

Enable the external policy failures setting to map them to a selected severity level — `Critical`, `High`, `Medium`, or `Low` to treat them as vulnerabilities instead of `Info` level issues. This setting takes effect from the next pipeline execution.

:::note

This feature is behind the Feature flag `STO_EXTERNAL_POLICY_FAILURES_AS_VULNS`. Contact [Harness Support](mailto:support@harness.io) to enable this flag.

:::
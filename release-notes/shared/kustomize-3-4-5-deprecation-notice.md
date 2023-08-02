To safeguard your operations and protect against potential security vulnerabilities, Harness will launch an update to deprecate the Kustomize 3.4.5 binary from delegates with an immutable image type (image tag `yy.mm.xxxxx`) on **September 30, 2023**. For information on delegate types, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

In place of Kustomize, Harness will use the `kubectl` binary to conduct Kustomize operations. Recent enhancements (versions 1.14 and higher) have made the `kubectl` binary fully capable of supporting Kustomize operations. For more information, go to [Kustomization](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/) in the Kubernetes documentation.

If your delegate is set to auto-upgrade, Harness will automatically remove the binary from your delegate. This will result in pipeline and workflow failures for services that use Kustomize 3.4.5. 

:::info note
If your development team still uses Kustomize 3.4.5, you can reintroduce the binary on the delegate. Harness is not responsible for any vulnerabilities or risks that might result from reintroducing the Kustomize 3.4.5 binary.
:::

For more information about updating your delegates to reintroduce Kustomize 3.4.5, go to:

- [Delegate automatic upgrades and expiration policy](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/)

- [Install a delegate with third-party tool custom binaries](/docs/platform/delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries/)

Contact [Harness Support](mailto:support@harness.io) if you have any questions.

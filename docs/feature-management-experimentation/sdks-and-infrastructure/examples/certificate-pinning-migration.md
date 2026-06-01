---
title: Updating Certificate Pinning for Streaming Infrastructure Changes
description: Learn how to update certificate pinning configurations for Harness FME SDK streaming infrastructure migrations.
sidebar_label: Certificate Pinning Migration Guide
sidebar_position: 9
unlisted: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Applications using strict certificate pinning may reject newly deployed streaming infrastructure endpoints unless the updated certificate hashes are trusted.

This only applies if:

- [Streaming mode](/docs/feature-management-experimentation/sdks-and-infrastructure#streaming-versus-polling) is enabled
- Certificate pinning is configured for `streaming.split.io`

Harness recommends validating certificate pinning behavior in staging environments before production rollout and ensuring all mobile application releases containing updated pins are fully deployed before removing older pins.

Add the following SHA-256 hashes for `streaming.split.io` to your certificate pinning configuration:

```text title="Required certificate hashes"
sha256/uSrlkr2jGS90xWYIve6B5AXAjLGM007lAwC+z1u/oQg=
sha256/yxDRqYvQxLYRrI1aLLCiDqU0F3UvNpi1lhL3hs/gUTw=
sha256/s1JscMD9xgtY/27NPHzO4zyr6OFXxhr362lmdgcWREY=
sha256/rMvxo1yIbyYMwHuas7KtVlwY5UvDs5P44mYfcaa1XUk=
sha256/3K7Fs56s8ttWmmzCMddXr11LwV2dRp0Opb2VvZr/mhs=
```

Keep your existing streaming certificate pins configured during the migration period. Removing legacy pins too early may interrupt streaming connectivity.

<Tabs groupId="mobile-sdk">
<TabItem value="android" label="Android">

Configure certificate pinning with `CertificatePinningConfiguration`:

```java title="Android streaming certificate pinning"
CertificatePinningConfiguration certPinningConfig = CertificatePinningConfiguration.builder()
    .addPin(...)
    .addPin(...)
    .addPin("streaming.split.io", "sha256/uSrlkr2jGS90xWYIve6B5AXAjLGM007lAwC+z1u/oQg=")
    .addPin("streaming.split.io", "sha256/yxDRqYvQxLYRrI1aLLCiDqU0F3UvNpi1lhL3hs/gUTw=")
    .addPin("streaming.split.io", "sha256/s1JscMD9xgtY/27NPHzO4zyr6OFXxhr362lmdgcWREY=")
    .addPin("streaming.split.io", "sha256/rMvxo1yIbyYMwHuas7KtVlwY5UvDs5P44mYfcaa1XUk=")
    .addPin("streaming.split.io", "sha256/3K7Fs56s8ttWmmzCMddXr11LwV2dRp0Opb2VvZr/mhs=")
    .build();

SplitClientConfig config = SplitClientConfig.builder()
    .certificatePinningConfiguration(certPinningConfig)
    .build();
```

</TabItem>
<TabItem value="ios" label="iOS">

Configure certificate pinning with `CertificatePinningConfig`:

```swift title="iOS streaming certificate pinning"
let config = SplitClientConfig()

let certBuilder = CertificatePinningConfig.builder()
    .addPin(...)
    .addPin(...)
    .addPin(host: "streaming.split.io", hashKey: "sha256/uSrlkr2jGS90xWYIve6B5AXAjLGM007lAwC+z1u/oQg=")
    .addPin(host: "streaming.split.io", hashKey: "sha256/yxDRqYvQxLYRrI1aLLCiDqU0F3UvNpi1lhL3hs/gUTw=")
    .addPin(host: "streaming.split.io", hashKey: "sha256/s1JscMD9xgtY/27NPHzO4zyr6OFXxhr362lmdgcWREY=")
    .addPin(host: "streaming.split.io", hashKey: "sha256/rMvxo1yIbyYMwHuas7KtVlwY5UvDs5P44mYfcaa1XUk=")
    .addPin(host: "streaming.split.io", hashKey: "sha256/3K7Fs56s8ttWmmzCMddXr11LwV2dRp0Opb2VvZr/mhs=")

config.certificatePinningConfig = try? certBuilder.build()
```

</TabItem>
</Tabs>

### Streaming fallback behavior

If the SDK cannot establish a streaming connection during migration or certificate rotation, the SDK automatically falls back to [polling mode](/docs/feature-management-experimentation/sdks-and-infrastructure#streaming-versus-polling). No additional configuration is required for fallback behavior.
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Prerequisites
- Ensure you have the [**Dart CLI**](https://dart.dev/tools/dart-tool) `dart` and 
 [**Flutter CLI**](https://docs.flutter.dev/reference/flutter-cli) `flutter` installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.


---
## Create a Dart artifact registry

<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/e35f26c7-5656-4423-82f4-a035fc60784a?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create Artifact Registry in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Dart Registry**.
4. Provide a Registry Name.
    - Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
5. Optionally, add a Description and Labels for better organization.
6. Choose visibility between **Public** and **Private**. _By default, the visibility is set to **Private**._
7. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info private registry
This registry will serve as your private Dart registry within Harness.
:::

---
## Configure an Upstream Proxy (Optional)

An upstream proxy allows your registry to fetch NuGet packages from external sources if they are not available locally.

<Tabs>
<TabItem value="interactive" label="Interactive Guides">

<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/9140d24a-fbca-4bdd-9bcc-4d395f9fef46?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Configure Upstream Proxy in Harness" />

<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/ef4c5cae-9ba3-4d41-bbee-5142847bed12?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Configure Upstream Proxy in Harness" />

</TabItem>
<TabItem value="step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>

1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Dart Registry** as the proxy type.
3. Click **Create Proxy** to establish the connection.

<h3> Configure the upstream proxy in your registry </h3>

1. In the Artifact Registry module, select an existing Artifact Registry.
2. Select the **Configuration** tab.
3. Under **Advanced (Optional)**, select **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Click **Save** to save the configuration.

</TabItem>
</Tabs>

:::info upstream proxy caching
If a Dart package isn't found in your Harness registry, the upstream proxy automatically fetches it from an external source like pub.dev. The package is then cached in your registry, ensuring faster downloads for subsequent requests.
:::

---
## Install and Use Dart Packages

<Tabs>
<TabItem value="dart cli" label="Dart CLI">

#### Configure Authentication

##### Step 1

Add authentication token to Dart pub:

```bash
dart pub token add https://pkg.harness.io/pkg/<account-id>/<dart-registry-name>/pub/
```

##### Step 2

Enter your `<TOKEN>` when prompted.

:::info
Replace `<account-id>` with your Harness account ID and `<dart-registry-name>` with your registry name.
:::

#### Install a Dart Package

##### Step 1

In your consuming project's `pubspec.yaml`, add the dependency pointing to the hosted URL:

```yaml
dependencies:
  <ARTIFACT_NAME>:
    hosted:
      name: <ARTIFACT_NAME>
      url: https://pkg.harness.io/pkg/<account-id>/<dart-registry-name>/pub/
    version: <VERSION>
```

##### Step 2

Then fetch it:

```bash
dart pub get
```

#### Publish a Dart Package

##### Step 1

In your package's `pubspec.yaml`, set the registry URL:

```yaml
publish_to: https://pkg.harness.io/pkg/<account-id>/<dart-registry-name>/pub/
name: <ARTIFACT_NAME>
version: <VERSION>
description: My first Dart package
environment:
  sdk: ">=3.0.0 <4.0.0"
```

##### Step 2

Then run:

```bash
dart pub publish
```

</TabItem>
<TabItem value="flutter cli" label="Flutter CLI">

#### Configure Authentication

##### Step 1

Add authentication token to Flutter pub:

```bash
flutter pub token add https://pkg.harness.io/pkg/<account-id>/<dart-registry-name>/pub/
```

##### Step 2

Enter your `<TOKEN>` when prompted.

:::info
Replace `<account-id>` with your Harness account ID and `<dart-registry-name>` with your registry name.
:::

#### Install a Dart Package with Flutter

##### Step 1

In your Flutter project's `pubspec.yaml`, add the dependency pointing to the hosted URL:

```yaml
dependencies:
  <ARTIFACT_NAME>:
    hosted:
      name: <ARTIFACT_NAME>
      url: https://pkg.harness.io/pkg/<account-id>/<dart-registry-name>/pub/
    version: <VERSION>
```

##### Step 2

Then fetch it:

```bash
flutter pub get
```

#### Publish a Dart Package with Flutter

##### Step 1

In your Flutter package's `pubspec.yaml`, set the registry URL:

```yaml
publish_to: https://pkg.harness.io/pkg/<account-id>/<dart-registry-name>/pub/
name: <ARTIFACT_NAME>
version: <VERSION>
description: My first Flutter package
environment:
  sdk: ">=3.0.0 <4.0.0"
```

##### Step 2

Then run:

```bash
flutter pub publish
```
</TabItem>
</Tabs>
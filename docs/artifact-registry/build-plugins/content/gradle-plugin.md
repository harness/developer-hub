The Harness Gradle Plugin hooks your existing `./gradlew publish` flow: it intercepts the standard `publish` task, uploads artifacts to Harness Artifact Registry in parallel for faster deployment, and reads registry URL and credentials from environment variables (configured in [Configuration](#configuration)) so secrets stay out of source control.

## Installation

Add the plugin to your project's build file. Use the Groovy snippets if your scripts are `build.gradle`, and the Kotlin snippets if they are `build.gradle.kts`; use the same style in the root build and in subprojects.

### For Groovy DSL (`build.gradle`)

```groovy
plugins {
    id 'io.harness.gradle' version '1.0.0'
}
```

### For Kotlin DSL (`build.gradle.kts`)

```kotlin
plugins {
    id("io.harness.gradle") version "1.0.0"
}
```

### Apply to All Subprojects

If you want to apply the plugin to all subprojects, add this to your root build file:

**Groovy DSL:**
```groovy
allprojects {
    apply plugin: 'io.harness.gradle'
}
```

**Kotlin DSL:**
```kotlin
allprojects {
    apply(plugin = "io.harness.gradle")
}
```

## Configuration

The plugin uses environment variables for configuration. Set these variables before running Gradle commands.

### Plugin Settings

Add the `harnesspublish` configuration block to your build file:

**Groovy DSL (`build.gradle`):**
```groovy
harnesspublish {
    apiUrl = System.getenv("DEPLOY_REPO_URL") ?: ""
    username = System.getenv("DEPLOY_USERNAME") ?: ""
    token = System.getenv("DEPLOY_TOKEN") ?: ""
}
```

**Kotlin DSL (`build.gradle.kts`):**
```kotlin
harnesspublish {
    apiUrl = System.getenv("DEPLOY_REPO_URL") ?: ""
    username = System.getenv("DEPLOY_USERNAME") ?: ""
    token = System.getenv("DEPLOY_TOKEN") ?: ""
}
```

### Environment Variables

Set the required environment variables before running the publish command. You can get these values from the Harness UI **Set Up Client** section.

**Linux/macOS:**
```bash
export DEPLOY_REPO_URL="https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/maven"
export DEPLOY_USERNAME="your-username"
export DEPLOY_TOKEN="your-token"
```

**Windows (Command Prompt):**
```cmd
set DEPLOY_REPO_URL=https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/maven
set DEPLOY_USERNAME=your-username
set DEPLOY_TOKEN=your-token
```

**Windows (PowerShell):**
```powershell
$env:DEPLOY_REPO_URL="https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/maven"
$env:DEPLOY_USERNAME="your-username"
$env:DEPLOY_TOKEN="your-token"
```

### Configuration Reference

| Environment Variable | Description | Required |
|---------------------|-------------|----------|
| `DEPLOY_REPO_URL` | Repository URL for deployment | Yes |
| `DEPLOY_USERNAME` | Username for deployment | Yes |
| `DEPLOY_TOKEN` | Token/password for deployment | Yes |
| `DEPLOY_THREAD_COUNT` | Number of threads for parallel deployment | No |

## Usage

### Deploy Artifacts

Deploy your Gradle project artifacts to Harness Artifact Registry:

```bash
./gradlew publish
```

The plugin will:
1. Intercept the standard `publish` task
2. Upload artifacts to the configured Harness registry
3. Use parallel threads for faster deployment (configurable via `DEPLOY_THREAD_COUNT`)

#### Configure Deployment Thread Count (Optional)

You can control the number of parallel threads used for deployment:

```bash
export DEPLOY_THREAD_COUNT=4
./gradlew publish
```

## Example Workflow

Here's a complete example of using the Harness Gradle Plugin in a CI/CD pipeline:

**Groovy DSL (`build.gradle`):**
```groovy
plugins {
    id 'java'
    id 'maven-publish'
    id 'io.harness.gradle' version '1.0.0'
}

group = 'com.example'
version = '1.0.0'

publishing {
    publications {
        mavenJava(MavenPublication) {
            from components.java
        }
    }
}

harnesspublish {
    apiUrl = System.getenv("DEPLOY_REPO_URL") ?: ""
    username = System.getenv("DEPLOY_USERNAME") ?: ""
    token = System.getenv("DEPLOY_TOKEN") ?: ""
}
```

**CI/CD Script:**
```bash
# Set deployment credentials
export DEPLOY_REPO_URL="https://pkg.harness.io/pkg/abc123/my-gradle-registry/maven"
export DEPLOY_USERNAME="harness-user"
export DEPLOY_TOKEN="${HARNESS_TOKEN}"

# Configure parallel deployment
export DEPLOY_THREAD_COUNT=8

# Build and deploy artifacts
./gradlew clean build publish
```

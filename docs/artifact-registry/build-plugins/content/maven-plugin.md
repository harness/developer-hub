The Harness Maven Plugin simplifies Maven project integration with Harness Artifact Registry by automating artifact deployment and dependency management directly from your Maven build lifecycle.

The plugin provides two main capabilities:

1. **Deploy Artifacts**: Automatically upload your Maven artifacts (JARs, WARs, POMs, etc.) to Harness Artifact Registry during the Maven build process
2. **Enforce Dependency Resolution**: Ensure all Maven dependencies are fetched through your Harness upstream proxy registries, providing centralized control over your project's dependencies

## Installation

Add the plugin to your project's `pom.xml`:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>io.harness.maven</groupId>
            <artifactId>harness-maven-plugin</artifactId>
            <version>1.0.0</version>
            <executions>
                <execution>
                    <id>deploy-artifacts</id>
                    <goals>
                        <goal>deploy</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

### Using SNAPSHOT Versions

If you are using a SNAPSHOT version of the plugin (e.g., `1.0.0-SNAPSHOT`), add the snapshot repository to resolve it:

```xml
<pluginRepositories>
    <pluginRepository>
        <id>sonatype-snapshots</id>
        <url>https://central.sonatype.com/repository/maven-snapshots/</url>
    </pluginRepository>
</pluginRepositories>
```

## Configuration

The plugin uses environment variables for configuration. Set these variables before running Maven commands.

### Deployment Configuration

Configure deployment to Harness Artifact Registry:

```bash
export DEPLOY_REPO_URL="https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/maven"
export DEPLOY_USERNAME="your-username"
export DEPLOY_TOKEN="your-token"
```

### Resolution Configuration (Optional)

To enforce dependency resolution through Harness upstream proxy, configure these variables:

:::info Upstream Proxy Required
The enforce resolution feature requires an upstream proxy registry configured in Harness. Learn how to [create an upstream proxy registry](/docs/artifact-registry/manage-registries/upstream-proxy).
:::

```bash
export RESOLVER_REPO_URL="https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/maven"
export RESOLVER_USERNAME="your-username"
export RESOLVER_TOKEN="your-token"
```

### Configuration Reference

| Environment Variable | Description | Required |
|---------------------|-------------|----------|
| `DEPLOY_REPO_URL` | Repository URL for deployment | Yes (for deploy) |
| `DEPLOY_USERNAME` | Username for deployment | Yes (for deploy) |
| `DEPLOY_TOKEN` | Token/password for deployment | Yes (for deploy) |
| `DEPLOY_THREAD_COUNT` | Number of threads for parallel deployment (default: CPU cores) | No |
| `RESOLVER_REPO_URL` | Repository URL for dependency resolution | Yes (for enforce-resolution) |
| `RESOLVER_USERNAME` | Username for resolution | Yes (for enforce-resolution) |
| `RESOLVER_TOKEN` | Token/password for resolution | Yes (for enforce-resolution) |

## Usage

### Deploy Artifacts

Deploy your Maven project artifacts to Harness Artifact Registry:

```bash
mvn deploy
```

The plugin will:
1. Build your project artifacts
2. Upload artifacts to the configured Harness registry
3. Use parallel threads for faster deployment (configurable via `DEPLOY_THREAD_COUNT`)

#### Configure Deployment Thread Count (Optional)

By default, the plugin uses the number of CPU cores for parallel deployment. You can override this:

```bash
export DEPLOY_THREAD_COUNT=4
mvn deploy
```

### Enforce Dependency Resolution

Force all Maven dependencies to resolve from Harness upstream proxy:

```bash
mvn harness:enforce-resolution
```

This ensures all dependencies are fetched through your Harness upstream proxy registry, providing centralized control over your project's dependencies.

## Skip Deployment for Specific Modules

If you have modules that should NOT be deployed (e.g., documentation modules, test modules, parent POMs), configure them individually:

```xml
<!-- In the module's pom.xml that should be skipped -->
<build>
    <plugins>
        <plugin>
            <artifactId>maven-deploy-plugin</artifactId>
            <configuration>
                <skip>true</skip>
            </configuration>
        </plugin>
    </plugins>
</build>
```

The Harness Maven Plugin automatically respects this configuration and skips those modules during deployment.

## Example Workflow

Here's a complete example of using the Harness Maven Plugin in a CI/CD pipeline:

```bash
# Set deployment credentials
export DEPLOY_REPO_URL="https://pkg.harness.io/pkg/abc123/my-maven-registry/maven"
export DEPLOY_USERNAME="harness-user"
export DEPLOY_TOKEN="${HARNESS_TOKEN}"

# Set resolution credentials (optional)
export RESOLVER_REPO_URL="https://pkg.harness.io/pkg/abc123/maven-proxy/maven"
export RESOLVER_USERNAME="harness-user"
export RESOLVER_TOKEN="${HARNESS_TOKEN}"

# Configure parallel deployment
export DEPLOY_THREAD_COUNT=8

# Enforce dependency resolution through Harness
mvn harness:enforce-resolution

# Build and deploy artifacts
mvn clean deploy
```

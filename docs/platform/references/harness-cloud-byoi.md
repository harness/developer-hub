# BYOI (Bring Your Own Image)

Create custom VM images with your tools pre-installed for faster CI builds on Harness Cloud.

## Prerequisites

- Harness CI Enterprise license
- `CI_ENABLE_BYOI_HOSTED` feature flag enabled (contact Harness support)
- Harness Cloud infrastructure (not self-hosted runners)

---

## Quick Start

### 1. Create a Packer File

Add a `.pkr.hcl` file to your repository with your customizations:

```hcl
# packer/my-image.pkr.hcl

# Optional: Define variables for reusability
variable "node_version" {
  type    = string
  default = "20"
}

# Install your tools
provisioner "shell" {
  inline = [
    "sudo apt-get update",
    "sudo apt-get install -y nodejs npm python3",
    "sudo npm install -g typescript yarn"
  ]
}

# Copy config files (optional)
provisioner "file" {
  source      = "configs/settings.json"
  destination = "/tmp/settings.json"
}

provisioner "shell" {
  inline = ["sudo mv /tmp/settings.json /etc/myapp/"]
}
```

### 2. Build the Image

Add this step to your pipeline:

```yaml
- step:
    type: Plugin
    name: Build Image
    spec:
      connectorRef: account.dockerhub
      image: harness/byoi-builder:1.0.0
      settings:
        mode: build
        packerFilePath: packer/my-image.pkr.hcl
        targetOs: linux
        targetArch: amd64
        imageName: my-dev-image
        imageVersion: v1
        baseImage: ubuntu/22.04
```

### 3. Use the Image

Reference it in your stage configuration:

```yaml
- stage:
    type: CI
    spec:
      platform:
        os: Linux
        arch: Amd64
      runtime:
        type: Cloud
        spec:
          imageSpec:
            imageName: my-dev-image:v1
      execution:
        steps:
          - step:
              type: Run
              spec:
                command: node --version  # Pre-installed!
```

---

## Plugin Settings

### Build Mode

| Setting | Required | Default | Description |
|---------|----------|---------|-------------|
| `mode` | No | `build` | Operation mode: `build` or `delete` |
| `packerFilePath` | Yes | - | Path to your Packer file (relative to repo root) |
| `imageName` | Yes | - | Image name (3-30 chars, lowercase letters, numbers, hyphens) |
| `imageVersion` | Yes | - | Version tag (1-20 chars, alphanumeric and hyphens) |
| `targetOs` | No | `linux` | Target operating system: `linux` |
| `targetArch` | No | `amd64` | Target architecture: `amd64` or `arm64` |
| `baseImage` | No | `ubuntu/22.04` | Base image to build from (see Supported Base Images) |
| `dockerVersion` | No | `28` | Docker version to pre-install (e.g., `28`, `27`) |
| `debug` | No | `false` | Enable verbose Packer logging |

### Delete Mode

To rebuild with the same version, delete the existing image first:

```yaml
- step:
    type: Plugin
    name: Delete Image
    spec:
      connectorRef: account.dockerhub
      image: harness/byoi-builder:1.0.0
      settings:
        mode: delete
        imageName: my-dev-image
        imageVersion: v1
```

---

## Supported Base Images

### Linux

| Base Image | Architectures |
|------------|---------------|
| `ubuntu/24.04` | amd64, arm64 |
| `ubuntu/22.04` | amd64, arm64 |

**Advanced options:**

| Type | Format | Example |
|------|--------|---------|
| Harness pre-configured | `{name}` | `ubuntu-v1-hosted-amd64` |
| Your previous BYOI image | `byoi-{sanitizedAccountId}-{imageName}-{version}` | `byoi-abc123-my-base-v1` |

To use a previous BYOI image, specify the **full image name** (as shown in build output), not `imageName:version`.

**Note:** Account IDs are sanitized in image names: lowercase, `_` becomes `-`, and special characters are removed. For example, if your account ID is `My_Account_123`, your images are stored as `byoi-my-account-123-...`.

---

## Writing Your Packer File

You provide **variables** and **provisioners**. Harness handles source configuration, authentication, and cleanup automatically.

### Example with Variables

```hcl
# Define reusable variables
variable "java_version" {
  type    = string
  default = "17"
}

variable "maven_version" {
  type    = string
  default = "3.9.6"
}

# Install Java
provisioner "shell" {
  inline = [
    "sudo apt-get update",
    "sudo apt-get install -y openjdk-${var.java_version}-jdk"
  ]
}

# Install Maven
provisioner "shell" {
  inline = [
    "wget -q https://archive.apache.org/dist/maven/maven-3/${var.maven_version}/binaries/apache-maven-${var.maven_version}-bin.tar.gz",
    "sudo tar -xzf apache-maven-${var.maven_version}-bin.tar.gz -C /opt",
    "sudo ln -s /opt/apache-maven-${var.maven_version} /opt/maven",
    "rm apache-maven-${var.maven_version}-bin.tar.gz"
  ]
}
```

### Copying Files

```hcl
# Copy files from your repo into the image
provisioner "file" {
  source      = "configs/app.conf"
  destination = "/tmp/app.conf"
}

provisioner "shell" {
  inline = ["sudo mv /tmp/app.conf /etc/myapp/app.conf"]
}
```

### What Harness Adds Automatically

**Linux:**
- Git, Git LFS, wget, curl, CA certificates
- Docker (configurable version)
- `git safe.directory *` configuration
- HOME environment variable
- Cleanup (apt cache, logs) to reduce image size

### What Gets Ignored

If your Packer file contains `source` or `build` blocks, they will be ignored. Harness uses its own secure configuration. Only your `variable` and `provisioner` blocks are used.

---

## Limitations

### Image Naming
- `imageName`: 3-30 characters, must start with lowercase letter
- `imageVersion`: 1-20 characters, must start/end with alphanumeric
- Combined length of `imageName` + `imageVersion` should not exceed ~35 characters (the full name includes your account ID)

### Platform
- **Linux:** Ubuntu (amd64 and arm64)
- **Windows:** Coming soon
- **macOS:** Coming soon
- Harness Cloud only. Self-hosted runners are not supported.

### Build Process
- Maximum build time: 3 hours (bounded by authentication token lifetime)
- Automatic retries: 3 attempts on transient failures
- Disk size: 100GB
- Cannot build same image name/version concurrently

### Security
Do not include credentials in your Packer file. The following patterns will cause the build to fail:
- `credentials = "..."`
- `account_file = "..."`
- `access_token = "..."`

Harness injects credentials securely.

---

## Troubleshooting

| Issue | Solution                                             |
|-------|----------|
| Build fails | Set `debug: "true"` to see detailed Packer output    |
| "Image name too long" error | Shorten `imageName` or `imageVersion`                |
| "Image already exists" error | Use `mode: delete` first, or use a different version |
| Packer file not found | Check `packerFilePath` is relative to repo root      |
| Authentication error | Contact Harness support                              |
| Build times out | The maximum build time is 3 hours.                   |

---

## FAQ

**Can I use my image across all projects?**
Yes, BYOI images are available to all projects in your account.

**Can I build on ARM64?**
Yes, set `targetArch: arm64` in your plugin settings (Linux only).

**Can I build on top of a previous BYOI image?**
Yes. Use the full image name from your previous build output as `baseImage`. For example: `baseImage: byoi-abc123-my-base-v1` (not `my-base:v1`). Note that the account ID in the image name is sanitized (lowercase, `_` → `-`, special chars removed). You can only use your own account's BYOI images.

**Do I need to set mode to build?**
No, `build` is the default mode. You only need to explicitly set `mode: delete` when deleting an image.

**What is the maximum build time?**
3 hours, bounded by the GCP authentication token lifetime. If your build needs more time, optimize your Packer provisioners.

---

## Support

If you encounter issues:
1. Enable `debug: "true"` for verbose logs
2. Check the error message against the troubleshooting table above
3. Contact Harness support

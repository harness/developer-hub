### Preserve File Metadata

By default, Harness cache steps don’t preserve inode metadata, which means restored files can appear "new" on every build. This can cause cache growth over time, also called **cache snowballing**.

To address this, Harness supports a `preserveMetadata` flag, which can be configured as a stage variable `PLUGIN_PRESERVE_METADATA` set to `true`.

#### How it works

- `preserveMetadata: true`  
  Cache archives include inode metadata (timestamps, ownership, permissions).  
  Restored files keep their original metadata, enabling tools like Gradle pruning or `find -atime` to work correctly.

- `preserveMetadata: false` (default)  
  Metadata is not preserved. Restores are slightly faster, but tools that rely on timestamps treat all files as new.

#### YAML examples

Here’s an example of saving and restoring a Gradle cache with metadata preserved:

```yaml
steps:
  - step:
      type: SaveCache
      name: save-gradle-cache
      spec:
        key: gradle-cache
        paths:
          - ~/.gradle
        preserveMetadata: true
  - step:
      type: RestoreCache
      name: restore-gradle-cache
      spec:
        key: gradle-cache
        preserveMetadata: true
```

#### Backward compatibility

* The flag is optional and defaults to `false`.
* Pipelines without this setting continue to work as before.
* Old cache archives can still be restored even if `preserveMetadata` is enabled.

#### Benefits

* Prevents **cache snowballing** by keeping Gradle cache size stable across builds.
* Accurate pruning of unused dependencies in Gradle and similar tools.
* Supports other tools that rely on inode metadata (for example, `find`, cleanup scripts).

#### Troubleshooting

If your Gradle cache grows unexpectedly or pruning doesn’t work:

* Enable `preserveMetadata: true` in both **Save Cache** and **Restore Cache** steps.
* Make sure the `key` values match across your Save/Restore steps.



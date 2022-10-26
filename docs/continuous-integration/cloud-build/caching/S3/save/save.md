# Save cache step

Step yaml syntax
```yaml
- step:
    identifier: saveCache
    name: save cache
    type: SaveCacheS3
    spec:
        connectorRef: <+input>
        key: m2-{{ checksum pom.xml }}
        bucket: cache
        region: us-west-2
        sourcePaths:
        - ~/.m2
        - /shared/cache
        archiveFormat: Gzip
```

### Spec parameter reference

- **connectorRef** : AWS connector with permission to upload to specified bucket. Required

- **key** : cache key to use for the cache directories. Refer [key template](/caching/key-template/) to templatize the key. Required

- **bucket** : AWS bucket name. Required

- **region** : AWS bucket region. (`us-east-1`, `eu-west-1`, ...). Required

- **sourcePaths** : cache directories, an array of folders to cache. Required

- **archive-format** : archive format to use to store the cache directories (`Tar`, `Gzip`) (default: `Tar`)

- **endpoint** : endpoint for the s3 connection. Only required for hosted s3 compatible store. e.g. minio

- **path-style** : use path style for bucket paths. (true for `minio`, false for `aws`) (default: `false`)

- **override** : rebuilds the cache to S3 even if key remains same. (default: `false`)

### Extra configurations:

Some attributes are not exposed but can be used by setting CI stage environment variables 

- **PLUGIN_ACL** : upload files with acl (`private`, `public-read`, ...) (default: `private`)

- **PLUGIN_ENCRYPTION** : 
: server-side encryption algorithm, defaults to `none`. (`AES256`, `aws:kms`)
# Cache Key Templates

Cache key can be templatized to use checksum of dependency requirements file. To use templates for key, you can use variables by prefixing them with a `.` in `{{ }}` construct, from provided metadata object (see below).

Also following helper functions provided for your use:

* `checksum`: Provides md5 hash of a file for given path
<!-- * `hashFiles`: Provides SHA256 hash after SHA256 hashing each single file -->
* `epoch`: Provides Unix epoch
* `arch`: Provides Architecture of running system
* `os`: Provides Operation system of running system

For further information about this syntax please see [official docs](https://golang.org/pkg/text/template/) from Go standard library.

### Template Examples

1. `"m2-{{ checksum "pom.xml" }}"`

2. `"{{ checksum "go.mod" }}_{{ checksum "go.sum" }}_{{ arch }}_{{ os }}"`

<!-- 3. `"{{ hashFiles "go.mod" "go.sum" }}_{{ arch }}_{{ os }}"`

4. `"{{ hashFiles "go.*" }}_{{ arch }}_{{ os }}"` -->
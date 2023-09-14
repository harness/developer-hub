---
title: Write policy definitions
description: Learn how to write policy definitions for SSCA policy files.
sidebar_position: 20
---

When you [create SSCA policies](./create-ssca-policies.md), you define rules for open-source component usage based on criteria such as component name, version, license, PURL, and supplier.

The SSCA module supports deny list and allow list policies. Your policy files can include both lists. This topic explains how to write rules for each list.

## Deny list policies

Use the `deny_list` section of the policy file to block the use of specific components within your artifacts. If an artifact includes a component that is part of the deny list, the artifact's policy evaluation fails.

For example, you can block a specific version of a component that has known vulnerabilities or doesn't meet your security standards. By adding that version of the component to the `deny_list` and [enforcing the policy](./enforce-ssca-policies.md) in your pipelines, any attempts to use this component version in your organization's artifacts will be blocked.

Your deny list rules can use any combination of the following attributes, in addition to the component `name`:

* `supplier`
* `license`
* `version`
* `purl`

### Deny list examples

Here are some examples of deny list rules.

#### Block all earlier versions

The following rule blocks `dbutils` packages with versions less than or equal to `2.3.1`.

```
deny_list:
  - name: "dbutils"
    version: "<=2.3.1"
```

#### Block specific versions from a specific supplier

The following rule blocks `libc-utils` package if the supplier is Apache *and* the version is less than or equal to `3.5.2`.

```
deny_list:
  - name: "libc-utils"
    supplier: "Apache"
    version: "<=3.5.2"
```

#### Mixed attribute rules

The following `deny_list` includes rules based on different combinations of attributes. Some rules block components entirely by `name` alone, and others include additional criteria, such as `version` or `supplier`.

```
deny_list:
  - name: "acl"
    version: "<=3.0.0"
    supplier: "Red Hat, Inc."
  - name: "chkconfig"
  - name: "cracklib"
    version: ">=2.0.0"
    supplier: "!pip"
  - purl: "pkg:rpm/rhel/dbus"
  - name: "json-glib"
    version: "<=1.0.2"
```

## Allow list policies

Use the `allow_list` section of the policy file to define a list of approved licenses, suppliers, and PURLs. The allow list ensures that your artifacts only include components that meet your specifications, which can help mitigate security and compliance risks. When you [enforce policies](./enforce-ssca-policies.md) in your pipelines, if an artifact includes a component that *is not* included in the allow list, the attribute's policy evaluation fails.

The `allow_list` is divided into sections for `licenses`, `suppliers`, and `purls`.

```
allow_list:
    licenses:
      - license: "Apache-1.0"
      - license: "Apache-1.1"
      - license: "Apache-2.0"
    suppliers:
      - supplier: "alpine"
      - supplier: "google"
      - supplier: "Redhat"
    purls:
      - "pkg:rpm/rhel/*"
      - "pkg:rpm/bhel/*"
```

### Allowed licenses

Use the `licenses` section of the allow list to define approved licenses. This section supports regex.

```
allow_list:
    licenses:
      - license: "Apache-1.0"
      - license: "Apache-1.1"
      - license: "Apache-2.0"
```

It is important to understand the trustworthiness of a license before adding it to your allow list.

Safe licenses are licenses that are commonly used and approved by the [Open Source Initiative (OSI)](https://opensource.org/). They include licenses like Apache License 2.0, MIT License, and BSD License. These licenses allow users to modify and distribute the code without any restrictions, as long as the license terms are followed.

Some licenses are considered risky licenses because they might impose additional requirements or restrictions on users. For example, the GNU General Public License (GPL) is considered risky, because it requires that any software that uses or modifies GPL-licensed code to be released under the GPL license as well. This can be problematic for organizations that want to keep their proprietary software closed source.

#### Use regex in license lists

You can use regex in the `licenses` section of the `allow_list` to match a range of license, rather than having to specify each license individually.

* **Exact match:** To create a rule that requires an exact match, use an expression such as `^AFL-1.1$`.
* **Contains:** To create a rule that matches any license containing a certain string, use an expression such as `AFL-1.1`. This example matches any license containing this string, such as `MALF-1.1` or `AFL-1.1.2`.
* **Starts with:** To create a rule that matches any license that starts with a specified string, use an expression such as `^AFL`. This example matches any license stating with this string, such as `ALF-1.1`, `AFL-1.2`, `AFL-1.3`, and so on.
* **Ends with:** To create a rule that matches any license that ends with a specific string, use an expression such as `BSD$`. This example matches any license ending with this string, such as `2-Clause-FreeBSD` or `2-Clause-NetBSD`.

Here is an example of a `licenses` list with various regex expressions:

```
allow_list:
    licenses:
      - license: "^AFL-1.1$"
      - license: "AFL-2.0"
      - license: "^MAFL"
      - license: "BSD$"
```

### Allowed suppliers

Use the `suppliers` section of the allow list to define approved distributors.

```
allow_list:
    suppliers:
      - supplier: "alpine"
      - supplier: "google"
      - supplier: "Redhat"
```

This helps you ensure that your artifacts only use components that are from reputable sources, and it reduces the risk of using components that may have been tampered with or have vulnerabilities. Allowing components based on trusted suppliers or distributors is important because it ensures that the components used in a software project come from a reliable source.

### Allowed PURLs

Use the `purls` section of the allow list to define approved Package URLs (PURLs).

```
allow_list:
    purls:
      - "pkg:rpm/rhel/*"
      - "pkg:rpm/bhel/*"
```

A PURL is a type of URL that provides a standardized way of identifying a package, including its type, namespace, name, and version. By defining a list of approved PURLs, you can ensure that only approved open source components are used in your artifacts, which reduces the risk of security vulnerabilities and license compliance issues.

## SSCA policy file example

The following policy file uses both `deny_list` and `allow_list` policies to address these criteria:

* Prevent components with known critical vulnerabilities from being used in the artifact. These component and versions are listed in the `deny_list`.
* Allow only safe licenses to be used according to the guidance in the [SPDX License List](https://spdx.org/licenses/). These licenses are listed in the `allow_list`. The `licenses` section of the `allow_list` supports regex for better matching.

```
deny_list:
    - name: "Log4j"
      version: "<=2.14.0"
    - name: "OpenSSL"
      version: "<=1.1.1" 
    - name: "Apache Struts"
      version: "<=2.3.3" 
    - name: "Elasticsearch"
      version: "<=7.16.2" 
    - name: "Spring Framework"
      version: "<=5.3.17" 
    - name: "OpenSSH"
      version: "<=8.8" 
    - name: "Node.js"
      version: "<16.14.0" 
    - name: "Nginx"
      version: "<=1.21.1" 
    - name: "Apache Tomcat"
      version: "<=9.054" 
    - name: "JBoss EAP"
      version: "<=7.4.13" 
    - name: "Hibernate"
      version: "<=5.5.8" 
    - name: "Apache Solr"
      version: "<=8.11.1" 
    - name: "OpenJDK"
      version: "<=11.0.14" 
    - name: "JUnit"
      version: "<=5.8.1" 
allow_list:
    licenses:
      - license: "0BSD"
      - license: "Adobe-2006"
      - license: "AFL-1.1"
      - license: "AFL-1.2"
      - license: "AFL-2.0"
      - license: "AFL-2.1"
      - license: "AFL-3.0"
      - license: "Apache-1.0"
      - license: "Apache-1.1"
      - license: "Apache-2.0"
      - license: "Artistic-1.0"
      - license: "Artistic-1.0-cl8"
      - license: "Artistic-1.0-Perl"
      - license: "Artistic-2.0"
      - license: "Beerware"
      - license: "BSD-1-Clause"
      - license: "BSD-2-Clause"
      - license: "BSD-2-Clause-FreeBSD"
      - license: "BSD-2-Clause-NetBSD"
      - license: "BSD-3-Clause"
      - license: "BSD-3-Clause-Attribution"
      - license: "BSD-3-Clause-Clear"
      - license: "BSD-4-Clause"
      - license: "BSD-Protection"
      - license: "BSD-Source-Code"
      - license: "BSL-1.0"
      - license: "bzip2-1.0.6"
      - license: "CC0-1.0"
      - license: "CC-BY-4.0"
      - license: "CDDL-1.0"
      - license: "CDDL-1.1"
      - license: "ClArtistic"
      - license: "CPL-1.0"
      - license: "curl"
      - license: "ECL-2.0"
      - license: "eGenix"
      - license: "EPL-1.0"
      - license: "EPL-2.0"
      - license: "ErlPL-1.1"
      - license: "FSFAP"
      - license: "FTL"
      - license: "IJG"
      - license: "ISC"
      - license: "MIT"
      - license: "MIT-0"
      - license: "MIT-advertising"
      - license: "MIT-CMU"
      - license: "MIT-enna"
      - license: "MIT-feh"
      - license: "MPL-1.0"
      - license: "MPL-1.1"
      - license: "MPL-2.0"
      - license: "MS-PL"
      - license: "NAIST-2003"
      - license: "Net-SNMP"
      - license: "OpenSSL"
      - license: "PHP-3.0"
      - license: "PHP-3.01"
      - license: "Plexus"
      - license: "PostgreSQL"
      - license: "Python-2.0"
      - license: "RSA-MD"
      - license: "Ruby"
      - license: "SISSL"
      - license: "SISSL-1.2"
      - license: "Spencer-86"
      - license: "Spencer-94"
      - license: "Spencer-99"
      - license: "Unicode-DFS-2015"
      - license: "Unicode-DFS-2016"
      - license: "Unicode-TOU"
      - license: "UnixCrypt"
      - license: "W3C"
      - license: "W3C-19980720"
      - license: "W3C-20150513"
      - license: "WTFPL"
      - license: "X11"
      - license: "X11-distribute-modifications-variant"
      - license: "Xnet"
      - license: "Zend-2.0"
      - license: "Zlib"
      - license: "zlib-acknowledgement"
      - license: "ZPL-1.1"
      - license: "ZPL-2.0"
      - license: "ZPL-2.1"
```

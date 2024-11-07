---
title: Catalog Entity Reference
description: Detailed documentation on Catalog Entity Reference
sidebar_label: Catalog Entity Reference
sidebar_position: 11
---

In IDP Catalog, Entities such as (Components, APIs, Groups, etc.) commonly have a need to refer other Catalog entities. For example, when we set an Owner of a Component by mentioning a Group or User. Or when we add a dependency between a Service and an API. This article describes how to write those entity references in your YAML descriptor files. The "Entity Refs" are also used anywhere else you want to uniquely mention an entity such as when using the [Catalog Ingestion API](https://developer.harness.io/docs/internal-developer-portal/catalog/catalog-ingestion/catalog-ingestion-api/).

Each entity in the catalog is uniquely identified by the triplet of its  [kind](https://developer.harness.io/docs/internal-developer-portal/catalog/how-to-create-idp-yaml#start-with-basic-entity-information), [namespace](https://backstage.io/docs/features/software-catalog/descriptor-format#namespace-optional), and [name](https://developer.harness.io/docs/internal-developer-portal/catalog/how-to-create-idp-yaml#provide-metadata). But that's a lot to type out manually, and in a lot of circumstances, both the kind and the namespace are fixed, or possible to deduce, or could have sane default values. So in order to help the writer, the catalog has a few tricks up its sleeve.

Each reference can be expressed in one of two ways: as **a compact string**.

## String References

This is the most common alternative and is used in almost all circumstances.

The string is of the form `[<kind>:][<namespace>/]<name>`. That is, it is composed of between one and three parts in this specific order, without any additional encoding:

- Optionally, the kind, followed by a colon
- Optionally, the namespace, followed by a forward slash
- The name

Here are few examples: 

  - `component:order-service`
  - `api:petstore`
  - `group:my-team`
  - `component:default/my-service`


**The name is always required**. Depending on the context, you may be able to leave out the kind and/or namespace. If you do, it is contextual what values will be used, and the relevant documentation should specify which rule applies where.
**All strings are case insensitive**.

```yaml
# Example:
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: petstore
  namespace: external-systems
  description: Petstore
spec:
  type: service
  lifecycle: experimental
  owner: group:pet-managers
  providesApis:
    - petstore
    - internal/streetlights
    - hello-world
```

The field `spec.owner` is a reference. In this case, the string `group:pet-managers` was given by the user. That means that the kind is `Group`, the namespace is left out, and the name is `pet-managers`. In this context, the namespace was chosen to fall back to the value `default` by the code that parsed the reference, so the end result is that we expect to find another entity in the catalog that is of kind `Group`, namespace `default` (which, actually, also can be left out in its own yaml file because that's the default value there too), and name `pet-managers`.

The entries in `providesApis` are also references. In this case, none of them needs to specify a kind since we know from the context that that's the only kind that's supported here. The second entry specifies a namespace but the other ones don't, and in this context, the default is to refer to the same namespace as the originating entity (`external-systems` here). So the three references
essentially expand to `api:external-systems/petstore`, `api:internal/streetlights`, and `api:external-systems/hello-world`. We expect
there to exist three API kind entities in the catalog matching those references.

Note that the remarks above in regards to shortening (leaving out kind and/or namespace) _only_ apply for the entity input YAML data. In protocols, storage systems, or when referring to entities externally, the entity ref always consists of all three parts.


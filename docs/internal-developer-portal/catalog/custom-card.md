---
title: Custom Card in Overview Page
description: Detailed description on hw to create and add information on custom card in Overview age of software components
sidebar_position: 5
sidebar_label: Custom Card
---

## Introduction

Now you can add a custom card to the overview page and populate it with the `catalog-info.yaml` metadata for all the root fields `apiVersion`, `kind`, `metadata`, and `spec` along with the [supported values](https://backstage.io/docs/features/software-catalog/descriptor-format/#contents) under the root field. eg `<+spec.type>`


## Layout 

This card component needs to be added in **Layout** under **Admin** section. Here's an example

```YAML
    - component: EntityAdditionalInfoCard
      specs:
        props:
          title: <+kind>
          headerItems:
          - icon: SaveRounded
            label: Save Details
            url: https://www.<+metadata.additionalInfo.value3>.com
          items:
          - label: <+metadata.additionalInfo.key1>
            value: Mr. <+metadata.additionalInfo.key2> <+metadata.additionalInfo.key3>
            style:
              bold: true
          - label: title2
            value: <+metadata.additionalInfo.key1>
            type: string
            style:
              bold: true
              italic: true
          - label: title3
            value: https://harness.io
            text: Harness Home Page
            type: link
            style:
              underline: true
        gridProps:
          md: 6
```

All the fields mentioned here supports the root fields data to be sourced from `catalog-info.yaml` as strings. 

### headeritems: 
Add all the information to be displayed in the header of the card 
    - `icon:` All material icon supported.
    - `url:` You can add a `link` to the material icon using this. 
    - `label:` A `string` to provide information regarding the icon. 

### Items:
Contains the information sourced from `catalog-info.yaml`
    - `label:` A `string` to provide information regarding the value displayed. 
    - `value:` The value you want to display against the added label, usually from `catalog-info.yaml`
    - `type:` Default value is string also supports `link` type. 
    - `style:` This is used for text styling as mentioned in the example above. 




## Additional Info

To add any other information other than what's available in the root fields we have support for `additionalInfo` under `metadata`.
Here's an example:
```YAML
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: "demo-catalog-datasource"
  additionalInfo:
    key1: Value1
    key2: Value2
    key3: Value3
  annotations:
    backstage.io/techdocs-ref: dir:.
spec:
  type: service
  owner: "IDPAdmin"
  lifecycle: experimental
```

In the above example, we have added key value pairs under `additionalInfo` and it's only possible to display the values using the key. For example, you can add `<+metadata.name.additionalInfo.key1>` in the layout to get the `value1` displayed in the Custom Card. 
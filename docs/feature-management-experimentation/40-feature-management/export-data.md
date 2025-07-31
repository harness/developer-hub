---
title: Export data
sidebar_label: Export data
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
sidebar_position: 20
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360048120112-Export-data </button>
</p>

The data export functionality within the Data hub gives development teams the ability to query and export all impression and event data. With data export, development teams can:

* Create new data exports and add query criteria to refine your exports
* View previously generated data exports

## Create data export 

You can export both impression or event data by following below steps: 

1. From the navigation bar, click **Data hub** and select the **Data export** tab.
2. Click the **Create** button for the data type you want to export.
3. Select a time range to query across.
4. Optionally click **Add query criteria** to filter the data you are exporting across a variety of dimensions.
5. Click the **Create** button.

Impressions and events are available for the last 90 days. The data export result is empty if the feature flag version is not within the selected time range.

:::note
Depending on the query criteria and the number of events or impressions, exports can take up to 5 minutes to generate.
:::

## Accessing data exports 

Once you create your data export, you can access your generated exports to download via a CSV. In this table, you can delete any generated exports.   

## Data export limits 

The following limits apply to data exports:

* 5 data export requests per account per day, which can be increased 
* 10,000,000 records per impression data export
* 1,000,000 records per event data export
* 7 day data export retention window. Reports are available for 7 days before they are deleted and no longer accessible

Contact [support@split.io](emailto:support@split.io) if you have any questions or concerns regarding your data export limits.

## Troubleshooting

### Opening downloaded `.gz` Files on MacOS

If you are using MacOS and have downloaded a data export file from the Data hub that ends with `.gz`, you might find that the file does not open by default in your user interface. This is because some MacOS versions do not support `.gz` files natively.

To successfully open and extract these files, the recommended approach is to install the **The Unarchiver** app from the Mac App Store, which reliably handles `.gz` files.

Alternatively, you can use the Terminal application on your Mac to unzip the file manually with the following command:

```bash
gzip -d [file name]
```

### Events not appearing in Harness FME

When [posting events](https://docs.split.io/reference/events-overview) using the Admin REST API, you may receive a successful `202` response code but not see the event in Split’s Data Hub. This can occur if any of the following issues are present:

- The Epoch timestamp is invalid. Ensure the timestamp is in milliseconds, not seconds.
- The traffic type is incorrect. Confirm that the traffic type used in the call exists in your Split organization.
- The API key is incorrect. Use the SDK API Key when posting events, not the Admin API Key.
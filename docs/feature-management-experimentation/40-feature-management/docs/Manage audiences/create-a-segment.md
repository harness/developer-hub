---
title: Create a segment
sidebar_label: Create a segment
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment <br /> ✘ images still hosted on help.split.io </button>
</p>

Segments are lists of user IDs that can you can create and share across your feature flags in an environment. You can segment your customer base and target these segments in your release process.

A segment is a pre-defined list of user IDs (user keys) that a feature flag can target. Segments can:

* be created and edited in the Split UI by manually adding IDs or by importing a file containing one ID per line
* be created and edited via the Split API
* [sync with any Amplitude Cohort](https://www.split.io/product/integrations/amplitude/)

Segments are best for targeting relatively fixed or specific groups of users that you can easily identify, like individual accounts. If you would like to learn about more dynamic targeting, refer to the [Custom attributes](https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes) guide.

For feature releases, you can use segments to:

  * **Ensure quality testing.** For example, you can release to your internal or outsourced QA team by creating a `qa_team` segment.
  * **Target employees for internal testing.** For example, you can release to your entire company to test a feature or gather feedback by creating an `employees` segment.
  *  **Plan your release strategy.** For example, you can release to a group of customers who have expressed interest in a particular feature by creating a `beta_tester` segment.

These are a few examples of using segments to deploy safe and successful feature releases.

# Segment types

Split supports the following segment types:
  * **Standard segments** - can contain up to 100,000 user IDs
  * **Large segments** - can contain up to 1,000,000 user IDs (may be increased upon request)

:::info
**Large segments** are available on the [Enterprise](https://www.split.io/pricing/) plan.
:::

:::warning[Server-side SDK support for Large segments]
Server-side SDKs do not yet support Large segments, but soon will. Until they are supported, evaluations of feature flags that target Large segments will return `control` on server-side SDKs. 
:::

:::warning[Server-side SDK initialization time with Standard segments]
When you add user IDs to a segment, note that these are lists that need to be fully downloaded to all of our ___server side___ SDKs. Too many IDs in a segment mean that your SDKs take longer to get ready.
:::

**Large segments** are created and managed differently than standard segments. A brief summary:
  * Creating and updating Large segments is done in _two steps_, including using Split API to upload a CSV file containing the segment's _full list_ of user IDs.
  * In Split UI, you can search a Large segment for a given User ID, but the full list of user IDs in a Large segment cannot be displayed.

This article shows how to work with Standard segments and Large segments and explains the differences in detail.

The segment type is displayed at the top of each Segment page in the Split UI, as shown below.

<p>
  <img src="https://help.split.io/hc/article_attachments/32099471950861" alt="create_a_segment_segment_type.png" width="450" />
</p>

In Split UI, you can filter the segments listed on the Segments pane by segment type.

<p>
  <img src="https://help.split.io/hc/article_attachments/32099444683149" alt="create_a_segment_filter.png" width="250" />
</p>

# Creating a segment

When creating a segment, the segment name, description, owners, and tags can help you and your team later manage your segment. This information can be customized to your team's workflow.

To create a segment:

1. From the navigation bar, click **Create segment**. The Create a segment page appears.

  <img src="https://help.split.io/hc/article_attachments/32099844941197" alt="create_a_segment_page.png" width="700" />
    
2. Fill in the fields as follows:
   * **Name.** Give your segment an easily recognizable name.
:::info[Segment name requirements]
Segment names must start with a letter and can contain the characters - _ a-z A-Z 0-9. Segment names are case sensitive. Note that segment names cannot specifically be called *datetime*, *string*, or *integer*.
:::
   * **Segment type.** Select the segment type according to the maximum size the segment will reach.
   * **Traffic type.** Select a traffic type for this segment. The feature flags that target this segment must be assigned the same traffic type.
   * **Owners.** Add one or more owners to your segment. Use owners to isolate segments in the browse panes to those *owned by me* and simplify permissions by providing owner edit rights for a single segment across all environments by toggling permissions on. When toggled on, permissions inherit owners as editors.
   * **Tags.** Optionally add one or more tags to help you categorize the segment. Use tags to isolate to a particular team or feature release (e.g. reporting team, front end, or geo search release).
   * **Description.** Optionally, provide a description of the segment. This helps your team members understand the segment's purpose.

<br />3. Click **Create** to create your new segment.

Next, you can create a segment definition and add user IDs.

## Adding user IDs to a segment

You need to add a segment definition for a given environment (this creates an empty segment in that environment) and then add user IDs to the segment. This is done as follows:

1. Select a segment in the Segments pane to open the segment page.

   <img src="https://help.split.io/hc/article_attachments/32099444676493" alt="create_a_segment_add_definition.png" width="800" />

2. In the Environment dropdown, select a Split environment where the segment will be defined.

2. Click **Add definition**. A new blank definition for the segment (for the selected environment) appears.

3. In the User section, click **Add user**.

  <img src="https://help.split.io/hc/article_attachments/32099471938189" alt="create_a_segment_add_user.png" width="800" />

  ___For Standard segments___ you can choose to individually add user IDs or to add them via file import.

  ___For Large segments___ user IDs are added via file import using Split API.

  For details about the import file contents, see the [CSV import file format](#csv-import-file-format) section below.

### File import for Standard segments

When using file import for a Standard segment, the user IDs listed in the file are ___added___ to the IDs already in the segment. Duplicate IDs are not added. This means that you can repeatedly import up to 10,000 user IDs at a time until the 100,000 limit is reached. (This is different from the way file import works for Large segments.)

### File import for Large segments

When using file import for a Large segment, the list of user IDs in the file will ___replace___ all the IDs that were already in the segment. The import file contents represent the new segment version and overwrite the previous segment version.

To import user IDs into a Large segment you need to prepare a [CSV import file](#csv-import-file-format). Then do the following:

1. On the segment page, click **Add user** and select **Import via API**.

  <img src="https://help.split.io/hc/article_attachments/32099444685325" alt="create_a_segment_import_via_api.png" width="800" />

2. On the Change summary page, click **Save** to generate an upload URL.

  <img src="https://help.split.io/hc/article_attachments/32099471946893" alt="create_a_segment_upload_url.png" width="900" />
   The upload URL will time out after 5 minutes, and the Large segment change request will be automatically withdrawn if the upload URL was not used.

3. Copy the Upload URL by clicking the copy icon. You are actually copying a curl command to upload a CSV file using a Split API endpoint. The command has the following format:

```
curl -XPUT -H 'Host: split-large-segments-....' \
   'https://split-large-segments-...' \
   -T filename.csv
```

<p style={{marginLeft: '2em'}}>
Replace `filename.csv` with the name of your CSV file.
</p>

4. Run the curl command from the location of your CSV file. You may need to wait a moment for the command to complete. During this time, the segment will show pending changes in the Split UI.

  <img src="https://help.split.io/hc/article_attachments/32099471949069" alt="create_a_segment_pending.png" width="1000" />

5. Refresh the Segment page to see the segment size updated. You can search for a user ID to confirm that it is in the Large segment.

  <img src="https://help.split.io/hc/article_attachments/32099471943309" alt="create_a_segment_search.png" width="1000" />

:::info[How to append user IDs to a Large segment?]
A segment is a list of user IDs. For a Large segment you can append new user IDs to the existing list, by following these steps:

1. Export the user IDs in the Large segment.

  You can export past versions of a Large segment: Click into a change on the Segment page Audit logs tab, and then click an **Export** link to download a CSV file. (Past versions are stored for 90 days.)

2. Edit the exported CSV file and insert the new user IDs.

3. Upload the edited CSV file using the **[File import for Large segments](#file-import-for-large-segments)** steps.
:::

# CSV import file format

When adding user keys to a segment by importing them from a file, use a CSV file (a file with .csv extension) that lists the user IDs in a single column with no header. User IDs containing commas, line breaks, or any other special character need to be wrapped in double quotes. Duplicate user IDs are ignored.

Example CSV file content:
```
id1
id2
id3
```

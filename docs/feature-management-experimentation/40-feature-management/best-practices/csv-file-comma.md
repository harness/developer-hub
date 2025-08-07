---
title: How to upload CSV file that contains IDs with comma character to new segment?
sidebar_label: How to upload CSV file that contains IDs with comma character to new segment?
sidebar_position: 1
---

### Question

Using the CSV upload feature in segment page in Split user interface, is it possible to upload user IDs in the CSV file that contain comma? The standard escape for CSV comma values is encapsulating the column value with double quotes like the example below:
```
"user1, key1"
"user2, key2"
"user3, key3"
```

### Answer

The CSV upload functionality in Split user interface automatically considers each line as a unique user  id, so there is no need to add the double quotes, as they are added to the final user IDs that are imported to a Split segment. To use the example above, remove the double quotes, as below:
```
user1, key1
user2, key2
user3, key3
```
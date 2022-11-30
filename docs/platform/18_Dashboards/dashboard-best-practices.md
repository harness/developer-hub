---
title: Best Practices For Building Dashboards
description: To create dashboards that are effective and efficient, you need to consider their performance. As our dashboards can load large amounts of data, building them for optimal performance will save you ti…
# sidebar_position: 2
helpdocs_topic_id: qydl5ju9lx
helpdocs_category_id: id0hnxv6sg
helpdocs_is_private: false
helpdocs_is_published: true
---

To create dashboards that are effective and efficient, you need to consider their performance. As our dashboards can load large amounts of data, building them for optimal performance will save you time and energy. 

Here are some best practices you can follow for building your dashboards:

* **Data volume:** Be mindful of how much data you might return in your dashboards; remember that the more data returned, the more memory will be used in your dashboard settings.
* **Dashboard elements**: Limit the number of queries you use in a single dashboard to 25 or less, if possible. If you need to display more data, you can [create multiple dashboards](create-dashboards.md) and link to them, or you can concatenate similar measures into a single value visualization.
* **Dashboard settings**: As much as possible, avoid setting the auto-refresh to less than 15 minutes and don’t run on load if your dashboard uses filters. You can also make dashboard filters required to prevent users from running the dashboard without filters.
* **Use caching**: If you are interested in looking at historical data from the previous day using the same set of filters, you can reach out to us to enable caching for you. This helps avoid unnecessary querying and improves the response time of your dashboards.
* **Post-query processes**: Be aware that using a lot of post-query processing, such as merging results, custom fields, or table calculations, can slow down your dashboard. We recommend limiting the amount of post-query processes to four. If you are using the same processes across multiple dashboards, you could get them hardcoded into your models, reach out to us if you’d like to do this.
* **Pivoted dimensions**: Pivoting a lot of dimensions also uses a lot of memory when a dashboard is loaded. If the dimension you are pivoting has many unique values, there will be a column for each value. Instead of showing everything at once, we recommend filtering the dashboard to select the values you’re most interested in comparing.
* **Columns and rows**: Having a lot of columns and rows can also slow down your dashboards due to memory issues. Be mindful of how many you need and also filter at the dashboard level to reduce the number of results in an element.
* **Shared filters**: By using shared filters across multiple tiles, you can reduce the total number of queries the dashboard runs, which can help speed it up.
* **Testing the dashboard**: Always test your dashboard after you’ve updated it to make sure you don’t miss any changes in its performance.


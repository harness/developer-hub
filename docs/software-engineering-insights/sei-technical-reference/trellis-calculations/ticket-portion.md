---
title: Ticket Portion Calculation
description: How is Ticket Portion metric calculated on SEI
sidebar_label: Ticket Portion
sidebar_position: 30
---

The **Ticket Portion** field is a useful metric that helps measure how much time each individual user has contributed to the overall resolution of a ticket. It represents the proportion of time a particular user worked on a ticket relative to the total amount of time the ticket was open.

### **Calculation Example**

To better understand this, let's consider an example: **User X** was initially assigned a ticket and worked on it for **15 days** from October 18, 2023, to November 2, 2023. After that, the ticket was reassigned to **User Y**, who worked on it for **34 days** from November 2, 2023, to December 7, 2023.

To calculate **User X's Ticket Portion**, we need to divide their time spent working on the ticket (15 days) by the total amount of time the ticket was open (15 days + 34 days). So the calculation would look like this:

```bash
User X's ticket portion = Time spent by User X / Total time the ticket was open
User X's ticket portion = 15 days / (15 days + 34 days)
User X's ticket portion = 15 days / 49 days
User X's ticket portion = 0.306
```

This calculation gives us **User X's Ticket Portion**, which is approximately **0.31** when rounded to two decimal places. By using this metric, we can better understand how much each user has contributed to the overall ticket resolution process, which can help us identify areas where improvements can be made.
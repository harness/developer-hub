---
title: Creating New Activity Fields
sidebar_label: Creating Activity Fields
description: Learn how to create and customize activity fields in Harness Incident Response.
---

# Creating New Activity Fields

An **activity field** is a data element within an activity, such as **Severity** or **Hours of Downtime**. Each activity field has a **name** and a **type**, determining how it is displayed and used.

---

## Understanding Activity Fields

:::tip
Before creating new fields, review the **default activity fields** to determine if they meet your needs. Each new activity type should have at least one or two assigned activity fields.
:::

If additional fields are required, follow these steps:

1. Navigate to **Settings** → **Activity Fields**.
2. Click **New Activity Field** to create a custom field.

---

## Available Activity Field Types

### **Short Text, Long Text, URL**
- **Display:** Varies based on the field type but generally appears as text.  
- **Example Built-in Fields:** Labels, Impacted Services, Video Conference Link.

### **Labels, Multi-Select, List of Links**
- **Display:** Shows as multiple labels, selections, or URLs.  
- **Example Built-in Fields:** Related Links.

### **Selection**
- **Display:** Dropdown menu for selection; displays the chosen `label` property.  
- **Example Built-in Fields:** Environment, Incident Status, Severity, Task Status.

### **Person**
- **Display:** Functions like a **Selection** field. If a Slack `userId` is provided, the system attempts to match it with a user directory. If no match is found, the raw value is displayed.  
- **Example Built-in Fields:** Commander, Communications Lead, Reporter.

### **Date**
- **Display:** Uses the browser's date picker for editing and displays the local date.  
- **Example Built-in Fields:** Due Date.

---

## Next Steps

- [Creating Your First Activity](#)
- [Activity Concepts & Best Practices](#)
- [Creating New Activity Types](#)
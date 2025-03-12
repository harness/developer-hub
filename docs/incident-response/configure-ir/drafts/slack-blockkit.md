---
title: Slack Block Kit (version v2.*.*)
sidebar_label: Slack Block Kit
description: Learn how to connect Slack to Harness Incident Response for streamlined communication.
draft: true
navigation:
  hide: true
---

# Slack Block Kit

A reference guide for **Slack Block Kit**, providing detailed descriptions and parameters for available block components.

---

## Checkboxes Input

Creates a checkboxes input block. Usable in **modals**.

### **Parameters**

<details>
  <summary>Click to expand</summary>

  - **field_name** (required) – Name of the input field (must be unique in this workflow).  
    _Type: STRING_

  - **label** (required) – A label displayed above the input element.  
    _Type: STRING_

  - **options** (required) – Array of options in `{ "value": "retrievable value", "text": "displayed text" }` format.  
    _Type: ARRAY_

  - **hint** – Optional hint appearing in light grey under the input element.  
    _Type: STRING_

  - **initial_options** – Array of selected options that match those in `options`.  
    _Type: ARRAY_

  - **optional** – Defines if input can be left empty on form submission (default: `false`).  
    _Type: BOOLEAN_

</details>

---

## Context Block

Creates a context block displaying **message context**, including images and text. Usable in **messages and modals**.

### **Parameters**

<details>
  <summary>Click to expand</summary>

  - **elements** (required) – Array of image elements and text objects (max: 10).  
    _Type: ARRAY_

</details>

---

## Date Picker Input

Creates a date picker input block. Usable in **modals**.

### **Parameters**

<details>
  <summary>Click to expand</summary>

  - **field_name** (required) – Name of the input field (must be unique).  
    _Type: STRING_

  - **label** (required) – A label displayed above the input element.  
    _Type: STRING_

  - **hint** – Optional hint below the input element.  
    _Type: STRING_

  - **initial_date** – Pre-selected date when the picker loads (format: `YYYY-MM-DD`).  
    _Type: STRING_

  - **optional** – Defines if input can be left empty (default: `false`).  
    _Type: BOOLEAN_

  - **placeholder** – Placeholder text shown in the picker.  
    _Type: STRING_

</details>

---

## Divider

Creates a **divider block**.

### **Parameters**

<details>
  <summary>Click to expand</summary>

  - **context** – Required for operations published to **Mission Control**.  
    _Type: OBJECT_

</details>

---

## Errors Object

Used for **error display in modals**. Returns an error when executed.

### **Parameters**

<details>
  <summary>Click to expand</summary>

  - **field_name** (required) – Name of the field associated with the error.  
    _Type: STRING_

  - **message** (required) – The displayed error message (text only).  
    _Type: STRING_

</details>

---

## File Block *(Remote file creation not yet implemented)*

Creates a **file block** displaying a remote file. Usable in **messages**.

### **Parameters**

<details>
  <summary>Click to expand</summary>

  - **external_id** (required) – The external unique ID for this file.  
    _Type: STRING_

</details>

---

## Image Block

Creates an **image block** displaying a linked image. Usable in **messages and modals**.

### **Parameters**

<details>
  <summary>Click to expand</summary>

  - **alt_text** (required) – Text summary of the image.  
    _Type: STRING_

  - **image_url** (required) – The URL of the displayed image.  
    _Type: STRING_

  - **title** – Optional title for the image.  
    _Type: STRING_

</details>

---

## Link Button Element

Creates a **button element** linking to an external URL.

### **Parameters**

<details>
  <summary>Click to expand</summary>

  - **text** (required) – The button label.  
    _Type: STRING_

  - **url** (required) – The external URL the button links to.  
    _Type: STRING_

  - **style** – Defines the button's visual appearance:
    - `"primary"`: Green outline (for confirmation actions).
    - `"danger"`: Red outline (for destructive actions).  
    _Type: STRING_

</details>

---

## Markdown Text Section

Creates a **mrkdwn text section block** with optional fields and an accessory element.

### **Parameters**

<details>
  <summary>Click to expand</summary>

  - **text** (required) – The markdown text.  
    _Type: STRING_

  - **accessory** – Additional elements like a `link_button_element` or `image_element`.  
    _Type: OBJECT_

  - **fields** – Array of text objects for side-by-side display (max: 10).  
    _Type: STRING_

</details>

---

## Multi Static Select Input

Creates a **multi-static select input block**. Usable in **modals**.

### **Parameters**

<details>
  <summary>Click to expand</summary>

  - **field_name** (required) – Name of the input field (must be unique).  
    _Type: STRING_

  - **label** (required) – A label displayed above the input element.  
    _Type: STRING_

  - **options** (required) – Options displayed in the select menu (`{ "value": "retrievable value", "text": "displayed text" }`).  
    _Type: ARRAY_

  - **hint** – Optional hint appearing under the input element.  
    _Type: STRING_

  - **initial_options** – Array of pre-selected options.  
    _Type: ARRAY_

  - **max_selected_items** – The max number of items a user can select (min: 1).  
    _Type: INTEGER_

  - **optional** – Defines if input can be left empty (default: `false`).  
    _Type: BOOLEAN_

  - **placeholder** – The placeholder text.  
    _Type: STRING_

</details>

---

## Static Select Input

Creates a **static select input block**. Usable in **modals**.

### **Parameters**

<details>
  <summary>Click to expand</summary>

  - **field_name** (required) – Name of the input field (must be unique).  
    _Type: STRING_

  - **label** (required) – A label displayed above the input element.  
    _Type: STRING_

  - **options** (required) – Select menu options (`{ "value": "retrievable value", "text": "displayed text" }`).  
    _Type: ARRAY_

  - **hint** – Optional hint under the input element.  
    _Type: STRING_

  - **initial_option** – A pre-selected option matching an option in `options`.  
    _Type: OBJECT_

  - **optional** – Defines if input can be left empty (default: `false`).  
    _Type: BOOLEAN_

  - **placeholder** – Placeholder text shown in the menu.  
    _Type: STRING_

</details>

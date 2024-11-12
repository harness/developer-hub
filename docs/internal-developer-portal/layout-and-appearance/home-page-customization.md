---
title: Customize your Homepage
sidebar_label: Homepage Customization
description: Learn how you can customize your homepage and add card banners and headers of your choice
sidebar_position: 1
---

## Introduction

Homepage of IDP is meant to provide personalized view for developers, serving as a single pane of glass for all the necessary information required across tools and software systems in use, and it differs for different organization as well as different teams in an organization. So to help with varied use-cases, you can customize the homepage, add quick links in the headers, change text on the header, banner and cards according to your engineering org and make it useful for your developers.

## Available Customizations

The **Platform Admins** can customize the homepage under Layouts for 3 different categories **Header**, **Banner** and **Cards**. A preview of the changes with sample data is available while customizing the homepage. The cards can be of two width sizes, i.e., medium(6md) and large(12md).

### Header

- Under Header, you could add the personalized welcome message including quick links to important pages like Release Notes, Engineering Docs and Status Page for important service etc. 

![](./static/homepage-header.png)

- For Header Text, enter the values in the field given, which could be dynamic as well as `<+first_name> <+last_name>`. 
- You can leave the header text static such as - `Welcome to Harness IDP!`
    - You can make it personalized such as - Welcome `<+first_name>!`
    - If your users have names of the format "last name, first name", then you can use Welcome `<+last_name>`, `<+first_name>`! Or you can name the portal a unique product name such as - `Welcome to MyPortal!` (maybe, a bit more creative than MyPortal).
    - There is a special variable called `<+greeting>` which resolves to Good Morning, Good Evening, etc. depending upon the timezone of the user. e.g. `<+greeting> <+first_name>`

- For Quick links you can upload a Custom Icon **(Recommended Size: 128x128px and file size: 200KB)** along with a name and a link. You can also drag and re-arrange the order of the links. It's ideal to add a few links to some central documents that you want your users to go to when they come to your Developer Portal. e.g. Onboarding Docs, Link to Slack, etc.

![](./static/add-quicklinks.png)

### Banner

- You can replace the existing banner on the IDP homepage by either an Image or a Video. You can as well disable the banner to allow more space for cards.

    - Image: Supported Types - `.jpg`, `.jpeg` and `.png`. Recommended Size of the image is 756x300px Maximum file size allowed is 10MB. You can also add a hyperlink to the image as well which will take users to the link when they click the banner. Suggestion - Add a cool banner for an upcoming engineering event that you want developers to be aware of!
    - Videos: Supported Types - Public Embedded Links e.g.; `https://www.youtube.com/embed/sVnI93bCr38?si=zobQ1YJMVVJMccaO`, `https://www.dropbox.com/scl/fo/5pu6lcznlqushows1gluk/AJtpk6i0ze_7Zr3Xr4xc2DE/distributed-work-with-dropbox.jpg?rlkey=d113ffnzhu8vseecxxe61ddk3&e=1&st=xzuy6mcy&raw=1` ; Rendered Size - `500x250px`. 

![](./static/homepage-banner.png)

### Cards

![](./static/homepage-cards.png)

#### Default Cards

- The home page displays the following cards by default, and they can only be removed or rearranged by using drag-drop but can't be edited.

1. Recently Visited: The pages on IDP you visited recently.
2. Top Visited: Most viewed pages in IDP by a user.
3. Learn More: Important links to learn more on Harness IDP. 
4. Starred Entities: Your Starred Components, Workflows or TechDocs are displayed here. 

#### Other Cards

Apart from these, there are two more cards that can be added, removed or edited according to your requirements. 

### Tool Kit

-  This card acts as a necessary bookmark for all the links visited by the developer quite frequently, eg; JIRA Sprint Dashboard, QA Environments

-  You can add a new toolkit card with multiple links and the associated `custom icon` **(Recommended Size: 128x128px and file size: 200KB)** along with a name and a link.  

### Video

- You can add any videos as a card, and the supported types are public embedded links of the videos. 

:::info

Make sure to click on **Save Changes** for each time you want to save a new change otherwise the changes would be discarded and we show a dialog box with this warning when you try to exit the page without saving the changes. Also, the right side of the page is dedicated only for preview you can't edit anything there. 

![](./static/preview-save.png)

:::

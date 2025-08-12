---
title: How to deploy JavaScript SDK to a Wordpress site?
sidebar_label: How to deploy JavaScript SDK to a Wordpress site?
sidebar_position: 14
---

## Question

How to deploy JavaScript SDK code in a Wordpress site?

## Answer

The steps below explain how to use JavaScript SDK in a blank page within a Wordpress site

1. First step is to install Header and Footer Scripts plugin. While this is not required, it is a good practice to load the JavaScript SDK library within the page header.

![](https://help.split.io/hc/article_attachments/360060037831/Screen_Shot_2020-06-18_at_11.25.35_AM.png)

2. In your Site Development page, create a sample page.

![](https://help.split.io/hc/article_attachments/360060038051/Screen_Shot_2020-06-18_at_11.34.28_AM.png)

3. Open the page in Edit mode, scroll to the bottom and paste the import script tag under **Insert Script to \<Head\>** section.

```
<script src="https://cdn.split.io/sdk/split-10.21.1.min.js"></script>
```

![](https://help.split.io/hc/article_attachments/360060038491/Screen_Shot_2020-06-18_at_1.37.15_PM.png)

4. Click on the **+** sign to insert new block, and choose **Custom HTML**.

![](https://help.split.io/hc/article_attachments/360059871812/Screen_Shot_2020-06-18_at_11.54.52_AM.png)

5. The Custom HTML block allows any HTML elements, including JavaScript, copy and paste the code below inside it, make sure to replace the API KEY with a valid key, set the User key and feature flag name as well.

```javascript
<p id="sdk"></p>
<script>
factory = splitio({ core: {
 authorizationKey: 'SDK API KEY',
 key: 'USER KEY',
 },
 startup: {
 readyTimeout: 4, requestTimeoutBeforeReady: 4
 },
});
client = this.factory.client();
client.on(client.Event.SDK_READY, () => {
 treatment = client.getTreatment("SPLIT NAME");
 console.log("treatment = "+treatment);
 var pobj = document.getElementById("sdk");
 pobj.innerHTML = "<p>Split: [SPLIT NAME], Treatment = "+treatment+"</p>";
});
</script>
```

6. Save and review the page, once it loads, the treatment is calculated after the SDK_READY event fires and display the feature flag name and treatment value, in the \<p\> section.

![](https://help.split.io/hc/article_attachments/360060039131/Screen_Shot_2020-06-18_at_1.43.36_PM.png)
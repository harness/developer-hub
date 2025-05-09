---
title: Assertions
description: Assertions
sidebar_position: 30
---
Assertions are a very important components of a test. They make a test robust and are the right way to determine whether your application is working as desired. Relicx supports a variety of assertions. In this section below we will describe each of them&#x20;

## Assert Visual Assert

| Description       | Visual asserts are very important to determine whether elements are displayed correctly. They are often used to ensure a variety of visual validations starting from whether a logo is displayed correctly to whether the chart is displayed correctly with the same input data.While creating this assertion, the user is supposed to select a specific area in the app |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Parameter options | None                                                                                                                                                                                                                                                                                                                                                                     |
| Advanced options  | User can set a threshold that determines the sensitivity of comparison.                                                                                                                                                                                                                                                                                                  |
| Return value      | True or False                                                                                                                                                                                                                                                                                                                                                            |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/BCl2tErCt7cE0tLaS0iBW_visual-assert.png" size="50" width="690" height="762" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/BCl2tErCt7cE0tLaS0iBW_visual-assert.png"}

:::

## Assert user question

| Description       | This assertion uses AI to verify a question that a user may have on a specific page. For example a user may ask a question like "Am I on the dashboard page ?" , Relicx AI evaluates this question and returns a True or False |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Parameter options | Question: Input for user question.Make sure the question can be answered in True or False.                                                                                                                                     |
| Advanced options  | None                                                                                                                                                                                                                           |
| Return value      | True or False                                                                                                                                                                                                                  |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/cyvM5mKZNag6HqHd5VAw2_ai-question.png" size="50" width="700" height="610" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/cyvM5mKZNag6HqHd5VAw2_ai-question.png"}

:::

## Assert Wait for text

| Description       | This is one of the most popular assertions that allow the user to check whether a text exists or not within a specified wait time.  It also allows the user to set multiple retries after a specified wait time.This assertion can be used to assert on text embedded in other elements like buttons.  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Parameter options | Text: This is the string that we are looking for&#xA;Present: This a boolean flag to determine whether the text exists or not                                                                                                                                                                          |
| Advanced options  | Maximum time to wait in ms: typically 30000 &#xA;Reload attempts: typically 0&#xA;Retry delai in ms: typically 5000 &#xA;Target picker: used to update the object                                                                                                                                      |
| Return value      | True or False                                                                                                                                                                                                                                                                                          |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/6ZaCLZ52EHtR4hTDTE2zj_waitfortext.png" size="50" width="680" height="1348" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/6ZaCLZ52EHtR4hTDTE2zj_waitfortext.png"}

:::

## Assert object is visible

| Description       | Used to assert existence of a specific object |
| ----------------- | --------------------------------------------- |
| Parameter options | Target picker to pick the object              |
| Advanced options  | None                                          |
| Return value      | True or False                                 |

## Assert object is clickable

| Description       | Used to assert whether object is clickable |
| ----------------- | ------------------------------------------ |
| Parameter options | Target picker to pick the object           |
| Advanced options  | None                                       |
| Return value      | True or False                              |

## Assert object is not clickable

| Description       | Used to assert whether object is not clickable |
| ----------------- | ---------------------------------------------- |
| Parameter options | Target picker to pick the object               |
| Advanced options  | None                                           |
| Return value      | True or False                                  |

## Assert Script Success

| Description       | If the user wants to run a custom script as part of the test execution, they can use this option  |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| Parameter options | Number of attempts: Usually 1 &#xA;Time between retries in ms: usually 0&#xA;Script content       |
| Advanced options  | None                                                                                              |
| Script Type       | Javascript or Puppeteer                                                                           |
| Return value      | True or False                                                                                     |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/_tLnb8grXngMP4DtRU4e5_assert-script-success-puppeteer.png" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/_tLnb8grXngMP4DtRU4e5_assert-script-success-puppeteer.png" size="52" width="874" height="2152" position="center" caption}

:::

Relicx supports two types of scripts&#x20;

- Javascript - Use this when you want to write a script based on the data displayed on your browser. For e.g. Find and delete an element based on a specific string&#x20;

* Puppeteer - Use this when you want to access data outside the browser. For e.g. a user wanted to verify whether the size of the file downloaded by a Click is greater than 0 bytes

## Assert URL

| Description       | Used to assert the test is on the desired URL                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Parameter options | This assertion can either match the entire or part of the URL and users can use one of the condition types to match the URL |
| Advanced options  | None                                                                                                                        |
| Return value      | True or False                                                                                                               |

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/mcxa_aIo04_eZ3EOFjWGT_assert-url.png" size="50" width="680" height="1110" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/mcxa_aIo04_eZ3EOFjWGT_assert-url.png"}

:::


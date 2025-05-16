---
title: Setting test suite with setup & teardown
description: Setup and Teardown
sidebar_position: 20
---
Often in test automation a test suite is expected to have `Setup` and `Teardown` phases. In the `Setup` phase, users often create data that is used or modifed by subsequent tests in the test suite. The teardown cleans up the data that is created by the setup phase and by the subsequent tests.&#x20;

As discussed here, users can set up sequencing and execute tests in sequence or in parallel. In order to create a setup stage, start the sequence as a negative number like `-10`. While the number ensures that step is executed first the negative sign indicates that if this particular test fail, the system will automatically bypass the execution of all remaining tests within the suite.&#x20;

Set the sequence of the rest of the tests as you need. Some may run in parallel and some in sequence. Then end the test suite with a clean up test that has the highest sequence number.&#x20;



![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/pSq0QSXr96LThLObHiOjX_image.png)

In this image above the setup test has a sequence of `-10` while the teardown has a sequence of `60` .&#x20;


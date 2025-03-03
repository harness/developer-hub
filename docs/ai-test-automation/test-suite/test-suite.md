Test Suites provide a way to group tests together. This allows for a batch of tests to be run all at once, instead of having to indivdually kick off tests. This is especially useful in CI/CD applications or where different types of tests need to be run together.

## Creating a Test Suite

In order to create a test suite, select one or more test from the Main Test listing page. Once the desired tests are chosen, choose "Add to Suite" at the bottom of the page.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/laTAxFrphuvZAkfRjofDa_relicx-test-suite-1.png)

To view all of the existing Test Suites, select the "Suites" tab on the Test listing page.

## Execution

A test suite can be executed against any of the parent application's test environments. Tests in the suite are run with defaulse parameters and can be bulk edited when preparing to run the suite.&#x20;

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/r6qhYYD9_qCKkzUo4gsAf_relicx-test-suite-2.png" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/r6qhYYD9_qCKkzUo4gsAf_relicx-test-suite-2.png" size="58" width="1808" height="1938" position="center" caption}

:::

## Sequencing

By defaults the sequence number for tests in a test suite are denoted the be "50". This just means that the order of execution for that test does not matter. However, if a user desires to execute tests in a sequential order, they can change what number is executed first through the pencil icon next to "SEQ NO" in the Details page of the Test Suite. The maximum number of parallel test executions can also be changed here, the default for this value is "5".

:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/WBTyxu-MqZj4mP_5-Us3h_relicx-test-suite-3.png" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/WBTyxu-MqZj4mP_5-Us3h_relicx-test-suite-3.png" size="54" width="974" height="884" position="center" caption}

:::

### Scheduling and Notifications

Relicx allows to schedule your test suite on a given schedule and also setup notification on completion.&#x20;

**Scheduling**

You can input your desired schedule in the cron expression. If you want to schedule to run every day at 4 p.m. UTC, then the expression would be `0 4 * * *` . Please refer to this <a href="https://crontab.guru/" target="_blank">site</a> for creating the crontab expression.

**Notification**

To be notified after the Test Suite execution is complete, please enter your desired Slack channel or enter the email addresses in the notification section. You will be notified after every execution of this test suite.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/bkH_YeF5mQ63JrPeT76cu_relicx-test-suite-4.png)

### Primary Test Suite

You can designate a test suite as "Primary". At any given time, only one test suite can be designated as a primary test suite which is used to determine the release risk score. Relicx recommends that you integrate your primary test suite with your CI/CD release pipeline. Before every release, you can execute the primary test suite and based on the risk score decide whether to go ahead with the release.

The primary test suite can be identified by a star icon next to its name. This is also the Test Suite that is used to verify the "Test Status" in the Flows Page.

To change the primary test suite, click on the star icon next to any test suite. You will be prompted with a cautionary message that this may impact your release risk score.

### Test Suites Overview Video

<iframe src="https://www.loom.com/embed/82b37c54cbb24b4db74f926c0f719e7a" width="960" height="540" frameborder="0" allowfullscreen></iframe>


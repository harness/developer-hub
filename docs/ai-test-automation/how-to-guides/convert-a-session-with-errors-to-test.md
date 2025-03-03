::::workflow-block
:::workflow-block-item
### Select your application on  <a href="https://app.relicx.ai/dashboard" target="_blank">Dashboard | Relicx</a>

I selected `Digital Bank` from the list below

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/WjFfxzb1DptnKSMf_XdIm_dashboar.png)
:::

:::workflow-block-item
### Click on Errors

Once on the session listing page. Select the Errors tab. This will display the list of errors that your users are encountering.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/Hh6_NGCXyThTyRQrHQdyu_ab-capture-image.png)
:::

:::workflow-block-item
### Click on Uncaught TypeError:

In this application, we can see a few errors. You can review the error type, the relicx suggested severity, number of sessions impacted and when was this error last seen.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/EgkldAHNHHrNjJpNLA5_8_ab-capture-image.png)
:::

:::workflow-block-item
### Review the error details and scroll to the bottom

Once you land on the error details, you can review the stack trace and get an idea how often users are encountering this error and also look at the pages where this error has been reported

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/wUb1B102YxuPtVNmIc6sC_error-details.png)

Once on this page, you can scroll down and watch the replay of a session that is encountering the error. Click on the `i` icon and then click on the `sessionId`

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/mU4Z7wj1DqBAcfz7v2beX_ab-capture-image.png)
:::

:::workflow-block-item
### Session Replay Details

Once you are on the session replay page, you can watch the replay of the entire session and understand what were the exact steps that led to the error. In this page as well the user, can click on settings to select the `show error` option
:::

:::workflow-block-item
### Click on Show errors

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/Bs5YKROoQ3Xhw6G8UErc5_ab-capture-image.png)
:::

:::workflow-block-item
### Click on Generate Test button

If you want to create a test for this scenario and check whether the same error is reproduced in any downstream environment, then click on the `Generate Test` button

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/_8ErfNO1uecCX64dsDQut_ab-capture-image.png)
:::

:::workflow-block-item
### Click on <a href="https://app.relicx.ai/97435d82-7a8b-49b9-a94f-6e8e1e36b459/session/0062355d-11de-0c30-b960-25a0850dbc2f?session_replay_selected_command=0&showErrors=true&showPreview=false" target="_blank">VIEW TEST</a>

Click on the view test button once the test is successfully created in a few seconds. View test option will take you to the Test details page.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/EyZEOrP2nOd3tbUakfSJj_ab-capture-image.png)
:::

:::workflow-block-item
### Review Test and validate

Once you have the test, review the steps, add assertions and then run it on your target environment.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/dKRSKEms3r1asijt2gTdH_ab-capture-image.png)
:::
::::


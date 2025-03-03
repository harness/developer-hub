### Why do we need to parameterize a test ?&#x20;

While a session is very specific to an environment, the tests should be environment agnostic i.e. we should be able to execute it on any environment. When you create a test or Relicx generates a test, you can  parameterize all the inputs required to run a test on another environment. It is expected that the target environment will have the required data for the successful completion of the test. For example, your test is supposed to create a user with a specific username and if you do not pass a new name every time you run the test, it will fail with a duplicate user error. Test parameterization is an easy way to address this problem

Usually, login credentials, general inputs on screens are all parameterized and are exposed in the test run screen at the time of execution.&#x20;

### How to parameterize your test ?&#x20;

Before you start parameterizing your test, the first step would be to find out where the parameters are defined. The parameters for every test can be seen by clicking the `Parameters & Config` button on the Test Edit page.


:::image{src="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/0vz4IVdrmMHZBAEsRkQue_qiuntq9c8cjjedsygk1kimage1.png" size="68" width="894" height="1363" caption position="center" signedSrc="https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/0vz4IVdrmMHZBAEsRkQue_qiuntq9c8cjjedsygk1kimage1.png"}

:::

### Declaring a Parameter

Whenever we are using data within an individual test, rather than hardcoding values within the actions/steps of our test, we can always *declare a parameter*

To declare a parameter, we just write it in place, rather than a hardcoded value for an action. As an example, if we wanted to write the name “Ben” into a form, we could replace it with $\{name}

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/2qemx0HVCgfRtbDydaJHP_image4.png)

*Note: the parameter name is a user choice, and they are ***case insensitive***, but it must be in the $\{parameter} format. There are also some reserved names:*

- $\{login\_url}
- $\{username}
- $\{password}
- $\{base\_url}

### Using a parameter

- Whenever we run a test, we can provide a value for all of the Parameters used in that test
- Whenever we execute a test Suite, all of the Parameters across the suite will be shown so a value can be provided&#x20;

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/mPHcbYr51NYAdj7TyytwT_image2.png)


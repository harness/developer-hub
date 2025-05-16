---
title: Editing Tests
description: Editing Tests
sidebar_position: 10
---
# Editing Tests

There may be many reasons when users want to Edit a test. Under the "Edit Test" view users can Add, Edit or Delete Test Steps, Set Parameters or add new Assertions.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/IHVG8hfw-dwXTlivMcfZM_edit-test-1.png)

This allows users to customize and existing test for application or business rule changes or if there something that specifically needs to be validated that has not automatically been done so.

Once the user enters the Edit test mode, a new test session is started and allows the user to set a breakpoint, run the test up to that step and then the user can add any steps as they would do in any [Interactive Test Authoring](<../creating-tests/create-tests-doc.md>). The following video demonstrates how Live Editing works.

<iframe src="https://www.loom.com/embed/66e883185c864b2b8c26057ad45939b7?sid=a1c8c608-3eca-42da-a0f7-f0f5bb5fae4e" width="800" height="450" frameborder="0" allowfullscreen></iframe>

In the Live Edit mode there are three things that users should pay attention to

**Breakpoint** - You can click before any step to create a breakpoint on that point. The grey triangle indicates the location of a breakpoint. The blue triangle indicates the current location of the test

**Continue** - This button allows the user to run the test up to that set breakpoint

**Step Over - **This button allows the user to execute one step at a time when a breakpoint is set.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/MwlLwJuJVuuM4Fl6c_eB5_edit-2-options.png)

# Quick Edit mode

If the user wants to make small changes to the test like reselecting a target or adding a step like `Wait for time` they can simply click on the test name on the test list to invoke the quick edit mode. The Quick Edit mode also serves as your view to the test details. You can review the test steps in the context of the last test execution.

### Add or Delete a Test Step

Under the "Edit Test" view a user can edit any predefined step by choosing the pencil when hovering over the test step. A step can also be added above or below by hovering over this test edit pencil.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/qah3hRqzjNXcl5i5gUpHA_01-edit-test.png)

Under the `Edit Command bar` , a user can choose from a list of available actions like the `Wait for Time` as shown in the image below

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/RSqDuNBqivl1ZzIGib0hC_image.png)

If the user doesn't want to invoke the `Live Test Edit` they can even use the quick edit mode to pick a new target element. The "Pick Target Element"  allows you to visually choose the target for your User Action or Assertion by highlighting the desired element in the screenshot of your application.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/y_uqfccqkSUSLiTALpWCO_image.png)

# Inline Parameters

Test Parameters can be changed in the Edit Test view in two locations, either directly in the test step itself or in the Params& Config View. The Parameter for the Text value can be static or defined at the environment level, which can be seen the example below:

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/RAKkTmO5J1Dc3TH_ulm91_image.png)

To see all the Parameters at once for a given Test, chose the "Params & Config" button, here you can adjust values as well as see a drop down of options for pre-defined values.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/Fog_M2AWs159-L3mXQ4_y_image.png)

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/lekF3qbqcJzpIIkgZLaU2_image.png)

After changes are complete, be sure to "Apply" the new steps and Validate your test to ensure it runs properly.

# Archiving Tests

Harness AIT allows a user to archive a test if they want to remove it from a list.

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/7lNxxEubnIHICAw9u8FAD_image.png)

Archiving gives you the option to restore a test if needed. However, you need to reach out to Harness support to restore the test back. The tests are permanently deleted once the TTL policy kicks in.
---
title: AI Auto Assertions
description: AI Auto Assertions
sidebar_position: 30
---
With Harness AI Auto Assertions, you can bid farewell to the tedious task of manually writing assertions. After each step in your test, Harness's AI engine will automatically generate and suggest relevant assertions for you. As you navigate through your app and record your test steps, Harness intelligently assesses the state and content of each page, providing you with one or more recommended assertions

Here's the best part: These AI assertions are pre-verified, ensuring they work seamlessly right from the start. When you accept these suggestions, you can trust that they will function flawlessly. And when it's time to execute your test, the assertions will be executed just like any other step, ensuring comprehensive validation of your application's functionality.
We're confident that this new addition will enhance your testing experience drastically, saving you valuable time and effort. Now you can focus on what truly matters – delivering high-quality software. So get ready to embrace the power of AI-assisted testing with Harness!

***

Here is a short video demonstration of Auto Assertions

<iframe src="https://www.loom.com/embed/b877315ebfb546288f896164ce3f9ec9?sid=09672800-f6c7-4772-b430-edb9a324f991" width="800" height="450" frameborder="0" allowfullscreen></iframe>

***

**Example of an Auto Assertion**

In the test below the user clicks on the “Checking” link which expands the menu on the side bar and then the user clicks on “View Checking” 

<DocImage
  path={require('./static/auto-assertion-1.png')}
  alt="Assert Script Success"
  title="Click to view full size image"
  width={800}
  height={600}
/>

As you can see on the screenshot above right below the highlighted step, there are two assertions that Harness AI recommended. I reviewed  and accepted one of them by clicking on the “Add Assertion” button below. 

Once the assertion is accepted, you will see it as a regular step in the test as show below 

<DocImage
  path={require('./static/auto-assertion-2.png')}
  alt="Assert Script Success"
  title="Click to view full size image"
  width={600}
  height={800}
/>


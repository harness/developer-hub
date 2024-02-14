---
sidebar_position: 3
description: Buld a pipeline that automates the SBOM Drift Detection on your GitHub repository.
keywords: [SSCA, SBOM drift]
title: Automate SBOM Drift Detection for your GitHub repository
slug: /secure-supply-chain/automate-sbom-drift-detection
---

# Automate SBOM Drift Detection with Harness SSCA and GitHub

## Overview

In this tutorial, we'll walk you through setting up a pipeline in Harness to automatically track changes in the Software Bill of Materials (SBOM) for your GitHub project. Our focus will be on creating a pipeline that triggers whenever there's a new pull request (PR). This pipeline will compare the SBOM from the PR with the SBOM of the main branch to identify any differences and generate a drift report. Once the PR is merged, it will also update the SBOM for the main branch, ensuring it's always up-to-date for future tracking. By incorporating this process into your software delivery cycle, you can easily review and approve SBOM changes before they merge, keeping your project safe from risky components and updates. 

Here's a breakdown of the process:
1. A PR is submitted to the main branch.
2. GitHub triggers the pipeline. 
3. The pipeline generates the SBOM for your feature branch. 
4. The pipeline identifies changes in the SBOM and provides a report
5. Whenever the PR gets merged, the SBOM of the main branch will be updated.



![Overview of the process]( ./static/automate-sbom-drift/overview.png "Overview of the process")


:::info
In order to maintain consistency, we'll refer to our `main` branch as both the base and default branch throughout the following sections. Also, you can choose to use your respective branch and follow along.
:::

## Prerequisites 



1. Understanding the concepts of [SBOM generation](https://developer.harness.io/docs/software-supply-chain-assurance/sbom/generate-sbom) and [SBOM Drift](https://developer.harness.io/docs/software-supply-chain-assurance/sbom/SBOM-Drift).
2. Access to Harness SSCA module
3. An account on GitHub
4. Having your [GitHub connected](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-code-repo) to the Harness account
5. A sample application repo on GitHub
6. An IDE or code editor, we will be using Visual Studio Code.


## Setting up the sample app

For this tutorial, we will use a sample store application built using ReactJS called [react-store](https://github.com/google-pay/react-store), this is freely accessible on GitHub. You can also use your own repository or follow along with the react-store app for this tutorial.



1. Fork the main branch of the react-store repository.
2. Clone the forked repository to your local/remote machine. 
3. Open the cloned codebase in your preferred code editor. 
4. Execute the command `npm install` in your terminal to install the necessary dependencies. 
5. Launch the application by running `npm start`, and then open `localhost:3000` in your web browser to view the sample app.


![Setting up the sample add](./static/automate-sbom-drift/sample-app.png "Setting up the sample app")


In the upcoming sections, we'll make some changes by introducing new libraries to the codebase. Following these changes, when we raise a PR, we'll configure a trigger in the Harness pipeline. This trigger will automatically generate an SBOM Drift report, showcasing the differences before and after the modifications.


## Setting up the Harness CI pipeline

Now that your repository is all set, let's move on to configuring the Harness CI pipeline. If you're already familiar with this setup or have an existing pipeline, feel free to jump ahead to the next sections.



1. Access the Harness platform and navigate to the SSCA module.
2. Within your project, click on the “Pipelines” section, and select “Create a Pipeline” 
3. You can name the pipeline as you prefer. A suggested name could be “SBOM Drift for React Store” if you're following along with the tutorial example.
4. Decide whether to configure your pipeline as Inline (directly within Harness) or Remote ( stored in a Git repository).
5. Choose “Third-party Git provider” as the source for your pipeline code.
6. In the Git Connector, select your account that has access to the repository.
7. Enter your repository name, “react-store,” or use the specific name if you're utilizing a different repository.
8. Choose the default branch, in our case it is ‘main’.
9. The YAML Path for your pipeline configuration should be auto-populated. If necessary, you can manually enter the location where you wish to store the YAML files of the pipeline.


<DocImage path={require('./static/automate-sbom-drift/set-up-the-pipeline.png')} width="70%" height="70%" title="Click to view full size image" />


Click “Start” to create the pipeline.


### Setting up the build stage

Once you create the pipeline, you should be able to create a new stage. Click on the “Add Stage” button and fill in the necessary fields.



1. You can name the stage “Build”
2. Enable the “Clone Codebase”
3. Configure the GitHub repository
4. Click on Set up Stage


<DocImage path={require('./static/automate-sbom-drift/set-build-stage.png')} width="50%" height="50%" title="Click to view full size image" />




This action will create the Build stage, which consists of Overview, Infrastructure, Execution, and Advanced. For the purpose of this tutorial, we will focus specifically on the Infrastructure and Execution components.

**Infrastructure:** Here, you will select the infrastructure where your build will be executed. You have the flexibility to choose from any configurable option. Alternatively, for a more straightforward setup, you can opt for the ready-to-use Harness Cloud and stick with the default platform options provided for the Harness Cloud.

**Execution:** In the Execution section, we will outline the steps necessary to generate the SBOM and drift.


### Creating Run Step to install dependencies

Before we proceed with generating the SBOM, it's important to understand that its creation depends on the `package-lock.json` file present in your project. Additionally, having the `node_modules` directory brings more visibility and increases the quality of the generated SBOM. Therefore, we will incorporate steps to install the necessary dependencies prior to the SBOM generation.

:::info
For SBOM generation, it's essential to have dependency locking files within your project, such as package-lock.json, pipfile.lock, cargo.lock, etc., depending on the technology stack you're using. While you may choose to skip the dependency installation step, it's important to note that having the dependencies installed produces a higher-quality SBOM.
:::

Go to the Execution section to start creating the steps, 



1. Click on “Add Step” and select “Add Step”.
2. Search for “Run” and click on it to add it.
3. Name the step you wish, a suggested name could be "Install dependencies" for clarity.
4. For the shell type, choose "Sh" from the Shell dropdown menu.
5. Input the following commands to remove any existing `node_modules` and `package-lock.json` before installing the dependencies anew

        ```
        rm -rf ./node_modules package-lock.json
        npm install
        ```


6. Expand the “Optional Configuration” and select your Container Registry, If your Docker is not already connected to Harness, please find additional guidance on how to set this up [here](https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/)
7. For the Docker image, set it to use `node:14`

      


<DocImage path={require('./static/automate-sbom-drift/run-step.png')} width="50%" height="50%" title="Click to view full size image" />

You can ignore all the other fields and click on “Apply Changes” to create the “Install dependencies” step.


### Creating SBOM Orchestration step

You can delve into the configuration of the SBOM Orchestration step [here](https://developer.harness.io/docs/software-supply-chain-assurance/sbom/generate-sbom#add-the-ssca-orchestration-step), although we won't go into extensive detail for this tutorial. However, this step is where the SBOM will be generated. Let's proceed to configure this step:



1. Start by clicking on the “Add Step” button located to the right of the “Install dependencies” step. 
2. From the list of available steps, search for and select the “SBOM Orchestration” step.
3. Give this step a name for clarity; a recommended name could be "Generate SBOM." 
4. Set the method to “Generation.” 
5. Choose "Syft" as the SBOM Tool and select the format as "SPDX." 
6. Set the Artifact type to “Repository.” 
7. Input the URL of your project's repository or the repository where you have forked the "react-store" project, [https://github.com/tejakummarikuntla/react-store](https://github.com/tejakummarikuntla/react-store)  
8. For the branch name, enter `<+ <+trigger.sourceBranch>==null?"main":<+trigger.sourceBranch> >` 
This expression utilizes a ternary operator drawing the data from triggers. It is resolved at execution time, returning "main" if no feature branch is present. Conversely, if a feature branch does exist, the expression returns the name of that feature branch. Refer to [Harness variable expression](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/) for more information. This gets more clear while we add triggers to our pipeline in the coming sections.
9. You can ignore the “Source Path” and “Workspace” fields for now. You can find more information about these fields [here](https://developer.harness.io/docs/software-supply-chain-assurance/sbom/generate-sbom#add-the-ssca-orchestration-step). 
10. Check the “SBOM Drift” option; input `main` as the Git Branch.

    
<DocImage path={require('./static/automate-sbom-drift/sbom-orchestration.png')} width="50%" height="50%" title="Click to view full size image" />


11. Click on “Apply Changes” to create the “Generate SBOM” step.
12. Save the pipeline by clicking on the “Save” button on the top right corner of the page.


<DocImage path={require('./static/automate-sbom-drift/steps-and-stages.png')} width="50%" height="50%" title="Click to view full size image" />



## Setting Pipeline Triggers with GitHub events

With the pipeline now set up, the next step is to configure the pipeline triggers. These triggers will execute the pipeline whenever a specific event occurs. We'll be setting up two triggers:



1. Trigger on push to the main branch.
2. Trigger on Pull Request submission.

While we do not go deeper into triggers, you can learn more about triggers [here](https://developer.harness.io/docs/platform/triggers/triggering-pipelines/).


### Trigger on push to the main branch



1. Open your pipeline. 
2. Select "Triggers" from the top right corner.
3. Click on the "+ New Trigger" button.
4. Under the Webhooks section, pick "GitHub." 
5. For Configuration: 
    1. Name it "Trigger on push to the main branch."
    2. Set up the GitHub connector.
    3. Enter `react-store` as the repository name.
    4. Choose "Push" for the event type.
    5. Click "Continue." 
6. For Conditions: 
    1. Set the Branch Name operator to `Equals` and Matches value to `main`
    2. Click "Continue." 
7. For Pipeline input:
    1.  Create a new input set, name it.
    2. Set the Build type in “CI Codebase” to Git Branch with `<+trigger.branch>` as input.
8. Complete by clicking on "Create Trigger." 
 
   
<DocImage path={require('./static/automate-sbom-drift/trigger-commit-to-main.png')} width="50%" height="50%" title="Click to view full size image" />
 



### Trigger on Pull Request submission

Following the previous step, create a new trigger called “Trigger on Pull Request submission” with the following details:



1. For Configuration: 
    1. Following the previous configuration, set the event to “Pull Request” and check the “Any Actions” option
2. You can skip the Conditions section and continue. 
3. For Pipeline Input:
    2.  Create a new input set, name it.
    3. Set the Build Type to “Git Branch” in CI Codebase and input as `<+trigger.sourceBranch>`
4. Complete by clicking on "Create Trigger." 


<DocImage path={require('./static/automate-sbom-drift/new-input-set.png')} width="100%" height="100%" title="Click to view full size image" />



## Triggering the pipeline for Main branch SBOM

Now that the trigger is in place, you can initiate it by either making a commit to the main branch or merging an existing PR. This action activates the "Trigger on push to the main branch," which then generates and stores the SBOM for the main branch. It's crucial to have the SBOM for the main branch available to monitor any drift from new pull requests. Additionally, maintaining an up-to-date SBOM for the main branch is essential for successfully detecting SBOM drift when the "Trigger on Pull Request" is activated.

After you trigger the pipeline and it executes successfully, you will find the SBOM for the main branch in the "Artifacts" section within SSCA.


<DocImage path={require('./static/automate-sbom-drift/main-branch-sbom.png')} width="100%" height="100%" title="Click to view full size image" />

With the SBOM for the main branch in place, it's time to introduce some changes to the codebase and prepare a PR. If you're working with your own project and already have a feature branch ready for a PR, feel free to skip ahead to the [Tirggering the pipeline on PR submission](#triggering-the-pipeline-on-pr-submission) section


## Introducing new components in the sample app

If you're using your own project for the tutorial, consider creating a new branch to experiment with adding and using various libraries. For those following the “react-store” example, let's proceed by setting up a new branch and applying some updates to the codebase.


### Creating a new branch



1. Open a terminal and go to the folder where you've cloned the project.
2. Execute the command `git checkout -b time_stamp` to create and switch to a new branch named `time_stamp`.


### Installing new packages



1. Ensure your project is ready to install new packages by running `npm install .`
2. Execute `npm install moment lodash@4.17.15 && npm i --save-dev @types/lodash`

This command sequence will install moment and lodash at version 4.17.15, along with the development dependencies for lodash's TypeScript definitions. While both moment and lodash are somewhat antiquated and not typically recommended for new projects, we will explore how SBOM Drift can help us effortlessly identify these outdated libraries in the following sections.


### Modifying App.tsx

Keeping it straightforward, we'll use the moment and lodash libraries for a simple functionality: generating a timestamp with moment and transforming this text to uppercase using lodash. This task involves adding a few lines of code to import these libraries and apply their capabilities. Please proceed by updating your App.tsx file with the following code snippet:


```
import { useEffect, useMemo, useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import moment from 'moment'; // Import moment
import _ from 'lodash'; // Import lodash

import Cart from './Store/Cart';
import Checkout from './Store/Checkout';
import Confirmation from './Store/Confirmation';
import Header from './Store/Header';
import Home from './Store/Home';
import ItemDetails from './Store/ItemDetails';
import List from './Store/List';

import { CartContext } from './Store/CartContext';
import { StoreData } from './Store/StoreData';
import { CategoryDetails } from './interfaces/CategoryDetails';
import { CartItemDetails } from './interfaces/CartItemDetails';

import './App.css';

/**Builds the base React app */
function App() {
 // Products, cart, and other shopping info
 const storeData = useMemo(() => new StoreData(), []);

 // T-shirt categories
 const [categories, setCategories] = useState([] as CategoryDetails[]);

 // Current user's shopping cart
 const [cart, setCart] = useState(storeData.getCart());

 // Updates the user's shopping cart
 function updateCart(cart: CartItemDetails[]) {
   storeData.setCart(cart);
   setCart(cart);
 }

 // Create list of categories and details
 useEffect(() => {
   storeData.getCategories().then(data => setCategories(data));
 }, [storeData]);

 // Generate the current timestamp with moment.js
 const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

 // Use lodash to transform the timestamp to uppercase
 const uppercaseTimestamp = _.toUpper(currentTime);

 // Create the router
 return (
   <CartContext.Provider value={{ cart, setCart: updateCart }}>
     <BrowserRouter>
       <Header />
       <div style={{ textAlign: 'center', margin: '20px 0' }}>
         {/* Display the uppercase timestamp */}
         <h2>Current Date and Time: {uppercaseTimestamp}</h2>
       </div>
       <Routes>
         <Route path="/" element={<Home categories={categories} />} />
         <Route path="/list/:listId/:itemId" element={<ItemDetails />} />
         <Route path="/list/:listId" element={<List categories={categories} />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/confirm" element={<Confirmation />} />
       </Routes>
     </BrowserRouter>
   </CartContext.Provider>
 );
}

export default App;

```

Save the file and run `npm start` to see the changes


### Pushing the branch

After making the necessary changes, you can proceed to commit them and then push the branch to the remote repository.


## Triggering the pipeline on PR submission

After pushing the branch, you can create a pull request from your “time_stamp” branch to your “main” branch. This action will trigger the pipeline responsible for generating the SBOM for the branch 'time_stamp.' It will also track and display any changes in components compared to the main branch SBOM.

You can click on “Details” to view the pipeline execution in Harness. 


<DocImage path={require('./static/automate-sbom-drift/PR-to-main.png')} width="70%" height="70%" title="Click to view full size image" />
 


## Viewing the SBOM Drift

To view the SBOM generated for the 'time_stamp' branch:



1. Click on 'Details' in the GitHub pipeline execution details. 
2. Alternatively, go to the 'Pipelines' section, open your pipelines, and navigate to the 'Execution history' to open the latest execution. 
3. In the 'Artifacts' section, you can find the generated SBOM. 
4. Finally, you can click on 'drift' to view and track the changes against the SBOM of the main branch.


<DocImage path={require('./static/automate-sbom-drift/sbom-drift.png')} width="70%" height="70%" title="Click to view full size image" />


The "All" tab in the drift report displays all additions, deletions, and modifications to the components. You can navigate to specific tabs to view these changes separately. This is how the "Added" tab will appear:

<DocImage path={require('./static/automate-sbom-drift/added-drift.png')} width="70%" height="70%" title="Click to view full size image" />


The SBOM for the "time_stamp" branch has been updated with two new libraries: lodash and moment. This view provides an easy way to identify the newly added libraries. In our case, both moment and lodash are significantly outdated, which can be promptly identified for any necessary action. These libraries are used here for demonstration purposes.


## Conclusion

To wrap this up, you have learned how to set up automatic tracking of changes in your software's components directly from your GitHub repo with Harness's SSCA module. You've learned to create a pipeline that kicks in every time someone submits a new pull request. This pipeline does a couple of things: it generates a detailed list of all the components in your branch and checks if anything's changed compared to the baseline SBOM. If there's something new, removed, or updated, you get a report about it.

This setup is super handy for keeping an eye on the software pieces you use and making sure nothing risky slips through when updates happen.


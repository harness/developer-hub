---
title: ServiceNow - Create/Edit Knowledge Base Articles
---



### Overview

Creating new KB articles in ServiceNow is relatively easier than it’s ever been.  There are multiple entry points to creating KB articles to make it easier and remove configuration concerns (i.e. Security).  There are a few terminologies to keep in mind when we talk about KBs and their articles, and so here are a few things to take a look at.

For writing tips on KB formatting, designing and laying out articles, please consult with [https://armory.slab.com/posts/knowledge-article-writing-tips-b6fgrxv5](https://armory.slab.com/posts/knowledge-article-writing-tips-b6fgrxv5)

This article is specifically about Creation of KB Articles.  For more on different subjects information, please look at
Creating a Knowledge Base
Creating a Template

### Terms

**Knowledge Base -** A way to sort and organize articles.  Think of these as Libraries, or File Cabinets.  Each KB has their own security. (e.g. a KB can be created so that only Support users can see certain documents, and another KB can be created so that customers can see these other documents). Create the correct KB in the correct knowledge base to expose information only to those people.
**Searches - **Using the ServiceNow Search Engine will search across all articles that the users have access to.  Each KB is denoted by their iconography, so that users will know where the KB article came from
**Articles -** Individual information documents contained within a Knowledge Base.  Security can be applied to individual articles that differs from the KB, but is in general, not recommended as then, security management will be more difficult.  
**Templates -** A way to organize Article Information so that they have a standard look.  Templates can be used across different Knowledge Bases, so uniform information (e.g. How To articles) can be served with different security, depending on which KB they are created under
**Article Workflow** - Each Article created can follow an approval workflow processes, or can be instantly published.  If the article has to go through an approval process, the article will then need to be created, saved, and then will be sent to the group to approve or not.  This happens whenever an article is published, a new version is added, or can also happen when an article is retired.



### Article Creation

#### Deciding where to put your Article
There are four Knowledge Bases to consider when creating a KB article
**KB Name****What it's used for****Who can see it**Armory Knowledge BaseInformation to work on issues and how to do things which are general knowledge. Non proprietary informationPublicArmory Knowledge Base: Customer-Only ArticlesInformation of a Professional Services/Solutions Architecture in nature. Information which customers are paying for, such as providing design choice and informationArmory + Registered Customers of the PortalArmory Internal: Support and Snow ProcessesSupport information for the management of Service Now (SNOW)Armory OnlyArmory Internal: Confidential Technical AritclesTechnical information that is Armory only, and should not be advised to the customerArmory Only




#### Starting Points

There are several entry points to creating articles.  However, do NOT format your articles in Word or other processors before pasting them in the editor.  This will add a lot of unnecessary HTML.  It is highly recommended to use the Service Now WYSWIG editor.

Via Service Now Admin
* Log in to ```Service Now Admin Console```* In the Knowledge Section, select ```Create New```* Choose the correct Knowledge Base for the article.  This will determine the security settings and who can view the Article* Select the ```Template``` for the article.* Click ```Next```
Via the Public KB site
* Go to the Public Facing Site ([https://armory.service-now.com/support](https://armory.service-now.com/support))* Click on the ```Knowledge``` link in the main page* Log in to ServiceNow (upper right corner)* From the Main Knowledge page, click on the ```ellipses (…)``` next to the **Explore our Knowledge Bases** and select ```Create Article```.  This will bring the user to a selection screen like in 1c. Select the Knowledge Base (to determine the security), the Template, and then click ```Next```
Via a Case View
* At any time, users with correct access can create an article from a Case view.  However, if the article is being created after a case is resolved, and the resolution is already entered, the case resolution will be copied over.  In all other cases, clicking on the **Create Article** button creates a blank article* This will open up a selection drop down pop up to select the **Article Template Type.  **Note that **all article types** are available, so it is important to select an article type available for the KB (e.g. For Public Knowledge KBs, **General Information, How To,** and** Issues** types are available)* The resolution information will be added to the declared **SEO Field** for the **Article Template** (e.g. ```Information``` for ```How To```, or ```Issue``` for ```Troubleshooting```)* Select the **Knowledge Base** where the article will reside.  This is a required selection.



#### Creating the Article

* Once the Knowledge Base and template are selected, users will be presented a screen with mandatory fields and information, and a pop up asking if they want to ```populate the fields with default values```. Select OK, as this will set the group for approving the changes, and the type of article (HTML)Fill in the Information for the Article as needed
* Select the Knowledge ```Category``` for the article (required)* Short Description: ``````* Fill in the rest of the information required.  Any field that has a ***** next to it must be filled out
* If the article needs to be saved and resumed later, right click on the top banner and select save.  To find the article again, search for the ```unpublished``` section of the Knowledge navigation* When completed, either select the ```Submit``` button to save the article (for the first time) and then open the article and ```Publish```, or ```Publish``` if the article was saved once already* Approvers will look over the article and either provide feedback or approve the publishing of the article.


### Handy Dandy Article Pointers

* **When Marking Code** - Code blocks AND code lines can be used in ServiceNow’s WYSIWYG editor.  If users highlight a selection and then press the **code sample** button, it will mark that section with the **```code tag```**.  If nothing is selected and then press the code sample button, it will open up the ```**Code Block insertion window**```**Adding Images to an Article** - Adding images to an article should be done as an ```attachment``` instead of as an ```image library```. When adding an image, there is a dropdown to select whether it will be added as an attachment or as a part of the image library.  There are several reasons to select image library. Image Library options are removed.
* Usually, only a single article needs access to a particular image, so it makes more sense to add it as an attachment.  * In addition, if an image is added to the image library, the image cannot be overwritten and must be manually deleted before being able to be re-added if there are changes (This option is no longer available.  Image Library option removed)* **Users can cut and paste images into the article**. However, sometimes, the image may not be editable/adjustable.  If this happens, it may need to be opened in an image program like GIMP and then copied and pasted into the ServiceNow KB article.* The following is a detailed article by ServiceNow to understand how Images work within KBs [https://hi.service-now.com/kb_view.do?sysparm_article=KB0696767](https://hi.service-now.com/kb_view.do?sysparm_article=KB0696767)
* **Numbered Lists Types** - When using numbered lists, users can also create sublists with a different numbering schema (e.g., like in this article).  Once the sublist is created, highlight it, and click on the **dropdown arrow** next to the numbered list in the WYSIWYG toolbar and select the number schema* Break the article into Sections with Headers whenever possible.  e.g. For an **Article How to Send Metrics to Datadog**, break it up into **Install Prometheus, Set Up Datadog, Connect Datadog**If the article can be broken up into several smaller articles, it is better to modularize and link to other articles because:
* It will be possible to refer back to that starting article.  e.g. **How to Install Prometheus **may be relevant to multiple articles, so users may want to break that out into its own article* If the process changes for **How to Install Prometheus**, authors only have to update that one article and because it’s linked to it from the others, they don’t need to seek out and update all the other articles when there is a change
* Use numbered steps whenever possible* Try to include pictures wherever possible, to remove ambiguity* **Please note providing any solution that is not Armory designed**, or not provided by a trusted Armory partner (e.g. GCP, AWS, etc…) should have a disclaimer before providing a link.  This is to ensure that Armory is not liable for the solution, or any security issues from the software.

Example: [https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010161](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010161)
```Please note that Armory did not design this solution, and we advise that any customers looking to implement this solution perform their due diligence on this solution, including testing on a pre-production environment before implementing​```




### Editing a Knowledge Article

There are multiple ways to accomplish edits on an article
Via the Service Now Admin Console
* In the Navigation, go to the Knowledge area → Articles → Published* Search for the article by the name* Click on the article number* In the upper right, click on **Checkout*** Make the edits again and **publish** or **submit** again.
Via the Public KB site
* Access the Public Site.  Sign in * Find the article to make changes to* Open it.  In the Upper right corner of the article, there’s the ability to click on the **Ellipses (…)** and **Edit*** In the upper right, click on **Checkout*** Make the edits again and **publish** or **submit** again

### Attaching KB Articles to your Case
As a part of our efforts to see how effective KB articles are, please ensure that you are attaching KB articles to your cases and providing the appropriate solution code when necessary
[https://support.armory.io/support?id=kb_article&sysparm_article=KB0010382](https://support.armory.io/support?id=kb_article&sysparm_article=KB0010382)



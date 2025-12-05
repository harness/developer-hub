## How to upgrade using the Pull Request Process

Starting from HSF 2.2.5 you will get a pull request notification email when a new update is released. 

### To Update:

**Review Code Changes** 

1. Go into Harness Code Repository → Pull Requests → All 
   <DocImage path={require('../../static/PR-upgrade1.png')} title="Click to view full size image" />
    - Review each of the open Pull Requests for the `harness-solutions-factory` and `harness-template-library`x repositories. We will be merging all of them in to update the version of HSF.

2. Go into `harness-solutions-factory` → Changes → Click Approve at the top right. You can see everything that has changed in this version.
   <DocImage path={require('../../static/PR-upgrade2.png')} title="Click to view full size image" />
    :::note
    To be able to Approve you need to be a member of the HSF Mirror Reviewers. To be part of this user group, the person needs to be part of the organization. Make sure the send email notification option is checked.
    :::
    <DocImage path={require('../../static/PR-upgrade3.png')} title="Click to view full size image" />

3. Go back to Conversation → Click Confirm Fast-Forward Merge 
   <DocImage path={require('../../static/PR-upgrade4.png')} title="Click to view full size image" />

4. Do the same thing for `harness-template-library` 
   <DocImage path={require('../../static/PR-upgrade5.png')} title="Click to view full size image" />
    - Review modification in Changes, click Approve, and click Confirm Merge
   <DocImage path={require('../../static/PR-upgrade6.png')} title="Click to view full size image" />
    - Before continuing, verify no additional Pull Requests are opened. At this point we have updated the source code and now we need to upgrade the installation.

**Update Core Framework Configurations** 

5. Go into Pipelines in the Solutions Factory Project

6. Run `Manage Pilot Light` → Approve Changes (Review) → Approve Now
    <DocImage path={require('../../static/PR-upgrade7.png')} title="Click to view full size image" />

7. Wait for `Manage Pilot Light` to finish and then run `Deploy Solutions Factory`
    <DocImage path={require('../../static/PR-upgrade8.png')} title="Click to view full size image" />

**Refresh IDP Workflows**

8. Because we updated `harness-template-library` run `Register Official IDP Templates`
    <DocImage path={require('../../static/PR-upgrade9.png')} title="Click to view full size image" />

9. Update is complete!
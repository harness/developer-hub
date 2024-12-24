---
title: Set up environments in FME
sidebar_label: Set up environments in FME
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025599452-Setting-up-environments-in-Split </button>
</p>

Every project in Split has its own environments. Environments typically represent the SDLC, with one for each stage: Dev, Test, Staging, Production. There's usually no reason to have more than one Split environment per SDLC environment, other than if multiple projects use the same environments.

That said, there are cases where you might have multiple staging, dev or even production environments in Split. There are some best practice recommendations:

* Every feature flag should go through all your team's environments (dev, test, & production). Skipping directly to production can lead to bugs showing up directly in production that you might otherwise uncover earlier.

* It's common, and often critical, to have environment-level permission controls enabled for production environment(s). New, inexperienced teammates may accidentally edit a feature flag or make a rollout change they did not have the authority to make. For any pre-production environments, permission controls are not as important given the lack of customer impact and the robust auditing capability.

* For any pre-production environments, our guidance is to keep it simple - focus on simple on/off instead of creating complex targeting plans. For most companies, pre-production environments often have dummy data and just a few hundred customers, and is most often used for testing.

* You don't necessarily need to see metrics in pre-production environments - unless, for example, you're doing a performance test.

We're cognizant that many companies have their own unique requirements and Split is always happy to help define an approach that will work best for you.
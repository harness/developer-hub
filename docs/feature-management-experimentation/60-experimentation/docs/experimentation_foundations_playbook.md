---
title: Experimentation Foundations Playbook
sidebar_label: Experimentation Foundations Playbook
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/20458647639949-Experimentation-Foundations-Playbook </button>
</p>

## Introduction

<p>
  When getting started with running experiments, the design phase serves as the
  foundation upon which data-driven decisions are built. This pivotal phase
  will enable your organization to rigorously evaluate the impact of changes made,
  ensuring that decisions are grounded in empirical evidence rather than assumptions.
</p>
<p>
  This playbook will be an invaluable resource, as it guides your organization
  through each critical step of the experiment design process. It assists
  in formulating well-defined hypotheses, prioritizing them based on strategic
  objectives, selecting appropriate metrics that align with business goals, and
  meticulously crafting the experimental setup. Supporting each of these
  areas, you will find ‘Split resources’ throughout this playbook, which are downloadable
  frameworks or guides to help you as a starting point. By providing comprehensive
  guidance in these key areas, this playbook empowers you to conduct effective
  experiments that yield actionable insights, ultimately driving informed decision-making
  and optimizing outcomes.
</p>
<p id="h_01HD1GPZMJEB3NHFJVTG2SHQMM"></p>
<h2 id="01HCYY5T1R0115FCN09J04BX26">
  Experiment Process &amp; Lifecycle
</h2>
<h4 id="h_01HCYY7NHH3XHNN19GJB3G3685">
  <strong>What is it?</strong>
</h4>
<p>
  An experiment lifecycle identifies the stages and processes involved in planning
  and executing an experiment. The end to end experiment lifecycle has six
  key steps:
  <strong>Brainstorm, Plan &amp; Design, Develop, Launch, Analyze and Iterate.</strong>
</p>
<p>
  <strong>Why is it important?</strong>
</p>
<p>
  For any experimentation program to be successful, teams should be able to remain
  agile and create repeatable steps. These steps give teams an outline for
  the who, what, when and where of experimentation. From conception to iteration,
  it is important that teams optimize the process itself as they go along, in order
  to move faster.
</p>
<p>
  <img src="https://help.split.io/guide-media/01HSBGVRFHPV1TJY76GGN46HX3" alt="Screenshot 2024-03-19 at 7.10.05 AM.png" />
</p>
<p>
  Program leads and individual team owners should consider the following:
</p>
<ul>
  <li>Who is involved with the experiment?</li>
  <li>What are the objectives of the experiment?</li>
  <li>What learnings will you gather from this experiment?</li>
  <li>
    Is your experiment aligned with the wider company goals?
  </li>
</ul>
<p>
  Check out Split Arcade for our
  <a href="https://arcade.split.io/certifications/4d7eacee-5031-11ed-93f5-067360dfb065">Experimentation Level 1 certification</a>,
  which reviews these steps in detail.
</p>
<p></p>
<h2 id="h_01HD1EAAA7TPPPAXR5JR53R9WT">Experiment Workflow</h2>
<h3 id="h_01HD1H4Y8T08PA2Q1ENH6EJ0GP">
  <a href="https://help.split.io/hc/en-us/article_attachments/20494775164557">Split Resource: Experiment Workflow</a>
</h3>
<h4 id="h_01HD1EBGP7MG7Z6CPT1W7T8SQB">
  <strong>What is it?</strong>
</h4>
<p>
  An experimentation workflow provides a structured and systematic approach to
  designing, conducting, and analyzing experiments. There are a variety of
  productivity and workflow tools out there, but our customers typically use Jira,
  Airtable, Trello, ProductBoard or Excel.
</p>
<p></p>
<p>
  <img src="https://help.split.io/guide-media/01HS9QHDYR2QB11ZECZSABSE5M" alt="EXP WORKFLOW.png" />
</p>
<h4 id="h_01HD1ECDSVSSG6W80SWGY27Q01">
  <strong>Why is it important?</strong>
</h4>
<p>
  It helps teams follow a clear sequence of steps, reducing the likelihood of errors
  and ensuring that experiments are carried out in a consistent manner.
</p>
<p>
  The purpose of an experimentation workflow is to facilitate data-driven decision-making,
  reduce bias, and improve efficiency by guiding teams through the experiment lifecycle.
</p>
<p>
  Having a workflow encourages organizations to define clear objectives and promotes
  a culture of continuous learning and risk mitigation by allowing teams to iterate
  on experiments, document details for reproducibility, and allocate resources
  effectively. Ultimately, it enhances collaboration among cross-functional
  teams and ensures that changes and innovations are rigorously tested before implementation,
  leading to more informed and efficient processes and outcomes.
</p>
<p></p>
<h2 id="h_01HD1F9EY61K2ZSZWQMZYK3MHS">Experiment Execution</h2>
<h3 id="01HD3NKVDGSM4AS0DJKMV7XC14">
  <a href="https://help.split.io/hc/en-us/article_attachments/20494775144333">Split Resource: Experiment Build Steps</a>
</h3>
<h4 id="h_01HD1F9J4YAAR622YB7PZGK5Q9">
  <strong>What is it?</strong>
</h4>
<p>
  Once you have your experiment hypothesis or features to measure, there are a
  few steps to complete in order to configure your experiment in the Split platform
  whilst building the code itself. This is your development and rollout plan.
  This could be a document or a series of Jira tickets which details the who, what,
  when and why for the experiment.
</p>
<h4 id="h_01HD1FA21AEMEXXNR2YFEHTNCA">
  <strong>Why is it important?</strong>
</h4>
<p>
  In order to get your experiments live as quickly and accurately as possible,
  it’s important to have a clear process detailing the feature build and QA. Follow
  the steps outlined in our help center below.
</p>
<h4 id="h_01HD1FAD40082KC6JQRP7THXSX">
  <strong>Split Help Center:</strong>
</h4>
<ul>
  <li>
    <a href="https://help.split.io/hc/en-us/articles/360025334851-Step-2-Create-a-feature-flag-and-target-users">Create a Feature Flag</a>
  </li>
  <li>
    <a href="https://help.split.io/hc/en-us/articles/22005565241101-Metrics">Create a Metric</a>
  </li>
  <li>
    <a href="https://help.split.io/hc/en-us/articles/360020525112-Edit-treatments">Edit Treatments</a>
  </li>
  <li>
    <a href="https://help.split.io/hc/en-us/articles/360020791591-Target-customers">Add Targeting Rules</a>
  </li>
  <li>
    <a href="https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings">Adjust Experiment Settings</a>
  </li>
</ul>
<p></p>
<h2 id="h_01HD1FASNH42XQDECCM28ZVJ5J">Experiment Ideation</h2>
<h3 id="01HD3NNM1GXYHRVN9PPA1RVZYX">
  <a href="https://help.split.io/hc/en-us/article_attachments/20494790253581">Split Resource: Customer Journey Map</a>
</h3>
<h4 id="h_01HD1FB1YEXRCF47SR77HC8PYB">
  <strong>What is it?</strong>
</h4>
<p>
  Behind every digital experience is a creative ideation process. Ideation
  is the stage in the ‘design thinking’ process where you concentrate on idea generation
  through sessions such as brainstorming and creative workshops. This process
  brings together the diverse perspectives from each of the teams responsible for
  optimizing the customer journey. These teams include, but are not limited
  to: marketing, data science, analytics, product, engineering, UX, and research.
</p>
<h4 id="h_01HD1FB9MFWM349406766REMQ3">
  <strong>Why is it important?</strong>
</h4>
<p class="wysiwyg-text-align-justify">
  The source of all your experiment ideas should always be from data. Leverage
  a mix of qualitative and quantitative data to locate and understand user pain
  points in the customer journey.
</p>
<p class="wysiwyg-text-align-justify">
  <strong><em>Qualitative data</em></strong><em> is a type of data that deals with descriptions, characteristics, and properties that can be observed but not measured with numbers. Typical examples in the realm of experimentation include user studies, interviews, focus groups, remote user labs, customer research, previous experiment data, competitor analysis etc.</em>
</p>
<p class="wysiwyg-text-align-justify">
  <strong><em>Quantitative data</em></strong><em> is a type of data that is expressed in numerical terms and can be measured and quantified. Typical examples in experimentation include analytics data, heatmaps, session recordings, data warehouse, customer journey data etc.</em>
</p>
<p>
  A customer journey map lays out all the touchpoints that your customers may have
  with your brand. This should include how customers first heard of your
  brand through social media or advertising, to their direct interactions with
  your product, website or support team. It should include all actions your
  customers take to complete an objective.
</p>
<p>
  Customer journey maps help teams to visualize what the customer is experiencing
  in real time and may unveil common pain points or customer challenges that need
  to be addressed.
</p>
<p></p>
<h2 id="01HD1GRC9FSZR6K3MQV5PMBWG0">Experiment Goal Tree</h2>
<h3 id="h_01HD1H5P47SZ3HS09T04EM3NV0">
  <a href="https://help.split.io/hc/en-us/article_attachments/20494765404813">Split Resource: Goal Tree</a>
</h3>
<h4 id="h_01HD1FBGNR1DY9W05DB5FDTG5F">
  <strong>What is it?</strong>
</h4>
<p>
  A goal tree is a visual representation of the hierarchical structure of goals
  and objectives within an organization, project, or any complex system.
  A goal tree consists of four buckets:
</p>
<ol>
  <li>
    <strong>Company Goal:</strong> measures a high-level metric, “big hairy audacious
    goal”, or challenge
  </li>
  <li>
    <strong>Business Unit:</strong> focuses on the lever they can control to
    reach that goal
  </li>
  <li>
    <strong>Optimization Goal:</strong> breaks down the business unit goal into
    strategic themes
  </li>
  <li>
    <strong>Experiment Goals:</strong> directly correlate with the tactical changes
    being made
  </li>
</ol>
<h4 id="h_01HD1FBM1M9FN47FGYHH3KFF9V">
  <strong>Why are they important?</strong>
</h4>
<p>
  Goal trees facilitate alignment across different functions and roles in your
  organization. They empower teams to make small, directional changes that
  visually roll up to the larger company goal.
</p>
<p></p>
<h2 id="h_01HD1FCDEHVH8GFQ0A7V3CSKXQ">Choosing Experiment Metrics</h2>
<h3 id="h_01HD1H5T6DCTTQV443H2VM5KVJ">
  <a href="https://help.split.io/hc/en-us/article_attachments/20494752665997">Split Resource: Creating Metrics</a>
</h3>
<h4 id="h_01HD1FCK68V6EBYTK8H9HFBC9Y">
  <strong>What is it?</strong>
</h4>
<p>
  Experiment metrics are the quantitative measure of success for your experiment
  hypothesis. They are the specific measurements or data points used to assess
  the performance of an experiment. These metrics help you determine whether
  the changes you've made in one variation (often referred to as the "treatment"
  or "B" version) have had a significant impact compared to the original version
  (the "control" or "A" version).
</p>
<h4 id="h_01HD1FCP6Y103XG18FHP56XBVY">
  <strong>Why is it important?</strong>
</h4>
<p>
  The choice of experiment metrics is critical because they define what success
  looks like for your test. Your metrics are important because they will
  inform how your experiment has performed, and
</p>
<p>
  whether you have a winning, losing or inconclusive outcome. Typically you
  will have primary, secondary, and guardrail metrics for each experiment.
  Read our Split Help Center links below for more information on creating a metric
  in Split.
</p>
<h4 id="h_01HD1FCSBA6ZQNBQD935ZD1FKW">
  <strong>Split Help Center</strong>
</h4>
<ul>
  <li>
    <a href="https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics">Setting up and using metrics</a>
  </li>
  <li>
    <a href="https://help.split.io/hc/en-us/articles/22005565241101-Metrics">Creating a metric</a>
  </li>
  <li>
    <a href="https://help.split.io/hc/en-us/articles/360042967172-All-about-Split-metrics">All about Split metrics</a>(video)
  </li>
</ul>
<p></p>
<h2 id="h_01HD1FD2XWQWFE387MWPEHGRZ1">Hypothesis Building</h2>
<h3 id="01HD3NQQF2KJ2TY4GQR0F6HDBB">
  <a href="https://help.split.io/hc/en-us/article_attachments/20494752648717">Split Resource: Hypothesis Framework</a>
</h3>
<h4 id="h_01HD1FD82DPSBWMCPZP6QAEQPM">
  <strong>What is it?</strong>
</h4>
<p>
  An experimental hypothesis is an educated guess or a prediction about the outcome of an experiment. This is usually formulated from data, information, and insights gathered and includes statements around opportunities and outcomes.
</p>
<h4 id="h_01HD1FDBGHNHWCF4JVC04QSHCJ">
  <strong>Why is it important?</strong>
</h4>
<p>
  Hypotheses are important in controlled experiments because they help frame the
  design and expected outcome. A well-crafted hypothesis is crucial because
  it provides a clear direction for the experiment and helps you determine whether
  the results support or refute the hypothesis.
</p>
<h4 id="h_01HD1FDDZJ3K084EC31C7BNJSD">
  <strong>Split Help Center</strong>
</h4>
<ul>
  <li>
    <a href="https://help.split.io/hc/en-us/articles/360055681831-Constructing-a-hypothesis">Constructing a hypothesis</a>
  </li>
</ul>
<p></p>
<h2 id="01HD1FEB3B0D3F90PTCQWBRB60">Experiment Prioritization</h2>
<h3 id="01HD3NSDE0PCVRMS38S29Z4NPN">
  <a href="https://help.split.io/hc/en-us/article_attachments/20494761394701">Split Resource: Prioritization Framework</a>
</h3>
<h4 id="h_01HD1FER3KV943SPQPVD1GZQM0">
  <strong>What is it?</strong>
</h4>
<p>
  A prioritization framework is a set of criteria to help teams prioritize a large
  backlog of experiment ideas and hypotheses. It is a structured approach
  used by organizations to determine the order in which they should conduct experiments.
</p>
<h4 id="h_01HD1FEVB7EQEGSVA1Z8NHP46K">
  <strong>Why is it important?</strong>
</h4>
<p>
  The prioritization framework helps teams decide which experiments to prioritize
  based on various factors, such as potential impact, resource requirements and
  effort, and strategic alignment.
</p>
<p></p>
<h2 id="h_01HD1FF7GNNJBFMBK0KCDJ90CN">Experiment Design</h2>
<h3 id="h_01HD1H67G7A0XF10646N5F6M10">
  <a href="https://help.split.io/hc/en-us/article_attachments/20494775177997">Split Resource: Experimentation Design Seed</a>
</h3>
<h3 id="h_01HD1H67G8WJRKZ6A6ACJ7G14X">
  <a href="https://help.split.io/hc/en-us/article_attachments/20494761412493">Split Resource: Feature Decision Tree</a>
</h3>
<h4 id="h_01HD1FFC62DHJD7DPDHK6QBBTK">
  <strong>What is it?</strong>
</h4>
<p>
  Experiment design centers around turning your user problems and solutions into
  a data-driven hypothesis, and building creative solutions with clear metrics
  to measure success.
</p>
<h4 id="h_01HD1FFEYFGYT85JXF6VRNYXT8">
  <strong>Why is it important?</strong>
</h4>
<p>
  Having an experiment design process is important to ensure you will always have
  insightful experiment outcomes and factor in all considerations to help you plan.
</p>
<p>These might include:</p>
<ul>
  <li>How long to run your experiment for</li>
  <li>
    Which stakeholders need to be responsible, accountable, supporting, consulted
    &amp; informed when it comes to experiment results and other stages
  </li>
  <li>
    Action plan for all outcomes (what to do if it wins, loses or remains inconclusive)
  </li>
  <li>All detail for engineers who build the experiment(s)</li>
  <li>
    Targeting, segments and metric details (knowing which events and properties
    need to be sent to Split)
  </li>
</ul>
<p></p>
<h2 id="h_01HD1FFRW0W4Q2M1VDG306JAH6">Split Arcade</h2>
<ul>
  <li>
    <a href="https://arcade.split.io/certifications">Split Arcade Certifications Portal</a>
  </li>
  <li>
    <a href="https://arcade.split.io/certifications/4d7eacee-5031-11ed-93f5-067360dfb065">Level 1: Experiment Foundations</a>|
    ~ 1.5 hours to complete
  </li>
</ul>
<h4 id="h_01HD1FG19YC4SCXNSF0SRPH07F">
  <strong>What is it?</strong>
</h4>
<p>
  The Split Arcade is a self-serve, interactive learning platform to help onboard and level up your team at scale. Our arcade provides persona-based, step-leveled learning certifications in key categories like Feature flagging, Experimentation, and Administration.
</p>
<h4 id="h_01HD1FG42GSSEFNWFKMXGZQ5TD">
  <strong>Why is it important?</strong>
</h4>
<p>
  Our Experimentation learning path
  ensures a holistic understanding of experimentation fundamentals from planning, design, and best practices, and covers Split specifics as well.
</p>
<h4 id="h_01HD1FG883DVTHDDF5WA1EGKZQ">
  <strong>What is involved?</strong>
</h4>
<p>
  <strong>Roadmap to Experimentation</strong>
</p>
<ul>
  <li>
    Understand experimentation: what it is, and which experiments to run based
    on your needs
  </li>
  <li>Understand the value of experimenting in Split</li>
  <li>Understand the lifecycle of an experiment</li>
</ul>
<p>
  <strong>Experiment Design &amp; Planning</strong>
</p>
<ul>
  <li>
    Know how to connect organizational goals with metrics to create impactful
    experiments
  </li>
  <li>
    Understand how to work cross-functionally to brainstorm experiments rooted
    in data
  </li>
  <li>
    Know how to form a hypothesis and approach experiment design
  </li>
  <li>
    Understand how to prioritize problems for high-impact experiments
  </li>
</ul>
<p>
  <strong>Creating Metrics</strong>
</p>
<ul>
  <li>
    Know how to select, add, and your organize metrics across experiments
  </li>
  <li>
    Understand Split specific features that help level up your metrics
  </li>
  <li>
    Know how to create metrics and alerts within Split using best practices
  </li>
</ul>
<p>
  <strong>Engineering: Build &amp; QA</strong>
</p>
<ul>
  <li>Understand what an A/A test is, and how to run it</li>
  <li>Understand how to navigate the results of an A/A test</li>
  <li>
    Understand Split experiment settings and when you would change them
  </li>
  <li>Know how to set up, QA, and launch an A/B test</li>
</ul>
<h4 id="h_01HD1FGFJDYRNEVQQ9TF7RZFXE">
  <strong>Who should complete it?</strong>
</h4>
<p>
  The certification has been designed for product and business-focused learners, though it is beneficial for anyone going through experiment ideation and execution while trying to align with business goals.
</p>
<p>
  We recommend completing this as a starting point to experimentation and using the Split platform.
</p>


[Split Experimentation Resource_ Hypothesis Framework (2023).pdf](https://help.split.io/hc/en-us/article_attachments/20494752648717)

[Split Experimentation Resource_ Metric Building Exercises (2023).pdf](https://help.split.io/hc/en-us/article_attachments/20494752665997)

[Split Experimentation Resource_ Prioritization Framework (2023).xlsx](https://help.split.io/hc/en-us/article_attachments/20494761394701)

[Split Experimentation Resource_ Feature Decision Tree Framework (2023).pdf](https://help.split.io/hc/en-us/article_attachments/20494761412493)

[Split Experimentation Resource_ Goal Tree (2023).pdf](https://help.split.io/hc/en-us/article_attachments/20494765404813)

[Split Experimentation Resource_ Experiment Build Steps for Split (2023).xlsx](https://help.split.io/hc/en-us/article_attachments/20494775144333)

[Split Experimentation Resource_ Experimentation Workflow (2023).pdf](https://help.split.io/hc/en-us/article_attachments/20494775164557)

[Split Experimentation Resource_ Experiment Design Template (2023).pdf](https://help.split.io/hc/en-us/article_attachments/20494775177997)

[Split Experimentation Resource_ Customer Journey Map (2023).pdf](https://help.split.io/hc/en-us/article_attachments/20494790253581)
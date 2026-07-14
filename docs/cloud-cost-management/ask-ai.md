---
title: Ask AI in CACM
description: Ask AI in CACM
sidebar_position: 7

---

## What is Ask AI?

<DocImage  path={require('./static/ask-ai-overview.png')} width="100%" height="100%" title="Click to view full size image" />

**Ask AI** is Harness AI built directly into Cloud & AI Cost Management (CACM). It lets you have a natural-language conversation with your cost data and configuration — no need to memorize where filters live, build charts by hand, or read through long reports to find an answer.

Think of it as an assistant that already knows your account's cloud spend, commitments, perspectives, cost categories, and governance rules. You ask a question or describe what you want, and it responds with a context-aware answer, an explanation, or by helping you build something.

### What can you do with Ask AI?

- **Get answers, fast** — ask about spend, trends, top cost drivers, and anomalies in plain English.
- **Understand the "why"** — have a number or chart explained in context (e.g. why utilisation is low, what caused a spike).
- **Build things conversationally** — create Perspectives and Cost Categories by describing them instead of clicking through builders.
- **Edit and refine** — adjust an existing configuration by telling the AI what to change.
- **Author policies** — generate and validate Asset Governance rules from a plain-language description.
- **Explore and iterate** — treat it as a back-and-forth conversation, drilling down with follow-up questions.

### How it works

Each place Ask AI appears is **context-aware** — it knows which page you're on and pre-loads relevant suggested prompts to get you started. You'll recognize it by the **Ask AI** pill, an AI sparkle icon, or an **Edit with AI** button. Click it, pick a suggested prompt or type your own, and continue the conversation.

> **Note:** Ask AI is available only when Harness AI is enabled for your account and you have accepted the AI end-user license agreement (EULA). If you don't see these options, contact your account administrator.

---

## The Gap We're Bridging

CACM already has the data and the tools — but getting from raw cost data to real answers and action has traditionally required effort and expertise. **Ask AI closes the gap between *having* cost data and actually *using* it.**

- **Knowledge gap (where/how to look)** — You no longer need to know that Perspectives, Cost Categories, filters, group-bys, coverage reports, or governance rules exist and how to configure each one. Just ask in plain language.
- **Analysis gap (data → insight)** — Dashboards show *what* your costs are, but not *why* they changed or *what to do next*. Ask AI turns numbers into explanations and recommendations.
- **Authoring gap (intent → configuration)** — Building a Perspective/View, a Cost Category, or a governance rule is manual and error-prone. Ask AI (and AIDA) translate your intent into working configuration, so you describe the outcome instead of assembling it step by step.
- **Expertise gap (specialist skills)** — Governance rules need policy-YAML knowledge; commitment analysis needs FinOps fluency. Ask AI and AIDA let non-experts produce expert-level output.
- **Time-to-value gap (onboarding)** — New users face a steep learning curve. Conversational entry points get them productive immediately, and contextual prompts deliver answers without navigating away.

> **In short:** Ask AI shifts CACM from *"here's your cost data, now figure it out and configure it yourself"* to *"ask what you want, and get the answer — or the configuration — built for you."*

---

## Where You'll Find Ask AI

| Page / Feature | Entry point | Best for |
|----------------|-------------|----------|
| **Overview / Cost Insights** | "Ask AI for Cost Insights" pill + suggested prompts | Understanding spend trends and where money is going |
| **Commitment Orchestrator** | "Ask AI about Commitments" pill + suggested prompts | Analyzing RI/Savings Plan commitments and coverage |
| **Commitment Utilisation cards** | "Ask AI" on each utilisation gauge | Explaining a specific utilisation number |
| **Perspective (View) Builder** | AI assistant opens with "Let's create a Perspective" | Building a cost perspective / View conversationally |
| **Cost Category Builder** | AI assistant + "Edit with AI" button | Creating and editing cost categories conversationally |

---

## 1. Overview / Cost Insights

<DocImage  path={require('./static/ask-ai-overview.png')} width= "100%" height="100%" title="Click to view full size image" />

### What is Ask AI here?
On the CACM **Overview** page, Ask AI appears as an **"Ask AI for Cost Insights"** pill alongside a set of suggested prompts. It's your entry point for understanding overall cloud spend — a conversational layer over the same data you see in the summary cards and charts, so you can ask "what's happening with my costs?" without building a single filter.

### What you can do with it
Ask high-level questions about spend across all your cloud providers and clusters, get plain-language explanations of trends and changes, and receive suggestions on where to focus cost-reduction efforts. It's designed for the "first look" moment when you open CACM.

### Use cases
- **Spot your biggest cost drivers** — find which providers, services, or accounts dominate spend this month.
- **Track month-over-month changes** — understand whether costs went up or down and by how much.
- **Investigate spikes** — ask what caused a sudden increase in a given period.
- **Find savings opportunities** — get high-level suggestions for reducing spend.
- **Compare providers** — see how AWS, Azure, GCP, and cluster costs stack up against each other.
- **Kick off deeper analysis** — start broad here, then follow up to narrow into a specific team, service, or time range.

### Example questions
- "What are my top spenders this month across cloud providers?"
- "How have my costs changed over the month?"
- "What can I do to bring down spend?"
- "Which service grew the most compared to last month?"
- "Why did my AWS costs increase last week?"

### How to use it
1. Open the **Overview** page.
2. Click the **Ask AI for Cost Insights** pill, or pick one of the suggested prompts.
3. The AI assistant opens; type follow-up questions to drill deeper.

---

## 2. Commitment Orchestrator

<DocImage  path={require('./static/ask-ai-commitments.png')} width="100%" height="100%" title="Click to view full size image" />

### What is Ask AI here?
In the **Commitment Orchestrator** page header, Ask AI appears as an **"Ask AI about Commitments"** pill with commitment-focused suggested prompts. It helps you make sense of your Reserved Instance (RI) and Savings Plan (SP) landscape — coverage, gaps, and optimization opportunities — without manually cross-referencing multiple coverage and utilisation reports.

Also, on the **Commitment Utilisation** summary, each gauge card (Overall, Savings Plan, Reserved Instances) has its own **Ask AI** action. Unlike the broader Commitment Orchestrator prompt, this is hyper-focused: it pre-fills a question with the exact utilisation percentage you're looking at, so the AI explains *that specific number* in context.

### What you can do with it
Ask the AI to analyze your commitment portfolio, surface where coverage is strong or weak, and highlight instance types or families that need attention. It turns a complex commitments picture into a conversation.

### Use cases
- **Analyze your commitment landscape** — get an overview of your AWS EC2/RDS/ElastiCache commitments.
- **Find coverage gaps** — identify instance types or families with the least coverage that may be running on-demand unnecessarily.
- **Spot over-commitment** — find where you've committed more than you're using.
- **Prioritize action** — understand which changes would have the biggest savings impact.
- **Understand RI vs SP mix** — reason about how Reserved Instances and Savings Plans combine in your coverage.
- **Plan purchases** — explore what additional commitments could improve coverage.

### Example questions
- "Analyze my AWS commitments."
- "Analyze my AWS EC2 commitment landscape."
- "Which instance types/families have the most and least coverage?"
- "Where am I running on-demand that could be covered by a commitment?"
- "What should I prioritize to improve my coverage?"

### How to use it
1. Go to **Commitment Orchestrator**.
2. In the page header, click the **Ask AI about Commitments** pill or a suggested prompt or on any gauge card (Overall, Savings Plan, Reserved Instances), click the **Ask AI** action.
3. Continue the conversation for deeper analysis.


---

## 3. Perspective (View) Builder

<DocImage  path={require('./static/ask-ai-perspective.png')} width="100%" height="100%" title="Click to view full size image" />

### What is Ask AI here?
A **Perspective** — also referred to as a **View** — is a custom, saved view of your cloud spend, defined by rules and filters that slice costs the way your business thinks about them (by team, environment, product, etc.). In the **Perspective Builder**, Ask AI opens automatically with the prompt **"Let's create a Perspective"** and lets you build that view by describing it in plain language instead of manually configuring every rule and filter.

> **Note on terminology:** Perspectives are increasingly surfaced as **Views**, and newer Views can be edited in the **Cost Explorer** (which adds capabilities like custom saved time ranges, unit costs, and AI cost tracking that the legacy Perspective builder doesn't support). You may see both "Perspective" and "View" in the product — they refer to the same concept.

### What you can do with it
Describe the view you want and let the assistant translate your intent into perspective rules — choosing the right filters, group-bys, and conditions for you. You stay in control and can refine as you go.

### Use cases
- **Build a perspective from a description** — e.g. "group my AWS spend by team and environment."
- **Filter to what matters** — scope a view to specific accounts, services, regions, or tags.
- **Set the grouping** — ask for spend grouped by a dimension without knowing the exact field names.
- **Combine conditions** — express multi-condition rules conversationally (e.g. production workloads for one team).
- **Speed up onboarding** — help new users create their first perspective without learning the full builder.
- **Iterate quickly** — adjust the perspective by asking for changes rather than reworking rules manually.

### Example questions
- "Let's create a Perspective for my production AWS spend."
- "Group my costs by team and environment."
- "Show only GCP spend for the data-platform project."
- "Add a filter for the us-east-1 region."

### How to use it
1. From the **Perspectives** list, start creating a new Perspective.
2. The AI assistant opens automatically with an initial prompt.
3. Describe the view you want; the assistant helps assemble it, and you can refin


---

## 4. Cost Category Builder

<DocImage  path={require('./static/ask-ai-costcategory.png')} width="100%" height="100%" title="Click to view full size image" />

### What is Ask AI here?
A **Cost Category** groups spend into meaningful business buckets (for example: teams, departments, products, or cost centers), so shared cloud costs can be allocated and reported in terms your organization understands. In the **Cost Category Builder**, Ask AI opens with the prompt **"Let's create a Cost Category"** to help you define those buckets conversationally, and an **Edit with AI** button lets you refine existing buckets later.

### What you can do with it
Create cost buckets by describing your organizational structure, then edit and reorganize them through conversation — no need to hand-configure each bucket's rules one by one.

### Use cases
- **Create a cost category from scratch** — describe your teams/departments and let AI define the buckets.
- **Map spend to your org** — allocate shared costs to business units, products, or cost centers.
- **Define bucket rules** — express what belongs in each bucket in plain language.
- **Edit existing buckets** — use **Edit with AI** to rename, merge, split, or adjust buckets after creation.
- **Handle shared/unattributed costs** — ask how to allocate costs that don't map cleanly to one bucket.
- **Standardize reporting** — build categories that make chargeback/showback reports meaningful.

### Example questions
- "Let's create a Cost Category for my engineering teams."
- "Create buckets for Platform, Data, and Frontend teams."
- "Add a bucket for shared infrastructure costs."
- "Edit this category to split the Platform bucket by environment."

### How to use it
1. From the **Cost Categories** list, start creating a new Cost Category.
2. The AI assistant opens with an initial prompt.
3. As you add cost buckets, use **Edit with AI** to adjust them.

---

## Tips for Better Answers

- **Be specific about scope** — mention the cloud provider, time range, team, or service you care about.
- **Start with a suggested prompt** — then refine with follow-up questions.
- **Reference what you see** — on utilisation cards, the prompt already includes the exact figure, so ask "why" and "what next."
- **Iterate** — treat it as a conversation; narrow down step by step.

---

## Frequently Asked Questions

**Q: Why don't I see Ask AI anywhere?**
A: Harness AI must be enabled for your account and the AI EULA accepted. Ask your administrator.

**Q: Is Ask AI the same everywhere?**
A: The underlying assistant is shared across Overview, Commitment Orchestrator, Commitment Utilisation, Perspective Builder, and Cost Category Builder. Governance uses a separate copilot called **AIDA**.

**Q: Can Ask AI make changes for me?**
A: In the Perspective and Cost Category builders it helps you construct and edit configurations. On analysis pages (Overview, Commitments) it answers questions and provides insights.

**Q: Does Ask AI use my actual cost data?**
A: Yes — answers are grounded in your account's cost, commitment, and usage data for context-aware responses.

**Q: Are the suggested prompts the only things I can ask?**
A: No. Suggested prompts are shortcuts. You can type any question and ask follow-ups.



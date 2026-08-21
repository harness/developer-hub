---
title: MLOps best practices
sidebar_label: Best Practices
description: Recommended practices for running machine learning workloads in Harness, and what breaks when you skip them.
sidebar_position: 40
keywords:
  - mlops
  - best practices
  - model governance
  - reproducibility
tags:
  - ci
  - mlops
  - best-practices
---

These are the practices that keep machine learning pipelines reproducible, governable, and cheap enough to run continuously. Each one states what to do and what breaks when you skip it. Go to [MLOps with Harness](/docs/continuous-integration/development-guides/mlops/mlops-overview) to understand how Harness maps onto the machine learning lifecycle before you apply these.

---

## Version code, data, and models together

A model is the product of three inputs, so version all three and record which combination produced a given artifact.

- **Code:** Keep training scripts, notebooks, and pipeline definitions in Git. Store your pipeline as code with [pipeline Git experience](/docs/platform/git-experience/configure-git-experience-for-harness-entities) so a pipeline change is reviewable alongside the model change.
- **Data:** Version datasets, or at minimum record an immutable dataset identifier such as an object store path with a version ID.
- **Models:** Version the trained model with the parameters, training script commit, and environment that produced it. Tag model images with the build identifier rather than only `latest`.

If you do not version all three, you cannot reproduce a result or roll back to a known-good model. A rollback that restores the previous code but retrains on current data produces a different model than the one you were trying to restore, which turns an incident into a research project.

---

## Automate training and validation in a pipeline

Run training, testing, and packaging as pipeline steps rather than on a workstation. Go to [CI pipeline components](/docs/continuous-integration/use-ci/prep-ci-pipeline-components) to structure the stages, and to [Integrate ML platforms with Harness CI](/docs/continuous-integration/development-guides/mlops/mlops-integrations) to run the training job on a managed ML platform.

If training stays manual, the model that reaches production is the one a single person built on a machine nobody else can inspect. Onboarding, audits, and incident response all stall on that person's availability.

**Trade-off:** Pipeline-based training costs more to set up than a notebook run, and short experiments are genuinely faster on a laptop. Keep exploration local. Move to a pipeline at the point where a model becomes a candidate for release.

---

## Gate promotion on model quality, not only on tests passing

Write an explicit threshold check for the metrics that matter to your use case, such as accuracy, precision, recall, or AUC-ROC, and fail the pipeline when the model misses the bar. Add [Policy as Code](/docs/platform/governance/policy-as-code/harness-governance-overview) to enforce rules that must hold across every model, and an [approval step](/docs/platform/approvals/approvals-tutorial) before the production stage.

If the pipeline only checks that the code ran, a model that trained successfully on bad data ships successfully too. A green pipeline then means "the job completed", not "the model is fit to serve", and the difference surfaces in production predictions.

Attach no `Ignore` failure strategy to a quality gate. An ignored failing check is worse than no check, because it reports safety it does not provide.

---

## Containerize the training and serving environment

Package training code, libraries, and dependencies into a container image, and serve inference from an image built on the same dependency set. Use [Build and Push steps](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry) to produce the images, and orchestrate them with Kubernetes or your platform equivalent for scaling.

If environments drift between training and serving, a model that scores well during validation returns different predictions in production because a library version changed underneath it. These defects are expensive to diagnose because the model itself is correct.

---

## Track experiments and log metrics to a durable store

Log parameters, metrics, dataset identifiers, and outcomes for every training run to a store that outlives the pipeline execution, such as an MLflow tracking server. Publish test results to Harness as JUnit reports so pass and fail status is visible in the execution.

If run metadata lives only in build logs, it disappears with your log retention window. You lose the ability to explain why one model was chosen over another, which is exactly the question an auditor or a post-incident review asks.

---

## Store every credential as a secret

Reference cloud keys, tokens, and tracking server credentials through [text secrets](/docs/platform/secrets/add-use-text-secrets) and expressions such as `<+secrets.getValue("aws_access_key_id")>`. Never write a credential into pipeline YAML or a notebook.

If credentials sit in YAML, they enter Git history, appear in build logs, and reach everyone with repository read access. Rotating them afterwards means rewriting history, and you cannot prove the old key was never used.

---

## Restrict and record who promotes a model

Grant deployment permissions through [RBAC](/docs/platform/role-based-access-control/rbac-in-harness) so training is broadly available but promotion to production is not. Confirm that [audit trails](/docs/platform/governance/audit-trail) capture pipeline and model changes.

Without this separation, any user who can run a pipeline can put a model in front of customers. In a regulated context you also cannot answer who approved a given model version, which is a compliance finding rather than an engineering inconvenience.

---

## Evaluate models for bias before release

Test for fairness across the groups your model affects, and treat a fairness regression as a release blocker on the same footing as an accuracy regression. Document the evaluation and its result with the model version.

A model trained on historical decisions reproduces the bias in those decisions. If you do not test for it, the first evidence arrives as a discriminatory outcome affecting real people, with regulatory exposure attached under data protection and fair lending rules.

---

## Monitor for drift and schedule retraining

Monitor prediction quality and input distributions after release, and use [triggers](/docs/platform/triggers/triggers-reference) or scheduled pipelines to retrain when drift crosses a threshold or when a model exceeds a freshness limit.

A model degrades quietly as production data moves away from its training distribution. Without drift monitoring, nothing fails and no alert fires. You discover the decay through a business metric weeks later, by which time the model has been making poor decisions for the whole interval.

---

## Control training and inference cost

Right-size compute for training jobs, shut down evaluation endpoints when a run finishes, and set budgets on the accounts hosting your ML workloads. Delete test endpoints explicitly in the pipeline rather than leaving cleanup to whoever remembers.

Training instances and inference endpoints bill by the hour whether or not they serve traffic. An endpoint left running after an experiment is the most common source of unexpected ML spend, and it produces no signal until the invoice arrives.

**Trade-off:** Smaller instances lengthen training time, and aggressive endpoint teardown adds cold-start latency to the next evaluation. Size for your iteration speed during development and for your service level in production.

---

## Next steps

Apply these practices to a working pipeline, then harden it with governance and platform controls.

- [Tutorial - End-to-end MLOps CI/CD pipeline with Harness and AWS](/docs/continuous-integration/development-guides/mlops/e2e-mlops-tutorial): Build a pipeline that scans, gates, and deploys a model.
- [Integrate ML platforms with Harness CI](/docs/continuous-integration/development-guides/mlops/mlops-integrations): Run training and deployment on your ML platform.
- [Policy as Code](/docs/platform/governance/policy-as-code/harness-governance-overview): Enforce rules that every model pipeline must satisfy.
- [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness): Control who can promote a model to production.

module.exports = {
  redirects: [
    //Static Re-directs
    {
      from: "/release-notes",
      to: "/release-notes/whats-new",
    },
    {
      from: "/docs/category/documentation",
      to: "/docs",
    },
    {
      from: "/tutorials/get-started",
      to: "/tutorials",
    },
    {
      from: "/release-notes/harness-platform",
      to: "/release-notes/platform",
    },

    //===================================================================================
    //
    //  H O W   T O   A D D   R E D I R E C T S
    //
    //  - Use the form in the example below.
    //  - Create a redirect for each target page or folder on DevHub.
    //  - Remove the forward-slash characters that comment out the lines of the example object.
    //  - Note the use of commas.
    //
    //  Created by User for PR-123 on Jan 14, 2023
    //  {
    //    from: "/docs/platform/delegates/delegate-guide/automate-delegate-installation",
    //    to: "/docs/platform/delegates/installation",
    //  },
    //===================================================================================

  // Created by SudheendraKatte for branch cet-whats-supported on August 3 2023
    
  {
      from: "/docs/continuous-error-tracking/agent-compatibility",
      to: "/docs/continuous-error-tracking/whats-supported",
    },
    
    // Created by aimurphy from branch ci-ti-refresh-multiple-tickets on July 27, 2023
    {
      from: "/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure",
    },
    {
      from: "/docs/continuous-integration/use-ci/run-ci-scripts/run-a-script-in-a-ci-stage",
      to: "/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings",
    },
    {
      from: "/docs/continuous-integration/use-ci/run-ci-scripts/modify-and-override-build-settings-before-a-build",
      to: "/docs/continuous-integration/use-ci/set-up-test-intelligence/modify-and-override-build-settings-before-a-build",
    },
    {
      from: "/docs/continuous-integration/use-ci/build-stage-settings/modify-and-override-build-settings-before-a-build",
      to: "/docs/continuous-integration/use-ci/set-up-test-intelligence/modify-and-override-build-settings-before-a-build",
    },
    {
      from: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/modify-and-override-build-settings-before-a-build",
      to: "/docs/continuous-integration/use-ci/set-up-test-intelligence/modify-and-override-build-settings-before-a-build",
    },
    {
      from: "/docs/continuous-integration/ci-quickstarts/test-intelligence-concepts",
      to: "/docs/continuous-integration/use-ci/set-up-test-intelligence",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/configure-run-tests-step-settings",
      to: "/docs/continuous-integration/use-ci/set-up-test-intelligence",
    },
    {
      from: "/docs/continuous-integration/use-ci/set-up-test-intelligence/configure-run-tests-step-settings",
      to: "/docs/continuous-integration/use-ci/set-up-test-intelligence",
    },

    // Created by roshnisarangadharan from branch DOC-3449 on July 24, 2023
    {
      from: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/using-http-requests-in-cd-pipelines",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/using-http-requests-in-cd-pipelines",
    },
    {
      from: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/using-shell-scripts",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/using-shell-scripts",
    },
    {
      from: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/download-and-copy-artifacts-using-the-command-step",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/download-and-copy-artifacts-using-the-command-step",
    },
    {
      from: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/run-a-script-on-multiple-target-instances",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/run-a-script-on-multiple-target-instances",
    },
    {
      from: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/wait-step",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/wait-step",
    },
    {
      from: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/container-step",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/container-step",
    },

    // Created by schoudhury on July 16, 2023
    {
      from: "/tutorials/internal-developer-portal/create-your-first-service-onboarding-pipeline",
      to: "/tutorials/internal-developer-portal/service-onboarding-pipeline",
    },

    // Create by aimurphy for branch DOC-3386 on July 11, 2023

    {
      from: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-build-image-updates",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci",
    },

    {
      from: "/docs/continuous-integration/ci-technical-reference/ci-build-image-updates",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci",
    },

    {
      from: "/docs/continuous-integration/use-ci/build-stage-settings/ci-build-image-updates",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci",
    },

    
    // Created by roshnisarangadharan from branch fix-broken-links-cd on July 12 2023

    {
      from: "/docs/platform/notifications",
      to: "/docs/category/notifications",
    },
    {
      from: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/notifications/notify-users-of-pipeline-events/",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/",
    },
    
    // Created by roshnisarangadharan from branch DOC-3334-fix-broken-links-in-cd-docs on June 28 2023

    {
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/kubernetes-deployments-overview/",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/cd-notifications/notify-users-of-pipeline-events",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/",
    },

    {
      from: "/docs/category/cloud-platform-connectors",
      to: "/docs/category/cloud-providers"
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cd-general-steps/run-jenkins-jobs-in-cd-pipelines/",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/builds/run-jenkins-jobs-in-cd-pipelines"
    },

    {
      from: "/docs/continuous-delivery/cd-infrastructure/kubernetes-infra/define-your-kubernetes-target-infrastructure/",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure"
    },

    {
      from: "/docs/continuous-delivery/cd-services/k8s-services/kubernetes-services",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-services"
    },
    
    {
      from: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/k8s-services/kubernetes-services",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-services"
    },

    {
      from: "/docs/continuous-delivery/onboard-cd/cd-quickstarts/custom-deployment-tutorial/",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial"
    },

    {
      from: "/docs/continuous-delivery/onboard-cd/cd-quickstarts/serverless-lambda-cd-quickstart",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-lambda-cd-quickstart"
    },

    {
      from: "/docs/platform/2_Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools/",
      to: "/docs/platform/Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools"
    },


    // Created by roshnisarangadharan from branch DOC-3192-remove-single-topic-folders on June 15 2023
    
    {
      from: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/step-groups",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups",
    },

    {
      from: "/docs/continuous-delivery/cd-infrastructure/terragrunt/terragrunt-howtos",
      to: "/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos",
    },

    {
      from: "/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm/native-helm-quickstart",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart",
    },

    {
      from: "/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-tutorial",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg-tutorial",
    },

    {
      from: "/docs/continuous-delivery/deploy-srv-diff-platforms/aws/lambda/aws-lambda-deployments",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments",
    },

    {
      from: "/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot/spot-deployment",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot-deployment",
    },

    {
      from: "/docs/continuous-delivery/deploy-srv-diff-platforms/google/google-functions",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/google-functions",
    },

    {
      from: "/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployments/custom-deployment-tutorial",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial",
    },

    {
      from: "/docs/continuous-delivery/x-platform-cd-features/advanced/builds/run-jenkins-jobs-in-cd-pipelines",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/builds/run-jenkins-jobs-in-cd-pipelines",
    },

    {
      from: "/docs/continuous-delivery/x-platform-cd-features/advanced/run-jenkins-jobs-in-cd-pipelines",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/builds/run-jenkins-jobs-in-cd-pipelines",
    },

    {
      from: "/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-framework/serverless-lambda-cd-quickstart",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-lambda-cd-quickstart",
    },

    {
      from: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-infra/define-your-kubernetes-target-infrastructure",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure",
    },

    // Created by aimurphy for branch doc-2550 on June 9, 2023

    {
      from: "/tutorials/build-code/ci-publish-allure-report",
      to: "/tutorials/ci-pipelines/publish/artifacts-tab",
    },

    {
      from: "/tutorials/build-code/test/allure-report",
      to: "/tutorials/ci-pipelines/publish/artifacts-tab",
    },

    {
      from: "/tutorials/ci-pipelines/test/allure-report",
      to: "/tutorials/ci-pipelines/publish/artifacts-tab",
    },

    // Created by aimurphy for branch doc-1594 on June 8, 2023

    {
      from: "/docs/platform/Connectors/Code-Repositories/add-a-git-hub-connector",
      to: "/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference",
    },

    {
      from: "/docs/platform/Connectors/add-a-git-hub-connector",
      to: "/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference",
    },

    // Created by aimurphy for DOC-3231 on June 7 2023

    {
      from: "/docs/continuous-integration/troubleshooting-ci",
      to: "/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci",
    },

    {
      from: "/docs/continuous-integration/use-ci/debug-mode",
      to: "/docs/continuous-integration/troubleshoot-ci/debug-mode",
    },

    // Created by aimurphy for branch doc-2951 on May 4 2023

    {
      from: "/docs/continuous-integration/ci-quickstarts/drone-and-harness",
      to: "/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins",
    },

    // Created by SudheendraKatte for branch cv-metric-log on May 31 2023

    {
      from:"/docs/continuous-delivery/verify/cv-concepts/verification-results",
      to: "/docs/category/understand-cv-results",
    },

    // Created by Charanya Jayaraman to fix CCM broken link on May 23 2023

    {
      from:"/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/auto-stopping-rules",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/auto-stopping-rules",
    },

    // Created by RashmiNandaSahoo to fix gitx broken link on May 22 2023

    {
      from:"/docs/platform/Git-Experience/harness-git-experience-overview",
      to: "/docs/platform/Git-Experience/git-experience-overview",
    },

    // Created by roshnisarangadharan from branch fix-cd-link on May 19 2023

    {
      from: "/docs/continuous-delivery/cd-deployments-category/deployment-concepts",
      to: "/docs/continuous-delivery/manage-deployments/deployment-concepts",
    },

    // Created by SudheendraKatte for branch cet-redirect on May 19 2023

    {
      from: "/docs/category/continuous-error-tracking",
      to: "/docs/continuous-error-tracking/",
    },

    // Created by SudheendraKatte for branch cet-broken-link on May 17 2023

    {
      from: "/docs/category/error-tracking",
      to: "/docs/continuous-error-tracking/getting-started/cet-overview",
    },

    // Created by aimurphy for branch doc-3104 on May 15 2023

    {
      from: "/tutorials/build-code/ci-react-quickstart",
      to: "/tutorials/ci-pipelines",
    },

    {
      from: "/tutorials/build-code/build/react",
      to: "/tutorials/ci-pipelines",
    },

    {
      from: "/tutorials/ci-pipelines/build/react",
      to: "/tutorials/ci-pipelines",
    },

    {
      from: "/tutorials/build-code/build/rust",
      to: "/tutorials/ci-pipelines",
    },

    {
      from: "/tutorials/build-code/ci-tutorial-rust-container",
      to: "/tutorials/ci-pipelines",
    },

    {
      from: "/tutorials/ci-pipelines/build/rust",
      to: "/tutorials/ci-pipelines",
    },

    {
      from: "/tutorials/build-code/build/kubernetes-build-farm",
      to: "/tutorials/ci-pipelines/kubernetes-build-farm",
    },

    {
      from: "/tutorials/build-code/ci-tutorial-kubernetes-cluster-build-infra",
      to: "/tutorials/ci-pipelines/kubernetes-build-farm",
    },

    {
      from: "/tutorials/ci-pipelines/build/kubernetes-build-farm",
      to: "/tutorials/ci-pipelines/kubernetes-build-farm",
    },

    {
      from: "/tutorials/build-code/build/tfc-notification",
      to: "/tutorials/ci-pipelines/tfc-notification",
    },

    {
      from: "/tutorials/ci-pipelines/build/tfc-notification",
      to: "/tutorials/ci-pipelines/tfc-notification",
    },

    // Created by aimurphy for branch ci-4876 on May 10 2023

    {
      from: "/docs/platform/Triggers/trigger-pipelines-using-custom-payload-conditions",
      to: "/docs/platform/Triggers/triggering-pipelines",
    },

    // Created by aimurphy for branch ci-misc-small-items on May 3 2023

    {
      from: "/tutorials/ci-pipelines/build/signed-image",
      to: "/tutorials/ci-pipelines/build/go",
    },

    {
      from: "/docs/category/troubleshoot-and-optimize-ci",
      to: "/docs/category/troubleshoot-ci",
    },

    {
      from: "/docs/continuous-integration/troubleshoot/troubleshooting-ci",
      to: "/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci",
    },

    {
      from: "/docs/category/view-your-build",
      to: "/docs/continuous-integration/use-ci/viewing-builds",
    },

    {
      from: "/docs/category/view-builds",
      to: "/docs/continuous-integration/use-ci/viewing-builds",
    },

    {
      from: "/docs/continuous-integration/use-ci/view-your-builds/viewing-builds",
      to: "/docs/continuous-integration/use-ci/viewing-builds",
    },

    // Created by Kim Fields to fix 404s found by marketing
    {
      from: "/docs/category/add-load-balancer-for-autostopping-rules",
      to: "/docs/category/add-load-balancers-for-autostopping-rules",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/ticketing-systems-category/update-service-now-tickets-in-cd-stages",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/update-service-now-tickets-in-cd-stages",
    },

    {
      from: "/docs/chaos-engineering/chaos-faults/security-chaos/kube-security-cis",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/security-chaos/kube-security-cis",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/ticketing-systems-category/create-service-now-tickets-in-cd-stages",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-service-now-tickets-in-cd-stages",
    }, 

    {
      from: "/docs/continuous-delivery/cd-advanced/ticketing-systems-category/update-jira-issues-in-cd-stages",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/update-jira-issues-in-cd-stages",
    },

    {
      from: "/docs/chaos-engineering/chaos-faults/load/locust-loadgen-chaos",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/load/locust-loadgen",
    },

    {
      from: "/docs/continuous-delivery/cd-technical-reference/cd-k8s-ref/kubernetes-apply-step",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step",
    },

    {
      from: "/docs/continuous-delivery/cd-services/cd-services-general/add-inline-manifests-using-file-store",
      to: "/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store",
    },

    {
      from: "/docs/continuous-delivery/onboard-cd/upgrading/upgrade-cd-v2",
      to: "/docs/category/upgrading-cd",
    },

    {
      from: "/docs/category/cd-tutorials",
      to: "/tutorials/cd-pipelines",
    },

    {
      from: "/docs/first-gen/continuous-delivery/model-cd-pipeline/workflows/docs/category/cicd-artifact-build-and-deploy-pipelines",
      to: "/docs/first-gen/continuous-delivery/concepts-cd/deployment-types/artifact-build-and-deploy-pipelines-overview",
    },

    {
      from: "/docs/feature-flags/ff-sdks/client-sdks/docs/feature-flags/ff-creating-flag/create-a-project",
      to: "/docs/feature-flags/ff-creating-flag/create-a-project",
    },

    {
      from: "/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/docs/platform/Connectors/Cloud-providers/add-aws-connector",
      to: "/docs/category/cloudformation",
    },

    {
      from: "/docs/first-gen/first-gen-quickstarts/docs/category/iis-net-deployments",
      to: "/docs/category/iis-net-deployments",
    },

    {
      from: "/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference",
      to: "/docs/category/cloudformation",
    },

    {
      from: "/docs/first-gen/firstgen-fa-qs/docs/category/cicd-artifact-build-and-deploy-pipelines",
      to: "/docs/category/faqs-fg",
    },

    {
      from: "/docs/first-gen/continuous-delivery/concepts-cd/deployment-types/docs/category/iis-net-deployments",
      to: "/docs/category/iis-net-deployments",
    },

    // Created by Gigi Hanna to add CE re-direct after topic move - June 27, 2023
    {
      from: "/docs/chaos-engineering/configure-chaos-experiments/experiments/use-chaos-with-srm",
      to: "/docs/chaos-engineering/integrations/use-chaos-with-srm",
    },

    // Created by Sudheendra Katte to fix cv re-directs April 27th, 2023
    {
      from: "/docs/category/continuous-verification-1",
      to: "/docs/category/configure-cv",
    },

    {
      from: "/docs/service-reliability-management/use-service-reliability-management/error-tracking-category/install-the-error-tracking-agent",
      to: "/docs/continuous-error-tracking/getting-started/cet-setup",
    },

    // Created by Rashmi Sahoo to fix PL redirects April 27th, 2023
    {
      from: "/docs/category/role-based-access-control",
      to: "/docs/category/access-control-1",
    },

    {
      from: "/docs/platform/delegates/delegate-install-kubernetes/install-harness-delegate-on-kubernetes/",
      to: "/docs/platform/Delegates/install-delegates/install-a-kubernetes-delegate",
    },

    {
      from: "/docs/platform/Governance/Policy-as-code/docs/feature-flags/harness-policy-engine",
      to: "/docs/feature-flags/harness-policy-engine",
    },

    // Created by ravilach to move CVKB into Docs April 21st, 2023
    {
      from: "/kb/continuous-delivery/continuous-verification-ml",
      to: "/docs/continuous-delivery/verify/cv-concepts/machine-learning",
    },

    {
      from: "/kb/continuous-delivery/continuous-verification-results",
      to: "/docs/category/understand-cv-results",
    },

    {
      from: "/kb/continuous-delivery/continuous-verification-templates",
      to: "/docs/continuous-delivery/verify/cv-concepts/templates",
    },

    // Created by Sudheendra Katte to fix cv re-directs April 21st, 2023
    {
      from: "/docs/continuous-delivery/verify/verify-deployment-with-prometheus",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-prometheus",
    },

    {
      from: "/docs/continuous-delivery/verify/verify-deployments-with-app-dynamics",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-app-dynamics",
    },

    {
      from: "/docs/continuous-delivery/verify/verify-deployments-with-cloudwatch",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-cloudwatch",
    },

    {
      from: "/docs/continuous-delivery/verify/verify-deployments-with-custom-health-metrics",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-custom-health-metrics",
    },

    {
      from: "/docs/continuous-delivery/verify/verify-deployments-with-datadog",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-datadog",
    },

    {
      from: "/docs/continuous-delivery/verify/verify-deployments-with-dynatrace",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-dynatrace",
    },

    {
      from: "/docs/continuous-delivery/verify/verify-deployments-with-elastic-search",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-elastic-search",
    },

    {
      from: "/docs/continuous-delivery/verify/verify-deployments-with-google-cloud-operations",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-google-cloud-operations",
    },

    {
      from: "/docs/continuous-delivery/verify/verify-deployments-with-new-relic",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-new-relic",
    },

    {
      from: "/docs/continuous-delivery/verify/verify-deployments-with-splunk",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-splunk",
    },

    {
      from: "/docs/continuous-delivery/verify/verify-deployments-with-sumologic",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-sumologic",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployment-with-prometheus",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-prometheus",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployments-with-app-dynamics",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-app-dynamics",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployments-with-cloudwatch",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-cloudwatch",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployments-with-custom-health-metrics",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-custom-health-metrics",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployments-with-datadog",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-datadog",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployments-with-dynatrace",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-dynatrace",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployments-with-elastic-search",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-elastic-search",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployments-with-google-cloud-operations",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-google-cloud-operations",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployments-with-new-relic",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-new-relic",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployments-with-splunk",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-splunk",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployments-with-sumologic",
      to: "/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-sumologic",
    },

    // Created by Sudheendra Katte to fix error tracking re-directs April 20th, 2023
    {
      from: "/docs/service-reliability-management/continuous-error-tracking/error-tracking-in-srm-overview",
      to: "/docs/continuous-error-tracking/getting-started/cet-overview",
    },
    {
      from: "/docs/service-reliability-management/continuous-error-tracking/error-tracking-in-srm",
      to: "/docs/continuous-error-tracking/getting-started/cet-setup",
    },
    {
      from: "/docs/service-reliability-management/continuous-error-tracking/error-tracking-event-dashboard",
      to: "/docs/continuous-error-tracking/getting-started/cet-event-dashboard",
    },
    {
      from: "/docs/service-reliability-management/continuous-error-tracking/error-tracking-arc",
      to: "/docs/continuous-error-tracking/getting-started/cet-arc",
    },
    {
      from: "/docs/category/9mefqceij0-cv-category",
      to: "/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step",
    },
    // Created by Rashmi Sahoo to fix platform re-direct April 19th, 2023
    {
      from: "/docs/platform/Authentication/provision-users-with-okta-scim",
      to: "/docs/platform/User-Management/provision-users-with-okta-scim",
    },
    {
      from: "/docs/platform/Authentication/provision-users-and-groups-using-azure-ad-scim",
      to: "/docs/platform/User-Management/provision-users-and-groups-using-azure-ad-scim",
    },
    {
      from: "/docs/platform/Authentication/7provision-users-and-groups-with-one-login-scim",
      to: "/docs/platform/User-Management/7provision-users-and-groups-with-one-login-scim",
    },
    {
      from: "/docs/platform/Role-Based-Access-Control/add-users",
      to: "/docs/platform/User-Management/add-users",
    },
    {
      from: "/docs/platform/Role-Based-Access-Control/add-user-groups",
      to: "/docs/platform/User-Management/add-user-groups",
    },
    {
      from: "/docs/platform/Role-Based-Access-Control/harness-default-user-groups",
      to: "/docs/platform/User-Management/harness-default-user-groups",
    },
    {
      from: "/docs/platform/Role-Based-Access-Control/add-and-manage-service-account",
      to: "/docs/platform/User-Management/add-and-manage-service-account",
    },
    {
      from: "/docs/platform/Role-Based-Access-Control/add-and-manage-api-keys",
      to: "/docs/platform/User-Management/add-and-manage-api-keys",
    },
    {
      from: "/docs/platform/Security/add-use-text-secrets",
      to: "/docs/platform/Secrets/add-use-text-secrets",
    },
    {
      from: "/docs/platform/Security/add-file-secrets",
      to: "/docs/platform/Secrets/add-file-secrets",
    },
    {
      from: "/docs/platform/Security/add-use-ssh-secrets",
      to: "/docs/platform/Secrets/add-use-ssh-secrets",
    },
    {
      from: "/docs/platform/Security/harness-secret-manager-overview",
      to: "/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview",
    },
    {
      from: "/docs/platform/Security/add-secrets-manager",
      to: "/docs/platform/Secrets/Secrets-Management/add-secrets-manager",
    },
    {
      from: "/docs/platform/Security/add-an-aws-kms-secrets-manager",
      to: "/docs/platform/Secrets/Secrets-Management/add-an-aws-kms-secrets-manager",
    },
    {
      from: "/docs/platform/Security/add-an-aws-secret-manager",
      to: "/docs/platform/Secrets/Secrets-Management/add-an-aws-secret-manager",
    },
    {
      from: "/docs/platform/Security/azure-key-vault",
      to: "/docs/platform/Secrets/Secrets-Management/azure-key-vault",
    },
    {
      from: "/docs/platform/Security/custom-secret-manager",
      to: "/docs/platform/Secrets/Secrets-Management/custom-secret-manager",
    },
    {
      from: "/docs/platform/Security/add-google-kms-secrets-manager",
      to: "/docs/platform/Secrets/Secrets-Management/add-google-kms-secrets-manager",
    },
    {
      from: "/docs/platform/Security/add-a-google-cloud-secret-manager",
      to: "/docs/platform/Secrets/Secrets-Management/add-a-google-cloud-secret-manager",
    },
    {
      from: "/docs/platform/Security/add-hashicorp-vault",
      to: "/docs/platform/Secrets/Secrets-Management/add-hashicorp-vault",
    },
    {
      from: "/docs/platform/Security/disable-harness-secret-manager",
      to: "/docs/platform/Secrets/Secrets-Management/disable-harness-secret-manager",
    },
    {
      from: "/docs/platform/Security/reference-existing-secret-manager-secrets",
      to: "/docs/platform/Secrets/Secrets-Management/reference-existing-secret-manager-secrets",
    },
    {
      from: "/docs/platform/Security/ref-security/secrets-and-log-sanitization",
      to: "/docs/platform/Secrets/Secrets-Management/secrets-and-log-sanitization",
    },
    {
      from: "/docs/platform/Connectors/add-aws-connector",
      to: "/docs/platform/Connectors/Cloud-providers/add-aws-connector",
    },
    {
      from: "/docs/platform/Connectors/add-a-microsoft-azure-connector",
      to: "/docs/platform/Connectors/Cloud-providers/add-a-microsoft-azure-connector",
    },
    {
      from: "/docs/platform/Connectors/connect-to-google-cloud-platform-gcp",
      to: "/docs/platform/Connectors/Cloud-providers/connect-to-google-cloud-platform-gcp",
    },
    {
      from: "/docs/platform/Connectors/add-a-kubernetes-cluster-connector",
      to: "/docs/platform/Connectors/Cloud-providers/add-a-kubernetes-cluster-connector",
    },
    {
      from: "/docs/platform/Connectors/connect-to-a-cloud-provider",
      to: "/docs/platform/Connectors/Cloud-providers/connect-to-a-cloud-provider",
    },
    {
      from: "/docs/platform/Connectors/ref-cloud-providers/artifactory-connector-settings-reference",
      to: "/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference",
    },
    {
      from: "/docs/platform/Connectors/ref-cloud-providers/aws-connector-settings-reference",
      to: "/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference",
    },
    {
      from: "/docs/platform/Connectors/ref-cloud-providers/docker-registry-connector-settings-reference",
      to: "/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference",
    },
    {
      from: "/docs/platform/Connectors/ref-cloud-providers/gcs-connector-settings-reference",
      to: "/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/gcs-connector-settings-reference",
    },
    {
      from: "/docs/platform/Connectors/ref-cloud-providers/kubernetes-cluster-connector-settings-reference",
      to: "/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference",
    },
    {
      from: "/docs/platform/Connectors/connect-to-jenkins",
      to: "/docs/platform/Connectors/Artifact-Repositories/connect-to-jenkins",
    },
    {
      from: "/docs/platform/Connectors/connect-to-an-artifact-repo",
      to: "/docs/platform/Connectors/Artifact-Repositories/connect-to-an-artifact-repo",
    },
    {
      from: "/docs/platform/Connectors/connect-to-harness-container-image-registry-using-docker-connector",
      to: "/docs/platform/Connectors/Artifact-Repositories/connect-to-harness-container-image-registry-using-docker-connector",
    },
    {
      from: "/docs/platform/Connectors/using-ibm-registry-to-create-a-docker-connector",
      to: "/docs/platform/Connectors/Artifact-Repositories/using-ibm-registry-to-create-a-docker-connector",
    },
    {
      from: "/docs/platform/Connectors/connect-to-code-repo",
      to: "/docs/platform/Connectors/Code-Repositories/connect-to-code-repo",
    },
    {
      from: "/docs/platform/Connectors/connect-to-a-azure-repo",
      to: "/docs/platform/Connectors/Code-Repositories/connect-to-a-azure-repo",
    },
    {
      from: "/docs/platform/Connectors/git-hub-app-support",
      to: "/docs/platform/Connectors/Code-Repositories/git-hub-app-support",
    },
    {
      from: "/docs/platform/Connectors/ref-source-repo-provider/bitbucket-connector-settings-reference",
      to: "/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/bitbucket-connector-settings-reference",
    },
    {
      from: "/docs/platform/Connectors/ref-source-repo-provider/git-connector-settings-reference",
      to: "/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference",
    },
    {
      from: "/docs/platform/Connectors/ref-source-repo-provider/git-hub-connector-settings-reference",
      to: "/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference",
    },
    {
      from: "/docs/platform/Connectors/ref-source-repo-provider/git-lab-connector-settings-reference",
      to: "/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-lab-connector-settings-reference",
    },
    {
      from: "/docs/platform/Connectors/ref-source-repo-provider/http-helm-repo-connector-settings-reference",
      to: "/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/http-helm-repo-connector-settings-reference",
    },
    {
      from: "/docs/platform/Connectors/ref-source-repo-provider/source-code-manager-settings",
      to: "/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/source-code-manager-settings",
    },
    {
      from: "/docs/platform/Connectors/connect-to-service-now",
      to: "/docs/platform/Connectors/Ticketing-Systems/connect-to-service-now",
    },
    {
      from: "/docs/platform/Connectors/connect-to-jira",
      to: "/docs/platform/Connectors/Ticketing-Systems/connect-to-jira",
    },
    {
      from: "/docs/platform/Connectors/connect-to-monitoring-and-logging-systems",
      to: "/docs/platform/Connectors/Monitoring-and-Logging-Systems/connect-to-monitoring-and-logging-systems",
    },
    {
      from: "/docs/platform/Policy-as-code/harness-governance-overview",
      to: "/docs/platform/Governance/Policy-as-code/harness-governance-overview",
    },
    {
      from: "/docs/platform/Policy-as-code/add-a-governance-policy-step-to-a-connector",
      to: "/docs/platform/Governance/Policy-as-code/add-a-governance-policy-step-to-a-connector",
    },
    {
      from: "/docs/platform/Policy-as-code/add-a-governance-policy-step-to-a-pipeline",
      to: "/docs/platform/Governance/Policy-as-code/add-a-governance-policy-step-to-a-pipeline",
    },
    {
      from: "/docs/platform/Policy-as-code/add-a-policy-engine-step-to-a-secret",
      to: "/docs/platform/Governance/Policy-as-code/add-a-policy-engine-step-to-a-secret",
    },
    {
      from: "/docs/platform/Policy-as-code/disable-a-policy-set",
      to: "/docs/platform/Governance/Policy-as-code/disable-a-policy-set",
    },
    {
      from: "/docs/platform/Policy-as-code/harness-governance-quickstart",
      to: "/docs/platform/Governance/Policy-as-code/harness-governance-quickstart",
    },
    {
      from: "/docs/platform/Policy-as-code/using-harness-policy-engine-for-feature-flags",
      to: "/docs/platform/Governance/Policy-as-code/using-harness-policy-engine-for-feature-flags",
    },
    {
      from: "/docs/platform/Audit-Trail/audit-trail",
      to: "/docs/platform/Governance/Audit-Trail/audit-trail",
    },
    {
      from: "/docs/platform/Audit-Trail/audit-streaming",
      to: "/docs/platform/Governance/Audit-Trail/audit-streaming",
    },
    {
      from: "/docs/platform/APIs/api-quickstart",
      to: "/docs/platform/Resource-Development/APIs/api-quickstart",
    },
    {
      from: "/docs/platform/APIs/default-settings-for-jwt-token",
      to: "/docs/platform/Resource-Development/APIs/default-settings-for-jwt-token",
    },
    {
      from: "/docs/platform/APIs/harness-rest-api-reference",
      to: "/docs/platform/Resource-Development/APIs/harness-rest-api-reference",
    },
    {
      from: "/docs/platform/APIs/jwt-token-auth",
      to: "/docs/platform/Resource-Development/APIs/jwt-token-auth",
    },
    {
      from: "/docs/platform/Terraform/harness-terraform-provider-overview",
      to: "/docs/platform/Resource-Development/Terraform/harness-terraform-provider-overview",
    },
    {
      from: "/docs/platform/Terraform/harness-terraform-provider",
      to: "/docs/platform/Resource-Development/Terraform/harness-terraform-provider",
    },
    {
      from: "/docs/platform/Terraform/automate-harness-onboarding",
      to: "/docs/platform/Resource-Development/Terraform/automate-harness-onboarding",
    },
    {
      from: "/docs/platform/Terraform/advanced-terraform-onboarding",
      to: "/docs/platform/Resource-Development/Terraform/advanced-terraform-onboarding",
    },

    // Created by ravilach/schoudhury to fix platform re-direct April 17th, 2023
    {
      from: "/docs/platform/delegates/delegate-install-kubernetes/install-harness-delegate-using-helm",
      to: "/tutorials/platform/install-delegate",
    },

    // Created by Gigi Hanna to fix FF re-directs April 18th, 2023

    {
      from: "/docs/feature-flags/ff-onboarding/ff-getting-started/java-quickstart",
      to: "/docs/feature-flags/ff-onboarding/java-quickstart",
    },
    {
      from: "/docs/feature-flags/ff-onboarding/ff-getting-started/feature-flag-best-practices",
      to: "/docs/feature-flags/ff-onboarding/feature-flag-best-practices",
    },
    {
      from: "/docs/feature-flags/ff-onboarding/ff-getting-started/getting-started-with-feature-flags",
      to: "/docs/feature-flags/ff-onboarding/getting-started-with-feature-flags",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/add-prerequisites-to-feature-flag",
      to: "/docs/feature-flags/add-prerequisites-to-feature-flag",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/connect-monitored-service",
      to: "/docs/feature-flags/connect-monitored-service",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/harness-policy-engine",
      to: "/docs/feature-flags/harness-policy-engine",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/integrate-feature-flag-with-jira",
      to: "/docs/feature-flags/integrate-feature-flag-with-jira",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/manage-featureflags-in-git-repos",
      to: "/docs/feature-flags/manage-featureflags-in-git-repos",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/ff-creating-flag/create-an-environment",
      to: "/docs/feature-flags/ff-creating-flag/create-a-project",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/ff-creating-flag/create-an-sdk-key",
      to: "/docs/feature-flags/ff-creating-flag/create-a-project",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/update-feature-flags/enable-or-disable-a-feature-flag",
      to: "/docs/feature-flags/ff-creating-flag/enable-or-disable-a-feature-flag",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/update-feature-flags/edit-and-delete-a-feature-flag",
      to: "/docs/feature-flags/ff-creating-flag/edit-and-delete-a-feature-flag",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/update-feature-flags/manage-variations",
      to: "/docs/feature-flags/ff-creating-flag/manage-variations",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/update-feature-flags/delete-a-feature-flag",
      to: "/docs/feature-flags/ff-creating-flag/edit-and-delete-a-feature-flag",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/ff-creating-flag/create-a-project",
      to: "/docs/feature-flags/ff-creating-flag/create-a-project",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/ff-creating-flag/create-a-feature-flag",
      to: "/docs/feature-flags/ff-creating-flag/create-a-feature-flag",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/ff-target-management/add-targets",
      to: "/docs/feature-flags/ff-target-management/add-targets",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/ff-target-management/add-target-groups",
      to: "/docs/feature-flags/ff-target-management/add-target-groups",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/ff-target-management/targeting-users-with-flags",
      to: "/docs/feature-flags/ff-target-management/targeting-users-with-flags",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/ff-build-pipeline/build-feature-flag-pipeline",
      to: "/docs/feature-flags/ff-build-pipeline/build-feature-flag-pipeline",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/ff-build-pipeline/default-pipeline-ff",
      to: "/docs/feature-flags/ff-build-pipeline/default-pipeline-ff",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/relay-proxy",
      to: "/docs/feature-flags/relay-proxy",
    },
    {
      from: "/docs/feature-flags/ff-using-flags/relay-proxy/deploy-relay-proxy",
      to: "/docs/feature-flags/relay-proxy/deploy-relay-proxy",
    },

    // Created by ravilach to fix CD Cert re-directs April 15th, 2023

    {
      from: "/docs/continuous-delivery/onboard-cd/cd-concepts/cd-pipeline-basics",
      to: "/docs/continuous-delivery/get-started/cd-pipeline-basics",
    },
    {
      from: "/docs/continuous-delivery/onboard-cd/cd-concepts/services-and-environments-overview",
      to: "/docs/continuous-delivery/get-started/services-and-environments-overview",
    },

    // Created by schoudhury on Apr 18, 2023 - All tutorials

    {
      from: "/tutorials/build-code",
      to: "/tutorials/ci-pipelines",
    },
    {
      from: "/tutorials/build-code/fastest-ci",
      to: "/tutorials/ci-pipelines/fastest-ci",
    },
    {
      from: "/tutorials/build-code/build",
      to: "/tutorials/ci-pipelines/build",
    },
    {
      from: "/tutorials/build-code/build/nodejs",
      to: "/tutorials/ci-pipelines/build/nodejs",
    },
    {
      from: "/tutorials/build-code/build/java",
      to: "/tutorials/ci-pipelines/build/java",
    },
    {
      from: "/tutorials/build-code/build/go",
      to: "/tutorials/ci-pipelines/build/go",
    },
    {
      from: "/tutorials/build-code/test",
      to: "/tutorials/ci-pipelines/test",
    },
    {
      from: "/tutorials/build-code/test/localstack",
      to: "/tutorials/ci-pipelines/test/localstack",
    },
    {
      from: "/tutorials/build-code/test/saucelabs-proxy",
      to: "/tutorials/ci-pipelines/test/saucelabs-proxy",
    },
    {
      from: "/tutorials/build-code/test/codecov",
      to: "/tutorials/ci-pipelines/test/codecov",
    },
    {
      from: "/tutorials/build-code/publish",
      to: "/tutorials/ci-pipelines/publish",
    },
    {
      from: "/tutorials/build-code/publish/amazon-ecr",
      to: "/tutorials/ci-pipelines/publish/amazon-ecr",
    },
    {
      from: "/tutorials/build-code/publish/google-gar",
      to: "/tutorials/ci-pipelines/publish/google-gar",
    },

    {
      from: "/tutorials/deploy-services",
      to: "/tutorials/cd-pipelines",
    },
    {
      from: "/tutorials/deploy-services/kubernetes",
      to: "/tutorials/cd-pipelines/kubernetes",
    },
    {
      from: "/tutorials/deploy-services/kubernetes/helm-chart",
      to: "/tutorials/cd-pipelines/kubernetes/helm-chart",
    },
    {
      from: "/tutorials/deploy-services/kubernetes/manifest",
      to: "/tutorials/cd-pipelines/kubernetes/manifest",
    },
    {
      from: "/tutorials/deploy-services/amazon-ecs",
      to: "/tutorials/cd-pipelines/amazon-ecs",
    },
    {
      from: "/tutorials/deploy-services/unified-cicd",
      to: "/tutorials/cd-pipelines/unified-cicd",
    },

    {
      from: "/tutorials/manage-feature-flags",
      to: "/tutorials/feature-flags",
    },
    {
      from: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
      to: "/tutorials/feature-flags/typescript-react",
    },

    {
      from: "/tutorials/manage-cloud-costs",
      to: "/tutorials/cloud-costs",
    },
    {
      from: "/tutorials/manage-cloud-costs/ccm-first-kubernetes-tutorial",
      to: "/tutorials/cloud-costs/kubernetes",
    },

    {
      from: "/tutorials/manage-service-reliability",
      to: "/tutorials/service-reliability",
    },
    {
      from: "/tutorials/manage-service-reliability/intro-to-srm",
      to: "/tutorials/service-reliability/slo-prometheus",
    },
    {
      from: "/tutorials/manage-service-reliability/intro-java-exception-management",
      to: "/tutorials/error-tracking/java-error-tracking",
    },
    {
      from: "/tutorials/service-reliability/java-error-tracking",
      to: "/tutorials/error-tracking/java-error-tracking",
    },
    {
      from: "/tutorials/orchestrate-security-tests",
      to: "/tutorials/security-tests",
    },
    {
      from: "/tutorials/orchestrate-security-tests/sto-standalone-workflows",
      to: "/tutorials/security-tests/standalone-pipeline",
    },
    {
      from: "/tutorials/orchestrate-security-tests/sto-integrated-workflows",
      to: "/tutorials/security-tests/cicd-integrated-pipeline",
    },
    {
      from: "/tutorials/orchestrate-security-tests/nodejs-firstscan",
      to: "/tutorials/security-tests/nodejs-owasp",
    },

    {
      from: "/tutorials/run-chaos-experiments",
      to: "/tutorials/chaos-experiments",
    },
    {
      from: "/tutorials/run-chaos-experiments/first-chaos-engineering",
      to: "/tutorials/chaos-experiments/first-chaos-engineering",
    },
    {
      from: "/tutorials/run-chaos-experiments/chaos-experiment-from-blank-canvas",
      to: "/tutorials/chaos-experiments/chaos-experiment-from-blank-canvas",
    },
    {
      from: "/tutorials/run-chaos-experiments/first-chaos-experiment-via-API",
      to: "/tutorials/chaos-experiments/first-chaos-experiment-via-api",
    },
    {
      from: "/tutorials/run-chaos-experiments/chaos-experiments-on-gitlab",
      to: "/tutorials/chaos-experiments/chaos-experiments-on-gitlab",
    },
    {
      from: "/tutorials/run-chaos-experiments/chaos-experiments-on-jenkins",
      to: "/tutorials/chaos-experiments/chaos-experiments-on-jenkins",
    },
    {
      from: "/tutorials/run-chaos-experiments/integration-with-harness-cd",
      to: "/tutorials/chaos-experiments/integration-with-harness-cd",
    },

    // Created by Charanya Jayaraman to fix CCM redirects on Apr 13, 2023

    {
      from: "/docs/cloud-cost-management/cloud-cost-technical-reference/ccm-ref/ccm-roles-and-permissions",
      to: "/docs/cloud-cost-management/getting-started-ccm/access-control/ccm-roles-and-permissions",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/quick-start-guides/kubernetes-autostopping-quick-start-guide",
      to: "/docs/cloud-cost-management/getting-started-ccm/quick-start-guides/kubernetes-autostopping-quick-start-guide",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-cost-anomaly-detection/detect-cloud-cost-anomalies-with-ccm",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/detect-cloud-cost-anomalies-with-ccm",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-currency-preferences/currency-preferences",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/currency-preferences",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-perspectives/export-perspective-data",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/export-perspective-data",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/node-pool-recommendations",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/node-pool-recommendations",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/workload-recommendations",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/workload-recommendations",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/add-azure-connector",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/add-azure-connector",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/connect-to-an-aws-connector",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/connect-to-an-aws-connector",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/create-a-gcp-connector-for-auto-stopping-rules",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/create-a-gcp-connector-for-auto-stopping-rules",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/load-balancer/create-an-application-gateway-for-azure",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/load-balancer/create-an-application-gateway-for-azure",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/load-balancer/create-autoproxy-aws-lb",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/load-balancer/create-autoproxy-aws-lb",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/load-balancer/create-autoproxy-gcp-lb",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/load-balancer/create-autoproxy-gcp-lb",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/load-balancer/create-azure-autoproxy-lb",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/load-balancer/create-azure-autoproxy-lb",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/load-balancer/create-load-balancer-aws",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/load-balancer/create-load-balancer-aws",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/configure-ecg/configure-ecg-for-auto-stopping-rules",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/configure-ecg-for-auto-stopping-rules",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/autostopping-dashboard",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/autostopping-dashboard",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/k8s-connector-autostopping",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/k8s-connector-autostopping",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/autostopping-dry-run-mode",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/autostopping-dry-run-mode",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-auto-stopping-rules-for-ecs",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-auto-stopping-rules-for-ecs",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-auto-stopping-rules-for-azure",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-auto-stopping-rules-for-azure",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-auto-stopping-rules-for-gcp",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-auto-stopping-rules-for-gcp",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-auto-stopping-rules-for-rds",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-auto-stopping-rules-for-rds",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-auto-stopping-rules-for-terraform",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-auto-stopping-rules-for-terraform",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-autostopping-rules-aws",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-autostopping-rules-aws",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-autostopping-rules-for-kubernetes",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-autostopping-rules-for-kubernetes",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/kubernetes-autostopping-for-istio",
      to: "/docs/cloud-cost-management/getting-started-ccm/quick-start-guides/kubernetes-autostopping-for-istio",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/review-autostopping-rules-reqs",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/review-autostopping-rules-reqs",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-perspectives/create-a-budget-perspective",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/create-a-budget-perspective",
    },
    {
      from: "/docs/cloud-cost-management/monitor-cloud-cost-with-integration/integration/datadog-integration",
      to: "/docs/cloud-cost-management/datadog-integration",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-perspectives/share-cost-perspective-report",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/share-cost-perspective-report",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-cost-categories/use-ccm-cost-categories",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/ccm-cost-categories",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/root-cost-analysis/analyze-cost-for-aws",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/root-cost-analysis/analyze-cost-for-aws",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/root-cost-analysis/analyze-cost-for-azure",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/root-cost-analysis/analyze-cost-for-azure",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/root-cost-analysis/analyze-cost-for-gcp-using-perspectives",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/root-cost-analysis/analyze-cost-for-gcp-using-perspectives",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/root-cost-analysis/analyze-cost-for-k8s-ecs-using-perspectives",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/root-cost-analysis/analyze-cost-for-k8s-ecs-using-perspectives",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/root-cost-analysis/perform-root-cost-analysis",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/root-cost-analysis/perform-root-cost-analysis",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/root-cost-analysis/understanding-ccm-perspective-date-ranges",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/root-cost-analysis/understanding-ccm-perspective-date-ranges",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/quick-start-guides/autostopping-proxy-alb-usecase",
      to: "/docs/cloud-cost-management/getting-started-ccm/quick-start-guides/autostopping-proxy-alb-usecase",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/access-control/manage-access-control-for-ccm-dashboards",
      to: "/docs/cloud-cost-management/getting-started-ccm/access-control/manage-access-control-for-ccm-dashboards",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/access-control/manage-access-control-perspective-folders",
      to: "/docs/cloud-cost-management/getting-started-ccm/access-control/manage-access-control-perspective-folders",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/access-ccm-dashboards",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/access-ccm-dashboards",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/aws-dashboard",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/aws-dashboard",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/aws-reservation-coverage-and-service-cost",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/aws-reservation-coverage-and-service-cost",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/azure-cost-dashboard",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/azure-cost-dashboard",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/cluster-cost-dashboard",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/cluster-cost-dashboard",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/gcp-dashboard",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/gcp-dashboard",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/multi-cloud-cost-overview-dashboard",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/multi-cloud-cost-overview-dashboard",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/orphaned-ebs-volumes-and-snapshots-dashboard",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/orphaned-ebs-volumes-and-snapshots-dashboard",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/use-multiple-tags-in-aws",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/use-multiple-tags-in-aws",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/view-aws-ec-2-instance-metrics",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-instance-metrics",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/view-aws-ec-2-inventory-cost-dashboard",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/ccm-dashboards-by-harness/view-aws-resource-breakdown-cost-dashboard",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-resource-breakdown-cost-dashboard",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/home-recommendations",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/ec2-recommendations",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/ec2-recommendations",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/ecs-recommendations",
      to: "/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/ecs-recommendations",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-budgets/create-a-budget",
      to: "/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget",
    },
    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/ccm-perspectives/create-cost-perspectives",
      to: "/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/create-cost-perspectives",
    },

    // Created by SudheendraKatte for SRM Docs reorg, PR-1276, on Apr 12, 2023
    {
      from: "/docs/service-reliability-management/howtos-service-reliability-management/service-reliability-management-basics",
      to: "/docs/service-reliability-management/getting-started/service-reliability-management-basics",
    },
    {
      from: "/docs/service-reliability-management/howtos-service-reliability-management/slo-driven-deployment-governance",
      to: "/docs/service-reliability-management/slo-driven-deployment-governance",
    },
    {
      from: "/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-quickstart",
      to: "/docs/service-reliability-management/change-impact-analysis/",
    },
    {
      from: "/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-service-health-dashboard",
      to: "/docs/service-reliability-management/change-impact-analysis/change-impact-analysis-service-health-dashboard",
    },
    {
      from: "/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-changes-dash-board",
      to: "/docs/service-reliability-management/change-impact-analysis/change-impact-analysis-changes-dash-board",
    },
    {
      from: "/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-add-featureflag",
      to: "/docs/service-reliability-management/monitored-service/change-source/feature-flag-change-source",
    },
    {
      from: "/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-add-custom-change-source",
      to: "/docs/service-reliability-management/monitored-service/change-source/custom-deployment-change-source",
    },
    {
      from: "/docs/service-reliability-management/howtos-service-reliability-management/slo-management-quickstart",
      to: "/docs/service-reliability-management/getting-started/create-first-slo",
    },
    {
      from: "/docs/service-reliability-management/howtos-service-reliability-management/composite-slo-quickstart",
      to: "/docs/service-reliability-management/slo/composite-slo",
    },
    {
      from: "/docs/service-reliability-management/use-service-reliability-management/srm-notifications",
      to: "/docs/service-reliability-management/notifications/monitoredservice-notifications",
    },
    {
      from: "/docs/service-reliability-management/use-service-reliability-management/monitored-service-template/monitored-service-template-quickstart",
      to: "/docs/service-reliability-management/monitored-service/monitored-service-template-quickstart",
    },
    {
      from: "/docs/service-reliability-management/use-service-reliability-management/error-tracking-category/error-tracking-in-srm-overview",
      to: "/docs/continuous-error-tracking/getting-started/cet-overview",
    },
    {
      from: "/docs/service-reliability-management/use-service-reliability-management/error-tracking-category/error-tracking-in-srm",
      to: "/docs/continuous-error-tracking/getting-started/cet-setup",
    },
    {
      from: "/docs/service-reliability-management/use-service-reliability-management/error-tracking-category/error-tracking-event-dashboard",
      to: "/docs/continuous-error-tracking/getting-started/cet-event-dashboard",
    },
    {
      from: "/docs/service-reliability-management/use-service-reliability-management/error-tracking-category/error-tracking-arc",
      to: "/docs/continuous-error-tracking/getting-started/cet-arc",
    },

    // Created by ravilach for CI Tutorials Refactor, PR-1231, on Apr 5, 2023
    {
      from: "/tutorials/build-code/ci-node-docker-quickstart",
      to: "/tutorials/ci-pipelines/build/nodejs",
    },
    {
      from: "/tutorials/build-code/ci-localstack-background-step",
      to: "/tutorials/ci-pipelines/test/localstack",
    },
    {
      from: "/tutorials/build-code/ci-saucelabs-background-step",
      to: "/tutorials/ci-pipelines/test/saucelabs-proxy",
    },
    {
      from: "/tutorials/ci-pipelines/ci-java-http-server",
      to: "/tutorials/ci-pipelines/build/java",
    },
    {
      from: "/tutorials/build-code/ci-java-http-server",
      to: "/tutorials/ci-pipelines/build/java",
    },
    {
      from: "/tutorials/build-code/ci-build-push-to-ecr",
      to: "/tutorials/ci-pipelines/publish/amazon-ecr",
    },
    {
      from: "/tutorials/build-code/ci-tutorial-go-containers",
      to: "/tutorials/ci-pipelines/build/go",
    },
    {
      from: "/tutorials/build-code/ci-tutorial-push-to-gar",
      to: "/tutorials/ci-pipelines/publish/google-gar",
    },
    {
      from: "/tutorials/build-code/ci-tutorial-codecov-test",
      to: "/tutorials/ci-pipelines/test/codecov",
    },

    // CD Tutorial

    // Created by schoudhury on Apr 3, 2023
    {
      from: "/tutorials/deploy-services/microservice-manifest-k8s",
      to: "/tutorials/cd-pipelines/kubernetes/manifest",
    },
    {
      from: "/tutorials/deploy-services/helm-k8s",
      to: "/tutorials/cd-pipelines/kubernetes/helm-chart",
    },
    {
      from: "/tutorials/deploy-services/helm-argocd-gitops-k8s",
      to: "/tutorials/cd-pipelines/kubernetes/helm-chart",
    },
    {
      from: "/tutorials/deploy-services/cdce-helm-k8s",
      to: "/tutorials/cd-pipelines/kubernetes/helm-chart",
    },
    {
      from: "/tutorials/deploy-services/docker-ecs",
      to: "/tutorials/cd-pipelines/amazon-ecs",
    },
    {
      from: "/tutorials/deploy-services/docker-ecr-k8s",
      to: "/tutorials/cd-pipelines/kubernetes",
    },
    {
      from: "/tutorials/deploy-services/harness-cicd-tutorial",
      to: "/tutorials/cd-pipelines/unified-cicd",
    },

    // Created by schoudhury on Feb 21, 2023
    {
      from: "/tutorials/platform/provision-azure-infrastructure",
      to: "/tutorials/platform/install-delegate",
    },

    // Created by schoudhury on Mar 27, 2023 - Delegate concepts
    {
      from: "/docs/category/get-started-with-delegates",
      to: "/docs/category/delegate-concepts",
    },

    {
      from: "/docs/platform/Delegates/get-started-with-delegates/delegates-overview",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-overview",
    },
    
    {
      from: "/docs/platform/Delegates/delegates-overview",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-overview",
    },

    {
      from: "/docs/platform/Delegates/get-started-with-delegates/delegate-installation-overview",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-overview",
    },

    {
      from: "/docs/platform/Delegates/delegate-guide/delegate-image-types",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-image-types",
    },
    {
      from: "/docs/platform/Delegates/get-started-with-delegates/delegate-image-types",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-image-types",
    },
    {
      from: "/docs/platform/Delegates/get-started-with-delegates/delegate-registration",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-registration",
    },

    {
      from: "/docs/platform/Delegates/get-started-with-delegates/delegate-requirements-and-limitations",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-requirements",
    },

    {
      from: "/docs/platform/Delegates/get-started-with-delegates/graceful-delegate-shutdown-process",
      to: "/docs/platform/Delegates/delegate-concepts/graceful-delegate-shutdown-process",
    },

    {
      from: "/docs/platform/platform-concepts/delegate-overview",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-overview",
    },

    // Created by schoudhury on Mar 27, 2023 - Install delegates
    {
      from: "/docs/platform/Delegates/install-delegates/install-a-delegate",
      to: "/docs/platform/Delegates/install-delegates/overview",
    },

    {
      from: "/docs/category/advanced-installation",
      to: "/docs/category/install-delegates",
    },

    {
      from: "/docs/platform/Delegates/advanced-installation/automate-delegate-installation",
      to: "/docs/platform/Delegates/install-delegates/automate-delegate-installation",
    },

    {
      from: "/docs/platform/Delegates/advanced-installation/docker-delegate-to-ecs-fargate",
      to: "/docs/platform/Delegates/install-delegates/docker-delegate-to-ecs-fargate",
    },

    {
      from: "/docs/platform/Delegates/advanced-installation/install-a-delegate-with-3-rd-party-tool-custom-binaries",
      to: "/docs/platform/Delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries",
    },

    {
      from: "/docs/platform/Delegates/advanced-installation/install-a-kubernetes-delegate",
      to: "/docs/platform/Delegates/install-delegates/install-a-kubernetes-delegate",
    },

    {
      from: "/docs/platform/Delegates/customize-delegates/build-custom-delegate-images-with-third-party-tools",
      to: "/docs/platform/Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools",
    },

    {
      from: "/docs/platform/Delegates/customize-delegates/enable-root-user-privileges-to-add-custom-binaries",
      to: "/docs/platform/Delegates/install-delegates/enable-root-user-privileges-to-add-custom-binaries",
    },

    // Created by schoudhury on Mar 27, 2023 - Manage delegates
    {
      from: "/docs/category/configure-delegates",
      to: "/docs/category/manage-delegates",
    },

    {
      from: "/docs/platform/Delegates/configure-delegates/configure-delegate-proxy-settings",
      to: "/docs/platform/Delegates/manage-delegates/configure-delegate-proxy-settings",
    },

    {
      from: "/docs/platform/Delegates/configure-delegates/delegate-auto-update",
      to: "/docs/platform/Delegates/install-delegates/delegate-upgrades-and-expiration",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023; modified Jan 22, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/build-custom-delegate-images-with-third-party-tools",
      to: "/docs/platform/Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023; modified Jan 22, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/delegate-auto-update",
      to: "/docs/platform/Delegates/install-delegates/delegate-upgrades-and-expiration",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023; modified on Jan 21, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/delegate-how-tos",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-overview",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023
    {
      from: "/docs/platform/Delegates/delegate-reference/delegate-requirements-and-limitations",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-requirements",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023; modified on Jan 22, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/enable-root-user-privileges-to-add-custom-binaries",
      to: "/docs/platform/Delegates/install-delegates/enable-root-user-privileges-to-add-custom-binaries",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023; modified on Jan 22, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/install-delegates-with-third-party-tools",
      to: "/docs/platform/Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools",
    },

    // Created by kat-enos for PR-738 on Feb 21, 2023
    {
      from: "/docs/platform/Delegates/install-delegates/kubernetes-delegates/install-harness-delegate-on-kubernetes",
      to: "/docs/platform/Delegates/install-delegates/overview",
    },

    // Created by kat-enos for PR-738 on Feb 21, 2023
    {
      from: "/docs/platform/Delegates/install-delegates/kubernetes-delegates/install-harness-delegate-using-helm",
      to: "/docs/platform/Delegates/install-delegates/overview",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/automate-delegate-installation",
      to: "/docs/platform/Delegates/install-delegates/automate-delegate-installation",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/install-delegate-with-3-rd-party-tool-custom-binaries",
      to: "/docs/platform/Delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/non-root-delegate-installation",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-overview",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/custom-delegate",
      to: "/docs/platform/Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/configure-delegate-proxy-settings",
      to: "/docs/platform/Delegates/manage-delegates/configure-delegate-proxy-settings",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/run-scripts-on-delegates",
      to: "/docs/platform/Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023; modified Jan 22, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/delegate-registration",
      to: "/docs/platform/Delegates/delegate-concepts/delegate-registration",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/delete-a-delegate",
      to: "/docs/platform/Delegates/manage-delegates/delete-a-delegate",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/select-delegates-with-selectors",
      to: "/docs/platform/Delegates/manage-delegates/select-delegates-with-selectors",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/secure-delegates-with-tokens",
      to: "/docs/platform/Delegates/secure-delegates/secure-delegates-with-tokens",
    },

    // Created by kat-enos for PR-2421 on Jan 13, 2023
    {
      from: "/docs/platform/Delegates/delegate-guide/trust-store-override-for-delegates",
      to: "/docs/platform/Delegates/secure-delegates/trust-store-override-for-delegates",
    },

    // Created by kat-enos on Jan 22, 2023
    {
      from: "/docs/platform/Delegates/delegate-reference/example-kubernetes-manifest-harness-delegate",
      to: "/docs/platform/Delegates/delegate-reference/YAML/example-kubernetes-manifest-harness-delegate",
    },

    // Created by kat-enos on Jan 22, 2023
    {
      from: "/docs/platform/Delegates/delegate-reference/example-harness-delegate-yaml",
      to: "/docs/platform/Delegates/delegate-reference/YAML/example-harness-delegate-yaml",
    },

    // Created by kat-enos on Jan 22, 2023
    {
      from: "/docs/platform/Delegates/delegate-reference/sample-create-a-permanent-volume-nfs-server",
      to: "/docs/platform/Delegates/delegate-reference/YAML/sample-create-a-permanent-volume-nfs-server",
    },

    // Created by KimberlyFields on March 29, 2023
    {
      from: "/docs/platform/Delegates/manage-delegates/delegate-auto-update",
      to: "/docs/platform/Delegates/install-delegates/delegate-upgrades-and-expiration",
    },

    //  Created by aimurphy for PR-783 on Feb 23, 2023
    {
      from: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/set-up-an-aws-vm-build-infrastructure",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/set-up-an-aws-vm-build-infrastructure",
    },

    //  Created by aimurphy for PR-783 on Feb 23, 2023
    {
      from: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-ci-build-infrastructure-in-azure",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/define-a-ci-build-infrastructure-in-azure",
    },

    //  Created by aimurphy for PR-783 on Feb 23, 2023
    {
      from: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-ci-build-infrastructure-in-google-cloud-platform",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/define-a-ci-build-infrastructure-in-google-cloud-platform",
    },

    //  Created by aimurphy for PR-783 on Feb 23, 2023
    {
      from: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-macos-build-infra-with-anka-registry",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/define-macos-build-infra-with-anka-registry",
    },

    //  Created by aimurphy for CI-6241 on Mar 22, 2023
    {
      from: "/docs/category/onboard-with-ci",
      to: "/docs/category/get-started-with-ci",
    },

    //  Created by aimurphy for CI-6241 on Mar 24, 2023
    {
      from: "/docs/category/migrating-to-harness-ci",
      to: "/docs/category/migrate-to-harness-ci",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 3, 2023
    {
      from: "/docs/category/test-intelligence",
      to: "/docs/category/run-tests",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 3, 2023
    {
      from: "/docs/category/run-ci-scripts",
      to: "/docs/category/run-scripts",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 4, 2023
    {
      from: "/docs/continuous-integration/ci-technical-reference/built-in-cie-codebase-variables-reference",
      to: "/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 4, 2023
    {
      from: "/docs/continuous-integration/use-ci/run-ci-scripts/clone-and-process-multiple-codebases-in-the-same-pipeline",
      to: "/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 6, 2023
    {
      from: "/docs/continuous-integration/troubleshoot/optimizing-ci-build-times",
      to: "/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 6, 2023
    {
      from: "/docs/continuous-integration/ci-technical-reference/group-ci-steps-using-step-groups",
      to: "/docs/continuous-integration/use-ci/optimize-and-more/group-ci-steps-using-step-groups",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 6, 2023
    {
      from: "/docs/continuous-integration/use-ci/view-your-builds/viewing-tests",
      to: "/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests",
    },

    //  Created by dbothwell for DOC-2895 on Apr 5, 2023
    {
      from: "/docs/security-testing-orchestration/onboard-sto/tutorial-1-standalone-workflows",
      to: "/tutorials/security-tests/standalone-pipeline",
    },
    //  Created by dbothwell for DOC-2895 on Apr 5, 2023
    {
      from: "/docs/security-testing-orchestration/onboard-sto/sto-tutorial-2-integrated-sto-ci-cd-workflows",
      to: "/tutorials/security-tests/cicd-integrated-pipeline",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 10, 2023
    {
      from: "/docs/continuous-integration/ci-technical-reference/harness-ci",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci",
    },

    {
      from: "/docs/continuous-integration/use-ci/build-stage-settings/harness-ci",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci",
    },


    // Created by michael cretzman to fix CCM redirects on Apr 12, 2023
    
    {
      from: "/docs/continuous-delivery/integrations/cd-integrations",
      to: "/docs/continuous-delivery/cd-integrations",
    },

    {
      from: "/docs/continuous-delivery/onboard-cd/cd-quickstarts/tanzu-app-services-quickstart",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart",
    },

    {
      from: "/docs/continuous-delivery/cd-deployments-category/deployment-freeze",
      to: "/docs/continuous-delivery/manage-deployments/deployment-freeze",
    },

    {
      from: "/docs/continuous-delivery/onboard-cd/cd-quickstarts/helm-cd-quickstart",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart",
    },

    {
      from: "/docs/continuous-delivery/onboard-cd/cd-quickstarts/win-rm-tutorial",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/ticketing-systems-category/update-jira-issues-in-cd-Jira",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/update-jira-issues-in-cd-stages",
    },

    {
      from: "/docs/continuous-delivery/cd-deployments-category/multiserv-multienv",
      to: "/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv",
    },

    {
      from: "/docs/cloud-cost-management/onboard-with-cloud-cost-management/cloud-cost-management-overview/continuous-efficiency-overview",
      to: "/docs/cloud-cost-management/getting-started-ccm/continuous-efficiency-overview",
    },

    {
      from: "/docs/cloud-cost-management/onboard-with-cloud-cost-management/cloud-cost-management-overview/harness-key-cloud-cost-concepts",
      to: "/docs/cloud-cost-management/getting-started-ccm/harness-key-cloud-cost-concepts",
    },

    {
      from: "/docs/cloud-cost-management/use-cloud-cost-management/cloud-integration/use-cloud-integration",
      to: "/docs/cloud-cost-management/getting-started-ccm/set-up-cloud-cost-management/use-quick-create-k8s",
    },

    {
      from: "/docs/cloud-cost-management/onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-aws",
      to: "/docs/cloud-cost-management/getting-started-ccm/set-up-cloud-cost-management/set-up-cost-visibility-for-aws",
    },

    {
      from: "/docs/cloud-cost-management/onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-azure",
      to: "/docs/cloud-cost-management/getting-started-ccm/set-up-cloud-cost-management/set-up-cost-visibility-for-azure",
    },

    {
      from: "/docs/cloud-cost-management/onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-gcp",
      to: "/docs/cloud-cost-management/getting-started-ccm/set-up-cloud-cost-management/set-up-cost-visibility-for-gcp",
    },

    // Created by doug bothwell to redirect topics in STO Workflows on Apr 13, 2023

    {
      from: "/docs/security-testing-orchestration/use-sto/sto-workflows-overview",
      to: "/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/sto-workflows-overview",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/run-an-orchestrated-scan-in-sto",
      to: "/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/run-an-orchestrated-scan-in-sto",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/ingest-scan-results-into-an-sto-pipeline",
      to: "/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/ingesting-issues-from-other-scanners",
      to: "/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingesting-issues-from-other-scanners",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/snyk-scans",
      to: "/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/snyk-scans",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/java-scans",
      to: "/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/java-scans",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/add-artifacts-to-pipelines",
      to: "/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/add-artifacts-to-pipelines",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/download-images-from-private-registry",
      to: "/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/security-testing-dashboard",
      to: "/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/security-testing-dashboard",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/sto-overview",
      to: "/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/sto-overview",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/jira-integrations",
      to: "/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/jira-integrations",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/email-notifications",
      to: "/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/email-notifications",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/exemption-workflows",
      to: "/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/exemption-workflows",
    },

    {
      from: "/docs/security-testing-orchestration/use-sto/stop-pipelines-using-opa",
      to: "/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/stop-pipelines-using-opa",
    },

    // Created by michael cretzman for DOC-2694 on Apr 11, 2023
    {
      from: "/docs/continuous-delivery/cd-execution/cv-category/verify-deployments-with-the-verify-step",
      to: "/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step",
    },

    {
      from: "/docs/continuous-delivery/cd-deployments-category/control-resource-usage-with-queue-steps",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/control-resource-usage-with-queue-steps",
    },

    {
      from: "/docs/continuous-delivery/cd-deployments-category/synchronize-deployments-using-barriers",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/synchronize-deployments-using-barriers",
    },

    {
      from: "/docs/continuous-delivery/onboard-cd/cd-quickstarts/ecs-deployment-tutorial",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial",
    },

    {
      from: "/docs/continuous-delivery/onboard-cd/cd-quickstarts/azure-web-apps-tutorial",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/ticketing-systems-category/servicenow-import-set",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/servicenow-import-set",
    },

    {
      from: "/docs/continuous-delivery/cd-technical-reference/cd-gen-ref-category/email_step",
      to: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/email_step",
    },

    {
      from: "/docs/continuous-delivery/cd-technical-reference/cd-k8s-ref/kubernetes-rollback",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback",
    },

    {
      from: "/docs/continuous-delivery/cd-technical-reference/cd-k8s-ref/kubernetes-delegate-step",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/terraform-category/run-a-terraform-plan-with-the-terraform-plan-step",
      to: "/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/terraform-category/run-a-terraform-plan-with-the-terraform-apply-step",
      to: "/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/terraform-category/rollback-provisioned-infra-with-the-terraform-rollback-step",
      to: "/docs/continuous-delivery/cd-infrastructure/terraform-infra/rollback-provisioned-infra-with-the-terraform-rollback-step",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/terraform-category/remove-provisioned-infra-with-terraform-destroy",
      to: "/docs/continuous-delivery/cd-infrastructure/terraform-infra/remove-provisioned-infra-with-terraform-destroy",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/cd-helm-category/use-a-local-helm-chart",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/helm/use-a-local-helm-chart",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/cd-helm-category/deploy-helm-chart-with-dependencies-and-subcharts",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts",
    },

    {
      from: "/docs/continuous-delivery/deploy-srv-diff-platforms/helm/cd-helm-category/deploy-helm-charts",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts",
    },

    {
      from: "/docs/continuous-delivery/cd-technical-reference/cd-k8s-ref/kubernetes-releases-and-versioning",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-releases-and-versioning",
    },

    {
      from: "/docs/continuous-delivery/cd-technical-reference/cd-k8s-ref/kubernetes-steps-timeouts-and-deadline-parameters",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-steps-timeouts-and-deadline-parameters",
    },

    {
      from: "/docs/continuous-delivery/cd-technical-reference/cd-k8s-ref/using-open-shift-with-harness-kubernetes",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/using-open-shift-with-harness-kubernetes",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/add-a-custom-remote-script-and-manifests",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-a-custom-remote-script-and-manifests",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/add-and-override-values-yaml-files",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-and-override-values-yaml-files",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/define-kubernetes-manifests",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/define-kubernetes-manifests",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/pull-an-image-from-a-private-registry-for-kubernetes",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/pull-an-image-from-a-private-registry-for-kubernetes",
    },

    {
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/skip-harness-label-selector-tracking-on-kubernetes-deployments",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/skip-harness-label-selector-tracking-on-kubernetes-deployments",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/create-a-kubernetes-blue-green-deployment",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/create-a-kubernetes-canary-deployment",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/create-a-kubernetes-rolling-deployment",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/delete-kubernetes-resources",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/deploy-manifests-using-apply-step",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/k8s-dry-run",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/k8s-dry-run",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/run-kubernetes-jobs",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/run-kubernetes-jobs",
    },

    {
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/scale-kubernetes-replicas",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/scale-kubernetes-replicas",
    },

    {
      from: "/docs/continuous-delivery/cd-deployments-category/deployment-logs-and-limitations",
      to: "/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations",
    },

    {
      from: "/docs/continuous-delivery/onboard-cd/upgrading/upgrade-nextgen-cd",
      to: "/docs/continuous-delivery/get-started/upgrading/upgrade-nextgen-cd",
    },

    {
      from: "/docs/continuous-delivery/cd-gitops/add-a-harness-git-ops-repository",
      to: "/docs/continuous-delivery/gitops/add-a-harness-git-ops-repository",
    },

    {
      from: "/docs/continuous-delivery/cd-gitops/add-harness-git-ops-repository-credentials-template",
      to: "/docs/continuous-delivery/gitops/add-harness-git-ops-repository-credentials-template",
    },

    {
      from: "/docs/continuous-delivery/cd-gitops/harness-cd-git-ops-quickstart",
      to: "/docs/continuous-delivery/gitops/harness-cd-git-ops-quickstart",
    },

    {
      from: "/docs/continuous-delivery/cd-gitops/harness-git-ops-application-set-tutorial",
      to: "/docs/continuous-delivery/gitops/harness-git-ops-application-set-tutorial",
    },

    {
      from: "/docs/continuous-delivery/cd-gitops/harness-git-ops-basics",
      to: "/docs/continuous-delivery/gitops/harness-git-ops-basics",
    },

    {
      from: "/docs/continuous-delivery/cd-gitops/install-a-harness-git-ops-agent",
      to: "/docs/continuous-delivery/gitops/install-a-harness-git-ops-agent",
    },

    {
      from: "/docs/continuous-delivery/cd-gitops/multiple-argo-to-single-harness",
      to: "/docs/continuous-delivery/gitops/multiple-argo-to-single-harness",
    },

    {
      from: "/docs/continuous-delivery/cd-gitops/gitops-allowlist",
      to: "/docs/continuous-delivery/gitops/gitops-allowlist",
    },

    // Created by SmritiSatya for branch redirects-for-ce on April 18,2023
    {
      from: "/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/common-tunables-for-all-faults",
    },
    {
      from: "/docs/chaos-engineering/overview/Security/security-templates/kyverno-policies",
      to: "/docs/chaos-engineering/technical-reference/security/security-templates/kyverno-policies",
    },
    {
      from: "/docs/chaos-engineering/overview/Security/security-templates/psp",
      to: "/docs/chaos-engineering/technical-reference/security/security-templates/psp",
    },
    {
      from: "/docs/chaos-engineering/overview/Security/security-templates/openshift-scc",
      to: "/docs/chaos-engineering/technical-reference/security/security-templates/openshift-scc",
    },
    {
      from: "/docs/chaos-engineering/overview/Security/introduction",
      to: "/docs/chaos-engineering/technical-reference/security/introduction",
    },
    {
      from: "/docs/chaos-engineering/overview/Security/namespace-considerations",
      to: "/docs/chaos-engineering/technical-reference/security/namespace-considerations",
    },
    {
      from: "/docs/chaos-engineering/overview/glossary",
      to: "/docs/chaos-engineering/get-started/terminologies",
    },
    {
      from: "/docs/chaos-engineering/overview/introduction-to-chaos-module",
      to: "/docs/chaos-engineering/get-started/introduction-to-chaos-module",
    },
    {
      from: "/docs/chaos-engineering/overview/powered-by-litmus",
      to: "/docs/chaos-engineering/get-started/powered-by-litmus",
    },
    {
      from: "/docs/chaos-engineering/technical-reference/probes/configure-and-add-probe",
      to: "/docs/chaos-engineering/configure-chaos-experiments/probes/configure-and-add-probe",
    },
    {
      from: "/docs/chaos-engineering/user-guides/validate-hypothesis-using-probes",
      to: "/docs/chaos-engineering/configure-chaos-experiments/probes/validate-hypothesis-using-probes",
    },
    {
      from: "/docs/chaos-engineering/user-guides/add-chaos-hub",
      to: "/docs/chaos-engineering/configure-chaos-experiments/chaos-hubs/add-chaos-hub",
    },
    {
      from: "/docs/chaos-engineering/user-guides/connect-chaos-infrastructures",
      to: "/docs/chaos-engineering/configure-chaos-experiments/chaos-infrastructure/connect-chaos-infrastructures",
    },
    {
      from: "/docs/chaos-engineering/user-guides/disconnect-chaos-infrastructure",
      to: "/docs/chaos-engineering/configure-chaos-experiments/chaos-infrastructure/disconnect-chaos-infrastructure",
    },
    {
      from: "/docs/chaos-engineering/user-guides/construct-and-run-custom-chaos-experiments",
      to: "/docs/chaos-engineering/configure-chaos-experiments/experiments/construct-and-run-custom-chaos-experiments",
    },
    {
      from: "/docs/chaos-engineering/user-guides/manage-chaos-experiment-execution/analyze-chaos-experiment",
      to: "/docs/chaos-engineering/configure-chaos-experiments/experiments/construct-and-run-custom-chaos-experiments",
    },
    {
      from: "/docs/chaos-engineering/user-guides/manage-chaos-experiment-execution/create-complex-chaos-experiments",
      to: "/docs/chaos-engineering/configure-chaos-experiments/experiments/create-complex-chaos-experiments",
    },
    {
      from: "/docs/chaos-engineering/user-guides/manage-chaos-experiment-execution/delete-chaos-experiments",
      to: "/docs/chaos-engineering/configure-chaos-experiments/experiments/delete-chaos-experiments",
    },
    {
      from: "/docs/chaos-engineering/user-guides/manage-chaos-experiment-execution/edit-chaos-experiment",
      to: "/docs/chaos-engineering/configure-chaos-experiments/experiments/edit-chaos-experiment",
    },
    {
      from: "/docs/chaos-engineering/user-guides/manage-chaos-experiment-execution/export-chaos-experiments",
      to: "/docs/chaos-engineering/configure-chaos-experiments/experiments/export-chaos-experiments",
    },
    {
      from: "/docs/chaos-engineering/user-guides/manage-chaos-experiment-execution/halt-chaos-experiments",
      to: "/docs/chaos-engineering/configure-chaos-experiments/experiments/halt-chaos-experiments",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/chaos-faults",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/gcp/gcp-vm-disk-loss-by-label",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/gcp/gcp-vm-disk-loss-by-label",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/gcp/gcp-vm-disk-loss",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/gcp/gcp-vm-disk-loss",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/gcp/gcp-vm-instance-stop-by-label",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/gcp/gcp-vm-instance-stop-by-label",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/gcp/gcp-vm-instance-stop",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/gcp/gcp-vm-instance-stop",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/azure/azure-disk-loss",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-disk-loss",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/azure/azure-instance-cpu-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-instance-cpu-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/azure/azure-instance-io-stress",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-instance-io-stress",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/azure/azure-instance-memory-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-instance-memory-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/azure/azure-instance-stop",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-instance-stop",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/azure/azure-web-app-access-restrict",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-web-app-access-restrict",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/azure/azure-web-app-stop",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-web-app-stop",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kube-resilience/kubelet-density",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kube-resilience/kubelet-density",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/load/locust-loadgen",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/load/locust-loadgen",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/vmware-cpu-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/vmware-cpu-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-disk-loss",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-disk-loss",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-DNS-chaos",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-DNS-chaos",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-host-reboot",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-host-reboot",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-http-latency",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-http-latency",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-http-modify-response",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-http-modify-response",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-http-reset-peer",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-http-reset-peer",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-io-stress",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-io-stress",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-memory-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-memory-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-network-latency",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-network-latency",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-network-loss",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-network-loss",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-process-kill",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-process-kill",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-service-stop",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-service-stop",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/VMware-vm-power-off",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/VMware-vm-power-off",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/vmware/vmware-windows-cpu-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/vmware-windows-cpu-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/common-tunables-for-node-faults",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/node/docker-service-kill",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/docker-service-kill",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/node/kubelet-service-kill",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/kubelet-service-kill",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/node/node-cpu-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-cpu-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/node/node-drain",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-drain",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/node/node-io-stress",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-io-stress",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/node/node-memory-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-memory-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/node/node-restart",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-restart",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/node/node-taint",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-taint",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/container-kill",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/container-kill",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/disk-fill",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/disk-fill",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-autoscaler",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-autoscaler",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-cpu-hog-exec",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-cpu-hog-exec",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-cpu-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-cpu-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-delete",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-delete",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-dns-error",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-dns-error",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-dns-spoof",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-dns-spoof",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-latency",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-http-latency",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-modify-body",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-http-modify-body",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-modify-header",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-http-modify-header",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-reset-peer",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-http-reset-peer",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-http-status-code",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-io-stress",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-io-stress",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-memory-hog-exec",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-memory-hog-exec",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-memory-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-memory-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-corruption",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-corruption",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-duplication",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-duplication",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-latency",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-latency",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-loss",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-loss",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-partition",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-partition",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/alb-az-down",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/alb-az-down",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/clb-az-down",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/clb-az-down",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ebs-loss-by-id",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ebs-loss-by-id",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ebs-loss-by-tag",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ebs-loss-by-tag",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-cpu-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-cpu-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-dns-chaos",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-dns-chaos",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-http-latency",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-http-latency",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-http-modify-body",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-http-modify-body",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-http-modify-header",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-http-modify-header",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-http-reset-peer",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-http-reset-peer",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-http-status-code",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-http-status-code",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-io-stress",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-io-stress",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-memory-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-memory-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-network-latency",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-network-latency",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/eec2-network-loss",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-network-loss",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-process-kill",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-process-kill",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-stop-by-id",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-stop-by-id",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ec2-stop-by-tag",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-stop-by-tag",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ecs-agent-stop",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-agent-stop",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ecs-container-cpu-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-cpu-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ecs-container-io-stress",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-io-stress",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ecs-container-memory-hog",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-memory-hog",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ecs-container-network-loss",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-network-loss",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ecs-instance-stop",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-instance-stop",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/ecs-container-network-latency",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-network-latency",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/lambda-delete-event-source-mapping",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-delete-event-source-mapping",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/lambda-delete-function-concurrency",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-delete-function-concurrency",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/lambda-toggle-event-mapping-state",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-toggle-event-mapping-state",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/lambda-update-function-memory",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-update-function-memory",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/lambda-update-function-timeout",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-update-function-timeout",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/lambda-update-role-permission",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-update-role-permission",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/rds-instance-delete",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/rds-instance-delete",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/rds-instance-reboot",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/rds-instance-reboot",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/aws-fault-tunables",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/aws-fault-tunables",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/security/aws-switch-profile",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/security-configurations/aws-switch-profile",
    },
    {
      from: "/docs/chaos-engineering/chaos-faults/aws/security/policy-for-all-aws-faults",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/security-configurations/policy-for-all-aws-faults",
    },

    {
      from: "/docs/chaos-engineering/chaos-faults/",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/",
    },

    {
      from: "/docs/article/1cqpe6f5id-chaos-enterprise-hub-experiments",
      to: "/docs/chaos-engineering/technical-reference/chaos-faults/",
    },
    
    {
      from: "/docs/article/v64rj2maiz-harness-chaos-engineering-basics",
      to: "/docs/chaos-engineering/configure-chaos-experiments/probes/configure-and-add-probe",
    },

    //  Created by aimurphy for branch ci-reorg-pt-3 on Apr 12, 2023
    {
      from: "/docs/category/codebase-configuration",
      to: "/docs/category/configure-codebases",
    },

    {
      from: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-cluster-requirement",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/ci-cluster-requirement",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/ci-cluster-requirement",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/ci-cluster-requirement",
    },
    {
      from: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/run-windows-builds-in-a-kubernetes-build-infrastructure",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/run-windows-builds-in-a-kubernetes-build-infrastructure",
    },

    {
      from: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates",
    },

    {
      from: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure",
    },

    {
      from: "/docs/continuous-integration/use-ci/build-stage-settings/ci-stage-settings",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/ci-stage-settings",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings",
    },
    {
      from: "/docs/category/build-stage-settings",
      to: "/docs/category/set-up-build-infrastructure",
    },

    // adding redirect for Rashmi
    {
      from: "/docs/platform/References/whitelist-harness-domains-and-ips",
      to: "/docs/platform/References/allowlist-harness-domains-and-ips",
    },

    // Created by aimurphy for branch ci-reorg-pt-5 on Apr 25, 2023
    {
      from: "/docs/category/reference-ci-steps-settings",
      to: "/docs/category/use-ci",
    },
    {
      from: "/docs/category/ci-technical-reference",
      to: "/docs/category/use-ci",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/background-step-settings",
      to: "/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings",
    },

    {
      from: "/docs/continuous-integration/ci-technical-reference/configure-service-dependency-step-settings",
      to: "/docs/continuous-integration/use-ci/manage-dependencies/configure-service-dependency-step-settings",
    },

    {
      from: "/docs/continuous-integration/ci-technical-reference/run-step-settings",
      to: "/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings",
    },

    {
      from: "/docs/continuous-integration/ci-technical-reference/upload-artifacts-steps/upload-artifacts-to-jfrog-artifactory-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog/",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/upload-artifacts-to-jfrog-artifactory-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog/",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/upload-artifacts-steps/upload-artifacts-to-gcs-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/upload-artifacts-to-gcs-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/upload-artifacts-steps/upload-artifacts-to-s-3-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/upload-artifacts-to-s-3-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/build-and-push-steps/build-and-push-to-acr-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-acr",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/build-and-push-to-acr-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-acr",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/build-and-push-steps/build-and-push-to-ecr-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-ecr-step-settings",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/build-and-push-to-ecr-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-ecr-step-settings",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/build-and-push-steps/build-and-push-to-docker-hub-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/build-and-push-to-docker-hub-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/build-and-push-steps/build-and-push-to-gcr-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-gcr",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/build-and-push-to-gcr-step-settings",
      to: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-gcr",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/plugin-steps/ci-bitrise-plugin",
      to: "/docs/continuous-integration/use-ci/use-drone-plugins/ci-bitrise-plugin",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/ci-bitrise-plugin",
      to: "/docs/continuous-integration/use-ci/use-drone-plugins/ci-bitrise-plugin",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/plugin-step-settings-reference",
      to: "/docs/continuous-integration/use-ci/use-drone-plugins/plugin-step-settings-reference",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/plugin-steps/plugin-step-settings-reference",
      to: "/docs/continuous-integration/use-ci/use-drone-plugins/plugin-step-settings-reference",
    },
    {
      from: "/tutorials/build-code/ci-github-action-step",
      to: "/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/ci-github-action-step",
      to: "/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/plugin-steps/ci-github-action-step",
      to: "/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/cache-steps/restore-cache-from-gcs-settings",
      to: "/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/restore-cache-from-gcs-settings",
      to: "/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/cache-steps/save-cache-to-gcs-step-settings",
      to: "/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/save-cache-to-gcs-step-settings",
      to: "/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/cache-steps/restore-cache-from-s-3-step-settings",
      to: "/docs/continuous-integration/use-ci/caching-ci-data/saving-cache",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/restore-cache-from-s-3-step-settings",
      to: "/docs/continuous-integration/use-ci/caching-ci-data/saving-cache",
    },

    {
      from: "/docs/continuous-integration/ci-technical-reference/cache-steps/save-cache-to-s-3-step-settings",
      to: "/docs/continuous-integration/use-ci/caching-ci-data/saving-cache",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/save-cache-to-s-3-step-settings",
      to: "/docs/continuous-integration/use-ci/caching-ci-data/saving-cache",
    },
    {
      from: "/docs/continuous-integration/ci-technical-reference/ci-git-clone-step",
      to: "/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline",
    },
    
    // Created by bfisher for SMP PR 1837 on May 23, 2023
    {
      from: "/docs/self-managed-enterprise-edition/monitor-self-managed-enterprise-edition/monitor-harness-on-prem",
      to: "/docs/self-managed-enterprise-edition/monitor-harness-on-prem",
    },
    // Created by bfisher for DOC-3432 on July 20, 2023
    {
      from: "/docs/platform/Get-started/platform-concepts/view-account-info-and-subscribe-to-alerts",
      to: "/docs/platform/Get-started/view-account-info-and-subscribe-to-alerts",
    },
    {
      from: "/docs/platform/Get-started/platform-concepts/platform-overview",
      to: "/docs/platform/Get-started/platform-overview",
    },
    // Created by bfisher for DOC-3458 on July 25, 2023
    {
      from: "/docs/self-managed-enterprise-edition/back-up-and-recover/use-an-external-database",
      to: "/tutorials/self-managed-enterprise-edition/use-an-external-mongodb-database",
    },
    {
      from: "/docs/self-managed-enterprise-edition/back-up-and-recover/back-up-and-restore-helm",
      to: "/docs/self-managed-enterprise-edition/back-up-and-restore-helm",
    },
    // PR-2012
    {
      from: "/docs/security-testing-orchestration/sto-techref-category/custom-ingest-scan-reference",
      to:   "/docs/security-testing-orchestration/sto-techref-category/custom-ingest-reference",
    },
    // Created by bfisher for DOC-3488 on July 26, 2023
    {
      from: "/docs/platform/resource-development/apis/rate-limits/",
      to:   "/docs/platform/rate-limits",
    },
    {
      from: "/docs/platform/Security/rate-limits",
      to:   "/docs/platform/rate-limits",
    },
  ],
};

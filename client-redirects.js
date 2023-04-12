module.exports = {
  redirects: [
    //Static Re-directs
    {
      from: "/release-notes",
      to: "/release-notes/whats-new",
    },
    {
      from: "/docs",
      to: "/docs/category/documentation",
    },
    {
      from: "/tutorials/get-started",
      to: "/tutorials",
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
      to: "/docs/service-reliability-management/continuous-error-tracking/error-tracking-in-srm-overview",
    }, 
    {
      from: "/docs/service-reliability-management/use-service-reliability-management/error-tracking-category/error-tracking-in-srm",
      to: "/docs/service-reliability-management/continuous-error-tracking/error-tracking-in-srm",
    }, 
    {
      from: "/docs/service-reliability-management/use-service-reliability-management/error-tracking-category/error-tracking-event-dashboard",
      to: "/docs/service-reliability-management/continuous-error-tracking/error-tracking-event-dashboard",
    },   
    {
      from: "/docs/service-reliability-management/use-service-reliability-management/error-tracking-category/error-tracking-arc",
      to: "/docs/service-reliability-management/continuous-error-tracking/error-tracking-arc",
    }, 
    
     // Created by ravilach for CI Tutorials Refactor, PR-1231, on Apr 5, 2023
     {
      from: "/tutorials/build-code/ci-tutorial-kubernetes-cluster-build-infra",
      to: "/tutorials/build-code/build/kubernetes-build-farm",
    },
    {
      from: "/tutorials/build-code/ci-node-docker-quickstart",
      to: "/tutorials/build-code/build/nodejs",
    },
    {
      from: "/tutorials/build-code/ci-localstack-background-step",
      to: "/tutorials/build-code/test/localstack",
    },
    {
      from: "/tutorials/build-code/ci-saucelabs-background-step",
      to: "/tutorials/build-code/test/saucelabs-proxy",
    },
    {
      from: "/tutorials/build-code/ci-java-http-server",
      to: "/tutorials/build-code/build/java",
    },
    {
      from: "/tutorials/build-code/ci-build-push-to-ecr",
      to: "/tutorials/build-code/publish/amazon-ecr",
    },
    {
      from: "/tutorials/build-code/ci-tutorial-go-containers",
      to: "/tutorials/build-code/build/go",
    },
    {
      from: "/tutorials/build-code/ci-tutorial-container-signing",
      to: "/tutorials/build-code/build/signed-image",
    },
    {
      from: "/tutorials/build-code/ci-react-quickstart",
      to: "/tutorials/build-code/build/react",
    },
    {
      from: "/tutorials/build-code/ci-tutorial-push-to-gar",
      to: "/tutorials/build-code/publish/google-gar",
    },
    {
      from: "/tutorials/build-code/ci-publish-allure-report",
      to: "/tutorials/build-code/test/allure-report",
    },
    {
      from: "/tutorials/build-code/ci-tutorial-rust-container",
      to: "/tutorials/build-code/build/rust",
    },
    {
      from: "/tutorials/build-code/ci-tutorial-codecov-test",
      to: "/tutorials/build-code/test/codecov",
    },
    
    // CD Tutorial

    // Created by schoudhury on Apr 3, 2023
    {
      from: "/tutorials/deploy-services/microservice-manifest-k8s",
      to: "/tutorials/deploy-services/kubernetes/manifest",
    },
    {
      from: "/tutorials/deploy-services/helm-k8s",
      to: "/tutorials/deploy-services/kubernetes/helm-chart",
    },
    {
      from: "/tutorials/deploy-services/helm-argocd-gitops-k8s",
      to: "/tutorials/deploy-services/kubernetes/helm-chart",
    },
    {
      from: "/tutorials/deploy-services/cdce-helm-k8s",
      to: "/tutorials/deploy-services/kubernetes/helm-chart",
    },
    {
      from: "/tutorials/deploy-services/docker-ecs",
      to: "/tutorials/deploy-services/amazon-ecs",
    },
    {
      from: "/tutorials/deploy-services/docker-ecr-k8s",
      to: "/tutorials/deploy-services/kubernetes",
    },
    {
      from: "/tutorials/deploy-services/harness-cicd-tutorial",
      to: "/tutorials/deploy-services/unified-cicd",
    },


    // Platform Tutorial

    // Created by schoudhury on Feb 21, 2023
       {
         from: "/tutorials/platform/provision-azure-infrastructure",
         to: "/tutorials/platform/install-delegate",
       },
    
    // Delegate Docs

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
        from: "/docs/platform/Delegates/get-started-with-delegates/delegate-installation-overview",
        to: "/docs/platform/Delegates/delegate-concepts/delegate-overview",
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
         from: "/docs/platform/Delegates/delegate-guide/delegate-image-types",
         to: "/docs/platform/Delegates/delegate-concepts/delegate-image-types",
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

    //  Created by aimurphy for DOC-2484 on Mar 7, 2023
    {
      from: "/tutorials/build-code/ci-github-action-step",
      to: "/docs/continuous-integration/ci-technical-reference/ci-github-action-step",
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

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 3, 2023
    {
      from: "/docs/category/view-your-build",
      to: "/docs/category/view-builds",
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

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 4, 2023
    {
      from: "/docs/continuous-integration/ci-technical-reference/ci-cluster-requirement",
      to: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-cluster-requirement",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 5, 2023
    {
      from: "/docs/continuous-integration/ci-technical-reference/ci-stage-settings",
      to: "/docs/continuous-integration/use-ci/build-stage-settings/ci-stage-settings",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 5, 2023
    {
      from: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/modify-and-override-build-settings-before-a-build",
      to: "/docs/continuous-integration/use-ci/build-stage-settings/modify-and-override-build-settings-before-a-build",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 6, 2023
    {
      from: "/docs/category/troubleshoot-and-optimize-ci",
      to: "/docs/category/troubleshoot-ci",
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
    to: "/tutorials/orchestrate-security-tests/sto-standalone-workflows",
    },

    //  Created by dbothwell for DOC-2895 on Apr 5, 2023
    {
    from: "/docs/security-testing-orchestration/onboard-sto/sto-tutorial-2-integrated-sto-ci-cd-workflows",
    to: "/tutorials/orchestrate-security-tests/sto-integrated-workflows",
    },
    
    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 10, 2023
    {
      from: "/docs/continuous-integration/ci-technical-reference/ci-build-image-updates",
      to: "/docs/continuous-integration/use-ci/build-stage-settings/ci-build-image-updates",
    },

    //  Created by aimurphy for branch ci-reorg-pt-2 on Apr 10, 2023
    {
      from: "/docs/continuous-integration/ci-technical-reference/harness-ci",
      to: "/docs/continuous-integration/use-ci/build-stage-settings/harness-ci",
    },

    // Created by michael cretzman to fix CCM redirects on Apr 12, 2023

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
      to: "/docs/cloud-cost-management/getting-started-ccm/set-up-cloud-cost-management/use-cloud-integration",
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
    
    {
      from: "/docs/cloud-cost-management/onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-kubernetes",
      to: "/docs/cloud-cost-management/getting-started-ccm/set-up-cloud-cost-management/set-up-cost-visibility-for-kubernetes",
    },
    
],
};

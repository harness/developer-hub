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
    
    // Platform Tutorial

    // Created by schoudhury on Feb 21, 2023
       {
         from: "/tutorials/platform/provision-azure-infrastructure",
         to: "/tutorials/platform/install-delegate",
       },
    
    // Delegate Docs
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023
       {
         from: "/docs/platform/platform-concepts/delegates-overview",
         to: "/docs/platform/Delegates/get-started-with-delegates/delegates-overview",
       },
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023
       {
         from: "/docs/platform/platform-concepts/delegate-installation-overview",
         to: "/docs/platform/Delegates/get-started-with-delegates/delegate-installation-overview",
       },
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023; modified Jan 22, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/build-custom-delegate-images-with-third-party-tools",
         to: "/docs/platform/Delegates/customize-delegates/build-custom-delegate-images-with-third-party-tools",
       },
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023; modified Jan 22, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/delegate-auto-update",
         to: "/docs/platform/Delegates/configure-delegates/delegate-auto-update",
       },
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023; modified on Jan 21, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/delegate-how-tos",
         to: "/docs/platform/Delegates/get-started-with-delegates/delegates-overview",
       },
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/delegate-image-types",
         to: "/docs/platform/Delegates/get-started-with-delegates/delegate-image-types",
       },
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023
       {
         from: "/docs/platform/Delegates/delegate-reference/delegate-requirements-and-limitations",
         to: "/docs/platform/Delegates/get-started-with-delegates/delegate-requirements-and-limitations",
       },
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023; modified on Jan 22, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/enable-root-user-privileges-to-add-custom-binaries",
         to: "/docs/platform/Delegates/customize-delegates/enable-root-user-privileges-to-add-custom-binaries",
       },
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023; modified on Jan 22, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/install-delegates-with-third-party-tools",
         to: "/docs/platform/Delegates/customize-delegates/build-custom-delegate-images-with-third-party-tools",
       },
    
    
    
    // Created by kat-enos for PR-738 on Feb 21, 2023
       {
          from: "/docs/platform/Delegates/install-delegates/kubernetes-delegates/install-harness-delegate-on-kubernetes",
          to: "/docs/platform/Delegates/install-delegates/install-a-delegate",
        },
    

    // Created by kat-enos for PR-738 on Feb 21, 2023
    {
      from: "/docs/platform/Delegates/install-delegates/kubernetes-delegates/install-harness-delegate-using-helm",
      to: "/docs/platform/Delegates/install-delegates/install-a-delegate",
    },
    
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/automate-delegate-installation",
         to: "/docs/platform/Delegates/advanced-installation/automate-delegate-installation",
       },
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/install-a-delegate-with-3-rd-party-tool-custom-binaries",
         to: "/docs/platform/Delegates/advanced-installation/install-a-delegate-with-3-rd-party-tool-custom-binaries",
       },
    
    // Created by kat-enos for PR-2421 on Jan 13, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/non-root-delegate-installation",
         to: "/docs/platform/Delegates/get-started-with-delegates/delegate-installation-overview",
       },
    
     // Created by kat-enos for PR-2421 on Jan 13, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/custom-delegate",
         to: "/docs/platform/Delegates/customize-delegates/build-custom-delegate-images-with-third-party-tools",
       },   
    
     // Created by kat-enos for PR-2421 on Jan 13, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/configure-delegate-proxy-settings",
         to: "/docs/platform/Delegates/configure-delegates/configure-delegate-proxy-settings",
       },
    
     // Created by kat-enos for PR-2421 on Jan 13, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/run-scripts-on-delegates",
         to: "/docs/platform/Delegates/customize-delegates/build-custom-delegate-images-with-third-party-tools",
       },
    
     // Created by kat-enos for PR-2421 on Jan 13, 2023; modified Jan 22, 2023
       {
         from: "/docs/platform/Delegates/delegate-guide/delegate-registration",
         to: "/docs/platform/Delegates/get-started-with-delegates/delegate-registration",
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
      to: "/docs/continuous-integration/ci-technical-reference/ci-bitrise-plugin",
    },

    // Created by michael cretzman for DOC-2694 on Apr 11, 2023
    {
      from: "/docs/continuous-delivery/cd-infrastructure/kubernetes-infra/define-your-kubernetes-target-infrastructure",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-infra/define-your-kubernetes-target-infrastructure",
      from: "/docs/continuous-delivery/cd-advanced/cd-helm-category/deploy-helm-chart-with-dependencies-and-subcharts",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/helm/cd-helm-category/deploy-helm-chart-with-dependencies-and-subcharts",
      from: "/docs/continuous-delivery/cd-advanced/cd-helm-category/use-a-local-helm-chart",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/helm/cd-helm-category/use-a-local-helm-chart",
      from: "/docs/continuous-delivery/cd-technical-reference/cd-k8s-ref/kubernetes-releases-and-versioning",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-releases-and-versioning",
      from: "/docs/continuous-delivery/cd-technical-reference/cd-k8s-ref/kubernetes-steps-timeouts-and-deadline-parameters",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-steps-timeouts-and-deadline-parameters",
      from: "/docs/continuous-delivery/cd-technical-reference/cd-k8s-ref/using-open-shift-with-harness-kubernetes",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/using-open-shift-with-harness-kubernetes",
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/add-a-custom-remote-script-and-manifests",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-a-custom-remote-script-and-manifests",
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/add-and-override-values-yaml-files",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-and-override-values-yaml-files",
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments",
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/define-kubernetes-manifests",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/define-kubernetes-manifests",
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/pull-an-image-from-a-private-registry-for-kubernetes",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/pull-an-image-from-a-private-registry-for-kubernetes",
      from: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/skip-harness-label-selector-tracking-on-kubernetes-deployments",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/skip-harness-label-selector-tracking-on-kubernetes-deployments",
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/create-a-kubernetes-blue-green-deployment",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment",
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/create-a-kubernetes-canary-deployment",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment",
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/create-a-kubernetes-rolling-deployment",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment",
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/delete-kubernetes-resources",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources",
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/deploy-manifests-using-apply-step",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step",
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/k8s-dry-run",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/k8s-dry-run",
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/run-kubernetes-jobs",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/run-kubernetes-jobs",
      from: "/docs/continuous-delivery/cd-execution/kubernetes-executions/scale-kubernetes-replicas",
      to: "/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/scale-kubernetes-replicas",
      from: "/docs/continuous-delivery/cd-execution/cd-general-steps/container-step",
      to: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/container-step",
      from: "/docs/continuous-delivery/cd-execution/cd-general-steps/download-and-copy-artifacts-using-the-command-step",
      to: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/download-and-copy-artifacts-using-the-command-step",
      from: "/docs/continuous-delivery/cd-execution/cd-general-steps/run-a-script-on-multiple-target-instances",
      to: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/run-a-script-on-multiple-target-instances",
      from: "/docs/continuous-delivery/cd-execution/cd-general-steps/run-jenkins-jobs-in-cd-pipelines",
      to: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/run-jenkins-jobs-in-cd-pipelines",
      from: "/docs/continuous-delivery/cd-execution/cd-general-steps/using-http-requests-in-cd-pipelines",
      to: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/using-http-requests-in-cd-pipelines",
      from: "/docs/continuous-delivery/cd-execution/cd-general-steps/using-shell-scripts",
      to: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/using-shell-scripts",
      from: "/docs/continuous-delivery/cd-execution/cd-general-steps/wait-step",
      to: "/docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/wait-step",
      from: "/docs/continuous-delivery/cd-deployments-category/deployment-logs-and-limitations",
      to: "/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations",
      from: "/docs/continuous-delivery/onboard-cd/upgrading/upgrade-nextgen-cd",
      to: "/docs/continuous-delivery/get-started/upgrading/upgrade-nextgen-cd",
      from: "/docs/continuous-delivery/cd-gitops/add-a-harness-git-ops-repository",
      to: "/docs/continuous-delivery/gitops/add-a-harness-git-ops-repository",
      from: "/docs/continuous-delivery/cd-gitops/add-harness-git-ops-repository-credentials-template",
      to: "/docs/continuous-delivery/gitops/add-harness-git-ops-repository-credentials-template",
      from: "/docs/continuous-delivery/cd-gitops/harness-cd-git-ops-quickstart",
      to: "/docs/continuous-delivery/gitops/harness-cd-git-ops-quickstart",
      from: "/docs/continuous-delivery/cd-gitops/harness-git-ops-application-set-tutorial",
      to: "/docs/continuous-delivery/gitops/harness-git-ops-application-set-tutorial",
      from: "/docs/continuous-delivery/cd-gitops/harness-git-ops-basics",
      to: "/docs/continuous-delivery/gitops/harness-git-ops-basics",
      from: "/docs/continuous-delivery/cd-gitops/install-a-harness-git-ops-agent",
      to: "/docs/continuous-delivery/gitops/install-a-harness-git-ops-agent",
      from: "/docs/continuous-delivery/cd-gitops/multiple-argo-to-single-harness",
      to: "/docs/continuous-delivery/gitops/multiple-argo-to-single-harness",
    },
  ],
};
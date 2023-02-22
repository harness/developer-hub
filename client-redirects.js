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
  ],
};


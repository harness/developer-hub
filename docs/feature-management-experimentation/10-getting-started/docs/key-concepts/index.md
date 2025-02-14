---
title: Key concepts
sidebar_label: Key concepts
sidebar_position: 13
helpdocs_is_private: false
helpdocs_is_published: true
---

import DocCardList from '@theme/DocCardList';

Click on the tiles below to unlock key concepts that explain how FME works. You can also see how it they all fit together by looking at the [FME object architecture diagram](./fme-object-architecture-diagram).

<!-- DocCardList / -->

<DocCardList items={
  [
    { 
      type:'link', 
      href:'./api-keys',
      label:'API key',
      description:'Authorizes communication with Harness servers',
    },
    { 
      type:'link', 
      href:'./attributes',
      label:'Attribute',
      description:'Property associated with a traffic key',
    },
    { 
      type:'link', 
      href:'./events',
      label:'Event',
      description:'User action, performance measurement, or error exception that you send to FME',
    },
    { 
      type:'link', 
      href:'./feature-flags',
      label: 'Feature flag',
      description:'Allows you to enable or disable a feature without deploying source code',
    },
    { 
      type:'link', 
      href:'./fme-definitions',
      label:'FME definition',
      description:'The feature flag and segment definitions fetched by FME SDKs',
    },
    { 
      type:'link', 
      href:'./gettreatment-call',
      label:'GetTreatment call',
      description:'The method used to evalute feature flags in FME SDKs',
    },
    { 
      type:'link', 
      href:'./impressions',
      label:'Impression',
      description:'Record of a feature flag evaluation',
    },
    { 
      type:'link', 
      href:'./keys',
      label:'Key',
      description:'Identify your application traffic (end users or customers)',
    },
    { 
      type:'link', 
      href:'./metrics',
      label:'Metric',
      description:'Measures events that are sent to FME',
    },
    { 
      type:'link', 
      href:'./segments',
      label:'Segment',
      description:'List of keys',
    },
    { 
      type:'link', 
      href:'./traffic-types',
      label:'Traffic type',
      description:'A way of categorizing keys',
    },
  ]
}/>
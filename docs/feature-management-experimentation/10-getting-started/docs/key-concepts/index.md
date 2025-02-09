---
title: Key concepts
sidebar_label: Key concepts
sidebar_position: 13
helpdocs_is_private: false
helpdocs_is_published: true
---

import DocCardList from '@theme/DocCardList';

Click on the tiles below to unlock key concepts that explain how FME works. You can also see how it they all fit together by looking at the [FME object architecture diagram](./fme-object-architecture-diagram).


<DocCardList items={
  [
    { 
      type:'link', 
      href:'./api-keys',
      label:'API keys -',
      description:'Authorize communication with Harness servers',
    },
    { 
      type:'link', 
      href:'./attributes',
      label:'Attributes -',
      description:'Properties associated with traffic keys',
    },
    { 
      type:'link', 
      href:'./events',
      label:'Events -',
      description:'User actions, performance measurements, or error exceptions that you send to FME',
    },
    { 
      type:'link', 
      href:'./feature-flags',
      label: 'Feature flags -',
      description:'Allow you to enable or disable a feature without deploying source code',
    },
    { 
      type:'link', 
      href:'./fme-definitions',
      label:'FME definitions -',
      description:'The feature flag and segment definitions fetched by FME SDKs',
    },
    { 
      type:'link', 
      href:'./gettreatment-call',
      label:'GetTreatment call -',
      description:'The method used to evalute feature flags in FME SDKs',
    },
    { 
      type:'link', 
      href:'./impressions',
      label:'Impressions -',
      description:'An impression is a record of a feature flag evaluation',
    },
    { 
      type:'link', 
      href:'./keys',
      label:'Keys -',
      description:'Identify your application traffic (end users or customers)',
    },
    { 
      type:'link', 
      href:'./metrics',
      label:'Metrics -',
      description:'Measure events that are sent to FME',
    },
    { 
      type:'link', 
      href:'./segments',
      label:'Segments -',
      description:'Lists of keys',
    },
    { 
      type:'link', 
      href:'./traffic-types',
      label:'Traffic types -',
      description:'Traffic types are a way of categorizing keys',
    },
  ]
}/>
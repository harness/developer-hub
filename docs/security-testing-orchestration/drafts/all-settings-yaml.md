---
title: Scanner Setup YAML Configuration
description: All the available settings to configure individual scans.
sidebar_position: 2
---

The following YAML sample 

```yaml
- step:
      type:          # Snyk | Burp | etc.
      name:          # 
      identifier:    # 
      spec:
        mode:        # orchestration | extraction | ingestion 
        ingestion:   # ONLY IF mode == ingestion 
            file:    
        config: default 
        target:
            type:      # repository | image | container | instance 
            name:      # 
            variant:   # 
            workspace: /harness

        auth:
          access_id: 
          access_token: 
          type:       # apiKey|usernamePassword 
          domain:
          ssl: 

        # ONLY IF type == image | container
        image:
            type:     # ONLY IF mode == orchestration
                      # docker_v2 | jfrog_artifactory | aws_ecr | local_image
            domain: 
            access_token: 
            region:  # ONLY IF image type == aws_ecr
        
        tool:
          project_name: <bdh-project>
          project_version: <bdh-project-version>

        
        # ADVANCED OPTIONS
        advanced: 
          log: 
            level: INFO # INFO|DEBUG|WARNING|ERROR
            serializer: SIMPLE_ONPREM # SIMPLE|BASIC|BUNYAN|SIMPLE_ONPREM|ONPREM|
          args:
            cli: "--version -test blah"
            passthrough: "help"
          fail_on_severity: High
          include_raw: true
```


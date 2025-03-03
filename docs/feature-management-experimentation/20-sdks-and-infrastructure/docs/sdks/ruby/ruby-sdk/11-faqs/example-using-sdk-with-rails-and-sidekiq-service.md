---
title: "Example using Split SDK with Rails and Sidekiq service"
sidebar_label: "Example using Split SDK with Rails and Sidekiq service"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006667012-Block-traffic-until-the-SDK-is-ready </button>
</p>

Example: Basic example to use Split Ruby SDK in Rails and Sidekiq service.

Environment:

Ruby 2.7.5

Steps to use:

1. Example is in the repo link: https://github.com/sanzmauro/poc-test-split-io/tree/split-with-sidekiq, follow the readme instructions.
2. Run Sidekiq 
  ```
bundle exec sidekiq -e ${RACK_ENV:-development} -r ./sidekiq/config/application.rb -C ./sidekiq/config/sidekiq.yml
```
3. Run rails
  ```
rails s 
```
4. Request: `http://localhost:3030/test_global_feature_flag?key=<SOME-VALUE>&split_name=<YOUR-SPLIT-NAME>`
5. You will see in the sidekiq console, the result of the evaluations.
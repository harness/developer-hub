The following table lists the server-side Feature Flag SDKs that  Harness supports.

| Resource                                                                            | Limit            | Description                                                    |
| ----------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------- |
| [Flags](/docs/feature-flags/get-started/overview#what-are-feature-flags)            | 1200             | Number of flags per  project                                   |
| [Targets](/docs/feature-flags/use-ff/ff-target-management/add-targets)              | 30 day retention | Number of targets per environment                              |
| [Target Groups](/docs/feature-flags/use-ff/ff-target-management/add-target-groups/) | 1200             | Number of groups per environment                               |
| API Keys                                                                            | 10               | Number of api keys created per env                             |
| Flag Target Rules                                                                   | 2000             | Number of target rules on a flag (e.g. serve target x true)    |
| Flag Target Group Rules                                                             | 1000             | Number of groups rules on a flag (e.g. server group beta true) |
| Target Group Include/Exclude Rules                                                  | 5000             | Number of targets directly included/excluded in a group        |
| Target Group Custom Rules                                                           | 5000             | Number of custom rules (e.g. if identifier == “foo”)           |
| Target Group Clause Sizes                                                           | 5000             | Number of clauses in a group rule                              |
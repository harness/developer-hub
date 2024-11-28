| Resource                           | Limit   | Description                                                                                                    |
| ---------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| Flags                              | 1200    | Number of flags per  project                                                                                   |
| Targets                            | 60 days | Number of targets per environment are retained for up to 60 days. Targets referenced in rules do not get removed |
| Target Groups                      | 1200    | Number of groups per environment                                                                               |
| API Keys                           | 10      | Number of api keys created per environment                                                                             |
| Flag Target Rules                  | 2000    | Number of target rules on a flag (e.g. serve target x true)                                                    |
| Flag Target Group Rules            | 1000    | Number of target group rules on a flag (e.g. server group beta true)                                                 |
| Target Group Include/Exclude Rules | 5000    | Number of targets directly included/excluded in a target group                                                        |
| Target Group Custom Rules          | 5000    | Number of custom rules in a target group (e.g. if identifier == “foo”)                                                           |
| Target Group Clause Sizes          | 5000    | Number of clauses in a group rule                                                                              |
---
title: Delegate image version support status
description: This topic lists delegate image versions and their support status.
sidebar_position: 1
---

This document provides delegate image version information and support lifecycle details. Delegate images have a defined support lifecycle: End of Support (EOS) occurs 6 months after release, and End of Life (EOL) occurs 8 months after release.

:::warning
Delegates past their EOS date are not supported by Harness. Upgrade your delegates before they reach EOS to avoid service disruptions.
:::

For complete upgrade procedures, see [Delegate expiration policy](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration#delegate-expiration-policy).

## Support lifecycle definitions

### End of Support (EOS) - 6 months after release

When a delegate reaches EOS:

- Harness Support no longer accepts support requests for the delegate
- Security fixes are still provided
- Product defects are not addressed
- Expired delegates may not function correctly
- Support will require delegate upgrades for any issues

### End of Life (EOL) - 8 months after release

When a delegate reaches EOL:

- The image is no longer available or maintained
- No support or fixes are provided

## Version format and lifecycle calculation

Delegate versions follow the format: **YY.MM.XXXX**

- **YY** = Year (24 = 2024)
- **MM** = Month (11 = November) 
- **XXXX** = Build identifier

### Example calculation

For delegate version **24.07.84503**:

- **Release Date**: July 10, 2024
- **EOS Date**: December 31, 2024 (end of 6th month)
- **EOL Date**: February 28, 2025 (end of 8th month)

:::note
EOS and EOL dates are always set to the last day of the respective month, regardless of the specific release date within the month.
::: 

### Hotfix policy

Hotfixes may be released to address critical issues within an image's lifecycle.

:::note
Hotfixes do not extend the original EOS and EOL dates. The lifecycle remains based on the original release month.
:::

**Example**: If version 24.07.84503 receives a hotfix in November 2024, the EOS (December 2024) and EOL (February 2025) dates remain unchanged.

## Reference information

Support dates are calculated from when the delegate image was published to [Harness Delegate Docker Hub](https://hub.docker.com/r/harness/delegate/tags).

| Image version | Release date      | EOS              | EOL              |
|---------------|-------------------|------------------|------------------|
| 25.08.86600   | August 27, 2025   | January 31, 2026 | March 31, 2026   |
| 25.07.86503   | August 13, 2025   | December 31, 2025| February 28, 2026|
| 25.07.86402   | August 12, 2025   | December 31, 2025| February 28, 2026|
| 25.07.86401   | July 31, 2025     | December 31, 2025| February 28, 2026|
| 25.07.86301   | July 30, 2025     | December 31, 2025| February 28, 2026|
| 25.07.86302   | July 30, 2025     | December 31, 2025| February 28, 2026|
| 25.07.86300   | July 17, 2025     | December 31, 2025| February 28, 2026|
| 25.06.86106   | July 15, 2025     | November 30, 2025| January 31, 2026 |
| 25.06.86203   | July 14, 2025     | November 30, 2025| January 31, 2026 |
| 25.06.86004   | July 12, 2025     | November 30, 2025| January 31, 2026 |
| 25.06.86202   | July 03, 2025     | November 30, 2025| January 31, 2026 |
| 25.06.86104   | July 01, 2025     | November 30, 2025| January 31, 2026 |
| 25.06.86102   | June 26, 2025     | November 30, 2025| January 31, 2026 |
| 25.06.86101   | June 19, 2025     | November 30, 2025| January 31, 2026 |
| 25.06.86100   | June 16, 2025     | November 30, 2025| January 31, 2026 |
| 25.05.85905   | June 03, 2025     | October 31, 2025 | December 31, 2025|
| 25.05.85904   | May 30, 2025      | October 31, 2025 | December 31, 2025|
| 25.05.85903   | May 23, 2025      | October 31, 2025 | December 31, 2025|
| 25.05.85902   | May 22, 2025      | October 31, 2025 | December 31, 2025|
| 25.05.85805   | May 22, 2025      | October 31, 2025 | December 31, 2025|
| 25.05.85803   | May 15, 2025      | October 31, 2025 | December 31, 2025|
| 25.05.85804   | May 15, 2025      | October 31, 2025 | December 31, 2025|
| 25.05.85801   | May 08, 2025      | October 31, 2025 | December 31, 2025|
| 25.04.85703   | May 02, 2025      | September 30, 2025| November 30, 2025|
| 25.04.85702   | May 01, 2025      | September 30, 2025| November 30, 2025|
| 25.04.85701   | April 23, 2025    | September 30, 2025| November 30, 2025|
| 25.04.85602   | April 15, 2025    | September 30, 2025| November 30, 2025|
| 25.02.85306   | April 10, 2025    | July 31, 2025    | September 30, 2025|
| 25.04.85601   | April 10, 2025    | September 30, 2025| November 30, 2025|
| 25.02.85201   | April 01, 2025    | July 31, 2025    | September 30, 2025|
| 25.03.85405   | March 27, 2025    | August 31, 2025  | October 31, 2025 |
| 25.03.85504   | March 27, 2025    | August 31, 2025  | October 31, 2025 |
| 25.03.85503   | March 27, 2025    | August 31, 2025  | October 31, 2025 |
| 25.02.85305   | March 21, 2025    | July 31, 2025    | September 30, 2025|
| 24.08.83706   | February 26, 2025 | January 31, 2025 | March 31, 2025   |
| 25.02.85300   | February 26, 2025 | July 31, 2025    | September 30, 2025|
| 24.12.84710   | February 25, 2025 | June 30, 2025    | August 31, 2025  |
| 24.12.84709   | February 12, 2025 | June 30, 2025    | August 31, 2025  |
| 24.10.84107   | January 31, 2025  | April 30, 2025   | June 30, 2025    |
| 25.01.85000   | January 28, 2025  | June 30, 2025    | August 31, 2025  |
| 24.12.84708   | January 16, 2025  | June 30, 2025    | August 31, 2025  |
| 25.01.84800   | January 13, 2025  | June 30, 2025    | August 31, 2025  |
| 24.12.84704   | January 06, 2025  | June 30, 2025    | August 31, 2025  |
| 24.11.84311   | December 19, 2024 | April 30, 2025   | June 30, 2025    |
| 24.12.84702   | December 17, 2024 | May 31, 2025     | July 31, 2025    |

<details>
    <summary>EOL Delegates</summary>
    | Image version         | Release date       | EOS              | EOL              |
    |-----------------------|--------------------|------------------|------------------|
    | 24.11.84503           | December 09, 2024  | April 30, 2025   | June 30, 2025    |
    | 24.11.84310           | December 05, 2024  | April 30, 2025   | June 30, 2025    |
    | 24.11.84502           | December 05, 2024  | April 30, 2025   | June 30, 2025    |
    | 24.10.84106           | December 04, 2024  | March 31, 2025   | May 31, 2025     |
    | 24.11.84501           | December 04, 2024  | April 30, 2025   | June 30, 2025    |
    | 24.07.83407           | December 04, 2024  | December 31, 2024| February 28, 2025|
    | 24.11.84500           | November 29, 2024  | April 30, 2025   | June 30, 2025    |
    | 24.11.84309           | November 28, 2024  | April 30, 2025   | June 30, 2025    |
    | 24.11.84308           | November 23, 2024  | April 30, 2025   | June 30, 2025    |
    | 24.11.84307           | November 21, 2024  | April 30, 2025   | June 30, 2025    |
    | 24.11.84306           | November 19, 2024  | April 30, 2025   | June 30, 2025    |
    | 24.10.84205-ubi9-beta | November 18, 2024  | March 31, 2025   | May 31, 2025     |
    | 24.10.84204           | November 18, 2024  | March 31, 2025   | May 31, 2025     |
    | 24.10.84200           | November 04, 2024  | March 31, 2025   | May 31, 2025     |
    | 24.10.84105           | November 01, 2024  | March 31, 2025   | May 31, 2025     |
    | 24.10.84104           | October 21, 2024   | March 31, 2025   | May 31, 2025     |
    | 24.09.83909           | October 11, 2024   | March 31, 2025   | May 31, 2025     |
    | 24.09.83906           | October 02, 2024   | March 31, 2025   | May 31, 2025     |
    | 24.09.83905           | September 30, 2024 | March 31, 2025   | May 31, 2025     |
    | 24.08.83803           | September 20, 2024 | January 31, 2025 | March 31, 2025   |
    | 24.08.83804           | September 20, 2024 | January 31, 2025 | March 31, 2025   |
    | 24.09.83900           | September 20, 2024 | March 31, 2025   | May 31, 2025     |
    | 24.08.83802           | September 03, 2024 | January 31, 2025 | March 31, 2025   |
    | 24.08.83705           | August 31, 2024    | January 31, 2025 | March 31, 2025   |
    | 24.07.83611           | August 31, 2024    | December 31, 2024| February 28, 2025|
    | 24.08.83704           | August 29, 2024    | January 31, 2025 | March 31, 2025   |
    | 24.08.83702           | August 22, 2024    | January 31, 2025 | March 31, 2025   |
    | 24.08.83307           | August 20, 2024    | January 31, 2025 | March 31, 2025   |
    | 24.07.83609           | August 20, 2024    | December 31, 2024| February 28, 2025|
    | 24.07.83608           | August 14, 2024    | December 31, 2024| February 28, 2025|
    | 24.07.83607           | August 13, 2024    | December 31, 2024| February 28, 2025|
    | 24.08.83306           | August 13, 2024    | January 31, 2025 | March 31, 2025   |
    | 24.07.83406           | August 13, 2024    | December 31, 2024| February 28, 2025|
    | 24.07.83606           | August 07, 2024    | December 31, 2024| February 28, 2025|
    | 24.08.83405           | August 05, 2024    | January 31, 2025 | March 31, 2025   |
    | 24.07.83605           | July 24, 2024      | December 31, 2024| February 28, 2025|
    | 24.07.83503           | July 17, 2024      | December 31, 2024| February 28, 2025|
    | 24.07.82906           | July 17, 2024      | December 31, 2024| February 28, 2025|
    | 24.07.83404           | July 10, 2024      | December 31, 2024| February 28, 2025|
    | 24.07.83205           | July 9, 2024       | December 31, 2024| February 28, 2025|
    | 24.07.82905           | July 1, 2024       | December 31, 2024| February 28, 2025|
    | 24.06.83304           | June 24, 2024      | November 30, 2024| January 31, 2025 |
    | 24.06.83204           | June 20, 2024      | November 30, 2024| January 31, 2025 |
    | 24.06.83004           | June 7, 2024       | November 30, 2024| January 31, 2025 |
    | 24.06.83003           | June 3, 2024       | November 30, 2024| January 31, 2025 |
    | 24.05.82711           | May 30, 2024       | October 31, 2024 | December 31, 2024|
    | 24.05.82904           | May 21, 2024       | October 31, 2024 | December 31, 2024|
    | 24.05.83001           | May 21, 2024       | October 31, 2024 | December 31, 2024|
    | 24.05.82205           | May 20, 2024       | October 31, 2024 | December 31, 2024|
    | 24.05.82903           | May 16, 2024       | October 31, 2024 | December 31, 2024|
    | 24.05.82902           | May 10, 2024       | October 31, 2024 | December 31, 2024|
    | 24.04.82901           | May 8, 2024        | September 30, 2024| November 30, 2024|
    | 24.04.82804           | April 24, 2024     | September 30, 2024| November 30, 2024|
    | 24.04.82709           | April 18, 2024     | September 30, 2024| November 30, 2024|
    | 24.04.82708           | April 17, 2024     | September 30, 2024| November 30, 2024|
    | 24.04.82707           | April 15, 2024     | September 30, 2024| November 30, 2024|
    | 24.04.82603           | April 4, 2024      | September 30, 2024| November 30, 2024|
    | 24.03.82601           | March 28, 2024     | August 31, 2024  | October 31, 2024 |
    | 24.03.82600           | March 27, 2024     | August 31, 2024  | October 31, 2024 |
    | 24.03.82505           | March 18, 2024     | August 31, 2024  | October 31, 2024 |
    | 24.03.82502           | March 14, 2024     | August 31, 2024  | October 31, 2024 |
    | 24.03.82408           | March 8, 2024      | August 31, 2024  | October 31, 2024 |
    | 24.02.82406           | March 1, 2024      | July 31, 2024    | September 30, 2024|
    | 24.02.82404           | February 29, 2024  | August 31, 2024  | October 31, 2024 |
    | 24.02.82309           | February 28, 2024  | August 31, 2024  | October 31, 2024 |
    | 24.02.82402           | February 27, 2024  | August 31, 2024  | October 31, 2024 |
    | 24.02.82308           | February 21, 2024  | August 31, 2024  | October 31, 2024 |
    | 24.02.82306           | February 15, 2024  | August 31, 2024  | October 31, 2024 |
    | 24.02.82305           | February 15, 2024  | August 31, 2024  | October 31, 2024 |
    | 24.02.82302           | February 13, 2024  | August 31, 2024  | October 31, 2024 |
    | 24.02.82304           | February 12, 2024  | August 31, 2024  | October 31, 2024 |
    | 24.02.82203           | February 2, 2024   | August 31, 2024  | October 31, 2024 |
    | 24.01.82202           | January 30, 2024   | June 30, 2024    | August 31, 2024  |
    | 24.01.82110           | January 29, 2024   | June 30, 2024    | August 31, 2024  |
    | 24.01.82109           | January 23, 2024   | June 30, 2024    | August 31, 2024  |
    | 24.01.82108           | January 16, 2024   | June 30, 2024    | August 31, 2024  |
    | 24.01.82006           | January 16, 2024   | June 30, 2024    | August 31, 2024  |
    | 24.01.82005           | January 15, 2024   | June 30, 2024    | August 31, 2024  |
    | 24.01.82004           | January 12, 2024   | June 30, 2024    | August 31, 2024  |
    | 24.01.82003           | January 11, 2024   | June 30, 2024    | August 31, 2024  |
    | 24.01.82002           | January 9, 2024    | June 30, 2024    | August 31, 2024  |
    | 24.01.81810           | January 8, 2024    | June 30, 2024    | August 31, 2024  |
    | 24.01.81811           | January 5, 2024    | June 30, 2024    | August 31, 2024  |
    | 23.12.82001           | January 5, 2024    | May 31, 2024     | July 31, 2024    |
    | 23.12.81809           | January 2, 2024    | May 31, 2024     | July 31, 2024    |
    | 23.12.81808           | December 26, 2023  | May 31, 2024     | July 31, 2024    |
    | 23.12.81412           | December 14, 2023  | May 31, 2024     | July 31, 2024    |
    | 23.12.81411           | December 13, 2023  | May 31, 2024     | July 31, 2024    |
    | 23.12.81806           | December 13, 2023  | May 31, 2024     | July 31, 2024    |
    | 23.12.81604           | December 13, 2023  | May 31, 2024     | July 31, 2024    |
    | 23.12.81804           | December 12, 2023  | May 31, 2024     | July 31, 2024    |
    | 23.12.81210           | December 5, 2023   | May 31, 2024     | July 31, 2024    |
    | 23.11.81602           | November 29, 2023  | April 30, 2024   | June 30, 2024    |
    | 23.11.81601           | November 29, 2023  | April 30, 2024   | June 30, 2024    |
    | 23.11.81408           | November 22, 2023  | April 30, 2024   | June 30, 2024    |
    | 23.11.81406           | November 20, 2023  | April 30, 2024   | June 30, 2024    |
</details>


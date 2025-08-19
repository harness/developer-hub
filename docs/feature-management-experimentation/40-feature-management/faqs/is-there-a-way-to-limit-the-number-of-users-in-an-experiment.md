---
title: Is there a way to cap the number of users participating in an experiment?
sidebar_label: Is there a way to cap the number of users participating in an experiment?
sidebar_position: 11
---

### Question

Is there a way to limit the number of users participating in an experiment?

### Answer

Within the feature flag definition, there is no cap feature, however, it's possible to limit the number of user in approximate way using the Limit exposure feature.

For example, if the total unique users in the site or page used in the experiment are 1 million, then it's possible to limit the exposure to 15%, which will allow only 150k of the unique users into the experiment.
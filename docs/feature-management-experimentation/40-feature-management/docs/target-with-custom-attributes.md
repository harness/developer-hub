---
title: Target with custom attributes
sidebar_label: Target with custom attributes
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes <br /> ✘ images still hosted on help.split.io </button>
</p>

With custom attributes, you can create dynamic targeted feature rollout plans using any end-user criteria or dimension that is known at runtime. Custom attributes can be used to represent:

* Temporal or fast moving data (e.g., time since last login, customer creation date, browser type, or machine)
* Sensitive information (e.g., customer purchase size or customer status)

___Tip:___ Consider using [segments](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment) (instead of attributes) if the users in a segment would not change multiple times in a day or the grouping of users needs to be standardized across your Split account (e.g., key accounts, internal or outsourced QA teams, or company employees).

# Creating custom attributes

This section explains how to create attributes and how to use them to define feature flag targeting rules in the Split UI. You can choose to define custom attributes [within feature flag targeting rules](#creating-custom-attributes-within-feature-flag-targeting-rules), [in Admin Settings](#creating-custom-attributes-in-admin-settings), or [using the Split API](#creating-custom-attributes-or-setting-custom-attribute-values-using-api-endpoints).

___Tip:___ _The attributes you create [in Admin Settings](#creating-custom-attributes-in-admin-settings) or [using the Split API](#creating-custom-attributes-or-setting-custom-attribute-values-using-api-endpoints)_ will be shown in the Split UI as **User Attributes** in your attribute-based targeting rules (on a feature flag's Definition tab, in the **IF** dropdown menu). This _standardization_ of attributes can help reduce the number of mismatches between attribute keys in code and attribute keys in targeting rules. _Attributes created [within attribute-based feature flag targeting rules](#creating-custom-attributes-within-feature-flag-targeting-rules)_ will not be shown as User Attributes in the Split UI.

___Note:___ This article refers to the **IF** dropdown menu in a feature flag’s attribute based targeting rules as having the labels **User** and **User Attributes**, but these labels vary based on the traffic type chosen for the feature flag. For example, if a traffic type is exists in your project named ‘account’ and you select this traffic type when creating a new feature flag, then the **IF** dropdown menu in The Split UI would show **Account** and **Account Attributes** section labels.

___Tip for developers:___ No matter how attributes are created ([within attribute-based feature flag targeting rules](#creating-custom-attributes-within-feature-flag-targeting-rules), [in Admin Settings](#creating-custom-attributes-in-admin-settings), or [using the Split API](#creating-custom-attributes-or-setting-custom-attribute-values-using-api-endpoints)), for feature flags with targeting rules that use custom attributes, _the way attribute values are populated in your code and passed to the ‘getTreatment’ function call (to evaluate a feature flag) is the same_.

To see how to pass attributes with feature flag evaluation requests in your code, refer to the relevant language-specific article in our [SDK Documentation](https://help.split.io/hc/en-us/articles/360033557092-SDK-overview#supported-sdks).

## Creating custom attributes within feature flag targeting rules

You can freely create attributes within attribute-based targeting rules on the feature flag’s Definition tab. (The attributes that you define in directly within a feature flag’s targeting rules become part of the feature flag definition, but are _not associated with a project and traffic type_.)

The steps to create a custom attribute in the Split UI within a feature flag attribute-based targeting rule, are described in the [Using custom attributes in feature flag targeting](#using-custom-attributes-in-feature-flag-targeting) section below.

:::info[SemVer attributes]
To work with SemVer attributes, first create a new custom attribute within a feature flag's attribute-based targeting rule, and select a SemVer matcher. See the _[Using custom attributes in feature flag targeting](#using-custom-attributes-in-feature-flag-targeting)_ section, step 2.
:::

## Creating custom attributes in Admin settings

You can create a standard set of attributes for use in your feature flag definitions. The attributes that you define in Admin settings will be _associated with a project and traffic type_.

You can create attributes individually or create multiple attributes using a CSV file.

### Creating individual custom attributes in Admin settings

To create a custom attribute that will appear as a User Attribute in your feature flag targeting rules:

1. In the Split UI, click your initials at the bottom of the left navigation panel and click **Admin settings**. The Projects page appears.
2. Click to **View** the desired project and click the Traffic types tab.
3. Click to **View/Edit attributes** for a traffic type. (Your feature flags defined with this same traffic type will show the custom attributes in their attribute-based targeting rules in the Split UI.) The Attributes page appears.
4. Click the **Actions** button and select **Create an attribute**. The Create Attribute panel appears.
5. In the ID field, enter a key identifier for the attribute (e.g., purchase_amt). This will be used in your feature flag targeting rules and in your source code as the attribute key.

  ___Notes:___ (1) An attribute’s ID cannot be changed later. (2) If you use an already existing attribute ID, the existing attribute will be overwritten.

  **_Syntax:_** The attribute ID must start with a letter followed by a combination of dashes(-), underscores(_), letters(a-z A-Z), or numbers(0-9).
1. In the Name field, enter a descriptive name (e.g., Amount in customer’s cart at checkout).
2. In the Description field, optionally enter a description of the attribute.
3. In the Type dropdown, select an attribute value type (e.g., String to represent text values, Boolean to represent true or false values, etc.). Note that SemVer attributes should not be created as type String in Admin settings. Doing so will prevent you from choosing the SemVer matcher type in the Split UI. Instead, create a new custom attribute within a feature flag's attribute-based targeting rule.

  ___Tip:___ When you select the String attribute type, you can create a list of suggested values to match against in your attribute based targeting rules.

4. Click the **Create** button. A new custom attribute is created and displayed on the Attributes page.

### Creating multiple custom attributes in Admin Settings

You can create multiple custom attributes by performing a bulk upload of custom attributes from a CSV file (a text file having the ".csv" file extension).

___Note:___ If you have any existing custom attributes (already associated with the given project and traffic type) with the same IDs that you have in your CSV file, then the existing attributes will be overwritten.

To create multiple custom attributes that will appear as User Attributes in your feature flag targeting rules:

1. In the Split UI, click your initials at the bottom of the left navigation panel and click **Admin settings**. The Projects page appears.
2. Click to **View** the desired project and click the Traffic types tab.
3. Click to **View/Edit attributes** for a traffic type. (Your feature flags defined with this same traffic type will show the custom attributes in their attribute-based targeting rules in the Split UI.) The Attributes page appears.
4. Click the **Actions** button and select **Create multiple attributes**. The Create multiple attributes page appears.
5. Import your CSV file by dragging and dropping into the Import CSV drop target field or by clicking the file upload link. The CSV file must consist of lines of comma-separated values. The first line should be the heading values `ID, Name, Description, Type, SuggestedValues`. Each following line provides values for a custom attribute, as follows:
     * ID - A unique identifier for the attribute that will be displayed in targeting rules and used in code. The attribute ID cannot be changed after an attribute is created.
     * Attribute name - A descriptive name for the attribute.
     * Description - A description for the attribute.
     * Type - Possible types are `String`, `Number`, `Boolean`, `DateTime`, or `Set`. SemVer is not currently supported.
     * SuggestedValues (only used with String attributes) - Suggested values must be a double-quoted value or list of values. You can define up to 100 suggested values, each up to 50 characters long. (In the Split UI, attribute suggested values will appear in feature flag attribute-based targeting rules in the attribute value field.)

   For example, a file named "attributes sample.csv" with the following content could be used for creating multiple custom attributes:
   ```
   ID, Name, Description, Type, SuggestedValues
   plan_id,Plan type,"The subscription, plan the user is on",String,"enterprise,midmarket,smb"
   zipcode_us,US zipcode,The zipcode (US format) to use for targeting,Number,
   homeowner,Homeowner,Does the targeted user own a home?,String,"hello"
   office_locations,Office locations,list of cities user has an office to go to,Set,
   contract_date,Date contract was signed,This is the date the user signed the contract,DateTime,
   attribute_without_optional_values,,,String,
   ```
6. When the file upload is complete, click **Save**. The new attributes are created and displayed on the Attributes page.

## Creating custom attributes or writing custom attribute values using API endpoints

You can create custom attributes for use in feature flag targeting rules by using the following Split API endpoints:

__[Save attribute](https://docs.split.io/reference/save-attribute):__ Create or overwrite a custom attribute associated with a project and traffic type.
__[Save identity](https://docs.split.io/reference/save-identity):__ Create or overwrite a single user id object (and its custom attribute values).

As with attributes [created in Admin settings](#creating-custom-attributes-in-admin-settings), the attributes created using the Split API will will be associated with a project and traffic type and will appear as **User Attributes** in the Split UI.

# Using custom attributes in feature flag targeting

After you [create a feature flag](https://help.split.io/hc/en-us/articles/9058495582349-Create-a-feature-flag) you can **use** (and also **create**) custom attributes in your [targeting rules](https://help.split.io/hc/en-us/articles/360020791591-Targeting-customers). To add an attribute-based targeting rule to a feature flag:

1. In the Split UI, on the Definition tab of a feature flag, in the Targeting rules area, click the **Add attribute based targeting rules** button. The **IF** field/dropdown menu appears.

    <p>
     <img src="https://help.split.io/hc/article_attachments/30742702211469" alt="target_with_custom_attributes_using_custom_attributes_01.png" width="1000" />
    </p> 

2. Choose a **User Attribute** (custom attribute):
  Choose a custom attribute from the **IF** dropdown menu’s **User Attributes** section. 
    
    <p>
     <img src="https://help.split.io/hc/article_attachments/30742676299405" alt="target_with_custom_attributes_using_custom_attributes_02_user_attribute.png" width="1000" />
    </p> 
    
    Or **create a new custom attribute**:
  You can also directly click within the **IF** field, type a new custom attribute ID, and click **New attribute “your new ID”** to create a new custom attribute.
    
    <p>
     <img src="https://help.split.io/hc/article_attachments/30742702239501" alt="target_with_custom_attributes_using_custom_attributes_02_new_attribute.png" width="1000" />
    </p> 

3. Select a matcher to evaluate the attribute values passed in from your source code. For more information about matchers and how they evaluate values, see the [Custom attribute types and matchers](#custom-attribute-types-and-matchers) section below.

    <p>
     <img src="https://help.split.io/hc/article_attachments/30742702246541" alt="target_with_custom_attributes_using_custom_attributes_03.png" width="1000" />
    </p> 

4. Complete the targeting rule by filling in the values to match against and choosing the treatment(s) to serve.

    <p>
     <img src="https://help.split.io/hc/article_attachments/30742676318349" alt="target_with_custom_attributes_using_custom_attributes_04.png" width="1000" />
    </p> 

   Additional examples:

    Serve the `on` treatment for users with custom attribute `app_version` greater than or equal to 16.0.0:
    <p>
     <img src="https://help.split.io/hc/article_attachments/30742702256013" alt="target_with_custom_attributes_using_custom_attributes_04_app_version.png" width="1000" />
    </p> 

  Serve the `on` treatment for users with custom attribute `age` greater than or equal to 20:
    <p>
     <img src="https://help.split.io/hc/article_attachments/30742702262413" alt="target_with_custom_attributes_using_custom_attributes_04_age.png" width="1000" />
    </p> 
 
  Serve the `on` treatment for users with custom attribute `deal_size` between 500,000 and 10,000,000:
    <p> 
      <img src="https://help.split.io/hc/article_attachments/30742702269965" alt="target_with_custom_attributes_using_custom_attributes_04_deal_size.png" width="1000" />
    </p>
  
  Serve the `on` treatment for users with custom attribute `registered_date` on or after a specified date:
    <p>
     <img src="https://help.split.io/hc/article_attachments/30742702274317" alt="target_with_custom_attributes_using_custom_attributes_04_date.png" width="1000" />
    </p>
  
# How feature flag targeting rules with custom attributes are evaluated

This section explains how a feature flag targeting rule with a custom attribute is evaluated in your source code, in the following cases:

#### The custom attribute value is not provided

The feature flag targeting rule containing the custom attribute does not result in a match.

For example, given the feature flag targeting rule:

```
if age <= 20 then 100% : on
else 100% : off
```

If the value for the age attribute is not provided in code in the attributes map passed to the getTreatment call, the matcher in the first condition `age <= 20` evaluates to **false**. The `else` condition then evaluates to **true**, resulting in the `off` treatment.

#### The custom attribute value is not the correct type

The feature flag targeting rule containing the custom attribute does not result in a match.

For example, given the feature flag targeting rule:

```
if user.plan_type is "basic" then 100% : on
else 100% : off
```

If the value provided for plan_type is an int instead of a string, then the matcher in the first condition `user.plan_type is "basic"` evaluates to **false**. The `else` condition then evaluates to **true**, resulting in the `off` treatment.

# Custom attribute types and matchers

This section describes attribute matchers (comparison operators) that are available in the Split UI when you are creating attribute-based feature flag targeting rules. You can use this information to help you plan your dynamic targeted feature rollout plans using custom attributes.

___Tip:___ In the Split UI, on a feature flag's Definition tab, the **IF** dropdown menu is also an input field. In the **IF** dropdown field you can:
* ___Enter a new attribute ID.__ When you enter a new custom attribute ID, the **Select matcher** dropdown menu will show **_all of the attribute matchers_**. 

* ___Select a User Attribute.___ When you select an existing User Attribute, the **Select matcher** dropdown menu will show **_a subset of matchers based on the selected attribute type_**. _Note that the '**User Attributes**' label contains the traffic type name (selected when the feature flag was created), so another traffic type name may be shown instead of '**User**'._

## String literal attributes

**String** literal attributes store text. These attributes are used with the **String matchers** to set feature flag targeting rules based on standard string comparisons, regular expression matching, or comparisons against a list of strings.

The following matchers can be used with String attributes:

* is in list
* is not in list
* starts with
* does not start with
* ends with
* does not end with
* contains
* does not contain
* matches (regular expression)
* does not match (regular expression)

For example, use an attribute 'subscription_plan' of type String to show accounts that are on the 'Business' or 'Enterprise' plan a given feature.

___Tip:___ You can target your customers with any list or pick list dimension that you track.

## SemVer attributes

SemVer attributes store version strings that follow the [Semantic Version](https://semver.org/) specification. These attributes are used with the **SemVer matchers** to set feature flag targeting rules based on version numbers.

You can use the following comparisons:

* is =
* is not =
* is >=
* is &lt;=
* is in list
* is between (inclusive)
* is not between (inclusive)

For example, use an attribute 'os_version' of type SemVer to give users that have a compatible OS version, e.g. `>= 2.2.0`, access to a new feature, while keeping the feature off for earlier OS versions.

___Note:___ The version numbers you provide must include the patch number (e.g. `2.2` is invalid, but `2.2.0` is valid) and can include pre-release identifiers and build metadata, as defined in the [Semantic Version](https://semver.org) specification. Comparisons also follow the Semantic Version specification.

:::info[SemVer attributes and SDK compatibility]
See [this page](https://help.split.io/hc/en-us/articles/27337626547341-Does-my-SDK-version-support-SemVer) to verify compatibility of Split SDK or Spit optional infrastructure. For older SDK versions that do not support SemVer, the `control` treatment will be returned and a special impression will be created. See the _[Control treatment](https://help.split.io/hc/en-us/articles/360020528072-Control-treatment)_ help page for more information.
:::

## Set attributes

Set attributes store lists of strings. The following **Set matchers** can be used with Set attributes:

* is equal to
* is not equal to
* has any of
* does not have any of
* has all of
* does not have all of
* is part of
* is not part of

For example, use an attribute 'us_states_visited' of type Set to show a survey to users who have visited at least one state of the US West Coast. 

## Numeric attributes

Numeric attributes store positive or negative whole numbers. (Decimal values are not supported.) The following **Numeric matchers** can be used with Numeric attributes:

* is =
* is >=
* is &lt;=
* is between (inclusive)
* is not between (inclusive)

For example, use an attribute 'orders_last_quarter' of type Number to provide a new premium shopping feature to customers who had at least 20 orders in the last quarter.

## DateTime attributes

DateTime attributes store a date and optional time. In your source code, set the values of DateTime attributes in **_milliseconds since epoch_** or **_seconds since epoch_**, depending on the Split SDK you are using.

The following comparisons can be used with DateTime attributes:

* is on
* is not on
* is after
* is before
* is between (inclusive)
* is not between (inclusive)

For example, use an attribute 'contract_signed' of type DateTime to keep a legacy feature available for customers who signed up before 1/1/2015.

## Boolean attributes

Boolean attributes store a value of `true` or `false`. Boolean attributes are used with the **Boolean matcher**:

* is

For example, use an attribute 'homeowner' of type Boolean to test the demand of a potential new feature among customers that don't own a home.

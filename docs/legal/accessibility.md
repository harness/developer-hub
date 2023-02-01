---
hide_table_of_contents: false
hide_title: true
title: "Harness Accessibility Conformance Report"
editCurrentVersion: false
custom_edit_url: null
# slug: /legal/terms-of-use/
---

import useBaseUrl from '@docusaurus/useBaseUrl'

<!-- ![Harness](https://developer.harness.io/img/logo_harness.svg) -->
<img src={useBaseUrl('/img/logo_harness.svg')} alt="Harness " width="250" />

# Harness Accessibility Conformance Report<br/>Revised Section 508 Edition

**(Based on VPAT Version 2.4)**

**Name of Product/Version:** Harness

**Report Date:** July 5th, 2021

**Product Description:** Modern Software Delivery Platform

**Contact Information:** support@harness.io

**Notes:** This report covers accessibility conformance for Harness web application and does not discuss documentation or support services.

**Evaluation Methods Used:** Webaim contrast checker, Manual keyboard checks

**Download the Report:** [Harness Accessibility Conformance Report](/doc/harness_accessibility_conformance_report_2022.pdf)

<br/>

## Applicable Standards/Guidelines

This report covers the degree of conformance for the following accessibility standard/guidelines:

| Standard/Guideline                                                                      | Included in Report                                    |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [Web Content Accessibility Guidelines 2.0](http://www.w3.org/TR/2008/REC-WCAG20-20081211)                                                | Level A (Yes)<br/> Level AA (Yes)<br/> Level AAA (No) |
| [Revised Section 508 standards published January 18, 2017 <br />and corrected January 22, 2018](https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines) | (Yes)                                                 |

<br/>

## Terms

The terms used in the Conformance Level information are defined as follows:

- **Supports**: The functionality of the product has at least one method that meets the criterion without known defects or meets with equivalent facilitation.
- **Partially Supports**: Some functionality of the product does not meet the criterion.
- **Does Not Support**: The majority of product functionality does not meet the criterion.
- **Not Applicable**: The criterion is not relevant to the product.
- **Not Evaluated**: The product has not been evaluated against the criterion. This can be used only in WCAG 2.0 Level AAA.

<br/>

## WCAG 2.0 Report

Tables 1 and 2 also document conformance with Revised Section 508: 

- Chapter 5 – 501.1 Scope, 504.2 Content Creation or Editing
- Chapter 6 – 602.3 Electronic Support Documentation

Note: When reporting on conformance with the WCAG 2.0 Success Criteria, they are scoped for full pages, complete processes, and accessibility-supported ways of using technology as documented in the [WCAG 2.0 Conformance Requirements](https://www.w3.org/TR/WCAG20/#conformance-reqs).

<br />

### Table 1: Success Criteria, Level A

Notes:

|Criteria|Conformance Level |Remarks and Explanations|
| - | - | - |
|<p>[**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|<p>Supports</p><p> </p>|Using a limited set of images which all have a text equivalent in the alt attribute.|
|<p>[**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Not Applicable|Currently does not use video/ audio |
|<p>[**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software) </p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Not Applicable|Currently does not use captions|
|<p>[**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software) </p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Not Applicable|Currently does not audio description pr media alternative|
|<p>[**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|Information, structure and relationships are available in text.|
|<p>[**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|Contents of sequences are structured meaningful and can be programmatically determined|
|<p>[**1.3.3 Sensory Characteristics](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding)**  (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Partially supports|Most functions have labels except a few. Progressbar must have an accessible name.|
|<p>[**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Partially supports|Elements and text must have sufficient color contrast. Elements that use color for interpretation must be accompanied by text.|
|<p>[**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Not Applicable|does not use audio|
|<p>[**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Not supports|Does not operate through keyboard|
|<p>[**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Not supports|Does not use keyboard focus|
|<p>[**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|` `Not applicable|Does not use time limit|
|<p>[**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Not applicable|Does not use video.|
|<p>[**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|Someoneelse does not contain anything that flashes more than three times in any one second period.|
|<p>[**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software) – Does not apply to non-web software</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs) – Does not apply to non-web docs</p>|Does not support|Need to add links to enable skipping to content or next block of content.|
|<p>[**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|<p>Supports</p><p> </p>|All pages have titles describing the purpose.|
|<p>[**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|Navigated sequentially in a meaningful and operable manner.|
|<p>[**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|Links purpose can be determined by link text and context|
|<p>[**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|The default human language of each Web page can be programmatically determined.|
|<p>[**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|<p>Supports</p><p></p>|No actions are performed when components get focus.|
|<p>[**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|Changing settings of user interface components does not automatically cause a change of context.|
|<p>[**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|Error messages are clearly visible and as specific as possible.|
|<p>[**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|Labels are provided when content requires user input.|
|<p>[**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|The markup languages has complete start and end tags, attributes and IDs are unique.|
|<p>[**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|Role, state, and value information are provided on all user interface components.|

<br />

### Table 2: Success Criteria, Level AA

Notes:

|Criteria|Conformance Level |Remarks and Explanations|
| - | - | - |
|<p>[**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Not Applicable|Does not use audio media|
|<p>[**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Not Applicable|Does not use audio media|
|<p>[**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Partially supports|Navigation color and Navigation text color does not have sufficient color contrast.|
|<p>[**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Support|Text can be resized without assistive technology up to 200 percent without loss of content or functionality|
|<p>[**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Support|The image of text can be visually customized to the user's requirements|
|<p>[**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software) – Does not apply to non-web software</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs) – Does not apply to non-web docs</p>|Supports|Contents can be searched, browsed and navigated in different ways.|
|<p>[**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|Headings and labels are designed to be clear, descriptive and logically organized.|
|<p>[**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Not Supports|` `Does not have keyboard focus|
|<p>[**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|The human language of each passage or phrase in the content can be programmatically determined|
|<p>[**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software) – Does not apply to non-web software</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs) – Does not apply to non-web docs</p>|Supports|Navigation areas shown on multiple pages are presented in a consistent way.|
|<p>[**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software) – Does not apply to non-web software</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs) – Does not apply to non-web docs</p>|Supports|Someoneelse UI components with same functionality are identified consistently|
|<p>[**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|Error feedback is designed to give the best possible suggestions to users.|
|<p>[**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA)</p><p>Also applies to:</p><p>Revised Section 508</p><p>- 501 (Web)(Software)</p><p>- 504.2 (Authoring Tool)</p><p>- 602.3 (Support Docs)</p>|Supports|For all data that can be modified or deleted by users  functionalities are provided that need confirmation or can be reversed.|

<br />

### Table 3: Success Criteria, Level AAA

Notes:

|Criteria|Conformance Level|Remarks and Explanations|
| - | - | - |
|<p>[**1.2.6 Sign Language (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-sign) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**1.2.7 Extended Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-extended-ad) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**1.2.8 Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-text-doc) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**1.2.9 Audio-only (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**1.4.6 Contrast (Enhanced**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast7))**  (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**1.4.7 Low or No Background Audio**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-noaudio) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**1.4.8 Visual Presentation**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**1.4.9 Images of Text (No Exception)**](http://www.w3.org/TR/WCAG20/#http://www.w3.org/TR/WCAG20/) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**2.1.3 Keyboard (No Exception)**](http://www.w3.org/TR/WCAG20/#keyboard-operation-all-funcs) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**2.2.3 No Timing**](http://www.w3.org/TR/WCAG20/#time-limits-no-exceptions) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**2.2.4 Interruptions**](http://www.w3.org/TR/WCAG20/#time-limits-postponed) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**2.2.5 Re-authenticating**](http://www.w3.org/TR/WCAG20/#time-limits-server-timeout) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**2.3.2 Three Flashes**](http://www.w3.org/TR/WCAG20/#seizure-three-times) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**2.4.8 Location**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-location) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**2.4.9 Link Purpose (Link Only)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-link) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**2.4.10 Section Headings**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-headings) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**3.1.3 Unusual Words**](http://www.w3.org/TR/WCAG20/#meaning-idioms) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**3.1.4 Abbreviations**](http://www.w3.org/TR/WCAG20/#meaning-located) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**3.1.5 Reading Level**](http://www.w3.org/TR/WCAG20/#meaning-supplements) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**3.1.6 Pronunciation**](http://www.w3.org/TR/WCAG20/#meaning-pronunciation) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**3.2.5 Change on Request**](http://www.w3.org/TR/WCAG20/#consistent-behavior-no-extreme-changes-context) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**3.3.5 Help**](http://www.w3.org/TR/WCAG20/#minimize-error-context-help) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|
|<p>[**3.3.6 Error Prevention (All)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible-all) (Level AAA)</p><p>Revised Section 508 – Does not apply</p>|Web: Not evaluated|Web: Not evaluated|

<br/>

## Revised Section 508 Report

Notes:

### Chapter 3: [Functional Performance Criteria](https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines#302-functional-performance-criteria) (FPC)

Notes:

|Criteria|Conformance Level |Remarks and Explanations|
| - | - | - |
|302.1 Without Vision|Supports|<p>Someoneelse uses standard</p><p>HTML attributes to describe identity, operation, and state of user interface elements to assistive technologies.</p>|
|302.2 With Limited Vision|Supports|<p>Supports</p><p>standard browser magnification and</p><p>contrast adjustments.</p>|
|302.3 Without Perception of Color|Partially supports|<p>Color is only used as a supplemental attribute of most user interface elements, but certain links and graphs are discernible only by colour</p><p></p>|
|302.4 Without Hearing|Not Applicable|Someoneelse  does not use features that require hearing.|
|302.5 With Limited Hearing|Not Applicable|Someoneelse  does not use features that require hearing.|
|302.6 Without Speech|Not Applicable|Someoneelse  does not use features that require speech input.|
|302.7 With Limited Manipulation|Supports|<p>Someoneelse supports standard input mechanisms such as keyboards and</p><p>pointing devices. Fine motor controls nor simultaneous actions are not required.</p>|
|302.8 With Limited Reach and Strength|Supports|Use of Someoneelse is not restricted by limited reach or strength.|
|302.9 With Limited Language, Cognitive, and Learning Abilities|Partially supports|Someoneelse is a complex product and needs training and technical experience. We strive to support users in the best possible ways.|

<br />

### Chapter 5: [Software](https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines#501-general)

Notes:

|Criteria|Conformance Level |Remarks and Explanations|
| - | - | - |
|501.1 Scope – Incorporation of WCAG 2.0 AA|See [WCAG 2.0](https://docs.google.com/document/d/1t8hxVJ2bVjiYBMkqVFqs5d5FxKJ2yDcab2IzAlskiAg/edit#bookmark=id.tyjcwt) section|See information in WCAG 2.0 section|
|[***502 Interoperability with Assistive Technology***](https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines#502-interoperability-assistive-technology)|Heading cell – no response required|Heading cell – no response required|
|502.2.1 User Control of Accessibility Features|Not Applicable|Not platform software|
|502.2.2 No Disruption of Accessibility Features|Partially supports|No accessibility features in platform documentation, but does not disrupt browser sizing options|
|***502.3 Accessibility Services***|Heading cell – no response required|Heading cell – no response required|
|502.3.1 Object Information|Supports|Someoneelse uses WAI-ARIA attributes to describe the role, state, and description of user interface elements to Assistive Technologies. This includes the use of “role”, “aria-invalid”, and “aria-required” attributes.|
|502.3.2 Modification of Object Information|Supports|Someoneelse uses WAI-ARIA attributes to describe the role, state, and description of user interface elements to Assistive Technologies. This includes the use of “role”, “aria-invalid”, and “aria-required” attributes.|
|502.3.3 Row, Column, and Headers|Supports|Someoneelse uses standard HTML attributes to define table structure and relationships, including column and row headers, to Assistive Technologies.|
|502.3.4 Values|Supports|Someoneelse uses standard HTML or ARIA object attributes for maximum compatibility with assistive technologies.|
|502.3.5 Modification of Values|Supports|Someoneelse uses standard HTML or ARIA object attributes for maximum compatibility with assistive technologies.|
|502.3.6 Label Relationships|Supports|Someoneelse uses standard HTML or ARIA object attributes for maximum compatibility with assistive technologies.|
|502.3.7 Hierarchical Relationships|Supports|Someoneelse uses standard HTML or ARIA object attributes for maximum compatibility with assistive technologies.|
|502.3.8 Text|Supports|Someoneelse uses standard HTML or ARIA object attributes for maximum compatibility with assistive technologies.|
|502.3.9 Modification of Text|Supports|Someoneelse uses standard HTML or ARIA object attributes for maximum compatibility with assistive technologies.|
|502.3.10 List of Actions|Supports|Someoneelse uses standard HTML or ARIA object attributes for maximum compatibility with assistive technologies.|
|502.3.11 Actions on Objects|Supports|Someoneelse uses standard HTML or ARIA object attributes for maximum compatibility with assistive technologies.|
|502.3.12 Focus Cursor|Supports|Someoneelse uses standard HTML markup for maximum compatibility with assistive technologies.|
|502.3.13 Modification of Focus Cursor|Supports|Someoneelse uses standard HTML markup for maximum compatibility with assistive technologies.|
|502.3.14 Event Notification|Supports|Someoneelse uses standard HTML markup for maximum compatibility with assistive technologies.|
|502.4 Platform Accessibility Features|Partially supports|Does not provide audio sync equivalents for visual events or speech output services |
|[***503 Applications***](https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines#503-applications)|Heading cell – no response required|Heading cell – no response required|
|503.2 User Preferences|Supports|Respects user preferences from platform or browser|
|503.3 Alternative User Interfaces|Not applicable|Web application|
|***503.4 User Controls for Captions and Audio Description***|Heading cell – no response required|Heading cell – no response required|
|503.4.1 Caption Controls|Not conformed /NA|Audio not supported|
|503.4.2 Audio Description Controls|Not conformed /NA|Audio not supported|
|[***504 Authoring Tools***](https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines#504-authoring-tools)|Heading cell – no response required|Heading cell – no response required|
|504.2 Content Creation or Editing (if not authoring tool, enter “not applicable”)|See [WCAG 2.0](https://docs.google.com/document/d/1t8hxVJ2bVjiYBMkqVFqs5d5FxKJ2yDcab2IzAlskiAg/edit#bookmark=id.tyjcwt) section|See information in WCAG 2.0 section|
|504.2.1 Preservation of Information Provided for Accessibility in Format Conversion|Partially supports |YAML available|
|504.2.2 PDF Export|Supports |PDF export available for deployments|
|504.3 Prompts|Does not support |No prompts although videos in documentations comply to Youtube accessibility guidelines and text elements comply to docs.Someoneelse host guidelines|
|504.4 Templates|Partially Supports |Someoneelse templates partially supports accessibility guidelines|

<br />

### Chapter 6: [Support Documentation and Services](https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines#601-general)

Notes:

|Criteria|Conformance Level |Remarks and Explanations|
| - | - | - |
|***601.1 Scope***|Heading cell – no response required|Heading cell – no response required|
|[***602 Support Documentation***](https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines#602-support-documentation)|Heading cell – no response required|Heading cell – no response required|
|602.2 Accessibility and Compatibility Features|Partially supports|Has in-built accessibility visuals but no provision of compatibility with assistive technology|
|602.3 Electronic Support Documentation|See [WCAG 2.0](https://docs.google.com/document/d/1t8hxVJ2bVjiYBMkqVFqs5d5FxKJ2yDcab2IzAlskiAg/edit#bookmark=id.tyjcwt) section|See information in WCAG 2.0 section|
|602.4 Alternate Formats for Non-Electronic Support Documentation|Supports /Not Applicable|No non-electronic formats|
|[***603 Support Services***](https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines#603-support-services)|Heading cell – no response required|Heading cell – no response required|
|603.2 Information on Accessibility and Compatibility Features|Does not support||
|603.3 Accommodation of Communication Needs|Partially supports|Help search and help chat function available, but does not accommodate all communication needs of individuals with disabilities|

<br/>

## Legal Disclaimer (Harness Inc.)

*This accessibility assessment (the "Assessment') only addresses the Harness Continuous Delivery/Continuous Deployment product ("Continuous Delivery'), using a limited subset of application screens. It is not to be regarded as a comprehensive, exhaustive evaluation of accessibility across the entire Harness product platform. This Assessment is provided for information purposes only and the provided responses are subject to change without notice. Harness does not warrant that the Assessment is error-free, and it does not provide any other warranties, whether expressed orally or implied in law, including implied warranties and conditions of merchantability or fitness for a particular purpose. Harness further makes no representation or warranties concerning the ability of third party technologies or other products to integrate or be compatible with the Continuous Delivery or any other Harness products. Harness specifically disclaims any liability with respect to this Assessment and no contractual obligations are formed either directly or indirectly by this Assessment.*
## Custom User Group Entity

Custom User Groups in Harness IDP extend the catalog model to include organizational teams and hierarchies as **first-class entities**. These groups allow companies to represent real-world structures such as teams, departments, or cross-functional squads, directly inside the developer portal.

Unlike **[platform user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/)** which are typically synchronized from an identity provider (LDAP, SCIM, SSO), **custom user groups** are created and managed entirely within IDP. This distinction matters because it allows engineering and platform teams to enrich group definitions with metadata that may not exist in the identity provider but is valuable for context inside IDP.

## Key Concepts

**1. Group Entity**

* Each group is represented as an IDP entity with its own YAML definition.
* A group can include members, a parent relationship, lifecycle state, and optional metadata.
* Groups can serve as owners of services, systems, and other catalog entities.

**2. Parent–Child Hierarchies**

* Groups support hierarchical relationships (e.g., "Backend Team" as a child of "Engineering Org").
* Parent groups automatically infer their children; explicit child definitions are not needed.

**3. Metadata Enrichment**

* Beyond basic member lists, custom groups can include metadata such as team lead, manager, geographic region, or contact email.
* This metadata can be surfaced in catalog cards, dashboards, and reporting.

**4. Source of Truth**

* IDP becomes the **ultimate source of truth** for group modeling.
* Platform-synced groups continue to appear but will not overwrite custom groups if a conflict in identifiers exists.
* This ensures invested effort in creating and enriching groups inside IDP is preserved.

![user-group-overview](./static/user-group-overview.png)

## Creating Custom User Groups

![create-usergroup](./static/create-usergroup.png)
There are two ways to create a group:

1. **Through the UI** – A guided creation page in the IDP Catalog allows platform engineers or admins to define groups with fields such as members, parent groups, and metadata. Members and parent groups can be added through searchable dropdowns that surface both users and groups.

2. **Through YAML Definition** – Groups can also be created and registered by authoring YAML. The structure aligns with IDP 2.0's entity model while retaining compatibility with the original Backstage semantics.

Here is a representative YAML snippet for creating a group:

```yaml
apiVersion: harness.io/v1
kind: Group
type: engineering
name: Cloud Infrastructure Team
identifier: cloud_infrastructure_team
spec:
  members:
    - user:account/alice.chen@techco.com
    - user:account/bob.smith@techco.com
  parent: group:account/techco
  profile:
    email: cloud-platform@techco.com
metadata:
  tags:
    - cloud
    - platform
    - engineering
  description: User Group responsible for building and maintaining the company's core cloud infrastructure.
```

This example defines a **Cloud Infrastructure Team** team, scoped at the account level, with two members, a parent group (`techco`), and rich metadata including tags and a description.

3. **Through the API** – Groups can be created and managed programmatically by crafting YAML definitions with the `kind` set as `Group` and utilizing the [Entity API](https://developer.harness.io/docs/platform/api/entity-api) for creating and updating Group entities.

:::note 
At present, the User Group entity can only be created at the account level.
:::

#### Key Attributes in Group YAML

* **apiVersion / kind** – Always `harness.io/v1` and `Group`
* **identifier and name** – Unique reference and display name for the group
* **type** – Arbitrary classification, e.g., `engineering` or `api`
* **spec.members** – List of users belonging to the group
* **spec.parent** – Reference to a parent group, enabling hierarchy
* **spec.profile** – Optional metadata like email, profile picture
* **metadata** – Arbitrary tags and description for discoverability

Groups can be created with **zero members**, making it possible to scaffold team structures first and populate them later.-

## Relationships and Hierarchies

![child-parent](./static/child-parent.png)

### Parent and Child Groups

Groups can be linked together through **hierarchical relationships**. In YAML, the creator specifies only the `parent` field. The IDP ingestion process then automatically generates the inverse relationships (`childOf` and `parentOf`) so that hierarchies are consistent and visible in the Catalog Graph.

For example:

```yaml
apiVersion: harness.io/v1
kind: Group
type: engineering
identifier: cloud_infrastructure_team
name: Cloud Infrastructure Team
spec:
  parent: group:account/harness
  members:
    - user:account/user1@harness.io
    - user:account/user2@harness.io
```

In this setup:

* `cloud_infrastructure_team` is explicitly linked to the `harness` group as its parent.
* IDP automatically infers and persists these relationships:

  * `cloud_infrastructure_team → childOf → harness`
  * `harness → parentOf → cloud_infrastructure_team`

This ensures that users see a **two-way relationship** in the Catalog Graph without having to manually declare `children`.

### User Relationships

Groups connect to users through **membership relationships**. These are expressed in YAML under `spec.members`.

Example:

```yaml
spec:
  members:
    - user:account/user1@harness.io
    - user:account/user2@harness.io
```

This creates:

* `cloud_infrastructure_team → hasMember → user1@harness.io`
* `user1@harness.io → memberOf → cloud_infrastructure_team`

These relationships are also surfaced in the Catalog Graph, enabling visual exploration of who belongs to which group.

### Ownership Mapping

Groups are first-class entities for **owning other Catalog entities**. Ownership is established when a group is referenced in another entity's YAML.

For example, a service YAML might designate a group as its owner:

```yaml
apiVersion: harness.io/v1
kind: Component
identifier: payments_service
name: Payments Service
spec:
  type: service
  owner: group:account/cloud_infrastructure_team
```

This results in:

* `payments_service → ownedBy → cloud_infrastructure_team`
* `cloud_infrastructure_team → ownerOf → payments_service`

On the service's Catalog page, the owner group is prominently displayed, making accountability clear.

:::info User Group Conflict Resolution
Harness IDP allows two sources of User Groups to coexist in the catalog:

1. **IDP User Groups** - Created directly within IDP (custom user groups)
2. **Platform User Groups** - Synced from the Harness Platform

When both types of User Groups exist, the following conflict resolution rules apply:

* **IDP User Groups take precedence over Platform User Groups** - Custom groups created directly in IDP are considered the ultimate source of truth.
* **Identifier conflict handling** - If an IDP User Group and a Platform User Group share the same identifier, the platform user group will not be synced.
* **Precedence order**:
  1. IDP User Groups (directly created)
  2. Platform User Groups (synced from Harness Platform)

This approach ensures that any custom metadata, relationships, and configurations you've invested time in creating for IDP User Groups are preserved and not overwritten during platform synchronization.
:::
:::note
Information about conflicts may be available in the audit trail. Platform user groups with the same ID as existing IDP User Groups will not be synced, while all other platform groups will continue to be synchronized normally.
:::

## Find User Groups in the Catalog

Once created, User Groups are fully discoverable inside the IDP Catalog. You can look them up directly by name or identifier using the catalog search bar. For example, searching for **Cloud Infrastructure Team** quickly brings up the corresponding group entity.

![overview](./static/overview.png)

Opening a group shows a detailed **Overview** page:

* **Profile Information**: Includes the group name, description, type (custom or platform), scope (account, org, or project), and metadata such as email or tags.
* **Relations Panel**: Displays the parent group, child groups, and members connected through the `parentOf`, `childOf`, and `hasMember` relations. This is shown as both a list and an interactive graph.

![user-group-overview](./static/user-group-overview.png)

  * You can click into related entities (parent group, child group, or member) to navigate further in the catalog.
  * For example, the **Cloud Infrastructure Team** group shows its parent **Techo Cloud Team**, two members, and owner of entity **member-service**.
* **Members Section**: Lists all the individual users associated with the group, along with their identifiers and contact details.

This layout makes it easy for developers, platform engineers, and admins to understand the context of a group at a glance and explore connected entities with just a click.

## Metadata Enrichment 

Custom User Groups in IDP are not limited to listing members. They can carry **rich metadata** that makes them more useful for discovery, reporting, and ownership tracking. This metadata sits under the `metadata` field in the entity YAML and can include fields such as:

* **Description** of the group
* **Team Lead** or manager
* **Geographic region**
* **Tags** for classification or filtering
* Any other key-value pairs that make sense for your organization

Example:

```yaml
apiVersion: harness.io/v1
kind: Group
type: engineering
name: Cloud Infrastructure Team
identifier: cloud_infrastructure_team
spec:
  lifecycle: ""
  parent: group:account/idp_team
  members:
    - user:account/mabihs.rahd@techco.io
    - user:account/arawsengiv.mh@techco.io
  profile:
    email: cloud-platform@techco.com
metadata:
  description: " User Group responsible for building and maintaining the company's core cloud infrastructure."
  role: Engineer Manager
  region: East Blue
  focusarea: Platform
  teamlead: Monkey D Luffy
  tags:
    - cloud
    - platform
    - engineering
```

This metadata can be surfaced in **catalog cards**, **dashboards**, and **reporting views**, giving platform engineers and leadership more context about each group.
For example: a sales engineer could quickly find the right **geo-aligned team**, or a developer could identify the **team lead** directly from the group's catalog page.

### Additional Infocard

The `EntityAdditionalInfoCard` component provides a powerful way to surface important metadata from your Custom User Groups directly on their entity pages. This component allows you to selectively display key information about the group in a structured, visually appealing card format.

Here's how to configure an Additional Infocard that displays leadership and organizational information:

```yaml
- component: EntityAdditionalInfoCard
  specs:
    props:
      title: Leader Information
      items:
        - label: Team Leader
          value: <+metadata.teamlead>
          type: string
          style:
            bold: true
        - label: Focus Area
          value: <+metadata.focusarea>
          type: string
          style:
            bold: false
        - label: Role
          value: <+metadata.role>
          type: string
          style:
            bold: false
        - label: Region
          value: <+metadata.region>
          type: string
          style:
            bold: false
    gridProps:
      xs: 12
      md: 6
```

Key features of the `EntityAdditionalInfoCard`:

- **Custom Title**: Set a meaningful title like "Leader Information" or "Team Details"
- **Dynamic Value Binding**: Use the `<+metadata.fieldname>` syntax to pull values directly from the group's metadata
- **Visual Styling**: Control typography with options like bold text for emphasis on important fields
- **Flexible Layout**: Configure the card's placement and size with grid properties
- **Multiple Cards**: Add several info cards to group related metadata together

![additionalinfocard](./static/additionalinfocard.png)

This approach makes important information about the group immediately visible without requiring users to dig through raw YAML or metadata fields. For example, a developer looking at a group page can quickly see who leads the team and what region they operate in, facilitating better communication and collaboration.

## Configuring the Custom Group Layout in Group Entities

By default, you won't see any layout for the  Custom Group entities, but you can duplicate the layout of the Group entities, IDP provides a standard view for all **Group entities**, showing the profile, members, and graph. However, administrators can customize the layout to highlight the metadata that matters most to their organization.

You can configure layouts from:
`Admin → Layout → Group Entities`

Then duplicate an existing laypuit of kind `Group` and you will be asked to providethe type for it. Make sure top provide the type same as for the user group entity you want the layout for. 

![duplicate](./static/duplicate.gif)

After that you can define what cards and panels appear on the group's entity page. For example, you might want to show the **team lead** or **region** metadata prominently, alongside the member list and hierarchy graph.

![layout-usergroup](./static/layout-usergroup.png)

Example configuration:

```yaml
page:
  name: EntityLayout
  tabs:
    - name: Overview
      path: /
      title: Overview
      contents:
        - component: EntityOrphanWarning
        - component: EntityProcessingErrorsPanel
        - component: EntityGroupProfileCard
          specs:
            gridProps:
              xs: 12
              md: 6
        - component: EntityCatalogGraphCard
          specs:
            gridProps:
              xs: 12
              md: 6
        - component: EntityAdditionalInfoCard
          specs:
            props:
              title: Leader Information
              items:
                - label: Team Leader
                  value: <+metadata.teamlead>
                  type: string
                  style:
                    bold: true
                - label: Focus Area
                  value: <+metadata.focusarea>
                  type: string
                  style:
                    bold: false
                - label: Role
                  value: <+metadata.role>
                  type: string
                  style:
                    bold: false
                - label: Region
                  value: <+metadata.region>
                  type: string
                  style:
                    bold: false
            gridProps:
              xs: 12
              md: 6
        - component: EntityMembersListCard
          specs:
            gridProps:
              xs: 12
              md: 6
```

In this example:

* The **Group Profile** and **Graph** remain visible for structure and relationships.
* An **Additional Info Card** surfaces metadata fields (`teamlead`, `region`).
* The **Members List** card continues to show assigned users.

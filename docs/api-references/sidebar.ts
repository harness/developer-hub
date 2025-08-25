import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api-references/software-engineering-insights",
    },
    {
      type: "category",
      label: "Collection categories",
      link: {
        type: "doc",
        id: "api-references/collection-categories",
      },
      items: [
        {
          type: "doc",
          id: "api-references/categories-list-categories",
          label: "List all Collection categories",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-references/categories-create-category",
          label: "Create a new Collection category",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-references/categories-delete-categories",
          label: "Delete multiple Collection categories",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api-references/categories-update-category",
          label: "Update an existing Collection category",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api-references/categories-delete-category",
          label: "Delete a specific Collection category",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Collections",
      link: {
        type: "doc",
        id: "api-references/collections",
      },
      items: [
        {
          type: "doc",
          id: "api-references/collections-list-collections",
          label: "Retrieve a list of collections",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-references/collections-create-collection",
          label: "Create a new collection",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-references/collections-edit-collection",
          label: "Edit an existing collection",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api-references/collections-delete-collection",
          label: "Delete an existing collection",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Contributors",
      link: {
        type: "doc",
        id: "api-references/contributors",
      },
      items: [
        {
          type: "doc",
          id: "api-references/contributors-get-active-versions",
          label: "Retrieve the list of active versions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-references/contributors-get-schema",
          label: "Retrieve the Ccontributor data schema",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-references/users-list-active-users",
          label: "Retrieve the list of current active licensed contributors",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-references/contributors-update-contributors",
          label: "Update existing contributors",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api-references/sei-contributors-list-contributors",
          label: "Retrieve SEI contributors list",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "DORA",
      link: {
        type: "doc",
        id: "api-references/dora",
      },
      items: [
        {
          type: "doc",
          id: "api-references/dora-get-lead-time",
          label: "Retrieve lead time data",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-references/dora-get-deployment-frequency",
          label: "Retrieve deployment frequency data",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-references/dora-get-change-failure-rate",
          label: "Retrieve change failure rate data",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-references/dora-get-mean-time-to-restore",
          label: "Retrieve Mean Time to Restore (MTTR) data",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "api-references/schemas/error",
          label: "Error",
          className: "schema",
        },
        {
          type: "doc",
          id: "api-references/schemas/usageresponse",
          label: "UsageResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api-references/schemas/categoryresponse",
          label: "CategoryResponse",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;

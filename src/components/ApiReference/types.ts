/**
 * Minimal OpenAPI 3 types for API reference rendering.
 * Supports JSON spec only (YAML can be added later via a parser).
 */
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';

export interface OpenApiOperation {
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: OpenApiParameter[];
  requestBody?: { content?: Record<string, { schema?: unknown }> };
  responses?: Record<string, { description?: string; content?: Record<string, { schema?: unknown }> }>;
  tags?: string[];
}

export interface OpenApiParameter {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required?: boolean;
  schema?: { type?: string; format?: string; default?: unknown; enum?: unknown[] };
}

export interface OpenApiPathItem {
  get?: OpenApiOperation;
  post?: OpenApiOperation;
  put?: OpenApiOperation;
  patch?: OpenApiOperation;
  delete?: OpenApiOperation;
  head?: OpenApiOperation;
  options?: OpenApiOperation;
  parameters?: OpenApiParameter[];
}

export interface OpenApiSpec {
  openapi?: string;
  info?: { title?: string; version?: string; description?: string };
  paths?: Record<string, OpenApiPathItem>;
  servers?: Array<{ url: string; description?: string }>;
  tags?: Array<{ name?: string; description?: string }>;
  components?: {
    securitySchemes?: Record<string, unknown>;
  };
  security?: Array<Record<string, string[]>>;
}

export interface EndpointEntry {
  path: string;
  method: HttpMethod;
  operation?: OpenApiOperation;
  pathItem?: OpenApiPathItem;
}

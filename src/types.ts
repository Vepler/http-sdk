/**
 * Common types used throughout the SDK
 */

// Generic query parameters type for API requests
export type QueryParams = Record<string, string | number | boolean | string[] | number[] | undefined>;

// Generic JSON object type for unstructured data
export interface JsonObject {
  [key: string]: JsonValue;
}

export type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];

// Geometry type for GeoJSON-like data
export interface Geometry {
  type: string;
  coordinates: number[] | number[][] | number[][][] | number[][][][];
}

// Common geographic entity fields with status and metadata
export interface GeographicEntityBase {
  id: string;
  code: string;
  name: string;
  type: string;
  status: string;
  metadata: JsonObject | null;
}
// Keystatic's `fields`, unchanged, plus a record of how each field was configured.
//
// A Keystatic field object exposes parse/validate/serialize but keeps its settings (multiline,
// character limits, help text, dropdown options) private. The custom admin (/admin) needs those
// settings to draw the same form, so every field made through this module carries them on a
// hidden, non-enumerable `ADMIN_FIELD` property. Keystatic never reads it, so its own editor,
// reader and file format are unaffected.
//
// keystatic.config.ts and the schema files under content/ import `fields` from here instead of
// from "@keystatic/core". Everything else (collection, singleton, config) still comes from Keystatic.
import { fields as keystaticFields } from "@keystatic/core";

export const ADMIN_FIELD = Symbol.for("myntmore.admin.field");

export interface AdminFieldInfo {
  /** The Keystatic field function that made this field, e.g. "text", "select", "array". */
  type: string;
  /** The arguments it was called with, exactly as written in the schema. */
  args: unknown[];
}

type KeystaticFields = typeof keystaticFields;

function record<T>(type: string, args: unknown[], field: T): T {
  if (field && typeof field === "object" && !Object.prototype.hasOwnProperty.call(field, ADMIN_FIELD)) {
    Object.defineProperty(field, ADMIN_FIELD, { value: { type, args } satisfies AdminFieldInfo, enumerable: false });
  }
  return field;
}

export const fields = Object.fromEntries(
  Object.entries(keystaticFields).map(([type, make]) => [
    type,
    typeof make === "function" ? (...args: unknown[]) => record(type, args, (make as (...a: unknown[]) => unknown)(...args)) : make,
  ]),
) as KeystaticFields;

/** The recorded settings of a field made through this module, or undefined for any other field. */
export function adminFieldInfo(field: unknown): AdminFieldInfo | undefined {
  return field && typeof field === "object" ? (field as Record<symbol, AdminFieldInfo>)[ADMIN_FIELD] : undefined;
}

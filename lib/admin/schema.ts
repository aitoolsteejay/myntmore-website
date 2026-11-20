// Reads, validates and writes content entries the way Keystatic's own editor does, using each
// field's own parse / validate / serialize functions from keystatic.config.ts. The admin never
// re-implements a rule: a 49-character title limit, a required field or a dropdown's options are
// enforced by the same Keystatic code that enforces them in the Keystatic admin.
//
// Mirrors (Keystatic 0.6.9): parseEntry + parseProps (load for editing), validateValueWithSchema
// (check before save) and serializeProps + serializeEntryToFiles (write), for the field kinds the
// JSON content uses. Files are written as JSON.stringify(value, null, 2) + "\n", byte for byte what
// Keystatic writes. A round-trip test (schema.test.ts) checks every JSON entry on disk against this.
import keystaticConfig from "../../keystatic.config";
import { adminFieldInfo } from "./fields";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Field = any;

export interface ContentType {
  key: string;
  label: string;
  kind: "collection" | "singleton";
  /** Keystatic path pattern, e.g. "content/faqs/pages/*" (collections) or "content/service-copy/cold-email". */
  path: string;
  /** Collections only: the root field whose value is the entry's file name. */
  slugField?: string;
  /** "json" for JSON data files; "mdoc" for entries with a Markdoc body (blog posts). */
  format: "json" | "mdoc";
  schema: Record<string, Field>;
}

const config = keystaticConfig as any;

export function contentTypes(): ContentType[] {
  const make =
    (kind: "collection" | "singleton") =>
    ([key, def]: [string, any]): ContentType => ({
      key,
      label: def.label ?? key,
      kind,
      path: def.path,
      slugField: kind === "collection" ? def.slugField : undefined,
      format: typeof def.format === "object" && def.format?.contentField ? "mdoc" : "json",
      schema: def.schema,
    });
  return [...Object.entries<any>(config.collections ?? {}).map(make("collection")), ...Object.entries<any>(config.singletons ?? {}).map(make("singleton"))];
}

export function contentType(key: string): ContentType | undefined {
  return contentTypes().find((t) => t.key === key);
}

/** Collection directory that holds the entries, e.g. "content/faqs/pages". */
export function collectionDir(type: ContentType): string {
  if (type.kind !== "collection" || !type.path.endsWith("/*")) throw new Error(`${type.key}: unsupported collection path ${type.path}`);
  return type.path.slice(0, -2);
}

/** Repository path of an entry's data file. */
export function entryFilePath(type: ContentType, slug?: string): string {
  if (type.format !== "json") throw new Error(`${type.key}: only JSON entries are supported`);
  if (type.kind === "singleton") return `${type.path}.json`;
  if (!slug || !isValidSlug(slug)) throw new Error(`Invalid entry name "${slug}"`);
  return `${collectionDir(type)}/${slug}.json`;
}

/** Same rule Keystatic's reader applies to a "*" collection: one path segment, no dots-only parts. */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-_]*$/i.test(slug) && !slug.includes("..");
}

// ── Errors ───────────────────────────────────────────────────────────────

export interface FieldError {
  /** Path to the field, e.g. ["items", 2, "answer"]. */
  path: (string | number)[];
  message: string;
}

function messageOf(err: unknown): string {
  if (err instanceof AggregateError) return err.errors.map(messageOf).join("; ");
  if (err instanceof Error) return err.message;
  return String(err);
}

// ── Parse (file → editor state), as Keystatic's parseEntry does ─────────

function parseValue(field: Field, raw: unknown, path: (string | number)[], ctx: { slugField?: string; slug?: string }, errors: FieldError[]): any {
  const value = raw === null ? undefined : raw;
  switch (field.kind) {
    case "form": {
      try {
        if (path.length === 1 && path[0] === ctx.slugField) return field.parse(value, { slug: ctx.slug });
        if (field.formKind === "asset" || field.formKind === "assets" || field.formKind === "content") {
          throw new Error(`${field.formKind} fields are not supported in the admin yet`);
        }
        return field.parse(value, undefined);
      } catch (err) {
        errors.push({ path, message: messageOf(err) });
        return field.defaultValue?.();
      }
    }
    case "object": {
      const obj = value === undefined ? {} : value;
      if (typeof obj !== "object" || Array.isArray(obj)) {
        errors.push({ path, message: "Must be an object" });
        return {};
      }
      for (const key of Object.keys(obj)) if (!(key in field.fields)) errors.push({ path: [...path, key], message: `Key "${key}" is not in the schema` });
      return Object.fromEntries(Object.entries<Field>(field.fields).map(([key, f]) => [key, parseValue(f, (obj as any)[key], [...path, key], ctx, errors)]));
    }
    case "array": {
      if (value === undefined) return [];
      if (!Array.isArray(value)) {
        errors.push({ path, message: "Must be a list" });
        return [];
      }
      return value.map((item, i) => parseValue(field.element, item, [...path, i], ctx, errors));
    }
    case "conditional": {
      if (value === undefined) return { discriminant: field.discriminant.defaultValue(), value: undefined };
      const discriminant = parseValue(field.discriminant, (value as any).discriminant, [...path, "discriminant"], ctx, errors);
      return { discriminant, value: parseValue(field.values[discriminant], (value as any).value, [...path, "value"], ctx, errors) };
    }
    default:
      errors.push({ path, message: `Unsupported field kind "${field.kind}"` });
      return undefined;
  }
}

export interface ParsedEntry {
  state: Record<string, any>;
  errors: FieldError[];
}

/** Parse a JSON data file's text into editor state. */
export function parseEntry(type: ContentType, text: string, slug?: string): ParsedEntry {
  const errors: FieldError[] = [];
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (err) {
    return { state: {}, errors: [{ path: [], message: `The file is not valid JSON: ${messageOf(err)}` }] };
  }
  const state = parseValue({ kind: "object", fields: type.schema }, raw, [], { slugField: type.slugField, slug }, errors);
  return { state, errors };
}

// ── Validate (editor state), as Keystatic's validateValueWithSchema does ─

function validateValue(field: Field, value: any, path: (string | number)[], ctx: { slugField?: string; otherSlugs?: Set<string> }, errors: FieldError[]): void {
  switch (field.kind) {
    case "form":
      try {
        if (path.length === 1 && path[0] === ctx.slugField) field.validate(value, { slugField: { slugs: ctx.otherSlugs ?? new Set(), glob: "*" } });
        else field.validate(value, undefined);
      } catch (err) {
        errors.push({ path, message: messageOf(err) });
      }
      return;
    case "object":
      for (const [key, f] of Object.entries<Field>(field.fields)) validateValue(f, value?.[key], [...path, key], ctx, errors);
      return;
    case "array": {
      const list: any[] = Array.isArray(value) ? value : [];
      const { min, max } = field.validation?.length ?? {};
      if (min !== undefined && list.length < min) errors.push({ path, message: `Must have at least ${min} item${min === 1 ? "" : "s"}` });
      if (max !== undefined && list.length > max) errors.push({ path, message: `Must have at most ${max} item${max === 1 ? "" : "s"}` });
      list.forEach((item, i) => validateValue(field.element, item, [...path, i], {}, errors));
      return;
    }
    case "conditional":
      try {
        field.discriminant.validate(value?.discriminant);
      } catch (err) {
        errors.push({ path: [...path, "discriminant"], message: messageOf(err) });
        return;
      }
      validateValue(field.values[value.discriminant], value.value, [...path, "value"], {}, errors);
      return;
    default:
      errors.push({ path, message: `Unsupported field kind "${field.kind}"` });
  }
}

/** Validate editor state. `otherSlugs` are the other entries' names, so a duplicate name is refused. */
export function validateEntry(type: ContentType, state: Record<string, any>, otherSlugs?: Set<string>): FieldError[] {
  const errors: FieldError[] = [];
  validateValue({ kind: "object", fields: type.schema }, state, [], { slugField: type.slugField, otherSlugs }, errors);
  return errors;
}

// ── Serialize (editor state → file text), as Keystatic's serializeProps does ─

function serializeValue(field: Field, value: any, path: (string | number)[], slugField?: string): any {
  switch (field.kind) {
    case "form":
      if (path.length === 1 && path[0] === slugField) return field.serializeWithSlug(value).value;
      if (field.formKind === "asset" || field.formKind === "assets" || field.formKind === "content") {
        throw new Error(`${field.formKind} fields are not supported in the admin yet`);
      }
      return field.serialize(value).value;
    case "object":
      return Object.fromEntries(
        Object.entries<Field>(field.fields)
          .map(([key, f]) => [key, serializeValue(f, value?.[key], [...path, key], slugField)] as const)
          .filter(([, v]) => v !== undefined),
      );
    case "array":
      return (Array.isArray(value) ? value : []).map((item, i) => {
        const v = serializeValue(field.element, item, [...path, i], slugField);
        return v === undefined ? null : v;
      });
    case "conditional": {
      const inner = serializeValue(field.values[value.discriminant], value.value, [...path, "value"], slugField);
      return inner === undefined
        ? { discriminant: field.discriminant.serialize(value.discriminant).value }
        : { discriminant: field.discriminant.serialize(value.discriminant).value, value: inner };
    }
    default:
      throw new Error(`Unsupported field kind "${field.kind}"`);
  }
}

/** The entry's slug according to its slug field (collections only). */
export function slugOf(type: ContentType, state: Record<string, any>): string | undefined {
  if (!type.slugField) return undefined;
  return type.schema[type.slugField].serializeWithSlug(state[type.slugField]).slug;
}

/** What a field writes when its value was never set, e.g. [] for a list, false for a checkbox. */
function serializedDefault(field: Field): unknown {
  const errors: FieldError[] = [];
  const state = parseValue(field, undefined, ["x"], {}, errors);
  try {
    return serializeValue(field, state, ["x"]);
  } catch {
    return undefined;
  }
}

/**
 * Keep an existing file's layout. Keystatic's serializer drops empty text and writes keys in schema
 * order; many files here were written by generators, with empty strings kept (pages import these
 * files with TypeScript types, so a vanished key can break a build) and their own key order. This
 * keeps the original key order, writes a field that is now empty as "" if the file had that key, and
 * does not add keys the file never had when they only hold their default (an empty list, false, ...).
 * Every value itself is still exactly what Keystatic's serializer produced.
 */
function keepLayout(field: Field, next: any, prev: any): any {
  if (field.kind === "object" && next && prev && typeof prev === "object" && !Array.isArray(prev)) {
    const out: Record<string, any> = {};
    for (const key of Object.keys(prev)) {
      if (!(key in field.fields)) continue;
      if (key in next) out[key] = keepLayout(field.fields[key], next[key], prev[key]);
      else if (typeof prev[key] === "string") out[key] = "";
      else if (prev[key] === null) out[key] = null;
    }
    for (const key of Object.keys(next)) {
      if (key in out) continue;
      if (JSON.stringify(next[key]) === JSON.stringify(serializedDefault(field.fields[key]))) continue;
      out[key] = next[key];
    }
    return out;
  }
  if (field.kind === "array" && Array.isArray(next) && Array.isArray(prev)) {
    return next.map((item, i) => (i < prev.length ? keepLayout(field.element, item, prev[i]) : item));
  }
  if (field.kind === "conditional" && next && prev && next.discriminant === prev.discriminant && field.values[next.discriminant]) {
    return { ...next, value: keepLayout(field.values[next.discriminant], next.value, prev.value) };
  }
  return next;
}

/**
 * Editor state → file text, written the way Keystatic writes it (JSON, 2-space indent, trailing
 * newline). Pass the file's current text as `previousText` when editing an existing entry: its layout
 * is kept (see keepLayout), so a save changes only the lines the editor changed.
 */
export function serializeEntry(type: ContentType, state: Record<string, any>, previousText?: string | null): string {
  const root = { kind: "object", fields: type.schema };
  let value = serializeValue(root, state, [], type.slugField);
  if (previousText) {
    try {
      value = keepLayout(root, value, JSON.parse(previousText));
    } catch {
      // An unreadable previous file is replaced outright.
    }
  }
  return JSON.stringify(value, null, 2) + "\n";
}

/**
 * Text for a brand-new file. Keystatic leaves empty text fields out of the file, but the pages read
 * these files as typed JSON imports, where a key that every other entry has must exist; so a new file
 * writes every text field, empty ones as "", in schema order.
 */
export function serializeNewEntry(type: ContentType, state: Record<string, any>): string {
  const fill = (field: Field, value: any): any => {
    if (field.kind === "object") {
      const out: Record<string, any> = {};
      for (const [k, f] of Object.entries<Field>(field.fields)) {
        if (value && k in value) out[k] = fill(f, value[k]);
        else if (adminFieldInfo(f)?.type === "text") out[k] = "";
      }
      return out;
    }
    if (field.kind === "array" && Array.isArray(value)) return value.map((v) => fill(field.element, v));
    return value;
  };
  const value = JSON.parse(serializeEntry(type, state));
  return JSON.stringify(fill({ kind: "object", fields: type.schema }, value), null, 2) + "\n";
}

/** The file name a singleton is saved under, e.g. "cold-email" for content/service-copy/cold-email. */
export function singletonSlug(type: ContentType): string {
  return type.path.split("/").pop()!;
}

// ── Describe (schema → plain data for the browser form) ─────────────────

export type FieldDescriptor =
  | { kind: "text"; label: string; description?: string; multiline: boolean; required: boolean; min?: number; max?: number; defaultValue: string }
  | { kind: "slug"; label: string; description?: string; required: boolean; isEntryName: boolean }
  | { kind: "url"; label: string; description?: string; required: boolean }
  | { kind: "integer" | "number"; label: string; description?: string; required: boolean; min?: number; max?: number; step?: number }
  | { kind: "checkbox"; label: string; description?: string }
  | { kind: "select"; label: string; description?: string; options: { label: string; value: string }[] }
  | { kind: "multiselect"; label: string; description?: string; options: { label: string; value: string }[] }
  | { kind: "date" | "datetime"; label: string; description?: string; required: boolean }
  | { kind: "relationship"; label: string; description?: string; required: boolean; collection: string }
  | { kind: "object"; label?: string; description?: string; fields: Record<string, FieldDescriptor> }
  | { kind: "array"; label: string; description?: string; element: FieldDescriptor; min?: number; max?: number }
  | { kind: "unsupported"; label: string; type: string };

function describe(field: Field, isEntryName = false): FieldDescriptor {
  const info = adminFieldInfo(field);
  const opts: any = info?.args?.[info.type === "object" || info.type === "array" ? 1 : 0] ?? {};
  const label: string = field.label ?? opts.label ?? "";
  const description: string | undefined = opts.description ?? field.description;
  if (field.kind === "object")
    return {
      kind: "object",
      label: opts.label,
      description,
      fields: Object.fromEntries(Object.entries<Field>(field.fields).map(([k, f]) => [k, describe(f)])),
    };
  if (field.kind === "array") {
    return { kind: "array", label, description, element: describe(field.element), min: field.validation?.length?.min, max: field.validation?.length?.max };
  }
  switch (info?.type) {
    case "text":
      return {
        kind: "text",
        label,
        description,
        multiline: !!opts.multiline,
        required: !!opts.validation?.isRequired || (opts.validation?.length?.min ?? 0) > 0,
        min: opts.validation?.length?.min,
        max: opts.validation?.length?.max,
        defaultValue: opts.defaultValue ?? "",
      };
    case "slug":
      return { kind: "slug", label: opts.name?.label ?? label, description: opts.name?.description, required: true, isEntryName };
    case "url":
      return { kind: "url", label, description, required: !!opts.validation?.isRequired };
    case "integer":
    case "number":
      return {
        kind: info.type,
        label,
        description,
        required: !!opts.validation?.isRequired,
        min: opts.validation?.min,
        max: opts.validation?.max,
        step: opts.step,
      };
    case "checkbox":
      return { kind: "checkbox", label, description };
    case "select":
    case "multiselect":
      return { kind: info.type, label, description, options: opts.options ?? [] };
    case "date":
    case "datetime":
      return { kind: info.type, label, description, required: !!opts.validation?.isRequired };
    case "relationship":
      return { kind: "relationship", label, description, required: !!opts.validation?.isRequired, collection: opts.collection };
    default:
      return { kind: "unsupported", label, type: info?.type ?? field.formKind ?? field.kind };
  }
}

/** Plain, serializable description of a content type's fields, for the browser form. */
export function describeType(type: ContentType): Record<string, FieldDescriptor> {
  return Object.fromEntries(Object.entries(type.schema).map(([k, f]) => [k, describe(f, k === type.slugField)]));
}

// ── Change list for the activity log ─────────────────────────────────────

export interface FieldChange {
  path: string;
  before: unknown;
  after: unknown;
}

function flatten(value: unknown, prefix: string, out: Map<string, unknown>) {
  if (value && typeof value === "object") {
    const entries = Array.isArray(value) ? value.map((v, i) => [String(i), v] as const) : Object.entries(value);
    if (entries.length === 0) out.set(prefix, Array.isArray(value) ? [] : {});
    for (const [k, v] of entries) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  } else {
    out.set(prefix, value);
  }
}

/** Field-level differences between two versions of a data file, e.g. "items.2.answer: old → new". */
export function diffEntries(beforeText: string | null, afterText: string | null): FieldChange[] {
  const before = new Map<string, unknown>();
  const after = new Map<string, unknown>();
  if (beforeText) flatten(JSON.parse(beforeText), "", before);
  if (afterText) flatten(JSON.parse(afterText), "", after);
  const changes: FieldChange[] = [];
  for (const path of Array.from(new Set(Array.from(before.keys()).concat(Array.from(after.keys()))))) {
    const b = before.get(path);
    const a = after.get(path);
    if (JSON.stringify(b) !== JSON.stringify(a)) changes.push({ path, before: b ?? null, after: a ?? null });
  }
  return changes;
}

// Pieces shared by the admin's edit, singleton and new-entry pages.
import type { ParsedEntry } from "./schema";

export function entryTitle(state: Record<string, unknown>, slugField?: string): string | undefined {
  const name = slugField ? (state[slugField] as { name?: unknown } | undefined)?.name : undefined;
  return typeof name === "string" && name ? name : undefined;
}

export function FileProblems({ errors }: { errors: ParsedEntry["errors"] }) {
  if (!errors.length) return null;
  return (
    <div role="alert" className="mt-4 rounded-lg border border-[#F5C2C0] bg-[#FDECEA] p-3 text-sm text-[#9F1D1D]">
      This file has problems the form cannot show, so saving is off. Ask a developer to look at it.
      <ul className="mt-1 list-disc pl-5">
        {errors.map((e, i) => (
          <li key={i}>
            {e.path.join(".") || "file"}: {e.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

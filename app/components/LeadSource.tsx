"use client";

import { useEffect, useState } from "react";
import { captureFirstTouch, leadSourceValue } from "@/lib/lead-source";

// Mounted once in the root layout: remembers where the visitor first arrived.
export function LeadSourceCapture() {
  useEffect(() => {
    captureFirstTouch();
  }, []);
  return null;
}

// Drop-in replacement for the forms' empty `zf_referrer_name` hidden input.
export function LeadSourceField() {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(leadSourceValue());
  }, []);
  return <input type="hidden" name="zf_referrer_name" value={value} readOnly />;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { INTENTTYPE_MESSAGE } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformLLMResponse(message: string[]): INTENTTYPE_MESSAGE {
  const joinedString = message.join(" ");
  const jsonString = joinedString
    .replace(/\\n/g, "") // If \n is escaped
    .replace(/\n/g, "") // Handle raw newlines (just in case)
    .replace(/([{,])(\s*)(\w+):/g, '$1"$3":'); // Only replace keys at the start of objects or after commas

  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && typeof parsed === "object" && "message" in parsed) {
      return parsed;
    }
  } catch {
    // Swallowing the error, throwing it won't make sense!
  }

  return {
    intentType: "default",
    message: joinedString,
  };
}

export function parseAndTransformJson(
  jsonString: string
): Record<string, number> {
  const transformed: Record<string, number> = {};
  try {
    const parsedObject = JSON.parse(jsonString); // Parse the string


    for (const key in parsedObject) {
      transformed[key] = parseFloat(parsedObject[key]); // Convert values to numbers
    }
  } catch {
    // Swallowing the error, throwing it won't make sense!
  }

  return transformed;
}

export function parseStringifiedArray(input: string): string | null {
  const pattern = /\[(.*?)\]/;
  const match = input.match(pattern);
  if (!match || !match[1]) return null;
  const extracted = match[1]
    .split(/,\s*/)
    // eslint-disable-next-line no-useless-escape
    .map((s) => s.replace(/[$\{\}\/]/g, "").trim()) // Remove `${}`, slashes, and trim

  if (extracted.length === 3) {
    return extracted.join("-"); // Format as DD/MM/YYYY
  }

  return extracted.join(" "); // Default behavior for other cases
}

export function formatToIndianRupees(amount: number): string {
  if (isNaN(amount)) return "Invalid amount";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}


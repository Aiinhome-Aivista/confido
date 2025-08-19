
export const formatMessage = (message) => {
  let formatted = message;

  // 1. Ensure space after commas if missing
  formatted = formatted.replace(/,(\S)/g, ", $1");

  // 2. Detect & bold top-level headers (lines ending with ":" or Markdown ###)
  formatted = formatted.replace(
    /(^|\n)(\s*(?:#{1,6}\s.*|[A-Z][^:\n]{2,}:))/g,
    (match, p1, p2) =>
      `${p1}<strong style="display:block; margin:6px 0;">${p2.replace(/:$/, "")}</strong>`
  );

  // 3. Format numbered bullet points and bold the subheader part before ":"
  formatted = formatted.replace(
    /(\d+\.\s*)([^:]+:)(\s*)(.*?)(?=\s\d+\.|$)/gs,
    (match, num, subheader, space, desc) =>
      `<div class="impact-card" style="margin-bottom:12px;">
         ${num}<span style="font-weight:600;">${subheader.trim()} </span>${desc.trim()}
       </div>`
  );

  // 4. Break long text into stanzas (paragraphs)
  formatted = formatted
    .split(/\n\s*\n|(?<=[.!?])\s{2,}/)
    .map((para) => `<p style="margin-bottom:12px;">${para.trim()}</p>`)
    .join("");

  // Wrap in container
  formatted = `<div>${formatted}</div>`;

  return formatted;
};

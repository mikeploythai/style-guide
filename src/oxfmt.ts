import type { OxfmtConfig } from "oxfmt";
import ultraciteFmt from "ultracite/oxfmt";

interface FmtOptions {
  tailwindcss?: { stylesheet?: string };
}

const fmt = ({ tailwindcss }: FmtOptions = {}) =>
  ({
    ...ultraciteFmt,
    singleAttributePerLine: true,
    sortTailwindcss: { ...ultraciteFmt.sortTailwindcss, ...tailwindcss },
  }) satisfies OxfmtConfig;

export { fmt };

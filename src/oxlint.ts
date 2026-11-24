import { fileURLToPath } from "node:url";

import { definePlugin, defineRule } from "@oxlint/plugins";
import type { OxlintConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import { jsPluginSettings, selectJsPlugins } from "ultracite/oxlint/js-plugins";
import react from "ultracite/oxlint/react";
import shadcn from "ultracite/oxlint/shadcn";
import tanstackRules from "ultracite/oxlint/tanstack";
import tanstackJsPlugins from "ultracite/oxlint/tanstack/js-plugins";

const consistentReactImports = defineRule({
  meta: {
    type: "suggestion",
    messages: {
      noTypeImport:
        "Use the global React namespace (e.g. React.ReactNode) instead of importing types from react.",
      noWholeImport:
        "Import what you need by name from react (e.g. { useState }).",
    },
  },
  create: (context) => ({
    ImportDeclaration: (node) => {
      if (node.source.value !== "react") {
        return;
      }

      if (node.importKind === "type") {
        context.report({ node, messageId: "noTypeImport" });

        return;
      }

      for (const specifier of node.specifiers) {
        if (specifier.type !== "ImportSpecifier") {
          context.report({ node: specifier, messageId: "noWholeImport" });
        } else if (specifier.importKind === "type") {
          context.report({ node: specifier, messageId: "noTypeImport" });
        }
      }
    },
  }),
});

type JsPlugin = NonNullable<OxlintConfig["jsPlugins"]>[number];

const isSpecifier = (plugin: JsPlugin): plugin is string =>
  typeof plugin === "string";

const resolveOwn = (specifier: string) =>
  fileURLToPath(import.meta.resolve(specifier));

// Oxlint loads a preset's JS plugins from the consuming project, which
// doesn't depend on them, so point it at this package's copies instead.
const withOwnJsPlugins = <T extends OxlintConfig>(preset: T): T => ({
  ...preset,
  jsPlugins: preset.jsPlugins?.map((plugin) =>
    isSpecifier(plugin)
      ? resolveOwn(plugin)
      : { ...plugin, specifier: resolveOwn(plugin.specifier) }
  ),
});

const reactDoctor = withOwnJsPlugins(selectJsPlugins(["react-doctor"]));

interface LintOptions {
  tanstack?: boolean;
}

type LintConfig = OxlintConfig & {
  jsPlugins: NonNullable<OxlintConfig["jsPlugins"]>;
  rules: NonNullable<OxlintConfig["rules"]>;
};

const lint = ({ tanstack = false }: LintOptions = {}): LintConfig => ({
  extends: [
    core,
    react,
    reactDoctor,
    antiSlop,
    withOwnJsPlugins(shadcn),
    ...(tanstack ? [tanstackRules, withOwnJsPlugins(tanstackJsPlugins)] : []),
  ],
  ignorePatterns: core.ignorePatterns,
  settings: jsPluginSettings,
  jsPlugins: [
    {
      name: "mikeploythai",
      specifier: "@mikeploythai/style-guide/oxlint",
    },
  ],
  rules: {
    "mikeploythai/consistent-react-imports": "error",
    "import/no-relative-parent-imports": "error",
  },
});

export default definePlugin({
  meta: { name: "mikeploythai" },
  rules: { "consistent-react-imports": consistentReactImports },
});

export { lint };

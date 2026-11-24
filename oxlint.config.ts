import { lint } from "@mikeploythai/style-guide/oxlint";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...lint(),
  options: {
    typeAware: true,
    typeCheck: true,
  },
});

import * as shell from "shelljs";
// Copy all the view templates and assets in the public folder
shell.cp("-R", ["src/static"], "build/");

// Remove unnecessary files
shell.rm(["build/public/js/*.ts", "build/public/js/*.json"]);

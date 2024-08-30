#!/usr/bin/env node
const { exec } = require("child_process");

exec("npm run dev", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error starting the server: ${err.message}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});

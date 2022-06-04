#!/usr/bin/env node

function runCli(args: string[]) {
  console.log(args);
  
  const currentDateTime = new Date().toISOString();

  console.log(currentDateTime)
}

runCli(process.argv);
#!/usr/bin/env node

import { program } from 'commander';
import { ProjectGenerator } from './project-generator';

// TODO: I want to have a commander help me to generate the source code by the name pass in parameter
function runCli() {
  program
    .name('generator')
    .description('CLI to some JavaScript string utilities')
    .version('0.0.1');

  program.command('generate')
    .description('Generate project template')
    .argument('<name>', 'The name of the component')
    .action(async (name) => {
      console.log(process.cwd());
      
      await new ProjectGenerator(name).generate();
    })

  program.parse();
}

runCli();
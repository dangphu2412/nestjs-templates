#!/usr/bin/env node

import { program } from 'commander';
import { ProjectGenerator } from './project-generator';

function runCli() {
  program
    .name('generator')
    .description('CLI to generate sample folder for this project')
    .version('0.0.1');

  program.command('generate')
    .description('Generate project template')
    .argument('<name>', 'The name of the component')
    .action(async (name) => {
      await new ProjectGenerator(name).generate();
    })

  program.parse();
}

runCli();
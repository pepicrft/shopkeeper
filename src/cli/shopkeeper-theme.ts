#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .command("settings", "manage a theme's settings")
  .command("deploy", 'deploy changes to a store')
  .command("publish", 'publish a theme')
  .command("delete", 'delete a theme')
  .command("create", 'create a theme')
  .command("get-id", "get a theme id")

program.action(() => {
  program.help();
});

program.parse();

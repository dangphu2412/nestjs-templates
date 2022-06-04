import { existsSync } from 'fs';
import { copyFile, lstat, mkdir, readdir } from 'fs/promises';
import { basename, join } from 'path';
import * as chalk from 'chalk';

const BASE_PROJECT = 'base-project';

export class ProjectGenerator {
  constructor(private readonly projectName: string) {
  }

  public async generate() {
    const currentWorkingDir = process.cwd();
    const baseDir = `${currentWorkingDir}/${BASE_PROJECT}`;
    const newDir = `${currentWorkingDir}/${this.projectName}`;

    console.time('Finish generation');
    console.log(chalk.green(`Generating project ${this.projectName} in ${newDir}`));

    if (existsSync(newDir) ) {
      throw new Error(`Project ${this.projectName} already exists`);
    }

    await mkdir(newDir);
    await this.copyAllContents(baseDir, newDir);

    console.log(chalk.green(`Finish generate project ${this.projectName} in ${newDir}`));
    console.timeEnd('Finish generation');
  }

  private async copyAllContents(source: string, target: string) {
    let files = [];
  
    const targetFolder = join(target, basename(source));
  
    if (!existsSync(targetFolder) ) {
      await mkdir(targetFolder);
    }
  
    if ((await lstat(source)).isDirectory()) {
        files = await readdir(source);
        
        await Promise.all(files.map(async (file) => {
          const curSource = join(source, file);

          if ((await lstat(curSource)).isDirectory()) {
              return this.copyAllContents(curSource, targetFolder);
          }
          return copyFile(curSource, join(targetFolder, file));
        }));
    }
  }
}
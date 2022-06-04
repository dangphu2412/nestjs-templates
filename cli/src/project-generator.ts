import { existsSync, mkdirSync, lstatSync, readdirSync, copyFileSync, readFileSync } from 'fs';
import { basename, join } from 'path';

const BASE_PROJECT = 'base-project';

export class ProjectGenerator {
  constructor(private readonly projectName: string) {
  }

  public async generate() {
    const cwd = process.cwd();
    const baseDir = `${cwd}/${BASE_PROJECT}`;
    const newDir = `${cwd}/${this.projectName}`;
    if (!existsSync(newDir) ) {
      mkdirSync(newDir);
    }
    this.copyFolderRecursiveSync(baseDir, newDir);
  }

  private copyFolderRecursiveSync(source: string, target: string) {
    let files = [];
  
    const targetFolder = join(target, basename(source));
  
    if (!existsSync(targetFolder) ) {
      mkdirSync(targetFolder);
    }
  
    if (lstatSync(source).isDirectory()) {
        files = readdirSync(source);
        files.forEach((file) => {
          const curSource = join(source, file);
          if (lstatSync(curSource ).isDirectory() ) {
              this.copyFolderRecursiveSync( curSource, targetFolder );
          } else {
              copyFileSync(curSource, targetFolder + '/' + file);
          }
        });
    }
  }
}
import slugify from 'slugify';
import { v4 as uuid } from 'uuid';

export class SlugGenerator {
  public static generate(text: string): string {
    return slugify(text) + uuid();
  }
}

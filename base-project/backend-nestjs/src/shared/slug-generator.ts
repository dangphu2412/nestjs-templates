import slugify from 'slugify';

export class SlugGenerator {
  public static generate(text: string): string {
    return slugify(text);
  }
}

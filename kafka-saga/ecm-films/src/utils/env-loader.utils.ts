export class EnvLoaderUtils {
  public static loadMany(rawConfigString: string) {
    return rawConfigString.trim().split(',');
  }
}

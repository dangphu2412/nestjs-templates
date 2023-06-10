export function normalizeParam(param: string | string[] | undefined): string {
  if (!param || Array.isArray(param)) {
    return '';
  }

  return param;
}

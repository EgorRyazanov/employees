export function extractErrorMessage(errorArray?: string[]): string | undefined {
  if (errorArray == null || errorArray.length === 0) {
    return undefined;
  }

  return errorArray.join('\n');
}

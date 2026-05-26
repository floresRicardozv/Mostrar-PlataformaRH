const SEMVER_REGEX = /(\d+)\.(\d+)\.(\d+)/;

/**
 * Parses a version string from CLI output and extracts semver components.
 * Accepts formats like "v22.14.0", "10.2.0", "git version 2.49.0".
 * Returns null if no valid semver version is found.
 */
export function parseVersionOutput(
  output: string,
): { major: number; minor: number; patch: number } | null {
  const match = output.match(SEMVER_REGEX);
  if (!match) {
    return null;
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

/**
 * Compares two semver version strings.
 * Returns true if `current` >= `minimum`.
 * Compares major first, then minor, then patch.
 */
export function compareVersions(current: string, minimum: string): boolean {
  const cur = parseVersionOutput(current);
  const min = parseVersionOutput(minimum);

  if (!cur || !min) {
    return false;
  }

  if (cur.major !== min.major) {
    return cur.major > min.major;
  }
  if (cur.minor !== min.minor) {
    return cur.minor > min.minor;
  }
  return cur.patch >= min.patch;
}

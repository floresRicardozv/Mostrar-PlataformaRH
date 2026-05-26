export interface PrerequisiteCheck {
  tool: string;
  command: string;
  minVersion: string;
}

export interface CheckResult {
  tool: string;
  installed: boolean;
  currentVersion: string | null;
  meetsMinimum: boolean;
  minVersion: string;
}

export interface ToolRequirement {
  name: string;
  versionCommand: string;
  versionRegex: RegExp;
  minMajor: number;
  minMinor: number;
  minPatch: number;
}

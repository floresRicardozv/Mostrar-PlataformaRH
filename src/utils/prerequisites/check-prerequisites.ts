import type { CheckResult, ToolRequirement } from './types';
import { parseVersionOutput, compareVersions } from './version-utils';

/**
 * Type for the command executor function.
 * Accepts a command string and returns the stdout output.
 * Throws if the command fails.
 */
export type CommandExecutor = (command: string) => string;

/**
 * Checks all tool prerequisites by running their version commands
 * and comparing against minimum required versions.
 *
 * @param tools - Array of tool requirements to check
 * @param executor - Function that executes a shell command and returns stdout
 * @returns Array of check results for each tool
 */
export function checkPrerequisites(
  tools: ToolRequirement[],
  executor: CommandExecutor,
): CheckResult[] {
  return tools.map((tool) => {
    const minVersion = `${tool.minMajor}.${tool.minMinor}.${tool.minPatch}`;

    let output: string;
    try {
      output = executor(tool.versionCommand);
    } catch {
      return {
        tool: tool.name,
        installed: false,
        currentVersion: null,
        meetsMinimum: false,
        minVersion,
      };
    }

    const match = output.match(tool.versionRegex);
    if (!match || !match[1]) {
      return {
        tool: tool.name,
        installed: false,
        currentVersion: null,
        meetsMinimum: false,
        minVersion,
      };
    }

    const currentVersion = match[1];
    const parsed = parseVersionOutput(currentVersion);

    if (!parsed) {
      return {
        tool: tool.name,
        installed: false,
        currentVersion: null,
        meetsMinimum: false,
        minVersion,
      };
    }

    const meetsMinimum = compareVersions(currentVersion, minVersion);

    return {
      tool: tool.name,
      installed: true,
      currentVersion: currentVersion,
      meetsMinimum,
      minVersion,
    };
  });
}

/**
 * Generates a human-readable report from check results.
 *
 * If all tools pass: shows a success summary with detected versions.
 * If any tool fails: lists missing or insufficient tools with required versions.
 *
 * @param results - Array of check results
 * @returns Formatted report string
 */
export function generateReport(results: CheckResult[]): string {
  const allPassed = results.every((r) => r.installed && r.meetsMinimum);
  const lines: string[] = [];

  if (allPassed) {
    lines.push('✅ All prerequisites met:');
    for (const r of results) {
      lines.push(`  ${r.tool}: ${r.currentVersion}`);
    }
  } else {
    lines.push('❌ Prerequisites check failed:');
    for (const r of results) {
      if (r.installed && r.meetsMinimum) {
        lines.push(`  ✅ ${r.tool}: ${r.currentVersion}`);
      } else if (r.installed && !r.meetsMinimum) {
        lines.push(
          `  ❌ ${r.tool}: ${r.currentVersion} detected, but minimum required is ${r.minVersion}`,
        );
      } else {
        lines.push(
          `  ❌ ${r.tool} is not installed. Minimum required version: ${r.minVersion}`,
        );
      }
    }
  }

  return lines.join('\n');
}

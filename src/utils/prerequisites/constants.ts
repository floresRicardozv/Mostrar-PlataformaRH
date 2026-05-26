import type { ToolRequirement } from './types';

export const PREREQUISITES: ToolRequirement[] = [
  {
    name: 'Node.js',
    versionCommand: 'node --version',
    versionRegex: /v(\d+\.\d+\.\d+)/,
    minMajor: 18,
    minMinor: 0,
    minPatch: 0,
  },
  {
    name: 'npm',
    versionCommand: 'npm --version',
    versionRegex: /(\d+\.\d+\.\d+)/,
    minMajor: 9,
    minMinor: 0,
    minPatch: 0,
  },
  {
    name: 'Git',
    versionCommand: 'git --version',
    versionRegex: /(\d+\.\d+\.\d+)/,
    minMajor: 2,
    minMinor: 0,
    minPatch: 0,
  },
];

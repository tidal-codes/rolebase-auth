const UNITS: Record<string, number> = {
  ms: 1,
  s: 1000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000
};

export function parseDurationToMs(input: string): number {
  const trimmed = input.trim();
  const match = trimmed.match(/^(\d+)(ms|s|m|h|d)$/);

  if (!match) {
    throw new Error(`Invalid duration format: ${input}. Use formats like 15m, 7d.`);
  }

  const value = Number(match[1]);
  const unit = match[2] as keyof typeof UNITS;
  return value * UNITS[unit];
}

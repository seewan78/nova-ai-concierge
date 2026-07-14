export function validateEnvironment(
  config: Record<string, unknown>,
): Record<string, unknown> {
  const databaseUrl = config.DATABASE_URL;

  if (typeof databaseUrl !== 'string' || databaseUrl.trim().length === 0) {
    throw new Error('Environment validation failed: DATABASE_URL is required.');
  }

  if (config.PORT !== undefined) {
    const port = Number(config.PORT);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error(
        'Environment validation failed: PORT must be an integer between 1 and 65535.',
      );
    }
  }

  return config;
}

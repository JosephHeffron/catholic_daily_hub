import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  RATE_LIMIT: z.string().optional().default(''),
  REDIS_URL: z.string().optional(),
  SOURCE_LITURGICAL_API_URL: z.string().optional().default(''),
  SOURCE_READINGS_BASE_URL: z.string().optional().default('https://bible.usccb.org'),
  SOURCE_SAINTS_BASE_URL: z.string().optional().default(''),
  SOURCE_HOURS_BASE_URL: z.string().optional().default('https://universalis.com'),
  SENTRY_DSN: z.string().optional(),
})

let parsed: z.infer<typeof EnvSchema> | null = null

export function getEnv() {
  if (!parsed) {
    const res = EnvSchema.safeParse(process.env)
    if (!res.success) {
      // Construct concise error message
      const issues = res.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')
      throw new Error(`Invalid environment configuration: ${issues}`)
    }
    parsed = res.data
  }
  return parsed
}

// Eager validate at import time in server contexts
if (typeof window === 'undefined') {
  getEnv()
}

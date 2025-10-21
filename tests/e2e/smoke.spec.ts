import { test, expect } from '@playwright/test'

// NOTE: Start the dev server separately: pnpm dev

const calendarPath = '/calendar/2025/10/20'

test('homepage renders core cards', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Saint / Feast of the Day' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Mass Readings' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Liturgy of the Hours' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Daily Catechism Insight' })).toBeVisible()
})

test('calendar date renders and shows correct rosary set', async ({ page }) => {
  await page.goto(calendarPath)
  await expect(page.getByRole('heading', { name: /Rosary Mystery — Joyful/ })).toBeVisible()
})

test('widgets page shows compact tiles', async ({ page }) => {
  await page.goto('/widgets')
  await expect(page.getByRole('heading', { name: 'Saint of the Day (Compact)' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Daily Gospel (Compact)' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Rosary Today' })).toBeVisible()
})

test('health endpoint and cron prewarm respond', async ({ request }) => {
  const health = await request.get('/health')
  expect(health.ok()).toBeTruthy()
  const healthJson = await health.json()
  expect(healthJson).toHaveProperty('status')

  const cron = await request.get('/api/cron/prewarm')
  expect(cron.ok()).toBeTruthy()
  const cronJson = await cron.json()
  expect(cronJson.ok).toBeTruthy()
})

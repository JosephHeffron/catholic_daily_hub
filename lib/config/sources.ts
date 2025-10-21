export const sources = {
  liturgicalApi: process.env.SOURCE_LITURGICAL_API_URL || '',
  readingsBase: process.env.SOURCE_READINGS_BASE_URL || 'https://bible.usccb.org',
  saintsBase: process.env.SOURCE_SAINTS_BASE_URL || '',
  hoursBase: process.env.SOURCE_HOURS_BASE_URL || 'https://universalis.com',
}

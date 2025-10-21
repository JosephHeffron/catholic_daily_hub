export const metadata = { title: 'Privacy — Catholic Daily Hub' }

export default function PrivacyPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p>
        We do not sell your personal data. Limited analytics (Vercel Analytics) may be used to understand usage patterns
        in aggregate. Any preferences are stored locally in your browser when possible.
      </p>
      <p>
        If you install the PWA and enable reminders (e.g., Angelus), notifications are scheduled on your device when
        supported. No personal data is transmitted to third parties for this feature.
      </p>
    </div>
  )
}

import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { FormField, inputClass } from '../components/forms/FormField'
import Button from '../components/ui/Button'
import PageTransition from '../components/ui/PageTransition'
import SectionHeading from '../components/ui/SectionHeading'
import { usePageTitle } from '../hooks/usePageTitle'
import { submitForm } from '../utils/submissions'
import { validateEmail } from '../utils/validateForm'

export default function Contact() {
  usePageTitle('Contact')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Required'
    if (!validateEmail(form.email)) next.email = 'Valid email required'
    if (!form.message.trim()) next.message = 'Required'
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    await submitForm('contact', form)
    setLoading(false)
    setSent(true)
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Contact"
          title="Visit or Reach Out"
          subtitle="Showroom appointments, partnerships, or press — we respond within 24 hours on business days."
        />

        <div className="grid gap-10 md:grid-cols-5 md:gap-8">
          <div className="space-y-6 md:col-span-2">
            {[
              { icon: MapPin, title: 'Showroom', text: '88 Horizon Drive, Beverly Hills, CA 90210' },
              { icon: Phone, title: 'Phone', text: '+1 (800) 555-0199' },
              { icon: Mail, title: 'Email', text: 'concierge@velvetmotors.com' },
              { icon: Clock, title: 'Hours', text: 'Mon–Sat 9AM–7PM · Sun by appointment' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-white/8 p-5">
                <Icon className="h-5 w-5 shrink-0 text-chrome" />
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-muted">{text}</p>
                </div>
              </div>
            ))}
            <div className="overflow-hidden rounded-2xl border border-white/8">
              <iframe
                title="Map"
                className="h-48 w-full grayscale invert opacity-80"
                loading="lazy"
                src="https://maps.google.com/maps?q=Beverly+Hills+CA&t=&z=12&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            {sent ? (
              <div className="rounded-3xl border border-chrome/30 bg-chrome/10 p-10 text-center">
                <p className="font-display text-2xl font-bold">Message sent</p>
                <p className="mt-2 text-muted">Thank you — we will be in touch shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-3xl border border-white/8 bg-surface-elevated p-6 md:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Name" error={errors.name} required>
                    <input
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Email" error={errors.email} required>
                    <input
                      type="email"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </FormField>
                </div>
                <FormField label="Subject">
                  <input
                    className={inputClass}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </FormField>
                <FormField label="Message" error={errors.message} required>
                  <textarea
                    className={`${inputClass} min-h-[140px]`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </FormField>
                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

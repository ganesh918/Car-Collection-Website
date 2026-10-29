import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { FormField, inputClass, selectClass } from '../components/forms/FormField'
import Button from '../components/ui/Button'
import PageTransition from '../components/ui/PageTransition'
import SectionHeading from '../components/ui/SectionHeading'
import { usePageTitle } from '../hooks/usePageTitle'
import { submitForm } from '../utils/submissions'
import { validateEmail, validatePhone } from '../utils/validateForm'

export default function Enquiry() {
  usePageTitle('Enquiry')
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: 'purchase',
    budget: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Name is required'
    if (!validateEmail(form.email)) next.email = 'Valid email required'
    if (form.phone && !validatePhone(form.phone)) next.phone = 'Valid phone required'
    if (!form.message.trim()) next.message = 'Please share your enquiry'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await submitForm('enquiry', form)
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <CheckCircle2 className="mx-auto h-16 w-16 text-chrome" />
            <h1 className="mt-6 font-display text-3xl font-bold">Enquiry Received</h1>
            <p className="mt-4 text-muted">
              Our team will respond to <strong className="text-white">{form.email}</strong> within one business day.
            </p>
          </motion.div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 lg:py-16">
        <SectionHeading
          eyebrow="Enquiry"
          title="How Can We Assist?"
          subtitle="Financing, trade-in, bespoke sourcing, or general questions — tell us what you need."
          align="center"
        />
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-white/8 bg-surface-elevated p-6 md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Full name" error={errors.fullName} required>
              <input className={inputClass} value={form.fullName} onChange={update('fullName')} />
            </FormField>
            <FormField label="Email" error={errors.email} required>
              <input type="email" className={inputClass} value={form.email} onChange={update('email')} />
            </FormField>
            <FormField label="Phone" error={errors.phone}>
              <input type="tel" className={inputClass} value={form.phone} onChange={update('phone')} />
            </FormField>
            <FormField label="Interest">
              <select className={selectClass} value={form.interest} onChange={update('interest')}>
                {[
                  ['purchase', 'Purchase'],
                  ['lease', 'Lease'],
                  ['trade', 'Trade-In'],
                  ['finance', 'Financing'],
                  ['other', 'Other'],
                ].map(([v, l]) => (
                  <option key={v} value={v} className="bg-surface">
                    {l}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
          <FormField label="Budget range (optional)">
            <select className={selectClass} value={form.budget} onChange={update('budget')}>
              <option value="" className="bg-surface">
                Prefer not to say
              </option>
              {['$80k – $150k', '$150k – $250k', '$250k – $400k', '$400k+'].map((b) => (
                <option key={b} value={b} className="bg-surface">
                  {b}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Message" error={errors.message} required>
            <textarea
              className={`${inputClass} min-h-[120px]`}
              value={form.message}
              onChange={update('message')}
              placeholder="Tell us about your ideal vehicle or question..."
            />
          </FormField>
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? 'Submitting…' : 'Submit Enquiry'}
          </Button>
        </form>
      </div>
    </PageTransition>
  )
}

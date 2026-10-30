import { motion } from 'framer-motion'
import { Calendar, Car, CheckCircle2, Clock, Home, MapPin, Shield, Sparkles, Trophy } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FormField, inputClass, selectClass } from '../components/forms/FormField'
import Button from '../components/ui/Button'
import CarImage from '../components/ui/CarImage'
import PageTransition from '../components/ui/PageTransition'
import { carImages } from '../data/images'
import { cars, formatPrice, getCarById } from '../data/cars'
import { usePageTitle } from '../hooks/usePageTitle'
import { submitForm } from '../utils/submissions'
import { validateEmail, validatePhone } from '../utils/validateForm'

const initial = {
  fullName: '',
  email: '',
  phone: '',
  carId: '',
  preferredDate: '',
  preferredTime: '',
  location: 'showroom',
  message: '',
}

const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM']

const locations = [
  {
    id: 'showroom',
    title: 'Beverly Hills Showroom',
    description: 'Private lounge & curated route briefing',
    icon: MapPin,
  },
  {
    id: 'track',
    title: 'Private Track',
    description: 'Closed-course session with instructor',
    icon: Trophy,
  },
  {
    id: 'delivery',
    title: 'Concierge Visit',
    description: 'At-home or office handover experience',
    icon: Home,
  },
]

const perks = [
  { icon: Shield, text: 'Fully insured session with specialist co-driver' },
  { icon: Sparkles, text: 'No obligation — tailored consultation after your drive' },
  { icon: Clock, text: 'Confirmation within 24 hours on business days' },
]

function FormSection({ title, children }) {
  return (
    <div className="space-y-4 border-t border-white/8 pt-8 first:border-t-0 first:pt-0">
      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-chrome">{title}</h3>
      {children}
    </div>
  )
}

export default function BookTestDrive() {
  const location = useLocation()
  const prefill = location.state || {}
  const [form, setForm] = useState({
    ...initial,
    carId: prefill.carId || '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  usePageTitle('Book Test Drive')

  const selectedCar = useMemo(() => getCarById(form.carId), [form.carId])

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const setField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required'
    if (!validateEmail(form.email)) next.email = 'Enter a valid email'
    if (!validatePhone(form.phone)) next.phone = 'Enter a valid phone number'
    if (!form.carId) next.carId = 'Please select a vehicle'
    if (!form.preferredDate) next.preferredDate = 'Select a date'
    if (!form.preferredTime) next.preferredTime = 'Select a time slot'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await submitForm('test-drive', form)
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    const car = cars.find((c) => c.id === form.carId)
    return (
      <PageTransition>
        <div className="relative overflow-hidden px-4 py-24 md:px-6">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-chrome/5 via-transparent to-transparent" />
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mx-auto max-w-xl rounded-[2rem] border border-chrome/25 bg-surface-elevated/90 p-10 text-center backdrop-blur-md"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-chrome/15">
              <CheckCircle2 className="h-9 w-9 text-chrome" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold">You&apos;re on the calendar</h1>
            <p className="mt-4 leading-relaxed text-muted">
              Thank you, <span className="text-white">{form.fullName}</span>. Your private session for the{' '}
              <strong className="text-chrome-light">{car?.name || 'selected vehicle'}</strong> is reserved for{' '}
              {form.preferredDate} at {form.preferredTime}.
            </p>
            <p className="mt-3 text-sm text-white/50">A Velvet concierge will confirm details shortly.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button onClick={() => setSubmitted(false)}>Book another</Button>
              <Link to="/collection">
                <Button variant="secondary">Browse collection</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      {/* Page hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <CarImage
          src={carImages.ctaExperience}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="hero-grain absolute inset-0 bg-void/75" />
        <div className="absolute inset-0 bg-linear-to-r from-void via-void/90 to-void/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-chrome">Velvet Experience</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Book your <span className="text-gradient-gold">private test drive</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">
              {prefill.carName
                ? `Complete your reservation for the ${prefill.carName}. Our team will personalize route, timing, and vehicle preparation.`
                : 'Select your vehicle, preferred date, and experience type — white-glove coordination from first click to first mile.'}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-4 xl:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated">
              {selectedCar ? (
                <>
                  <div className="relative aspect-[16/10]">
                    <CarImage src={selectedCar.image} alt={selectedCar.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-void via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs uppercase tracking-wider text-chrome">{selectedCar.brand}</p>
                      <p className="font-display text-lg font-bold">{selectedCar.name}</p>
                      <p className="text-sm text-chrome-light">{formatPrice(selectedCar.price)}</p>
                    </div>
                  </div>
                  <div className="space-y-2 p-5 text-sm text-muted">
                    <p>{selectedCar.tagline}</p>
                    <p>
                      {selectedCar.horsepower} HP · {selectedCar.acceleration}s 0–60 · {selectedCar.category}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <Car className="h-10 w-10 text-chrome/50" />
                  <p className="mt-4 font-display text-lg font-semibold text-white">Select a vehicle</p>
                  <p className="mt-2 text-sm text-muted">Choose a model in the form to preview your session.</p>
                </div>
              )}
            </div>

            <ul className="space-y-4 rounded-2xl border border-white/8 bg-surface/80 p-6">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3 text-sm text-white/70">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-chrome" />
                  {text}
                </li>
              ))}
            </ul>
          </aside>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-white/10 bg-surface-elevated/90 p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.8)] backdrop-blur-sm md:p-9 lg:col-span-8 xl:col-span-8"
          >
            <FormSection title="Your details">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Full name" error={errors.fullName} required>
                  <input className={`${inputClass} border-white/12 bg-void/50`} value={form.fullName} onChange={update('fullName')} />
                </FormField>
                <FormField label="Email" error={errors.email} required>
                  <input
                    type="email"
                    className={`${inputClass} border-white/12 bg-void/50`}
                    value={form.email}
                    onChange={update('email')}
                  />
                </FormField>
                <FormField label="Phone" error={errors.phone} required>
                  <input
                    type="tel"
                    className={`${inputClass} border-white/12 bg-void/50`}
                    value={form.phone}
                    onChange={update('phone')}
                  />
                </FormField>
                <FormField label="Vehicle" error={errors.carId} required>
                  <select
                    className={`${selectClass} border-white/12 bg-void/50`}
                    value={form.carId}
                    onChange={update('carId')}
                  >
                    <option value="">Select a car</option>
                    {cars.map((c) => (
                      <option key={c.id} value={c.id} className="bg-surface">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            </FormSection>

            <FormSection title="Session preferences">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Preferred date" error={errors.preferredDate} required>
                  <input
                    type="date"
                    className={`${inputClass} border-white/12 bg-void/50`}
                    value={form.preferredDate}
                    onChange={update('preferredDate')}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </FormField>
                <div>
                  <p className="mb-2 block text-sm text-muted">
                    Time slot <span className="text-accent">*</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setField('preferredTime', slot)}
                        className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                          form.preferredTime === slot
                            ? 'bg-chrome text-void shadow-[0_0_20px_rgba(212,175,106,0.25)]'
                            : 'border border-white/12 bg-void/40 text-muted hover:border-chrome/40 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.preferredTime && (
                    <p className="mt-2 text-xs text-accent">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm text-muted">Experience location</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {locations.map(({ id, title, description, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setField('location', id)}
                      className={`rounded-xl border p-4 text-left transition ${
                        form.location === id
                          ? 'border-chrome/50 bg-chrome/10 ring-1 ring-chrome/30'
                          : 'border-white/10 bg-void/30 hover:border-white/20'
                      }`}
                    >
                      <Icon className={`mb-3 h-5 w-5 ${form.location === id ? 'text-chrome' : 'text-muted'}`} />
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </FormSection>

            <FormSection title="Special requests">
              <textarea
                className={`${inputClass} min-h-[110px] resize-y border-white/12 bg-void/50`}
                value={form.message}
                onChange={update('message')}
                placeholder="Route preferences, co-driver, accessibility, celebration occasion..."
              />
            </FormSection>

            <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-8 md:gap-5 lg:flex-row lg:items-center lg:justify-between">
              <p className="order-2 flex items-center gap-2 text-xs text-muted lg:order-1">
                <Calendar className="h-4 w-4 shrink-0 text-chrome" />
                Average confirmation time: under 24 hours
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="order-1 w-full lg:order-2 lg:w-auto lg:min-w-[14rem]"
              >
                {loading ? 'Securing your session…' : 'Confirm Test Drive'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}

import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell from '../../components/auth/AuthShell'
import AuthTextField from '../../components/auth/AuthTextField'
import Button from '../../components/ui/Button'
import PageTransition from '../../components/ui/PageTransition'
import { usePageTitle } from '../../hooks/usePageTitle'
import { requestPasswordReset } from '../../utils/auth'
import { validateEmail } from '../../utils/validateForm'

export default function ForgotPassword() {
  usePageTitle('Reset Password')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError('Enter a valid email')
      return
    }
    setError('')
    setLoading(true)
    await requestPasswordReset(email)
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <PageTransition>
        <AuthShell
          eyebrow="Check your inbox"
          title="Reset link sent"
          showTrust={false}
          footer={
            <Link to="/login" className="font-medium text-chrome-light transition hover:text-chrome">
              Back to sign in
            </Link>
          }
        >
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-chrome" />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              If an account exists for <strong className="text-white">{email}</strong>, you will receive reset
              instructions. This demo stores the request locally only — no email is sent.
            </p>
          </motion.div>
        </AuthShell>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <AuthShell
        eyebrow="Password"
        title="Forgot your password?"
        subtitle="We will email a secure link to reset access to your Velvet profile."
        showTrust={false}
        footer={
          <>
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-chrome-light transition hover:text-chrome">
              Sign in
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-start gap-3 rounded-2xl border border-chrome/25 bg-chrome/8 px-4 py-4 text-sm text-white/75">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-chrome" />
            <p>Reset requests are simulated for this frontend assignment.</p>
          </div>

          <AuthTextField
            label="Email address"
            type="email"
            autoComplete="email"
            icon={Mail}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            placeholder="you@example.com"
            error={error}
            required
          />

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              'Send reset link'
            )}
          </Button>
        </form>
      </AuthShell>
    </PageTransition>
  )
}

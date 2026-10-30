import { Loader2, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthTextField from '../../components/auth/AuthTextField'
import PasswordField from '../../components/auth/PasswordField'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { validateEmail, validatePassword } from '../../utils/validateForm'

export default function SignUp() {
  const { register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => {
    const value = field === 'terms' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Name required'
    if (!validateEmail(form.email)) next.email = 'Valid email required'
    if (!validatePassword(form.password)) {
      next.password = '8+ chars with letter & number'
    }
    if (!form.confirmPassword) {
      next.confirmPassword = 'Confirm your password'
    } else if (form.password !== form.confirmPassword) {
      next.confirmPassword = 'Passwords do not match'
    }
    if (!form.terms) next.terms = 'You must agree to continue'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      if (!form.terms) {
        showToast('Please agree to the terms & privacy to create an account.', 'error')
      } else if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
        showToast('Passwords do not match.', 'error')
      } else {
        showToast('Please fix the highlighted fields.', 'error')
      }
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const result = register({
      fullName: form.fullName,
      email: form.email,
      password: form.password,
    })
    setLoading(false)
    if (!result.ok) {
      setErrors({ email: result.error })
      showToast(result.error, 'error')
      return
    }
    showToast('Welcome to Velvet Motors.', 'success')
    navigate('/', { replace: true })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <AuthTextField
        label="Name"
        type="text"
        autoComplete="name"
        icon={UserRound}
        value={form.fullName}
        onChange={update('fullName')}
        placeholder="Your name"
        error={errors.fullName}
        required
      />

      <AuthTextField
        label="Email"
        type="email"
        autoComplete="email"
        icon={Mail}
        value={form.email}
        onChange={update('email')}
        placeholder="you@example.com"
        error={errors.email}
        required
      />

      <PasswordField
        label="Password"
        autoComplete="new-password"
        value={form.password}
        onChange={update('password')}
        placeholder="8+ characters"
        error={errors.password}
        required
      />

      <PasswordField
        label="Confirm password"
        autoComplete="new-password"
        value={form.confirmPassword}
        onChange={update('confirmPassword')}
        placeholder="Re-enter password"
        error={errors.confirmPassword}
        required
      />

      <div className="space-y-1.5">
        <label
          className={`flex cursor-pointer items-start gap-2.5 text-xs ${
            errors.terms ? 'text-red-400' : 'text-muted'
          }`}
        >
          <input
            type="checkbox"
            checked={form.terms}
            onChange={update('terms')}
            className={`mt-0.5 h-3.5 w-3.5 shrink-0 rounded bg-surface accent-chrome ${
              errors.terms ? 'border-red-500 ring-1 ring-red-500/40' : 'border-white/20'
            }`}
          />
          <span>I agree to terms & privacy (demo)</span>
        </label>
        {errors.terms && <p className="text-xs font-medium text-red-400">{errors.terms}</p>}
      </div>

      <Button type="submit" className="mt-1 w-full gap-2" size="md" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating…
          </>
        ) : (
          'Create account'
        )}
      </Button>
    </form>
  )
}

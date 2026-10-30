import { Loader2, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthTextField from '../../components/auth/AuthTextField'
import PasswordField from '../../components/auth/PasswordField'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { validateEmail } from '../../utils/validateForm'

export default function Login() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => {
    const value = field === 'remember' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!validateEmail(form.email)) next.email = 'Valid email required'
    if (!form.password) next.password = 'Password required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 550))
    const result = login({ email: form.email, password: form.password })
    setLoading(false)
    if (!result.ok) {
      setErrors({ password: result.error })
      return
    }
    showToast(`Welcome back, ${result.user.fullName.split(' ')[0]}.`, 'success')
    navigate('/', { replace: true })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
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
        autoComplete="current-password"
        value={form.password}
        onChange={update('password')}
        placeholder="••••••••"
        error={errors.password}
        required
      />

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={update('remember')}
            className="h-3.5 w-3.5 rounded border-white/20 bg-surface accent-chrome"
          />
          Remember me
        </label>
        <Link to="/forgot-password" className="font-medium text-chrome-light transition hover:text-chrome">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="mt-1 w-full gap-2" size="md" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          'Sign in'
        )}
      </Button>
    </form>
  )
}

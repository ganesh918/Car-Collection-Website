import { Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { FormField } from '../forms/FormField'

export default function PasswordField({
  label,
  error,
  required,
  value,
  onChange,
  placeholder = '••••••••',
  autoComplete,
  showToggle = true,
  showLockIcon = true,
}) {
  const [visible, setVisible] = useState(false)

  return (
    <FormField label={label} error={error} required={required}>
      <div className="auth-input-wrap relative">
        {showLockIcon && (
          <Lock
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chrome/70"
            aria-hidden
          />
        )}
        <input
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`auth-input w-full rounded-xl border border-white/10 bg-surface/90 py-3 text-sm text-white outline-none transition placeholder:text-muted/50 focus:border-chrome/55 focus:ring-2 focus:ring-chrome/20 ${showLockIcon ? 'pl-11' : 'pl-4'} ${showToggle ? 'pr-12' : 'pr-4'}`}
        />
        {showToggle && (
          <button
            type="button"
            className="password-toggle-btn absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-chrome-light transition hover:border-chrome/50 hover:bg-chrome/15 hover:text-chrome"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
          >
            {visible ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
          </button>
        )}
      </div>
    </FormField>
  )
}

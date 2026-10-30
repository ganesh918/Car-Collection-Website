import { validatePassword } from '../../utils/validateForm'

function scorePassword(password) {
  if (!password) return 0
  let score = 0
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  return Math.min(score, 4)
}

const labels = ['Too weak', 'Fair', 'Good', 'Strong', 'Excellent']

export default function PasswordStrength({ password }) {
  const score = scorePassword(password)
  const valid = validatePassword(password)

  if (!password) return null

  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i < score ? 'bg-linear-to-r from-chrome to-chrome-light' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${valid ? 'text-chrome-light' : 'text-muted'}`}>
        {valid ? labels[score] : 'Use 8+ characters with letters and numbers'}
      </p>
    </div>
  )
}

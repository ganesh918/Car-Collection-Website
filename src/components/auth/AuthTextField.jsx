import { FormField } from '../forms/FormField'

export default function AuthTextField({
  label,
  error,
  required,
  icon: Icon,
  className = '',
  ...inputProps
}) {
  return (
    <FormField label={label} error={error} required={required}>
      <div className="auth-input-wrap relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-chrome/70"
            aria-hidden
          />
        )}
        <input
          className={`auth-input w-full rounded-xl border border-white/10 bg-surface/90 py-3 text-sm text-white outline-none transition placeholder:text-muted/50 focus:border-chrome/55 focus:ring-2 focus:ring-chrome/20 ${Icon ? 'pl-11 pr-4' : 'px-4'} ${className}`}
          {...inputProps}
        />
      </div>
    </FormField>
  )
}

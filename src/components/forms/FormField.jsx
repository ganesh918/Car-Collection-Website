export function FormField({ label, error, children, required }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
      {error && <p className="mt-1.5 text-xs text-accent">{error}</p>}
    </label>
  )
}

export const inputClass =
  'w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted/60 focus:border-chrome/50 focus:ring-2 focus:ring-chrome/20'

export const selectClass = `${inputClass} cursor-pointer appearance-none`

import { Shield, Sparkles, Users } from 'lucide-react'

const items = [
  { icon: Shield, text: '256-bit demo encryption' },
  { icon: Users, text: '12k+ members' },
  { icon: Sparkles, text: 'White-glove onboarding' },
]

export default function AuthTrustStrip() {
  return (
    <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/8 pt-6">
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/40">
          <Icon className="h-3.5 w-3.5 text-chrome/80" />
          {text}
        </li>
      ))}
    </ul>
  )
}

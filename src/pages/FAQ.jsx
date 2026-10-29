import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import Button from '../components/ui/Button'
import PageTransition from '../components/ui/PageTransition'
import SectionHeading from '../components/ui/SectionHeading'

const faqs = [
  {
    q: 'Can I schedule a test drive for any vehicle listed?',
    a: 'Yes. Most inventory is available for private test drives at our showroom, partner track, or via concierge delivery within Southern California.',
  },
  {
    q: 'Do you offer financing or leasing?',
    a: 'We partner with premium lenders and captive finance programs. Submit an enquiry or speak with an advisor for tailored terms.',
  },
  {
    q: 'How does the wishlist work?',
    a: 'Saved favorites are stored locally in your browser so you can return anytime. Clear or update them from the Wishlist page.',
  },
  {
    q: 'How many cars can I compare at once?',
    a: 'You can compare up to three vehicles side-by-side on specifications, performance, and pricing.',
  },
  {
    q: 'Are images and specifications accurate?',
    a: 'We strive for accuracy on every listing. Confirm final specs and options with your advisor before purchase.',
  },
  {
    q: 'Do you accept trade-ins?',
    a: 'Absolutely. Our appraisal team evaluates trade-ins remotely or in person with transparent market-based offers.',
  },
]

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-white/8">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium">{item.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-chrome transition ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  usePageTitle('FAQ')
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 lg:py-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Quick answers about test drives, financing, and using Velvet Motors online."
          align="center"
        />
        <div className="rounded-3xl border border-white/8 bg-surface-elevated px-6 md:px-8">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-muted">Still have questions?</p>
          <Link to="/contact" className="mt-4 inline-block">
            <Button variant="secondary">Contact Us</Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}

import { Link } from 'react-router-dom'
import { cars } from '../../data/cars'
import CarCard from '../cars/CarCard'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'

export default function FeaturedCars() {
  const featured = [...cars].sort((a, b) => b.rating - a.rating).slice(0, 4)

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8 lg:py-28">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Featured Selection"
          title="Icons of Performance & Luxury"
          subtitle="Hand-picked models representing the pinnacle of each category — ready for test drive or bespoke delivery."
        />
        <Link to="/collection" className="shrink-0">
          <Button variant="outline">View All Cars</Button>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featured.map((car, i) => (
          <CarCard key={car.id} car={car} index={i} />
        ))}
      </div>
    </section>
  )
}

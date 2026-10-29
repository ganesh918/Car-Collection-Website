import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import PageTransition from '../components/ui/PageTransition'
import SectionHeading from '../components/ui/SectionHeading'
import CarImage from '../components/ui/CarImage'
import { useComparison } from '../context/ComparisonContext'
import { cars, formatPrice, getCarById } from '../data/cars'
import { usePageTitle } from '../hooks/usePageTitle'

const rows = [
  { key: 'price', label: 'Price', render: (c) => formatPrice(c.price) },
  { key: 'category', label: 'Category', render: (c) => c.category },
  { key: 'year', label: 'Year', render: (c) => c.year },
  { key: 'horsepower', label: 'Horsepower', render: (c) => `${c.horsepower} HP` },
  { key: 'acceleration', label: '0-60 mph', render: (c) => `${c.acceleration}s` },
  { key: 'topSpeed', label: 'Top Speed', render: (c) => `${c.topSpeed} mph` },
  { key: 'fuelType', label: 'Fuel Type', render: (c) => c.fuelType },
  { key: 'transmission', label: 'Transmission', render: (c) => c.transmission },
  { key: 'drivetrain', label: 'Drivetrain', render: (c) => c.drivetrain },
  { key: 'seats', label: 'Seats', render: (c) => c.seats },
  { key: 'rating', label: 'Rating', render: (c) => `${c.rating} / 5` },
  { key: 'engine', label: 'Engine', render: (c) => c.specs.engine },
]

export default function Compare() {
  usePageTitle('Compare Vehicles')
  const { compareIds, removeFromCompare, clearCompare, maxCompare } = useComparison()
  const selected = compareIds.map(getCarById).filter(Boolean)

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Comparison"
            title="Side-by-Side Analysis"
            subtitle={`Select up to ${maxCompare} vehicles from the collection to compare specifications and performance.`}
          />
          {selected.length > 0 && (
            <Button variant="ghost" onClick={clearCompare}>
              Clear all
            </Button>
          )}
        </div>

        {selected.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 py-20 text-center">
            <p className="font-display text-xl">No cars selected for comparison</p>
            <p className="mt-2 text-muted">Use the scale icon on any vehicle card to add it here.</p>
            <Link to="/collection" className="mt-6 inline-block">
              <Button>Browse Collection</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin rounded-3xl border border-white/8">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-surface-elevated">
                  <th className="p-4 text-left font-medium text-muted">Specification</th>
                  {selected.map((car) => (
                    <th key={car.id} className="min-w-[200px] p-4 text-left align-top">
                      <CarImage
                        src={car.image}
                        alt=""
                        className="mb-3 aspect-video w-full rounded-xl object-cover"
                      />
                      <p className="font-display font-bold">{car.name}</p>
                      <button
                        type="button"
                        onClick={() => removeFromCompare(car.id)}
                        className="mt-2 text-xs text-accent hover:underline"
                      >
                        Remove
                      </button>
                    </th>
                  ))}
                  {selected.length < maxCompare &&
                    Array.from({ length: maxCompare - selected.length }).map((_, i) => (
                      <th key={`empty-${i}`} className="min-w-[200px] p-4 align-top">
                        <Link
                          to="/collection"
                          className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-white/15 text-muted hover:border-chrome/40 hover:text-chrome-light"
                        >
                          + Add vehicle
                        </Link>
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key} className="border-b border-white/6 hover:bg-white/2">
                    <td className="p-4 font-medium text-muted">{row.label}</td>
                    {selected.map((car) => (
                      <td key={car.id} className="p-4">
                        {row.render(car)}
                      </td>
                    ))}
                    {selected.length < maxCompare &&
                      Array.from({ length: maxCompare - selected.length }).map((_, i) => (
                        <td key={`e-${row.key}-${i}`} className="p-4 text-muted">
                          —
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selected.length > 0 && (
          <p className="mt-4 text-xs text-muted">
            Tip: {cars.length} total models in inventory — swap comparisons anytime without losing your wishlist.
          </p>
        )}
      </div>
    </PageTransition>
  )
}

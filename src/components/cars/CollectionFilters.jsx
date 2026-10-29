import { Search, SlidersHorizontal, X } from 'lucide-react'
import { BRANDS, CATEGORIES } from '../../data/cars'
import { inputClass, selectClass } from '../forms/FormField'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'hp-desc', label: 'Power: Highest' },
  { value: 'year-desc', label: 'Newest Year' },
  { value: 'rating-desc', label: 'Top Rated' },
]

export default function CollectionFilters({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  sort,
  setSort,
  fuelType,
  setFuelType,
  priceMax,
  setPriceMax,
  resultCount,
  onReset,
}) {
  const hasFilters =
    search || category !== 'All' || brand !== 'All' || fuelType !== 'All' || priceMax < 350000

  return (
    <div className="space-y-4 rounded-3xl border border-white/8 bg-surface-elevated p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted">
          <SlidersHorizontal className="h-4 w-4 text-chrome" />
          <span>
            <strong className="text-white">{resultCount}</strong> vehicles found
          </span>
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-sm text-chrome-light hover:underline"
          >
            <X className="h-3 w-3" /> Reset filters
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, brand, or keyword..."
          className={`${inputClass} pl-11`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-surface">
              {c === 'All' ? 'All Categories' : c}
            </option>
          ))}
        </select>
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className={selectClass}>
          {BRANDS.map((b) => (
            <option key={b} value={b} className="bg-surface">
              {b === 'All' ? 'All Brands' : b}
            </option>
          ))}
        </select>
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className={selectClass}>
          {['All', 'Petrol', 'Hybrid', 'Electric'].map((f) => (
            <option key={f} value={f} className="bg-surface">
              {f === 'All' ? 'All Fuel Types' : f}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value} className="bg-surface">
              Sort: {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-2 flex justify-between text-xs text-muted">
          <span>Max price</span>
          <span className="text-chrome-light">${priceMax.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={80000}
          max={350000}
          step={5000}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-chrome"
        />
      </div>
    </div>
  )
}

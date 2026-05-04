import { useState, useMemo } from 'react'
import PokemonCard from './PokemonCard'
import { RARITY_TIERS } from '../utils/api'

const TYPES_ES = [
  ['fire','Fuego'],['water','Agua'],['grass','Planta'],['electric','Eléctrico'],
  ['psychic','Psíquico'],['dragon','Dragón'],['dark','Siniestro'],['ghost','Fantasma'],
  ['fighting','Lucha'],['poison','Veneno'],['rock','Roca'],['ice','Hielo'],
  ['steel','Acero'],['fairy','Hada'],['normal','Normal'],['ground','Tierra'],
  ['flying','Volador'],['bug','Bicho'],
]

const TYPE_CHIP_COLORS = {
  fire:'bg-orange-100 text-orange-700 border-orange-200', water:'bg-sky-100 text-sky-700 border-sky-200',
  grass:'bg-green-100 text-green-700 border-green-200', electric:'bg-yellow-100 text-yellow-700 border-yellow-200',
  psychic:'bg-pink-100 text-pink-700 border-pink-200', dragon:'bg-blue-100 text-blue-700 border-blue-200',
  dark:'bg-zinc-100 text-zinc-700 border-zinc-200', ghost:'bg-purple-100 text-purple-700 border-purple-200',
  fighting:'bg-red-100 text-red-700 border-red-200', poison:'bg-violet-100 text-violet-700 border-violet-200',
  rock:'bg-stone-100 text-stone-700 border-stone-200', ice:'bg-cyan-100 text-cyan-700 border-cyan-200',
  steel:'bg-slate-100 text-slate-700 border-slate-200', fairy:'bg-rose-100 text-rose-700 border-rose-200',
  normal:'bg-gray-100 text-gray-700 border-gray-200', ground:'bg-amber-100 text-amber-700 border-amber-200',
  flying:'bg-indigo-100 text-indigo-700 border-indigo-200', bug:'bg-lime-100 text-lime-700 border-lime-200',
}

const CardGrid = ({
  cards, loading, loadingMore, error, isPurchased, onCardSelect, onReload,
  loadMore, hasMore, total,
  typeFilter, onTypeFilterChange,
}) => {
  const [search, setSearch] = useState('')
  const [rarityFilter, setRarityFilter] = useState('all')
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let result = [...cards]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(c => c.name.toLowerCase().includes(q) || String(c.id).includes(q))
    }
    if (rarityFilter !== 'all') result = result.filter(c => c.rarity.key === rarityFilter)
    if (sort === 'price-asc')   result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc')  result.sort((a, b) => b.price - a.price)
    if (sort === 'name')        result.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'id')          result.sort((a, b) => a.id - b.id)
    if (sort === 'stats')       result.sort((a, b) => b.statsTotal - a.statsTotal)
    return result
  }, [cards, search, rarityFilter, sort])

  const handleTypeChange = (type) => {
    setSearch('')
    setRarityFilter('all')
    onTypeFilterChange(type)
  }

  const clearAllFilters = () => {
    setSearch('')
    setRarityFilter('all')
    onTypeFilterChange('all')
  }

  if (error) return (
    <div className="text-center py-20">
      <p className="text-ink-700 font-semibold mb-3">{error}</p>
      <button onClick={onReload} className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition">Reintentar</button>
    </div>
  )

  return (
    <section id="market" className="scroll-mt-20">

      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="font-display font-black text-2xl lg:text-3xl text-ink-900">Mercado de cartas</h2>
          <p className="text-sm text-ink-500 mt-1">
            {loading
              ? 'Cargando...'
              : `${filtered.length} mostradas · ${cards.length} cargadas · ${total.toLocaleString()} totales`
            }
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Nombre o #número..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-ink-200 rounded-xl text-sm placeholder:text-ink-400 focus:ring-2 focus:ring-brand-300 outline-none shadow-soft" />
        </div>
      </div>

      <div className="bg-white border border-ink-100 rounded-2xl p-3 mb-6 shadow-soft space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Rareza</span>
          {['all', ...RARITY_TIERS.map(t => t.key)].map(key => (
            <button key={key} onClick={() => setRarityFilter(key)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${rarityFilter === key ? 'bg-ink-900 text-white' : 'bg-ink-50 text-ink-600 hover:bg-ink-100'}`}>
              {key === 'all' ? 'Todas' : RARITY_TIERS.find(t => t.key === key)?.label}
            </button>
          ))}
          <div className="ml-auto">
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1.5 bg-ink-50 border border-ink-100 rounded-lg text-xs font-medium outline-none cursor-pointer">
              <option value="default">Por defecto</option>
              <option value="id">Nº Pokédex</option>
              <option value="stats">Más fuertes</option>
              <option value="price-asc">Precio ↑</option>
              <option value="price-desc">Precio ↓</option>
              <option value="name">Nombre A–Z</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400 self-center">Tipo</span>
          <button onClick={() => handleTypeChange('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${typeFilter === 'all' ? 'bg-ink-900 text-white border-ink-900' : 'bg-ink-50 text-ink-600 border-ink-100 hover:bg-ink-100'}`}>
            Todos
          </button>
          {TYPES_ES.map(([key, label]) => (
            <button key={key} onClick={() => handleTypeChange(key)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${TYPE_CHIP_COLORS[key]} ${typeFilter === key ? 'ring-1 ring-offset-1 ring-current opacity-100' : 'opacity-60 hover:opacity-100'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-gradient-to-b from-slate-200 to-slate-100 animate-pulse" style={{ minHeight: '340px' }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-bold text-ink-700">Sin resultados</p>
          <button onClick={clearAllFilters}
            className="mt-3 px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition">
            Limpiar filtros
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((card, i) => (
              <PokemonCard key={card.id} card={card} purchased={isPurchased(card.id)} onSelect={onCardSelect} index={i} />
            ))}
          </div>

          {hasMore && !search && rarityFilter === 'all' && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-sm text-ink-500">{cards.length.toLocaleString()} de {total.toLocaleString()} cargados</p>
              <div className="w-64 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-500 to-brand-700 rounded-full transition-all duration-500"
                  style={{ width: `${(cards.length / total) * 100}%` }} />
              </div>
              <button onClick={loadMore} disabled={loadingMore}
                className="px-8 py-3 bg-ink-900 text-white rounded-2xl font-bold text-sm hover:bg-ink-800 active:scale-95 transition-all disabled:opacity-60 flex items-center gap-2 shadow-lg">
                {loadingMore ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>Cargando 40 más...</>
                ) : (
                  <>Cargar 40 más <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default CardGrid
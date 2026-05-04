import axios from 'axios'

const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

export const RARITY_TIERS = [
  { key: 'common',    label: 'Común',      min: 0,   max: 320,  stars: 1, ring: 'ring-slate-400',   badge: 'bg-slate-100 text-slate-700' },
  { key: 'uncommon',  label: 'Poco común', min: 321, max: 410,  stars: 2, ring: 'ring-emerald-400', badge: 'bg-emerald-50 text-emerald-700' },
  { key: 'rare',      label: 'Raro',       min: 411, max: 490,  stars: 3, ring: 'ring-sky-400',     badge: 'bg-sky-50 text-sky-700' },
  { key: 'epic',      label: 'Épico',      min: 491, max: 570,  stars: 4, ring: 'ring-violet-400',  badge: 'bg-violet-50 text-violet-700' },
  { key: 'legendary', label: 'Legendaria', min: 571, max: 9999, stars: 5, ring: 'ring-amber-400',   badge: 'bg-amber-50 text-amber-600' },
]

export const getRarity = (statsTotal) =>
  RARITY_TIERS.find(t => statsTotal >= t.min && statsTotal <= t.max) || RARITY_TIERS[0]

export const calculatePrice = (statsTotal) => {
  if (statsTotal >= 571) return 29.99
  if (statsTotal >= 491) return 19.99
  if (statsTotal >= 411) return 9.99
  if (statsTotal >= 321) return 4.99
  return 1.99
}

export const TYPE_TCG = {
  normal:   { name: 'Normal',    gradient: 'from-stone-300 via-stone-200 to-stone-100',    border: '#a8a29e', header: '#78716c', symbol: '⬤' },
  fire:     { name: 'Fuego',     gradient: 'from-red-500 via-orange-400 to-amber-300',     border: '#f97316', header: '#dc2626', symbol: '🔥' },
  water:    { name: 'Agua',      gradient: 'from-blue-500 via-cyan-400 to-sky-300',        border: '#3b82f6', header: '#1d4ed8', symbol: '💧' },
  grass:    { name: 'Planta',    gradient: 'from-green-500 via-emerald-400 to-teal-300',   border: '#22c55e', header: '#15803d', symbol: '🌿' },
  electric: { name: 'Eléctrico', gradient: 'from-yellow-400 via-amber-300 to-yellow-200',  border: '#eab308', header: '#ca8a04', symbol: '⚡' },
  ice:      { name: 'Hielo',     gradient: 'from-cyan-400 via-sky-300 to-blue-200',        border: '#06b6d4', header: '#0891b2', symbol: '❄️' },
  fighting: { name: 'Lucha',     gradient: 'from-red-700 via-red-500 to-orange-400',       border: '#b91c1c', header: '#7f1d1d', symbol: '👊' },
  poison:   { name: 'Veneno',    gradient: 'from-purple-500 via-violet-400 to-fuchsia-300',border: '#a855f7', header: '#7e22ce', symbol: '☠️' },
  ground:   { name: 'Tierra',    gradient: 'from-amber-600 via-yellow-500 to-amber-300',   border: '#d97706', header: '#92400e', symbol: '🌍' },
  flying:   { name: 'Volador',   gradient: 'from-indigo-400 via-sky-300 to-blue-200',      border: '#818cf8', header: '#4338ca', symbol: '🌀' },
  psychic:  { name: 'Psíquico',  gradient: 'from-pink-500 via-rose-400 to-pink-300',       border: '#ec4899', header: '#be185d', symbol: '🔮' },
  bug:      { name: 'Bicho',     gradient: 'from-lime-500 via-green-400 to-lime-300',      border: '#84cc16', header: '#4d7c0f', symbol: '🐛' },
  rock:     { name: 'Roca',      gradient: 'from-stone-500 via-stone-400 to-amber-300',    border: '#78716c', header: '#44403c', symbol: '🪨' },
  ghost:    { name: 'Fantasma',  gradient: 'from-purple-800 via-violet-600 to-purple-400', border: '#7c3aed', header: '#4c1d95', symbol: '👻' },
  dragon:   { name: 'Dragón',    gradient: 'from-blue-700 via-indigo-500 to-violet-400',   border: '#4f46e5', header: '#1e1b4b', symbol: '🐉' },
  dark:     { name: 'Siniestro', gradient: 'from-zinc-700 via-zinc-600 to-stone-500',      border: '#3f3f46', header: '#18181b', symbol: '🌑' },
  steel:    { name: 'Acero',     gradient: 'from-slate-500 via-slate-400 to-zinc-300',     border: '#64748b', header: '#334155', symbol: '⚙️' },
  fairy:    { name: 'Hada',      gradient: 'from-pink-400 via-rose-300 to-fuchsia-200',    border: '#f472b6', header: '#9d174d', symbol: '✨' },
}

const STAT_TO_MOVE = {
  'attack':          { name: 'Golpe Rápido',    effect: 'Ataque directo.' },
  'special-attack':  { name: 'Rayo de Energía', effect: 'Ataque especial.' },
  'speed':           { name: 'Aceleración',     effect: 'Sorprende al rival.' },
  'defense':         { name: 'Escudo Duro',     effect: 'Reduce daño recibido.' },
  'special-defense': { name: 'Barrera Mágica',  effect: 'Resistencia especial.' },
  'hp':              { name: 'Recuperación',    effect: 'Restaura puntos de vida.' },
}

export const TYPE_META = TYPE_TCG

const transformPokemon = (data) => {
  const statsTotal = data.stats.reduce((sum, s) => sum + s.base_stat, 0)
  const rarity = getRarity(statsTotal)
  const price = calculatePrice(statsTotal)
  const bestStat = data.stats.reduce((a, b) => a.base_stat > b.base_stat ? a : b)

  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other?.['official-artwork']?.front_default ||
      data.sprites.front_default,
    types: data.types.map(t => t.type.name),
    stats: data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
    statsTotal,
    hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat || 50,
    rarity,
    price,
    height: data.height / 10,
    weight: data.weight / 10,
    bestMove: {
      ...STAT_TO_MOVE[bestStat.stat.name],
      damage: bestStat.base_stat,
    },
  }
}

export const fetchPokemonPage = async (offset = 0, limit = 40) => {
  const listRes = await axios.get(`${POKEAPI_BASE}/pokemon?limit=${limit}&offset=${offset}`)
  const list = listRes.data.results
  const total = listRes.data.count
  const responses = await Promise.all(list.map(p => axios.get(p.url)))
  return { total, cards: responses.map(({ data }) => transformPokemon(data)) }
}

export const fetchPokemonCards = async (count = 40) => {
  const { cards } = await fetchPokemonPage(0, count)
  return cards
}

// Busca un Pokémon por nombre o número directamente en la API
export const searchPokemonByName = async (query) => {
  const q = query.trim().toLowerCase()
  if (!q) return null
  try {
    const res = await axios.get(`${POKEAPI_BASE}/pokemon/${q}`)
    return transformPokemon(res.data)
  } catch {
    return null
  }
}

// Carga todos los Pokémon de un tipo específico directamente desde la API
export const fetchPokemonByType = async (type, offset = 0, limit = 40) => {
  const typeRes = await axios.get(`${POKEAPI_BASE}/type/${type}`)
  const allEntries = typeRes.data.pokemon
    .map(p => p.pokemon)
    .filter(p => {
      const id = parseInt(p.url.split('/').filter(Boolean).pop())
      return id > 0 && id <= 10000
    })

  const total = allEntries.length
  const slice = allEntries.slice(offset, offset + limit)
  const responses = await Promise.allSettled(slice.map(p => axios.get(p.url)))
  const cards = responses
    .filter(r => r.status === 'fulfilled')
    .map(r => transformPokemon(r.value.data))

  return { total, cards }
}
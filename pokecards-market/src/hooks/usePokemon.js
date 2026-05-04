import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchPokemonPage, fetchPokemonByType, searchPokemonByName, searchPokemonPartial } from '../utils/api'

const PAGE_SIZE = 40

export const usePokemonCards = () => {
  const [cards, setCards] = useState([])
  const [searchResults, setSearchResults] = useState(null)
  const [suggestions, setSuggestions] = useState([]) // ← nuevo
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [typeFilter, setTypeFilter] = useState('all')
  const hasMore = cards.length < total
  const searchTimer = useRef(null)

  const loadInitial = useCallback(async (type = 'all') => {
    try {
      setLoading(true)
      setError(null)
      setCards([])
      setSearchResults(null)
      setOffset(0)

      if (type === 'all') {
        const { cards: data, total: t } = await fetchPokemonPage(0, PAGE_SIZE)
        setCards(data)
        setTotal(t)
        setOffset(PAGE_SIZE)
      } else {
        const { cards: data, total: t } = await fetchPokemonByType(type, 0, PAGE_SIZE)
        setCards(data)
        setTotal(t)
        setOffset(PAGE_SIZE)
      }
    } catch (err) {
      setError('No se pudieron cargar las cartas. Verifica tu conexión.')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return
    try {
      setLoadingMore(true)
      let newCards
      if (typeFilter === 'all') {
        const result = await fetchPokemonPage(offset, PAGE_SIZE)
        newCards = result.cards
      } else {
        const result = await fetchPokemonByType(typeFilter, offset, PAGE_SIZE)
        newCards = result.cards
      }
      setCards(prev => [...prev, ...newCards])
      setOffset(prev => prev + PAGE_SIZE)
    } catch (err) {
      console.error('Error cargando más:', err)
    } finally {
      setLoadingMore(false)
    }
  }, [offset, loadingMore, hasMore, typeFilter])

  const changeTypeFilter = useCallback((type) => {
    setTypeFilter(type)
    setSearchResults(null)
    setSuggestions([])
    loadInitial(type)
  }, [loadInitial])

  const reload = useCallback(() => {
    loadInitial(typeFilter)
  }, [loadInitial, typeFilter])

  // Búsqueda parcial: muestra sugerencias mientras escribe
  const handleSearch = useCallback((query) => {
    if (searchTimer.current) clearTimeout(searchTimer.current)

    if (!query.trim()) {
      setSearchResults(null)
      setSuggestions([])
      return
    }

    searchTimer.current = setTimeout(async () => {
      setSearching(true)
      try {
        const matches = await searchPokemonPartial(query)
        setSuggestions(matches) // lista de { name, url }
        setSearchResults(null)  // limpia resultados anteriores hasta que elijan
      } catch {
        setSuggestions([])
      } finally {
        setSearching(false)
      }
    }, 300)
  }, [])

  // Cuando el usuario elige una sugerencia, trae los datos completos
  const selectSuggestion = useCallback(async (name) => {
    setSuggestions([])
    setSearching(true)
    try {
      const result = await searchPokemonByName(name)
      setSearchResults(result ? [result] : [])
    } catch {
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }, [])

  useEffect(() => { loadInitial('all') }, [loadInitial])

  return {
    cards,
    searchResults,
    suggestions,
    loading,
    loadingMore,
    searching,
    error,
    reload,
    loadMore,
    hasMore,
    total,
    typeFilter,
    changeTypeFilter,
    handleSearch,
    selectSuggestion,
  }
}

export const usePurchasedCards = () => {
  const STORAGE_KEY = 'pokecards-market:purchased'

  const [purchased, setPurchased] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(purchased))
  }, [purchased])

  const addPurchase = (card) => {
    setPurchased(prev => {
      if (prev.some(p => p.id === card.id)) return prev
      return [...prev, {
        id: card.id, name: card.name, image: card.image,
        price: card.price, rarity: card.rarity,
        purchasedAt: new Date().toISOString()
      }]
    })
  }

  const isPurchased = (cardId) => purchased.some(p => p.id === cardId)
  const clearAll = () => setPurchased([])

  return { purchased, addPurchase, isPurchased, clearAll }
}
import { TYPE_TCG } from '../utils/api'

const RarityStars = ({ stars, legendary }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`w-2.5 h-2.5 ${i < stars ? legendary ? 'text-amber-400' : 'text-white' : 'text-white/25'}`}
        viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

const StatBar = ({ value }) => {
  const pct = Math.min(100, (value / 255) * 100)
  const color = value >= 120 ? 'bg-emerald-400' : value >= 80 ? 'bg-sky-400' : value >= 50 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="h-1 bg-white/20 rounded-full overflow-hidden flex-1">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
    </div>
  )
}

const PokemonCard = ({ card, purchased, onSelect, index = 0 }) => {
  const tcg = TYPE_TCG[card.types[0]] || TYPE_TCG.normal
  const isLegendary = card.rarity.key === 'legendary'
  const isHolo = isLegendary || card.rarity.key === 'epic'

  return (
    <article
      onClick={() => !purchased && onSelect(card)}
      className={`
        tcg-card group relative rounded-2xl overflow-hidden transition-all duration-300 select-none
        ${purchased ? 'ring-2 ring-emerald-400 ring-offset-2' : 'cursor-pointer hover:-translate-y-2 hover:scale-[1.02]'}
        ${isHolo ? 'holo-card' : ''}
        animate-slide-up
      `}
      style={{
        animationDelay: `${(index % 20) * 30}ms`,
        boxShadow: purchased
          ? '0 0 0 2px #34d399, 0 8px 32px rgba(52,211,153,0.3)'
          : isLegendary
          ? '0 8px 32px rgba(251,191,36,0.4), 0 2px 8px rgba(0,0,0,0.3)'
          : isHolo
          ? '0 8px 24px rgba(167,139,250,0.35), 0 2px 8px rgba(0,0,0,0.25)'
          : '0 4px 16px rgba(0,0,0,0.2)',
      }}
    >
      {/* Fondo gradiente por tipo */}
      <div className={`absolute inset-0 bg-gradient-to-b ${tcg.gradient} opacity-90`} />

      {/* Patrón de puntos */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />

      {/* Brillo holográfico */}
      {isHolo && <div className="absolute inset-0 holo-shine pointer-events-none" />}

      {/* Contenido */}
      <div className="relative z-10 flex flex-col" style={{ minHeight: '340px' }}>

        {/* Header */}
        <div className="px-3 pt-3 pb-2 flex items-start justify-between" style={{ background: `${tcg.header}cc` }}>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-black text-white capitalize leading-none text-[13px] truncate drop-shadow">
              {card.name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-white/80 text-[10px]">{tcg.symbol}</span>
              <span className="text-white/80 text-[9px] uppercase tracking-wider font-bold">{tcg.name}</span>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2 text-right">
            <div className="text-white/60 text-[8px] uppercase tracking-widest leading-none">HP</div>
            <div className="font-black text-white text-lg leading-none">{card.hp}</div>
          </div>
        </div>

        {/* Imagen */}
        <div className="relative flex-1 flex items-center justify-center px-4 py-2">
          <div className="w-full rounded-lg overflow-hidden"
            style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.3)', aspectRatio: '1' }}>
            <img src={card.image} alt={card.name} loading="lazy"
              className="w-full h-full object-contain p-2 drop-shadow-lg transition-transform duration-500 group-hover:scale-110" />
          </div>

          {purchased && (
            <div className="absolute top-4 right-6 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500 shadow-lg">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[9px] font-bold text-white uppercase">Tuya</span>
            </div>
          )}

          <span className="absolute bottom-3 right-6 font-mono text-xs text-white/30 font-bold">
            #{String(card.id).padStart(4, '0')}
          </span>
        </div>

        {/* Movimiento / Stats */}
        <div className="mx-3 mb-2 rounded-lg px-3 py-2"
          style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-white font-black text-[11px] uppercase tracking-wide">{card.bestMove?.name}</span>
            <span className="font-black text-white text-base leading-none">{card.bestMove?.damage}</span>
          </div>
          <p className="text-white/60 text-[9px] leading-tight mb-2">{card.bestMove?.effect}</p>
          {card.stats.slice(0, 3).map(s => (
            <div key={s.name} className="flex items-center gap-1.5 mb-0.5">
              <span className="text-white/40 text-[8px] w-5 uppercase">{s.name.slice(0, 3)}</span>
              <StatBar value={s.value} />
              <span className="text-white/60 text-[8px] w-5 text-right">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-3 py-2 flex items-center justify-between" style={{ background: `${tcg.header}dd` }}>
          <RarityStars stars={card.rarity.stars} legendary={isLegendary} />
          <span className="text-white/50 text-[8px] uppercase tracking-wider">{card.rarity.label}</span>
          {purchased ? (
            <span className="text-emerald-300 text-[10px] font-bold">✓ Colección</span>
          ) : (
            <div className="text-right">
              <div className="font-black text-white text-sm leading-none">${card.price.toFixed(2)}</div>
              <div className="text-white/50 text-[8px]">USD</div>
            </div>
          )}
        </div>

      </div>
    </article>
  )
}

export default PokemonCard
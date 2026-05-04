const Hero = ({ totalCards, ownedCount, loadedCount }) => {
  const completionPct = totalCards > 0 ? Math.round((ownedCount / totalCards) * 100) : 0

  return (
    <section className="relative overflow-hidden mb-8 animate-fade-in">
      <div className="grid lg:grid-cols-4 gap-4">

        <div className="lg:col-span-3 relative bg-ink-900 rounded-3xl p-7 lg:p-9 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-brand-500/25 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 left-0 w-60 h-60 bg-gold-500/15 rounded-full blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-white/90">
                PokéAPI · {totalCards.toLocaleString()} Pokémon · {loadedCount} cargados
              </span>
            </div>
            <h2 className="font-display font-black text-3xl lg:text-5xl text-white leading-[1.05] mb-3">
              Colecciona las <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                {totalCards.toLocaleString()}+ cartas
              </span>
            </h2>
            <p className="text-ink-300 text-base max-w-xl leading-relaxed">
              Explora todas las generaciones Pokémon. Desbloquea cartas únicas con pagos seguros via PayPal Sandbox.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: 'Total Pokémon', value: totalCards.toLocaleString(), icon: '🎴' },
                { label: 'Generaciones',  value: '9',                         icon: '🌍' },
                { label: 'Tu colección',  value: ownedCount,                  icon: '⭐' },
              ].map(s => (
                <div key={s.label} className="bg-white/8 rounded-2xl p-3">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="font-black text-white text-xl leading-none">{s.value}</div>
                  <div className="text-ink-400 text-[11px] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-card border border-ink-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black tracking-widest uppercase text-ink-500">Tu progreso</span>
              <span className="text-2xl">📋</span>
            </div>
            <div className="mb-1">
              <span className="font-black text-5xl text-ink-900">{ownedCount}</span>
              <span className="font-bold text-xl text-ink-300"> / {totalCards.toLocaleString()}</span>
            </div>
            <p className="text-xs text-ink-500 mb-4">cartas en tu colección</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-ink-600">Completado</span>
              <span className="text-brand-600">{completionPct}%</span>
            </div>
            <div className="h-2.5 bg-ink-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-500 to-brand-700 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(completionPct, 1)}%` }} />
            </div>
            <p className="text-[10px] text-ink-400 text-center">{totalCards - ownedCount} por desbloquear</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
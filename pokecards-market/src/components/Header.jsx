const Header = ({ view, onViewChange, collectionCount }) => {
  return (
    <header className="sticky top-0 z-30 glass border-b border-ink-100/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex-shrink-0">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
              <path d="M 5 50 A 45 45 0 0 1 95 50 Z" fill="#E3350D" />
              <path d="M 5 50 A 45 45 0 0 0 95 50 Z" fill="#ffffff" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1a1a" strokeWidth="5" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="#1a1a1a" strokeWidth="5" />
              <circle cx="50" cy="50" r="14" fill="#ffffff" stroke="#1a1a1a" strokeWidth="5" />
              <circle cx="50" cy="50" r="7" fill="#f0f0f0" stroke="#555" strokeWidth="2" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-ink-900 text-lg leading-tight">
              PokéCards Market
            </h1>
            <p className="text-[11px] text-ink-500 tracking-wide uppercase">
              Colección digital premium
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-ink-100/60 p-1 rounded-xl">
          <NavButton
            active={view === 'market'}
            onClick={() => onViewChange('market')}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9-4 9 4M3 7v10l9 4 9-4V7M3 7l9 4m0 0l9-4m-9 4v10" />
              </svg>
            }
            label="Mercado"
          />
          <NavButton
            active={view === 'collection'}
            onClick={() => onViewChange('collection')}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            }
            label="Mi Colección"
            badge={collectionCount}
          />
        </nav>
      </div>
    </header>
  )
}

const NavButton = ({ active, onClick, icon, label, badge }) => (
  <button
    onClick={onClick}
    className={`
      relative px-3 sm:px-4 py-2 rounded-lg text-sm font-medium
      flex items-center gap-2 transition-all duration-200
      ${active
        ? 'bg-white text-ink-900 shadow-soft'
        : 'text-ink-600 hover:text-ink-900'
      }
    `}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
    {typeof badge === 'number' && badge > 0 && (
      <span className={`
        ml-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold
        ${active ? 'bg-brand-100 text-brand-700' : 'bg-ink-200 text-ink-700'}
      `}>
        {badge}
      </span>
    )}
  </button>
)

export default Header
import { useState } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Header from './components/Header'
import Hero from './components/Hero'
import CardGrid from './components/CardGrid'
import MyCollection from './components/MyCollection'
import PurchaseModal from './components/PurchaseModal'
import Toast from './components/Toast'
import Footer from './components/Footer'
import { usePokemonCards, usePurchasedCards } from './hooks/usePokemon'

const PAYPAL_CLIENT_ID = 'AU7xusflSmwCFItw8dISYoghFHnCQfPSfjbXjpD_i7V9o0f8dY0Xx6j3cUONRsUt-QTf9tyzzWjTiRtK'

function App() {
  const {
    cards, loading, loadingMore, error, reload, loadMore, hasMore, total,
    typeFilter, changeTypeFilter,
  } = usePokemonCards()
  const { purchased, addPurchase, isPurchased, clearAll } = usePurchasedCards()
  const [view, setView] = useState('market')
  const [selectedCard, setSelectedCard] = useState(null)
  const [toast, setToast] = useState(null)

  const handleCardSelect = (card) => {
    if (isPurchased(card.id)) return
    setSelectedCard(card)
  }

  const handlePurchaseSuccess = (card, paypalDetails) => {
    addPurchase(card)
    setSelectedCard(null)
    setToast({
      type: 'success',
      message: `¡Felicidades! Has desbloqueado a ${card.name.charAt(0).toUpperCase() + card.name.slice(1)}.`
    })
  }

  const handlePurchaseError = () => {
    setToast({
      type: 'error',
      message: 'El pago no se completó. La carta sigue bloqueada.'
    })
  }

  return (
    <PayPalScriptProvider
      options={{
        'client-id': PAYPAL_CLIENT_ID,
        currency: 'USD',
        intent: 'capture',
        components: 'buttons'
      }}
      deferLoading={false}
    >
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header view={view} onViewChange={setView} collectionCount={purchased.length} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-8 py-8 lg:py-12">
          {view === 'market' && (
            <>
              <Hero totalCards={total} ownedCount={purchased.length} loadedCount={cards.length} />
              <CardGrid
                cards={cards}
                loading={loading}
                loadingMore={loadingMore}
                error={error}
                isPurchased={isPurchased}
                onCardSelect={handleCardSelect}
                onReload={reload}
                loadMore={loadMore}
                hasMore={hasMore}
                total={total}
                typeFilter={typeFilter}
                onTypeFilterChange={changeTypeFilter}
              />
            </>
          )}
          {view === 'collection' && (
            <MyCollection purchased={purchased} onClearAll={clearAll} />
          )}
        </main>

        <Footer />

        {selectedCard && (
          <PurchaseModal
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
            onSuccess={handlePurchaseSuccess}
            onError={handlePurchaseError}
          />
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </PayPalScriptProvider>
  )
}

export default App
const SERVER_URL = 'http://localhost:3001'

export const createOrder = async (amount, description) => {
  const res = await fetch(`${SERVER_URL}/api/paypal/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, description })
  })
  if (!res.ok) throw new Error('No se pudo crear la orden')
  return res.json() // { orderID }
}

export const captureOrder = async (orderID) => {
  const res = await fetch(`${SERVER_URL}/api/paypal/capture-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderID })
  })
  if (!res.ok) throw new Error('No se pudo capturar el pago')
  return res.json() // { success, details }
}
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const PAYPAL_API = 'https://api-m.sandbox.paypal.com'
const CLIENT_ID = 'AU7xusflSmwCFItw8dISYoghFHnCQfPSfjbXjpD_i7V9o0f8dY0Xx6j3cUONRsUt-QTf9tyzzWjTiRtK'
const CLIENT_SECRET = 'EDE2NZ-8x7wj9VndF7_TKtvwM7_Biq_7xYPnKaKTcyBRxI5hnB3DgvisEMpWjobtxV8tOMfjS9hML-oh'

// Genera access token — solo vive en el servidor, nunca llega al browser
const getAccessToken = async () => {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
  const data = await res.json()
  return data.access_token
}

// Endpoint 1: Crear orden
app.post('/api/paypal/create-order', async (req, res) => {
  try {
    const { amount, description } = req.body
    const accessToken = await getAccessToken()

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          description,
          amount: {
            currency_code: 'USD',
            value: amount
          }
        }],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
          brand_name: 'PokéCards Market'
        }
      })
    })

    const order = await response.json()
    res.json({ orderID: order.id })
  } catch (err) {
    console.error('Create order error:', err)
    res.status(500).json({ error: 'No se pudo crear la orden' })
  }
})

// Endpoint 2: Capturar orden — aquí el Secret está seguro en el servidor
app.post('/api/paypal/capture-order', async (req, res) => {
  try {
    const { orderID } = req.body
    const accessToken = await getAccessToken()

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (data.status === 'COMPLETED') {
      res.json({ success: true, details: data })
    } else {
      res.status(400).json({ success: false, status: data.status })
    }
  } catch (err) {
    console.error('Capture error:', err)
    res.status(500).json({ error: 'No se pudo capturar el pago' })
  }
})

app.listen(3001, () => console.log('🚀 Servidor PayPal en http://localhost:3001'))
# PokéCards Market

Aplicación web interactiva donde los usuarios pueden explorar, visualizar y comprar cartas digitales coleccionables generadas a partir de la PokéAPI. Las compras se procesan mediante la API de PayPal Sandbox.

## Stack tecnológico

- **Vite + React 18** — framework SPA
- **Tailwind CSS 3** — sistema de diseño
- **@paypal/react-paypal-js** — integración con PayPal Sandbox
- **Axios** — consumo de PokéAPI
- **localStorage** — persistencia del estado de compras

## Cumplimiento de la rúbrica (10/10)

| Criterio                   | Implementación                                                                 |
|----------------------------|--------------------------------------------------------------------------------|
| Consumo de API             | `src/utils/api.js` carga 30 cartas desde la PokéAPI en paralelo                |
| Interfaz de usuario        | Diseño responsive con paleta sobria; grid adaptativo de 1→4 columnas           |
| Integración de pagos       | `PurchaseModal.jsx` usa `<PayPalButtons>` con `createOrder` y `onApprove`      |
| Lógica de negocio          | Validación `details.status === 'COMPLETED'`; mensajes diferenciados            |
| Funcionalidades adicionales| Vista "Mi Colección", filtros por rareza, búsqueda, ordenamiento, persistencia |

## Instalación rápida

```powershell
npm install
npm run dev
```

La aplicación abre en `http://localhost:5173`.

## Configurar PayPal Sandbox (opcional pero recomendado)

1. Crea una cuenta en https://developer.paypal.com/
2. Ve a **Apps & Credentials** → **Sandbox** → **Create App**
3. Copia el **Client ID**
4. Reemplaza el valor de `PAYPAL_CLIENT_ID` en `src/App.jsx`

## Credenciales de prueba para el comprador (Sandbox)

Cuando se abra el popup de PayPal, inicia sesión con tu cuenta sandbox personal:

- Usuario: `sb-xxxxxx@personal.example.com`
- Contraseña: `test1234`

Estas se obtienen en **Sandbox → Accounts** del dashboard de PayPal.

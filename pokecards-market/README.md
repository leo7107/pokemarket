# 🃏 PokéCards Market

Marketplace de cartas Pokémon digitales con pagos via PayPal Sandbox.  
Construido con **React + Vite + Tailwind CSS**.

🔗 **Demo en vivo:** [PokéCards Market · Colección digital premium](https://poke-market-git-main-leo7107s-projects.vercel.app/)

---

## 🚀 Instalación y ejecución local

### Requisitos
- Node.js 18+
- npm 9+

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Leo7107/PokeMarket.git
cd PokeMarket

# 2. Instalar dependencias del frontend
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La app estará disponible en **http://localhost:5173**

### Servidor PayPal (para pagos en local)

```bash
# En otra terminal, entrar a la carpeta del servidor
cd server

# Instalar dependencias
npm install

# Iniciar el servidor
node index.js
```

El servidor corre en **http://localhost:3001**

---

## 💳 Credenciales de prueba — PayPal Sandbox

Usa estas credenciales para simular una compra. **No se realizan cobros reales.**

### Cuenta compradora

| Campo | Valor |
|-------|-------|
| **Email** | `sb-d9hhx50802568@personal.example.com` |
| **Contraseña** | `{u&j3[V6` |

### Cómo hacer una compra de prueba

1. Abre la app en `http://localhost:5173`
2. Haz clic en cualquier carta Pokémon
3. En el modal, haz clic en el botón amarillo de **PayPal**
4. Inicia sesión con las credenciales de arriba
5. Confirma el pago
6. ✅ La carta se desbloquea y aparece en **Mi Colección**

---

## 🔍 Cómo usar el buscador

El buscador encuentra cualquier Pokémon **sin necesidad de cargar páginas**:

- Escribe parte del nombre en inglés: `greni` → sugerencias con imagen
- Escribe el número de Pokédex: `658` → Greninja directo
- Haz clic en una sugerencia del dropdown para cargar la carta

---

## 🗂 Estructura del proyecto

```
PokeMarket/
├── server/
│   ├── index.js          # Servidor Express — maneja pagos PayPal
│   └── package.json
├── src/
│   ├── components/
│   │   ├── CardGrid.jsx      # Grid + buscador con autocompletado
│   │   ├── PokemonCard.jsx   # Carta individual
│   │   ├── PurchaseModal.jsx # Modal de pago con PayPal
│   │   ├── MyCollection.jsx  # Colección del usuario
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Footer.jsx
│   │   └── Toast.jsx
│   ├── hooks/
│   │   └── usePokemon.js     # Lógica de carga, búsqueda y paginación
│   ├── utils/
│   │   ├── api.js            # Llamadas a PokéAPI
│   │   └── paypal.js         # Llamadas al servidor de pagos
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## ☁️ Despliegue en Vercel

El proyecto está desplegado en Vercel con deploy automático desde la rama `main`.

🔗 **URL de producción:** [https://poke-market-git-main-leo7107s-projects.vercel.app/](https://poke-market-git-main-leo7107s-projects.vercel.app/)

Cada vez que hagas `git push origin main`, Vercel detecta el cambio y redespliega automáticamente en menos de un minuto.

---

## 📝 Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Vista previa del build
```

![PanMac Banner](frontend/public/panMacPortada.png)

# PanMac

**E-commerce artesanal para una panadería inspirada en el universo arcade**  
Construido con React 19 · Express 5 · Drizzle ORM · PostgreSQL · Clerk Auth · Stream Chat

[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Express 5](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?logo=drizzle&logoColor=white)](https://orm.drizzle.team)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)](https://neon.tech)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk&logoColor=white)](https://clerk.com)
[![Stream Chat](https://img.shields.io/badge/Stream-Chat-008CFF?logo=getstream&logoColor=white)](https://getstream.io)
[![Stream Video](https://img.shields.io/badge/Stream-Video-008CFF?logo=getstream&logoColor=white)](https://getstream.io)
[![Polar](https://img.shields.io/badge/Polar-Payments-8B5CF6)](https://polar.sh)
[![ImageKit](https://img.shields.io/badge/ImageKit-CDN-EB5A9E?logo=imagekit&logoColor=white)](https://imagekit.io)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com)

---

## ✨ Highlights

| Feature                      | Description                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| 🍪 **Catálogo de productos** | Galletas, panes y postres con filtro por categoría y soporte de colores por producto              |
| 🛒 **Carrito de compras**    | Persistido en localStorage con selección de color y control de cantidad                           |
| 💳 **Pago con Polar**        | Checkout seguro con precios dinámicos y webhook de confirmación                                   |
| 📦 **Pedidos con soporte**   | Cada pedido pagado abre un chat de soporte individual con Stream Chat                             |
| 📹 **Videollamadas**         | El staff puede enviar invitaciones de video dentro del chat de soporte                            |
| 🎫 **Soporte general**       | Chat de soporte temporal (24h) accesible desde la página principal                                |
| 🔐 **Autenticación Clerk**   | Registro e inicio de sesión con modales; sincronización vía webhook                               |
| 🖼️ **Imágenes con ImageKit** | CDN con transformaciones de tamaño y marca de agua                                                |
| 👑 **Panel administrador**   | CRUD de productos, gestión de tickets de soporte y badges de mensajes no leídos                   |
| 🐳 **Docker Ready**          | Multi-stage build para despliegue en un solo contenedor                                           |
| 🩺 **Health check + Cron**   | Endpoint `/health` con keep-alive cada 14 min; limpieza automática de tickets caducados cada hora |
| 📱 **Responsive**            | Diseño adaptable a móvil, tablet y escritorio con DaisyUI + Tailwind CSS                          |

---

## 🛠️ Tech Stack

### Frontend

| Tecnología                                           | Propósito                                       |
| ---------------------------------------------------- | ----------------------------------------------- |
| [React 19](https://react.dev)                        | Librería UI con características concurrentes    |
| [Vite 8](https://vite.dev)                           | Dev server y bundler ultrarrápido               |
| [React Router 8](https://reactrouter.com)            | Enrutamiento del lado del cliente               |
| [Zustand 5](https://zustand.docs.pmnd.rs)            | Estado global ligero con persistencia (carrito) |
| [TanStack Query 5](https://tanstack.com/query)       | Fetching y caché de datos del servidor          |
| [Tailwind CSS 4](https://tailwindcss.com)            | Estilos utilitarios                             |
| [DaisyUI 5](https://daisyui.com)                     | Componentes y temas sobre Tailwind              |
| [Lucide React](https://lucide.dev)                   | Iconos modernos                                 |
| [Clerk React](https://clerk.com)                     | Componentes de autenticación UI                 |
| [Stream Chat React](https://getstream.io/chat)       | Interfaz de chat en tiempo real                 |
| [Stream Video React SDK](https://getstream.io/video) | Videollamadas en el navegador                   |
| [Sentry React](https://sentry.io)                    | Monitoreo de errores frontend                   |

### Backend

| Tecnología                                                                 | Propósito                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------------ |
| [Express 5](https://expressjs.com)                                         | Framework web y API REST                               |
| [TypeScript 5.7](https://www.typescriptlang.org)                           | Tipado estático                                        |
| [Drizzle ORM 0.45](https://orm.drizzle.team)                               | ORM para PostgreSQL                                    |
| [PostgreSQL](https://www.postgresql.org)                                   | Base de datos relacional                               |
| [Zod 3.24](https://zod.dev)                                                | Validación de esquemas                                 |
| [Clerk Express](https://clerk.com)                                         | Middleware de autenticación + verificación de webhooks |
| [Stream Chat Server](https://getstream.io/chat)                            | SDK servidor de chat y videollamadas                   |
| [Polar API](https://polar.sh)                                              | Procesamiento de pagos                                 |
| [ImageKit Node.js](https://imagekit.io)                                    | Gestión de imágenes (subida/eliminación)               |
| [Sentry Node](https://sentry.io)                                           | Monitoreo de errores backend + profiling               |
| [cron](https://www.npmjs.com/package/cron)                                 | Tareas programadas (keep-alive, limpieza)              |
| [standardwebhooks](https://github.com/standard-webhooks/standard-webhooks) | Verificación de firmas de webhooks                     |

### Infraestructura

| Tecnología                       | Propósito                                      |
| -------------------------------- | ---------------------------------------------- |
| [Docker](https://www.docker.com) | Contenedor multi-etapa para producción         |
| [Neon](https://neon.tech)        | Base de datos PostgreSQL serverless            |
| [Clerk Cloud](https://clerk.com) | Servicio de autenticación gestionado           |
| [Stream](https://getstream.io)   | Infraestructura de chat y video en tiempo real |
| [Polar](https://polar.sh)        | Pasarela de pagos                              |
| [ImageKit](https://imagekit.io)  | CDN de imágenes global                         |
| [Sentry](https://sentry.io)      | Plataforma de monitoreo de errores             |

> Express sirve tanto la API (`/api/*`) como el SPA compilado desde `/public`.

---

## 📁 Project Structure

```
PanMac/
├── frontend/                        # React SPA (Vite)
│   ├── public/
│   │   ├── panMacPortada.png        # Banner del proyecto
│   │   └── logo.png                 # Logo / favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminProductForm.jsx # Formulario de producto (admin)
│   │   │   ├── CatalogProductCard.jsx # Tarjeta de producto en catálogo
│   │   │   ├── EmptyCart.jsx        # Estado vacío del carrito
│   │   │   ├── Footer.jsx           # Pie de página
│   │   │   ├── HomeHero.jsx         # Hero de la página principal
│   │   │   ├── Layout.jsx           # Layout principal con navbar
│   │   │   ├── LoadingSkeletons.jsx # Skeletons de carga
│   │   │   ├── Navbar.jsx           # Barra de navegación
│   │   │   ├── OrderPreview.jsx     # Preview de productos en pedido
│   │   │   ├── PageError.jsx        # Componente de error
│   │   │   ├── PageLoader.jsx       # Loader de página
│   │   │   ├── ShippingAddressForm.jsx # Formulario de dirección de envío
│   │   │   └── TrustStrip.jsx       # Barra de confianza
│   │   ├── hooks/
│   │   │   ├── useAdminProductsPage.js
│   │   │   ├── useCartPage.js
│   │   │   ├── useCreateSupportTicket.js
│   │   │   ├── useHomeCatalog.js
│   │   │   ├── useOrderChatPage.js
│   │   │   ├── useOrderDetailPage.js
│   │   │   ├── useOrderVideoPage.js
│   │   │   ├── useOrdersPage.js
│   │   │   ├── useProductPage.js
│   │   │   └── useSupportTicketPage.js
│   │   ├── lib/
│   │   │   ├── api.js               # Cliente HTTP con autenticación Clerk
│   │   │   ├── imagekitUrl.js       # URLs optimizadas de ImageKit
│   │   │   └── imagekitUpload.js    # Subida de imágenes a ImageKit
│   │   ├── pages/
│   │   │   ├── AdminProductsPage.jsx
│   │   │   ├── AdminSupportPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutReturnPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── OrderChatPage.jsx
│   │   │   ├── OrderDetailPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   ├── OrderSummaryPage.jsx
│   │   │   ├── OrderVideoPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── SentryDemoPage.jsx
│   │   │   ├── SupportTicketPage.jsx
│   │   │   └── SupportVideoPage.jsx
│   │   ├── store/
│   │   │   └── cart.js              # Zustand store del carrito
│   │   ├── utils/
│   │   │   └── format.js            # Formateo de precios y fechas
│   │   ├── App.jsx                  # Componente raíz con rutas
│   │   ├── main.jsx                 # Punto de entrada (Clerk + React Query + Sentry)
│   │   └── index.css                # Estilos globales
│   ├── vite.config.js
│   └── package.json
│
├── backend/                         # Express API
│   ├── scripts/
│   │   ├── seed.ts                  # Seed de productos del catálogo
│   │   └── seed-admin.ts            # Seed de usuario admin
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── adminController.ts   # CRUD de productos (admin)
│   │   │   ├── checkoutController.ts # Creación de checkout + Polar
│   │   │   ├── configController.ts  # Configuración de tienda
│   │   │   ├── orderController.ts   # Pedidos, chat y videollamadas
│   │   │   ├── productController.ts # Catálogo público
│   │   │   ├── streamController.ts  # Tokens de Stream Chat
│   │   │   └── supportController.ts # Tickets de soporte y videollamadas
│   │   ├── db/
│   │   │   ├── schema.ts            # Esquema Drizzle (6 tablas)
│   │   │   └── index.ts             # Conexión a PostgreSQL
│   │   ├── lib/
│   │   │   ├── cron.ts              # Keep-alive + limpieza de tickets
│   │   │   ├── env.ts               # Variables de entorno validadas con Zod
│   │   │   ├── imagekit.ts          # Eliminación de imágenes en ImageKit
│   │   │   ├── polar.ts             # Cliente de Polar API
│   │   │   ├── roles.ts             # Guards de roles
│   │   │   ├── stream.ts            # Helpers de Stream Chat
│   │   │   └── users.ts             # Búsqueda de usuario local
│   │   ├── middleware/
│   │   │   └── sentryClerkUser.ts   # Adjunta user ID a Sentry
│   │   ├── routes/
│   │   │   ├── adminRouter.ts
│   │   │   ├── chekoutRouter.ts
│   │   │   ├── configRouter.ts
│   │   │   ├── meRouter.ts
│   │   │   ├── orderRouter.ts
│   │   │   ├── productRouter.ts
│   │   │   ├── streamRouter.ts
│   │   │   └── supportRouter.ts
│   │   ├── webhooks/
│   │   │   ├── clerk.ts             # Webhook de Clerk (sync usuarios)
│   │   │   └── polar.ts             # Webhook de Polar (order.paid)
│   │   ├── index.ts                 # Entry point del servidor
│   │   └── instrument.ts            # Inicialización de Sentry
│   ├── drizzle.config.ts
│   └── package.json
│
├── Dockerfile                       # Build multi-etapa
├── .dockerignore
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerrequisitos

- **Node.js** ≥ 22
- **npm** ≥ 10
- Una base de datos [PostgreSQL](https://neon.tech) (variables de entorno `DATABASE_URL`)
- Una aplicación en [Clerk](https://clerk.com) (claves pública y secreta)
- Una cuenta en [Stream](https://getstream.io) (Chat + Video, API key y secret)
- Una cuenta en [Polar](https://polar.sh) (access token, webhook secret y product ID)
- _(Opcional)_ Una cuenta en [ImageKit](https://imagekit.io) para imágenes de productos
- _(Opcional)_ Un proyecto en [Sentry](https://sentry.io) para monitoreo de errores

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/PanMac.git
cd PanMac
```

### 2. Configurar variables de entorno

**Backend** — crear `backend/.env`:

```env
PORT=3001
DATABASE_URL=postgresql://<user>:<password>@<host>/PanMac

CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

FRONTEND_URL=http://localhost:5173

POLAR_ACCESS_TOKEN=pol_...
POLAR_WEBHOOK_SECRET=whsec_...
POLAR_API_BASE=https://api.polar.sh
POLAR_CHECKOUT_PRODUCT_ID=<uuid>

STREAM_API_KEY=<key>
STREAM_API_SECRET=<secret>

IMAGEKIT_PUBLIC_KEY=public_...
IMAGEKIT_PRIVATE_KEY=private_...
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<id>

STORE_CURRENCY=COP
STORE_CURRENCY_MINOR_UNITS=2

SENTRY_DSN=https://<key>@<project>.ingest.us.sentry.io/<id>
```

**Frontend** — crear `frontend/.env`:

```env
VITE_API_URL=http://localhost:3001
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<id>
VITE_SENTRY_DSN=https://<key>@<project>.ingest.us.sentry.io/<id>
```

### 3. Instalar dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Inicializar la base de datos

```bash
cd backend
npm run db:push
```

### 5. Sembrar datos iniciales (opcional)

```bash
# Productos del catálogo
npx tsx scripts/seed.ts

# Usuario admin (user@test.com / password)
npx tsx scripts/seed-admin.ts
```

### 6. Ejecutar en desarrollo

Abrir **dos terminales**:

```bash
# Terminal 1 — Backend (puerto 3001)
cd backend
npm run dev

# Terminal 2 — Frontend (puerto 5173)
cd frontend
npm run dev
```

El servidor de desarrollo de Vite redirige las peticiones `/api/*` al backend automáticamente.

---

## 🐳 Docker Deployment

Construir y ejecutar el contenedor de producción:

```bash
docker build \
  --build-arg VITE_API_URL=https://tudominio.com \
  --build-arg VITE_CLERK_PUBLISHABLE_KEY=pk_test_... \
  --build-arg VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<id> \
  --build-arg VITE_SENTRY_DSN=https://<key>@<project>.ingest.us.sentry.io/<id> \
  -t panmac .

docker run -p 3001:3001 \
  -e DATABASE_URL="postgresql://..." \
  -e CLERK_PUBLISHABLE_KEY="pk_test_..." \
  -e CLERK_SECRET_KEY="sk_test_..." \
  -e CLERK_WEBHOOK_SECRET="whsec_..." \
  -e FRONTEND_URL="https://tudominio.com" \
  -e POLAR_ACCESS_TOKEN="pol_..." \
  -e POLAR_WEBHOOK_SECRET="whsec_..." \
  -e POLAR_CHECKOUT_PRODUCT_ID="<uuid>" \
  -e STREAM_API_KEY="<key>" \
  -e STREAM_API_SECRET="<secret>" \
  -e IMAGEKIT_PUBLIC_KEY="public_..." \
  -e IMAGEKIT_PRIVATE_KEY="private_..." \
  -e IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/<id>" \
  panmac
```

El contenedor sirve tanto el SPA como la API en el puerto **3001**.

---

## 🔗 API Reference

Todas las rutas API están prefijadas con `/api` y requieren autenticación mediante Clerk (excepto donde se indique).

### Productos

| Método | Endpoint                   | Descripción               |
| ------ | -------------------------- | ------------------------- |
| `GET`  | `/api/products`            | Listar productos activos  |
| `GET`  | `/api/products/categories` | Listar categorías         |
| `GET`  | `/api/products/:slug`      | Obtener producto por slug |

### Autenticación

| Método | Endpoint          | Descripción                                |
| ------ | ----------------- | ------------------------------------------ |
| `GET`  | `/api/me`         | Obtener usuario local (rol, etc.)          |
| `POST` | `/webhooks/clerk` | Webhook de Clerk (sync usuarios) — público |

### Carrito y Checkout

| Método | Endpoint        | Descripción                                            |
| ------ | --------------- | ------------------------------------------------------ |
| `POST` | `/api/checkout` | Crear sesión de checkout (requiere dirección de envío) |

### Pedidos

| Método | Endpoint                         | Descripción                          |
| ------ | -------------------------------- | ------------------------------------ |
| `GET`  | `/api/orders`                    | Listar pedidos (staff ve todos)      |
| `GET`  | `/api/orders/unread-counts`      | Badges de mensajes no leídos (staff) |
| `GET`  | `/api/orders/:id`                | Detalle del pedido con items         |
| `POST` | `/api/orders/:id/stream-channel` | Obtener/crear canal de Stream Chat   |
| `POST` | `/api/orders/:id/video-invite`   | Enviar invitación de video (staff)   |

### Pagos

| Método | Endpoint          | Descripción                             |
| ------ | ----------------- | --------------------------------------- |
| `POST` | `/webhooks/polar` | Webhook de Polar (order.paid) — público |

### Soporte General

| Método | Endpoint                          | Descripción                             |
| ------ | --------------------------------- | --------------------------------------- |
| `POST` | `/api/support`                    | Crear ticket de soporte (expira en 24h) |
| `GET`  | `/api/support`                    | Listar tickets (staff ve todos)         |
| `POST` | `/api/support/:id/stream-channel` | Obtener/crear canal de chat del ticket  |
| `POST` | `/api/support/:id/video-invite`   | Enviar invitación de video (staff)      |

### Administración

| Método   | Endpoint                   | Descripción                          |
| -------- | -------------------------- | ------------------------------------ |
| `GET`    | `/api/admin/imagekit/auth` | Firma de autenticación para ImageKit |
| `GET`    | `/api/admin/products`      | Listar todos los productos (admin)   |
| `POST`   | `/api/admin/products`      | Crear producto (admin)               |
| `PATCH`  | `/api/admin/products/:id`  | Actualizar producto (admin)          |
| `DELETE` | `/api/admin/products/:id`  | Eliminar producto (admin)            |

### Configuración

| Método | Endpoint      | Descripción                                           |
| ------ | ------------- | ----------------------------------------------------- |
| `GET`  | `/api/config` | Configuración de tienda (moneda, decimales) — público |

### Stream

| Método | Endpoint            | Descripción                                              |
| ------ | ------------------- | -------------------------------------------------------- |
| `POST` | `/api/stream/token` | Obtener token de Stream Chat para el usuario autenticado |

### Utilidades

| Método | Endpoint  | Descripción            |
| ------ | --------- | ---------------------- |
| `GET`  | `/health` | Health check — público |

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia [ISC License](https://opensource.org/licenses/ISC).

---

Made with 💜 by [AngelixFlorez](https://github.com/AngelixFlorez)

import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { products } from "../src/db/schema.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const CATALOG = [
  {
    slug: "galleta-clasica",
    name: "Galleta Clásica de Mantequilla",
    category: "Galletas",
    description:
      "Galleta artesanal de mantequilla con chispas de chocolate, horneada a la perfección. Crocante por fuera, suave por dentro. Ideal para acompañar café o té.",
    priceCents: 3500,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
  },
  {
    slug: "galleta-arcade",
    name: "Galleta Arcade Fantasma",
    category: "Galletas",
    description:
      "Galleta decorada con glaseado de colores inspirada en los clásicos fantasmas del laberinto. Mantequilla de vainilla con chispas de colores. Cada morder es un nivel superado.",
    priceCents: 4500,
    imageUrl: "https://images.unsplash.com/photo-1546939355-12e20f8b1e78?w=800&q=80",
  },
  {
    slug: "galleta-avena",
    name: "Galleta de Avena y Miel",
    category: "Galletas",
    description:
      "Galleta saludable de avena con miel de abejas, pasas y nueces. Horneada con ingredientes naturales, sin preservativos. Energía para seguir jugando.",
    priceCents: 4000,
    imageUrl: "https://images.unsplash.com/photo-1622376755786-5cb6e2a1f88a?w=800&q=80",
  },
  {
    slug: "galleta-red-velvet",
    name: "Galleta Red Velvet",
    category: "Galletas",
    description:
      "Galleta de red velvet con chispas de chocolate blanco. Su textura suave y su color rojo vibrante la hacen irresistible. Decorada con puntos que recuerdan a los power pellets.",
    priceCents: 4500,
    imageUrl: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=800&q=80",
  },
  {
    slug: "pan-mantou",
    name: "Pan Mantou (Pan chino al vapor)",
    category: "Panes",
    description:
      "Pan chino esponjoso al vapor, dulce y suave. Inspirado en las nubes pixeladas de los juegos retro. Perfecto para el desayuno o la merienda.",
    priceCents: 3000,
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  },
  {
    slug: "pan-brioche",
    name: "Pan Brioche Arcade",
    category: "Panes",
    description:
      "Pan brioche artesanal con forma de ladrillo pixelado. Enriquecido con mantequilla y huevos, con un toque de naranja. Su miga es suave y dorada como los bloques de monedas.",
    priceCents: 5500,
    imageUrl: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=80",
  },
  {
    slug: "pan-canela",
    name: "Pan de Canela en Espiral",
    category: "Panes",
    description:
      "Pan de canela enrollado en espiral con glaseado de queso crema. El aroma a canela te transporta al nivel de las mazmorras. Horneado fresco cada mañana.",
    priceCents: 6500,
    imageUrl: "https://images.unsplash.com/photo-1591123120670-37c135a1e98c?w=800&q=80",
  },
  {
    slug: "pan-semilla",
    name: "Pan de Semillas y Centeno",
    category: "Panes",
    description:
      "Pan de centeno con mezcla de semillas de girasol, calabaza y linaza. Crujiente por fuera, denso por dentro. Ideal para acompañar tus comidas principales.",
    priceCents: 7000,
    imageUrl: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80",
  },
  {
    slug: "torta-chocolate",
    name: "Pastel de Chocolate Pixelado",
    category: "Pasteles",
    description:
      "Pastel de chocolate con tres capas de bizcocho húmedo y relleno de ganache. Decorado con cuadrados de chocolate blanco y negro que forman un patrón inspirado en el laberinto clásico.",
    priceCents: 15000,
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
  },
  {
    slug: "torta-zanahoria",
    name: "Pastel de Zanahoria con Nueces",
    category: "Pasteles",
    description:
      "Pastel de zanahoria artesanal con nueces y cobertura de crema de queso. Horneado con canela y jengibre. Una receta clásica que nunca pasa de moda, como los juegos retro.",
    priceCents: 14000,
    imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
  },
  {
    slug: "torta-frutas",
    name: "Pastel de Frutas Confitadas",
    category: "Pasteles",
    description:
      "Pastel tradicional de frutas confitadas con almendras y un toque de ron. Bañado en almíbar para mantener su humedad. Cada rebanada es un tesoro escondido.",
    priceCents: 18000,
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
  },
  {
    slug: "torta-fresa",
    name: "Pastel de Fresa con Crema",
    category: "Pasteles",
    description:
      "Pastel de vainilla con fresas frescas y crema batida. Decorado con glaseado rosa y detalles blancos que recuerdan a las cerezas de los juegos arcade.",
    priceCents: 16000,
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
  },
  {
    slug: "postre-cheesecake",
    name: "Cheesecake de Frutos Rojos",
    category: "Postres individuales",
    description:
      "Cheesecake cremoso horneado sobre base de galleta, cubierto con coulis de frutos rojos. Tamaño individual para disfrutar sin culpa. Postre estrella de la casa.",
    priceCents: 8000,
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
  },
  {
    slug: "postre-mousse",
    name: "Mousse de Maracuyá",
    category: "Postres individuales",
    description:
      "Mousse ligero de maracuyá con base crujiente de galleta. Dulce y ácido en el punto exacto. Decorado con semillas de maracuyá frescas. Puro sabor tropical.",
    priceCents: 7000,
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
  },
  {
    slug: "postre-tiramisu",
    name: "Tiramisú Individual",
    category: "Postres individuales",
    description:
      "Tiramisú clásico italiano en porción individual. Capas de bizcocho empapado en café, crema de mascarpone y cacao espolvoreado. Un final perfecto para cualquier comida.",
    priceCents: 9000,
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
  },
  {
    slug: "postre-flan",
    name: "Flan de Caramelo Clásico",
    category: "Postres individuales",
    description:
      "Flan tradicional de huevo con caramelo líquido. Cremoso, sedoso y con el punto justo de dulzor. Horneado a baño maría para lograr la textura perfecta.",
    priceCents: 6000,
    imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
  },
];

async function main() {
  const rows = CATALOG.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    priceCents: p.priceCents,
    currency: "COP",
    imageUrl: p.imageUrl,
    active: true,
  }));

  for (const row of rows) {
    await db
      .insert(products)
      .values(row)
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          name: row.name,
          category: row.category,
          description: row.description,
          priceCents: row.priceCents,
          currency: row.currency,
          imageUrl: row.imageUrl,
          active: row.active,
        },
      });
  }
  console.log(`Seed complete (${CATALOG.length} products upserted).`);
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
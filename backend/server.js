const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

const INITIAL_PROPERTIES = [
  {
    title: "Escritorio Moderno Centro Sao Luis",
    description: "Escritorio mobiliado no coracao de Sao Luis, ideal para startups e pequenas empresas.",
    price: 1800,
    location: "Centro, Sao Luis - MA",
    bedrooms: 4,
    bathrooms: 1,
    area: 45,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ]),
    type: "Escritório",
    status: "disponivel",
  },
  {
    title: "Coworking Premium Renascenca",
    description: "Espaco de coworking moderno e inspirador, com infraestrutura completa para equipes pequenas.",
    price: 850,
    location: "Renascenca, Sao Luis - MA",
    bedrooms: 2,
    bathrooms: 1,
    area: 20,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1559310415-1e164ccd653a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ]),
    type: "Coworking",
    status: "disponivel",
  },
  {
    title: "Loja Comercial Cohama",
    description: "Loja ampla em uma das regioes mais movimentadas de Sao Luis, com excelente visibilidade.",
    price: 3500,
    location: "Cohama, Sao Luis - MA",
    bedrooms: 5,
    bathrooms: 1,
    area: 80,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1761333477936-56fbc7851c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ]),
    type: "Loja",
    status: "disponivel",
  },
  {
    title: "Sala Comercial Calhau",
    description: "Sala comercial pronta para uso em edificio corporativo moderno e bem localizado.",
    price: 1200,
    location: "Calhau, Sao Luis - MA",
    bedrooms: 3,
    bathrooms: 1,
    area: 35,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1637665662134-db459c1bbb46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ]),
    type: "Sala Comercial",
    status: "disponivel",
  },
  {
    title: "Escritorio Executivo Ponta d'Areia",
    description: "Escritorio de alto padrao em edificio premium, com acabamento sofisticado e vista panoramica.",
    price: 2500,
    location: "Ponta d'Areia, Sao Luis - MA",
    bedrooms: 5,
    bathrooms: 2,
    area: 60,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1576073460124-e073bb8d87f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ]),
    type: "Escritório",
    status: "disponivel",
  },
  {
    title: "Espaco Compartilhado Sao Francisco",
    description: "Ambiente descontraido e produtivo para freelancers e pequenos times, com otimo custo-beneficio.",
    price: 650,
    location: "Sao Francisco, Sao Luis - MA",
    bedrooms: 2,
    bathrooms: 1,
    area: 15,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1576485424072-e585a98df56e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ]),
    type: "Coworking",
    status: "disponivel",
  },
  {
    title: "Sala Premium Jaracaty",
    description: "Sala comercial em area nobre, ideal para consultorios e escritorios profissionais.",
    price: 1600,
    location: "Jaracaty, Sao Luis - MA",
    bedrooms: 4,
    bathrooms: 1,
    area: 50,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1771530789155-b1f03fbf82b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ]),
    type: "Sala Comercial",
    status: "disponivel",
  },
  {
    title: "Loja Estrategica Centro Historico",
    description: "Ponto comercial em area historica e turistica, ideal para comercio cultural e gastronomia.",
    price: 2800,
    location: "Centro Historico, Sao Luis - MA",
    bedrooms: 4,
    bathrooms: 1,
    area: 65,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ]),
    type: "Loja",
    status: "disponivel",
  },
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('./properties.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    ensureSchema();
  }
});

function createPropertiesTable(tableName = 'properties') {
  return `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      location TEXT NOT NULL,
      bedrooms INTEGER DEFAULT 0,
      bathrooms INTEGER DEFAULT 0,
      area REAL DEFAULT 0,
      images TEXT,
      type TEXT NOT NULL,
      status TEXT DEFAULT 'disponivel' CHECK(status IN ('disponivel', 'vendido', 'alugado')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

function ensureSeedData() {
  db.get("SELECT COUNT(*) as count FROM properties", (err, row) => {
    if (err) {
      console.error('Error checking table:', err.message);
    } else if (row.count === 0) {
      insertInitialData();
    }
  });
}

function ensureSchema() {
  db.get(
    "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'properties'",
    (err, row) => {
      if (err) {
        console.error('Error checking schema:', err.message);
        return;
      }

      const existingSchema = row?.sql || '';
      const usesLegacyTypeConstraint = existingSchema.includes("CHECK(type IN ('casa', 'apartamento', 'terreno'))");

      if (!row) {
        createTables();
        return;
      }

      if (usesLegacyTypeConstraint) {
        migratePropertiesTable();
        return;
      }

      ensureSeedData();
    }
  );
}

// Create tables
function createTables() {
  db.run(`
    ${createPropertiesTable()}
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
      return;
    }

    ensureSeedData();
  });
}

function migratePropertiesTable() {
  db.serialize(() => {
    db.run(createPropertiesTable('properties_new'), (err) => {
      if (err) {
        console.error('Error creating migrated table:', err.message);
        return;
      }

      db.run(`
        INSERT INTO properties_new (
          id, title, description, price, location, bedrooms, bathrooms, area, images, type, status, created_at, updated_at
        )
        SELECT
          id, title, description, price, location, bedrooms, bathrooms, area, images, type, status, created_at, updated_at
        FROM properties
      `, (insertErr) => {
        if (insertErr) {
          console.error('Error copying data during migration:', insertErr.message);
          return;
        }

        db.run('DROP TABLE properties', (dropErr) => {
          if (dropErr) {
            console.error('Error dropping legacy table:', dropErr.message);
            return;
          }

          db.run('ALTER TABLE properties_new RENAME TO properties', (renameErr) => {
            if (renameErr) {
              console.error('Error renaming migrated table:', renameErr.message);
              return;
            }

            console.log('Properties table migrated to commercial schema.');
            ensureSeedData();
          });
        });
      });
    });
  });
}

// Insert initial properties
function insertInitialData() {
  const stmt = db.prepare(`
    INSERT INTO properties (title, description, price, location, bedrooms, bathrooms, area, images, type, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  INITIAL_PROPERTIES.forEach(property => {
    stmt.run(
      property.title,
      property.description,
      property.price,
      property.location,
      property.bedrooms,
      property.bathrooms,
      property.area,
      property.images,
      property.type,
      property.status
    );
  });

  stmt.finalize();
  console.log('Initial data inserted.');
}

// Routes

// GET /api/properties - Get all properties
app.get('/api/properties', (req, res) => {
  db.all("SELECT * FROM properties ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Parse images JSON
    rows.forEach(row => {
      if (row.images) {
        row.images = JSON.parse(row.images);
      }
    });
    res.json(rows);
  });
});

// GET /api/properties/:id - Get property by ID
app.get('/api/properties/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM properties WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    if (row.images) {
      row.images = JSON.parse(row.images);
    }
    res.json(row);
  });
});

// POST /api/properties - Create new property
app.post('/api/properties', (req, res) => {
  const { title, description, price, location, bedrooms, bathrooms, area, images, type, status } = req.body;

  if (!title || !price || !location || !type) {
    return res.status(400).json({ error: 'Title, price, location, and type are required' });
  }

  const imagesJson = JSON.stringify(images || []);

  db.run(`
    INSERT INTO properties (title, description, price, location, bedrooms, bathrooms, area, images, type, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [title, description, price, location, bedrooms || 0, bathrooms || 0, area || 0, imagesJson, type, status || 'disponivel'], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

// PUT /api/properties/:id - Update property
app.put('/api/properties/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, bedrooms, bathrooms, area, images, type, status } = req.body;

  const imagesJson = JSON.stringify(images || []);

  db.run(`
    UPDATE properties SET
      title = ?, description = ?, price = ?, location = ?, bedrooms = ?, bathrooms = ?,
      area = ?, images = ?, type = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `, [title, description, price, location, bedrooms, bathrooms, area, imagesJson, type, status, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json({ message: 'Property updated successfully' });
  });
});

// DELETE /api/properties/:id - Delete property
app.delete('/api/properties/:id', (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM properties WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json({ message: 'Property deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});

// teste

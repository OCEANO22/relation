// ===== BACKEND: api/index.js =====
import { Hono } from 'hono'

/** @typedef {{ DB: D1Database, ASSETS: Fetcher }} Bindings */

const app = new Hono()

// Ambil semua komentar
app.get('/api/relations', async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM relations").all()
  return c.json(results)
})

// Tambah komentar
app.post('/api/relations', async (c) => {
  try {
    const input = await c.req.json()
    const id = crypto.randomUUID()
    await c.env.DB.prepare(
      "INSERT INTO relations (id, nama, email, pesan) VALUES (?, ?, ?, ?)"
    ).bind(id, input.nama, input.email, input.pesan).run()
    return c.json({ success: true, id, ...input })
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

// Ambil komentar berdasarkan ID
app.get('/api/relations/:id', async (c) => {
  const id = c.req.param('id')
  const { results } = await c.env.DB.prepare("SELECT * FROM relations WHERE id = ?").bind(id).all()
  return c.json(results[0])
})

// Update komentar
app.put('/api/relations/:id', async (c) => {
  const id = c.req.param('id')
  const input = await c.req.json()
  await c.env.DB.prepare(
    "UPDATE relations SET nama = ?, email = ?, pesan = ? WHERE id = ?"
  ).bind(input.nama, input.email, input.pesan, id).run()
  return c.json({ success: true, id })
})

// Hapus komentar
app.delete('/api/relations/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare("DELETE FROM relations WHERE id = ?").bind(id).run()
  return c.json({ deleted: true, id })
})

// Akses file statis
app.get('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app

import { Hono } from 'hono'

const app = new Hono()

app.get('/api/relations', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM relations').all()
  return c.json(results)
})

app.post('/api/relations', async (c) => {
  const newId = crypto.randomUUID()
  const input = await c.req.json()
  const query = `INSERT INTO relations(id, nama, email, pesan) VALUES (?, ?, ?, ?)`
  await c.env.DB.prepare(query).bind(newId, input.nama, input.email, input.pesan).run()
  return c.json({ id: newId, ...input })
})

app.get('/api/relations/:id', async (c) => {
  const id = c.req.param('id')
  const { results } = await c.env.DB.prepare('SELECT * FROM relations WHERE id = ?').bind(id).all()
  return c.json(results[0])
})

app.put('/api/relations/:id', async (c) => {
  const id = c.req.param('id')
  const input = await c.req.json()
  const query = `UPDATE relations SET nama = ?, email = ?, pesan = ? WHERE id = ?`
  await c.env.DB.prepare(query).bind(input.nama, input.email, input.pesan, id).run()
  return c.json({ id, ...input })
})

app.delete('/api/relations/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM relations WHERE id = ?').bind(id).run()
  return c.json({ message: 'Relation deleted', id })
})

// Serve static assets (UI)
app.get('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app

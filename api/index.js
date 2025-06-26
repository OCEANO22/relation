import { Hono } from 'hono'

// Define the Bindings type if not already defined
/**
 * @typedef {Object} Bindings
 * @property {any} DB
 * @property {any} ASSETS
 */

// If using TypeScript, uncomment and adjust the following interface:
// interface Bindings {
//   DB: any;
//   ASSETS: any;
// }

const app = new Hono()

app.get('/api/relations', async (c) => {
  // You need to fetch results from the database here
  const { results } = await c.env.DB.prepare("SELECT * FROM relations").all()
  return c.json(results)
})

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

app.get('/api/relations/:id', async (c) => {
  const id = c.req.param('id')
  const { results } = await c.env.DB.prepare("SELECT * FROM relations WHERE id = ?").bind(id).all()
  return c.json(results[0])
})

app.put('/api/relations/:id', async (c) => {
  const id = c.req.param('id')
  const input = await c.req.json()
  await c.env.DB.prepare(
    "UPDATE relations SET nama = ?, email = ?, pesan = ? WHERE id = ?"
  ).bind(input.nama, input.email, input.pesan, id).run()
  return c.json({ success: true, id })
})

app.delete('/api/relations/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare("DELETE FROM relations WHERE id = ?").bind(id).run()
  return c.json({ deleted: true, id })
})

app.get('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app

import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Serve the `api/` functions under `npm run dev`.
 *
 * Vercel runs these in production; Vite does not know about them, so in dev we
 * mount the same handlers as middleware. Handlers are imported per-request so
 * edits are picked up without restarting the server.
 */
function apiPlugin() {
  return {
    name: 'off-book-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')
        if (!url.pathname.startsWith('/api/')) return next()

        const route = url.pathname.replace('/api/', '')
        try {
          const mod = await server.ssrLoadModule(`/api/${route}.js`)
          res.status = (code) => { res.statusCode = code; return res }
          res.json = (payload) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
            return res
          }
          await mod.default(req, res)
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error.message }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.GOOGLE_CLIENT_ID ||= env.GOOGLE_CLIENT_ID
  process.env.ALLOWED_EMAIL_DOMAIN ||= env.ALLOWED_EMAIL_DOMAIN

  return {
    plugins: [react(), apiPlugin()],
  }
})

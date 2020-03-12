const express = require('express')
const next = require('next')
const { join } = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 5000
const Cookies = require('cookies')
const Prismic = require('prismic-javascript')
const compression = require('compression')
const basicAuth = require('./basic-auth')
const { linkResolver } = require('./utils/link-resolver')
const { PRISMIC_API_URL } = require('./constants/prismic')

// Force https
const requireHTTPS = (req, res, _next) => {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && !dev) {
        return res.redirect(301, `https://${req.get('host')}${req.url}`)
    }
    _next()
}

app.prepare()
    .then(() => {
        const server = express()
        server.use([compression(), requireHTTPS])

        // Adds a password to the site
        // if you add these env vars
        if (process.env.USERNAME && process.env.PASSWORD) {
            server.use(basicAuth)
        }

        server.get('/preview', async (req, res) => {
            const { token } = req.query
            const api = await Prismic.getApi(PRISMIC_API_URL, {
                req,
                accessToken: process.env.PRISMIC_ACCESS_TOKEN,
            })
            const url = await api.previewSession(token, linkResolver, '/')
            const cookies = new Cookies(req, res)
            cookies.set(Prismic.previewCookie, token, {
                maxAge: 30 * 60 * 1000,
                path: '/',
                httpOnly: false,
            })
            res.redirect(302, url)
        })

        server.get('/service-worker.js', (req, res) => {
            const filePath = join(__dirname, '.next', '/service-worker.js')
            app.serveStatic(req, res, filePath)
        })

        server.all('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
        })
    })
    .catch((ex) => {
        // eslint-disable-next-line no-console
        console.error(ex.stack)
        process.exit(1)
    })

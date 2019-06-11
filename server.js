const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 5000
const Cookies = require('cookies')
const Prismic = require('prismic-javascript')
const { linkResolver } = require('./utils/link-resolver')
const { PRISMIC_API_URL } = require('./config')
const compression = require('compression')

// Force https
const requireHTTPS = (req, res, next) => {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && !dev) {
        return res.redirect(301, 'https://' + req.get('host') + req.url)
    }
    next()
}

app.prepare()
    .then(() => {
        const server = express()
        server.use([compression(), requireHTTPS])

        server.get('/preview', async (req, res) => {
            const { token } = req.query
            const api = await Prismic.getApi(PRISMIC_API_URL, {
                req: req,
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

        // Sitemap
        server.get('/sitemap.xml', (req, res) =>
            res.status(200).sendFile('sitemap.xml', { root: __dirname + '/static' })
        )

        // Favicon stuff
        server.get('/favicon.ico', (req, res) =>
            res.status(200).sendFile('favicon.ico', { root: __dirname + '/static/favicons' })
        )

        server.get('/site.webmanifest', (req, res) =>
            res.status(200).sendFile('site.webmanifest', { root: __dirname + '/static/favicons/' })
        )

        server.get('/browserconfig.xml', (req, res) =>
            res.status(200).sendFile('browserconfig.xml', {
                root: __dirname + '/static/favicons/',
            })
        )

        server.get('/work/:slug', (req, res) => {
            app.render(req, res, '/work-detail', { slug: req.params.slug })
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })
